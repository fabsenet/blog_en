---
title: Einen JSON-String formatieren
tags:
  - AJAX
  - coding
  - Java
date: 2007-10-26T11:27:52.000Z
author: Fabian Wetzel
---

Wie bereits öfter schon hier erwähnt, arbeite ich zur Zeit an einer Webanwendung. Natürlich nutze ich auch AJAX! Allerdings nutze ich zur Übergabe nicht XML sondern [JSON](http://json.org/). Ich nutze auf der Serverseite [SOJO](http://sojo.sourceforge.net/) um zwischen Java-Objekten nach JSON hin und her zu konvertieren.

Leider ist der erzeugte JSON-String eine lange Zeile ohne Leerzeichen und Zeilenumbrüchen. Das stört ungemein, wenn man mal gucken will, ob das richtige übermittelt wird. Ich hatte mich also auf die Suche nach einem JSON Formatter gemacht, nur leider gibt quasi nur einen, der benötigt aber Copy&amp;Paste des Strings, da ich ihn nicht einbetten kann. Nun hab ich mir schnell eine Java-Funktion geschrieben, die einen JSON String in einen lesbaren umwandelt. Ich hoffe es nützt wem!

Es gab Probleme mit Backslashes hier in dem Blog, sollte es bei euch also nicht funktionieren, dann schaut zuerst danach!

```java
public String makeReadable(String json) {
    StringBuilder sb = new StringBuilder();
    int indent = 0;
    boolean inString = false;
    char lastChar = ' ';
    char c;
    for (int i = 0; i < json.length(); i++) {
        // Schleife für jedes Zeichen
        c = json.charAt(i);
        if (c == '"' && lastChar != '\\') {
            inString = !inString;
        }
        if (inString) {
            // innerhalb Strings darf nichts geändert werden!
            sb.append(c);
        } else {
            // normales Verhalten außerhalb eines Strings
            switch (c) {
            case '\n':
            case ' ':
            case '\t':
                // alte Formatierungen entfernen
                break;
            case '[':
                sb.append("\n");
                appendIndents(sb, indent);
                sb.append(c);
                sb.append("\n");
                appendIndents(sb, ++indent);
                break;
            case '{':
                sb.append(c);
                sb.append("\n");
                appendIndents(sb, ++indent);
                break;
            case '}':
            case ']':
                sb.append("\n");
                appendIndents(sb, –indent);
                sb.append(c);
                break;
            case ':':
                sb.append(' ');
                sb.append(c);
                sb.append(' ');
                break;
            case ',':
                sb.append(c);
                sb.append('\n');
                appendIndents(sb, indent);
                break;
            default:
                sb.append(c);
            }
        }
        lastChar = c;
    }
    return sb.toString();
}

private void appendIndents(StringBuilder sb, int indent) {
    for (int i = 0; i < indent; i++) {
        sb.append("\t");
    }
}
```