---
title: WCF Tracing In 3 Steps
tags:
  - 'C#'
  - coding
  - WCF
date: 2012-12-21T12:54:29.000Z
author: Fabian Wetzel
---

If you want to trace WCF to better understand what is going on, you open your `app.config` or `web.config` on the service side and add the following xml to it:
```xml
  <system.diagnostics>
    <sources>
      <source name="Microsoft.IdentityModel" switchValue="Verbose">
        <listeners>
          <add name="xml" />
        </listeners>
      </source>
      <source name="System.ServiceModel" switchValue="Verbose" propagateActivity="true">
        <listeners>
          <add name="xml" />
        </listeners>
      </source>
      <source name="CardSpace">
        <listeners>
          <add name="xml" />
        </listeners>
      </source>
      <source name="System.IO.Log">
        <listeners>
          <add name="xml" />
        </listeners>
      </source>
      <source name="System.Runtime.Serialization">
        <listeners>
          <add name="xml" />
        </listeners>
      </source>
      <source name="System.IdentityModel">
        <listeners>
          <add name="xml" />
        </listeners>
      </source>
    </sources>
    <sharedListeners>
      <add name="xml" type="System.Diagnostics.XmlWriterTraceListener" initializeData="c:\temp\trace.svclog.xml" />
    </sharedListeners>
    <trace autoflush="true" />
  </system.diagnostics>
```

The next step is to open the Visual Studio command prompt and then you type `svctraceviewer`

Inside the trace viewer, you open your trace file and I am sure, you will find a good description in an error trace for your problem:

![](image.png)

Attention! Do not forget to remove the trace config again, because the trace file gets really huge really fast!


