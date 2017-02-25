---
title: Add Gacutil To The External Tools List Of Visual Studio
id: 2081
comment: false
tags:
  - coding
  - DIY
  - Visual Studio
date: 2014-05-28T18:09:11.000Z
author: Fabian Wetzel
---

I often have the need to rapidly add my build output to the global assembly cache of .Net. You can do this using a post build event but it really is not ideal. Therefore I added the gacutil command as an external command.

If you want to do this, you first have to figure out the location of your gacutil.exe. Please open the “Developer Command Prompt for Visual Studio”. You can then type “where gacutil” and it will tell you the location(s) of your executable.

![developer_command_prompt_where_gacutil](https://az275061.vo.msecnd.net/blogmedia/2014/05/developer_command_prompt_where_gacutil.png "developer_command_prompt_where_gacutil")

Then you switch back to Visual Studio and select the “Tools” menu. Then “External Tools…”.

Click Add to insert a new Item and set it to the following values. Please notice the different argument values for installing and uninstalling from the GAC.

![external_tools_install_to_gac](https://az275061.vo.msecnd.net/blogmedia/2014/05/external_tools_install_to_gac.png "external_tools_install_to_gac")

```
Title: Install to GAC
Command: C:\Program Files (x86)\...\gacutil.exe
Arguments: -i $(TargetPath)

Title: Uninstall from GAC
Command: C:\Program Files (x86)\...\gacutil.exe
Arguments: -u $(TargetName)
```

…and remember to replace the location of gacutil with your own as the command.

