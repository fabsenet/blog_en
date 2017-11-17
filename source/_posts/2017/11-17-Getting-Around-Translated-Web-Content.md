---
author: Fabian Wetzel
title: Getting around translated content on the web
subtitle: I usually do not like translated programming content because it could be out of date or a translated exception message might make it difficult to google
description: I usually do not like translated programming content because it could be out of date or a translated exception message might make it difficult to google. Continue reading this in my blog.
date: 2017-11-17 16:19:50
tags:
 - firefox
 - My Setup
cover: img/hamburger_hafen/2999.jpg
coversrcset: 
 - /img/hamburger_hafen/100.jpg 100w
 - /img/hamburger_hafen/250.jpg 250w
 - /img/hamburger_hafen/500.jpg 500w
 - /img/hamburger_hafen/750.jpg 750w
 - /img/hamburger_hafen/999.jpg 999w
 - /img/hamburger_hafen/1499.jpg 1499w
 - /img/hamburger_hafen/1999.jpg 1999w
 - /img/hamburger_hafen/2999.jpg 2999w
---
# The Background Story

I am German, my OS and my browser are set to german. But programming is better done in english. It is far easier to search for english exceptions and I have no idea why Microsoft provides translated exception messages. Also the language on StackOverflow and most sites is English.

Sometimes I land on a site like Microsoft Docs (or MSDN) and it gives me German content. Most of the time the translation is not done by a human and it is usually served together with this annoying sentence overlay feature. **It is so annoying!**

![](microsoft_translation_overlay.png)

# Solve the problem!

## Manual way of solving

**My German sample url:**

```text
https://docs.microsoft.com/de-de/sql/sql-server/what-s-new-in-sql-server-2017
```

as you can see, there is a `de-de` in it. This will give you the German translation. Simply changing that part to `en-us` will give you the Englisch version.

**Final URL:**

```text
https://docs.microsoft.com/en-us/sql/sql-server/what-s-new-in-sql-server-2017
```

## Automated problem solving

This is a developer blog, so lets find an automated solution! I am a Firefox user, so I searched for redirect in the extensions and I found [REDIRECTOR](http://einaregilsson.com/redirector/). It actually is available for all major browsers:

- [REDIRECTOR for Firefox](https://addons.mozilla.org/en-US/firefox/addon/5064)
- [REDIRECTOR for Chrome](https://chrome.google.com/webstore/detail/redirector/ocgpenflpmgnfapjedencafcfakcekcd)
- [REDIRECTOR for Opera](https://addons.opera.com/en/extensions/details/redirector-2/)

The setup of the redirection rule is best done with a sample url. You have to provide a URL filter and a way to rewrite it.

![Redirector Setup](redirector_setup.png)

For your ease of use, I used the export feature of the extension:

```json
{
    "createdBy": "Redirector v3.1.0",
    "createdAt": "2017-11-17T15:08:03.077Z",
    "redirects": [
        {
            "description": "Microsoft always in English",
            "exampleUrl": "https://docs.microsoft.com/de-de/sql/sql-server/what-s-new-in-sql-server-2017",
            "exampleResult": "https://docs.microsoft.com/en-us/sql/sql-server/what-s-new-in-sql-server-2017",
            "error": null,
            "includePattern": "https://*.microsoft.com/de-de/*",
            "excludePattern": "",
            "redirectUrl": "https://$1.microsoft.com/en-us/$2",
            "patternType": "W",
            "processMatches": "noProcessing",
            "disabled": false,
            "appliesTo": [
                "main_frame"
            ]
        }
    ]
}
```

I really like how I can solve my problem without needing to talk to Microsoft or any other site owner about there web site. Hope that helps!