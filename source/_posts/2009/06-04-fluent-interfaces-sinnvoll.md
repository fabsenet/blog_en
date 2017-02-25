---
title: 'Fluent Interfaces: Sinnvoll?'
id: 360
tags:
  - 'C#'
  - coding
date: 2009-06-04T16:31:41.000Z
author: Fabian Wetzel
---

Ich hatte Fluent Interfaces mal in einem Blog gelesen und hatte es seit dem auf meinem Zettel stehen, das mal genauer anzusehen.

Was ist das eigentlich? [Wikipedia weiß es natürlich.](http://de.wikipedia.org/wiki/Fluent_Interface "Fluent_Interface bei Wikipedia (de)")

Sucht man bei Google danach findet man Blogs mit Einträgen von 2006/2007…sind Fluent Interfaces schon tot? Vielleicht!

Einige Beispiele:
  > IConfigurationFluent config =      
> &#160;&#160;&#160;&#160;&#160; new ConfigurationFluent().SetColor(&quot;blue&quot;)      
> &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; .SetHeight(1)      
> &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; .SetLength(2)      
> &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; .SetDepth(3);  

Das schreit einfach nach dem Object Initializer von C#! In etwa so:
  > IConfiguration config =      
> &#160;&#160;&#160;&#160;&#160; new Configuration {Color = “blue”, Height=1, Length=2, Depth=3};  

Dann spart mach sich das zusätzliche “return this” in der Implementierung.

Ok, dann hat [Troy Demonbreun](http://blog.troyd.net/PermaLink,guid,5cdd4862-857a-488d-a577-c6d21b548f19.aspx) folgendes Beispiel:
  > order     
> &#160;&#160;&#160; .AddFreeShipping()      
> &#160;&#160;&#160; .IncludeItem(15)      
> &#160;&#160;&#160; .SuppressTax();  

Das sieht an sich ja ganz nett aus, allerdings hat seine Implementierung den “Fehler”, dass IncludeItem() den Kontext von Order auf OrderItem ändert. Nach meinem Verständnis von Fluent Interfaces müsste aber folgendes möglich sein (geht bei ihm nicht):
  >   > order     
> &#160;&#160;&#160; .AddFreeShipping()      
> &#160;&#160;&#160; .IncludeItem(15).SuppressTax()      
> &#160;&#160;&#160; .IncludeItem(4)      
> &#160;&#160;&#160; .IncludeItem(77)      
> &#160;&#160;&#160; .PrepareAsGift();  

Und als drittes Beispiel hab ich folgendes, leicht komplexes Konstrukt gefunden:
  > EventComponent planningMeeting =     
> &#160;&#160; Plan.Event(&quot;Project planning meeting&quot;).      
> &#160;&#160;&#160;&#160;&#160; RelatedTo(planningTask).      
> &#160;&#160;&#160;&#160;&#160; WithPriority(1).      
> &#160;&#160;&#160;&#160;&#160; At(&quot;Head office&quot;).      
> &#160;&#160;&#160;&#160;&#160; OrganizedBy(&quot;jane@megacorp.com&quot;, &quot;Jane Doe&quot;).      
> &#160;&#160;&#160;&#160;&#160; StartingAt(&quot;12:00&quot;).Lasting(45).Minutes.      
> &#160;&#160;&#160;&#160;&#160; Attendants(      
> &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; &quot;peter@megacorp.com&quot;,      
> &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; &quot;paul@megacorp.com&quot;,      
> &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; &quot;mary@contractor.com&quot;).AreRequired.      
> &#160;&#160;&#160;&#160;&#160; Attendant(&quot;john@megacorp.com&quot;).IsOptional.      
> &#160;&#160;&#160;&#160;&#160; Resource(&quot;Projector&quot;).IsRequired.      
> &#160;&#160;&#160;&#160;&#160; ClassifyAs(&quot;Public&quot;).      
> &#160;&#160;&#160;&#160;&#160; CategorizeAs(&quot;Businees&quot;, &quot;Development&quot;).      
> &#160;&#160;&#160;&#160;&#160; Recurring.Until(2008).EverySingle.Week.On(Day.Thursday).      
> &#160;&#160;&#160;&#160;&#160; Except.Each.Year.In(Month.July | Month.August);      
> planningMeeting.SendInvitations();  

…hier kann ich schon etwas verstehen, warum Fluent Interfaces (=FIs) sexy sein könnten. Aber zuerst muss ich hier auch sofort wieder an Object Initializer und Collection Initializer denken (Nein, ich bau das jetzt nicht um :-P ) und dann hab ich da noch einen letzten Punkt zu: Man kann FIs nur einsetzen, wenn man zu einem Zeitpunkt bereits alles weiß zu dem Objekt, was man erstellen will. Das ist an sich ja nicht schlecht, aber wie kommt denn die Liste der Attendants da rein? Doch meistens mit foreach und das geht nicht in dieser Kette von Aufrufen. 

Ach und noch ein allerletzter Punkt: In diesem Ansatz muss ich viel Schmalz darauf verbraten, wann eine Methode Sinn macht:
  > …Attendants( … ).Except.Minutes.WithPriority(1); //?!  

**Fazit:     
**[x] Ich hab mir Fluent Interfaces angesehen    
[x] Ich weiß keinen guten Fall, wann das Ganze wirklich Sinn macht

