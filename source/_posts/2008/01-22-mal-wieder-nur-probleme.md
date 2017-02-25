---
title: Mal wieder nur Probleme
id: 120
tags:
  - coding
  - MySQL
date: 2008-01-22T09:48:00.000Z
author: Fabian Wetzel
---

Wie es halt immer so l&#228;uft, hat man mehr Probleme als L&#246;sungen zur Hand. Ich hab da in einer MySQL Datenbank so eine Tabelle mit Benutzernamen und Passw&#246;rtern. Jetzt soll der Admin die M&#246;glichkeit haben, Benutzer und Passw&#246;rter &#228;ndern zu k&#246;nnen. Funktioniert auch bisher einigerma&#223;en. Folgendes Problem tritt dabei auf: Stellen wir uns 2 Nutzer vor (A und B) und der Admin m&#246;chte deren Namen nun austauschen, dann kann er das tun im Webinterface, aber beim Commit streikt MySQL. Problem ist mein Unique-Constraint auf der Namensspalte. MySQL m&#246;chte den Constraint unbedingt nach jeder Aktion pr&#252;fen. Meine Daten sind aber nur zum Beginn der Transaktion konsistent und am Ende wieder, dazwischen aber nicht notwendiger Weise!
  <pre style="border-right: #999999 3px solid; border-top: #999999 3px solid; border-left: #999999 3px solid; border-bottom: #999999 3px solid; background-color: #dddddd">mysql&gt; select PASSWORD_ID, username from password;
+-------------+-------------+
| PASSWORD_ID | username    |
+-------------+-------------+
|           3 | a           |
|           4 | b           |
|           2 | Musteradmin |
|           1 | Mustermann  |
+-------------+-------------+
4 rows in set (0.02 sec)

mysql&gt; start transaction;
Query OK, 0 rows affected (0.05 sec)

mysql&gt; update password set username=&quot;b&quot; where password_id=3;
ERROR 1062 (23000): Duplicate entry 'b' for key 2</pre>

Das Zauberwort hei&#223;t hier &quot;deferred constraint resolution&quot; und wird von MySQL leider nicht unterst&#252;tzt! Dieses Feature w&#252;rde die Constraints erst am Ende einer Transaktion pr&#252;fen.

Was mach ich nun aber mit meinem Webinterface? Eigentlich ist es ein Excel-m&#228;&#223;iges Grid, wo man alle Daten &#228;ndern kann und erst dann auf speichern klickt?
