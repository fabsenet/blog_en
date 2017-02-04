---
title: Formatierter Beispielquellcode
id: 28
tags:
  - .net
date: 2006-11-25 00:38:03
---

<pre class="csharpcode"><span class="rem">//Billiges search and replace im Clipboard</span>
<span class="kwrd">public</span> <span class="kwrd">void</span> replaceText()
{
    <span class="kwrd">if</span>(Clipboard.ContainsText())
    {
        String text = Clipboard.GetText();

        <span class="kwrd">if</span> (!text.Equals(lastText))
        {
            lastText = text =
                  text.Replace(<span class="str">"-01-"</span>, <span class="str">"-Informieren-"</span>);

            Clipboard.SetText(text);

        }
    }
}</pre>

**Update:** Den Code gibts wohl nicht in Farbe ?!

**Update²:** Es geht doch, man muss nur mal die Styles in Theme einbinden!