---
title: 'BizTalk error: Data at the root level is invalid.'
id: 668
tags:
  - BizTalk
  - coding
date: 2012-05-02T12:35:13.000Z
author: Fabian Wetzel
---

**Problem: **My orchestration looks perfectly fine with no error symbols anywhere but whenever I try to build the solution I get:
 > **Error 1 Data at the root level is invalid.** Line 1, position 1\. C:…MyProjectMyOrchestration.odx 1 1 

**Cause:** I was moving the orchestration file from one BizTalk project to another through holding shift and doing drag’n’drop in the solution explorer.

The btproj file has this new content:
 > &lt;ItemGroup&gt;
> &nbsp;&nbsp;&nbsp; &lt;**<font style="background-color: #c0504d">Schema</font>** Include="MyOrchestration.odx"&gt;
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;TypeName&gt;MyOrchestration&lt;/TypeName&gt;
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;Namespace&gt;MyNamespace&lt;/Namespace&gt;
> &nbsp;&nbsp;&nbsp; &lt;/**<font style="background-color: #c0504d">Schema</font>**&gt;
> &lt;/ItemGroup&gt; 

**Solution:** The move operation within Visual Studio is broken. You either have to do it in a different way (maybe add existing item?) or you adjust the project file after moving the orchestration:
 > &lt;ItemGroup&gt;
> &nbsp;&nbsp;&nbsp; &lt;**<font style="background-color: #9bbb59">XLang</font>** Include="MyOrchestration.odx"&gt;
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;TypeName&gt;MyOrchestration&lt;/TypeName&gt;
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;Namespace&gt;MyNamespace&lt;/Namespace&gt;
> &nbsp;&nbsp;&nbsp; &lt;/**<font style="background-color: #9bbb59">XLang</font>**&gt;
> &lt;/ItemGroup&gt; 

The error should be gone.
