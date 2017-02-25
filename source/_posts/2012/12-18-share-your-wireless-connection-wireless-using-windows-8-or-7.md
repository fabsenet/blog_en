---
title: Share your wireless connection wireless using Windows 8 (or 7)
id: 1912
tags:
  - im Netz gefunden
  - Notebook
  - Windows 8
date: 2012-12-18T00:00:35.000Z
author: Fabian Wetzel
---

So I think everyone knows how to connect his notebook to the next router to get online. That is of course the easy part.

Back in the old days, it was normal to share network connectivity between PCs at home – at least at my home. I used to have one PC with an ISDN card working as a router sharing the internet connection for all other PCs. This was all wired.

You may think it is possible to use a PC with a wireless network card to produce its own wireless network instead of joining an existing one. And you would be right!

The best part of the story is the virtualized wireless connection in newer Windows operating systems. It allows you to connect to a wireless network while providing your own at the same time with only a single real piece of hardware.

This is the future ;-) …why should anyone do that, you ask? You may have more devices than allowed connections in the "primary" wireless network. For example a limited guest account at a client project or a hotel and you have some phones and ipads to sync… I think you get it.

It's done in an elevated command prompt:

    netsh wlan set hostednetwork mode=allow ssid=myssid key=password
    netsh wlan start hostednetwork

and at last you have to enable connection sharing between the networks. You may want to take a look at my [pictured source](http://www.windows7hacker.com/index.php/2012/06/how-to-turn-your-windows-8-computer-into-a-wireless-hotspot-access-point/).

