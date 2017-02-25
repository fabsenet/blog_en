---
title: 'Wildcard-Matching in C#'
id: 290
tags:
  - Allgemein
date: 2008-12-08T16:56:50.000Z
author: Fabian Wetzel
---

Hat mir gerade sehr geholfen und an sich ist es ja ein sehr generischer Codeschnipsel, von daher viel Spaß damit:
<pre>/// &lt;summary&gt;
/// Liefert true, wenn der Text das Suchwort enthält,
/// dabei werden * (Sternchen) als Wildcards verwendet
/// &lt;/summary&gt;
/// &lt;param name="text"&gt;Der zu testenden Text&lt;/param&gt;
/// &lt;param name="search"&gt;Das Suchwort mit "*" als Wildcards&lt;/param&gt;
/// &lt;returns&gt;True bei Match, sonst false&lt;/returns&gt;
private static bool IsWildcardMatching(String text, String search)
{
    var s = "^" + Regex.Escape(search).Replace("\*", ".*") + "$";
    return Regex.IsMatch(text, s, RegexOptions.IgnoreCase);
}</pre>
