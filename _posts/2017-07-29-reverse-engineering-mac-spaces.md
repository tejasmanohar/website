---
layout: post
title: Reverse Engineering macOS Spaces
date: 2017-07-29 00:00:00
---

In 2015, I took a leap from Linux to Mac. And, I'm not alone. Many programmers I follow,
like [Antirez](http://oldblog.antirez.com/post/linux-better-for-coding.html),
have done the same. Overall, I'm happy, but programming aside,
my biggest gripe about macOS (previously Mac OS X) has been the lack of
customizability in your desktop environment. Unlike Linux, you don't choose
a desktop environment (e.g. XFCE, GNOME, Unity)-- you're assigned one.
While the defaults are better than that of any mainstream Linux desktop environment,
they're far from perfect, but I'm on a mission to solve that. In this post, we'll tackle
[virtual desktops](https://en.wikipedia.org/wiki/Virtual_desktop) or "Spaces" in Apple-speak.

While aesthetically pleasing, "Spaces" in macOS functionally _suck_ for power users.
I won't go into all the UX details in this post, but for one, there's only one row of
desktops so you're forced to flip through lots of spaces with _ctrl + left/right_,
remember desktop numbers to skip directly to one using
[_ctrl + number_](http://osxdaily.com/2011/09/06/switch-between-desktops-spaces-faster-in-os-x-with-control-keys/),
or... cover your ears (_gasp_), use the **mouse**.

![Mission Control in OS X Yosemite](/public/images/osx-yosemite-spaces-mission-control.jpg)

After doing some research, I found that OS X Snow Leopard, the standard ~7 years ago,
actually had multiple rows of "Spaces".

![Spaces switcher in OS X Snow Leopard](/public/images/osx-snow-leopard-spaces.jpg)

This made me yearn for the customizability of Linux even more.


## Humble beginnings

I had a beautiful vision for my ideal system of virtual desktops... but as always,
there was _one_ problem. I've never done any Mac development before and have only
fiddled with iOS. And, now I'm saying I want to extend the desktop environment.
_Tough luck._

So, where do I start? Google, of course! I knew I wanted to build something on top
of the existing "Spaces" to avoid having to mess with window management or
app incompatibilities so I began searching for an API to programmatically change spaces.

![Google search results for "mac os x api change spaces"](/public/images/google-search-change-spaces-api.png)

It quickly turned out that macOS didn't have a **public** API for managing spaces so
all the available solutions were reverse engineered. I found many solutions from
2011-2013 referencing _CGSPrivate.h_.

```c
#include "CGSPrivate.h"
```

["CGSPrivate.h"](https://gist.github.com/rjw57/5495406) is a commonly available,
C header file detailing signatures of many private APIs in the macOS CoreGraphics
framework.

```c
extern OSStatus CGSGetWorkspaceWindowList(const CGSConnection cid, int workspaceNumber,
  int count, int* list, int* outCount);
extern OSStatus CGSGetWorkspace(const CGSConnection cid, int *workspace);
extern OSStatus CGSSetWorkspace(const CGSConnection cid, int workspace);
```

At first glance, it seemed like it had just what I needed-- functions to describe and
update Spaces. But, how the hell do I call it?

As per usual, I followed by example and cloned [shabble/osx-space-id](https://github.com/shabble/osx-space-id),
a tool on GitHub that claimed to be able to interact with OS X spaces.

```bash
$ make
gcc -x objective-c -arch i386 -arch x86_64 -fmessage-length=0 -std=c99 -mmacosx-version-min=10.5 -fpascal-strings -fasm-blocks -framework Foundation -framework Carbon -Wall -o spaces-util main.c
Undefined symbols for architecture i386:
  "_CGSSetWorkspace", referenced from:
      _set_space in main-14a075.o
ld: symbol(s) not found for architecture i386
clang: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [spaces-util] Error 1
```

_Rats!_ Unfortunately, the program no longer compiled, and from related GitHub [issues](https://github.com/shabble/osx-space-id/issues/3), it seemed like the
functions declared in _CGSPrivate.h_ were deprecated in later versions of OS X.
After searching for nearly an hour, it didn't seem like anyone had successfully
reverse-engineered Spaces in the last few years, or at least written about it so
I decided to take matters into my own hands.


## Where Art Thou

Where does one begin looking? The problem was so abstract, and I was clueless.
Coincidentally, while searching for Spaces API earlier, I came across this post on Apple
discussion boards that indicated that the built-in "Dock" app was responsible for Spaces
amongst other things.

!["API for Spaces" in Apple discussion board](/public/images/apple-discussion-spaces-dock.png)

Great! That narrows things down quite a bit. Now, I just needed to figure out what
methods it calls to switch spaces. On Linux, I'd used [strace](https://linux.die.net/man/1/strace)
to monitor system/kernel calls, and in the past, I'd used [GDB](https://www.gnu.org/software/gdb/)
to trace the execution path of my own programs or open-source ones that I could
recompile with `gcc -g`, but I'd never traced local function calls of a live,
closed-source program.

![Google search results for "trace function calls os x"](/public/images/google-search-trace-function-calls-osx.png)

From some initial research, it became clear `dtrace` was the _de facto_ solution.

I started by listing all entries for the Dock app using dtrace's
[pid provider](http://dtrace.org/blogs/brendan/2011/02/09/dtrace-pid-provider/).

```bash
$ ps aux | grep Dock.app
tejas            84833   0.0  0.1  2571464  16196   ??  Ss   Sat05PM   0:03.79 /System/Library/CoreServices/Dock.app/Contents/XPCServices/com.apple.dock.extra.xpc/Contents/MacOS/com.apple.dock.extra
tejas            84832   0.0  0.2  2910700  40988   ??  S    Sat05PM   1:36.89 /System/Library/CoreServices/Dock.app/Contents/MacOS/Dock
tejas            10873   0.0  0.0  2432804   2092 s006  S+   12:49AM   0:00.00 grep Dock.app
$ sudo dtrace -ln 'pid$target:::entry' -p 84832
Password:
   ID   PROVIDER            MODULE                          FUNCTION NAME
334063   pid84832              dyld                       _dyld_start entry
334064   pid84832              dyld dyldbootstrap::start(macho_header const*, int, char const**, long, macho_header const*, unsigned long*) entry
334065   pid84832              dyld dyld::addMappedRange(ImageLoader*, unsigned long, unsigned long) entry
334066   pid84832              dyld dyld::removedMappedRanges(ImageLoader*) entry
334067   pid84832              dyld dyld::findMappedRange(unsigned long) entry
334068   pid84832              dyld dyld::mkstringf(char const*, ...) entry
# ...
```

That's awesome, but...

```bash
$ sudo dtrace -ln 'pid$target:::entry' -p 84832 | wc -l
  385918
```

It's too much to even skim. So, I dug further using some _obvious_ keywords.

```bash
$ sudo dtrace -ln 'pid$target:::entry' -p 11248 | grep Space
334442   pid11248              dyld ImageLoaderMachO::usesTwoLevelNameSpace() const entry
334999   pid11248              dyld libunwind::UnwindCursor<libunwind::LocalAddressSpace, libunwind::Registers_x86_64>::~UnwindCursor() entry
335000   pid11248              dyld libunwind::UnwindCursor<libunwind::LocalAddressSpace, libunwind::Registers_x86_64>::validReg(int) entry
335001   pid11248              dyld libunwind::UnwindCursor<libunwind::LocalAddressSpace, libunwind::Registers_x86_64>::getReg(int) entry
335002   pid11248              dyld libunwind::UnwindCursor<libunwind::LocalAddressSpace,
# ...
$ sudo dtrace -ln 'pid$target:::entry' -p 11248 | grep Space | wc -l
2595
```

**Better**. Without further ado, I scrolled through scanning for familiar terms.

```
417424   pid11248      CoreGraphics             CGSAddWindowsToSpaces entry
417474   pid11248      CoreGraphics          CGSCopyDisplayColorSpace entry
417479   pid11248      CoreGraphics     CGSCopyManagedDisplayForSpace entry
417481   pid11248      CoreGraphics       CGSCopyManagedDisplaySpaces entry
417486   pid11248      CoreGraphics                     CGSCopySpaces entry
```

Hey, "CGS" sure sounds familiar!

```
$ sudo dtrace -ln 'pid$target:::entry' -p 11248 \
>  | grep CoreGraphics \
>  | grep CGS \
>  | grep Space \
>  | wc -l
      88
```

That's more like it!


## Taking things apart

Now, we know the function name, but where is it defined? What do I `#include`?


## Conclusion

While this post may have only taken minutes to read, I don't intend to deceive.
It took me a weekend to reverse engineer Spaces.

Often, engineering is less about what you know but more about how fast you can learn
what you don't.
