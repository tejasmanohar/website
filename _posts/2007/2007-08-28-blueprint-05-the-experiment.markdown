---
title: Blueprint 0.5 - The Experiment
layout: post
---

Today marks the release of [Blueprint][1], version 0.5. This is a special release, as it is above all an experiment, trying out a few different techniques as we approach version 1.0.

### The Grid

The grid in this release is upped from 14 to 24 columns. Now, before you all go haywire, consider the following:

12 is quite certainly the best number of columns for a grid, mathematically speaking. It is dividable by both three and four, giving you lots of options on how you'd like to set up your layout.

However, after trying out the 12 column scheme on a few sites, I believe it is too constricting. That is, the column count is too low. It was already too low when we were using 14, if you ask me, so 12 doesn't seem completely right.

That's why I've gone for 24. Being 2 * 12, you get all the flexibility, with the added possibility of creating truly complex grid systems. And, if 12 is your preference, all you have to do is to double your desired span counts. 

But hey, Blueprint is about flexibility, not constraints. That's why [Matz from kematzy.com][2] is the latest addition to the growing BP development team. He has created a wonderfully flexible [BP grid generator][3], which lets you input your desired number of columns, margin between columns, and even your preferred total width, and outputs a nicely formatted and customized grid.css. 

So please, if 24 is not your bag, check out [Matz's generator][3].

_Also, the `first` class is no longer needed. :)_

### PX vs EM

Blueprint 0.4 introduced the use of em units for all vertical spacing, including line-heights and font sizes. However, in retrospect, this does not work as well as it should. While giving IE users the ability to resize text properly, the vertical flow and baseline was disrupted in nearly every browser except Firefox. 

I do believe the baseline is quite important, giving each page a great look and feel, so we're going back to pixels in this release. Resizing might not work as well, but the baseline now looks perfect in nearly every browser. I think this is a fair trade. 

To accommodate those not happy with this, BP 0.4 will remain as a download on the Google Code site, so that you may easily make your own changes to stick with em's. 

We do hope to return to using em's one day, but that won't happen until we can make them work correctly with the baseline. If anyone wants to tackle this issue, please feel free to do so. :)

### Fonts for the typographically literate

Version 0.5 also sports a new set of default fonts. We figure that if you've gone so far as buy your own great fonts, you should also get to use them when you browse the web. Here's the fonts that now gets set in typography.css:

    h1,h2,h3,
    h4,h5,h6  { font-family: Constantia, "Palatino Linotype", 
                Palatino, Georgia, "Times New Roman", Times, serif; }
    body      { font-family: Frutiger, Univers, "Helvetica Neue", 
                "Lucida Grande", Calibri, Helvetica, Verdana, sans-serif; } 
    pre       { font-family: Corbel, Verdana, 
                "Bitstream Vera Sans", sans-serif; } 
    code      { font-family: Consolas, "Bitstream Vera Sans Mono", 
                "Courier New", Monaco, Courier, monospace; } 
		
This is also highly experimental, and the font choices are likely to change in future releases.

### Coming in 0.6

A few things didn't make it into this release. Most noticeably is the forms.css file. Created by [Kim Joar Bekkelund][4], this file aims to give you some great looking default forms, with support for fieldsets, buttons and more. Expect it to ship with BP 0.6.

Another quite important feature that probably will be added to 0.6, is the use of an ie.css stylesheet, loaded with conditional comments, so that IE hacks stays in one place, and doesn't clutter up our beautiful core files.

### Get yer Blueprint, half price!

So that's that. Another release, another milestone on the way to Blueprint 1.0. 

As always, a [tutorial][5], [example][6] [files][7], the [credits][8], and the [download][9] itself, are all on the [Google Code site][1]. So go ahead, and [grab your own copy][9]. :)

  [1]: http://code.google.com/p/blueprintcss/
  [2]: http://kematzy.com/
  [3]: http://kematzy.com/blueprint-generator/
  [4]: http://kimjoar.net/
  [5]: http://code.google.com/p/blueprintcss/wiki/Tutorial
  [6]: http://bjorkoy.com/blueprint/sample.html
  [7]: http://bjorkoy.com/blueprint/typography-test.html
  [8]: http://code.google.com/p/blueprintcss/wiki/Contributors
  [9]: http://code.google.com/p/blueprintcss/downloads/list


