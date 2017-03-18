---
title: Youtube wieder schneller im Firefox
tags:
  - Allgemein
date: 2011-10-19T20:45:40.000Z
author: Fabian Wetzel
---

_While I had decided to write new articles only in English, the following article has a pure German audience so I figured out to make an exception for this article._

Wer wie ich seinen Internetanschluss bei der Telekom hat, dem kann nicht entgangen sein, dass Youtube Videos extrem langsam sind und man manchmal außer der drehenden Ladeanimation nichts zu sehen bekommt. Es war zuletzt wirklich sehr schlimm.

Es gab bis vor kurzem den [Telekom Youtube Turbo](https://addons.mozilla.org/de/firefox/addon/telekom-youtube-turbo/), der zwar funktionierte, dies aber sehr geheimnisvoll gemacht hat. Es gibt keine Einstellungen und auch keine Beschreibungen. Er ist auch für den Firefox 8 nicht verfügbar.

Frustriert habe ich mich umgeschaut und gelesen, dass der Telekom-Proxy wohl schneller ist. Vermutlich hat auch der Telekom Youtube Turbe den verwendet. Ich wollte aber nicht, dass alle meine Seitenaufrufe durch den Proxy laufen, daher habe ich mir FoxyProxy besorgt, was viele Optionen erlaubt. Die Einrichtung geht in wenigen einfachen Schritten:

1\. Das AddOn [FoxyProxy](https://addons.mozilla.org/de/firefox/addon/foxyproxy-standard/) in den Firefox installieren und den Firefox neu starten.

2\. In den Optionen von FoxyProxy einen neuen Proxy anlegen* und ihn auf den Telekom-Proxy (www-proxy.t-online.de mit Port 80) einstellen.

[![Proxydetails einstellen](image_thumb10.png "Proxydetails einstellen")](image56.png)

3\. Bei den Url-Mustern noch ein Muster für Youtube hinterlegen:

[![Url-Muster für Youtube hinterlegen](image_thumb11.png "Url-Muster für Youtube hinterlegen")](image57.png)

4\. Der FoxyProxy-Modus sollte "Verwende Proxies entsprechend ihrer konfigurierten Muster und Prioritäten" sein. Das sollte bei euch dann alles so aussehen:

[![Verwende Proxies entsprechend ihrer konfigurierten Muster und Prioritäten](image_thumb12.png "Verwende Proxies entsprechend ihrer konfigurierten Muster und Prioritäten")](image58.png)

Und nun wieder viel Spaß auf Youtube!

 

*Es gibt Bonuspunkte, wenn man den Proxy Magenta färbt ![Winking smile](wlEmoticon-winkingsmile4.png)


