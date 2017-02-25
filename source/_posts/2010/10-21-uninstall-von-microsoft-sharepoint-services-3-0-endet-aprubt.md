---
title: Uninstall von Microsoft SharePoint Services 3.0 endet aprubt
id: 487
tags:
  - coding
  - SharePoint
date: 2010-10-21T13:48:59.000Z
author: Fabian Wetzel
---

Man muss die SharePoint Services deinstallieren, bevor man den SharePoint Server installieren kann.

Bei mir endete dieses Uninstall sehr früh, aber auch ohne Fehlermeldung. Repair half nicht. Geholfen hat aber, im IIS alle SharePoint-Sites zu löschen, alle Application Pools zu löschen und auch im SQL Server alle SharePoint Datenbanken zu droppen. Jetzt läuft das Uninstall und ist auch schon fast durch.

Ursache ist wohl, dass das Entwicklungsimage, auf dem ich arbeite, durch Kopieren und Umbenennen entstanden ist, denn die alten App-Pools liefen auf ALTERRECHNERAdministrator, was dann wohl auch zu der IdentityNotMappedException führte, welche ich im Eventlog gesehen habe.

