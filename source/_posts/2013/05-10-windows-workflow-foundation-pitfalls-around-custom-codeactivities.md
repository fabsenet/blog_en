---
title: 'Windows Workflow Foundation: Pitfalls Around Custom CodeActivities'
tags:
  - 'C#'
  - coding
  - Coding Guideline
  - Workflow Foundation
date: 2013-05-10T10:39:31.000Z
author: Fabian Wetzel
---

In object oriented design you have a class and instances of that class. The Workflow Foundation gives you the ability to produce your own activities through deriving from CodeActivity or CodeActivity&lt;T&gt;. So you have to produce a class.

**TL;DR;** Instances of CodeActivities instantiated per workflow instance but are reused through instances and therefor you should avoid state and support concurrent calls.

We were observing a bug in our system. There was a CodeActivity validating messages and it worked as long as there was no invalid message. Starting with the first invalid message, all messages where marked as invalid. Digging deeper, there was a private string field saving the error messages, which was not reset in the Execute() method. Obviously the runtime reuses CodeActivity instances.

So the first fix of this bug was to reset the error message at the start of the Execute method.

While not observing bugs for now, I asked myself: Will there be bugs in high load scenarios where the single instance is used concurrently? To answer this, I produced the following CodeActivity:

![](051013_0850_WindowsWork1.png)

This should always return true in a non-concurrent environment. I build this simple workflow to test the CodeActivity:

![](051013_0850_WindowsWork2.png)

The published workflow has this simple interface:

![](051013_0850_WindowsWork3.png)

So I created a simple console application to test the service. I had to do this concurrently providing a different number on every call.

![](051013_0850_WindowsWork4.png)

If the service would return true in all cases, we would observe 10 dots in our console window. But it outputs "#########." Which means that concurrent calls interfere with each other.

To avoid this potential bug at all, it looks like a good practice to me to avoid properties in your CodeActivities except the Argument&lt;T&gt; properties. So if you remove _num in my sample activity, it is not possible to interfere anymore in concurrent situations.

So the better fix for our bug was to remove the error message field and replace it with a local variable.

The codebase included already a good amount of CodeActivities so I decided to implement this coding guideline in form of a unit test. The test uses reflection to check all types derived from CodeActivity, whether they have properties. This unit test helps to ensure the guideline is still met if another person takes over the codebase as well.


