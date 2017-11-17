---
author: Fabian Wetzel
title: Web developing with firefox in a corporate environment
subtitle: I give away my tweaks for firefox in a company network environment
description: I give away my tweaks for firefox in a company network environment. Continue reading this in my blog.
date: 2017-10-16 20:16:50
tags:
 - firefox
 - My Setup
cover: /img/sphere/2000.jpg
coversrcset:
 - /img/sphere/200.jpg 200w
 - /img/sphere/500.jpg 500w
 - /img/sphere/1000.jpg 1000w
 - /img/sphere/1500.jpg 1500w
 - /img/sphere/2000.jpg 2000w
 - /img/sphere/original.jpg 3000w
---
# Motivation

This post is basically a summary of settings, which I apply to a fresh install of firefox on a company PC to prepare it for some web development and make it basically usable in the environment.

# Download

I like to use the *developer edition* of firefox. This is mainly based on the desire to have the latest and greatest bits and to have the feeling that I could do web dev any minute. Of corse, the normal edition is just as good, maybe more stable (had no issues so far on the developer editon so far!) but lacks some weeks behind in features. Pick what feels right for you.

The download is the actual first road block for me. The initial download needs to be an offline installer, because the admin account on my company PC has no download rights. I usally google for `firefox developer edition offline installer`. Surprisingly, this download is not linked directly but is only findable through a support page. The linked page lists the [firefox developer edition offline installers](https://www.mozilla.org/en-US/firefox/developer/all/) in all available language. I usually pick english even although it is not my native language. Usually the english version of a piece of software yields english error messages and searching on the web for english error message usually yields better results after all.

# Tweaks after installing

## Proxy and certificates

My company allows internet access only through an intrusive man-in-the-middle proxy server. So the first step after installing firefox is to setup the proxy server and to install its certificate as a trusted certificate authority in the browser. Search the settings for *proxy* and *certificate*.

## Windows authentication

My installation does not allow NTLM authorization by default. I am not sure whether this is the real default, but to enable the Windows auth i open about:config, search for *ntlm* and enable the setting `network.automatic-ntlm-auth.allow-non-fqdn`. This allows ntlm for all "domains" without dots in it (=server names). If you have fully qualified server names in your environment, you can put a comme seperated list into `network.automatic-ntlm-auth.trusted-uris`.

## Better working with server names

I regularly work with servers or loadbalancers by entering their name in the address bar. You have to be thoughtful to really access them and **not** search their name on google. Their is a setting in about:config, which helps with that: `browser.fixup.dns_first_for_single_words`. If you enable this, the browser will always interpret single words as a server name instead of googling them. It will only revert to a google search if you enter more than one word. I find this setting really useful!

## enable firefox sync

Firefox is not needed for developing in any way but it makes my life so much easier. After setting up Firefox sync by logging into it, I provide a meaningful name to the firefox installation at hand. After that, it is easy to *send* tabs or links to other devices. If I am browsing the web for example at home and find something useful at work, I don't have to fallback to mailing links. I select *send tab to device* and select the firefox at work. Next morning at work, the tab opens on its own and I can do whatever I want with it.

I am also able to open a tab on this machine which I have open on another instance of firefox on another machine. This is kind of a *pull tab*. The browsing history, some settings and plugins are also synced. It also works with firefox mobile on android. You should try it!

# Feedback?

Do you have feedback or some more tips to tweak firefox for company web dev? let me know!