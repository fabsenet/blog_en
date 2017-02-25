---
title: Porting this famous blog to Windows Azure Websites (Part 2)
id: 682
tags:
  - Azure
  - coding
  - über diese Seite
date: 2012-06-10T20:33:02.000Z
author: Fabian Wetzel
---

While waiting for my Website preview access, I decided to move all pictures and media to the Blob Storage. My idea is to deliver them through the Azure CDN. [This blog post](http://www.wadewegner.com/2011/08/using-windows-azure-blob-storage-and-cdn-with-wordpress/) gives a good overview of the action to take.

Creating the storage account is easy and straight forward. Creating the CDN account as well. But using my own domain name to “hide” the CDN stuff does not work so far. I need to setup domain settings (CNAME) my current hoster does not allow me to.

So I guess I have to move my domain first.
