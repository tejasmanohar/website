---
title: Blueprint 0.4 released
layout: post
---

![Blueprint logo](http://files.bjorkoy.com/images/blueprint.png)

(If you don't know what Blueprint is, [read this][1] first.)

Pencils down, let's ship this thing, and bring print design on the web one step closer, as the first release of [Blueprint][2] is quickly closing in on 15 000 downloads. 

Please read that back to me. The first point-release of a framework, built on a technology that behaves differently in most browsers, with known, gaping holes, has been downloaded almost 15 000 times. If there ever was a time for a new release, this would be it. 

Version 0.3 also produced [this statement][3] from Khoi Vinh, online design director for The New York Times, and chief catalyst for bringing grid-based designs to the web: 

> â€œIs there a way I can turn Blueprint into traffic for Subtraction.com?

### Enter version 0.4

Here's most of the changes at a glance. Scroll down for explanations and clarifications.

* All font sizes and vertical margins are now elastic, through the use of <code>em</code> units. Resizing works great in every tested browser.
* Comes with a new, compressed version of BP, which reduces the size of the core files by 60 percent.
* Support for [incremental leading][4], contributed by [Mark Boulton][5].
* Adds perfected [CSS buttons][6], by Kevin Hale of [Particletree][7] fame.
* Fixes all known IE bugs.
* Loads of minor fixes and additions.

I'd say this qualifies as a good, nay, make that a great release. Remember that BP now has taken on a life of its own, and that many of these changes have been contributed by people all over the globe. Be sure to check out BP's [contributors][8] section. 

Also, if you have a great fix or addition, post it to the new [Blueprint Google Group][9]. 

### About the changes

Now for a few, hopefully clarifying notes on some of the changes.

**Elastic font sizes** also means elastic line-heights, and as you may know, calculation of em's in browsers are inconsistent at best. Because of this, I've taken the idealistic approach. 

The line-heights (and by extension, the baseline) are set to values that *should* make them look quite perfect. In Firefox, for instance, they do. In Safari or Opera however, the baseline is a bit off. 

This is a problem, but I am working on it, and I'm not even sure you'll notice it at the default font size. :)

Contributed by print designer extraordinaire [Mark Boulton][5], **[Incremental leading][4]** is a pretty exciting new feature. As most of the ideas in Blueprint, this one comes from the world of print design.

Say you have a sidebar, with smaller type than your main column. Having the same line-height in this column as in your main column might be a bad idea, as this implies a relationship between the content in each column that might not be there.

Enter incremental leading: This sets the ratio between the lines of the two columns to be 4:5, meaning that for 4 lines of text in the main column, you get 5 lines of text in the sidebar. Follow the link above to learn more about this technique.

The new **compressed version** is an absolute must for high-volume sites. It strips the core files of the framework down to 40% of their original size, mostly through removing comments and whitespace. Check out screen.css for information on how to use it.

### And that's that

I think this is a release one with great confidence can use on a live site, especially now that the glaring IE bugs are fixed. There might, however, be undiscovered bugs, so be on the lookout for a possible 0.4.5 release.

I'd just like to take this moment to thank all the people who have commented on, written about, contributed to, or mailed me about Blueprint. Your enthusiasm, ideas for features, bug fixes, and willingness to overlook obvious flaws in the first release has been nothing short of amazing. So thanks!

If you'd like to contribute or comment on BP, please send me an e-mail: olav at bjorkoy dot com.

Still here? Head on over to the **[Blueprint site][2]** to read about this new release, or just **[grab yourself a copy][10]**.

  [1]: http://bjorkoy.com/past/2007/8/3/launch_blueprint_a_css_framework/
  [2]: http://code.google.com/p/blueprintcss/
  [3]: http://www.subtraction.com/archives/2007/0807_the_framewor.php
  [4]: http://www.markboulton.co.uk/journal/comments/incremental_leading/
  [5]: http://www.markboulton.co.uk/
  [6]: http://particletree.com/features/rediscovering-the-button-element/
  [7]: http://particletree.com/
  [8]: http://code.google.com/p/blueprintcss/wiki/Contributors
  [9]: http://groups.google.com/group/blueprintcss
  [10]: http://blueprintcss.googlecode.com/files/blueprint%200.4.zip

### Credits

**As always, please remember that BP is based on work by the following people:**

  * [Jeff Croft](http://jeffcroft.com)
  * [Nathan Borror](http://playgroundblues.com)
  * [Christian Metts](http://mintchaos.com)
  * [Eric Meyer](http://meyerweb.com/eric)

The new BP logo was created by [Ludwig Wendzich](http://www.ludwignz.com/).
