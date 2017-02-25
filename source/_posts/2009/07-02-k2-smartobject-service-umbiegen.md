---
title: 'K2: SmartObject-Service umbiegen'
id: 389
tags:
  - coding
  - Erfahrungen
  - 'K2 [Blackpearl]'
date: 2009-07-02T10:26:10.000Z
author: Fabian Wetzel
---

Nach dem ich ja vor kurzem einige [schlechte Details des Produkts](https://fabse.net/blog/2009/06/30/k2-blackpearl-gotchas/) hervorgehoben habe, muss ich auch mal ein Lob aussprechen.

Uns ist ein Server abgeraucht und der neue hat eine andere URL. Nun haben wir aber einen ServiceBroker, der von diesem Server Informationen in SmartObjects umgewandelt hat.

Mein erster Gedanke war, ich muss jetzt dutzende von SmartObject neu anlegen oder editiert oder weiß ich was, aber es war so easy, dass man sich anstrengen muss, das in 3 Schritte auszubreiten:

1.  BrokerManagement.exe auf dem K2 Server öffnen
2.  Zur ServiceInstanz navigieren
3.  URL in den Eigenschaften ändern  

Fertig! Es dauerte keine 3 Minuten und das, obwohl ich nicht einmal wusste, wie es geht! Sehr gut!

