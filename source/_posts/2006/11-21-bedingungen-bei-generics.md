---
title: Bedingungen bei Generics
tags:
  - .net
date: 2006-11-21T18:07:33.000Z
author: Fabian Wetzel
---

Also ich hab da so eine generische Methode:

<font face="Courier New" color="#0080c0" size="2">private T getItem&lt;T&gt;(LinkedList&lt;T&gt; items, GetModes mode) where T : IKoordinate
{
&nbsp;&nbsp;&nbsp; return null; //Fehler!
}</font>

Jedenfalls hatte ich das Problem, dass sie im Fehlerfall auch null zurückgeben kann, was vom Compiler aber angemeckert wurde.

Durch [Marco](http://blog.mwiedemeyer.de "marco") war die Lösung schnell gefunden:

<font color="#0080c0"><font face="Courier New" size="2">private T getItem&lt;T&gt;(LinkedList&lt;T&gt; items, GetModes mode) where T : **<u>class,</u>** IKoordinate</font> 
{
&nbsp;&nbsp;&nbsp; return null; //OK!
}</font>

Mit der zusätzlichen Bedingung sagt man dem Compiler, dass T eine Klasse sein muss. Eine Klasse darf null sein und damit ist alles in Butter. Nach meinem Verständnis impliziert die Bedingung, dass T das Interface IKoordinate bieten muss, auch, dass T eine Klasse ist, aber vielleicht hab ich auch einen anderen Punkt nicht im "Blickfeld". Jedenfalls geht der zweite Quellcode!

Danke Marco!

**Noch ein kleines Update:** Natürlich würde ich für einen Fehlerfall eine Exception werfen und nicht null zurückgeben.


