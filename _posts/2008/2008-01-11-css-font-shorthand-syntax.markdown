---
title: CSS font shorthand syntax
layout: post
---

The CSS font shorthand property syntax always seem to slip my mind, so here it is, mostly for my own benefit.

### Syntax

The syntax is:

{% highlight css %}
font: style variant weight size/line-height family;
{% endhighlight %}

The **required** parts of this shorthand is **size** and **family**. You should always **stick with the ordering** given above, which is what the W3C recommends. 

### Examples

Example 1:

{% highlight css %}
font-size: 14px;
font-family: Helvetica, sans-serif;

/* Combined into one shorthand rule */
font: 14px Helvetica, sans-serif;
{% endhighlight %}

Example 2:

{% highlight css %}
font-weight: bold;
font-size: 14px;
line-height: 1.5;
font-family: Helvetica, sans-serif;

/* Combined into one shorthand rule */
font: bold 14px/1.5 Helvetica, sans-serif;
{% endhighlight %}

Example 3:

{% highlight css %}
font-style: italic;
font-variant: small-caps;
font-weight: bold;
font-size: 1em;
line-height: 140%;
font-family: Helvetica, sans-serif;

/* Combined into one shorthand rule */
font: italic small-caps bold 1em/140% Helvetica, sans-serif;
{% endhighlight %}

**Source:** [456 Berea Street on shorthand properties][1]. (You'll find many more timesavers in that article.)

  [1]: http://www.456bereastreet.com/archive/200502/efficient_css_with_shorthand_properties/
