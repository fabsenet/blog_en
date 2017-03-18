---
title: 'Fluent Interfaces: Sinnvoll?'
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
```cs
IConfigurationFluent config =      
      new ConfigurationFluent().SetColor("blue")      
                               .SetHeight(1)      
                               .SetLength(2)      
                               .SetDepth(3);  

```
Das schreit einfach nach dem Object Initializer von C#! In etwa so:
```cs
IConfiguration config = new Configuration 
                        {
                          Color = "blue", 
                          Height=1, 
                          Length=2, 
                          Depth=3
                        };  
```

Dann spart mach sich das zusätzliche "return this" in der Implementierung.

Ok, dann hat [Troy Demonbreun](http://blog.troyd.net/PermaLink,guid,5cdd4862-857a-488d-a577-c6d21b548f19.aspx) folgendes Beispiel:
```cs
order     
    .AddFreeShipping()      
    .IncludeItem(15)      
    .SuppressTax();  
```

Das sieht an sich ja ganz nett aus, allerdings hat seine Implementierung den "Fehler", dass IncludeItem() den Kontext von Order auf OrderItem ändert. Nach meinem Verständnis von Fluent Interfaces müsste aber folgendes möglich sein (geht bei ihm nicht):
```cs
order     
  .AddFreeShipping()      
  .IncludeItem(15).SuppressTax()      
  .IncludeItem(4)      
  .IncludeItem(77)      
  .PrepareAsGift();  
```

Und als drittes Beispiel hab ich folgendes, leicht komplexes Konstrukt gefunden:
```cs
EventComponent planningMeeting =     
   Plan.Event("Project planning meeting").      
      RelatedTo(planningTask).      
      WithPriority(1).      
      At("Head office").      
      OrganizedBy("jane@megacorp.com", "Jane Doe").      
      StartingAt("12:00").Lasting(45).Minutes.      
      Attendants(      
         "peter@megacorp.com",      
         "paul@megacorp.com",      
         "mary@contractor.com").AreRequired.      
      Attendant("john@megacorp.com").IsOptional.      
      Resource("Projector").IsRequired.      
      ClassifyAs("Public").      
      CategorizeAs("Businees", "Development").      
      Recurring.Until(2008).EverySingle.Week.On(Day.Thursday).      
      Except.Each.Year.In(Month.July | Month.August);      

planningMeeting.SendInvitations();  
```

Hier kann ich schon etwas verstehen, warum Fluent Interfaces (=FIs) sexy sein könnten. Aber zuerst muss ich hier auch sofort wieder an Object Initializer und Collection Initializer denken (Nein, ich bau das jetzt nicht um :-P ) und dann hab ich da noch einen letzten Punkt zu: Man kann FIs nur einsetzen, wenn man zu einem Zeitpunkt bereits alles weiß zu dem Objekt, was man erstellen will. Das ist an sich ja nicht schlecht, aber wie kommt denn die Liste der Attendants da rein? Doch meistens mit foreach und das geht nicht in dieser Kette von Aufrufen. 

Ach und noch ein allerletzter Punkt: In diesem Ansatz muss ich viel Schmalz darauf verbraten, wann eine Methode Sinn macht:
```cs
Attendants( … ).Except.Minutes.WithPriority(1); //?!
```

**Fazit:**
[x] Ich hab mir Fluent Interfaces angesehen    
[x] Ich weiß keinen guten Fall, wann das Ganze wirklich Sinn macht


