---
title: PowerShell is case-sensitive!
tags:
  - coding
  - PowerShell
  - Windows 10
date: 2015-09-09T09:27:53.000Z
author: Fabian Wetzel
subtitle: Did you know PowerShell is case-sensitive? I did not know this until recently.
description: Did you know PowerShell is case-sensitive? I did not know this until recently.
---

Did you know PowerShell is case-sensitive? I did not know this until recently. Together with a file system which is not case sensitive, this does not make much sense to me:

![powershell_casesensitive_folder](powershell_casesensitive_folder.png)

But it becomes even worse together with a git repository, because git becomes somehow confused by it, as you can see here:

![git_status_confused](git_status_confused.png)

As you can see, there is a modified file. If I now change into the assets folder but with differently cased letters, git is thinking that the change is actually in another folder. This comes to no surprise if you know the roots of git.

By the way, the old command shell does not have this weird behavior:

![cmd_is_not_confused](cmd_is_not_confused.png)


