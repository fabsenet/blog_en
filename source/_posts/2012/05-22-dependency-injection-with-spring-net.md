---
title: Dependency Injection With Spring.Net
tags:
  - .net
  - 'C#'
  - coding
date: 2012-05-22T20:13:46.000Z
author: Fabian Wetzel
---

As a really late note to my article [Dependency injection &amp; their Pitfalls](https://fabse.net/blog/2011/09/25/dependency-injection-their-pitfalls/) I want to provide some insights to Spring.Net. The core component is an IoC container and the documentation states:
 > Circular Dependencies <p>If you are using predominantly constructor injection it is possible to create unresolvable circular dependency scenario. <p>For example: Class A, which requires an instance of class B to be provided via constructor injection, and class B, which requires an instance of class A to be provided via constructor injection. **If you configure objects for classes A and B to be injected into each other, the Spring IoC container detects this circular reference at runtime, and throw a `ObjectCurrentlyInCreationException`.** 

This is really missing in Unity. The IoC container I was using in the last project.


