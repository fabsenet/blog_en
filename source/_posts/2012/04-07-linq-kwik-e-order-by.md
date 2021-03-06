---
title: 'Linq Kwik-e: Order by'
tags:
  - 'C#'
  - coding
  - Linq
date: 2012-04-07T10:34:35.000Z
author: Fabian Wetzel
---

Imagine you are writing a SQL select statement to read all products from your database ordered by **category** and then by **name**, it would look like:

```sql
SELECT *
FROM products
ORDER BY category, name 
```

Please note that my textual description follows the notation of the order statements. 

Now lets imagine we have a list of products in C# and want to sort them the same way using Linq:
![](image82.png) 

As you can see, it follows the natural description.

I like to directly use the Linq extension methods instead of Linq so I was used to write the same as:

![](image83.png)

To get the same ordered list as in the samples before, I had to reverse the order of the orderby statements. This feels very unnatural and is easy to get wrong. Luckily I discovered the ThenBy() method:

![](image84.png)

This way, I can write the statements in the same order as I was used to!

_You may want to read my _[_earlier Linq Kwik-e_](https://fabse.net/blog/2011/08/29/linq-kwik-e/)_ as well ![Zwinkerndes Smiley](wlEmoticon-winkingsmile7.png)_


