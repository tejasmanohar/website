---
layout: post
title:  Pitfalls of Node.js
date:   2016-08-19 00:00:00
---

Lately, I’ve been writing lots of Python and Go, but if you know anything about me,
you’d know I was once a [major](https://www.meetup.com/nashjs/events/224842082/) [Node.js](https://medium.com/@tejasmanohar/i-m-on-the-koa-js-team-14a72717504d) [advocate](https://hackernoon.com/understanding-es6-const-ab448906c4e1). Recently, when
I’ve had to stretch my fingers to write a quick “life hack” or number crunching script to
speed up my day, I haven’t been thinking of JS, so I definitely can’t call it my go-to
language anymore. That said, since I once did, I believe I have the right to criticize it
... so, let’s get started.

### Standard Library

Node’s standard library is as minimal as can be. While this is a great way to encourage
the community to build libraries, it also makes it harder to standardize and furthermore,
compose anything.

But, don’t get me wrong- after working in Ruby and Python, I’m strongly against vast,
deep standard libraries. Instead, I prefer standard libraries like that of Go and Java
that are vast yet shallow. The difference is these standard libraries provide all the
tools you need to solve the most common case and bindings needed to expand beyond,
whereas Node’s standard library only provides all the (mostly native) bindings needed
to build the tools to solve the most common case. Instead of [yet](https://github.com/visionmedia/superagent) [another](https://github.com/github/fetch) [HTTP](https://github.com/request/request) [client](https://github.com/mzabriskie/axios), we develop [ways](https://github.com/f2prateek/train) [to](https://github.com/tylerb/graceful) [enhance](https://github.com/gorilla/mux)
the standard implementation in a way that’s reusable practically everywhere.

### Error Handling

{% include image.html src="joyent-error-design-screenshot.png"
desc="<a href='https://www.joyent.com/node-js/production/design/errors'>Joyent post on
error handling in Node.js</a>" %}

If the above snippet isn’t enough, take a peek at the following:

```javascript
function onError(err) {
    log.fatal({
        code: 1,
        err
    }, 'process exit');
    process.exit(1);
}

process.on('unhandledException', onError);
process.on('unhandledRejection', (p, err) => onError(err));
```

Exception bubbling allows errors that should be handled at call-site propagate endlessly.
Catch-all error handlers are just a workaround for poor design. Seamless bubbling makes
it easy to ignore your error paths, which are arguably as important as your successful
paths in critical software. It's also much harder to debug the execution path of your
program when something _n_ level deeps can change the overall direction.
Of course, it's entirely possible to be thoughtful and handle every error in
JavaScript, too, but it's cumbersome since there's no standardization in _how_ errors
are actually handled (`try/catch`, `.on('error')`, `.catch()`, etc.) and moreover,
it's easy to forget.

### Synchronous Code

Though async I/O is important, it’s not *everything*. If anything, I’d say forgetting
this is Node’s biggest downside. Node forces you to think about concurrency everywhere,
whereas Go, Lua, Python (though there are other problems there), and other languages
allow you to incorporate it as needed without switching paradigms.

You can--and I like to believe that I have-- achieved this in Node with newer constructs like
[generator-based coroutines](http://tobyho.com/2015/12/27/promise-based-coroutines-nodejs/) and [Async/Await](https://zeit.co/blog/async-and-await), but they’re never first-class,
and require loads of tribal knowledge in order to effectively utilize amongst
[all](https://www.promisejs.org/) [the](http://callbackhell.com/) [other](https://bjouhier.wordpress.com/2012/03/11/fibers-and-threads-in-node-js-what-for/) [paradigms](http://blog.yld.io/2015/12/15/using-an-event-emitter/) [the](https://github.com/substack/stream-handbook) [community](http://zef.me/blog/6096/callback-free-harmonious-node-js) [follows](https://howtonode.org/step-of-conductor). If you don’t believe me, try teaching
all this to a beginner from scratch.

## And Beyond!

Now, I’m not saying Node.js is an awful platform. It did a great job at popularizing
a convenient interface to asynchronous I/O, and it's still better at some things, like
parsing JSON quickly. That said, now, there are superior options, like Go.
When I was stuck in Node land, I’d often assess other platforms by staring at examples
and laughing along, and I’ve seen a lot of (but not all!) fellow JavaScript developers do
the same, but, by stepping out of my comfort zone, I’ve learned that it’s impossible to
effectively criticize something without developing a strong relationship with it,
which for languages, includes debugging, working around abnormalities, and learning ins
and outs. All platforms have their trade-offs, and analyzing them is the only way
to make educated decisions on what to leave in or out of the next big thing&trade;.
