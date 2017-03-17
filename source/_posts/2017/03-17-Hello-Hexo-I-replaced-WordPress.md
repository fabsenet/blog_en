---
title: Hello Hexo - I replaced my WordPress blog
author: Fabian Wetzel
date: 2017-03-17 22:56:15
cover: 2017/03/17/Hello-Hexo-I-replaced-WordPress/cover.jpg
tags:
subtitle: I was not that happy anymore with my blog running on WordPress so I decided to migrate away
description: I was not that happy anymore with my blog running on WordPress so I decided to migrate away
---

# Why is WordPress not my best bet anymore?

I was not that happy anymore with my blog running on WordPress.

- It always feels slow even with caching
- There is always that feeling about security holes
- I need to have everything patched all the time
  - PHP
  - MySQL
  - WordPress
  - A bazillion WordPress plugins

And I disabled comments years ago, why do I need a piece of server software to serve static content? I am the only one able to change the content. And there is my inner wish to serve this blog over IPv6 and HTTP/2 so I must replace my virtual machine in the future as well and I do not want to migrate MySQL with it, so migrating this blog was a necessary first step.

# So, where to go from here?

I heard very much about [Jekyll](https://jekyllrb.com/) lately and it seems like so many people are using it. Naturally, it was my first try as well. But the catch is, it is not easy to get it running on Windows! You can get around this if you use [GitHub Pages](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/). GitHub will do all the magic for you and you can concentrate on your words and stuff. This is nice but I wanted to host it myself, so this was not an option for me.

There is of course a good alternative! [Hexo](https://hexo.io/) runs on node and can easily be made running on Windows. Jekyll and Hexo are both static site generators. This means, you have your

- blog posts
- your theme
- some setup data

and you run Hexo once and it will output a folder with rendered html,css,... files. You only need a simple webserver to serve this folder and you are done.

# Details on the migration

There is a [migration plugin for WordPress](https://github.com/hexojs/hexo-migrator-wordpress) which - depending on your starting point - will get you to a 90+ % result. Ten years of blogging data contain - obviously - edge cases (_more than one!_). Over the years, I went through different WordPress versions, had database updates, used different blogging tools, used different ways to format source code. The migrator sometimes did not convert `<` and `>` properly. Sometimes it messed up some German special chars. I tried to find and fix them all.

While at it, I did some changes I wanted to do for quite some time as well:

- I switched all categories to tags. I am not sure, whether I should continue using tags at all, but I always felt that tags are the better choice for blogging.
- I had at some time in the past externalized all images to an Azure Blob Storage to serve them using the Azure CDN. This was overcomplicating everything and now I took the time to download all images, put them in the correct asset folder for each blog post and I fixed all the links.

# I made Hexo mine

I selected the [CleanBlog Theme](https://github.com/klugjo/hexo-theme-clean-blog) for my blog. Well, because it is clean? Looking back, I cannot recommend this theme, because there were several issues regarding the top banner, way to many css definitions, to many external includes... _but it looks clean!_ I fixed what I could about it, so don't worry!

Then I started to gather Hexo plugins. ([there are many!](https://hexo.io/plugins/)). These are just a few of my chosen ones:

- `hexo-generator-feed`: I want to be able to serve my blog as an RSS feed like I am used to and this is the way to go. The feed will not have full content anymore.
- `hexo-reading-time`: It provides the estimated times you need to read a given blog post.
- `hexo-generator-archive`: This allows Hexo to generated archive pages like the WordPress ones.
- `hexo-browsersync`: This is kind of awesome! I write my blog post in markdown and every time I save, Hexo will detect it, recompile the page and instruct all browser to reload that page. This is only for authoring, but it is geeky!
- `hexo-all-minifier`: This plugin optimizes all assets for minimal size because bandwidth matters.

# What is next?

I want to get back to regularly posting stuff about coding, BizTalk, C# and related technologies. This might be a fresh restart to make that fun again. Also, as said above, my next step is to host this blog on IPv6 with HTTP/2.

**If you find a broken link or something is wrong on this page, please let me know, so I can fix it!**