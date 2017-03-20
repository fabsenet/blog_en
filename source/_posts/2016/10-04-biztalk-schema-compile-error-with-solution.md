---
title: BizTalk Schema Compile Error (With Solution)
tags:
  - BizTalk
  - coding
date: 2016-10-04T15:50:47.000Z
author: Fabian Wetzel
subtitle: >-
  I tried to compile my BizTalk project and all I got was this compile time (!)
  error
description: >-
  I tried to compile my BizTalk project and all I got was this compile time (!)
  error
---

**Problem:** I tried to compile my BizTalk project and all I got was this compile time (!) error:

> MySchema.xsd : error BEC2004: Object reference not set to an instance of an object.

Not helpful at all!

**Solution:** You may not use Max Occurs = 0 anywhere!


