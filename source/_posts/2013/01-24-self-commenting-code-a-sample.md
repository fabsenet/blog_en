---
title: Self-Commenting Code? A Sample.
id: 1948
tags:
  - 'C#'
  - clean code
  - coding
date: 2013-01-24T01:02:31.000Z
author: Fabian Wetzel
---

I stumbled upon a piece of code in a Codeproject article. Tthe download contains 1000s of lines of code and I am not going to link to it here but it is this piece of code I saw:
<pre class="csharpcode"><span class="kwrd">if</span> (<span class="kwrd">string</span>.Compare(metadataLocation, <span class="str">"remote"</span>, <span class="kwrd">true</span>) == 0)
{
    metadata = cloudBlob.Metadata;
}</pre>

It is contained in a huge method and this pattern repeats many times with slight variations. 
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>

So what is going on here? There was no comment at all in the whole codebase about it and I had to find out, what was the intention of this code. My current task is to take this piece of code which is using a data store in Windows Azure Blob Storage and convert it to use a Sql Server as its storage, because Sql Server is available in the cloud as well as on-premise while blob storage is not in terms of “where are my data”.

the string.Compare(…) call has a dotted line under it. ReSharper is telling me, that this code is culture dependent and it wants to add StringComparison.OrdinalIgnoreCase to it to make it more explicit. It now looks like this:
<pre class="csharpcode"><span class="kwrd">if</span> (String.Compare(metadataLocation, <span class="str">"remote"</span>, StringComparison.OrdinalIgnoreCase) == 0)
{
    metadata = cloudBlob.Metadata;
}</pre>

In case you are wondering: The parameter “true” in the original call is named “ignoreCase”.

Culture-specific code was not the intention of the author at this spot, so I switched to **Invariant**CultureIgnoreCase.

In my way of understanding this piece of code I noticed, that Compare(…)==0 basically is a test, if both strings are equal, so I transformed it:
<pre class="csharpcode"><span class="kwrd">if</span> (String.Equals(metadataLocation, <span class="str">"remote"</span>, StringComparison.InvariantCultureIgnoreCase))
{
    metadata = cloudBlob.Metadata;
}</pre>

But the meaning of this small piece of code ist still not clear. The condition is true, if the metadataLocation equals remote, so the question asked is, whether the location is a remote location. I introduced a variable to write this piece of knowledge into the code itself:
<pre class="csharpcode">var isRemoteMetadataLocationUsed = String.Equals(metadataLocation, <span class="str">"remote"</span>, InvariantCultureIgnoreCase);
<span class="kwrd">if</span> (isRemoteMetadataLocationUsed)
{
    metadata = cloudBlob.Metadata;
}</pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>

At this point it is possible to follow the high level code path (e.g. is it a remote metadata location or not?) without even the need to know the “low-level” logic (how do you decide whether the location is remote).

In terms of performance: I don’t care! I think the compiler will inline the extra variable again.

Source code is read many more often than written, so it should be readable and understandable. Take a look at the first peace of code and the last one and decide for yourself, which one is better readable?!

