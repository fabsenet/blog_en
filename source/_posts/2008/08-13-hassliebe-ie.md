---
title: Hassliebe IE
id: 247
tags:
  - AJAX
  - Büroleben
  - coding
date: 2008-08-13T23:53:23.000Z
author: Fabian Wetzel
---

Ich hab eine Webseite erstellt, die JSON-kodierte Daten nimmt und sie in einer Tabellenform darstellt. Die ganze Entwicklung erfolgte (natürlich) auf dem Firefox und jetzt wollte ich mal schauen, wie der IE sich schlägt: Es kommt gar nichts...auch kein Javascript-Fehler!

Ich habe immer fleißig alle Elemente mit document.createElement(...) erzeugt und mit appendChild() sauber zusammengefügt. Auch nach Einrichten des Visual Studios zum Debuggen des Javascripts im Internet Explorer (was übrigens ausgesprochen gut funktioniert!) habe ich die Erstellung schrittweise verfolgt und bin zu dem Ergebnis gekommen, dass nirgends ein Fehler ist und alles ist sauber durchgelaufen.

Leider war nix davon zu sehen!

Fehler 1:

myTD.setAttribute("**class**", "..."); geht im IE nicht, hier müsste es myTD.setAttribute("**className**", "..."); heißen...was aber dann im Firefox nicht geht. Hier hilft myTD**.className** = "..."; Das funktioniert dann in beiden Browsern. Mein Problem hat es dennoch nicht gelöst.

Fehler 2:

Ich hab die Hierarchie so gehabt:

Table =&gt; TR =&gt; TD =&gt; text/input

und der IE verträgt es halt nur so:

Table =&gt; **TBODY** =&gt; TR =&gt; TD =&gt; text/input

...ist der TBODY Tag anwesend, läuft alles wie geschmiert. Die Erkenntnis hat mich einen ganzen Arbeitstag voller Debuggen, Fehlersuche und Googlen gekostet :-(
