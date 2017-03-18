---
title: 'Tomcat und hot deploy: Hot or not?'
tags:
  - coding
  - spring
  - Tomcat
date: 2007-10-03T16:18:59.000Z
author: Fabian Wetzel
---

Seit dieser Woche bin ich dabei, mir Spring und Hibernate auf der Arbeit anzulernen. Ich hab ein kleines Tutorial gefunden, was die ganze Sache an einem Beispiel erklärt. Naja nun gibt es hier und da einige Fallstricke, denn es ist unteranderem für den Tomcat 5.5 ausgelegt, ich habe aber den 6.0.

Problem war jedenfalls, dass ich oft genutzte Bibliotheken wie log4j nicht in der Anwendung deployen wollte. Deshalb habe ich sie in `<Tomcat>/lib` abgelegt. Habe ich meine Demoanwendung nun deployed, bekam ich immer eine Exception an den Kopf geworfen. Hab ich dann testweise den Inhalt aus `<Tomcat>/lib` nach `<myapp>/WEB-INF/lib` kopiert, hat der Tomcat einen redeploy gemacht, der keine Exception geworfen hat. Meine Anwendung ging irgendwie dann trotzdem nicht?!

Die Lösung ist sehr simpel, hat mich trotzdem einen ganzen Nachmittag gekostet, sie zu finden. Applikationen kann der Tomcat im laufenden Betrieb deployen, aber die Archive im `<Tomcat>/lib` Verzeichnis werden nur nach einem Neustart neu geladen. Das hatte ich natürlich den ganzen Tag noch nicht gemacht. Pünktlich zum Feierabend lief dann aber alles.


