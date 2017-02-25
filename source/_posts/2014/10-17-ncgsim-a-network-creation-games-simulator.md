---
title: ncgsim - A Network Creation Games simulator
id: 2098
comment: false
tags:
  - Allgemein
date: 2014-10-17T11:23:15.000Z
author: Fabian Wetzel
---

You did not read much from me here for the last months, did you? I was coding a simulator for Network Creation Games and I was writing my master thesis about it as well. Now it’s done. Mostly.

What is Network Creation Games you ask? It is a game inspired by the internet itself. There is a graph and each node is a player. Every player has to build edges or use edges from other players to connect to all other player. Operating an edge introduces costs and using the edges from others has costs as well. Each player has the target to optimize their own costs to a minimum. The game ends, when no player is doing anything anymore.

Building a simulator for this was an interesting challenge because I decided to not use my well-known technology stack of .Net/C#/ASP.Net but to do a single page app built with AngularJS, Bootstrap and TypeScript. It was interesting for me and it had quite a learning curve as well. What I missed the most was Linq.

I was trying out Github for the hosting of the repository and issue tracking and I was doing real test-driven development and feature branches. It was lovely ![Smiley](https://az275061.vo.msecnd.net/blogmedia/2014/10/wlEmoticon-smile.png) At one point, I had the idea to swap out one graph implementation with another. I did that and after I was done, all lights where green again and I felt a strong confidence, that I did not broke anything.

You can check it out yourself. It runs as an azure website on [http://ncgsim.azurewebsites.com](http://ncgsim.azurewebsites.com) and the repo is at [https://github.com/fabsenet/ncgsim](https://github.com/fabsenet/ncgsim "https://github.com/fabsenet/ncgsim")

Let me know, what you think!

