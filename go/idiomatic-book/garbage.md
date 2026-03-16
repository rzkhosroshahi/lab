# The core argument: less garbage is better than smarter collection
The document's central thesis is not "here's how GC works" — it's "write code that produces less work for the GC in the first place." That's the lens for everything that follows.

## Stack vs heap: same idea, stricter rules in Go
You already know this from the JS session. Stack = fast, structured, freed automatically when a function returns. Heap = flexible, GC-managed, slower.
Go is more explicit about when something escapes to the heap. The compiler runs escape analysis and puts data on the stack if three conditions all hold: the size is known at compile time, the data is a local variable, and no pointer to it is returned. The moment any condition breaks — say, you return a pointer — the value escapes to the heap and the GC has to manage it.

```go
// Stays on the stack — local, known size, not returned
func add(a, b int) int {
    result := a + b
    return result  // value is copied, not a pointer
}

// Escapes to the heap — pointer is returned
func newUser(name string) *User {
    u := User{Name: name}
    return &u  // u must go to the heap; stack frame is gone after return
}
```
In C, returning &u is a bug — you're pointing at dead stack memory. Go's compiler detects this and silently moves u to the heap instead. Safer, but it means more GC work.

## The performance cost of heap allocation: two problems

![The performance cost of heap](./assets/1.png)

**Problem 1** — GC time. Every object on the heap is something the collector has to find, trace, and potentially free. More heap objects = longer or more frequent collection cycles.

**Problem 2** — Cache misses. Modern CPUs are fast not because RAM is fast, but because the CPU cache is fast. The cache works by loading contiguous memory in one shot. A slice of structs is laid out sequentially — one cache load covers many items. A slice of pointers scatters the actual data all over the heap, so every single access is a potential cache miss. The document cites roughly a 100× slowdown for pointer-heavy data structures. This is what "mechanical sympathy" means — writing code that matches how the hardware actually works.
This is exactly why Go recommends structs over pointers to structs by default, and why Java's object model (everything is a pointer to a heap allocation) has historically required such sophisticated GCs to compensate.

## How Go's GC is tuned: GOGC and GOMEMLIMIT

The GC doesn't run after every allocation — that would be ruinously slow. It waits until the heap grows to a certain size, then collects. Two knobs control this:
GOGC controls how fast the heap is allowed to grow between collections.

```bash
next_collection_threshold = current_heap + current_heap × (GOGC / 100)
```

At the default of **GOGC=100**, the heap can double before the next GC cycle triggers. If you set **GOGC=50**, the heap can only grow by 50% — more frequent collections, lower memory usage, but more CPU time spent on GC. If you double it to **GOGC=200**, you get roughly half the GC CPU cost, but higher peak memory.

with GOGC=100 *default*:
![The performance cost of heap](./assets/2.png)

**GOMEMLIMIT** sets a hard ceiling on total memory usage. It exists because **GOGC** alone can't protect you from memory spikes — if traffic suddenly surges and the heap balloons, the threshold formula might let it grow past available RAM, causing the OS to swap to disk (catastrophically slow) or crash the process.
The catch: if you set the limit too tight, you can trigger thrashing — the GC runs constantly trying to free memory but can't get below the limit, so the program does nothing except collect garbage. Go detects this and deliberately exceeds the limit rather than thrash. The recommendation is to use both together:
```bash
GOGC=100 GOMEMLIMIT=3GiB ./myservice
```

GOGC keeps the pace of collection sane. GOMEMLIMIT keeps the ceiling safe. Neither alone is sufficient.