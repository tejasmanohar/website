---
title: Semantic CSS Grids With SASS
layout: post
---

You design websites, and since you're brimming with empathy, you want to use a grid-based layout to ensure a minimum amount of confused users. Great! However, you also design a lot of websites, and find yourself doing the same operations for setting up a basic grid at each ⌘+N. Not good.

The way to fix this is a sort of design framework. The problem with such a framework has often been mixing presentational logic with your sweet HTML hierarchy. Nuts to that, you say, I'd like both my CSS and HTML clean and semantically correct. Well, here's a way to get the best of both worlds.

Using [SASS][1], or any other equivalent CSS extensions, defining functions and variables lets you set up a grid while you stay away from anything less than semantically correct. Here's a setup of variables and mixins I've been using lately:

{% highlight css %}

/*
  Choose a grid width, the number of columns and the margin between columns.
  The result of the following equation has to be an integer, not a fraction:
  
  (width - (columns - 1) * col_margin) / columns = N
*/

$width: 960px;   /* total with of page */
$columns: 24;    /* number of columns */
$col_margin: 0;  /* margin between columns */

/* math magic */
$col_width: ($width - ($col_margin * ($columns - 1))) / $columns;
$col_total_width: $col_width + $col_margin;  

/* create row div */
@mixin row() {
  float: left;
  clear: both;
  width: $width;
}

/* create a column div */
@mixin col($n: 1) {
  float: left;
  @include span($n);
}

/* make an element span n columns */
@mixin span($n: 1) {
  width: ($n * $col_width) + (($n - 1) * $col_margin);
  @if $n == $columns {
    margin-right: 0;
  } @else {
    margin-right: $col_margin;
  }
}

/* the last column in a row needs this */
@mixin last() {
  margin-right: 0;
}

/* prepend n blank columns  */
@mixin prepend($n: 1) {
  margin-left: $col_total_width * $n
}

/* append n blank columns */
@mixin append($n: 1) {
  margin-right: $col_total_width * $n + $col_margin
}
{% endhighlight %}

The attentive reader will note I'm using the new [SCSS][2] syntax found in SASS 3. This is great, since the syntax is completely compatible with CSS (at least CSS 3), ensuring sweet validation of your files. Because these are mixins, your CSS classes and ID's can still retain semantic names, and the presentation logic remains where it should be:

{% highlight css %}
.section { @include row; }
.section .main { @include col(18); }
.section .sidebar { @include col(6); @include last; }
.section .promo { 
  @include col(12); 
  @include prepend(6); 
  @include append(6); 
  @include last;
}
{% endhighlight %}

If you're making an extensive site from scratch, or rarely doing new projects, I would suggest using the manual approach. This technique is more for those of us that sometimes needs a conveyor-belt type of web design output. Either way, the point to remember is that a lot of CSS logic lends itself well to programming, and by using an extension such as SASS, much manual labour can be offset by functions and variables.

  [1]: http://sass-lang.com/
  [2]: http://sass-lang.com/docs/yardoc/file.SASS_CHANGELOG.html#scss_sassy_css