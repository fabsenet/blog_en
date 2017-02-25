---
title: Building a RAID 0 with 2 SSD Drives (and showing off)
id: 2135
comment: false
tags:
  - Allgemein
  - Backup
  - DIY
  - home improvement
date: 2015-06-09T21:25:18.000Z
author: Fabian Wetzel
---

My desktop PC at home is utilizing a 256GB SSD as its system drive for quite some time now and I enjoyed it. I measured the speed of it using HD Tune:![SAMSUNG_SSD_830_Series](https://az275061.vo.msecnd.net/blogmedia/2015/06/SAMSUNG_SSD_830_Series.png)
In the past, I had used another SSD of the same size for a fast external USB 3 drive to host a virtual machine but I did not needed the VM anymore and so the drive was unused now. I installed it into my PC as an internal drive and measured its speed (of course!):

![Samsung_SSD_840_EVO_250G](https://az275061.vo.msecnd.net/blogmedia/2015/06/Samsung_SSD_840_EVO_250G.png)
Next thing was backing up the complete system drive to network storage.Before I actually deleted the data from the first drive, I tried a full restore to the second drive, which took some time but worked well.

Then I felt comfortable enough to go ahead and to setup a RAID 0 with both drives. This was the time, were I noticed my first SSD was not connected to the Intel RAID chipset but to the secondary SATA chip on my board. A Marvel-something. I switched some drives around until I had both SSDs connected to the RAID chipset. Setting up a RAID 0 is straightforward. Next thing was doing the restore and resize of the system partition to the new RAID volume. And I measured it again:

![Raid_0 (Samsung 930+940)](https://az275061.vo.msecnd.net/blogmedia/2015/06/Raid_0-Samsung-930-940.png)
This measured speed looks very impressive and it is significantly higher than the speed of both single drives combined. It may has to do with me using the Marvel chipset in the first measurement. Maybe the INTEL chipset is doing some performance magic on the cover as well? I do not know and I frankly do not care.

For what it's worth, the actual perceived performance gain compared to a single SSD drive is next to nothing but it is definitely not slower than before and the system partition has now much more free space than before. The additional free space without partition/drive borders in between it is the real gain here for me.
