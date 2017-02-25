---
title: 3x das Selbe - nur kürzer und schöner
id: 237
tags:
  - .net
  - coding
date: 2008-08-10T14:45:13.000Z
author: Fabian Wetzel
---

Ich entdecke neue C#-Features...für die einen sicher ein alter Hut und für die anderen sowieso ein Buch mit 7 Siegeln, aber für mich noch frisch und neu :-)<pre class="csharpcode"><span class="rem">//So hab ich es immer gemacht</span>
var particlesToRemove = <span class="kwrd">new</span> List&lt;IParticle&gt;();
<span class="kwrd">foreach</span> (var particle <span class="kwrd">in</span> Particles)
{
    <span class="kwrd">if</span>(particle.LifetimeExceeded)
    {
        particlesToRemove.Add(particle);
    }
}
<span class="kwrd">foreach</span> (var particle <span class="kwrd">in</span> particlesToRemove)
{
    Particles.Remove(particle);
}

<span class="rem">//So geht es mit anonymen Funktionen</span>
Particles.RemoveAll(<span class="kwrd">delegate</span>(IParticle b)
                    {
                        <span class="kwrd">return</span> b.LifetimeExceeded;
                    });

<span class="rem">//Und so mit einem Lambda-Ausdruck</span>
Particles.RemoveAll(b =&gt; b.LifetimeExceeded);</pre>
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

