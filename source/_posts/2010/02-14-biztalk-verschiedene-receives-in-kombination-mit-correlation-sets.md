---
title: 'BizTalk: Verschiedene Receives in Kombination mit Correlation Sets'
id: 441
tags:
  - BizTalk
  - coding
  - Lösung
date: 2010-02-14 19:38:38
---

Ausgangslage ist eine Orchestration, die eine Nachricht empfängt und auf Grundlage dieser Nachricht verschiedene Aktionen ausführt. Aus der ersten Nachricht ist auch abzuleiten, ob weitere Nachrichten empfangen werden müssen um die Aufgabe zu leisten.

Ich hatte nun den Fall, dass ich neben dem schon existierenden Pfad(linker Teil der Grafik) einen zusätzlichen Fall hatte, bei dem ein Direct Receive aus der MessageBox nötig war. Kommt die Nachricht aus der MessageBox, ist (für diesen Fall) klar, dass es keine Folgenachrichten gibt.

Man kann eine Orchestration nun nicht nur über ein Receive-Shape starten lassen, sondern auch auch über mehrere Receives, die in einem Listen-Shape untergebracht wurden. Das hatte ich dann auch versucht.

[![image](https://az275061.vo.msecnd.net/blogmedia/2010/02/image_thumb1.png "image")](https://az275061.vo.msecnd.net/blogmedia/2010/02/image32.png) 

Auch wenn aus logischer Sicht kein Pfad möglich ist, der vom Direct Receive zum “Receive Follower” führt, verwehrt BizTalk die Kompilierung dieser Orchestration.

Der Versuch, den Receive aus dem Receive Port durch einen Filter auf der MessageBox zu formulieren fruchtete ebenfalls nicht. Finales Ergebnis war, die gemeinsame Funktionalität in einer separaten Orchestration auszulagern und für den Direct Receive eine zusätzliche Orchestration zu bauen, die einen Call macht.

Außerdem ist die Fehlermeldung “unknown system error” auch sehr hilfreich beim Finden des eigentlichen Problems, denn eigentlich ist die Orchestration viel größer, als hier auf dem Screenshot zu sehen.