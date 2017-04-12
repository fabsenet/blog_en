---
author: Fabian Wetzel
title: Exception while running a BizTalk Map
date: 2017-04-12 14:55:15
tags:
subtitle: I have a map which gives only a not meaningful exception when running.
description: I have a map which gives only a not meaningful exception when running. Continue reading this in my blog...
---

# Problem

We migrate a rather large BizTalk solution from BizTalk 2009 to BizTalk 2016. As far as I know, the mapping implementation changed in BizTalk 2013 to use the `XslCompiledTransform` (instead of the obsolete `XslTransform`).

My map in question compiles just fine but running it in BizTalk just leaves me with a suspended instance and an unhelpful error description:

> Exception from HRESULT: 0x80131942

![Exception from HRESULT: 0x80131942](hresult_0x80131942.png)

# Root Cause

This is caused by a scripting functoid containing inline C#. The inline code contains a non-public method. This is no longer supported with `XslCompiledTransform`.

# Solution

If you know the root cause, you probably know to fix it as well.

I had basically this in my scripting functoid inline c#:

```cs
string MySample(string param1, string param2)
{
    return param1+param2;
}
```

Changing it to the following fixes the error. Notice the `public`!

```cs
public string MySample(string param1, string param2)
{
    return param1+param2;
}
```
