---
author: Fabian Wetzel
title: BizTalk 2016 EDI Disassembler Disturbingly Slow
subtitle: I discovered multiple performance issues in BizTalk 2016 around mapping and edifact and there solutions 
description: I discovered multiple performance issues in BizTalk 2016 around mapping and edifact and there solutions! Continue reading this in my blog.
date: 2017-04-26 17:28:32
tags:
 - BizTalk
 - coding
 - C#
cover: /img/grass/3000.jpg
coversrcset:
 - /img/grass/300.jpg 300w
 - /img/grass/600.jpg 600w
 - /img/grass/1200.jpg 1200w
 - /img/grass/1800.jpg 1800w
 - /img/grass/2400.jpg 2400w
 - /img/grass/3000.jpg 3000w
---
# What is a large message?

So we are still migrating our large edi application from BizTalk 2009 to BizTalk 2016. The work is mostly done and we are currently testing all pieces. This involves performance tests.

I was testing a large (*12MB*) incoming edi message. This batch has roughly 13.000 UNH-messages in it and in edifact terms, this is already very large. I have no clear performance data of the old system, but it should have finished processing in less than an hour.

The new test system was working day and night over the whole weekend and could not finish this message. This is hugely disturbing because edi processing is at the core of our application.

# Investigating
Of course I needed to investigate this!

Our process is roughly:
```txt
edi ==EdiDisassembler==> edi xml ==Mapping==> our internal xml
```

The `EdiDisassembler` gets the edifact message. It splits it and creates many edixml message out of it. We then map each edixml message to another internal schema.

The timing data showed, we were creating roughly 8 edi xml messages per second ONLY and further analysis showed me the mapping from edi xml to our internal xml as the hot spot. 

# Issue I: The slow mapping

This map has no functoids, only lines so this cannot be the cause, can it?
But the mapping is done inside a custom .Net component. We already had the map class instances (childs of `TransformBase`) cached, so what else could it be? The new BizTalk 2016 switched from `XslTransform` to `XslCompiledTransform`, so on the one hand side I would expect it to be faster, not slower but on the other hand, there was a change between products at the exact spot, where we are now seeing performance issues.

Consider this sample code to execute the map twice:

```cs
//get the cached map (fast)
var myTransformBase = GetCachedTransform("map type");

//execute the map twice (slow!)
myTransformBase.Transform.Transform(...);
myTransformBase.Transform.Transform(...);
```

This code was fast in the past and is not anymore. Accessing the `Transform` property takes forever! I guess, it is freshly compiled just for you. **Every time!**

So to make use of the compiled map, you MUST cache the actual transform:

```cs
//get the map (fast)
var myTransformBase = GetCachedTransform("map type");

//compile the map only once (slow)
var myTransform = myTransformBase.Transform;

//execute the compiled map twice (fast)
myTransform.Transform(...);
myTransform.Transform(...);
```
As a result, I refactored the map caching to cache compiled transforms instead. This helped immensely to speed up things. I also had to cache the TransformArgs, because you need them to execute the map.

# Investigating further

This change speeded up the processing very much, but the timing data showed, that it would now slow down more and more with every next message:

 - First 1000 edixml message needed 1 minute (16.6 msgs/s)
 - Next 1000 messages needed 20 minutes ( 0.8 msgs/s **!!**)

The next 1000 messages after this took always longer than my patience was... This seems to be at least an `O(n²)` issue or worse! This time, the analysis revealed the `GetNext()` method from the Microsoft `EdiDisassembler` itself to be the hot spot. Daunting!

# Issue II: The slow EdiDisassembler

I needed to get our custom .Net component out of the picture, so I did setup simple file in/out ports with the original EdiPipeline from Microsoft. This has the same horrible performance. I played around with the pipeline settings and the `MaskSecurityInformation` was the key. Its default is `true` and changing it to `false` brought back the expected performance. I understand its name, but apart from that, I am not sure, what it actually does. This means, how it knows, what data are sensitive?!

I changed our call of the `EdiDisassembler` in our component to also have  `MaskSecurityInformation=false` and our process was fast again.

At this point, the test system needed 16 minutes (13.5 msgs/s) to completely process the large file, which is the duration I was expecting. The complete process contains way more actions than described here, so you may not compare it with your performance data!