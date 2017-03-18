---
title: Self-Commenting Code? A Sample.
tags:
  - 'C#'
  - clean code
  - coding
date: 2013-01-24T01:02:31.000Z
author: Fabian Wetzel
---

I stumbled upon a piece of code in a Codeproject article. The download contains 1000s of lines of code and I am not going to link to it here but it is this piece of code I saw:

```cs
if (string.Compare(metadataLocation, "remote", true) == 0)
{
    metadata = cloudBlob.Metadata;
}
```

It is contained in a huge method and this pattern repeats many times with slight variations. 

So what is going on here? There was no comment at all in the whole codebase about it and I had to find out, what was the intention of this code. My current task is to take this piece of code which is using a data store in Windows Azure Blob Storage and convert it to use a Sql Server as its storage, because Sql Server is available in the cloud as well as on-premise while blob storage is not in terms of "where are my data".

the string.Compare(…) call has a dotted line under it. ReSharper is telling me, that this code is culture dependent and it wants to add StringComparison.OrdinalIgnoreCase to it to make it more explicit. It now looks like this:

```cs
if (String.Compare(metadataLocation, "remote", StringComparison.OrdinalIgnoreCase) == 0)
{
    metadata = cloudBlob.Metadata;
}
```

In case you are wondering: The parameter "true" in the original call is named "ignoreCase".

Culture-specific code was not the intention of the author at this spot, so I switched to **Invariant**CultureIgnoreCase.

In my way of understanding this piece of code I noticed, that Compare(…)==0 basically is a test, if both strings are equal, so I transformed it:

```cs
if (String.Equals(metadataLocation, "remote", StringComparison.InvariantCultureIgnoreCase))
{
    metadata = cloudBlob.Metadata;
}
```

But the meaning of this small piece of code is still not clear. The condition is true, if the metadataLocation equals remote, so the question asked is, whether the location is a remote location. I introduced a variable to write this piece of knowledge into the code itself:

```cs
var isRemoteMetadataLocationUsed = String.Equals(metadataLocation, "remote", InvariantCultureIgnoreCase);
if (isRemoteMetadataLocationUsed)
{
    metadata = cloudBlob.Metadata;
}
```

At this point it is possible to follow the high level code path (e.g. is it a remote metadata location or not?) without even the need to know the "low-level" logic (how do you decide whether the location is remote).

In terms of performance: I don't care! I think the compiler will inline the extra variable again.

Source code is read many more times than written, so it should be readable and understandable. Take a look at the first piece of code and the last one and decide for yourself, which one is better readable?!


