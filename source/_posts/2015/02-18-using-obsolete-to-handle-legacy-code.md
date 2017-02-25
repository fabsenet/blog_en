---
title: 'Using [Obsolete] to handle legacy code'
id: 2125
comment: false
tags:
  - .net
  - 'C#'
  - coding
  - Coding Guideline
date: 2015-02-18T10:32:51.000Z
author: Fabian Wetzel
subtitle: >-
  I frequently use the ObsoleteAttribute in legacy, spread-out codebases and I
  want to tell you how and why.
description: >-
  I frequently use the ObsoleteAttribute in legacy, spread-out codebases and I
  want to tell you how and why.
---

I frequently use the ObsoleteAttribute in legacy, spread-out codebases and I want to tell you how and why. But at first, what is the ObsoleteAttribute ([MSDN](https://msdn.microsoft.com/en-us/library/system.obsoleteattribute(v=vs.110).aspx "ObsoleteAttribute on MSDN"))?

**TL;DR;** I like to use the obsolete attribute to transition implementations and signatures in a smooth way.

The attribute has 3 different constructors. The first one has no parameters at all. My advice here is to never use it ever because it does not tell why you used it.

The second constructor takes one string parameter. This is a message meant for others developers. If you use or try to use a method or class tagged with this attribute you will see the message and it will generate a compiler warning. I always use this message to explain “why?” and “what’s next?”. This means “Why is this message obsolete?”. It often is because the method has a vague naming or an obscure handling of some edge cases. But I see it as a good practice to always tell the caller what he should do next. So I always end the message with “please use the other method overload with parameter xyz.” or “please use method xyz instead”.

![ObsoleteAttribute_in_VisualStudio](https://az275061.vo.msecnd.net/blogmedia/2015/02/ObsoleteAttribute_in_VisualStudio.png "ObsoleteAttribute_in_VisualStudio")

So why do I not simply refactor the method name and/or signature? Most legacy projects tend to have everything as public, have no unit tests and reuse code in several solutions in a mix+match style. It is hard to be absolutely certain to really find all callers. Some projects tend to do partial deployments as well. This means to replace only a subset of the assemblies in a deployment. This is most often done to save time. So as a baseline, I only refactor it, if I am sure it is safe and most of the time I cannot guarantee that. My next best way is to mark the method as obsolete and create a fixed version of it and then redirecting the caller using the message in the obsolete attribute.

## But who cares about compiler _warnings_?

This is, where the last constructor comes into play. You can provide a “true” after the message and the warning becomes an error message which breaks the build. This is the route I take if I am fairly sure, I changed all callers. There is one benefit over simply removing the old method. The method with its implementation gets still compiled.  <p>This helps in the case of an old assembly of a caller which was compiled against the old method which now loads the new library in the mixed deployment scenario. In the case of the obsolete attribute the actual method is still fully compiled and usable so the old process still works. If I had deleted the method instead, I would now receive a MissingMethodException.

And after some weeks/month I simply remove old obsolete methods and I can be sure, there are no callers left.

So in summary I like to use the obsolete attribute to transition implementation and method signatures in a smooth way.
</p>

