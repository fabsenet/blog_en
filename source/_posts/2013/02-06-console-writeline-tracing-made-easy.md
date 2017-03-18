---
title: Console.WriteLine() Tracing made easy
tags:
  - coding
  - debugging
  - json
date: 2013-02-06T10:20:08.000Z
author: Fabian Wetzel
---

Consider you are having a complicated object and you want to write some attributes of it to your test-only command line program. For this article it might just be a person:

```cs
var person = new Person
            {
                Name = "Fabse",
                Birthday = new DateTime(1985, 7, 12),
                Gender = GenderEnum.Male
            };
```

What would you normally do to write all these attributes to the console?

**WriteLine()?**
```cs
Console.WriteLine("Name: "+person.Name);
Console.WriteLine("Birthday: "+person.Birthday);
Console.WriteLine("Gender: "+person.Gender);
```

**Or would you overwrite ToString()?**
```cs
public override string ToString()
{
    return "Name: " + Name + ", Birthday: " + Birthday + ", Gender: " + Gender;
}
...

Console.WriteLine("MyPerson: " + person);
```

![](Untitled.png)

Works okay too, but you cannot use ToString() for other purposes anymore.

**So I thought, I am giving JSON a try for this purpose:**

Open your package manager console and write:

    install-package Newtonsoft.Json

And then do just this:
```cs
Console.WriteLine("MyPerson: " + JsonConvert.SerializeObject(person));
```

![](Untitled2.png)

The good thing is, it works with basically any object, always prints all members and you do not have to change your ToString() method. Of course there are downsides. You may not want to see *all* members or if you look closely, in its default settings it is interpreting the enum as an int, but its good enough for me.
