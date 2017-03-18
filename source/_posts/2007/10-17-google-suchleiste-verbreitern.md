---
title: Google Suchleiste verbreitern
tags:
  - coding
date: 2007-10-17T10:43:21.000Z
author: Fabian Wetzel
---

Nach dem ich jetzt arbeitstechnisch neben Java, JSP und HTML auch mit JavaScript zu tun habe, habe ich zu der Lösung auch das passende Problem gefunden ;)

Ich habe hier auf der Arbeit eine etwas größere Auflösung (1280x1024). Nebenbei habe ich die Angewohnheit entwickelt, bei mir unbekannten Fehlern einfach die volle Fehlermeldung bei Google einzutippen (Copy&amp;Paste). Jedenfalls ist mir das Suchfeld zu mikrig und da musste Abhilfe her!

Wenn ihr es Nachmachen wollt, braucht ihr den [Firefox](http://www.mozilla-europe.org/de/) und das Plugin [Greasemonkey](https://addons.mozilla.org/de/firefox/addon/748). Ruft eine [Ergebnisseite](http://www.google.de/search?q=Fabse) von Google auf und geht dann auf das Affensymbol unten rechts, dann "Neues Benutzerskript". Name, Description und Namespace sind praktisch frei wählbar. Auf welche Adressen es angewendet werden soll, müsst ihr die Zeile leicht anpassen:

    http://www.google.de/search?*

Dann müsst ihr einen Texteditor auswählen. Nehmt bitte Notepad oder vergleichbar (nicht Word!). Jetzt sollte sich der Texteditior mit ein paar Zeilen drin öffnen. Macht ganz am Ende des Dokuments eine neue Zeile und fügt folgenden Inhalt ein:

```js
document.getElementsByName("q")[0].setAttribute("style", "width: 600px;");
```
Abspeichern und fertig! Wenn ihr das nächste mal eine Google-Suchseite aufhabt, wird euer Suchfeld breiter sein! Die 600px gibt die Breite an und ihr könnt sie gerne je nach Bedarf anpassen.


