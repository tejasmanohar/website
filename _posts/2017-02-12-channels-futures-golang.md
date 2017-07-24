---
layout: post
title: Using Channels as Futures in Golang
date: 2017-02-12 00:00:00
---

Recently, I built a task scheduler on top of [AWS ECS](https://aws.amazon.com/ecs/) in
Go. The application schedules batch jobs with custom arguments as single container tasks
via AWS ECS, an orchestrator built on top of EC2 and Docker. One of the key requirements
of the scheduler is monitoring the status of actively running tasks. For this, I chose to
use AWS ECS’s DescribeTasks endpoint, which takes ECS task ID(s) and returns metadata
(e.g. duration, status, etc.).

Due to AWS API rate limits, I had to batch API calls. Initially, I thought my code
would look something like the following.

```go
type Monitor struct {
  tasks map[string]status
}

func (m *Monitor) tick() error {
  var taskIDs []string
  for taskID := range m.tasks {
    taskIDs = append(taskIDs, taskID)
  }

  resp := aws.DescribeTasks(taskIDs)
  for _, task := range resp.Tasks {
    if task.Done {
      m.tasks[task.ID] = getStatus(task.Containers[0])
    }
  }
}

func (m *Monitor) GetStatus() map[string]status {
  return m.status
}

func (m *Monitor) Watch(task *ecs.Task) {
  m.tasks[task.ID] = pending
}
```

Seems reasonable, right? The scheduler just has to create a monitor,
submit tasks via `Watch`, and poll `GetStatus` until the target task is complete.

While this works, it's a leaky abstraction. First, the scheduler must know the monitor
is batched since it returns a map of all tasks and their statuses. Let's hide that.
Take #2--

```go
func (m *Monitor) GetStatus(task *ecs.Task) status {
  return m.tasks[task.ID]
}
```

Great! Now, `GetStatus` returns a status given a task. Though just a few extra
characters, this is a huge usability improvement since the scheduler no longer needs
to batch tasks. However, there’s still a problem with this code. When should scheduler
call GetStatus?

The naive answer is a simple `for` loop.

```go
var status schedulerStatus
for {
  status = monitor.GetStatus(task)
  if status == ... {
    break
  }
}
```

While this also _works_, it's far from perfect. First, we're [busy waiting]
(aka "spinning") and thus, consuming 100% of CPU cycles. Go can utilize multiple CPUs,
but we can certainly do better with just one!

If you came to Go from JavaScript, Scala, C#, or another language with Promises/Futures,
you’re probably thinking, “How do those translate to Go?”. Well, Go doesn’t have a
built-in “future” abstraction, but it doesn't need them because you can easily roll
your own with channels.

```go
type Monitor struct {
  tasks map[string]chan status
}

func (m *Monitor) tick() error {
  var taskIDs []string
  for taskID := range m.tasks {
    taskIDs = append(taskIDs, taskID)
  }

  resp := aws.DescribeTasks(taskIDs)
  for _, task := range resp.Tasks {
    if task.Done {
      m.tasks[task.ID] <- getStatus(task.Containers[0])
      delete(m.tasks, task.ID)
    }
  }
}

func (m *Monitor) Watch(task *ecs.Task) chan status {
  c := make(chan status, 1)
  m.tasks[task.ID] = c
  return c
}

// scheduler
m := monitor.New()
status <- m.Watch(ecsTask)
```

_Boom!_ This is beautiful, efficient, and way simpler.
`monitor.Watch(task)` returns a channel, which is “await”-able.

Using channels as futures in Go isn’t perfect. First, it’s not possible to make a
library around them with helper functions as seen in [Bluebird.js], for example,
due to Go’s lack of generics. Also, creating a channel for every function call is likely
not efficient, as each channel has its own mutex, buffer, etc., so this isn’t the right
decision if you’re dealing with lots of calls in a performance-intensive application.
In those cases, you should use a single channel and reader, e.g.

```go
func (m *Monitor) GetStatus(chan status) {
  return m.status
}

for task := range monitor.GetStatus {
  // ... handle the completed tasks
}
```

… but that comes with more indirection so try out channels as futures when possible
(most use cases) for a readable, straight-forward API!

[busy waiting]: https://en.wikipedia.org/wiki/Busy_waiting
[Bluebird.js]: http://bluebirdjs.com/docs/getting-started.html
