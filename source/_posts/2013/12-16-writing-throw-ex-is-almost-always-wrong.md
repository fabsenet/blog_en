---
title: Writing 'throw ex;' is almost always wrong!
id: 2046
comment: false
tags:
  - .net
  - 'C#'
  - Coding Guideline
date: 2013-12-16 17:34:55
---

So what is the difference between ‘throw ex;’ and ‘throw;’ in C#? The first statement recreates the stack trace while the latter one preserves it. Consider the following method, which will throw an exception if it gets called:
<pre class="csharpcode"><span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">void</span> Inner()
{
    <span class="kwrd">throw</span> <span class="kwrd">new</span> Exception();
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

And then you have two different methods implementing the two different coding styles:
<pre class="csharpcode"><span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">void</span> Rethrow()
{
    <span class="kwrd">try</span>
    {
        Inner();
    }
    <span class="kwrd">catch</span> (Exception ex)
    {
        **<span class="kwrd">throw</span>;**
    }
}

<span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">void</span> ThrowEx()
{
    <span class="kwrd">try</span>
    {
        Inner();
    }
    <span class="kwrd">catch</span> (Exception ex)
    {
        **<span class="kwrd">throw</span> ex;**
    }
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
At last, you have a short console application to call both methods and print their stack trace:
<pre class="csharpcode"><span class="kwrd">static</span> <span class="kwrd">void</span> Main(<span class="kwrd">string</span>[] args)
{
    <span class="kwrd">try</span>
    {
       ** ThrowEx();**
    }
    <span class="kwrd">catch</span> (Exception ex)
    {
        PrintEx(ex);
    }
<span class="rem">//...</span>
    <span class="kwrd">try</span>
    {
       ** Rethrow();**
    }
    <span class="kwrd">catch</span> (Exception ex)
    {
        PrintEx(ex);
    }
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

Here is the output:

![image](https://az275061.vo.msecnd.net/blogmedia/2013/12/image.png "image")

As you can see, ‘throw;’ preserves the actual location, where the exception really was thrown.

There is hardly any case where you want to hide the actual location of an error, so the best is to just use ‘throw;’ as your default in a catch clause.