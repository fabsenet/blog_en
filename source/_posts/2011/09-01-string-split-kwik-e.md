---
title: String.Split() Kwik-e
tags:
  - 'C#'
  - coding
  - Kwik-e
date: 2011-09-01T10:23:30.000Z
author: Fabian Wetzel
---

While I was cleaning up some legacy code I found an overly complex usage of String.Split() in several places:
```cs
var sentence = "Hello World!";
var words = sentence.Split(new char[] { ' ' });
```

If you take a look at the available overloads on Split() you may miss the params keyword. In fact it isn't even visible on the overview page:

[![image](image49.png)](http://msdn.microsoft.com/de-de/library/y7h14879%28v=VS.100%29.aspx)

But if you take a closer look on Split(char[]) you will see this:

[![image](image50.png)](http://msdn.microsoft.com/de-de/library/b873y76a.aspx)

The params keyword tells you that the method accepts any number of arguments of type char. So you could also provide only one, which will simplify the given sample to:

```cs
var sentence = "Hello World!";
var words = sentence.Split(' ');
```
