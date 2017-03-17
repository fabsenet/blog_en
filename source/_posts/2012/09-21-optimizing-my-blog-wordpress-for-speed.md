---
title: Optimizing My Blog (Wordpress) For Speed
tags:
  - Azure
  - Performance
  - über diese Seite
date: 2012-09-21T14:20:55.000Z
author: Fabian Wetzel
---

Lately, I have done some major changes regarding the hosting of my blog. All of this started with the intention to get more inside knowledge in Windows Azure. I moved to Azure Websites and then I moved to self-host the blog inside an Azure VM.

After the last migration, I had a short look at the network response times of my blog and it was terribly slow! The default page took 2 – 3 seconds to load.

![chrome_timings](chrome_timings.png "chrome_timings")

My first idea was related to bad default settings of my hosting environment. I configured PHP to cache compiled files – nothing changed. I changed the application pool to not load .Net stuff and to never shutdown based on idle times – no change! Trying other settings all over the place yielded no effect either. So it looks like my hosting is not the cause of the bad performance.

I started to google about Wordpress performance and got interesting results. It turns out the default Wordpress install is just slow! I decided to use the plugin wp-super-cache. After installation I started to pregenerate all pages. This feature caches the complete page output in the filesystem. In my case this was roughly 600 files / 5mb. This makes everything lightning fast:

![chrome_timings_cached](chrome_timings_cached.png "chrome_timings_cached")

I could have stopped here but at this point, [Google Page Speed](https://developers.google.com/speed/pagespeed/insights) was already my new friend! It told me to add cache headers to improve performance. For local Wordpress files, I configured IIS to do this. The tricky part was doing the same for the image files hosted in Azure Blob Storage. Turns out you can do this via modifying blob metadata. Nearly all ressources of my blog are now cachable.

The next and last point for now was to optimize the image files. Google told me to use lossless compression of png files to save storage. [PNGOUT](http://advsys.net/ken/util/pngout.htm) is a nice little tool which optimizes the image filesize of pngs without changing any pixels. I used it to optimize all images. This save up to 50% in some instances!

The current version of my page gets a score of 86 (out of 100). Starting from 72, this is a nice improvement.


