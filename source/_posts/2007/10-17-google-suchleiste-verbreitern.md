---
title: Google Suchleiste verbreitern
tags:
  - coding
date: 2007-10-17T10:43:21.000Z
author: Fabian Wetzel
---

Nach dem ich jetzt arbeitstechnisch neben Java, JSP und HTML auch mit JavaScript zu tun habe, habe ich zu der L&#xF6;sung auch das passende Problem gefunden ;)

Ich habe hier auf der Arbeit eine etwas gr&#xF6;&#xDF;ere Aufl&#xF6;sung (1280x1024). Nebenbei habe ich die Angewohnheit entwickelt, bei mir unbekannten Fehlern einfach die volle Fehlermeldung bei Google einzutippen (Copy&amp;Paste). Jedenfalls ist mir das Suchfeld zu mikrig und da musste Abhilfe her!

Wenn ihr es Nachmachen wollt, braucht ihr den [Firefox](http://www.mozilla-europe.org/de/) und das Plugin [Greasemonkey](https://addons.mozilla.org/de/firefox/addon/748). Ruft eine [Ergebnisseite](http://www.google.de/search?q=Fabse) von Google auf und geht dann auf das Affensymbol unten rechts, dann &quot;Neues Benutzerskript&quot;. Name, Description und Namespace sind praktisch frei w&#xE4;hlbar. Auf welche Adressen es angewendet werden soll, m&#xFC;sst ihr die Zeile leicht anpassen:

&quot;http://www.google.de/search?*&quot;

(ohne die Anf&#xFC;hrungsstriche)

Dann m&#xFC;sst ihr einen Texteditor ausw&#xE4;hlen. Nehmt bitte Notepad oder vergleichbar (nicht Word!). Jetzt sollte sich der Texteditior mit ein paar Zeilen drin &#xF6;ffnen. Macht ganz am Ende des Dokuments eine neue Zeile und f&#xFC;gt folgenden Inhalt ein:

document.getElementsByName(&quot;q&quot;)[0].setAttribute(&quot;style&quot;, &quot;width: 600px;&quot;);

Abspeichern und fertig! Wenn ihr das n&#xE4;chste mal eine Google-Suchseite aufhabt, wird euer Suchfeld breiter sein! Die 600px gibt die Breite an und ihr k&#xF6;nnt sie gerne je nach Bedarf anpassen.


