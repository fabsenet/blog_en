---
title: Changing Folders In PowerShell
id: 2091
comment: false
tags:
  - coding
  - PowerShell
date: 2014-07-30 11:27:17
---

I really like PowerShell more and more lately. So at no surprise to me, I get better at using it every day. Today I made my own level-up at folder switching. Consider the following folder structure as an example:

`![sample_structure](https://az275061.vo.msecnd.net/blogmedia/2014/07/sample_structure.png)`

So there are two alpha folders inside my samplefolder containing another folder each. So my PowerShell command line is at the samplefolder and I want to get into the gamma folder. I would have done the following in the past:

`D:\samplefolder&gt; cd**&lt;tab&gt;&lt;tab&gt;**
D:\samplefolder&gt; cd .\alpha2**&lt;enter&gt;**
D:\samplefolder&gt; cd **&lt;tab&gt;**
D:\samplefolder\alpha2&gt; cd .\gamma**&lt;enter&gt;**
D:\samplefolder\alpha2\gamma&gt; **_&lt;done!&gt;_**`

As you may have noticed, I represented the special keystrokes in angle brackets. After doing this first way of navigating for many years now (because it works in cmd.exe as well) I learned, you could provide a filter expression before pressing tab:

`cd a**&lt;tab&gt;&lt;tab&gt;**`

This would only go through all possible subfolders starting with an "a". Of course, in this sample, this provides no use, but you can use the star as well:

`cd *2**&lt;tab&gt;**`

This expands to:

`cd .\alpha2`

Nice! We saved a tab keystroke, but we can do even better. If you are certain, your filter will correctly expand, you do not have to press tab first, but you can simply press enter:

`D:\samplefolder&gt; cd *2**&lt;enter&gt;**
D:\samplefolder\alpha2&gt;`

Wow! But we can do even better but before, we have to go one step back: What you also could do is changing into more than one directory deep at a time:

`D:\samplefolder&gt; cd .\alpha2\gamma**&lt;enter&gt;**
D:\samplefolder\alpha2\gamma&gt;`

And as you might already guessed by now, the filters work here as well:

`D:\samplefolder&gt; cd a*2\g***&lt;enter&gt;**
D:\samplefolder\alpha2\gamma&gt;`

But I left the most crazy example for last: Consider the case, where you want to change to the gamma folder, but you do not know the correct alpha folder. You don't have to!

`D:\samplefolder&gt; cd *\gamma**&lt;enter&gt;**
D:\samplefolder\alpha2\gamma&gt;`

PowerShell is smart enough to change into the right directory for you. Impressive!

Most of this stuff shown does not work in cmd.exe but why would you want to use cmd.exe anyway anymore?