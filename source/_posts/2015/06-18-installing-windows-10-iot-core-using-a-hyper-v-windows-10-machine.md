---
title: Installing Windows 10 IoT Core using a Hyper-V Windows 10 machine
id: 2143
comment: false
tags:
  - coding
  - DIY
  - IoT
  - Raspberry PI 2
date: 2015-06-18T19:45:33.000Z
author: Fabian Wetzel
subtitle: >-
  So I finally came around to play with my raspberry pi 2 a little bit and my
  first objective was to install Windows 10 IoT core on it
description: >-
  So I finally came around to play with my raspberry pi 2 a little bit and my
  first objective was to install Windows 10 IoT core on it
---

So I finally came around to play with my raspberry pi 2 a little bit and my first objective was to install Windows 10 IoT core on it. The full [getting started tutorial](https://ms-iot.github.io/content/en-US/win10/SetupRPI.htm) has all the needed steps written.

After registering and accepting the EULAs (important! you will simply not see the downloads otherwise!) I noticed the first obstacle for me. They require you to copy the data to sd card using a Windows 10 _**hardware** _machine. I have only one Windows 10 machine which is running in Hyper-V.

So I accepted the challenge :) [This article](https://www.raspberrypi.org/forums/viewtopic.php?f=105&amp;t=109160) suggested, it may at all be possible to copy the image to the sd card using Windows 7 or Windows 8.

I made a new folder on my Desktop PC (D:\win10-on-rpi) and extracted the flash image there (Flash.ffu). Then I copied some data from the Windows machine into this folder:

*   Dism.exe (from C:\Windows\System32)
*   DismApi.dll (from C:\Windows\System32)
*   All content inside C:\Windows\System32\Dism
Important is to copy the content from the Dism folder directly into folder and not into a subfolder. This is not intuitive, but works.

[![windows10-iot-raspberry-pi2-flash-folder](https://az275061.vo.msecnd.net/blogmedia/2015/06/windows10-iot-raspberry-pi2-flash-folder.png)](https://az275061.vo.msecnd.net/blogmedia/2015/06/windows10-iot-raspberry-pi2-flash-folder.png)

At this point I opened a powershell command prompt as an administrator and executed the Dism-command.
```
D:\win10-on-rpi&gt; ./dism.exe /Apply-Image /ImageFile:Flash.ffu /ApplyDrive:\\.\PhysicalDrive7 /SkipPlatformCheck
```
[![windows10-iot-raspberry-pi2-flash-folder-dism-completed](https://az275061.vo.msecnd.net/blogmedia/2015/06/windows10-iot-raspberry-pi2-flash-folder-dism-completed.png)](https://az275061.vo.msecnd.net/blogmedia/2015/06/windows10-iot-raspberry-pi2-flash-folder-dism-completed.png)

