---
title: Erste Schritte mit RavenDB
id: 523
tags:
  - 'C#'
  - coding
  - RavenDB
date: 2011-04-25T21:47:00.000Z
author: Fabian Wetzel
---

…sind ganz einfach! Runterladen, entpacken und Server starten über Batchdatei. Dann eines der Samples öffnen – bei mir war es SimpleClient.

[RavenDB](http://ravendb.net/) ist eine schema-lose Dokumentendatenbank und damit Vertreter der [NoSQL](http://de.wikipedia.org/wiki/NoSQL_%28Konzept%29)-Bewegung. Zugriffe erfolgen über [REST](http://de.wikipedia.org/wiki/Representational_State_Transfer). Es gibt eine .Net ClientAPI und mit der kann man in 3 Zeilen jedes beliebige Objekt in die Datenbank schreiben. Ich bin echt beeindruckt, wie unerwartet unkompliziert das geht.

Ich habe eine halbwegs klare Projektidee im Kopf, so musste ich einige konkrete Fragen klären, die durch das Lesen von [Ayendes Blog](http://ayende.com/blog/default.aspx) (Tipp!!!) nicht zu klären waren.

Kann man RavenDB embedded hosten? Ja! Neben dem Hosten über einen Windows Service oder über den IIS kann man auch im Client selbst die Datenbank hosten womit das ganze zu einer Standalone-App wird.

Wie gut kommt es mit Blobs klar? Hier habe ich lange probiert. Zuerst hatte ich immer ein Byte-Array in meinen Objekten, was aber schnell zu OutOfMemory-Situationen führt. Ich hatte mit ca. 1000 Objekten mit je 3mb Inhalt zu tun. Es erfolgt eine Base64-Codierung bei der Übertragung so dass zu einem Zeitpunkt in Server und Client in Summe vermutlich mindestens 4 Varianten gehalten werden. Wenn man die richtigen Google-Suchwörter verwendet, findet man heraus, dass RavenDB auch [Attachments](http://groups.google.com/group/ravendb/browse_thread/thread/7b73377adf3e09cd/43deb6f4db4ca9af?lnk=gst&amp;q=Attachments#43deb6f4db4ca9af) als Konzept versteht. Hier gibt es wohl keine Transaktionalität aber dafür Performance! Mir gelang es, ein Attachment mit 335mb in 66s in die Datenbank zu pumpen, was für meine Anforderungen vollkommen genügt. Bei dem nächstgrößeren Versuch mit 500mb kam es zu einer OutOfMemoryException, aber das ist ok. Attachments können übrigens auch direkt durch einen Browser geladen werden!

Sollte jetzt der Eindruck entstanden sein, dass RavenDB langsam ist, dann muss ich dem Widersprechen. Mir gelang es die 1000 Objekte nur mit Metadaten und ohne Blobs in unter einer Sekunde in die Datenbank zu laden.

Ich bin sehr beendruckt von RavenDB und kann jedem nur empfehlen, sich selbst einen Eindruck zu verschaffen.

_Mein Ostermontag ist jedenfalls gut angelegt_ ![Open-mouthed smile](https://az275061.vo.msecnd.net/blogmedia/2011/04/wlEmoticon-openmouthedsmile.png)
