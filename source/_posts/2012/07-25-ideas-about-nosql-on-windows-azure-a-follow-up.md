---
title: 'Ideas about NoSql on Windows Azure: A follow-up'
tags:
  - Azure
  - coding
  - RavenDB
date: 2012-07-25T23:32:52.000Z
author: Fabian Wetzel
---

Some time ago I was analyzing my possibilities to use NoSQL databases in Windows Azure. My choices where [RavenDB](https://fabse.net/blog/2011/07/13/ideas-about-nosql-on-windows-azure-ravendb/), [Sql Database](https://fabse.net/blog/2011/07/14/ideas-about-nosql-on-windows-azure-sql-azure/) (formerly known as Sql Azure) and [Azure Storage](https://fabse.net/blog/2011/08/02/ideas-about-nosql-on-windows-azure-azure-storage/).

My decision had been to use Azure blob storage and to write an intelligent client library on top of it. The first steps were easy. Saving documents as gzip-compressed JSON was done rapidly. At first I was using GUIDs to overcome id number generation but I implemented that as well.

Later, I discovered some harder problems beyond my API design. Especially multiple concurrent writers updating the same secondary indexes or transactionality over multiple documents brought me headaches. I was aiming too high.

So I was going a step back and thought about my real aims. I don't want to write another database, I want to write a service using a database! So my conclusion was to throw all my custom database stuff away. I really like RavenDB in all its parts and it proved itself as a working solution, so I rethought my earlier analysis and decided to host RavenDB.

So I had to decide about the new physical architecture. I was thinking about hosting RavenDB using a clouddrive inside the WebRole as well. This solution has limitations because of how the clouddrive works. Scaling beyond one instance is not easy and installing a new stage and doing VIP switches becomes basically impossible.

Finally, I decided to use a persistent Azure VM to host my RavenDB instance.

What about scalability, you ask? I am using an extra small instance at the moment. This means, there is much room to scale up. If scaling up is not possible anymore, I could start to use a second VM, or I could switch to worker roles and clouddrives. At this point, it could become a problem, because scaling instances dynamically becomes also a task of creating clouddrives on the fly or merging clouddrives. But I would consider this as some kind of a luxury problem, so I am happy to look forward to it.

I am still thinking about hosting a second RavenDB instance to benefit from replication.

Meanwhile I finished the hosting configuration using an HTTPS endpoint for enhanced security.


