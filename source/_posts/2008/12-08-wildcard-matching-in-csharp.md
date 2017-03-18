---
title: 'Wildcard-Matching in C#'
tags:
  - Allgemein
date: 2008-12-08T16:56:50.000Z
author: Fabian Wetzel
---

Hat mir gerade sehr geholfen und an sich ist es ja ein sehr generischer Codeschnipsel, von daher viel Spaß damit:

```cs
/// <summary>
/// Liefert true, wenn der Text das Suchwort enthält,
/// dabei werden * (Sternchen) als Wildcards verwendet
/// </summary>
/// <param name="text">Der zu testenden Text</param>
/// <param name="search">Das Suchwort mit "*" als Wildcards</param>
/// <returns>True bei Match, sonst false</returns>
private static bool IsWildcardMatching(String text, String search)
{
    var s = "^" + Regex.Escape(search).Replace("\*", ".*") + "$";
    return Regex.IsMatch(text, s, RegexOptions.IgnoreCase);
}
```


