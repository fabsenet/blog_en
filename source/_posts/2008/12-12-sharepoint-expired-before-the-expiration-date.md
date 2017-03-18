---
title: SharePoint expired before the expiration date?
tags:
  - BDC
  - SharePoint
date: 2008-12-12T15:24:41.000Z
author: Fabian Wetzel
---

I am using [this Virtual PC-Image](http://www.microsoft.com/downloads/details.aspx?familyid=DD939ED9-87A5-4C13-B212-A922CC02B469&amp;displaylang=en) and while changing the view of a BDC list I got the following error:

**"The evaluation version of Microsoft Office SharePoint Server 2007 for this server has expired."**

But it should work at least until April 2009! ([source](http://hermes.tc/Microsoft-Dynamcis-CRM/Dynamics-CRM-4.0-VPC-verfuegbar.html), [source's source](http://www.microsoft.com/downloads/details.aspx?familyid=DD939ED9-87A5-4C13-B212-A922CC02B469&amp;displaylang=en)).

It looks like the error message is wrong. Basically it tries to tell you that the used identity for the application pool [should be in the administrators group](http://hermansberghem.blogspot.com/2006/10/trial-period-has-expired-even-with.html). _Isn't that obvious???_


