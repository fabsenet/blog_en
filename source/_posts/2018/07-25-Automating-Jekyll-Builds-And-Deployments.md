---
author: Fabian Wetzel
title: Automating Jekyll-based web page build and deployments
subtitle: I describe my journey to fully automate the building and deployment of a Jekyll based blog from checkin to running in production
description: I describe my journey to fully automate the building and deployment of a Jekyll based blog from checkin to running in production. Continue reading this in my blog.
date: 2018-07-25 16:19:50
tags:
 - blog
 - My Setup
 - docker
 - azure
 - automation
cover: img/hamburger_hafen/2999.jpg
coversrcset: 
 - /img/hamburger_hafen/100.jpg 100w
 - /img/hamburger_hafen/250.jpg 250w
 - /img/hamburger_hafen/500.jpg 500w
 - /img/hamburger_hafen/750.jpg 750w
 - /img/hamburger_hafen/999.jpg 999w
 - /img/hamburger_hafen/1499.jpg 1499w
 - /img/hamburger_hafen/1999.jpg 1999w
 - /img/hamburger_hafen/2999.jpg 2999w
---
# What do I want to archieve?

This blog runs (currently) on [Hexo](https://hexo.io/) but my German blog runs on [Jekyll](https://jekyllrb.com/). [In my last post](/blog/2018/07/16/07-16-Running-Jekyll-on-Windows-using-Docker/) I developed a way to use a Docker container for serving, building and deploying the Jekyll-blog on Windows. In case you do not know, Hexo and Jekyll take a bunch of blog posts written in Markdown together with some layout and compile them into a static web site. These files can then be hostet everywhere.

I like editing the markdown files and it is even possible in the browser on the github page. But actually compiling the blog is not possible directly in the browser and I want to _change_ this. Currently, I always need to have my notebook or desktop PC ready for this. I use the Docker image jekyll/jekyll for the work but there is no need to run this container locally! Azure container instances can run this in the cloud for me as well and it is billed per second.

So there evolves my target model which I want to archieve:

1. Push change of the blog content to Github repo (or edit directly)
1. Github Webhook triggers an azure function
1. The azure function starts a new container in azure
1. the container...
    1. fetches the latest source from the git repo
    1. builds it with jekyll
    1. deploys it to the web server

The azure function is needed because the webhook cannot be customized enough to start a container instance directly. Also, I want to run a slightly different command based on the changed branch.

## Solving it backwards

I think it is best to solve it backwards because I can always do one step before manually instead of automated. For example, I can trigger the container start via the command line before setting up the azure function. Also, the container setup without the azure function provides some value already. An azure function without the container does not.

# Setting up a docker container for build and deploy

## What I start with

...is this powershell command which uses either the [azure cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest) or the new [cloud shell](https://shell.azure.com/) if you like:

```powershell
az container create --resource-group cicd --name blog-en-cicd --image jekyll/builder --restart-policy never--gitrepo-url https://github.com/fabsenet/blog_de.git --gitrepo-mount-path /srv/jekyll --gitrepo-revision master --command-line "jekyll build"
```

See also the docs for [az container create](https://docs.microsoft.com/en-us/cli/azure/container?view=azure-cli-latest#az-container-create)!

This command does most of what I want already. It will create a container with the name `blog-en-cicd` in an azure ressource group named `cicd` (this must exist already). It will also use the [gitrepovolume function](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-volume-gitrepo) to clone my blog source with the specified revision (=branch, hash, tag, ...) in the specified directory `/srv/jekyll`.

The restart policy `never` will start this container at most once. Either it works or not. The most likely case of failing is me messing something up and this will not change on a retry. Also the idea is to start the container, build and deploy exactly once and get rid of it. Per minute billing is perfect for this as well. I estimated that the compilation even for heavy blogging will hardly cost me more than a single cent.

What is missing from here is a way to publish the resulting html(+other files) and most probably a way to store the secret somewhere in there because the blog source is public but my hosting server is not!

## Viewing outcomes of container runs

To view the details of the last run, I use `az container show --resource-group cicd --name blog-en-cicd -o table` to take a look at the ProvisioningState and I use `az container logs --resource-group cicd --name blog-en-cicd` to view the output of the commands that were run in the container. In the example this was only `git status` to make sure, the revision command works as expected:

![powershell result for az container show and az container logs](powershell_container_status.png)

## Setting up the deployment

Based on the results of the last blog post, I like to simply repeat the command concatenation of build and uploading.

```powershell
az container create --resource-group cicd --name blog-en-cicd --image jekyll/builder --restart-policy never --gitrepo-url https://github.com/fabsenet/blog_de.git --gitrepo-mount-path /srv/jekyll --gitrepo-revision master --command-line "bash -c 'jekyll build && echo upload command here'"
```

Getting the quoting of quotes in this command right gets harder and harder but the command looses its value fast anyway because to automate it, it actually has to be converted in the deployment of a template to azure anyway.

## converting the az command to a deployment template

I am sure, there is also an `az`-command for this, but this time, I opened the [azure portal](https://portal.azure.com) and navigated to my container instance, selected automation scripts and found the following on the template tab:

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "containerGroups_blog_en_cicd_name": {
            "defaultValue": "blog-en-cicd",
            "type": "String"
        }
    },
    "variables": {},
    "resources": [
        {
            "comments": "...",
            "type": "Microsoft.ContainerInstance/containerGroups",
            "name": "[parameters('containerGroups_blog_en_cicd_name')]",
            "apiVersion": "2018-04-01",
            "location": "westeurope",
            "tags": {},
            "scale": null,
            "properties": {
                "containers": [
                    {
                        "name": "[parameters('containerGroups_blog_en_cicd_name')]",
                        "properties": {
                            "image": "jekyll/builder",
                            "command": [
                                "bash",
                                "-c",
                                "jekyll build && echo upload command here"
                            ],
                            "ports": [],
                            "environmentVariables": [],
                            "resources": {
                                "requests": {
                                    "memoryInGB": 1.5,
                                    "cpu": 1
                                }
                            },
                            "volumeMounts": [
                                {
                                    "name": "gitrepo",
                                    "mountPath": "/srv/jekyll"
                                }
                            ]
                        }
                    }
                ],
                "restartPolicy": "Never",
                "osType": "Linux",
                "volumes": [
                    {
                        "name": "gitrepo",
                        "gitRepo": {
                            "repository": "https://github.com/fabsenet/blog_de.git",
                            "directory": ".",
                            "revision": "master"
                        }
                    }
                ]
            },
            "dependsOn": []
        }
    ]
}
```

If you want to use this template yourself, you obviously have to replace all of my values with yours or you will actually build **my** blog.

# Building the azure function

## functions basics

So I have to write the azure function in a way to deploy this template next. I have never used azure functions before, so there might be an easier or different way to the stuff. You have been warned! I loosely follow [the quickstart sample from the docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function-azure-cli#create-a-function-app).

I need a new storage account for the azure function where they can keep their state and stuff:

```powershell
az storage account create --name cicdfunctionsstore --resource-group cicd --sku Standard_LRS --kind StorageV2
```

Next I create the azure function app based on the quickstart sample:

```powershell
az functionapp create --deployment-source-url https://github.com/Azure-Samples/functions-quickstart --resource-group cicd --consumption-plan-location westeurope --name cicdfunctions --storage-account  cicdfunctionsstore
```

This works so far, now I need to actually edit the functions. I follow the installation guide for the [azure functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) in visual studio code for this. After login, I can already browse the list of my functions:

![azure functions list in VS code](vscode_functions_list.png)

From there, I selected `create new function...` and I was guided through some choices to init my workspace, selecting the programming language (c#) , the trigger type (http), the authentication and finally a name. I then clicked `deploy to function app...`. This actually overwrote the quickstart functions, so creating them in the first place was not really neccessary, I guess. This is all really impressive but I would like to be able to run the function locally as well. I switched to my functions directory locally and executed `func start --build`. Thats it, I then opened <http://localhost:7071/api/TriggerJekyllBuild?name=Fabse> and it worked.

![Firefox showing the local azure functions call](firefox_local_func.png)

## making the actual function

Now I need to put the container template deployment in the function somehow. I provide only a small summary of what I did here because the post is sooo long already:

- added the template an extra file with `CopyToOutputDirectory=PreserveNewest`
- added the boilerplate class from the portal (automation script) and added all missing values
- added the nuget packages the boilerplate class requires (`dotnet add package ...`)
- registered an app identity which is allowed to deploy stuff. ([docs](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal?view=azure-cli-latest))
- copied various IDs and secret in the code from that app identity, azure AD, and so on.

...and it worked after only 20 minutes of tinkering. Nice!

# Hooking the azure function to GitHub webhooks

This is probably the easiest part. I go to my repo on GitHub. You should probably go to *yours*. Then settings, then webhooks, the `Add webhook`. Then I added my azure function url and selected JSON as payload:

![GitHub Add Webhook dialog](github_add_webhook.png)

I also secured everything with some signature verification from a [very good blog post](http://michaco.net/blog/HowToValidateGitHubWebhooksInCSharpWithASPNETCoreMVC).

# Final thoughts

It was actually a fun ride to bring so many technologies and services together! So much was new to me and I managed to get int working anyway. I am feeling very very successful right now!