---
title: Blogging With Jekyll, Git and a VPS
layout: post
---

Welcome to another installment in the never-ending story of my quest for the perfect blogging setup. This time, we stray far from the conventional use of content management systems, shared hosts and database storage.

Yes, like so many others, I'm jumping on the bandwagon of using a local setup for generating blog posts, and then publishing the final HTML to my server using Git. Here's the setup:

1. Every blog post is a new file on my machine, ensuring great portability and an easy transition to future systems (yes, it will happen). Post files can be anything from markdown and textile, to html and plain source code.
2. To generate the final site, each post and page is processed by [Jekyll][1], which has support for layouts, partials, syntax highlighting, automatic regeneration and so forth.
3. The finished HTML is pushed to a git repository on my [Slicehost][2] VPS, which gives me full control over the final result.

You can probably see the benefits and drawbacks of this system, so instead of listing pros and cons, I'll show you how to set it up.

Jekyll has a great [wiki][3] describing its many features. You'll also find examples of how others have customized their installations in the "sites" section. The only mildly interesting thing I did was to make a script for quickly creating new blog post files:

{% highlight ruby %}
# Create new jekyll post and open in textmate
# $ ruby _new.rb This is the title

# The arguments form the title
unless ARGV[0]
  raise "Please provide a post title."
end

# Create a URL slug from the title
def slugify(title)
    str = title.dup
    str.gsub!(/[^a-zA-Z0-9 ]/,"")
    str.gsub!(/[ ]+/," ")
    str.gsub!(/ /,"-")
    str.downcase!
    str
end

# Create parameters
title  = ARGV.join(' ')
slug   = slugify(title)
prefix = Time.new.strftime("%Y-%m-%d")
file   = "#{prefix}-#{slug}.markdown"
path   = File.join(File.dirname(__FILE__), "_posts/#{year}/#{filename}")
text   = <<-eos
---
title: #{title}
layout: post
---

eos

# Create a new file and open it in textmate
File.open(path, 'w') { |f| f.write(text) }
system("mate #{path}")
{% endhighlight %}

By the way: Jekyll has built in support for using [latent semantic indexing][6] to create lists of related posts. It's a slow implementation of a computationally demanding technique, but at the same time, very cool.

When jekyll has generated the html in its "_site" folder, it's time to upload the new post to the web server.

To upload new content to the server, I use the setup described in [this guide][4]. Three distinct git repositories are established to provide the perfect workflow, where publishing a post is as easy as committing and pushing the new post to the server. 

My local copy is stored in the first repo. On the server, there is a "live" repo, which is the site served by apache, and a "base" repo which facilitates synchronization between the two other repos. My local changes are pushed to the base repo, which tells the live repo to update its content. The point is to avoid pushing content to a repo containing a working copy - using three repos is way easier. The guide has all the details if you wan't more on this setup.

All that's left is creating a virtual host in apache, it's document root pointing to the "_site" folder in the live repo. My server also have PHP and MySQL installed, so that my [Mint][5] installation can reside in the same repo as the rest of the jekyll files. Sweet!

There's something greatly reassuring about having a separate markdown file for each blog post, a point underlined by the annoying xml-parsing I did to migrate my old posts into this new system. My posts are safer than ever and can be written in any environment I see fit. In the end, this is a system only a programmer would love, but also the only system I, as a programmer, do love.








  [1]:http://github.com/mojombo/jekyll
  [2]:http://www.slicehost.com/
  [3]:http://wiki.github.com/mojombo/jekyll/
  [4]:http://matedriven.com.ar/2009/04/28/using-git-to-maintain-your-blog.html
  [5]:http://haveamint.com/
  [6]:http://en.wikipedia.org/wiki/Latent_semantic_indexing
