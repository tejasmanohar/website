---
layout: post
title: Reverse Engineering macOS Spaces
date: 2017-07-29 00:00:00
---

In 2015, I took a leap from Linux to Mac. And, I'm not alone. Many programmers I follow,
like [Antirez](http://oldblog.antirez.com/post/linux-better-for-coding.html),
have done the same. Overall, I'm happy, but programming aside,
my biggest gripe about macOS (previously Mac OS X) has been the lack of
customizability in your desktop environment. Unlike with Linux, you don't choose
a desktop environment (e.g. XFCE, GNOME, Unity)-- you're assigned one.
While the defaults are better than anything on Linux, they're not perfect, but I'm
on a mission to solve that. In this post, we'll tackle
[virtual desktops](https://en.wikipedia.org/wiki/Virtual_desktop) or "Spaces" in Apple-speak.

While aesthetically pleasing, "Spaces" in macOS _suck_. I won't go into all the UX
details in this post, but first off, there's only one row of desktops so power users are
forced to flip through dozens of spaces with _ctrl + left/right_, remember desktop
numbers to skip directly to one using
[_ctrl + number_](http://osxdaily.com/2011/09/06/switch-between-desktops-spaces-faster-in-os-x-with-control-keys/),
or... cover your ears (_gasp_), use the **mouse**.

![Mission Control in OS X Yosemite](/public/images/osx-yosemite-spaces-mission-control.jpg)

After doing some research, I found that OS X Snow Leopard, the standard 7 years ago,
actually had a better system of "Spaces", making me desire it even more.

![Spaces switcher in OS X Snow Leopard](/public/images/osx-snow-leopard-spaces.jpg)

## Humble beginnings

I had a beautiful vision for my ideal virtual desktops... but as always,
there was _one_ problem. I've never done any Mac development before and have only
fiddled with iOS. And, now I'm saying I want to extend the desktop environment.
_Tough luck._

So, where do I start? Google, of course! I knew I wanted to build something on top
of the existing "Spaces" to avoid having to mess with window management or
app incompatibilities so I began searching for an API to programmatically change spaces.

![Google search results for "mac os x api change spaces"](/public/images/google-search-change-spaces-api.png)

It quickly turned out that OS X didn't have a public API for managing spaces so
the only solutions were reverse engineered (or leaked?). I found many solutions
from 2011-2013 referencing _CGSPrivate.h_.

```c
#include "CGSPrivate.h"
```

["CGSPrivate.h"](https://www.google.com/search?q=CGSPrivate.h) is a commonly available,
C header file detailing many private methods in the OS X CoreGraphics framework.

```c
extern OSStatus CGSGetWorkspaceWindowList(const CGSConnection cid, int workspaceNumber,
  int count, int* list, int* outCount);
extern OSStatus CGSGetWorkspace(const CGSConnection cid, int *workspace);
extern OSStatus CGSSetWorkspace(const CGSConnection cid, int workspace);
```

At first glance, it had just what I needed-- methods to describe and update Spaces.
But, how the hell do I call them? As per usual, I followed by example. I found a tool at
[shabble/osx-space-id](https://github.com/shabble/osx-space-id) on GitHub that claimed
to be able to interact with OS X spaces.

## Do it yourself
