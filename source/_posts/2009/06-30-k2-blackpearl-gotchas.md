---
title: K2 Blackpearl Gotchas
id: 388
tags:
  - coding
  - Erfahrungen
  - 'K2 [Blackpearl]'
date: 2009-06-30T14:57:24.000Z
author: Fabian Wetzel
---

Hier mal einige Erfahrungswerte aus der Entwicklung mit K2 Blackpearl in ungeordneter Reihenfolge:

*   SmartObjects sind innerhalb von K2 und den Designern typisiert, will man aber über Code darauf zugreifen, wird jede Eigenschaft als String übergeben. Hierbei wird die auf dem Server eingestellte Kultur genutzt. Deshalb muss man bei Dezimalzahlen darauf achten, wenn man mit diesen weiter rechnen will.*   Fast alle Namen im K2-Umfeld (SmartObjects selbst, ihre Methodennamen sowie Ihre Eigenschaften, …) haben einen technischen Namen und einen Display-Name. In allen Tools wird der Display-Name angezeigt, für eigenen Code benötigt man aber den technischen Namen.*   Der Change-Compile-Deploy-Test-Zyklus ist lang. Hier hab ich zwei Ansätze: Während der Entwicklung an einer Stelle den Folie auf die ProcessID setzen und dann auf Asynchron schalten. Dann von extern (z.B. Konsolenapplikation) die Prozess-Instanz holen und damit rumhantieren und erst wenn der Code das tut, was er soll, wird er in das Server-Event kopiert. die zweite Variante ist, Server-Events klein zu halten, in dem aus ihnen nur Code einer DLL aufgerufen wird. Diese DLL entwickelt man separat. So ist auch das Testen einfacher.*   Ich hatte während der Entwicklung 2-3 mal das Vergnügen, dass mein kompletter Prozess auf einen älteren Stand “zurückmutierte”. Ich kann es nicht gezielt reproduzieren, aber ich glaube, es hat mit dem Öffnen mehrerer Instanzen vom Visual Studio zu tun. Komischerweise konnten sowohl SVN wie auch die eingebaute Versionierung des K2-Servers meinen letzten Stand nicht zurück holen.
*   Simple InfoPath-Formulare gehen schnell von der Hand, komplexe dauern dagegen länger als die komplette Entwicklung eines eigenen Formulars mit ASP.net. Es ist auch einfacher, das Formular-XML in einem Server-Event vorzubereiten, als die Webservices im Infopath zu nutzen.
*   SmartObjects sind langsam! Ein kurzer Test zeigte, dass jede Methode, die den SmartBoxService nutzte, jeweils rund 0,4s benötigt. Ein über einen ServiceBroker angebundenes CRM hatte sogar Zeiten von rund 0,6s. So dauert das Sammeln aller nötigen Daten für ein Formular auch schon mal 5-10s. Hantieren mit Prozessinstanzen von externem Code aus geht hingegen super schnell.  

Aber kennt man erst einmal alle Fallstricke, macht die Entwicklung mehr Spaß und geht auch schneller von der Hand!
