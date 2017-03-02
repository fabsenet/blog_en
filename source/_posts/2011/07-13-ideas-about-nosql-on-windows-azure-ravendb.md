---
title: 'Ideas about NoSql on Windows Azure: RavenDB'
tags:
  - Azure
  - NoSql
  - RavenDB
date: 2011-07-13T18:43:08.000Z
author: Fabian Wetzel
---

I have a really great idea for a software product and I want to implement it as a software as a service. I am not going to tell more about the actual idea for now. Instead I want to focus this post on deciding the way how I will implement the storage.

**Requirements**

Because of my .Net background I am going to use [Windows Azure](http://www.microsoft.com/windowsazure/) anyway.
Furthermore I want to have an architecture which is scalable as much as possible. The application should be able to run on only one extra small instance and should be able to scale using many instances in a seamless and efficient ways.

**RavenDB as a solution**

I am following [Ayende](http://ayende.com/blog) for quite a long time now and I appreciate his skills and knowledge. He made me start diving into the NoSql-Space some time ago with his document database [RavenDB](http://ravendb.net/). I am quite impressed by it. I was thinking about using it for my service but there are some issues:

*   [RavenDB is not free](http://ravendb.net/licensing). It’s available under the AGPL license but I am not going to release the source of my own stuff so this is not an option. I have some money available and Ayende offers free licenses to startup companies as well so I basically could go for it nevertheless.
*   RavenDB uses the local filesystem as the underlying storage. Is this possible on Azure? Yes of course. The feature is called Windows Azure Drive. The compute instance gets a simulated local drive which is stored in the Azure Blob Storage. This is somehow great if you want to run some legacy stuff in the cloud but it feels like a huge crook doing this to run a software which is designed with Azure in mind.
Think about scaling: RavenDB is able to [shard](http://ravendb.net/docs/article-page/3.5/csharp/server/scaling-out/sharding/how-to-setup-sharding) and [replicate](http://ravendb.net/docs/article-page/3.5/csharp/server/scaling-out/replication/how-replication-works) but do you really want to setup another instance of RavenDB and Azure Drive just to scale up?
Scaling down is even worse: You would either need a way to run both Raven-Instances on a single compute instance or you would need to copy the data to free one instance of RavenDB completely. I simply want to change the number of instances in the Azure configuration and it should “just work”.

**Solutions?**

Is running a database product on top of Azure compute instances a great idea at all? Particularly the last part about scaling leaves the opinion in my head that this is not what I want to deal with.

Should Ayende implement Azure Blob Storage as a supported underlying storage system for RavenDB? Probably not. You would still have the burden to setup and configure RavenDB instances.

**My decision**

It is a somewhat hard decision because I really like RavenDB but I think I will not use it.


