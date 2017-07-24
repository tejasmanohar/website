---
layout: post
title:  On Golang's `defer` Keyword
date:   2016-08-27 00:00:00
---

Golang has a _defer_ keyword, which postpones the execution of a function to after the
surrounding function returns. Functions are
[stacked](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) so that the last
deferred function is run first.

Let’s check out an example of this in practice.

```go
func writeLogs(c chan []string) {
  defer stats.Duration("write_logs_fn", time.Now()) // order: 4

  file, err := os.Create("request.log", filename)
  if err != nil {
    panic(err)
  }
  defer file.Close() // order: 3

  writer := csv.NewWriter(file)
  defer writer.Flush() // order: 2

  for line := range c {
    err := writer.Write(line)
    if err != nil {
      panic(err)
    }
    defer stats.Increment("wrote_line") // order: 1
  }
}
```

At first glance, you may ask--
> How is this different from the [**finally** keyword](https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html) in other languages?

From [Java Docs](https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html),
> **finally** is useful for more than just exception handling — it allows the programmer to avoid having cleanup code accidentally bypassed by a return, continue, or break. Putting cleanup code in a finally block is always a good practice, even when no exceptions are anticipated.

Well, let’s compare *defer* to the following Java example using *finally*.

```java
static void writeLogs(List<List<String>> lines) throws Exception {
  Date start = new Date();
  FileWriter writer = null;
  int lineCount = 0;

  try {
    writer = new FileWriter("request.log");
    // non-buffered input
    for (int i = 0; i < lines.size(); i++) {
      // naive CSV writer
      for (value : lines[i]) {
        writer.append(value);
        writer.append(",");
      }
      writer.append("\n");
      lineCount++;
    }
  } finally {
    if (writer != null) {
      writer.flush();
      writer.close();
    }

    stats.increment("wrote_line", lineCount);
    stats.duration(start);
  }
}
```

Off the bat, you can identify a handful of “gotchas”:

* **Separation of similar concerns.** _finally_ separates alike concerns. Because you can’t declare that you’d like to close a file when you open it, you can’t effectively plan ahead; instead, you have to remember to fit it into the surrounding context. I can’t count how many programmer errors I’ve seen due to separating alike concerns.

* **Interruptions.** _finally_ requires immediate, exclusive, and interrupting attention, whereas _defer_ allows you to plan ahead without interrupting your usual control flow. In the Go example, we could easily defer incrementing a metric as we read each line, whereas in Java, deferring multiple calls would require more advanced control flow, like a queue, so instead, we have to _reorganize_ our flow by aggregating.

* **Readability.** _finally_ enforces nesting, which hurts overall readability, whereas _defer_ can be dropped in inline. Notice the _!= null_ check, counters, and separate definition from declaration. Holistically, none of these characteristics are meaningful to a reader, but they’re forced to parse it due to the nested structure.

Alike most technical debt, I’ve found that each of these “gotchas” becomes more apparent as the complexity of your function grows.

## Conclusion

Though unconventional, Go’s *defer* is pure brilliance. It disguises a generally complex control flow with a simple, universal one that both helps readability and keeps things declarative. It’s far superior to traditional teardown via *finally*, and you should almost always prefer it to rolling out your own control flow.
