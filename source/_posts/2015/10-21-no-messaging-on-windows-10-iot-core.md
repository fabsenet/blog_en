---
title: (NO) Messaging On Windows 10 IoT Core
tags:
  - Allgemein
date: 2015-10-21T00:46:05.000Z
author: Fabian Wetzel
subtitle: >-
  I am working on a distributed application to allow me insights and control of
  the devices in the house.
description: >-
  I am working on a distributed application to allow me insights and control of
  the devices in the house.
---

I am working on a distributed application to allow me insights and control of the devices in the house. I want to see, when PCs are on and I want to control some lights. So I have some rather different messaging patterns.

*   **Telemetry**: The different clients regularly tell the server about their state (client to server: "I am on!" ... no response)
*   **Commands**: The server sends a command to a client and immediate action expected (server to client: "Turn that light on!" ... "done!")
*   **Request/Reply**: The client asks the server something and expects an immediate response. (client to server: "I lost power shortly, was that light on or off?" ... "On!")
So, is HTTP the answer here? Request/Reply fits perfectly to HTTP. Telemetry could be modeled as Request/Reply with some kind of an empty return message, so this would be good as well. The problem is the command pattern. To implement the command pattern over HTTP one would have to bend the protocol. There are ways to do this like long polling.

And did I say, my client is a RaspberryPI 2 running on Windows 10 IoT Core?

## AMQP

So I like actual messaging more then protocol bending and that is why I was turning to AMQP. AMQP is the advanced messaging protocol and I believe it was invented and specified to support limited devices with small footprints to allow IoT use cases. There exists a single libary for Universal Windows Platform (UWP). It is [amqpnetlite](https://github.com/Azure/amqpnetlite). The library has reduced functionality in an UWP environment. For example you can only connect to other endpoints - no one can connect to you. Fine for me. Turns out, there is no easy way for the server to reuse an established connection of a client to send more messages. The leading project maintainer was kind enough to add some methods and another example for my use case but it still feels too hacky for me. Also I am missing lifetime events of the connection or clear documentation on what happens, when the host is not reachable or disconnected or anything. I was disappointed and decided to replace all I had of AMQP in my code.

## SignalR

The next solution for my messaging needs was [SignalR](https://github.com/SignalR/SignalR). It started es a tool to allow more interactive web sites with push messages from the server. It basically is a http bender under the cover :-) The initial intention of SignalR was to have a C# server talking to a JavaScript client but soon there was also a .Net client. Turns out the .Net client is compatible with UWP so I tried it. I got all my messaging needs working. There are also rich lifetime events about connection, reconnection, disconnected and proper documentation. This could be nice except it is not. I found an [issue ](https://github.com/SignalR/SignalR/issues/3576)with the client implementation. If the client does not use the connection for at least 60 seconds, the next messaging call simply throws an Exception and does never recover that state. My expected behaviour of the client would be to notice the disconnect, reconnect and then retransmit the message and never let an Exception slip through to the calling code. The last commit for the project was 8 month ago and there are several pull requests and issues waiting but nothing happens. This project is dead?!

## ZeroMQ

I am using [ZeroMQ](http://zeromq.org/) in a project at work and I am really starting to love it. It is beautiful and it really just works. It has a [huge guide ](http://zguide.zeromq.org/)which tells you everything you need to know. And it has implementations in soooo much programming languages except UWP. Its a shame. At work, I am using NetMQ as the implementation of choice. It is a .Net port of ZeroMQ. I used the complete evening to take a look at the possibility of porting it to UWP but from my point of view, it would require major refactoring of NetMQ and the end result would also not be able to listen but only to connect to other hosts. This could still be fine. There actually exists an small incomplete port of NetMQ to UWP called [ZMTP.net](https://github.com/somdoron/zmtp.net) but it currently misses some features, [as I discovered](https://github.com/zeromq/netmq/issues/105#issuecomment-149706723).

## The question now is, how should I continue?

I could (maybe) work around the SignalR bug but I do not like that. Using SignalR for my messaging needs was not the best choice from the start and I should remove it again. I could help to implement more ZMTP functionality and use that in my project.

But what I really think is that Microsoft replaced and removed too much of the basic networking stuff in its UWP environment and that caused every developer of a messaging library to decide whether they invest in UWP or simply to not support it.

It feels like there is also no demand for messaging in UWP or UWP in general?

I am really considering to replace the Windows 10 IoT Core with something more supported like Raspbian? I could either use mono or I would implement the client in another language like python or nodejs?


