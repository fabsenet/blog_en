---
title: Encrypt All The Things - and this blog
id: 2109
comment: false
tags:
  - DIY
  - über diese Seite
date: 2014-11-26 11:21:51
---

Google started to favor secure sites in search results. “Encrypt all the things” is trying to create a certificate authority to provide free SSL certificates. And last but not least are all the news stories about government agencies doing evil stuff here and there. This was enough motivation for me to secure my blog with https as well.

My blog was running on a subdomain (blog.fabse.net) and there was a redirect from the main domain. To secure this, I would have needed a certificate which would cover

*   fabse.net
*   www.fabse.net
*   blog.fabse.net 

Because of the non-standard subdomain “blog” you need either a wildcard certificate or a multi-domain certificate and as it turns out, both are quite expensive. The reasonable priced certificates will only secure a single domain with and without the www, so I had to move my blog.

This was a thing, I had planned anyway for a while. Because I want my blog to be only one part of my web site and this should be reflected in the URL as well. So long story short, the plan of action was:

*   move the blog from blog.fabse.net to fabse.net/blog
*   make sure, all old URLs still work
*   get a https certificate and make it the default 

Moving the blog was easy. I reconfigured the IIS web site binding, moved the wordpress code in a sub folder and changed the wordpress settings. It really took not more than 5 minutes.

Making sure all old URLs still work was the part I was most afraid of. I used URL rewriting in the IIS to issue permanent redirects for everything from blog.fabse.net/* to fabse.net/blog/*. This *HAS* to work, because otherwise I would loose all subscribed readers of the feed. And it does work, so everything is fine ![Smiley](https://az275061.vo.msecnd.net/blogmedia/2014/11/wlEmoticon-smile.png)

Getting the certificate was easy. For now, it is a 30-day free certificate from [psw.net](https://www.psw.net/ssl-zertifikate.cfm). I first wanted to make sure, everything works as expected before I order a real certificate. 

The real pain point is that a secure site is only allowed to load secure resources. I had to find and fix all occurrences of this issue.

To finalize the secure setup, I [configured](http://www.hass.de/content/setup-your-iis-ssl-perfect-forward-secrecy-and-tls-12) IIS to be even more secure including the use of forward secrecy and an URL redirect from http to https. The result is a very secure blog reading experience ![Smiley](https://az275061.vo.msecnd.net/blogmedia/2014/11/wlEmoticon-smile.png)

[![image](https://az275061.vo.msecnd.net/blogmedia/2014/11/image.png "image")](https://www.ssllabs.com/ssltest/analyze.html?d=fabse.net)