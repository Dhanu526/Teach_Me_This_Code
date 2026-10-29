import json
import re

problems_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_problems.js"

with open(problems_path, "r", encoding="utf-8") as f:
    text = f.read()

prefix = "window.DSA_PROBLEMS_LIBRARY = "
start_idx = text.find(prefix) + len(prefix)
end_idx = text.rfind("];") + 1
raw_json = text[start_idx:end_idx]
problems = json.loads(raw_json)

print(f"Loaded {len(problems)} problems")

# List of 30 official topics specified by the user
ALL_30_TOPICS = [
    "Arrays",
    "Strings",
    "Hashing and Hash Maps",
    "Two Pointers",
    "Sliding Window",
    "Prefix Sum",
    "Binary Search",
    "Sorting",
    "Linked Lists",
    "Stacks",
    "Queues and Deques",
    "Recursion",
    "Backtracking",
    "Trees and Binary Trees",
    "Binary Search Trees",
    "Heaps and Priority Queues",
    "Graphs",
    "Breadth-First Search (BFS)",
    "Depth-First Search (DFS)",
    "Greedy Algorithms",
    "Dynamic Programming",
    "Bit Manipulation",
    "Tries",
    "Union-Find",
    "Topological Sorting",
    "Intervals",
    "Monotonic Stack and Queue",
    "Math and Number Theory",
    "Matrix Problems",
    "Advanced Data Structures"
]

# Build rule-based multi-topic tagger for each problem based on LC number, title, description, code, pattern, and original topic
def assign_topics(p):
    topics = set()
    lc = p["leetcodeNumber"]
    title = p["title"].lower()
    desc = p["description"].lower()
    code = p["starterCode"].lower()
    pattern = p["pattern"].lower()
    orig = p.get("topic", "")

    # Base topic mapping from Phase 1
    if "Array" in orig:
        topics.add("Arrays")
    if "Hash" in orig:
        topics.add("Hashing and Hash Maps")
    if "Two Pointer" in orig:
        topics.add("Two Pointers")
        topics.add("Arrays")
    if "Sliding Window" in orig:
        topics.add("Sliding Window")
        topics.add("Arrays")
    if "Stack" in orig:
        topics.add("Stacks")
    if "Binary Search" in orig:
        topics.add("Binary Search")
    if "Linked List" in orig:
        topics.add("Linked Lists")
    if "Tree" in orig:
        topics.add("Trees and Binary Trees")
    if "Trie" in orig:
        topics.add("Tries")
        topics.add("Trees and Binary Trees")
    if "Heap" in orig:
        topics.add("Heaps and Priority Queues")
    if "Backtracking" in orig:
        topics.add("Backtracking")
        topics.add("Recursion")
    if "Graph" in orig:
        topics.add("Graphs")
    if "Dynamic Programming" in orig:
        topics.add("Dynamic Programming")
    if "Greedy" in orig:
        topics.add("Greedy Algorithms")
    if "Interval" in orig:
        topics.add("Intervals")
        topics.add("Arrays")
    if "Bit" in orig:
        topics.add("Bit Manipulation")

    # String identification
    if any(k in title for k in ["string", "anagram", "parentheses", "palindrome", "word", "subsequence", "decode", "roman", "prefix", "character"]) or \
       any(k in desc for k in ["string", "character", "substring", "anagram", "palindrome", "words", "letters"]):
        topics.add("Strings")

    # Arrays identification
    if any(k in title for k in ["array", "subarrays", "matrix", "nums", "numbers", "duplicate", "sum", "stock", "product", "element"]) or \
       any(k in desc for k in ["array", "list", "integers", "matrix", "elements", "grid"]):
        topics.add("Arrays")

    # Hashing & Hash Maps
    if any(k in code for k in ["{", "dict", "map", "seen", "freq", "count", "lookup", "memo"]) or \
       any(k in desc for k in ["hash", "frequency", "count", "map", "unique", "duplicate", "seen"]) or \
       any(k in pattern for k in ["hash", "frequency", "map", "lookup", "counter"]):
        topics.add("Hashing and Hash Maps")

    # Prefix Sum
    if any(k in pattern for k in ["prefix sum", "cumulative", "running sum"]) or \
       any(k in desc for k in ["prefix sum", "cumulative sum", "subarray sum"]) or \
       "prefix" in title or lc in [560, 525, 238, 303, 304, 724, 974, 1248, 523]:
        topics.add("Prefix Sum")
        topics.add("Arrays")

    # Sorting
    if any(k in code for k in [".sort(", "sorted(", "sort"]) or \
       any(k in pattern for k in ["sort", "partition"]) or \
       any(k in desc for k in ["sorted", "sort the", "order"]):
        topics.add("Sorting")

    # Queues & Deques
    if any(k in code for k in ["deque", "queue", "popleft", "appendleft"]) or \
       any(k in pattern for k in ["queue", "deque", "bfs", "level order"]) or \
       any(k in desc for k in ["queue", "deque", "fifo", "level order"]):
        topics.add("Queues and Deques")

    # Monotonic Stack & Queue
    if any(k in pattern for k in ["monotonic stack", "monotonic queue", "next greater", "next smaller"]) or \
       lc in [739, 84, 85, 42, 496, 503, 901, 239, 402, 316, 1762]:
        topics.add("Monotonic Stack and Queue")
        topics.add("Stacks")

    # Recursion
    if "Recursion" in orig or "def " in code and code.count(p.get("title", "").split()[0].lower()) > 1 or \
       any(k in pattern for k in ["recursive", "dfs", "backtrack", "divide and conquer", "tree dfs"]) or \
       "recursion" in desc or "recursive" in desc:
        topics.add("Recursion")

    # Binary Search Trees (BST)
    if "bst" in title or "binary search tree" in title or "bst" in desc or "binary search tree" in desc or \
       lc in [98, 235, 700, 701, 450, 230, 108, 173, 538, 669]:
        topics.add("Binary Search Trees")
        topics.add("Trees and Binary Trees")

    # Breadth-First Search (BFS)
    if any(k in pattern for k in ["bfs", "level order", "shortest path", "queue traversal", "multi-source bfs"]) or \
       any(k in code for k in ["deque", "popleft"]) or \
       any(k in desc for k in ["level by level", "bfs", "breadth-first", "shortest path"]) or \
       lc in [102, 107, 103, 111, 200, 994, 127, 752, 1091, 542, 207]:
        topics.add("Breadth-First Search (BFS)")
        topics.add("Queues and Deques")

    # Depth-First Search (DFS)
    if any(k in pattern for k in ["dfs", "depth-first", "tree traversal", "graph dfs", "postorder", "inorder", "preorder"]) or \
       any(k in desc for k in ["dfs", "depth-first", "traverse"]) or \
       "Trees" in orig or "Graphs" in orig or "Backtracking" in orig:
        topics.add("Depth-First Search (DFS)")

    # Union-Find
    if any(k in pattern for k in ["union find", "disjoint set", "connected component"]) or \
       any(k in code for k in ["find(p)", "union(p", "parent", "find(x)"]) or \
       lc in [200, 684, 685, 547, 721, 1319, 128, 778, 1584, 261, 323]:
        topics.add("Union-Find")
        topics.add("Graphs")

    # Topological Sorting
    if any(k in pattern for k in ["topological sort", "kahn", "dependency resolution"]) or \
       any(k in desc for k in ["prerequisites", "topological order", "cycle in directed", "dag"]) or \
       lc in [207, 210, 269, 802, 1857, 1136]:
        topics.add("Topological Sorting")
        topics.add("Graphs")

    # Matrix Problems
    if any(k in title for k in ["matrix", "grid", "spiral", "island", "board", "surrounded", "rotting"]) or \
       any(k in desc for k in ["2d grid", "matrix", "m x n", "grid", "rows and columns", "row and column"]) or \
       any(k in code for k in ["grid[r][c]", "matrix[r][c]", "matrix[i][j]", "len(matrix)"]) or \
       lc in [73, 54, 48, 74, 79, 200, 130, 417, 994, 1091, 62, 63, 64]:
        topics.add("Matrix Problems")
        topics.add("Arrays")

    # Math and Number Theory
    if any(k in title for k in ["math", "sum", "roman", "integer", "number", "multiply", "divide", "pow", "sqrt", "ugly", "happy"]) or \
       any(k in pattern for k in ["math", "modular", "prime", "geometry", "simulation"]) or \
       any(k in desc for k in ["prime", "modulus", "factorial", "power of", "gcd", "lcm", "mathematical"]) or \
       lc in [7, 9, 12, 13, 43, 50, 66, 69, 149, 172, 202, 204, 263, 264, 326, 342, 367, 504]:
        topics.add("Math and Number Theory")

    # Advanced Data Structures
    if any(k in pattern for k in ["segment tree", "fenwick", "binary indexed tree", "trie", "lru", "lfu", "median finder"]) or \
       lc in [146, 460, 295, 208, 211, 212, 307, 308, 355, 622, 641, 1584, 743, 778, 787]:
        topics.add("Advanced Data Structures")

    # Clean and filter to official 30
    final_topics = [t for t in ALL_30_TOPICS if t in topics]
    # Ensure every problem has at least 1 topic
    if not final_topics:
        final_topics = [orig] if orig in ALL_30_TOPICS else ["Arrays"]
    return sorted(final_topics)

topic_distribution = {t: 0 for t in ALL_30_TOPICS}
for p in problems:
    p["topics"] = assign_topics(p)
    for t in p["topics"]:
        topic_distribution[t] += 1

print("\n--- 30 TOPICS PROBLEM DISTRIBUTION ---")
for t, count in topic_distribution.items():
    print(f"  {t:30}: {count} problems")

zero_topics = [t for t, count in topic_distribution.items() if count == 0]
print(f"\nTopics with 0 problems: {zero_topics}")
assert len(zero_topics) == 0, f"Some topics have 0 problems: {zero_topics}"
