---
title: OData is like Linq over HTTP
tags:
  - .net
  - coding
  - Linq
  - XML
date: 2012-12-03T11:39:41.000Z
author: Fabian Wetzel
---

…and it is easy to setup as well! If you already have an Entity Framework DataContext in your solution, you just need to add a WCF Data Service:

![](120312_0939_ODataislike1.png)

In there, you have to do two easy steps:

*   Insert your DataContext type as the generic type inside the base class.
*   Apply AccessRules to entities you want to share.
That is everything you need to do to get the server running! Awesome!

You can now do standard HTTP request to query your service or you can do "add service reference" in your client app and get generated types as you are used to.

You can then do your Linq queries!

![](120312_0939_ODataislike2.png)

The shown query translates to this HTTP get request (broken in multiple lines for readability):
<pre>`http://localhost:51985/odataFuel.svc/FuelReadings()?
$filter=KmStand ge 33000 
&amp;$orderby=KmStand 
`&amp;$skip=0 
&amp;$top=1</pre>
It is easy to see the translated Linq parts inside the URL. This URL is testable through a web browser and returns readable xml:

![](120312_0939_ODataislike3.png)

If you setup write access on your server-side, you can also update the data! The data modification permissions are very fine-grained. You can configure it, to allow new inserts, but no updates or deletes for example:

Server:

![](120312_0939_ODataislike4.png)

Client:

![](120312_0939_ODataislike5.png)

Working with OData is easy and fun :-)


