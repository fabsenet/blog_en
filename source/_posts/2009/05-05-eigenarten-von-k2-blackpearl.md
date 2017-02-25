---
title: Kopierte Referenz-Definition bei K2 Blackpearl
id: 352
tags:
  - coding
  - Erfahrungen
  - 'K2 [Blackpearl]'
date: 2009-05-05T11:10:29.000Z
author: Fabian Wetzel
---

Wenn man mit K2 arbeitet, findet man hin und wieder K2-Eigenarten vor. Die folgende hat mich schon den ganzen Tag beschäftigt.

Wenn es auch nach dem 5\. prüfen immer noch richtig aussieht und auch ein Kollege keinen Fehler finden kann, dann liegt es wohl daran, dass kein Fehler sichtbar ist. Hier hilft bei K2 immer, einfach alles löschen und genauso neu erstellen.

Bei mir war es die Referenz auf ein SmartObject. Ich hatte anfangs die Parameter der Read-Methode falsch, hab aber schon Werte aus dem SmartObject in einer E-Mail verwendet. Als ich das Read dann richtig hingebogen hatte, ging’s trotzdem nicht. Lösung war, alle genutzten Felder aus der E-Mail entfernen und neu einfügen. Offenbar wird mit dem Feld zusammen auch die Definition der Referenz kopiert.

