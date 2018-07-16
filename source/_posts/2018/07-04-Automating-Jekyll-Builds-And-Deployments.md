---
author: Fabian Wetzel
title: Automating Jekyll-based web page build and deployments
subtitle: I describe my journey to fully automate the building and deployment of a Jekyll based blog from checkin to running in production
description: I describe my journey to fully automate the building and deployment of a Jekyll based blog from checkin to running in production. Continue reading this in my blog.
date: 2018-07-04 16:19:50
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

This blog runs (currently) on Hexo but my German blog runs on Jekyll. In case you do not know, Hexo and Jekyll take a bunch of blog posts written in Markdown together with some layout and compile them into a static web site. These files can then be hostet everywhere. I like editing the markdown files and it is even possible in the browser on the github page. But compiling the blog is not possible directly. So I always need to have my notebook or desktop pc ready for this. Until now I had Jekyll running through the Windows 10 subsystem for Linux. _This works okay but I found a much nicer way!_ Welcome **Docker** on the stage and the Docker image jekyll/jekyll. This image provides a running jekyll install inside a container. But there is no need to run this container locally! Azure container instances can run this in the cloud for you and it is billed per second.

So there evolves my target model which I want to archieve:

1. Push change of the blog content to Github repo (or edit directly)
1. Github Webhook triggers an azure function
1. The azure function starts a new container in azure
1. the container...
    1. fetches the latest source from the git repo
    1. builds it with jekyll
    1. deploys it via sftp to the web server

The azure function is needed because the webhook cannot be customized enough to start a container instance directly. Also, I want to run a slightly different command based on the changed branch.

## Solving it backwards

I think it is best to solve it backwards because I can always do one step before manually instead of automated. For example, I can trigger the container start via the command line before setting up the azure function. Also, the container setup without the azure function provides some value already. An azure function without the container does not.

# Setting up a docker container for build and deploy

## What I start with

...is this powershell command which uses either the [azure cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest) or the new [cloud shell](https://shell.azure.com/) if you like:

```powershell
az container create --resource-group cicd --name blog-en-cicd --image jekyll/builder --restart-policy never --command-line "jekyll build" --gitrepo-url https://github.com/fabsenet/blog_de.git --gitrepo-mount-path /srv/jekyll --gitrepo-revision master
```

See also the docs for [az container create](https://docs.microsoft.com/en-us/cli/azure/container?view=azure-cli-latest#az-container-create)!

This command does most of what I want already. It will create a container with the name `blog-en-cicd` in an azure ressource group named `cicd` (this must exist already). It will also use the [gitrepovolume function](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-volume-gitrepo) to clone my blog source with the specified revision (=branch, hash, tag, ...) in the specified directory `/srv/jekyll`.

The restart policy `never` will start this container atmost once. Either it works or not. The most likely case of failing is me messing something up and this will not change on retry. Also the idea is to start the container, build and deploy exactly one and get rid of it. Per minute billing is perfect for this as well.

What is missing from here is a way to publish the resulting html(+other files) and most probably a way to store the secret somewhere in there because the blog source is public but my hosting server is not!

## Viewing outcomes of container runs

To view the details of the last run, I use `az container show --resource-group cicd --name blog-en-cicd -o table` to take a look at the ProvisioningState and I use `az container logs --resource-group cicd --name blog-en-cicd` to view the output of the commands that were run in the container. In the example this was only `git status` to make sure, the revision command works as expected:

![powershell result for az container show and az container logs](powershell_container_status.png)

## Providing secrets to the container

`az container create` has some more allowed parameters. It especially allows to mount a [*secrets* volume](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-volume-secret) to provide what I want. To do this, I use the paramters `--secrets sshuser=abcd sshpass=defg --secrets-mount-path "/secrets"`.

This will create a folder `/secrets`. The file name is the key and the content is the secret value. So there will be `/secrets/sshuser` and `/secrets/sshpass`

Now I need to setup the deploy phase of my jekyll blog in a way to use these secrets and to actually deploy the site.

## Setting up the deployment

# Building the azure function

# Hooking the azure function to GitHub webhooks

# Final thoughts

az container create --resource-group cicd --name blog-en-cicd --image jekyll/b
uilder --restart-policy never --command-line "bash -c 'cd /secrets && ls && cat sshuser'" --gitrepo-url https://github.com/fabse
net/blog_de.git --gitrepo-mount-path /srv/jekyll --gitrepo-revision next --secrets sshuser=fabse sshpass=abcdefg --secrets-mount
-path "/secrets"