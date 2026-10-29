# scratch/build_all_problems.py
import json
import os

problems = []

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

# ---------------------------------------------------------------------------
# 1. ARRAYS & HASHING (30 Problems, IDs 1-30)
# ---------------------------------------------------------------------------
add(1, "Two Sum", "Easy", "Arrays & Hashing", "Hash Map Lookup",
    "Find indices of two numbers that add up to a target using a dictionary for instant lookups.",
    '''def twoSum(nums, target):
    prevMap = {}
    for i in range(len(nums)):
        diff = target - nums[i]
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[nums[i]] = i
    return []

nums = [2, 7, 11, 15]
target = 9
print("Indices:", twoSum(nums, target))''', "O(n)", "O(n)")

add(217, "Contains Duplicate", "Easy", "Arrays & Hashing", "Hash Set",
    "Determine if any value appears at least twice in the array using a set.",
    '''def containsDuplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False

nums = [1, 2, 3, 1]
print("Has duplicate:", containsDuplicate(nums))''', "O(n)", "O(n)")

add(242, "Valid Anagram", "Easy", "Arrays & Hashing", "Frequency Counter",
    "Check if string t is an anagram of string s by counting character occurrences.",
    '''def isAnagram(s, t):
    if len(s) != len(t):
        return False
    countS = {}
    countT = {}
    for ch in s:
        countS[ch] = countS.get(ch, 0) + 1
    for ch in t:
        countT[ch] = countT.get(ch, 0) + 1
    return countS == countT

print("Is anagram:", isAnagram("anagram", "nagaram"))''', "O(n)", "O(1)")

add(49, "Group Anagrams", "Medium", "Arrays & Hashing", "Categorization by Key",
    "Group strings that are anagrams together by sorting or frequency tuple keys.",
    '''def groupAnagrams(strs):
    ansMap = {}
    for s in strs:
        key = "".join(sorted(s))
        if key not in ansMap:
            ansMap[key] = []
        ansMap[key].append(s)
    return list(ansMap.values())

strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
print("Groups:", groupAnagrams(strs))''', "O(m * n log n)", "O(m * n)")

add(347, "Top K Frequent Elements", "Medium", "Arrays & Hashing", "Bucket Sort / Frequency Map",
    "Find the k most frequent elements in an array using frequency counting.",
    '''def topKFrequent(nums, k):
    count = {}
    for n in nums:
        count[n] = count.get(n, 0) + 1
    sorted_items = sorted(count.items(), key=lambda item: item[1], reverse=True)
    return [item[0] for item in sorted_items[:k]]

nums = [1, 1, 1, 2, 2, 3]
print("Top K:", topKFrequent(nums, 2))''', "O(n log n)", "O(n)")

add(238, "Product of Array Except Self", "Medium", "Arrays & Hashing", "Prefix & Suffix Products",
    "Calculate products of all elements except nums[i] in O(n) without division.",
    '''def productExceptSelf(nums):
    res = [1] * len(nums)
    prefix = 1
    for i in range(len(nums)):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(len(nums) - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    return res

print("Products:", productExceptSelf([1, 2, 3, 4]))''', "O(n)", "O(1)")

add(36, "Valid Sudoku", "Medium", "Arrays & Hashing", "2D Hash Set Tracking",
    "Verify that each row, column, and 3x3 box contains unique digits 1-9.",
    '''def isValidSudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == ".": continue
            box_idx = (r // 3) * 3 + (c // 3)
            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                return False
            rows[r].add(val)
            cols[c].add(val)
            boxes[box_idx].add(val)
    return True

mini_board = [["5","3",".",".","7",".",".",".","."]] + [["."]*9]*8
print("Valid:", isValidSudoku(mini_board))''', "O(1)", "O(1)")

add(128, "Longest Consecutive Sequence", "Medium", "Arrays & Hashing", "Hash Set Streak Building",
    "Find length of the longest consecutive elements sequence in O(n) time.",
    '''def longestConsecutive(nums):
    numSet = set(nums)
    longest = 0
    for n in numSet:
        if (n - 1) not in numSet:
            length = 1
            while (n + length) in numSet:
                length += 1
            if length > longest:
                longest = length
    return longest

print("Longest streak:", longestConsecutive([100, 4, 200, 1, 3, 2]))''', "O(n)", "O(n)")

add(169, "Majority Element", "Easy", "Arrays & Hashing", "Boyer-Moore Voting",
    "Find the element appearing more than n/2 times in O(1) space.",
    '''def majorityElement(nums):
    candidate = None
    count = 0
    for n in nums:
        if count == 0:
            candidate = n
        if n == candidate:
            count += 1
        else:
            count -= 1
    return candidate

print("Majority:", majorityElement([2, 2, 1, 1, 1, 2, 2]))''', "O(n)", "O(1)")

add(136, "Single Number", "Easy", "Arrays & Hashing", "Bitwise XOR",
    "Every element appears twice except for one. Find that single element.",
    '''def singleNumber(nums):
    res = 0
    for n in nums:
        res ^= n
    return res

print("Single:", singleNumber([4, 1, 2, 1, 2]))''', "O(n)", "O(1)")

add(448, "Find All Numbers Disappeared in an Array", "Easy", "Arrays & Hashing", "In-Place Index Tagging",
    "Find all integers in range [1, n] that do not appear in the array.",
    '''def findDisappearedNumbers(nums):
    for i in range(len(nums)):
        idx = abs(nums[i]) - 1
        if nums[idx] > 0:
            nums[idx] = -nums[idx]
    missing = []
    for i in range(len(nums)):
        if nums[i] > 0:
            missing.append(i + 1)
    return missing

print("Disappeared:", findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]))''', "O(n)", "O(1)")

add(268, "Missing Number", "Easy", "Arrays & Hashing", "Sum Formula",
    "Given array containing n distinct numbers in range [0, n], return missing number.",
    '''def missingNumber(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    return expected_sum - sum(nums)

print("Missing:", missingNumber([3, 0, 1]))''', "O(n)", "O(1)")

add(283, "Move Zeroes", "Easy", "Arrays & Hashing", "Two Pointers Writer",
    "Move all 0s to end while maintaining relative order of non-zero elements.",
    '''def moveZeroes(nums):
    writer = 0
    for reader in range(len(nums)):
        if nums[reader] != 0:
            nums[writer], nums[reader] = nums[reader], nums[writer]
            writer += 1
    return nums

print("Move zeroes:", moveZeroes([0, 1, 0, 3, 12]))''', "O(n)", "O(1)")

add(66, "Plus One", "Easy", "Arrays & Hashing", "Array Simulation",
    "Increment large integer represented as array of digits by one.",
    '''def plusOne(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits

print("Plus one:", plusOne([1, 2, 9]))''', "O(n)", "O(1)")

add(485, "Max Consecutive Ones", "Easy", "Arrays & Hashing", "Linear Scan",
    "Find the maximum number of consecutive 1s in a binary array.",
    '''def findMaxConsecutiveOnes(nums):
    max_count = 0
    curr = 0
    for n in nums:
        if n == 1:
            curr += 1
            if curr > max_count:
                max_count = curr
        else:
            curr = 0
    return max_count

print("Max 1s:", findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]))''', "O(n)", "O(1)")

add(560, "Subarray Sum Equals K", "Medium", "Arrays & Hashing", "Prefix Sum + Hash Map",
    "Find total number of subarrays whose sum equals k using prefix frequencies.",
    '''def subarraySum(nums, k):
    count = 0
    curr_sum = 0
    prefix_map = {0: 1}
    for n in nums:
        curr_sum += n
        diff = curr_sum - k
        if diff in prefix_map:
            count += prefix_map[diff]
        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
    return count

print("Subarrays:", subarraySum([1, 1, 1], 2))''', "O(n)", "O(n)")

add(525, "Contiguous Array", "Medium", "Arrays & Hashing", "Prefix Balance Tracking",
    "Find maximum length of contiguous subarray with equal number of 0s and 1s.",
    '''def findMaxLength(nums):
    max_len = 0
    balance = 0
    seen = {0: -1}
    for i in range(len(nums)):
        balance += 1 if nums[i] == 1 else -1
        if balance in seen:
            length = i - seen[balance]
            if length > max_len:
                max_len = length
        else:
            seen[balance] = i
    return max_len

print("Max len:", findMaxLength([0, 1, 0, 0, 1, 1, 0]))''', "O(n)", "O(n)")

add(189, "Rotate Array", "Medium", "Arrays & Hashing", "Array Reversal Triplets",
    "Rotate array to right by k steps using in-place triple reversal.",
    '''def rotate(nums, k):
    k = k % len(nums)
    def rev(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    rev(0, len(nums) - 1)
    rev(0, k - 1)
    rev(k, len(nums) - 1)
    return nums

print("Rotated:", rotate([1, 2, 3, 4, 5, 6, 7], 3))''', "O(n)", "O(1)")

add(48, "Rotate Image", "Medium", "Arrays & Hashing", "Transpose and Reverse",
    "Rotate n x n 2D matrix by 90 degrees clockwise in-place.",
    '''def rotateImage(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for i in range(n):
        matrix[i].reverse()
    return matrix

mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print("Rotated:", rotateImage(mat))''', "O(n^2)", "O(1)")

add(73, "Set Matrix Zeroes", "Medium", "Arrays & Hashing", "First Row/Col Markers",
    "If an element is 0, set its entire row and column to 0 in-place.",
    '''def setZeroes(matrix):
    m, n = len(matrix), len(matrix[0])
    first_col_zero = any(matrix[r][0] == 0 for r in range(m))
    for r in range(m):
        for c in range(1, n):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
    if matrix[0][0] == 0:
        for c in range(n): matrix[0][c] = 0
    if first_col_zero:
        for r in range(m): matrix[r][0] = 0
    return matrix

print("Zeroes:", setZeroes([[1,1,1],[1,0,1],[1,1,1]]))''', "O(m*n)", "O(1)")

add(54, "Spiral Matrix", "Medium", "Arrays & Hashing", "Boundary Shrinking",
    "Return all elements of matrix in spiral order by contracting boundaries.",
    '''def spiralOrder(matrix):
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while left <= right and top <= bottom:
        for c in range(left, right + 1): res.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1): res.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1): res.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1): res.append(matrix[r][left])
            left += 1
    return res

print("Spiral:", spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))''', "O(m*n)", "O(1)")

add(75, "Sort Colors", "Medium", "Arrays & Hashing", "Dutch National Flag (3 Pointers)",
    "Sort array of 0s, 1s, and 2s in-place in a single pass.",
    '''def sortColors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums

print("Sorted:", sortColors([2, 0, 2, 1, 1, 0]))''', "O(n)", "O(1)")

add(229, "Majority Element II", "Medium", "Arrays & Hashing", "Extended Boyer-Moore",
    "Find all elements that appear more than n/3 times in linear time and O(1) space.",
    '''def majorityElementII(nums):
    c1, c2, n1, n2 = None, None, 0, 0
    for n in nums:
        if n == c1: n1 += 1
        elif n == c2: n2 += 1
        elif n1 == 0: c1, n1 = n, 1
        elif n2 == 0: c2, n2 = n, 1
        else: n1 -= 1; n2 -= 1
    res = []
    if nums.count(c1) > len(nums) // 3: res.append(c1)
    if c2 != c1 and nums.count(c2) > len(nums) // 3: res.append(c2)
    return res

print("Majority > n/3:", majorityElementII([3, 2, 3]))''', "O(n)", "O(1)")

add(41, "First Missing Positive", "Hard", "Arrays & Hashing", "Index as Hash Key",
    "Find the smallest positive integer missing from an unsorted array in O(n) and O(1) space.",
    '''def firstMissingPositive(nums):
    n = len(nums)
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            t = nums[i] - 1
            nums[i], nums[t] = nums[t], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1

print("First missing:", firstMissingPositive([3, 4, -1, 1]))''', "O(n)", "O(1)")

add(14, "Longest Common Prefix", "Easy", "Arrays & Hashing", "Prefix Comparison",
    "Find the longest common prefix string amongst an array of strings.",
    '''def longestCommonPrefix(strs):
    if not strs: return ""
    p = strs[0]
    for s in strs[1:]:
        while not s.startswith(p):
            p = p[:-1]
            if not p: return ""
    return p

print("Prefix:", longestCommonPrefix(["flower","flow","flight"]))''', "O(S)", "O(1)")

add(58, "Length of Last Word", "Easy", "Arrays & Hashing", "Right-to-Left Traversal",
    "Return length of the last word in a string consisting of non-space characters.",
    '''def lengthOfLastWord(s):
    i = len(s) - 1
    length = 0
    while i >= 0 and s[i] == " ": i -= 1
    while i >= 0 and s[i] != " ":
        length += 1
        i -= 1
    return length

print("Last word len:", lengthOfLastWord("Hello World"))''', "O(n)", "O(1)")

add(387, "First Unique Character in a String", "Easy", "Arrays & Hashing", "Frequency Counting",
    "Find the first non-repeating character in a string and return its index.",
    '''def firstUniqChar(s):
    count = {}
    for ch in s: count[ch] = count.get(ch, 0) + 1
    for i, ch in enumerate(s):
        if count[ch] == 1: return i
    return -1

print("First unique:", firstUniqChar("leetcode"))''', "O(n)", "O(1)")

add(205, "Isomorphic Strings", "Easy", "Arrays & Hashing", "Dual Character Mapping",
    "Determine if characters in s can be replaced to get t using bijection maps.",
    '''def isIsomorphic(s, t):
    if len(s) != len(t): return False
    mST, mTS = {}, {}
    for c1, c2 in zip(s, t):
        if (c1 in mST and mST[c1] != c2) or (c2 in mTS and mTS[c2] != c1):
            return False
        mST[c1] = c2; mTS[c2] = c1
    return True

print("Isomorphic:", isIsomorphic("egg", "add"))''', "O(n)", "O(1)")

add(271, "Encode and Decode Strings", "Medium", "Arrays & Hashing", "Length-Prefix Delimiter",
    "Design an algorithm to encode a list of strings to a string and decode back.",
    '''def encode(strs):
    return "".join(str(len(s)) + "#" + s for s in strs)

def decode(s):
    res, i = [], 0
    while i < len(s):
        j = s.find("#", i)
        length = int(s[i:j])
        res.append(s[j + 1 : j + 1 + length])
        i = j + 1 + length
    return res

enc = encode(["neet","code"])
print("Decoded:", decode(enc))''', "O(n)", "O(n)")

add(380, "Insert Delete GetRandom O(1)", "Medium", "Arrays & Hashing", "Array + Hash Map Swap",
    "Design a data structure supporting insert, remove, and getRandom in O(1) time.",
    '''class RandomizedSet:
    def __init__(self):
        self.numMap = {}
        self.numList = []
    def insert(self, val):
        if val in self.numMap: return False
        self.numMap[val] = len(self.numList)
        self.numList.append(val)
        return True
    def remove(self, val):
        if val not in self.numMap: return False
        idx = self.numMap[val]
        last = self.numList[-1]
        self.numList[idx] = last
        self.numMap[last] = idx
        self.numList.pop()
        del self.numMap[val]
        return True

r = RandomizedSet()
r.insert(10)
r.insert(20)
print("Remove 10:", r.remove(10))''', "O(1)", "O(n)")

print(f"Total problems after Topic 1: {len(problems)}")
