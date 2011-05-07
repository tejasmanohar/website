---
title: Battle comment spam with an extra form field
layout: post
---

I was introduced to an ingenious solution to the problem that is comment spam.

All you have to do is add an extra input field to your comment form. The field should have a name that you won't use or save, but at the same time, have a name that it's certain that a spambot will fill in. Example:

    <input type="text" name="lastname" id="lastname" />

I don't store any users last name with a comment, so that should do just fine. Now comes the really clever part. Add a CSS rule to your stylesheet which hides this field from regular users, while still leaving it in the html for every spambot to see:

    input#lastname { display:none; }

Lastly, change the part of your site that adds a comment to your database so that a comment is not added if the field "lastname" is filled in. 

And there you go: nearly perfect comment spam protection. No need for bayesian filters, API-keys or (gasp) captchas. I can't understand why this approach isn't common, so what have I overlooked? :)

**Update:** I just got spammed again, but I'm not sure what happened. The spam comments was actually left on an entry where the comments are closed. Alas, I must dig deeper to unravel this mystery. 

I still think the technique outlined in this post will work, and there's been some interesting additions made in the comments.
