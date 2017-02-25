---
title: Seltsamer Fehler beim Start einer Silverlight-Anwendung.
id: 419
tags:
  - 'C#'
  - coding
date: 2009-09-09T14:42:37.000Z
author: Fabian Wetzel
---

Nach “F5” kommt erst dieses Fenster:

![image](https://az275061.vo.msecnd.net/blogmedia/2009/09/image28.png "image")

Und dann dieses:

![ArgumentException occured: Der Kulturname &quot;uploads&quot; wird nicht unterstützt. Parametername: name](https://az275061.vo.msecnd.net/blogmedia/2009/09/image29.png "ArgumentException occured: Der Kulturname &quot;uploads&quot; wird nicht unterstützt. Parametername: name")

Es handelt sich um eine Silverlight-Anwendung mit den .Net RIA Services. Bilder sind auch involviert. Der Fehler kommt, egal ob die Anwendung im Internet Explorer oder im Firefox startet, allerdings nur einmal nach einem Rebuild. Folgende Starts haben den Fehler nicht und klicke ich auf “Continue” funktioniert meine Anwendung auch ganz normal.

Ich habe schon im ganzen Projekt nach “uploads” gesucht ohne Erfolg sowie das komplette Projekt vor und nach dem ersten Start gedifft, aber auch hier keine Auffälligkeiten.

Ungewöhnlich ist auch, dass die Nachricht der Exception auf Deutsch ist, obwohl Visual Studio, Silverlight SDK und die .Net RIA Services auf Englisch installiert sind.

**Ich konnte das Problem bisher nicht lösen, daher die Bitte, wer was weiß, sich bei mir zu melden. Habe ich eine Lösung, werde ich ein Update schreiben.**

<!--more-->

**Hier noch ein Stacktrace der Exception (Code von mir ist nicht involviert!):**

&gt;	mscorlib.dll!System.Globalization.CultureTableRecord.CultureTableRecord(string cultureName = "uploads", bool useUserOverride) + 0x41d bytes

mscorlib.dll!System.Globalization.CultureTableRecord.GetCultureTableRecord(string name = "uploads", bool useUserOverride = true) + 0xd6 bytes

mscorlib.dll!System.Globalization.CultureInfo.CultureInfo(string name, bool useUserOverride) + 0x2e bytes

System.Web.dll!System.Web.HttpServerUtility.CreateReadOnlyCultureInfo(string name = "uploads") + 0xc9 bytes

System.Web.dll!System.Web.UI.Util.IsCultureName(string s) + 0x49 bytes

System.Web.dll!System.Web.Compilation.StandardDiskBuildResultCache.FindSatelliteDirectories() + 0x80 bytes

System.Web.dll!System.Web.Compilation.BuildManager.RegularAppRuntimeModeInitialize() + 0x74 bytes

System.Web.dll!System.Web.Compilation.BuildManager.Initialize() + 0xf2 bytes

System.Web.dll!System.Web.Compilation.BuildManager.InitializeBuildManager() + 0xcd bytes

System.Web.dll!System.Web.HttpRuntime.HostingInit(System.Web.Hosting.HostingEnvironmentFlags hostingFlags = Default) + 0xe1 bytes

System.Web.dll!System.Web.Hosting.HostingEnvironment.Initialize(System.Web.Hosting.ApplicationManager appManager, System.Web.Hosting.IApplicationHost appHost, System.Web.Configuration.IConfigMapPathFactory configMapPathFactory, System.Web.Hosting.HostingEnvironmentParameters hostingParameters) + 0x26c bytes

[Appdomain Transition]

System.Web.dll!System.Web.Hosting.ApplicationManager.CreateAppDomainWithHostingEnvironment(string appId, System.Web.Hosting.IApplicationHost appHost, System.Web.Hosting.HostingEnvironmentParameters hostingParameters) + 0x379 bytes

System.Web.dll!System.Web.Hosting.ApplicationManager.CreateAppDomainWithHostingEnvironmentAndReportErrors(string appId = "f2edd2c8", System.Web.Hosting.IApplicationHost appHost, System.Web.Hosting.HostingEnvironmentParameters hostingParameters) + 0x2f bytes

System.Web.dll!System.Web.Hosting.ApplicationManager.GetAppDomainWithHostingEnvironment(string appId = "f2edd2c8", System.Web.Hosting.IApplicationHost appHost, System.Web.Hosting.HostingEnvironmentParameters hostingParameters) + 0x6d bytes

System.Web.dll!System.Web.Hosting.ApplicationManager.CreateObjectInternal(string appId, System.Type type = {Name = "Host" FullName = "Microsoft.VisualStudio.WebHost.Host"}, System.Web.Hosting.IApplicationHost appHost, bool failIfExists = false, System.Web.Hosting.HostingEnvironmentParameters hostingParameters) + 0x3a bytes

System.Web.dll!System.Web.Hosting.ApplicationManager.CreateObject(string appId, System.Type type, string virtualPath, string physicalPath, bool failIfExists, bool throwOnError) + 0x8d bytes

System.Web.dll!System.Web.Hosting.ApplicationManager.CreateObject(string appId, System.Type type, string virtualPath, string physicalPath, bool failIfExists) + 0x35 bytes

WebDev.WebHost.dll!Microsoft.VisualStudio.WebHost.Server.GetHost() + 0xe0 bytes

WebDev.WebHost.dll!Microsoft.VisualStudio.WebHost.Server.OnSocketAccept(object acceptedSocket) + 0x62 bytes

mscorlib.dll!System.Threading._ThreadPoolWaitCallback.WaitCallback_Context(object state) + 0x2f bytes

mscorlib.dll!System.Threading.ExecutionContext.Run(System.Threading.ExecutionContext executionContext, System.Threading.ContextCallback callback, object state) + 0x6f bytes

mscorlib.dll!System.Threading._ThreadPoolWaitCallback.PerformWaitCallbackInternal(System.Threading._ThreadPoolWaitCallback tpWaitCallBack) + 0x53 bytes

mscorlib.dll!System.Threading._ThreadPoolWaitCallback.PerformWaitCallback(object state) + 0x59 bytes

