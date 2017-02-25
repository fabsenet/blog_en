---
title: Pitfalls of String to Number/Date Conversions
id: 2132
comment: false
tags:
  - .net
  - 'C#'
  - Coding Guideline
date: 2015-03-04T10:30:16.000Z
author: Fabian Wetzel
subtitle: 'Having a string and converting it to a Number is easy, isn’t it?'
description: 'Having a string and converting it to a Number is easy, isn’t it?'
---

Having a string and converting it to a Number is easy, isn’t it?

![Convert.ToDouble(string)](https://az275061.vo.msecnd.net/blogmedia/2015/03/convert_todouble_simple.png "Convert.ToDouble(string)")

But what does it actually print on the console? As usually, that depends! It depends on your own user profile and its culture. Are you using a culture, where “.” (dot) is a decimal divider or a thousands separator?

So the example above will print “1.23” if you have an English culture setting or it will print “123” if you have a German culture. So that is most probably not what you want. What you want is consistency and predictability.

As a kind of an **anti pattern** (which I saw already way to often) you could replace dot with comma or comma with dot depending on what you want and you may get it. I am not showing samples on purpose here, **but the key take-away is to not use string replacings for this purpose!**

So what should you do instead? .Net has a good implementation of Cultures so it know very well how to handle all of this, the only thing you have to actively do is telling it, what culture it should use. If you do not provide a culture, it implicitly uses the CurrentCulture. So, the first example written in a more explicitly way would be:![Explicit culture usage](https://az275061.vo.msecnd.net/blogmedia/2015/03/convert_todouble_explicit.png "Explicit culture usage")

So all you are left to decide is which Culture should be used, because the default is derived from the actual user context and will therefor be different for every user/region. In the case of the Console.WriteLine this might be fine, because you may want to show the number to the user in the way he is used to read numbers but the Convert.ToDouble use-case is different. You have to decide the culture to use based on the origin of the value and in my example it is a constant value in the program but it could come from a file or a web service or whatever _or from user input_.

To make my example work the same for every user, I am using the invariant culture:
![Convert.ToDouble with invariant culture](https://az275061.vo.msecnd.net/blogmedia/2015/03/convert_todouble_invariant_culture.png "Convert.ToDouble with invariant culture")

The invariant culture is sort of a baseline culture and it is mostly equal to the English culture. As a last bonus, here are some ways to create cultures:[![Some ways to get CultureInfo - Instances](https://az275061.vo.msecnd.net/blogmedia/2015/03/some_cultures_thumb.png "Some ways to get CultureInfo - Instances")](https://az275061.vo.msecnd.net/blogmedia/2015/03/some_cultures.png)

