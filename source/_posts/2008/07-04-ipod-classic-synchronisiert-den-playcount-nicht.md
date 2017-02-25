---
title: iPod Classic synchronisiert den Playcount nicht
id: 173
tags:
  - iPod
  - Lösung
  - Problem
date: 2008-07-04T18:13:54.000Z
author: Fabian Wetzel
---

 Neues Gadget = Neue Probleme = Schlaflose Nächte ... Lösung!

![image](https://az275061.vo.msecnd.net/blogmedia/2008/07/image11.png)Ich habe mir einen iPod Classic als etwas verfrühtes Geburtstagsgeschenk gegönnt und es ist auch alles ganz toll und so....bis ich bemerkte, dass er weder Bewertungen der Lieder noch deren letzten Abspielzeitpunkt nach iTunes synct.

Es gab da wohl vor einem Jahr mal Probleme mit, wenn man neben dem Musikhören auch Spiele spielte und dann syncte, aber das wurde schon längst mit einem Firmwareupdate behoben.

Weiterhin kann man manuelles Bestücken des iPods einstellen (statt automatischem syncen) ... dann wird auch der Playcount usw. nicht übertragen. In dem Fall ist es aber ein Feature?!

Bei mir konnte ich beides ausschließen und habe deshalb ewig alles durchprobiert: iTunes reparieren, Musikbibliothek löschen und neu anlegen und auch den iPod komplett wiederherstellen. Alles brachte kein Erfolg!

Dann ebend! Ich dachte mir, Winamp zeigt den iPod ja auch in der Mediabibliotek an, vielleicht mischt sich das da ein? Bingo! Winamp vor dem syncen geschlossen und es läuft alles wie erwartet!

**Lösung: **Ich hatte Winamp 5.35, hab jetzt ein Update auf 5.53 gemacht und hab alle Portable-Plugins rausgeschmissen und auch die Portable-Unterstützung selber (ml_pmp.dll aus dem Winamp-Plugin-Ordner löschen). Jetzt geht es auch definitiv mit Winamp sauber.

Vielleicht hilft das ja dem nächsten...

