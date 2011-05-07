---
title: Contextual Fluid Grids
layout: post
---

While reading A List Apart's latest article on [responsive web design][6], their particular use of
[fluid grids][5] from a previous article struck me as odd. There seems to be two ways to create such grids -- 
trying to work around context or using it to your advantage to create contextual fluid grids.

There are two things that may seem difficult about creating fluid grids: how to use context and how to employ margins.
The technique in the ALA article computes widths and margins through calculations given the current context, i.e. by using
the width of the closest container element in relation to the total page width. In contrast, I prefer embracing context
which results in a system that is as powerful yet simpler to use.

Take a look at [this demo page][7] to see what we're trying to accomplish. Try resizing the browser window and the text size.


### Embrace context

Context can be used by letting every container element define its own sub-grid. For instance, if we 
have a `row` element, we can divide this element into a number of columns. **Each of the column elements in the container can
again define their own grids with the same number of columns as the first container.** The basic insight is that context can be used
without any special computations. Consider the following HTML:

{% highlight html %}
<div class="row">
  <div class="span12">50%</div>
  <div class="span12">50%</div>
</div>

<div class="row">
  <div class="span12">50%</div>
  <div class="span12">
    <div class="row">
      <div class="span12">25%</div>
      <div class="span12">25%</div>
    </div>
  </div>
</div>
{% endhighlight %}

Ignore the lack of semantics, the class names are there for ease of explanation. The first row in this example 
has two columns spanning 50% of the page width. The second row first has one column spanning half 
the page width, and then two columns spanning 25% of the page. Pretty simple. 

Notice that all spans use the same column numbers. Here, the total number of columns is 24. The second column in the second 
example spans 50% of the page width, and is divided into 24 new columns. Since the wrapping element is 12 columns wide,
12 columns in the context of this element corresponds to 6 columns, or 25% of the page width. By embracing context, 
the grid can be as complex as you want without having to calculate precise floats.


### Programming the grid

As I mentioned in a previous post, the task of creating grids lends itself well to CSS extensions such as SASS. 
This is true both for fixed and fluid setups. By specifying the number of columns each primary and sub-grid should
have, creating a semantic and flexible implementation is quite simple. Calculations are done with percentages
and EMs to ensure proper fluidity and support for text resizing. 

{% highlight css %}
$grid_columns: 24;        /* number of columns */
$total_max_width: 950px;  /* max page width */

/* compute width of 1 column */
$grid_col_width: 100% / $grid_columns;

/* create a div spanning n columns */
@mixin col($n: 1) {
  float: left;
  @include span($n);
}

/* make an element span n columns */
@mixin span($n: 1) {
  width: ($n * $grid_col_width);
}

/* prepend n empty columns */
@mixin prepend($n: 1) {
  margin-left: $grid_col_width * $n
}

/* append n empty columns */
@mixin append($n: 1) {
  margin-right: $grid_col_width * $n
}

/* define max width in EMs for proper grid resizing */
body { 
  font-size: 100%; 
  max-width: ($total_max_width / 16px) + em; 
} 

/* a row defines a new grid or subgrid */
.row { float: left; width: 100%; }

/* mixin example usage */
#menu { @include col(5); }
#side { @include col(5); }
#main { 
  @include prepend(1);
  @include col(12); 
  @include append(1);
}

/* For the html example */
@for $i from 1 through $grid_columns {
  .span#{$i}    { @include col($i); }
  .prepend#{$i} { @include prepend($i); }
  .append#{$i}  { @include append($i); }
}
{% endhighlight %}


### Columns as margins

You may have noticed that this example does not consider margins as a part of the column definition. 
Fluid margins is often the aspect that
makes creating such a grid difficult. Ensuring that margins span the same width across context, and that the 
widths they span don't get too small to be rendered, can be a pain.

**The proper approach is to see margins between columns as empty columns, not as empty gaps between columns.** 
That is, the columns themselves do not have
specified margins. Instead, empty columns are appended or prepended where margins are needed. This makes sense as
margins between columns in fluid layouts almost always span greater widths than that of their fixed counterparts. 
And, if your require fixed margins, they can always be applied to an inner element of a column (as in the demo page).

However, we often need narrow margins, even in fluid layouts. To accomplish this, a high number of columns is needed,
as columns now not only specify the width of a column, but also the negative space between them. As always, choosing
a number with a high divisor count is essential. The best approach is to use a [highly composite number][3] 
(a positive integer with more divisors than any positive integer smaller than itself) such as 6, 12, 24, 36 or 48. 
This gives you the most flexibility in creating grids with applicable divisive features. 

The result is a simple fluid grid which, because of the use of contextual sub-grids, can be as complex and
specific as you need. By using an extension such as SASS, no complex calculations have to be done, or re-done
when the design needs a change.


  [3]:http://en.wikipedia.org/wiki/Highly_composite_number
  [5]:http://www.alistapart.com/articles/fluidgrids/
  [6]:http://www.alistapart.com/articles/responsive-web-design/
  [7]:/files/fluid/

