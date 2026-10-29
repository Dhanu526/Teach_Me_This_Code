import re
import os

target_file = r'C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_dashboard.js'
with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. New 10-Stage Roadmap Definition
ten_stages_def = '''  const BEGINNER_ROADMAP_10_STAGES = [
    {
      stage: 1,
      phase: 1,
      title: 'Stage 1: Python fundamentals and arrays',
      shortTitle: 'Python Fundamentals & Arrays',
      topics: ['Arrays'],
      description: 'Master core Python list operations, 0-based indexing, in-place element swapping, linear traversals, frequency counters, and prefix accumulation.',
      milestone: 'Two Sum (LC 1)',
      milestoneId: 1,
      starters: [1, 2, 6, 13],
      keyConcepts: [
        'List indexing, slicing [start:end:step], and memory layout',
        'Single-pass linear scan in O(n) without extra allocations',
        'In-place element swapping and boundary tracking',
        'Hash set membership testing for O(1) duplicate checks'
      ]
    },
    {
      stage: 2,
      phase: 2,
      title: 'Stage 2: Strings and hashing',
      shortTitle: 'Strings & Hashing',
      topics: ['Strings', 'Hashing and Hash Maps'],
      description: 'Explore character ASCII transformations, anagram frequency grouping, string immutability in Python, and constant O(1) average lookup dictionaries.',
      milestone: 'Valid Anagram (LC 242) & Group Anagrams (LC 49)',
      milestoneId: 3,
      starters: [3, 4, 8, 25],
      keyConcepts: [
        'String immutability and efficient list-to-string str.join()',
        'Frequency counting with dict and collections.Counter',
        'Character ordinal mapping via ord() and chr()',
        'Hash key collision resolution and set deduplication'
      ]
    },
    {
      stage: 3,
      phase: 3,
      title: 'Stage 3: Two pointers and sliding windows',
      shortTitle: 'Two Pointers & Sliding Windows',
      topics: ['Two Pointers', 'Sliding Window'],
      description: 'Compress quadratic O(n²) iterations into O(n) linear scans using bidirectional converging pointers, fast/slow runners, and dynamic window horizons.',
      milestone: '3Sum (LC 15) & Longest Substring Without Repeating (LC 3)',
      milestoneId: 33,
      starters: [31, 32, 33, 52],
      keyConcepts: [
        'Opposite-direction converging pointers on sorted arrays',
        'Equi-directional fast and slow runner pointers',
        'Dynamic sliding window expanding and contracting bounds',
        'Maintaining window state invariants with hash tables'
      ]
    },
    {
      stage: 4,
      phase: 4,
      title: 'Stage 4: Prefix sums, sorting, and binary search',
      shortTitle: 'Prefix Sums, Sorting & Binary Search',
      topics: ['Prefix Sum', 'Sorting', 'Binary Search'],
      description: 'Precompute cumulative range queries in O(1), apply comparison/linear sorting invariants, and divide-and-conquer monotonic spaces with logarithmic O(log n) efficiency.',
      milestone: 'Binary Search (LC 704) & Search in Rotated Sorted Array (LC 33)',
      milestoneId: 89,
      starters: [16, 22, 89, 91],
      keyConcepts: [
        'Prefix sum array construction and O(1) range queries [L, R]',
        'Midpoint calculation mid = low + (high - low) // 2 without overflow',
        'Binary search on answer space (monotonic predicate functions)',
        'Dutch National Flag 3-way partitioning sort'
      ]
    },
    {
      stage: 5,
      phase: 5,
      title: 'Stage 5: Linked lists, stacks, and queues',
      shortTitle: 'Linked Lists, Stacks & Queues',
      topics: ['Linked Lists', 'Stacks', 'Queues and Deques', 'Monotonic Stack and Queue'],
      description: 'Traverse and manipulate heap-allocated node references, maintain LIFO stacks for parentheses/monotonic state, and utilize FIFO double-ended queues for state buffering.',
      milestone: 'Valid Parentheses (LC 20) & Reverse Linked List (LC 206)',
      milestoneId: 69,
      starters: [69, 70, 109, 110],
      keyConcepts: [
        'Sentinel dummy heads for edge-case elimination',
        'Fast and slow pointer Floyd cycle detection',
        'LIFO bracket matching and expression parsing',
        'Monotonic stacks for Next Greater Element in O(n)'
      ]
    },
    {
      stage: 6,
      phase: 6,
      title: 'Stage 6: Recursion and backtracking',
      shortTitle: 'Recursion & Backtracking',
      topics: ['Recursion', 'Backtracking'],
      description: 'Formulate recurrence relations, base case termination, and recursion call stack traces. Explore state-space search trees with pruning for permutations, combinations, and power sets.',
      milestone: 'Subsets (LC 78) & Combination Sum (LC 39)',
      milestoneId: 187,
      starters: [187, 189, 191, 193],
      keyConcepts: [
        'Base cases, recurrence steps, and return value bubbling',
        'State-space decision trees and branching factor',
        'Choose, Explore, Unchoose backtracking lifecycle',
        'Early branch pruning to prevent combinatorial explosion'
      ]
    },
    {
      stage: 7,
      phase: 7,
      title: 'Stage 7: Trees and binary search trees',
      shortTitle: 'Trees & BSTs',
      topics: ['Trees and Binary Trees', 'Binary Search Trees', 'Tries'],
      description: 'Traverse recursive branching structures (preorder, inorder, postorder, BFS level-order), enforce Binary Search Tree invariant properties, and build prefix tries for fast string lookups.',
      milestone: 'Maximum Depth of Binary Tree (LC 104) & Validate BST (LC 98)',
      milestoneId: 132,
      starters: [131, 132, 143, 163],
      keyConcepts: [
        'Depth-first search traversals: preorder, inorder, postorder',
        'Breadth-first search level-order queue traversals',
        'BST invariant: all left nodes < root < all right nodes',
        'Prefix Trie character tree insertion and prefix matching'
      ]
    },
    {
      stage: 8,
      phase: 8,
      title: 'Stage 8: Heaps and graphs',
      shortTitle: 'Heaps & Graphs',
      topics: ['Heaps and Priority Queues', 'Graphs', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Topological Sorting', 'Union-Find'],
      description: 'Schedule priority elements with min/max heaps, build adjacency list networks, find shortest paths with BFS, detect cycles and connected components with DFS, compute topological sort, and merge disjoint sets.',
      milestone: 'Number of Islands (LC 200) & Course Schedule (LC 207)',
      milestoneId: 205,
      starters: [171, 205, 206, 212],
      keyConcepts: [
        'Min-heap and Max-heap heapify and heappop/heappush',
        'Adjacency list representation with dict and defaultdict',
        'Breadth-first shortest unweighted path search',
        'Depth-first cycle detection and connected components',
        'Topological sorting via Kahn algorithm and in-degrees',
        'Disjoint-set union with find and union by rank'
      ]
    },
    {
      stage: 9,
      phase: 9,
      title: 'Stage 9: Greedy algorithms and dynamic programming',
      shortTitle: 'Greedy & Dynamic Programming',
      topics: ['Greedy Algorithms', 'Dynamic Programming', 'Intervals'],
      description: 'Identify optimal substructure and overlapping subproblems. Master top-down memoization, bottom-up tabulation, greedy local-choice invariants, and interval scheduling.',
      milestone: 'Climbing Stairs (LC 70) & Maximum Subarray (LC 53)',
      milestoneId: 239,
      starters: [239, 251, 241, 281],
      keyConcepts: [
        'Optimal substructure and overlapping subproblems identification',
        'Top-down memoization with @lru_cache or memo dictionary',
        'Bottom-up dynamic programming tabulation with rolling variables',
        'Kadanes algorithm for maximum subarray in O(n)',
        'Greedy interval merging by sorting boundary endpoints'
      ]
    },
    {
      stage: 10,
      phase: 10,
      title: 'Stage 10: Advanced patterns and data structures',
      shortTitle: 'Advanced Patterns & Structures',
      topics: ['Advanced Data Structures', 'Bit Manipulation', 'Math and Number Theory', 'Matrix Problems'],
      description: 'Harness bitwise manipulation (XOR, shifts, masks), 2D matrix in-place transformations, prime factorization and modular arithmetic, and composite structures like LRU Cache and Monotonic Deque.',
      milestone: 'Single Number (LC 136) & Rotate Image (LC 48)',
      milestoneId: 10,
      starters: [10, 19, 20, 295],
      keyConcepts: [
        'Bitwise XOR self-canceling identity (a ^ a = 0)',
        'Bitmask manipulation and Brian Kernighan bit count',
        'In-place 2D matrix transposition and row reversal',
        'Euclidean Greatest Common Divisor and modular arithmetic',
        'Composite data structures (Hash Map + Doubly Linked List)'
      ]
    }
  ];

  // Backward compatibility alias
  const ROADMAP_PHASES = BEGINNER_ROADMAP_10_STAGES;'''

# Replace old ROADMAP_PHASES definition
old_roadmap_pattern = r'  const ROADMAP_PHASES = \[\s*\{[\s\S]*?\n  \];'
if re.search(old_roadmap_pattern, content):
    content = re.sub(old_roadmap_pattern, ten_stages_def, content, count=1)
    print("[SUCCESS] Replaced ROADMAP_PHASES with BEGINNER_ROADMAP_10_STAGES (10 stages)")
else:
    print("[ERROR] Failed to match old ROADMAP_PHASES")

with open(target_file + '.tmp', 'w', encoding='utf-8') as f:
    f.write(content)

os.replace(target_file + '.tmp', target_file)
print("File updated successfully.")
