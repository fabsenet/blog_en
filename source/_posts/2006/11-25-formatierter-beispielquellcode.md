---
title: Formatierter Beispielquellcode
tags:
  - .net
date: 2006-11-25T00:38:03.000Z
author: Fabian Wetzel
---

```cs
//Billiges search and replace im Clipboard
public void replaceText()
{
    if(Clipboard.ContainsText())
    {
        String text = Clipboard.GetText();

        if (!text.Equals(lastText))
        {
            lastText = text =
                  text.Replace("-01-", "-Informieren-");

            Clipboard.SetText(text);

        }
    }
}
```

**Update:** Den Code gibts wohl nicht in Farbe ?!

**Update²:** Es geht doch, man muss nur mal die Styles in Theme einbinden!

**Update³:** In Markdown konvertiert und Hexo macht jetzt das Code-Styling
