---
title: Hopfield Simulation auf Codeplex
tags:
  - Allgemein
date: 2010-09-17T11:42:03.000Z
author: Fabian Wetzel
---

Während ich das Skript für neuronale Netze so durcharbeite, hat es mich gepackt und ich habe ein [Hopfieldnetz](http://hopfieldsimulation.codeplex.com/ "Hopfield Simulation auf Codeplex") mal richtig implementiert, um zu sehen, ob es wirklich tut. Und das alle was davon haben, habe ich es einfach mal auf Codeplex unter der MIT Lizenz zur Verfügung gestellt.

[![image](image39.png "image")](http://hopfieldsimulation.codeplex.com/)

Es wird mit einer Hand voll Muster trainiert und kann dann anschließend ein verrauschtes Bild eines der gelernten Muster zuordnen.

Es war meine erste kreierende Interaktion mit Codeplex und finde es eigentlich sehr einfach. Seiten werden wie ein Wiki editiert und man kann zwischen verschiedenen Source-Control-Tools wählen. Die Integration mit Visual Studio 2010 war absolut einfach.

Ach und es tut wirklich, zumindest in zwei von drei Fällen. Laut Skript kann ein Hopfieldnetz 0,15 * Anzahl der Neuronen an Bildern als Muster gleichzeitig erlernen. Das wären knapp über 1000 Stück bei der aktuellen Mustergröße von 150x50\. Vielleicht sind 11 dann zu wenig, so dass das Netz viele weitere ungewünschte lokale Minima ausbildet.


