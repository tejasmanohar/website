---
title: Blueprint 0.7 has arrived
layout: post
---

[Blueprint 0.7][1] has finally been released. Expect a more thorough article on all the new stuff soon. For now, here's a quick rundown. 

It's been way too long since our last release, so 0.7 is in many ways a pretty daunting upgrade. Lots of things have changed, making the framework more powerful, customizable and nimble than ever before.

Here's the most important new features:

* A powerful new compressor/generator script for customizing every part of Blueprint.
* A new directory structure, way better thought out than what we had in 0.6.
* No more need for the .column class (div + .span-x implies column).
* Lots of bugs fixed.

### The new compressor

So what does it do?

    $ ruby compress.rb -h
    Usage: compress.rb [options]
    Blueprint Compressor

    options
      -o, --output_path=OUTPUT_PATH    Define a different path to output 
                                       generated CSS files to.
      -n, --namespace=BP_NAMESPACE     Define a namespace prepended to all Blueprint classes 
                                       (e.g. .your-ns-span-24)
      -p, --project=PROJECT_NAME       If using the settings.yml file, PROJECT_NAME is the 
                                       project name you want to export
      --column_width=COLUMN_WIDTH      Set a new column width (in pixels) for the output grid
      --gutter_width=GUTTER_WIDTH      Set a new gutter width (in pixels) for the output grid
      --column_count=COLUMN_COUNT      Set a new column count for the output grid
      -h, --help                       Show this help message.


If you're using Blueprint in several projects, you should check out the new settings file for the compressor. Here's an example of the new settings file, with most available options:

    my_project:
      path: /path/to/my/project/stylesheets
      namespace: custom-namespace-1-
      custom_css:
        ie.css:
          - custom-ie.css
        print.css:
          - docs.css
          - my-print-styles.css
        screen.css:
          - subfolder-of-stylesheets/sub_css.css
      custom_layout:
        column_count: 12
        column_width: 70
        gutter_width: 10
      plugins:
        - fancy-type
        - buttons
      semantic_classes:
        "#footer, #header": ".span-24, div.span-24"
        "#content": ".span-17, div.span-17, div.colborder"
        "#extra-content": ".span-6, div.span-6"
        "div#navigation": "div.span_24, .span-24"
        "div.section, div.entry, .feeds": ".span-6 div.span-6"

Yes, you're reading that correctly. In order, we have:

* Optional custom output path.
* Namespace for Blueprint classes, which even updates the test files.
* Custom CSS appended to Blueprint stylesheets.
* Custom layout settings, almost too easy.
* Automatic compression of plugins which then gets added to the main Blueprint file.
* Semantic class names from BP classes. Just add them to your HTML, remove the old BP classes from the same HTML, and you're ready to go!

Huge thanks to Josh Clayton, the newest member of the Blueprint team, for creating all this. He's even written quite an [article describing the compressor in detail][2].

### Further reading

A few links to get you started. As mentioned, I'll write a more thorough article on the CSS in 0.7 soon.

* [Download BP 0.7][1]
* [Complete changelog][3]
* [Updated tutorial][4]
* [Blueprint Readme][5]
* [Post issues and bugs here][6]
* [Mailing list for any questions][7]
* [Who to thank for all this][8]

*Update:* We just released a quick bugfix, blueprint 0.7.1, which solves an issue where the compressor was requiring Rubygems in order to work. Rubygems is not required to run the compressor.

  [1]: http://code.google.com/p/blueprintcss/downloads/list
  [2]: http://jdclayton.com/blueprints_compress_a_walkthrough.html
  [3]: http://code.google.com/p/blueprintcss/source/browse/blueprint/tags/blueprint-0.7/CHANGELOG
  [4]: http://code.google.com/p/blueprintcss/wiki/Tutorial
  [5]: http://code.google.com/p/blueprintcss/source/browse/blueprint/tags/blueprint-0.7/README
  [6]: http://code.google.com/p/blueprintcss/issues/list
  [7]: http://groups.google.com/group/blueprintcss
  [8]: http://code.google.com/p/blueprintcss/source/browse/blueprint/tags/blueprint-0.7/AUTHORS


