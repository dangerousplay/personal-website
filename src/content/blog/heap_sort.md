---
title: "Heapsort, why it's efficient?"
description: "The heapsort algorithm has O(n log n) time complexity. But it uses the heap data structure and has O(1) space complexity, why?"
pubDate: "Sep 7 2023"
heroImage: "/posts/heap_sort_hero.webp"
badge: "Algorithm Complexity"
---

The **heap**sort algorithm was designed as a highly efficient and in-place sorting algorithm by **John William Joseph Williams** in the paper "Algorithm 232 - Heapsort", published in **1964** [^1].
The complexity of Heapsort is $O(n \log n)$ in time and $O(1)$ in space.
The algorithm uses the **heap** data structure introduced by **Williams** and can be seen as an improved version of the selection sort [^2].

## The heap data structure

Before diving into heapsort, let's get familiar with the heap data structure.
The heap has properties that make it very suitable to build an efficient sorting algorithm.
**Finding** the largest element in the **heap** is $O(1)$.
**Finding** and **removing** the largest element from the heap takes $O(\log n)$ time.
These properties also make heaps suitable to implement *priority queues*.

The **heap** can be visualized as a left-complete *binary tree*, which means all the levels of the tree are full;
they contain two child nodes, except the two last ones, which are on the bottom.
The bottom level is filled from left to right, which implies the name **left-complete**.
It Is precisely the **left-complete** property that allows the heap to be implemented using a **contiguos array**, without the need of using pointers, which allows **heapsort** to be constant $O(1)$ in space complexity.

The **max heap** property, also known as *heap order*, order the nodes by $key(Parent(n)) \ge key(n)$, which means that the value of each node is **greater** than or **equal to** the values of its child nodes.
The **min** variant of the heap has the same structure, but the value of each node is **lesser** than or **equal to** the values of its child nodes.

Due to the property $key(Parent(n)) \ge key(n)$, the **root** node has the **largest** element in the heap or the **smallest** element if it's a min heap.
However, some nodes in the tree that are in different branches and levels might not follow this property [^2].
The following figure illustrates the heap, a left-complete binary-tree [^3].

![alt Binary Tree](https://i.imgur.com/GkvM9Y2.png)

### Heap implementation

Due to the **left-complete** property, we can implement a heap using a contigous array.

![alt Heap array implementation](https://raw.githubusercontent.com/huzaifaarain/mime/master/heapsort.png)

The **(a)** binary tree is represented using the **(b)** contiguous array [^3].
The number above each node is the index of that node in the array.
We can observe that the indexes are increasing from top to bottom from left to right.
The number inside each node is the key, or the value of the node.
Given a node at index $i$, we can easily compute its parent, left and right child, using:

```python
def left(i):
    return 2 * i

def right(i):
    return left(i) + 1

def parent(i):
    return math.floor(i/2)
```

To maintain the **max heap** property, the *heapify* algorithm is applied.
Heapify receives a heap $A$ and an index $i$ to a subtree, which will be ordered by comparing and swapping the values of its child nodes.
If there is a swap, heapify executes again at the subtree of the node that was swapped.
This animation made by CodesDope ilustrates heapify [^4]:

![](https://www.codesdope.com/staticroot/images/algorithm/heapsort1.gif)

```python
def max_heapify(heap, i: int, m: int):
    l = left(i)
    r = right(i)
    max_value = i

    if l < m and heap[l] > heap[max_value]:
        max_value = l

    if r < m and heap[r] > heap[max_value]:
        max_value = r

    if max_value != i:
        swap(heap, i, max_value)
        max_heapify(heap, max_value, m)
```

Heapify runs in $O(h) = O(\log n)$ time, where $h$ is the height of the node which can be calculated by applying $\log n$ on the index of the node.

To build the heap, $heapify$ is applied to all nodes, starting from bottom nodes and moves towards the root node.
It starts from the bottom because the subtrees of a node should already be heaps.
The nodes at the bottom can be indexed by using $(n/2) + 1$ when the heap is implemented using a contiguos array.

```python
def build_heap(heap):
    heap_size = len(heap)
    n = math.floor(heap_size/2)

    for i in range(n+1):
        max_heapify(heap, n - i, heap_size)
```


## Heap sorting

Intuitively, the **heapsort** algorithm builds the heap using $heapify$ and iteractively swaps the position of the root node, which is the largest element in the heap, with the lowest leaf node.
Then $heapify(A, n-1)$ is applied to maintain the max heap property, but without considering the last node which was sorted.
This process continues until the last element in the heap is sorted.

```python
def heapsort(heap):
    build_heap(heap)
    heap_size = len(heap)

    for i in range(heap_size):
        n = heap_size - 1 - i
        swap(heap, 0, n)
        max_heapify(heap, 0, n)
```

This is an ilustrated animation of the algorithm made by CodesDope [^4].

![](https://www.codesdope.com/staticroot/images/algorithm/heapsort2.gif)

Because $heapify$, which runs in $O(\log n)$ time, is applied $n$ times,
the time complexity of heapsort is $O(n \log n)$
which is the best time complexity for sorting algorithms that use comparisons.


### Stability

Heapsort is not a stable sort algorithm due to the $heapify$ procedure which is executed in every iteration.
Nodes with the same keys can change their relative position.
For example, the following heap when sorted:

```python
heap = [
   (4, "Alice"),
   (6, "Mart"),
   (6, "Kage"),
   (3, "Bob"),
   (3, "John"),
   (5, "Robert"),
   (1, "Plato"),
]

heapsort(heap)

# [
#  1: Plato,
#  3: John, 
#  3: Bob, 
#  4: Alice, 
#  5: Robert, 
#  6: Kage, 
#  6: Mart
# ]
```

We can observe that the relative position of Mart and Kage as well as Bob and John is swapped.
This reveals that heapsort is indeed not stable.


## Conclusion

We explored **heapsort** an efficient, both in time $O(n \log n)$ and space $O(1)$ complexity,
sorting algorithm which uses the heap data structure.
Due to the **left-complete** property of a binary tree we learned that it is possible to use a contiguos array to represent it,
which allows heapsort to maintain a constant space complexity of $O(1)$.

We explored the properties of the **left-complete** binary tree and how $heapify$ operation contribute to heapsort's time complexity of $O(n \log n)$.
We also demonstrated the unstability of heapsort which is an important property of the sorting algorithms, which can be important depending on the use case.

I hope you have enjoyed the explanations, have a wonderful day.


[^1]: J. W. J. Williams, "Algorithm 232: Heapsort", Communications of the ACM, vol. 7, no. 6, pp. 347–348, 1964.
[^2]: CS 161 Lecture 4 - 1 Heaps. Available at https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture4.pdf
[^3]: Lecture 13: HeapSort. Available at https://www.cs.umd.edu/users/meesh/cmsc351/mount/lectures/lect13-heapsort.pdf
[^4]: Heapsort. Available at https://www.codesdope.com/course/algorithms-heapsort/

