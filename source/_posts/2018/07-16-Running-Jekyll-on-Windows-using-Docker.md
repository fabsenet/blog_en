---
author: Fabian Wetzel
title: Running Jekyll on Windows using Docker
subtitle: Switching from Jekyll via Windows 10 Subsystem for Linux to a Docker containter based local build is easier than I thought
description: Switching from Jekyll via Windows 10 Subsystem for Linux to a Docker containter based local build is easier than I thought. Continue reading this in my blog.
date: 2018-07-04 16:19:50
tags:
 - blog
 - My Setup
 - docker
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

[My German blog](https://fabse.net) runs on [Jekyll](https://jekyllrb.com/). Jekyll takes a bunch of blog posts written in Markdown together with some layout and compiles them into a static web site. These files can then be hostet everywhere. I like editing the markdown files but it was a small pain to run Jekyll on Windows in the past. It became easier with the introduction of Windows 10 Subsystem for Linux (WSL for short). _This worked okay but I found a much nicer way!_ Welcome **Docker** on the stage and the [Docker image jekyll/jekyll](https://hub.docker.com/r/jekyll/jekyll/). This image provides a running jekyll installation inside a container.

My target is to have two commands for my local command line which support my writing and my publishing needs:

- One command that will serve the local changes on my local maschine so I can see the changes live
- Another command to produce the static website content (html+css+images) and automatically uploads them

# Installing Docker

Well, that is kind of easy. You open the docker page, click download, double click... 

You want the [Docker Community Edtion for Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows).

You may need to install the Hyper-V feature for Windows as part of the install. The installer is guiding you nicely here so just follow along. Then you have to enable file system access in the docker settings and provide credentials for this. Then you can already open up an *elevated* powershell and type

```powershell
docker run jekyll/jekyll
```

This command will

- download the container
- start the container
- run its default command which seems to be just `jekyll` in this case
- stops the container after the command exits

![The result of docker run command](first_docker_run.png)

*The error in the image is caused by jekyll not finding any actual blog yet.*

# Providing the right `docker run` commands

All I need to do now is to provide the correct parameters to the `docker run` command and everything should work. [There are many parameters](https://docs.docker.com/engine/reference/run/).

## Mounting a volume

I want to have the actual source folder laying around in my PCs file system. So I have to mount them to the container to make them visible. The jekyll containter wants the blog data in `/srv/jekyll` and I actually have them in `C:\github\fabsenet\blog_de\` so I provide the mapping:

```powershell
docker run --volume=C:\github\fabsenet\blog_de\:/srv/jekyll jekyll/jekyll
```

## Mounting the current directory to a volume

I want to keep the command flexible. I want to be able to run it on different maschines for different blogs so I want to let it build the blog in the *current* directory instead. This can be done in powershell as well:

```powershell
cd C:\github\fabsenet\blog_de\
docker run --volume=${PWD}:/srv/jekyll jekyll/jekyll
```

## Mounting the cache volume to a persistent volume

The jekyll container does not have all the jekyll plugins my blog uses pre-installed so it will download them on every build again because the package cache is empty on every container start. Here I use the persistent volume:

```powershell
docker run --volume=${PWD}:/srv/jekyll --volume=jekyllbundlecache:/usr/local/bundle jekyll/jekyll
```

`jekyllbundlecache` is a simple name which I made up. Docker will create the volume on the first run and will reuse it next time. This avoids excessive package downloads and slowdown on consecutive run.

You can list existing (named) volumes with `docker volume ls`:
![The result of docker run command](first_docker_run.png)

## Serving HTTP locally

I now want to serve the blog locally. If you want to change the command executed in the container, you simply name it at the end of the docker run command including its own parameters:

```powershell
docker run --volume=${PWD}:/srv/jekyll --volume=jekyllbundlecache:/usr/local/bundle jekyll/jekyll jekyll serve
```

This will start `jekyll serve` inside the container serving the site on port 4000. The problem is, it is not accessible from outside the container, so lets change that! You can bind a container port to a real port using the `-p` option with flexible options or you can simply expose it via `--expose`:

```powershell
docker run --volume=${PWD}:/srv/jekyll --volume=jekyllbundlecache:/usr/local/bundle --expose 4000 jekyll/jekyll jekyll serve
```

**First part done!** That is all I wanted for my first command.

## Doing stuff interactively

I have no idea how to actually upload files in a Linux environment so I run the bash shell interactively in the container to figure that out. Please note the `-it` flag to simulate a terminal in the container:

```powershell
docker run --volume=${PWD}:/srv/jekyll --volume=jekyllbundlecache:/usr/local/bundle -it jekyll/jekyll bash
```

*To find an end to this blog post, I leave the code for the actually uploading out.*

## Doing more than one command in a container

If I change the command from `jekyll serve` to `jekyll build` it will build the site in the `_site` folder. I prepared the upload command to upload this and I execute both of them using the `bash -c` command:

```powershell
docker run --volume=${PWD}:/srv/jekyll --volume=jekyllbundlecache:/usr/local/bundle jekyll/jekyll bash -c "jekyll build && echo 'upload command here'"
```

**Second command done!** Thanks for reading!