---
title: 3x das Selbe - nur kürzer und schöner
tags:
  - .net
  - coding
date: 2008-08-10T14:45:13.000Z
author: Fabian Wetzel
---

Ich entdecke neue C#-Features...für die einen sicher ein alter Hut und für die anderen sowieso ein Buch mit 7 Siegeln, aber für mich noch frisch und neu :-)


So hab ich es immer gemacht:
```cs
var particlesToRemove = new List<IParticle>();
foreach (var particle in Particles)
{
    if(particle.LifetimeExceeded)
    {
        particlesToRemove.Add(particle);
    }
}
foreach (var particle in particlesToRemove)
{
    Particles.Remove(particle);
}
```


So geht es mit anonymen Funktionen:
```cs
Particles.RemoveAll(delegate(IParticle b)
{
return b.LifetimeExceeded;
});
```


Und so mit einem Lambda-Ausdruck:
```cs
Particles.RemoveAll(b => b.LifetimeExceeded);
```
