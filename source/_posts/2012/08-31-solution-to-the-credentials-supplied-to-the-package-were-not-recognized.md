---
title: 'Solution to: The credentials supplied to the package were not recognized'
tags:
  - Azure
  - coding
  - ysod
date: 2012-08-31T10:40:19.000Z
author: Fabian Wetzel
---

![normal_webrequest_raven](https://az275061.vo.msecnd.net/blogmedia/2012/08/normal_webrequest_raven.png "normal_webrequest_raven")

I have set up a web application. It is designed like a normal 3-tier architecture using Windows Azure Web Roles as a webserver and RavenDB as a database. RavenDB is hosted inside a Windows Azure Virtual Machine.

Because I want to maximize security, I decided to publish RavenDB over an SSL-Endpoint. This implies hosting RavenDB inside IIS. I decided to use self-signed certificates, to avoid extra costs. I used OpenSSL to create my own root certificate and to create a domain certificate based on it. This secures the communication channel between the webserver and the database.

The deployment of the web roles has a startup project which installs the root certificate into the certificate store. This should work, but in fact, it does not!

I am keep getting the following yellow screens of death when accessing the database:

[![The credentials supplied to the package were not recognized](https://az275061.vo.msecnd.net/blogmedia/2012/08/TheCredentialsSuppliedToThePackageWereNotRecognized_thumb.png "The credentials supplied to the package were not recognized")](https://az275061.vo.msecnd.net/blogmedia/2012/08/TheCredentialsSuppliedToThePackageWereNotRecognized.png)

The inner exception is correct. The first request is always unauthorized, giving information about the accepted authentications in the 401 response. The caller should do authentication with this information in a new request. This is standard HTTP and it should work. Except it does not.

Executing a console application on the webserver using the same connection string works just fine. So my first thinking was an issue with the application pool accessing the certificate store. Changing the apppool to run as my own user (with more priviliges) can result in security risks but also does not solve my issue.

Finally I thought of [my own issues with kerberos in the past](https://fabse.net/blog/2009/04/24/kerberos-der-drei-kpfige-hllenhund/) and **switched the authentication method on the database from Windows authentication to Basic authentication**. This solved the issue!

Basic authentication transmits passwords as clear text but this is not a security risk because the channel itself is ssl-encrypted.

Windows authentication internally uses NTLM in a “one hop” scenario but switches to Kerberos if a “double hop” is involved. Normally it tries to get the correct token to let the webserver impersonate the user against the database. I am unsure, why it even tries to use kerberos because my webserver uses forms authentication and does not try to impersonate against the database.

Nevertheless, the error is gone for me!

Click more to see the** full stacktrace** of the error.

<!--more-->

<span style="font-size: xx-small;">Server Error in '/' Application.</span>

<span style="font-size: xx-small;">**The credentials supplied to the package were not recognized**</span>

<span style="font-size: xx-small;">Description: An unhandled exception occurred during the execution of the current web request. Please review the stack trace for more information about the error and where it originated in the code.</span>

<span style="font-size: xx-small;">Exception Details: System.ComponentModel.Win32Exception:** The credentials supplied to the package were not recognized**</span>

<span style="font-size: xx-small;">Source Error:</span>

<span style="font-size: xx-small;">An unhandled exception was generated during the execution of the current web request. Information regarding the origin and location of the exception can be identified using the exception stack trace below.</span>

<span style="font-size: xx-small;">Stack Trace:</span>

<span style="font-size: xx-small;">**[Win32Exception (0x80004005): The credentials supplied to the package were not recognized]**
System.Net.NTAuthentication.GetOutgoingBlob(Byte[] incomingBlob, Boolean throwOnError, SecurityStatus&amp; statusCode) +7831731
System.Net.NTAuthentication.GetOutgoingBlob(String incomingBlob) +91
System.Net.NegotiateClient.DoAuthenticate(String challenge, WebRequest webRequest, ICredentials credentials, Boolean preAuthenticate) +7949240
System.Net.NegotiateClient.Authenticate(String challenge, WebRequest webRequest, ICredentials credentials) +18
System.Net.AuthenticationManager.Authenticate(String challenge, WebRequest request, ICredentials credentials) +149
System.Net.AuthenticationState.AttemptAuthenticate(HttpWebRequest httpWebRequest, ICredentials authInfo) +7948614
System.Net.HttpWebRequest.CheckResubmitForAuth() +7951782
System.Net.HttpWebRequest.CheckResubmit(Exception&amp; e) +126</span>

<span style="font-size: xx-small;">**[WebException: The remote server returned an error: (401) Unauthorized.]**
System.Net.HttpWebRequest.GetResponse() +7864676
Raven.Client.Connection.HttpJsonRequest.ReadJsonInternal(Func`1 getResponse) +705
Raven.Client.Connection.HttpJsonRequest.ReadResponseJson() +496
Raven.Client.Connection.ServerClient.DirectQuery(String index, IndexQuery query, String operationUrl, String[] includes) +1261
Raven.Client.Connection.&lt;&gt;c__DisplayClass40.&lt;Query&gt;b__3f(String u) +36
Raven.Client.Connection.ReplicationInformer.TryOperation(Func`2 operation, String operationUrl, Boolean avoidThrowing, T&amp; result) +302
Raven.Client.Connection.ReplicationInformer.ExecuteWithReplication(String method, String primaryUrl, Int32 currentRequest, Int32 currentReadStripingBase, Func`2 operation) +507
Raven.Client.Connection.ServerClient.ExecuteWithReplication(String method, Func`2 operation) +128
Raven.Client.Document.AbstractDocumentQuery`2.ExecuteActualQuery() +260
Raven.Client.Document.AbstractDocumentQuery`2.InitSync() +423
Raven.Client.Document.AbstractDocumentQuery`2.get_QueryResult() +21
Raven.Client.Linq.RavenQueryProviderProcessor`1.ExecuteQuery() +384
Raven.Client.Linq.RavenQueryInspector`1.GetEnumerator() +38
System.Collections.Generic.List`1..ctor(IEnumerable`1 collection) +382
System.Linq.Enumerable.ToList(IEnumerable`1 source) +80
MyWebProject.Web.Controllers.AdminController.Tokens() +108
lambda_method(Closure , ControllerBase , Object[] ) +79
System.Web.Mvc.ReflectedActionDescriptor.Execute(ControllerContext controllerContext, IDictionary`2 parameters) +248
System.Web.Mvc.ControllerActionInvoker.InvokeActionMethod(ControllerContext controllerContext, ActionDescriptor actionDescriptor, IDictionary`2 parameters) +39
System.Web.Mvc.&lt;&gt;c__DisplayClass15.&lt;InvokeActionMethodWithFilters&gt;b__12() +125
System.Web.Mvc.ControllerActionInvoker.InvokeActionMethodFilter(IActionFilter filter, ActionExecutingContext preContext, Func`1 continuation) +640
System.Web.Mvc.ControllerActionInvoker.InvokeActionMethodWithFilters(ControllerContext controllerContext, IList`1 filters, ActionDescriptor actionDescriptor, IDictionary`2 parameters) +312
System.Web.Mvc.ControllerActionInvoker.InvokeAction(ControllerContext controllerContext, String actionName) +691
System.Web.Mvc.Controller.ExecuteCore() +162
System.Web.Mvc.ControllerBase.Execute(RequestContext requestContext) +305
System.Web.Mvc.&lt;&gt;c__DisplayClassb.&lt;BeginProcessRequest&gt;b__5() +62
System.Web.Mvc.Async.&lt;&gt;c__DisplayClass1.&lt;MakeVoidDelegate&gt;b__0() +20
System.Web.CallHandlerExecutionStep.System.Web.HttpApplication.IExecutionStep.Execute() +469
System.Web.HttpApplication.ExecuteStep(IExecutionStep step, Boolean&amp; completedSynchronously) +375</span>

<span style="font-size: xx-small;">Version Information: Microsoft .NET Framework Version:4.0.30319; ASP.NET Version:4.0.30319.272</span>


