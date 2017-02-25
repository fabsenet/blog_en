---
title: 'Excel: Letzter Wert eine Datenzeile'
id: 379
tags:
  - Excel
  - im Netz gefunden
  - Office
date: 2009-06-29T08:37:11.000Z
author: Fabian Wetzel
---

Ich schreibe immer wieder Werte untereinander in einer Excel-Tabelle und interessiere mich für den letzten gesetzten Wert dieser Zeile. So geht’s:

=VERWEIS(2;1/(A:A&lt;&gt;&quot;&quot;);A:A)

Wobei A:A die Zeile A ist, auf die diese Formel wirkt. Das ist übrigens die [Frank Kabel – Lösung](http://www.excelformeln.de/formeln.html?welcher=48).

