---
title: Enabling HSTS for Fabse.net
tags:
  - über diese Seite
date: 2015-06-29T20:06:18.000Z
author: Fabian Wetzel
subtitle: 'Today, I read about HTTP strict transport security'
description: 'Today, I read about HTTP strict transport security'
---

Today, I read about HTTP strict transport security on [troyhunt.com](http://www.troyhunt.com/2015/06/understanding-http-strict-transport.html) and I decided to enable it for fabse.net as well. After running [this complete website over HTTPS](https://fabse.net/blog/2014/11/26/encrypt-all-the-things-and-this-blog/) for some time now, I decided to go the next step and to (technically) tell all browsers that this website will only ever work over a secure connection. Hanselman has a great blog post on [how to do this correctly on IIS](http://www.hanselman.com/blog/HowToEnableHTTPStrictTransportSecurityHSTSInIIS7.aspx).

At last, I also added my site to to the [official preload list ](https://hstspreload.appspot.com/)to get it directly included in future browser releases.


