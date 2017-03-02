---
title: 'Windows 8: Huge delay after logging in'
tags:
  - DIY
  - Look Inside
  - Windows 8
date: 2013-01-17T11:46:23.000Z
author: Fabian Wetzel
---

I read Scot Hanselmans blogpost "[The Internet is not a black box. Look inside. ](http://www.hanselman.com/blog/TheInternetIsNotABlackBoxLookInside.aspx)". I remembered the article while waiting like forever today while starting my windows 8 machine. After doing my picture password login, the machine waits like 2 minutes doing nothing and then I get to finally see my desktop. I started googling and there seems to be many root causes for this problem. I tried some, but nothing worked so far.

I wanted to solve this problem professionally and so I started to search for a boot tracing tool. I found xperf and xperfview which are working Windows 8 but the analysis was not that enlightened. The graphics show no CPU or IO usage for roughly 120 seconds. This phase is called "winlogon init". Then I found an inspiring blog from a [Microsoft Dude about Windows Performance Analyzer](http://blogs.technet.com/b/jeff_stokes/archive/2012/06/29/what-is-windows-performance-analyzer-all-about-and-why-should-you-use-it-instead-of-xperfview.aspx). I decided to give it a try. [Download the Assessment and Deployment Kit](http://www.microsoft.com/de-de/download/details.aspx?id=30652) and make sure to select only the performance toolkit:

![](https://az275061.vo.msecnd.net/blogmedia/2013/01/011713_1011_Windows8Hug1.png)

The next step is to open the Windows Performance Recorder (=Windows-Leistungsaufzeichung) and to select the Start-Szenario. I selected a bunch of other profiles as well and I am not sure about some, so your mileage may vary!

![](https://az275061.vo.msecnd.net/blogmedia/2013/01/011713_1011_Windows8Hug2.png)

When you press start, the system enabled the boot-tracing and restarts. After restarting, it finishes the tracing, disables itself and you have huge trace file: ![](https://az275061.vo.msecnd.net/blogmedia/2013/01/011713_1011_Windows8Hug3.png)

I opened this file in the Windows Performance Analyzer (takes some minutes as well) and the result is very impressive:

![](https://az275061.vo.msecnd.net/blogmedia/2013/01/011713_1011_Windows8Hug4.png)

To get to this picture above:

*   I double clicked the "System Activity" graph in the top left
*   I selected the time, which I think, is the time, where my notebooks just waits.
*   I enabled the table data view through the small control on the top right corner
*   And Finally, I ordered by start time ascending
"But wait, there is more" … clicking the small icon left of System Activity reveals much more diagrams. Looks like this article is only some kind of "I can only show you the door"-article <span style="font-family: Wingdings;">J</span>

![](https://az275061.vo.msecnd.net/blogmedia/2013/01/011713_1011_Windows8Hug5.png)

…so maybe my problem is related to "Subscriber: Profiles"?

At this point I was completely lost in all these data. I uploaded the trace and asked [Jeff](http://blogs.technet.com/b/jeff_stokes/) kindly to take a look. He was very helpful, suggesting to disable the SSDP service (because it is a domain joined machine) and a BIOS update. In the meantime I also removed all virtual network stuff from the Windows Phone 8 emulator (just a wild guess).

Finally my machine logs in without waiting and I hope it stay that way. Thanks Jeff!


