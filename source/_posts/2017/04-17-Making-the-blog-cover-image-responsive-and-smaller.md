---
author: Fabian Wetzel
title: Making the blog cover image responsive and smaller
date: 2017-04-17 21:12:15
cover: img/hamburger_hafen/2999.jpg
coversrcset: 
 - /img/hamburger_hafen/100.jpg 100w
 - /img/hamburger_hafen/250.jpg 250w
 - /img/hamburger_hafen/500.jpg 500w
 - /img/hamburger_hafen/750.jpg 750w
 - /img/hamburger_hafen/999.jpg 999w
 - /img/hamburger_hafen/1499.jpg 1499w
 - /img/hamburger_hafen/1999.jpg 1999w
 - /img/hamburger_hafen/2999.jpg 2999w
tags:
 - About This Page
 - coding
 - optimizations
subtitle: I further improved the header images on my blog
description: I further improved the header images on my blog. Continue reading this in my blog!
---

# How is it currently?

I migrated this blog and all is nice now, but the cover image bothers me a little, because it takes the majority of the bits you need to download to read a given article (at least if the article itself is not full of pictures).

![](network_analysis_beginning.png)

This is the network analysis from the article page of me anouncing that [I migrated my blog to Hexo](https://fabse.net/blog/2017/03/17/Hello-Hexo-I-replaced-WordPress/). The cover image itself has a size of 533kb. The complete group of requests has 651kb in size, so this image alone makes up 81,8% of it! This is okay, if you view this on a fast internet connection on a large computer. But if you view it on your phone on a flaky connection, this is probleblematic in two ways. First, you have to download this big image file and then, because your display on your phone is way smaller, your phone has to downsize the image.

# Responsive images

The way to solve this is through responsive images. It basically says there is an image and it exists in several sizes on the server and the browser can choose based on different criteria, what image it is downloading exactly. This way, your phone would download a small image and your desktop would choose a larger one.

Sample ([from w3schools](https://www.w3schools.com/css/css_rwd_images.asp)):
```html
<picture>
  <source srcset="img_smallflower.jpg" media="(max-width: 400px)">
  <source srcset="img_flowers.jpg">
  <img src="img_flowers.jpg" alt="Flowers">
</picture>
```

Alternatively, there is the `srcset` attribute on the `img` tag, which tells the browser as well, that there is the same image in different dimensions available on the server:

Sample ([from css-tricks.com](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/)):
```html
<img src="small.jpg" srcset="medium.jpg 1000w, large.jpg 2000w" alt="yah">
```

# Reality is always more difficult

The header image was implemented as a CSS-background, so I had to convert this to an actual image first. I liked also to have the post title on top of the image but I realized, this is not really possible with all screen sizes and resolution and title lengths, so I changed the design slightly to let the headline start only after the cover image.

Finally I settled with the `srcset` on  the `img` tag, because, it is easier and I do not require the extra artistic possibilities the `picture` tag provides.

# Reducing image sizes

I now provide the images in several different sizes and for a good measure, I use the new jpeg encoder [`guetzli` from Google](https://github.com/google/guetzli)

It is a commandline tool and  I use it like this:
```cmd
guetzli_windows_x86-64.exe --quality 85 original.jpg optimized.jpg
```

It regularly yields very good additional savings in filesize without any noticable visual degradations.

# Scripting it!

The first step is to create the image in different sizes with 100% quality. I will do this manually for now. But I created a PowerShell script which calls guetzli on all of the images, renames the outputs and writes a summary for the frontmatter of a given blog post.

```powershell
$images = dir *.jpg | sort -Descending length | select -Skip 1  | sort length

$guetzli = dir "$env:HOMEPATH\downloads\*guetzli*.exe" | sort -Descending LastWriteTime | select -First 1

if($guetzli -eq $null){
    Write-Host -ForegroundColor Red "could not find guetzli in $env:HOMEPATH\downloads\"
    exit
}

$guetzli = $guetzli.FullName

$images | foreach {
    write-host "generating optimized image for $_"
    &$guetzli --quality 85 "$_" "$_.optimized.jpg"

    if($LASTEXITCODE -ne 0){
        write-host "error when calling guetzli, exiting!" -ForegroundColor Red
        exit
    }
}

$images | remove-item

add-type -AssemblyName System.Drawing

$images = dir *.jpg.optimized.jpg | sort length

$p1 = Split-Path (Split-Path $images[0] -Parent) -Leaf


Write-Host -ForegroundColor Green "coversrcset: "
$images | Rename-Item -NewName {
    $img = New-Object System.Drawing.Bitmap $_.FullName
    $width = $img.Width
    $img.Dispose();

    Write-Host -ForegroundColor Green " - /img/$p1/$width.jpg ${width}w"

    return "$width.jpg"

}
```

# Show me results!

So the final saving mainly depends on the screen size of the device. This post (not the same as above!) requires a dowload of 774kb on my surface but only 305kb on a Galaxy S6 for example. So this is more than acceptable to me. Also, the images are not the leading part anymore:

![](network_analysis_result.png)

*Notice, I made the results screenshot using this post but without the results screenshot itself, so now, the result is not true anymore*

*Also notice, I am using the local hexo serve mode, which includes BrowserSync, which is in turn responsable for most of the javascript.*