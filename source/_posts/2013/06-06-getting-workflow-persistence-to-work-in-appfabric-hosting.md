---
title: Getting Workflow Persistence To Work In AppFabric Hosting
tags:
  - Coding Guideline
  - Look Inside
  - Workflow Foundation
date: 2013-06-06T15:16:22.000Z
author: Fabian Wetzel
---

We were using Windows Workflow Foundation 4 in a customer project and we tried to host them on Windows Server AppFabric Hosting. The hosting basically worked, but there was always the pain of persistence. Consider a simple Hello World workflow as a sample (File, New, WCF Workflow Service):

![](060613_1326_GettingWork1.png)

This should work as is without problems. Now I added the Persist shape:

![](060613_1326_GettingWork2.png)

Having this workflow running in AppFabric is not possible. It will start instances but they will fail on reaching the Persist shape. I thought, a Hello World sample with a Persist shape cannot be wrong, so it had to be the environment then.

So I spend many hours checking everything and searching the web up and down.

It turns out, it is the workflow which was wrong! I should have known better, because I was stumbling upon the same thing doing biztalk dev in the past.

I see the tooling as part of the problem as well, because at no point I was told, this aint gona work! Visual Studio does not warn you and the appfabric hosting monitoring kindly does not tell the bloody details at all:

![](060613_1326_GettingWork3.png)

The German text basically is saying: Dear Sir, I tried as hard as I could but I was not possible to persist your instance because of an error. You could have a look at the inner exception, but I am not going to give it to you!

I had to get the big gun to kill this bug :-) I attached Visual Studio to the IIS worker process (w3wp.exe). Then you have to uncheck "Just my code" in the debugger options:

![](060613_1326_GettingWork4.png)

And at last, you have to register for all thrown exceptions (Debug > Exceptions…):

![](060613_1326_GettingWork5.png)

At this point, I only had to start an instance of the offending workflow and watched for all exceptions. Turns out, he could not serialize some of my workflow variables.

And here I got the Aha!-effect**. If you reach a persist shape, you should only have variable instances in scope which are serializable.** This might be the golden rule. I had violated this rule many times having instances of …

*   Message (System.ServiceModel.Channels.Message)
*   CorrelationHandle (System.ServiceModel.Activities.CorrelationHandle)
*   XElement (System.Xml.Linq.XElement)
…in my variables, where every single one of them is causing problems. I redesigned the workflow to respect the rule and suddenly persistence was working great!

So the hello world with a persist shape is not working, because it has a CorrelationHandle in scope.

I started to think about how I could do it then?! But, you cannot do it at all and this is by design.

Consider a persisted workflow would be rehydrated on another AppFabric machine, 3 hours later or after a server restart. The client which was waiting on a synchronous answer is long gone, so why should I rehydrate the workflow to fail in sending a response one step later. So it is a design error in the workflow if you have a persist operation between a receive and a synchronous send.

If you made it until here, I want to suggest checking "Just my code" again when you are finished debugging. If you leave it unchecked, you are going to wait too long on every standard debugging session because the studio is loading symbol files for all framework assemblies.


