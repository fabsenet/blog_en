---
title: String.GetHashCode() Internals
tags:
  - .net
  - 'C#'
  - coding
date: 2011-10-25T19:11:56.000Z
author: Fabian Wetzel
---

While I was eating dinner, I had this somehow suprising question in my mind: How is String.GetHashCode() implemented? Is it fast?

It needs a linear time based on the length of the string. This is understandable if you think about what it is doing. It needs to generate a “Fingerprint”-number based on its content, so you need to take a look at all the content at least once. So it is O(N).

I was going to do something more useful while I noticed all the precompiler conditions. That is very interesting! The function returns different results whether it is compiled for 32bit or 64bit. The debug version of the framework (Microsoft internal only?) even changes its resulting hashcodes with every buildnumber.
  > We want to ensure we can change our hash function daily.     
> This is perfectly fine as long as you don't persist the      
> value from GetHashCode to disk or count on String A       
> hashing before string B.&#160; Those are bugs in your code.  

So you better avoid storing hashcodes and you should not exchange hashcodes across process-boundarys. Your communication partner may use a different number of bits!

Last but not least: the result is not stored but recomputed every time you call the function. The implementation is following the advice to not store its result itself.


