---
title: Distinct und die dunkle Seite!
id: 499
tags:
  - Büroleben
  - 'C#'
  - im Netz gefunden
date: 2011-01-30T17:03:07.000Z
author: Fabian Wetzel
---

Im Projekt war aufgefallen, dass eine Komponente, die Key/Value Werte aus Nachrichten extrahiert, die Paare doppel extrahiert, wenn sie denn doppelt in der Nachricht sind und letztlich wurden die Paare dann auch mehrfach zu einer Nachricht in der Datenbank hinterlegt. Mangels Mehrwert war nun die Idee, die Doppelten zu löschen. Vor dem Abspeichern in LINQ ein Distinct aufgerufen zusammen mit einer Standardimplementierung von IEqualityComparer und gut war.

Über ein einmaliges Skript auch die Doppelten aus der Datenbank entfernt, einen UNIQUE-Index angelegt und gut.

Und gut? Am nächsten Tag ging einen halben Tag lang nichts mehr. Die Komponente war an sich getestet, aber der Fall der aufgetreten war, war, dass die Datenbank in Form des MS SQL Server Gleichheit viel weitreichender definiert, als mein Code es tat, so kam es, dass der UNIQUE-Index&#160; Transaktionen zurück rollte, die eigentlich nur distinkte Paare enthielt.

Was war passiert? Im C#-Code hatte ich Equals über String.Equals implementiert. Der SQL Server entscheidet bei Gleichheit aber ohne Betrachtung der Groß-/Kleinschreibung. Während des Entwickelns des Bugfixes ist dann noch aufgefallen, dass der SQL Server auch “ss” und “ß” als gleich betrachtet.

Geholfen hatte auf Stackoverflow die [Antwort von cdhowie](http://stackoverflow.com/questions/4190143/how-to-maintain-unique-list-before-saving-to-database-c/4190183#4190183). Die generische Lösung unterstützt dabei auch noch immer GetHashCode, da sonst die Performance leidet:

`<span style="font-family: verdana">String.Equals(a.Description, b.Description, StringComparison.**OrdinalIgnoreCase**);</span>`

`<span style="font-family: verdana">und</span>`

`<span style="font-family: verdana">StringComparer.**OrdinalIgnoreCase**.GetHashCode(obj.Description);</span>`
