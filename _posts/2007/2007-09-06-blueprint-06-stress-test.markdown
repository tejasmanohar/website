---
title: Blueprint 0.6 stress test
layout: post
---

Before releasing Blueprint 0.6, I'd like to put it through its paces. If you have the time and ability, please check out the latest revision from [our SVN repository][1], and try your utmost to brake it.

This release will be miles ahead of out current release, and is a giant leap towards version 1.0. If all goes according to plan, the versions between 0.6 and 1.0 will not bring any major changes, only subtle improvements, additions and bug fixes. 

This also means that the release of 1.0 should not be too far away. :)

Here's a quick list of the improvements in BP 0.6:

* We're back to em units for vertical spacing, though with a much better implementation than what we had in 0.4.
* This release introduces a new plugin structure, keeping the core files light and nimble.
* Three plugins (two extracted from the 0.5 core, one new).
* A new IE stylesheet imported with conditional comments.
* A much cleaner directory structure.
* New compressor script for easy compression of core files.
* Compressed version of print.css.
* A CSS validation script.
* Greatly improved test files.
* Lots of improvements to the typography.
* .box, .clear, .append- and .prepend- 12 through 23 are back by popular demand. :)
* Loads and loads of small improvements and fixes.

This might seem like a lot of files, but while the number of bundled tools have increased, the use of plugins and a much better directory structure actually means that the CSS framework itself is lighter and more robust than ever.

Take a look at the [full changelog][2] for more details, though some changes might be missing from that as well. Also, the readme file in the SVN directory is of course the only updated documentation on 0.6.

Submit feedback in [our Google Group][3], or by mail (olav at bjorkoy dot com).

*I'll be posting about who the people in the BP dev team actually are, and about all the new tools to use with BP in the near future.*

  [1]: http://blueprintcss.googlecode.com/svn/blueprint/trunk/
  [2]: http://blueprintcss.googlecode.com/svn/blueprint/trunk/Changelog
  [3]: http://groups.google.com/group/blueprintcss



