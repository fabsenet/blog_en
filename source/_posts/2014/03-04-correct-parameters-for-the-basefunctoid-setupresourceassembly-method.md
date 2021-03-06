---
title: Correct Parameters For The BaseFunctoid.SetupResourceAssembly Method
tags:
  - Allgemein
date: 2014-03-04T13:41:05.000Z
author: Fabian Wetzel
---

If you are writing your own BizTalk Functoid you have to provide information about your Ressources used to describe your functoid name, details and icon. For this task, you have to call the SetupResourceAssembly function in your functoid constructor. Okay, but what are the correct parameter values? The [MSDN article](https://msdn.microsoft.com/en-us/library/microsoft.biztalk.basefunctoids.basefunctoid.setupresourceassembly.aspx) is not only not good but plain wrong.

![](030414_1242_CorrectPara1.png)

resAsmName does NOT expect the name of the assembly, but the full qualified name of your resource dictionary.

If your resource is in your Project root folder and is called "Resource.resx" and your project has a default namespace of "My.Company.SuperFunctoid" than you would provide the value "My.Company.SuperFunctoid.Resource" as the value of the first parameter.

The second parameter is the assembly, which contains the resource dictionary. Here you could do Assembly.GetExecutingAssembly() to get it.

To make this more refactoring safe, I would suggest the following call instead:

![](030414_1242_CorrectPara2.png)

This way, you can change your default namespace without fear of breaking "magic" strings.


