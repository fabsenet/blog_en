---
title: 'Using Windows Azure Compute to host a proxy [Sunday project]'
tags:
  - Azure
  - Sunday Project
date: 2012-03-19T01:20:21.000Z
author: Fabian Wetzel
---

If you are following my blog for some time or you hear me talking in person, you know that my ISP (or only my specific internet connection) is fast, but I just am not able to watch youtube without waiting forever. I was playing around with some proxies in the past and the new task for this Sunday is to prepare a Windows Azure app hosting a proxy server for me. This blogpost does not point out the shortest way to do it but the steps I took to solve my task.

I started with installing Windows 8 Consumer preview into a virtual machine. I then installed Visual Studio 11 beta. Using the web plattform installer, I installed the Windows Azure SDK:

![image](image62.png "image")

and it fails:

![image](image63.png "image")

Google to the rescue: <!--more-->There is a way, you can [install all of it manually](http://www.windowsazure.com/en-us/develop/net/other-resources/windows-azure-on-windows-8/). Yeah! Only half an hour later:
> Visual Studio 11 does not yet support the Windows Azure SDK for .NET.
So I switched back to my Visual Studio 2010 on Vista and created a new project:

![image](image64.png "image")

and I added a Web Role:

![image](image65.png "image")

The idea at this point is to have a working squid installation inside the web project and starting it using a startup task. I created a new folder called Squid:

![image](image66.png "image")

I downloaded and extracted a windows binary version of squid 2.7 into a subfolder of my new squid folder. There are [some install and configuration steps](http://squid.acmeconsulting.it/Squid27.html). I am going to do the configuration part within the downloaded stuff but I need to create a small commandline script to do the install part.

My folder looks now like so:

![image](image67.png "image")

And my startup script is:

![image](image68.png "image")

The squid.conf file is well documented but also very large. Here is an excerpt of my changes to the file:
> acl authenticated_users proxy_auth REQUIRED
It creates a access control list with the name authenticaded_users which are somehow authenticated.
> http_access allow authenticated_users
> http_access deny all
This tells squid to allow an authenticated user everything and all other can do nothing. My idea here is to create a proxy just for known users (…me) and not a public proxy.
> auth_param negotiate program C:/squid/libexec/mswin_negotiate_auth.exe
> auth_param negotiate children 5
> auth_param negotiate keep_alive on
And finally I am telling squid to authenticate users against known windows users.

So I need to add a line to my startup script to add a new windows user account:
> net user fabse superLongAndSecretPassword /ADD
I think, Squid is now completely configured and ready to go. I need to add my install batch as a startup task and I need to make the inbound port for squid accessible from the outside. This is done in the ServiceDefinition.csdef:

![image](image69.png "image")

I am feeling lucky and are now going to deploy it in Windows Azure!

![image](image70.png "image")

The first time you need to setup your certificate:

![image](image71.png "image")

You create a certificate, give it a name and you need to upload it into your windows azure subscription.

![image](image72.png "image")

I am creating a new service:

![image](image73.png "image")

After this certificate-setup-trouble I am finally able to configure my publish settings:

![image](image74.png "image")

I think, I will need to have remote desktop access:

![image](image75.png "image")

Next and Publish! … and it failed ![Smile](wlEmoticon-smile2.png)

There is some trouble with my startup task. I have to change the command to:
> &lt;Task commandLine="Squid/InstallAndStartSquid.cmd" executionContext="elevated" taskType="background" /&gt;
The path was wrong and the publishing tool is verifying the path. I also had to change the batch script file-properties to “Copy always”. The script itself is now in another location as the squid source so I added a first step inside the script to change the directory:
> cd ....Squid
Please note as well that I changed the taskType to background. This change enables me to RDP into the role instance even if my task needs very long, fails or blocks.

**Ok Publish!** It is busy now, should take around 15 minutes to completion.

and it failed…completely! It did not copy squid, it did not created the user account. I reproduced the execution on the target compute instance:

![image](image76.png "image")

The pathes are wrong! I was thinking the current path is in the Squid folder, were the batch file is, but is one folder up so I need to remove one “up” command. The second one is really obvious. My super long password is too long. Doooh!

Fixing these two small bugs and publish! The Publish wizzard notices that the current stage ist already running. I want to replace it. In real environments you would deploy to a staging instance in this case. it was some kind of inplace update. It is using the exact same compute instance without rebooting.

The user is there, squid was copied, the service is there but it is not running. Not all files of the squid distribution made it into the deployment package. It is just not handy to have a full app as solution files inside a Visual Studio solution. I am going to removal all project files and replace them with a zip archive.

My solution folder holds now a zip archive and the command line version of 7zip:

![image](image77.png "image")

I removed the xcopy step in my batch file and replaced it with:
> 7z x -oc: squid.zip
**aaaaannddd Publish!** (I deleted the old deployment to get a fresh machine)

Everything is there and running but it does not work. So I RDPed into the compute instance again. I configured the IE on the server to use the proxy and it worked! So the problem could be the endpoint. I configured it as a TCP endpoint but I am now going to try HTTP. Quick change and **Publish!**

Ok so there are two new problems: negotiate authentication is not really good working and I cannot bind squid to listen to a wildcard ip address.

Squid is able to handle multiple authentications methods, but all have their own pitfalls:

*   Basic: I can get it working, but it transmits the password in cleartext over the wire and is therefor insecure
*   NTLM: Old. I did not tried it.
*   Negotiate: Newer. Works somehow, but it the browser tries to add a domain to the user all the time.
*   Digest: Improved version of basic, which does not transmit cleartext passwords over the wire.
I decided to use Basic authentication for now and I am going to make a follow up project trying to establish a secure https connection between the browser and the proxy.

![image](image78.png "image")

The second problem is that Azure does not allow wildcard IP addresses. I do not understand why this is the case, but nevertheless I need to workaround it. I removed the simple wildcard config “http_port 3128” and replaced it with an include statement:
> include c:/squid/http_port.config
Now I need to have a way to create this config file. I borrowed some source from [Steve Marx](http://blog.smarx.com/posts/tutorial-running-the-mongoose-web-server-in-windows-azure) and inserted them into my ServiceDefinition.csdef:

![image](image79.png "image")

This will (hopefully) provide the IP and port of my instance as an environment variable. The following command creates the needed config include file:
> echo http_port %ADDRESS%:%PORT% &gt; c:squidhttp_port.config
So I included it in my startup batch script. **Delete and Publish!**

It did not work, because the environment variables were not existing. I noticed the possibility to provide environment variables directly to the startup task:

![image](image80.png "image")

**Delete and Publish (again)!**

I could not connect to the instance using any method. I thought something went very wrong. So I deleted and published again! Same result. Looks like my ISP decided that this DNS name changes its address too often and blocked it completely(?). I changed my PC to the use the Google DNS 8.8.8.8 instead and I could connect again.

There is somehow an issue with the Windows Firewall on the server. This is the one last step to take to get this thing working. I need to investigate it and make everything work in a way which not requires me to shutdown the firewall completely. But this really needs to wait now, as it is not even Sunday anymore ![Winking smile](wlEmoticon-winkingsmile6.png)

But I was curious at last and measured the network bandwich and making a real world test watching a video on youtube. Both were terrible slow ![Sad smile](wlEmoticon-sadsmile.png) Maybe I should switch to an Azure data center in Europe?

_This blog entry is getting really long anyway, I think no one will ever read it. But nevertheless I am publishing it. It will be at least a (good) reference for myself._


