---
title: Writing 'throw ex;' is almost always wrong!
tags:
  - .net
  - 'C#'
  - Coding Guideline
date: 2013-12-16T17:34:55.000Z
author: Fabian Wetzel
---

So what is the difference between `throw ex;` and `throw;` in C#? The first statement recreates the stack trace while the latter one preserves it. Consider the following method, which will throw an exception if it gets called:

```cs
private static void Inner()
{
    throw new Exception();
}
```

And then you have two different methods implementing the two different coding styles:

```cs
private static void Rethrow()
{
    try
    {
        Inner();
    }
    catch (Exception ex)
    {
        throw; //this is a REthrow
    }
}

private static void ThrowEx()
{
    try
    {
        Inner();
    }
    catch (Exception ex)
    {
        throw ex;//this is a second throw
    }
}
```

At last, you have a short console application to call both methods and print their stack trace:

```cs
static void Main(string[] args)
{
    try
    {
       ** ThrowEx();**
    }
    catch (Exception ex)
    {
        PrintEx(ex);
    }
//...
    try
    {
       ** Rethrow();**
    }
    catch (Exception ex)
    {
        PrintEx(ex);
    }
}
```

Here is the output:

![image](image.png "image")

As you can see, `throw;` preserves the actual location, where the exception really was thrown.

There is hardly any case where you want to hide the actual location of an error, so the best is to just use `throw;` as your default in a catch clause.


