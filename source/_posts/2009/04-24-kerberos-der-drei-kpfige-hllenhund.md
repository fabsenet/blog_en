---
title: 'Kerberos, der drei-köpfige Höllenhund'
id: 351
tags:
  - Büroleben
  - Erfahrungen
  - Kerberos
  - Kryptographie
date: 2009-04-24T15:54:13.000Z
author: Fabian Wetzel
---

Will man ein Service Principal Name (SPN) einrichten, dann benötigt man dafür auf jeden Fall einen Domain-Admin-Account. 
  > C:Usersdomadm&gt;setspn -A HTTP/meinserver:815 meinserver     
> Registering ServicePrincipalNames for …… Failed to assign SPN on account …… -&gt; **Insufficient access rights to perform the operation.**  

Wenn man dann immer noch besagte Fehlermeldung erhält, dann kann man natürlich alle möglichen Leute fragen, ob der DomainAdmin nicht mehr DomainAdmin ist oder man kann auch das Netz durchsuchen und so die ein oder andere Stunde verstreichen lassen.

Generell wäre aber die Effizienz am höchsten, wenn man einfach “Als Administrator ausführen” wählt für die Kommandozeile! *arg*

Zu meiner Verteidigung will ich sagen, dass ich auf allen anderen Servern UAC schon vor einiger Zeit abgestellt hatte, aber dieser Server es aber leider an hatte.

Hier noch eine Hand voll Links, die Kerberos und die Kerberos-bezogene Fehlerdiagnose erläutern:

[Kerberos for the Busy Admin](http://blogs.technet.com/askds/archive/2008/03/06/kerberos-for-the-busy-admin.aspx) (Kerberos Überblick)    
[Troubleshooting Kerberos Authentication problems – Name resolution issues](http://blogs.technet.com/askds/archive/2008/05/14/troubleshooting-kerberos-authentication-problems-name-resolution-issues.aspx) (Problem: DNS Server löst Name falsch auf)    
[Kerberos Authentication problems – Service Principal Name (SPN) issues - Part 1](http://blogs.technet.com/askds/archive/2008/05/29/kerberos-authentication-problems-service-principal-name-spn-issues-part-1.aspx) (SPNs für ein Webapp einfügen)    
[Kerberos Authentication problems – Service Principal Name (SPN) issues - Part 2](http://blogs.technet.com/askds/archive/2008/06/09/kerberos-authentication-problems-service-principal-name-spn-issues-part-2.aspx) (Doppelter SPN)    
[Kerberos Authentication problems – Service Principal Name (SPN) issues - Part 3](http://blogs.technet.com/askds/archive/2008/06/11/kerberos-authentication-problems-service-principal-name-spn-issues-part-3.aspx) (SPN für falschen Nutzer registriert)    
[Kerberos and your MOSS setup](http://k2underground.com/blogs/johnny/archive/2008/05/10/kerberos-and-your-moss-setup.aspx)
