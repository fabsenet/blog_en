---
title: Dependency injection and their Pitfalls*
id: 593
tags:
  - 'C#'
  - coding
  - dependency injection
  - Prism
date: 2011-09-25T18:32:56.000Z
author: Fabian Wetzel
---

After I had my dependency injection set up and running, I noticed a shift in my way of developing. I started to be more focused on only one class and their implementation at a time. If I felt the need for another service instance, I just added it to the constructor and would go on coding. I thought that the dependency injection container would take care of how to create the new service for me.

![image](https://az275061.vo.msecnd.net/blogmedia/2011/09/image54.png "image")

This is nothing fancy so far. After coding for straight 20 minutes without any testing in between I decided to test it. I noticed my machine was doing really nothing but burning cpu for a bunch of seconds and quitting then with a StackoverflowException. I had no idea what was going on.

The exception was not really telling too much about the problem. The only thing was a truncated stacktrace. It had something to do with the container trying to create an instance of a service. Without any further information it would be hard to pinpoint this so I decided to search for trace information. I am using [Microsoft Prism](http://compositewpf.codeplex.com/) with the Unity container for inversion of control. So does Unity provide any traces of what is going on? Surprisingly, this is not the case! There is no magic switch.

So I had no choice but removing constructor arguments here and there until I found the root problem. I had managed to create a circular reference:

![image](https://az275061.vo.msecnd.net/blogmedia/2011/09/image61.png "image")

[The MSDN](http://msdn.microsoft.com/en-us/library/ff660897%28v=pandp.20%29.aspx) is telling me, that it is my responsibility to prevent this and it also warns of endless recursion. Endless recursion always ends with an StackoverflowException.

My solution was simple. I removed the circular reference through removing one reference. It was not used anyway.

_*The name of this article is freely leaned on the name of the blog _[_EAI Technologies &amp; their Pitfalls_](http://eai-technologies-and-their-pitfalls.blogspot.com/)_ of an ex coworker_ ![Winking smile](https://az275061.vo.msecnd.net/blogmedia/2011/09/wlEmoticon-winkingsmile3.png)
