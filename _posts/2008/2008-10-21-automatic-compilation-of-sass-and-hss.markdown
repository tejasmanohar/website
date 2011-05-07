---
title: Automatic compilation of Sass and HSS files
layout: post
---

[Sass][1] and [HSS][2] are pretty cool tools. They are extensions to CSS that allows you to use variables, arithmetic, nested rules and other goodies in your stylesheets.

To make this work, both tools use a compiler to transform the Sass and HSS file contents into valid CSS which will work in a browser. 

### The problem

Running the compiler on each file change when developing a site is a tedious task to do manually, so I patched together a simple Ruby script to do it for me. In the interest of karma, here's that script for you to use as you see fit.

The script can esentially be used in any situation where some files must be observed, and a command run whenever they are changed (saved), be it compiling, compressing, running tests or validation.

### How to use the script

* Put the script file in your CSS directory. The script will monitor both that directory and any subdirectories when started.
* Change the configuration options at the top of the script, depending on which tool you are using: Sass, HSS or something else.
* Whenever you are working on your files, have the script running in the background. Start it by running `ruby monitor.rb`.

Now, whenever you save changes to your Sass or HSS files, the corresponding CSS files will be recompiled from their respective sources. The script will also recompile all observed files at the moment it is started.

That's it! You can now use the CSS extension tool of your choice, while still retaining the sweet ability to refresh your browser to instantly see any changes, all without any annoying extra steps in the process.

**[Download the script][3]**

  [1]: http://haml.hamptoncatlin.com/docs/rdoc/classes/Sass.html
  [2]: http://ncannasse.fr/projects/hss
  [3]: http://files.bjorkoy.com/monitor/monitor.rb
