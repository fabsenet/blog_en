---
title: 'GraphLess: Tool zur Graphen-Visualisierung'
tags:
  - .net
  - Allgemein
  - Studium
date: 2006-12-18T18:52:29.000Z
author: Fabian Wetzel
---

Ich habe wegen Dima Lust bekommen, mal so ein Tool zu schreiben. Es Fehlen noch verschiedene Funktionen wie speichern und Laden oder z.B. das generieren von vollständigen oder bipartiten Graphen, aber die Grundfunktionalität ist schon drin.

Besonders stolz bin ich auf die Visualisierung von sich überschneidenden Kanten. Da hab ich auch eine ganze Weile dran gesessen.

![](https://az275061.vo.msecnd.net/blogmedia/2006/12/graphless_screenshot.png)

Nach dem [Download](https://az275061.vo.msecnd.net/blogmedia/2006/12/GraphLess.zip "GraphLess jetzt downloaden!"), dem Entpacken und dem Starten, habt ihr folgende Möglichkeiten:

*   Linke Maustaste: Ecken verschieben.
*   Mittlere Maustaste: Ecken oder Kanten löschen.
*   Rechte Maustaste: Auf freier Fläche wird eine Ecke erstellt. Klickt man auf eine Ecke, wird eine Kante erstellt. Man muss dann klicken und auf eine andere Ecke ziehen.
Das [.Net Framework](http://www.microsoft.com/downloads/details.aspx?displaylang=de&amp;FamilyID=0856eacb-4362-4b0d-8edd-aab15c5e04f5 ".Net Framework Download") wird in der Version 2 benötigt.

**Update:**

2 Fragen kamen des öfteren, deshalb schreib ich sie hier für alle sichtbar hin:

_Wozu das ganze?_ - Naja man kann zum Beispiel sehr anschaulich Isomorphie prüfen. Es hatte mich einfach in den Fingern gekitzelt, dieses Teil zu schreiben.

_Wie erstellt man Kanten?_ - Ok, es steht zwar etwas weiter oben, aber ich versuch es nochmal. Ihr macht es so, als wenn ihr auf den Desktop eine Datei in den Papierkorb ziehen wollt, bloß halt mit der rechten Maustaste. Auf den ersten Knoten mit der rechten Maustaste klicken und halten, jetzt den Zeiger auf eine andere Ecke bewegen (Es wird eine Vorschaukante gezeichnet beim Ziehen) und dort loslassen. Anfangs- und Zielknoten müssen vorher schon existieren.


