# scratch/generate_part4.py
import json

with open("scratch/problems_part3.json") as f:
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
# 10. BACKTRACKING (18 Problems, IDs 187-204)
# ===========================================================================
add(78, "Subsets", "Medium", "Backtracking", "Include / Exclude Decision Tree",
    "Return all possible subsets (the power set) of unique elements.",
    '''def subsets(nums):
    res = []
    subset = []
    def dfs(i):
        if i >= len(nums):
            res.append(list(subset))
            return
        subset.append(nums[i])
        dfs(i + 1)
        subset.pop()
        dfs(i + 1)
    dfs(0)
    return res

print("Subsets:", subsets([1, 2, 3]))''', "O(2^n)", "O(n)")

add(90, "Subsets II", "Medium", "Backtracking", "Duplicate Element Skip",
    "Return all possible subsets of array that may contain duplicates without duplicate subsets.",
    '''def subsetsWithDup(nums):
    nums.sort()
    res = []
    def backtrack(start, path):
        res.append(list(path))
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]: continue
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return res

print("Subsets II:", subsetsWithDup([1, 2, 2]))''', "O(2^n)", "O(n)")

add(39, "Combination Sum", "Medium", "Backtracking", "Unlimited Choice Recursion",
    "Find all unique combinations of candidates that sum to target (numbers can be chosen repeatedly).",
    '''def combinationSum(candidates, target):
    res = []
    def dfs(i, cur, total):
        if total == target:
            res.append(list(cur))
            return
        if i >= len(candidates) or total > target: return
        cur.append(candidates[i])
        dfs(i, cur, total + candidates[i])
        cur.pop()
        dfs(i + 1, cur, total)
    dfs(0, [], 0)
    return res

print("Combinations:", combinationSum([2, 3, 6, 7], 7))''', "O(2^(target/min))", "O(target/min)")

add(40, "Combination Sum II", "Medium", "Backtracking", "Single-Use Duplicate Skip",
    "Find all unique combinations where each candidate number may only be used once.",
    '''def combinationSum2(candidates, target):
    candidates.sort()
    res = []
    def backtrack(cur, pos, target):
        if target == 0:
            res.append(list(cur))
            return
        if target <= 0: return
        prev = -1
        for i in range(pos, len(candidates)):
            if candidates[i] == prev: continue
            cur.append(candidates[i])
            backtrack(cur, i + 1, target - candidates[i])
            cur.pop()
            prev = candidates[i]
    backtrack([], 0, target)
    return res

print("Combination Sum II:", combinationSum2([10,1,2,7,6,1,5], 8))''', "O(2^n)", "O(n)")

add(46, "Permutations", "Medium", "Backtracking", "Visited Array Backtracking",
    "Return all possible permutations of an array of distinct integers.",
    '''def permute(nums):
    res = []
    def backtrack(curr, remaining):
        if not remaining:
            res.append(list(curr))
            return
        for i in range(len(remaining)):
            backtrack(curr + [remaining[i]], remaining[:i] + remaining[i+1:])
    backtrack([], nums)
    return res

print("Permutations:", permute([1, 2, 3]))''', "O(n!)", "O(n)")

add(47, "Permutations II", "Medium", "Backtracking", "Frequency Count Permutations",
    "Return all unique permutations of array that may contain duplicates.",
    '''def permuteUnique(nums):
    res = []
    perm = []
    count = {}
    for n in nums: count[n] = count.get(n, 0) + 1
    def dfs():
        if len(perm) == len(nums):
            res.append(list(perm))
            return
        for n in count:
            if count[n] > 0:
                perm.append(n)
                count[n] -= 1
                dfs()
                count[n] += 1
                perm.pop()
    dfs()
    return res

print("Unique perms:", permuteUnique([1, 1, 2]))''', "O(n!)", "O(n)")

add(79, "Word Search", "Medium", "Backtracking", "2D Grid DFS Backtracking",
    "Determine if word exists in grid constructed from sequentially adjacent cells.",
    '''def exist(board, word):
    rows, cols = len(board), len(board[0])
    path = set()
    def dfs(r, c, i):
        if i == len(word): return True
        if (r < 0 or c < 0 or r >= rows or c >= cols or
            word[i] != board[r][c] or (r, c) in path):
            return False
        path.add((r, c))
        res = (dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or
               dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1))
        path.remove((r, c))
        return res
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0): return True
    return False

board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
print("Word exists:", exist(board, "ABCCED"))''', "O(m * n * 4^L)", "O(L)")

add(131, "Palindrome Partitioning", "Medium", "Backtracking", "Partition Points Search",
    "Partition string s such that every substring of the partition is a palindrome.",
    '''def partition(s):
    res = []
    part = []
    def dfs(i):
        if i >= len(s):
            res.append(list(part))
            return
        for j in range(i, len(s)):
            sub = s[i:j + 1]
            if sub == sub[::-1]:
                part.append(sub)
                dfs(j + 1)
                part.pop()
    dfs(0)
    return res

print("Partitions:", partition("aab"))''', "O(2^n * n)", "O(n)")

add(17, "Letter Combinations of a Phone Number", "Medium", "Backtracking", "Digit Map Branching",
    "Return all possible letter combinations that number could represent on phone keypad.",
    '''def letterCombinations(digits):
    res = []
    digitToChar = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl", "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}
    def backtrack(i, curStr):
        if len(curStr) == len(digits):
            res.append(curStr)
            return
        for c in digitToChar[digits[i]]:
            backtrack(i + 1, curStr + c)
    if digits: backtrack(0, "")
    return res

print("Combinations:", letterCombinations("23"))''', "O(4^n)", "O(n)")

add(51, "N-Queens", "Hard", "Backtracking", "Col & Diagonals Constraint Tracking",
    "Place n queens on an n x n chessboard such that no two queens attack each other.",
    '''def solveNQueens(n):
    col, posDiag, negDiag = set(), set(), set()
    res = []
    board = [["."] * n for _ in range(n)]
    def backtrack(r):
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in col or (r + c) in posDiag or (r - c) in negDiag: continue
            col.add(c); posDiag.add(r + c); negDiag.add(r - c)
            board[r][c] = "Q"
            backtrack(r + 1)
            col.remove(c); posDiag.remove(r + c); negDiag.remove(r - c)
            board[r][c] = "."
    backtrack(0)
    return res

print("4-Queens solutions count:", len(solveNQueens(4)))''', "O(n!)", "O(n^2)")

add(52, "N-Queens II", "Hard", "Backtracking", "Distinct Solution Counter",
    "Return the number of distinct solutions to the n-queens puzzle.",
    '''def totalNQueens(n):
    col, posDiag, negDiag = set(), set(), set()
    count = 0
    def backtrack(r):
        nonlocal count
        if r == n:
            count += 1
            return
        for c in range(n):
            if c in col or (r + c) in posDiag or (r - c) in negDiag: continue
            col.add(c); posDiag.add(r + c); negDiag.add(r - c)
            backtrack(r + 1)
            col.remove(c); posDiag.remove(r + c); negDiag.remove(r - c)
    backtrack(0)
    return count

print("Total 4-Queens:", totalNQueens(4))''', "O(n!)", "O(n)")

add(37, "Sudoku Solver", "Hard", "Backtracking", "Constraint Backtracking",
    "Solve a 9x9 Sudoku puzzle by filling empty cells with valid digits 1-9.",
    '''def solveSudoku(board):
    def isValid(r, c, ch):
        for i in range(9):
            if board[r][i] == ch or board[i][c] == ch: return False
            if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch: return False
        return True
    def solve():
        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    for ch in "123456789":
                        if isValid(r, c, ch):
                            board[r][c] = ch
                            if solve(): return True
                            board[r][c] = "."
                    return False
        return True
    solve()
    return board

# Sample partial mini board
b = [["5","3",".",".","7",".",".",".","."]] + [["."]*9]*8
print("Solved row 0:", solveSudoku(b)[0])''', "O(9^(empty))", "O(1)")

add(77, "Combinations", "Medium", "Backtracking", "1..N K-Subset Backtracking",
    "Return all possible combinations of k numbers chosen from range [1, n].",
    '''def combine(n, k):
    res = []
    def backtrack(start, comb):
        if len(comb) == k:
            res.append(list(comb))
            return
        for i in range(start, n + 1):
            comb.append(i)
            backtrack(i + 1, comb)
            comb.pop()
    backtrack(1, [])
    return res

print("Combinations (4, 2):", combine(4, 2))''', "O(k * C(n, k))", "O(k)")

add(216, "Combination Sum III", "Medium", "Backtracking", "Bounded Count Target Sum",
    "Find all valid combinations of k numbers that sum to n using numbers 1 to 9 at most once.",
    '''def combinationSum3(k, n):
    res = []
    def backtrack(start, comb, target):
        if len(comb) == k and target == 0:
            res.append(list(comb))
            return
        if len(comb) >= k or target < 0: return
        for i in range(start, 10):
            comb.append(i)
            backtrack(i + 1, comb, target - i)
            comb.pop()
    backtrack(1, [], n)
    return res

print("Sum 7 with 3 numbers:", combinationSum3(3, 7))''', "O(C(9, k))", "O(k)")

add(93, "Restore IP Addresses", "Medium", "Backtracking", "4-Segment String Partition",
    "Return all possible valid IP addresses that can be formed by inserting dots into s.",
    '''def restoreIpAddresses(s):
    res = []
    def backtrack(i, dots, curIP):
        if dots == 4 and i == len(s):
            res.append(curIP[:-1])
            return
        if dots > 4: return
        for j in range(i, min(i + 3, len(s))):
            segment = s[i:j + 1]
            if int(segment) <= 255 and (i == j or s[i] != "0"):
                backtrack(j + 1, dots + 1, curIP + segment + ".")
    backtrack(0, 0, "")
    return res

print("Valid IPs:", restoreIpAddresses("25525511135"))''', "O(3^4)", "O(1)")

add(842, "Split Array into Fibonacci Sequence", "Medium", "Backtracking", "Additive Sequence Branching",
    "Split string of digits into Fibonacci-like sequence F[i] + F[i+1] == F[i+2].",
    '''def splitIntoFibonacci(num):
    res = []
    def backtrack(idx):
        if idx == len(num) and len(res) >= 3: return True
        for i in range(idx, len(num)):
            if num[idx] == "0" and i > idx: break
            val = int(num[idx:i + 1])
            if val >= 2**31: break
            if len(res) >= 2 and val > res[-1] + res[-2]: break
            if len(res) < 2 or val == res[-1] + res[-2]:
                res.append(val)
                if backtrack(i + 1): return True
                res.pop()
        return False
    backtrack(0)
    return res

print("Fibonacci split:", splitIntoFibonacci("1101111"))''', "O(2^n)", "O(n)")

add(491, "Non-decreasing Subsequences", "Medium", "Backtracking", "Deduplicated Increasing Subsequences",
    "Find all different non-decreasing subsequences with at least two elements.",
    '''def findSubsequences(nums):
    res = []
    def backtrack(start, path):
        if len(path) >= 2: res.append(list(path))
        used = set()
        for i in range(start, len(nums)):
            if nums[i] in used: continue
            if not path or nums[i] >= path[-1]:
                used.add(nums[i])
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()
    backtrack(0, [])
    return res

print("Subsequences:", findSubsequences([4, 6, 7, 7]))''', "O(2^n)", "O(n)")

add(784, "Letter Case Permutation", "Medium", "Backtracking", "Dual Case Decision Tree",
    "Transform every letter individually to be lowercase or uppercase.",
    '''def letterCasePermutation(s):
    res = []
    def backtrack(sub, i):
        if len(sub) == len(s):
            res.append(sub)
            return
        if s[i].isalpha():
            backtrack(sub + s[i].lower(), i + 1)
            backtrack(sub + s[i].upper(), i + 1)
        else:
            backtrack(sub + s[i], i + 1)
    backtrack("", 0)
    return res

print("Case perms:", letterCasePermutation("a1b2"))''', "O(2^n)", "O(n)")

# ===========================================================================
# 11. GRAPHS (24 Problems, IDs 205-228)
# ===========================================================================
add(200, "Number of Islands", "Medium", "Graphs", "Grid BFS/DFS Connected Components",
    "Count number of islands surrounded by water using 2D grid DFS.",
    '''def numIslands(grid):
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    islands = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                dfs(r, c)
                islands += 1
    return islands

grid = [["1","1","0"],["1","1","0"],["0","0","1"]]
print("Islands count:", numIslands(grid))''', "O(m * n)", "O(m * n)")

add(133, "Clone Graph", "Medium", "Graphs", "Hash Map DFS Graph Deep Copy",
    "Return deep copy of connected undirected graph using hash map.",
    '''def cloneGraph(adj):
    copies = {}
    for node, neighbors in adj.items():
        copies[node] = list(neighbors)
    return copies

adj = {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3]}
print("Cloned adj:", cloneGraph(adj))''', "O(V + E)", "O(V)")

add(695, "Max Area of Island", "Medium", "Graphs", "Grid Component Area Accumulation",
    "Find maximum area of an island (number of connected 1s) in a grid.",
    '''def maxAreaOfIsland(grid):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            grid[r][c] == 0 or (r, c) in visited):
            return 0
        visited.add((r, c))
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)
    max_area = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1 and (r, c) not in visited:
                max_area = max(max_area, dfs(r, c))
    return max_area

grid = [[0,1,1],[1,1,0],[0,0,1]]
print("Max area:", maxAreaOfIsland(grid))''', "O(m * n)", "O(m * n)")

add(417, "Pacific Atlantic Water Flow", "Medium", "Graphs", "Reverse Multi-Source DFS",
    "Find grid coordinates where water can flow to both Pacific and Atlantic oceans.",
    '''def pacificAtlantic(heights):
    rows, cols = len(heights), len(heights[0])
    pac, atl = set(), set()
    def dfs(r, c, visit, prevHeight):
        if ((r, c) in visit or r < 0 or c < 0 or r >= rows or c >= cols or
            heights[r][c] < prevHeight):
            return
        visit.add((r, c))
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            dfs(r + dr, c + dc, visit, heights[r][c])
    for c in range(cols):
        dfs(0, c, pac, heights[0][c])
        dfs(rows - 1, c, atl, heights[rows - 1][c])
    for r in range(rows):
        dfs(r, 0, pac, heights[r][0])
        dfs(r, cols - 1, atl, heights[r][cols - 1])
    return list(pac.intersection(atl))

heights = [[1,2,2],[3,2,3],[2,4,5]]
print("Common flow cells:", pacificAtlantic(heights))''', "O(m * n)", "O(m * n)")

add(130, "Surrounded Regions", "Medium", "Graphs", "Boundary DFS Inversion",
    "Capture all regions surrounded by 'X' by flipping non-boundary connected 'O's to 'X'.",
    '''def solve(board):
    rows, cols = len(board), len(board[0])
    def capture(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != "O": return
        board[r][c] = "T"
        capture(r + 1, c); capture(r - 1, c); capture(r, c + 1); capture(r, c - 1)
    for r in range(rows):
        capture(r, 0); capture(r, cols - 1)
    for c in range(cols):
        capture(0, c); capture(rows - 1, c)
    for r in range(rows):
        for c in range(cols):
            board[r][c] = "O" if board[r][c] == "T" else "X"
    return board

b = [["X","X","X"],["X","O","X"],["X","X","X"]]
print("Surrounded solved:", solve(b))''', "O(m * n)", "O(m * n)")

add(994, "Rotting Oranges", "Medium", "Graphs", "Multi-Source Queue BFS",
    "Find minimum number of minutes until no fresh oranges remain using multi-source BFS.",
    '''def orangesRotting(grid):
    q = []
    time, fresh = 0, 0
    rows, cols = len(grid), len(grid[0])
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1: fresh += 1
            if grid[r][c] == 2: q.append((r, c))
    directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.pop(0)
            for dr, dc in directions:
                row, col = r + dr, c + dc
                if 0 <= row < rows and 0 <= col < cols and grid[row][col] == 1:
                    grid[row][col] = 2
                    q.append((row, col))
                    fresh -= 1
        time += 1
    return time if fresh == 0 else -1

grid = [[2,1,1],[1,1,0],[0,1,1]]
print("Minutes to rot:", orangesRotting(grid))''', "O(m * n)", "O(m * n)")

add(286, "Walls and Gates", "Medium", "Graphs", "Multi-Source Distance BFS",
    "Fill each empty room with distance to nearest gate (-1: wall, 0: gate, INF: empty).",
    '''def wallsAndGates(rooms):
    INF = 2147483647
    rows, cols = len(rooms), len(rooms[0])
    q = []
    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0: q.append((r, c))
    dist = 0
    while q:
        for _ in range(len(q)):
            r, c = q.pop(0)
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF:
                    rooms[nr][nc] = rooms[r][c] + 1
                    q.append((nr, nc))
    return rooms

rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1]]
print("Filled rooms:", wallsAndGates(rooms))''', "O(m * n)", "O(m * n)")

add(207, "Course Schedule", "Medium", "Graphs", "Cycle Detection / Topological Sort",
    "Determine if you can finish all courses given prerequisite graph dependencies.",
    '''def canFinish(numCourses, prerequisites):
    preMap = {i: [] for i in range(numCourses)}
    for crs, pre in prerequisites: preMap[crs].append(pre)
    visiting = set()
    def dfs(crs):
        if crs in visiting: return False
        if preMap[crs] == []: return True
        visiting.add(crs)
        for pre in preMap[crs]:
            if not dfs(pre): return False
        visiting.remove(crs)
        preMap[crs] = []
        return True
    for c in range(numCourses):
        if not dfs(c): return False
    return True

print("Can finish:", canFinish(2, [[1, 0]]))''', "O(V + E)", "O(V + E)")

add(210, "Course Schedule II", "Medium", "Graphs", "Kahn's / Post-Order Topo Sort",
    "Return the ordering of courses you should take to finish all courses.",
    '''def findOrder(numCourses, prerequisites):
    preMap = {i: [] for i in range(numCourses)}
    for crs, pre in prerequisites: preMap[crs].append(pre)
    output = []
    visited, cycle = set(), set()
    def dfs(crs):
        if crs in cycle: return False
        if crs in visited: return True
        cycle.add(crs)
        for pre in preMap[crs]:
            if not dfs(pre): return False
        cycle.remove(crs)
        visited.add(crs)
        output.append(crs)
        return True
    for c in range(numCourses):
        if not dfs(c): return []
    return output

print("Course order:", findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))''', "O(V + E)", "O(V + E)")

add(684, "Redundant Connection", "Medium", "Graphs", "Disjoint Set Union (DSU)",
    "Find edge in graph that can be removed so tree has no cycles using Union-Find.",
    '''def findRedundantConnection(edges):
    parent = [i for i in range(len(edges) + 1)]
    def find(n):
        if n == parent[n]: return n
        parent[n] = find(parent[n])
        return parent[n]
    def union(n1, n2):
        p1, p2 = find(n1), find(n2)
        if p1 == p2: return False
        parent[p1] = p2
        return True
    for u, v in edges:
        if not union(u, v): return [u, v]

print("Redundant edge:", findRedundantConnection([[1,2],[1,3],[2,3]]))''', "O(E * alpha(V))", "O(V)")

add(323, "Number of Connected Components in an Undirected Graph", "Medium", "Graphs", "Union-Find / DFS Components",
    "Return total number of connected components in undirected graph of n nodes.",
    '''def countComponents(n, edges):
    parent = [i for i in range(n)]
    def find(n):
        if n == parent[n]: return n
        parent[n] = find(parent[n])
        return parent[n]
    res = n
    for u, v in edges:
        p1, p2 = find(u), find(v)
        if p1 != p2:
            parent[p1] = p2
            res -= 1
    return res

print("Connected components:", countComponents(5, [[0,1],[1,2],[3,4]]))''', "O(V + E)", "O(V)")

add(261, "Graph Valid Tree", "Medium", "Graphs", "DSU Cycle & Component Check",
    "Check if undirected graph edges form a single valid tree without cycles.",
    '''def validTree(n, edges):
    if len(edges) != n - 1: return False
    parent = [i for i in range(n)]
    def find(n):
        if n == parent[n]: return n
        parent[n] = find(parent[n])
        return parent[n]
    for u, v in edges:
        p1, p2 = find(u), find(v)
        if p1 == p2: return False
        parent[p1] = p2
    return True

print("Is valid tree:", validTree(5, [[0,1],[0,2],[0,3],[1,4]]))''', "O(V)", "O(V)")

add(127, "Word Ladder", "Hard", "Graphs", "Intermediate Pattern BFS",
    "Find shortest transformation sequence length from beginWord to endWord changing 1 letter at a time.",
    '''def ladderLength(beginWord, endWord, wordList):
    if endWord not in wordList: return 0
    neighbors = {}
    wordList.append(beginWord)
    for word in wordList:
        for j in range(len(word)):
            pattern = word[:j] + "*" + word[j + 1:]
            if pattern not in neighbors: neighbors[pattern] = []
            neighbors[pattern].append(word)
    visited = {beginWord}
    q = [beginWord]
    res = 1
    while q:
        for _ in range(len(q)):
            word = q.pop(0)
            if word == endWord: return res
            for j in range(len(word)):
                pattern = word[:j] + "*" + word[j + 1:]
                for nei in neighbors.get(pattern, []):
                    if nei not in visited:
                        visited.add(nei)
                        q.append(nei)
        res += 1
    return 0

print("Ladder length:", ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"]))''', "O(M^2 * N)", "O(M^2 * N)")

add(733, "Flood Fill", "Easy", "Graphs", "4-Directional DFS Replacement",
    "Perform flood fill on image starting from pixel (sr, sc) with color.",
    '''def floodFill(image, sr, sc, color):
    startColor = image[sr][sc]
    if startColor == color: return image
    rows, cols = len(image), len(image[0])
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or image[r][c] != startColor:
            return
        image[r][c] = color
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
    dfs(sr, sc)
    return image

img = [[1,1,1],[1,1,0],[1,0,1]]
print("Filled image:", floodFill(img, 1, 1, 2))''', "O(m * n)", "O(m * n)")

add(463, "Island Perimeter", "Easy", "Graphs", "Edge Boundary Counting",
    "Calculate perimeter of single island grid where 1 is land and 0 is water.",
    '''def islandPerimeter(grid):
    rows, cols = len(grid), len(grid[0])
    perimeter = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                perimeter += 4
                if r > 0 and grid[r - 1][c] == 1: perimeter -= 2
                if c > 0 and grid[r][c - 1] == 1: perimeter -= 2
    return perimeter

grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
print("Perimeter:", islandPerimeter(grid))''', "O(m * n)", "O(1)")

add(841, "Keys and Rooms", "Medium", "Graphs", "DFS Room Reachability",
    "Return true if you can visit all rooms given keys in each room.",
    '''def canVisitAllRooms(rooms):
    visited = set()
    def dfs(room):
        visited.add(room)
        for key in rooms[room]:
            if key not in visited: dfs(key)
    dfs(0)
    return len(visited) == len(rooms)

print("Can visit all rooms:", canVisitAllRooms([[1],[2],[3],[]]))''', "O(V + E)", "O(V)")

add(547, "Number of Provinces", "Medium", "Graphs", "Adjacency Matrix DFS",
    "Find total number of connected provinces of cities from connectivity matrix.",
    '''def findCircleNum(isConnected):
    n = len(isConnected)
    visited = set()
    provinces = 0
    def dfs(city):
        visited.add(city)
        for other in range(n):
            if isConnected[city][other] == 1 and other not in visited:
                dfs(other)
    for c in range(n):
        if c not in visited:
            dfs(c)
            provinces += 1
    return provinces

print("Provinces:", findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))''', "O(n^2)", "O(n)")

add(802, "Find Eventual Safe States", "Medium", "Graphs", "3-State Cycle Detection",
    "Find all nodes that only lead to terminal nodes (no directed cycles).",
    '''def eventualSafeNodes(graph):
    # 0: unvisited, 1: visiting (in cycle), 2: safe
    state = [0] * len(graph)
    def dfs(node):
        if state[node] > 0: return state[node] == 2
        state[node] = 1
        for nei in graph[node]:
            if not dfs(nei): return False
        state[node] = 2
        return True
    return [i for i in range(len(graph)) if dfs(i)]

print("Safe nodes:", eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]]))''', "O(V + E)", "O(V)")

add(785, "Is Graph Bipartite?", "Medium", "Graphs", "2-Coloring BFS / DFS",
    "Check if graph vertices can be partitioned into two independent sets with alternating colors.",
    '''def isBipartite(graph):
    color = {}
    for node in range(len(graph)):
        if node not in color:
            color[node] = 0
            q = [node]
            while q:
                curr = q.pop(0)
                for nei in graph[curr]:
                    if nei not in color:
                        color[nei] = 1 - color[curr]
                        q.append(nei)
                    elif color[nei] == color[curr]:
                        return False
    return True

print("Is bipartite:", isBipartite([[1,3],[0,2],[1,3],[0,2]]))''', "O(V + E)", "O(V)")

add(1091, "Shortest Path in Binary Matrix", "Medium", "Graphs", "8-Directional Queue BFS",
    "Find length of shortest clear path from top-left to bottom-right in binary matrix.",
    '''def shortestPathBinaryMatrix(grid):
    n = len(grid)
    if grid[0][0] != 0 or grid[n - 1][n - 1] != 0: return -1
    q = [(0, 0, 1)]
    visited = {(0, 0)}
    directions = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    while q:
        r, c, d = q.pop(0)
        if r == n - 1 and c == n - 1: return d
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0 and (nr, nc) not in visited:
                visited.add((nr, nc))
                q.append((nr, nc, d + 1))
    return -1

print("Shortest path:", shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]]))''', "O(n^2)", "O(n^2)")

add(1971, "Find if Path Exists in Graph", "Easy", "Graphs", "BFS Reachability",
    "Determine if there is a valid path from source to destination in graph.",
    '''def validPath(n, edges, source, destination):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v); adj[v].append(u)
    visited = {source}
    q = [source]
    while q:
        node = q.pop(0)
        if node == destination: return True
        for nei in adj[node]:
            if nei not in visited:
                visited.add(nei)
                q.append(nei)
    return False

print("Path exists:", validPath(3, [[0,1],[1,2],[2,0]], 0, 2))''', "O(V + E)", "O(V)")

add(1319, "Number of Operations to Make Network Connected", "Medium", "Graphs", "Union-Find Extra Cables",
    "Find minimum operations to connect all computers using available extra cables.",
    '''def makeConnected(n, connections):
    if len(connections) < n - 1: return -1
    parent = [i for i in range(n)]
    def find(n):
        if n == parent[n]: return n
        parent[n] = find(parent[n])
        return parent[n]
    components = n
    for u, v in connections:
        p1, p2 = find(u), find(v)
        if p1 != p2:
            parent[p1] = p2
            components -= 1
    return components - 1

print("Ops needed:", makeConnected(4, [[0,1],[0,2],[1,2]]))''', "O(E)", "O(V)")

add(743, "Network Delay Time", "Medium", "Graphs", "Dijkstra's Algorithm",
    "Find minimum time for all n nodes to receive signal sent from node k using Dijkstra's algorithm.",
    '''import heapq

def networkDelayTime(times, n, k):
    edges = {i: [] for i in range(1, n + 1)}
    for u, v, w in times: edges[u].append((v, w))
    minHeap = [(0, k)]
    visit = set()
    t = 0
    while minHeap:
        w1, n1 = heapq.heappop(minHeap)
        if n1 in visit: continue
        visit.add(n1)
        t = max(t, w1)
        for n2, w2 in edges[n1]:
            if n2 not in visit: heapq.heappush(minHeap, (w1 + w2, n2))
    return t if len(visit) == n else -1

print("Network delay:", networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2))''', "O(E log V)", "O(V + E)")

add(1584, "Min Cost to Connect All Points", "Medium", "Graphs", "Prim's Minimum Spanning Tree",
    "Find minimum cost to connect all points such that there is exactly one path between any pair.",
    '''import heapq

def minCostConnectPoints(points):
    N = len(points)
    adj = {i: [] for i in range(N)}
    for i in range(N):
        x1, y1 = points[i]
        for j in range(i + 1, N):
            x2, y2 = points[j]
            dist = abs(x1 - x2) + abs(y1 - y2)
            adj[i].append((dist, j))
            adj[j].append((dist, i))
    res = 0
    visit = set()
    minH = [[0, 0]]
    while len(visit) < N:
        cost, i = heapq.heappop(minH)
        if i in visit: continue
        res += cost
        visit.add(i)
        for neiCost, nei in adj[i]:
            if nei not in visit: heapq.heappush(minH, [neiCost, nei])
    return res

print("MST Cost:", minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]]))''', "O(N^2 log N)", "O(N^2)")

# ===========================================================================
# 12. ADVANCED GRAPHS (10 Problems, IDs 229-238)
# ===========================================================================
add(332, "Reconstruct Itinerary", "Hard", "Advanced Graphs", "Hierholzer's Eulerian Path",
    "Reconstruct airline flight itinerary starting from 'JFK' in lexicographical order.",
    '''def findItinerary(tickets):
    adj = {}
    for src, dst in sorted(tickets, reverse=True):
        if src not in adj: adj[src] = []
        adj[src].append(dst)
    route = []
    def dfs(airport):
        while airport in adj and adj[airport]:
            dfs(adj[airport].pop())
        route.append(airport)
    dfs("JFK")
    return route[::-1]

tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
print("Itinerary:", findItinerary(tickets))''', "O(E log E)", "O(V + E)")

add(778, "Swim in Rising Water", "Hard", "Advanced Graphs", "Modified Dijkstra Grid",
    "Find least time until you can reach bottom-right square from top-left square in elevation grid.",
    '''import heapq

def swimInWater(grid):
    n = len(grid)
    visited = {(0, 0)}
    minH = [(grid[0][0], 0, 0)]
    while minH:
        t, r, c = heapq.heappop(minH)
        if r == n - 1 and c == n - 1: return t
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:
                visited.add((nr, nc))
                heapq.heappush(minH, (max(t, grid[nr][nc]), nr, nc))

print("Swim time:", swimInWater([[0,2],[1,3]]))''', "O(n^2 log n)", "O(n^2)")

add(269, "Alien Dictionary", "Hard", "Advanced Graphs", "Topological Sort on Lexicographical Rules",
    "Deduce alien alphabetical order from sorted dictionary list of words.",
    '''def alienOrder(words):
    adj = {c: set() for w in words for c in w}
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        minLen = min(len(w1), len(w2))
        if len(w1) > len(w2) and w1[:minLen] == w2[:minLen]: return ""
        for j in range(minLen):
            if w1[j] != w2[j]:
                adj[w1[j]].add(w2[j])
                break
    visited, res = {}, []
    def dfs(c):
        if c in visited: return visited[c]
        visited[c] = True
        for nei in adj[c]:
            if dfs(nei): return True
        visited[c] = False
        res.append(c)
    for c in adj:
        if dfs(c): return ""
    return "".join(res[::-1])

print("Alien order:", alienOrder(["wrt","wrf","er","ett","rftt"]))''', "O(C)", "O(U + min(U^2, N))")

add(787, "Cheapest Flights Within K Stops", "Medium", "Advanced Graphs", "Bellman-Ford Relaxations",
    "Find cheapest price from src to dst with at most k stops.",
    '''def findCheapestPrice(n, flights, src, dst, k):
    prices = [float("inf")] * n
    prices[src] = 0
    for _ in range(k + 1):
        tmp = list(prices)
        for s, d, p in flights:
            if prices[s] != float("inf") and prices[s] + p < tmp[d]:
                tmp[d] = prices[s] + p
        prices = tmp
    return prices[dst] if prices[dst] != float("inf") else -1

flights = [[0,1,100],[1,2,100],[0,2,500]]
print("Cheapest price:", findCheapestPrice(3, flights, 0, 2, 1))''', "O(k * E)", "O(V)")

add(1631, "Path With Minimum Effort", "Medium", "Advanced Graphs", "Dijkstra's Height Difference",
    "Find path from top-left to bottom-right that minimizes maximum absolute difference in heights between cells.",
    '''import heapq

def minimumEffortPath(heights):
    rows, cols = len(heights), len(heights[0])
    minH = [(0, 0, 0)]
    effort = {(0, 0): 0}
    while minH:
        eff, r, c = heapq.heappop(minH)
        if r == rows - 1 and c == cols - 1: return eff
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                new_eff = max(eff, abs(heights[r][c] - heights[nr][nc]))
                if new_eff < effort.get((nr, nc), float("inf")):
                    effort[(nr, nc)] = new_eff
                    heapq.heappush(minH, (new_eff, nr, nc))

print("Min effort:", minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]]))''', "O(m*n log(m*n))", "O(m*n)")

add(1514, "Path with Maximum Probability", "Medium", "Advanced Graphs", "Max-Heap Dijkstra Multiplicative",
    "Find path with maximum probability of success between start and end node.",
    '''import heapq

def maxProbability(n, edges, succProb, start_node, end_node):
    adj = {i: [] for i in range(n)}
    for (u, v), p in zip(edges, succProb):
        adj[u].append((v, p)); adj[v].append((u, p))
    pq = [(-1.0, start_node)]
    probs = {start_node: 1.0}
    while pq:
        prob, node = heapq.heappop(pq)
        prob = -prob
        if node == end_node: return prob
        for nei, edge_p in adj[node]:
            if prob * edge_p > probs.get(nei, 0):
                probs[nei] = prob * edge_p
                heapq.heappush(pq, (-prob * edge_p, nei))
    return 0.0

edges = [[0,1],[1,2],[0,2]]
print("Max prob:", maxProbability(3, edges, [0.5,0.5,0.2], 0, 2))''', "O(E log V)", "O(V + E)")

add(1162, "As Far from Land as Possible", "Medium", "Advanced Graphs", "Multi-Source BFS Distance",
    "Find a water cell (0) such that its distance to the nearest land cell (1) is maximized.",
    '''def maxDistance(grid):
    n = len(grid)
    q = []
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 1: q.append((r, c))
    if len(q) == 0 or len(q) == n * n: return -1
    res = -1
    while q:
        for _ in range(len(q)):
            r, c = q.pop(0)
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                    grid[nr][nc] = 1
                    q.append((nr, nc))
        res += 1
    return res

grid = [[1,0,1],[0,0,0],[1,0,1]]
print("Max distance:", maxDistance(grid))''', "O(n^2)", "O(n^2)")

add(1192, "Critical Connections in a Network", "Hard", "Advanced Graphs", "Tarjan's Bridge-Finding",
    "Find all critical connections (bridges) in network that if removed disconnects network.",
    '''def criticalConnections(n, connections):
    adj = {i: [] for i in range(n)}
    for u, v in connections:
        adj[u].append(v); adj[v].append(u)
    tin = [-1] * n
    low = [-1] * n
    timer = 0
    bridges = []
    def dfs(node, parent):
        nonlocal timer
        tin[node] = low[node] = timer
        timer += 1
        for nei in adj[node]:
            if nei == parent: continue
            if tin[nei] != -1:
                low[node] = min(low[node], tin[nei])
            else:
                dfs(nei, node)
                low[node] = min(low[node], low[nei])
                if low[nei] > tin[node]:
                    bridges.append([node, nei])
    dfs(0, -1)
    return bridges

conns = [[0,1],[1,2],[2,0],[1,3]]
print("Bridges:", criticalConnections(4, conns))''', "O(V + E)", "O(V + E)")

add(886, "Possible Bipartition", "Medium", "Advanced Graphs", "2-Coloring Dislike Graph",
    "Determine if it is possible to split everyone into two groups so nobody dislikes each other in same group.",
    '''def possibleBipartition(n, dislikes):
    adj = {i: [] for i in range(1, n + 1)}
    for u, v in dislikes:
        adj[u].append(v); adj[v].append(u)
    color = {}
    def bfs(node):
        color[node] = 0
        q = [node]
        while q:
            curr = q.pop(0)
            for nei in adj[curr]:
                if nei not in color:
                    color[nei] = 1 - color[curr]
                    q.append(nei)
                elif color[nei] == color[curr]:
                    return False
        return True
    for i in range(1, n + 1):
        if i not in color:
            if not bfs(i): return False
    return True

print("Bipartition possible:", possibleBipartition(4, [[1,2],[1,3],[2,4]]))''', "O(V + E)", "O(V + E)")

add(851, "Loud and Rich", "Medium", "Advanced Graphs", "Memoized Richer DFS",
    "For each person, find the quietest person among all people who have greater or equal money.",
    '''def loudAndRich(richer, quiet):
    n = len(quiet)
    adj = {i: [] for i in range(n)}
    for u, v in richer: adj[v].append(u)
    ans = [-1] * n
    def dfs(node):
        if ans[node] != -1: return ans[node]
        ans[node] = node
        for richer_person in adj[node]:
            cand = dfs(richer_person)
            if quiet[cand] < quiet[ans[node]]:
                ans[node] = cand
        return ans[node]
    for i in range(n): dfs(i)
    return ans

richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]]
quiet = [3,2,5,4,6,1,7,0]
print("Quietest richer:", loudAndRich(richer, quiet))''', "O(V + E)", "O(V)")

print(f"Loaded {len(problems)} problems (1-238).")

with open("scratch/problems_part4.json", "w") as f:
    json.dump(problems, f)
