---
title: 'BizTalk: Sending emails with attachments using a pipeline component'
tags:
  - BizTalk
  - 'C#'
  - coding
date: 2010-06-25T07:33:02.000Z
author: Fabian Wetzel
---

There are [several locations](http://www.tech-archive.net/Archive/BizTalk/microsoft.public.biztalk.general/2006-12/msg00141.html) on the web where you are told how to send emails and also how to send attachments with them as well.

I had a working piece of code doing exactly this but I had to redo it using a pipeline componentan instead of an orchestration.

Everything is straightforward. If you had set the context value in your orchestration like this:

EmailOut(SMTP.MessagePartsAttachments) = 2;

you would take a look in [the msdn](http://msdn.microsoft.com/en-us/library/smtp.messagepartsattachments%28BTS.10%29.aspx) to get the values right and then translate it to the following code in your pipeline component:

inmsg.Context.Write("MessagePartsAttachments",
"http://schemas.microsoft.com/BizTalk/2003/smtp-properties", 2);

I did this with every context value and tested it. It worked well but there was no attachment?! But there was also no error!

Finding the solution took me more time then I am willing to admit...

If you take a sharp look in the MSDN then you might find this:

[SerializableAttribute]
[GuidAttribute("9EE763F5-ECE7-42f6-BE97-38EA64FB7607")]
[IsSensitivePropertyAttribute(false)]
[PropertyGuidAttribute("9EE763F5-ECE7-42f6-BE97-38EA64FB7607")]
[PropertyTypeAttribute("MessagePartsAttachments",
"http://schemas.microsoft.com/BizTalk/2003/smtp-properties",
**"unsignedInt", "System.UInt32"**)]
public sealed class MessagePartsAttachments : MessageContextPropertyBase

I was desperate at best and tried everything and this one worked:

inmsg.Context.Write("MessagePartsAttachments",
"http://schemas.microsoft.com/BizTalk/2003/smtp-properties", **(UInt32)**2);

You cannot see any difference at all if you take a look at a suspended/tracked message but this was the cause of the missing attachments. I hope this might save you some time!


