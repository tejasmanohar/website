---
title: How to stop comment spam
layout: post
---

Comment spam must be the number one threat against an enjoyable blogging experience. Many people quit blogging entirely because they get tired of fighting the ever evolving spam bots. There are, however, ways to win this arms race. 

Below I've outlined the techniques I use to keep this blog spam free. I'd be very surprised if I ever get spam from bots again - this stack of techniques should be quite bulletproof. The methods are listed in order of usage. 

If a comment passes all these steps without being flagged as spam, it's allowed into the database.

It should be noted that I have no patience for manually approving comments - I feel like I'm letting the spammers win. For shame! :)

### Step 1: "Do" field

(This step was initially about referers, but as pointed out in the comments, all browsers do not send referers, making this a bad idea. Here's a different method.)

We'll first check if the HTTP POST actually comes from the blog entry in question. This is easily done with a hidden form field called "do", which contains a simple value of your choice.

When a comment gets posted, you check if the field "do" is set and equals the chosen value. As spammers often send POSTs directly to your "add comment" URL, this might stop some of the less ambitious culprits. The HTML could look something like this:

{% highlight html %}
<input type="hidden" name="do" value="some_random_rotated_value">
{% endhighlight %}

The spam check (in Rails):

{% highlight ruby %}
if params[:do] != the_random_rotated_value
    spam = true
end
{% endhighlight %}

It won't stop all spam, but the philosophy here is that if it can stop *any* spam, we'll do it. Onwards, to level two!

### Step 2: Hidden Turing test

A recent trend amongst blogs is to have a simple question as part of the comment posting experience. A  simple CAPTCHA, in other words. The user has to answer a question, and the answer is then used to decide if the poster is human. In effect, the Turing test expressed through a single form field.

The problem is that this diminishes the user experience. Any extra field a user has to fill in order to leave a comment is just another reason for that user not to comment at all. And since you want as many comments as you can from as happy users as possible, we should do something about this.

Here's my take: You use a question field, but with an added twist. Through CSS, hide that field. In your code, check the posted value of this field. If it's not empty and does not equal the answer to your test question, the comment is spam. 

You'll also want to give the field a name that makes it certain that a spam bot will fill it out. I use "url" to  store links, so here I've used the name "website". The HTML looks like this:

{% highlight html %}
<div style="visibility:hidden; display:none;">
    <label>What is 2+3?
    <input type="text" name="website"></label>
</div>
{% endhighlight %}

(Jan Pingel and Jeremy Weathers suggests in the comments that visibility:hidden is needed in addition to display:none in this case, as it will help apps like screen readers to hide the test.)

And the POST check might look like this (at least in Rails):

{% highlight ruby %}
if params[:website] != '' and params[:website] != '5'
    spam = true
end
{% endhighlight %}

We hide the field because common sense says that spam bots probably won't parse CSS, and therefore fill in the field based on the name given. A user without CSS turned on will see the field, and fill inn the answer to your question. The vast majority of users, however, will never even see the question, thus making the probability of them leaving a comment higher. 

A truly resilient spam bot might pass this test. It might parse the CSS or understand the question. No matter, on to level three!

### Step 3: Akismet

[Akismet][1] is a great tool for stopping spam. It's basically a web server to which you pass the content of and information about each comment, and it in turn gives you a "true" or "false" signifying if it thinks the comment is spam. It has a great hit rate, and has worked for a vast herd of now spam free Wordpress bloggers.

The service is open to everyone, though you'll need to create a (free) account on [wordpress.com][2]. You'll then get an API key which will give you access to the Akismet servers. 

There's already been written plugins and API wrappers for many systems and languages. Here's a few:

* [Wordpress plugin][3] (official)
* [Akismet API wrapper for Ruby][4]
* [Ruby on Rails plugin][5] (uses the above wrapper)
* [Drupal module][6]
* [Movable Type plugin][7]

(A simple google search for Akismet and your blogging system will likely produce your desired result.)

In many cases, using Akismet will protect your blog from almost all spam. However, since this is supposed to be a bulletproof setup, I would still recommend using all the techniques mentioned above. Since Akismet is starting to get very popular, spammers might work extra hard to find countermeasures for it, and as it's a centralized service, it'll probably experience some downtime.

Still not satisfied? I have one more technique you can try out.

**Update:** Carl Mercier writes in to mention [Defensio][10], which is a service similar to Akismet. I haven't tried it, but judging from it's website, Defensio might very well be a worthy competitor. You could of course use both, which would be especially useful in case one of them is experiencing downtime.

### Step 4: Click test (Javascript required)

This is a technique used by [SimpleLog][8], and requires that Javascript is turned on by the user posting a comment.

I don't use this, as I think websites should always work perfectly without JS. However, if you disagree, or run a site where one of the requirements is that JS must be turned on, this might be just what you're looking for.

First, create a bunch of hidden fields, one for every *required* field and the submit button, like this:

{% highlight html %}
<input type="hidden" name="check-1" value="no">
<input type="hidden" name="check-2" value="no">
...
<input type="hidden" name="check-n" value="no">
{% endhighlight %}

In every required field, create a virtual form value through Javascript, that is only set if the user actually physically (or is that virtually?) entered something in the field, like this:

{% highlight html %}
<input type="text" name="email" 
onkeypress="this.form.elements['check-1'].value = 'yes'">
{% endhighlight %}

Do this for every required field, just change the value "check-1" between each new field, so that you get a separate check for each. You should also check if the submit button was really "clicked" by the user, like this:

{% highlight html %}
<input class="submit" 
onclick="this.form.elements['check-2'].value = 'yes'">
{% endhighlight %}

You can then check in your "add comment" method if every one of these fields are set to the correct value ("yes"). If they're not, the comment is spam. (Or the user has JS turned off, which is the problem I mentioned above.)

To really annoy spam bots, obfuscate the custom values, like `this.form.elements['ed8mkl32'].value = '9r3w'`. You can then randomize these and place them at different intervals and in different fields, all while checking for the current correct setup in your script.. Am I going too far? :)

### Step 5: Random field names

[Andrew][9] suggest another simple yet effective method:

> The technique I am using, and which is working very well, is to randomise the names of the form fields.
> 
> When the form is loaded a PHP script generates random names for all the form fields and then adds a hidden element with instructions on which random form name should equal which real form name.
> 
> When the form is submitted the comment handler unscrambles the names and assigns the values. Any form fields submitted that were not included in the unscramble instructions are wiped.


### Spammers, be gone!

In addition to the techniques mentioned above (except step 4 and 5), I also use a blacklist that comes with SimpleLog as a last measure. I like to think that I've caused at least some frustration in the mind of a spammer at this point. :)

I've yet to get automated spam after implementing these methods, although I hope no enterprising spammer sees this post as a personal challenge, with its provocative title (in spammer circles) and all. 

If anyone has any techniques to add to this list, enlighten me through the hopefully spam free comments section below.

  [1]: http://akismet.com/
  [2]: http://wordpress.com
  [3]: http://akismet.com/download/
  [4]: http://www.blojsom.com/blog/nerdery/2005/12/02/Akismet-API-in-Ruby.html
  [5]: https://rubyforge.org/projects/ror-akismet/
  [6]: http://drupal.org/project/akismet
  [7]: http://www.nonplus.net/software/mt/Akismet.htm
  [8]: http://simplelog.net
  [9]: http://www.wp-fun.co.uk/
  [10]: http://defensio.com/


