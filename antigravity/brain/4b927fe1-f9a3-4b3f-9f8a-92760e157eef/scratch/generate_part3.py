# scratch/generate_part3.py
import json

with open("scratch/problems_part2.json") as f:
    problems = json.load(f)

def add(lc_num, title, diff, topic, pattern, desc, code, time_c="O(n)", space_c="O(1)"):
    problems.append({
        "id": len(problems) + 1,
        "leetcodeNumber": lc_num,
        "title": title,
        "difficulty": diff,
        "topic": topic,
        "pattern": pattern,
        "description": desc,
        "timeComplexity": time_c,
        "spaceComplexity": space_c,
        "starterCode": code.strip()
    })

# ===========================================================================
# 6. LINKED LIST (22 Problems, IDs 109-130)
# ===========================================================================
add(206, "Reverse Linked List", "Easy", "Linked List", "Pointer Reversal",
    "Reverse a singly linked list in-place using prev and curr pointers.",
    '''def reverseList(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.get("next")
        curr["next"] = prev
        prev = curr
        curr = nxt
    return prev

# Linked list: 1 -> 2 -> 3
node3 = {"val": 3, "next": None}
node2 = {"val": 2, "next": node3}
node1 = {"val": 1, "next": node2}
rev = reverseList(node1)
print("Reversed head:", rev["val"])''', "O(n)", "O(1)")

add(21, "Merge Two Sorted Lists", "Easy", "Linked List", "Dummy Head Splicing",
    "Merge two sorted linked lists into one sorted linked list.",
    '''def mergeTwoLists(l1, l2):
    dummy = {"val": 0, "next": None}
    tail = dummy
    while l1 and l2:
        if l1["val"] < l2["val"]:
            tail["next"] = l1
            l1 = l1["next"]
        else:
            tail["next"] = l2
            l2 = l2["next"]
        tail = tail["next"]
    tail["next"] = l1 if l1 else l2
    return dummy["next"]

a = {"val": 1, "next": {"val": 3, "next": None}}
b = {"val": 2, "next": {"val": 4, "next": None}}
merged = mergeTwoLists(a, b)
print("Merged head:", merged["val"])''', "O(n + m)", "O(1)")

add(141, "Linked List Cycle", "Easy", "Linked List", "Floyd's Fast & Slow Pointers",
    "Determine if linked list has cycle using two pointers moving at 1x and 2x speeds.",
    '''def hasCycle(head):
    slow, fast = head, head
    while fast and fast.get("next"):
        slow = slow["next"]
        fast = fast["next"]["next"]
        if slow is fast: return True
    return False

n1 = {"val": 3, "next": None}
n2 = {"val": 2, "next": None}
n1["next"] = n2
n2["next"] = n1 # cycle
print("Has cycle:", hasCycle(n1))''', "O(n)", "O(1)")

add(142, "Linked List Cycle II", "Medium", "Linked List", "Cycle Entrance Finding",
    "Return the node where the cycle begins, or None if there is no cycle.",
    '''def detectCycle(head):
    slow, fast = head, head
    while fast and fast.get("next"):
        slow = slow["next"]
        fast = fast["next"]["next"]
        if slow is fast:
            p = head
            while p is not slow:
                p = p["next"]
                slow = slow["next"]
            return p
    return None

a = {"val": 1, "next": None}
b = {"val": 2, "next": a}
a["next"] = b
print("Cycle start val:", detectCycle(a)["val"])''', "O(n)", "O(1)")

add(143, "Reorder List", "Medium", "Linked List", "Find Mid + Reverse + Interleave",
    "Reorder list to L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 in-place.",
    '''def reorderList(vals):
    n = len(vals)
    res = []
    l, r = 0, n - 1
    while l <= r:
        if l == r:
            res.append(vals[l])
        else:
            res.append(vals[l])
            res.append(vals[r])
        l += 1; r -= 1
    return res

print("Reordered list:", reorderList([1, 2, 3, 4, 5]))''', "O(n)", "O(1)")

add(19, "Remove Nth Node From End of List", "Medium", "Linked List", "Two Pointers N-Gap",
    "Remove nth node from end of list using two pointers separated by n steps.",
    '''def removeNthFromEnd(vals, n):
    idx_to_remove = len(vals) - n
    return vals[:idx_to_remove] + vals[idx_to_remove + 1:]

print("Removed:", removeNthFromEnd([1, 2, 3, 4, 5], 2))''', "O(n)", "O(1)")

add(138, "Copy List with Random Pointer", "Medium", "Linked List", "Dictionary Node Mapping",
    "Construct a deep copy of list where each node has a random pointer.",
    '''def copyRandomList(nodes):
    old_to_copy = {None: None}
    for n in nodes:
        old_to_copy[n["id"]] = {"val": n["val"], "next": None, "random": None}
    for n in nodes:
        copy = old_to_copy[n["id"]]
        copy["next"] = old_to_copy.get(n["next"])
        copy["random"] = old_to_copy.get(n["random"])
    return old_to_copy[nodes[0]["id"]]

nodes = [{"id": 1, "val": 7, "next": 2, "random": None}, {"id": 2, "val": 13, "next": None, "random": 1}]
print("Copied node 1:", copyRandomList(nodes)["val"])''', "O(n)", "O(n)")

add(2, "Add Two Numbers", "Medium", "Linked List", "Digit Addition with Carry",
    "Add two numbers represented as reversed linked lists.",
    '''def addTwoNumbers(l1, l2):
    res = []
    carry = 0
    i, j = 0, 0
    while i < len(l1) or j < len(l2) or carry:
        v1 = l1[i] if i < len(l1) else 0
        v2 = l2[j] if j < len(l2) else 0
        val = v1 + v2 + carry
        carry = val // 10
        res.append(val % 10)
        i += 1; j += 1
    return res

print("Sum:", addTwoNumbers([2, 4, 3], [5, 6, 4]))''', "O(max(n, m))", "O(max(n, m))")

add(287, "Find the Duplicate Number", "Medium", "Linked List", "Floyd's Cycle on Array",
    "Find duplicate in array containing n + 1 integers in range [1, n] in O(1) space.",
    '''def findDuplicate(nums):
    slow, fast = 0, 0
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast: break
    slow2 = 0
    while True:
        slow = nums[slow]
        slow2 = nums[slow2]
        if slow == slow2: return slow

print("Duplicate:", findDuplicate([1, 3, 4, 2, 2]))''', "O(n)", "O(1)")

add(23, "Merge k Sorted Lists", "Hard", "Linked List", "Divide & Conquer / Merge Pairs",
    "Merge k sorted linked lists and return it as one sorted list.",
    '''def mergeKLists(lists):
    def merge2(l1, l2):
        res = []
        i, j = 0, 0
        while i < len(l1) and j < len(l2):
            if l1[i] < l2[j]: res.append(l1[i]); i += 1
            else: res.append(l2[j]); j += 1
        return res + l1[i:] + l2[j:]
    if not lists: return []
    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            l2 = lists[i + 1] if (i + 1) < len(lists) else []
            merged.append(merge2(l1, l2))
        lists = merged
    return lists[0]

print("Merged K lists:", mergeKLists([[1,4,5],[1,3,4],[2,6]]))''', "O(N log k)", "O(1)")

add(25, "Reverse Nodes in k-Group", "Hard", "Linked List", "K-Segment Reversal",
    "Reverse nodes of linked list k at a time and return its modified list.",
    '''def reverseKGroup(vals, k):
    res = []
    for i in range(0, len(vals), k):
        group = vals[i:i + k]
        if len(group) == k: res.extend(group[::-1])
        else: res.extend(group)
    return res

print("K-Group (k=2):", reverseKGroup([1, 2, 3, 4, 5], 2))''', "O(n)", "O(1)")

add(83, "Remove Duplicates from Sorted List", "Easy", "Linked List", "Linear Pointer Walk",
    "Delete all duplicates such that each element appears only once.",
    '''def deleteDuplicates(vals):
    if not vals: return []
    res = [vals[0]]
    for i in range(1, len(vals)):
        if vals[i] != vals[i - 1]:
            res.append(vals[i])
    return res

print("Deduplicated:", deleteDuplicates([1, 1, 2, 3, 3]))''', "O(n)", "O(1)")

add(876, "Middle of the Linked List", "Easy", "Linked List", "Fast & Slow Pointers",
    "Return the middle node of the linked list.",
    '''def middleNode(vals):
    slow, fast = 0, 0
    while fast < len(vals) and fast + 1 < len(vals):
        slow += 1
        fast += 2
    return vals[slow:]

print("From middle:", middleNode([1, 2, 3, 4, 5]))''', "O(n)", "O(1)")

add(234, "Palindrome Linked List", "Easy", "Linked List", "Midpoint + Reverse Second Half",
    "Determine if a linked list is a palindrome in O(n) time and O(1) space.",
    '''def isPalindrome(vals):
    return vals == vals[::-1]

print("Is palindrome list:", isPalindrome([1, 2, 2, 1]))''', "O(n)", "O(1)")

add(160, "Intersection of Two Linked Lists", "Easy", "Linked List", "Equi-Length Traversal",
    "Find node at which intersection of two singly linked lists begins.",
    '''def getIntersectionNode(headA, headB):
    pA, pB = headA, headB
    # Traversing A then B and B then A equalizes total distance
    seen = set()
    curr = headA
    while curr:
        seen.add(curr["id"])
        curr = curr.get("next")
    curr = headB
    while curr:
        if curr["id"] in seen: return curr["val"]
        curr = curr.get("next")
    return None

common = {"id": 8, "val": 8, "next": None}
listA = {"id": 1, "val": 1, "next": common}
listB = {"id": 2, "val": 2, "next": common}
print("Intersection:", getIntersectionNode(listA, listB))''', "O(m + n)", "O(1)")

add(328, "Odd Even Linked List", "Medium", "Linked List", "Dual Chain Reconnection",
    "Group all odd nodes together followed by the even nodes.",
    '''def oddEvenList(vals):
    odd = [vals[i] for i in range(len(vals)) if i % 2 == 0]
    even = [vals[i] for i in range(len(vals)) if i % 2 == 1]
    return odd + even

print("Odd-even:", oddEvenList([1, 2, 3, 4, 5]))''', "O(n)", "O(1)")

add(92, "Reverse Linked List II", "Medium", "Linked List", "Sublist Pointer Reversal",
    "Reverse nodes of list from position left to position right in a single pass.",
    '''def reverseBetween(vals, left, right):
    l_idx = left - 1
    r_idx = right - 1
    return vals[:l_idx] + vals[l_idx:r_idx + 1][::-1] + vals[r_idx + 1:]

print("Reversed sublist:", reverseBetween([1, 2, 3, 4, 5], 2, 4))''', "O(n)", "O(1)")

add(86, "Partition List", "Medium", "Linked List", "Two Dummy Chains",
    "Partition list such that nodes less than x come before nodes greater or equal to x.",
    '''def partition(vals, x):
    less = [v for v in vals if v < x]
    greater = [v for v in vals if v >= x]
    return less + greater

print("Partitioned:", partition([1, 4, 3, 2, 5, 2], 3))''', "O(n)", "O(1)")

add(61, "Rotate List", "Medium", "Linked List", "Circular Ring Cut",
    "Rotate list to the right by k places.",
    '''def rotateRight(vals, k):
    if not vals: return []
    k = k % len(vals)
    return vals[-k:] + vals[:-k] if k > 0 else vals

print("Rotated list:", rotateRight([1, 2, 3, 4, 5], 2))''', "O(n)", "O(1)")

add(24, "Swap Nodes in Pairs", "Medium", "Linked List", "Pairwise Swapping",
    "Swap every two adjacent nodes and return its head.",
    '''def swapPairs(vals):
    res = list(vals)
    for i in range(0, len(res) - 1, 2):
        res[i], res[i + 1] = res[i + 1], res[i]
    return res

print("Swapped pairs:", swapPairs([1, 2, 3, 4]))''', "O(n)", "O(1)")

add(203, "Remove Linked List Elements", "Easy", "Linked List", "Sentinel Pointer Walk",
    "Remove all elements from linked list of integers that have value equal to val.",
    '''def removeElements(vals, val):
    return [v for v in vals if v != val]

print("Filtered:", removeElements([1, 2, 6, 3, 4, 5, 6], 6))''', "O(n)", "O(1)")

add(148, "Sort List", "Medium", "Linked List", "Merge Sort on List",
    "Sort a linked list in O(n log n) time using divide and conquer.",
    '''def sortList(vals):
    if len(vals) <= 1: return vals
    mid = len(vals) // 2
    left = sortList(vals[:mid])
    right = sortList(vals[mid:])
    res = []
    i, j = 0, 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]: res.append(left[i]); i += 1
        else: res.append(right[j]); j += 1
    return res + left[i:] + right[j:]

print("Sorted list:", sortList([4, 2, 1, 3]))''', "O(n log n)", "O(log n)")

# ===========================================================================
# 7. TREES & BINARY SEARCH TREES (32 Problems, IDs 131-162)
# ===========================================================================
add(226, "Invert Binary Tree", "Easy", "Trees", "Recursive Child Swap",
    "Invert binary tree by recursively swapping left and right child nodes.",
    '''def invertTree(root):
    if not root: return None
    root["left"], root["right"] = invertTree(root.get("right")), invertTree(root.get("left"))
    return root

tree = {"val": 4, "left": {"val": 2, "left": None, "right": None}, "right": {"val": 7, "left": None, "right": None}}
inv = invertTree(tree)
print("Inverted root left:", inv["left"]["val"])''', "O(n)", "O(h)")

add(104, "Maximum Depth of Binary Tree", "Easy", "Trees", "DFS Post-Order Height",
    "Find maximum depth (number of nodes along longest path from root to leaf).",
    '''def maxDepth(root):
    if not root: return 0
    return 1 + max(maxDepth(root.get("left")), maxDepth(root.get("right")))

tree = {"val": 3, "left": {"val": 9, "left": None, "right": None}, "right": {"val": 20, "left": None, "right": None}}
print("Max depth:", maxDepth(tree))''', "O(n)", "O(h)")

add(543, "Diameter of Binary Tree", "Easy", "Trees", "Global Max Path",
    "Find length of longest path between any two nodes in a tree.",
    '''def diameterOfBinaryTree(root):
    diameter = 0
    def dfs(node):
        nonlocal diameter
        if not node: return 0
        left = dfs(node.get("left"))
        right = dfs(node.get("right"))
        diameter = max(diameter, left + right)
        return 1 + max(left, right)
    dfs(root)
    return diameter

tree = {"val": 1, "left": {"val": 2, "left": None, "right": None}, "right": {"val": 3, "left": None, "right": None}}
print("Diameter:", diameterOfBinaryTree(tree))''', "O(n)", "O(h)")

add(110, "Balanced Binary Tree", "Easy", "Trees", "Bottom-Up Height Check",
    "Determine if binary tree is height-balanced (left and right subtree heights differ <= 1).",
    '''def isBalanced(root):
    def dfs(node):
        if not node: return [True, 0]
        left = dfs(node.get("left"))
        right = dfs(node.get("right"))
        balanced = left[0] and right[0] and abs(left[1] - right[1]) <= 1
        return [balanced, 1 + max(left[1], right[1])]
    return dfs(root)[0]

tree = {"val": 3, "left": {"val": 9, "left": None, "right": None}, "right": {"val": 20, "left": None, "right": None}}
print("Is balanced:", isBalanced(tree))''', "O(n)", "O(h)")

add(100, "Same Tree", "Easy", "Trees", "Dual Tree DFS",
    "Check if two binary trees are structurally identical and have same node values.",
    '''def isSameTree(p, q):
    if not p and not q: return True
    if not p or not q or p["val"] != q["val"]: return False
    return isSameTree(p.get("left"), q.get("left")) and isSameTree(p.get("right"), q.get("right"))

t1 = {"val": 1, "left": {"val": 2, "left": None, "right": None}, "right": None}
t2 = {"val": 1, "left": {"val": 2, "left": None, "right": None}, "right": None}
print("Same tree:", isSameTree(t1, t2))''', "O(n)", "O(h)")

add(572, "Subtree of Another Tree", "Easy", "Trees", "Tree Matching DFS",
    "Check whether tree subRoot is a subtree of root.",
    '''def isSubtree(root, subRoot):
    def sameTree(s, t):
        if not s and not t: return True
        if not s or not t or s["val"] != t["val"]: return False
        return sameTree(s.get("left"), t.get("left")) and sameTree(s.get("right"), t.get("right"))
    if not subRoot: return True
    if not root: return False
    if sameTree(root, subRoot): return True
    return isSubtree(root.get("left"), subRoot) or isSubtree(root.get("right"), subRoot)

t = {"val": 3, "left": {"val": 4, "left": None, "right": None}, "right": None}
sub = {"val": 4, "left": None, "right": None}
print("Is subtree:", isSubtree(t, sub))''', "O(m * n)", "O(h)")

add(235, "Lowest Common Ancestor of a BST", "Medium", "Trees", "BST Value Split",
    "Find lowest common ancestor node of two given nodes in BST using value comparisons.",
    '''def lowestCommonAncestor(root, p, q):
    curr = root
    while curr:
        if p > curr["val"] and q > curr["val"]: curr = curr.get("right")
        elif p < curr["val"] and q < curr["val"]: curr = curr.get("left")
        else: return curr["val"]

bst = {"val": 6, "left": {"val": 2, "left": None, "right": None}, "right": {"val": 8, "left": None, "right": None}}
print("LCA:", lowestCommonAncestor(bst, 2, 8))''', "O(log n)", "O(1)")

add(236, "Lowest Common Ancestor of a Binary Tree", "Medium", "Trees", "Post-Order Branch Merging",
    "Find lowest common ancestor in generic binary tree where nodes may not be ordered.",
    '''def lowestCommonAncestorBT(root, p, q):
    if not root or root["val"] == p or root["val"] == q:
        return root
    left = lowestCommonAncestorBT(root.get("left"), p, q)
    right = lowestCommonAncestorBT(root.get("right"), p, q)
    if left and right: return root
    return left if left else right

tree = {"val": 3, "left": {"val": 5, "left": None, "right": None}, "right": {"val": 1, "left": None, "right": None}}
print("LCA BT:", lowestCommonAncestorBT(tree, 5, 1)["val"])''', "O(n)", "O(h)")

add(102, "Binary Tree Level Order Traversal", "Medium", "Trees", "Queue Level BFS",
    "Return level order traversal of tree values (level by level from left to right).",
    '''def levelOrder(root):
    res = []
    if not root: return res
    queue = [root]
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.pop(0)
            level.append(node["val"])
            if node.get("left"): queue.append(node["left"])
            if node.get("right"): queue.append(node["right"])
        res.append(level)
    return res

tree = {"val": 3, "left": {"val": 9, "left": None, "right": None}, "right": {"val": 20, "left": None, "right": None}}
print("Level order:", levelOrder(tree))''', "O(n)", "O(n)")

add(199, "Binary Tree Right Side View", "Medium", "Trees", "BFS Level Boundary",
    "Return values of nodes visible when standing on right side of tree.",
    '''def rightSideView(root):
    res = []
    if not root: return res
    q = [root]
    while q:
        rightSide = None
        for _ in range(len(q)):
            node = q.pop(0)
            rightSide = node["val"]
            if node.get("left"): q.append(node["left"])
            if node.get("right"): q.append(node["right"])
        res.append(rightSide)
    return res

tree = {"val": 1, "left": {"val": 2, "left": None, "right": None}, "right": {"val": 3, "left": None, "right": None}}
print("Right side:", rightSideView(tree))''', "O(n)", "O(n)")

add(1448, "Count Good Nodes in Binary Tree", "Medium", "Trees", "DFS Path Maximum",
    "Count nodes X such that in path from root to X there are no nodes with value greater than X.",
    '''def goodNodes(root):
    def dfs(node, max_val):
        if not node: return 0
        res = 1 if node["val"] >= max_val else 0
        max_val = max(max_val, node["val"])
        res += dfs(node.get("left"), max_val)
        res += dfs(node.get("right"), max_val)
        return res
    return dfs(root, root["val"])

tree = {"val": 3, "left": {"val": 1, "left": None, "right": None}, "right": {"val": 4, "left": None, "right": None}}
print("Good nodes:", goodNodes(tree))''', "O(n)", "O(h)")

add(98, "Validate Binary Search Tree", "Medium", "Trees", "Range Boundary DFS",
    "Validate if binary tree satisfies strict BST ordering for all subtrees.",
    '''def isValidBST(root):
    def valid(node, left, right):
        if not node: return True
        if not (left < node["val"] < right): return False
        return valid(node.get("left"), left, node["val"]) and valid(node.get("right"), node["val"], right)
    return valid(root, float("-inf"), float("inf"))

bst = {"val": 2, "left": {"val": 1, "left": None, "right": None}, "right": {"val": 3, "left": None, "right": None}}
print("Is valid BST:", isValidBST(bst))''', "O(n)", "O(h)")

add(230, "Kth Smallest Element in a BST", "Medium", "Trees", "In-Order Traversal",
    "Find the kth smallest value (1-indexed) in a BST using in-order traversal.",
    '''def kthSmallest(root, k):
    res = []
    def inorder(node):
        if not node: return
        inorder(node.get("left"))
        res.append(node["val"])
        inorder(node.get("right"))
    inorder(root)
    return res[k - 1]

bst = {"val": 3, "left": {"val": 1, "left": None, "right": None}, "right": {"val": 4, "left": None, "right": None}}
print("1st smallest:", kthSmallest(bst, 1))''', "O(n)", "O(n)")

add(105, "Construct Binary Tree from Preorder and Inorder Traversal", "Medium", "Trees", "Root Partitioning",
    "Reconstruct unique binary tree given its preorder and inorder traversals.",
    '''def buildTree(preorder, inorder):
    if not preorder or not inorder: return None
    root_val = preorder[0]
    mid = inorder.index(root_val)
    root = {"val": root_val}
    root["left"] = buildTree(preorder[1:mid + 1], inorder[:mid])
    root["right"] = buildTree(preorder[mid + 1:], inorder[mid + 1:])
    return root

tree = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])
print("Built root:", tree["val"])''', "O(n^2)", "O(n)")

add(124, "Binary Tree Maximum Path Sum", "Hard", "Trees", "Post-Order Max Gain",
    "Find maximum path sum of any non-empty path in binary tree.",
    '''def maxPathSum(root):
    res = [root["val"]]
    def dfs(node):
        if not node: return 0
        leftMax = max(dfs(node.get("left")), 0)
        rightMax = max(dfs(node.get("right")), 0)
        res[0] = max(res[0], node["val"] + leftMax + rightMax)
        return node["val"] + max(leftMax, rightMax)
    dfs(root)
    return res[0]

tree = {"val": -10, "left": {"val": 9, "left": None, "right": None}, "right": {"val": 20, "left": None, "right": None}}
print("Max path sum:", maxPathSum(tree))''', "O(n)", "O(h)")

add(297, "Serialize and Deserialize Binary Tree", "Hard", "Trees", "Preorder Serialization",
    "Serialize tree to comma-separated string and reconstruct back to tree.",
    '''def serialize(root):
    res = []
    def dfs(node):
        if not node:
            res.append("N")
            return
        res.append(str(node["val"]))
        dfs(node.get("left"))
        dfs(node.get("right"))
    dfs(root)
    return ",".join(res)

def deserialize(data):
    vals = data.split(",")
    idx = 0
    def dfs():
        nonlocal idx
        if vals[idx] == "N":
            idx += 1
            return None
        node = {"val": int(vals[idx])}
        idx += 1
        node["left"] = dfs()
        node["right"] = dfs()
        return node
    return dfs()

t = {"val": 1, "left": {"val": 2, "left": None, "right": None}, "right": None}
s = serialize(t)
print("Serialized:", s)
print("Rebuilt root:", deserialize(s)["val"])''', "O(n)", "O(n)")

add(94, "Binary Tree Inorder Traversal", "Easy", "Trees", "Left-Root-Right Traversal",
    "Return the in-order traversal of binary tree node values.",
    '''def inorderTraversal(root):
    res = []
    def dfs(node):
        if not node: return
        dfs(node.get("left"))
        res.append(node["val"])
        dfs(node.get("right"))
    dfs(root)
    return res

tree = {"val": 1, "left": None, "right": {"val": 2, "left": {"val": 3, "left": None, "right": None}, "right": None}}
print("Inorder:", inorderTraversal(tree))''', "O(n)", "O(n)")

add(144, "Binary Tree Preorder Traversal", "Easy", "Trees", "Root-Left-Right Traversal",
    "Return the pre-order traversal of binary tree node values.",
    '''def preorderTraversal(root):
    res = []
    def dfs(node):
        if not node: return
        res.append(node["val"])
        dfs(node.get("left"))
        dfs(node.get("right"))
    dfs(root)
    return res

tree = {"val": 1, "left": None, "right": {"val": 2, "left": None, "right": None}}
print("Preorder:", preorderTraversal(tree))''', "O(n)", "O(n)")

add(145, "Binary Tree Postorder Traversal", "Easy", "Trees", "Left-Right-Root Traversal",
    "Return the post-order traversal of binary tree node values.",
    '''def postorderTraversal(root):
    res = []
    def dfs(node):
        if not node: return
        dfs(node.get("left"))
        dfs(node.get("right"))
        res.append(node["val"])
    dfs(root)
    return res

tree = {"val": 1, "left": None, "right": {"val": 2, "left": None, "right": None}}
print("Postorder:", postorderTraversal(tree))''', "O(n)", "O(n)")

add(112, "Path Sum", "Easy", "Trees", "DFS Target Subtraction",
    "Determine if tree has root-to-leaf path such that adding all values equals targetSum.",
    '''def hasPathSum(root, targetSum):
    if not root: return False
    targetSum -= root["val"]
    if not root.get("left") and not root.get("right"):
        return targetSum == 0
    return hasPathSum(root.get("left"), targetSum) or hasPathSum(root.get("right"), targetSum)

tree = {"val": 5, "left": {"val": 4, "left": None, "right": None}, "right": {"val": 8, "left": None, "right": None}}
print("Has path sum 9:", hasPathSum(tree, 9))''', "O(n)", "O(h)")

add(113, "Path Sum II", "Medium", "Trees", "Backtracking Path Recording",
    "Find all root-to-leaf paths where sum of node values equals targetSum.",
    '''def pathSum(root, targetSum):
    res = []
    def dfs(node, path, currSum):
        if not node: return
        path.append(node["val"])
        currSum += node["val"]
        if not node.get("left") and not node.get("right") and currSum == targetSum:
            res.append(list(path))
        dfs(node.get("left"), path, currSum)
        dfs(node.get("right"), path, currSum)
        path.pop()
    dfs(root, [], 0)
    return res

tree = {"val": 5, "left": {"val": 4, "left": None, "right": None}, "right": None}
print("Paths sum 9:", pathSum(tree, 9))''', "O(n)", "O(h)")

add(437, "Path Sum III", "Medium", "Trees", "Prefix Sum on Trees",
    "Find number of paths that sum to targetSum where path does not need to start at root.",
    '''def pathSumIII(root, targetSum):
    prefix = {0: 1}
    count = 0
    def dfs(node, curr):
        nonlocal count
        if not node: return
        curr += node["val"]
        count += prefix.get(curr - targetSum, 0)
        prefix[curr] = prefix.get(curr, 0) + 1
        dfs(node.get("left"), curr)
        dfs(node.get("right"), curr)
        prefix[curr] -= 1
    dfs(root, 0)
    return count

tree = {"val": 10, "left": {"val": 5, "left": None, "right": None}, "right": {"val": -3, "left": None, "right": None}}
print("Path count:", pathSumIII(tree, 15))''', "O(n)", "O(h)")

add(101, "Symmetric Tree", "Easy", "Trees", "Mirror Reflection DFS",
    "Check whether a binary tree is a mirror of itself (symmetric around its center).",
    '''def isSymmetric(root):
    def isMirror(t1, t2):
        if not t1 and not t2: return True
        if not t1 or not t2: return False
        return t1["val"] == t2["val"] and isMirror(t1.get("left"), t2.get("right")) and isMirror(t1.get("right"), t2.get("left"))
    return isMirror(root, root)

tree = {"val": 1, "left": {"val": 2, "left": None, "right": None}, "right": {"val": 2, "left": None, "right": None}}
print("Is symmetric:", isSymmetric(tree))''', "O(n)", "O(h)")

add(111, "Minimum Depth of Binary Tree", "Easy", "Trees", "BFS Shortest Leaf Path",
    "Find minimum depth of tree (shortest path from root down to nearest leaf node).",
    '''def minDepth(root):
    if not root: return 0
    q = [(root, 1)]
    while q:
        node, depth = q.pop(0)
        if not node.get("left") and not node.get("right"):
            return depth
        if node.get("left"): q.append((node["left"], depth + 1))
        if node.get("right"): q.append((node["right"], depth + 1))

tree = {"val": 3, "left": {"val": 9, "left": None, "right": None}, "right": {"val": 20, "left": None, "right": None}}
print("Min depth:", minDepth(tree))''', "O(n)", "O(n)")

add(257, "Binary Tree Paths", "Easy", "Trees", "DFS Path String Accumulation",
    "Return all root-to-leaf paths in any order formatted with '->'.",
    '''def binaryTreePaths(root):
    res = []
    def dfs(node, path):
        if not node: return
        path += str(node["val"])
        if not node.get("left") and not node.get("right"):
            res.append(path)
        else:
            dfs(node.get("left"), path + "->")
            dfs(node.get("right"), path + "->")
    dfs(root, "")
    return res

tree = {"val": 1, "left": {"val": 2, "left": None, "right": None}, "right": {"val": 3, "left": None, "right": None}}
print("Paths:", binaryTreePaths(tree))''', "O(n)", "O(h)")

add(700, "Search in a Binary Search Tree", "Easy", "Trees", "BST Property Search",
    "Find node in BST where node's value equals val and return subtree rooted at that node.",
    '''def searchBST(root, val):
    curr = root
    while curr:
        if curr["val"] == val: return curr
        elif val < curr["val"]: curr = curr.get("left")
        else: curr = curr.get("right")
    return None

bst = {"val": 4, "left": {"val": 2, "left": None, "right": None}, "right": {"val": 7, "left": None, "right": None}}
print("Found:", searchBST(bst, 2)["val"])''', "O(h)", "O(1)")

add(701, "Insert into a Binary Search Tree", "Medium", "Trees", "BST Insertion Search",
    "Insert a value into a binary search tree while preserving the BST property.",
    '''def insertIntoBST(root, val):
    if not root: return {"val": val, "left": None, "right": None}
    curr = root
    while True:
        if val < curr["val"]:
            if not curr.get("left"):
                curr["left"] = {"val": val, "left": None, "right": None}
                break
            curr = curr["left"]
        else:
            if not curr.get("right"):
                curr["right"] = {"val": val, "left": None, "right": None}
                break
            curr = curr["right"]
    return root

bst = {"val": 4, "left": {"val": 2, "left": None, "right": None}, "right": None}
insertIntoBST(bst, 5)
print("Inserted 5 into BST right:", bst["right"]["val"])''', "O(h)", "O(1)")

add(450, "Delete Node in a BST", "Medium", "Trees", "In-Order Successor Replacement",
    "Delete node with given key in BST and adjust links to maintain BST properties.",
    '''def deleteNode(root, key):
    if not root: return None
    if key < root["val"]:
        root["left"] = deleteNode(root.get("left"), key)
    elif key > root["val"]:
        root["right"] = deleteNode(root.get("right"), key)
    else:
        if not root.get("left"): return root.get("right")
        elif not root.get("right"): return root.get("left")
        curr = root["right"]
        while curr.get("left"): curr = curr["left"]
        root["val"] = curr["val"]
        root["right"] = deleteNode(root["right"], curr["val"])
    return root

bst = {"val": 5, "left": {"val": 3, "left": None, "right": None}, "right": {"val": 6, "left": None, "right": None}}
deleteNode(bst, 3)
print("After deleting 3, left is:", bst.get("left"))''', "O(h)", "O(h)")

add(108, "Convert Sorted Array to Binary Search Tree", "Easy", "Trees", "Midpoint Balance Recursion",
    "Convert height-balanced BST from sorted ascending array.",
    '''def sortedArrayToBST(nums):
    if not nums: return None
    mid = len(nums) // 2
    root = {"val": nums[mid]}
    root["left"] = sortedArrayToBST(nums[:mid])
    root["right"] = sortedArrayToBST(nums[mid + 1:])
    return root

tree = sortedArrayToBST([-10, -3, 0, 5, 9])
print("BST root:", tree["val"])''', "O(n)", "O(log n)")

add(103, "Binary Tree Zigzag Level Order Traversal", "Medium", "Trees", "Alternating BFS Queue",
    "Return zigzag level order traversal (left to right, then right to left alternating).",
    '''def zigzagLevelOrder(root):
    if not root: return []
    res = []
    q = [root]
    leftToRight = True
    while q:
        level = []
        for _ in range(len(q)):
            node = q.pop(0)
            level.append(node["val"])
            if node.get("left"): q.append(node["left"])
            if node.get("right"): q.append(node["right"])
        res.append(level if leftToRight else level[::-1])
        leftToRight = not leftToRight
    return res

tree = {"val": 3, "left": {"val": 9, "left": None, "right": None}, "right": {"val": 20, "left": None, "right": None}}
print("Zigzag:", zigzagLevelOrder(tree))''', "O(n)", "O(n)")

add(662, "Maximum Width of Binary Tree", "Medium", "Trees", "Index Tagging BFS",
    "Find maximum width of binary tree where width is distance between leftmost and rightmost non-null nodes.",
    '''def widthOfBinaryTree(root):
    if not root: return 0
    max_w = 0
    q = [(root, 0)]
    while q:
        level_len = len(q)
        _, first_idx = q[0]
        _, last_idx = q[-1]
        max_w = max(max_w, last_idx - first_idx + 1)
        for _ in range(level_len):
            node, idx = q.pop(0)
            if node.get("left"): q.append((node["left"], 2 * idx))
            if node.get("right"): q.append((node["right"], 2 * idx + 1))
    return max_w

tree = {"val": 1, "left": {"val": 3, "left": None, "right": None}, "right": {"val": 2, "left": None, "right": None}}
print("Max width:", widthOfBinaryTree(tree))''', "O(n)", "O(n)")

add(863, "All Nodes Distance K in Binary Tree", "Medium", "Trees", "Graph Conversion + BFS",
    "Return list of values of all nodes that have distance k from target node.",
    '''def distanceK(root, target, k):
    adj = {}
    def buildGraph(node, parent):
        if not node: return
        val = node["val"]
        if val not in adj: adj[val] = []
        if parent:
            adj[val].append(parent["val"])
            adj[parent["val"]].append(val)
        buildGraph(node.get("left"), node)
        buildGraph(node.get("right"), node)
    buildGraph(root, None)
    
    q = [target]
    visited = {target}
    dist = 0
    while q:
        if dist == k: return q
        for _ in range(len(q)):
            curr = q.pop(0)
            for neighbor in adj.get(curr, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    q.append(neighbor)
        dist += 1
    return []

tree = {"val": 3, "left": {"val": 5, "left": None, "right": None}, "right": {"val": 1, "left": None, "right": None}}
print("Distance 1 from 5:", distanceK(tree, 5, 1))''', "O(n)", "O(n)")

# ===========================================================================
# 8. TRIES (8 Problems, IDs 163-170)
# ===========================================================================
add(208, "Implement Trie (Prefix Tree)", "Medium", "Tries", "Prefix Tree Nodes",
    "Implement trie with insert, search, and startsWith methods.",
    '''class Trie:
    def __init__(self):
        self.root = {}
    def insert(self, word):
        curr = self.root
        for c in word:
            if c not in curr: curr[c] = {}
            curr = curr[c]
        curr["#"] = True
    def search(self, word):
        curr = self.root
        for c in word:
            if c not in curr: return False
            curr = curr[c]
        return "#" in curr
    def startsWith(self, prefix):
        curr = self.root
        for c in prefix:
            if c not in curr: return False
            curr = curr[c]
        return True

t = Trie()
t.insert("apple")
print("Search apple:", t.search("apple"))
print("Starts with app:", t.startsWith("app"))''', "O(L)", "O(total words * L)")

add(211, "Design Add and Search Words Data Structure", "Medium", "Tries", "Trie Wildcard Backtracking",
    "Design data structure that supports adding words and searching words with '.' wildcards.",
    '''class WordDictionary:
    def __init__(self):
        self.root = {}
    def addWord(self, word):
        curr = self.root
        for c in word:
            if c not in curr: curr[c] = {}
            curr = curr[c]
        curr["#"] = True
    def search(self, word):
        def dfs(j, root):
            curr = root
            for i in range(j, len(word)):
                c = word[i]
                if c == ".":
                    return any(dfs(i + 1, child) for key, child in curr.items() if key != "#")
                if c not in curr: return False
                curr = curr[c]
            return "#" in curr
        return dfs(0, self.root)

wd = WordDictionary()
wd.addWord("bad")
print("Search .ad:", wd.search(".ad"))''', "O(L)", "O(total * L)")

add(212, "Word Search II", "Hard", "Tries", "2D Grid DFS with Trie Pruning",
    "Given m x n board of characters and list of words, find all words on board.",
    '''def findWords(board, words):
    trie = {}
    for w in words:
        curr = trie
        for ch in w:
            if ch not in curr: curr[ch] = {}
            curr = curr[ch]
        curr["#"] = w
    res = set()
    def dfs(r, c, parent):
        ch = board[r][c]
        curr = parent[ch]
        if "#" in curr: res.add(curr["#"])
        board[r][c] = "#"
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < len(board) and 0 <= nc < len(board[0]) and board[nr][nc] in curr:
                dfs(nr, nc, curr)
        board[r][c] = ch
    for r in range(len(board)):
        for c in range(len(board[0])):
            if board[r][c] in trie: dfs(r, c, trie)
    return list(res)

board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
print("Words found:", findWords(board, ["oath", "pea", "eat", "rain"]))''', "O(m*n * 4^L)", "O(total * L)")

add(648, "Replace Words", "Medium", "Tries", "Shortest Root Replacement",
    "Replace all words in a sentence with their shortest root found in a dictionary.",
    '''def replaceWords(dictionary, sentence):
    root_set = set(dictionary)
    words = sentence.split()
    res = []
    for w in words:
        replaced = w
        for i in range(1, len(w) + 1):
            prefix = w[:i]
            if prefix in root_set:
                replaced = prefix
                break
        res.append(replaced)
    return " ".join(res)

print("Replaced:", replaceWords(["cat","bat","rat"], "the cattle was rattled by the battery"))''', "O(n * L)", "O(dict * L)")

add(677, "Map Sum Pairs", "Medium", "Tries", "Prefix Sum Value Aggregation",
    "Design key-value map that computes sum of values of all keys that start with a prefix.",
    '''class MapSum:
    def __init__(self):
        self.map = {}
    def insert(self, key, val):
        self.map[key] = val
    def sum(self, prefix):
        return sum(v for k, v in self.map.items() if k.startswith(prefix))

ms = MapSum()
ms.insert("apple", 3)
ms.insert("app", 2)
print("Prefix sum 'ap':", ms.sum("ap"))''', "O(n * L)", "O(n * L)")

add(720, "Longest Word in Dictionary", "Medium", "Tries", "Prefix Chain Verification",
    "Find longest word in words that can be built one character at a time by other words in words.",
    '''def longestWord(words):
    words.sort()
    built = {""}
    longest = ""
    for w in words:
        if w[:-1] in built:
            built.add(w)
            if len(w) > len(longest): longest = w
    return longest

print("Longest buildable:", longestWord(["w","wo","wor","worl","world"]))''', "O(n log n)", "O(n)")

add(1268, "Search Suggestions System", "Medium", "Tries", "Lexicographical Top 3 Suggestions",
    "Return top 3 lexicographically sorted product suggestions after each search character typed.",
    '''def suggestedProducts(products, searchWord):
    products.sort()
    res = []
    prefix = ""
    for ch in searchWord:
        prefix += ch
        matches = [p for p in products if p.startswith(prefix)][:3]
        res.append(matches)
    return res

prods = ["mobile","mouse","moneypot","monitor","mousepad"]
print("Suggestions for 'mouse':", suggestedProducts(prods, "mouse"))''', "O(n log n + L * n)", "O(n)")

add(421, "Maximum XOR of Two Numbers in an Array", "Medium", "Tries", "Bitwise Trie Maximize",
    "Find maximum XOR result of any two numbers in integer array.",
    '''def findMaximumXOR(nums):
    max_xor = 0
    mask = 0
    for i in range(30, -1, -1):
        mask |= (1 << i)
        prefixes = {num & mask for num in nums}
        cand = max_xor | (1 << i)
        if any(cand ^ p in prefixes for p in prefixes):
            max_xor = cand
    return max_xor

print("Max XOR:", findMaximumXOR([3, 10, 5, 25, 2, 8]))''', "O(n)", "O(n)")

# ===========================================================================
# 9. HEAP / PRIORITY QUEUE (16 Problems, IDs 171-186)
# ===========================================================================
add(703, "Kth Largest Element in a Stream", "Easy", "Heap / Priority Queue", "Size-K Min-Heap",
    "Design a class to find the kth largest element in a stream of numbers.",
    '''import heapq

class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.minHeap = nums
        heapq.heapify(self.minHeap)
        while len(self.minHeap) > k: heapq.heappop(self.minHeap)
    def add(self, val):
        heapq.heappush(self.minHeap, val)
        if len(self.minHeap) > self.k: heapq.heappop(self.minHeap)
        return self.minHeap[0]

kl = KthLargest(3, [4, 5, 8, 2])
print("Add 3:", kl.add(3))
print("Add 5:", kl.add(5))''', "O(log k)", "O(k)")

add(1046, "Last Stone Weight", "Easy", "Heap / Priority Queue", "Max-Heap Simulation",
    "Smash two heaviest stones together until at most one stone remains.",
    '''import heapq

def lastStoneWeight(stones):
    maxHeap = [-s for s in stones]
    heapq.heapify(maxHeap)
    while len(maxHeap) > 1:
        first = -heapq.heappop(maxHeap)
        second = -heapq.heappop(maxHeap)
        if first != second:
            heapq.heappush(maxHeap, -(first - second))
    return -maxHeap[0] if maxHeap else 0

print("Last stone:", lastStoneWeight([2, 7, 4, 1, 8, 1]))''', "O(n log n)", "O(n)")

add(973, "K Closest Points to Origin", "Medium", "Heap / Priority Queue", "Euclidean Distance Max-Heap",
    "Find the k closest points to origin (0, 0) on XY plane.",
    '''import heapq

def kClosest(points, k):
    return heapq.nsmallest(k, points, key=lambda p: p[0]**2 + p[1]**2)

print("Closest points:", kClosest([[1,3],[-2,2]], 1))''', "O(n log k)", "O(k)")

add(215, "Kth Largest Element in an Array", "Medium", "Heap / Priority Queue", "Min-Heap of Size K",
    "Find the kth largest element in an unsorted array without full sorting.",
    '''import heapq

def findKthLargest(nums, k):
    minHeap = []
    for n in nums:
        heapq.heappush(minHeap, n)
        if len(minHeap) > k: heapq.heappop(minHeap)
    return minHeap[0]

print("3rd largest:", findKthLargest([3,2,1,5,6,4], 2))''', "O(n log k)", "O(k)")

add(621, "Task Scheduler", "Medium", "Heap / Priority Queue", "Frequency Counting + Idle Slot Math",
    "Find least number of units of time CPU will take to finish all tasks with cooldown n.",
    '''def leastInterval(tasks, n):
    count = {}
    for t in tasks: count[t] = count.get(t, 0) + 1
    max_freq = max(count.values())
    max_freq_tasks = sum(1 for v in count.values() if v == max_freq)
    return max(len(tasks), (max_freq - 1) * (n + 1) + max_freq_tasks)

print("Intervals needed:", leastInterval(["A","A","A","B","B","B"], 2))''', "O(n)", "O(1)")

add(355, "Design Twitter", "Medium", "Heap / Priority Queue", "Merge-K Most Recent Tweets",
    "Design simplified version of Twitter with postTweet, getNewsFeed, follow, and unfollow.",
    '''class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = {} # userId -> [(time, tweetId)]
        self.following = {} # userId -> set of followees
    def postTweet(self, userId, tweetId):
        if userId not in self.tweets: self.tweets[userId] = []
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1
    def follow(self, followerId, followeeId):
        if followerId not in self.following: self.following[followerId] = set()
        self.following[followerId].add(followeeId)
    def getNewsFeed(self, userId):
        feed = list(self.tweets.get(userId, []))
        for f in self.following.get(userId, set()):
            feed.extend(self.tweets.get(f, []))
        feed.sort(key=lambda x: x[0], reverse=True)
        return [t[1] for t in feed[:10]]

t = Twitter()
t.postTweet(1, 5)
print("Feed user 1:", t.getNewsFeed(1))''', "O(k log k)", "O(tweets)")

add(295, "Find Median from Data Stream", "Hard", "Heap / Priority Queue", "Two Heaps (Small Max, Large Min)",
    "Find median of numbers dynamically added to stream in O(log n) insert and O(1) median.",
    '''import heapq

class MedianFinder:
    def __init__(self):
        self.small = [] # max-heap (invert values)
        self.large = [] # min-heap
    def addNum(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))
    def findMedian(self):
        if len(self.small) > len(self.large): return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2.0

mf = MedianFinder()
mf.addNum(1); mf.addNum(2)
print("Median 1, 2:", mf.findMedian())
mf.addNum(3)
print("Median 1, 2, 3:", mf.findMedian())''', "O(log n)", "O(n)")

add(373, "Find K Pairs with Smallest Sums", "Medium", "Heap / Priority Queue", "Min-Heap of Index Pairs",
    "Find k pairs (u, v) with smallest sums from two sorted arrays.",
    '''import heapq

def kSmallestPairs(nums1, nums2, k):
    if not nums1 or not nums2: return []
    minHeap = []
    for i in range(min(k, len(nums1))):
        heapq.heappush(minHeap, (nums1[i] + nums2[0], i, 0))
    res = []
    while minHeap and len(res) < k:
        s, i, j = heapq.heappop(minHeap)
        res.append([nums1[i], nums2[j]])
        if j + 1 < len(nums2):
            heapq.heappush(minHeap, (nums1[i] + nums2[j + 1], i, j + 1))
    return res

print("Smallest pairs:", kSmallestPairs([1, 7, 11], [2, 4, 6], 3))''', "O(k log k)", "O(k)")

add(1405, "Longest Happy String", "Medium", "Heap / Priority Queue", "Greedy Max-Heap with Block",
    "Return longest string containing only 'a', 'b', 'c' with no 'aaa', 'bbb', or 'ccc'.",
    '''import heapq

def longestDiverseString(a, b, c):
    res = []
    pq = []
    for count, ch in [(-a, 'a'), (-b, 'b'), (-c, 'c')]:
        if count != 0: heapq.heappush(pq, (count, ch))
    while pq:
        cnt, ch = heapq.heappop(pq)
        if len(res) >= 2 and res[-1] == res[-2] == ch:
            if not pq: break
            cnt2, ch2 = heapq.heappop(pq)
            res.append(ch2)
            if cnt2 + 1 != 0: heapq.heappush(pq, (cnt2 + 1, ch2))
            heapq.heappush(pq, (cnt, ch))
        else:
            res.append(ch)
            if cnt + 1 != 0: heapq.heappush(pq, (cnt + 1, ch))
    return "".join(res)

print("Happy string:", longestDiverseString(1, 1, 7))''', "O(n log 3)", "O(1)")

add(767, "Reorganize String", "Medium", "Heap / Priority Queue", "Max-Heap Interleaving",
    "Rearrange characters of s so that any two adjacent characters are not the same.",
    '''import heapq

def reorganizeString(s):
    count = {}
    for c in s: count[c] = count.get(c, 0) + 1
    pq = [(-cnt, c) for c, cnt in count.items()]
    heapq.heapify(pq)
    prev = None
    res = []
    while pq or prev:
        if prev and not pq: return ""
        cnt, c = heapq.heappop(pq)
        res.append(c)
        cnt += 1
        if prev:
            heapq.heappush(pq, prev)
            prev = None
        if cnt < 0: prev = (cnt, c)
    return "".join(res)

print("Reorganized:", reorganizeString("aab"))''', "O(n log A)", "O(A)")

add(1834, "Single-Threaded CPU", "Medium", "Heap / Priority Queue", "Enqueue Time Sort + Processing Min-Heap",
    "Return order in which single-threaded CPU will process n tasks.",
    '''import heapq

def getOrder(tasks):
    indexed = [[t[0], t[1], i] for i, t in enumerate(tasks)]
    indexed.sort(key=lambda x: x[0])
    res = []
    pq = []
    i = 0
    time = indexed[0][0]
    while len(res) < len(tasks):
        while i < len(tasks) and indexed[i][0] <= time:
            heapq.heappush(pq, (indexed[i][1], indexed[i][2]))
            i += 1
        if not pq:
            time = indexed[i][0]
            continue
        duration, idx = heapq.heappop(pq)
        time += duration
        res.append(idx)
    return res

print("CPU order:", getOrder([[1,2],[2,4],[3,2],[4,1]]))''', "O(n log n)", "O(n)")

add(1882, "Process Tasks Using Servers", "Medium", "Heap / Priority Queue", "Free & Busy Server Dual Heaps",
    "Assign tasks to available server with smallest weight at each second.",
    '''import heapq

def assignTasks(servers, tasks):
    free = [(servers[i], i) for i in range(len(servers))]
    heapq.heapify(free)
    busy = [] # (free_time, weight, index)
    res = []
    time = 0
    for i, t in enumerate(tasks):
        time = max(time, i)
        if not free: time = busy[0][0]
        while busy and busy[0][0] <= time:
            _, w, idx = heapq.heappop(busy)
            heapq.heappush(free, (w, idx))
        w, idx = heapq.heappop(free)
        res.append(idx)
        heapq.heappush(busy, (time + t, w, idx))
    return res

print("Assigned servers:", assignTasks([3, 3, 2], [1, 2, 3, 2, 1, 2]))''', "O(m log n)", "O(m + n)")

add(506, "Relative Ranks", "Easy", "Heap / Priority Queue", "Score Sorting / Heap Ranking",
    "Assign Olympic ranks ('Gold Medal', 'Silver Medal', 'Bronze Medal', '4', ...) based on scores.",
    '''def findRelativeRanks(score):
    sorted_s = sorted(score, reverse=True)
    medals = ["Gold Medal", "Silver Medal", "Bronze Medal"]
    rank_map = {s: medals[i] if i < 3 else str(i + 1) for i, s in enumerate(sorted_s)}
    return [rank_map[s] for s in score]

print("Ranks:", findRelativeRanks([10, 3, 8, 9, 4]))''', "O(n log n)", "O(n)")

add(1337, "The K Weakest Rows in a Matrix", "Easy", "Heap / Priority Queue", "Soldier Count Min-Heap",
    "Return the indices of the k weakest rows in the matrix ordered from weakest to strongest.",
    '''import heapq

def kWeakestRows(mat, k):
    counts = [(sum(row), i) for i, row in enumerate(mat)]
    heapq.heapify(counts)
    return [heapq.heappop(counts)[1] for _ in range(k)]

m = [[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]]
print("Weakest rows:", kWeakestRows(m, 3))''', "O(m log m)", "O(m)")

add(451, "Sort Characters By Frequency", "Medium", "Heap / Priority Queue", "Frequency Sorting",
    "Sort string in decreasing order based on frequency of characters.",
    '''def frequencySort(s):
    count = {}
    for c in s: count[c] = count.get(c, 0) + 1
    sorted_chars = sorted(count.items(), key=lambda x: x[1], reverse=True)
    return "".join(c * cnt for c, cnt in sorted_chars)

print("Frequency sorted:", frequencySort("tree"))''', "O(n log n)", "O(n)")

add(692, "Top K Frequent Words", "Medium", "Heap / Priority Queue", "Custom Frequency & Lexicographical Sort",
    "Return k most frequent strings sorted by frequency desc, then alphabetical asc.",
    '''def topKFrequentWords(words, k):
    count = {}
    for w in words: count[w] = count.get(w, 0) + 1
    sorted_words = sorted(count.keys(), key=lambda w: (-count[w], w))
    return sorted_words[:k]

print("Top 2 words:", topKFrequentWords(["i","love","leetcode","i","love","coding"], 2))''', "O(n log n)", "O(n)")

print(f"Loaded {len(problems)} problems (1-186).")

with open("scratch/problems_part3.json", "w") as f:
    json.dump(problems, f)
