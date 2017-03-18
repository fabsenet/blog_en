---
title: How to make static legacy code testable
tags:
  - coding
  - mocking
  - unittesting
date: 2011-09-09T15:32:37.000Z
author: Fabian Wetzel
---

I had the opportunity to work in a team developing and improving a large legacy application. The project had some unit tests already but there was a long way to go in terms of increasing the test coverage.

Many internal services are implemented as a bunch of static methods like so:
```cs
static class SeriousService 
{
    public static int DoSomething(string value)
    {
        //<side effects here> return 17;
    }
}
```

And the usages of these static classes are all over the place like so:
```cs
class SomeModule 
{
    public void ExecuteOrder(Order order)
    {
        //… 
        SeriousService.DoSomething(order.Name);
        //… 
    }
}
```
![](image51.png)

The challenge was to write a unit test which would test ExecuteOrder() without side effects in SeriousService.

A state-of-the-art application would insert the service through dependency injection into SomeModule. You could provide a mock for the service and you would be ready to write your unittest.

Unluckily, changing the caller or the signature of the callee was no option to me. The chance to introduce incompatibilities somewhere in the huge family of applications and tools was to high.

After some thinking I came up with the idea to extract the functionality out of the static service:

![](image52.png)

The "new" static service endpoint has now a private static reference to the service implementation and all public methods forward there calls to this implementation. The new service implementation is based on an extracted interface. Caller and callee are still unchanged (red rectangle). In code, it looks like so:
```cs
interface ISeriousService 
{
    int DoSomething(string value);
}

class SeriousServiceImpl : ISeriousService 
{
    public int DoSomething(string value)
    {
    //<side effects here> 
    return 17;
    }
}

static class SeriousService 
{
    private static ISeriousService _seriousService = new SeriousServiceImpl();
    
    //Static endpoint 
    public static int DoSomething(string value)
    {
        return _seriousService.DoSomething(value);
    }
}
```

Until here, all I have done is to insert another level of indirection. But this enables us to replace the real functionality of the service with a mock:

![](image53.png)

This is possible if the service "endpoint" gets a public method to replace its implementation:
```cs
static class SeriousService
{
    private static ISeriousService _seriousService = new SeriousServiceImpl();

    public static void ReplaceServiceImpl(ISeriousService newImpl) { _seriousService = newImpl; }

    //Static endpoint 
    public static int DoSomething(string value)
    {
        return _seriousService.DoSomething(value);
    }
}
```


Having all of this in place you can write your unit test for the module without the fear of any unforseen sideeffects:
```cs
[TestFixture]
class SomeModuleTest {
    [Test]
    public void ExecuteOrder_handles_condition_xyz()
    {
        //Setup 
        var service = new Mock<ISeriousService>();
        SeriousService.ReplaceServiceImpl(service.Object);

        //Execute 
        new SomeModule().ExecuteOrder(new Order());

        //Asserts here 
    }
}
```


There is one more thing left to be done. Obviously the real instance of SeriousServiceImpl is gone for good after executing the test. So if you want to be able to reuse the current AppDomain for another test you either need to recover it somehow or you have to replace it in every test. I have a nice solution for this as well but this article is already long enough.

So summing up, I introduced another level of indirection into my architecture. I used it to swap the implementation of a static service as was needed to write unit tests without side effects.
