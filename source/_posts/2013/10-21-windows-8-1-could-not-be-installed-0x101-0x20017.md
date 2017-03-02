---
title: Windows 8.1 could not be installed (0x101 - 0x20017)
tags:
  - DIY
  - Truecrypt
  - Windows 8.1
date: 2013-10-21T22:07:03.000Z
author: Fabian Wetzel
---

I installed Windows 8.1 (Enterprise) as an update on my corporate notebook and was greeted with this error after the first reboot in the install process:![Windows 8.1 could not be installed (0x101 - 0x20017)](https://az275061.vo.msecnd.net/blogmedia/2013/10/Windows-8.1-could-not-be-installed-0x101-0x20017.jpg "Windows 8.1 could not be installed (0x101 - 0x20017)")

Then it reboots again and you are back to your Windows 8 without the dot one!

I have a full encrypted system partition using TrueCrypt and this was the problem in my case. I took a wild guess on this and decrypted the drive. Then I updated to Windows 8.1 and this time it worked flawlessly. After the update I encrypted the drive again.

Issue solved :-)


