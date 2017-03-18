---
title: Mal wieder nur Probleme
tags:
  - coding
  - MySQL
date: 2008-01-22T09:48:00.000Z
author: Fabian Wetzel
---

Wie es halt immer so läuft, hat man mehr Probleme als Lösungen zur Hand. Ich hab da in einer MySQL Datenbank so eine Tabelle mit Benutzernamen und Passwörtern. Jetzt soll der Admin die Möglichkeit haben, Benutzer und Passwörter ändern zu können. Funktioniert auch bisher einigermaßen. Folgendes Problem tritt dabei auf: Stellen wir uns 2 Nutzer vor (A und B) und der Admin möchte deren Namen nun austauschen, dann kann er das tun im Webinterface, aber beim Commit streikt MySQL. Problem ist mein Unique-Constraint auf der Namensspalte. MySQL möchte den Constraint unbedingt nach jeder Aktion prüfen. Meine Daten sind aber nur zum Beginn der Transaktion konsistent und am Ende wieder, dazwischen aber nicht notwendiger Weise!
  
    mysql> select PASSWORD_ID, username from password;
    +-------------+-------------+
    | PASSWORD_ID | username    |
    +-------------+-------------+
    |           3 | a           |
    |           4 | b           |
    |           2 | Musteradmin |
    |           1 | Mustermann  |
    +-------------+-------------+
    4 rows in set (0.02 sec)

    mysql> start transaction;
    Query OK, 0 rows affected (0.05 sec)

    mysql> update password set username="b" where password_id=3;
    ERROR 1062 (23000): Duplicate entry 'b' for key 2

Das Zauberwort heißt hier "deferred constraint resolution" und wird von MySQL leider nicht unterstützt! Dieses Feature würde die Constraints erst am Ende einer Transaktion prüfen.

Was mach ich nun aber mit meinem Webinterface? Eigentlich ist es ein Excel-mäßiges Grid, wo man alle Daten ändern kann und erst dann auf speichern klickt?


