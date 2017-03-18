---
title: 'Silent Install Of Firefox [Windows Azure Compute]'
tags:
  - Azure
  - Cloud Computing
  - Install
date: 2012-03-24T13:39:30.000Z
author: Fabian Wetzel
---

While developing in Windows Azure I am RDP-ing into the roles from time to time. It is quite handy to be able to browse the web from there as well. I decided to let my roles download and install Firefox on every publish. Here is how I did it:

I downloaded the [Windows Azure Bootstrapper](http://bootstrap.codeplex.com/) and put it into my solution (type content, copy if newer):

![image](image81.png "image")

The second and last step was adding the following startup-task to my ServiceDefinition.csdef:
```xml
<Task commandLine="StartupBinsBootStrapper.exe -lr c:Resourcesfirefoxsetup.exe -get http://download.mozilla.org/?product=firefox-11.0 -run c:Resourcesfirefoxsetup.exe -Args /S" executionContext="elevated" taskType ="background" />
```

It downloads the current Firefox version to `c:\Resources` and executes the silent install.

**Publish!** _Works! ![Smile](wlEmoticon-smile4.png)_


