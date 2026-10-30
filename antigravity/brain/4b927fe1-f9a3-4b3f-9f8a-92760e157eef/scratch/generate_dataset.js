// scratch/generate_dataset.js
const fs = require('fs');
const path = require('path');

const problems = [
  // ==========================================
  // TOPIC 1: ARRAYS & HASHING (30 Problems)
  // ==========================================
  {
    id: 1,
    leetcodeNumber: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Hash Map Lookup",
    description: "Find indices of two numbers that add up to a target using a dictionary for instant lookups.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    starterCode: `def twoSum(nums, target):
    prevMap = {}
    for i in range(len(nums)):
        diff = target - nums[i]
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[nums[i]] = i
    return []

nums = [2, 7, 11, 15]
target = 9
ans = twoSum(nums, target)
print("Indices:", ans)`
  },
  {
    id: 2,
    leetcodeNumber: 217,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Hash Set",
    description: "Determine if any value appears at least twice in the array using a set.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    starterCode: `def containsDuplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False

nums = [1, 2, 3, 1]
ans = containsDuplicate(nums)
print("Has duplicate:", ans)`
  },
  {
    id: 3,
    leetcodeNumber: 242,
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Frequency Counter",
    description: "Check if string t is an anagram of string s by counting character occurrences.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
    countS = {}
    countT = {}
    for ch in s:
        countS[ch] = countS.get(ch, 0) + 1
    for ch in t:
        countT[ch] = countT.get(ch, 0) + 1
    return countS == countT

s = "anagram"
t = "nagaram"
ans = isAnagram(s, t)
print("Is anagram:", ans)`
  },
  {
    id: 4,
    leetcodeNumber: 49,
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Categorization by Key",
    description: "Group strings that are anagrams together by sorting or frequency tuple keys.",
    timeComplexity: "O(m * n log n)",
    spaceComplexity: "O(m * n)",
    starterCode: `def groupAnagrams(strs):
    ansMap = {}
    for s in strs:
        key = "".join(sorted(s))
        if key not in ansMap:
            ansMap[key] = []
        ansMap[key].append(s)
    return list(ansMap.values())

strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
groups = groupAnagrams(strs)
print("Groups:", groups)`
  },
  {
    id: 5,
    leetcodeNumber: 347,
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Bucket Sort / Frequency Map",
    description: "Find the k most frequent elements in an array using frequency counting.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    starterCode: `def topKFrequent(nums, k):
    count = {}
    for n in nums:
        count[n] = count.get(n, 0) + 1
    
    # Sort keys by frequency descending
    sorted_items = sorted(count.items(), key=lambda item: item[1], reverse=True)
    return [item[0] for item in sorted_items[:k]]

nums = [1, 1, 1, 2, 2, 3]
k = 2
ans = topKFrequent(nums, k)
print("Top K:", ans)`
  },
  {
    id: 6,
    leetcodeNumber: 238,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Prefix & Suffix Products",
    description: "Calculate products of all elements except nums[i] in O(n) without division.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def productExceptSelf(nums):
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

nums = [1, 2, 3, 4]
ans = productExceptSelf(nums)
print("Products:", ans)`
  },
  {
    id: 7,
    leetcodeNumber: 36,
    title: "Valid Sudoku",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "2D Hash Set Tracking",
    description: "Verify that each row, column, and 3x3 box contains unique digits 1-9.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    starterCode: `def isValidSudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    
    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == ".":
                continue
            box_idx = (r // 3) * 3 + (c // 3)
            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                return False
            rows[r].add(val)
            cols[c].add(val)
            boxes[box_idx].add(val)
    return True

# Simple partial 4x4-style mini board for tracing
board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
print("Is valid:", isValidSudoku(board))`
  },
  {
    id: 8,
    leetcodeNumber: 128,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Hash Set Streak Building",
    description: "Find length of the longest consecutive elements sequence in O(n) time.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    starterCode: `def longestConsecutive(nums):
    numSet = set(nums)
    longest = 0
    for n in numSet:
        # Check if n is the start of a sequence
        if (n - 1) not in numSet:
            length = 1
            while (n + length) in numSet:
                length += 1
            if length > longest:
                longest = length
    return longest

nums = [100, 4, 200, 1, 3, 2]
ans = longestConsecutive(nums)
print("Longest streak:", ans)`
  },
  {
    id: 9,
    leetcodeNumber: 169,
    title: "Majority Element",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Boyer-Moore Voting",
    description: "Find the element appearing more than n/2 times in O(1) space.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def majorityElement(nums):
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

nums = [2, 2, 1, 1, 1, 2, 2]
ans = majorityElement(nums)
print("Majority element:", ans)`
  },
  {
    id: 10,
    leetcodeNumber: 136,
    title: "Single Number",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Bitwise XOR / Hash Set",
    description: "Every element appears twice except for one. Find that single element.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def singleNumber(nums):
    res = 0
    for n in nums:
        res ^= n
    return res

nums = [4, 1, 2, 1, 2]
ans = singleNumber(nums)
print("Single number:", ans)`
  },
  {
    id: 11,
    leetcodeNumber: 448,
    title: "Find All Numbers Disappeared in an Array",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "In-Place Index Tagging",
    description: "Find all integers in range [1, n] that do not appear in the array.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def findDisappearedNumbers(nums):
    for i in range(len(nums)):
        idx = abs(nums[i]) - 1
        if nums[idx] > 0:
            nums[idx] = -nums[idx]
    
    missing = []
    for i in range(len(nums)):
        if nums[i] > 0:
            missing.append(i + 1)
    return missing

nums = [4, 3, 2, 7, 8, 2, 3, 1]
ans = findDisappearedNumbers(nums)
print("Missing numbers:", ans)`
  },
  {
    id: 12,
    leetcodeNumber: 268,
    title: "Missing Number",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Arithmetic Sum Formula",
    description: "Given array containing n distinct numbers in range [0, n], return missing number.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def missingNumber(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum

nums = [3, 0, 1]
ans = missingNumber(nums)
print("Missing:", ans)`
  },
  {
    id: 13,
    leetcodeNumber: 283,
    title: "Move Zeroes",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Two Pointers Writer",
    description: "Move all 0s to end while maintaining relative order of non-zero elements.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def moveZeroes(nums):
    writer = 0
    for reader in range(len(nums)):
        if nums[reader] != 0:
            nums[writer], nums[reader] = nums[reader], nums[writer]
            writer += 1
    return nums

nums = [0, 1, 0, 3, 12]
moveZeroes(nums)
print("Moved zeroes:", nums)`
  },
  {
    id: 14,
    leetcodeNumber: 66,
    title: "Plus One",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Array Digit Simulation",
    description: "Increment large integer represented as array of digits by one.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def plusOne(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits

digits = [1, 2, 9]
ans = plusOne(digits)
print("Plus one:", ans)`
  },
  {
    id: 15,
    leetcodeNumber: 485,
    title: "Max Consecutive Ones",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Linear Streak Counter",
    description: "Find the maximum number of consecutive 1s in a binary array.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def findMaxConsecutiveOnes(nums):
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

nums = [1, 1, 0, 1, 1, 1]
ans = findMaxConsecutiveOnes(nums)
print("Max consecutive ones:", ans)`
  },
  {
    id: 16,
    leetcodeNumber: 560,
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Prefix Sum + Hash Map",
    description: "Find total number of subarrays whose sum equals k using prefix frequencies.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    starterCode: `def subarraySum(nums, k):
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

nums = [1, 1, 1]
k = 2
ans = subarraySum(nums, k)
print("Count of subarrays:", ans)`
  },
  {
    id: 17,
    leetcodeNumber: 525,
    title: "Contiguous Array",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Prefix Balance Tracking",
    description: "Find maximum length of contiguous subarray with equal number of 0s and 1s.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    starterCode: `def findMaxLength(nums):
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

nums = [0, 1, 0, 0, 1, 1, 0]
ans = findMaxLength(nums)
print("Max length:", ans)`
  },
  {
    id: 18,
    leetcodeNumber: 189,
    title: "Rotate Array",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Array Reversal Triplets",
    description: "Rotate array to right by k steps using in-place triple reversal.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def rotate(nums, k):
    k = k % len(nums)
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    # 1. Reverse entire array
    reverse(0, len(nums) - 1)
    # 2. Reverse first k elements
    reverse(0, k - 1)
    # 3. Reverse remaining elements
    reverse(k, len(nums) - 1)
    return nums

nums = [1, 2, 3, 4, 5, 6, 7]
rotate(nums, 3)
print("Rotated:", nums)`
  },
  {
    id: 19,
    leetcodeNumber: 48,
    title: "Rotate Image",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Transpose and Reverse",
    description: "Rotate n x n 2D matrix by 90 degrees clockwise in-place.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    starterCode: `def rotateImage(matrix):
    n = len(matrix)
    # Step 1: Transpose matrix
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Step 2: Reverse each row
    for i in range(n):
        matrix[i].reverse()
    return matrix

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
rotateImage(matrix)
print("Rotated matrix:", matrix)`
  },
  {
    id: 20,
    leetcodeNumber: 73,
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "First Row/Col Markers",
    description: "If an element is 0, set its entire row and column to 0 in-place.",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(1)",
    starterCode: `def setZeroes(matrix):
    m = len(matrix)
    n = len(matrix[0])
    first_col_zero = False
    
    for r in range(m):
        if matrix[r][0] == 0:
            first_col_zero = True
        for c in range(1, n):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0
                
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
                
    if matrix[0][0] == 0:
        for c in range(n):
            matrix[0][c] = 0
    if first_col_zero:
        for r in range(m):
            matrix[r][0] = 0
    return matrix

mat = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
setZeroes(mat)
print("Matrix after zeroes:", mat)`
  },
  {
    id: 21,
    leetcodeNumber: 54,
    title: "Spiral Matrix",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Boundary Shrinking",
    description: "Return all elements of matrix in spiral order by contracting boundaries.",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(1)",
    starterCode: `def spiralOrder(matrix):
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while left <= right and top <= bottom:
        for c in range(left, right + 1):
            res.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1):
            res.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(matrix[r][left])
            left += 1
    return res

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
ans = spiralOrder(matrix)
print("Spiral order:", ans)`
  },
  {
    id: 22,
    leetcodeNumber: 75,
    title: "Sort Colors",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Dutch National Flag (3 Pointers)",
    description: "Sort array of 0s, 1s, and 2s in-place in a single pass.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def sortColors(nums):
    low = 0
    mid = 0
    high = len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums

nums = [2, 0, 2, 1, 1, 0]
sortColors(nums)
print("Sorted colors:", nums)`
  },
  {
    id: 23,
    leetcodeNumber: 229,
    title: "Majority Element II",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Extended Boyer-Moore",
    description: "Find all elements that appear more than n/3 times in linear time and O(1) space.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def majorityElementII(nums):
    cand1, cand2 = None, None
    count1, count2 = 0, 0
    for n in nums:
        if n == cand1:
            count1 += 1
        elif n == cand2:
            count2 += 1
        elif count1 == 0:
            cand1, count1 = n, 1
        elif count2 == 0:
            cand2, count2 = n, 1
        else:
            count1 -= 1
            count2 -= 1
    result = []
    threshold = len(nums) // 3
    if nums.count(cand1) > threshold:
        result.append(cand1)
    if cand2 != cand1 and nums.count(cand2) > threshold:
        result.append(cand2)
    return result

nums = [3, 2, 3]
ans = majorityElementII(nums)
print("Elements > n/3:", ans)`
  },
  {
    id: 24,
    leetcodeNumber: 41,
    title: "First Missing Positive",
    difficulty: "Hard",
    topic: "Arrays & Hashing",
    pattern: "Index as Hash Key",
    description: "Find the smallest positive integer missing from an unsorted array in O(n) and O(1) space.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def firstMissingPositive(nums):
    n = len(nums)
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            target_idx = nums[i] - 1
            nums[i], nums[target_idx] = nums[target_idx], nums[i]
            
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1

nums = [3, 4, -1, 1]
ans = firstMissingPositive(nums)
print("First missing positive:", ans)`
  },
  {
    id: 25,
    leetcodeNumber: 14,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Horizontal / Vertical Scanning",
    description: "Find the longest common prefix string amongst an array of strings.",
    timeComplexity: "O(S)",
    spaceComplexity: "O(1)",
    starterCode: `def longestCommonPrefix(strs):
    if not strs:
        return ""
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix

strs = ["flower", "flow", "flight"]
ans = longestCommonPrefix(strs)
print("Prefix:", ans)`
  },
  {
    id: 26,
    leetcodeNumber: 58,
    title: "Length of Last Word",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Right-to-Left Traversal",
    description: "Return length of the last word in a string consisting of non-space characters.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def lengthOfLastWord(s):
    i = len(s) - 1
    length = 0
    while i >= 0 and s[i] == " ":
        i -= 1
    while i >= 0 and s[i] != " ":
        length += 1
        i -= 1
    return length

s = "Hello World"
ans = lengthOfLastWord(s)
print("Length of last word:", ans)`
  },
  {
    id: 27,
    leetcodeNumber: 387,
    title: "First Unique Character in a String",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Frequency Counting",
    description: "Find the first non-repeating character in a string and return its index.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def firstUniqChar(s):
    count = {}
    for ch in s:
        count[ch] = count.get(ch, 0) + 1
    for i, ch in enumerate(s):
        if count[ch] == 1:
            return i
    return -1

s = "leetcode"
ans = firstUniqChar(s)
print("First unique index:", ans)`
  },
  {
    id: 28,
    leetcodeNumber: 205,
    title: "Isomorphic Strings",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Dual Character Mapping",
    description: "Determine if characters in s can be replaced to get t using bijection maps.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    starterCode: `def isIsomorphic(s, t):
    if len(s) != len(t):
        return False
    mapST, mapTS = {}, {}
    for c1, c2 in zip(s, t):
        if (c1 in mapST and mapST[c1] != c2) or (c2 in mapTS and mapTS[c2] != c1):
            return False
        mapST[c1] = c2
        mapTS[c2] = c1
    return True

s = "egg"
t = "add"
ans = isIsomorphic(s, t)
print("Isomorphic:", ans)`
  },
  {
    id: 29,
    leetcodeNumber: 271,
    title: "Encode and Decode Strings",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Length-Prefix Delimiter",
    description: "Design an algorithm to encode a list of strings to a string and decode back.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    starterCode: `def encode(strs):
    res = ""
    for s in strs:
        res += str(len(s)) + "#" + s
    return res

def decode(s):
    res, i = [], 0
    while i < len(s):
        j = i
        while s[j] != "#":
            j += 1
        length = int(s[i:j])
        res.append(s[j + 1 : j + 1 + length])
        i = j + 1 + length
    return res

original = ["neet", "code", "love", "you"]
encoded = encode(original)
decoded = decode(encoded)
print("Encoded:", encoded)
print("Decoded:", decoded)`
  },
  {
    id: 30,
    leetcodeNumber: 380,
    title: "Insert Delete GetRandom O(1)",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Array + Hash Map Swap",
    description: "Design a data structure that supports insert, remove, and getRandom in O(1) time.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    starterCode: `class RandomizedSet:
    def __init__(self):
        self.numMap = {}
        self.numList = []
        
    def insert(self, val):
        if val in self.numMap:
            return False
        self.numMap[val] = len(self.numList)
        self.numList.append(val)
        return True
        
    def remove(self, val):
        if val not in self.numMap:
            return False
        idx = self.numMap[val]
        last_val = self.numList[-1]
        self.numList[idx] = last_val
        self.numMap[last_val] = idx
        self.numList.pop()
        del self.numMap[val]
        return True

r = RandomizedSet()
print("Insert 10:", r.insert(10))
print("Insert 20:", r.insert(20))
print("Remove 10:", r.remove(10))`
  }
];

console.log(`Generated ${problems.length} array problems`);
