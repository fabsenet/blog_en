---
title: 'T-SQL: delete one row without beeing able to identify it'
tags:
  - coding
  - Kwik-e
  - SQL Server
date: 2013-01-28T20:18:35.000Z
author: Fabian Wetzel
---

It happened in a development database some time ago: I had more than one row with exactly the same values in any column including the ID column. I noticed the ID column (int) had no identity specification and changing that failed because of the duplicates.

The solution was to use the Top(n) syntax. You cannot only do
<pre class="csharpcode"><span class="kwrd">select</span> <span class="kwrd">top</span>(1) * <span class="kwrd">from</span> mytable <span class="kwrd">where</span> id=59</pre>
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

but also
<pre class="csharpcode"><span class="kwrd">delete</span> <span class="kwrd">top</span>(1) <span class="kwrd">from</span> mytable <span class="kwrd">where</span> id=59</pre>
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
That worked suprisingly well and I could setup the identity column after this ![Smiley](wlEmoticon-smile.png)


