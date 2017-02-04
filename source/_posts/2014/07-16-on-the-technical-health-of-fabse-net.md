---
title: On The Technical Health Of Fabse.Net
id: 2087
comment: false
tags:
  - About This Page
  - Availability
  - Azure
date: 2014-07-16 08:33:20
---

As some of you noticed, my blog was not available for about a day. There were actually two unrelated issues in a row affecting the availability of my blog.

The first one was related to Windows Update on my VM. There was some updating done but there was an outstanding restart. This somehow broke the connectivity between WordPress and MySQL. I am using WP Super Cache as a plugin for WordPress to cache all pages locally and so this database issue was going unnoticedd to most users except the Googlebot. It looks like requesting the robots.txt is not cached at all by WordPress. Google Webmaster Tools was sending emails to me notifying me about the issue of not being able to access the robots.txt file and postponing the indexing. At this point I simply restarted the virtual machine and it worked again. _Have you tried turning it off and back on again?_

My blog runs on a small VM in Microsoft Azure and the Azure storage in West Europe had a reduced availability yesterday affecting the VMs as well. Whatever reduced availability means. As a matter of fact, my VM was listed as running, but I could neither access my site nor could I RDP into it.

Microsoft requires at least two running VM instances in an availability set for their SLA to kick in. I am running only a single one to safe money. So I think it was actually my own fault/risk.

Regarding the near feature, I want to look into increasing the availability while reducing costs at the same time. I will definitely write about it here.