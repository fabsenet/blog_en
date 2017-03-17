---
title: Stellt die Reihenfolge von XML-Elementen implizites Wissen dar?
tags:
  - coding
  - Erfahrungen
  - XML
date: 2009-03-01T10:49:25.000Z
author: Fabian Wetzel
---

Bei einem Erfahrungsaustausch in der Firma kam die Frage auf, ob die Reihenfolge von gleichen XML-Elementen implizites Wissen darstellt oder ob es nach der XML-Definition erlaubt wäre, diese Elemente zu vertauschen.

Beispiel war dabei eine Person, die mehrere Telefonnummern hat:

![image](image15.png "image") 

Wenn man jetzt sagt, dass die erste Telefonnummer immer die primäre Kontaktadresse ist, dann hätte die Reihenfolge der Elemente ja ein implizites Wissen.

Kann ich das so machen oder müsste ich es laut XML Spezifikation immer explizit gestalten:

![image](image16.png "image") 

Das war die Frage. Ich persönlich denke, dass die Reihenfolge Wissen darstellt und deshalb jeder Verarbeitungsschritt diese Reihenfolge erhalten muss. Argumente der Gegenseite waren, dass ja z.B. bei XHTML &lt;div&gt; – Tags beliebig verteilt werden können im Dokument und man sie anschließend durch CSS dahin bekommt, wo sie hingehören. Gegenbeispiel ist dabei aber ein Dokument mit mehreren Textabsätzen. Würde man hier nicht allen &lt;p&gt; – Tags eine Style-direktive zuweisen, könnten die Textabsätze ja verwürfelt werden, was sicherlich nicht im Sinne des Designer war.

Ich hab dazu mal die [XML RFC](http://www.w3.org/TR/2008/REC-xml-20081126/) konsultiert:
  > Note that the order of attribute specifications in a start-tag or empty-element tag is not significant.  

Aha, Attribute haben also keine Reihenfolge, aber was ist mit Elementen?
  > content particles occurring in a sequence list _MUST_ each appear in the element content in the order given in the list.  

Ein XSD-Schema kann also eine Reihenfolge von Elementen vorschreiben. Dies bezieht sich aber bloß auf unterschiedliche Elementtypen. Es kann also definiert werden, dass der Vorname immer vor dem Nachnamen auftauchen muss.

Weiteres habe ich in der RFC aber nicht gefunden, damit ist es aber weder belegt noch wiederlegt, ob die Reihenfolge nun entscheidend ist.

[Google](http://www.google.de/search?q=xml+order+of+elements) hat zwar ein paar Treffer, aber nichts, was nun wirklich weiter hilft.


