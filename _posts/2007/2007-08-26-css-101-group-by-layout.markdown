---
title: CSS 101 - Group by layout
layout: post
---

Many developers group their CSS stylesheet rules by element, with every text element in one segment of the CSS file, then headings, then lists and so forth.

However, since you almost always look for rules that applies to a special part of your page when editing your CSS, grouping your rules by layout is a much better idea.

For instance, at the top of your CSS file, put general rules for `body`, `p`, `ul` and such. Then, group the rest of your rules by layout element, like `#header`, `#sidebar`, `#footer` and so forth.

{% highlight css %}
h1,h2,h3,
h4,h5,h6  { font-family: Helvetica, Arial, sans-serif; } 
a         { font-weight: bold; text-decoration: none; }
body      { margin:18px 0; }

/* -------------------------------------- */

#header         { position: relative; margin-bottom:5px; }
#header #links  { border-bottom:1px solid #ddd; }
#header h1      { font:bold 5em Helvetica, Arial, sans-serif; }
#header ul      { list-style-type:none; margin: 0 0 35px 0; }

/* -------------------------------------- */

#promo            { border-top:2px solid #ddd; }
#promo .column    { border-color:#ccc; }
#promo .column p  { padding:10px; margin:0; }
{% endhighlight %}

I think you'll find that this makes for much more enjoyable CSS development.

_Note: Blueprint 0.5 will hopefully be released tomorrow._


