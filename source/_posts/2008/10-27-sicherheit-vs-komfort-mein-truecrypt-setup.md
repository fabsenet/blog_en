---
title: 'Sicherheit vs. Komfort: Mein Truecrypt Setup'
tags:
  - Kryptographie
  - My Setup
  - Truecrypt
  - Usability
  - Vista
date: 2008-10-27T11:11:58.000Z
author: Fabian Wetzel
---

In direkten Gesprächen mit verschiedenen Menschen - technikversiert oder nicht - ist mir aufgefallen, dass viele Menschen ihre Sicherheit nicht so ernst nehmen, wie sie sollten. Ich möchte meinen Beitrag dazu machen und stelle mein Setup vor:

Grundlage ist mein Desktoprechner mit einer Systemfestplatte und einer Datenfestplatte (eigentlich ein Raid). Jedenfalls mag ich das Gefühl nicht, wenn jemand anders einfach meinen PC nutzen kann, deshalb hatte ich schon immer ein Windowskennwort. Dies schützt aber nur den PC, nicht die Daten. Will man an diese ran kommen, genügt das Booten einer Linux-Live-CD und alle Daten liegen offen vor einem.

Ich habe deshalb [Truecrypt](http://www.truecrypt.org/) und schon länger meine Datenpartition komplett verschlüsselt. Wichtig ist dabei, dass man eine Partition verschlüsselt und nicht das ganze Laufwerk, denn sonst denkt Windows unter bestimmten Umständen, dass die Platte leer ist und bietet das Formatieren an. Böse! Die Partition darf dabei natürlich über das komplette Laufwerk gehen.

Seit mittlerweile 2 Versionen bietet Truecrypt auch die Option, die Systemplatte zu verschlüsseln. Dies habe ich nun auch gemacht. Wenn der Rechner nun startet, läuft das Bios ganz normal ab, bevor Windows dann mit dem Starten beginnt kommt allerdings eine Passwordabfrage. Ohne das korrekte Password können die Daten auf der Platte nicht entschlüsselt werden und genau genommen könnte man nicht mal sehen, ob da überhaupt ein Windows drauf installiert ist.

Wenn ihr mir so weit gefolgt seit, dann habt ihr beim Booten eine Passwortabfrage, einen Windowslogin und eine weitere Passwortabfrage für die Datenpartition. Hier kommt jetzt der Komfortpunkt: Das Windowskennwort sollte man behalten, da man mit leerem Kennwort womöglich angreifbar übers Netzwerk wird, aber [man kann Windows so einstellen, dass es automatisch einloggt](http://www.tippscout.de/windows-vista-automatisch-anmelden_tipp_3640.html) ([oder XP](http://www.windows-tweaks.info/html/anmeldung.html)). Dies verringert die Sicherheit nicht, denn man hat ja zuvor schon durch das Truecrypt-Passwort gezeigt, dass man "berechtigt" ist. Außerdem kann man das Passwort für die Datenpartition auf der Systempartition hinterlegen und so das Freischalten der Datenpartition durch den Autostart automatisieren:

"C:Program FilesTrueCryptTrueCrypt.exe" /volume DeviceHarddisk1Partition1 /letter e /p "meinPasswordhier" /q

Diese Zeile startet Truecrypt, nimmt das angegebene Volumen und meldet es auf den Laufwerksbuchstaben E an. Das Password liegt hier im Klartext vor. /q beendet Truecrypt dann direkt wieder.

Abschließendes Fazit ist, dass ich genau wie ganz am Anfang für den Systemstart nur ein Passwort benötige, nun meine Platten aber komplett verschlüsselt sind. Neben dem Bonus der Sicherheit kommt diese Passwortabfrage nun auch am Anfang im Bootprozess statt in der Mitte! Ich kann also anschalten, gebe nach 3 Sekunden mein Kennwort ein und kann mir einen Kaffee holen, wenn ich wieder komme ist alles fertig!

Ich denke, dass ich auf diesem Wege sowohl die Sicherheit als auch den Komfort gut unter einen Hut gebracht habe!


