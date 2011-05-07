---
title: Page Width and Device Independence
layout: post
---

Page width has to be one of the most debated aspects of web design. The discussion used to revolve around fixed versus fluid layouts, and in the case of fixed layouts, the maximum width a website could use without invoking the dreaded horizontal scrollbar. 

Recently the notion of device-specific layouts and page widths has been all the rage, through the use of media queries, user agent matching and dynamic layouts with Javascript. For instance, by using CSS media queries, a site can serve up different layouts to phones, tablets and computers based on their respective screen sizes.

Altering content based on screen width is a wonderful and powerful feature, but there's a few caveats to remember. If you're designing a typical website, but have a specific device in mind, you might be doing something wrong.

There's an ever increasing spectrum of device screen sizes, and while some devices are more popular than others, using exact matching to customize a layout to a specific device brings back memories of "this site can only be viewed through IE6 or newer". Common sense dictates that the spectrum will become more homogenous over time. Right now, there seems to be three main screen width steps represented by phones, tablets and computers, but new devices will surely pop up in between these ill-defined plateaus.

In designers terms, this means that a site should work fine with any screen width, just as it should work fine with any screen height. We can expect users to scroll vertically, but expecting users to continuously scroll in two dimensions is no solution. Page width has to be device independent, not device-specific.

The ideal solution then seems to be to use a fluid layout, with tools such as media queries to fluidly add, move or remove elements as the screen width changes, but not to identify the actual device in use. This way, the layout is not dependent on any one device or window size, but usable on any current or future device screen.
