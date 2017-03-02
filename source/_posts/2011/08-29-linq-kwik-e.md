---
title: Linq Kwik-e
tags:
  - 'C#'
  - coding
  - Kwik-e
  - Linq
date: 2011-08-29T22:19:46.000Z
author: Fabian Wetzel
---

Really often I use the Linq extension methods to formulate a query to reduce a set of data to a single value. Most of the time I refer to the First() method for this use case.
<pre class="code"><span style="color: blue;">var </span>fabse = myList.Where(p =&gt; p.Name == <span style="color: #a31515;">"Fabse"</span>).First();</pre>
There are several ways to improve this scenario. First has an overload where it accepts a predicate function, so the following example yields the same result:
<pre class="code"><span style="color: blue;">var </span>fabse = myList.First(p =&gt; p.Name == <span style="color: #a31515;">"Fabse"</span>);</pre>
But what happens if your list has no elements fulfilling your filter? First() will throw an exception. It is considered bad style to use exceptions to handle program flow. But is quite hard sticking to First() and avoiding the exception at the same time.

It is better to use FirstOrDefault() if there is the possibility of not getting any result. If there is no result, the default for the inferred data type is used, which is null for all reference types and 0 (zero) or false for int/float/double/… and bool. Sample:
<pre class="code"><span style="color: blue;">var </span>fabse = myList.FirstOrDefault(p =&gt; p.Name == <span style="color: #a31515;">"Fabse"</span>);
<span style="color: blue;">if </span>(fabse != <span style="color: blue;">null</span>)
{
    <span style="color: green;">//use fabse ;-</span><span style="color: green;">)
</span>}</pre>
Today I discovered the functions Single() and SingleOrDefault() which have nearly the same semantics but they will test the data source for further hits regarding your predicate. If there are other hits, you will see an InvalidOperationException.

I like this behavior very much because I often search for the existence of a somehow special object and based on this existence I do something or not. If there is more than one of these special objects, there is most likely something wrong with the data and it is better to stop the process and to examine the data. So an exception feels right at this moment.

To finish up this kwik-e: First() will give you the first (duh!) element while Last() and LastOrDefault() will give you the last element.


