---
author: Fabian Wetzel
title: Moving to IPv6 and HTTP/2 on azure
subtitle: I finally migrated to Windows Server 2016, HTTP/2 and IPv6 on an azure virtual machine
description: I finally migrated to Windows Server 2016, HTTP/2 and IPv6 on an azure virtual machine. Continue reading this in my blog.
date: 2017-07-28 20:23:30
tags:
  - About This Page
  - IPv6
  - HTTP2
  - Azure
cover: /img/portugal_baum/2500.jpg
coversrcset:
 - /img/portugal_baum/250.jpg 250w
 - /img/portugal_baum/500.jpg 500w
 - /img/portugal_baum/1000.jpg 1000w
 - /img/portugal_baum/1500.jpg 1500w
 - /img/portugal_baum/2500.jpg 2500w
---

# What is the motivation?

I obviously like to fiddle around with the technology of my blog far more than to actually write articles, so lets do that! I want to have HTTP/2 to serve multiple content files in a single connection and therefor speed up the page load. This is only available (at least for IIS) on Windows Server 2016. Until recently, this blog was hosted on Windows Server 2012, so I had to migrate it.

I was also listening to a [podcast about IPv6 on Chaos Radio Express  (German)](https://cre.fm/cre197-ipv6) some time ago. The podcast is old, but far from beeing outdated! This helped me to develop the wish for hosting my blog over IPv6 as well.

## Why do I need HTTP/2?

Well, I don't! But I want it. It is the next version of the protocol the web is living on and this blog is also a playground for me to learn new things.

## Why do I need IPv6?

Well, I don't as well! The thing is, IPv4 addresses are limited and for example some mobile companies already started to only provide IPv6 addresses to their customers. If you are in this case, you have to go through a 6-to-4-gateway to access the "old" internet. I just want to allow direct access in such cases. I also want to learn, so dual-stack accessibility over IPv4 and IPv6 it is! 

# Doing the migration

So I need a Windows Server 2016 for HTTP/2 and I need to have an IPv6 address for it. Sounds easy, does it?

## Azure supports IPv6, or not? Maybe?

I was fiddling in the azure portal longer than I want to admit and I tried many different things. For example: You can add a public IP address, you can select IPv6 for it, but then, you can no longer associate this IP address to a virtual machine. You can only associate it to a load balancer. But as far as I know it is not possible to link a load balancer to an existing virtual machine using IPv6.

I was frustrated and everything I tried left me with a 5 minute waiting time, while azure was setting up the machine.

Long story short - and to save you the time that I had to invest in this: You **have** to use [a deployment template](https://docs.microsoft.com/de-de/azure/load-balancer/load-balancer-ipv6-internet-template) to get IPv6 support. This template creates 2 virtual machines behind a load balancer and is set-up in a way to support public IPv4 *and* public IPv6. I have done two changes to the script:

 - I changed `NumberOfInstances` to `1` ([here](https://github.com/Azure/azure-quickstart-templates/blob/796dd9005786f1ecae123dbfc2d73f137a19a704/201-load-balancer-ipv6-create/azuredeploy.json#L40))
 - I changed the used image of the virtual machine to `2016-Datacenter` ([here](https://github.com/Azure/azure-quickstart-templates/blob/796dd9005786f1ecae123dbfc2d73f137a19a704/201-load-balancer-ipv6-create/azuredeploy.json#L305))

If you do not change the number of instances, you can simply delete the other machine later. But if you miss to change the used operating system (It was Server 2012), you are basically stuck and have to start over (I had to in the first run).

# Remainig migration

... is nothing special. I moved all assets, setup IIS for all web sites, configured the web server to get at least an [`A` rating on SslLabs](https://www.ssllabs.com/ssltest/analyze.html?d=fabse.net) and tested it.

I wanted to test the new server without actually switching over just yet. I changed my local hosts file for this. This allowed me to use the browser and Fiddler to access my site as normal but actually getting results from the new server. Quite handy!

After everything was tested and considered working, I changed the DNS settings of my domain to point to the new server and added the new AAAA record as well for IPv6.

# Tips and tricks

## How to open a web site using its IPv6 address

You can put a *normal* IP address in the address bar of your web browser and it will happily connect to this server and ask it for content:

```txt
52.233.241.170
```

 If you do the same thing with an IPv6 address, it just searches it on google or whatever search engine you are using. The trick here is, you must write square brackets around the address for it to work:

```txt
http://[2603:1020:201:a:0:0:0:198]
```

## When it still does not work

I was trying to access the IPv6 address directly and it failed and I was wondering why. I was trying to fiddle with the firewall on the server and everything but then it dawned on me. I was on a classic IPv4-only network. While it is also possible to have a 4-to-6-gateway, no one is doing this or at least, it is not done in my case. Because - at least for now - everyone is either hosting on IPv4 or is dual-hosting like me. The minute I was on a network with IPv6 connectivity, it started to work.

Also worth noting: I was directly accessing the IPv6 address in this case. If you access this blog over its domain name, the browser is doing a DNS lookup and gets both adresses. Then it is smart enough to know, whether it should use IPv4 or IPv6.

# Whats next?

I would love to fiddle around with server push. This is a feature of HTTP/2 to send an asset to the client even before he asked about it. The server is *pushing* the content. I am not sure, IIS supports it or anything, but I would love to play with it. But not today at least!