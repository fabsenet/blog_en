---
title: 'SQL Server 2008: E-Mail-Benachrichtigung bei fehlgeschlagenen Jobs einrichten'
id: 538
tags:
  - Mail
  - SQL Server
  - Tutorial
date: 2011-04-26T10:49:48.000Z
author: Fabian Wetzel
---

Man muss an mehr als einer Stelle im Sql Server konfigurieren um eine E-Mail zu erhalten, wenn mal ein Job fehlschlägt und um dies das nächste mal zur Hand zu haben, habe ich die Schritte nachfolgend festgehalten.

### 1\. **Database Mail Profil anlegen **

Zuerst muss Database Mail eingerichtet werden:    
![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image002.jpg "SqlServerMailOnFailedJob_01")

Wenn man sich durch den Dialog klickt, muss man ein neues Profil anlegen und die Authentifizierung dafür konfigurieren:    
![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image004.jpg "SqlServerMailOnFailedJob_02")

Hat man dies erledigt, schließt man den Dialog und versucht zuerst eine Testmail zu senden:    
![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image006.jpg "SqlServerMailOnFailedJob_03")

![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image008.jpg "SqlServerMailOnFailedJob_04")

Dies muss funktionieren bevor man fortsetzt…

**2\. SQL Server Agent konfigurieren **

Jetzt muss der SQL Server Agent konfiguriert werden:    
![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image010.jpg "SqlServerMailOnFailedJob_05")

Wichtig ist, dass man ihm ein E-Mail Profil zuordnet:    
![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image012.jpg "SqlServerMailOnFailedJob_06")

**3\. SQL Operator anlegen **

Als nächstes muss ein Operator angelegt werden. Man kann sich dies als E-Mail-Kontakt vorstellen:    
![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image014.jpg "SqlServerMailOnFailedJob_07")

Wichtig hier ist der Name und die E-Mail-Adresse, da dorthin die Mails verschickt werden. Es sind mehrere Adressen möglich, wenn diese durch Semikolons getrennt werden!&#160; 
![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image016.jpg "SqlServerMailOnFailedJob_08")

Bei mir war es notwendig, den SQL Server Agent einmal durchzustarten…    
![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image018.jpg "SqlServerMailOnFailedJob_09")

**4\. Job einrichten **

Zuletzt kann man in beliebig vielen Jobs folgende Notifications einstellen:

![](https://az275061.vo.msecnd.net/blogmedia/2011/04/clip_image020.jpg "SqlServerMailOnFailedJob_10")

Jetzt sollten E-Mails eintrudeln, wenn der Job fehlschlägt.

