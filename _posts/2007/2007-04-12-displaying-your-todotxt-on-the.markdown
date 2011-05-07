---
title: Displaying your Todo.txt on the desktop
layout: post
---

Having worked on way too many projects lately, I needed a way to keep track of my todo-list, and a way to be constantly reminded of my upcoming tasks.

[<img src="http://files.bjorkoy.com/images/blog/geektool_thumb.png">][1]

So I turned to GeekTool, a small app that can display any shell command directly on your desktop. I use it to print out my todo.txt file, and update every 60 seconds. With the text-editing module activated in Quicksilver, this means that I can add todo-items to my desktop directly through QS. 

### How to set it up

* Create a file named todo.txt, and add your tasks.
* Download [GeekTool][2], and install. It will be added as a pref-pane.
* Add a new entry, and chose "Shell" as its type.
* Enter this command (edit the path):
* `more /Users/username/Documents/todo.txt`
* Set the "refresh" option to something like 60 seconds.
* Place the new window where you want it on your screen.
* Use Lucida Grande as the font (If you ask me ;).

That's it! You'll now be continuously reminded off all the work you have yet to do. 

  [1]: http://files.bjorkoy.com/images/blog/geektool.png
  [2]: http://projects.tynsoe.org/en/geektool/

