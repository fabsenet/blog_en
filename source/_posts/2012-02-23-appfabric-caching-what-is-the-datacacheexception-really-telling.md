---
title: 'Appfabric Caching: What is the DataCacheException really telling?'
id: 620
tags:
  - BizTalk
  - 'C#'
  - caching
  - coding
  - lessons learned
date: 2012-02-23 17:22:02
---

I had the opportunity to use Windows Server AppFabric Caching in a project which is successful running in production for some time now. I was able to collect some knowledge around using AppFabric Caching in development and in production.

The usage of the cache is quite simple and you will find it well documented within the MSDN.

I consider the descriptiveness of the provided error messages as the real pain points. It basically always looks like this:
 > Microsoft.ApplicationServer.Caching.**DataCacheException** <p>ErrorCode&lt;ERRCA0017&gt;: SubStatus&lt;ES0006&gt;: There is a temporary failure. Please retry later. 

It feels like the hole caching project throws this exception no matter what the real reason is. I am thinking, I really managed to produce all of them ![Smiley](https://az275061.vo.msecnd.net/blogmedia/2012/02/wlEmoticon-smile1.png) <p>Here is a short list for you to check against, if you managed to see this exception as well: 

*   **Permissions:** You are not permitted to connect to the cache server. You should check, whether you granted the calling user access.
*   **Security settings in client and server differ:** You can configure message-level and transport-level security on client and server separately and they basically need to be identically.
*   **The cache service is not running:** If your server which is running the cache service has a power cycle (planned or unplanned), the cache service will not be running anymore. The default setting is to start the service “manually”. My best advice is to change this to “automatically” immediately after installation.
*   **The cache is throttling:** If the server is low on available physically memory, the service stops to accept new items.
*   **You disposed the Factory:** While the DataCacheFactory implements IDisposable, you MUST NOT put it in a using-block. If you dispose the factory, the DataCacheClient stops working.
*   **You need at least one more free thread (?):** This one involves some guessing and is maybe wrong, so your mileage may vary. We were instantiating the DataCacheFactory in a BizTalk-host instance with a high count of active processes starting at the same time. I used a static factory instance and double checked locking for creating it. So one process was creating the factory and all others were actively waiting for it to finish. If the number of active processes exceeds the number of allowed threads per CPU in total, it looks like the instantiation of the factory always times out. The solution was to replace the lock-statement with a Monitor.TryEnter / Monitor.Exit and throwing a [RetryTransactionException](http://msdn.microsoft.com/en-us/library/microsoft.xlangs.basetypes.retrytransactionexception%28v=bts.10%29.aspx) if it was not possible to get the lock. This behavior made threads available again which in turn allowed the Factory creation to succeed. I really cannot tell if my guessed starting point was right, but after the change was made, the error was gone for good. <p>But if you worked your way around all this error messages, you get a really stable product which is fun to work with.