---
title: 'Using Windows Azure Compute to host a proxy [Update]'
tags:
  - Azure
  - DIY
date: 2012-03-24T12:42:33.000Z
author: Fabian Wetzel
---

If you have admin access, you can disable the Windows Firewall with just with this small command:
  > netsh firewall set opmode disable  

That’s it! At this point it is working out-of-the-box! ![Smile](https://az275061.vo.msecnd.net/blogmedia/2012/03/wlEmoticon-smile3.png) The downside is that it uses a not secured connection and basic authentication.

I invested some time trying to get a secure https connection working between my browser and the proxy but it just does not work (for me).

I was realizing, that I really wanted an VPN endpoint and not a proxy but I also decided to not work any longer on this!


