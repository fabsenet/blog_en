---
title: How To Solve Active Service Instances Running Forever
tags:
  - Allgemein
date: 2010-10-08T14:34:00.000Z
author: Fabian Wetzel
---

My symptom was a BizTalk service instance which suspends for whatever reason. I fixed the underlying error and issued a request to resume the instance. Nothing unusal so far. But from this point on, the service instance remained in "active" state but did not do anything anymore. It feeled like the service instance was running forever. It happened with all service instances independently of the orchestration type but only on the production environment.

So what did I do to fix this issue?

I searched the net for terms like "running forever" or "active instance does nothing" but I could not find any useful solutions.

The next step was to use the MsgBoxViewer which yielded this error:

[![Missing Terminate Msg in Spool table (can prevent some svc instances to be resumed, terminated or suspended) !!](image_thumb4.png "Missing Terminate Msg in Spool table (can prevent some svc instances to be resumed, terminated or suspended) !!")](image40.png)

Which describes the root of the problem. The spools table was missing these 4 rows. The solution is to [insert the missing rows](http://jglisson73.wordpress.com/2009/05/28/unable-to-terminate-biztalk-orchestration-instances/).

In my case, this was a productive environment and I was afraid to fiddle with the messagebox so I decided to take a test environment first. It had the 4 rows so I deleted them which created the not-running active instances. Then I  inserted the messages again and the problem was solved.

Finally I added the missing rows in production and restarted all host instances. Errors fixed ![Smiley](wlEmoticonsmile.png)


