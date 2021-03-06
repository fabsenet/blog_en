---
title: 'SQL Server 2008: E-Mail-Benachrichtigung bei fehlgeschlagenen Jobs einrichten'
tags:
  - Mail
  - SQL Server
  - Tutorial
date: 2011-04-26T10:49:48.000Z
author: Fabian Wetzel
---

Man muss an mehr als einer Stelle im Sql Server konfigurieren um eine E-Mail zu erhalten, wenn mal ein Job fehlschlägt und um dies das nächste mal zur Hand zu haben, habe ich die Schritte nachfolgend festgehalten.

## 1. Database Mail Profil anlegen

Zuerst muss Database Mail eingerichtet werden:    
![](clip_image002.jpg)

Wenn man sich durch den Dialog klickt, muss man ein neues Profil anlegen und die Authentifizierung dafür konfigurieren:    
![](clip_image004.jpg)

Hat man dies erledigt, schließt man den Dialog und versucht zuerst eine Testmail zu senden:    
![](clip_image006.jpg)

![](clip_image008.jpg)

Dies muss funktionieren bevor man fortsetzt…

## 2. SQL Server Agent konfigurieren

Jetzt muss der SQL Server Agent konfiguriert werden:    
![](clip_image010.jpg)

Wichtig ist, dass man ihm ein E-Mail Profil zuordnet:    
![](clip_image012.jpg)

## 3. SQL Operator anlegen

Als nächstes muss ein Operator angelegt werden. Man kann sich dies als E-Mail-Kontakt vorstellen:    
![](clip_image014.jpg)

Wichtig hier ist der Name und die E-Mail-Adresse, da dorthin die Mails verschickt werden. Es sind mehrere Adressen möglich, wenn diese durch Semikolons getrennt werden!  
![](clip_image016.jpg)

Bei mir war es notwendig, den SQL Server Agent einmal durchzustarten…    
![](clip_image018.jpg)

## 4. Job einrichten

Zuletzt kann man in beliebig vielen Jobs folgende Notifications einstellen:

![](clip_image020.jpg)

Jetzt sollten E-Mails eintrudeln, wenn der Job fehlschlägt.


