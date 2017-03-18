---
title: Streaminhalt im Debugger
tags:
  - BizTalk
  - 'C#'
  - coding
  - Lösung
date: 2010-02-17T11:32:11.000Z
author: Fabian Wetzel
---

Sitzt man mal wieder vor dem Debugger und interessiert sich, was nun eigentlich für Daten in diesem `Stream` stehen, dann hilft das Immediate Window. Aber selbst damit ist es mir bisher nicht unbedingt einfach gefallen.

Folgendes Snippet erfüllt den Job aber als Einzeiler:
```cs
File.WriteAllText("c:\streamOut.txt", new StreamReader(meinStream).ReadToEnd());
```

Zu beachten ist, dass je nach Typ von meinStream die Position anschließend zurück gesetzt werden muss oder auch, das dies eventuell gar nicht möglich ist und daher die weitere Programmausführung fehlerhaft werden wird.


