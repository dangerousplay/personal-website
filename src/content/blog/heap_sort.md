---
title: "Heapsort, why it's space constant?"
description: "The heapsort algorithm has O(n log n) time complexity. But it uses the heap data structure and has O(1) space complexity, why?"
pubDate: "Sep 7 2023"
heroImage: "/post_img.webp"
badge: "Algorithm Complexity"
---

The **heap**sort algorithm was designed as a highly efficient and in-place sorting algorithm by **John William Joseph Williams** in the paper "Algorithm 232 - Heapsort", published in **1964** [^1].
The complexity of Heapsort is $O(n \log n)$ in time and $O(1)$ in space.
The algorithm uses the **heap** data structure introduced by **Williams** and can be seen as an improved version of the selection sort [^2].

## The heap data structure

The heap data structure has properties that makes it very suitable to build an efficient sorting algorithm.
**Finding** the largest element in the **heap** is $O(1)$.
**Finding** and **removing** the largest element from the heap takes $O(\log n)$ time.
These properties also make heaps suitable to implement *priority queues*.

The **max** **heap** can be visualized as a *binary tree*, in which each node has two (or less) child nodes, and the value of each node is **greater** than the values of its child nodes.
The **min** variant of the heap has the same structure, but the value of each node is **lesser** than the values of its child nodes.
Due to the value of each node being greater than the value of its children, the **root** node has the **largest** element in the heap or the **smallest** element if it's a min heap.
However, some nodes in the tree can have a different value, for instance, in the level 3 and 4 the nodes can have values which don't follow the rule of being greater between then.


## Heap sorting

Intuitively, the **heapsort** algorithm iteractively swaps the position of the largest element in the heap with the lowest leaf node.

```python

```

This is an ilustrated animation of the algorithm made by Avinash [^3].

![](https://miro.medium.com/v2/resize:fit:720/0*hVi2iYTIVkrm9ODv.gif)

## $\sum_{h=0}^{\log n} { (\frac{n}{2^{h+1}}) } O(h) = O(n \sum_{h=0}^{\log n} { \frac{h}{2^{h}} }) \leq O(n \sum_{h=0}^{\infty} { \frac{h}{2^{h}} }) = O(2n) = O(n)$




[^1]: J. W. J. Williams, "Algorithm 232: Heapsort", Communications of the ACM, vol. 7, no. 6, pp. 347–348, 1964.
[^2]: CS 161 Lecture 4 - 1 Heaps. Available at https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture4.pdf
[^3]: Avinash Sarguru, Implementing Heap Sort in a Min-Heap. 2020. Available at https://medium.com/@avinash.sarguru/implementing-heap-sort-in-a-min-heap-7495ca13e3d5

