---
title: .Net RIA Services – kurz erklärt
id: 394
tags:
  - .net
  - 'C#'
  - coding
date: 2009-07-27T09:59:34.000Z
author: Fabian Wetzel
---

[![image](https://az275061.vo.msecnd.net/blogmedia/2009/07/image-thumb9.png "image")](https://az275061.vo.msecnd.net/blogmedia/2009/07/image24.png) 

Ich hab mich etwas mit den .Net RIA Services beschäftigt und möchte nun einen groben Überblick geben. Wir stellen uns also eine 3-Schichten Architektur vor, bestehend aus Silverlight 3, ASP.net und einem quasi beliebigem Data Access Layer.

Der Data Access Layer erzeugt aus einer Datenbank Objekte, welche nun in der mittleren Schicht sind (im Bild “Order”) und bietet auch die Standard CRUD-Funktionalität. In der Regel kann man diese Objekte nicht ohne weiteres an den Client übergeben.

Hier kommen nun die .Net RIA Services ins Spiel und generieren in der Silverlight-Applikation eine identische Klasse und ein asynchrones Kontextobjekt, um mit der Serviceschicht zu interagieren.

Alles was man noch tun muss, ist in der Mittelschicht eine Serviceklasse zu schreiben, die alle Funktionen zur Verfügung stellt, die der Client nutzen können soll. Dies können die normalen CRUD-Operationen sein, spezielle Servicemethoden, die mit den Objekten interagieren oder ganz allgemein beliebige Funktionen.

Reichert man die Klassen durch Metadaten an, bekommt man die Validierung der Daten auf beiden Schichten “fast geschenkt”:

[Range(0, 120, ErrorMessage = &quot;Sprechende Fehlermeldung!&quot;)]   
public int? Age { get; set; }

Hat man dies z.B. so bei einer Person definiert, wird der Nutzer bereits beim Eingeben der Daten auf dem Client mit einer sprechenden Fehlermeldung auf seinen Fehler hingewiesen. Zusätzlich wird aber auch auf der Mittelschicht eine erneute Validierung der Daten vorgenommen. Dies ist eine sehr schöne Ausprägung des [DRY-Prinzips](http://www.clean-code-developer.de/wiki/CcdRoterGrad#DontRepeatYourselfDRY "Don&#39;t Repeat Yourself").

Außerdem werden alle Dateien mit dem Dateinamen *.shared.cs oder *.shared.vb in den Client kopiert, was Shared Code ermöglicht. Dies kann man nutzen, um generierte Properties anzulegen.

Das Ganze erleichtert den Entwicklungsprozess von viel langweiliger Arbeit und gibt einem mehr Zeit, für die wesentlichen Aspekte!

Weiterführende Links:

[Präsentation auf der Mix09](http://videos.visitmix.com/MIX09/T40F)

[Download von Setup und Dokumentation](http://www.microsoft.com/downloads/details.aspx?FamilyID=76bb3a07-3846-4564-b0c3-27972bcaabce&amp;displaylang=en)

