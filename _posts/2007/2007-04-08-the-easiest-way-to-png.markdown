---
title: The easiest way to PNG support in IE6
layout: post
---

> **Go <a href="http://www.twinhelix.com/css/iepngfix/">here</a> for everything about this script, including support forums and proper packaging.**

This must be the easiest way to get full support for PNG-transparency in Internet Explorer 6. The technique even works for PNG-transparency in CSS backgrounds. Credit goes to <a href="http://www.twinhelix.com/">Angus Turnbull</a> for creating this workaround. My hat is thoroughly tipped.

###  Here's what you do

* First, put <strike>this file</strike> and <strike>this file</strike> in your CSS directory. <strong>Update:</strong> Angus is releasing new versions, so grab the files from <a href="http://www.twinhelix.com/css/iepngfix/">his site</a>.
* Second, paste this code into your CSS file:
    `img { behavior: url(iepngfix.htc); }`

Enjoy! Really, that's it.

### Transparent backgrounds

As I said, this can be used to make transparent PNGs work on CSS backgrounds as well. Say you have this code:

    #header { background:url(header.png); }

All you have to do is apply the background behavior to the #header element:

    img, #header { behavior: url(iepngfix.htc); }

You can do this with every element you'e using PNG-transparency on:

    img, #header, .class, blockquote { behavior: url(iepngfix.htc); }

The asterisk also works, but I don't know what it does to rendering time:

    * { behavior: url(iepngfix.htc); }

I found this via the <a href="http://www.apple.com">Apple</a> site, which demonstrates some beautiful use of transparency, for example on the <a href="http://www.apple.com/macpro/">Mac Pro</a> site (the tower picture), and the Leopard <a href="http://www.apple.com/macosx/leopard/spotlight.html">Spotlight Preview</a> page (the big Spotlight icon).

<a href="http://www.twinhelix.com/css/iepngfix/demo/">Here's all the details from Angus himself.</a>
