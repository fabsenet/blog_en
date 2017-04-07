---
author: Fabian Wetzel
title: Could not enlist send port. The text associated with this error code could not be found.
date: 2017-04-07 16:14:15
tags:
subtitle:
description:
---

# Problem

The solution deployed using the BizTalk deployment framework and is ready to start but several send ports can not be enlisted. Trying to enlist them only yields the following messagebox:

> TITLE: BizTalk Server Administration
> ------------------------------
>
> Could not enlist Send Port 'SendPortName'. The text associated with this error code could not be found.
>
> Invalid xml declaration.
>  (Microsoft.BizTalk.ExplorerOM)

# Root Cause

The send port has a filter tag which has encoded xml as content. this content is very sensitive to whitespace changes. This can happen if a code editor reformats the xml.

# Solution

The solution would be much simpler, if the error message would be helpful. It actually should have prevented the binding import altogether, because it is actually true: the xml in the binding is broken. I am using BizTalk 2016 but the error exists basically in all BizTalk versions as far as I know.

The broken code looks like:
```xml
<Filter>
  &lt;?xml version="1.0" encoding="utf-16"?&gt;
  &lt;Filter xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"&gt;
  &lt;Group&gt;
  &lt;Statement Property="BTS.ReceivePortName" Operator="0" Value="ZES.SendToInhouse.DB_OutgoingTransfileToIsu" /&gt;
  &lt;Statement Property="ZES.InhouseSchemasMaps.InhouseSystem" Operator="0" Value="INHOUSESYSTEM_ISU_DSO" /&gt;
  &lt;/Group&gt;
  &lt;/Filter&gt;
</Filter>
```

The working code would be:

```xml
<Filter>&lt;?xml version="1.0" encoding="utf-16"?&gt;
  &lt;Filter xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"&gt;
  &lt;Group&gt;
  &lt;Statement Property="BTS.ReceivePortName" Operator="0" Value="ZES.SendToInhouse.DB_OutgoingTransfileToIsu" /&gt;
  &lt;Statement Property="ZES.InhouseSchemasMaps.InhouseSystem" Operator="0" Value="INHOUSESYSTEM_ISU_DSO" /&gt;
  &lt;/Group&gt;
  &lt;/Filter&gt;</Filter>
```
