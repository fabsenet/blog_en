---
title: How to make static legacy code testable
id: 588
tags:
  - coding
  - mocking
  - unittesting
date: 2011-09-09T15:32:37.000Z
author: Fabian Wetzel
---

I had the opportunity to work in a team developing and improving a large legacy application. The project had some unit tests already but there was a long way to go in terms of increasing the test coverage.

Many internal services are implemented as a bunch of static methods like so:
<pre class="code"><span style="color: blue;">**static** class </span><span style="color: #2b91af;">SeriousService </span>{
    <span style="color: blue;">public **static** int </span>DoSomething(<span style="color: blue;">string </span>value)
    {
        <span style="color: green;">//&lt;side effects here&gt; </span><span style="color: blue;">return </span>17;
    }
}</pre>
And the usages of these static classes are all over the place like so:
<pre class="code"><span style="color: blue;">class </span><span style="color: #2b91af;">SomeModule </span>{
    <span style="color: blue;">public void </span>ExecuteOrder(<span style="color: #2b91af;">Order </span>order)
    {
        <span style="color: green;">//... </span><span style="color: #2b91af;">SeriousService</span>.**DoSomething**(order.Name);
        <span style="color: green;">//... </span>}
}</pre>
![image](https://az275061.vo.msecnd.net/blogmedia/2011/09/image51.png "image")

The challenge was to write a unit test which would test ExecuteOrder() without side effects in SeriousService.

A state-of-the-art application would insert the service through dependency injection into SomeModule. You could provide a mock for the service and you would be ready to write your unittest.

Unluckily, changing the caller or the signature of the callee was no option to me. The chance to introduce incompatibilities somewhere in the huge family of applications and tools was to high.

After some thinking I came up with the idea to extract the functionality out of the static service:

![image](https://az275061.vo.msecnd.net/blogmedia/2011/09/image52.png "image")

The “new” static service endpoint has now a private static reference to the service implementation and all public methods forward there calls to this implementation. The new service implementation is based on an extracted interface. Caller and callee are still unchanged (red rectangle). In code, it looks like so:
<pre class="code"><span style="color: blue;">interface </span><span style="color: #2b91af;">ISeriousService </span>{
    <span style="color: blue;">int </span>DoSomething(<span style="color: blue;">string </span>value);
}

<span style="color: blue;">class </span><span style="color: #2b91af;">SeriousServiceImpl </span>: <span style="color: #2b91af;">ISeriousService </span>{
    <span style="color: blue;">public int </span>DoSomething(<span style="color: blue;">string </span>value)
    {
        <span style="color: green;">//&lt;side effects here&gt; </span><span style="color: blue;">return </span>17;
    }
}

<span style="color: blue;">static class </span><span style="color: #2b91af;">SeriousService </span>{
    <span style="color: blue;">private static </span><span style="color: #2b91af;">ISeriousService </span>_seriousService
                            = <span style="color: blue;">new </span><span style="color: #2b91af;">SeriousServiceImpl</span>();

    <span style="color: green;">//Static endpoint </span><span style="color: blue;">public static int </span>DoSomething(<span style="color: blue;">string </span>value)
    {
        <span style="color: blue;">return </span>_seriousService.DoSomething(value);
    }
}</pre>
Until here, all we have done is to insert another level of indirection. But this enables us to replace the real functionality of the service with a mock:

![image](https://az275061.vo.msecnd.net/blogmedia/2011/09/image53.png "image")

This is possible if the service “endpoint” gets a public method to replace its implementation:
<pre class="code"><span style="color: blue;">static class </span><span style="color: #2b91af;">SeriousService </span>{
    <span style="color: blue;">private static </span><span style="color: #2b91af;">ISeriousService </span>_seriousService
                            = <span style="color: blue;">new </span><span style="color: #2b91af;">SeriousServiceImpl</span>();

** <span style="color: blue;">public static void </span>ReplaceServiceImpl(<span style="color: #2b91af;">ISeriousService </span>newImpl) { _seriousService = newImpl; }**

    <span style="color: green;">//Static endpoint </span><span style="color: blue;">public static int </span>DoSomething(<span style="color: blue;">string </span>value)
    {
        <span style="color: blue;">return </span>_seriousService.DoSomething(value);
    }
}</pre>
Having all of this in place you can write your unit test for the module without the fear of any unforseen sideeffects:
<pre class="code">[<span style="color: #2b91af;">TestFixture</span>]
<span style="color: blue;">class </span><span style="color: #2b91af;">SomeModuleTest </span>{
    [<span style="color: #2b91af;">Test</span>]
    <span style="color: blue;">public void </span>ExecuteOrder_handles_condition_xyz()
    {
        <span style="color: green;">//Setup </span><span style="color: blue;">var </span>service = <span style="color: blue;">new </span><span style="color: #2b91af;">Mock</span>&lt;<span style="color: #2b91af;">ISeriousService</span>&gt;();
        <span style="color: #2b91af;">SeriousService</span>.**ReplaceServiceImpl**(service.Object);

        <span style="color: green;">//Execute </span><span style="color: blue;">new </span><span style="color: #2b91af;">SomeModule</span>().ExecuteOrder(<span style="color: blue;">new </span><span style="color: #2b91af;">Order</span>());

        <span style="color: green;">//Asserts here </span>}
}</pre>
There is one more thing left to be done. Obviously the real instance of SeriousServiceImpl is gone for good after executing the test. So if you want to be able to reuse the current AppDomain for another test you either need to recover it somehow or you have to replace it in every test. I have a nice solution for this as well but this article is already long enough.

So summing up, we saw how to introduce another level of indirection into our architecture. We used it to swap the implementation of a static service as was needed to write unit tests without side effects.
