---
title: Reconfiguring Raid From Savety To Speed
tags:
  - DIY
  - My Setup
  - Raid
date: 2013-10-28T11:30:30.000Z
author: Fabian Wetzel
---

I was investing in a [Synology DS214](http://www.amazon.de/gp/product/B00FWX3UNE/ref=as_li_ss_tl?ie=UTF8&amp;camp=1638&amp;creative=19454&amp;creativeASIN=B00FWX3UNE&amp;linkCode=as2&amp;tag=fabsenetfabse-21) lately and put all my valuable data there in a Synology Hybrid Raid and configured a cloud backup for this, so my Raid 5 on my desktop PC was free of stuff and I started to use it to store uncompressed video. While you may noticed my video tutorials, I also do randomly “lets plays” or “watch me play” of whatever game there is. Which is Starcraft 2 most of the time.

I record this videos uncompressed which yields roughly 100GB per hour of gameplay. Before I upload this to YouTube, I compress this using MP4 to 2GB per hour. This is a time consuming process and I noticed, it is limited by the read speed of my drive rather than the CPU or GPU.

I started measuring and got this:
![raid 5 read (3x500gb drives)](raid5read3x500gbdrives.png "raid 5 read (3x500gb drives)")

The configuration at the starting point is a Raid 5 consisting of 3 drives with 500GB each from 2006(!). They are by no means the fastest anymore but the blue line does not show the right form for a drive with spinning disks. So I installed the newest Intel Storage Matrix Driver and measured again the exact same Raid 5:
![raid 5 read (3x500gb drives) new driver](raid5read3x500gbdrivesnewdriver.png "raid 5 read (3x500gb drives) new driver") 

This was already an impressive gain so far for only investing 10 minutes :-)

My video recordings are not meant to stay there forever. I record them and I compress them and at this point, I upload the compressed version to YouTube and I store a copy on my NAS. So there is no point for the added data security of a Raid 5 if I only use it for temporary data. So I deleted the Raid 5 and made a Raid 0 configuration with the same 3 drives:
![raid 0 read (3x500gb drives) new driver](raid0read3x500gbdrivesnewdriver.png "raid 0 read (3x500gb drives) new driver") 

Impressive! I could now use 1500GB instead of only 1000GB to store video data and the speed was much faster. I had another 500GB drive laying around, doing nothing, so I figured, why not adding it to the raid as well. So I added it to the system and expanded the Raid to 4 drives:
![raid 0 read (4x500gb drives) new driver](raid0read4x500gbdrivesnewdriver.png "raid 0 read (4x500gb drives) new driver")

The avarage read speed increased another 10MB/s. This is not as much as I would liked but the drive would otherwise do nothing, so why not leave it that way and I still have the added storage space.

Just for comparison, I measured my system disk (SSD) and another newer WD Red 3TB as well:
[![samsung ssd 830 256gb single drive](samsungssd830256gbsingledrive_thumb.png "samsung ssd 830 256gb single drive")](samsungssd830256gbsingledrive.png) [![wd red 3tb single drive](wdred3tbsingledrive_thumb.png "wd red 3tb single drive")](wdred3tbsingledrive.png) 

So even considering sequential reads, the SSD is clearly outperforming all of my other drives:
![image](image.png "image")  

So I think, I did the best to increase performance for my use case without buying new stuff.

But remember to think about data safety, if you do this on your hardware! On Raid 5, one drive can fail and all your data are still there. On Raid 0, all your data are gone when (not if!) the first drive fails.


