---
title: 'Ideas about NoSql on Windows Azure: Sql Azure'
id: 551
tags:
  - Azure
  - SQL Azure
  - SQL Server
date: 2011-07-14T20:24:03.000Z
author: Fabian Wetzel
---

_This is a direct follow-up to my earlier article _[_“Ideas about NoSql on Windows Azure: RavenDB”_](https://fabse.net/blog/2011/07/13/ideas-about-nosql-on-windows-azure-ravendb/)_. You should read it first._

While I was considering [RavenDB](http://http://ravendb.net/) as an actual choice for my project I was stumbling about the bad performance on big (1-5 MB) blobs. Shortly after I learned about attachments in RavenDB which are designed for exactly this case except it is not possible to include them in transactions. This is fine for me anyway.

**Sql Azure**

The next best choice is [Sql Azure](http://www.microsoft.com/windowsazure/sqlazure/database/). It feels like having a SQL Server in the cloud with all its pros and cons. I have quite good knowledge in designing and using relational databases and especially storing blobs in them. But this is no NoSql at all ![Winking smile](https://az275061.vo.msecnd.net/blogmedia/2011/07/wlEmoticon-winkingsmile2.png)

Some [whitepapers](http://download.microsoft.com/download/9/E/9/9E9F240D-0EB6-472E-B4DE-6D9FCBB505DD/Windows%20Azure%20No%20SQL%20White%20Paper.pdf) suggest to use XML document columns to store schema-less documents inside SQL Azure to simulate a NoSql database. While technically possible I cannot imagine someone really doing this.

[Sql Azure is not free as well](http://www.microsoft.com/windowsazure/pricing-calculator/). You don’t pay for licences but you pay for the size of your database. It costs about 7€ per month and GB. This is too much for me to use it to store my blobs and as of now I have no idea how much metadata I need to store to run my service.

**My decision**

Sql Azure could fulfil all my needs. I could store the blobs inside Azure Blob Service to reduce the database size and to use the tools in the way they work best. But I will not use Sql Azure. _Why?_ I am quite sure that Sql Azure is much more capable of scaling than my application would need it. It basically comes down to my desire to learn something new and to design the service in the way it fits best into the cloud.

