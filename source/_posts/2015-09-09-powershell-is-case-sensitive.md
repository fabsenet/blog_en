---
title: PowerShell is case-sensitive!
id: 2156
comment: false
tags:
  - coding
  - PowerShell
  - Windfows 10
date: 2015-09-09 09:27:53
---

Did you know PowerShell is case-sensitive? I did not know this until recently. Together with a file system which is not case sensitive, this does not make much sense to me:![powershell_casesensitive_folder](https://az275061.vo.msecnd.net/blogmedia/2015/09/powershell_casesensitive_folder.png)

But it becomes even worse together with a git repository, because git becomes somehow confused by it, as you can see here:

![git_status_confused](https://az275061.vo.msecnd.net/blogmedia/2015/09/git_status_confused.png)

As you can see, there is a modified file. If I now change into the assets folder but with differently cased letters, git is thinking that the change is actually in another folder. This comes to no surprise if you know the roots of git.

By the way, the old command shell does not have this weird behavior:![cmd_is_not_confused](https://az275061.vo.msecnd.net/blogmedia/2015/09/cmd_is_not_confused.png)