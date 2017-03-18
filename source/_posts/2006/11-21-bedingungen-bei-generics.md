---
title: Bedingungen bei Generics
tags:
  - .net
date: 2006-11-21T18:07:33.000Z
author: Fabian Wetzel
---

Also ich hab da so eine generische Methode:

```cs
private T GetItem<T>(LinkedList<T> items, GetModes mode) where T : IKoordinate
{
    return null; //Fehler!
}
```

Jedenfalls hatte ich das Problem, dass sie im Fehlerfall auch null zurückgeben kann, was vom Compiler aber angemeckert wurde.

Durch [Marco](http://blog.mwiedemeyer.de "marco") war die Lösung schnell gefunden:

```cs
private T GetItem<T>(LinkedList<T> items, GetModes mode) where T : class, IKoordinate
{
    return null; //OK!
}
```

Mit der zusätzlichen Bedingung sagt man dem Compiler, dass T eine Klasse sein muss. Eine Klasse darf null sein und damit ist alles in Butter. Nach meinem Verständnis impliziert die Bedingung, dass T das Interface IKoordinate bieten muss, auch, dass T eine Klasse ist, aber vielleicht hab ich auch einen anderen Punkt nicht im "Blickfeld". Jedenfalls geht der zweite Quellcode!

Danke Marco!

**Noch ein kleines Update:** Natürlich würde ich für einen Fehlerfall eine Exception werfen und nicht null zurückgeben.


