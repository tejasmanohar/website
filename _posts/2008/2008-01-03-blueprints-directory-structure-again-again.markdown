---
title: Blueprint's directory structure
layout: post
---

The [Prototype JS framework][1] has a great [directory structure][2]. The project has a source folder, containing different parts of the framework, and a simple script that puts these together to one file (prototype.js) for distribution. This makes both development and deployment enjoyable. 

Blueprint's directory structure has been way too complex until now, with quite a few files that were, well, unnecessary. The goal should be to have as few files as possible, organized in the most intuitive way we can think of. 

We can't go down to a single-file product, such as Prototype, since screen.css, print.css and ie.css all have to be included in the HTML in three different ways. There are ways to make these three files apply to the correct environment through one file, but including them in HTML with correct media types and conditional comments is the easiest and most predictable way of getting this to work. So that's what we'll do.

Another thing we must do is to move the inclusion of plugins to the HTML. This used to be done in screen.css, but with this new method, we ensure that upgrading to a new version of Blueprint is as simple as replacing the old Blueprint folder.

So we need three files in the top level directory (screen, print, ie), one source folder for all our different parts (grid, typography..), a script for compressing the source to the three top-level files, a tests folder and a plugins folder. Let's draw it up:

### Blueprint's new directory structure

    blueprint/
        screen.css
        print.css
        ie.css
        src/
            reset.css
            grid.css
            typography.css
            forms.css
            print.css
            ie.css
        plugins/
    
    scripts/
        compress.rb
        validate.rb
    
    tests/
    docs/

(The print.css and ie.css files in the src directory are the uncompressed versions of the top-level files with the same names.)

Another great result of this, is that a user not looking to experiment with Blueprint, only needs the top three files. Such distribution would require something like a Blueprint Wiki with better documentation, as these three files have no comments to explain their functionality.

The change has already been made in our [SVN repository][3], so check it out there if anything is hazy. This also means that we have a new compression script, which you can check out in the SVN as well. 

It's a good start, but I'm sure we can do better. Suggestions? :)

  [1]: http://prototypejs.org/
  [2]: http://svn.rubyonrails.org/rails/spinoffs/prototype/trunk/
  [3]: http://blueprintcss.googlecode.com/svn/blueprint/trunk/
