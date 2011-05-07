---
title: Quake-console style IRC, with Terminal, Visor, and Irssi
layout: post
---

Anyone who has played the old Quake games or one of their many spinoffs has seen the Quake console; a pane that slides down from the top of your screen, displaying the games inner workings. I've always wanted to have this in my OS, with IRC instead of the game information. So I set out to create this in OS X, with the help of the Terminal, the [Visor][2] plugin and the IRC client [Irssi][3].

[<img src="http://files.bjorkoy.com/images/blog/visor_thumb.png">][1]

  [1]: http://files.bjorkoy.com/images/blog/visor.png
  [2]: http://docs.blacktree.com/visor/visor
  [3]: http://irssi.org

**Warning:** These instructions involves diving into your Mac's inner workings, so proceed with caution. I take *no responsibility* for what you might end up hurting, man nor machine.

### Installing Irssi

These instructions are lifted from the [Irssi][3] site. Go there if you require a more detailed explanation.

* Download and install [Darwin Ports][4].
* Enter Terminal, and type in `"sudo port install irssi"`
(this took a while on my machine).
* Type in "irssi" to start the IRC client, and configure it to your needs (you'll find the documentation needed on their website).

  [4]: http://www.darwinports.org/

### Installing Visor

Visor is a Terminal plugin created solely for achieving Quake console effect. Install it by following the instructions on the [Visor website][2].

After installing Visor, give it an easy to type shortcut. I used 
    Command+<.

### Putting it all together

You may now start up terminal, bring down Visor with the shortcut, and type in "irssi" to start the IRC client. VoilÃ¡!

There's still a lot of configuration and tweaking you can do, but this should get you up and running with your own Quake-style IRC console.


