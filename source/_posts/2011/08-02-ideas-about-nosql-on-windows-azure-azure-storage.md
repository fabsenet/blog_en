---
title: 'Ideas about NoSql on Windows Azure: Azure Storage'
id: 563
tags:
  - Azure
date: 2011-08-02T21:47:40.000Z
author: Fabian Wetzel
---

_This article is the third and last in my small series about NoSql-Solutions on Windows Azure. You may want to read them in order._

1.  [_RavenDB_](https://fabse.net/blog/2011/07/13/ideas-about-nosql-on-windows-azure-ravendb/)2.  [_Sql Azure_](https://fabse.net/blog/2011/07/14/ideas-about-nosql-on-windows-azure-sql-azure/)3.  _Azure Storage_  

## Azure Storage

Microsoft proposes Azure Storage as the most scalable solution if you want to store data in the cloud. If you think of Windows Azure as an operating system for the cloud then Azure Storage is the supporting filesystem for it. It consist of three major parts: Tables, Queues and Blobs.

![Blob](https://az275061.vo.msecnd.net/blogmedia/2011/08/Blob1.png "Blob")

Azure Blobs are unstructured binary data just like files on a filesystem. You can&#160; store some additional metadata and you can control whether they are publicly available or protected.

![Queue](https://az275061.vo.msecnd.net/blogmedia/2011/08/Queue.png "Queue")

Azure Queues is a persistent Queue implementation. It gives you an async and decoupled way to comunicate between components of your distributed application.

![Table](https://az275061.vo.msecnd.net/blogmedia/2011/08/Table.png "Table")

Azure Tables is some kind of low level SQL table. In comparison to a real SQL table there are some limititions. Each table has only a partition key and a row key for efficient access. These two keys form a row identifier. There is no equivalent to a non-clustered index so querying with conditions which do not contain these two key columns are always expensive in terms of time. The flipside of this coin is very high scalability. An Azure Table is not limited in size and may span over several nodes.

Azure Storage is hosted for you so you do not have to worry about installing, configuring, managing, backups and scaling. All these points made me decline RavenDB as the candidate number one in the first article of this series.

It has [some small limitations](http://weblogs.asp.net/vblasberg/archive/2009/02/17/azure-details-and-limitations-blobs-tables-and-queues.aspx) which I would consider a guideline for a correct usage of the services. The overall amount of data is not limited.

## Azure Storage pricing

Azure Storage is not free (as well), but it costs much less than SQL Azure. Think of 10-times less depending on your usage behaviour! Azure storage costs you 0,106 € / GB and you also have to pay for every transaction on the storage. One million transactions cost you additional 0,71€.

[![image](https://az275061.vo.msecnd.net/blogmedia/2011/08/image47.png "Storage Pricing compared")](http://www.microsoft.com/windowsazure/pricing-calculator/)

&#160;

## Azure Storage for my project?

I will use Azure Storage in all its flavors in my project. **Why, you ask?** It is the solution I have the least experience with but I have the desire to change this! It will also save money in the long run.

Because of the lack of the experience, I am not that sure, how well queries will work if they contain only the partition key but not the row key. This could become a performance killer. I was thinking about this for a longer time. I will wait for this to show up as a real bottleneck. 

If performance really becomes critical then caching is my first choice here. If this is not going to work good enough I will implement secondary tables as some kind of persisted views on the data. This introduces more complexity in the data access but it will be the way to (re-)gain performance at the cost of some extra storage.

_[Source of the used Azure Icons](http://davidpallmann.blogspot.com/2011/07/windows-azure-design-patterns-part-1.html#fbid=-PMTyp5hV-a)_
