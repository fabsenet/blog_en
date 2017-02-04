---
title: 'So what can K2 [Blackpearl] do for you?'
id: 315
tags:
  - 'K2 [Blackpearl]'
  - SharePoint
date: 2009-01-14 11:56:34
---

In case you have the complete infrastructure up and running you could create the following workflow in 2 hours or maybe less … depending heavily on your system performance. In my case the complete infrastructure and development environment is running inside a Virtual PC image – I consider this as “low end”.

Consider a two-step approval process for your travelling expenses as shown in the following figure:

![Visio diagram of a two-step travelling expenses approval process.](https://az275061.vo.msecnd.net/blogmedia/2009/01/image8.png "Visio diagram of a two-step travelling expenses approval process.") 

It is worth noting, that you need to ask the right manager for approval in the first step but that everyone from the HR department should be able to approve the second step.

To implement this workflow using K2 you could use the Visio-integrated designer or the designer inside Visual Studio. I decided to use the Visual Studio Designer because it is more powerful and you can draw connection easier.

So you start the K2 Designer for Visual Studio and start modeling the process. In case you know what you are doing, you may come up with something equally to the following:

![K2 for Visual Stuidio diagram of a two-step travelling expenses approval process.](https://az275061.vo.msecnd.net/blogmedia/2009/01/image9.png "K2 for Visual Stuidio diagram of a two-step travelling expenses approval process.") 

The workflow is bound to a Sharepoint library and starts automatically if someone submits a new form to this library. The manager is determined depending on the user who submitted the form. The manager gets a notification via e-mail about the new workflow instance or he will see his task if he checks his Sharepoint task list or his K2 Workspace page. He can open the InfoPath-form, add comments and decide whether he want to accept or reject it. In case of a rejection the originator of the request gets notified and has now the possibility to adjust his form.

In case the manager agreed with the form it is routed to everyone in the HR group. The first HR group member opening the task has again the possibility to add a comment and to choose between accept and reject.

After the approval of a HR coworker the originator and his manager are informed via e-mail about the final approval and the form is saved inside a Sharepoint library for further processing.

K2 allows you to draw the complete workflow in a matter of minutes and its flexibility allows for other additions such as “auto-approve request below xx €” or “enrich the form with the last requests from this employee for the manager/HR view”. The visual representation of the workflow is easily readable which is good for the client, for the documentation and for the needed development time as well.