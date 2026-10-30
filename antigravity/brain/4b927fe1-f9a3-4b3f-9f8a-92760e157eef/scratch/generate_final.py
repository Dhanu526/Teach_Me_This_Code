# scratch/generate_final.py
import json
import os

DIR = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(DIR, "problems_part4.json"), "r", encoding="utf-8") as f:
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
# 13. 1-D DYNAMIC PROGRAMMING (24 Problems, IDs 239-262)
# ===========================================================================
add(70, "Climbing Stairs", "Easy", "1-D Dynamic Programming", "Fibonacci Transition DP",
    "Find how many distinct ways you can climb n steps taking 1 or 2 steps at a time.",
    '''def climbStairs(n):
    one, two = 1, 1
    for _ in range(n - 1):
        one, two = one + two, one
    return one

print("Ways to climb 5 stairs:", climbStairs(5))''', "O(n)", "O(1)")

add(746, "Min Cost Climbing Stairs", "Easy", "1-D Dynamic Programming", "Bottom-Up 2-Variable DP",
    "Find minimum cost to reach the top of the floor where you can climb 1 or 2 steps.",
    '''def minCostClimbingStairs(cost):
    for i in range(len(cost) - 3, -1, -1):
        cost[i] += min(cost[i + 1], cost[i + 2])
    return min(cost[0], cost[1])

print("Min cost:", minCostClimbingStairs([10, 15, 20]))''', "O(n)", "O(1)")

add(198, "House Robber", "Medium", "1-D Dynamic Programming", "Rob vs. Skip Recurrence",
    "Determine maximum amount of money you can rob tonight without alerting the police (no adjacent houses).",
    '''def rob(nums):
    rob1, rob2 = 0, 0
    for n in nums:
        newRob = max(rob1 + n, rob2)
        rob1 = rob2
        rob2 = newRob
    return rob2

print("Max robbed:", rob([1, 2, 3, 1]))''', "O(n)", "O(1)")

add(213, "House Robber II", "Medium", "1-D Dynamic Programming", "Circular Dual-Pass DP",
    "Houses are arranged in a circle. Rob without robbing adjacent houses (first and last are adjacent).",
    '''def robII(nums):
    def helper(sub):
        r1, r2 = 0, 0
        for n in sub:
            r1, r2 = r2, max(r1 + n, r2)
        return r2
    return max(nums[0], helper(nums[1:]), helper(nums[:-1]))

print("Max circular rob:", robII([2, 3, 2]))''', "O(n)", "O(1)")

add(5, "Longest Palindromic Substring", "Medium", "1-D Dynamic Programming", "Expand Around Center",
    "Return the longest palindromic substring in s in O(n^2) time.",
    '''def longestPalindrome(s):
    res = ""
    for i in range(len(s)):
        # Odd length
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > len(res): res = s[l:r + 1]
            l -= 1; r += 1
        # Even length
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > len(res): res = s[l:r + 1]
            l -= 1; r += 1
    return res

print("Longest palindrome:", longestPalindrome("babad"))''', "O(n^2)", "O(1)")

add(647, "Palindromic Substrings", "Medium", "1-D Dynamic Programming", "Center Expansion Counter",
    "Count how many palindromic substrings are in string s.",
    '''def countSubstrings(s):
    res = 0
    for i in range(len(s)):
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            res += 1; l -= 1; r += 1
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            res += 1; l -= 1; r += 1
    return res

print("Count palindromes:", countSubstrings("aaa"))''', "O(n^2)", "O(1)")

add(91, "Decode Ways", "Medium", "1-D Dynamic Programming", "1-Digit & 2-Digit Jump DP",
    "Find total number of ways to decode string of digits mapped 'A'->1 .. 'Z'->26.",
    '''def numDecodings(s):
    dp = {len(s): 1}
    for i in range(len(s) - 1, -1, -1):
        if s[i] == "0": dp[i] = 0
        else: dp[i] = dp[i + 1]
        if i + 1 < len(s) and (s[i] == "1" or (s[i] == "2" and s[i + 1] in "0123456")):
            dp[i] += dp[i + 2]
    return dp[0]

print("Ways to decode 226:", numDecodings("226"))''', "O(n)", "O(n)")

add(322, "Coin Change", "Medium", "1-D Dynamic Programming", "Unbounded Knapsack DP",
    "Return fewest number of coins needed to make up given amount.",
    '''def coinChange(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != amount + 1 else -1

print("Fewest coins:", coinChange([1, 2, 5], 11))''', "O(amount * len(coins))", "O(amount)")

add(152, "Maximum Product Subarray", "Medium", "1-D Dynamic Programming", "Min & Max Product Tracking",
    "Find contiguous subarray within array which has the largest product.",
    '''def maxProduct(nums):
    res = max(nums)
    curMin, curMax = 1, 1
    for n in nums:
        if n == 0:
            curMin, curMax = 1, 1
            continue
        tmp = curMax * n
        curMax = max(n * curMax, n * curMin, n)
        curMin = min(tmp, n * curMin, n)
        res = max(res, curMax)
    return res

print("Max product:", maxProduct([2, 3, -2, 4]))''', "O(n)", "O(1)")

add(139, "Word Break", "Medium", "1-D Dynamic Programming", "Prefix Matching DP",
    "Determine if s can be segmented into space-separated sequence of dictionary words.",
    '''def wordBreak(s, wordDict):
    dp = [False] * (len(s) + 1)
    dp[len(s)] = True
    for i in range(len(s) - 1, -1, -1):
        for w in wordDict:
            if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:
                dp[i] = dp[i + len(w)]
            if dp[i]: break
    return dp[0]

print("Can word break:", wordBreak("leetcode", ["leet", "code"]))''', "O(n * m * k)", "O(n)")

add(300, "Longest Increasing Subsequence", "Medium", "1-D Dynamic Programming", "Subsequence Optimization",
    "Find length of longest strictly increasing subsequence in array.",
    '''def lengthOfLIS(nums):
    LIS = [1] * len(nums)
    for i in range(len(nums) - 1, -1, -1):
        for j in range(i + 1, len(nums)):
            if nums[i] < nums[j]:
                LIS[i] = max(LIS[i], 1 + LIS[j])
    return max(LIS)

print("LIS length:", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))''', "O(n^2)", "O(n)")

add(416, "Partition Equal Subset Sum", "Medium", "1-D Dynamic Programming", "0/1 Knapsack Target Sum",
    "Check if array can be partitioned into two subsets with equal sum.",
    '''def canPartition(nums):
    if sum(nums) % 2: return False
    target = sum(nums) // 2
    dp = {0}
    for n in nums:
        nextDP = set(dp)
        for t in dp:
            if t + n == target: return True
            nextDP.add(t + n)
        dp = nextDP
    return target in dp

print("Can partition:", canPartition([1, 5, 11, 5]))''', "O(n * sum(nums))", "O(sum(nums))")

add(53, "Maximum Subarray", "Medium", "1-D Dynamic Programming", "Kadane's Algorithm",
    "Find contiguous subarray which has largest sum and return its sum.",
    '''def maxSubArray(nums):
    max_sum = nums[0]
    curr_sum = 0
    for n in nums:
        curr_sum += n
        if curr_sum > max_sum: max_sum = curr_sum
        if curr_sum < 0: curr_sum = 0
    return max_sum

print("Max subarray:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))''', "O(n)", "O(1)")

add(1137, "N-th Tribonacci Number", "Easy", "1-D Dynamic Programming", "3-State Sliding Window",
    "Compute Tn = Tn-1 + Tn-2 + Tn-3 where T0=0, T1=1, T2=1.",
    '''def tribonacci(n):
    t0, t1, t2 = 0, 1, 1
    if n == 0: return 0
    if n <= 2: return 1
    for _ in range(3, n + 1):
        t0, t1, t2 = t1, t2, t0 + t1 + t2
    return t2

print("Tribonacci(4):", tribonacci(4))''', "O(n)", "O(1)")

add(377, "Combination Sum IV", "Medium", "1-D Dynamic Programming", "Permutation Sum DP",
    "Return number of possible combinations that add up to target where order matters.",
    '''def combinationSum4(nums, target):
    dp = {0: 1}
    for total in range(1, target + 1):
        dp[total] = 0
        for n in nums:
            dp[total] += dp.get(total - n, 0)
    return dp[target]

print("Combinations to 4:", combinationSum4([1, 2, 3], 4))''', "O(target * len(nums))", "O(target)")

add(279, "Perfect Squares", "Medium", "1-D Dynamic Programming", "Square Change DP",
    "Return least number of perfect square numbers that sum to n.",
    '''def numSquares(n):
    dp = [n] * (n + 1)
    dp[0] = 0
    for target in range(1, n + 1):
        s = 1
        while s * s <= target:
            dp[target] = min(dp[target], 1 + dp[target - s * s])
            s += 1
    return dp[n]

print("Squares for 12:", numSquares(12))''', "O(n * sqrt(n))", "O(n)")

add(343, "Integer Break", "Medium", "1-D Dynamic Programming", "Product Maximization DP",
    "Break integer n into sum of at least two positive integers and maximize product.",
    '''def integerBreak(n):
    dp = {1: 1}
    for num in range(2, n + 1):
        dp[num] = 0 if num == n else num
        for i in range(1, num):
            val = dp[i] * dp[num - i]
            dp[num] = max(dp[num], val)
    return dp[n]

print("Integer break 10:", integerBreak(10))''', "O(n^2)", "O(n)")

add(983, "Minimum Cost For Tickets", "Medium", "1-D Dynamic Programming", "Day-based Jump DP",
    "Find minimum dollars you need to travel every day in given list of days.",
    '''def mincostTickets(days, costs):
    dp = {}
    def dfs(i):
        if i == len(days): return 0
        if i in dp: return dp[i]
        dp[i] = float("inf")
        for d, c in zip([1, 7, 30], costs):
            j = i
            while j < len(days) and days[j] < days[i] + d:
                j += 1
            dp[i] = min(dp[i], c + dfs(j))
        return dp[i]
    return dfs(0)

print("Min ticket cost:", mincostTickets([1,4,6,7,8,20], [2,7,15]))''', "O(n)", "O(n)")

add(1049, "Last Stone Weight II", "Medium", "1-D Dynamic Programming", "Subset Sum Difference Minimization",
    "Smash stones to minimize the smallest possible weight of remaining stone.",
    '''def lastStoneWeightII(stones):
    stoneSum = sum(stones)
    target = stoneSum // 2
    dp = {0}
    for s in stones:
        nextDP = set(dp)
        for t in dp:
            if t + s <= target: nextDP.add(t + s)
        dp = nextDP
    return stoneSum - 2 * max(dp)

print("Min remaining stone:", lastStoneWeightII([2,7,4,1,8,1]))''', "O(n * total)", "O(total)")

add(474, "Ones and Zeroes", "Medium", "1-D Dynamic Programming", "2-Constraint Knapsack",
    "Return size of largest subset of strs with at most m 0s and n 1s.",
    '''def findMaxForm(strs, m, n):
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for s in strs:
        zeros, ones = s.count("0"), s.count("1")
        for i in range(m, zeros - 1, -1):
            for j in range(n, ones - 1, -1):
                dp[i][j] = max(dp[i][j], 1 + dp[i - zeros][j - ones])
    return dp[m][n]

print("Max subset:", findMaxForm(["10","0001","111001","1","0"], 5, 3))''', "O(k * m * n)", "O(m * n)")

add(518, "Coin Change II", "Medium", "1-D Dynamic Programming", "Combinations Unbounded DP",
    "Return number of combinations that make up given amount using given coins.",
    '''def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]

print("Combinations for 5:", change(5, [1, 2, 5]))''', "O(n * amount)", "O(amount)")

add(120, "Triangle", "Medium", "1-D Dynamic Programming", "Bottom-Up In-Place Triangle DP",
    "Find minimum path sum from top to bottom of triangle.",
    '''def minimumTotal(triangle):
    dp = list(triangle[-1])
    for row in range(len(triangle) - 2, -1, -1):
        for col in range(len(triangle[row])):
            dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])
    return dp[0]

triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
print("Min triangle path:", minimumTotal(triangle))''', "O(n^2)", "O(n)")

add(935, "Knight Dialer", "Medium", "1-D Dynamic Programming", "State Transition Array",
    "Count distinct phone numbers of length n knight can dial on keypad.",
    '''def knightDialer(n):
    MOD = 10**9 + 7
    moves = {
        0: [4, 6], 1: [6, 8], 2: [7, 9], 3: [4, 8],
        4: [0, 3, 9], 5: [], 6: [0, 1, 7], 7: [2, 6], 8: [1, 3], 9: [2, 4]
    }
    dp = [1] * 10
    for _ in range(n - 1):
        next_dp = [0] * 10
        for num in range(10):
            for nxt in moves[num]:
                next_dp[nxt] = (next_dp[nxt] + dp[num]) % MOD
        dp = next_dp
    return sum(dp) % MOD

print("Knight dialer (n=2):", knightDialer(2))''', "O(n)", "O(1)")

add(1025, "Divisor Game", "Easy", "1-D Dynamic Programming", "Game Parity Check",
    "Determine if Alice wins divisor game where players subtract factor x (0 < x < n).",
    '''def divisorGame(n):
    return n % 2 == 0

print("Alice wins (n=2):", divisorGame(2))''', "O(1)", "O(1)")

# ===========================================================================
# 14. 2-D DYNAMIC PROGRAMMING (18 Problems, IDs 263-280)
# ===========================================================================
add(62, "Unique Paths", "Medium", "2-D Dynamic Programming", "2D Grid Addition DP",
    "Find number of possible unique paths robot can take from top-left to bottom-right.",
    '''def uniquePaths(m, n):
    row = [1] * n
    for _ in range(m - 1):
        newRow = [1] * n
        for j in range(n - 2, -1, -1):
            newRow[j] = newRow[j + 1] + row[j]
        row = newRow
    return row[0]

print("Unique paths (3x7):", uniquePaths(3, 7))''', "O(m * n)", "O(n)")

add(63, "Unique Paths II", "Medium", "2-D Dynamic Programming", "Grid DP with Obstacles",
    "Find unique paths from top-left to bottom-right avoiding obstacles marked as 1.",
    '''def uniquePathsWithObstacles(obstacleGrid):
    m, n = len(obstacleGrid), len(obstacleGrid[0])
    dp = [0] * n
    dp[n - 1] = 1
    for r in range(m - 1, -1, -1):
        for c in range(n - 1, -1, -1):
            if obstacleGrid[r][c] == 1: dp[c] = 0
            elif c + 1 < n: dp[c] = dp[c] + dp[c + 1]
    return dp[0]

grid = [[0,0,0],[0,1,0],[0,0,0]]
print("Unique paths with obstacles:", uniquePathsWithObstacles(grid))''', "O(m * n)", "O(n)")

add(64, "Minimum Path Sum", "Medium", "2-D Dynamic Programming", "Grid Path Weight Minimization",
    "Find path from top-left to bottom-right which minimizes sum of all numbers along its path.",
    '''def minPathSum(grid):
    m, n = len(grid), len(grid[0])
    for r in range(m):
        for c in range(n):
            if r == 0 and c == 0: continue
            elif r == 0: grid[r][c] += grid[r][c - 1]
            elif c == 0: grid[r][c] += grid[r - 1][c]
            else: grid[r][c] += min(grid[r - 1][c], grid[r][c - 1])
    return grid[m - 1][n - 1]

grid = [[1,3,1],[1,5,1],[4,2,1]]
print("Min path sum:", minPathSum(grid))''', "O(m * n)", "O(1)")

add(1143, "Longest Common Subsequence", "Medium", "2-D Dynamic Programming", "2D Subsequence Match Matrix",
    "Find length of longest common subsequence between two strings in O(m * n).",
    '''def longestCommonSubsequence(text1, text2):
    dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]
    for i in range(len(text1) - 1, -1, -1):
        for j in range(len(text2) - 1, -1, -1):
            if text1[i] == text2[j]:
                dp[i][j] = 1 + dp[i + 1][j + 1]
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
    return dp[0][0]

print("LCS length:", longestCommonSubsequence("abcde", "ace"))''', "O(m * n)", "O(m * n)")

add(309, "Best Time to Buy and Sell Stock with Cooldown", "Medium", "2-D Dynamic Programming", "State Machine DP",
    "Maximize profit with unlimited transactions but 1-day cooldown after selling.",
    '''def maxProfitCooldown(prices):
    dp = {} # key: (i, buying)
    def dfs(i, buying):
        if i >= len(prices): return 0
        if (i, buying) in dp: return dp[(i, buying)]
        cooldown = dfs(i + 1, buying)
        if buying:
            buy = dfs(i + 1, False) - prices[i]
            dp[(i, buying)] = max(buy, cooldown)
        else:
            sell = dfs(i + 2, True) + prices[i]
            dp[(i, buying)] = max(sell, cooldown)
        return dp[(i, buying)]
    return dfs(0, True)

print("Profit with cooldown:", maxProfitCooldown([1, 2, 3, 0, 2]))''', "O(n)", "O(n)")

add(714, "Best Time to Buy and Sell Stock with Transaction Fee", "Medium", "2-D Dynamic Programming", "2-State Buy/Sell DP",
    "Maximize profit from stock trading with transaction fee per completed transaction.",
    '''def maxProfitFee(prices, fee):
    cash, hold = 0, -prices[0]
    for p in prices[1:]:
        cash = max(cash, hold + p - fee)
        hold = max(hold, cash - p)
    return cash

print("Profit with fee:", maxProfitFee([1, 3, 2, 8, 4, 9], 2))''', "O(n)", "O(1)")

add(494, "Target Sum", "Medium", "2-D Dynamic Programming", "Memoized Decision Tree / Subset Sum",
    "Assign '+' or '-' to integers to make sum equal to target.",
    '''def findTargetSumWays(nums, target):
    dp = {}
    def backtrack(i, total):
        if (i, total) in dp: return dp[(i, total)]
        if i == len(nums): return 1 if total == target else 0
        dp[(i, total)] = backtrack(i + 1, total + nums[i]) + backtrack(i + 1, total - nums[i])
        return dp[(i, total)]
    return backtrack(0, 0)

print("Target sum ways:", findTargetSumWays([1, 1, 1, 1, 1], 3))''', "O(n * sum)", "O(n * sum)")

add(97, "Interleaving String", "Medium", "2-D Dynamic Programming", "2D Grid Substring Matching",
    "Check whether s3 is formed by interleaving of s1 and s2.",
    '''def isInterleave(s1, s2, s3):
    if len(s1) + len(s2) != len(s3): return False
    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]
    dp[len(s1)][len(s2)] = True
    for i in range(len(s1), -1, -1):
        for j in range(len(s2), -1, -1):
            if i < len(s1) and s1[i] == s3[i + j] and dp[i + 1][j]:
                dp[i][j] = True
            if j < len(s2) and s2[j] == s3[i + j] and dp[i][j + 1]:
                dp[i][j] = True
    return dp[0][0]

print("Is interleaved:", isInterleave("aabcc", "dbbca", "aadbbcbcac"))''', "O(m * n)", "O(m * n)")

add(329, "Longest Increasing Path in a Matrix", "Hard", "2-D Dynamic Programming", "Memoized 2D DFS",
    "Find length of longest increasing path in matrix moving up, down, left, right.",
    '''def longestIncreasingPath(matrix):
    rows, cols = len(matrix), len(matrix[0])
    dp = {}
    def dfs(r, c, prevVal):
        if r < 0 or r >= rows or c < 0 or c >= cols or matrix[r][c] <= prevVal: return 0
        if (r, c) in dp: return dp[(r, c)]
        res = 1
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            res = max(res, 1 + dfs(r + dr, c + dc, matrix[r][c]))
        dp[(r, c)] = res
        return res
    for r in range(rows):
        for c in range(cols): dfs(r, c, -1)
    return max(dp.values())

mat = [[9,9,4],[6,6,8],[2,1,1]]
print("Longest path:", longestIncreasingPath(mat))''', "O(m * n)", "O(m * n)")

add(115, "Distinct Subsequences", "Hard", "2-D Dynamic Programming", "2D Alignment Matching Matrix",
    "Count number of distinct subsequences of s which equals t.",
    '''def numDistinct(s, t):
    dp = {}
    def dfs(i, j):
        if j == len(t): return 1
        if i == len(s): return 0
        if (i, j) in dp: return dp[(i, j)]
        if s[i] == t[j]:
            dp[(i, j)] = dfs(i + 1, j + 1) + dfs(i + 1, j)
        else:
            dp[(i, j)] = dfs(i + 1, j)
        return dp[(i, j)]
    return dfs(0, 0)

print("Distinct subsequences:", numDistinct("rabbbit", "rabbit"))''', "O(m * n)", "O(m * n)")

add(72, "Edit Distance", "Medium", "2-D Dynamic Programming", "Insert, Delete, Replace DP",
    "Return minimum operations (insert, delete, replace) required to convert word1 to word2.",
    '''def minDistance(word1, word2):
    dp = [[float("inf")] * (len(word2) + 1) for _ in range(len(word1) + 1)]
    for j in range(len(word2) + 1): dp[len(word1)][j] = len(word2) - j
    for i in range(len(word1) + 1): dp[i][len(word2)] = len(word1) - i
    for i in range(len(word1) - 1, -1, -1):
        for j in range(len(word2) - 1, -1, -1):
            if word1[i] == word2[j]: dp[i][j] = dp[i + 1][j + 1]
            else:
                dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])
    return dp[0][0]

print("Edit distance:", minDistance("horse", "ros"))''', "O(m * n)", "O(m * n)")

add(312, "Burst Balloons", "Hard", "2-D Dynamic Programming", "Interval Matrix DP",
    "Burst balloons to maximize coins collected.",
    '''def maxCoins(nums):
    nums = [1] + nums + [1]
    dp = {}
    def dfs(l, r):
        if l > r: return 0
        if (l, r) in dp: return dp[(l, r)]
        dp[(l, r)] = 0
        for i in range(l, r + 1):
            coins = nums[l - 1] * nums[i] * nums[r + 1]
            coins += dfs(l, i - 1) + dfs(i + 1, r)
            dp[(l, r)] = max(dp[(l, r)], coins)
        return dp[(l, r)]
    return dfs(1, len(nums) - 2)

print("Max coins:", maxCoins([3, 1, 5, 8]))''', "O(n^3)", "O(n^2)")

add(10, "Regular Expression Matching", "Hard", "2-D Dynamic Programming", "'.' and '*' 2D Transition DP",
    "Implement regular expression matching with support for '.' and '*'.",
    '''def isMatch(s, p):
    dp = {}
    def dfs(i, j):
        if (i, j) in dp: return dp[(i, j)]
        if i >= len(s) and j >= len(p): return True
        if j >= len(p): return False
        match = i < len(s) and (s[i] == p[j] or p[j] == ".")
        if (j + 1) < len(p) and p[j + 1] == "*":
            dp[(i, j)] = dfs(i, j + 2) or (match and dfs(i + 1, j))
            return dp[(i, j)]
        if match:
            dp[(i, j)] = dfs(i + 1, j + 1)
            return dp[(i, j)]
        dp[(i, j)] = False
        return False
    return dfs(0, 0)

print("Regex match:", isMatch("aa", "a*"))''', "O(m * n)", "O(m * n)")

add(44, "Wildcard Matching", "Hard", "2-D Dynamic Programming", "'?' and '*' 2D DP",
    "Implement wildcard pattern matching with support for '?' and '*'.",
    '''def isWildcardMatch(s, p):
    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
    dp[0][0] = True
    for j in range(1, len(p) + 1):
        if p[j - 1] == "*": dp[0][j] = dp[0][j - 1]
    for i in range(1, len(s) + 1):
        for j in range(1, len(p) + 1):
            if p[j - 1] == "*":
                dp[i][j] = dp[i - 1][j] or dp[i][j - 1]
            elif p[j - 1] == "?" or s[i - 1] == p[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
    return dp[len(s)][len(p)]

print("Wildcard match:", isWildcardMatch("cb", "?a"))''', "O(m * n)", "O(m * n)")

add(516, "Longest Palindromic Subsequence", "Medium", "2-D Dynamic Programming", "Reverse String LCS",
    "Find longest palindromic subsequence's length in string s.",
    '''def longestPalindromeSubseq(s):
    t = s[::-1]
    n = len(s)
    dp = [[0] * (n + 1) for _ in range(n + 1)]
    for i in range(n - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if s[i] == t[j]: dp[i][j] = 1 + dp[i + 1][j + 1]
            else: dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
    return dp[0][0]

print("Longest pal subseq:", longestPalindromeSubseq("bbbab"))''', "O(n^2)", "O(n^2)")

add(583, "Delete Operation for Two Strings", "Medium", "2-D Dynamic Programming", "LCS Subtraction",
    "Find minimum number of steps to make word1 and word2 the same.",
    '''def minDistanceStrings(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if word1[i] == word2[j]: dp[i][j] = 1 + dp[i + 1][j + 1]
            else: dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
    lcs = dp[0][0]
    return (m - lcs) + (n - lcs)

print("Deletions needed:", minDistanceStrings("sea", "eat"))''', "O(m * n)", "O(m * n)")

add(712, "Minimum ASCII Delete Sum for Two Strings", "Medium", "2-D Dynamic Programming", "ASCII Weighted LCS",
    "Return the lowest ASCII sum of deleted characters to make two strings equal.",
    '''def minimumDeleteSum(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m - 1, -1, -1): dp[i][n] = dp[i + 1][n] + ord(s1[i])
    for j in range(n - 1, -1, -1): dp[m][j] = dp[m][j + 1] + ord(s2[j])
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if s1[i] == s2[j]: dp[i][j] = dp[i + 1][j + 1]
            else: dp[i][j] = min(ord(s1[i]) + dp[i + 1][j], ord(s2[j]) + dp[i][j + 1])
    return dp[0][0]

print("Min ASCII delete sum:", minimumDeleteSum("sea", "eat"))''', "O(m * n)", "O(m * n)")

add(221, "Maximal Square", "Medium", "2-D Dynamic Programming", "Min of 3 Neighbors DP",
    "Find largest square containing only 1s in a binary matrix and return its area.",
    '''def maximalSquare(matrix):
    rows, cols = len(matrix), len(matrix[0])
    dp = [[0] * (cols + 1) for _ in range(rows + 1)]
    max_side = 0
    for r in range(rows - 1, -1, -1):
        for c in range(cols - 1, -1, -1):
            if matrix[r][c] == "1":
                dp[r][c] = 1 + min(dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1])
                max_side = max(max_side, dp[r][c])
    return max_side * max_side

mat = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
print("Max square area:", maximalSquare(mat))''', "O(m * n)", "O(m * n)")

# ===========================================================================
# 15. GREEDY (10 Problems, IDs 281-290)
# ===========================================================================
add(55, "Jump Game", "Medium", "Greedy", "Max Reachable Index",
    "Determine if you can reach the last index starting from index 0.",
    '''def canJump(nums):
    goal = len(nums) - 1
    for i in range(len(nums) - 2, -1, -1):
        if i + nums[i] >= goal:
            goal = i
    return goal == 0

print("Can jump:", canJump([2, 3, 1, 1, 4]))''', "O(n)", "O(1)")

add(45, "Jump Game II", "Medium", "Greedy", "BFS Window Boundaries",
    "Return minimum number of jumps to reach last index.",
    '''def jump(nums):
    res = 0
    l, r = 0, 0
    while r < len(nums) - 1:
        farthest = 0
        for i in range(l, r + 1):
            farthest = max(farthest, i + nums[i])
        l = r + 1
        r = farthest
        res += 1
    return res

print("Min jumps:", jump([2, 3, 1, 1, 4]))''', "O(n)", "O(1)")

add(134, "Gas Station", "Medium", "Greedy", "Total Difference & Start Reset",
    "Return starting gas station index if you can travel around circuit once clockwise.",
    '''def canCompleteCircuit(gas, cost):
    if sum(gas) < sum(cost): return -1
    total, start = 0, 0
    for i in range(len(gas)):
        total += gas[i] - cost[i]
        if total < 0:
            total = 0
            start = i + 1
    return start

print("Start station:", canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]))''', "O(n)", "O(1)")

add(846, "Hand of Straights", "Medium", "Greedy", "Min Frequency Consecutive Groups",
    "Rearrange cards into groups of groupSize consecutive cards.",
    '''def isNStraightHand(hand, groupSize):
    if len(hand) % groupSize: return False
    count = {}
    for c in hand: count[c] = count.get(c, 0) + 1
    for c in sorted(count):
        if count[c] > 0:
            cnt = count[c]
            for i in range(c, c + groupSize):
                if count.get(i, 0) < cnt: return False
                count[i] -= cnt
    return True

print("Valid hand:", isNStraightHand([1,2,3,6,2,3,4,7,8], 3))''', "O(n log n)", "O(n)")

add(1899, "Merge Triplets to Form Target Triplet", "Medium", "Greedy", "Greedy Valid Element Filter",
    "Determine if target triplet can be obtained by taking component-wise maximums.",
    '''def mergeTriplets(triplets, target):
    good = set()
    for t in triplets:
        if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]: continue
        for i, val in enumerate(t):
            if val == target[i]: good.add(i)
    return len(good) == 3

triplets = [[2,5,3],[1,8,4],[1,7,5]]
print("Can form target:", mergeTriplets(triplets, [2,7,5]))''', "O(n)", "O(1)")

add(763, "Partition Labels", "Medium", "Greedy", "Last Occurrence Interval Expansion",
    "Partition string into as many parts as possible so each letter appears in at most one part.",
    '''def partitionLabels(s):
    lastIdx = {c: i for i, c in enumerate(s)}
    res = []
    size, end = 0, 0
    for i, c in enumerate(s):
        size += 1
        end = max(end, lastIdx[c])
        if i == end:
            res.append(size)
            size = 0
    return res

print("Partitions:", partitionLabels("ababcbacadefegdehijhklij"))''', "O(n)", "O(1)")

add(678, "Valid Parenthesis String", "Medium", "Greedy", "Min/Max Open Parenthesis Range",
    "Check valid parenthesis string where '*' can be '(', ')', or empty ''.",
    '''def checkValidString(s):
    cmin, cmax = 0, 0
    for c in s:
        if c == "(":
            cmin += 1; cmax += 1
        elif c == ")":
            cmin = max(cmin - 1, 0)
            cmax -= 1
        else:
            cmin = max(cmin - 1, 0)
            cmax += 1
        if cmax < 0: return False
    return cmin == 0

print("Valid with *:", checkValidString("(*))"))''', "O(n)", "O(1)")

add(605, "Can Place Flowers", "Easy", "Greedy", "Adjacent Zeroes Check",
    "Check if n new flowers can be planted without violating no-adjacent-flowers rule.",
    '''def canPlaceFlowers(flowerbed, n):
    f = [0] + flowerbed + [0]
    for i in range(1, len(f) - 1):
        if f[i - 1] == 0 and f[i] == 0 and f[i + 1] == 0:
            f[i] = 1
            n -= 1
    return n <= 0

print("Can plant 1:", canPlaceFlowers([1,0,0,0,1], 1))''', "O(n)", "O(1)")

add(455, "Assign Cookies", "Easy", "Greedy", "Sort Both + Two Pointers",
    "Maximize number of content children given greed factors and cookie sizes.",
    '''def findContentChildren(g, s):
    g.sort(); s.sort()
    child, cookie = 0, 0
    while child < len(g) and cookie < len(s):
        if s[cookie] >= g[child]:
            child += 1
        cookie += 1
    return child

print("Content children:", findContentChildren([1, 2, 3], [1, 1]))''', "O(n log n + m log m)", "O(1)")

add(860, "Lemonade Change", "Easy", "Greedy", "Bill Denomination Greedy Change",
    "Determine if you can provide every customer with correct change given bills 5, 10, 20.",
    '''def lemonadeChange(bills):
    five, ten = 0, 0
    for b in bills:
        if b == 5: five += 1
        elif b == 10:
            if five == 0: return False
            five -= 1; ten += 1
        else:
            if ten > 0 and five > 0:
                ten -= 1; five -= 1
            elif five >= 3:
                five -= 3
            else: return False
    return True

print("Can change:", lemonadeChange([5, 5, 5, 10, 20]))''', "O(n)", "O(1)")

# ===========================================================================
# 16. INTERVALS (4 Problems, IDs 291-294)
# ===========================================================================
add(57, "Insert Interval", "Medium", "Intervals", "Slice Left, Merge, Slice Right",
    "Insert newInterval into sorted non-overlapping intervals and merge if necessary.",
    '''def insert(intervals, newInterval):
    res = []
    for i in range(len(intervals)):
        if newInterval[1] < intervals[i][0]:
            res.append(newInterval)
            return res + intervals[i:]
        elif newInterval[0] > intervals[i][1]:
            res.append(intervals[i])
        else:
            newInterval = [min(newInterval[0], intervals[i][0]), max(newInterval[1], intervals[i][1])]
    res.append(newInterval)
    return res

print("Inserted:", insert([[1,3],[6,9]], [2,5]))''', "O(n)", "O(n)")

add(56, "Merge Intervals", "Medium", "Intervals", "Sort Start Times + Overlap Merge",
    "Merge all overlapping intervals into non-overlapping intervals covering all intervals.",
    '''def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    output = [intervals[0]]
    for start, end in intervals[1:]:
        lastEnd = output[-1][1]
        if start <= lastEnd:
            output[-1][1] = max(lastEnd, end)
        else:
            output.append([start, end])
    return output

print("Merged:", merge([[1,3],[2,6],[8,10],[15,18]]))''', "O(n log n)", "O(n)")

add(252, "Meeting Rooms", "Easy", "Intervals", "Adjacent Overlap Check",
    "Determine if person could attend all meetings without overlapping time conflicts.",
    '''def canAttendMeetings(intervals):
    intervals.sort(key=lambda x: x[0])
    for i in range(len(intervals) - 1):
        if intervals[i][1] > intervals[i + 1][0]: return False
    return True

print("Can attend all:", canAttendMeetings([[0,30],[5,10],[15,20]]))''', "O(n log n)", "O(1)")

add(435, "Non-overlapping Intervals", "Medium", "Intervals", "Greedy Earliest End Time",
    "Find minimum number of intervals to remove to make rest non-overlapping.",
    '''def eraseOverlapIntervals(intervals):
    intervals.sort(key=lambda x: x[1])
    count = 0
    prev_end = float("-inf")
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            count += 1
    return count

print("Intervals to erase:", eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]))''', "O(n log n)", "O(1)")

# ===========================================================================
# 17. BIT MANIPULATION (6 Problems, IDs 295-300)
# ===========================================================================
add(191, "Number of 1 Bits", "Easy", "Bit Manipulation", "Brian Kernighan's Algorithm",
    "Return the number of '1' bits in integer using n & (n - 1) bit clearing.",
    '''def hammingWeight(n):
    res = 0
    while n:
        n &= (n - 1)
        res += 1
    return res

print("Set bits in 11 (1011):", hammingWeight(11))''', "O(1)", "O(1)")

add(338, "Counting Bits", "Easy", "Bit Manipulation", "dp[i] = dp[i >> 1] + (i & 1)",
    "Return array ans where ans[i] is number of 1's in binary representation of i.",
    '''def countBits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp

print("Bits 0..5:", countBits(5))''', "O(n)", "O(n)")

add(190, "Reverse Bits", "Easy", "Bit Manipulation", "32-Bit Reversal Shift",
    "Reverse bits of a given 32 bits unsigned integer.",
    '''def reverseBits(n):
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    return res

print("Reversed bits of 43261596:", reverseBits(43261596))''', "O(1)", "O(1)")

add(371, "Sum of Two Integers", "Medium", "Bit Manipulation", "Bitwise Addition without + or -",
    "Calculate the sum of two integers a and b using bitwise operations.",
    '''def getSum(a, b):
    mask = 0xFFFFFFFF
    while (b & mask) > 0:
        carry = (a & b) << 1
        a = (a ^ b)
        b = carry
    return (a & mask) if b > 0 else a

print("Sum 1 + 2:", getSum(1, 2))''', "O(1)", "O(1)")

add(137, "Single Number II", "Medium", "Bit Manipulation", "Bitwise Modulo 3 Count",
    "Every element appears three times except for one which appears exactly once.",
    '''def singleNumberII(nums):
    ones, twos = 0, 0
    for n in nums:
        ones = (ones ^ n) & ~twos
        twos = (twos ^ n) & ~ones
    return ones

print("Single in triplets:", singleNumberII([2, 2, 3, 2]))''', "O(n)", "O(1)")

add(260, "Single Number III", "Medium", "Bit Manipulation", "Lowest Set Bit Partition",
    "Two elements appear only once while all others appear twice. Find the two unique elements.",
    '''def singleNumberIII(nums):
    xor = 0
    for n in nums: xor ^= n
    diff = xor & (-xor)
    a, b = 0, 0
    for n in nums:
        if n & diff: a ^= n
        else: b ^= n
    return [a, b]

print("Two singles:", singleNumberIII([1, 2, 1, 3, 2, 5]))''', "O(n)", "O(1)")

print(f"Total problems generated: {len(problems)}")
assert len(problems) == 300, f"Expected 300 problems, got {len(problems)}"

# Verify distinct IDs and titles
ids = [p["id"] for p in problems]
titles = [p["title"] for p in problems]
assert len(set(ids)) == 300, "Duplicate IDs found!"
assert len(set(titles)) == 300, "Duplicate titles found!"

# Write out to app_build/dsa_problems.js
target_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_problems.js"
js_content = f"// app_build/dsa_problems.js — 300 Curated, Distinct LeetCode & DSA Problems\n// Real, identifiable problems across 18 core DSA topics\nwindow.DSA_PROBLEMS_LIBRARY = {json.dumps(problems, indent=2)};\n"

with open(target_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully wrote {len(problems)} problems to {target_path}!")
