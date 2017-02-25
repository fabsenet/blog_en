---
title: WCF Tracing In 3 Steps
id: 1920
tags:
  - 'C#'
  - coding
  - WCF
date: 2012-12-21T12:54:29.000Z
author: Fabian Wetzel
---

If you want to trace WCF to better understand what is going on, you open your app.config or web.config on the service side and add the following xml to it:
<pre class="csharpcode">  <span class="kwrd">&lt;</span><span class="html">system.diagnostics</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">sources</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">source</span> <span class="attr">name</span><span class="kwrd">="Microsoft.IdentityModel"</span> <span class="attr">switchValue</span><span class="kwrd">="Verbose"</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="xml"</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">source</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">source</span> <span class="attr">name</span><span class="kwrd">="System.ServiceModel"</span> <span class="attr">switchValue</span><span class="kwrd">="Verbose"</span> <span class="attr">propagateActivity</span><span class="kwrd">="true"</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="xml"</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">source</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">source</span> <span class="attr">name</span><span class="kwrd">="CardSpace"</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="xml"</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">source</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">source</span> <span class="attr">name</span><span class="kwrd">="System.IO.Log"</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="xml"</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">source</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">source</span> <span class="attr">name</span><span class="kwrd">="System.Runtime.Serialization"</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="xml"</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">source</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">source</span> <span class="attr">name</span><span class="kwrd">="System.IdentityModel"</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="xml"</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">listeners</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">source</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">sources</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">sharedListeners</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="xml"</span> <span class="attr">type</span><span class="kwrd">="System.Diagnostics.XmlWriterTraceListener"</span> <span class="attr">initializeData</span><span class="kwrd">="c:\temp\trace.svclog.xml"</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">sharedListeners</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">trace</span> <span class="attr">autoflush</span><span class="kwrd">="true"</span> <span class="kwrd">/&gt;</span>
  <span class="kwrd">&lt;/</span><span class="html">system.diagnostics</span><span class="kwrd">&gt;</span></pre>

The next step is to open the Visual Studio command prompt and then you type **svctraceviewer**

Inside the trace viewer, you open your trace file and I am sure, you will find a good description in an error trace for your problem:

[![image](https://az275061.vo.msecnd.net/blogmedia/2012/12/image_thumb.png "image")](https://az275061.vo.msecnd.net/blogmedia/2012/12/image.png)

Attention! Do not forget to remove the trace config again, because the trace file gets really huge really fast!
