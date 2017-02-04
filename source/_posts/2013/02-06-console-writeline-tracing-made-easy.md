---
title: Console.WriteLine() Tracing made easy
id: 1955
tags:
  - coding
  - debugging
  - json
date: 2013-02-06 10:20:08
---

Consider you are having a complicated object and you want to write some attributes of it to your test-only command line program. For this article it might just be a person:
<pre class="csharpcode">var person = <span class="kwrd">new</span> Person
            {
                Name = <span class="str">"Fabse"</span>, 
                Birthday = <span class="kwrd">new</span> DateTime(1985, 7, 12), 
                Gender = GenderEnum.Male
            };</pre>
<style type="text/css"><!--
.csharpcode, .csharpcode pre
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
--></style>What would you normally do to write all these attributes to the console?

**WriteLine()?**
<pre class="csharpcode">Console.WriteLine(<span class="str">"Name: "</span>+person.Name);
Console.WriteLine(<span class="str">"Birthday: "</span>+person.Birthday);
Console.WriteLine(<span class="str">"Gender: "</span>+person.Gender);</pre>
<style type="text/css"><!--
.csharpcode, .csharpcode pre
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
--></style>**Or would you overwrite ToString()?**
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">string</span> ToString()
{
    <span class="kwrd">return</span> <span class="str">"Name: "</span> + Name + <span class="str">", Birthday: "</span> + Birthday + <span class="str">", Gender: "</span> + Gender;
}

...

Console.WriteLine(<span class="str">"MyPerson: "</span>+person);</pre>
![Untitled](https://az275061.vo.msecnd.net/blogmedia/2013/02/Untitled.png "Untitled")

Works okay too, but you cannot use ToString() for other purposes anymore.

**So I thought, I am giving JSON a try for this purpose:**

Open your package manager console and write:
<pre class="csharpcode">install-package Newtonsoft.Json</pre>
<style type="text/css"><!--
.csharpcode, .csharpcode pre
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
--></style>And then do just this:
<pre class="csharpcode">Console.WriteLine(<span class="str">"MyPerson: "</span> + JsonConvert.SerializeObject(person));</pre>
<style type="text/css"><!--
.csharpcode, .csharpcode pre
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
--></style>![Untitled2](https://az275061.vo.msecnd.net/blogmedia/2013/02/Untitled2.png "Untitled2")

&nbsp;

The good thing is, it works with basically any object, always prints all members and you do not have to change your ToString() method. Of course there are downsides. You may not want to see *all* members or if you look closely, in its default settings it is interpreting the enum as an int, but its good enough for me.