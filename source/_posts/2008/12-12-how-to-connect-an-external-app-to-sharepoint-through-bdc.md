---
title: How to connect an external app to SharePoint through BDC
tags:
  - BDC
  - SharePoint
date: 2008-12-12T15:16:52.000Z
author: Fabian Wetzel
---

This blogpost aims at giving you a short overview of the basic steps needed to connect an external system (via webservice or sql database) to a SharePoint-Server.

The used feature is called Business Data Catalog (=BDC) and is basically a huge XML-file which describes how SharePoint should connect to the external application and how these data entities are associated.

The first action should be the installation of the BDC Definition Editor. If you have the SharePoint SDK installed on your machine, point your explorer at "%programfiles%2007 Office System Developer ResourcesToolsBDC Definition Editor" and open Setup.exe. For a successful installation you need to run an **English** Version of Win XP or Server 2003.

[![image](image-thumb2.png)](image5.png) 

At first you need to select "Add LOB System" and provide your webservice Url or your Database credentials. Then you can select the Webservice method or provide sql queries to fetch the data. The editor generates the needed entities for you but you need to create the identifiers and filters on your own.

For basic functionality you need to provide a finder method, which returns a collection of entities. The method can have parameters to filter the results. The second method has to be a specific finder which returns only a single entity based on a given identifier.

This is enough for a basic setup - the next step is to export your configuration into an XML-file. Now you need to import this definition into your SharePoint Server: Open your central administration page, select your SharedServices and select "Import application definition" under the "Business Data Catalog"-section. Follow the dialog!

[![image](image-thumb3.png)](image6.png)  

If you did everything right, you can now add a business data list webpart to a SharePoint page. Choose your created type in the web part options and you have successfully created your own Business Data Catalog Application!

![image](image7.png)

For further information on this topic, I suggest you these links:

- [The blogpost series from Sahil Malik](http://blah.winsmarts.com/2007-4-SharePoint_2007__BDC_-_The_Business_Data_Catalog.aspx)
- [Business Data Catalog in MOSS 2007](http://dotnetdreamer.wordpress.com/category/moss-2007/ "http://dotnetdreamer.wordpress.com/category/moss-2007/")
- [BDC MetaMan (Better tool but expensive)](http://www.lightningtools.com/bdc-meta-man/default.aspx "http://www.lightningtools.com/bdc-meta-man/default.aspx")


