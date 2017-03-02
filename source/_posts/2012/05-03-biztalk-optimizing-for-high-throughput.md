---
title: 'BizTalk: Optimizing For High Throughput'
tags:
  - architecture
  - BizTalk
  - coding
date: 2012-05-03T17:11:48.000Z
author: Fabian Wetzel
---

In a customer project we made the observation that receiving many large IDOCs from a SAP system was really slow. We were using a WCF-Custom receive location and the port had a map. The BizTalk group consists of multiple application servers but it was clear that only one BizTalk server was receiving the IDOCs at a time. Neither the network nor the cpu were significantly used. There had to be something we could do to improve performance.

The real problem is the transactional model which BizTalk is using. The adapter needs to physically receive one IDOC. It constructs a well-understood XML message from it using the XML disassembler and performs a map. The result is published to the messagebox and the IDOC is signaled as received. Basically assuming Microsoft did a good job concerning their performance, most of the time should be lost inside the map:

![image](https://az275061.vo.msecnd.net/blogmedia/2012/05/image85.png "image")

If you take a look at the physical connection between the SAP system and the BizTalk server you see a short transfer of one IDOC followed by a lengthy wait. To improve throughput we had the need to reduce these wait times. The extra challenge was to avoid introducing high costs or risks.

The solution was to remove the map and to replace the XML disassembler with the pass-through pipeline:

![image](https://az275061.vo.msecnd.net/blogmedia/2012/05/image86.png "image")

This obviously changed the resulting messages. The receive port was directly bound to a MSMQ send port using a local queue. The queue exists on all BizTalk application server to increase load balancing. A second receive location was added to receive messages from that queue and to do the needed work (XML disassembler + map). 

The solution even allows to switch between both behaviors on the fly through enabling/disabling the correct receive locations. We only used proven technology and already existing BizTalk artifacts.

The throughput increased by roughly 300% but your mileage may vary. You should also consider that using queues makes your application server stateful.


