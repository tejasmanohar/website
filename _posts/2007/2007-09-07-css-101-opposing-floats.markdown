---
title: CSS 101 - Opposing Floats
layout: post
---

One of the CSS techniques most prone to failing in Internet Explorer 6 is floating elements up against each other. 

For instance, you might have a main-content div, and a sidebar div. You then float both of these to the left, and give one of them some margin on the left or right hand side.

Bad idea! This often induces one of IE6's many CSS layout bugs, so here's a better way:

Float the two divs to different sides. That is, give the first column a `float:left`, and the second column a `float:right`. 

Apply a width to each column, so that the whitespace in between the columns is as wide as the margin you originally applied.

Now, the columns aren't even touching, ensuring that IE6 won't push one column down below the other.

Just like that you've accomplished the same exact layout, without the need to float divs up against each other, making for a much more robust layout.

See also:
* [CSS 101: There's always another way](http://bjorkoy.com/past/2007/8/30/css_101_theres_always_another/)
* [CSS 101: Group by layout](http://bjorkoy.com/past/2007/8/26/css_101_group_by_layout/)
