---
title: Correct Parameters For The BaseFunctoid.SetupResourceAssembly Method
id: 2061
comment: false
tags:
  - Allgemein
date: 2014-03-04 13:41:05
---

If you are writing your own BizTalk Functoid you have to provide information about your Ressources used to describe your functoid name, details and icon. For this task, you have to call the SetupResourceAssembly function in your functoid constructor. Okay, but what are the correct parameter values? The [MSDN article](http://msdn.microsoft.com/en-us/library/microsoft.biztalk.basefunctoids.basefunctoid.setupresourceassembly(v=bts.80).aspx) is not only not good but plain wrong.

![](https://az275061.vo.msecnd.net/blogmedia/2014/03/030414_1242_CorrectPara1.png)

resAsmName does NOT expect the name of the assembly, but the full qualified name of your resource dictionary.

If your resource is in your Project root folder and is called "Resource.resx" and your project has a default namespace of "My.Company.SuperFunctoid" than you would provide the value "My.Company.SuperFunctoid.Resource" as the value of the first parameter.

The second parameter is the assembly, which contains the resource dictionary. Here you could do Assembly.GetExecutingAssembly() to get it.

To make this more refactoring safe, I would suggest the following call instead:

![](https://az275061.vo.msecnd.net/blogmedia/2014/03/030414_1242_CorrectPara2.png)

This way, you can change your default namespace without fear of breaking "magic" strings.