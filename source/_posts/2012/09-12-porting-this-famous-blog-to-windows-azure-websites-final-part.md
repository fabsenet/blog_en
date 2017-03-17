---
title: Porting this famous blog to Windows Azure Websites (Final Part)
tags:
  - Azure
  - DIY
  - über diese Seite
date: 2012-09-12T21:02:39.000Z
author: Fabian Wetzel
---

The final part is actually leaving Azure Websites :-(

The service is really good and works as expected but there is one single problem. I want to host my blog under my own domain ( blog.fabse.net ). This feature is supported by Azure Websites but you have to use reserved instances for this. The minimum size for reserved instances is small! So my feature request is not cheap:

![small_vm_pricing](small_vm_pricing.png "small_vm_pricing")

While I was happy with the service, I was not happy with the price tag. I decided to use an Azure VM instead. This way I can have much more possibilities/features for the same amount of money or less through using extra small instances.

The migration was close to a 3-step task.

1.  Using the web platform installer to install PHP and MySQL (my blog software is Wordpress)
2.  Using the MySQL workbench to migrate the database (apparently the workbench has problems running on server 2012 or an Azure VM in generel (?) … I worked around this through running it on my local machine)
3.  Copying the website data via ftp and creating a new website inside IIS pointing towards it. Wordpress comes with a working web.config. Do not forget to change the database details. 

After verifying the resulting install, I changed the DNS configuration of my domain and disabled the Azure Website.

The Azure VMs are available as extra small instances, so using them over Websites saves money:

![extra_small_virtual_machine_price](extra_small_virtual_machine_price.png "extra_small_virtual_machine_price")

I basically switched from PaaS to IaaS. I got full control over the virtual machine at the cost of doing all the administration stuff myself (security, updates, backups, …)


