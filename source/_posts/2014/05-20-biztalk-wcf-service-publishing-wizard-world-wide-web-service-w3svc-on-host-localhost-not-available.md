---
title: >-
  BizTalk WCF Service Publishing Wizard: World Wide Web service (W3SVC) on host
  localhost not available.
tags:
  - BizTalk
  - coding
  - Lösung
date: 2014-05-20T11:55:56.000Z
author: Fabian Wetzel
---

I tried to publish an orchestration using the WCF service publishing wizard and observed the following error:

![WcfPublishingWizard_Error1](WcfPublishingWizard_Error1.png "WcfPublishingWizard_Error1")

And after clicking next I only observed:

![WcfPublishingWizard_Error2](WcfPublishingWizard_Error2.png "WcfPublishingWizard_Error2")

>Invalid project location 
>"http://localhost/VIP.Orchestrations.ContractPositionProcessor".
> 
>(Microsoft.BizTalk.Adapter.Wcf.Publishing.WebDirectory.WebDirectoryException) World Wide Web service (W3SVC) on host "localhost" not available.
> 
>**The following Windows component may not be installed: Application Server -&gt; Internet Information Services (IIS) -&gt; Common Files.**
> 
> Unknown error (0x80005000)
> 
> (System.Runtime.InteropServices.COMException) Unknown error (0x80005000)  

The fix is to use the Server Manager to install the **IIS 6 management compatibility** feature:

![ServerManager_AddRoleService](ServerManager_AddRoleService.png "ServerManager_AddRoleService")

![ServerManager_AddRoleService_IIS6](ServerManager_AddRoleService_IIS6.png "ServerManager_AddRoleService_IIS6")

Restarting the publishing wizard now works as expected:

![WcfPublishingWizard_Success](WcfPublishingWizard_Success.png "WcfPublishingWizard_Success")


