---
title: Porting this famous blog to Windows Azure Websites (Part 3)
id: 1431
tags:
  - Azure
  - Cloud Computing
  - coding
  - DIY
date: 2012-06-19T00:51:05.000Z
author: Fabian Wetzel
---

Looks like it is done! ![Open-mouthed smile](https://az275061.vo.msecnd.net/blogmedia/2012/06/wlEmoticon-openmouthedsmile.png) Setting up a new Windows Azure Website is very easy. I selected an additional MySQL database und seconds later I could setup a deployment account. I could have copied everything over ftp from the last hosting provider and export+import the database and I would be done within minutes.

![fabsenet_dashboard](https://az275061.vo.msecnd.net/blogmedia/2012/06/fabsenet_dashboard.png "fabsenet_dashboard")

Instead, I copied my Wordpress installation without my pictures. I made a fresh setup and installed the [Azure Storage for Wordpress plugin](http://wordpress.org/support/plugin/windows-azure-storage). Inspired by [this blog post by Wade Wegner,](http://www.wadewegner.com/2011/08/using-windows-azure-blob-storage-and-cdn-with-wordpress/ "Using Windows Azure Blob Storage and CDN with WordPress") my goal was to serve all pictures with the Azure CDN. 

Next, I used the Wordpress import/export feature to recover all posts and comments. The wizard also tries to download all images and stores them in blob storage. My blog has roughly 800 pictures! 750 worked out of the box. Mostly older posts were problematic. I analyzed the exported Wordpress xml, was doing some direct db manipulations, edited articles and wrote two small tools along the way. Finding and fixing these last 50 images took the whole Sunday ![Sad smile](https://az275061.vo.msecnd.net/blogmedia/2012/06/wlEmoticon-sadsmile.png)

Today, the transfer of my domain finished and I suddenly turned into a half-time administrator setting up DNS records everywhere. The post about [custom domain names in Windows Azure by Steve Marx](http://blog.smarx.com/posts/custom-domain-names-in-windows-azure) was a good starting point. I wanted to use Google Apps for mail as well. The full article contains a list of used DNS setting at the end.

The biggest show-stopper for now is Azure Websites not supporting custom domain names for shared websites! I had to switch to reserved mode, which is not that cheap! 

![reserved_mode](https://az275061.vo.msecnd.net/blogmedia/2012/06/reserved_mode.png "reserved_mode")

I think, this will not be the end of the road for me, because the small instance is too powerful but also too expensive in the long run. The questions here are: Why is it not possible to use Extra Small Instances in reserved mode? And why is it impossible to set custom domain names in shared mode? It feels like an artificial limit to me.
<!--more-->

**Appendix:** Here is a small overview of my current DNS settings:

**fabse.net:     
**Redirects to blog.fabse.net (you must not use CNAME here, use redirection tools from your registrar or mail will not work)    
MX records for mail    
TXT entry for verification by Google Apps

**blog.fabse.net and ****www.fabse.net****:      
**CNAME: fabsenet.azurewebsites.net (running in reserved mode)

**static.fabse.net:     
**CNAME: az1230815.vo.msecnd.net (Azure CDN serving my blob storage account)

**some-given-guid.static.fabse.net:     
**CNAME: verify.azure.com (to verify the domain ownership against Azure CDN)

**mail.fabse.net:**    
CNAME: ghs.google.com (easy entry to Google Apps)
