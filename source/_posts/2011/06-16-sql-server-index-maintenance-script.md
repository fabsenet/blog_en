---
title: SQL Server Index Maintenance Script
tags:
  - im Netz gefunden
  - SQL Server
date: 2011-06-16T10:37:03.000Z
author: Fabian Wetzel
---

Ich habe ein Script gesucht, was möglichst intelligent die Struktur der Indexe und ihren Fragmentierungsgrad auswertet. Auf Grund dieser Auswertung soll es entscheiden, ob es einen Rebuild oder ein Reorganize macht oder halt einfach nichts.

Genau das tut das Script auf [http://ola.hallengren.com/](http://ola.hallengren.com/ "http://ola.hallengren.com/")

Nachdem man die Stored Procedure bei sich eingerichtet hat, genügt ein Aufruf von
  <pre>dbo.IndexOptimize 'MeineDatenbank'</pre>

Ich kann das Script wärmstens empfehlen und der Blogeintrag ist auch so eine Art Referenz für mich ![Smiley](wlEmoticon-smile.png)


