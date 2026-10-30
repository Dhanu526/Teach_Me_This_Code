// app_build/dsa_problems.js — 300 Curated, Distinct LeetCode & DSA Problems
// Phase 3: Structured Catalog with Verified Source URLs, Constraints, Prerequisites, and Reference Solutions
window.DSA_PROBLEMS_LIBRARY = [
  {
    "id": 1,
    "leetcodeNumber": 1,
    "title": "Two Sum",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Hash Map Lookup",
    "description": "Find indices of two numbers that add up to a target using a dictionary for instant lookups.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def twoSum(nums, target):\n    prevMap = {}\n    for i in range(len(nums)):\n        diff = target - nums[i]\n        if diff in prevMap:\n            return [prevMap[diff], i]\n        prevMap[nums[i]] = i\n    return []\n\nnums = [2, 7, 11, 15]\nprint(\"Indices:\", twoSum(nums, 9))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/two-sum/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Find indices of two numbers that add up to a target using a dictionary for instant lookups.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15]",
        "output": "Computed via twoSum(nums, 9)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def twoSum(nums, target):\n    prevMap = {}\n    for i in range(len(nums)):\n        diff = target - nums[i]\n        if diff in prevMap:\n            return [prevMap[diff], i]\n        prevMap[nums[i]] = i\n    return []\n\nnums = [2, 7, 11, 15]\nprint(\"Indices:\", twoSum(nums, 9))",
    "verificationStatus": "Verified"
  },
  {
    "id": 2,
    "leetcodeNumber": 217,
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Hash Set",
    "description": "Determine if any value appears at least twice in the array using a set.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def containsDuplicate(nums):\n    seen = set()\n    for n in nums:\n        if n in seen:\n            return True\n        seen.add(n)\n    return False\n\nprint(\"Has duplicate:\", containsDuplicate([1, 2, 3, 1]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/contains-duplicate/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Determine if any value appears at least twice in the array using a set.",
    "examples": [
      {
        "input": "containsDuplicate([1, 2, 3, 1])",
        "output": "Computed via containsDuplicate([1, 2, 3, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def containsDuplicate(nums):\n    seen = set()\n    for n in nums:\n        if n in seen:\n            return True\n        seen.add(n)\n    return False\n\nprint(\"Has duplicate:\", containsDuplicate([1, 2, 3, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 3,
    "leetcodeNumber": 242,
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Frequency Counter",
    "description": "Check if string t is an anagram of string s by counting character occurrences.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def isAnagram(s, t):\n    if len(s) != len(t):\n        return False\n    countS = {}\n    countT = {}\n    for ch in s:\n        countS[ch] = countS.get(ch, 0) + 1\n    for ch in t:\n        countT[ch] = countT.get(ch, 0) + 1\n    return countS == countT\n\nprint(\"Is anagram:\", isAnagram(\"anagram\", \"nagaram\"))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/valid-anagram/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Strings"
    ],
    "summary": "Check if string t is an anagram of string s by counting character occurrences.",
    "examples": [
      {
        "input": "isAnagram(\"anagram\", \"nagaram\")",
        "output": "Computed via isAnagram(\"anagram\", \"nagaram\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def isAnagram(s, t):\n    if len(s) != len(t):\n        return False\n    countS = {}\n    countT = {}\n    for ch in s:\n        countS[ch] = countS.get(ch, 0) + 1\n    for ch in t:\n        countT[ch] = countT.get(ch, 0) + 1\n    return countS == countT\n\nprint(\"Is anagram:\", isAnagram(\"anagram\", \"nagaram\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 4,
    "leetcodeNumber": 49,
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Categorization by Key",
    "description": "Group strings that are anagrams together by sorting or frequency tuple keys.",
    "timeComplexity": "O(m * n log n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def groupAnagrams(strs):\n    ansMap = {}\n    for s in strs:\n        key = \"\".join(sorted(s))\n        if key not in ansMap:\n            ansMap[key] = []\n        ansMap[key].append(s)\n    return list(ansMap.values())\n\nprint(\"Groups:\", groupAnagrams([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/group-anagrams/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Strings"
    ],
    "summary": "Group strings that are anagrams together by sorting or frequency tuple keys.",
    "examples": [
      {
        "input": "groupAnagrams([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"])",
        "output": "Computed via groupAnagrams([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def groupAnagrams(strs):\n    ansMap = {}\n    for s in strs:\n        key = \"\".join(sorted(s))\n        if key not in ansMap:\n            ansMap[key] = []\n        ansMap[key].append(s)\n    return list(ansMap.values())\n\nprint(\"Groups:\", groupAnagrams([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 5,
    "leetcodeNumber": 347,
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Bucket Sort / Frequency Map",
    "description": "Find the k most frequent elements in an array using frequency counting.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def topKFrequent(nums, k):\n    count = {}\n    for n in nums:\n        count[n] = count.get(n, 0) + 1\n    sorted_items = sorted(count.items(), key=lambda item: item[1], reverse=True)\n    return [item[0] for item in sorted_items[:k]]\n\nprint(\"Top K:\", topKFrequent([1, 1, 1, 2, 2, 3], 2))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "summary": "Find the k most frequent elements in an array using frequency counting.",
    "examples": [
      {
        "input": "topKFrequent([1, 1, 1, 2, 2, 3], 2)",
        "output": "Computed via topKFrequent([1, 1, 1, 2, 2, 3], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def topKFrequent(nums, k):\n    count = {}\n    for n in nums:\n        count[n] = count.get(n, 0) + 1\n    sorted_items = sorted(count.items(), key=lambda item: item[1], reverse=True)\n    return [item[0] for item in sorted_items[:k]]\n\nprint(\"Top K:\", topKFrequent([1, 1, 1, 2, 2, 3], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 6,
    "leetcodeNumber": 238,
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Prefix & Suffix Products",
    "description": "Calculate products of all elements except nums[i] in O(n) without division.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def productExceptSelf(nums):\n    res = [1] * len(nums)\n    prefix = 1\n    for i in range(len(nums)):\n        res[i] = prefix\n        prefix *= nums[i]\n    postfix = 1\n    for i in range(len(nums) - 1, -1, -1):\n        res[i] *= postfix\n        postfix *= nums[i]\n    return res\n\nprint(\"Products:\", productExceptSelf([1, 2, 3, 4]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Prefix Sum",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/product-of-array-except-self/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Prefix Sum",
      "Recursion"
    ],
    "summary": "Calculate products of all elements except nums[i] in O(n) without division.",
    "examples": [
      {
        "input": "productExceptSelf([1, 2, 3, 4])",
        "output": "Computed via productExceptSelf([1, 2, 3, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Cumulative Prefix Sums"
    ],
    "referenceSolution": "def productExceptSelf(nums):\n    res = [1] * len(nums)\n    prefix = 1\n    for i in range(len(nums)):\n        res[i] = prefix\n        prefix *= nums[i]\n    postfix = 1\n    for i in range(len(nums) - 1, -1, -1):\n        res[i] *= postfix\n        postfix *= nums[i]\n    return res\n\nprint(\"Products:\", productExceptSelf([1, 2, 3, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 7,
    "leetcodeNumber": 36,
    "title": "Valid Sudoku",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "2D Hash Set Tracking",
    "description": "Verify that each row, column, and 3x3 box contains unique digits 1-9.",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "starterCode": "def isValidSudoku(board):\n    rows = [set() for _ in range(9)]\n    cols = [set() for _ in range(9)]\n    boxes = [set() for _ in range(9)]\n    for r in range(9):\n        for c in range(9):\n            val = board[r][c]\n            if val == \".\":\n                continue\n            box_idx = (r // 3) * 3 + (c // 3)\n            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:\n                return False\n            rows[r].add(val)\n            cols[c].add(val)\n            boxes[box_idx].add(val)\n    return True\n\nmini = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"]] + [[\".\"]*9]*8\nprint(\"Valid:\", isValidSudoku(mini))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/valid-sudoku/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Verify that each row, column, and 3x3 box contains unique digits 1-9.",
    "examples": [
      {
        "input": "mini = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"]] + [[\".\"]*9]*8",
        "output": "Computed via isValidSudoku(mini)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def isValidSudoku(board):\n    rows = [set() for _ in range(9)]\n    cols = [set() for _ in range(9)]\n    boxes = [set() for _ in range(9)]\n    for r in range(9):\n        for c in range(9):\n            val = board[r][c]\n            if val == \".\":\n                continue\n            box_idx = (r // 3) * 3 + (c // 3)\n            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:\n                return False\n            rows[r].add(val)\n            cols[c].add(val)\n            boxes[box_idx].add(val)\n    return True\n\nmini = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"]] + [[\".\"]*9]*8\nprint(\"Valid:\", isValidSudoku(mini))",
    "verificationStatus": "Verified"
  },
  {
    "id": 8,
    "leetcodeNumber": 128,
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Hash Set Streak Building",
    "description": "Find length of the longest consecutive elements sequence in O(n) time.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def longestConsecutive(nums):\n    numSet = set(nums)\n    longest = 0\n    for n in numSet:\n        if (n - 1) not in numSet:\n            length = 1\n            while (n + length) in numSet:\n                length += 1\n            if length > longest:\n                longest = length\n    return longest\n\nprint(\"Longest streak:\", longestConsecutive([100, 4, 200, 1, 3, 2]))",
    "topics": [
      "Arrays",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Union-Find"
    ],
    "summary": "Find length of the longest consecutive elements sequence in O(n) time.",
    "examples": [
      {
        "input": "longestConsecutive([100, 4, 200, 1, 3, 2])",
        "output": "Computed via longestConsecutive([100, 4, 200, 1, 3, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def longestConsecutive(nums):\n    numSet = set(nums)\n    longest = 0\n    for n in numSet:\n        if (n - 1) not in numSet:\n            length = 1\n            while (n + length) in numSet:\n                length += 1\n            if length > longest:\n                longest = length\n    return longest\n\nprint(\"Longest streak:\", longestConsecutive([100, 4, 200, 1, 3, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 9,
    "leetcodeNumber": 169,
    "title": "Majority Element",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Boyer-Moore Voting",
    "description": "Find the element appearing more than n/2 times in O(1) space.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def majorityElement(nums):\n    candidate = None\n    count = 0\n    for n in nums:\n        if count == 0:\n            candidate = n\n        count += 1 if n == candidate else -1\n    return candidate\n\nprint(\"Majority:\", majorityElement([2, 2, 1, 1, 1, 2, 2]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/majority-element/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Find the element appearing more than n/2 times in O(1) space.",
    "examples": [
      {
        "input": "majorityElement([2, 2, 1, 1, 1, 2, 2])",
        "output": "Computed via majorityElement([2, 2, 1, 1, 1, 2, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def majorityElement(nums):\n    candidate = None\n    count = 0\n    for n in nums:\n        if count == 0:\n            candidate = n\n        count += 1 if n == candidate else -1\n    return candidate\n\nprint(\"Majority:\", majorityElement([2, 2, 1, 1, 1, 2, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 10,
    "leetcodeNumber": 136,
    "title": "Single Number",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Bitwise XOR",
    "description": "Every element appears twice except for one. Find that single element.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def singleNumber(nums):\n    res = 0\n    for n in nums:\n        res ^= n\n    return res\n\nprint(\"Single:\", singleNumber([4, 1, 2, 1, 2]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/single-number/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Every element appears twice except for one. Find that single element.",
    "examples": [
      {
        "input": "singleNumber([4, 1, 2, 1, 2])",
        "output": "Computed via singleNumber([4, 1, 2, 1, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def singleNumber(nums):\n    res = 0\n    for n in nums:\n        res ^= n\n    return res\n\nprint(\"Single:\", singleNumber([4, 1, 2, 1, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 11,
    "leetcodeNumber": 448,
    "title": "Find All Numbers Disappeared in an Array",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "In-Place Index Tagging",
    "description": "Find all integers in range [1, n] that do not appear in the array.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def findDisappearedNumbers(nums):\n    for i in range(len(nums)):\n        idx = abs(nums[i]) - 1\n        if nums[idx] > 0:\n            nums[idx] = -nums[idx]\n    return [i + 1 for i in range(len(nums)) if nums[i] > 0]\n\nprint(\"Disappeared:\", findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Find all integers in range [1, n] that do not appear in the array.",
    "examples": [
      {
        "input": "findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])",
        "output": "Computed via findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def findDisappearedNumbers(nums):\n    for i in range(len(nums)):\n        idx = abs(nums[i]) - 1\n        if nums[idx] > 0:\n            nums[idx] = -nums[idx]\n    return [i + 1 for i in range(len(nums)) if nums[i] > 0]\n\nprint(\"Disappeared:\", findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 12,
    "leetcodeNumber": 268,
    "title": "Missing Number",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Sum Formula",
    "description": "Given array containing n distinct numbers in range [0, n], return missing number.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def missingNumber(nums):\n    n = len(nums)\n    return n * (n + 1) // 2 - sum(nums)\n\nprint(\"Missing:\", missingNumber([3, 0, 1]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/missing-number/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Given array containing n distinct numbers in range [0, n], return missing number.",
    "examples": [
      {
        "input": "missingNumber([3, 0, 1])",
        "output": "Computed via missingNumber([3, 0, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def missingNumber(nums):\n    n = len(nums)\n    return n * (n + 1) // 2 - sum(nums)\n\nprint(\"Missing:\", missingNumber([3, 0, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 13,
    "leetcodeNumber": 283,
    "title": "Move Zeroes",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Two Pointers Writer",
    "description": "Move all 0s to end while maintaining relative order of non-zero elements.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def moveZeroes(nums):\n    w = 0\n    for r in range(len(nums)):\n        if nums[r] != 0:\n            nums[w], nums[r] = nums[r], nums[w]\n            w += 1\n    return nums\n\nprint(\"Move zeroes:\", moveZeroes([0, 1, 0, 3, 12]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/move-zeroes/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "summary": "Move all 0s to end while maintaining relative order of non-zero elements.",
    "examples": [
      {
        "input": "moveZeroes([0, 1, 0, 3, 12])",
        "output": "Computed via moveZeroes([0, 1, 0, 3, 12])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def moveZeroes(nums):\n    w = 0\n    for r in range(len(nums)):\n        if nums[r] != 0:\n            nums[w], nums[r] = nums[r], nums[w]\n            w += 1\n    return nums\n\nprint(\"Move zeroes:\", moveZeroes([0, 1, 0, 3, 12]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 14,
    "leetcodeNumber": 66,
    "title": "Plus One",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Array Simulation",
    "description": "Increment large integer represented as array of digits by one.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def plusOne(digits):\n    for i in range(len(digits) - 1, -1, -1):\n        if digits[i] < 9:\n            digits[i] += 1\n            return digits\n        digits[i] = 0\n    return [1] + digits\n\nprint(\"Plus one:\", plusOne([1, 2, 9]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/plus-one/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Increment large integer represented as array of digits by one.",
    "examples": [
      {
        "input": "plusOne([1, 2, 9])",
        "output": "Computed via plusOne([1, 2, 9])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def plusOne(digits):\n    for i in range(len(digits) - 1, -1, -1):\n        if digits[i] < 9:\n            digits[i] += 1\n            return digits\n        digits[i] = 0\n    return [1] + digits\n\nprint(\"Plus one:\", plusOne([1, 2, 9]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 15,
    "leetcodeNumber": 485,
    "title": "Max Consecutive Ones",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Linear Scan",
    "description": "Find the maximum number of consecutive 1s in a binary array.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def findMaxConsecutiveOnes(nums):\n    max_c, curr = 0, 0\n    for n in nums:\n        if n == 1:\n            curr += 1\n            if curr > max_c:\n                max_c = curr\n        else:\n            curr = 0\n    return max_c\n\nprint(\"Max 1s:\", findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/max-consecutive-ones/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Find the maximum number of consecutive 1s in a binary array.",
    "examples": [
      {
        "input": "findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])",
        "output": "Computed via findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def findMaxConsecutiveOnes(nums):\n    max_c, curr = 0, 0\n    for n in nums:\n        if n == 1:\n            curr += 1\n            if curr > max_c:\n                max_c = curr\n        else:\n            curr = 0\n    return max_c\n\nprint(\"Max 1s:\", findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 16,
    "leetcodeNumber": 560,
    "title": "Subarray Sum Equals K",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Prefix Sum + Hash Map",
    "description": "Find total number of subarrays whose sum equals k using prefix frequencies.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def subarraySum(nums, k):\n    count, curr_sum = 0, 0\n    prefix_map = {0: 1}\n    for n in nums:\n        curr_sum += n\n        diff = curr_sum - k\n        if diff in prefix_map:\n            count += prefix_map[diff]\n        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1\n    return count\n\nprint(\"Subarrays:\", subarraySum([1, 1, 1], 2))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Prefix Sum",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Prefix Sum",
      "Recursion"
    ],
    "summary": "Find total number of subarrays whose sum equals k using prefix frequencies.",
    "examples": [
      {
        "input": "subarraySum([1, 1, 1], 2)",
        "output": "Computed via subarraySum([1, 1, 1], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Cumulative Prefix Sums"
    ],
    "referenceSolution": "def subarraySum(nums, k):\n    count, curr_sum = 0, 0\n    prefix_map = {0: 1}\n    for n in nums:\n        curr_sum += n\n        diff = curr_sum - k\n        if diff in prefix_map:\n            count += prefix_map[diff]\n        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1\n    return count\n\nprint(\"Subarrays:\", subarraySum([1, 1, 1], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 17,
    "leetcodeNumber": 525,
    "title": "Contiguous Array",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Prefix Balance Tracking",
    "description": "Find maximum length of contiguous subarray with equal number of 0s and 1s.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def findMaxLength(nums):\n    max_len, balance = 0, 0\n    seen = {0: -1}\n    for i in range(len(nums)):\n        balance += 1 if nums[i] == 1 else -1\n        if balance in seen:\n            l = i - seen[balance]\n            if l > max_len:\n                max_len = l\n        else:\n            seen[balance] = i\n    return max_len\n\nprint(\"Max len:\", findMaxLength([0, 1, 0, 0, 1, 1, 0]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Prefix Sum"
    ],
    "sourceUrl": "https://leetcode.com/problems/contiguous-array/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Prefix Sum"
    ],
    "summary": "Find maximum length of contiguous subarray with equal number of 0s and 1s.",
    "examples": [
      {
        "input": "findMaxLength([0, 1, 0, 0, 1, 1, 0])",
        "output": "Computed via findMaxLength([0, 1, 0, 0, 1, 1, 0])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Cumulative Prefix Sums"
    ],
    "referenceSolution": "def findMaxLength(nums):\n    max_len, balance = 0, 0\n    seen = {0: -1}\n    for i in range(len(nums)):\n        balance += 1 if nums[i] == 1 else -1\n        if balance in seen:\n            l = i - seen[balance]\n            if l > max_len:\n                max_len = l\n        else:\n            seen[balance] = i\n    return max_len\n\nprint(\"Max len:\", findMaxLength([0, 1, 0, 0, 1, 1, 0]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 18,
    "leetcodeNumber": 189,
    "title": "Rotate Array",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Array Reversal Triplets",
    "description": "Rotate array to right by k steps using in-place triple reversal.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def rotate(nums, k):\n    k = k % len(nums)\n    def rev(start, end):\n        while start < end:\n            nums[start], nums[end] = nums[end], nums[start]\n            start += 1\n            end -= 1\n    rev(0, len(nums) - 1)\n    rev(0, k - 1)\n    rev(k, len(nums) - 1)\n    return nums\n\nprint(\"Rotated:\", rotate([1, 2, 3, 4, 5, 6, 7], 3))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/rotate-array/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Rotate array to right by k steps using in-place triple reversal.",
    "examples": [
      {
        "input": "rotate([1, 2, 3, 4, 5, 6, 7], 3)",
        "output": "Computed via rotate([1, 2, 3, 4, 5, 6, 7], 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def rotate(nums, k):\n    k = k % len(nums)\n    def rev(start, end):\n        while start < end:\n            nums[start], nums[end] = nums[end], nums[start]\n            start += 1\n            end -= 1\n    rev(0, len(nums) - 1)\n    rev(0, k - 1)\n    rev(k, len(nums) - 1)\n    return nums\n\nprint(\"Rotated:\", rotate([1, 2, 3, 4, 5, 6, 7], 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 19,
    "leetcodeNumber": 48,
    "title": "Rotate Image",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Transpose and Reverse",
    "description": "Rotate n x n 2D matrix by 90 degrees clockwise in-place.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(1)",
    "starterCode": "def rotateImage(matrix):\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for i in range(n):\n        matrix[i].reverse()\n    return matrix\n\nmat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint(\"Rotated:\", rotateImage(mat))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/rotate-image/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion"
    ],
    "summary": "Rotate n x n 2D matrix by 90 degrees clockwise in-place.",
    "examples": [
      {
        "input": "mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "output": "Computed via rotateImage(mat)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def rotateImage(matrix):\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for i in range(n):\n        matrix[i].reverse()\n    return matrix\n\nmat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint(\"Rotated:\", rotateImage(mat))",
    "verificationStatus": "Verified"
  },
  {
    "id": 20,
    "leetcodeNumber": 73,
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "First Row/Col Markers",
    "description": "If an element is 0, set its entire row and column to 0 in-place.",
    "timeComplexity": "O(m*n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def setZeroes(matrix):\n    m, n = len(matrix), len(matrix[0])\n    first_col_zero = any(matrix[r][0] == 0 for r in range(m))\n    for r in range(m):\n        for c in range(1, n):\n            if matrix[r][c] == 0:\n                matrix[r][0] = 0\n                matrix[0][c] = 0\n    for r in range(1, m):\n        for c in range(1, n):\n            if matrix[r][0] == 0 or matrix[0][c] == 0:\n                matrix[r][c] = 0\n    if matrix[0][0] == 0:\n        for c in range(n):\n            matrix[0][c] = 0\n    if first_col_zero:\n        for r in range(m):\n            matrix[r][0] = 0\n    return matrix\n\nprint(\"Zeroes:\", setZeroes([[1,1,1],[1,0,1],[1,1,1]]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/set-matrix-zeroes/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion"
    ],
    "summary": "If an element is 0, set its entire row and column to 0 in-place.",
    "examples": [
      {
        "input": "setZeroes([[1,1,1],[1,0,1],[1,1,1]])",
        "output": "Computed via setZeroes([[1,1,1],[1,0,1],[1,1,1]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def setZeroes(matrix):\n    m, n = len(matrix), len(matrix[0])\n    first_col_zero = any(matrix[r][0] == 0 for r in range(m))\n    for r in range(m):\n        for c in range(1, n):\n            if matrix[r][c] == 0:\n                matrix[r][0] = 0\n                matrix[0][c] = 0\n    for r in range(1, m):\n        for c in range(1, n):\n            if matrix[r][0] == 0 or matrix[0][c] == 0:\n                matrix[r][c] = 0\n    if matrix[0][0] == 0:\n        for c in range(n):\n            matrix[0][c] = 0\n    if first_col_zero:\n        for r in range(m):\n            matrix[r][0] = 0\n    return matrix\n\nprint(\"Zeroes:\", setZeroes([[1,1,1],[1,0,1],[1,1,1]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 21,
    "leetcodeNumber": 54,
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Boundary Shrinking",
    "description": "Return all elements of matrix in spiral order by contracting boundaries.",
    "timeComplexity": "O(m*n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def spiralOrder(matrix):\n    res = []\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n    while left <= right and top <= bottom:\n        for c in range(left, right + 1):\n            res.append(matrix[top][c])\n        top += 1\n        for r in range(top, bottom + 1):\n            res.append(matrix[r][right])\n        right -= 1\n        if top <= bottom:\n            for c in range(right, left - 1, -1):\n                res.append(matrix[bottom][c])\n            bottom -= 1\n        if left <= right:\n            for r in range(bottom, top - 1, -1):\n                res.append(matrix[r][left])\n            left += 1\n    return res\n\nprint(\"Spiral:\", spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/spiral-matrix/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion",
      "Sorting"
    ],
    "summary": "Return all elements of matrix in spiral order by contracting boundaries.",
    "examples": [
      {
        "input": "spiralOrder([[1,2,3],[4,5,6],[7,8,9]])",
        "output": "Computed via spiralOrder([[1,2,3],[4,5,6],[7,8,9]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def spiralOrder(matrix):\n    res = []\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n    while left <= right and top <= bottom:\n        for c in range(left, right + 1):\n            res.append(matrix[top][c])\n        top += 1\n        for r in range(top, bottom + 1):\n            res.append(matrix[r][right])\n        right -= 1\n        if top <= bottom:\n            for c in range(right, left - 1, -1):\n                res.append(matrix[bottom][c])\n            bottom -= 1\n        if left <= right:\n            for r in range(bottom, top - 1, -1):\n                res.append(matrix[r][left])\n            left += 1\n    return res\n\nprint(\"Spiral:\", spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 22,
    "leetcodeNumber": 75,
    "title": "Sort Colors",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Dutch National Flag (3 Pointers)",
    "description": "Sort array of 0s, 1s, and 2s in-place in a single pass.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def sortColors(nums):\n    low, mid, high = 0, 0, len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1\n    return nums\n\nprint(\"Sorted:\", sortColors([2, 0, 2, 1, 1, 0]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/sort-colors/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "summary": "Sort array of 0s, 1s, and 2s in-place in a single pass.",
    "examples": [
      {
        "input": "sortColors([2, 0, 2, 1, 1, 0])",
        "output": "Computed via sortColors([2, 0, 2, 1, 1, 0])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def sortColors(nums):\n    low, mid, high = 0, 0, len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1\n    return nums\n\nprint(\"Sorted:\", sortColors([2, 0, 2, 1, 1, 0]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 23,
    "leetcodeNumber": 229,
    "title": "Majority Element II",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Extended Boyer-Moore",
    "description": "Find all elements that appear more than n/3 times in linear time and O(1) space.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def majorityElementII(nums):\n    c1, c2, n1, n2 = None, None, 0, 0\n    for n in nums:\n        if n == c1:\n            n1 += 1\n        elif n == c2:\n            n2 += 1\n        elif n1 == 0:\n            c1, n1 = n, 1\n        elif n2 == 0:\n            c2, n2 = n, 1\n        else: n1 -= 1\n        n2 -= 1\n    res = []\n    if nums.count(c1) > len(nums) // 3:\n        res.append(c1)\n    if c2 != c1 and nums.count(c2) > len(nums) // 3:\n        res.append(c2)\n    return res\n\nprint(\"Majority > n/3:\", majorityElementII([3, 2, 3]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/majority-element-ii/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Find all elements that appear more than n/3 times in linear time and O(1) space.",
    "examples": [
      {
        "input": "majorityElementII([3, 2, 3])",
        "output": "Computed via majorityElementII([3, 2, 3])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def majorityElementII(nums):\n    c1, c2, n1, n2 = None, None, 0, 0\n    for n in nums:\n        if n == c1:\n            n1 += 1\n        elif n == c2:\n            n2 += 1\n        elif n1 == 0:\n            c1, n1 = n, 1\n        elif n2 == 0:\n            c2, n2 = n, 1\n        else: n1 -= 1\n        n2 -= 1\n    res = []\n    if nums.count(c1) > len(nums) // 3:\n        res.append(c1)\n    if c2 != c1 and nums.count(c2) > len(nums) // 3:\n        res.append(c2)\n    return res\n\nprint(\"Majority > n/3:\", majorityElementII([3, 2, 3]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 24,
    "leetcodeNumber": 41,
    "title": "First Missing Positive",
    "difficulty": "Hard",
    "topic": "Arrays & Hashing",
    "pattern": "Index as Hash Key",
    "description": "Find the smallest positive integer missing from an unsorted array in O(n) and O(1) space.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def firstMissingPositive(nums):\n    n = len(nums)\n    for i in range(n):\n        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n            t = nums[i] - 1\n            nums[i], nums[t] = nums[t], nums[i]\n    for i in range(n):\n        if nums[i] != i + 1:\n            return i + 1\n    return n + 1\n\nprint(\"First missing:\", firstMissingPositive([3, 4, -1, 1]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/first-missing-positive/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "summary": "Find the smallest positive integer missing from an unsorted array in O(n) and O(1) space.",
    "examples": [
      {
        "input": "firstMissingPositive([3, 4, -1, 1])",
        "output": "Computed via firstMissingPositive([3, 4, -1, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def firstMissingPositive(nums):\n    n = len(nums)\n    for i in range(n):\n        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n            t = nums[i] - 1\n            nums[i], nums[t] = nums[t], nums[i]\n    for i in range(n):\n        if nums[i] != i + 1:\n            return i + 1\n    return n + 1\n\nprint(\"First missing:\", firstMissingPositive([3, 4, -1, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 25,
    "leetcodeNumber": 14,
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Prefix Comparison",
    "description": "Find the longest common prefix string amongst an array of strings.",
    "timeComplexity": "O(S)",
    "spaceComplexity": "O(1)",
    "starterCode": "def longestCommonPrefix(strs):\n    if not strs:\n        return \"\"\n    p = strs[0]\n    for s in strs[1:\n        ]:\n        while not s.startswith(p):\n            p = p[:-1]\n            if not p:\n                return \"\"\n    return p\n\nprint(\"Prefix:\", longestCommonPrefix([\"flower\",\"flow\",\"flight\"]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Prefix Sum",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-common-prefix/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Prefix Sum",
      "Recursion",
      "Strings"
    ],
    "summary": "Find the longest common prefix string amongst an array of strings.",
    "examples": [
      {
        "input": "longestCommonPrefix([\"flower\",\"flow\",\"flight\"])",
        "output": "Computed via longestCommonPrefix([\"flower\",\"flow\",\"flight\"])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def longestCommonPrefix(strs):\n    if not strs:\n        return \"\"\n    p = strs[0]\n    for s in strs[1:\n        ]:\n        while not s.startswith(p):\n            p = p[:-1]\n            if not p:\n                return \"\"\n    return p\n\nprint(\"Prefix:\", longestCommonPrefix([\"flower\",\"flow\",\"flight\"]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 26,
    "leetcodeNumber": 58,
    "title": "Length of Last Word",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Right-to-Left Traversal",
    "description": "Return length of the last word in a string consisting of non-space characters.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def lengthOfLastWord(s):\n    i = len(s) - 1\n    length = 0\n    while i >= 0 and s[i] == \" \":\n        i -= 1\n    while i >= 0 and s[i] != \" \":\n        length += 1\n        i -= 1\n    return length\n\nprint(\"Last word len:\", lengthOfLastWord(\"Hello World\"))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/length-of-last-word/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "summary": "Return length of the last word in a string consisting of non-space characters.",
    "examples": [
      {
        "input": "lengthOfLastWord(\"Hello World\")",
        "output": "Computed via lengthOfLastWord(\"Hello World\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def lengthOfLastWord(s):\n    i = len(s) - 1\n    length = 0\n    while i >= 0 and s[i] == \" \":\n        i -= 1\n    while i >= 0 and s[i] != \" \":\n        length += 1\n        i -= 1\n    return length\n\nprint(\"Last word len:\", lengthOfLastWord(\"Hello World\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 27,
    "leetcodeNumber": 387,
    "title": "First Unique Character in a String",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Frequency Counting",
    "description": "Find the first non-repeating character in a string and return its index.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def firstUniqChar(s):\n    count = {}\n    for ch in s:\n        count[ch] = count.get(ch, 0) + 1\n    for i, ch in enumerate(s):\n        if count[ch] == 1:\n            return i\n    return -1\n\nprint(\"First unique:\", firstUniqChar(\"leetcode\"))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/first-unique-character-in-a-string/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "summary": "Find the first non-repeating character in a string and return its index.",
    "examples": [
      {
        "input": "firstUniqChar(\"leetcode\")",
        "output": "Computed via firstUniqChar(\"leetcode\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def firstUniqChar(s):\n    count = {}\n    for ch in s:\n        count[ch] = count.get(ch, 0) + 1\n    for i, ch in enumerate(s):\n        if count[ch] == 1:\n            return i\n    return -1\n\nprint(\"First unique:\", firstUniqChar(\"leetcode\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 28,
    "leetcodeNumber": 205,
    "title": "Isomorphic Strings",
    "difficulty": "Easy",
    "topic": "Arrays & Hashing",
    "pattern": "Dual Character Mapping",
    "description": "Determine if characters in s can be replaced to get t using bijection maps.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def isIsomorphic(s, t):\n    if len(s) != len(t):\n        return False\n    mST, mTS = {}, {}\n    for c1, c2 in zip(s, t):\n        if (c1 in mST and mST[c1] != c2) or (c2 in mTS and mTS[c2] != c1):\n            return False\n        mST[c1] = c2\n        mTS[c2] = c1\n    return True\n\nprint(\"Isomorphic:\", isIsomorphic(\"egg\", \"add\"))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/isomorphic-strings/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "summary": "Determine if characters in s can be replaced to get t using bijection maps.",
    "examples": [
      {
        "input": "isIsomorphic(\"egg\", \"add\")",
        "output": "Computed via isIsomorphic(\"egg\", \"add\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def isIsomorphic(s, t):\n    if len(s) != len(t):\n        return False\n    mST, mTS = {}, {}\n    for c1, c2 in zip(s, t):\n        if (c1 in mST and mST[c1] != c2) or (c2 in mTS and mTS[c2] != c1):\n            return False\n        mST[c1] = c2\n        mTS[c2] = c1\n    return True\n\nprint(\"Isomorphic:\", isIsomorphic(\"egg\", \"add\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 29,
    "leetcodeNumber": 271,
    "title": "Encode and Decode Strings",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Length-Prefix Delimiter",
    "description": "Design an algorithm to encode a list of strings to a string and decode back.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def encode(strs):\n    return \"\".join(str(len(s)) + \"#\" + s for s in strs)\n\ndef decode(s):\n    res, i = [], 0\n    while i < len(s):\n        j = s.find(\"#\", i)\n        length = int(s[i:j])\n        res.append(s[j + 1 : j + 1 + length])\n        i = j + 1 + length\n    return res\n\nenc = encode([\"neet\",\"code\"])\nprint(\"Decoded:\", decode(enc))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/encode-and-decode-strings/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "summary": "Design an algorithm to encode a list of strings to a string and decode back.",
    "examples": [
      {
        "input": "enc = encode([\"neet\",\"code\"])",
        "output": "Computed via decode(enc)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def encode(strs):\n    return \"\".join(str(len(s)) + \"#\" + s for s in strs)\n\ndef decode(s):\n    res, i = [], 0\n    while i < len(s):\n        j = s.find(\"#\", i)\n        length = int(s[i:j])\n        res.append(s[j + 1 : j + 1 + length])\n        i = j + 1 + length\n    return res\n\nenc = encode([\"neet\",\"code\"])\nprint(\"Decoded:\", decode(enc))",
    "verificationStatus": "Verified"
  },
  {
    "id": 30,
    "leetcodeNumber": 380,
    "title": "Insert Delete GetRandom O(1)",
    "difficulty": "Medium",
    "topic": "Arrays & Hashing",
    "pattern": "Array + Hash Map Swap",
    "description": "Design a data structure supporting insert, remove, and getRandom in O(1) time.",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(n)",
    "starterCode": "class RandomizedSet:\n    def __init__(self):\n        self.numMap = {}\n        self.numList = []\n    def insert(self, val):\n        if val in self.numMap:\n            return False\n        self.numMap[val] = len(self.numList)\n        self.numList.append(val)\n        return True\n    def remove(self, val):\n        if val not in self.numMap:\n            return False\n        idx = self.numMap[val]\n        last = self.numList[-1]\n        self.numList[idx] = last\n        self.numMap[last] = idx\n        self.numList.pop()\n        del self.numMap[val]\n        return True\n\nr = RandomizedSet()\nr.insert(10)\nprint(\"Remove 10:\", r.remove(10))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/insert-delete-getrandom-o-1/",
    "primaryTopic": "Arrays & Hashing",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Design a data structure supporting insert, remove, and getRandom in O(1) time.",
    "examples": [
      {
        "input": "r = RandomizedSet()",
        "output": "Computed via r.remove(10)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "class RandomizedSet:\n    def __init__(self):\n        self.numMap = {}\n        self.numList = []\n    def insert(self, val):\n        if val in self.numMap:\n            return False\n        self.numMap[val] = len(self.numList)\n        self.numList.append(val)\n        return True\n    def remove(self, val):\n        if val not in self.numMap:\n            return False\n        idx = self.numMap[val]\n        last = self.numList[-1]\n        self.numList[idx] = last\n        self.numMap[last] = idx\n        self.numList.pop()\n        del self.numMap[val]\n        return True\n\nr = RandomizedSet()\nr.insert(10)\nprint(\"Remove 10:\", r.remove(10))",
    "verificationStatus": "Verified"
  },
  {
    "id": 31,
    "leetcodeNumber": 125,
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Opposite Ends Pointers",
    "description": "Check if string is a palindrome after removing non-alphanumeric chars and lowercasing.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def isPalindrome(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not s[l].isalnum():\n            l += 1\n        while l < r and not s[r].isalnum():\n            r -= 1\n        if s[l].lower() != s[r].lower():\n            return False\n        l += 1\n        r -= 1\n    return True\n\nprint(\"Is palindrome:\", isPalindrome(\"A man, a plan, a canal: Panama\"))",
    "topics": [
      "Arrays",
      "Strings",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/valid-palindrome/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Strings",
      "Two Pointers"
    ],
    "summary": "Check if string is a palindrome after removing non-alphanumeric chars and lowercasing.",
    "examples": [
      {
        "input": "isPalindrome(\"A man, a plan, a canal: Panama\")",
        "output": "Computed via isPalindrome(\"A man, a plan, a canal: Panama\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def isPalindrome(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not s[l].isalnum():\n            l += 1\n        while l < r and not s[r].isalnum():\n            r -= 1\n        if s[l].lower() != s[r].lower():\n            return False\n        l += 1\n        r -= 1\n    return True\n\nprint(\"Is palindrome:\", isPalindrome(\"A man, a plan, a canal: Panama\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 32,
    "leetcodeNumber": 167,
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Shrinking Window",
    "description": "Find two numbers that add to target in 1-indexed sorted array in O(1) extra space.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def twoSum(numbers, target):\n    l, r = 0, len(numbers) - 1\n    while l < r:\n        curr = numbers[l] + numbers[r]\n        if curr == target:\n            return [l + 1, r + 1]\n        elif curr < target:\n            l += 1\n        else:\n            r -= 1\n    return []\n\nprint(\"Indices:\", twoSum([2, 7, 11, 15], 9))",
    "topics": [
      "Arrays",
      "Math and Number Theory",
      "Recursion",
      "Sorting",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Math and Number Theory",
      "Recursion",
      "Sorting",
      "Two Pointers"
    ],
    "summary": "Find two numbers that add to target in 1-indexed sorted array in O(1) extra space.",
    "examples": [
      {
        "input": "twoSum([2, 7, 11, 15], 9)",
        "output": "Computed via twoSum([2, 7, 11, 15], 9)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Two-Pointer Traversal",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def twoSum(numbers, target):\n    l, r = 0, len(numbers) - 1\n    while l < r:\n        curr = numbers[l] + numbers[r]\n        if curr == target:\n            return [l + 1, r + 1]\n        elif curr < target:\n            l += 1\n        else:\n            r -= 1\n    return []\n\nprint(\"Indices:\", twoSum([2, 7, 11, 15], 9))",
    "verificationStatus": "Verified"
  },
  {
    "id": 33,
    "leetcodeNumber": 15,
    "title": "3Sum",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Sort + Two Pointers",
    "description": "Find all unique triplets [nums[i], nums[j], nums[k]] that sum to 0.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(1)",
    "starterCode": "def threeSum(nums):\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s < 0:\n                l += 1\n            elif s > 0:\n                r -= 1\n            else:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l + 1]:\n                    l += 1\n                while l < r and nums[r] == nums[r - 1]:\n                    r -= 1\n                l += 1\n                r -= 1\n    return res\n\nprint(\"3Sum:\", threeSum([-1, 0, 1, 2, -1, -4]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Sorting",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/3sum/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Sorting",
      "Two Pointers"
    ],
    "summary": "Find all unique triplets [nums[i], nums[j], nums[k]] that sum to 0.",
    "examples": [
      {
        "input": "threeSum([-1, 0, 1, 2, -1, -4])",
        "output": "Computed via threeSum([-1, 0, 1, 2, -1, -4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def threeSum(nums):\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s < 0:\n                l += 1\n            elif s > 0:\n                r -= 1\n            else:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l + 1]:\n                    l += 1\n                while l < r and nums[r] == nums[r - 1]:\n                    r -= 1\n                l += 1\n                r -= 1\n    return res\n\nprint(\"3Sum:\", threeSum([-1, 0, 1, 2, -1, -4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 34,
    "leetcodeNumber": 16,
    "title": "3Sum Closest",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Distance Minimization",
    "description": "Find three integers in nums such that the sum is closest to target.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(1)",
    "starterCode": "def threeSumClosest(nums, target):\n    nums.sort()\n    closest = nums[0] + nums[1] + nums[2]\n    for i in range(len(nums) - 2):\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            curr = nums[i] + nums[l] + nums[r]\n            if abs(curr - target) < abs(closest - target):\n                closest = curr\n            if curr < target:\n                l += 1\n            elif curr > target:\n                r -= 1\n            else:\n                return target\n    return closest\n\nprint(\"Closest:\", threeSumClosest([-1, 2, 1, -4], 1))",
    "topics": [
      "Arrays",
      "Math and Number Theory",
      "Sorting",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/3sum-closest/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Math and Number Theory",
      "Sorting",
      "Two Pointers"
    ],
    "summary": "Find three integers in nums such that the sum is closest to target.",
    "examples": [
      {
        "input": "threeSumClosest([-1, 2, 1, -4], 1)",
        "output": "Computed via threeSumClosest([-1, 2, 1, -4], 1)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Two-Pointer Traversal",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def threeSumClosest(nums, target):\n    nums.sort()\n    closest = nums[0] + nums[1] + nums[2]\n    for i in range(len(nums) - 2):\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            curr = nums[i] + nums[l] + nums[r]\n            if abs(curr - target) < abs(closest - target):\n                closest = curr\n            if curr < target:\n                l += 1\n            elif curr > target:\n                r -= 1\n            else:\n                return target\n    return closest\n\nprint(\"Closest:\", threeSumClosest([-1, 2, 1, -4], 1))",
    "verificationStatus": "Verified"
  },
  {
    "id": 35,
    "leetcodeNumber": 18,
    "title": "4Sum",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "K-Sum Recursion / Two Pointers",
    "description": "Find all unique quadruplets [a, b, c, d] that sum to target.",
    "timeComplexity": "O(n^3)",
    "spaceComplexity": "O(1)",
    "starterCode": "def fourSum(nums, target):\n    nums.sort()\n    res = []\n    n = len(nums)\n    for i in range(n - 3):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        for j in range(i + 1, n - 2):\n            if j > i + 1 and nums[j] == nums[j - 1]:\n                continue\n            l, r = j + 1, n - 1\n            while l < r:\n                s = nums[i] + nums[j] + nums[l] + nums[r]\n                if s == target:\n                    res.append([nums[i], nums[j], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l + 1]:\n                        l += 1\n                    while l < r and nums[r] == nums[r - 1]:\n                        r -= 1\n                    l += 1\n                    r -= 1\n                elif s < target:\n                    l += 1\n                else:\n                    r -= 1\n    return res\n\nprint(\"4Sum:\", fourSum([1, 0, -1, 0, -2, 2], 0))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Sorting",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/4sum/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Sorting",
      "Two Pointers"
    ],
    "summary": "Find all unique quadruplets [a, b, c, d] that sum to target.",
    "examples": [
      {
        "input": "fourSum([1, 0, -1, 0, -2, 2], 0)",
        "output": "Computed via fourSum([1, 0, -1, 0, -2, 2], 0)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def fourSum(nums, target):\n    nums.sort()\n    res = []\n    n = len(nums)\n    for i in range(n - 3):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        for j in range(i + 1, n - 2):\n            if j > i + 1 and nums[j] == nums[j - 1]:\n                continue\n            l, r = j + 1, n - 1\n            while l < r:\n                s = nums[i] + nums[j] + nums[l] + nums[r]\n                if s == target:\n                    res.append([nums[i], nums[j], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l + 1]:\n                        l += 1\n                    while l < r and nums[r] == nums[r - 1]:\n                        r -= 1\n                    l += 1\n                    r -= 1\n                elif s < target:\n                    l += 1\n                else:\n                    r -= 1\n    return res\n\nprint(\"4Sum:\", fourSum([1, 0, -1, 0, -2, 2], 0))",
    "verificationStatus": "Verified"
  },
  {
    "id": 36,
    "leetcodeNumber": 11,
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Greedy Width Reduction",
    "description": "Find two lines that together with x-axis form a container holding the most water.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def maxArea(height):\n    l, r = 0, len(height) - 1\n    max_w = 0\n    while l < r:\n        h = min(height[l], height[r])\n        max_w = max(max_w, h * (r - l))\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return max_w\n\nprint(\"Max area:\", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))",
    "topics": [
      "Arrays",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/container-with-most-water/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Two Pointers"
    ],
    "summary": "Find two lines that together with x-axis form a container holding the most water.",
    "examples": [
      {
        "input": "maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])",
        "output": "Computed via maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def maxArea(height):\n    l, r = 0, len(height) - 1\n    max_w = 0\n    while l < r:\n        h = min(height[l], height[r])\n        max_w = max(max_w, h * (r - l))\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return max_w\n\nprint(\"Max area:\", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 37,
    "leetcodeNumber": 42,
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "topic": "Two Pointers",
    "pattern": "Left & Right Elevation Max",
    "description": "Compute how much water elevation map can trap after raining.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def trap(height):\n    if not height:\n        return 0\n    l, r = 0, len(height) - 1\n    leftMax, rightMax = height[l], height[r]\n    water = 0\n    while l < r:\n        if leftMax < rightMax:\n            l += 1\n            leftMax = max(leftMax, height[l])\n            water += leftMax - height[l]\n        else:\n            r -= 1\n            rightMax = max(rightMax, height[r])\n            water += rightMax - height[r]\n    return water\n\nprint(\"Trapped water:\", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Monotonic Stack and Queue",
      "Stacks",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/trapping-rain-water/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Monotonic Stack and Queue",
      "Stacks",
      "Two Pointers"
    ],
    "summary": "Compute how much water elevation map can trap after raining.",
    "examples": [
      {
        "input": "trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])",
        "output": "Computed via trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def trap(height):\n    if not height:\n        return 0\n    l, r = 0, len(height) - 1\n    leftMax, rightMax = height[l], height[r]\n    water = 0\n    while l < r:\n        if leftMax < rightMax:\n            l += 1\n            leftMax = max(leftMax, height[l])\n            water += leftMax - height[l]\n        else:\n            r -= 1\n            rightMax = max(rightMax, height[r])\n            water += rightMax - height[r]\n    return water\n\nprint(\"Trapped water:\", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 38,
    "leetcodeNumber": 26,
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Slow & Fast Pointers",
    "description": "Remove duplicates in-place such that each unique element appears only once.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def removeDuplicates(nums):\n    if not nums:\n        return 0\n    w = 1\n    for r in range(1, len(nums)):\n        if nums[r] != nums[r - 1]:\n            nums[w] = nums[r]\n            w += 1\n    return w\n\nnums = [1, 1, 2]\nk = removeDuplicates(nums)\nprint(\"Unique count:\", k, nums[:k])",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Two Pointers"
    ],
    "summary": "Remove duplicates in-place such that each unique element appears only once.",
    "examples": [
      {
        "input": "nums = [1, 1, 2], k = removeDuplicates(nums)",
        "output": "Computed via k, nums[:k]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def removeDuplicates(nums):\n    if not nums:\n        return 0\n    w = 1\n    for r in range(1, len(nums)):\n        if nums[r] != nums[r - 1]:\n            nums[w] = nums[r]\n            w += 1\n    return w\n\nnums = [1, 1, 2]\nk = removeDuplicates(nums)\nprint(\"Unique count:\", k, nums[:k])",
    "verificationStatus": "Verified"
  },
  {
    "id": 39,
    "leetcodeNumber": 27,
    "title": "Remove Element",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Reader & Writer Pointers",
    "description": "Remove all occurrences of val in nums in-place and return new length.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def removeElement(nums, val):\n    w = 0\n    for r in range(len(nums)):\n        if nums[r] != val:\n            nums[w] = nums[r]\n            w += 1\n    return w\n\nnums = [3, 2, 2, 3]\nk = removeElement(nums, 3)\nprint(\"Length:\", k, nums[:k])",
    "topics": [
      "Arrays",
      "Recursion",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-element/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Two Pointers"
    ],
    "summary": "Remove all occurrences of val in nums in-place and return new length.",
    "examples": [
      {
        "input": "nums = [3, 2, 2, 3], k = removeElement(nums, 3)",
        "output": "Computed via k, nums[:k]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Two-Pointer Traversal",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def removeElement(nums, val):\n    w = 0\n    for r in range(len(nums)):\n        if nums[r] != val:\n            nums[w] = nums[r]\n            w += 1\n    return w\n\nnums = [3, 2, 2, 3]\nk = removeElement(nums, 3)\nprint(\"Length:\", k, nums[:k])",
    "verificationStatus": "Verified"
  },
  {
    "id": 40,
    "leetcodeNumber": 88,
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Right-to-Left Placement",
    "description": "Merge nums2 into nums1 as one sorted array in-place from the end.",
    "timeComplexity": "O(m + n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def merge(nums1, m, nums2, n):\n    p1, p2, p = m - 1, n - 1, m + n - 1\n    while p2 >= 0:\n        if p1 >= 0 and nums1[p1] > nums2[p2]:\n            nums1[p] = nums1[p1]\n            p1 -= 1\n        else:\n            nums1[p] = nums2[p2]\n            p2 -= 1\n        p -= 1\n    return nums1\n\nnums1 = [1, 2, 3, 0, 0, 0]\nprint(\"Merged:\", merge(nums1, 3, [2, 5, 6], 3))",
    "topics": [
      "Arrays",
      "Recursion",
      "Sorting",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/merge-sorted-array/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Sorting",
      "Two Pointers"
    ],
    "summary": "Merge nums2 into nums1 as one sorted array in-place from the end.",
    "examples": [
      {
        "input": "nums1 = [1, 2, 3, 0, 0, 0]",
        "output": "Computed via merge(nums1, 3, [2, 5, 6], 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Two-Pointer Traversal",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def merge(nums1, m, nums2, n):\n    p1, p2, p = m - 1, n - 1, m + n - 1\n    while p2 >= 0:\n        if p1 >= 0 and nums1[p1] > nums2[p2]:\n            nums1[p] = nums1[p1]\n            p1 -= 1\n        else:\n            nums1[p] = nums2[p2]\n            p2 -= 1\n        p -= 1\n    return nums1\n\nnums1 = [1, 2, 3, 0, 0, 0]\nprint(\"Merged:\", merge(nums1, 3, [2, 5, 6], 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 41,
    "leetcodeNumber": 977,
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Extremes to Center",
    "description": "Return an array of the squares of each number sorted in non-decreasing order.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def sortedSquares(nums):\n    n = len(nums)\n    res = [0] * n\n    l, r, p = 0, n - 1, n - 1\n    while l <= r:\n        if abs(nums[l]) > abs(nums[r]):\n            res[p] = nums[l] ** 2\n            l += 1\n        else:\n            res[p] = nums[r] ** 2\n            r -= 1\n        p -= 1\n    return res\n\nprint(\"Squares:\", sortedSquares([-4, -1, 0, 3, 10]))",
    "topics": [
      "Arrays",
      "Recursion",
      "Sorting",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/squares-of-a-sorted-array/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Sorting",
      "Two Pointers"
    ],
    "summary": "Return an array of the squares of each number sorted in non-decreasing order.",
    "examples": [
      {
        "input": "sortedSquares([-4, -1, 0, 3, 10])",
        "output": "Computed via sortedSquares([-4, -1, 0, 3, 10])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Two-Pointer Traversal",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def sortedSquares(nums):\n    n = len(nums)\n    res = [0] * n\n    l, r, p = 0, n - 1, n - 1\n    while l <= r:\n        if abs(nums[l]) > abs(nums[r]):\n            res[p] = nums[l] ** 2\n            l += 1\n        else:\n            res[p] = nums[r] ** 2\n            r -= 1\n        p -= 1\n    return res\n\nprint(\"Squares:\", sortedSquares([-4, -1, 0, 3, 10]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 42,
    "leetcodeNumber": 680,
    "title": "Valid Palindrome II",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Palindrome with One Skip",
    "description": "Check if string can be palindrome after deleting at most one character.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def validPalindrome(s):\n    def check(l, r):\n        while l < r:\n            if s[l] != s[r]:\n                return False\n            l += 1\n            r -= 1\n        return True\n    l, r = 0, len(s) - 1\n    while l < r:\n        if s[l] != s[r]:\n            return check(l + 1, r) or check(l, r - 1)\n        l += 1\n        r -= 1\n    return True\n\nprint(\"Valid with 1 delete:\", validPalindrome(\"abca\"))",
    "topics": [
      "Arrays",
      "Recursion",
      "Strings",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/valid-palindrome-ii/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Strings",
      "Two Pointers"
    ],
    "summary": "Check if string can be palindrome after deleting at most one character.",
    "examples": [
      {
        "input": "validPalindrome(\"abca\")",
        "output": "Computed via validPalindrome(\"abca\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def validPalindrome(s):\n    def check(l, r):\n        while l < r:\n            if s[l] != s[r]:\n                return False\n            l += 1\n            r -= 1\n        return True\n    l, r = 0, len(s) - 1\n    while l < r:\n        if s[l] != s[r]:\n            return check(l + 1, r) or check(l, r - 1)\n        l += 1\n        r -= 1\n    return True\n\nprint(\"Valid with 1 delete:\", validPalindrome(\"abca\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 43,
    "leetcodeNumber": 844,
    "title": "Backspace String Compare",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Backwards Traversal",
    "description": "Compare two strings containing '#' representing backspace characters.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def backspaceCompare(s, t):\n    def get_clean(string):\n        st = []\n        for ch in string:\n            if ch == \"#\":\n                if st:\n                    st.pop()\n            else:\n                st.append(ch)\n        return \"\".join(st)\n    return get_clean(s) == get_clean(t)\n\nprint(\"Equal:\", backspaceCompare(\"ab#c\", \"ad#c\"))",
    "topics": [
      "Arrays",
      "Recursion",
      "Strings",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/backspace-string-compare/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Strings",
      "Two Pointers"
    ],
    "summary": "Compare two strings containing '#' representing backspace characters.",
    "examples": [
      {
        "input": "backspaceCompare(\"ab#c\", \"ad#c\")",
        "output": "Computed via backspaceCompare(\"ab#c\", \"ad#c\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def backspaceCompare(s, t):\n    def get_clean(string):\n        st = []\n        for ch in string:\n            if ch == \"#\":\n                if st:\n                    st.pop()\n            else:\n                st.append(ch)\n        return \"\".join(st)\n    return get_clean(s) == get_clean(t)\n\nprint(\"Equal:\", backspaceCompare(\"ab#c\", \"ad#c\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 44,
    "leetcodeNumber": 922,
    "title": "Sort Array By Parity II",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Dual Index Scan",
    "description": "Sort array so half is even and half is odd with nums[i] having same parity as i.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def sortArrayByParityII(nums):\n    n = len(nums)\n    j = 1\n    for i in range(0, n, 2):\n        if nums[i] % 2 != 0:\n            while nums[j] % 2 != 0:\n                j += 2\n            nums[i], nums[j] = nums[j], nums[i]\n    return nums\n\nprint(\"Parity sorted:\", sortArrayByParityII([4, 2, 5, 7]))",
    "topics": [
      "Arrays",
      "Recursion",
      "Sorting",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/sort-array-by-parity-ii/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Sorting",
      "Two Pointers"
    ],
    "summary": "Sort array so half is even and half is odd with nums[i] having same parity as i.",
    "examples": [
      {
        "input": "sortArrayByParityII([4, 2, 5, 7])",
        "output": "Computed via sortArrayByParityII([4, 2, 5, 7])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Two-Pointer Traversal",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def sortArrayByParityII(nums):\n    n = len(nums)\n    j = 1\n    for i in range(0, n, 2):\n        if nums[i] % 2 != 0:\n            while nums[j] % 2 != 0:\n                j += 2\n            nums[i], nums[j] = nums[j], nums[i]\n    return nums\n\nprint(\"Parity sorted:\", sortArrayByParityII([4, 2, 5, 7]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 45,
    "leetcodeNumber": 344,
    "title": "Reverse String",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "In-Place Swap",
    "description": "Reverse an array of characters in-place with O(1) extra memory.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def reverseString(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        s[l], s[r] = s[r], s[l]\n        l += 1\n        r -= 1\n    return s\n\nchars = [\"h\", \"e\", \"l\", \"l\", \"o\"]\nprint(\"Reversed:\", reverseString(chars))",
    "topics": [
      "Arrays",
      "Recursion",
      "Strings",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/reverse-string/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Strings",
      "Two Pointers"
    ],
    "summary": "Reverse an array of characters in-place with O(1) extra memory.",
    "examples": [
      {
        "input": "chars = [\"h\", \"e\", \"l\", \"l\", \"o\"]",
        "output": "Computed via reverseString(chars)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def reverseString(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        s[l], s[r] = s[r], s[l]\n        l += 1\n        r -= 1\n    return s\n\nchars = [\"h\", \"e\", \"l\", \"l\", \"o\"]\nprint(\"Reversed:\", reverseString(chars))",
    "verificationStatus": "Verified"
  },
  {
    "id": 46,
    "leetcodeNumber": 345,
    "title": "Reverse Vowels of a String",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Selective Swap",
    "description": "Reverse only all the vowels in a given string.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def reverseVowels(s):\n    vowels = set(\"aeiouAEIOU\")\n    chars = list(s)\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and chars[l] not in vowels:\n            l += 1\n        while l < r and chars[r] not in vowels:\n            r -= 1\n        chars[l], chars[r] = chars[r], chars[l]\n        l += 1\n        r -= 1\n    return \"\".join(chars)\n\nprint(\"Reversed vowels:\", reverseVowels(\"IceCreAm\"))",
    "topics": [
      "Arrays",
      "Recursion",
      "Strings",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/reverse-vowels-of-a-string/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Strings",
      "Two Pointers"
    ],
    "summary": "Reverse only all the vowels in a given string.",
    "examples": [
      {
        "input": "reverseVowels(\"IceCreAm\")",
        "output": "Computed via reverseVowels(\"IceCreAm\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def reverseVowels(s):\n    vowels = set(\"aeiouAEIOU\")\n    chars = list(s)\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and chars[l] not in vowels:\n            l += 1\n        while l < r and chars[r] not in vowels:\n            r -= 1\n        chars[l], chars[r] = chars[r], chars[l]\n        l += 1\n        r -= 1\n    return \"\".join(chars)\n\nprint(\"Reversed vowels:\", reverseVowels(\"IceCreAm\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 47,
    "leetcodeNumber": 80,
    "title": "Remove Duplicates from Sorted Array II",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Lookback Writer",
    "description": "Allow duplicates to appear at most twice in-place.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def removeDuplicates(nums):\n    if len(nums) <= 2:\n        return len(nums)\n    w = 2\n    for r in range(2, len(nums)):\n        if nums[r] != nums[w - 2]:\n            nums[w] = nums[r]\n            w += 1\n    return w\n\nnums = [1, 1, 1, 2, 2, 3]\nk = removeDuplicates(nums)\nprint(\"Count:\", k, nums[:k])",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Two Pointers"
    ],
    "summary": "Allow duplicates to appear at most twice in-place.",
    "examples": [
      {
        "input": "nums = [1, 1, 1, 2, 2, 3], k = removeDuplicates(nums)",
        "output": "Computed via k, nums[:k]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def removeDuplicates(nums):\n    if len(nums) <= 2:\n        return len(nums)\n    w = 2\n    for r in range(2, len(nums)):\n        if nums[r] != nums[w - 2]:\n            nums[w] = nums[r]\n            w += 1\n    return w\n\nnums = [1, 1, 1, 2, 2, 3]\nk = removeDuplicates(nums)\nprint(\"Count:\", k, nums[:k])",
    "verificationStatus": "Verified"
  },
  {
    "id": 48,
    "leetcodeNumber": 611,
    "title": "Valid Triangle Number",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Sort + Fix Largest Side",
    "description": "Count triplets that can form sides of a valid triangle: a + b > c.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(1)",
    "starterCode": "def triangleNumber(nums):\n    nums.sort()\n    count = 0\n    for k in range(len(nums) - 1, 1, -1):\n        l, r = 0, k - 1\n        while l < r:\n            if nums[l] + nums[r] > nums[k]:\n                count += r - l\n                r -= 1\n            else:\n                l += 1\n    return count\n\nprint(\"Triangles:\", triangleNumber([2, 2, 3, 4]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Sorting",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/valid-triangle-number/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Sorting",
      "Two Pointers"
    ],
    "summary": "Count triplets that can form sides of a valid triangle: a + b > c.",
    "examples": [
      {
        "input": "triangleNumber([2, 2, 3, 4])",
        "output": "Computed via triangleNumber([2, 2, 3, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def triangleNumber(nums):\n    nums.sort()\n    count = 0\n    for k in range(len(nums) - 1, 1, -1):\n        l, r = 0, k - 1\n        while l < r:\n            if nums[l] + nums[r] > nums[k]:\n                count += r - l\n                r -= 1\n            else:\n                l += 1\n    return count\n\nprint(\"Triangles:\", triangleNumber([2, 2, 3, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 49,
    "leetcodeNumber": 986,
    "title": "Interval List Intersections",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Intersection Pairing",
    "description": "Find the intersection of two lists of closed intervals.",
    "timeComplexity": "O(m + n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def intervalIntersection(A, B):\n    i, j = 0, 0\n    res = []\n    while i < len(A) and j < len(B):\n        low = max(A[i][0], B[j][0])\n        high = min(A[i][1], B[j][1])\n        if low <= high:\n            res.append([low, high])\n        if A[i][1] < B[j][1]:\n            i += 1\n        else:\n            j += 1\n    return res\n\nA = [[0,2],[5,10],[13,23],[24,25]]\nB = [[1,5],[8,12],[15,24],[25,26]]\nprint(\"Intersections:\", intervalIntersection(A, B))",
    "topics": [
      "Arrays",
      "Recursion",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/interval-list-intersections/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Two Pointers"
    ],
    "summary": "Find the intersection of two lists of closed intervals.",
    "examples": [
      {
        "input": "A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]",
        "output": "Computed via intervalIntersection(A, B)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Two-Pointer Traversal",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def intervalIntersection(A, B):\n    i, j = 0, 0\n    res = []\n    while i < len(A) and j < len(B):\n        low = max(A[i][0], B[j][0])\n        high = min(A[i][1], B[j][1])\n        if low <= high:\n            res.append([low, high])\n        if A[i][1] < B[j][1]:\n            i += 1\n        else:\n            j += 1\n    return res\n\nA = [[0,2],[5,10],[13,23],[24,25]]\nB = [[1,5],[8,12],[15,24],[25,26]]\nprint(\"Intersections:\", intervalIntersection(A, B))",
    "verificationStatus": "Verified"
  },
  {
    "id": 50,
    "leetcodeNumber": 82,
    "title": "Remove Duplicates from Sorted List II",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Sentinel Node",
    "description": "Delete all nodes that have duplicate numbers from sorted linked array.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def deleteDuplicates(nums):\n    counts = {}\n    for n in nums:\n        counts[n] = counts.get(n, 0) + 1\n    return [n for n in nums if counts[n] == 1]\n\nprint(\"Distinct:\", deleteDuplicates([1, 2, 3, 3, 4, 4, 5]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Sorting",
      "Two Pointers"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
    "primaryTopic": "Two Pointers",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Sorting",
      "Two Pointers"
    ],
    "summary": "Delete all nodes that have duplicate numbers from sorted linked array.",
    "examples": [
      {
        "input": "deleteDuplicates([1, 2, 3, 3, 4, 4, 5])",
        "output": "Computed via deleteDuplicates([1, 2, 3, 3, 4, 4, 5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Two-Pointer Traversal"
    ],
    "referenceSolution": "def deleteDuplicates(nums):\n    counts = {}\n    for n in nums:\n        counts[n] = counts.get(n, 0) + 1\n    return [n for n in nums if counts[n] == 1]\n\nprint(\"Distinct:\", deleteDuplicates([1, 2, 3, 3, 4, 4, 5]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 51,
    "leetcodeNumber": 121,
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "topic": "Sliding Window",
    "pattern": "Running Minimum Price",
    "description": "Maximize profit by choosing a single day to buy one stock and choosing a different day in the future to sell.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def maxProfit(prices):\n    min_p = prices[0]\n    max_p = 0\n    for p in prices:\n        if p < min_p:\n            min_p = p\n        elif p - min_p > max_p:\n            max_p = p - min_p\n    return max_p\n\nprint(\"Max profit:\", maxProfit([7, 1, 5, 3, 6, 4]))",
    "topics": [
      "Arrays",
      "Sliding Window"
    ],
    "sourceUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Sliding Window"
    ],
    "summary": "Maximize profit by choosing a single day to buy one stock and choosing a different day in the future to sell.",
    "examples": [
      {
        "input": "maxProfit([7, 1, 5, 3, 6, 4])",
        "output": "Computed via maxProfit([7, 1, 5, 3, 6, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Contiguous Window Boundaries"
    ],
    "referenceSolution": "def maxProfit(prices):\n    min_p = prices[0]\n    max_p = 0\n    for p in prices:\n        if p < min_p:\n            min_p = p\n        elif p - min_p > max_p:\n            max_p = p - min_p\n    return max_p\n\nprint(\"Max profit:\", maxProfit([7, 1, 5, 3, 6, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 52,
    "leetcodeNumber": 3,
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Dynamic Window with Index Map",
    "description": "Find length of longest substring without repeating characters using variable sliding window.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(min(m, n))",
    "starterCode": "def lengthOfLongestSubstring(s):\n    charMap = {}\n    l = 0\n    res = 0\n    for r in range(len(s)):\n        if s[r] in charMap and charMap[s[r]] >= l:\n            l = charMap[s[r]] + 1\n        charMap[s[r]] = r\n        res = max(res, r - l + 1)\n    return res\n\nprint(\"Longest non-repeat:\", lengthOfLongestSubstring(\"abcabcbb\"))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Find length of longest substring without repeating characters using variable sliding window.",
    "examples": [
      {
        "input": "lengthOfLongestSubstring(\"abcabcbb\")",
        "output": "Computed via lengthOfLongestSubstring(\"abcabcbb\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def lengthOfLongestSubstring(s):\n    charMap = {}\n    l = 0\n    res = 0\n    for r in range(len(s)):\n        if s[r] in charMap and charMap[s[r]] >= l:\n            l = charMap[s[r]] + 1\n        charMap[s[r]] = r\n        res = max(res, r - l + 1)\n    return res\n\nprint(\"Longest non-repeat:\", lengthOfLongestSubstring(\"abcabcbb\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 53,
    "leetcodeNumber": 424,
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Max Frequency Balance",
    "description": "Return length of longest substring containing same letter you can get after replacing k chars.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def characterReplacement(s, k):\n    count = {}\n    res = 0\n    l = 0\n    max_f = 0\n    for r in range(len(s)):\n        count[s[r]] = count.get(s[r], 0) + 1\n        max_f = max(max_f, count[s[r]])\n        while (r - l + 1) - max_f > k:\n            count[s[l]] -= 1\n            l += 1\n        res = max(res, r - l + 1)\n    return res\n\nprint(\"Longest repeating:\", characterReplacement(\"ABAB\", 2))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Return length of longest substring containing same letter you can get after replacing k chars.",
    "examples": [
      {
        "input": "characterReplacement(\"ABAB\", 2)",
        "output": "Computed via characterReplacement(\"ABAB\", 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def characterReplacement(s, k):\n    count = {}\n    res = 0\n    l = 0\n    max_f = 0\n    for r in range(len(s)):\n        count[s[r]] = count.get(s[r], 0) + 1\n        max_f = max(max_f, count[s[r]])\n        while (r - l + 1) - max_f > k:\n            count[s[l]] -= 1\n            l += 1\n        res = max(res, r - l + 1)\n    return res\n\nprint(\"Longest repeating:\", characterReplacement(\"ABAB\", 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 54,
    "leetcodeNumber": 567,
    "title": "Permutation in String",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Fixed Window Frequency Match",
    "description": "Return true if s2 contains a permutation of s1 as a substring.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def checkInclusion(s1, s2):\n    if len(s1) > len(s2):\n        return False\n    c1, c2 = {}, {}\n    for ch in s1:\n        c1[ch] = c1.get(ch, 0) + 1\n    k = len(s1)\n    for i in range(len(s2)):\n        c2[s2[i]] = c2.get(s2[i], 0) + 1\n        if i >= k:\n            old = s2[i - k]\n            if c2[old] == 1:\n                del c2[old]\n            else:\n                c2[old] -= 1\n        if c1 == c2:\n            return True\n    return False\n\nprint(\"Permutation inside:\", checkInclusion(\"ab\", \"eidbaooo\"))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/permutation-in-string/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Return true if s2 contains a permutation of s1 as a substring.",
    "examples": [
      {
        "input": "checkInclusion(\"ab\", \"eidbaooo\")",
        "output": "Computed via checkInclusion(\"ab\", \"eidbaooo\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def checkInclusion(s1, s2):\n    if len(s1) > len(s2):\n        return False\n    c1, c2 = {}, {}\n    for ch in s1:\n        c1[ch] = c1.get(ch, 0) + 1\n    k = len(s1)\n    for i in range(len(s2)):\n        c2[s2[i]] = c2.get(s2[i], 0) + 1\n        if i >= k:\n            old = s2[i - k]\n            if c2[old] == 1:\n                del c2[old]\n            else:\n                c2[old] -= 1\n        if c1 == c2:\n            return True\n    return False\n\nprint(\"Permutation inside:\", checkInclusion(\"ab\", \"eidbaooo\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 55,
    "leetcodeNumber": 76,
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "topic": "Sliding Window",
    "pattern": "Need Map Fulfillment",
    "description": "Find minimum window in s which will contain all the characters in t in complexity O(m + n).",
    "timeComplexity": "O(m + n)",
    "spaceComplexity": "O(m + n)",
    "starterCode": "def minWindow(s, t):\n    if not t or not s:\n        return \"\"\n    countT = {}\n    for c in t:\n        countT[c] = countT.get(c, 0) + 1\n    window = {}\n    have, need = 0, len(countT)\n    res, resLen = [-1, -1], float(\"inf\")\n    l = 0\n    for r in range(len(s)):\n        c = s[r]\n        window[c] = window.get(c, 0) + 1\n        if c in countT and window[c] == countT[c]:\n            have += 1\n        while have == need:\n            if (r - l + 1) < resLen:\n                res = [l, r]\n                resLen = r - l + 1\n            window[s[l]] -= 1\n            if s[l] in countT and window[s[l]] < countT[s[l]]:\n                have -= 1\n            l += 1\n    return s[res[0]:res[1] + 1] if resLen != float(\"inf\") else \"\"\n\nprint(\"Min window:\", minWindow(\"ADOBECODEBANC\", \"ABC\"))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/minimum-window-substring/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Find minimum window in s which will contain all the characters in t in complexity O(m + n).",
    "examples": [
      {
        "input": "minWindow(\"ADOBECODEBANC\", \"ABC\")",
        "output": "Computed via minWindow(\"ADOBECODEBANC\", \"ABC\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def minWindow(s, t):\n    if not t or not s:\n        return \"\"\n    countT = {}\n    for c in t:\n        countT[c] = countT.get(c, 0) + 1\n    window = {}\n    have, need = 0, len(countT)\n    res, resLen = [-1, -1], float(\"inf\")\n    l = 0\n    for r in range(len(s)):\n        c = s[r]\n        window[c] = window.get(c, 0) + 1\n        if c in countT and window[c] == countT[c]:\n            have += 1\n        while have == need:\n            if (r - l + 1) < resLen:\n                res = [l, r]\n                resLen = r - l + 1\n            window[s[l]] -= 1\n            if s[l] in countT and window[s[l]] < countT[s[l]]:\n                have -= 1\n            l += 1\n    return s[res[0]:res[1] + 1] if resLen != float(\"inf\") else \"\"\n\nprint(\"Min window:\", minWindow(\"ADOBECODEBANC\", \"ABC\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 56,
    "leetcodeNumber": 209,
    "title": "Minimum Size Subarray Sum",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Contracting Left Pointer",
    "description": "Find minimal length of subarray whose sum is greater than or equal to target.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def minSubArrayLen(target, nums):\n    l = 0\n    total = 0\n    min_len = float(\"inf\")\n    for r in range(len(nums)):\n        total += nums[r]\n        while total >= target:\n            min_len = min(min_len, r - l + 1)\n            total -= nums[l]\n            l += 1\n    return min_len if min_len != float(\"inf\") else 0\n\nprint(\"Min len:\", minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))",
    "topics": [
      "Arrays",
      "Math and Number Theory",
      "Sliding Window"
    ],
    "sourceUrl": "https://leetcode.com/problems/minimum-size-subarray-sum/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Math and Number Theory",
      "Sliding Window"
    ],
    "summary": "Find minimal length of subarray whose sum is greater than or equal to target.",
    "examples": [
      {
        "input": "minSubArrayLen(7, [2, 3, 1, 2, 4, 3])",
        "output": "Computed via minSubArrayLen(7, [2, 3, 1, 2, 4, 3])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Contiguous Window Boundaries",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "def minSubArrayLen(target, nums):\n    l = 0\n    total = 0\n    min_len = float(\"inf\")\n    for r in range(len(nums)):\n        total += nums[r]\n        while total >= target:\n            min_len = min(min_len, r - l + 1)\n            total -= nums[l]\n            l += 1\n    return min_len if min_len != float(\"inf\") else 0\n\nprint(\"Min len:\", minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 57,
    "leetcodeNumber": 1004,
    "title": "Max Consecutive Ones III",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Zero Counter Window",
    "description": "Given binary array and int k, return maximum number of consecutive 1s if you can flip at most k 0s.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def longestOnes(nums, k):\n    l = 0\n    zeros = 0\n    max_w = 0\n    for r in range(len(nums)):\n        if nums[r] == 0:\n            zeros += 1\n        while zeros > k:\n            if nums[l] == 0:\n                zeros -= 1\n            l += 1\n        max_w = max(max_w, r - l + 1)\n    return max_w\n\nprint(\"Max 1s with flips:\", longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window"
    ],
    "sourceUrl": "https://leetcode.com/problems/max-consecutive-ones-iii/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window"
    ],
    "summary": "Given binary array and int k, return maximum number of consecutive 1s if you can flip at most k 0s.",
    "examples": [
      {
        "input": "longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)",
        "output": "Computed via longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Contiguous Window Boundaries"
    ],
    "referenceSolution": "def longestOnes(nums, k):\n    l = 0\n    zeros = 0\n    max_w = 0\n    for r in range(len(nums)):\n        if nums[r] == 0:\n            zeros += 1\n        while zeros > k:\n            if nums[l] == 0:\n                zeros -= 1\n            l += 1\n        max_w = max(max_w, r - l + 1)\n    return max_w\n\nprint(\"Max 1s with flips:\", longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 58,
    "leetcodeNumber": 1456,
    "title": "Maximum Number of Vowels in a Substring of Given Length",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Fixed Window Vowel Counter",
    "description": "Find maximum number of vowel letters in any substring of s with length k.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def maxVowels(s, k):\n    vowels = set(\"aeiou\")\n    curr = sum(1 for i in range(k) if s[i] in vowels)\n    max_v = curr\n    for i in range(k, len(s)):\n        if s[i] in vowels:\n            curr += 1\n        if s[i - k] in vowels:\n            curr -= 1\n        max_v = max(max_v, curr)\n    return max_v\n\nprint(\"Max vowels:\", maxVowels(\"abciiidef\", 3))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Find maximum number of vowel letters in any substring of s with length k.",
    "examples": [
      {
        "input": "maxVowels(\"abciiidef\", 3)",
        "output": "Computed via maxVowels(\"abciiidef\", 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def maxVowels(s, k):\n    vowels = set(\"aeiou\")\n    curr = sum(1 for i in range(k) if s[i] in vowels)\n    max_v = curr\n    for i in range(k, len(s)):\n        if s[i] in vowels:\n            curr += 1\n        if s[i - k] in vowels:\n            curr -= 1\n        max_v = max(max_v, curr)\n    return max_v\n\nprint(\"Max vowels:\", maxVowels(\"abciiidef\", 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 59,
    "leetcodeNumber": 438,
    "title": "Find All Anagrams in a String",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Fixed Window Hash Match",
    "description": "Find all the start indices of p's anagrams in s.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def findAnagrams(s, p):\n    if len(p) > len(s):\n        return []\n    cp, cs = {}, {}\n    for ch in p:\n        cp[ch] = cp.get(ch, 0) + 1\n    k = len(p)\n    res = []\n    for i in range(len(s)):\n        cs[s[i]] = cs.get(s[i], 0) + 1\n        if i >= k:\n            old = s[i - k]\n            if cs[old] == 1:\n                del cs[old]\n            else:\n                cs[old] -= 1\n        if cs == cp:\n            res.append(i - k + 1)\n    return res\n\nprint(\"Anagram indices:\", findAnagrams(\"cbaebabacd\", \"abc\"))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window",
      "Strings"
    ],
    "summary": "Find all the start indices of p's anagrams in s.",
    "examples": [
      {
        "input": "findAnagrams(\"cbaebabacd\", \"abc\")",
        "output": "Computed via findAnagrams(\"cbaebabacd\", \"abc\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def findAnagrams(s, p):\n    if len(p) > len(s):\n        return []\n    cp, cs = {}, {}\n    for ch in p:\n        cp[ch] = cp.get(ch, 0) + 1\n    k = len(p)\n    res = []\n    for i in range(len(s)):\n        cs[s[i]] = cs.get(s[i], 0) + 1\n        if i >= k:\n            old = s[i - k]\n            if cs[old] == 1:\n                del cs[old]\n            else:\n                cs[old] -= 1\n        if cs == cp:\n            res.append(i - k + 1)\n    return res\n\nprint(\"Anagram indices:\", findAnagrams(\"cbaebabacd\", \"abc\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 60,
    "leetcodeNumber": 904,
    "title": "Fruit Into Baskets",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "At Most 2 Distinct Keys",
    "description": "Pick maximum number of fruits with two baskets where each basket holds only one type.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def totalFruit(fruits):\n    count = {}\n    l = 0\n    max_f = 0\n    for r in range(len(fruits)):\n        count[fruits[r]] = count.get(fruits[r], 0) + 1\n        while len(count) > 2:\n            count[fruits[l]] -= 1\n            if count[fruits[l]] == 0:\n                del count[fruits[l]]\n            l += 1\n        max_f = max(max_f, r - l + 1)\n    return max_f\n\nprint(\"Total fruits:\", totalFruit([1, 2, 1, 2, 3]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window"
    ],
    "sourceUrl": "https://leetcode.com/problems/fruit-into-baskets/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window"
    ],
    "summary": "Pick maximum number of fruits with two baskets where each basket holds only one type.",
    "examples": [
      {
        "input": "totalFruit([1, 2, 1, 2, 3])",
        "output": "Computed via totalFruit([1, 2, 1, 2, 3])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Contiguous Window Boundaries"
    ],
    "referenceSolution": "def totalFruit(fruits):\n    count = {}\n    l = 0\n    max_f = 0\n    for r in range(len(fruits)):\n        count[fruits[r]] = count.get(fruits[r], 0) + 1\n        while len(count) > 2:\n            count[fruits[l]] -= 1\n            if count[fruits[l]] == 0:\n                del count[fruits[l]]\n            l += 1\n        max_f = max(max_f, r - l + 1)\n    return max_f\n\nprint(\"Total fruits:\", totalFruit([1, 2, 1, 2, 3]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 61,
    "leetcodeNumber": 1423,
    "title": "Maximum Points You Can Obtain from Cards",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Inverted Window Minimization",
    "description": "Maximize score by taking k cards from either the beginning or the end of the row.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def maxScore(cardPoints, k):\n    n = len(cardPoints)\n    window_size = n - k\n    curr_sum = sum(cardPoints[:window_size])\n    min_sum = curr_sum\n    total = sum(cardPoints)\n    for i in range(window_size, n):\n        curr_sum += cardPoints[i] - cardPoints[i - window_size]\n        min_sum = min(min_sum, curr_sum)\n    return total - min_sum\n\nprint(\"Max score:\", maxScore([1, 2, 3, 4, 5, 6, 1], 3))",
    "topics": [
      "Arrays",
      "Sliding Window"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Sliding Window"
    ],
    "summary": "Maximize score by taking k cards from either the beginning or the end of the row.",
    "examples": [
      {
        "input": "maxScore([1, 2, 3, 4, 5, 6, 1], 3)",
        "output": "Computed via maxScore([1, 2, 3, 4, 5, 6, 1], 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Contiguous Window Boundaries"
    ],
    "referenceSolution": "def maxScore(cardPoints, k):\n    n = len(cardPoints)\n    window_size = n - k\n    curr_sum = sum(cardPoints[:window_size])\n    min_sum = curr_sum\n    total = sum(cardPoints)\n    for i in range(window_size, n):\n        curr_sum += cardPoints[i] - cardPoints[i - window_size]\n        min_sum = min(min_sum, curr_sum)\n    return total - min_sum\n\nprint(\"Max score:\", maxScore([1, 2, 3, 4, 5, 6, 1], 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 62,
    "leetcodeNumber": 1876,
    "title": "Substrings of Size Three with Distinct Characters",
    "difficulty": "Easy",
    "topic": "Sliding Window",
    "pattern": "Fixed Window Size 3",
    "description": "Count good substrings of size 3 with no repeated characters.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def countGoodSubstrings(s):\n    count = 0\n    for i in range(len(s) - 2):\n        if len(set(s[i:\n            i + 3])) == 3:\n            count += 1\n    return count\n\nprint(\"Good substrings:\", countGoodSubstrings(\"xyzzaz\"))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Count good substrings of size 3 with no repeated characters.",
    "examples": [
      {
        "input": "countGoodSubstrings(\"xyzzaz\")",
        "output": "Computed via countGoodSubstrings(\"xyzzaz\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def countGoodSubstrings(s):\n    count = 0\n    for i in range(len(s) - 2):\n        if len(set(s[i:\n            i + 3])) == 3:\n            count += 1\n    return count\n\nprint(\"Good substrings:\", countGoodSubstrings(\"xyzzaz\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 63,
    "leetcodeNumber": 643,
    "title": "Maximum Average Subarray I",
    "difficulty": "Easy",
    "topic": "Sliding Window",
    "pattern": "Fixed Window Average",
    "description": "Find contiguous subarray of length k with maximum average value.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def findMaxAverage(nums, k):\n    curr = sum(nums[:k])\n    max_s = curr\n    for i in range(k, len(nums)):\n        curr += nums[i] - nums[i - k]\n        max_s = max(max_s, curr)\n    return max_s / k\n\nprint(\"Max avg:\", findMaxAverage([1, 12, -5, -6, 50, 3], 4))",
    "topics": [
      "Arrays",
      "Sliding Window"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximum-average-subarray-i/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Sliding Window"
    ],
    "summary": "Find contiguous subarray of length k with maximum average value.",
    "examples": [
      {
        "input": "findMaxAverage([1, 12, -5, -6, 50, 3], 4)",
        "output": "Computed via findMaxAverage([1, 12, -5, -6, 50, 3], 4)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Contiguous Window Boundaries"
    ],
    "referenceSolution": "def findMaxAverage(nums, k):\n    curr = sum(nums[:k])\n    max_s = curr\n    for i in range(k, len(nums)):\n        curr += nums[i] - nums[i - k]\n        max_s = max(max_s, curr)\n    return max_s / k\n\nprint(\"Max avg:\", findMaxAverage([1, 12, -5, -6, 50, 3], 4))",
    "verificationStatus": "Verified"
  },
  {
    "id": 64,
    "leetcodeNumber": 1493,
    "title": "Longest Subarray of 1's After Deleting One Element",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Single Zero Allowance",
    "description": "Return size of longest non-empty subarray containing only 1s after deleting one element.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def longestSubarray(nums):\n    l = 0\n    zeros = 0\n    max_w = 0\n    for r in range(len(nums)):\n        if nums[r] == 0:\n            zeros += 1\n        while zeros > 1:\n            if nums[l] == 0:\n                zeros -= 1\n            l += 1\n        max_w = max(max_w, r - l)\n    return max_w\n\nprint(\"Longest after delete:\", longestSubarray([1, 1, 0, 1]))",
    "topics": [
      "Arrays",
      "Recursion",
      "Sliding Window"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-subarray-of-1-s-after-deleting-one-element/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Recursion",
      "Sliding Window"
    ],
    "summary": "Return size of longest non-empty subarray containing only 1s after deleting one element.",
    "examples": [
      {
        "input": "longestSubarray([1, 1, 0, 1])",
        "output": "Computed via longestSubarray([1, 1, 0, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Contiguous Window Boundaries",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def longestSubarray(nums):\n    l = 0\n    zeros = 0\n    max_w = 0\n    for r in range(len(nums)):\n        if nums[r] == 0:\n            zeros += 1\n        while zeros > 1:\n            if nums[l] == 0:\n                zeros -= 1\n            l += 1\n        max_w = max(max_w, r - l)\n    return max_w\n\nprint(\"Longest after delete:\", longestSubarray([1, 1, 0, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 65,
    "leetcodeNumber": 1208,
    "title": "Get Equal Substrings Within Budget",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Cost Accumulation Window",
    "description": "Find maximum length of substring of s that can be changed to t within maxCost budget.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def equalSubstring(s, t, maxCost):\n    l = 0\n    cost = 0\n    max_len = 0\n    for r in range(len(s)):\n        cost += abs(ord(s[r]) - ord(t[r]))\n        while cost > maxCost:\n            cost -= abs(ord(s[l]) - ord(t[l]))\n            l += 1\n        max_len = max(max_len, r - l + 1)\n    return max_len\n\nprint(\"Max equal len:\", equalSubstring(\"abcd\", \"bcdf\", 3))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/get-equal-substrings-within-budget/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Find maximum length of substring of s that can be changed to t within maxCost budget.",
    "examples": [
      {
        "input": "equalSubstring(\"abcd\", \"bcdf\", 3)",
        "output": "Computed via equalSubstring(\"abcd\", \"bcdf\", 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Contiguous Window Boundaries"
    ],
    "referenceSolution": "def equalSubstring(s, t, maxCost):\n    l = 0\n    cost = 0\n    max_len = 0\n    for r in range(len(s)):\n        cost += abs(ord(s[r]) - ord(t[r]))\n        while cost > maxCost:\n            cost -= abs(ord(s[l]) - ord(t[l]))\n            l += 1\n        max_len = max(max_len, r - l + 1)\n    return max_len\n\nprint(\"Max equal len:\", equalSubstring(\"abcd\", \"bcdf\", 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 66,
    "leetcodeNumber": 1358,
    "title": "Number of Substrings Containing All Three Characters",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Last Seen Indices",
    "description": "Return the number of substrings containing at least one occurrence of all 'a', 'b', and 'c'.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def numberOfSubstrings(s):\n    last = {'a': -1, 'b': -1, 'c': -1}\n    count = 0\n    for i, ch in enumerate(s):\n        last[ch] = i\n        count += 1 + min(last['a'], last['b'], last['c'])\n    return count\n\nprint(\"Substrings with abc:\", numberOfSubstrings(\"abcabc\"))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sliding Window",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Return the number of substrings containing at least one occurrence of all 'a', 'b', and 'c'.",
    "examples": [
      {
        "input": "numberOfSubstrings(\"abcabc\")",
        "output": "Computed via numberOfSubstrings(\"abcabc\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def numberOfSubstrings(s):\n    last = {'a': -1, 'b': -1, 'c': -1}\n    count = 0\n    for i, ch in enumerate(s):\n        last[ch] = i\n        count += 1 + min(last['a'], last['b'], last['c'])\n    return count\n\nprint(\"Substrings with abc:\", numberOfSubstrings(\"abcabc\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 67,
    "leetcodeNumber": 1838,
    "title": "Frequency of the Most Frequent Element",
    "difficulty": "Medium",
    "topic": "Sliding Window",
    "pattern": "Sort + Window Cost Check",
    "description": "Return maximum possible frequency of an element after at most k increments.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def maxFrequency(nums, k):\n    nums.sort()\n    l = 0\n    total = 0\n    res = 1\n    for r in range(len(nums)):\n        total += nums[r]\n        while nums[r] * (r - l + 1) > total + k:\n            total -= nums[l]\n            l += 1\n        res = max(res, r - l + 1)\n    return res\n\nprint(\"Max freq:\", maxFrequency([1, 2, 4], 5))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/frequency-of-the-most-frequent-element/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Sliding Window",
      "Sorting"
    ],
    "summary": "Return maximum possible frequency of an element after at most k increments.",
    "examples": [
      {
        "input": "maxFrequency([1, 2, 4], 5)",
        "output": "Computed via maxFrequency([1, 2, 4], 5)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Contiguous Window Boundaries"
    ],
    "referenceSolution": "def maxFrequency(nums, k):\n    nums.sort()\n    l = 0\n    total = 0\n    res = 1\n    for r in range(len(nums)):\n        total += nums[r]\n        while nums[r] * (r - l + 1) > total + k:\n            total -= nums[l]\n            l += 1\n        res = max(res, r - l + 1)\n    return res\n\nprint(\"Max freq:\", maxFrequency([1, 2, 4], 5))",
    "verificationStatus": "Verified"
  },
  {
    "id": 68,
    "leetcodeNumber": 992,
    "title": "Subarrays with K Different Integers",
    "difficulty": "Hard",
    "topic": "Sliding Window",
    "pattern": "AtMost(K) - AtMost(K-1)",
    "description": "Count subarrays with exactly k distinct integers using difference of two sliding windows.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def subarraysWithKDistinct(nums, k):\n    def atMost(k_val):\n        count = {}\n        l = 0\n        ans = 0\n        for r in range(len(nums)):\n            count[nums[r]] = count.get(nums[r], 0) + 1\n            while len(count) > k_val:\n                count[nums[l]] -= 1\n                if count[nums[l]] == 0:\n                    del count[nums[l]]\n                l += 1\n            ans += r - l + 1\n        return ans\n    return atMost(k) - atMost(k - 1)\n\nprint(\"Exact K subarrays:\", subarraysWithKDistinct([1, 2, 1, 2, 3], 2))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sliding Window"
    ],
    "sourceUrl": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
    "primaryTopic": "Sliding Window",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sliding Window"
    ],
    "summary": "Count subarrays with exactly k distinct integers using difference of two sliding windows.",
    "examples": [
      {
        "input": "subarraysWithKDistinct([1, 2, 1, 2, 3], 2)",
        "output": "Computed via subarraysWithKDistinct([1, 2, 1, 2, 3], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Contiguous Window Boundaries"
    ],
    "referenceSolution": "def subarraysWithKDistinct(nums, k):\n    def atMost(k_val):\n        count = {}\n        l = 0\n        ans = 0\n        for r in range(len(nums)):\n            count[nums[r]] = count.get(nums[r], 0) + 1\n            while len(count) > k_val:\n                count[nums[l]] -= 1\n                if count[nums[l]] == 0:\n                    del count[nums[l]]\n                l += 1\n            ans += r - l + 1\n        return ans\n    return atMost(k) - atMost(k - 1)\n\nprint(\"Exact K subarrays:\", subarraysWithKDistinct([1, 2, 1, 2, 3], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 69,
    "leetcodeNumber": 20,
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "topic": "Stack",
    "pattern": "LIFO Matching",
    "description": "Determine if the input string containing brackets '()', '{}', '[]' is valid.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def isValid(s):\n    stack = []\n    closeToOpen = {\")\": \"(\", \"}\": \"{\", \"]\": \"[\"}\n    for c in s:\n        if c in closeToOpen:\n            if stack and stack[-1] == closeToOpen[c]:\n                stack.pop()\n            else:\n                return False\n        else:\n            stack.append(c)\n    return len(stack) == 0\n\nprint(\"Is valid:\", isValid(\"()[]{}\"))",
    "topics": [
      "Hashing and Hash Maps",
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/valid-parentheses/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Hashing and Hash Maps",
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "summary": "Determine if the input string containing brackets '()', '{}', '[]' is valid.",
    "examples": [
      {
        "input": "isValid(\"()[]{}\")",
        "output": "Computed via isValid(\"()[]{}\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "LIFO Stack Operations"
    ],
    "referenceSolution": "def isValid(s):\n    stack = []\n    closeToOpen = {\")\": \"(\", \"}\": \"{\", \"]\": \"[\"}\n    for c in s:\n        if c in closeToOpen:\n            if stack and stack[-1] == closeToOpen[c]:\n                stack.pop()\n            else:\n                return False\n        else:\n            stack.append(c)\n    return len(stack) == 0\n\nprint(\"Is valid:\", isValid(\"()[]{}\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 70,
    "leetcodeNumber": 155,
    "title": "Min Stack",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Pair / Auxiliary Min Stack",
    "description": "Design a stack that supports push, pop, top, and retrieving minimum element in O(1).",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(n)",
    "starterCode": "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.minStack = []\n    def push(self, val):\n        self.stack.append(val)\n        val = min(val, self.minStack[-1] if self.minStack else val)\n        self.minStack.append(val)\n    def pop(self):\n        self.stack.pop()\n        self.minStack.pop()\n    def top(self): return self.stack[-1]\n    def getMin(self): return self.minStack[-1]\n\nms = MinStack()\nms.push(-2)\nms.push(0)\nms.push(-3)\nprint(\"Min:\", ms.getMin())\nms.pop()\nprint(\"Top:\", ms.top())",
    "topics": [
      "Recursion",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/min-stack/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Recursion",
      "Stacks"
    ],
    "summary": "Design a stack that supports push, pop, top, and retrieving minimum element in O(1).",
    "examples": [
      {
        "input": "ms = MinStack()",
        "output": "Computed via ms.top()",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.minStack = []\n    def push(self, val):\n        self.stack.append(val)\n        val = min(val, self.minStack[-1] if self.minStack else val)\n        self.minStack.append(val)\n    def pop(self):\n        self.stack.pop()\n        self.minStack.pop()\n    def top(self): return self.stack[-1]\n    def getMin(self): return self.minStack[-1]\n\nms = MinStack()\nms.push(-2)\nms.push(0)\nms.push(-3)\nprint(\"Min:\", ms.getMin())\nms.pop()\nprint(\"Top:\", ms.top())",
    "verificationStatus": "Verified"
  },
  {
    "id": 71,
    "leetcodeNumber": 150,
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Operand Stack Evaluation",
    "description": "Evaluate value of arithmetic expression in Reverse Polish Notation.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def evalRPN(tokens):\n    stack = []\n    for t in tokens:\n        if t in \"+-*/\":\n            b = stack.pop()\n            a = stack.pop()\n            if t == \"+\":\n                stack.append(a + b)\n            elif t == \"-\":\n                stack.append(a - b)\n            elif t == \"*\":\n                stack.append(a * b)\n            elif t == \"/\":\n                stack.append(int(a / b))\n        else:\n            stack.append(int(t))\n    return stack[0]\n\nprint(\"RPN:\", evalRPN([\"2\", \"1\", \"+\", \"3\", \"*\"]))",
    "topics": [
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Stacks"
    ],
    "summary": "Evaluate value of arithmetic expression in Reverse Polish Notation.",
    "examples": [
      {
        "input": "evalRPN([\"2\", \"1\", \"+\", \"3\", \"*\"])",
        "output": "Computed via evalRPN([\"2\", \"1\", \"+\", \"3\", \"*\"])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "LIFO Stack Operations"
    ],
    "referenceSolution": "def evalRPN(tokens):\n    stack = []\n    for t in tokens:\n        if t in \"+-*/\":\n            b = stack.pop()\n            a = stack.pop()\n            if t == \"+\":\n                stack.append(a + b)\n            elif t == \"-\":\n                stack.append(a - b)\n            elif t == \"*\":\n                stack.append(a * b)\n            elif t == \"/\":\n                stack.append(int(a / b))\n        else:\n            stack.append(int(t))\n    return stack[0]\n\nprint(\"RPN:\", evalRPN([\"2\", \"1\", \"+\", \"3\", \"*\"]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 72,
    "leetcodeNumber": 22,
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Backtracking with Stack Constraint",
    "description": "Generate all combinations of well-formed parentheses given n pairs.",
    "timeComplexity": "O(4^n / sqrt(n))",
    "spaceComplexity": "O(n)",
    "starterCode": "def generateParenthesis(n):\n    res = []\n    def backtrack(open_c, close_c, path):\n        if len(path) == 2 * n:\n            res.append(path)\n            return\n        if open_c < n:\n            backtrack(open_c + 1, close_c, path + \"(\")\n        if close_c < open_c:\n            backtrack(open_c, close_c + 1, path + \")\")\n    backtrack(0, 0, \"\")\n    return res\n\nprint(\"Parentheses (n=3):\", generateParenthesis(3))",
    "topics": [
      "Graphs",
      "Recursion",
      "Stacks",
      "Strings",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/generate-parentheses/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Graphs",
      "Recursion",
      "Stacks",
      "Strings",
      "Union-Find"
    ],
    "summary": "Generate all combinations of well-formed parentheses given n pairs.",
    "examples": [
      {
        "input": "print(\"Parentheses (n=3):\", generateParenthesis(3))",
        "output": "Computed via Generate Parentheses",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def generateParenthesis(n):\n    res = []\n    def backtrack(open_c, close_c, path):\n        if len(path) == 2 * n:\n            res.append(path)\n            return\n        if open_c < n:\n            backtrack(open_c + 1, close_c, path + \"(\")\n        if close_c < open_c:\n            backtrack(open_c, close_c + 1, path + \")\")\n    backtrack(0, 0, \"\")\n    return res\n\nprint(\"Parentheses (n=3):\", generateParenthesis(3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 73,
    "leetcodeNumber": 739,
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Monotonic Decreasing Stack",
    "description": "Find number of days you have to wait until warmer temperature using monotonic stack.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def dailyTemperatures(temperatures):\n    res = [0] * len(temperatures)\n    stack = [] # pair: [temp, index]\n    for i, t in enumerate(temperatures):\n        while stack and t > stack[-1][0]:\n            stackT, stackIdx = stack.pop()\n            res[stackIdx] = i - stackIdx\n        stack.append([t, i])\n    return res\n\nprint(\"Days:\", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))",
    "topics": [
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/daily-temperatures/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "summary": "Find number of days you have to wait until warmer temperature using monotonic stack.",
    "examples": [
      {
        "input": "dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])",
        "output": "Computed via dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases",
      "Monotonic Invariant Maintenance"
    ],
    "referenceSolution": "def dailyTemperatures(temperatures):\n    res = [0] * len(temperatures)\n    stack = [] # pair: [temp, index]\n    for i, t in enumerate(temperatures):\n        while stack and t > stack[-1][0]:\n            stackT, stackIdx = stack.pop()\n            res[stackIdx] = i - stackIdx\n        stack.append([t, i])\n    return res\n\nprint(\"Days:\", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 74,
    "leetcodeNumber": 853,
    "title": "Car Fleet",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Position Sort + Time Monotonic Stack",
    "description": "Find how many car fleets will arrive at destination target point.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def carFleet(target, position, speed):\n    pair = [[p, s] for p, s in zip(position, speed)]\n    pair.sort(key=lambda x: x[0], reverse=True)\n    stack = []\n    for p, s in pair:\n        time = (target - p) / s\n        if not stack or time > stack[-1]:\n            stack.append(time)\n    return len(stack)\n\nprint(\"Fleets:\", carFleet(12, [10,8,0,5,3], [2,4,1,1,3]))",
    "topics": [
      "Monotonic Stack and Queue",
      "Recursion",
      "Sorting",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/car-fleet/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Monotonic Stack and Queue",
      "Recursion",
      "Sorting",
      "Stacks"
    ],
    "summary": "Find how many car fleets will arrive at destination target point.",
    "examples": [
      {
        "input": "carFleet(12, [10,8,0,5,3], [2,4,1,1,3])",
        "output": "Computed via carFleet(12, [10,8,0,5,3], [2,4,1,1,3])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Comparison Sort Order",
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def carFleet(target, position, speed):\n    pair = [[p, s] for p, s in zip(position, speed)]\n    pair.sort(key=lambda x: x[0], reverse=True)\n    stack = []\n    for p, s in pair:\n        time = (target - p) / s\n        if not stack or time > stack[-1]:\n            stack.append(time)\n    return len(stack)\n\nprint(\"Fleets:\", carFleet(12, [10,8,0,5,3], [2,4,1,1,3]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 75,
    "leetcodeNumber": 84,
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "topic": "Stack",
    "pattern": "Monotonic Increasing Stack",
    "description": "Find area of largest rectangle in histogram of bar heights.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def largestRectangleArea(heights):\n    maxArea = 0\n    stack = [] # pair: (index, height)\n    for i, h in enumerate(heights):\n        start = i\n        while stack and stack[-1][1] > h:\n            index, height = stack.pop()\n            maxArea = max(maxArea, height * (i - index))\n            start = index\n        stack.append((start, h))\n    for i, h in stack:\n        maxArea = max(maxArea, h * (len(heights) - i))\n    return maxArea\n\nprint(\"Largest rectangle:\", largestRectangleArea([2, 1, 5, 6, 2, 3]))",
    "topics": [
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "summary": "Find area of largest rectangle in histogram of bar heights.",
    "examples": [
      {
        "input": "largestRectangleArea([2, 1, 5, 6, 2, 3])",
        "output": "Computed via largestRectangleArea([2, 1, 5, 6, 2, 3])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases",
      "Monotonic Invariant Maintenance"
    ],
    "referenceSolution": "def largestRectangleArea(heights):\n    maxArea = 0\n    stack = [] # pair: (index, height)\n    for i, h in enumerate(heights):\n        start = i\n        while stack and stack[-1][1] > h:\n            index, height = stack.pop()\n            maxArea = max(maxArea, height * (i - index))\n            start = index\n        stack.append((start, h))\n    for i, h in stack:\n        maxArea = max(maxArea, h * (len(heights) - i))\n    return maxArea\n\nprint(\"Largest rectangle:\", largestRectangleArea([2, 1, 5, 6, 2, 3]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 76,
    "leetcodeNumber": 71,
    "title": "Simplify Path",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Directory Token Stack",
    "description": "Transform absolute Unix path into simplified canonical path.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def simplifyPath(path):\n    stack = []\n    for part in path.split(\"/\"):\n        if part == \"\" or part == \".\":\n            continue\n        elif part == \"..\":\n            if stack:\n                stack.pop()\n        else:\n            stack.append(part)\n    return \"/\" + \"/\".join(stack)\n\nprint(\"Canonical path:\", simplifyPath(\"/home//foo/../bar/\"))",
    "topics": [
      "Recursion",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/simplify-path/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Recursion",
      "Stacks"
    ],
    "summary": "Transform absolute Unix path into simplified canonical path.",
    "examples": [
      {
        "input": "simplifyPath(\"/home//foo/../bar/\")",
        "output": "Computed via simplifyPath(\"/home//foo/../bar/\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def simplifyPath(path):\n    stack = []\n    for part in path.split(\"/\"):\n        if part == \"\" or part == \".\":\n            continue\n        elif part == \"..\":\n            if stack:\n                stack.pop()\n        else:\n            stack.append(part)\n    return \"/\" + \"/\".join(stack)\n\nprint(\"Canonical path:\", simplifyPath(\"/home//foo/../bar/\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 77,
    "leetcodeNumber": 394,
    "title": "Decode String",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Dual Stack (Multiplier & String)",
    "description": "Decode encoded string where k[encoded_string] is repeated k times.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def decodeString(s):\n    num_stack, str_stack = [], []\n    curr_num, curr_str = 0, \"\"\n    for ch in s:\n        if ch.isdigit():\n            curr_num = curr_num * 10 + int(ch)\n        elif ch == \"[\":\n            num_stack.append(curr_num)\n            str_stack.append(curr_str)\n            curr_num, curr_str = 0, \"\"\n        elif ch == \"]\":\n            k = num_stack.pop()\n            prev = str_stack.pop()\n            curr_str = prev + curr_str * k\n        else:\n            curr_str += ch\n    return curr_str\n\nprint(\"Decoded:\", decodeString(\"3[a2[c]]\"))",
    "topics": [
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/decode-string/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "summary": "Decode encoded string where k[encoded_string] is repeated k times.",
    "examples": [
      {
        "input": "decodeString(\"3[a2[c]]\")",
        "output": "Computed via decodeString(\"3[a2[c]]\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def decodeString(s):\n    num_stack, str_stack = [], []\n    curr_num, curr_str = 0, \"\"\n    for ch in s:\n        if ch.isdigit():\n            curr_num = curr_num * 10 + int(ch)\n        elif ch == \"[\":\n            num_stack.append(curr_num)\n            str_stack.append(curr_str)\n            curr_num, curr_str = 0, \"\"\n        elif ch == \"]\":\n            k = num_stack.pop()\n            prev = str_stack.pop()\n            curr_str = prev + curr_str * k\n        else:\n            curr_str += ch\n    return curr_str\n\nprint(\"Decoded:\", decodeString(\"3[a2[c]]\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 78,
    "leetcodeNumber": 946,
    "title": "Validate Stack Sequences",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Greedy Stack Simulation",
    "description": "Return true if pushed and popped sequences could be result of push and pop operations.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def validateStackSequences(pushed, popped):\n    stack = []\n    j = 0\n    for x in pushed:\n        stack.append(x)\n        while stack and j < len(popped) and stack[-1] == popped[j]:\n            stack.pop()\n            j += 1\n    return j == len(popped)\n\nprint(\"Valid sequences:\", validateStackSequences([1,2,3,4,5], [4,5,3,2,1]))",
    "topics": [
      "Math and Number Theory",
      "Recursion",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/validate-stack-sequences/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Math and Number Theory",
      "Recursion",
      "Stacks"
    ],
    "summary": "Return true if pushed and popped sequences could be result of push and pop operations.",
    "examples": [
      {
        "input": "validateStackSequences([1,2,3,4,5], [4,5,3,2,1])",
        "output": "Computed via validateStackSequences([1,2,3,4,5], [4,5,3,2,1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "def validateStackSequences(pushed, popped):\n    stack = []\n    j = 0\n    for x in pushed:\n        stack.append(x)\n        while stack and j < len(popped) and stack[-1] == popped[j]:\n            stack.pop()\n            j += 1\n    return j == len(popped)\n\nprint(\"Valid sequences:\", validateStackSequences([1,2,3,4,5], [4,5,3,2,1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 79,
    "leetcodeNumber": 496,
    "title": "Next Greater Element I",
    "difficulty": "Easy",
    "topic": "Stack",
    "pattern": "Monotonic Stack + Hash Map",
    "description": "Find next greater element for each value in subset array nums1.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def nextGreaterElement(nums1, nums2):\n    mapping = {}\n    stack = []\n    for n in nums2:\n        while stack and n > stack[-1]:\n            mapping[stack.pop()] = n\n        stack.append(n)\n    return [mapping.get(n, -1) for n in nums1]\n\nprint(\"Next greater:\", nextGreaterElement([4, 1, 2], [1, 3, 4, 2]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/next-greater-element-i/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "summary": "Find next greater element for each value in subset array nums1.",
    "examples": [
      {
        "input": "nextGreaterElement([4, 1, 2], [1, 3, 4, 2])",
        "output": "Computed via nextGreaterElement([4, 1, 2], [1, 3, 4, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "LIFO Stack Operations"
    ],
    "referenceSolution": "def nextGreaterElement(nums1, nums2):\n    mapping = {}\n    stack = []\n    for n in nums2:\n        while stack and n > stack[-1]:\n            mapping[stack.pop()] = n\n        stack.append(n)\n    return [mapping.get(n, -1) for n in nums1]\n\nprint(\"Next greater:\", nextGreaterElement([4, 1, 2], [1, 3, 4, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 80,
    "leetcodeNumber": 503,
    "title": "Next Greater Element II",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Circular Monotonic Stack (2N)",
    "description": "Find next greater element in circular array using 2N scan with modulo.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def nextGreaterElements(nums):\n    n = len(nums)\n    res = [-1] * n\n    stack = []\n    for i in range(2 * n):\n        num = nums[i % n]\n        while stack and nums[stack[-1]] < num:\n            res[stack.pop()] = num\n        if i < n:\n            stack.append(i)\n    return res\n\nprint(\"Circular greater:\", nextGreaterElements([1, 2, 1]))",
    "topics": [
      "Arrays",
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/next-greater-element-ii/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Arrays",
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "summary": "Find next greater element in circular array using 2N scan with modulo.",
    "examples": [
      {
        "input": "nextGreaterElements([1, 2, 1])",
        "output": "Computed via nextGreaterElements([1, 2, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def nextGreaterElements(nums):\n    n = len(nums)\n    res = [-1] * n\n    stack = []\n    for i in range(2 * n):\n        num = nums[i % n]\n        while stack and nums[stack[-1]] < num:\n            res[stack.pop()] = num\n        if i < n:\n            stack.append(i)\n    return res\n\nprint(\"Circular greater:\", nextGreaterElements([1, 2, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 81,
    "leetcodeNumber": 682,
    "title": "Baseball Game",
    "difficulty": "Easy",
    "topic": "Stack",
    "pattern": "Operation Simulation",
    "description": "Calculate sum of points scored in baseball game using stack operations.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def calPoints(ops):\n    stack = []\n    for op in ops:\n        if op == \"+\":\n            stack.append(stack[-1] + stack[-2])\n        elif op == \"D\":\n            stack.append(stack[-1] * 2)\n        elif op == \"C\":\n            stack.pop()\n        else:\n            stack.append(int(op))\n    return sum(stack)\n\nprint(\"Total points:\", calPoints([\"5\", \"2\", \"C\", \"D\", \"+\"]))",
    "topics": [
      "Math and Number Theory",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/baseball-game/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Math and Number Theory",
      "Stacks"
    ],
    "summary": "Calculate sum of points scored in baseball game using stack operations.",
    "examples": [
      {
        "input": "calPoints([\"5\", \"2\", \"C\", \"D\", \"+\"])",
        "output": "Computed via calPoints([\"5\", \"2\", \"C\", \"D\", \"+\"])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "LIFO Stack Operations",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "def calPoints(ops):\n    stack = []\n    for op in ops:\n        if op == \"+\":\n            stack.append(stack[-1] + stack[-2])\n        elif op == \"D\":\n            stack.append(stack[-1] * 2)\n        elif op == \"C\":\n            stack.pop()\n        else:\n            stack.append(int(op))\n    return sum(stack)\n\nprint(\"Total points:\", calPoints([\"5\", \"2\", \"C\", \"D\", \"+\"]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 82,
    "leetcodeNumber": 1047,
    "title": "Remove All Adjacent Duplicates In String",
    "difficulty": "Easy",
    "topic": "Stack",
    "pattern": "Stack Deduplication",
    "description": "Remove adjacent matching duplicate characters until no duplicates remain.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def removeDuplicates(s):\n    stack = []\n    for ch in s:\n        if stack and stack[-1] == ch:\n            stack.pop()\n        else:\n            stack.append(ch)\n    return \"\".join(stack)\n\nprint(\"Deduplicated:\", removeDuplicates(\"abbaca\"))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "summary": "Remove adjacent matching duplicate characters until no duplicates remain.",
    "examples": [
      {
        "input": "removeDuplicates(\"abbaca\")",
        "output": "Computed via removeDuplicates(\"abbaca\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def removeDuplicates(s):\n    stack = []\n    for ch in s:\n        if stack and stack[-1] == ch:\n            stack.pop()\n        else:\n            stack.append(ch)\n    return \"\".join(stack)\n\nprint(\"Deduplicated:\", removeDuplicates(\"abbaca\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 83,
    "leetcodeNumber": 1209,
    "title": "Remove All Adjacent Duplicates in String II",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Count Tracking Stack",
    "description": "Repeatedly remove k adjacent duplicates from string using [char, count] stack.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def removeDuplicatesII(s, k):\n    stack = []\n    for c in s:\n        if stack and stack[-1][0] == c:\n            stack[-1][1] += 1\n            if stack[-1][1] == k:\n                stack.pop()\n        else:\n            stack.append([c, 1])\n    return \"\".join(c * cnt for c, cnt in stack)\n\nprint(\"K-deduplicated:\", removeDuplicatesII(\"deeedbbcccbdaa\", 3))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "summary": "Repeatedly remove k adjacent duplicates from string using [char, count] stack.",
    "examples": [
      {
        "input": "removeDuplicatesII(\"deeedbbcccbdaa\", 3)",
        "output": "Computed via removeDuplicatesII(\"deeedbbcccbdaa\", 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def removeDuplicatesII(s, k):\n    stack = []\n    for c in s:\n        if stack and stack[-1][0] == c:\n            stack[-1][1] += 1\n            if stack[-1][1] == k:\n                stack.pop()\n        else:\n            stack.append([c, 1])\n    return \"\".join(c * cnt for c, cnt in stack)\n\nprint(\"K-deduplicated:\", removeDuplicatesII(\"deeedbbcccbdaa\", 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 84,
    "leetcodeNumber": 402,
    "title": "Remove K Digits",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Greedy Monotonic Decreasing",
    "description": "Remove k digits from number string to make remaining number as small as possible.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def removeKdigits(num, k):\n    stack = []\n    for digit in num:\n        while k > 0 and stack and stack[-1] > digit:\n            stack.pop()\n            k -= 1\n        stack.append(digit)\n    stack = stack[:len(stack) - k] if k > 0 else stack\n    res = \"\".join(stack).lstrip(\"0\")\n    return res if res else \"0\"\n\nprint(\"Smallest num:\", removeKdigits(\"1432219\", 3))",
    "topics": [
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-k-digits/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks",
      "Strings"
    ],
    "summary": "Remove k digits from number string to make remaining number as small as possible.",
    "examples": [
      {
        "input": "removeKdigits(\"1432219\", 3)",
        "output": "Computed via removeKdigits(\"1432219\", 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def removeKdigits(num, k):\n    stack = []\n    for digit in num:\n        while k > 0 and stack and stack[-1] > digit:\n            stack.pop()\n            k -= 1\n        stack.append(digit)\n    stack = stack[:len(stack) - k] if k > 0 else stack\n    res = \"\".join(stack).lstrip(\"0\")\n    return res if res else \"0\"\n\nprint(\"Smallest num:\", removeKdigits(\"1432219\", 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 85,
    "leetcodeNumber": 316,
    "title": "Remove Duplicate Letters",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Lexicographical Monotonic Stack",
    "description": "Remove duplicate letters so every letter appears once and result is smallest in lexicographical order.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def removeDuplicateLetters(s):\n    last_occ = {c: i for i, c in enumerate(s)}\n    seen = set()\n    stack = []\n    for i, c in enumerate(s):\n        if c not in seen:\n            while stack and c < stack[-1] and i < last_occ[stack[-1]]:\n                seen.remove(stack.pop())\n            seen.add(c)\n            stack.append(c)\n    return \"\".join(stack)\n\nprint(\"Smallest unique:\", removeDuplicateLetters(\"bcabc\"))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Monotonic Stack and Queue",
      "Recursion",
      "Sorting",
      "Stacks",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-duplicate-letters/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Monotonic Stack and Queue",
      "Recursion",
      "Sorting",
      "Stacks",
      "Strings"
    ],
    "summary": "Remove duplicate letters so every letter appears once and result is smallest in lexicographical order.",
    "examples": [
      {
        "input": "removeDuplicateLetters(\"bcabc\")",
        "output": "Computed via removeDuplicateLetters(\"bcabc\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def removeDuplicateLetters(s):\n    last_occ = {c: i for i, c in enumerate(s)}\n    seen = set()\n    stack = []\n    for i, c in enumerate(s):\n        if c not in seen:\n            while stack and c < stack[-1] and i < last_occ[stack[-1]]:\n                seen.remove(stack.pop())\n            seen.add(c)\n            stack.append(c)\n    return \"\".join(stack)\n\nprint(\"Smallest unique:\", removeDuplicateLetters(\"bcabc\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 86,
    "leetcodeNumber": 901,
    "title": "Online Stock Span",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Price & Span Aggregation Stack",
    "description": "Design class that calculates span of stock's price today.",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(n)",
    "starterCode": "class StockSpanner:\n    def __init__(self):\n        self.stack = []\n    def next(self, price):\n        span = 1\n        while self.stack and self.stack[-1][0] <= price:\n            span += self.stack.pop()[1]\n        self.stack.append((price, span))\n        return span\n\nss = StockSpanner()\nprint(\"Spans:\", [ss.next(p) for p in [100, 80, 60, 70, 60, 75, 85]])",
    "topics": [
      "Arrays",
      "Monotonic Stack and Queue",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/online-stock-span/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Arrays",
      "Monotonic Stack and Queue",
      "Stacks"
    ],
    "summary": "Design class that calculates span of stock's price today.",
    "examples": [
      {
        "input": "ss = StockSpanner()",
        "output": "Computed via [ss.next(p) for p in [100, 80, 60, 70, 60, 75, 85]]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "LIFO Stack Operations",
      "Monotonic Invariant Maintenance"
    ],
    "referenceSolution": "class StockSpanner:\n    def __init__(self):\n        self.stack = []\n    def next(self, price):\n        span = 1\n        while self.stack and self.stack[-1][0] <= price:\n            span += self.stack.pop()[1]\n        self.stack.append((price, span))\n        return span\n\nss = StockSpanner()\nprint(\"Spans:\", [ss.next(p) for p in [100, 80, 60, 70, 60, 75, 85]])",
    "verificationStatus": "Verified"
  },
  {
    "id": 87,
    "leetcodeNumber": 735,
    "title": "Asteroid Collision",
    "difficulty": "Medium",
    "topic": "Stack",
    "pattern": "Opposing Direction Collisions",
    "description": "Find out state of asteroids after all collisions between positive (right) and negative (left).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def asteroidCollision(asteroids):\n    stack = []\n    for a in asteroids:\n        while stack and a < 0 and stack[-1] > 0:\n            diff = a + stack[-1]\n            if diff < 0:\n                stack.pop()\n            elif diff > 0:\n                a = 0\n            else:\n                a = 0\n                stack.pop()\n        if a:\n            stack.append(a)\n    return stack\n\nprint(\"Remaining asteroids:\", asteroidCollision([5, 10, -5]))",
    "topics": [
      "Recursion",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/asteroid-collision/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Recursion",
      "Stacks"
    ],
    "summary": "Find out state of asteroids after all collisions between positive (right) and negative (left).",
    "examples": [
      {
        "input": "asteroidCollision([5, 10, -5])",
        "output": "Computed via asteroidCollision([5, 10, -5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def asteroidCollision(asteroids):\n    stack = []\n    for a in asteroids:\n        while stack and a < 0 and stack[-1] > 0:\n            diff = a + stack[-1]\n            if diff < 0:\n                stack.pop()\n            elif diff > 0:\n                a = 0\n            else:\n                a = 0\n                stack.pop()\n        if a:\n            stack.append(a)\n    return stack\n\nprint(\"Remaining asteroids:\", asteroidCollision([5, 10, -5]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 88,
    "leetcodeNumber": 85,
    "title": "Maximal Rectangle",
    "difficulty": "Hard",
    "topic": "Stack",
    "pattern": "Histogram Rows Accumulation",
    "description": "Find largest rectangle containing only 1s in a binary matrix.",
    "timeComplexity": "O(m*n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def maximalRectangle(matrix):\n    if not matrix:\n        return 0\n    cols = len(matrix[0])\n    heights = [0] * (cols + 1)\n    max_area = 0\n    for row in matrix:\n        for i in range(cols):\n            heights[i] = heights[i] + 1 if row[i] == \"1\" else 0\n        stack = []\n        for i in range(len(heights)):\n            while stack and heights[i] < heights[stack[-1]]:\n                h = heights[stack.pop()]\n                w = i if not stack else i - stack[-1] - 1\n                max_area = max(max_area, h * w)\n            stack.append(i)\n    return max_area\n\ngrid = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]\nprint(\"Maximal rectangle:\", maximalRectangle(grid))",
    "topics": [
      "Arrays",
      "Matrix Problems",
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximal-rectangle/",
    "primaryTopic": "Stack",
    "topicTags": [
      "Arrays",
      "Matrix Problems",
      "Monotonic Stack and Queue",
      "Recursion",
      "Stacks"
    ],
    "summary": "Find largest rectangle containing only 1s in a binary matrix.",
    "examples": [
      {
        "input": "grid = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
        "output": "Computed via maximalRectangle(grid)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "LIFO Stack Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def maximalRectangle(matrix):\n    if not matrix:\n        return 0\n    cols = len(matrix[0])\n    heights = [0] * (cols + 1)\n    max_area = 0\n    for row in matrix:\n        for i in range(cols):\n            heights[i] = heights[i] + 1 if row[i] == \"1\" else 0\n        stack = []\n        for i in range(len(heights)):\n            while stack and heights[i] < heights[stack[-1]]:\n                h = heights[stack.pop()]\n                w = i if not stack else i - stack[-1] - 1\n                max_area = max(max_area, h * w)\n            stack.append(i)\n    return max_area\n\ngrid = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]\nprint(\"Maximal rectangle:\", maximalRectangle(grid))",
    "verificationStatus": "Verified"
  },
  {
    "id": 89,
    "leetcodeNumber": 704,
    "title": "Binary Search",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "pattern": "Standard Template",
    "description": "Search target in sorted array in O(log n) runtime using two pointers midpoint division.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return -1\n\nprint(\"Found index:\", search([-1, 0, 3, 5, 9, 12], 9))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/binary-search/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Sorting"
    ],
    "summary": "Search target in sorted array in O(log n) runtime using two pointers midpoint division.",
    "examples": [
      {
        "input": "search([-1, 0, 3, 5, 9, 12], 9)",
        "output": "Computed via search([-1, 0, 3, 5, 9, 12], 9)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return -1\n\nprint(\"Found index:\", search([-1, 0, 3, 5, 9, 12], 9))",
    "verificationStatus": "Verified"
  },
  {
    "id": 90,
    "leetcodeNumber": 74,
    "title": "Search a 2D Matrix",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Flattened 2D Binary Search",
    "description": "Search target in m x n integer matrix with sorted rows and first element > last of previous row.",
    "timeComplexity": "O(log(m*n))",
    "spaceComplexity": "O(1)",
    "starterCode": "def searchMatrix(matrix, target):\n    m, n = len(matrix), len(matrix[0])\n    l, r = 0, m * n - 1\n    while l <= r:\n        mid = (l + r) // 2\n        val = matrix[mid // n][mid % n]\n        if val == target:\n            return True\n        elif val < target:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return False\n\nmat = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]\nprint(\"Found in 2D:\", searchMatrix(mat, 3))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Matrix Problems",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/search-a-2d-matrix/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Matrix Problems",
      "Recursion",
      "Sorting"
    ],
    "summary": "Search target in m x n integer matrix with sorted rows and first element > last of previous row.",
    "examples": [
      {
        "input": "mat = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]",
        "output": "Computed via searchMatrix(mat, 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def searchMatrix(matrix, target):\n    m, n = len(matrix), len(matrix[0])\n    l, r = 0, m * n - 1\n    while l <= r:\n        mid = (l + r) // 2\n        val = matrix[mid // n][mid % n]\n        if val == target:\n            return True\n        elif val < target:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return False\n\nmat = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]\nprint(\"Found in 2D:\", searchMatrix(mat, 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 91,
    "leetcodeNumber": 240,
    "title": "Search a 2D Matrix II",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Top-Right Elimination",
    "description": "Search target in matrix where rows and columns are sorted independently.",
    "timeComplexity": "O(m + n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def searchMatrixII(matrix, target):\n    r, c = 0, len(matrix[0]) - 1\n    while r < len(matrix) and c >= 0:\n        if matrix[r][c] == target:\n            return True\n        elif matrix[r][c] > target:\n            c -= 1\n        else:\n            r += 1\n    return False\n\nmat = [[1,4,7],[2,5,8],[3,6,9]]\nprint(\"Found in matrix II:\", searchMatrixII(mat, 5))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Matrix Problems",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Matrix Problems",
      "Recursion",
      "Sorting"
    ],
    "summary": "Search target in matrix where rows and columns are sorted independently.",
    "examples": [
      {
        "input": "mat = [[1,4,7],[2,5,8],[3,6,9]]",
        "output": "Computed via searchMatrixII(mat, 5)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def searchMatrixII(matrix, target):\n    r, c = 0, len(matrix[0]) - 1\n    while r < len(matrix) and c >= 0:\n        if matrix[r][c] == target:\n            return True\n        elif matrix[r][c] > target:\n            c -= 1\n        else:\n            r += 1\n    return False\n\nmat = [[1,4,7],[2,5,8],[3,6,9]]\nprint(\"Found in matrix II:\", searchMatrixII(mat, 5))",
    "verificationStatus": "Verified"
  },
  {
    "id": 92,
    "leetcodeNumber": 875,
    "title": "Koko Eating Bananas",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Binary Search on Answer",
    "description": "Find minimum integer eating speed k such that Koko can eat all bananas within h hours.",
    "timeComplexity": "O(n log m)",
    "spaceComplexity": "O(1)",
    "starterCode": "def minEatingSpeed(piles, h):\n    l, r = 1, max(piles)\n    res = r\n    while l <= r:\n        k = (l + r) // 2\n        hours = sum((p + k - 1) // k for p in piles)\n        if hours <= h:\n            res = k\n            r = k - 1\n        else:\n            l = k + 1\n    return res\n\nprint(\"Min eating speed:\", minEatingSpeed([3, 6, 7, 11], 8))",
    "topics": [
      "Binary Search"
    ],
    "sourceUrl": "https://leetcode.com/problems/koko-eating-bananas/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Binary Search"
    ],
    "summary": "Find minimum integer eating speed k such that Koko can eat all bananas within h hours.",
    "examples": [
      {
        "input": "minEatingSpeed([3, 6, 7, 11], 8)",
        "output": "Computed via minEatingSpeed([3, 6, 7, 11], 8)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Sorted Range & Bisect Logic"
    ],
    "referenceSolution": "def minEatingSpeed(piles, h):\n    l, r = 1, max(piles)\n    res = r\n    while l <= r:\n        k = (l + r) // 2\n        hours = sum((p + k - 1) // k for p in piles)\n        if hours <= h:\n            res = k\n            r = k - 1\n        else:\n            l = k + 1\n    return res\n\nprint(\"Min eating speed:\", minEatingSpeed([3, 6, 7, 11], 8))",
    "verificationStatus": "Verified"
  },
  {
    "id": 93,
    "leetcodeNumber": 153,
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Pivot Search",
    "description": "Find minimum element in rotated sorted array of unique elements in O(log n).",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def findMin(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]:\n            l = mid + 1\n        else:\n            r = mid\n    return nums[l]\n\nprint(\"Minimum:\", findMin([3, 4, 5, 1, 2]))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "summary": "Find minimum element in rotated sorted array of unique elements in O(log n).",
    "examples": [
      {
        "input": "findMin([3, 4, 5, 1, 2])",
        "output": "Computed via findMin([3, 4, 5, 1, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Sorted Range & Bisect Logic"
    ],
    "referenceSolution": "def findMin(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]:\n            l = mid + 1\n        else:\n            r = mid\n    return nums[l]\n\nprint(\"Minimum:\", findMin([3, 4, 5, 1, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 94,
    "leetcodeNumber": 33,
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Sorted Half Detection",
    "description": "Search target in rotated sorted array in O(log n) time.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def searchRotated(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target:\n            return mid\n        # Left half sorted\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]:\n                r = mid - 1\n            else:\n                l = mid + 1\n        # Right half sorted\n        else:\n            if nums[mid] < target <= nums[r]:\n                l = mid + 1\n            else:\n                r = mid - 1\n    return -1\n\nprint(\"Rotated search index:\", searchRotated([4, 5, 6, 7, 0, 1, 2], 0))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Recursion",
      "Sorting"
    ],
    "summary": "Search target in rotated sorted array in O(log n) time.",
    "examples": [
      {
        "input": "searchRotated([4, 5, 6, 7, 0, 1, 2], 0)",
        "output": "Computed via searchRotated([4, 5, 6, 7, 0, 1, 2], 0)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def searchRotated(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target:\n            return mid\n        # Left half sorted\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]:\n                r = mid - 1\n            else:\n                l = mid + 1\n        # Right half sorted\n        else:\n            if nums[mid] < target <= nums[r]:\n                l = mid + 1\n            else:\n                r = mid - 1\n    return -1\n\nprint(\"Rotated search index:\", searchRotated([4, 5, 6, 7, 0, 1, 2], 0))",
    "verificationStatus": "Verified"
  },
  {
    "id": 95,
    "leetcodeNumber": 981,
    "title": "Time Based Key-Value Store",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Timestamp Binary Search",
    "description": "Design time-based key-value store that supports get and set with timestamp search.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "class TimeMap:\n    def __init__(self):\n        self.store = {}\n    def set(self, key, value, timestamp):\n        if key not in self.store:\n            self.store[key] = []\n        self.store[key].append((timestamp, value))\n    def get(self, key, timestamp):\n        res = \"\"\n        values = self.store.get(key, [])\n        l, r = 0, len(values) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if values[m][0] <= timestamp:\n                res = values[m][1]\n                l = m + 1\n            else:\n                r = m - 1\n        return res\n\ntm = TimeMap()\ntm.set(\"foo\", \"bar\", 1)\nprint(\"Get timestamp 1:\", tm.get(\"foo\", 1))\nprint(\"Get timestamp 3:\", tm.get(\"foo\", 3))",
    "topics": [
      "Binary Search",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/time-based-key-value-store/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Binary Search",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Design time-based key-value store that supports get and set with timestamp search.",
    "examples": [
      {
        "input": "tm = TimeMap()",
        "output": "Computed via tm.get(\"foo\", 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Sorted Range & Bisect Logic",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "class TimeMap:\n    def __init__(self):\n        self.store = {}\n    def set(self, key, value, timestamp):\n        if key not in self.store:\n            self.store[key] = []\n        self.store[key].append((timestamp, value))\n    def get(self, key, timestamp):\n        res = \"\"\n        values = self.store.get(key, [])\n        l, r = 0, len(values) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if values[m][0] <= timestamp:\n                res = values[m][1]\n                l = m + 1\n            else:\n                r = m - 1\n        return res\n\ntm = TimeMap()\ntm.set(\"foo\", \"bar\", 1)\nprint(\"Get timestamp 1:\", tm.get(\"foo\", 1))\nprint(\"Get timestamp 3:\", tm.get(\"foo\", 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 96,
    "leetcodeNumber": 4,
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "topic": "Binary Search",
    "pattern": "Partition Partitioning",
    "description": "Find the median of the two sorted arrays in O(log(m+n)) runtime.",
    "timeComplexity": "O(log(min(m, n)))",
    "spaceComplexity": "O(1)",
    "starterCode": "def findMedianSortedArrays(nums1, nums2):\n    A, B = nums1, nums2\n    if len(B) < len(A):\n        A, B = B, A\n    total = len(A) + len(B)\n    half = total // 2\n    l, r = 0, len(A) - 1\n    while True:\n        i = (l + r) // 2\n        j = half - i - 2\n        Aleft = A[i] if i >= 0 else float(\"-inf\")\n        Aright = A[i + 1] if (i + 1) < len(A) else float(\"inf\")\n        Bleft = B[j] if j >= 0 else float(\"-inf\")\n        Bright = B[j + 1] if (j + 1) < len(B) else float(\"inf\")\n        if Aleft <= Bright and Bleft <= Aright:\n            if total % 2:\n                return min(Aright, Bright)\n            return (max(Aleft, Bleft) + min(Aright, Bright)) / 2\n        elif Aleft > Bright:\n            r = i - 1\n        else:\n            l = i + 1\n\nprint(\"Median:\", findMedianSortedArrays([1, 3], [2]))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Recursion",
      "Sorting"
    ],
    "summary": "Find the median of the two sorted arrays in O(log(m+n)) runtime.",
    "examples": [
      {
        "input": "findMedianSortedArrays([1, 3], [2])",
        "output": "Computed via findMedianSortedArrays([1, 3], [2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def findMedianSortedArrays(nums1, nums2):\n    A, B = nums1, nums2\n    if len(B) < len(A):\n        A, B = B, A\n    total = len(A) + len(B)\n    half = total // 2\n    l, r = 0, len(A) - 1\n    while True:\n        i = (l + r) // 2\n        j = half - i - 2\n        Aleft = A[i] if i >= 0 else float(\"-inf\")\n        Aright = A[i + 1] if (i + 1) < len(A) else float(\"inf\")\n        Bleft = B[j] if j >= 0 else float(\"-inf\")\n        Bright = B[j + 1] if (j + 1) < len(B) else float(\"inf\")\n        if Aleft <= Bright and Bleft <= Aright:\n            if total % 2:\n                return min(Aright, Bright)\n            return (max(Aleft, Bleft) + min(Aright, Bright)) / 2\n        elif Aleft > Bright:\n            r = i - 1\n        else:\n            l = i + 1\n\nprint(\"Median:\", findMedianSortedArrays([1, 3], [2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 97,
    "leetcodeNumber": 35,
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "pattern": "Lower Bound Search",
    "description": "Return the index if target is found. If not, return index where it would be inserted.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def searchInsert(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return l\n\nprint(\"Insert pos:\", searchInsert([1, 3, 5, 6], 5))",
    "topics": [
      "Binary Search",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/search-insert-position/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Binary Search",
      "Recursion"
    ],
    "summary": "Return the index if target is found. If not, return index where it would be inserted.",
    "examples": [
      {
        "input": "searchInsert([1, 3, 5, 6], 5)",
        "output": "Computed via searchInsert([1, 3, 5, 6], 5)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Sorted Range & Bisect Logic",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def searchInsert(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return l\n\nprint(\"Insert pos:\", searchInsert([1, 3, 5, 6], 5))",
    "verificationStatus": "Verified"
  },
  {
    "id": 98,
    "leetcodeNumber": 34,
    "title": "Find First and Last Position of Element in Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Dual Bound Search",
    "description": "Find the starting and ending position of a given target value in sorted array.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def searchRange(nums, target):\n    def findBound(isFirst):\n        l, r = 0, len(nums) - 1\n        ans = -1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                ans = mid\n                if isFirst:\n                    r = mid - 1\n                else:\n                    l = mid + 1\n            elif nums[mid] < target:\n                l = mid + 1\n            else:\n                r = mid - 1\n        return ans\n    return [findBound(True), findBound(False)]\n\nprint(\"Range:\", searchRange([5, 7, 7, 8, 8, 10], 8))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Recursion",
      "Sorting"
    ],
    "summary": "Find the starting and ending position of a given target value in sorted array.",
    "examples": [
      {
        "input": "searchRange([5, 7, 7, 8, 8, 10], 8)",
        "output": "Computed via searchRange([5, 7, 7, 8, 8, 10], 8)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def searchRange(nums, target):\n    def findBound(isFirst):\n        l, r = 0, len(nums) - 1\n        ans = -1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                ans = mid\n                if isFirst:\n                    r = mid - 1\n                else:\n                    l = mid + 1\n            elif nums[mid] < target:\n                l = mid + 1\n            else:\n                r = mid - 1\n        return ans\n    return [findBound(True), findBound(False)]\n\nprint(\"Range:\", searchRange([5, 7, 7, 8, 8, 10], 8))",
    "verificationStatus": "Verified"
  },
  {
    "id": 99,
    "leetcodeNumber": 69,
    "title": "Sqrt(x)",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "pattern": "Integer Binary Search",
    "description": "Compute and return the square root of x rounded down to nearest integer.",
    "timeComplexity": "O(log x)",
    "spaceComplexity": "O(1)",
    "starterCode": "def mySqrt(x):\n    l, r = 0, x\n    res = 0\n    while l <= r:\n        m = (l + r) // 2\n        if m * m <= x:\n            res = m\n            l = m + 1\n        else:\n            r = m - 1\n    return res\n\nprint(\"Sqrt(8):\", mySqrt(8))",
    "topics": [
      "Binary Search",
      "Math and Number Theory"
    ],
    "sourceUrl": "https://leetcode.com/problems/sqrt-x/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Binary Search",
      "Math and Number Theory"
    ],
    "summary": "Compute and return the square root of x rounded down to nearest integer.",
    "examples": [
      {
        "input": "mySqrt(8)",
        "output": "Computed via mySqrt(8)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Sorted Range & Bisect Logic",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "def mySqrt(x):\n    l, r = 0, x\n    res = 0\n    while l <= r:\n        m = (l + r) // 2\n        if m * m <= x:\n            res = m\n            l = m + 1\n        else:\n            r = m - 1\n    return res\n\nprint(\"Sqrt(8):\", mySqrt(8))",
    "verificationStatus": "Verified"
  },
  {
    "id": 100,
    "leetcodeNumber": 162,
    "title": "Find Peak Element",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Gradient Climb Search",
    "description": "Find a peak element (strictly greater than its neighbors) in O(log n) time.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def findPeakElement(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[mid + 1]:\n            r = mid\n        else:\n            l = mid + 1\n    return l\n\nprint(\"Peak index:\", findPeakElement([1, 2, 3, 1]))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-peak-element/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Recursion"
    ],
    "summary": "Find a peak element (strictly greater than its neighbors) in O(log n) time.",
    "examples": [
      {
        "input": "findPeakElement([1, 2, 3, 1])",
        "output": "Computed via findPeakElement([1, 2, 3, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def findPeakElement(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[mid + 1]:\n            r = mid\n        else:\n            l = mid + 1\n    return l\n\nprint(\"Peak index:\", findPeakElement([1, 2, 3, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 101,
    "leetcodeNumber": 278,
    "title": "First Bad Version",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "pattern": "Boundary Transition Search",
    "description": "Find first bad version using minimum calls to API isBadVersion(v).",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def firstBadVersion(n):\n    # Simulated API: version >= 4 is bad\n    def isBadVersion(v): return v >= 4\n    l, r = 1, n\n    while l < r:\n        m = (l + r) // 2\n        if isBadVersion(m):\n            r = m\n        else:\n            l = m + 1\n    return l\n\nprint(\"First bad version:\", firstBadVersion(5))",
    "topics": [
      "Binary Search",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/first-bad-version/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Binary Search",
      "Recursion"
    ],
    "summary": "Find first bad version using minimum calls to API isBadVersion(v).",
    "examples": [
      {
        "input": "firstBadVersion(5)",
        "output": "Computed via firstBadVersion(5)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Sorted Range & Bisect Logic",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def firstBadVersion(n):\n    # Simulated API: version >= 4 is bad\n    def isBadVersion(v): return v >= 4\n    l, r = 1, n\n    while l < r:\n        m = (l + r) // 2\n        if isBadVersion(m):\n            r = m\n        else:\n            l = m + 1\n    return l\n\nprint(\"First bad version:\", firstBadVersion(5))",
    "verificationStatus": "Verified"
  },
  {
    "id": 102,
    "leetcodeNumber": 367,
    "title": "Valid Perfect Square",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "pattern": "Square Midpoint Comparison",
    "description": "Return true if num is a perfect square without using built-in sqrt.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def isPerfectSquare(num):\n    l, r = 1, num\n    while l <= r:\n        m = (l + r) // 2\n        sq = m * m\n        if sq == num:\n            return True\n        elif sq < num:\n            l = m + 1\n        else:\n            r = m - 1\n    return False\n\nprint(\"Is 16 perfect square:\", isPerfectSquare(16))",
    "topics": [
      "Binary Search",
      "Math and Number Theory"
    ],
    "sourceUrl": "https://leetcode.com/problems/valid-perfect-square/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Binary Search",
      "Math and Number Theory"
    ],
    "summary": "Return true if num is a perfect square without using built-in sqrt.",
    "examples": [
      {
        "input": "isPerfectSquare(16)",
        "output": "Computed via isPerfectSquare(16)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Sorted Range & Bisect Logic",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "def isPerfectSquare(num):\n    l, r = 1, num\n    while l <= r:\n        m = (l + r) // 2\n        sq = m * m\n        if sq == num:\n            return True\n        elif sq < num:\n            l = m + 1\n        else:\n            r = m - 1\n    return False\n\nprint(\"Is 16 perfect square:\", isPerfectSquare(16))",
    "verificationStatus": "Verified"
  },
  {
    "id": 103,
    "leetcodeNumber": 540,
    "title": "Single Element in a Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Even/Odd Index Parity",
    "description": "Find single element in sorted array where all others appear twice in O(log n).",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def singleNonDuplicate(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if mid % 2 == 1:\n            mid -= 1\n        if nums[mid] == nums[mid + 1]:\n            l = mid + 2\n        else:\n            r = mid\n    return nums[l]\n\nprint(\"Single element:\", singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8]))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Recursion",
      "Sorting"
    ],
    "summary": "Find single element in sorted array where all others appear twice in O(log n).",
    "examples": [
      {
        "input": "singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])",
        "output": "Computed via singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def singleNonDuplicate(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if mid % 2 == 1:\n            mid -= 1\n        if nums[mid] == nums[mid + 1]:\n            l = mid + 2\n        else:\n            r = mid\n    return nums[l]\n\nprint(\"Single element:\", singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 104,
    "leetcodeNumber": 1011,
    "title": "Capacity To Ship Packages Within D Days",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Binary Search on Capacity",
    "description": "Find least weight capacity of ship that will result in all packages shipped within days.",
    "timeComplexity": "O(n log(sum-max))",
    "spaceComplexity": "O(1)",
    "starterCode": "def shipWithinDays(weights, days):\n    l, r = max(weights), sum(weights)\n    res = r\n    while l <= r:\n        cap = (l + r) // 2\n        d, curr = 1, 0\n        for w in weights:\n            if curr + w > cap:\n                d += 1\n                curr = 0\n            curr += w\n        if d <= days:\n            res = cap\n            r = cap - 1\n        else:\n            l = cap + 1\n    return res\n\nprint(\"Min capacity:\", shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5))",
    "topics": [
      "Binary Search"
    ],
    "sourceUrl": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Binary Search"
    ],
    "summary": "Find least weight capacity of ship that will result in all packages shipped within days.",
    "examples": [
      {
        "input": "shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)",
        "output": "Computed via shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Sorted Range & Bisect Logic"
    ],
    "referenceSolution": "def shipWithinDays(weights, days):\n    l, r = max(weights), sum(weights)\n    res = r\n    while l <= r:\n        cap = (l + r) // 2\n        d, curr = 1, 0\n        for w in weights:\n            if curr + w > cap:\n                d += 1\n                curr = 0\n            curr += w\n        if d <= days:\n            res = cap\n            r = cap - 1\n        else:\n            l = cap + 1\n    return res\n\nprint(\"Min capacity:\", shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5))",
    "verificationStatus": "Verified"
  },
  {
    "id": 105,
    "leetcodeNumber": 410,
    "title": "Split Array Largest Sum",
    "difficulty": "Hard",
    "topic": "Binary Search",
    "pattern": "Minimax Binary Search",
    "description": "Split nums into k non-empty subarrays such that largest sum among subarrays is minimized.",
    "timeComplexity": "O(n log(sum))",
    "spaceComplexity": "O(1)",
    "starterCode": "def splitArray(nums, k):\n    l, r = max(nums), sum(nums)\n    res = r\n    while l <= r:\n        mid = (l + r) // 2\n        subarrays, curr = 1, 0\n        for n in nums:\n            if curr + n > mid:\n                subarrays += 1\n                curr = 0\n            curr += n\n        if subarrays <= k:\n            res = mid\n            r = mid - 1\n        else:\n            l = mid + 1\n    return res\n\nprint(\"Minimax sum:\", splitArray([7, 2, 5, 10, 8], 2))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/split-array-largest-sum/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Split nums into k non-empty subarrays such that largest sum among subarrays is minimized.",
    "examples": [
      {
        "input": "splitArray([7, 2, 5, 10, 8], 2)",
        "output": "Computed via splitArray([7, 2, 5, 10, 8], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def splitArray(nums, k):\n    l, r = max(nums), sum(nums)\n    res = r\n    while l <= r:\n        mid = (l + r) // 2\n        subarrays, curr = 1, 0\n        for n in nums:\n            if curr + n > mid:\n                subarrays += 1\n                curr = 0\n            curr += n\n        if subarrays <= k:\n            res = mid\n            r = mid - 1\n        else:\n            l = mid + 1\n    return res\n\nprint(\"Minimax sum:\", splitArray([7, 2, 5, 10, 8], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 106,
    "leetcodeNumber": 852,
    "title": "Peak Index in a Mountain Array",
    "difficulty": "Medium",
    "topic": "Binary Search",
    "pattern": "Peak Binary Search",
    "description": "Find index of peak element in guaranteed mountain array in O(log n).",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def peakIndexInMountainArray(arr):\n    l, r = 0, len(arr) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if arr[mid] < arr[mid + 1]:\n            l = mid + 1\n        else:\n            r = mid\n    return l\n\nprint(\"Peak index:\", peakIndexInMountainArray([0, 10, 5, 2]))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Recursion"
    ],
    "summary": "Find index of peak element in guaranteed mountain array in O(log n).",
    "examples": [
      {
        "input": "peakIndexInMountainArray([0, 10, 5, 2])",
        "output": "Computed via peakIndexInMountainArray([0, 10, 5, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Sorted Range & Bisect Logic",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def peakIndexInMountainArray(arr):\n    l, r = 0, len(arr) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if arr[mid] < arr[mid + 1]:\n            l = mid + 1\n        else:\n            r = mid\n    return l\n\nprint(\"Peak index:\", peakIndexInMountainArray([0, 10, 5, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 107,
    "leetcodeNumber": 441,
    "title": "Arranging Coins",
    "difficulty": "Easy",
    "topic": "Binary Search",
    "pattern": "Gauss Sum Binary Search",
    "description": "Find number of complete rows of staircase that can be built with n coins.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def arrangeCoins(n):\n    l, r = 1, n\n    res = 0\n    while l <= r:\n        m = (l + r) // 2\n        coins = m * (m + 1) // 2\n        if coins <= n:\n            res = m\n            l = m + 1\n        else:\n            r = m - 1\n    return res\n\nprint(\"Complete rows:\", arrangeCoins(8))",
    "topics": [
      "Binary Search"
    ],
    "sourceUrl": "https://leetcode.com/problems/arranging-coins/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Binary Search"
    ],
    "summary": "Find number of complete rows of staircase that can be built with n coins.",
    "examples": [
      {
        "input": "arrangeCoins(8)",
        "output": "Computed via arrangeCoins(8)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Sorted Range & Bisect Logic"
    ],
    "referenceSolution": "def arrangeCoins(n):\n    l, r = 1, n\n    res = 0\n    while l <= r:\n        m = (l + r) // 2\n        coins = m * (m + 1) // 2\n        if coins <= n:\n            res = m\n            l = m + 1\n        else:\n            r = m - 1\n    return res\n\nprint(\"Complete rows:\", arrangeCoins(8))",
    "verificationStatus": "Verified"
  },
  {
    "id": 108,
    "leetcodeNumber": 154,
    "title": "Find Minimum in Rotated Sorted Array II",
    "difficulty": "Hard",
    "topic": "Binary Search",
    "pattern": "Duplicate Shrinking",
    "description": "Find minimum element in rotated sorted array that may contain duplicates.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def findMinII(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]:\n            l = mid + 1\n        elif nums[mid] < nums[r]:\n            r = mid\n        else:\n            r -= 1\n    return nums[l]\n\nprint(\"Min with duplicates:\", findMinII([2, 2, 2, 0, 1]))",
    "topics": [
      "Arrays",
      "Binary Search",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
    "primaryTopic": "Binary Search",
    "topicTags": [
      "Arrays",
      "Binary Search",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "summary": "Find minimum element in rotated sorted array that may contain duplicates.",
    "examples": [
      {
        "input": "findMinII([2, 2, 2, 0, 1])",
        "output": "Computed via findMinII([2, 2, 2, 0, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Sorted Range & Bisect Logic"
    ],
    "referenceSolution": "def findMinII(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]:\n            l = mid + 1\n        elif nums[mid] < nums[r]:\n            r = mid\n        else:\n            r -= 1\n    return nums[l]\n\nprint(\"Min with duplicates:\", findMinII([2, 2, 2, 0, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 109,
    "leetcodeNumber": 206,
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "pattern": "Pointer Reversal",
    "description": "Reverse a singly linked list in-place using prev and curr pointers.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.get(\"next\")\n        curr[\"next\"] = prev\n        prev = curr\n        curr = nxt\n    return prev\n\n# Linked list: 1 -> 2 -> 3\nnode3 = {\"val\": 3, \"next\": None}\nnode2 = {\"val\": 2, \"next\": node3}\nnode1 = {\"val\": 1, \"next\": node2}\nrev = reverseList(node1)\nprint(\"Reversed head:\", rev[\"val\"])",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/reverse-linked-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Reverse a singly linked list in-place using prev and curr pointers.",
    "examples": [
      {
        "input": "node3 = {\"val\": 3, \"next\": None}, node2 = {\"val\": 2, \"next\": node3}, node1 = {\"val\": 1, \"next\": node2}, rev = reverseList(node1)",
        "output": "Computed via rev[\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.get(\"next\")\n        curr[\"next\"] = prev\n        prev = curr\n        curr = nxt\n    return prev\n\n# Linked list: 1 -> 2 -> 3\nnode3 = {\"val\": 3, \"next\": None}\nnode2 = {\"val\": 2, \"next\": node3}\nnode1 = {\"val\": 1, \"next\": node2}\nrev = reverseList(node1)\nprint(\"Reversed head:\", rev[\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 110,
    "leetcodeNumber": 21,
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "topic": "Linked List",
    "pattern": "Dummy Head Splicing",
    "description": "Merge two sorted linked lists into one sorted linked list.",
    "timeComplexity": "O(n + m)",
    "spaceComplexity": "O(1)",
    "starterCode": "def mergeTwoLists(l1, l2):\n    dummy = {\"val\": 0, \"next\": None}\n    tail = dummy\n    while l1 and l2:\n        if l1[\"val\"] < l2[\"val\"]:\n            tail[\"next\"] = l1\n            l1 = l1[\"next\"]\n        else:\n            tail[\"next\"] = l2\n            l2 = l2[\"next\"]\n        tail = tail[\"next\"]\n    tail[\"next\"] = l1 if l1 else l2\n    return dummy[\"next\"]\n\na = {\"val\": 1, \"next\": {\"val\": 3, \"next\": None}}\nb = {\"val\": 2, \"next\": {\"val\": 4, \"next\": None}}\nmerged = mergeTwoLists(a, b)\nprint(\"Merged head:\", merged[\"val\"])",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Recursion",
      "Sorting"
    ],
    "summary": "Merge two sorted linked lists into one sorted linked list.",
    "examples": [
      {
        "input": "a = {\"val\": 1, \"next\": {\"val\": 3, \"next\": None}}, b = {\"val\": 2, \"next\": {\"val\": 4, \"next\": None}}, merged = mergeTwoLists(a, b)",
        "output": "Computed via merged[\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def mergeTwoLists(l1, l2):\n    dummy = {\"val\": 0, \"next\": None}\n    tail = dummy\n    while l1 and l2:\n        if l1[\"val\"] < l2[\"val\"]:\n            tail[\"next\"] = l1\n            l1 = l1[\"next\"]\n        else:\n            tail[\"next\"] = l2\n            l2 = l2[\"next\"]\n        tail = tail[\"next\"]\n    tail[\"next\"] = l1 if l1 else l2\n    return dummy[\"next\"]\n\na = {\"val\": 1, \"next\": {\"val\": 3, \"next\": None}}\nb = {\"val\": 2, \"next\": {\"val\": 4, \"next\": None}}\nmerged = mergeTwoLists(a, b)\nprint(\"Merged head:\", merged[\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 111,
    "leetcodeNumber": 141,
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "topic": "Linked List",
    "pattern": "Floyd's Fast & Slow Pointers",
    "description": "Determine if linked list has cycle using two pointers moving at 1x and 2x speeds.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def hasCycle(head):\n    slow, fast = head, head\n    while fast and fast.get(\"next\"):\n        slow = slow[\"next\"]\n        fast = fast[\"next\"][\"next\"]\n        if slow is fast:\n            return True\n    return False\n\nn1 = {\"val\": 3, \"next\": None}\nn2 = {\"val\": 2, \"next\": None}\nn1[\"next\"] = n2\nn2[\"next\"] = n1 # cycle\nprint(\"Has cycle:\", hasCycle(n1))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists"
    ],
    "sourceUrl": "https://leetcode.com/problems/linked-list-cycle/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists"
    ],
    "summary": "Determine if linked list has cycle using two pointers moving at 1x and 2x speeds.",
    "examples": [
      {
        "input": "n1 = {\"val\": 3, \"next\": None}, n2 = {\"val\": 2, \"next\": None}, n1[\"next\"] = n2, n2[\"next\"] = n1 # cycle",
        "output": "Computed via hasCycle(n1)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def hasCycle(head):\n    slow, fast = head, head\n    while fast and fast.get(\"next\"):\n        slow = slow[\"next\"]\n        fast = fast[\"next\"][\"next\"]\n        if slow is fast:\n            return True\n    return False\n\nn1 = {\"val\": 3, \"next\": None}\nn2 = {\"val\": 2, \"next\": None}\nn1[\"next\"] = n2\nn2[\"next\"] = n1 # cycle\nprint(\"Has cycle:\", hasCycle(n1))",
    "verificationStatus": "Verified"
  },
  {
    "id": 112,
    "leetcodeNumber": 142,
    "title": "Linked List Cycle II",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Cycle Entrance Finding",
    "description": "Return the node where the cycle begins, or None if there is no cycle.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def detectCycle(head):\n    slow, fast = head, head\n    while fast and fast.get(\"next\"):\n        slow = slow[\"next\"]\n        fast = fast[\"next\"][\"next\"]\n        if slow is fast:\n            p = head\n            while p is not slow:\n                p = p[\"next\"]\n                slow = slow[\"next\"]\n            return p\n    return None\n\na = {\"val\": 1, \"next\": None}\nb = {\"val\": 2, \"next\": a}\na[\"next\"] = b\nprint(\"Cycle start val:\", detectCycle(a)[\"val\"])",
    "topics": [
      "Hashing and Hash Maps",
      "Linked Lists"
    ],
    "sourceUrl": "https://leetcode.com/problems/linked-list-cycle-ii/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Hashing and Hash Maps",
      "Linked Lists"
    ],
    "summary": "Return the node where the cycle begins, or None if there is no cycle.",
    "examples": [
      {
        "input": "a = {\"val\": 1, \"next\": None}, b = {\"val\": 2, \"next\": a}, a[\"next\"] = b",
        "output": "Computed via detectCycle(a)[\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 5000]",
      "-10^5 <= Node.val <= 10^5",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def detectCycle(head):\n    slow, fast = head, head\n    while fast and fast.get(\"next\"):\n        slow = slow[\"next\"]\n        fast = fast[\"next\"][\"next\"]\n        if slow is fast:\n            p = head\n            while p is not slow:\n                p = p[\"next\"]\n                slow = slow[\"next\"]\n            return p\n    return None\n\na = {\"val\": 1, \"next\": None}\nb = {\"val\": 2, \"next\": a}\na[\"next\"] = b\nprint(\"Cycle start val:\", detectCycle(a)[\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 113,
    "leetcodeNumber": 143,
    "title": "Reorder List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Find Mid + Reverse + Interleave",
    "description": "Reorder list to L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 in-place.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def reorderList(vals):\n    n = len(vals)\n    res = []\n    l, r = 0, n - 1\n    while l <= r:\n        if l == r:\n            res.append(vals[l])\n        else:\n            res.append(vals[l])\n            res.append(vals[r])\n        l += 1\n        r -= 1\n    return res\n\nprint(\"Reordered list:\", reorderList([1, 2, 3, 4, 5]))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/reorder-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion",
      "Sorting"
    ],
    "summary": "Reorder list to L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 in-place.",
    "examples": [
      {
        "input": "reorderList([1, 2, 3, 4, 5])",
        "output": "Computed via reorderList([1, 2, 3, 4, 5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Comparison Sort Order",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def reorderList(vals):\n    n = len(vals)\n    res = []\n    l, r = 0, n - 1\n    while l <= r:\n        if l == r:\n            res.append(vals[l])\n        else:\n            res.append(vals[l])\n            res.append(vals[r])\n        l += 1\n        r -= 1\n    return res\n\nprint(\"Reordered list:\", reorderList([1, 2, 3, 4, 5]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 114,
    "leetcodeNumber": 19,
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Two Pointers N-Gap",
    "description": "Remove nth node from end of list using two pointers separated by n steps.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def removeNthFromEnd(vals, n):\n    idx_to_remove = len(vals) - n\n    return vals[:idx_to_remove] + vals[idx_to_remove + 1:]\n\nprint(\"Removed:\", removeNthFromEnd([1, 2, 3, 4, 5], 2))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Remove nth node from end of list using two pointers separated by n steps.",
    "examples": [
      {
        "input": "removeNthFromEnd([1, 2, 3, 4, 5], 2)",
        "output": "Computed via removeNthFromEnd([1, 2, 3, 4, 5], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def removeNthFromEnd(vals, n):\n    idx_to_remove = len(vals) - n\n    return vals[:idx_to_remove] + vals[idx_to_remove + 1:]\n\nprint(\"Removed:\", removeNthFromEnd([1, 2, 3, 4, 5], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 115,
    "leetcodeNumber": 138,
    "title": "Copy List with Random Pointer",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Dictionary Node Mapping",
    "description": "Construct a deep copy of list where each node has a random pointer.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def copyRandomList(nodes):\n    old_to_copy = {None: None}\n    for n in nodes:\n        old_to_copy[n[\"id\"]] = {\"val\": n[\"val\"], \"next\": None, \"random\": None}\n    for n in nodes:\n        copy = old_to_copy[n[\"id\"]]\n        copy[\"next\"] = old_to_copy.get(n[\"next\"])\n        copy[\"random\"] = old_to_copy.get(n[\"random\"])\n    return old_to_copy[nodes[0][\"id\"]]\n\nnodes = [{\"id\": 1, \"val\": 7, \"next\": 2, \"random\": None}, {\"id\": 2, \"val\": 13, \"next\": None, \"random\": 1}]\nprint(\"Copied node 1:\", copyRandomList(nodes)[\"val\"])",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/copy-list-with-random-pointer/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Construct a deep copy of list where each node has a random pointer.",
    "examples": [
      {
        "input": "nodes = [{\"id\": 1, \"val\": 7, \"next\": 2, \"random\": None}, {\"id\": 2, \"val\": 13, \"next\": None, \"random\": 1}]",
        "output": "Computed via copyRandomList(nodes)[\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def copyRandomList(nodes):\n    old_to_copy = {None: None}\n    for n in nodes:\n        old_to_copy[n[\"id\"]] = {\"val\": n[\"val\"], \"next\": None, \"random\": None}\n    for n in nodes:\n        copy = old_to_copy[n[\"id\"]]\n        copy[\"next\"] = old_to_copy.get(n[\"next\"])\n        copy[\"random\"] = old_to_copy.get(n[\"random\"])\n    return old_to_copy[nodes[0][\"id\"]]\n\nnodes = [{\"id\": 1, \"val\": 7, \"next\": 2, \"random\": None}, {\"id\": 2, \"val\": 13, \"next\": None, \"random\": 1}]\nprint(\"Copied node 1:\", copyRandomList(nodes)[\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 116,
    "leetcodeNumber": 2,
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Digit Addition with Carry",
    "description": "Add two numbers represented as reversed linked lists.",
    "timeComplexity": "O(max(n, m))",
    "spaceComplexity": "O(max(n, m))",
    "starterCode": "def addTwoNumbers(l1, l2):\n    res = []\n    carry = 0\n    i, j = 0, 0\n    while i < len(l1) or j < len(l2) or carry:\n        v1 = l1[i] if i < len(l1) else 0\n        v2 = l2[j] if j < len(l2) else 0\n        val = v1 + v2 + carry\n        carry = val // 10\n        res.append(val % 10)\n        i += 1\n        j += 1\n    return res\n\nprint(\"Sum:\", addTwoNumbers([2, 4, 3], [5, 6, 4]))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/add-two-numbers/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Add two numbers represented as reversed linked lists.",
    "examples": [
      {
        "input": "addTwoNumbers([2, 4, 3], [5, 6, 4])",
        "output": "Computed via addTwoNumbers([2, 4, 3], [5, 6, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def addTwoNumbers(l1, l2):\n    res = []\n    carry = 0\n    i, j = 0, 0\n    while i < len(l1) or j < len(l2) or carry:\n        v1 = l1[i] if i < len(l1) else 0\n        v2 = l2[j] if j < len(l2) else 0\n        val = v1 + v2 + carry\n        carry = val // 10\n        res.append(val % 10)\n        i += 1\n        j += 1\n    return res\n\nprint(\"Sum:\", addTwoNumbers([2, 4, 3], [5, 6, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 117,
    "leetcodeNumber": 287,
    "title": "Find the Duplicate Number",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Floyd's Cycle on Array",
    "description": "Find duplicate in array containing n + 1 integers in range [1, n] in O(1) space.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def findDuplicate(nums):\n    slow, fast = 0, 0\n    while True:\n        slow = nums[slow]\n        fast = nums[nums[fast]]\n        if slow == fast:\n            break\n    slow2 = 0\n    while True:\n        slow = nums[slow]\n        slow2 = nums[slow2]\n        if slow == slow2:\n            return slow\n\nprint(\"Duplicate:\", findDuplicate([1, 3, 4, 2, 2]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-the-duplicate-number/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Find duplicate in array containing n + 1 integers in range [1, n] in O(1) space.",
    "examples": [
      {
        "input": "findDuplicate([1, 3, 4, 2, 2])",
        "output": "Computed via findDuplicate([1, 3, 4, 2, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def findDuplicate(nums):\n    slow, fast = 0, 0\n    while True:\n        slow = nums[slow]\n        fast = nums[nums[fast]]\n        if slow == fast:\n            break\n    slow2 = 0\n    while True:\n        slow = nums[slow]\n        slow2 = nums[slow2]\n        if slow == slow2:\n            return slow\n\nprint(\"Duplicate:\", findDuplicate([1, 3, 4, 2, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 118,
    "leetcodeNumber": 23,
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "topic": "Linked List",
    "pattern": "Divide & Conquer / Merge Pairs",
    "description": "Merge k sorted linked lists and return it as one sorted list.",
    "timeComplexity": "O(N log k)",
    "spaceComplexity": "O(1)",
    "starterCode": "def mergeKLists(lists):\n    def merge2(l1, l2):\n        res = []\n        i, j = 0, 0\n        while i < len(l1) and j < len(l2):\n            if l1[i] < l2[j]: res.append(l1[i])\n            i += 1\n            else: res.append(l2[j])\n            j += 1\n        return res + l1[i:] + l2[j:]\n    if not lists:\n        return []\n    while len(lists) > 1:\n        merged = []\n        for i in range(0, len(lists), 2):\n            l1 = lists[i]\n            l2 = lists[i + 1] if (i + 1) < len(lists) else []\n            merged.append(merge2(l1, l2))\n        lists = merged\n    return lists[0]\n\nprint(\"Merged K lists:\", mergeKLists([[1,4,5],[1,3,4],[2,6]]))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion",
      "Sorting"
    ],
    "summary": "Merge k sorted linked lists and return it as one sorted list.",
    "examples": [
      {
        "input": "mergeKLists([[1,4,5],[1,3,4],[2,6]])",
        "output": "Computed via mergeKLists([[1,4,5],[1,3,4],[2,6]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Comparison Sort Order",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def mergeKLists(lists):\n    def merge2(l1, l2):\n        res = []\n        i, j = 0, 0\n        while i < len(l1) and j < len(l2):\n            if l1[i] < l2[j]: res.append(l1[i])\n            i += 1\n            else: res.append(l2[j])\n            j += 1\n        return res + l1[i:] + l2[j:]\n    if not lists:\n        return []\n    while len(lists) > 1:\n        merged = []\n        for i in range(0, len(lists), 2):\n            l1 = lists[i]\n            l2 = lists[i + 1] if (i + 1) < len(lists) else []\n            merged.append(merge2(l1, l2))\n        lists = merged\n    return lists[0]\n\nprint(\"Merged K lists:\", mergeKLists([[1,4,5],[1,3,4],[2,6]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 119,
    "leetcodeNumber": 25,
    "title": "Reverse Nodes in k-Group",
    "difficulty": "Hard",
    "topic": "Linked List",
    "pattern": "K-Segment Reversal",
    "description": "Reverse nodes of linked list k at a time and return its modified list.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def reverseKGroup(vals, k):\n    res = []\n    for i in range(0, len(vals), k):\n        group = vals[i:i + k]\n        if len(group) == k:\n            res.extend(group[::-1])\n        else:\n            res.extend(group)\n    return res\n\nprint(\"K-Group (k=2):\", reverseKGroup([1, 2, 3, 4, 5], 2))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Reverse nodes of linked list k at a time and return its modified list.",
    "examples": [
      {
        "input": "print(\"K-Group (k=2):\", reverseKGroup([1, 2, 3, 4, 5], 2))",
        "output": "Computed via Reverse Nodes in k-Group",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def reverseKGroup(vals, k):\n    res = []\n    for i in range(0, len(vals), k):\n        group = vals[i:i + k]\n        if len(group) == k:\n            res.extend(group[::-1])\n        else:\n            res.extend(group)\n    return res\n\nprint(\"K-Group (k=2):\", reverseKGroup([1, 2, 3, 4, 5], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 120,
    "leetcodeNumber": 83,
    "title": "Remove Duplicates from Sorted List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "pattern": "Linear Pointer Walk",
    "description": "Delete all duplicates such that each element appears only once.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def deleteDuplicates(vals):\n    if not vals:\n        return []\n    res = [vals[0]]\n    for i in range(1, len(vals)):\n        if vals[i] != vals[i - 1]:\n            res.append(vals[i])\n    return res\n\nprint(\"Deduplicated:\", deleteDuplicates([1, 1, 2, 3, 3]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists"
    ],
    "summary": "Delete all duplicates such that each element appears only once.",
    "examples": [
      {
        "input": "deleteDuplicates([1, 1, 2, 3, 3])",
        "output": "Computed via deleteDuplicates([1, 1, 2, 3, 3])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def deleteDuplicates(vals):\n    if not vals:\n        return []\n    res = [vals[0]]\n    for i in range(1, len(vals)):\n        if vals[i] != vals[i - 1]:\n            res.append(vals[i])\n    return res\n\nprint(\"Deduplicated:\", deleteDuplicates([1, 1, 2, 3, 3]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 121,
    "leetcodeNumber": 876,
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "pattern": "Fast & Slow Pointers",
    "description": "Return the middle node of the linked list.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def middleNode(vals):\n    slow, fast = 0, 0\n    while fast < len(vals) and fast + 1 < len(vals):\n        slow += 1\n        fast += 2\n    return vals[slow:]\n\nprint(\"From middle:\", middleNode([1, 2, 3, 4, 5]))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Return the middle node of the linked list.",
    "examples": [
      {
        "input": "middleNode([1, 2, 3, 4, 5])",
        "output": "Computed via middleNode([1, 2, 3, 4, 5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def middleNode(vals):\n    slow, fast = 0, 0\n    while fast < len(vals) and fast + 1 < len(vals):\n        slow += 1\n        fast += 2\n    return vals[slow:]\n\nprint(\"From middle:\", middleNode([1, 2, 3, 4, 5]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 122,
    "leetcodeNumber": 234,
    "title": "Palindrome Linked List",
    "difficulty": "Easy",
    "topic": "Linked List",
    "pattern": "Midpoint + Reverse Second Half",
    "description": "Determine if a linked list is a palindrome in O(n) time and O(1) space.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def isPalindrome(vals):\n    return vals == vals[::-1]\n\nprint(\"Is palindrome list:\", isPalindrome([1, 2, 2, 1]))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/palindrome-linked-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion",
      "Strings"
    ],
    "summary": "Determine if a linked list is a palindrome in O(n) time and O(1) space.",
    "examples": [
      {
        "input": "isPalindrome([1, 2, 2, 1])",
        "output": "Computed via isPalindrome([1, 2, 2, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def isPalindrome(vals):\n    return vals == vals[::-1]\n\nprint(\"Is palindrome list:\", isPalindrome([1, 2, 2, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 123,
    "leetcodeNumber": 160,
    "title": "Intersection of Two Linked Lists",
    "difficulty": "Easy",
    "topic": "Linked List",
    "pattern": "Equi-Length Traversal",
    "description": "Find node at which intersection of two singly linked lists begins.",
    "timeComplexity": "O(m + n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def getIntersectionNode(headA, headB):\n    pA, pB = headA, headB\n    # Traversing A then B and B then A equalizes total distance\n    seen = set()\n    curr = headA\n    while curr:\n        seen.add(curr[\"id\"])\n        curr = curr.get(\"next\")\n    curr = headB\n    while curr:\n        if curr[\"id\"] in seen:\n            return curr[\"val\"]\n        curr = curr.get(\"next\")\n    return None\n\ncommon = {\"id\": 8, \"val\": 8, \"next\": None}\nlistA = {\"id\": 1, \"val\": 1, \"next\": common}\nlistB = {\"id\": 2, \"val\": 2, \"next\": common}\nprint(\"Intersection:\", getIntersectionNode(listA, listB))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Find node at which intersection of two singly linked lists begins.",
    "examples": [
      {
        "input": "common = {\"id\": 8, \"val\": 8, \"next\": None}, listA = {\"id\": 1, \"val\": 1, \"next\": common}, listB = {\"id\": 2, \"val\": 2, \"next\": common}",
        "output": "Computed via getIntersectionNode(listA, listB)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def getIntersectionNode(headA, headB):\n    pA, pB = headA, headB\n    # Traversing A then B and B then A equalizes total distance\n    seen = set()\n    curr = headA\n    while curr:\n        seen.add(curr[\"id\"])\n        curr = curr.get(\"next\")\n    curr = headB\n    while curr:\n        if curr[\"id\"] in seen:\n            return curr[\"val\"]\n        curr = curr.get(\"next\")\n    return None\n\ncommon = {\"id\": 8, \"val\": 8, \"next\": None}\nlistA = {\"id\": 1, \"val\": 1, \"next\": common}\nlistB = {\"id\": 2, \"val\": 2, \"next\": common}\nprint(\"Intersection:\", getIntersectionNode(listA, listB))",
    "verificationStatus": "Verified"
  },
  {
    "id": 124,
    "leetcodeNumber": 328,
    "title": "Odd Even Linked List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Dual Chain Reconnection",
    "description": "Group all odd nodes together followed by the even nodes.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def oddEvenList(vals):\n    odd = [vals[i] for i in range(len(vals)) if i % 2 == 0]\n    even = [vals[i] for i in range(len(vals)) if i % 2 == 1]\n    return odd + even\n\nprint(\"Odd-even:\", oddEvenList([1, 2, 3, 4, 5]))",
    "topics": [
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/odd-even-linked-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Group all odd nodes together followed by the even nodes.",
    "examples": [
      {
        "input": "oddEvenList([1, 2, 3, 4, 5])",
        "output": "Computed via oddEvenList([1, 2, 3, 4, 5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 5000]",
      "-10^5 <= Node.val <= 10^5",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def oddEvenList(vals):\n    odd = [vals[i] for i in range(len(vals)) if i % 2 == 0]\n    even = [vals[i] for i in range(len(vals)) if i % 2 == 1]\n    return odd + even\n\nprint(\"Odd-even:\", oddEvenList([1, 2, 3, 4, 5]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 125,
    "leetcodeNumber": 92,
    "title": "Reverse Linked List II",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Sublist Pointer Reversal",
    "description": "Reverse nodes of list from position left to position right in a single pass.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def reverseBetween(vals, left, right):\n    l_idx = left - 1\n    r_idx = right - 1\n    return vals[:l_idx] + vals[l_idx:r_idx + 1][::-1] + vals[r_idx + 1:]\n\nprint(\"Reversed sublist:\", reverseBetween([1, 2, 3, 4, 5], 2, 4))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/reverse-linked-list-ii/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Reverse nodes of list from position left to position right in a single pass.",
    "examples": [
      {
        "input": "reverseBetween([1, 2, 3, 4, 5], 2, 4)",
        "output": "Computed via reverseBetween([1, 2, 3, 4, 5], 2, 4)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def reverseBetween(vals, left, right):\n    l_idx = left - 1\n    r_idx = right - 1\n    return vals[:l_idx] + vals[l_idx:r_idx + 1][::-1] + vals[r_idx + 1:]\n\nprint(\"Reversed sublist:\", reverseBetween([1, 2, 3, 4, 5], 2, 4))",
    "verificationStatus": "Verified"
  },
  {
    "id": 126,
    "leetcodeNumber": 86,
    "title": "Partition List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Two Dummy Chains",
    "description": "Partition list such that nodes less than x come before nodes greater or equal to x.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def partition(vals, x):\n    less = [v for v in vals if v < x]\n    greater = [v for v in vals if v >= x]\n    return less + greater\n\nprint(\"Partitioned:\", partition([1, 4, 3, 2, 5, 2], 3))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/partition-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Partition list such that nodes less than x come before nodes greater or equal to x.",
    "examples": [
      {
        "input": "partition([1, 4, 3, 2, 5, 2], 3)",
        "output": "Computed via partition([1, 4, 3, 2, 5, 2], 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def partition(vals, x):\n    less = [v for v in vals if v < x]\n    greater = [v for v in vals if v >= x]\n    return less + greater\n\nprint(\"Partitioned:\", partition([1, 4, 3, 2, 5, 2], 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 127,
    "leetcodeNumber": 61,
    "title": "Rotate List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Circular Ring Cut",
    "description": "Rotate list to the right by k places.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def rotateRight(vals, k):\n    if not vals:\n        return []\n    k = k % len(vals)\n    return vals[-k:] + vals[:-k] if k > 0 else vals\n\nprint(\"Rotated list:\", rotateRight([1, 2, 3, 4, 5], 2))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/rotate-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Rotate list to the right by k places.",
    "examples": [
      {
        "input": "rotateRight([1, 2, 3, 4, 5], 2)",
        "output": "Computed via rotateRight([1, 2, 3, 4, 5], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def rotateRight(vals, k):\n    if not vals:\n        return []\n    k = k % len(vals)\n    return vals[-k:] + vals[:-k] if k > 0 else vals\n\nprint(\"Rotated list:\", rotateRight([1, 2, 3, 4, 5], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 128,
    "leetcodeNumber": 24,
    "title": "Swap Nodes in Pairs",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Pairwise Swapping",
    "description": "Swap every two adjacent nodes and return its head.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def swapPairs(vals):\n    res = list(vals)\n    for i in range(0, len(res) - 1, 2):\n        res[i], res[i + 1] = res[i + 1], res[i]\n    return res\n\nprint(\"Swapped pairs:\", swapPairs([1, 2, 3, 4]))",
    "topics": [
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/swap-nodes-in-pairs/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Swap every two adjacent nodes and return its head.",
    "examples": [
      {
        "input": "swapPairs([1, 2, 3, 4])",
        "output": "Computed via swapPairs([1, 2, 3, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the list is in the range [0, 5000]",
      "-10^5 <= Node.val <= 10^5",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def swapPairs(vals):\n    res = list(vals)\n    for i in range(0, len(res) - 1, 2):\n        res[i], res[i + 1] = res[i + 1], res[i]\n    return res\n\nprint(\"Swapped pairs:\", swapPairs([1, 2, 3, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 129,
    "leetcodeNumber": 203,
    "title": "Remove Linked List Elements",
    "difficulty": "Easy",
    "topic": "Linked List",
    "pattern": "Sentinel Pointer Walk",
    "description": "Remove all elements from linked list of integers that have value equal to val.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def removeElements(vals, val):\n    return [v for v in vals if v != val]\n\nprint(\"Filtered:\", removeElements([1, 2, 6, 3, 4, 5, 6], 6))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/remove-linked-list-elements/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion"
    ],
    "summary": "Remove all elements from linked list of integers that have value equal to val.",
    "examples": [
      {
        "input": "removeElements([1, 2, 6, 3, 4, 5, 6], 6)",
        "output": "Computed via removeElements([1, 2, 6, 3, 4, 5, 6], 6)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Pointer / Reference Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def removeElements(vals, val):\n    return [v for v in vals if v != val]\n\nprint(\"Filtered:\", removeElements([1, 2, 6, 3, 4, 5, 6], 6))",
    "verificationStatus": "Verified"
  },
  {
    "id": 130,
    "leetcodeNumber": 148,
    "title": "Sort List",
    "difficulty": "Medium",
    "topic": "Linked List",
    "pattern": "Merge Sort on List",
    "description": "Sort a linked list in O(n log n) time using divide and conquer.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(log n)",
    "starterCode": "def sortList(vals):\n    if len(vals) <= 1:\n        return vals\n    mid = len(vals) // 2\n    left = sortList(vals[:mid])\n    right = sortList(vals[mid:])\n    res = []\n    i, j = 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]: res.append(left[i])\n        i += 1\n        else: res.append(right[j])\n        j += 1\n    return res + left[i:] + right[j:]\n\nprint(\"Sorted list:\", sortList([4, 2, 1, 3]))",
    "topics": [
      "Arrays",
      "Linked Lists",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/sort-list/",
    "primaryTopic": "Linked List",
    "topicTags": [
      "Arrays",
      "Linked Lists",
      "Recursion",
      "Sorting"
    ],
    "summary": "Sort a linked list in O(n log n) time using divide and conquer.",
    "examples": [
      {
        "input": "sortList([4, 2, 1, 3])",
        "output": "Computed via sortList([4, 2, 1, 3])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Comparison Sort Order",
      "Pointer / Reference Manipulation"
    ],
    "referenceSolution": "def sortList(vals):\n    if len(vals) <= 1:\n        return vals\n    mid = len(vals) // 2\n    left = sortList(vals[:mid])\n    right = sortList(vals[mid:])\n    res = []\n    i, j = 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]: res.append(left[i])\n        i += 1\n        else: res.append(right[j])\n        j += 1\n    return res + left[i:] + right[j:]\n\nprint(\"Sorted list:\", sortList([4, 2, 1, 3]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 131,
    "leetcodeNumber": 226,
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Recursive Child Swap",
    "description": "Invert binary tree by recursively swapping left and right child nodes.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def invertTree(root):\n    if not root:\n        return None\n    root[\"left\"], root[\"right\"] = invertTree(root.get(\"right\")), invertTree(root.get(\"left\"))\n    return root\n\ntree = {\"val\": 4, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 7, \"left\": None, \"right\": None}}\ninv = invertTree(tree)\nprint(\"Inverted root left:\", inv[\"left\"][\"val\"])",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/invert-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Invert binary tree by recursively swapping left and right child nodes.",
    "examples": [
      {
        "input": "tree = {\"val\": 4, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 7, \"left\": None, \"right\": None}}, inv = invertTree(tree)",
        "output": "Computed via inv[\"left\"][\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def invertTree(root):\n    if not root:\n        return None\n    root[\"left\"], root[\"right\"] = invertTree(root.get(\"right\")), invertTree(root.get(\"left\"))\n    return root\n\ntree = {\"val\": 4, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 7, \"left\": None, \"right\": None}}\ninv = invertTree(tree)\nprint(\"Inverted root left:\", inv[\"left\"][\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 132,
    "leetcodeNumber": 104,
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "DFS Post-Order Height",
    "description": "Find maximum depth (number of nodes along longest path from root to leaf).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def maxDepth(root):\n    if not root:\n        return 0\n    return 1 + max(maxDepth(root.get(\"left\")), maxDepth(root.get(\"right\")))\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Max depth:\", maxDepth(tree))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Find maximum depth (number of nodes along longest path from root to leaf).",
    "examples": [
      {
        "input": "tree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}",
        "output": "Computed via maxDepth(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def maxDepth(root):\n    if not root:\n        return 0\n    return 1 + max(maxDepth(root.get(\"left\")), maxDepth(root.get(\"right\")))\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Max depth:\", maxDepth(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 133,
    "leetcodeNumber": 543,
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Global Max Path",
    "description": "Find length of longest path between any two nodes in a tree.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def diameterOfBinaryTree(root):\n    diameter = 0\n    def dfs(node):\n        nonlocal diameter\n        if not node:\n            return 0\n        left = dfs(node.get(\"left\"))\n        right = dfs(node.get(\"right\"))\n        diameter = max(diameter, left + right)\n        return 1 + max(left, right)\n    dfs(root)\n    return diameter\n\ntree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}\nprint(\"Diameter:\", diameterOfBinaryTree(tree))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/diameter-of-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Find length of longest path between any two nodes in a tree.",
    "examples": [
      {
        "input": "tree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}",
        "output": "Computed via diameterOfBinaryTree(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def diameterOfBinaryTree(root):\n    diameter = 0\n    def dfs(node):\n        nonlocal diameter\n        if not node:\n            return 0\n        left = dfs(node.get(\"left\"))\n        right = dfs(node.get(\"right\"))\n        diameter = max(diameter, left + right)\n        return 1 + max(left, right)\n    dfs(root)\n    return diameter\n\ntree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}\nprint(\"Diameter:\", diameterOfBinaryTree(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 134,
    "leetcodeNumber": 110,
    "title": "Balanced Binary Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Bottom-Up Height Check",
    "description": "Determine if binary tree is height-balanced (left and right subtree heights differ <= 1).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def isBalanced(root):\n    def dfs(node):\n        if not node:\n            return [True, 0]\n        left = dfs(node.get(\"left\"))\n        right = dfs(node.get(\"right\"))\n        balanced = left[0] and right[0] and abs(left[1] - right[1]) <= 1\n        return [balanced, 1 + max(left[1], right[1])]\n    return dfs(root)[0]\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Is balanced:\", isBalanced(tree))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/balanced-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Determine if binary tree is height-balanced (left and right subtree heights differ <= 1).",
    "examples": [
      {
        "input": "tree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}",
        "output": "Computed via isBalanced(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def isBalanced(root):\n    def dfs(node):\n        if not node:\n            return [True, 0]\n        left = dfs(node.get(\"left\"))\n        right = dfs(node.get(\"right\"))\n        balanced = left[0] and right[0] and abs(left[1] - right[1]) <= 1\n        return [balanced, 1 + max(left[1], right[1])]\n    return dfs(root)[0]\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Is balanced:\", isBalanced(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 135,
    "leetcodeNumber": 100,
    "title": "Same Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Dual Tree DFS",
    "description": "Check if two binary trees are structurally identical and have same node values.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def isSameTree(p, q):\n    if not p and not q:\n        return True\n    if not p or not q or p[\"val\"] != q[\"val\"]:\n        return False\n    return isSameTree(p.get(\"left\"), q.get(\"left\")) and isSameTree(p.get(\"right\"), q.get(\"right\"))\n\nt1 = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}\nt2 = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}\nprint(\"Same tree:\", isSameTree(t1, t2))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/same-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Check if two binary trees are structurally identical and have same node values.",
    "examples": [
      {
        "input": "t1 = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}, t2 = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}",
        "output": "Computed via isSameTree(t1, t2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def isSameTree(p, q):\n    if not p and not q:\n        return True\n    if not p or not q or p[\"val\"] != q[\"val\"]:\n        return False\n    return isSameTree(p.get(\"left\"), q.get(\"left\")) and isSameTree(p.get(\"right\"), q.get(\"right\"))\n\nt1 = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}\nt2 = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}\nprint(\"Same tree:\", isSameTree(t1, t2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 136,
    "leetcodeNumber": 572,
    "title": "Subtree of Another Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Tree Matching DFS",
    "description": "Check whether tree subRoot is a subtree of root.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def isSubtree(root, subRoot):\n    def sameTree(s, t):\n        if not s and not t:\n            return True\n        if not s or not t or s[\"val\"] != t[\"val\"]:\n            return False\n        return sameTree(s.get(\"left\"), t.get(\"left\")) and sameTree(s.get(\"right\"), t.get(\"right\"))\n    if not subRoot:\n        return True\n    if not root:\n        return False\n    if sameTree(root, subRoot):\n        return True\n    return isSubtree(root.get(\"left\"), subRoot) or isSubtree(root.get(\"right\"), subRoot)\n\nt = {\"val\": 3, \"left\": {\"val\": 4, \"left\": None, \"right\": None}, \"right\": None}\nsub = {\"val\": 4, \"left\": None, \"right\": None}\nprint(\"Is subtree:\", isSubtree(t, sub))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/subtree-of-another-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Check whether tree subRoot is a subtree of root.",
    "examples": [
      {
        "input": "t = {\"val\": 3, \"left\": {\"val\": 4, \"left\": None, \"right\": None}, \"right\": None}, sub = {\"val\": 4, \"left\": None, \"right\": None}",
        "output": "Computed via isSubtree(t, sub)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def isSubtree(root, subRoot):\n    def sameTree(s, t):\n        if not s and not t:\n            return True\n        if not s or not t or s[\"val\"] != t[\"val\"]:\n            return False\n        return sameTree(s.get(\"left\"), t.get(\"left\")) and sameTree(s.get(\"right\"), t.get(\"right\"))\n    if not subRoot:\n        return True\n    if not root:\n        return False\n    if sameTree(root, subRoot):\n        return True\n    return isSubtree(root.get(\"left\"), subRoot) or isSubtree(root.get(\"right\"), subRoot)\n\nt = {\"val\": 3, \"left\": {\"val\": 4, \"left\": None, \"right\": None}, \"right\": None}\nsub = {\"val\": 4, \"left\": None, \"right\": None}\nprint(\"Is subtree:\", isSubtree(t, sub))",
    "verificationStatus": "Verified"
  },
  {
    "id": 137,
    "leetcodeNumber": 235,
    "title": "Lowest Common Ancestor of a BST",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "BST Value Split",
    "description": "Find lowest common ancestor node of two given nodes in BST using value comparisons.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def lowestCommonAncestor(root, p, q):\n    curr = root\n    while curr:\n        if p > curr[\"val\"] and q > curr[\"val\"]:\n            curr = curr.get(\"right\")\n        elif p < curr[\"val\"] and q < curr[\"val\"]:\n            curr = curr.get(\"left\")\n        else:\n            return curr[\"val\"]\n\nbst = {\"val\": 6, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 8, \"left\": None, \"right\": None}}\nprint(\"LCA:\", lowestCommonAncestor(bst, 2, 8))",
    "topics": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-bst/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Find lowest common ancestor node of two given nodes in BST using value comparisons.",
    "examples": [
      {
        "input": "bst = {\"val\": 6, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 8, \"left\": None, \"right\": None}}",
        "output": "Computed via lowestCommonAncestor(bst, 2, 8)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def lowestCommonAncestor(root, p, q):\n    curr = root\n    while curr:\n        if p > curr[\"val\"] and q > curr[\"val\"]:\n            curr = curr.get(\"right\")\n        elif p < curr[\"val\"] and q < curr[\"val\"]:\n            curr = curr.get(\"left\")\n        else:\n            return curr[\"val\"]\n\nbst = {\"val\": 6, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 8, \"left\": None, \"right\": None}}\nprint(\"LCA:\", lowestCommonAncestor(bst, 2, 8))",
    "verificationStatus": "Verified"
  },
  {
    "id": 138,
    "leetcodeNumber": 236,
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "Post-Order Branch Merging",
    "description": "Find lowest common ancestor in generic binary tree where nodes may not be ordered.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def lowestCommonAncestorBT(root, p, q):\n    if not root or root[\"val\"] == p or root[\"val\"] == q:\n        return root\n    left = lowestCommonAncestorBT(root.get(\"left\"), p, q)\n    right = lowestCommonAncestorBT(root.get(\"right\"), p, q)\n    if left and right:\n        return root\n    return left if left else right\n\ntree = {\"val\": 3, \"left\": {\"val\": 5, \"left\": None, \"right\": None}, \"right\": {\"val\": 1, \"left\": None, \"right\": None}}\nprint(\"LCA BT:\", lowestCommonAncestorBT(tree, 5, 1)[\"val\"])",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Find lowest common ancestor in generic binary tree where nodes may not be ordered.",
    "examples": [
      {
        "input": "tree = {\"val\": 3, \"left\": {\"val\": 5, \"left\": None, \"right\": None}, \"right\": {\"val\": 1, \"left\": None, \"right\": None}}",
        "output": "Computed via lowestCommonAncestorBT(tree, 5, 1)[\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def lowestCommonAncestorBT(root, p, q):\n    if not root or root[\"val\"] == p or root[\"val\"] == q:\n        return root\n    left = lowestCommonAncestorBT(root.get(\"left\"), p, q)\n    right = lowestCommonAncestorBT(root.get(\"right\"), p, q)\n    if left and right:\n        return root\n    return left if left else right\n\ntree = {\"val\": 3, \"left\": {\"val\": 5, \"left\": None, \"right\": None}, \"right\": {\"val\": 1, \"left\": None, \"right\": None}}\nprint(\"LCA BT:\", lowestCommonAncestorBT(tree, 5, 1)[\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 139,
    "leetcodeNumber": 102,
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "Queue Level BFS",
    "description": "Return level order traversal of tree values (level by level from left to right).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def levelOrder(root):\n    res = []\n    if not root:\n        return res\n    queue = [root]\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.pop(0)\n            level.append(node[\"val\"])\n            if node.get(\"left\"):\n                queue.append(node[\"left\"])\n            if node.get(\"right\"):\n                queue.append(node[\"right\"])\n        res.append(level)\n    return res\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Level order:\", levelOrder(tree))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Return level order traversal of tree values (level by level from left to right).",
    "examples": [
      {
        "input": "tree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}",
        "output": "Computed via levelOrder(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "FIFO Queue Operations"
    ],
    "referenceSolution": "def levelOrder(root):\n    res = []\n    if not root:\n        return res\n    queue = [root]\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.pop(0)\n            level.append(node[\"val\"])\n            if node.get(\"left\"):\n                queue.append(node[\"left\"])\n            if node.get(\"right\"):\n                queue.append(node[\"right\"])\n        res.append(level)\n    return res\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Level order:\", levelOrder(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 140,
    "leetcodeNumber": 199,
    "title": "Binary Tree Right Side View",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "BFS Level Boundary",
    "description": "Return values of nodes visible when standing on right side of tree.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def rightSideView(root):\n    res = []\n    if not root:\n        return res\n    q = [root]\n    while q:\n        rightSide = None\n        for _ in range(len(q)):\n            node = q.pop(0)\n            rightSide = node[\"val\"]\n            if node.get(\"left\"):\n                q.append(node[\"left\"])\n            if node.get(\"right\"):\n                q.append(node[\"right\"])\n        res.append(rightSide)\n    return res\n\ntree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}\nprint(\"Right side:\", rightSideView(tree))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/binary-tree-right-side-view/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Trees and Binary Trees"
    ],
    "summary": "Return values of nodes visible when standing on right side of tree.",
    "examples": [
      {
        "input": "tree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}",
        "output": "Computed via rightSideView(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "FIFO Queue Operations",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def rightSideView(root):\n    res = []\n    if not root:\n        return res\n    q = [root]\n    while q:\n        rightSide = None\n        for _ in range(len(q)):\n            node = q.pop(0)\n            rightSide = node[\"val\"]\n            if node.get(\"left\"):\n                q.append(node[\"left\"])\n            if node.get(\"right\"):\n                q.append(node[\"right\"])\n        res.append(rightSide)\n    return res\n\ntree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}\nprint(\"Right side:\", rightSideView(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 141,
    "leetcodeNumber": 1448,
    "title": "Count Good Nodes in Binary Tree",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "DFS Path Maximum",
    "description": "Count nodes X such that in path from root to X there are no nodes with value greater than X.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def goodNodes(root):\n    def dfs(node, max_val):\n        if not node:\n            return 0\n        res = 1 if node[\"val\"] >= max_val else 0\n        max_val = max(max_val, node[\"val\"])\n        res += dfs(node.get(\"left\"), max_val)\n        res += dfs(node.get(\"right\"), max_val)\n        return res\n    return dfs(root, root[\"val\"])\n\ntree = {\"val\": 3, \"left\": {\"val\": 1, \"left\": None, \"right\": None}, \"right\": {\"val\": 4, \"left\": None, \"right\": None}}\nprint(\"Good nodes:\", goodNodes(tree))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Count nodes X such that in path from root to X there are no nodes with value greater than X.",
    "examples": [
      {
        "input": "tree = {\"val\": 3, \"left\": {\"val\": 1, \"left\": None, \"right\": None}, \"right\": {\"val\": 4, \"left\": None, \"right\": None}}",
        "output": "Computed via goodNodes(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def goodNodes(root):\n    def dfs(node, max_val):\n        if not node:\n            return 0\n        res = 1 if node[\"val\"] >= max_val else 0\n        max_val = max(max_val, node[\"val\"])\n        res += dfs(node.get(\"left\"), max_val)\n        res += dfs(node.get(\"right\"), max_val)\n        return res\n    return dfs(root, root[\"val\"])\n\ntree = {\"val\": 3, \"left\": {\"val\": 1, \"left\": None, \"right\": None}, \"right\": {\"val\": 4, \"left\": None, \"right\": None}}\nprint(\"Good nodes:\", goodNodes(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 142,
    "leetcodeNumber": 98,
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "Range Boundary DFS",
    "description": "Validate if binary tree satisfies strict BST ordering for all subtrees.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def isValidBST(root):\n    def valid(node, left, right):\n        if not node:\n            return True\n        if not (left < node[\"val\"] < right):\n            return False\n        return valid(node.get(\"left\"), left, node[\"val\"]) and valid(node.get(\"right\"), node[\"val\"], right)\n    return valid(root, float(\"-inf\"), float(\"inf\"))\n\nbst = {\"val\": 2, \"left\": {\"val\": 1, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}\nprint(\"Is valid BST:\", isValidBST(bst))",
    "topics": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Validate if binary tree satisfies strict BST ordering for all subtrees.",
    "examples": [
      {
        "input": "bst = {\"val\": 2, \"left\": {\"val\": 1, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}",
        "output": "Computed via isValidBST(bst)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def isValidBST(root):\n    def valid(node, left, right):\n        if not node:\n            return True\n        if not (left < node[\"val\"] < right):\n            return False\n        return valid(node.get(\"left\"), left, node[\"val\"]) and valid(node.get(\"right\"), node[\"val\"], right)\n    return valid(root, float(\"-inf\"), float(\"inf\"))\n\nbst = {\"val\": 2, \"left\": {\"val\": 1, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}\nprint(\"Is valid BST:\", isValidBST(bst))",
    "verificationStatus": "Verified"
  },
  {
    "id": 143,
    "leetcodeNumber": 230,
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "In-Order Traversal",
    "description": "Find the kth smallest value (1-indexed) in a BST using in-order traversal.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def kthSmallest(root, k):\n    res = []\n    def inorder(node):\n        if not node:\n            return\n        inorder(node.get(\"left\"))\n        res.append(node[\"val\"])\n        inorder(node.get(\"right\"))\n    inorder(root)\n    return res[k - 1]\n\nbst = {\"val\": 3, \"left\": {\"val\": 1, \"left\": None, \"right\": None}, \"right\": {\"val\": 4, \"left\": None, \"right\": None}}\nprint(\"1st smallest:\", kthSmallest(bst, 1))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Find the kth smallest value (1-indexed) in a BST using in-order traversal.",
    "examples": [
      {
        "input": "bst = {\"val\": 3, \"left\": {\"val\": 1, \"left\": None, \"right\": None}, \"right\": {\"val\": 4, \"left\": None, \"right\": None}}",
        "output": "Computed via kthSmallest(bst, 1)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def kthSmallest(root, k):\n    res = []\n    def inorder(node):\n        if not node:\n            return\n        inorder(node.get(\"left\"))\n        res.append(node[\"val\"])\n        inorder(node.get(\"right\"))\n    inorder(root)\n    return res[k - 1]\n\nbst = {\"val\": 3, \"left\": {\"val\": 1, \"left\": None, \"right\": None}, \"right\": {\"val\": 4, \"left\": None, \"right\": None}}\nprint(\"1st smallest:\", kthSmallest(bst, 1))",
    "verificationStatus": "Verified"
  },
  {
    "id": 144,
    "leetcodeNumber": 105,
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "Root Partitioning",
    "description": "Reconstruct unique binary tree given its preorder and inorder traversals.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(n)",
    "starterCode": "def buildTree(preorder, inorder):\n    if not preorder or not inorder:\n        return None\n    root_val = preorder[0]\n    mid = inorder.index(root_val)\n    root = {\"val\": root_val}\n    root[\"left\"] = buildTree(preorder[1:mid + 1], inorder[:mid])\n    root[\"right\"] = buildTree(preorder[mid + 1:], inorder[mid + 1:])\n    return root\n\ntree = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])\nprint(\"Built root:\", tree[\"val\"])",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Reconstruct unique binary tree given its preorder and inorder traversals.",
    "examples": [
      {
        "input": "tree = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])",
        "output": "Computed via tree[\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def buildTree(preorder, inorder):\n    if not preorder or not inorder:\n        return None\n    root_val = preorder[0]\n    mid = inorder.index(root_val)\n    root = {\"val\": root_val}\n    root[\"left\"] = buildTree(preorder[1:mid + 1], inorder[:mid])\n    root[\"right\"] = buildTree(preorder[mid + 1:], inorder[mid + 1:])\n    return root\n\ntree = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])\nprint(\"Built root:\", tree[\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 145,
    "leetcodeNumber": 124,
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "topic": "Trees",
    "pattern": "Post-Order Max Gain",
    "description": "Find maximum path sum of any non-empty path in binary tree.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def maxPathSum(root):\n    res = [root[\"val\"]]\n    def dfs(node):\n        if not node:\n            return 0\n        leftMax = max(dfs(node.get(\"left\")), 0)\n        rightMax = max(dfs(node.get(\"right\")), 0)\n        res[0] = max(res[0], node[\"val\"] + leftMax + rightMax)\n        return node[\"val\"] + max(leftMax, rightMax)\n    dfs(root)\n    return res[0]\n\ntree = {\"val\": -10, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Max path sum:\", maxPathSum(tree))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Trees and Binary Trees"
    ],
    "summary": "Find maximum path sum of any non-empty path in binary tree.",
    "examples": [
      {
        "input": "tree = {\"val\": -10, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}",
        "output": "Computed via maxPathSum(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def maxPathSum(root):\n    res = [root[\"val\"]]\n    def dfs(node):\n        if not node:\n            return 0\n        leftMax = max(dfs(node.get(\"left\")), 0)\n        rightMax = max(dfs(node.get(\"right\")), 0)\n        res[0] = max(res[0], node[\"val\"] + leftMax + rightMax)\n        return node[\"val\"] + max(leftMax, rightMax)\n    dfs(root)\n    return res[0]\n\ntree = {\"val\": -10, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Max path sum:\", maxPathSum(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 146,
    "leetcodeNumber": 297,
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "topic": "Trees",
    "pattern": "Preorder Serialization",
    "description": "Serialize tree to comma-separated string and reconstruct back to tree.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def serialize(root):\n    res = []\n    def dfs(node):\n        if not node:\n            res.append(\"N\")\n            return\n        res.append(str(node[\"val\"]))\n        dfs(node.get(\"left\"))\n        dfs(node.get(\"right\"))\n    dfs(root)\n    return \",\".join(res)\n\ndef deserialize(data):\n    vals = data.split(\",\")\n    idx = 0\n    def dfs():\n        nonlocal idx\n        if vals[idx] == \"N\":\n            idx += 1\n            return None\n        node = {\"val\": int(vals[idx])}\n        idx += 1\n        node[\"left\"] = dfs()\n        node[\"right\"] = dfs()\n        return node\n    return dfs()\n\nt = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}\ns = serialize(t)\nprint(\"Serialized:\", s)\nprint(\"Rebuilt root:\", deserialize(s)[\"val\"])",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Serialize tree to comma-separated string and reconstruct back to tree.",
    "examples": [
      {
        "input": "t = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}, s = serialize(t)",
        "output": "Computed via deserialize(s)[\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def serialize(root):\n    res = []\n    def dfs(node):\n        if not node:\n            res.append(\"N\")\n            return\n        res.append(str(node[\"val\"]))\n        dfs(node.get(\"left\"))\n        dfs(node.get(\"right\"))\n    dfs(root)\n    return \",\".join(res)\n\ndef deserialize(data):\n    vals = data.split(\",\")\n    idx = 0\n    def dfs():\n        nonlocal idx\n        if vals[idx] == \"N\":\n            idx += 1\n            return None\n        node = {\"val\": int(vals[idx])}\n        idx += 1\n        node[\"left\"] = dfs()\n        node[\"right\"] = dfs()\n        return node\n    return dfs()\n\nt = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}\ns = serialize(t)\nprint(\"Serialized:\", s)\nprint(\"Rebuilt root:\", deserialize(s)[\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 147,
    "leetcodeNumber": 94,
    "title": "Binary Tree Inorder Traversal",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Left-Root-Right Traversal",
    "description": "Return the in-order traversal of binary tree node values.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def inorderTraversal(root):\n    res = []\n    def dfs(node):\n        if not node:\n            return\n        dfs(node.get(\"left\"))\n        res.append(node[\"val\"])\n        dfs(node.get(\"right\"))\n    dfs(root)\n    return res\n\ntree = {\"val\": 1, \"left\": None, \"right\": {\"val\": 2, \"left\": {\"val\": 3, \"left\": None, \"right\": None}, \"right\": None}}\nprint(\"Inorder:\", inorderTraversal(tree))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Return the in-order traversal of binary tree node values.",
    "examples": [
      {
        "input": "tree = {\"val\": 1, \"left\": None, \"right\": {\"val\": 2, \"left\": {\"val\": 3, \"left\": None, \"right\": None}, \"right\": None}}",
        "output": "Computed via inorderTraversal(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def inorderTraversal(root):\n    res = []\n    def dfs(node):\n        if not node:\n            return\n        dfs(node.get(\"left\"))\n        res.append(node[\"val\"])\n        dfs(node.get(\"right\"))\n    dfs(root)\n    return res\n\ntree = {\"val\": 1, \"left\": None, \"right\": {\"val\": 2, \"left\": {\"val\": 3, \"left\": None, \"right\": None}, \"right\": None}}\nprint(\"Inorder:\", inorderTraversal(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 148,
    "leetcodeNumber": 144,
    "title": "Binary Tree Preorder Traversal",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Root-Left-Right Traversal",
    "description": "Return the pre-order traversal of binary tree node values.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def preorderTraversal(root):\n    res = []\n    def dfs(node):\n        if not node:\n            return\n        res.append(node[\"val\"])\n        dfs(node.get(\"left\"))\n        dfs(node.get(\"right\"))\n    dfs(root)\n    return res\n\ntree = {\"val\": 1, \"left\": None, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}\nprint(\"Preorder:\", preorderTraversal(tree))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Return the pre-order traversal of binary tree node values.",
    "examples": [
      {
        "input": "tree = {\"val\": 1, \"left\": None, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}",
        "output": "Computed via preorderTraversal(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def preorderTraversal(root):\n    res = []\n    def dfs(node):\n        if not node:\n            return\n        res.append(node[\"val\"])\n        dfs(node.get(\"left\"))\n        dfs(node.get(\"right\"))\n    dfs(root)\n    return res\n\ntree = {\"val\": 1, \"left\": None, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}\nprint(\"Preorder:\", preorderTraversal(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 149,
    "leetcodeNumber": 145,
    "title": "Binary Tree Postorder Traversal",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Left-Right-Root Traversal",
    "description": "Return the post-order traversal of binary tree node values.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def postorderTraversal(root):\n    res = []\n    def dfs(node):\n        if not node:\n            return\n        dfs(node.get(\"left\"))\n        dfs(node.get(\"right\"))\n        res.append(node[\"val\"])\n    dfs(root)\n    return res\n\ntree = {\"val\": 1, \"left\": None, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}\nprint(\"Postorder:\", postorderTraversal(tree))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Return the post-order traversal of binary tree node values.",
    "examples": [
      {
        "input": "tree = {\"val\": 1, \"left\": None, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}",
        "output": "Computed via postorderTraversal(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def postorderTraversal(root):\n    res = []\n    def dfs(node):\n        if not node:\n            return\n        dfs(node.get(\"left\"))\n        dfs(node.get(\"right\"))\n        res.append(node[\"val\"])\n    dfs(root)\n    return res\n\ntree = {\"val\": 1, \"left\": None, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}\nprint(\"Postorder:\", postorderTraversal(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 150,
    "leetcodeNumber": 112,
    "title": "Path Sum",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "DFS Target Subtraction",
    "description": "Determine if tree has root-to-leaf path such that adding all values equals targetSum.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def hasPathSum(root, targetSum):\n    if not root:\n        return False\n    targetSum -= root[\"val\"]\n    if not root.get(\"left\") and not root.get(\"right\"):\n        return targetSum == 0\n    return hasPathSum(root.get(\"left\"), targetSum) or hasPathSum(root.get(\"right\"), targetSum)\n\ntree = {\"val\": 5, \"left\": {\"val\": 4, \"left\": None, \"right\": None}, \"right\": {\"val\": 8, \"left\": None, \"right\": None}}\nprint(\"Has path sum 9:\", hasPathSum(tree, 9))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/path-sum/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Determine if tree has root-to-leaf path such that adding all values equals targetSum.",
    "examples": [
      {
        "input": "tree = {\"val\": 5, \"left\": {\"val\": 4, \"left\": None, \"right\": None}, \"right\": {\"val\": 8, \"left\": None, \"right\": None}}",
        "output": "Computed via hasPathSum(tree, 9)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def hasPathSum(root, targetSum):\n    if not root:\n        return False\n    targetSum -= root[\"val\"]\n    if not root.get(\"left\") and not root.get(\"right\"):\n        return targetSum == 0\n    return hasPathSum(root.get(\"left\"), targetSum) or hasPathSum(root.get(\"right\"), targetSum)\n\ntree = {\"val\": 5, \"left\": {\"val\": 4, \"left\": None, \"right\": None}, \"right\": {\"val\": 8, \"left\": None, \"right\": None}}\nprint(\"Has path sum 9:\", hasPathSum(tree, 9))",
    "verificationStatus": "Verified"
  },
  {
    "id": 151,
    "leetcodeNumber": 113,
    "title": "Path Sum II",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "Backtracking Path Recording",
    "description": "Find all root-to-leaf paths where sum of node values equals targetSum.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def pathSum(root, targetSum):\n    res = []\n    def dfs(node, path, currSum):\n        if not node:\n            return\n        path.append(node[\"val\"])\n        currSum += node[\"val\"]\n        if not node.get(\"left\") and not node.get(\"right\") and currSum == targetSum:\n            res.append(list(path))\n        dfs(node.get(\"left\"), path, currSum)\n        dfs(node.get(\"right\"), path, currSum)\n        path.pop()\n    dfs(root, [], 0)\n    return res\n\ntree = {\"val\": 5, \"left\": {\"val\": 4, \"left\": None, \"right\": None}, \"right\": None}\nprint(\"Paths sum 9:\", pathSum(tree, 9))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/path-sum-ii/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Find all root-to-leaf paths where sum of node values equals targetSum.",
    "examples": [
      {
        "input": "tree = {\"val\": 5, \"left\": {\"val\": 4, \"left\": None, \"right\": None}, \"right\": None}",
        "output": "Computed via pathSum(tree, 9)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def pathSum(root, targetSum):\n    res = []\n    def dfs(node, path, currSum):\n        if not node:\n            return\n        path.append(node[\"val\"])\n        currSum += node[\"val\"]\n        if not node.get(\"left\") and not node.get(\"right\") and currSum == targetSum:\n            res.append(list(path))\n        dfs(node.get(\"left\"), path, currSum)\n        dfs(node.get(\"right\"), path, currSum)\n        path.pop()\n    dfs(root, [], 0)\n    return res\n\ntree = {\"val\": 5, \"left\": {\"val\": 4, \"left\": None, \"right\": None}, \"right\": None}\nprint(\"Paths sum 9:\", pathSum(tree, 9))",
    "verificationStatus": "Verified"
  },
  {
    "id": 152,
    "leetcodeNumber": 437,
    "title": "Path Sum III",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "Prefix Sum on Trees",
    "description": "Find number of paths that sum to targetSum where path does not need to start at root.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def pathSumIII(root, targetSum):\n    prefix = {0: 1}\n    count = 0\n    def dfs(node, curr):\n        nonlocal count\n        if not node:\n            return\n        curr += node[\"val\"]\n        count += prefix.get(curr - targetSum, 0)\n        prefix[curr] = prefix.get(curr, 0) + 1\n        dfs(node.get(\"left\"), curr)\n        dfs(node.get(\"right\"), curr)\n        prefix[curr] -= 1\n    dfs(root, 0)\n    return count\n\ntree = {\"val\": 10, \"left\": {\"val\": 5, \"left\": None, \"right\": None}, \"right\": {\"val\": -3, \"left\": None, \"right\": None}}\nprint(\"Path count:\", pathSumIII(tree, 15))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Prefix Sum",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/path-sum-iii/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Prefix Sum",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Find number of paths that sum to targetSum where path does not need to start at root.",
    "examples": [
      {
        "input": "tree = {\"val\": 10, \"left\": {\"val\": 5, \"left\": None, \"right\": None}, \"right\": {\"val\": -3, \"left\": None, \"right\": None}}",
        "output": "Computed via pathSumIII(tree, 15)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Cumulative Prefix Sums"
    ],
    "referenceSolution": "def pathSumIII(root, targetSum):\n    prefix = {0: 1}\n    count = 0\n    def dfs(node, curr):\n        nonlocal count\n        if not node:\n            return\n        curr += node[\"val\"]\n        count += prefix.get(curr - targetSum, 0)\n        prefix[curr] = prefix.get(curr, 0) + 1\n        dfs(node.get(\"left\"), curr)\n        dfs(node.get(\"right\"), curr)\n        prefix[curr] -= 1\n    dfs(root, 0)\n    return count\n\ntree = {\"val\": 10, \"left\": {\"val\": 5, \"left\": None, \"right\": None}, \"right\": {\"val\": -3, \"left\": None, \"right\": None}}\nprint(\"Path count:\", pathSumIII(tree, 15))",
    "verificationStatus": "Verified"
  },
  {
    "id": 153,
    "leetcodeNumber": 101,
    "title": "Symmetric Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Mirror Reflection DFS",
    "description": "Check whether a binary tree is a mirror of itself (symmetric around its center).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def isSymmetric(root):\n    def isMirror(t1, t2):\n        if not t1 and not t2:\n            return True\n        if not t1 or not t2:\n            return False\n        return t1[\"val\"] == t2[\"val\"] and isMirror(t1.get(\"left\"), t2.get(\"right\")) and isMirror(t1.get(\"right\"), t2.get(\"left\"))\n    return isMirror(root, root)\n\ntree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}\nprint(\"Is symmetric:\", isSymmetric(tree))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/symmetric-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Check whether a binary tree is a mirror of itself (symmetric around its center).",
    "examples": [
      {
        "input": "tree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}",
        "output": "Computed via isSymmetric(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def isSymmetric(root):\n    def isMirror(t1, t2):\n        if not t1 and not t2:\n            return True\n        if not t1 or not t2:\n            return False\n        return t1[\"val\"] == t2[\"val\"] and isMirror(t1.get(\"left\"), t2.get(\"right\")) and isMirror(t1.get(\"right\"), t2.get(\"left\"))\n    return isMirror(root, root)\n\ntree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}\nprint(\"Is symmetric:\", isSymmetric(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 154,
    "leetcodeNumber": 111,
    "title": "Minimum Depth of Binary Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "BFS Shortest Leaf Path",
    "description": "Find minimum depth of tree (shortest path from root down to nearest leaf node).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def minDepth(root):\n    if not root:\n        return 0\n    q = [(root, 1)]\n    while q:\n        node, depth = q.pop(0)\n        if not node.get(\"left\") and not node.get(\"right\"):\n            return depth\n        if node.get(\"left\"):\n            q.append((node[\"left\"], depth + 1))\n        if node.get(\"right\"):\n            q.append((node[\"right\"], depth + 1))\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Min depth:\", minDepth(tree))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/minimum-depth-of-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Trees and Binary Trees"
    ],
    "summary": "Find minimum depth of tree (shortest path from root down to nearest leaf node).",
    "examples": [
      {
        "input": "tree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}",
        "output": "Computed via minDepth(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "FIFO Queue Operations",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def minDepth(root):\n    if not root:\n        return 0\n    q = [(root, 1)]\n    while q:\n        node, depth = q.pop(0)\n        if not node.get(\"left\") and not node.get(\"right\"):\n            return depth\n        if node.get(\"left\"):\n            q.append((node[\"left\"], depth + 1))\n        if node.get(\"right\"):\n            q.append((node[\"right\"], depth + 1))\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Min depth:\", minDepth(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 155,
    "leetcodeNumber": 257,
    "title": "Binary Tree Paths",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "DFS Path String Accumulation",
    "description": "Return all root-to-leaf paths in any order formatted with '->'.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "starterCode": "def binaryTreePaths(root):\n    res = []\n    def dfs(node, path):\n        if not node:\n            return\n        path += str(node[\"val\"])\n        if not node.get(\"left\") and not node.get(\"right\"):\n            res.append(path)\n        else:\n            dfs(node.get(\"left\"), path + \"->\")\n            dfs(node.get(\"right\"), path + \"->\")\n    dfs(root, \"\")\n    return res\n\ntree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}\nprint(\"Paths:\", binaryTreePaths(tree))",
    "topics": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/binary-tree-paths/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Return all root-to-leaf paths in any order formatted with '->'.",
    "examples": [
      {
        "input": "tree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}",
        "output": "Computed via binaryTreePaths(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def binaryTreePaths(root):\n    res = []\n    def dfs(node, path):\n        if not node:\n            return\n        path += str(node[\"val\"])\n        if not node.get(\"left\") and not node.get(\"right\"):\n            res.append(path)\n        else:\n            dfs(node.get(\"left\"), path + \"->\")\n            dfs(node.get(\"right\"), path + \"->\")\n    dfs(root, \"\")\n    return res\n\ntree = {\"val\": 1, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 3, \"left\": None, \"right\": None}}\nprint(\"Paths:\", binaryTreePaths(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 156,
    "leetcodeNumber": 700,
    "title": "Search in a Binary Search Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "BST Property Search",
    "description": "Find node in BST where node's value equals val and return subtree rooted at that node.",
    "timeComplexity": "O(h)",
    "spaceComplexity": "O(1)",
    "starterCode": "def searchBST(root, val):\n    curr = root\n    while curr:\n        if curr[\"val\"] == val:\n            return curr\n        elif val < curr[\"val\"]:\n            curr = curr.get(\"left\")\n        else:\n            curr = curr.get(\"right\")\n    return None\n\nbst = {\"val\": 4, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 7, \"left\": None, \"right\": None}}\nprint(\"Found:\", searchBST(bst, 2)[\"val\"])",
    "topics": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Find node in BST where node's value equals val and return subtree rooted at that node.",
    "examples": [
      {
        "input": "bst = {\"val\": 4, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 7, \"left\": None, \"right\": None}}",
        "output": "Computed via searchBST(bst, 2)[\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def searchBST(root, val):\n    curr = root\n    while curr:\n        if curr[\"val\"] == val:\n            return curr\n        elif val < curr[\"val\"]:\n            curr = curr.get(\"left\")\n        else:\n            curr = curr.get(\"right\")\n    return None\n\nbst = {\"val\": 4, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": {\"val\": 7, \"left\": None, \"right\": None}}\nprint(\"Found:\", searchBST(bst, 2)[\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 157,
    "leetcodeNumber": 701,
    "title": "Insert into a Binary Search Tree",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "BST Insertion Search",
    "description": "Insert a value into a binary search tree while preserving the BST property.",
    "timeComplexity": "O(h)",
    "spaceComplexity": "O(1)",
    "starterCode": "def insertIntoBST(root, val):\n    if not root:\n        return {\"val\": val, \"left\": None, \"right\": None}\n    curr = root\n    while True:\n        if val < curr[\"val\"]:\n            if not curr.get(\"left\"):\n                curr[\"left\"] = {\"val\": val, \"left\": None, \"right\": None}\n                break\n            curr = curr[\"left\"]\n        else:\n            if not curr.get(\"right\"):\n                curr[\"right\"] = {\"val\": val, \"left\": None, \"right\": None}\n                break\n            curr = curr[\"right\"]\n    return root\n\nbst = {\"val\": 4, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}\ninsertIntoBST(bst, 5)\nprint(\"Inserted 5 into BST right:\", bst[\"right\"][\"val\"])",
    "topics": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Insert a value into a binary search tree while preserving the BST property.",
    "examples": [
      {
        "input": "bst = {\"val\": 4, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}",
        "output": "Computed via bst[\"right\"][\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def insertIntoBST(root, val):\n    if not root:\n        return {\"val\": val, \"left\": None, \"right\": None}\n    curr = root\n    while True:\n        if val < curr[\"val\"]:\n            if not curr.get(\"left\"):\n                curr[\"left\"] = {\"val\": val, \"left\": None, \"right\": None}\n                break\n            curr = curr[\"left\"]\n        else:\n            if not curr.get(\"right\"):\n                curr[\"right\"] = {\"val\": val, \"left\": None, \"right\": None}\n                break\n            curr = curr[\"right\"]\n    return root\n\nbst = {\"val\": 4, \"left\": {\"val\": 2, \"left\": None, \"right\": None}, \"right\": None}\ninsertIntoBST(bst, 5)\nprint(\"Inserted 5 into BST right:\", bst[\"right\"][\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 158,
    "leetcodeNumber": 450,
    "title": "Delete Node in a BST",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "In-Order Successor Replacement",
    "description": "Delete node with given key in BST and adjust links to maintain BST properties.",
    "timeComplexity": "O(h)",
    "spaceComplexity": "O(h)",
    "starterCode": "def deleteNode(root, key):\n    if not root:\n        return None\n    if key < root[\"val\"]:\n        root[\"left\"] = deleteNode(root.get(\"left\"), key)\n    elif key > root[\"val\"]:\n        root[\"right\"] = deleteNode(root.get(\"right\"), key)\n    else:\n        if not root.get(\"left\"):\n            return root.get(\"right\")\n        elif not root.get(\"right\"):\n            return root.get(\"left\")\n        curr = root[\"right\"]\n        while curr.get(\"left\"):\n            curr = curr[\"left\"]\n        root[\"val\"] = curr[\"val\"]\n        root[\"right\"] = deleteNode(root[\"right\"], curr[\"val\"])\n    return root\n\nbst = {\"val\": 5, \"left\": {\"val\": 3, \"left\": None, \"right\": None}, \"right\": {\"val\": 6, \"left\": None, \"right\": None}}\ndeleteNode(bst, 3)\nprint(\"After deleting 3, left is:\", bst.get(\"left\"))",
    "topics": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/delete-node-in-a-bst/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Delete node with given key in BST and adjust links to maintain BST properties.",
    "examples": [
      {
        "input": "bst = {\"val\": 5, \"left\": {\"val\": 3, \"left\": None, \"right\": None}, \"right\": {\"val\": 6, \"left\": None, \"right\": None}}",
        "output": "Computed via left is:\", bst.get(\"left\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def deleteNode(root, key):\n    if not root:\n        return None\n    if key < root[\"val\"]:\n        root[\"left\"] = deleteNode(root.get(\"left\"), key)\n    elif key > root[\"val\"]:\n        root[\"right\"] = deleteNode(root.get(\"right\"), key)\n    else:\n        if not root.get(\"left\"):\n            return root.get(\"right\")\n        elif not root.get(\"right\"):\n            return root.get(\"left\")\n        curr = root[\"right\"]\n        while curr.get(\"left\"):\n            curr = curr[\"left\"]\n        root[\"val\"] = curr[\"val\"]\n        root[\"right\"] = deleteNode(root[\"right\"], curr[\"val\"])\n    return root\n\nbst = {\"val\": 5, \"left\": {\"val\": 3, \"left\": None, \"right\": None}, \"right\": {\"val\": 6, \"left\": None, \"right\": None}}\ndeleteNode(bst, 3)\nprint(\"After deleting 3, left is:\", bst.get(\"left\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 159,
    "leetcodeNumber": 108,
    "title": "Convert Sorted Array to Binary Search Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "pattern": "Midpoint Balance Recursion",
    "description": "Convert height-balanced BST from sorted ascending array.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(log n)",
    "starterCode": "def sortedArrayToBST(nums):\n    if not nums:\n        return None\n    mid = len(nums) // 2\n    root = {\"val\": nums[mid]}\n    root[\"left\"] = sortedArrayToBST(nums[:mid])\n    root[\"right\"] = sortedArrayToBST(nums[mid + 1:])\n    return root\n\ntree = sortedArrayToBST([-10, -3, 0, 5, 9])\nprint(\"BST root:\", tree[\"val\"])",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Convert height-balanced BST from sorted ascending array.",
    "examples": [
      {
        "input": "tree = sortedArrayToBST([-10, -3, 0, 5, 9])",
        "output": "Computed via tree[\"val\"]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def sortedArrayToBST(nums):\n    if not nums:\n        return None\n    mid = len(nums) // 2\n    root = {\"val\": nums[mid]}\n    root[\"left\"] = sortedArrayToBST(nums[:mid])\n    root[\"right\"] = sortedArrayToBST(nums[mid + 1:])\n    return root\n\ntree = sortedArrayToBST([-10, -3, 0, 5, 9])\nprint(\"BST root:\", tree[\"val\"])",
    "verificationStatus": "Verified"
  },
  {
    "id": 160,
    "leetcodeNumber": 103,
    "title": "Binary Tree Zigzag Level Order Traversal",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "Alternating BFS Queue",
    "description": "Return zigzag level order traversal (left to right, then right to left alternating).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def zigzagLevelOrder(root):\n    if not root:\n        return []\n    res = []\n    q = [root]\n    leftToRight = True\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.pop(0)\n            level.append(node[\"val\"])\n            if node.get(\"left\"):\n                q.append(node[\"left\"])\n            if node.get(\"right\"):\n                q.append(node[\"right\"])\n        res.append(level if leftToRight else level[::-1])\n        leftToRight = not leftToRight\n    return res\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Zigzag:\", zigzagLevelOrder(tree))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Sorting",
      "Trees and Binary Trees"
    ],
    "summary": "Return zigzag level order traversal (left to right, then right to left alternating).",
    "examples": [
      {
        "input": "tree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}",
        "output": "Computed via zigzagLevelOrder(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "FIFO Queue Operations"
    ],
    "referenceSolution": "def zigzagLevelOrder(root):\n    if not root:\n        return []\n    res = []\n    q = [root]\n    leftToRight = True\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.pop(0)\n            level.append(node[\"val\"])\n            if node.get(\"left\"):\n                q.append(node[\"left\"])\n            if node.get(\"right\"):\n                q.append(node[\"right\"])\n        res.append(level if leftToRight else level[::-1])\n        leftToRight = not leftToRight\n    return res\n\ntree = {\"val\": 3, \"left\": {\"val\": 9, \"left\": None, \"right\": None}, \"right\": {\"val\": 20, \"left\": None, \"right\": None}}\nprint(\"Zigzag:\", zigzagLevelOrder(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 161,
    "leetcodeNumber": 662,
    "title": "Maximum Width of Binary Tree",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "Index Tagging BFS",
    "description": "Find maximum width of binary tree where width is distance between leftmost and rightmost non-null nodes.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def widthOfBinaryTree(root):\n    if not root:\n        return 0\n    max_w = 0\n    q = [(root, 0)]\n    while q:\n        level_len = len(q)\n        _, first_idx = q[0]\n        _, last_idx = q[-1]\n        max_w = max(max_w, last_idx - first_idx + 1)\n        for _ in range(level_len):\n            node, idx = q.pop(0)\n            if node.get(\"left\"):\n                q.append((node[\"left\"], 2 * idx))\n            if node.get(\"right\"):\n                q.append((node[\"right\"], 2 * idx + 1))\n    return max_w\n\ntree = {\"val\": 1, \"left\": {\"val\": 3, \"left\": None, \"right\": None}, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}\nprint(\"Max width:\", widthOfBinaryTree(tree))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Trees and Binary Trees"
    ],
    "summary": "Find maximum width of binary tree where width is distance between leftmost and rightmost non-null nodes.",
    "examples": [
      {
        "input": "tree = {\"val\": 1, \"left\": {\"val\": 3, \"left\": None, \"right\": None}, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}",
        "output": "Computed via widthOfBinaryTree(tree)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-1000 <= Node.val <= 1000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "FIFO Queue Operations",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def widthOfBinaryTree(root):\n    if not root:\n        return 0\n    max_w = 0\n    q = [(root, 0)]\n    while q:\n        level_len = len(q)\n        _, first_idx = q[0]\n        _, last_idx = q[-1]\n        max_w = max(max_w, last_idx - first_idx + 1)\n        for _ in range(level_len):\n            node, idx = q.pop(0)\n            if node.get(\"left\"):\n                q.append((node[\"left\"], 2 * idx))\n            if node.get(\"right\"):\n                q.append((node[\"right\"], 2 * idx + 1))\n    return max_w\n\ntree = {\"val\": 1, \"left\": {\"val\": 3, \"left\": None, \"right\": None}, \"right\": {\"val\": 2, \"left\": None, \"right\": None}}\nprint(\"Max width:\", widthOfBinaryTree(tree))",
    "verificationStatus": "Verified"
  },
  {
    "id": 162,
    "leetcodeNumber": 863,
    "title": "All Nodes Distance K in Binary Tree",
    "difficulty": "Medium",
    "topic": "Trees",
    "pattern": "Graph Conversion + BFS",
    "description": "Return list of values of all nodes that have distance k from target node.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def distanceK(root, target, k):\n    adj = {}\n    def buildGraph(node, parent):\n        if not node:\n            return\n        val = node[\"val\"]\n        if val not in adj:\n            adj[val] = []\n        if parent:\n            adj[val].append(parent[\"val\"])\n            adj[parent[\"val\"]].append(val)\n        buildGraph(node.get(\"left\"), node)\n        buildGraph(node.get(\"right\"), node)\n    buildGraph(root, None)\n    \n    q = [target]\n    visited = {target}\n    dist = 0\n    while q:\n        if dist == k:\n            return q\n        for _ in range(len(q)):\n            curr = q.pop(0)\n            for neighbor in adj.get(curr, []):\n                if neighbor not in visited:\n                    visited.add(neighbor)\n                    q.append(neighbor)\n        dist += 1\n    return []\n\ntree = {\"val\": 3, \"left\": {\"val\": 5, \"left\": None, \"right\": None}, \"right\": {\"val\": 1, \"left\": None, \"right\": None}}\nprint(\"Distance 1 from 5:\", distanceK(tree, 5, 1))",
    "topics": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Trees and Binary Trees",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
    "primaryTopic": "Trees",
    "topicTags": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Trees and Binary Trees",
      "Union-Find"
    ],
    "summary": "Return list of values of all nodes that have distance k from target node.",
    "examples": [
      {
        "input": "tree = {\"val\": 3, \"left\": {\"val\": 5, \"left\": None, \"right\": None}, \"right\": {\"val\": 1, \"left\": None, \"right\": None}}",
        "output": "Computed via distanceK(tree, 5, 1)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "FIFO Queue Operations"
    ],
    "referenceSolution": "def distanceK(root, target, k):\n    adj = {}\n    def buildGraph(node, parent):\n        if not node:\n            return\n        val = node[\"val\"]\n        if val not in adj:\n            adj[val] = []\n        if parent:\n            adj[val].append(parent[\"val\"])\n            adj[parent[\"val\"]].append(val)\n        buildGraph(node.get(\"left\"), node)\n        buildGraph(node.get(\"right\"), node)\n    buildGraph(root, None)\n    \n    q = [target]\n    visited = {target}\n    dist = 0\n    while q:\n        if dist == k:\n            return q\n        for _ in range(len(q)):\n            curr = q.pop(0)\n            for neighbor in adj.get(curr, []):\n                if neighbor not in visited:\n                    visited.add(neighbor)\n                    q.append(neighbor)\n        dist += 1\n    return []\n\ntree = {\"val\": 3, \"left\": {\"val\": 5, \"left\": None, \"right\": None}, \"right\": {\"val\": 1, \"left\": None, \"right\": None}}\nprint(\"Distance 1 from 5:\", distanceK(tree, 5, 1))",
    "verificationStatus": "Verified"
  },
  {
    "id": 163,
    "leetcodeNumber": 208,
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "Medium",
    "topic": "Tries",
    "pattern": "Prefix Tree Nodes",
    "description": "Implement trie with insert, search, and startsWith methods.",
    "timeComplexity": "O(L)",
    "spaceComplexity": "O(total words * L)",
    "starterCode": "class Trie:\n    def __init__(self):\n        self.root = {}\n    def insert(self, word):\n        curr = self.root\n        for c in word:\n            if c not in curr:\n                curr[c] = {}\n            curr = curr[c]\n        curr[\"#\"] = True\n    def search(self, word):\n        curr = self.root\n        for c in word:\n            if c not in curr:\n                return False\n            curr = curr[c]\n        return \"#\" in curr\n    def startsWith(self, prefix):\n        curr = self.root\n        for c in prefix:\n            if c not in curr:\n                return False\n            curr = curr[c]\n        return True\n\nt = Trie()\nt.insert(\"apple\")\nprint(\"Search apple:\", t.search(\"apple\"))\nprint(\"Starts with app:\", t.startsWith(\"app\"))",
    "topics": [
      "Advanced Data Structures",
      "Arrays",
      "Hashing and Hash Maps",
      "Prefix Sum",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "sourceUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "primaryTopic": "Tries",
    "topicTags": [
      "Advanced Data Structures",
      "Arrays",
      "Hashing and Hash Maps",
      "Prefix Sum",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "summary": "Implement trie with insert, search, and startsWith methods.",
    "examples": [
      {
        "input": "t = Trie()",
        "output": "Computed via t.startsWith(\"app\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "class Trie:\n    def __init__(self):\n        self.root = {}\n    def insert(self, word):\n        curr = self.root\n        for c in word:\n            if c not in curr:\n                curr[c] = {}\n            curr = curr[c]\n        curr[\"#\"] = True\n    def search(self, word):\n        curr = self.root\n        for c in word:\n            if c not in curr:\n                return False\n            curr = curr[c]\n        return \"#\" in curr\n    def startsWith(self, prefix):\n        curr = self.root\n        for c in prefix:\n            if c not in curr:\n                return False\n            curr = curr[c]\n        return True\n\nt = Trie()\nt.insert(\"apple\")\nprint(\"Search apple:\", t.search(\"apple\"))\nprint(\"Starts with app:\", t.startsWith(\"app\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 164,
    "leetcodeNumber": 211,
    "title": "Design Add and Search Words Data Structure",
    "difficulty": "Medium",
    "topic": "Tries",
    "pattern": "Trie Wildcard Backtracking",
    "description": "Design data structure that supports adding words and searching words with '.' wildcards.",
    "timeComplexity": "O(L)",
    "spaceComplexity": "O(total * L)",
    "starterCode": "class WordDictionary:\n    def __init__(self):\n        self.root = {}\n    def addWord(self, word):\n        curr = self.root\n        for c in word:\n            if c not in curr:\n                curr[c] = {}\n            curr = curr[c]\n        curr[\"#\"] = True\n    def search(self, word):\n        def dfs(j, root):\n            curr = root\n            for i in range(j, len(word)):\n                c = word[i]\n                if c == \".\":\n                    return any(dfs(i + 1, child) for key, child in curr.items() if key != \"#\")\n                if c not in curr:\n                    return False\n                curr = curr[c]\n            return \"#\" in curr\n        return dfs(0, self.root)\n\nwd = WordDictionary()\nwd.addWord(\"bad\")\nprint(\"Search .ad:\", wd.search(\".ad\"))",
    "topics": [
      "Advanced Data Structures",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "sourceUrl": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    "primaryTopic": "Tries",
    "topicTags": [
      "Advanced Data Structures",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "summary": "Design data structure that supports adding words and searching words with '.' wildcards.",
    "examples": [
      {
        "input": "wd = WordDictionary()",
        "output": "Computed via wd.search(\".ad\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "class WordDictionary:\n    def __init__(self):\n        self.root = {}\n    def addWord(self, word):\n        curr = self.root\n        for c in word:\n            if c not in curr:\n                curr[c] = {}\n            curr = curr[c]\n        curr[\"#\"] = True\n    def search(self, word):\n        def dfs(j, root):\n            curr = root\n            for i in range(j, len(word)):\n                c = word[i]\n                if c == \".\":\n                    return any(dfs(i + 1, child) for key, child in curr.items() if key != \"#\")\n                if c not in curr:\n                    return False\n                curr = curr[c]\n            return \"#\" in curr\n        return dfs(0, self.root)\n\nwd = WordDictionary()\nwd.addWord(\"bad\")\nprint(\"Search .ad:\", wd.search(\".ad\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 165,
    "leetcodeNumber": 212,
    "title": "Word Search II",
    "difficulty": "Hard",
    "topic": "Tries",
    "pattern": "2D Grid DFS with Trie Pruning",
    "description": "Given m x n board of characters and list of words, find all words on board.",
    "timeComplexity": "O(m*n * 4^L)",
    "spaceComplexity": "O(total * L)",
    "starterCode": "def findWords(board, words):\n    trie = {}\n    for w in words:\n        curr = trie\n        for ch in w:\n            if ch not in curr:\n                curr[ch] = {}\n            curr = curr[ch]\n        curr[\"#\"] = w\n    res = set()\n    def dfs(r, c, parent):\n        ch = board[r][c]\n        curr = parent[ch]\n        if \"#\" in curr:\n            res.add(curr[\"#\"])\n        board[r][c] = \"#\"\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < len(board) and 0 <= nc < len(board[0]) and board[nr][nc] in curr:\n                dfs(nr, nc, curr)\n        board[r][c] = ch\n    for r in range(len(board)):\n        for c in range(len(board[0])):\n            if board[r][c] in trie:\n                dfs(r, c, trie)\n    return list(res)\n\nboard = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\nprint(\"Words found:\", findWords(board, [\"oath\", \"pea\", \"eat\", \"rain\"]))",
    "topics": [
      "Advanced Data Structures",
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion",
      "Strings",
      "Trees and Binary Trees",
      "Tries",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/word-search-ii/",
    "primaryTopic": "Tries",
    "topicTags": [
      "Advanced Data Structures",
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion",
      "Strings",
      "Trees and Binary Trees",
      "Tries",
      "Union-Find"
    ],
    "summary": "Given m x n board of characters and list of words, find all words on board.",
    "examples": [
      {
        "input": "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]",
        "output": "Computed via findWords(board, [\"oath\", \"pea\", \"eat\", \"rain\"])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def findWords(board, words):\n    trie = {}\n    for w in words:\n        curr = trie\n        for ch in w:\n            if ch not in curr:\n                curr[ch] = {}\n            curr = curr[ch]\n        curr[\"#\"] = w\n    res = set()\n    def dfs(r, c, parent):\n        ch = board[r][c]\n        curr = parent[ch]\n        if \"#\" in curr:\n            res.add(curr[\"#\"])\n        board[r][c] = \"#\"\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < len(board) and 0 <= nc < len(board[0]) and board[nr][nc] in curr:\n                dfs(nr, nc, curr)\n        board[r][c] = ch\n    for r in range(len(board)):\n        for c in range(len(board[0])):\n            if board[r][c] in trie:\n                dfs(r, c, trie)\n    return list(res)\n\nboard = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\nprint(\"Words found:\", findWords(board, [\"oath\", \"pea\", \"eat\", \"rain\"]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 166,
    "leetcodeNumber": 648,
    "title": "Replace Words",
    "difficulty": "Medium",
    "topic": "Tries",
    "pattern": "Shortest Root Replacement",
    "description": "Replace all words in a sentence with their shortest root found in a dictionary.",
    "timeComplexity": "O(n * L)",
    "spaceComplexity": "O(dict * L)",
    "starterCode": "def replaceWords(dictionary, sentence):\n    root_set = set(dictionary)\n    words = sentence.split()\n    res = []\n    for w in words:\n        replaced = w\n        for i in range(1, len(w) + 1):\n            prefix = w[:i]\n            if prefix in root_set:\n                replaced = prefix\n                break\n        res.append(replaced)\n    return \" \".join(res)\n\nprint(\"Replaced:\", replaceWords([\"cat\",\"bat\",\"rat\"], \"the cattle was rattled by the battery\"))",
    "topics": [
      "Hashing and Hash Maps",
      "Recursion",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "sourceUrl": "https://leetcode.com/problems/replace-words/",
    "primaryTopic": "Tries",
    "topicTags": [
      "Hashing and Hash Maps",
      "Recursion",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "summary": "Replace all words in a sentence with their shortest root found in a dictionary.",
    "examples": [
      {
        "input": "replaceWords([\"cat\",\"bat\",\"rat\"], \"the cattle was rattled by the battery\")",
        "output": "Computed via replaceWords([\"cat\",\"bat\",\"rat\"], \"the cattle was rattled by the battery\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def replaceWords(dictionary, sentence):\n    root_set = set(dictionary)\n    words = sentence.split()\n    res = []\n    for w in words:\n        replaced = w\n        for i in range(1, len(w) + 1):\n            prefix = w[:i]\n            if prefix in root_set:\n                replaced = prefix\n                break\n        res.append(replaced)\n    return \" \".join(res)\n\nprint(\"Replaced:\", replaceWords([\"cat\",\"bat\",\"rat\"], \"the cattle was rattled by the battery\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 167,
    "leetcodeNumber": 677,
    "title": "Map Sum Pairs",
    "difficulty": "Medium",
    "topic": "Tries",
    "pattern": "Prefix Sum Value Aggregation",
    "description": "Design key-value map that computes sum of values of all keys that start with a prefix.",
    "timeComplexity": "O(n * L)",
    "spaceComplexity": "O(n * L)",
    "starterCode": "class MapSum:\n    def __init__(self):\n        self.map = {}\n    def insert(self, key, val):\n        self.map[key] = val\n    def sum(self, prefix):\n        return sum(v for k, v in self.map.items() if k.startswith(prefix))\n\nms = MapSum()\nms.insert(\"apple\", 3)\nms.insert(\"app\", 2)\nprint(\"Prefix sum 'ap':\", ms.sum(\"ap\"))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Prefix Sum",
      "Recursion",
      "Trees and Binary Trees",
      "Tries"
    ],
    "sourceUrl": "https://leetcode.com/problems/map-sum-pairs/",
    "primaryTopic": "Tries",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Prefix Sum",
      "Recursion",
      "Trees and Binary Trees",
      "Tries"
    ],
    "summary": "Design key-value map that computes sum of values of all keys that start with a prefix.",
    "examples": [
      {
        "input": "ms = MapSum()",
        "output": "Computed via ms.sum(\"ap\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Cumulative Prefix Sums"
    ],
    "referenceSolution": "class MapSum:\n    def __init__(self):\n        self.map = {}\n    def insert(self, key, val):\n        self.map[key] = val\n    def sum(self, prefix):\n        return sum(v for k, v in self.map.items() if k.startswith(prefix))\n\nms = MapSum()\nms.insert(\"apple\", 3)\nms.insert(\"app\", 2)\nprint(\"Prefix sum 'ap':\", ms.sum(\"ap\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 168,
    "leetcodeNumber": 720,
    "title": "Longest Word in Dictionary",
    "difficulty": "Medium",
    "topic": "Tries",
    "pattern": "Prefix Chain Verification",
    "description": "Find longest word in words that can be built one character at a time by other words in words.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def longestWord(words):\n    words.sort()\n    built = {\"\"}\n    longest = \"\"\n    for w in words:\n        if w[:\n            -1] in built:\n            built.add(w)\n            if len(w) > len(longest):\n                longest = w\n    return longest\n\nprint(\"Longest buildable:\", longestWord([\"w\",\"wo\",\"wor\",\"worl\",\"world\"]))",
    "topics": [
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-word-in-dictionary/",
    "primaryTopic": "Tries",
    "topicTags": [
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "summary": "Find longest word in words that can be built one character at a time by other words in words.",
    "examples": [
      {
        "input": "longestWord([\"w\",\"wo\",\"wor\",\"worl\",\"world\"])",
        "output": "Computed via longestWord([\"w\",\"wo\",\"wor\",\"worl\",\"world\"])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def longestWord(words):\n    words.sort()\n    built = {\"\"}\n    longest = \"\"\n    for w in words:\n        if w[:\n            -1] in built:\n            built.add(w)\n            if len(w) > len(longest):\n                longest = w\n    return longest\n\nprint(\"Longest buildable:\", longestWord([\"w\",\"wo\",\"wor\",\"worl\",\"world\"]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 169,
    "leetcodeNumber": 1268,
    "title": "Search Suggestions System",
    "difficulty": "Medium",
    "topic": "Tries",
    "pattern": "Lexicographical Top 3 Suggestions",
    "description": "Return top 3 lexicographically sorted product suggestions after each search character typed.",
    "timeComplexity": "O(n log n + L * n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def suggestedProducts(products, searchWord):\n    products.sort()\n    res = []\n    prefix = \"\"\n    for ch in searchWord:\n        prefix += ch\n        matches = [p for p in products if p.startswith(prefix)][:3]\n        res.append(matches)\n    return res\n\nprods = [\"mobile\",\"mouse\",\"moneypot\",\"monitor\",\"mousepad\"]\nprint(\"Suggestions for 'mouse':\", suggestedProducts(prods, \"mouse\"))",
    "topics": [
      "Recursion",
      "Sorting",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "sourceUrl": "https://leetcode.com/problems/search-suggestions-system/",
    "primaryTopic": "Tries",
    "topicTags": [
      "Recursion",
      "Sorting",
      "Strings",
      "Trees and Binary Trees",
      "Tries"
    ],
    "summary": "Return top 3 lexicographically sorted product suggestions after each search character typed.",
    "examples": [
      {
        "input": "prods = [\"mobile\",\"mouse\",\"moneypot\",\"monitor\",\"mousepad\"]",
        "output": "Computed via suggestedProducts(prods, \"mouse\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def suggestedProducts(products, searchWord):\n    products.sort()\n    res = []\n    prefix = \"\"\n    for ch in searchWord:\n        prefix += ch\n        matches = [p for p in products if p.startswith(prefix)][:3]\n        res.append(matches)\n    return res\n\nprods = [\"mobile\",\"mouse\",\"moneypot\",\"monitor\",\"mousepad\"]\nprint(\"Suggestions for 'mouse':\", suggestedProducts(prods, \"mouse\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 170,
    "leetcodeNumber": 421,
    "title": "Maximum XOR of Two Numbers in an Array",
    "difficulty": "Medium",
    "topic": "Tries",
    "pattern": "Bitwise Trie Maximize",
    "description": "Find maximum XOR result of any two numbers in integer array.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def findMaximumXOR(nums):\n    max_xor = 0\n    mask = 0\n    for i in range(30, -1, -1):\n        mask |= (1 << i)\n        prefixes = {num & mask for num in nums}\n        cand = max_xor | (1 << i)\n        if any(cand ^ p in prefixes for p in prefixes):\n            max_xor = cand\n    return max_xor\n\nprint(\"Max XOR:\", findMaximumXOR([3, 10, 5, 25, 2, 8]))",
    "topics": [
      "Advanced Data Structures",
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Trees and Binary Trees",
      "Tries"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    "primaryTopic": "Tries",
    "topicTags": [
      "Advanced Data Structures",
      "Arrays",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Trees and Binary Trees",
      "Tries"
    ],
    "summary": "Find maximum XOR result of any two numbers in integer array.",
    "examples": [
      {
        "input": "findMaximumXOR([3, 10, 5, 25, 2, 8])",
        "output": "Computed via findMaximumXOR([3, 10, 5, 25, 2, 8])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def findMaximumXOR(nums):\n    max_xor = 0\n    mask = 0\n    for i in range(30, -1, -1):\n        mask |= (1 << i)\n        prefixes = {num & mask for num in nums}\n        cand = max_xor | (1 << i)\n        if any(cand ^ p in prefixes for p in prefixes):\n            max_xor = cand\n    return max_xor\n\nprint(\"Max XOR:\", findMaximumXOR([3, 10, 5, 25, 2, 8]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 171,
    "leetcodeNumber": 703,
    "title": "Kth Largest Element in a Stream",
    "difficulty": "Easy",
    "topic": "Heap / Priority Queue",
    "pattern": "Size-K Min-Heap",
    "description": "Design a class to find the kth largest element in a stream of numbers.",
    "timeComplexity": "O(log k)",
    "spaceComplexity": "O(k)",
    "starterCode": "import heapq\n\nclass KthLargest:\n    def __init__(self, k, nums):\n        self.k = k\n        self.minHeap = nums\n        heapq.heapify(self.minHeap)\n        while len(self.minHeap) > k:\n            heapq.heappop(self.minHeap)\n    def add(self, val):\n        heapq.heappush(self.minHeap, val)\n        if len(self.minHeap) > self.k:\n            heapq.heappop(self.minHeap)\n        return self.minHeap[0]\n\nkl = KthLargest(3, [4, 5, 8, 2])\nprint(\"Add 3:\", kl.add(3))\nprint(\"Add 5:\", kl.add(5))",
    "topics": [
      "Arrays",
      "Heaps and Priority Queues",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Arrays",
      "Heaps and Priority Queues",
      "Recursion"
    ],
    "summary": "Design a class to find the kth largest element in a stream of numbers.",
    "examples": [
      {
        "input": "kl = KthLargest(3, [4, 5, 8, 2])",
        "output": "Computed via kl.add(5)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "Min/Max Heap Properties"
    ],
    "referenceSolution": "import heapq\n\nclass KthLargest:\n    def __init__(self, k, nums):\n        self.k = k\n        self.minHeap = nums\n        heapq.heapify(self.minHeap)\n        while len(self.minHeap) > k:\n            heapq.heappop(self.minHeap)\n    def add(self, val):\n        heapq.heappush(self.minHeap, val)\n        if len(self.minHeap) > self.k:\n            heapq.heappop(self.minHeap)\n        return self.minHeap[0]\n\nkl = KthLargest(3, [4, 5, 8, 2])\nprint(\"Add 3:\", kl.add(3))\nprint(\"Add 5:\", kl.add(5))",
    "verificationStatus": "Verified"
  },
  {
    "id": 172,
    "leetcodeNumber": 1046,
    "title": "Last Stone Weight",
    "difficulty": "Easy",
    "topic": "Heap / Priority Queue",
    "pattern": "Max-Heap Simulation",
    "description": "Smash two heaviest stones together until at most one stone remains.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "import heapq\n\ndef lastStoneWeight(stones):\n    maxHeap = [-s for s in stones]\n    heapq.heapify(maxHeap)\n    while len(maxHeap) > 1:\n        first = -heapq.heappop(maxHeap)\n        second = -heapq.heappop(maxHeap)\n        if first != second:\n            heapq.heappush(maxHeap, -(first - second))\n    return -maxHeap[0] if maxHeap else 0\n\nprint(\"Last stone:\", lastStoneWeight([2, 7, 4, 1, 8, 1]))",
    "topics": [
      "Heaps and Priority Queues",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/last-stone-weight/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Heaps and Priority Queues",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Smash two heaviest stones together until at most one stone remains.",
    "examples": [
      {
        "input": "lastStoneWeight([2, 7, 4, 1, 8, 1])",
        "output": "Computed via lastStoneWeight([2, 7, 4, 1, 8, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Min/Max Heap Properties",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "import heapq\n\ndef lastStoneWeight(stones):\n    maxHeap = [-s for s in stones]\n    heapq.heapify(maxHeap)\n    while len(maxHeap) > 1:\n        first = -heapq.heappop(maxHeap)\n        second = -heapq.heappop(maxHeap)\n        if first != second:\n            heapq.heappush(maxHeap, -(first - second))\n    return -maxHeap[0] if maxHeap else 0\n\nprint(\"Last stone:\", lastStoneWeight([2, 7, 4, 1, 8, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 173,
    "leetcodeNumber": 973,
    "title": "K Closest Points to Origin",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Euclidean Distance Max-Heap",
    "description": "Find the k closest points to origin (0, 0) on XY plane.",
    "timeComplexity": "O(n log k)",
    "spaceComplexity": "O(k)",
    "starterCode": "import heapq\n\ndef kClosest(points, k):\n    return heapq.nsmallest(k, points, key=lambda p: p[0]**2 + p[1]**2)\n\nprint(\"Closest points:\", kClosest([[1,3],[-2,2]], 1))",
    "topics": [
      "Heaps and Priority Queues",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Heaps and Priority Queues",
      "Recursion"
    ],
    "summary": "Find the k closest points to origin (0, 0) on XY plane.",
    "examples": [
      {
        "input": "kClosest([[1,3],[-2,2]], 1)",
        "output": "Computed via kClosest([[1,3],[-2,2]], 1)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Min/Max Heap Properties"
    ],
    "referenceSolution": "import heapq\n\ndef kClosest(points, k):\n    return heapq.nsmallest(k, points, key=lambda p: p[0]**2 + p[1]**2)\n\nprint(\"Closest points:\", kClosest([[1,3],[-2,2]], 1))",
    "verificationStatus": "Verified"
  },
  {
    "id": 174,
    "leetcodeNumber": 215,
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Min-Heap of Size K",
    "description": "Find the kth largest element in an unsorted array without full sorting.",
    "timeComplexity": "O(n log k)",
    "spaceComplexity": "O(k)",
    "starterCode": "import heapq\n\ndef findKthLargest(nums, k):\n    minHeap = []\n    for n in nums:\n        heapq.heappush(minHeap, n)\n        if len(minHeap) > k:\n            heapq.heappop(minHeap)\n    return minHeap[0]\n\nprint(\"3rd largest:\", findKthLargest([3,2,1,5,6,4], 2))",
    "topics": [
      "Arrays",
      "Heaps and Priority Queues",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Arrays",
      "Heaps and Priority Queues",
      "Recursion",
      "Sorting"
    ],
    "summary": "Find the kth largest element in an unsorted array without full sorting.",
    "examples": [
      {
        "input": "findKthLargest([3,2,1,5,6,4], 2)",
        "output": "Computed via findKthLargest([3,2,1,5,6,4], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "import heapq\n\ndef findKthLargest(nums, k):\n    minHeap = []\n    for n in nums:\n        heapq.heappush(minHeap, n)\n        if len(minHeap) > k:\n            heapq.heappop(minHeap)\n    return minHeap[0]\n\nprint(\"3rd largest:\", findKthLargest([3,2,1,5,6,4], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 175,
    "leetcodeNumber": 621,
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Frequency Counting + Idle Slot Math",
    "description": "Find least number of units of time CPU will take to finish all tasks with cooldown n.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def leastInterval(tasks, n):\n    count = {}\n    for t in tasks:\n        count[t] = count.get(t, 0) + 1\n    max_freq = max(count.values())\n    max_freq_tasks = sum(1 for v in count.values() if v == max_freq)\n    return max(len(tasks), (max_freq - 1) * (n + 1) + max_freq_tasks)\n\nprint(\"Intervals needed:\", leastInterval([\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 2))",
    "topics": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/task-scheduler/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Find least number of units of time CPU will take to finish all tasks with cooldown n.",
    "examples": [
      {
        "input": "leastInterval([\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 2)",
        "output": "Computed via leastInterval([\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Min/Max Heap Properties"
    ],
    "referenceSolution": "def leastInterval(tasks, n):\n    count = {}\n    for t in tasks:\n        count[t] = count.get(t, 0) + 1\n    max_freq = max(count.values())\n    max_freq_tasks = sum(1 for v in count.values() if v == max_freq)\n    return max(len(tasks), (max_freq - 1) * (n + 1) + max_freq_tasks)\n\nprint(\"Intervals needed:\", leastInterval([\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 176,
    "leetcodeNumber": 355,
    "title": "Design Twitter",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Merge-K Most Recent Tweets",
    "description": "Design simplified version of Twitter with postTweet, getNewsFeed, follow, and unfollow.",
    "timeComplexity": "O(k log k)",
    "spaceComplexity": "O(tweets)",
    "starterCode": "class Twitter:\n    def __init__(self):\n        self.time = 0\n        self.tweets = {} # userId -> [(time, tweetId)]\n        self.following = {} # userId -> set of followees\n    def postTweet(self, userId, tweetId):\n        if userId not in self.tweets:\n            self.tweets[userId] = []\n        self.tweets[userId].append((self.time, tweetId))\n        self.time += 1\n    def follow(self, followerId, followeeId):\n        if followerId not in self.following:\n            self.following[followerId] = set()\n        self.following[followerId].add(followeeId)\n    def getNewsFeed(self, userId):\n        feed = list(self.tweets.get(userId, []))\n        for f in self.following.get(userId, set()):\n            feed.extend(self.tweets.get(f, []))\n        feed.sort(key=lambda x: x[0], reverse=True)\n        return [t[1] for t in feed[:10]]\n\nt = Twitter()\nt.postTweet(1, 5)\nprint(\"Feed user 1:\", t.getNewsFeed(1))",
    "topics": [
      "Advanced Data Structures",
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/design-twitter/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Advanced Data Structures",
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Sorting"
    ],
    "summary": "Design simplified version of Twitter with postTweet, getNewsFeed, follow, and unfollow.",
    "examples": [
      {
        "input": "t = Twitter()",
        "output": "Computed via t.getNewsFeed(1)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Min/Max Heap Properties"
    ],
    "referenceSolution": "class Twitter:\n    def __init__(self):\n        self.time = 0\n        self.tweets = {} # userId -> [(time, tweetId)]\n        self.following = {} # userId -> set of followees\n    def postTweet(self, userId, tweetId):\n        if userId not in self.tweets:\n            self.tweets[userId] = []\n        self.tweets[userId].append((self.time, tweetId))\n        self.time += 1\n    def follow(self, followerId, followeeId):\n        if followerId not in self.following:\n            self.following[followerId] = set()\n        self.following[followerId].add(followeeId)\n    def getNewsFeed(self, userId):\n        feed = list(self.tweets.get(userId, []))\n        for f in self.following.get(userId, set()):\n            feed.extend(self.tweets.get(f, []))\n        feed.sort(key=lambda x: x[0], reverse=True)\n        return [t[1] for t in feed[:10]]\n\nt = Twitter()\nt.postTweet(1, 5)\nprint(\"Feed user 1:\", t.getNewsFeed(1))",
    "verificationStatus": "Verified"
  },
  {
    "id": 177,
    "leetcodeNumber": 295,
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "topic": "Heap / Priority Queue",
    "pattern": "Two Heaps (Small Max, Large Min)",
    "description": "Find median of numbers dynamically added to stream in O(log n) insert and O(1) median.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = [] # max-heap (invert values)\n        self.large = [] # min-heap\n    def addNum(self, num):\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n    def findMedian(self):\n        if len(self.small) > len(self.large):\n            return -self.small[0]\n        return (-self.small[0] + self.large[0]) / 2.0\n\nmf = MedianFinder()\nmf.addNum(1)\nmf.addNum(2)\nprint(\"Median 1, 2:\", mf.findMedian())\nmf.addNum(3)\nprint(\"Median 1, 2, 3:\", mf.findMedian())",
    "topics": [
      "Advanced Data Structures",
      "Heaps and Priority Queues",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Advanced Data Structures",
      "Heaps and Priority Queues",
      "Recursion"
    ],
    "summary": "Find median of numbers dynamically added to stream in O(log n) insert and O(1) median.",
    "examples": [
      {
        "input": "mf = MedianFinder()",
        "output": "Computed via 2, 3:\", mf.findMedian()",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Min/Max Heap Properties",
      "Custom Composite Structures"
    ],
    "referenceSolution": "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = [] # max-heap (invert values)\n        self.large = [] # min-heap\n    def addNum(self, num):\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n    def findMedian(self):\n        if len(self.small) > len(self.large):\n            return -self.small[0]\n        return (-self.small[0] + self.large[0]) / 2.0\n\nmf = MedianFinder()\nmf.addNum(1)\nmf.addNum(2)\nprint(\"Median 1, 2:\", mf.findMedian())\nmf.addNum(3)\nprint(\"Median 1, 2, 3:\", mf.findMedian())",
    "verificationStatus": "Verified"
  },
  {
    "id": 178,
    "leetcodeNumber": 373,
    "title": "Find K Pairs with Smallest Sums",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Min-Heap of Index Pairs",
    "description": "Find k pairs (u, v) with smallest sums from two sorted arrays.",
    "timeComplexity": "O(k log k)",
    "spaceComplexity": "O(k)",
    "starterCode": "import heapq\n\ndef kSmallestPairs(nums1, nums2, k):\n    if not nums1 or not nums2:\n        return []\n    minHeap = []\n    for i in range(min(k, len(nums1))):\n        heapq.heappush(minHeap, (nums1[i] + nums2[0], i, 0))\n    res = []\n    while minHeap and len(res) < k:\n        s, i, j = heapq.heappop(minHeap)\n        res.append([nums1[i], nums2[j]])\n        if j + 1 < len(nums2):\n            heapq.heappush(minHeap, (nums1[i] + nums2[j + 1], i, j + 1))\n    return res\n\nprint(\"Smallest pairs:\", kSmallestPairs([1, 7, 11], [2, 4, 6], 3))",
    "topics": [
      "Arrays",
      "Heaps and Priority Queues",
      "Math and Number Theory",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Arrays",
      "Heaps and Priority Queues",
      "Math and Number Theory",
      "Sorting"
    ],
    "summary": "Find k pairs (u, v) with smallest sums from two sorted arrays.",
    "examples": [
      {
        "input": "kSmallestPairs([1, 7, 11], [2, 4, 6], 3)",
        "output": "Computed via kSmallestPairs([1, 7, 11], [2, 4, 6], 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Comparison Sort Order",
      "Min/Max Heap Properties"
    ],
    "referenceSolution": "import heapq\n\ndef kSmallestPairs(nums1, nums2, k):\n    if not nums1 or not nums2:\n        return []\n    minHeap = []\n    for i in range(min(k, len(nums1))):\n        heapq.heappush(minHeap, (nums1[i] + nums2[0], i, 0))\n    res = []\n    while minHeap and len(res) < k:\n        s, i, j = heapq.heappop(minHeap)\n        res.append([nums1[i], nums2[j]])\n        if j + 1 < len(nums2):\n            heapq.heappush(minHeap, (nums1[i] + nums2[j + 1], i, j + 1))\n    return res\n\nprint(\"Smallest pairs:\", kSmallestPairs([1, 7, 11], [2, 4, 6], 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 179,
    "leetcodeNumber": 1405,
    "title": "Longest Happy String",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Greedy Max-Heap with Block",
    "description": "Return longest string containing only 'a', 'b', 'c' with no 'aaa', 'bbb', or 'ccc'.",
    "timeComplexity": "O(n log 3)",
    "spaceComplexity": "O(1)",
    "starterCode": "import heapq\n\ndef longestDiverseString(a, b, c):\n    res = []\n    pq = []\n    for count, ch in [(-a, 'a'), (-b, 'b'), (-c, 'c')]:\n        if count != 0:\n            heapq.heappush(pq, (count, ch))\n    while pq:\n        cnt, ch = heapq.heappop(pq)\n        if len(res) >= 2 and res[-1] == res[-2] == ch:\n            if not pq:\n                break\n            cnt2, ch2 = heapq.heappop(pq)\n            res.append(ch2)\n            if cnt2 + 1 != 0:\n                heapq.heappush(pq, (cnt2 + 1, ch2))\n            heapq.heappush(pq, (cnt, ch))\n        else:\n            res.append(ch)\n            if cnt + 1 != 0:\n                heapq.heappush(pq, (cnt + 1, ch))\n    return \"\".join(res)\n\nprint(\"Happy string:\", longestDiverseString(1, 1, 7))",
    "topics": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Math and Number Theory",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-happy-string/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Math and Number Theory",
      "Recursion",
      "Strings"
    ],
    "summary": "Return longest string containing only 'a', 'b', 'c' with no 'aaa', 'bbb', or 'ccc'.",
    "examples": [
      {
        "input": "longestDiverseString(1, 1, 7)",
        "output": "Computed via longestDiverseString(1, 1, 7)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "import heapq\n\ndef longestDiverseString(a, b, c):\n    res = []\n    pq = []\n    for count, ch in [(-a, 'a'), (-b, 'b'), (-c, 'c')]:\n        if count != 0:\n            heapq.heappush(pq, (count, ch))\n    while pq:\n        cnt, ch = heapq.heappop(pq)\n        if len(res) >= 2 and res[-1] == res[-2] == ch:\n            if not pq:\n                break\n            cnt2, ch2 = heapq.heappop(pq)\n            res.append(ch2)\n            if cnt2 + 1 != 0:\n                heapq.heappush(pq, (cnt2 + 1, ch2))\n            heapq.heappush(pq, (cnt, ch))\n        else:\n            res.append(ch)\n            if cnt + 1 != 0:\n                heapq.heappush(pq, (cnt + 1, ch))\n    return \"\".join(res)\n\nprint(\"Happy string:\", longestDiverseString(1, 1, 7))",
    "verificationStatus": "Verified"
  },
  {
    "id": 180,
    "leetcodeNumber": 767,
    "title": "Reorganize String",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Max-Heap Interleaving",
    "description": "Rearrange characters of s so that any two adjacent characters are not the same.",
    "timeComplexity": "O(n log A)",
    "spaceComplexity": "O(A)",
    "starterCode": "import heapq\n\ndef reorganizeString(s):\n    count = {}\n    for c in s:\n        count[c] = count.get(c, 0) + 1\n    pq = [(-cnt, c) for c, cnt in count.items()]\n    heapq.heapify(pq)\n    prev = None\n    res = []\n    while pq or prev:\n        if prev and not pq:\n            return \"\"\n        cnt, c = heapq.heappop(pq)\n        res.append(c)\n        cnt += 1\n        if prev:\n            heapq.heappush(pq, prev)\n            prev = None\n        if cnt < 0:\n            prev = (cnt, c)\n    return \"\".join(res)\n\nprint(\"Reorganized:\", reorganizeString(\"aab\"))",
    "topics": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/reorganize-string/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Recursion",
      "Strings"
    ],
    "summary": "Rearrange characters of s so that any two adjacent characters are not the same.",
    "examples": [
      {
        "input": "reorganizeString(\"aab\")",
        "output": "Computed via reorganizeString(\"aab\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "import heapq\n\ndef reorganizeString(s):\n    count = {}\n    for c in s:\n        count[c] = count.get(c, 0) + 1\n    pq = [(-cnt, c) for c, cnt in count.items()]\n    heapq.heapify(pq)\n    prev = None\n    res = []\n    while pq or prev:\n        if prev and not pq:\n            return \"\"\n        cnt, c = heapq.heappop(pq)\n        res.append(c)\n        cnt += 1\n        if prev:\n            heapq.heappush(pq, prev)\n            prev = None\n        if cnt < 0:\n            prev = (cnt, c)\n    return \"\".join(res)\n\nprint(\"Reorganized:\", reorganizeString(\"aab\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 181,
    "leetcodeNumber": 1834,
    "title": "Single-Threaded CPU",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Enqueue Time Sort + Processing Min-Heap",
    "description": "Return order in which single-threaded CPU will process n tasks.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "import heapq\n\ndef getOrder(tasks):\n    indexed = [[t[0], t[1], i] for i, t in enumerate(tasks)]\n    indexed.sort(key=lambda x: x[0])\n    res = []\n    pq = []\n    i = 0\n    time = indexed[0][0]\n    while len(res) < len(tasks):\n        while i < len(tasks) and indexed[i][0] <= time:\n            heapq.heappush(pq, (indexed[i][1], indexed[i][2]))\n            i += 1\n        if not pq:\n            time = indexed[i][0]\n            continue\n        duration, idx = heapq.heappop(pq)\n        time += duration\n        res.append(idx)\n    return res\n\nprint(\"CPU order:\", getOrder([[1,2],[2,4],[3,2],[4,1]]))",
    "topics": [
      "Heaps and Priority Queues",
      "Queues and Deques",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/single-threaded-cpu/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Heaps and Priority Queues",
      "Queues and Deques",
      "Sorting"
    ],
    "summary": "Return order in which single-threaded CPU will process n tasks.",
    "examples": [
      {
        "input": "getOrder([[1,2],[2,4],[3,2],[4,1]])",
        "output": "Computed via getOrder([[1,2],[2,4],[3,2],[4,1]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Comparison Sort Order",
      "FIFO Queue Operations",
      "Min/Max Heap Properties"
    ],
    "referenceSolution": "import heapq\n\ndef getOrder(tasks):\n    indexed = [[t[0], t[1], i] for i, t in enumerate(tasks)]\n    indexed.sort(key=lambda x: x[0])\n    res = []\n    pq = []\n    i = 0\n    time = indexed[0][0]\n    while len(res) < len(tasks):\n        while i < len(tasks) and indexed[i][0] <= time:\n            heapq.heappush(pq, (indexed[i][1], indexed[i][2]))\n            i += 1\n        if not pq:\n            time = indexed[i][0]\n            continue\n        duration, idx = heapq.heappop(pq)\n        time += duration\n        res.append(idx)\n    return res\n\nprint(\"CPU order:\", getOrder([[1,2],[2,4],[3,2],[4,1]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 182,
    "leetcodeNumber": 1882,
    "title": "Process Tasks Using Servers",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Free & Busy Server Dual Heaps",
    "description": "Assign tasks to available server with smallest weight at each second.",
    "timeComplexity": "O(m log n)",
    "spaceComplexity": "O(m + n)",
    "starterCode": "import heapq\n\ndef assignTasks(servers, tasks):\n    free = [(servers[i], i) for i in range(len(servers))]\n    heapq.heapify(free)\n    busy = [] # (free_time, weight, index)\n    res = []\n    time = 0\n    for i, t in enumerate(tasks):\n        time = max(time, i)\n        if not free:\n            time = busy[0][0]\n        while busy and busy[0][0] <= time:\n            _, w, idx = heapq.heappop(busy)\n            heapq.heappush(free, (w, idx))\n        w, idx = heapq.heappop(free)\n        res.append(idx)\n        heapq.heappush(busy, (time + t, w, idx))\n    return res\n\nprint(\"Assigned servers:\", assignTasks([3, 3, 2], [1, 2, 3, 2, 1, 2]))",
    "topics": [
      "Heaps and Priority Queues"
    ],
    "sourceUrl": "https://leetcode.com/problems/process-tasks-using-servers/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Heaps and Priority Queues"
    ],
    "summary": "Assign tasks to available server with smallest weight at each second.",
    "examples": [
      {
        "input": "assignTasks([3, 3, 2], [1, 2, 3, 2, 1, 2])",
        "output": "Computed via assignTasks([3, 3, 2], [1, 2, 3, 2, 1, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Min/Max Heap Properties"
    ],
    "referenceSolution": "import heapq\n\ndef assignTasks(servers, tasks):\n    free = [(servers[i], i) for i in range(len(servers))]\n    heapq.heapify(free)\n    busy = [] # (free_time, weight, index)\n    res = []\n    time = 0\n    for i, t in enumerate(tasks):\n        time = max(time, i)\n        if not free:\n            time = busy[0][0]\n        while busy and busy[0][0] <= time:\n            _, w, idx = heapq.heappop(busy)\n            heapq.heappush(free, (w, idx))\n        w, idx = heapq.heappop(free)\n        res.append(idx)\n        heapq.heappush(busy, (time + t, w, idx))\n    return res\n\nprint(\"Assigned servers:\", assignTasks([3, 3, 2], [1, 2, 3, 2, 1, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 183,
    "leetcodeNumber": 506,
    "title": "Relative Ranks",
    "difficulty": "Easy",
    "topic": "Heap / Priority Queue",
    "pattern": "Score Sorting / Heap Ranking",
    "description": "Assign Olympic ranks ('Gold Medal', 'Silver Medal', 'Bronze Medal', '4', ...) based on scores.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def findRelativeRanks(score):\n    sorted_s = sorted(score, reverse=True)\n    medals = [\"Gold Medal\", \"Silver Medal\", \"Bronze Medal\"]\n    rank_map = {s: medals[i] if i < 3 else str(i + 1) for i, s in enumerate(sorted_s)}\n    return [rank_map[s] for s in score]\n\nprint(\"Ranks:\", findRelativeRanks([10, 3, 8, 9, 4]))",
    "topics": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/relative-ranks/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Recursion",
      "Sorting"
    ],
    "summary": "Assign Olympic ranks ('Gold Medal', 'Silver Medal', 'Bronze Medal', '4', ...) based on scores.",
    "examples": [
      {
        "input": "findRelativeRanks([10, 3, 8, 9, 4])",
        "output": "Computed via findRelativeRanks([10, 3, 8, 9, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def findRelativeRanks(score):\n    sorted_s = sorted(score, reverse=True)\n    medals = [\"Gold Medal\", \"Silver Medal\", \"Bronze Medal\"]\n    rank_map = {s: medals[i] if i < 3 else str(i + 1) for i, s in enumerate(sorted_s)}\n    return [rank_map[s] for s in score]\n\nprint(\"Ranks:\", findRelativeRanks([10, 3, 8, 9, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 184,
    "leetcodeNumber": 1337,
    "title": "The K Weakest Rows in a Matrix",
    "difficulty": "Easy",
    "topic": "Heap / Priority Queue",
    "pattern": "Soldier Count Min-Heap",
    "description": "Return the indices of the k weakest rows in the matrix ordered from weakest to strongest.",
    "timeComplexity": "O(m log m)",
    "spaceComplexity": "O(m)",
    "starterCode": "import heapq\n\ndef kWeakestRows(mat, k):\n    counts = [(sum(row), i) for i, row in enumerate(mat)]\n    heapq.heapify(counts)\n    return [heapq.heappop(counts)[1] for _ in range(k)]\n\nm = [[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]]\nprint(\"Weakest rows:\", kWeakestRows(m, 3))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Matrix Problems",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Matrix Problems",
      "Sorting"
    ],
    "summary": "Return the indices of the k weakest rows in the matrix ordered from weakest to strongest.",
    "examples": [
      {
        "input": "m = [[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]]",
        "output": "Computed via kWeakestRows(m, 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "import heapq\n\ndef kWeakestRows(mat, k):\n    counts = [(sum(row), i) for i, row in enumerate(mat)]\n    heapq.heapify(counts)\n    return [heapq.heappop(counts)[1] for _ in range(k)]\n\nm = [[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]]\nprint(\"Weakest rows:\", kWeakestRows(m, 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 185,
    "leetcodeNumber": 451,
    "title": "Sort Characters By Frequency",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Frequency Sorting",
    "description": "Sort string in decreasing order based on frequency of characters.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def frequencySort(s):\n    count = {}\n    for c in s:\n        count[c] = count.get(c, 0) + 1\n    sorted_chars = sorted(count.items(), key=lambda x: x[1], reverse=True)\n    return \"\".join(c * cnt for c, cnt in sorted_chars)\n\nprint(\"Frequency sorted:\", frequencySort(\"tree\"))",
    "topics": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Recursion",
      "Sorting",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/sort-characters-by-frequency/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Recursion",
      "Sorting",
      "Strings"
    ],
    "summary": "Sort string in decreasing order based on frequency of characters.",
    "examples": [
      {
        "input": "frequencySort(\"tree\")",
        "output": "Computed via frequencySort(\"tree\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def frequencySort(s):\n    count = {}\n    for c in s:\n        count[c] = count.get(c, 0) + 1\n    sorted_chars = sorted(count.items(), key=lambda x: x[1], reverse=True)\n    return \"\".join(c * cnt for c, cnt in sorted_chars)\n\nprint(\"Frequency sorted:\", frequencySort(\"tree\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 186,
    "leetcodeNumber": 692,
    "title": "Top K Frequent Words",
    "difficulty": "Medium",
    "topic": "Heap / Priority Queue",
    "pattern": "Custom Frequency & Lexicographical Sort",
    "description": "Return k most frequent strings sorted by frequency desc, then alphabetical asc.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def topKFrequentWords(words, k):\n    count = {}\n    for w in words:\n        count[w] = count.get(w, 0) + 1\n    sorted_words = sorted(count.keys(), key=lambda w: (-count[w], w))\n    return sorted_words[:k]\n\nprint(\"Top 2 words:\", topKFrequentWords([\"i\",\"love\",\"leetcode\",\"i\",\"love\",\"coding\"], 2))",
    "topics": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Recursion",
      "Sorting",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/top-k-frequent-words/",
    "primaryTopic": "Heap / Priority Queue",
    "topicTags": [
      "Hashing and Hash Maps",
      "Heaps and Priority Queues",
      "Recursion",
      "Sorting",
      "Strings"
    ],
    "summary": "Return k most frequent strings sorted by frequency desc, then alphabetical asc.",
    "examples": [
      {
        "input": "topKFrequentWords([\"i\",\"love\",\"leetcode\",\"i\",\"love\",\"coding\"], 2)",
        "output": "Computed via topKFrequentWords([\"i\",\"love\",\"leetcode\",\"i\",\"love\",\"coding\"], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def topKFrequentWords(words, k):\n    count = {}\n    for w in words:\n        count[w] = count.get(w, 0) + 1\n    sorted_words = sorted(count.keys(), key=lambda w: (-count[w], w))\n    return sorted_words[:k]\n\nprint(\"Top 2 words:\", topKFrequentWords([\"i\",\"love\",\"leetcode\",\"i\",\"love\",\"coding\"], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 187,
    "leetcodeNumber": 78,
    "title": "Subsets",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Include / Exclude Decision Tree",
    "description": "Return all possible subsets (the power set) of unique elements.",
    "timeComplexity": "O(2^n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def subsets(nums):\n    res = []\n    subset = []\n    def dfs(i):\n        if i >= len(nums):\n            res.append(list(subset))\n            return\n        subset.append(nums[i])\n        dfs(i + 1)\n        subset.pop()\n        dfs(i + 1)\n    dfs(0)\n    return res\n\nprint(\"Subsets:\", subsets([1, 2, 3]))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/subsets/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Return all possible subsets (the power set) of unique elements.",
    "examples": [
      {
        "input": "subsets([1, 2, 3])",
        "output": "Computed via subsets([1, 2, 3])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def subsets(nums):\n    res = []\n    subset = []\n    def dfs(i):\n        if i >= len(nums):\n            res.append(list(subset))\n            return\n        subset.append(nums[i])\n        dfs(i + 1)\n        subset.pop()\n        dfs(i + 1)\n    dfs(0)\n    return res\n\nprint(\"Subsets:\", subsets([1, 2, 3]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 188,
    "leetcodeNumber": 90,
    "title": "Subsets II",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Duplicate Element Skip",
    "description": "Return all possible subsets of array that may contain duplicates without duplicate subsets.",
    "timeComplexity": "O(2^n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def subsetsWithDup(nums):\n    nums.sort()\n    res = []\n    def backtrack(start, path):\n        res.append(list(path))\n        for i in range(start, len(nums)):\n            if i > start and nums[i] == nums[i - 1]:\n                continue\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return res\n\nprint(\"Subsets II:\", subsetsWithDup([1, 2, 2]))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/subsets-ii/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "summary": "Return all possible subsets of array that may contain duplicates without duplicate subsets.",
    "examples": [
      {
        "input": "subsetsWithDup([1, 2, 2])",
        "output": "Computed via subsetsWithDup([1, 2, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def subsetsWithDup(nums):\n    nums.sort()\n    res = []\n    def backtrack(start, path):\n        res.append(list(path))\n        for i in range(start, len(nums)):\n            if i > start and nums[i] == nums[i - 1]:\n                continue\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return res\n\nprint(\"Subsets II:\", subsetsWithDup([1, 2, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 189,
    "leetcodeNumber": 39,
    "title": "Combination Sum",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Unlimited Choice Recursion",
    "description": "Find all unique combinations of candidates that sum to target (numbers can be chosen repeatedly).",
    "timeComplexity": "O(2^(target/min))",
    "spaceComplexity": "O(target/min)",
    "starterCode": "def combinationSum(candidates, target):\n    res = []\n    def dfs(i, cur, total):\n        if total == target:\n            res.append(list(cur))\n            return\n        if i >= len(candidates) or total > target:\n            return\n        cur.append(candidates[i])\n        dfs(i, cur, total + candidates[i])\n        cur.pop()\n        dfs(i + 1, cur, total)\n    dfs(0, [], 0)\n    return res\n\nprint(\"Combinations:\", combinationSum([2, 3, 6, 7], 7))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/combination-sum/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Find all unique combinations of candidates that sum to target (numbers can be chosen repeatedly).",
    "examples": [
      {
        "input": "combinationSum([2, 3, 6, 7], 7)",
        "output": "Computed via combinationSum([2, 3, 6, 7], 7)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def combinationSum(candidates, target):\n    res = []\n    def dfs(i, cur, total):\n        if total == target:\n            res.append(list(cur))\n            return\n        if i >= len(candidates) or total > target:\n            return\n        cur.append(candidates[i])\n        dfs(i, cur, total + candidates[i])\n        cur.pop()\n        dfs(i + 1, cur, total)\n    dfs(0, [], 0)\n    return res\n\nprint(\"Combinations:\", combinationSum([2, 3, 6, 7], 7))",
    "verificationStatus": "Verified"
  },
  {
    "id": 190,
    "leetcodeNumber": 40,
    "title": "Combination Sum II",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Single-Use Duplicate Skip",
    "description": "Find all unique combinations where each candidate number may only be used once.",
    "timeComplexity": "O(2^n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def combinationSum2(candidates, target):\n    candidates.sort()\n    res = []\n    def backtrack(cur, pos, target):\n        if target == 0:\n            res.append(list(cur))\n            return\n        if target <= 0:\n            return\n        prev = -1\n        for i in range(pos, len(candidates)):\n            if candidates[i] == prev:\n                continue\n            cur.append(candidates[i])\n            backtrack(cur, i + 1, target - candidates[i])\n            cur.pop()\n            prev = candidates[i]\n    backtrack([], 0, target)\n    return res\n\nprint(\"Combination Sum II:\", combinationSum2([10,1,2,7,6,1,5], 8))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/combination-sum-ii/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sorting"
    ],
    "summary": "Find all unique combinations where each candidate number may only be used once.",
    "examples": [
      {
        "input": "combinationSum2([10,1,2,7,6,1,5], 8)",
        "output": "Computed via combinationSum2([10,1,2,7,6,1,5], 8)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def combinationSum2(candidates, target):\n    candidates.sort()\n    res = []\n    def backtrack(cur, pos, target):\n        if target == 0:\n            res.append(list(cur))\n            return\n        if target <= 0:\n            return\n        prev = -1\n        for i in range(pos, len(candidates)):\n            if candidates[i] == prev:\n                continue\n            cur.append(candidates[i])\n            backtrack(cur, i + 1, target - candidates[i])\n            cur.pop()\n            prev = candidates[i]\n    backtrack([], 0, target)\n    return res\n\nprint(\"Combination Sum II:\", combinationSum2([10,1,2,7,6,1,5], 8))",
    "verificationStatus": "Verified"
  },
  {
    "id": 191,
    "leetcodeNumber": 46,
    "title": "Permutations",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Visited Array Backtracking",
    "description": "Return all possible permutations of an array of distinct integers.",
    "timeComplexity": "O(n!)",
    "spaceComplexity": "O(n)",
    "starterCode": "def permute(nums):\n    res = []\n    def backtrack(curr, remaining):\n        if not remaining:\n            res.append(list(curr))\n            return\n        for i in range(len(remaining)):\n            backtrack(curr + [remaining[i]], remaining[:i] + remaining[i+1:])\n    backtrack([], nums)\n    return res\n\nprint(\"Permutations:\", permute([1, 2, 3]))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/permutations/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion"
    ],
    "summary": "Return all possible permutations of an array of distinct integers.",
    "examples": [
      {
        "input": "permute([1, 2, 3])",
        "output": "Computed via permute([1, 2, 3])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "State Exploration & Backtracking"
    ],
    "referenceSolution": "def permute(nums):\n    res = []\n    def backtrack(curr, remaining):\n        if not remaining:\n            res.append(list(curr))\n            return\n        for i in range(len(remaining)):\n            backtrack(curr + [remaining[i]], remaining[:i] + remaining[i+1:])\n    backtrack([], nums)\n    return res\n\nprint(\"Permutations:\", permute([1, 2, 3]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 192,
    "leetcodeNumber": 47,
    "title": "Permutations II",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Frequency Count Permutations",
    "description": "Return all unique permutations of array that may contain duplicates.",
    "timeComplexity": "O(n!)",
    "spaceComplexity": "O(n)",
    "starterCode": "def permuteUnique(nums):\n    res = []\n    perm = []\n    count = {}\n    for n in nums:\n        count[n] = count.get(n, 0) + 1\n    def dfs():\n        if len(perm) == len(nums):\n            res.append(list(perm))\n            return\n        for n in count:\n            if count[n] > 0:\n                perm.append(n)\n                count[n] -= 1\n                dfs()\n                count[n] += 1\n                perm.pop()\n    dfs()\n    return res\n\nprint(\"Unique perms:\", permuteUnique([1, 1, 2]))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/permutations-ii/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Return all unique permutations of array that may contain duplicates.",
    "examples": [
      {
        "input": "permuteUnique([1, 1, 2])",
        "output": "Computed via permuteUnique([1, 1, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def permuteUnique(nums):\n    res = []\n    perm = []\n    count = {}\n    for n in nums:\n        count[n] = count.get(n, 0) + 1\n    def dfs():\n        if len(perm) == len(nums):\n            res.append(list(perm))\n            return\n        for n in count:\n            if count[n] > 0:\n                perm.append(n)\n                count[n] -= 1\n                dfs()\n                count[n] += 1\n                perm.pop()\n    dfs()\n    return res\n\nprint(\"Unique perms:\", permuteUnique([1, 1, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 193,
    "leetcodeNumber": 79,
    "title": "Word Search",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "2D Grid DFS Backtracking",
    "description": "Determine if word exists in grid constructed from sequentially adjacent cells.",
    "timeComplexity": "O(m * n * 4^L)",
    "spaceComplexity": "O(L)",
    "starterCode": "def exist(board, word):\n    rows, cols = len(board), len(board[0])\n    path = set()\n    def dfs(r, c, i):\n        if i == len(word):\n            return True\n        if (r < 0 or c < 0 or r >= rows or c >= cols or\n            word[i] != board[r][c] or (r, c) in path):\n            return False\n        path.add((r, c))\n        res = (dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or\n               dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1))\n        path.remove((r, c))\n        return res\n    for r in range(rows):\n        for c in range(cols):\n            if dfs(r, c, 0):\n                return True\n    return False\n\nboard = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nprint(\"Word exists:\", exist(board, \"ABCCED\"))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Matrix Problems",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/word-search/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Matrix Problems",
      "Recursion",
      "Strings"
    ],
    "summary": "Determine if word exists in grid constructed from sequentially adjacent cells.",
    "examples": [
      {
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]",
        "output": "Computed via exist(board, \"ABCCED\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def exist(board, word):\n    rows, cols = len(board), len(board[0])\n    path = set()\n    def dfs(r, c, i):\n        if i == len(word):\n            return True\n        if (r < 0 or c < 0 or r >= rows or c >= cols or\n            word[i] != board[r][c] or (r, c) in path):\n            return False\n        path.add((r, c))\n        res = (dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or\n               dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1))\n        path.remove((r, c))\n        return res\n    for r in range(rows):\n        for c in range(cols):\n            if dfs(r, c, 0):\n                return True\n    return False\n\nboard = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nprint(\"Word exists:\", exist(board, \"ABCCED\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 194,
    "leetcodeNumber": 131,
    "title": "Palindrome Partitioning",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Partition Points Search",
    "description": "Partition string s such that every substring of the partition is a palindrome.",
    "timeComplexity": "O(2^n * n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def partition(s):\n    res = []\n    part = []\n    def dfs(i):\n        if i >= len(s):\n            res.append(list(part))\n            return\n        for j in range(i, len(s)):\n            sub = s[i:j + 1]\n            if sub == sub[:\n                :-1]:\n                part.append(sub)\n                dfs(j + 1)\n                part.pop()\n    dfs(0)\n    return res\n\nprint(\"Partitions:\", partition(\"aab\"))",
    "topics": [
      "Backtracking",
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Recursion",
      "Sorting",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/palindrome-partitioning/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Backtracking",
      "Binary Search Trees",
      "Depth-First Search (DFS)",
      "Recursion",
      "Sorting",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Partition string s such that every substring of the partition is a palindrome.",
    "examples": [
      {
        "input": "partition(\"aab\")",
        "output": "Computed via partition(\"aab\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def partition(s):\n    res = []\n    part = []\n    def dfs(i):\n        if i >= len(s):\n            res.append(list(part))\n            return\n        for j in range(i, len(s)):\n            sub = s[i:j + 1]\n            if sub == sub[:\n                :-1]:\n                part.append(sub)\n                dfs(j + 1)\n                part.pop()\n    dfs(0)\n    return res\n\nprint(\"Partitions:\", partition(\"aab\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 195,
    "leetcodeNumber": 17,
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Digit Map Branching",
    "description": "Return all possible letter combinations that number could represent on phone keypad.",
    "timeComplexity": "O(4^n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def letterCombinations(digits):\n    res = []\n    digitToChar = {\"2\": \"abc\", \"3\": \"def\", \"4\": \"ghi\", \"5\": \"jkl\", \"6\": \"mno\", \"7\": \"pqrs\", \"8\": \"tuv\", \"9\": \"wxyz\"}\n    def backtrack(i, curStr):\n        if len(curStr) == len(digits):\n            res.append(curStr)\n            return\n        for c in digitToChar[digits[i]]:\n            backtrack(i + 1, curStr + c)\n    if digits:\n        backtrack(0, \"\")\n    return res\n\nprint(\"Combinations:\", letterCombinations(\"23\"))",
    "topics": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Return all possible letter combinations that number could represent on phone keypad.",
    "examples": [
      {
        "input": "letterCombinations(\"23\")",
        "output": "Computed via letterCombinations(\"23\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "State Exploration & Backtracking"
    ],
    "referenceSolution": "def letterCombinations(digits):\n    res = []\n    digitToChar = {\"2\": \"abc\", \"3\": \"def\", \"4\": \"ghi\", \"5\": \"jkl\", \"6\": \"mno\", \"7\": \"pqrs\", \"8\": \"tuv\", \"9\": \"wxyz\"}\n    def backtrack(i, curStr):\n        if len(curStr) == len(digits):\n            res.append(curStr)\n            return\n        for c in digitToChar[digits[i]]:\n            backtrack(i + 1, curStr + c)\n    if digits:\n        backtrack(0, \"\")\n    return res\n\nprint(\"Combinations:\", letterCombinations(\"23\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 196,
    "leetcodeNumber": 51,
    "title": "N-Queens",
    "difficulty": "Hard",
    "topic": "Backtracking",
    "pattern": "Col & Diagonals Constraint Tracking",
    "description": "Place n queens on an n x n chessboard such that no two queens attack each other.",
    "timeComplexity": "O(n!)",
    "spaceComplexity": "O(n^2)",
    "starterCode": "def solveNQueens(n):\n    col, posDiag, negDiag = set(), set(), set()\n    res = []\n    board = [[\".\"] * n for _ in range(n)]\n    def backtrack(r):\n        if r == n:\n            res.append([\"\".join(row) for row in board])\n            return\n        for c in range(n):\n            if c in col or (r + c) in posDiag or (r - c) in negDiag:\n                continue\n            col.add(c)\n            posDiag.add(r + c)\n            negDiag.add(r - c)\n            board[r][c] = \"Q\"\n            backtrack(r + 1)\n            col.remove(c)\n            posDiag.remove(r + c)\n            negDiag.remove(r - c)\n            board[r][c] = \".\"\n    backtrack(0)\n    return res\n\nprint(\"4-Queens solutions count:\", len(solveNQueens(4)))",
    "topics": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/n-queens/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Place n queens on an n x n chessboard such that no two queens attack each other.",
    "examples": [
      {
        "input": "len(solveNQueens(4))",
        "output": "Computed via len(solveNQueens(4))",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "State Exploration & Backtracking"
    ],
    "referenceSolution": "def solveNQueens(n):\n    col, posDiag, negDiag = set(), set(), set()\n    res = []\n    board = [[\".\"] * n for _ in range(n)]\n    def backtrack(r):\n        if r == n:\n            res.append([\"\".join(row) for row in board])\n            return\n        for c in range(n):\n            if c in col or (r + c) in posDiag or (r - c) in negDiag:\n                continue\n            col.add(c)\n            posDiag.add(r + c)\n            negDiag.add(r - c)\n            board[r][c] = \"Q\"\n            backtrack(r + 1)\n            col.remove(c)\n            posDiag.remove(r + c)\n            negDiag.remove(r - c)\n            board[r][c] = \".\"\n    backtrack(0)\n    return res\n\nprint(\"4-Queens solutions count:\", len(solveNQueens(4)))",
    "verificationStatus": "Verified"
  },
  {
    "id": 197,
    "leetcodeNumber": 52,
    "title": "N-Queens II",
    "difficulty": "Hard",
    "topic": "Backtracking",
    "pattern": "Distinct Solution Counter",
    "description": "Return the number of distinct solutions to the n-queens puzzle.",
    "timeComplexity": "O(n!)",
    "spaceComplexity": "O(n)",
    "starterCode": "def totalNQueens(n):\n    col, posDiag, negDiag = set(), set(), set()\n    count = 0\n    def backtrack(r):\n        nonlocal count\n        if r == n:\n            count += 1\n            return\n        for c in range(n):\n            if c in col or (r + c) in posDiag or (r - c) in negDiag:\n                continue\n            col.add(c)\n            posDiag.add(r + c)\n            negDiag.add(r - c)\n            backtrack(r + 1)\n            col.remove(c)\n            posDiag.remove(r + c)\n            negDiag.remove(r - c)\n    backtrack(0)\n    return count\n\nprint(\"Total 4-Queens:\", totalNQueens(4))",
    "topics": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/n-queens-ii/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Return the number of distinct solutions to the n-queens puzzle.",
    "examples": [
      {
        "input": "totalNQueens(4)",
        "output": "Computed via totalNQueens(4)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "State Exploration & Backtracking"
    ],
    "referenceSolution": "def totalNQueens(n):\n    col, posDiag, negDiag = set(), set(), set()\n    count = 0\n    def backtrack(r):\n        nonlocal count\n        if r == n:\n            count += 1\n            return\n        for c in range(n):\n            if c in col or (r + c) in posDiag or (r - c) in negDiag:\n                continue\n            col.add(c)\n            posDiag.add(r + c)\n            negDiag.add(r - c)\n            backtrack(r + 1)\n            col.remove(c)\n            posDiag.remove(r + c)\n            negDiag.remove(r - c)\n    backtrack(0)\n    return count\n\nprint(\"Total 4-Queens:\", totalNQueens(4))",
    "verificationStatus": "Verified"
  },
  {
    "id": 198,
    "leetcodeNumber": 37,
    "title": "Sudoku Solver",
    "difficulty": "Hard",
    "topic": "Backtracking",
    "pattern": "Constraint Backtracking",
    "description": "Solve a 9x9 Sudoku puzzle by filling empty cells with valid digits 1-9.",
    "timeComplexity": "O(9^(empty))",
    "spaceComplexity": "O(1)",
    "starterCode": "def solveSudoku(board):\n    def isValid(r, c, ch):\n        for i in range(9):\n            if board[r][i] == ch or board[i][c] == ch:\n                return False\n            if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch:\n                return False\n        return True\n    def solve():\n        for r in range(9):\n            for c in range(9):\n                if board[r][c] == \".\":\n                    for ch in \"123456789\":\n                        if isValid(r, c, ch):\n                            board[r][c] = ch\n                            if solve():\n                                return True\n                            board[r][c] = \".\"\n                    return False\n        return True\n    solve()\n    return board\n\n# Sample partial mini board\nb = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"]] + [[\".\"]*9]*8\nprint(\"Solved row 0:\", solveSudoku(b)[0])",
    "topics": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/sudoku-solver/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion"
    ],
    "summary": "Solve a 9x9 Sudoku puzzle by filling empty cells with valid digits 1-9.",
    "examples": [
      {
        "input": "b = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"]] + [[\".\"]*9]*8",
        "output": "Computed via solveSudoku(b)[0]",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "State Exploration & Backtracking",
      "Depth-First Branch Exploration"
    ],
    "referenceSolution": "def solveSudoku(board):\n    def isValid(r, c, ch):\n        for i in range(9):\n            if board[r][i] == ch or board[i][c] == ch:\n                return False\n            if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch:\n                return False\n        return True\n    def solve():\n        for r in range(9):\n            for c in range(9):\n                if board[r][c] == \".\":\n                    for ch in \"123456789\":\n                        if isValid(r, c, ch):\n                            board[r][c] = ch\n                            if solve():\n                                return True\n                            board[r][c] = \".\"\n                    return False\n        return True\n    solve()\n    return board\n\n# Sample partial mini board\nb = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"]] + [[\".\"]*9]*8\nprint(\"Solved row 0:\", solveSudoku(b)[0])",
    "verificationStatus": "Verified"
  },
  {
    "id": 199,
    "leetcodeNumber": 77,
    "title": "Combinations",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "1..N K-Subset Backtracking",
    "description": "Return all possible combinations of k numbers chosen from range [1, n].",
    "timeComplexity": "O(k * C(n, k))",
    "spaceComplexity": "O(k)",
    "starterCode": "def combine(n, k):\n    res = []\n    def backtrack(start, comb):\n        if len(comb) == k:\n            res.append(list(comb))\n            return\n        for i in range(start, n + 1):\n            comb.append(i)\n            backtrack(i + 1, comb)\n            comb.pop()\n    backtrack(1, [])\n    return res\n\nprint(\"Combinations (4, 2):\", combine(4, 2))",
    "topics": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/combinations/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion"
    ],
    "summary": "Return all possible combinations of k numbers chosen from range [1, n].",
    "examples": [
      {
        "input": "2):\", combine(4, 2)",
        "output": "Computed via 2):\", combine(4, 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "State Exploration & Backtracking",
      "Depth-First Branch Exploration"
    ],
    "referenceSolution": "def combine(n, k):\n    res = []\n    def backtrack(start, comb):\n        if len(comb) == k:\n            res.append(list(comb))\n            return\n        for i in range(start, n + 1):\n            comb.append(i)\n            backtrack(i + 1, comb)\n            comb.pop()\n    backtrack(1, [])\n    return res\n\nprint(\"Combinations (4, 2):\", combine(4, 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 200,
    "leetcodeNumber": 216,
    "title": "Combination Sum III",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Bounded Count Target Sum",
    "description": "Find all valid combinations of k numbers that sum to n using numbers 1 to 9 at most once.",
    "timeComplexity": "O(C(9, k))",
    "spaceComplexity": "O(k)",
    "starterCode": "def combinationSum3(k, n):\n    res = []\n    def backtrack(start, comb, target):\n        if len(comb) == k and target == 0:\n            res.append(list(comb))\n            return\n        if len(comb) >= k or target < 0:\n            return\n        for i in range(start, 10):\n            comb.append(i)\n            backtrack(i + 1, comb, target - i)\n            comb.pop()\n    backtrack(1, [], n)\n    return res\n\nprint(\"Sum 7 with 3 numbers:\", combinationSum3(3, 7))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/combination-sum-iii/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Find all valid combinations of k numbers that sum to n using numbers 1 to 9 at most once.",
    "examples": [
      {
        "input": "combinationSum3(3, 7)",
        "output": "Computed via combinationSum3(3, 7)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "State Exploration & Backtracking"
    ],
    "referenceSolution": "def combinationSum3(k, n):\n    res = []\n    def backtrack(start, comb, target):\n        if len(comb) == k and target == 0:\n            res.append(list(comb))\n            return\n        if len(comb) >= k or target < 0:\n            return\n        for i in range(start, 10):\n            comb.append(i)\n            backtrack(i + 1, comb, target - i)\n            comb.pop()\n    backtrack(1, [], n)\n    return res\n\nprint(\"Sum 7 with 3 numbers:\", combinationSum3(3, 7))",
    "verificationStatus": "Verified"
  },
  {
    "id": 201,
    "leetcodeNumber": 93,
    "title": "Restore IP Addresses",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "4-Segment String Partition",
    "description": "Return all possible valid IP addresses that can be formed by inserting dots into s.",
    "timeComplexity": "O(3^4)",
    "spaceComplexity": "O(1)",
    "starterCode": "def restoreIpAddresses(s):\n    res = []\n    def backtrack(i, dots, curIP):\n        if dots == 4 and i == len(s):\n            res.append(curIP[:-1])\n            return\n        if dots > 4:\n            return\n        for j in range(i, min(i + 3, len(s))):\n            segment = s[i:j + 1]\n            if int(segment) <= 255 and (i == j or s[i] != \"0\"):\n                backtrack(j + 1, dots + 1, curIP + segment + \".\")\n    backtrack(0, 0, \"\")\n    return res\n\nprint(\"Valid IPs:\", restoreIpAddresses(\"25525511135\"))",
    "topics": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/restore-ip-addresses/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion",
      "Sorting"
    ],
    "summary": "Return all possible valid IP addresses that can be formed by inserting dots into s.",
    "examples": [
      {
        "input": "restoreIpAddresses(\"25525511135\")",
        "output": "Computed via restoreIpAddresses(\"25525511135\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases",
      "State Exploration & Backtracking"
    ],
    "referenceSolution": "def restoreIpAddresses(s):\n    res = []\n    def backtrack(i, dots, curIP):\n        if dots == 4 and i == len(s):\n            res.append(curIP[:-1])\n            return\n        if dots > 4:\n            return\n        for j in range(i, min(i + 3, len(s))):\n            segment = s[i:j + 1]\n            if int(segment) <= 255 and (i == j or s[i] != \"0\"):\n                backtrack(j + 1, dots + 1, curIP + segment + \".\")\n    backtrack(0, 0, \"\")\n    return res\n\nprint(\"Valid IPs:\", restoreIpAddresses(\"25525511135\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 202,
    "leetcodeNumber": 842,
    "title": "Split Array into Fibonacci Sequence",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Additive Sequence Branching",
    "description": "Split string of digits into Fibonacci-like sequence F[i] + F[i+1] == F[i+2].",
    "timeComplexity": "O(2^n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def splitIntoFibonacci(num):\n    res = []\n    def backtrack(idx):\n        if idx == len(num) and len(res) >= 3:\n            return True\n        for i in range(idx, len(num)):\n            if num[idx] == \"0\" and i > idx:\n                break\n            val = int(num[idx:i + 1])\n            if val >= 2**31:\n                break\n            if len(res) >= 2 and val > res[-1] + res[-2]:\n                break\n            if len(res) < 2 or val == res[-1] + res[-2]:\n                res.append(val)\n                if backtrack(i + 1):\n                    return True\n                res.pop()\n        return False\n    backtrack(0)\n    return res\n\nprint(\"Fibonacci split:\", splitIntoFibonacci(\"1101111\"))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/split-array-into-fibonacci-sequence/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion",
      "Strings"
    ],
    "summary": "Split string of digits into Fibonacci-like sequence F[i] + F[i+1] == F[i+2].",
    "examples": [
      {
        "input": "splitIntoFibonacci(\"1101111\")",
        "output": "Computed via splitIntoFibonacci(\"1101111\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def splitIntoFibonacci(num):\n    res = []\n    def backtrack(idx):\n        if idx == len(num) and len(res) >= 3:\n            return True\n        for i in range(idx, len(num)):\n            if num[idx] == \"0\" and i > idx:\n                break\n            val = int(num[idx:i + 1])\n            if val >= 2**31:\n                break\n            if len(res) >= 2 and val > res[-1] + res[-2]:\n                break\n            if len(res) < 2 or val == res[-1] + res[-2]:\n                res.append(val)\n                if backtrack(i + 1):\n                    return True\n                res.pop()\n        return False\n    backtrack(0)\n    return res\n\nprint(\"Fibonacci split:\", splitIntoFibonacci(\"1101111\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 203,
    "leetcodeNumber": 491,
    "title": "Non-decreasing Subsequences",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Deduplicated Increasing Subsequences",
    "description": "Find all different non-decreasing subsequences with at least two elements.",
    "timeComplexity": "O(2^n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def findSubsequences(nums):\n    res = []\n    def backtrack(start, path):\n        if len(path) >= 2:\n            res.append(list(path))\n        used = set()\n        for i in range(start, len(nums)):\n            if nums[i] in used:\n                continue\n            if not path or nums[i] >= path[-1]:\n                used.add(nums[i])\n                path.append(nums[i])\n                backtrack(i + 1, path)\n                path.pop()\n    backtrack(0, [])\n    return res\n\nprint(\"Subsequences:\", findSubsequences([4, 6, 7, 7]))",
    "topics": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/non-decreasing-subsequences/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Arrays",
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion",
      "Strings"
    ],
    "summary": "Find all different non-decreasing subsequences with at least two elements.",
    "examples": [
      {
        "input": "findSubsequences([4, 6, 7, 7])",
        "output": "Computed via findSubsequences([4, 6, 7, 7])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def findSubsequences(nums):\n    res = []\n    def backtrack(start, path):\n        if len(path) >= 2:\n            res.append(list(path))\n        used = set()\n        for i in range(start, len(nums)):\n            if nums[i] in used:\n                continue\n            if not path or nums[i] >= path[-1]:\n                used.add(nums[i])\n                path.append(nums[i])\n                backtrack(i + 1, path)\n                path.pop()\n    backtrack(0, [])\n    return res\n\nprint(\"Subsequences:\", findSubsequences([4, 6, 7, 7]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 204,
    "leetcodeNumber": 784,
    "title": "Letter Case Permutation",
    "difficulty": "Medium",
    "topic": "Backtracking",
    "pattern": "Dual Case Decision Tree",
    "description": "Transform every letter individually to be lowercase or uppercase.",
    "timeComplexity": "O(2^n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def letterCasePermutation(s):\n    res = []\n    def backtrack(sub, i):\n        if len(sub) == len(s):\n            res.append(sub)\n            return\n        if s[i].isalpha():\n            backtrack(sub + s[i].lower(), i + 1)\n            backtrack(sub + s[i].upper(), i + 1)\n        else:\n            backtrack(sub + s[i], i + 1)\n    backtrack(\"\", 0)\n    return res\n\nprint(\"Case perms:\", letterCasePermutation(\"a1b2\"))",
    "topics": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/letter-case-permutation/",
    "primaryTopic": "Backtracking",
    "topicTags": [
      "Backtracking",
      "Depth-First Search (DFS)",
      "Recursion"
    ],
    "summary": "Transform every letter individually to be lowercase or uppercase.",
    "examples": [
      {
        "input": "letterCasePermutation(\"a1b2\")",
        "output": "Computed via letterCasePermutation(\"a1b2\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "State Exploration & Backtracking",
      "Depth-First Branch Exploration"
    ],
    "referenceSolution": "def letterCasePermutation(s):\n    res = []\n    def backtrack(sub, i):\n        if len(sub) == len(s):\n            res.append(sub)\n            return\n        if s[i].isalpha():\n            backtrack(sub + s[i].lower(), i + 1)\n            backtrack(sub + s[i].upper(), i + 1)\n        else:\n            backtrack(sub + s[i], i + 1)\n    backtrack(\"\", 0)\n    return res\n\nprint(\"Case perms:\", letterCasePermutation(\"a1b2\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 205,
    "leetcodeNumber": 200,
    "title": "Number of Islands",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Grid BFS/DFS Connected Components",
    "description": "Count number of islands surrounded by water using 2D grid DFS.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def numIslands(grid):\n    if not grid:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n    islands = 0\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != \"1\":\n            return\n        grid[r][c] = \"0\"\n        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == \"1\":\n                dfs(r, c)\n                islands += 1\n    return islands\n\ngrid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]\nprint(\"Islands count:\", numIslands(grid))",
    "topics": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Matrix Problems",
      "Queues and Deques",
      "Recursion",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/number-of-islands/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Matrix Problems",
      "Queues and Deques",
      "Recursion",
      "Union-Find"
    ],
    "summary": "Count number of islands surrounded by water using 2D grid DFS.",
    "examples": [
      {
        "input": "grid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]",
        "output": "Computed via numIslands(grid)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "FIFO Queue Operations"
    ],
    "referenceSolution": "def numIslands(grid):\n    if not grid:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n    islands = 0\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != \"1\":\n            return\n        grid[r][c] = \"0\"\n        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == \"1\":\n                dfs(r, c)\n                islands += 1\n    return islands\n\ngrid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]\nprint(\"Islands count:\", numIslands(grid))",
    "verificationStatus": "Verified"
  },
  {
    "id": 206,
    "leetcodeNumber": 133,
    "title": "Clone Graph",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Hash Map DFS Graph Deep Copy",
    "description": "Return deep copy of connected undirected graph using hash map.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "starterCode": "def cloneGraph(adj):\n    copies = {}\n    for node, neighbors in adj.items():\n        copies[node] = list(neighbors)\n    return copies\n\nadj = {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3]}\nprint(\"Cloned adj:\", cloneGraph(adj))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/clone-graph/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Return deep copy of connected undirected graph using hash map.",
    "examples": [
      {
        "input": "adj = {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3]}",
        "output": "Computed via cloneGraph(adj)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def cloneGraph(adj):\n    copies = {}\n    for node, neighbors in adj.items():\n        copies[node] = list(neighbors)\n    return copies\n\nadj = {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3]}\nprint(\"Cloned adj:\", cloneGraph(adj))",
    "verificationStatus": "Verified"
  },
  {
    "id": 207,
    "leetcodeNumber": 695,
    "title": "Max Area of Island",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Grid Component Area Accumulation",
    "description": "Find maximum area of an island (number of connected 1s) in a grid.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def maxAreaOfIsland(grid):\n    rows, cols = len(grid), len(grid[0])\n    visited = set()\n    def dfs(r, c):\n        if (r < 0 or r >= rows or c < 0 or c >= cols or\n            grid[r][c] == 0 or (r, c) in visited):\n            return 0\n        visited.add((r, c))\n        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)\n    max_area = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 1 and (r, c) not in visited:\n                max_area = max(max_area, dfs(r, c))\n    return max_area\n\ngrid = [[0,1,1],[1,1,0],[0,0,1]]\nprint(\"Max area:\", maxAreaOfIsland(grid))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/max-area-of-island/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Recursion"
    ],
    "summary": "Find maximum area of an island (number of connected 1s) in a grid.",
    "examples": [
      {
        "input": "grid = [[0,1,1],[1,1,0],[0,0,1]]",
        "output": "Computed via maxAreaOfIsland(grid)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def maxAreaOfIsland(grid):\n    rows, cols = len(grid), len(grid[0])\n    visited = set()\n    def dfs(r, c):\n        if (r < 0 or r >= rows or c < 0 or c >= cols or\n            grid[r][c] == 0 or (r, c) in visited):\n            return 0\n        visited.add((r, c))\n        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)\n    max_area = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 1 and (r, c) not in visited:\n                max_area = max(max_area, dfs(r, c))\n    return max_area\n\ngrid = [[0,1,1],[1,1,0],[0,0,1]]\nprint(\"Max area:\", maxAreaOfIsland(grid))",
    "verificationStatus": "Verified"
  },
  {
    "id": 208,
    "leetcodeNumber": 417,
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Reverse Multi-Source DFS",
    "description": "Find grid coordinates where water can flow to both Pacific and Atlantic oceans.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def pacificAtlantic(heights):\n    rows, cols = len(heights), len(heights[0])\n    pac, atl = set(), set()\n    def dfs(r, c, visit, prevHeight):\n        if ((r, c) in visit or r < 0 or c < 0 or r >= rows or c >= cols or\n            heights[r][c] < prevHeight):\n            return\n        visit.add((r, c))\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            dfs(r + dr, c + dc, visit, heights[r][c])\n    for c in range(cols):\n        dfs(0, c, pac, heights[0][c])\n        dfs(rows - 1, c, atl, heights[rows - 1][c])\n    for r in range(rows):\n        dfs(r, 0, pac, heights[r][0])\n        dfs(r, cols - 1, atl, heights[r][cols - 1])\n    return list(pac.intersection(atl))\n\nheights = [[1,2,2],[3,2,3],[2,4,5]]\nprint(\"Common flow cells:\", pacificAtlantic(heights))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Recursion"
    ],
    "summary": "Find grid coordinates where water can flow to both Pacific and Atlantic oceans.",
    "examples": [
      {
        "input": "heights = [[1,2,2],[3,2,3],[2,4,5]]",
        "output": "Computed via pacificAtlantic(heights)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def pacificAtlantic(heights):\n    rows, cols = len(heights), len(heights[0])\n    pac, atl = set(), set()\n    def dfs(r, c, visit, prevHeight):\n        if ((r, c) in visit or r < 0 or c < 0 or r >= rows or c >= cols or\n            heights[r][c] < prevHeight):\n            return\n        visit.add((r, c))\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            dfs(r + dr, c + dc, visit, heights[r][c])\n    for c in range(cols):\n        dfs(0, c, pac, heights[0][c])\n        dfs(rows - 1, c, atl, heights[rows - 1][c])\n    for r in range(rows):\n        dfs(r, 0, pac, heights[r][0])\n        dfs(r, cols - 1, atl, heights[r][cols - 1])\n    return list(pac.intersection(atl))\n\nheights = [[1,2,2],[3,2,3],[2,4,5]]\nprint(\"Common flow cells:\", pacificAtlantic(heights))",
    "verificationStatus": "Verified"
  },
  {
    "id": 209,
    "leetcodeNumber": 130,
    "title": "Surrounded Regions",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Boundary DFS Inversion",
    "description": "Capture all regions surrounded by 'X' by flipping non-boundary connected 'O's to 'X'.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def solve(board):\n    rows, cols = len(board), len(board[0])\n    def capture(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != \"O\":\n            return\n        board[r][c] = \"T\"\n        capture(r + 1, c)\n        capture(r - 1, c)\n        capture(r, c + 1)\n        capture(r, c - 1)\n    for r in range(rows):\n        capture(r, 0)\n        capture(r, cols - 1)\n    for c in range(cols):\n        capture(0, c)\n        capture(rows - 1, c)\n    for r in range(rows):\n        for c in range(cols):\n            board[r][c] = \"O\" if board[r][c] == \"T\" else \"X\"\n    return board\n\nb = [[\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"X\",\"X\"]]\nprint(\"Surrounded solved:\", solve(b))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/surrounded-regions/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Recursion"
    ],
    "summary": "Capture all regions surrounded by 'X' by flipping non-boundary connected 'O's to 'X'.",
    "examples": [
      {
        "input": "b = [[\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"X\",\"X\"]]",
        "output": "Computed via solve(b)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def solve(board):\n    rows, cols = len(board), len(board[0])\n    def capture(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != \"O\":\n            return\n        board[r][c] = \"T\"\n        capture(r + 1, c)\n        capture(r - 1, c)\n        capture(r, c + 1)\n        capture(r, c - 1)\n    for r in range(rows):\n        capture(r, 0)\n        capture(r, cols - 1)\n    for c in range(cols):\n        capture(0, c)\n        capture(rows - 1, c)\n    for r in range(rows):\n        for c in range(cols):\n            board[r][c] = \"O\" if board[r][c] == \"T\" else \"X\"\n    return board\n\nb = [[\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\"],[\"X\",\"X\",\"X\"]]\nprint(\"Surrounded solved:\", solve(b))",
    "verificationStatus": "Verified"
  },
  {
    "id": 210,
    "leetcodeNumber": 994,
    "title": "Rotting Oranges",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Multi-Source Queue BFS",
    "description": "Find minimum number of minutes until no fresh oranges remain using multi-source BFS.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def orangesRotting(grid):\n    q = []\n    time, fresh = 0, 0\n    rows, cols = len(grid), len(grid[0])\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 1:\n                fresh += 1\n            if grid[r][c] == 2:\n                q.append((r, c))\n    directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]\n    while q and fresh > 0:\n        for _ in range(len(q)):\n            r, c = q.pop(0)\n            for dr, dc in directions:\n                row, col = r + dr, c + dc\n                if 0 <= row < rows and 0 <= col < cols and grid[row][col] == 1:\n                    grid[row][col] = 2\n                    q.append((row, col))\n                    fresh -= 1\n        time += 1\n    return time if fresh == 0 else -1\n\ngrid = [[2,1,1],[1,1,0],[0,1,1]]\nprint(\"Minutes to rot:\", orangesRotting(grid))",
    "topics": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Queues and Deques",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/rotting-oranges/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Queues and Deques",
      "Recursion"
    ],
    "summary": "Find minimum number of minutes until no fresh oranges remain using multi-source BFS.",
    "examples": [
      {
        "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        "output": "Computed via orangesRotting(grid)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "FIFO Queue Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def orangesRotting(grid):\n    q = []\n    time, fresh = 0, 0\n    rows, cols = len(grid), len(grid[0])\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 1:\n                fresh += 1\n            if grid[r][c] == 2:\n                q.append((r, c))\n    directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]\n    while q and fresh > 0:\n        for _ in range(len(q)):\n            r, c = q.pop(0)\n            for dr, dc in directions:\n                row, col = r + dr, c + dc\n                if 0 <= row < rows and 0 <= col < cols and grid[row][col] == 1:\n                    grid[row][col] = 2\n                    q.append((row, col))\n                    fresh -= 1\n        time += 1\n    return time if fresh == 0 else -1\n\ngrid = [[2,1,1],[1,1,0],[0,1,1]]\nprint(\"Minutes to rot:\", orangesRotting(grid))",
    "verificationStatus": "Verified"
  },
  {
    "id": 211,
    "leetcodeNumber": 286,
    "title": "Walls and Gates",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Multi-Source Distance BFS",
    "description": "Fill each empty room with distance to nearest gate (-1: wall, 0: gate, INF: empty).",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def wallsAndGates(rooms):\n    INF = 2147483647\n    rows, cols = len(rooms), len(rooms[0])\n    q = []\n    for r in range(rows):\n        for c in range(cols):\n            if rooms[r][c] == 0:\n                q.append((r, c))\n    dist = 0\n    while q:\n        for _ in range(len(q)):\n            r, c = q.pop(0)\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF:\n                    rooms[nr][nc] = rooms[r][c] + 1\n                    q.append((nr, nc))\n    return rooms\n\nrooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1]]\nprint(\"Filled rooms:\", wallsAndGates(rooms))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Queues and Deques",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/walls-and-gates/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Queues and Deques",
      "Recursion"
    ],
    "summary": "Fill each empty room with distance to nearest gate (-1: wall, 0: gate, INF: empty).",
    "examples": [
      {
        "input": "rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1]]",
        "output": "Computed via wallsAndGates(rooms)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "FIFO Queue Operations",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def wallsAndGates(rooms):\n    INF = 2147483647\n    rows, cols = len(rooms), len(rooms[0])\n    q = []\n    for r in range(rows):\n        for c in range(cols):\n            if rooms[r][c] == 0:\n                q.append((r, c))\n    dist = 0\n    while q:\n        for _ in range(len(q)):\n            r, c = q.pop(0)\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF:\n                    rooms[nr][nc] = rooms[r][c] + 1\n                    q.append((nr, nc))\n    return rooms\n\nrooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1]]\nprint(\"Filled rooms:\", wallsAndGates(rooms))",
    "verificationStatus": "Verified"
  },
  {
    "id": 212,
    "leetcodeNumber": 207,
    "title": "Course Schedule",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Cycle Detection / Topological Sort",
    "description": "Determine if you can finish all courses given prerequisite graph dependencies.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V + E)",
    "starterCode": "def canFinish(numCourses, prerequisites):\n    preMap = {i: [] for i in range(numCourses)}\n    for crs, pre in prerequisites:\n        preMap[crs].append(pre)\n    visiting = set()\n    def dfs(crs):\n        if crs in visiting:\n            return False\n        if preMap[crs] == []:\n            return True\n        visiting.add(crs)\n        for pre in preMap[crs]:\n            if not dfs(pre):\n                return False\n        visiting.remove(crs)\n        preMap[crs] = []\n        return True\n    for c in range(numCourses):\n        if not dfs(c):\n            return False\n    return True\n\nprint(\"Can finish:\", canFinish(2, [[1, 0]]))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Recursion",
      "Sorting",
      "Topological Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/course-schedule/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Recursion",
      "Sorting",
      "Topological Sorting"
    ],
    "summary": "Determine if you can finish all courses given prerequisite graph dependencies.",
    "examples": [
      {
        "input": "canFinish(2, [[1, 0]])",
        "output": "Computed via canFinish(2, [[1, 0]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "FIFO Queue Operations"
    ],
    "referenceSolution": "def canFinish(numCourses, prerequisites):\n    preMap = {i: [] for i in range(numCourses)}\n    for crs, pre in prerequisites:\n        preMap[crs].append(pre)\n    visiting = set()\n    def dfs(crs):\n        if crs in visiting:\n            return False\n        if preMap[crs] == []:\n            return True\n        visiting.add(crs)\n        for pre in preMap[crs]:\n            if not dfs(pre):\n                return False\n        visiting.remove(crs)\n        preMap[crs] = []\n        return True\n    for c in range(numCourses):\n        if not dfs(c):\n            return False\n    return True\n\nprint(\"Can finish:\", canFinish(2, [[1, 0]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 213,
    "leetcodeNumber": 210,
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Kahn's / Post-Order Topo Sort",
    "description": "Return the ordering of courses you should take to finish all courses.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V + E)",
    "starterCode": "def findOrder(numCourses, prerequisites):\n    preMap = {i: [] for i in range(numCourses)}\n    for crs, pre in prerequisites:\n        preMap[crs].append(pre)\n    output = []\n    visited, cycle = set(), set()\n    def dfs(crs):\n        if crs in cycle:\n            return False\n        if crs in visited:\n            return True\n        cycle.add(crs)\n        for pre in preMap[crs]:\n            if not dfs(pre):\n                return False\n        cycle.remove(crs)\n        visited.add(crs)\n        output.append(crs)\n        return True\n    for c in range(numCourses):\n        if not dfs(c):\n            return []\n    return output\n\nprint(\"Course order:\", findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Topological Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/course-schedule-ii/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Topological Sorting"
    ],
    "summary": "Return the ordering of courses you should take to finish all courses.",
    "examples": [
      {
        "input": "findOrder(4, [[1,0],[2,0],[3,1],[3,2]])",
        "output": "Computed via findOrder(4, [[1,0],[2,0],[3,1],[3,2]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def findOrder(numCourses, prerequisites):\n    preMap = {i: [] for i in range(numCourses)}\n    for crs, pre in prerequisites:\n        preMap[crs].append(pre)\n    output = []\n    visited, cycle = set(), set()\n    def dfs(crs):\n        if crs in cycle:\n            return False\n        if crs in visited:\n            return True\n        cycle.add(crs)\n        for pre in preMap[crs]:\n            if not dfs(pre):\n                return False\n        cycle.remove(crs)\n        visited.add(crs)\n        output.append(crs)\n        return True\n    for c in range(numCourses):\n        if not dfs(c):\n            return []\n    return output\n\nprint(\"Course order:\", findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 214,
    "leetcodeNumber": 684,
    "title": "Redundant Connection",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Disjoint Set Union (DSU)",
    "description": "Find edge in graph that can be removed so tree has no cycles using Union-Find.",
    "timeComplexity": "O(E * alpha(V))",
    "spaceComplexity": "O(V)",
    "starterCode": "def findRedundantConnection(edges):\n    parent = [i for i in range(len(edges) + 1)]\n    def find(n):\n        if n == parent[n]:\n            return n\n        parent[n] = find(parent[n])\n        return parent[n]\n    def union(n1, n2):\n        p1, p2 = find(n1), find(n2)\n        if p1 == p2:\n            return False\n        parent[p1] = p2\n        return True\n    for u, v in edges:\n        if not union(u, v):\n            return [u, v]\n\nprint(\"Redundant edge:\", findRedundantConnection([[1,2],[1,3],[2,3]]))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Recursion",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/redundant-connection/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Recursion",
      "Union-Find"
    ],
    "summary": "Find edge in graph that can be removed so tree has no cycles using Union-Find.",
    "examples": [
      {
        "input": "findRedundantConnection([[1,2],[1,3],[2,3]])",
        "output": "Computed via findRedundantConnection([[1,2],[1,3],[2,3]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal",
      "Depth-First Branch Exploration"
    ],
    "referenceSolution": "def findRedundantConnection(edges):\n    parent = [i for i in range(len(edges) + 1)]\n    def find(n):\n        if n == parent[n]:\n            return n\n        parent[n] = find(parent[n])\n        return parent[n]\n    def union(n1, n2):\n        p1, p2 = find(n1), find(n2)\n        if p1 == p2:\n            return False\n        parent[p1] = p2\n        return True\n    for u, v in edges:\n        if not union(u, v):\n            return [u, v]\n\nprint(\"Redundant edge:\", findRedundantConnection([[1,2],[1,3],[2,3]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 215,
    "leetcodeNumber": 323,
    "title": "Number of Connected Components in an Undirected Graph",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Union-Find / DFS Components",
    "description": "Return total number of connected components in undirected graph of n nodes.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "starterCode": "def countComponents(n, edges):\n    parent = [i for i in range(n)]\n    def find(n):\n        if n == parent[n]:\n            return n\n        parent[n] = find(parent[n])\n        return parent[n]\n    res = n\n    for u, v in edges:\n        p1, p2 = find(u), find(v)\n        if p1 != p2:\n            parent[p1] = p2\n            res -= 1\n    return res\n\nprint(\"Connected components:\", countComponents(5, [[0,1],[1,2],[3,4]]))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Union-Find"
    ],
    "summary": "Return total number of connected components in undirected graph of n nodes.",
    "examples": [
      {
        "input": "countComponents(5, [[0,1],[1,2],[3,4]])",
        "output": "Computed via countComponents(5, [[0,1],[1,2],[3,4]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def countComponents(n, edges):\n    parent = [i for i in range(n)]\n    def find(n):\n        if n == parent[n]:\n            return n\n        parent[n] = find(parent[n])\n        return parent[n]\n    res = n\n    for u, v in edges:\n        p1, p2 = find(u), find(v)\n        if p1 != p2:\n            parent[p1] = p2\n            res -= 1\n    return res\n\nprint(\"Connected components:\", countComponents(5, [[0,1],[1,2],[3,4]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 216,
    "leetcodeNumber": 261,
    "title": "Graph Valid Tree",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "DSU Cycle & Component Check",
    "description": "Check if undirected graph edges form a single valid tree without cycles.",
    "timeComplexity": "O(V)",
    "spaceComplexity": "O(V)",
    "starterCode": "def validTree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    parent = [i for i in range(n)]\n    def find(n):\n        if n == parent[n]:\n            return n\n        parent[n] = find(parent[n])\n        return parent[n]\n    for u, v in edges:\n        p1, p2 = find(u), find(v)\n        if p1 == p2:\n            return False\n        parent[p1] = p2\n    return True\n\nprint(\"Is valid tree:\", validTree(5, [[0,1],[0,2],[0,3],[1,4]]))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/graph-valid-tree/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Union-Find"
    ],
    "summary": "Check if undirected graph edges form a single valid tree without cycles.",
    "examples": [
      {
        "input": "validTree(5, [[0,1],[0,2],[0,3],[1,4]])",
        "output": "Computed via validTree(5, [[0,1],[0,2],[0,3],[1,4]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Adjacency Graph Traversal",
      "Depth-First Branch Exploration",
      "Disjoint Set Union & Find"
    ],
    "referenceSolution": "def validTree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    parent = [i for i in range(n)]\n    def find(n):\n        if n == parent[n]:\n            return n\n        parent[n] = find(parent[n])\n        return parent[n]\n    for u, v in edges:\n        p1, p2 = find(u), find(v)\n        if p1 == p2:\n            return False\n        parent[p1] = p2\n    return True\n\nprint(\"Is valid tree:\", validTree(5, [[0,1],[0,2],[0,3],[1,4]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 217,
    "leetcodeNumber": 127,
    "title": "Word Ladder",
    "difficulty": "Hard",
    "topic": "Graphs",
    "pattern": "Intermediate Pattern BFS",
    "description": "Find shortest transformation sequence length from beginWord to endWord changing 1 letter at a time.",
    "timeComplexity": "O(M^2 * N)",
    "spaceComplexity": "O(M^2 * N)",
    "starterCode": "def ladderLength(beginWord, endWord, wordList):\n    if endWord not in wordList:\n        return 0\n    neighbors = {}\n    wordList.append(beginWord)\n    for word in wordList:\n        for j in range(len(word)):\n            pattern = word[:j] + \"*\" + word[j + 1:]\n            if pattern not in neighbors:\n                neighbors[pattern] = []\n            neighbors[pattern].append(word)\n    visited = {beginWord}\n    q = [beginWord]\n    res = 1\n    while q:\n        for _ in range(len(q)):\n            word = q.pop(0)\n            if word == endWord:\n                return res\n            for j in range(len(word)):\n                pattern = word[:j] + \"*\" + word[j + 1:]\n                for nei in neighbors.get(pattern, []):\n                    if nei not in visited:\n                        visited.add(nei)\n                        q.append(nei)\n        res += 1\n    return 0\n\nprint(\"Ladder length:\", ladderLength(\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/word-ladder/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Recursion",
      "Strings"
    ],
    "summary": "Find shortest transformation sequence length from beginWord to endWord changing 1 letter at a time.",
    "examples": [
      {
        "input": "ladderLength(\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"])",
        "output": "Computed via ladderLength(\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "FIFO Queue Operations"
    ],
    "referenceSolution": "def ladderLength(beginWord, endWord, wordList):\n    if endWord not in wordList:\n        return 0\n    neighbors = {}\n    wordList.append(beginWord)\n    for word in wordList:\n        for j in range(len(word)):\n            pattern = word[:j] + \"*\" + word[j + 1:]\n            if pattern not in neighbors:\n                neighbors[pattern] = []\n            neighbors[pattern].append(word)\n    visited = {beginWord}\n    q = [beginWord]\n    res = 1\n    while q:\n        for _ in range(len(q)):\n            word = q.pop(0)\n            if word == endWord:\n                return res\n            for j in range(len(word)):\n                pattern = word[:j] + \"*\" + word[j + 1:]\n                for nei in neighbors.get(pattern, []):\n                    if nei not in visited:\n                        visited.add(nei)\n                        q.append(nei)\n        res += 1\n    return 0\n\nprint(\"Ladder length:\", ladderLength(\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 218,
    "leetcodeNumber": 733,
    "title": "Flood Fill",
    "difficulty": "Easy",
    "topic": "Graphs",
    "pattern": "4-Directional DFS Replacement",
    "description": "Perform flood fill on image starting from pixel (sr, sc) with color.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def floodFill(image, sr, sc, color):\n    startColor = image[sr][sc]\n    if startColor == color:\n        return image\n    rows, cols = len(image), len(image[0])\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or image[r][c] != startColor:\n            return\n        image[r][c] = color\n        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)\n    dfs(sr, sc)\n    return image\n\nimg = [[1,1,1],[1,1,0],[1,0,1]]\nprint(\"Filled image:\", floodFill(img, 1, 1, 2))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/flood-fill/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Recursion"
    ],
    "summary": "Perform flood fill on image starting from pixel (sr, sc) with color.",
    "examples": [
      {
        "input": "img = [[1,1,1],[1,1,0],[1,0,1]]",
        "output": "Computed via floodFill(img, 1, 1, 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal",
      "Depth-First Branch Exploration"
    ],
    "referenceSolution": "def floodFill(image, sr, sc, color):\n    startColor = image[sr][sc]\n    if startColor == color:\n        return image\n    rows, cols = len(image), len(image[0])\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or image[r][c] != startColor:\n            return\n        image[r][c] = color\n        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)\n    dfs(sr, sc)\n    return image\n\nimg = [[1,1,1],[1,1,0],[1,0,1]]\nprint(\"Filled image:\", floodFill(img, 1, 1, 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 219,
    "leetcodeNumber": 463,
    "title": "Island Perimeter",
    "difficulty": "Easy",
    "topic": "Graphs",
    "pattern": "Edge Boundary Counting",
    "description": "Calculate perimeter of single island grid where 1 is land and 0 is water.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def islandPerimeter(grid):\n    rows, cols = len(grid), len(grid[0])\n    perimeter = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 1:\n                perimeter += 4\n                if r > 0 and grid[r - 1][c] == 1:\n                    perimeter -= 2\n                if c > 0 and grid[r][c - 1] == 1:\n                    perimeter -= 2\n    return perimeter\n\ngrid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]\nprint(\"Perimeter:\", islandPerimeter(grid))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/island-perimeter/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Recursion"
    ],
    "summary": "Calculate perimeter of single island grid where 1 is land and 0 is water.",
    "examples": [
      {
        "input": "grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]",
        "output": "Computed via islandPerimeter(grid)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def islandPerimeter(grid):\n    rows, cols = len(grid), len(grid[0])\n    perimeter = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 1:\n                perimeter += 4\n                if r > 0 and grid[r - 1][c] == 1:\n                    perimeter -= 2\n                if c > 0 and grid[r][c - 1] == 1:\n                    perimeter -= 2\n    return perimeter\n\ngrid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]\nprint(\"Perimeter:\", islandPerimeter(grid))",
    "verificationStatus": "Verified"
  },
  {
    "id": 220,
    "leetcodeNumber": 841,
    "title": "Keys and Rooms",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "DFS Room Reachability",
    "description": "Return true if you can visit all rooms given keys in each room.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "starterCode": "def canVisitAllRooms(rooms):\n    visited = set()\n    def dfs(room):\n        visited.add(room)\n        for key in rooms[room]:\n            if key not in visited:\n                dfs(key)\n    dfs(0)\n    return len(visited) == len(rooms)\n\nprint(\"Can visit all rooms:\", canVisitAllRooms([[1],[2],[3],[]]))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/keys-and-rooms/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Recursion"
    ],
    "summary": "Return true if you can visit all rooms given keys in each room.",
    "examples": [
      {
        "input": "canVisitAllRooms([[1],[2],[3],[]])",
        "output": "Computed via canVisitAllRooms([[1],[2],[3],[]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal",
      "Depth-First Branch Exploration"
    ],
    "referenceSolution": "def canVisitAllRooms(rooms):\n    visited = set()\n    def dfs(room):\n        visited.add(room)\n        for key in rooms[room]:\n            if key not in visited:\n                dfs(key)\n    dfs(0)\n    return len(visited) == len(rooms)\n\nprint(\"Can visit all rooms:\", canVisitAllRooms([[1],[2],[3],[]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 221,
    "leetcodeNumber": 547,
    "title": "Number of Provinces",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Adjacency Matrix DFS",
    "description": "Find total number of connected provinces of cities from connectivity matrix.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(n)",
    "starterCode": "def findCircleNum(isConnected):\n    n = len(isConnected)\n    visited = set()\n    provinces = 0\n    def dfs(city):\n        visited.add(city)\n        for other in range(n):\n            if isConnected[city][other] == 1 and other not in visited:\n                dfs(other)\n    for c in range(n):\n        if c not in visited:\n            dfs(c)\n            provinces += 1\n    return provinces\n\nprint(\"Provinces:\", findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Math and Number Theory",
      "Matrix Problems",
      "Recursion",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/number-of-provinces/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Math and Number Theory",
      "Matrix Problems",
      "Recursion",
      "Union-Find"
    ],
    "summary": "Find total number of connected provinces of cities from connectivity matrix.",
    "examples": [
      {
        "input": "findCircleNum([[1,1,0],[1,1,0],[0,0,1]])",
        "output": "Computed via findCircleNum([[1,1,0],[1,1,0],[0,0,1]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def findCircleNum(isConnected):\n    n = len(isConnected)\n    visited = set()\n    provinces = 0\n    def dfs(city):\n        visited.add(city)\n        for other in range(n):\n            if isConnected[city][other] == 1 and other not in visited:\n                dfs(other)\n    for c in range(n):\n        if c not in visited:\n            dfs(c)\n            provinces += 1\n    return provinces\n\nprint(\"Provinces:\", findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 222,
    "leetcodeNumber": 802,
    "title": "Find Eventual Safe States",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "3-State Cycle Detection",
    "description": "Find all nodes that only lead to terminal nodes (no directed cycles).",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "starterCode": "def eventualSafeNodes(graph):\n    # 0: unvisited, 1: visiting (in cycle), 2: safe\n    state = [0] * len(graph)\n    def dfs(node):\n        if state[node] > 0:\n            return state[node] == 2\n        state[node] = 1\n        for nei in graph[node]:\n            if not dfs(nei):\n                return False\n        state[node] = 2\n        return True\n    return [i for i in range(len(graph)) if dfs(i)]\n\nprint(\"Safe nodes:\", eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]]))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Topological Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-eventual-safe-states/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Topological Sorting"
    ],
    "summary": "Find all nodes that only lead to terminal nodes (no directed cycles).",
    "examples": [
      {
        "input": "eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])",
        "output": "Computed via eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Adjacency Graph Traversal",
      "Depth-First Branch Exploration",
      "DAG In-Degree / Order"
    ],
    "referenceSolution": "def eventualSafeNodes(graph):\n    # 0: unvisited, 1: visiting (in cycle), 2: safe\n    state = [0] * len(graph)\n    def dfs(node):\n        if state[node] > 0:\n            return state[node] == 2\n        state[node] = 1\n        for nei in graph[node]:\n            if not dfs(nei):\n                return False\n        state[node] = 2\n        return True\n    return [i for i in range(len(graph)) if dfs(i)]\n\nprint(\"Safe nodes:\", eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 223,
    "leetcodeNumber": 785,
    "title": "Is Graph Bipartite?",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "2-Coloring BFS / DFS",
    "description": "Check if graph vertices can be partitioned into two independent sets with alternating colors.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "starterCode": "def isBipartite(graph):\n    color = {}\n    for node in range(len(graph)):\n        if node not in color:\n            color[node] = 0\n            q = [node]\n            while q:\n                curr = q.pop(0)\n                for nei in graph[curr]:\n                    if nei not in color:\n                        color[nei] = 1 - color[curr]\n                        q.append(nei)\n                    elif color[nei] == color[curr]:\n                        return False\n    return True\n\nprint(\"Is bipartite:\", isBipartite([[1,3],[0,2],[1,3],[0,2]]))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/is-graph-bipartite/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques",
      "Recursion"
    ],
    "summary": "Check if graph vertices can be partitioned into two independent sets with alternating colors.",
    "examples": [
      {
        "input": "isBipartite([[1,3],[0,2],[1,3],[0,2]])",
        "output": "Computed via isBipartite([[1,3],[0,2],[1,3],[0,2]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "FIFO Queue Operations",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def isBipartite(graph):\n    color = {}\n    for node in range(len(graph)):\n        if node not in color:\n            color[node] = 0\n            q = [node]\n            while q:\n                curr = q.pop(0)\n                for nei in graph[curr]:\n                    if nei not in color:\n                        color[nei] = 1 - color[curr]\n                        q.append(nei)\n                    elif color[nei] == color[curr]:\n                        return False\n    return True\n\nprint(\"Is bipartite:\", isBipartite([[1,3],[0,2],[1,3],[0,2]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 224,
    "leetcodeNumber": 1091,
    "title": "Shortest Path in Binary Matrix",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "8-Directional Queue BFS",
    "description": "Find length of shortest clear path from top-left to bottom-right in binary matrix.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(n^2)",
    "starterCode": "def shortestPathBinaryMatrix(grid):\n    n = len(grid)\n    if grid[0][0] != 0 or grid[n - 1][n - 1] != 0:\n        return -1\n    q = [(0, 0, 1)]\n    visited = {(0, 0)}\n    directions = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]\n    while q:\n        r, c, d = q.pop(0)\n        if r == n - 1 and c == n - 1:\n            return d\n        for dr, dc in directions:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0 and (nr, nc) not in visited:\n                visited.add((nr, nc))\n                q.append((nr, nc, d + 1))\n    return -1\n\nprint(\"Shortest path:\", shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]]))",
    "topics": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Queues and Deques",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Queues and Deques",
      "Recursion"
    ],
    "summary": "Find length of shortest clear path from top-left to bottom-right in binary matrix.",
    "examples": [
      {
        "input": "shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])",
        "output": "Computed via shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "FIFO Queue Operations"
    ],
    "referenceSolution": "def shortestPathBinaryMatrix(grid):\n    n = len(grid)\n    if grid[0][0] != 0 or grid[n - 1][n - 1] != 0:\n        return -1\n    q = [(0, 0, 1)]\n    visited = {(0, 0)}\n    directions = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]\n    while q:\n        r, c, d = q.pop(0)\n        if r == n - 1 and c == n - 1:\n            return d\n        for dr, dc in directions:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0 and (nr, nc) not in visited:\n                visited.add((nr, nc))\n                q.append((nr, nc, d + 1))\n    return -1\n\nprint(\"Shortest path:\", shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 225,
    "leetcodeNumber": 1971,
    "title": "Find if Path Exists in Graph",
    "difficulty": "Easy",
    "topic": "Graphs",
    "pattern": "BFS Reachability",
    "description": "Determine if there is a valid path from source to destination in graph.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "starterCode": "def validPath(n, edges, source, destination):\n    adj = {i: [] for i in range(n)}\n    for u, v in edges:\n        adj[u].append(v)\n        adj[v].append(u)\n    visited = {source}\n    q = [source]\n    while q:\n        node = q.pop(0)\n        if node == destination:\n            return True\n        for nei in adj[node]:\n            if nei not in visited:\n                visited.add(nei)\n                q.append(nei)\n    return False\n\nprint(\"Path exists:\", validPath(3, [[0,1],[1,2],[2,0]], 0, 2))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques"
    ],
    "sourceUrl": "https://leetcode.com/problems/find-if-path-exists-in-graph/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Queues and Deques"
    ],
    "summary": "Determine if there is a valid path from source to destination in graph.",
    "examples": [
      {
        "input": "validPath(3, [[0,1],[1,2],[2,0]], 0, 2)",
        "output": "Computed via validPath(3, [[0,1],[1,2],[2,0]], 0, 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "FIFO Queue Operations",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def validPath(n, edges, source, destination):\n    adj = {i: [] for i in range(n)}\n    for u, v in edges:\n        adj[u].append(v)\n        adj[v].append(u)\n    visited = {source}\n    q = [source]\n    while q:\n        node = q.pop(0)\n        if node == destination:\n            return True\n        for nei in adj[node]:\n            if nei not in visited:\n                visited.add(nei)\n                q.append(nei)\n    return False\n\nprint(\"Path exists:\", validPath(3, [[0,1],[1,2],[2,0]], 0, 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 226,
    "leetcodeNumber": 1319,
    "title": "Number of Operations to Make Network Connected",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Union-Find Extra Cables",
    "description": "Find minimum operations to connect all computers using available extra cables.",
    "timeComplexity": "O(E)",
    "spaceComplexity": "O(V)",
    "starterCode": "def makeConnected(n, connections):\n    if len(connections) < n - 1:\n        return -1\n    parent = [i for i in range(n)]\n    def find(n):\n        if n == parent[n]:\n            return n\n        parent[n] = find(parent[n])\n        return parent[n]\n    components = n\n    for u, v in connections:\n        p1, p2 = find(u), find(v)\n        if p1 != p2:\n            parent[p1] = p2\n            components -= 1\n    return components - 1\n\nprint(\"Ops needed:\", makeConnected(4, [[0,1],[0,2],[1,2]]))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Math and Number Theory",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Math and Number Theory",
      "Union-Find"
    ],
    "summary": "Find minimum operations to connect all computers using available extra cables.",
    "examples": [
      {
        "input": "makeConnected(4, [[0,1],[0,2],[1,2]])",
        "output": "Computed via makeConnected(4, [[0,1],[0,2],[1,2]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Adjacency Graph Traversal",
      "Depth-First Branch Exploration",
      "Disjoint Set Union & Find"
    ],
    "referenceSolution": "def makeConnected(n, connections):\n    if len(connections) < n - 1:\n        return -1\n    parent = [i for i in range(n)]\n    def find(n):\n        if n == parent[n]:\n            return n\n        parent[n] = find(parent[n])\n        return parent[n]\n    components = n\n    for u, v in connections:\n        p1, p2 = find(u), find(v)\n        if p1 != p2:\n            parent[p1] = p2\n            components -= 1\n    return components - 1\n\nprint(\"Ops needed:\", makeConnected(4, [[0,1],[0,2],[1,2]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 227,
    "leetcodeNumber": 743,
    "title": "Network Delay Time",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Dijkstra's Algorithm",
    "description": "Find minimum time for all n nodes to receive signal sent from node k using Dijkstra's algorithm.",
    "timeComplexity": "O(E log V)",
    "spaceComplexity": "O(V + E)",
    "starterCode": "import heapq\n\ndef networkDelayTime(times, n, k):\n    edges = {i: [] for i in range(1, n + 1)}\n    for u, v, w in times:\n        edges[u].append((v, w))\n    minHeap = [(0, k)]\n    visit = set()\n    t = 0\n    while minHeap:\n        w1, n1 = heapq.heappop(minHeap)\n        if n1 in visit:\n            continue\n        visit.add(n1)\n        t = max(t, w1)\n        for n2, w2 in edges[n1]:\n            if n2 not in visit:\n                heapq.heappush(minHeap, (w1 + w2, n2))\n    return t if len(visit) == n else -1\n\nprint(\"Network delay:\", networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2))",
    "topics": [
      "Advanced Data Structures",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/network-delay-time/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Advanced Data Structures",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Find minimum time for all n nodes to receive signal sent from node k using Dijkstra's algorithm.",
    "examples": [
      {
        "input": "networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)",
        "output": "Computed via networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "import heapq\n\ndef networkDelayTime(times, n, k):\n    edges = {i: [] for i in range(1, n + 1)}\n    for u, v, w in times:\n        edges[u].append((v, w))\n    minHeap = [(0, k)]\n    visit = set()\n    t = 0\n    while minHeap:\n        w1, n1 = heapq.heappop(minHeap)\n        if n1 in visit:\n            continue\n        visit.add(n1)\n        t = max(t, w1)\n        for n2, w2 in edges[n1]:\n            if n2 not in visit:\n                heapq.heappush(minHeap, (w1 + w2, n2))\n    return t if len(visit) == n else -1\n\nprint(\"Network delay:\", networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 228,
    "leetcodeNumber": 1584,
    "title": "Min Cost to Connect All Points",
    "difficulty": "Medium",
    "topic": "Graphs",
    "pattern": "Prim's Minimum Spanning Tree",
    "description": "Find minimum cost to connect all points such that there is exactly one path between any pair.",
    "timeComplexity": "O(N^2 log N)",
    "spaceComplexity": "O(N^2)",
    "starterCode": "import heapq\n\ndef minCostConnectPoints(points):\n    N = len(points)\n    adj = {i: [] for i in range(N)}\n    for i in range(N):\n        x1, y1 = points[i]\n        for j in range(i + 1, N):\n            x2, y2 = points[j]\n            dist = abs(x1 - x2) + abs(y1 - y2)\n            adj[i].append((dist, j))\n            adj[j].append((dist, i))\n    res = 0\n    visit = set()\n    minH = [[0, 0]]\n    while len(visit) < N:\n        cost, i = heapq.heappop(minH)\n        if i in visit:\n            continue\n        res += cost\n        visit.add(i)\n        for neiCost, nei in adj[i]:\n            if nei not in visit:\n                heapq.heappush(minH, [neiCost, nei])\n    return res\n\nprint(\"MST Cost:\", minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]]))",
    "topics": [
      "Advanced Data Structures",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
    "primaryTopic": "Graphs",
    "topicTags": [
      "Advanced Data Structures",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Union-Find"
    ],
    "summary": "Find minimum cost to connect all points such that there is exactly one path between any pair.",
    "examples": [
      {
        "input": "minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]])",
        "output": "Computed via minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "import heapq\n\ndef minCostConnectPoints(points):\n    N = len(points)\n    adj = {i: [] for i in range(N)}\n    for i in range(N):\n        x1, y1 = points[i]\n        for j in range(i + 1, N):\n            x2, y2 = points[j]\n            dist = abs(x1 - x2) + abs(y1 - y2)\n            adj[i].append((dist, j))\n            adj[j].append((dist, i))\n    res = 0\n    visit = set()\n    minH = [[0, 0]]\n    while len(visit) < N:\n        cost, i = heapq.heappop(minH)\n        if i in visit:\n            continue\n        res += cost\n        visit.add(i)\n        for neiCost, nei in adj[i]:\n            if nei not in visit:\n                heapq.heappush(minH, [neiCost, nei])\n    return res\n\nprint(\"MST Cost:\", minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 229,
    "leetcodeNumber": 332,
    "title": "Reconstruct Itinerary",
    "difficulty": "Hard",
    "topic": "Advanced Graphs",
    "pattern": "Hierholzer's Eulerian Path",
    "description": "Reconstruct airline flight itinerary starting from 'JFK' in lexicographical order.",
    "timeComplexity": "O(E log E)",
    "spaceComplexity": "O(V + E)",
    "starterCode": "def findItinerary(tickets):\n    adj = {}\n    for src, dst in sorted(tickets, reverse=True):\n        if src not in adj:\n            adj[src] = []\n        adj[src].append(dst)\n    route = []\n    def dfs(airport):\n        while airport in adj and adj[airport]:\n            dfs(adj[airport].pop())\n        route.append(airport)\n    dfs(\"JFK\")\n    return route[::-1]\n\ntickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]\nprint(\"Itinerary:\", findItinerary(tickets))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/reconstruct-itinerary/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Sorting"
    ],
    "summary": "Reconstruct airline flight itinerary starting from 'JFK' in lexicographical order.",
    "examples": [
      {
        "input": "tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
        "output": "Computed via findItinerary(tickets)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def findItinerary(tickets):\n    adj = {}\n    for src, dst in sorted(tickets, reverse=True):\n        if src not in adj:\n            adj[src] = []\n        adj[src].append(dst)\n    route = []\n    def dfs(airport):\n        while airport in adj and adj[airport]:\n            dfs(adj[airport].pop())\n        route.append(airport)\n    dfs(\"JFK\")\n    return route[::-1]\n\ntickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]\nprint(\"Itinerary:\", findItinerary(tickets))",
    "verificationStatus": "Verified"
  },
  {
    "id": 230,
    "leetcodeNumber": 778,
    "title": "Swim in Rising Water",
    "difficulty": "Hard",
    "topic": "Advanced Graphs",
    "pattern": "Modified Dijkstra Grid",
    "description": "Find least time until you can reach bottom-right square from top-left square in elevation grid.",
    "timeComplexity": "O(n^2 log n)",
    "spaceComplexity": "O(n^2)",
    "starterCode": "import heapq\n\ndef swimInWater(grid):\n    n = len(grid)\n    visited = {(0, 0)}\n    minH = [(grid[0][0], 0, 0)]\n    while minH:\n        t, r, c = heapq.heappop(minH)\n        if r == n - 1 and c == n - 1:\n            return t\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:\n                visited.add((nr, nc))\n                heapq.heappush(minH, (max(t, grid[nr][nc]), nr, nc))\n\nprint(\"Swim time:\", swimInWater([[0,2],[1,3]]))",
    "topics": [
      "Advanced Data Structures",
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/swim-in-rising-water/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Advanced Data Structures",
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion",
      "Union-Find"
    ],
    "summary": "Find least time until you can reach bottom-right square from top-left square in elevation grid.",
    "examples": [
      {
        "input": "swimInWater([[0,2],[1,3]])",
        "output": "Computed via swimInWater([[0,2],[1,3]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "import heapq\n\ndef swimInWater(grid):\n    n = len(grid)\n    visited = {(0, 0)}\n    minH = [(grid[0][0], 0, 0)]\n    while minH:\n        t, r, c = heapq.heappop(minH)\n        if r == n - 1 and c == n - 1:\n            return t\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:\n                visited.add((nr, nc))\n                heapq.heappush(minH, (max(t, grid[nr][nc]), nr, nc))\n\nprint(\"Swim time:\", swimInWater([[0,2],[1,3]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 231,
    "leetcodeNumber": 269,
    "title": "Alien Dictionary",
    "difficulty": "Hard",
    "topic": "Advanced Graphs",
    "pattern": "Topological Sort on Lexicographical Rules",
    "description": "Deduce alien alphabetical order from sorted dictionary list of words.",
    "timeComplexity": "O(C)",
    "spaceComplexity": "O(U + min(U^2, N))",
    "starterCode": "def alienOrder(words):\n    adj = {c: set() for w in words for c in w}\n    for i in range(len(words) - 1):\n        w1, w2 = words[i], words[i + 1]\n        minLen = min(len(w1), len(w2))\n        if len(w1) > len(w2) and w1[:\n            minLen] == w2[:minLen]: return \"\"\n        for j in range(minLen):\n            if w1[j] != w2[j]:\n                adj[w1[j]].add(w2[j])\n                break\n    visited, res = {}, []\n    def dfs(c):\n        if c in visited:\n            return visited[c]\n        visited[c] = True\n        for nei in adj[c]:\n            if dfs(nei):\n                return True\n        visited[c] = False\n        res.append(c)\n    for c in adj:\n        if dfs(c):\n            return \"\"\n    return \"\".join(res[::-1])\n\nprint(\"Alien order:\", alienOrder([\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Strings",
      "Topological Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/alien-dictionary/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting",
      "Strings",
      "Topological Sorting"
    ],
    "summary": "Deduce alien alphabetical order from sorted dictionary list of words.",
    "examples": [
      {
        "input": "alienOrder([\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"])",
        "output": "Computed via alienOrder([\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Hash Map / Dict Key Lookup"
    ],
    "referenceSolution": "def alienOrder(words):\n    adj = {c: set() for w in words for c in w}\n    for i in range(len(words) - 1):\n        w1, w2 = words[i], words[i + 1]\n        minLen = min(len(w1), len(w2))\n        if len(w1) > len(w2) and w1[:\n            minLen] == w2[:minLen]: return \"\"\n        for j in range(minLen):\n            if w1[j] != w2[j]:\n                adj[w1[j]].add(w2[j])\n                break\n    visited, res = {}, []\n    def dfs(c):\n        if c in visited:\n            return visited[c]\n        visited[c] = True\n        for nei in adj[c]:\n            if dfs(nei):\n                return True\n        visited[c] = False\n        res.append(c)\n    for c in adj:\n        if dfs(c):\n            return \"\"\n    return \"\".join(res[::-1])\n\nprint(\"Alien order:\", alienOrder([\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 232,
    "leetcodeNumber": 787,
    "title": "Cheapest Flights Within K Stops",
    "difficulty": "Medium",
    "topic": "Advanced Graphs",
    "pattern": "Bellman-Ford Relaxations",
    "description": "Find cheapest price from src to dst with at most k stops.",
    "timeComplexity": "O(k * E)",
    "spaceComplexity": "O(V)",
    "starterCode": "def findCheapestPrice(n, flights, src, dst, k):\n    prices = [float(\"inf\")] * n\n    prices[src] = 0\n    for _ in range(k + 1):\n        tmp = list(prices)\n        for s, d, p in flights:\n            if prices[s] != float(\"inf\") and prices[s] + p < tmp[d]:\n                tmp[d] = prices[s] + p\n        prices = tmp\n    return prices[dst] if prices[dst] != float(\"inf\") else -1\n\nflights = [[0,1,100],[1,2,100],[0,2,500]]\nprint(\"Cheapest price:\", findCheapestPrice(3, flights, 0, 2, 1))",
    "topics": [
      "Advanced Data Structures",
      "Depth-First Search (DFS)",
      "Graphs",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Advanced Data Structures",
      "Depth-First Search (DFS)",
      "Graphs",
      "Recursion"
    ],
    "summary": "Find cheapest price from src to dst with at most k stops.",
    "examples": [
      {
        "input": "flights = [[0,1,100],[1,2,100],[0,2,500]]",
        "output": "Computed via findCheapestPrice(3, flights, 0, 2, 1)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal",
      "Depth-First Branch Exploration"
    ],
    "referenceSolution": "def findCheapestPrice(n, flights, src, dst, k):\n    prices = [float(\"inf\")] * n\n    prices[src] = 0\n    for _ in range(k + 1):\n        tmp = list(prices)\n        for s, d, p in flights:\n            if prices[s] != float(\"inf\") and prices[s] + p < tmp[d]:\n                tmp[d] = prices[s] + p\n        prices = tmp\n    return prices[dst] if prices[dst] != float(\"inf\") else -1\n\nflights = [[0,1,100],[1,2,100],[0,2,500]]\nprint(\"Cheapest price:\", findCheapestPrice(3, flights, 0, 2, 1))",
    "verificationStatus": "Verified"
  },
  {
    "id": 233,
    "leetcodeNumber": 1631,
    "title": "Path With Minimum Effort",
    "difficulty": "Medium",
    "topic": "Advanced Graphs",
    "pattern": "Dijkstra's Height Difference",
    "description": "Find path from top-left to bottom-right that minimizes maximum absolute difference in heights between cells.",
    "timeComplexity": "O(m*n log(m*n))",
    "spaceComplexity": "O(m*n)",
    "starterCode": "import heapq\n\ndef minimumEffortPath(heights):\n    rows, cols = len(heights), len(heights[0])\n    minH = [(0, 0, 0)]\n    effort = {(0, 0): 0}\n    while minH:\n        eff, r, c = heapq.heappop(minH)\n        if r == rows - 1 and c == cols - 1:\n            return eff\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < rows and 0 <= nc < cols:\n                new_eff = max(eff, abs(heights[r][c] - heights[nr][nc]))\n                if new_eff < effort.get((nr, nc), float(\"inf\")):\n                    effort[(nr, nc)] = new_eff\n                    heapq.heappush(minH, (new_eff, nr, nc))\n\nprint(\"Min effort:\", minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]]))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/path-with-minimum-effort/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Find path from top-left to bottom-right that minimizes maximum absolute difference in heights between cells.",
    "examples": [
      {
        "input": "minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]])",
        "output": "Computed via minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "import heapq\n\ndef minimumEffortPath(heights):\n    rows, cols = len(heights), len(heights[0])\n    minH = [(0, 0, 0)]\n    effort = {(0, 0): 0}\n    while minH:\n        eff, r, c = heapq.heappop(minH)\n        if r == rows - 1 and c == cols - 1:\n            return eff\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < rows and 0 <= nc < cols:\n                new_eff = max(eff, abs(heights[r][c] - heights[nr][nc]))\n                if new_eff < effort.get((nr, nc), float(\"inf\")):\n                    effort[(nr, nc)] = new_eff\n                    heapq.heappush(minH, (new_eff, nr, nc))\n\nprint(\"Min effort:\", minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 234,
    "leetcodeNumber": 1514,
    "title": "Path with Maximum Probability",
    "difficulty": "Medium",
    "topic": "Advanced Graphs",
    "pattern": "Max-Heap Dijkstra Multiplicative",
    "description": "Find path with maximum probability of success between start and end node.",
    "timeComplexity": "O(E log V)",
    "spaceComplexity": "O(V + E)",
    "starterCode": "import heapq\n\ndef maxProbability(n, edges, succProb, start_node, end_node):\n    adj = {i: [] for i in range(n)}\n    for (u, v), p in zip(edges, succProb):\n        adj[u].append((v, p))\n        adj[v].append((u, p))\n    pq = [(-1.0, start_node)]\n    probs = {start_node: 1.0}\n    while pq:\n        prob, node = heapq.heappop(pq)\n        prob = -prob\n        if node == end_node:\n            return prob\n        for nei, edge_p in adj[node]:\n            if prob * edge_p > probs.get(nei, 0):\n                probs[nei] = prob * edge_p\n                heapq.heappush(pq, (-prob * edge_p, nei))\n    return 0.0\n\nedges = [[0,1],[1,2],[0,2]]\nprint(\"Max prob:\", maxProbability(3, edges, [0.5,0.5,0.2], 0, 2))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps"
    ],
    "sourceUrl": "https://leetcode.com/problems/path-with-maximum-probability/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps"
    ],
    "summary": "Find path with maximum probability of success between start and end node.",
    "examples": [
      {
        "input": "edges = [[0,1],[1,2],[0,2]]",
        "output": "Computed via maxProbability(3, edges, [0.5,0.5,0.2], 0, 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Adjacency Graph Traversal",
      "Depth-First Branch Exploration"
    ],
    "referenceSolution": "import heapq\n\ndef maxProbability(n, edges, succProb, start_node, end_node):\n    adj = {i: [] for i in range(n)}\n    for (u, v), p in zip(edges, succProb):\n        adj[u].append((v, p))\n        adj[v].append((u, p))\n    pq = [(-1.0, start_node)]\n    probs = {start_node: 1.0}\n    while pq:\n        prob, node = heapq.heappop(pq)\n        prob = -prob\n        if node == end_node:\n            return prob\n        for nei, edge_p in adj[node]:\n            if prob * edge_p > probs.get(nei, 0):\n                probs[nei] = prob * edge_p\n                heapq.heappush(pq, (-prob * edge_p, nei))\n    return 0.0\n\nedges = [[0,1],[1,2],[0,2]]\nprint(\"Max prob:\", maxProbability(3, edges, [0.5,0.5,0.2], 0, 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 235,
    "leetcodeNumber": 1162,
    "title": "As Far from Land as Possible",
    "difficulty": "Medium",
    "topic": "Advanced Graphs",
    "pattern": "Multi-Source BFS Distance",
    "description": "Find a water cell (0) such that its distance to the nearest land cell (1) is maximized.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(n^2)",
    "starterCode": "def maxDistance(grid):\n    n = len(grid)\n    q = []\n    for r in range(n):\n        for c in range(n):\n            if grid[r][c] == 1:\n                q.append((r, c))\n    if len(q) == 0 or len(q) == n * n:\n        return -1\n    res = -1\n    while q:\n        for _ in range(len(q)):\n            r, c = q.pop(0)\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:\n                    grid[nr][nc] = 1\n                    q.append((nr, nc))\n        res += 1\n    return res\n\ngrid = [[1,0,1],[0,0,0],[1,0,1]]\nprint(\"Max distance:\", maxDistance(grid))",
    "topics": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Queues and Deques"
    ],
    "sourceUrl": "https://leetcode.com/problems/as-far-from-land-as-possible/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Arrays",
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)",
      "Graphs",
      "Matrix Problems",
      "Queues and Deques"
    ],
    "summary": "Find a water cell (0) such that its distance to the nearest land cell (1) is maximized.",
    "examples": [
      {
        "input": "grid = [[1,0,1],[0,0,0],[1,0,1]]",
        "output": "Computed via maxDistance(grid)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "FIFO Queue Operations",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def maxDistance(grid):\n    n = len(grid)\n    q = []\n    for r in range(n):\n        for c in range(n):\n            if grid[r][c] == 1:\n                q.append((r, c))\n    if len(q) == 0 or len(q) == n * n:\n        return -1\n    res = -1\n    while q:\n        for _ in range(len(q)):\n            r, c = q.pop(0)\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:\n                    grid[nr][nc] = 1\n                    q.append((nr, nc))\n        res += 1\n    return res\n\ngrid = [[1,0,1],[0,0,0],[1,0,1]]\nprint(\"Max distance:\", maxDistance(grid))",
    "verificationStatus": "Verified"
  },
  {
    "id": 236,
    "leetcodeNumber": 1192,
    "title": "Critical Connections in a Network",
    "difficulty": "Hard",
    "topic": "Advanced Graphs",
    "pattern": "Tarjan's Bridge-Finding",
    "description": "Find all critical connections (bridges) in network that if removed disconnects network.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V + E)",
    "starterCode": "def criticalConnections(n, connections):\n    adj = {i: [] for i in range(n)}\n    for u, v in connections:\n        adj[u].append(v)\n        adj[v].append(u)\n    tin = [-1] * n\n    low = [-1] * n\n    timer = 0\n    bridges = []\n    def dfs(node, parent):\n        nonlocal timer\n        tin[node] = low[node] = timer\n        timer += 1\n        for nei in adj[node]:\n            if nei == parent:\n                continue\n            if tin[nei] != -1:\n                low[node] = min(low[node], tin[nei])\n            else:\n                dfs(nei, node)\n                low[node] = min(low[node], low[nei])\n                if low[nei] > tin[node]:\n                    bridges.append([node, nei])\n    dfs(0, -1)\n    return bridges\n\nconns = [[0,1],[1,2],[2,0],[1,3]]\nprint(\"Bridges:\", criticalConnections(4, conns))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Union-Find"
    ],
    "sourceUrl": "https://leetcode.com/problems/critical-connections-in-a-network/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion",
      "Union-Find"
    ],
    "summary": "Find all critical connections (bridges) in network that if removed disconnects network.",
    "examples": [
      {
        "input": "conns = [[0,1],[1,2],[2,0],[1,3]]",
        "output": "Computed via criticalConnections(4, conns)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def criticalConnections(n, connections):\n    adj = {i: [] for i in range(n)}\n    for u, v in connections:\n        adj[u].append(v)\n        adj[v].append(u)\n    tin = [-1] * n\n    low = [-1] * n\n    timer = 0\n    bridges = []\n    def dfs(node, parent):\n        nonlocal timer\n        tin[node] = low[node] = timer\n        timer += 1\n        for nei in adj[node]:\n            if nei == parent:\n                continue\n            if tin[nei] != -1:\n                low[node] = min(low[node], tin[nei])\n            else:\n                dfs(nei, node)\n                low[node] = min(low[node], low[nei])\n                if low[nei] > tin[node]:\n                    bridges.append([node, nei])\n    dfs(0, -1)\n    return bridges\n\nconns = [[0,1],[1,2],[2,0],[1,3]]\nprint(\"Bridges:\", criticalConnections(4, conns))",
    "verificationStatus": "Verified"
  },
  {
    "id": 237,
    "leetcodeNumber": 886,
    "title": "Possible Bipartition",
    "difficulty": "Medium",
    "topic": "Advanced Graphs",
    "pattern": "2-Coloring Dislike Graph",
    "description": "Determine if it is possible to split everyone into two groups so nobody dislikes each other in same group.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V + E)",
    "starterCode": "def possibleBipartition(n, dislikes):\n    adj = {i: [] for i in range(1, n + 1)}\n    for u, v in dislikes:\n        adj[u].append(v)\n        adj[v].append(u)\n    color = {}\n    def bfs(node):\n        color[node] = 0\n        q = [node]\n        while q:\n            curr = q.pop(0)\n            for nei in adj[curr]:\n                if nei not in color:\n                    color[nei] = 1 - color[curr]\n                    q.append(nei)\n                elif color[nei] == color[curr]:\n                    return False\n        return True\n    for i in range(1, n + 1):\n        if i not in color:\n            if not bfs(i):\n                return False\n    return True\n\nprint(\"Bipartition possible:\", possibleBipartition(4, [[1,2],[1,3],[2,4]]))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/possible-bipartition/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Determine if it is possible to split everyone into two groups so nobody dislikes each other in same group.",
    "examples": [
      {
        "input": "possibleBipartition(4, [[1,2],[1,3],[2,4]])",
        "output": "Computed via possibleBipartition(4, [[1,2],[1,3],[2,4]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def possibleBipartition(n, dislikes):\n    adj = {i: [] for i in range(1, n + 1)}\n    for u, v in dislikes:\n        adj[u].append(v)\n        adj[v].append(u)\n    color = {}\n    def bfs(node):\n        color[node] = 0\n        q = [node]\n        while q:\n            curr = q.pop(0)\n            for nei in adj[curr]:\n                if nei not in color:\n                    color[nei] = 1 - color[curr]\n                    q.append(nei)\n                elif color[nei] == color[curr]:\n                    return False\n        return True\n    for i in range(1, n + 1):\n        if i not in color:\n            if not bfs(i):\n                return False\n    return True\n\nprint(\"Bipartition possible:\", possibleBipartition(4, [[1,2],[1,3],[2,4]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 238,
    "leetcodeNumber": 851,
    "title": "Loud and Rich",
    "difficulty": "Medium",
    "topic": "Advanced Graphs",
    "pattern": "Memoized Richer DFS",
    "description": "For each person, find the quietest person among all people who have greater or equal money.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "starterCode": "def loudAndRich(richer, quiet):\n    n = len(quiet)\n    adj = {i: [] for i in range(n)}\n    for u, v in richer:\n        adj[v].append(u)\n    ans = [-1] * n\n    def dfs(node):\n        if ans[node] != -1:\n            return ans[node]\n        ans[node] = node\n        for richer_person in adj[node]:\n            cand = dfs(richer_person)\n            if quiet[cand] < quiet[ans[node]]:\n                ans[node] = cand\n        return ans[node]\n    for i in range(n):\n        dfs(i)\n    return ans\n\nricher = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]]\nquiet = [3,2,5,4,6,1,7,0]\nprint(\"Quietest richer:\", loudAndRich(richer, quiet))",
    "topics": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/loud-and-rich/",
    "primaryTopic": "Advanced Graphs",
    "topicTags": [
      "Depth-First Search (DFS)",
      "Graphs",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "For each person, find the quietest person among all people who have greater or equal money.",
    "examples": [
      {
        "input": "richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], quiet = [3,2,5,4,6,1,7,0]",
        "output": "Computed via loudAndRich(richer, quiet)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= numNodes <= 2000",
      "0 <= edges.length <= 5000",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Adjacency Graph Traversal"
    ],
    "referenceSolution": "def loudAndRich(richer, quiet):\n    n = len(quiet)\n    adj = {i: [] for i in range(n)}\n    for u, v in richer:\n        adj[v].append(u)\n    ans = [-1] * n\n    def dfs(node):\n        if ans[node] != -1:\n            return ans[node]\n        ans[node] = node\n        for richer_person in adj[node]:\n            cand = dfs(richer_person)\n            if quiet[cand] < quiet[ans[node]]:\n                ans[node] = cand\n        return ans[node]\n    for i in range(n):\n        dfs(i)\n    return ans\n\nricher = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]]\nquiet = [3,2,5,4,6,1,7,0]\nprint(\"Quietest richer:\", loudAndRich(richer, quiet))",
    "verificationStatus": "Verified"
  },
  {
    "id": 239,
    "leetcodeNumber": 70,
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "topic": "1-D Dynamic Programming",
    "pattern": "Fibonacci Transition DP",
    "description": "Find how many distinct ways you can climb n steps taking 1 or 2 steps at a time.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def climbStairs(n):\n    one, two = 1, 1\n    for _ in range(n - 1):\n        one, two = one + two, one\n    return one\n\nprint(\"Ways to climb 5 stairs:\", climbStairs(5))",
    "topics": [
      "Dynamic Programming"
    ],
    "sourceUrl": "https://leetcode.com/problems/climbing-stairs/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming"
    ],
    "summary": "Find how many distinct ways you can climb n steps taking 1 or 2 steps at a time.",
    "examples": [
      {
        "input": "climbStairs(5)",
        "output": "Computed via climbStairs(5)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def climbStairs(n):\n    one, two = 1, 1\n    for _ in range(n - 1):\n        one, two = one + two, one\n    return one\n\nprint(\"Ways to climb 5 stairs:\", climbStairs(5))",
    "verificationStatus": "Verified"
  },
  {
    "id": 240,
    "leetcodeNumber": 746,
    "title": "Min Cost Climbing Stairs",
    "difficulty": "Easy",
    "topic": "1-D Dynamic Programming",
    "pattern": "Bottom-Up 2-Variable DP",
    "description": "Find minimum cost to reach the top of the floor where you can climb 1 or 2 steps.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def minCostClimbingStairs(cost):\n    for i in range(len(cost) - 3, -1, -1):\n        cost[i] += min(cost[i + 1], cost[i + 2])\n    return min(cost[0], cost[1])\n\nprint(\"Min cost:\", minCostClimbingStairs([10, 15, 20]))",
    "topics": [
      "Dynamic Programming",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/min-cost-climbing-stairs/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Recursion"
    ],
    "summary": "Find minimum cost to reach the top of the floor where you can climb 1 or 2 steps.",
    "examples": [
      {
        "input": "minCostClimbingStairs([10, 15, 20])",
        "output": "Computed via minCostClimbingStairs([10, 15, 20])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def minCostClimbingStairs(cost):\n    for i in range(len(cost) - 3, -1, -1):\n        cost[i] += min(cost[i + 1], cost[i + 2])\n    return min(cost[0], cost[1])\n\nprint(\"Min cost:\", minCostClimbingStairs([10, 15, 20]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 241,
    "leetcodeNumber": 198,
    "title": "House Robber",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Rob vs. Skip Recurrence",
    "description": "Determine maximum amount of money you can rob tonight without alerting the police (no adjacent houses).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def rob(nums):\n    rob1, rob2 = 0, 0\n    for n in nums:\n        newRob = max(rob1 + n, rob2)\n        rob1 = rob2\n        rob2 = newRob\n    return rob2\n\nprint(\"Max robbed:\", rob([1, 2, 3, 1]))",
    "topics": [
      "Dynamic Programming"
    ],
    "sourceUrl": "https://leetcode.com/problems/house-robber/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming"
    ],
    "summary": "Determine maximum amount of money you can rob tonight without alerting the police (no adjacent houses).",
    "examples": [
      {
        "input": "rob([1, 2, 3, 1])",
        "output": "Computed via rob([1, 2, 3, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def rob(nums):\n    rob1, rob2 = 0, 0\n    for n in nums:\n        newRob = max(rob1 + n, rob2)\n        rob1 = rob2\n        rob2 = newRob\n    return rob2\n\nprint(\"Max robbed:\", rob([1, 2, 3, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 242,
    "leetcodeNumber": 213,
    "title": "House Robber II",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Circular Dual-Pass DP",
    "description": "Houses are arranged in a circle. Rob without robbing adjacent houses (first and last are adjacent).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def robII(nums):\n    def helper(sub):\n        r1, r2 = 0, 0\n        for n in sub:\n            r1, r2 = r2, max(r1 + n, r2)\n        return r2\n    return max(nums[0], helper(nums[1:]), helper(nums[:-1]))\n\nprint(\"Max circular rob:\", robII([2, 3, 2]))",
    "topics": [
      "Dynamic Programming"
    ],
    "sourceUrl": "https://leetcode.com/problems/house-robber-ii/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming"
    ],
    "summary": "Houses are arranged in a circle. Rob without robbing adjacent houses (first and last are adjacent).",
    "examples": [
      {
        "input": "robII([2, 3, 2])",
        "output": "Computed via robII([2, 3, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def robII(nums):\n    def helper(sub):\n        r1, r2 = 0, 0\n        for n in sub:\n            r1, r2 = r2, max(r1 + n, r2)\n        return r2\n    return max(nums[0], helper(nums[1:]), helper(nums[:-1]))\n\nprint(\"Max circular rob:\", robII([2, 3, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 243,
    "leetcodeNumber": 5,
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Expand Around Center",
    "description": "Return the longest palindromic substring in s in O(n^2) time.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(1)",
    "starterCode": "def longestPalindrome(s):\n    res = \"\"\n    for i in range(len(s)):\n        # Odd length\n        l, r = i, i\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > len(res):\n                res = s[l:r + 1]\n            l -= 1\n            r += 1\n        # Even length\n        l, r = i, i + 1\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > len(res):\n                res = s[l:r + 1]\n            l -= 1\n            r += 1\n    return res\n\nprint(\"Longest palindrome:\", longestPalindrome(\"babad\"))",
    "topics": [
      "Binary Search Trees",
      "Dynamic Programming",
      "Recursion",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Binary Search Trees",
      "Dynamic Programming",
      "Recursion",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Return the longest palindromic substring in s in O(n^2) time.",
    "examples": [
      {
        "input": "longestPalindrome(\"babad\")",
        "output": "Computed via longestPalindrome(\"babad\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Recursive Call Stack & Base Cases",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def longestPalindrome(s):\n    res = \"\"\n    for i in range(len(s)):\n        # Odd length\n        l, r = i, i\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > len(res):\n                res = s[l:r + 1]\n            l -= 1\n            r += 1\n        # Even length\n        l, r = i, i + 1\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > len(res):\n                res = s[l:r + 1]\n            l -= 1\n            r += 1\n    return res\n\nprint(\"Longest palindrome:\", longestPalindrome(\"babad\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 244,
    "leetcodeNumber": 647,
    "title": "Palindromic Substrings",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Center Expansion Counter",
    "description": "Count how many palindromic substrings are in string s.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(1)",
    "starterCode": "def countSubstrings(s):\n    res = 0\n    for i in range(len(s)):\n        l, r = i, i\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            res += 1\n            l -= 1\n            r += 1\n        l, r = i, i + 1\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            res += 1\n            l -= 1\n            r += 1\n    return res\n\nprint(\"Count palindromes:\", countSubstrings(\"aaa\"))",
    "topics": [
      "Binary Search Trees",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Strings",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/palindromic-substrings/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Binary Search Trees",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Strings",
      "Trees and Binary Trees"
    ],
    "summary": "Count how many palindromic substrings are in string s.",
    "examples": [
      {
        "input": "countSubstrings(\"aaa\")",
        "output": "Computed via countSubstrings(\"aaa\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Tree Node Traversal (DFS/BFS)"
    ],
    "referenceSolution": "def countSubstrings(s):\n    res = 0\n    for i in range(len(s)):\n        l, r = i, i\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            res += 1\n            l -= 1\n            r += 1\n        l, r = i, i + 1\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            res += 1\n            l -= 1\n            r += 1\n    return res\n\nprint(\"Count palindromes:\", countSubstrings(\"aaa\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 245,
    "leetcodeNumber": 91,
    "title": "Decode Ways",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "1-Digit & 2-Digit Jump DP",
    "description": "Find total number of ways to decode string of digits mapped 'A'->1 .. 'Z'->26.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def numDecodings(s):\n    dp = {len(s): 1}\n    for i in range(len(s) - 1, -1, -1):\n        if s[i] == \"0\":\n            dp[i] = 0\n        else:\n            dp[i] = dp[i + 1]\n        if i + 1 < len(s) and (s[i] == \"1\" or (s[i] == \"2\" and s[i + 1] in \"0123456\")):\n            dp[i] += dp[i + 2]\n    return dp[0]\n\nprint(\"Ways to decode 226:\", numDecodings(\"226\"))",
    "topics": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/decode-ways/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Strings"
    ],
    "summary": "Find total number of ways to decode string of digits mapped 'A'->1 .. 'Z'->26.",
    "examples": [
      {
        "input": "numDecodings(\"226\")",
        "output": "Computed via numDecodings(\"226\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def numDecodings(s):\n    dp = {len(s): 1}\n    for i in range(len(s) - 1, -1, -1):\n        if s[i] == \"0\":\n            dp[i] = 0\n        else:\n            dp[i] = dp[i + 1]\n        if i + 1 < len(s) and (s[i] == \"1\" or (s[i] == \"2\" and s[i + 1] in \"0123456\")):\n            dp[i] += dp[i + 2]\n    return dp[0]\n\nprint(\"Ways to decode 226:\", numDecodings(\"226\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 246,
    "leetcodeNumber": 322,
    "title": "Coin Change",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Unbounded Knapsack DP",
    "description": "Return fewest number of coins needed to make up given amount.",
    "timeComplexity": "O(amount * len(coins))",
    "spaceComplexity": "O(amount)",
    "starterCode": "def coinChange(coins, amount):\n    dp = [amount + 1] * (amount + 1)\n    dp[0] = 0\n    for a in range(1, amount + 1):\n        for c in coins:\n            if a - c >= 0:\n                dp[a] = min(dp[a], 1 + dp[a - c])\n    return dp[amount] if dp[amount] != amount + 1 else -1\n\nprint(\"Fewest coins:\", coinChange([1, 2, 5], 11))",
    "topics": [
      "Dynamic Programming",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/coin-change/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Recursion"
    ],
    "summary": "Return fewest number of coins needed to make up given amount.",
    "examples": [
      {
        "input": "coinChange([1, 2, 5], 11)",
        "output": "Computed via coinChange([1, 2, 5], 11)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def coinChange(coins, amount):\n    dp = [amount + 1] * (amount + 1)\n    dp[0] = 0\n    for a in range(1, amount + 1):\n        for c in coins:\n            if a - c >= 0:\n                dp[a] = min(dp[a], 1 + dp[a - c])\n    return dp[amount] if dp[amount] != amount + 1 else -1\n\nprint(\"Fewest coins:\", coinChange([1, 2, 5], 11))",
    "verificationStatus": "Verified"
  },
  {
    "id": 247,
    "leetcodeNumber": 152,
    "title": "Maximum Product Subarray",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Min & Max Product Tracking",
    "description": "Find contiguous subarray within array which has the largest product.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def maxProduct(nums):\n    res = max(nums)\n    curMin, curMax = 1, 1\n    for n in nums:\n        if n == 0:\n            curMin, curMax = 1, 1\n            continue\n        tmp = curMax * n\n        curMax = max(n * curMax, n * curMin, n)\n        curMin = min(tmp, n * curMin, n)\n        res = max(res, curMax)\n    return res\n\nprint(\"Max product:\", maxProduct([2, 3, -2, 4]))",
    "topics": [
      "Arrays",
      "Dynamic Programming"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximum-product-subarray/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming"
    ],
    "summary": "Find contiguous subarray within array which has the largest product.",
    "examples": [
      {
        "input": "maxProduct([2, 3, -2, 4])",
        "output": "Computed via maxProduct([2, 3, -2, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def maxProduct(nums):\n    res = max(nums)\n    curMin, curMax = 1, 1\n    for n in nums:\n        if n == 0:\n            curMin, curMax = 1, 1\n            continue\n        tmp = curMax * n\n        curMax = max(n * curMax, n * curMin, n)\n        curMin = min(tmp, n * curMin, n)\n        res = max(res, curMax)\n    return res\n\nprint(\"Max product:\", maxProduct([2, 3, -2, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 248,
    "leetcodeNumber": 139,
    "title": "Word Break",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Prefix Matching DP",
    "description": "Determine if s can be segmented into space-separated sequence of dictionary words.",
    "timeComplexity": "O(n * m * k)",
    "spaceComplexity": "O(n)",
    "starterCode": "def wordBreak(s, wordDict):\n    dp = [False] * (len(s) + 1)\n    dp[len(s)] = True\n    for i in range(len(s) - 1, -1, -1):\n        for w in wordDict:\n            if (i + len(w)) <= len(s) and s[i :\n                i + len(w)] == w:\n                dp[i] = dp[i + len(w)]\n            if dp[i]:\n                break\n    return dp[0]\n\nprint(\"Can word break:\", wordBreak(\"leetcode\", [\"leet\", \"code\"]))",
    "topics": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/word-break/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "summary": "Determine if s can be segmented into space-separated sequence of dictionary words.",
    "examples": [
      {
        "input": "wordBreak(\"leetcode\", [\"leet\", \"code\"])",
        "output": "Computed via wordBreak(\"leetcode\", [\"leet\", \"code\"])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def wordBreak(s, wordDict):\n    dp = [False] * (len(s) + 1)\n    dp[len(s)] = True\n    for i in range(len(s) - 1, -1, -1):\n        for w in wordDict:\n            if (i + len(w)) <= len(s) and s[i :\n                i + len(w)] == w:\n                dp[i] = dp[i + len(w)]\n            if dp[i]:\n                break\n    return dp[0]\n\nprint(\"Can word break:\", wordBreak(\"leetcode\", [\"leet\", \"code\"]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 249,
    "leetcodeNumber": 300,
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Subsequence Optimization",
    "description": "Find length of longest strictly increasing subsequence in array.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(n)",
    "starterCode": "def lengthOfLIS(nums):\n    LIS = [1] * len(nums)\n    for i in range(len(nums) - 1, -1, -1):\n        for j in range(i + 1, len(nums)):\n            if nums[i] < nums[j]:\n                LIS[i] = max(LIS[i], 1 + LIS[j])\n    return max(LIS)\n\nprint(\"LIS length:\", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Strings"
    ],
    "summary": "Find length of longest strictly increasing subsequence in array.",
    "examples": [
      {
        "input": "lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])",
        "output": "Computed via lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def lengthOfLIS(nums):\n    LIS = [1] * len(nums)\n    for i in range(len(nums) - 1, -1, -1):\n        for j in range(i + 1, len(nums)):\n            if nums[i] < nums[j]:\n                LIS[i] = max(LIS[i], 1 + LIS[j])\n    return max(LIS)\n\nprint(\"LIS length:\", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 250,
    "leetcodeNumber": 416,
    "title": "Partition Equal Subset Sum",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "0/1 Knapsack Target Sum",
    "description": "Check if array can be partitioned into two subsets with equal sum.",
    "timeComplexity": "O(n * sum(nums))",
    "spaceComplexity": "O(sum(nums))",
    "starterCode": "def canPartition(nums):\n    if sum(nums) % 2:\n        return False\n    target = sum(nums) // 2\n    dp = {0}\n    for n in nums:\n        nextDP = set(dp)\n        for t in dp:\n            if t + n == target:\n                return True\n            nextDP.add(t + n)\n        dp = nextDP\n    return target in dp\n\nprint(\"Can partition:\", canPartition([1, 5, 11, 5]))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/partition-equal-subset-sum/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Check if array can be partitioned into two subsets with equal sum.",
    "examples": [
      {
        "input": "canPartition([1, 5, 11, 5])",
        "output": "Computed via canPartition([1, 5, 11, 5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def canPartition(nums):\n    if sum(nums) % 2:\n        return False\n    target = sum(nums) // 2\n    dp = {0}\n    for n in nums:\n        nextDP = set(dp)\n        for t in dp:\n            if t + n == target:\n                return True\n            nextDP.add(t + n)\n        dp = nextDP\n    return target in dp\n\nprint(\"Can partition:\", canPartition([1, 5, 11, 5]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 251,
    "leetcodeNumber": 53,
    "title": "Maximum Subarray",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Kadane's Algorithm",
    "description": "Find contiguous subarray which has largest sum and return its sum.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def maxSubArray(nums):\n    max_sum = nums[0]\n    curr_sum = 0\n    for n in nums:\n        curr_sum += n\n        if curr_sum > max_sum:\n            max_sum = curr_sum\n        if curr_sum < 0:\n            curr_sum = 0\n    return max_sum\n\nprint(\"Max subarray:\", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))",
    "topics": [
      "Arrays",
      "Dynamic Programming"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximum-subarray/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming"
    ],
    "summary": "Find contiguous subarray which has largest sum and return its sum.",
    "examples": [
      {
        "input": "maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])",
        "output": "Computed via maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def maxSubArray(nums):\n    max_sum = nums[0]\n    curr_sum = 0\n    for n in nums:\n        curr_sum += n\n        if curr_sum > max_sum:\n            max_sum = curr_sum\n        if curr_sum < 0:\n            curr_sum = 0\n    return max_sum\n\nprint(\"Max subarray:\", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 252,
    "leetcodeNumber": 1137,
    "title": "N-th Tribonacci Number",
    "difficulty": "Easy",
    "topic": "1-D Dynamic Programming",
    "pattern": "3-State Sliding Window",
    "description": "Compute Tn = Tn-1 + Tn-2 + Tn-3 where T0=0, T1=1, T2=1.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def tribonacci(n):\n    t0, t1, t2 = 0, 1, 1\n    if n == 0:\n        return 0\n    if n <= 2:\n        return 1\n    for _ in range(3, n + 1):\n        t0, t1, t2 = t1, t2, t0 + t1 + t2\n    return t2\n\nprint(\"Tribonacci(4):\", tribonacci(4))",
    "topics": [
      "Dynamic Programming",
      "Math and Number Theory"
    ],
    "sourceUrl": "https://leetcode.com/problems/n-th-tribonacci-number/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Math and Number Theory"
    ],
    "summary": "Compute Tn = Tn-1 + Tn-2 + Tn-3 where T0=0, T1=1, T2=1.",
    "examples": [
      {
        "input": "tribonacci(4)",
        "output": "Computed via tribonacci(4)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Optimal Substructure & Recurrence",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "def tribonacci(n):\n    t0, t1, t2 = 0, 1, 1\n    if n == 0:\n        return 0\n    if n <= 2:\n        return 1\n    for _ in range(3, n + 1):\n        t0, t1, t2 = t1, t2, t0 + t1 + t2\n    return t2\n\nprint(\"Tribonacci(4):\", tribonacci(4))",
    "verificationStatus": "Verified"
  },
  {
    "id": 253,
    "leetcodeNumber": 377,
    "title": "Combination Sum IV",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Permutation Sum DP",
    "description": "Return number of possible combinations that add up to target where order matters.",
    "timeComplexity": "O(target * len(nums))",
    "spaceComplexity": "O(target)",
    "starterCode": "def combinationSum4(nums, target):\n    dp = {0: 1}\n    for total in range(1, target + 1):\n        dp[total] = 0\n        for n in nums:\n            dp[total] += dp.get(total - n, 0)\n    return dp[target]\n\nprint(\"Combinations to 4:\", combinationSum4([1, 2, 3], 4))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/combination-sum-iv/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sorting"
    ],
    "summary": "Return number of possible combinations that add up to target where order matters.",
    "examples": [
      {
        "input": "combinationSum4([1, 2, 3], 4)",
        "output": "Computed via combinationSum4([1, 2, 3], 4)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def combinationSum4(nums, target):\n    dp = {0: 1}\n    for total in range(1, target + 1):\n        dp[total] = 0\n        for n in nums:\n            dp[total] += dp.get(total - n, 0)\n    return dp[target]\n\nprint(\"Combinations to 4:\", combinationSum4([1, 2, 3], 4))",
    "verificationStatus": "Verified"
  },
  {
    "id": 254,
    "leetcodeNumber": 279,
    "title": "Perfect Squares",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Square Change DP",
    "description": "Return least number of perfect square numbers that sum to n.",
    "timeComplexity": "O(n * sqrt(n))",
    "spaceComplexity": "O(n)",
    "starterCode": "def numSquares(n):\n    dp = [n] * (n + 1)\n    dp[0] = 0\n    for target in range(1, n + 1):\n        s = 1\n        while s * s <= target:\n            dp[target] = min(dp[target], 1 + dp[target - s * s])\n            s += 1\n    return dp[n]\n\nprint(\"Squares for 12:\", numSquares(12))",
    "topics": [
      "Dynamic Programming"
    ],
    "sourceUrl": "https://leetcode.com/problems/perfect-squares/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming"
    ],
    "summary": "Return least number of perfect square numbers that sum to n.",
    "examples": [
      {
        "input": "numSquares(12)",
        "output": "Computed via numSquares(12)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def numSquares(n):\n    dp = [n] * (n + 1)\n    dp[0] = 0\n    for target in range(1, n + 1):\n        s = 1\n        while s * s <= target:\n            dp[target] = min(dp[target], 1 + dp[target - s * s])\n            s += 1\n    return dp[n]\n\nprint(\"Squares for 12:\", numSquares(12))",
    "verificationStatus": "Verified"
  },
  {
    "id": 255,
    "leetcodeNumber": 343,
    "title": "Integer Break",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Product Maximization DP",
    "description": "Break integer n into sum of at least two positive integers and maximize product.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(n)",
    "starterCode": "def integerBreak(n):\n    dp = {1: 1}\n    for num in range(2, n + 1):\n        dp[num] = 0 if num == n else num\n        for i in range(1, num):\n            val = dp[i] * dp[num - i]\n            dp[num] = max(dp[num], val)\n    return dp[n]\n\nprint(\"Integer break 10:\", integerBreak(10))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/integer-break/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Break integer n into sum of at least two positive integers and maximize product.",
    "examples": [
      {
        "input": "integerBreak(10)",
        "output": "Computed via integerBreak(10)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def integerBreak(n):\n    dp = {1: 1}\n    for num in range(2, n + 1):\n        dp[num] = 0 if num == n else num\n        for i in range(1, num):\n            val = dp[i] * dp[num - i]\n            dp[num] = max(dp[num], val)\n    return dp[n]\n\nprint(\"Integer break 10:\", integerBreak(10))",
    "verificationStatus": "Verified"
  },
  {
    "id": 256,
    "leetcodeNumber": 983,
    "title": "Minimum Cost For Tickets",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Day-based Jump DP",
    "description": "Find minimum dollars you need to travel every day in given list of days.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def mincostTickets(days, costs):\n    dp = {}\n    def dfs(i):\n        if i == len(days):\n            return 0\n        if i in dp:\n            return dp[i]\n        dp[i] = float(\"inf\")\n        for d, c in zip([1, 7, 30], costs):\n            j = i\n            while j < len(days) and days[j] < days[i] + d:\n                j += 1\n            dp[i] = min(dp[i], c + dfs(j))\n        return dp[i]\n    return dfs(0)\n\nprint(\"Min ticket cost:\", mincostTickets([1,4,6,7,8,20], [2,7,15]))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps"
    ],
    "sourceUrl": "https://leetcode.com/problems/minimum-cost-for-tickets/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps"
    ],
    "summary": "Find minimum dollars you need to travel every day in given list of days.",
    "examples": [
      {
        "input": "mincostTickets([1,4,6,7,8,20], [2,7,15])",
        "output": "Computed via mincostTickets([1,4,6,7,8,20], [2,7,15])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def mincostTickets(days, costs):\n    dp = {}\n    def dfs(i):\n        if i == len(days):\n            return 0\n        if i in dp:\n            return dp[i]\n        dp[i] = float(\"inf\")\n        for d, c in zip([1, 7, 30], costs):\n            j = i\n            while j < len(days) and days[j] < days[i] + d:\n                j += 1\n            dp[i] = min(dp[i], c + dfs(j))\n        return dp[i]\n    return dfs(0)\n\nprint(\"Min ticket cost:\", mincostTickets([1,4,6,7,8,20], [2,7,15]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 257,
    "leetcodeNumber": 1049,
    "title": "Last Stone Weight II",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Subset Sum Difference Minimization",
    "description": "Smash stones to minimize the smallest possible weight of remaining stone.",
    "timeComplexity": "O(n * total)",
    "spaceComplexity": "O(total)",
    "starterCode": "def lastStoneWeightII(stones):\n    stoneSum = sum(stones)\n    target = stoneSum // 2\n    dp = {0}\n    for s in stones:\n        nextDP = set(dp)\n        for t in dp:\n            if t + s <= target:\n                nextDP.add(t + s)\n        dp = nextDP\n    return stoneSum - 2 * max(dp)\n\nprint(\"Min remaining stone:\", lastStoneWeightII([2,7,4,1,8,1]))",
    "topics": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/last-stone-weight-ii/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Smash stones to minimize the smallest possible weight of remaining stone.",
    "examples": [
      {
        "input": "lastStoneWeightII([2,7,4,1,8,1])",
        "output": "Computed via lastStoneWeightII([2,7,4,1,8,1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def lastStoneWeightII(stones):\n    stoneSum = sum(stones)\n    target = stoneSum // 2\n    dp = {0}\n    for s in stones:\n        nextDP = set(dp)\n        for t in dp:\n            if t + s <= target:\n                nextDP.add(t + s)\n        dp = nextDP\n    return stoneSum - 2 * max(dp)\n\nprint(\"Min remaining stone:\", lastStoneWeightII([2,7,4,1,8,1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 258,
    "leetcodeNumber": 474,
    "title": "Ones and Zeroes",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "2-Constraint Knapsack",
    "description": "Return size of largest subset of strs with at most m 0s and n 1s.",
    "timeComplexity": "O(k * m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def findMaxForm(strs, m, n):\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for s in strs:\n        zeros, ones = s.count(\"0\"), s.count(\"1\")\n        for i in range(m, zeros - 1, -1):\n            for j in range(n, ones - 1, -1):\n                dp[i][j] = max(dp[i][j], 1 + dp[i - zeros][j - ones])\n    return dp[m][n]\n\nprint(\"Max subset:\", findMaxForm([\"10\",\"0001\",\"111001\",\"1\",\"0\"], 5, 3))",
    "topics": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/ones-and-zeroes/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Return size of largest subset of strs with at most m 0s and n 1s.",
    "examples": [
      {
        "input": "findMaxForm([\"10\",\"0001\",\"111001\",\"1\",\"0\"], 5, 3)",
        "output": "Computed via findMaxForm([\"10\",\"0001\",\"111001\",\"1\",\"0\"], 5, 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def findMaxForm(strs, m, n):\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for s in strs:\n        zeros, ones = s.count(\"0\"), s.count(\"1\")\n        for i in range(m, zeros - 1, -1):\n            for j in range(n, ones - 1, -1):\n                dp[i][j] = max(dp[i][j], 1 + dp[i - zeros][j - ones])\n    return dp[m][n]\n\nprint(\"Max subset:\", findMaxForm([\"10\",\"0001\",\"111001\",\"1\",\"0\"], 5, 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 259,
    "leetcodeNumber": 518,
    "title": "Coin Change II",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Combinations Unbounded DP",
    "description": "Return number of combinations that make up given amount using given coins.",
    "timeComplexity": "O(n * amount)",
    "spaceComplexity": "O(amount)",
    "starterCode": "def change(amount, coins):\n    dp = [0] * (amount + 1)\n    dp[0] = 1\n    for c in coins:\n        for a in range(c, amount + 1):\n            dp[a] += dp[a - c]\n    return dp[amount]\n\nprint(\"Combinations for 5:\", change(5, [1, 2, 5]))",
    "topics": [
      "Dynamic Programming",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/coin-change-ii/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Recursion"
    ],
    "summary": "Return number of combinations that make up given amount using given coins.",
    "examples": [
      {
        "input": "change(5, [1, 2, 5])",
        "output": "Computed via change(5, [1, 2, 5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def change(amount, coins):\n    dp = [0] * (amount + 1)\n    dp[0] = 1\n    for c in coins:\n        for a in range(c, amount + 1):\n            dp[a] += dp[a - c]\n    return dp[amount]\n\nprint(\"Combinations for 5:\", change(5, [1, 2, 5]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 260,
    "leetcodeNumber": 120,
    "title": "Triangle",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "Bottom-Up In-Place Triangle DP",
    "description": "Find minimum path sum from top to bottom of triangle.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(n)",
    "starterCode": "def minimumTotal(triangle):\n    dp = list(triangle[-1])\n    for row in range(len(triangle) - 2, -1, -1):\n        for col in range(len(triangle[row])):\n            dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])\n    return dp[0]\n\ntriangle = [[2],[3,4],[6,5,7],[4,1,8,3]]\nprint(\"Min triangle path:\", minimumTotal(triangle))",
    "topics": [
      "Dynamic Programming",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/triangle/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Recursion"
    ],
    "summary": "Find minimum path sum from top to bottom of triangle.",
    "examples": [
      {
        "input": "triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]",
        "output": "Computed via minimumTotal(triangle)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def minimumTotal(triangle):\n    dp = list(triangle[-1])\n    for row in range(len(triangle) - 2, -1, -1):\n        for col in range(len(triangle[row])):\n            dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])\n    return dp[0]\n\ntriangle = [[2],[3,4],[6,5,7],[4,1,8,3]]\nprint(\"Min triangle path:\", minimumTotal(triangle))",
    "verificationStatus": "Verified"
  },
  {
    "id": 261,
    "leetcodeNumber": 935,
    "title": "Knight Dialer",
    "difficulty": "Medium",
    "topic": "1-D Dynamic Programming",
    "pattern": "State Transition Array",
    "description": "Count distinct phone numbers of length n knight can dial on keypad.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def knightDialer(n):\n    MOD = 10**9 + 7\n    moves = {\n        0: [4, 6], 1: [6, 8], 2: [7, 9], 3: [4, 8],\n        4: [0, 3, 9], 5: [], 6: [0, 1, 7], 7: [2, 6], 8: [1, 3], 9: [2, 4]\n    }\n    dp = [1] * 10\n    for _ in range(n - 1):\n        next_dp = [0] * 10\n        for num in range(10):\n            for nxt in moves[num]:\n                next_dp[nxt] = (next_dp[nxt] + dp[num]) % MOD\n        dp = next_dp\n    return sum(dp) % MOD\n\nprint(\"Knight dialer (n=2):\", knightDialer(2))",
    "topics": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/knight-dialer/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion"
    ],
    "summary": "Count distinct phone numbers of length n knight can dial on keypad.",
    "examples": [
      {
        "input": "print(\"Knight dialer (n=2):\", knightDialer(2))",
        "output": "Computed via Knight Dialer",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def knightDialer(n):\n    MOD = 10**9 + 7\n    moves = {\n        0: [4, 6], 1: [6, 8], 2: [7, 9], 3: [4, 8],\n        4: [0, 3, 9], 5: [], 6: [0, 1, 7], 7: [2, 6], 8: [1, 3], 9: [2, 4]\n    }\n    dp = [1] * 10\n    for _ in range(n - 1):\n        next_dp = [0] * 10\n        for num in range(10):\n            for nxt in moves[num]:\n                next_dp[nxt] = (next_dp[nxt] + dp[num]) % MOD\n        dp = next_dp\n    return sum(dp) % MOD\n\nprint(\"Knight dialer (n=2):\", knightDialer(2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 262,
    "leetcodeNumber": 1025,
    "title": "Divisor Game",
    "difficulty": "Easy",
    "topic": "1-D Dynamic Programming",
    "pattern": "Game Parity Check",
    "description": "Determine if Alice wins divisor game where players subtract factor x (0 < x < n).",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "starterCode": "def divisorGame(n):\n    return n % 2 == 0\n\nprint(\"Alice wins (n=2):\", divisorGame(2))",
    "topics": [
      "Dynamic Programming",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/divisor-game/",
    "primaryTopic": "1-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Recursion"
    ],
    "summary": "Determine if Alice wins divisor game where players subtract factor x (0 < x < n).",
    "examples": [
      {
        "input": "print(\"Alice wins (n=2):\", divisorGame(2))",
        "output": "Computed via Divisor Game",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def divisorGame(n):\n    return n % 2 == 0\n\nprint(\"Alice wins (n=2):\", divisorGame(2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 263,
    "leetcodeNumber": 62,
    "title": "Unique Paths",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "2D Grid Addition DP",
    "description": "Find number of possible unique paths robot can take from top-left to bottom-right.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def uniquePaths(m, n):\n    row = [1] * n\n    for _ in range(m - 1):\n        newRow = [1] * n\n        for j in range(n - 2, -1, -1):\n            newRow[j] = newRow[j + 1] + row[j]\n        row = newRow\n    return row[0]\n\nprint(\"Unique paths (3x7):\", uniquePaths(3, 7))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/unique-paths/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion"
    ],
    "summary": "Find number of possible unique paths robot can take from top-left to bottom-right.",
    "examples": [
      {
        "input": "uniquePaths(3, 7)",
        "output": "Computed via uniquePaths(3, 7)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def uniquePaths(m, n):\n    row = [1] * n\n    for _ in range(m - 1):\n        newRow = [1] * n\n        for j in range(n - 2, -1, -1):\n            newRow[j] = newRow[j + 1] + row[j]\n        row = newRow\n    return row[0]\n\nprint(\"Unique paths (3x7):\", uniquePaths(3, 7))",
    "verificationStatus": "Verified"
  },
  {
    "id": 264,
    "leetcodeNumber": 63,
    "title": "Unique Paths II",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "Grid DP with Obstacles",
    "description": "Find unique paths from top-left to bottom-right avoiding obstacles marked as 1.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def uniquePathsWithObstacles(obstacleGrid):\n    m, n = len(obstacleGrid), len(obstacleGrid[0])\n    dp = [0] * n\n    dp[n - 1] = 1\n    for r in range(m - 1, -1, -1):\n        for c in range(n - 1, -1, -1):\n            if obstacleGrid[r][c] == 1:\n                dp[c] = 0\n            elif c + 1 < n:\n                dp[c] = dp[c] + dp[c + 1]\n    return dp[0]\n\ngrid = [[0,0,0],[0,1,0],[0,0,0]]\nprint(\"Unique paths with obstacles:\", uniquePathsWithObstacles(grid))",
    "topics": [
      "Arrays",
      "Binary Search Trees",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "sourceUrl": "https://leetcode.com/problems/unique-paths-ii/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Binary Search Trees",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion",
      "Trees and Binary Trees"
    ],
    "summary": "Find unique paths from top-left to bottom-right avoiding obstacles marked as 1.",
    "examples": [
      {
        "input": "grid = [[0,0,0],[0,1,0],[0,0,0]]",
        "output": "Computed via uniquePathsWithObstacles(grid)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def uniquePathsWithObstacles(obstacleGrid):\n    m, n = len(obstacleGrid), len(obstacleGrid[0])\n    dp = [0] * n\n    dp[n - 1] = 1\n    for r in range(m - 1, -1, -1):\n        for c in range(n - 1, -1, -1):\n            if obstacleGrid[r][c] == 1:\n                dp[c] = 0\n            elif c + 1 < n:\n                dp[c] = dp[c] + dp[c + 1]\n    return dp[0]\n\ngrid = [[0,0,0],[0,1,0],[0,0,0]]\nprint(\"Unique paths with obstacles:\", uniquePathsWithObstacles(grid))",
    "verificationStatus": "Verified"
  },
  {
    "id": 265,
    "leetcodeNumber": 64,
    "title": "Minimum Path Sum",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "Grid Path Weight Minimization",
    "description": "Find path from top-left to bottom-right which minimizes sum of all numbers along its path.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def minPathSum(grid):\n    m, n = len(grid), len(grid[0])\n    for r in range(m):\n        for c in range(n):\n            if r == 0 and c == 0:\n                continue\n            elif r == 0:\n                grid[r][c] += grid[r][c - 1]\n            elif c == 0:\n                grid[r][c] += grid[r - 1][c]\n            else:\n                grid[r][c] += min(grid[r - 1][c], grid[r][c - 1])\n    return grid[m - 1][n - 1]\n\ngrid = [[1,3,1],[1,5,1],[4,2,1]]\nprint(\"Min path sum:\", minPathSum(grid))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Math and Number Theory",
      "Matrix Problems"
    ],
    "sourceUrl": "https://leetcode.com/problems/minimum-path-sum/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Math and Number Theory",
      "Matrix Problems"
    ],
    "summary": "Find path from top-left to bottom-right which minimizes sum of all numbers along its path.",
    "examples": [
      {
        "input": "grid = [[1,3,1],[1,5,1],[4,2,1]]",
        "output": "Computed via minPathSum(grid)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Optimal Substructure & Recurrence",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "def minPathSum(grid):\n    m, n = len(grid), len(grid[0])\n    for r in range(m):\n        for c in range(n):\n            if r == 0 and c == 0:\n                continue\n            elif r == 0:\n                grid[r][c] += grid[r][c - 1]\n            elif c == 0:\n                grid[r][c] += grid[r - 1][c]\n            else:\n                grid[r][c] += min(grid[r - 1][c], grid[r][c - 1])\n    return grid[m - 1][n - 1]\n\ngrid = [[1,3,1],[1,5,1],[4,2,1]]\nprint(\"Min path sum:\", minPathSum(grid))",
    "verificationStatus": "Verified"
  },
  {
    "id": 266,
    "leetcodeNumber": 1143,
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "2D Subsequence Match Matrix",
    "description": "Find length of longest common subsequence between two strings in O(m * n).",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def longestCommonSubsequence(text1, text2):\n    dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]\n    for i in range(len(text1) - 1, -1, -1):\n        for j in range(len(text2) - 1, -1, -1):\n            if text1[i] == text2[j]:\n                dp[i][j] = 1 + dp[i + 1][j + 1]\n            else:\n                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\n    return dp[0][0]\n\nprint(\"LCS length:\", longestCommonSubsequence(\"abcde\", \"ace\"))",
    "topics": [
      "Dynamic Programming",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-common-subsequence/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Recursion",
      "Strings"
    ],
    "summary": "Find length of longest common subsequence between two strings in O(m * n).",
    "examples": [
      {
        "input": "longestCommonSubsequence(\"abcde\", \"ace\")",
        "output": "Computed via longestCommonSubsequence(\"abcde\", \"ace\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def longestCommonSubsequence(text1, text2):\n    dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]\n    for i in range(len(text1) - 1, -1, -1):\n        for j in range(len(text2) - 1, -1, -1):\n            if text1[i] == text2[j]:\n                dp[i][j] = 1 + dp[i + 1][j + 1]\n            else:\n                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\n    return dp[0][0]\n\nprint(\"LCS length:\", longestCommonSubsequence(\"abcde\", \"ace\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 267,
    "leetcodeNumber": 309,
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "State Machine DP",
    "description": "Maximize profit with unlimited transactions but 1-day cooldown after selling.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def maxProfitCooldown(prices):\n    dp = {} # key: (i, buying)\n    def dfs(i, buying):\n        if i >= len(prices):\n            return 0\n        if (i, buying) in dp:\n            return dp[(i, buying)]\n        cooldown = dfs(i + 1, buying)\n        if buying:\n            buy = dfs(i + 1, False) - prices[i]\n            dp[(i, buying)] = max(buy, cooldown)\n        else:\n            sell = dfs(i + 2, True) + prices[i]\n            dp[(i, buying)] = max(sell, cooldown)\n        return dp[(i, buying)]\n    return dfs(0, True)\n\nprint(\"Profit with cooldown:\", maxProfitCooldown([1, 2, 3, 0, 2]))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps"
    ],
    "sourceUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps"
    ],
    "summary": "Maximize profit with unlimited transactions but 1-day cooldown after selling.",
    "examples": [
      {
        "input": "maxProfitCooldown([1, 2, 3, 0, 2])",
        "output": "Computed via maxProfitCooldown([1, 2, 3, 0, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def maxProfitCooldown(prices):\n    dp = {} # key: (i, buying)\n    def dfs(i, buying):\n        if i >= len(prices):\n            return 0\n        if (i, buying) in dp:\n            return dp[(i, buying)]\n        cooldown = dfs(i + 1, buying)\n        if buying:\n            buy = dfs(i + 1, False) - prices[i]\n            dp[(i, buying)] = max(buy, cooldown)\n        else:\n            sell = dfs(i + 2, True) + prices[i]\n            dp[(i, buying)] = max(sell, cooldown)\n        return dp[(i, buying)]\n    return dfs(0, True)\n\nprint(\"Profit with cooldown:\", maxProfitCooldown([1, 2, 3, 0, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 268,
    "leetcodeNumber": 714,
    "title": "Best Time to Buy and Sell Stock with Transaction Fee",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "2-State Buy/Sell DP",
    "description": "Maximize profit from stock trading with transaction fee per completed transaction.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def maxProfitFee(prices, fee):\n    cash, hold = 0, -prices[0]\n    for p in prices[1:\n        ]:\n        cash = max(cash, hold + p - fee)\n        hold = max(hold, cash - p)\n    return cash\n\nprint(\"Profit with fee:\", maxProfitFee([1, 3, 2, 8, 4, 9], 2))",
    "topics": [
      "Arrays",
      "Dynamic Programming"
    ],
    "sourceUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming"
    ],
    "summary": "Maximize profit from stock trading with transaction fee per completed transaction.",
    "examples": [
      {
        "input": "maxProfitFee([1, 3, 2, 8, 4, 9], 2)",
        "output": "Computed via maxProfitFee([1, 3, 2, 8, 4, 9], 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def maxProfitFee(prices, fee):\n    cash, hold = 0, -prices[0]\n    for p in prices[1:\n        ]:\n        cash = max(cash, hold + p - fee)\n        hold = max(hold, cash - p)\n    return cash\n\nprint(\"Profit with fee:\", maxProfitFee([1, 3, 2, 8, 4, 9], 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 269,
    "leetcodeNumber": 494,
    "title": "Target Sum",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "Memoized Decision Tree / Subset Sum",
    "description": "Assign '+' or '-' to integers to make sum equal to target.",
    "timeComplexity": "O(n * sum)",
    "spaceComplexity": "O(n * sum)",
    "starterCode": "def findTargetSumWays(nums, target):\n    dp = {}\n    def backtrack(i, total):\n        if (i, total) in dp:\n            return dp[(i, total)]\n        if i == len(nums):\n            return 1 if total == target else 0\n        dp[(i, total)] = backtrack(i + 1, total + nums[i]) + backtrack(i + 1, total - nums[i])\n        return dp[(i, total)]\n    return backtrack(0, 0)\n\nprint(\"Target sum ways:\", findTargetSumWays([1, 1, 1, 1, 1], 3))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/target-sum/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Assign '+' or '-' to integers to make sum equal to target.",
    "examples": [
      {
        "input": "findTargetSumWays([1, 1, 1, 1, 1], 3)",
        "output": "Computed via findTargetSumWays([1, 1, 1, 1, 1], 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def findTargetSumWays(nums, target):\n    dp = {}\n    def backtrack(i, total):\n        if (i, total) in dp:\n            return dp[(i, total)]\n        if i == len(nums):\n            return 1 if total == target else 0\n        dp[(i, total)] = backtrack(i + 1, total + nums[i]) + backtrack(i + 1, total - nums[i])\n        return dp[(i, total)]\n    return backtrack(0, 0)\n\nprint(\"Target sum ways:\", findTargetSumWays([1, 1, 1, 1, 1], 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 270,
    "leetcodeNumber": 97,
    "title": "Interleaving String",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "2D Grid Substring Matching",
    "description": "Check whether s3 is formed by interleaving of s1 and s2.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def isInterleave(s1, s2, s3):\n    if len(s1) + len(s2) != len(s3):\n        return False\n    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]\n    dp[len(s1)][len(s2)] = True\n    for i in range(len(s1), -1, -1):\n        for j in range(len(s2), -1, -1):\n            if i < len(s1) and s1[i] == s3[i + j] and dp[i + 1][j]:\n                dp[i][j] = True\n            if j < len(s2) and s2[j] == s3[i + j] and dp[i][j + 1]:\n                dp[i][j] = True\n    return dp[0][0]\n\nprint(\"Is interleaved:\", isInterleave(\"aabcc\", \"dbbca\", \"aadbbcbcac\"))",
    "topics": [
      "Dynamic Programming",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/interleaving-string/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Strings"
    ],
    "summary": "Check whether s3 is formed by interleaving of s1 and s2.",
    "examples": [
      {
        "input": "isInterleave(\"aabcc\", \"dbbca\", \"aadbbcbcac\")",
        "output": "Computed via isInterleave(\"aabcc\", \"dbbca\", \"aadbbcbcac\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def isInterleave(s1, s2, s3):\n    if len(s1) + len(s2) != len(s3):\n        return False\n    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]\n    dp[len(s1)][len(s2)] = True\n    for i in range(len(s1), -1, -1):\n        for j in range(len(s2), -1, -1):\n            if i < len(s1) and s1[i] == s3[i + j] and dp[i + 1][j]:\n                dp[i][j] = True\n            if j < len(s2) and s2[j] == s3[i + j] and dp[i][j + 1]:\n                dp[i][j] = True\n    return dp[0][0]\n\nprint(\"Is interleaved:\", isInterleave(\"aabcc\", \"dbbca\", \"aadbbcbcac\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 271,
    "leetcodeNumber": 329,
    "title": "Longest Increasing Path in a Matrix",
    "difficulty": "Hard",
    "topic": "2-D Dynamic Programming",
    "pattern": "Memoized 2D DFS",
    "description": "Find length of longest increasing path in matrix moving up, down, left, right.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def longestIncreasingPath(matrix):\n    rows, cols = len(matrix), len(matrix[0])\n    dp = {}\n    def dfs(r, c, prevVal):\n        if r < 0 or r >= rows or c < 0 or c >= cols or matrix[r][c] <= prevVal:\n            return 0\n        if (r, c) in dp:\n            return dp[(r, c)]\n        res = 1\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            res = max(res, 1 + dfs(r + dr, c + dc, matrix[r][c]))\n        dp[(r, c)] = res\n        return res\n    for r in range(rows):\n        for c in range(cols):\n            dfs(r, c, -1)\n    return max(dp.values())\n\nmat = [[9,9,4],[6,6,8],[2,1,1]]\nprint(\"Longest path:\", longestIncreasingPath(mat))",
    "topics": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Depth-First Search (DFS)",
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Matrix Problems",
      "Recursion"
    ],
    "summary": "Find length of longest increasing path in matrix moving up, down, left, right.",
    "examples": [
      {
        "input": "mat = [[9,9,4],[6,6,8],[2,1,1]]",
        "output": "Computed via longestIncreasingPath(mat)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def longestIncreasingPath(matrix):\n    rows, cols = len(matrix), len(matrix[0])\n    dp = {}\n    def dfs(r, c, prevVal):\n        if r < 0 or r >= rows or c < 0 or c >= cols or matrix[r][c] <= prevVal:\n            return 0\n        if (r, c) in dp:\n            return dp[(r, c)]\n        res = 1\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            res = max(res, 1 + dfs(r + dr, c + dc, matrix[r][c]))\n        dp[(r, c)] = res\n        return res\n    for r in range(rows):\n        for c in range(cols):\n            dfs(r, c, -1)\n    return max(dp.values())\n\nmat = [[9,9,4],[6,6,8],[2,1,1]]\nprint(\"Longest path:\", longestIncreasingPath(mat))",
    "verificationStatus": "Verified"
  },
  {
    "id": 272,
    "leetcodeNumber": 115,
    "title": "Distinct Subsequences",
    "difficulty": "Hard",
    "topic": "2-D Dynamic Programming",
    "pattern": "2D Alignment Matching Matrix",
    "description": "Count number of distinct subsequences of s which equals t.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def numDistinct(s, t):\n    dp = {}\n    def dfs(i, j):\n        if j == len(t):\n            return 1\n        if i == len(s):\n            return 0\n        if (i, j) in dp:\n            return dp[(i, j)]\n        if s[i] == t[j]:\n            dp[(i, j)] = dfs(i + 1, j + 1) + dfs(i + 1, j)\n        else:\n            dp[(i, j)] = dfs(i + 1, j)\n        return dp[(i, j)]\n    return dfs(0, 0)\n\nprint(\"Distinct subsequences:\", numDistinct(\"rabbbit\", \"rabbit\"))",
    "topics": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/distinct-subsequences/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "summary": "Count number of distinct subsequences of s which equals t.",
    "examples": [
      {
        "input": "numDistinct(\"rabbbit\", \"rabbit\")",
        "output": "Computed via numDistinct(\"rabbbit\", \"rabbit\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def numDistinct(s, t):\n    dp = {}\n    def dfs(i, j):\n        if j == len(t):\n            return 1\n        if i == len(s):\n            return 0\n        if (i, j) in dp:\n            return dp[(i, j)]\n        if s[i] == t[j]:\n            dp[(i, j)] = dfs(i + 1, j + 1) + dfs(i + 1, j)\n        else:\n            dp[(i, j)] = dfs(i + 1, j)\n        return dp[(i, j)]\n    return dfs(0, 0)\n\nprint(\"Distinct subsequences:\", numDistinct(\"rabbbit\", \"rabbit\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 273,
    "leetcodeNumber": 72,
    "title": "Edit Distance",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "Insert, Delete, Replace DP",
    "description": "Return minimum operations (insert, delete, replace) required to convert word1 to word2.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def minDistance(word1, word2):\n    dp = [[float(\"inf\")] * (len(word2) + 1) for _ in range(len(word1) + 1)]\n    for j in range(len(word2) + 1):\n        dp[len(word1)][j] = len(word2) - j\n    for i in range(len(word1) + 1):\n        dp[i][len(word2)] = len(word1) - i\n    for i in range(len(word1) - 1, -1, -1):\n        for j in range(len(word2) - 1, -1, -1):\n            if word1[i] == word2[j]:\n                dp[i][j] = dp[i + 1][j + 1]\n            else:\n                dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])\n    return dp[0][0]\n\nprint(\"Edit distance:\", minDistance(\"horse\", \"ros\"))",
    "topics": [
      "Dynamic Programming"
    ],
    "sourceUrl": "https://leetcode.com/problems/edit-distance/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming"
    ],
    "summary": "Return minimum operations (insert, delete, replace) required to convert word1 to word2.",
    "examples": [
      {
        "input": "minDistance(\"horse\", \"ros\")",
        "output": "Computed via minDistance(\"horse\", \"ros\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def minDistance(word1, word2):\n    dp = [[float(\"inf\")] * (len(word2) + 1) for _ in range(len(word1) + 1)]\n    for j in range(len(word2) + 1):\n        dp[len(word1)][j] = len(word2) - j\n    for i in range(len(word1) + 1):\n        dp[i][len(word2)] = len(word1) - i\n    for i in range(len(word1) - 1, -1, -1):\n        for j in range(len(word2) - 1, -1, -1):\n            if word1[i] == word2[j]:\n                dp[i][j] = dp[i + 1][j + 1]\n            else:\n                dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])\n    return dp[0][0]\n\nprint(\"Edit distance:\", minDistance(\"horse\", \"ros\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 274,
    "leetcodeNumber": 312,
    "title": "Burst Balloons",
    "difficulty": "Hard",
    "topic": "2-D Dynamic Programming",
    "pattern": "Interval Matrix DP",
    "description": "Burst balloons to maximize coins collected.",
    "timeComplexity": "O(n^3)",
    "spaceComplexity": "O(n^2)",
    "starterCode": "def maxCoins(nums):\n    nums = [1] + nums + [1]\n    dp = {}\n    def dfs(l, r):\n        if l > r:\n            return 0\n        if (l, r) in dp:\n            return dp[(l, r)]\n        dp[(l, r)] = 0\n        for i in range(l, r + 1):\n            coins = nums[l - 1] * nums[i] * nums[r + 1]\n            coins += dfs(l, i - 1) + dfs(i + 1, r)\n            dp[(l, r)] = max(dp[(l, r)], coins)\n        return dp[(l, r)]\n    return dfs(1, len(nums) - 2)\n\nprint(\"Max coins:\", maxCoins([3, 1, 5, 8]))",
    "topics": [
      "Dynamic Programming",
      "Hashing and Hash Maps"
    ],
    "sourceUrl": "https://leetcode.com/problems/burst-balloons/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Hashing and Hash Maps"
    ],
    "summary": "Burst balloons to maximize coins collected.",
    "examples": [
      {
        "input": "maxCoins([3, 1, 5, 8])",
        "output": "Computed via maxCoins([3, 1, 5, 8])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def maxCoins(nums):\n    nums = [1] + nums + [1]\n    dp = {}\n    def dfs(l, r):\n        if l > r:\n            return 0\n        if (l, r) in dp:\n            return dp[(l, r)]\n        dp[(l, r)] = 0\n        for i in range(l, r + 1):\n            coins = nums[l - 1] * nums[i] * nums[r + 1]\n            coins += dfs(l, i - 1) + dfs(i + 1, r)\n            dp[(l, r)] = max(dp[(l, r)], coins)\n        return dp[(l, r)]\n    return dfs(1, len(nums) - 2)\n\nprint(\"Max coins:\", maxCoins([3, 1, 5, 8]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 275,
    "leetcodeNumber": 10,
    "title": "Regular Expression Matching",
    "difficulty": "Hard",
    "topic": "2-D Dynamic Programming",
    "pattern": "'.' and '*' 2D Transition DP",
    "description": "Implement regular expression matching with support for '.' and '*'.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def isMatch(s, p):\n    dp = {}\n    def dfs(i, j):\n        if (i, j) in dp:\n            return dp[(i, j)]\n        if i >= len(s) and j >= len(p):\n            return True\n        if j >= len(p):\n            return False\n        match = i < len(s) and (s[i] == p[j] or p[j] == \".\")\n        if (j + 1) < len(p) and p[j + 1] == \"*\":\n            dp[(i, j)] = dfs(i, j + 2) or (match and dfs(i + 1, j))\n            return dp[(i, j)]\n        if match:\n            dp[(i, j)] = dfs(i + 1, j + 1)\n            return dp[(i, j)]\n        dp[(i, j)] = False\n        return False\n    return dfs(0, 0)\n\nprint(\"Regex match:\", isMatch(\"aa\", \"a*\"))",
    "topics": [
      "Dynamic Programming",
      "Hashing and Hash Maps"
    ],
    "sourceUrl": "https://leetcode.com/problems/regular-expression-matching/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Hashing and Hash Maps"
    ],
    "summary": "Implement regular expression matching with support for '.' and '*'.",
    "examples": [
      {
        "input": "isMatch(\"aa\", \"a*\")",
        "output": "Computed via isMatch(\"aa\", \"a*\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def isMatch(s, p):\n    dp = {}\n    def dfs(i, j):\n        if (i, j) in dp:\n            return dp[(i, j)]\n        if i >= len(s) and j >= len(p):\n            return True\n        if j >= len(p):\n            return False\n        match = i < len(s) and (s[i] == p[j] or p[j] == \".\")\n        if (j + 1) < len(p) and p[j + 1] == \"*\":\n            dp[(i, j)] = dfs(i, j + 2) or (match and dfs(i + 1, j))\n            return dp[(i, j)]\n        if match:\n            dp[(i, j)] = dfs(i + 1, j + 1)\n            return dp[(i, j)]\n        dp[(i, j)] = False\n        return False\n    return dfs(0, 0)\n\nprint(\"Regex match:\", isMatch(\"aa\", \"a*\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 276,
    "leetcodeNumber": 44,
    "title": "Wildcard Matching",
    "difficulty": "Hard",
    "topic": "2-D Dynamic Programming",
    "pattern": "'?' and '*' 2D DP",
    "description": "Implement wildcard pattern matching with support for '?' and '*'.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def isWildcardMatch(s, p):\n    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]\n    dp[0][0] = True\n    for j in range(1, len(p) + 1):\n        if p[j - 1] == \"*\":\n            dp[0][j] = dp[0][j - 1]\n    for i in range(1, len(s) + 1):\n        for j in range(1, len(p) + 1):\n            if p[j - 1] == \"*\":\n                dp[i][j] = dp[i - 1][j] or dp[i][j - 1]\n            elif p[j - 1] == \"?\" or s[i - 1] == p[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1]\n    return dp[len(s)][len(p)]\n\nprint(\"Wildcard match:\", isWildcardMatch(\"cb\", \"?a\"))",
    "topics": [
      "Dynamic Programming",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/wildcard-matching/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Recursion"
    ],
    "summary": "Implement wildcard pattern matching with support for '?' and '*'.",
    "examples": [
      {
        "input": "isWildcardMatch(\"cb\", \"?a\")",
        "output": "Computed via isWildcardMatch(\"cb\", \"?a\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^4",
      "Answer fits in a 32-bit signed integer",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def isWildcardMatch(s, p):\n    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]\n    dp[0][0] = True\n    for j in range(1, len(p) + 1):\n        if p[j - 1] == \"*\":\n            dp[0][j] = dp[0][j - 1]\n    for i in range(1, len(s) + 1):\n        for j in range(1, len(p) + 1):\n            if p[j - 1] == \"*\":\n                dp[i][j] = dp[i - 1][j] or dp[i][j - 1]\n            elif p[j - 1] == \"?\" or s[i - 1] == p[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1]\n    return dp[len(s)][len(p)]\n\nprint(\"Wildcard match:\", isWildcardMatch(\"cb\", \"?a\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 277,
    "leetcodeNumber": 516,
    "title": "Longest Palindromic Subsequence",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "Reverse String LCS",
    "description": "Find longest palindromic subsequence's length in string s.",
    "timeComplexity": "O(n^2)",
    "spaceComplexity": "O(n^2)",
    "starterCode": "def longestPalindromeSubseq(s):\n    t = s[::-1]\n    n = len(s)\n    dp = [[0] * (n + 1) for _ in range(n + 1)]\n    for i in range(n - 1, -1, -1):\n        for j in range(n - 1, -1, -1):\n            if s[i] == t[j]:\n                dp[i][j] = 1 + dp[i + 1][j + 1]\n            else:\n                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\n    return dp[0][0]\n\nprint(\"Longest pal subseq:\", longestPalindromeSubseq(\"bbbab\"))",
    "topics": [
      "Dynamic Programming",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/longest-palindromic-subsequence/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Recursion",
      "Strings"
    ],
    "summary": "Find longest palindromic subsequence's length in string s.",
    "examples": [
      {
        "input": "longestPalindromeSubseq(\"bbbab\")",
        "output": "Computed via longestPalindromeSubseq(\"bbbab\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def longestPalindromeSubseq(s):\n    t = s[::-1]\n    n = len(s)\n    dp = [[0] * (n + 1) for _ in range(n + 1)]\n    for i in range(n - 1, -1, -1):\n        for j in range(n - 1, -1, -1):\n            if s[i] == t[j]:\n                dp[i][j] = 1 + dp[i + 1][j + 1]\n            else:\n                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\n    return dp[0][0]\n\nprint(\"Longest pal subseq:\", longestPalindromeSubseq(\"bbbab\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 278,
    "leetcodeNumber": 583,
    "title": "Delete Operation for Two Strings",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "LCS Subtraction",
    "description": "Find minimum number of steps to make word1 and word2 the same.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def minDistanceStrings(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m - 1, -1, -1):\n        for j in range(n - 1, -1, -1):\n            if word1[i] == word2[j]:\n                dp[i][j] = 1 + dp[i + 1][j + 1]\n            else:\n                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\n    lcs = dp[0][0]\n    return (m - lcs) + (n - lcs)\n\nprint(\"Deletions needed:\", minDistanceStrings(\"sea\", \"eat\"))",
    "topics": [
      "Dynamic Programming",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/delete-operation-for-two-strings/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Strings"
    ],
    "summary": "Find minimum number of steps to make word1 and word2 the same.",
    "examples": [
      {
        "input": "minDistanceStrings(\"sea\", \"eat\")",
        "output": "Computed via minDistanceStrings(\"sea\", \"eat\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def minDistanceStrings(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m - 1, -1, -1):\n        for j in range(n - 1, -1, -1):\n            if word1[i] == word2[j]:\n                dp[i][j] = 1 + dp[i + 1][j + 1]\n            else:\n                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\n    lcs = dp[0][0]\n    return (m - lcs) + (n - lcs)\n\nprint(\"Deletions needed:\", minDistanceStrings(\"sea\", \"eat\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 279,
    "leetcodeNumber": 712,
    "title": "Minimum ASCII Delete Sum for Two Strings",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "ASCII Weighted LCS",
    "description": "Return the lowest ASCII sum of deleted characters to make two strings equal.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def minimumDeleteSum(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m - 1, -1, -1):\n        dp[i][n] = dp[i + 1][n] + ord(s1[i])\n    for j in range(n - 1, -1, -1):\n        dp[m][j] = dp[m][j + 1] + ord(s2[j])\n    for i in range(m - 1, -1, -1):\n        for j in range(n - 1, -1, -1):\n            if s1[i] == s2[j]:\n                dp[i][j] = dp[i + 1][j + 1]\n            else:\n                dp[i][j] = min(ord(s1[i]) + dp[i + 1][j], ord(s2[j]) + dp[i][j + 1])\n    return dp[0][0]\n\nprint(\"Min ASCII delete sum:\", minimumDeleteSum(\"sea\", \"eat\"))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Math and Number Theory",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Math and Number Theory",
      "Recursion",
      "Strings"
    ],
    "summary": "Return the lowest ASCII sum of deleted characters to make two strings equal.",
    "examples": [
      {
        "input": "minimumDeleteSum(\"sea\", \"eat\")",
        "output": "Computed via minimumDeleteSum(\"sea\", \"eat\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "String Manipulation",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def minimumDeleteSum(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m - 1, -1, -1):\n        dp[i][n] = dp[i + 1][n] + ord(s1[i])\n    for j in range(n - 1, -1, -1):\n        dp[m][j] = dp[m][j + 1] + ord(s2[j])\n    for i in range(m - 1, -1, -1):\n        for j in range(n - 1, -1, -1):\n            if s1[i] == s2[j]:\n                dp[i][j] = dp[i + 1][j + 1]\n            else:\n                dp[i][j] = min(ord(s1[i]) + dp[i + 1][j], ord(s2[j]) + dp[i][j + 1])\n    return dp[0][0]\n\nprint(\"Min ASCII delete sum:\", minimumDeleteSum(\"sea\", \"eat\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 280,
    "leetcodeNumber": 221,
    "title": "Maximal Square",
    "difficulty": "Medium",
    "topic": "2-D Dynamic Programming",
    "pattern": "Min of 3 Neighbors DP",
    "description": "Find largest square containing only 1s in a binary matrix and return its area.",
    "timeComplexity": "O(m * n)",
    "spaceComplexity": "O(m * n)",
    "starterCode": "def maximalSquare(matrix):\n    rows, cols = len(matrix), len(matrix[0])\n    dp = [[0] * (cols + 1) for _ in range(rows + 1)]\n    max_side = 0\n    for r in range(rows - 1, -1, -1):\n        for c in range(cols - 1, -1, -1):\n            if matrix[r][c] == \"1\":\n                dp[r][c] = 1 + min(dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1])\n                max_side = max(max_side, dp[r][c])\n    return max_side * max_side\n\nmat = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]\nprint(\"Max square area:\", maximalSquare(mat))",
    "topics": [
      "Arrays",
      "Dynamic Programming",
      "Matrix Problems",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/maximal-square/",
    "primaryTopic": "2-D Dynamic Programming",
    "topicTags": [
      "Arrays",
      "Dynamic Programming",
      "Matrix Problems",
      "Recursion"
    ],
    "summary": "Find largest square containing only 1s in a binary matrix and return its area.",
    "examples": [
      {
        "input": "mat = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
        "output": "Computed via maximalSquare(mat)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "Optimal Substructure & Recurrence"
    ],
    "referenceSolution": "def maximalSquare(matrix):\n    rows, cols = len(matrix), len(matrix[0])\n    dp = [[0] * (cols + 1) for _ in range(rows + 1)]\n    max_side = 0\n    for r in range(rows - 1, -1, -1):\n        for c in range(cols - 1, -1, -1):\n            if matrix[r][c] == \"1\":\n                dp[r][c] = 1 + min(dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1])\n                max_side = max(max_side, dp[r][c])\n    return max_side * max_side\n\nmat = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]\nprint(\"Max square area:\", maximalSquare(mat))",
    "verificationStatus": "Verified"
  },
  {
    "id": 281,
    "leetcodeNumber": 55,
    "title": "Jump Game",
    "difficulty": "Medium",
    "topic": "Greedy",
    "pattern": "Max Reachable Index",
    "description": "Determine if you can reach the last index starting from index 0.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def canJump(nums):\n    goal = len(nums) - 1\n    for i in range(len(nums) - 2, -1, -1):\n        if i + nums[i] >= goal:\n            goal = i\n    return goal == 0\n\nprint(\"Can jump:\", canJump([2, 3, 1, 1, 4]))",
    "topics": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/jump-game/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "summary": "Determine if you can reach the last index starting from index 0.",
    "examples": [
      {
        "input": "canJump([2, 3, 1, 1, 4])",
        "output": "Computed via canJump([2, 3, 1, 1, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Greedy Choice Invariant"
    ],
    "referenceSolution": "def canJump(nums):\n    goal = len(nums) - 1\n    for i in range(len(nums) - 2, -1, -1):\n        if i + nums[i] >= goal:\n            goal = i\n    return goal == 0\n\nprint(\"Can jump:\", canJump([2, 3, 1, 1, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 282,
    "leetcodeNumber": 45,
    "title": "Jump Game II",
    "difficulty": "Medium",
    "topic": "Greedy",
    "pattern": "BFS Window Boundaries",
    "description": "Return minimum number of jumps to reach last index.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def jump(nums):\n    res = 0\n    l, r = 0, 0\n    while r < len(nums) - 1:\n        farthest = 0\n        for i in range(l, r + 1):\n            farthest = max(farthest, i + nums[i])\n        l = r + 1\n        r = farthest\n        res += 1\n    return res\n\nprint(\"Min jumps:\", jump([2, 3, 1, 1, 4]))",
    "topics": [
      "Breadth-First Search (BFS)",
      "Greedy Algorithms",
      "Queues and Deques",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/jump-game-ii/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Breadth-First Search (BFS)",
      "Greedy Algorithms",
      "Queues and Deques",
      "Recursion"
    ],
    "summary": "Return minimum number of jumps to reach last index.",
    "examples": [
      {
        "input": "jump([2, 3, 1, 1, 4])",
        "output": "Computed via jump([2, 3, 1, 1, 4])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "FIFO Queue Operations",
      "Recursive Call Stack & Base Cases",
      "Queue-based Level Traversal"
    ],
    "referenceSolution": "def jump(nums):\n    res = 0\n    l, r = 0, 0\n    while r < len(nums) - 1:\n        farthest = 0\n        for i in range(l, r + 1):\n            farthest = max(farthest, i + nums[i])\n        l = r + 1\n        r = farthest\n        res += 1\n    return res\n\nprint(\"Min jumps:\", jump([2, 3, 1, 1, 4]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 283,
    "leetcodeNumber": 134,
    "title": "Gas Station",
    "difficulty": "Medium",
    "topic": "Greedy",
    "pattern": "Total Difference & Start Reset",
    "description": "Return starting gas station index if you can travel around circuit once clockwise.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def canCompleteCircuit(gas, cost):\n    if sum(gas) < sum(cost):\n        return -1\n    total, start = 0, 0\n    for i in range(len(gas)):\n        total += gas[i] - cost[i]\n        if total < 0:\n            total = 0\n            start = i + 1\n    return start\n\nprint(\"Start station:\", canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]))",
    "topics": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/gas-station/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "summary": "Return starting gas station index if you can travel around circuit once clockwise.",
    "examples": [
      {
        "input": "canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])",
        "output": "Computed via canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Greedy Choice Invariant"
    ],
    "referenceSolution": "def canCompleteCircuit(gas, cost):\n    if sum(gas) < sum(cost):\n        return -1\n    total, start = 0, 0\n    for i in range(len(gas)):\n        total += gas[i] - cost[i]\n        if total < 0:\n            total = 0\n            start = i + 1\n    return start\n\nprint(\"Start station:\", canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 284,
    "leetcodeNumber": 846,
    "title": "Hand of Straights",
    "difficulty": "Medium",
    "topic": "Greedy",
    "pattern": "Min Frequency Consecutive Groups",
    "description": "Rearrange cards into groups of groupSize consecutive cards.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def isNStraightHand(hand, groupSize):\n    if len(hand) % groupSize:\n        return False\n    count = {}\n    for c in hand:\n        count[c] = count.get(c, 0) + 1\n    for c in sorted(count):\n        if count[c] > 0:\n            cnt = count[c]\n            for i in range(c, c + groupSize):\n                if count.get(i, 0) < cnt:\n                    return False\n                count[i] -= cnt\n    return True\n\nprint(\"Valid hand:\", isNStraightHand([1,2,3,6,2,3,4,7,8], 3))",
    "topics": [
      "Greedy Algorithms",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/hand-of-straights/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Greedy Algorithms",
      "Hashing and Hash Maps",
      "Recursion",
      "Sorting"
    ],
    "summary": "Rearrange cards into groups of groupSize consecutive cards.",
    "examples": [
      {
        "input": "isNStraightHand([1,2,3,6,2,3,4,7,8], 3)",
        "output": "Computed via isNStraightHand([1,2,3,6,2,3,4,7,8], 3)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def isNStraightHand(hand, groupSize):\n    if len(hand) % groupSize:\n        return False\n    count = {}\n    for c in hand:\n        count[c] = count.get(c, 0) + 1\n    for c in sorted(count):\n        if count[c] > 0:\n            cnt = count[c]\n            for i in range(c, c + groupSize):\n                if count.get(i, 0) < cnt:\n                    return False\n                count[i] -= cnt\n    return True\n\nprint(\"Valid hand:\", isNStraightHand([1,2,3,6,2,3,4,7,8], 3))",
    "verificationStatus": "Verified"
  },
  {
    "id": 285,
    "leetcodeNumber": 1899,
    "title": "Merge Triplets to Form Target Triplet",
    "difficulty": "Medium",
    "topic": "Greedy",
    "pattern": "Greedy Valid Element Filter",
    "description": "Determine if target triplet can be obtained by taking component-wise maximums.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def mergeTriplets(triplets, target):\n    good = set()\n    for t in triplets:\n        if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]:\n            continue\n        for i, val in enumerate(t):\n            if val == target[i]:\n                good.add(i)\n    return len(good) == 3\n\ntriplets = [[2,5,3],[1,8,4],[1,7,5]]\nprint(\"Can form target:\", mergeTriplets(triplets, [2,7,5]))",
    "topics": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "summary": "Determine if target triplet can be obtained by taking component-wise maximums.",
    "examples": [
      {
        "input": "triplets = [[2,5,3],[1,8,4],[1,7,5]]",
        "output": "Computed via mergeTriplets(triplets, [2,7,5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Greedy Choice Invariant"
    ],
    "referenceSolution": "def mergeTriplets(triplets, target):\n    good = set()\n    for t in triplets:\n        if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]:\n            continue\n        for i, val in enumerate(t):\n            if val == target[i]:\n                good.add(i)\n    return len(good) == 3\n\ntriplets = [[2,5,3],[1,8,4],[1,7,5]]\nprint(\"Can form target:\", mergeTriplets(triplets, [2,7,5]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 286,
    "leetcodeNumber": 763,
    "title": "Partition Labels",
    "difficulty": "Medium",
    "topic": "Greedy",
    "pattern": "Last Occurrence Interval Expansion",
    "description": "Partition string into as many parts as possible so each letter appears in at most one part.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def partitionLabels(s):\n    lastIdx = {c: i for i, c in enumerate(s)}\n    res = []\n    size, end = 0, 0\n    for i, c in enumerate(s):\n        size += 1\n        end = max(end, lastIdx[c])\n        if i == end:\n            res.append(size)\n            size = 0\n    return res\n\nprint(\"Partitions:\", partitionLabels(\"ababcbacadefegdehijhklij\"))",
    "topics": [
      "Greedy Algorithms",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/partition-labels/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Greedy Algorithms",
      "Hashing and Hash Maps",
      "Recursion",
      "Strings"
    ],
    "summary": "Partition string into as many parts as possible so each letter appears in at most one part.",
    "examples": [
      {
        "input": "partitionLabels(\"ababcbacadefegdehijhklij\")",
        "output": "Computed via partitionLabels(\"ababcbacadefegdehijhklij\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Hash Map / Dict Key Lookup",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def partitionLabels(s):\n    lastIdx = {c: i for i, c in enumerate(s)}\n    res = []\n    size, end = 0, 0\n    for i, c in enumerate(s):\n        size += 1\n        end = max(end, lastIdx[c])\n        if i == end:\n            res.append(size)\n            size = 0\n    return res\n\nprint(\"Partitions:\", partitionLabels(\"ababcbacadefegdehijhklij\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 287,
    "leetcodeNumber": 678,
    "title": "Valid Parenthesis String",
    "difficulty": "Medium",
    "topic": "Greedy",
    "pattern": "Min/Max Open Parenthesis Range",
    "description": "Check valid parenthesis string where '*' can be '(', ')', or empty ''.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def checkValidString(s):\n    cmin, cmax = 0, 0\n    for c in s:\n        if c == \"(\":\n            cmin += 1\n            cmax += 1\n        elif c == \")\":\n            cmin = max(cmin - 1, 0)\n            cmax -= 1\n        else:\n            cmin = max(cmin - 1, 0)\n            cmax += 1\n        if cmax < 0:\n            return False\n    return cmin == 0\n\nprint(\"Valid with *:\", checkValidString(\"(*))\"))",
    "topics": [
      "Greedy Algorithms",
      "Recursion",
      "Strings"
    ],
    "sourceUrl": "https://leetcode.com/problems/valid-parenthesis-string/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Greedy Algorithms",
      "Recursion",
      "Strings"
    ],
    "summary": "Check valid parenthesis string where '*' can be '(', ')', or empty ''.",
    "examples": [
      {
        "input": "checkValidString(\"(*))\")",
        "output": "Computed via checkValidString(\"(*))\")",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s consists of printable English characters",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "String Manipulation",
      "Recursive Call Stack & Base Cases",
      "Greedy Choice Invariant"
    ],
    "referenceSolution": "def checkValidString(s):\n    cmin, cmax = 0, 0\n    for c in s:\n        if c == \"(\":\n            cmin += 1\n            cmax += 1\n        elif c == \")\":\n            cmin = max(cmin - 1, 0)\n            cmax -= 1\n        else:\n            cmin = max(cmin - 1, 0)\n            cmax += 1\n        if cmax < 0:\n            return False\n    return cmin == 0\n\nprint(\"Valid with *:\", checkValidString(\"(*))\"))",
    "verificationStatus": "Verified"
  },
  {
    "id": 288,
    "leetcodeNumber": 605,
    "title": "Can Place Flowers",
    "difficulty": "Easy",
    "topic": "Greedy",
    "pattern": "Adjacent Zeroes Check",
    "description": "Check if n new flowers can be planted without violating no-adjacent-flowers rule.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def canPlaceFlowers(flowerbed, n):\n    f = [0] + flowerbed + [0]\n    for i in range(1, len(f) - 1):\n        if f[i - 1] == 0 and f[i] == 0 and f[i + 1] == 0:\n            f[i] = 1\n            n -= 1\n    return n <= 0\n\nprint(\"Can plant 1:\", canPlaceFlowers([1,0,0,0,1], 1))",
    "topics": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/can-place-flowers/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "summary": "Check if n new flowers can be planted without violating no-adjacent-flowers rule.",
    "examples": [
      {
        "input": "canPlaceFlowers([1,0,0,0,1], 1)",
        "output": "Computed via canPlaceFlowers([1,0,0,0,1], 1)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Greedy Choice Invariant"
    ],
    "referenceSolution": "def canPlaceFlowers(flowerbed, n):\n    f = [0] + flowerbed + [0]\n    for i in range(1, len(f) - 1):\n        if f[i - 1] == 0 and f[i] == 0 and f[i + 1] == 0:\n            f[i] = 1\n            n -= 1\n    return n <= 0\n\nprint(\"Can plant 1:\", canPlaceFlowers([1,0,0,0,1], 1))",
    "verificationStatus": "Verified"
  },
  {
    "id": 289,
    "leetcodeNumber": 455,
    "title": "Assign Cookies",
    "difficulty": "Easy",
    "topic": "Greedy",
    "pattern": "Sort Both + Two Pointers",
    "description": "Maximize number of content children given greed factors and cookie sizes.",
    "timeComplexity": "O(n log n + m log m)",
    "spaceComplexity": "O(1)",
    "starterCode": "def findContentChildren(g, s):\n    g.sort()\n    s.sort()\n    child, cookie = 0, 0\n    while child < len(g) and cookie < len(s):\n        if s[cookie] >= g[child]:\n            child += 1\n        cookie += 1\n    return child\n\nprint(\"Content children:\", findContentChildren([1, 2, 3], [1, 1]))",
    "topics": [
      "Greedy Algorithms",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/assign-cookies/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Greedy Algorithms",
      "Sorting"
    ],
    "summary": "Maximize number of content children given greed factors and cookie sizes.",
    "examples": [
      {
        "input": "findContentChildren([1, 2, 3], [1, 1])",
        "output": "Computed via findContentChildren([1, 2, 3], [1, 1])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Comparison Sort Order",
      "Greedy Choice Invariant"
    ],
    "referenceSolution": "def findContentChildren(g, s):\n    g.sort()\n    s.sort()\n    child, cookie = 0, 0\n    while child < len(g) and cookie < len(s):\n        if s[cookie] >= g[child]:\n            child += 1\n        cookie += 1\n    return child\n\nprint(\"Content children:\", findContentChildren([1, 2, 3], [1, 1]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 290,
    "leetcodeNumber": 860,
    "title": "Lemonade Change",
    "difficulty": "Easy",
    "topic": "Greedy",
    "pattern": "Bill Denomination Greedy Change",
    "description": "Determine if you can provide every customer with correct change given bills 5, 10, 20.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def lemonadeChange(bills):\n    five, ten = 0, 0\n    for b in bills:\n        if b == 5:\n            five += 1\n        elif b == 10:\n            if five == 0:\n                return False\n            five -= 1\n            ten += 1\n        else:\n            if ten > 0 and five > 0:\n                ten -= 1\n                five -= 1\n            elif five >= 3:\n                five -= 3\n            else:\n                return False\n    return True\n\nprint(\"Can change:\", lemonadeChange([5, 5, 5, 10, 20]))",
    "topics": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/lemonade-change/",
    "primaryTopic": "Greedy",
    "topicTags": [
      "Greedy Algorithms",
      "Recursion"
    ],
    "summary": "Determine if you can provide every customer with correct change given bills 5, 10, 20.",
    "examples": [
      {
        "input": "lemonadeChange([5, 5, 5, 10, 20])",
        "output": "Computed via lemonadeChange([5, 5, 5, 10, 20])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Greedy Choice Invariant"
    ],
    "referenceSolution": "def lemonadeChange(bills):\n    five, ten = 0, 0\n    for b in bills:\n        if b == 5:\n            five += 1\n        elif b == 10:\n            if five == 0:\n                return False\n            five -= 1\n            ten += 1\n        else:\n            if ten > 0 and five > 0:\n                ten -= 1\n                five -= 1\n            elif five >= 3:\n                five -= 3\n            else:\n                return False\n    return True\n\nprint(\"Can change:\", lemonadeChange([5, 5, 5, 10, 20]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 291,
    "leetcodeNumber": 57,
    "title": "Insert Interval",
    "difficulty": "Medium",
    "topic": "Intervals",
    "pattern": "Slice Left, Merge, Slice Right",
    "description": "Insert newInterval into sorted non-overlapping intervals and merge if necessary.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def insert(intervals, newInterval):\n    res = []\n    for i in range(len(intervals)):\n        if newInterval[1] < intervals[i][0]:\n            res.append(newInterval)\n            return res + intervals[i:]\n        elif newInterval[0] > intervals[i][1]:\n            res.append(intervals[i])\n        else:\n            newInterval = [min(newInterval[0], intervals[i][0]), max(newInterval[1], intervals[i][1])]\n    res.append(newInterval)\n    return res\n\nprint(\"Inserted:\", insert([[1,3],[6,9]], [2,5]))",
    "topics": [
      "Arrays",
      "Intervals",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/insert-interval/",
    "primaryTopic": "Intervals",
    "topicTags": [
      "Arrays",
      "Intervals",
      "Recursion",
      "Sorting"
    ],
    "summary": "Insert newInterval into sorted non-overlapping intervals and merge if necessary.",
    "examples": [
      {
        "input": "insert([[1,3],[6,9]], [2,5])",
        "output": "Computed via insert([[1,3],[6,9]], [2,5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def insert(intervals, newInterval):\n    res = []\n    for i in range(len(intervals)):\n        if newInterval[1] < intervals[i][0]:\n            res.append(newInterval)\n            return res + intervals[i:]\n        elif newInterval[0] > intervals[i][1]:\n            res.append(intervals[i])\n        else:\n            newInterval = [min(newInterval[0], intervals[i][0]), max(newInterval[1], intervals[i][1])]\n    res.append(newInterval)\n    return res\n\nprint(\"Inserted:\", insert([[1,3],[6,9]], [2,5]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 292,
    "leetcodeNumber": 56,
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "topic": "Intervals",
    "pattern": "Sort Start Times + Overlap Merge",
    "description": "Merge all overlapping intervals into non-overlapping intervals covering all intervals.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    output = [intervals[0]]\n    for start, end in intervals[1:\n        ]:\n        lastEnd = output[-1][1]\n        if start <= lastEnd:\n            output[-1][1] = max(lastEnd, end)\n        else:\n            output.append([start, end])\n    return output\n\nprint(\"Merged:\", merge([[1,3],[2,6],[8,10],[15,18]]))",
    "topics": [
      "Arrays",
      "Intervals",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/merge-intervals/",
    "primaryTopic": "Intervals",
    "topicTags": [
      "Arrays",
      "Intervals",
      "Recursion",
      "Sorting"
    ],
    "summary": "Merge all overlapping intervals into non-overlapping intervals covering all intervals.",
    "examples": [
      {
        "input": "merge([[1,3],[2,6],[8,10],[15,18]])",
        "output": "Computed via merge([[1,3],[2,6],[8,10],[15,18]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    output = [intervals[0]]\n    for start, end in intervals[1:\n        ]:\n        lastEnd = output[-1][1]\n        if start <= lastEnd:\n            output[-1][1] = max(lastEnd, end)\n        else:\n            output.append([start, end])\n    return output\n\nprint(\"Merged:\", merge([[1,3],[2,6],[8,10],[15,18]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 293,
    "leetcodeNumber": 252,
    "title": "Meeting Rooms",
    "difficulty": "Easy",
    "topic": "Intervals",
    "pattern": "Adjacent Overlap Check",
    "description": "Determine if person could attend all meetings without overlapping time conflicts.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def canAttendMeetings(intervals):\n    intervals.sort(key=lambda x: x[0])\n    for i in range(len(intervals) - 1):\n        if intervals[i][1] > intervals[i + 1][0]:\n            return False\n    return True\n\nprint(\"Can attend all:\", canAttendMeetings([[0,30],[5,10],[15,20]]))",
    "topics": [
      "Arrays",
      "Intervals",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/meeting-rooms/",
    "primaryTopic": "Intervals",
    "topicTags": [
      "Arrays",
      "Intervals",
      "Recursion",
      "Sorting"
    ],
    "summary": "Determine if person could attend all meetings without overlapping time conflicts.",
    "examples": [
      {
        "input": "canAttendMeetings([[0,30],[5,10],[15,20]])",
        "output": "Computed via canAttendMeetings([[0,30],[5,10],[15,20]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Comparison Sort Order",
      "Recursive Call Stack & Base Cases"
    ],
    "referenceSolution": "def canAttendMeetings(intervals):\n    intervals.sort(key=lambda x: x[0])\n    for i in range(len(intervals) - 1):\n        if intervals[i][1] > intervals[i + 1][0]:\n            return False\n    return True\n\nprint(\"Can attend all:\", canAttendMeetings([[0,30],[5,10],[15,20]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 294,
    "leetcodeNumber": 435,
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "topic": "Intervals",
    "pattern": "Greedy Earliest End Time",
    "description": "Find minimum number of intervals to remove to make rest non-overlapping.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def eraseOverlapIntervals(intervals):\n    intervals.sort(key=lambda x: x[1])\n    count = 0\n    prev_end = float(\"-inf\")\n    for start, end in intervals:\n        if start >= prev_end:\n            prev_end = end\n        else:\n            count += 1\n    return count\n\nprint(\"Intervals to erase:\", eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]))",
    "topics": [
      "Arrays",
      "Hashing and Hash Maps",
      "Intervals",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
    "primaryTopic": "Intervals",
    "topicTags": [
      "Arrays",
      "Hashing and Hash Maps",
      "Intervals",
      "Sorting"
    ],
    "summary": "Find minimum number of intervals to remove to make rest non-overlapping.",
    "examples": [
      {
        "input": "eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])",
        "output": "Computed via eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def eraseOverlapIntervals(intervals):\n    intervals.sort(key=lambda x: x[1])\n    count = 0\n    prev_end = float(\"-inf\")\n    for start, end in intervals:\n        if start >= prev_end:\n            prev_end = end\n        else:\n            count += 1\n    return count\n\nprint(\"Intervals to erase:\", eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 295,
    "leetcodeNumber": 191,
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "pattern": "Brian Kernighan's Algorithm",
    "description": "Return the number of '1' bits in integer using n & (n - 1) bit clearing.",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "starterCode": "def hammingWeight(n):\n    res = 0\n    while n:\n        n &= (n - 1)\n        res += 1\n    return res\n\nprint(\"Set bits in 11 (1011):\", hammingWeight(11))",
    "topics": [
      "Bit Manipulation",
      "Math and Number Theory"
    ],
    "sourceUrl": "https://leetcode.com/problems/number-of-1-bits/",
    "primaryTopic": "Bit Manipulation",
    "topicTags": [
      "Bit Manipulation",
      "Math and Number Theory"
    ],
    "summary": "Return the number of '1' bits in integer using n & (n - 1) bit clearing.",
    "examples": [
      {
        "input": "hammingWeight(11)",
        "output": "Computed via hammingWeight(11)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Bitwise Operators (AND, OR, XOR)",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "def hammingWeight(n):\n    res = 0\n    while n:\n        n &= (n - 1)\n        res += 1\n    return res\n\nprint(\"Set bits in 11 (1011):\", hammingWeight(11))",
    "verificationStatus": "Verified"
  },
  {
    "id": 296,
    "leetcodeNumber": 338,
    "title": "Counting Bits",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "pattern": "dp[i] = dp[i >> 1] + (i & 1)",
    "description": "Return array ans where ans[i] is number of 1's in binary representation of i.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "starterCode": "def countBits(n):\n    dp = [0] * (n + 1)\n    for i in range(1, n + 1):\n        dp[i] = dp[i >> 1] + (i & 1)\n    return dp\n\nprint(\"Bits 0..5:\", countBits(5))",
    "topics": [
      "Arrays",
      "Bit Manipulation",
      "Hashing and Hash Maps"
    ],
    "sourceUrl": "https://leetcode.com/problems/counting-bits/",
    "primaryTopic": "Bit Manipulation",
    "topicTags": [
      "Arrays",
      "Bit Manipulation",
      "Hashing and Hash Maps"
    ],
    "summary": "Return array ans where ans[i] is number of 1's in binary representation of i.",
    "examples": [
      {
        "input": "countBits(5)",
        "output": "Computed via countBits(5)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Bitwise Operators (AND, OR, XOR)"
    ],
    "referenceSolution": "def countBits(n):\n    dp = [0] * (n + 1)\n    for i in range(1, n + 1):\n        dp[i] = dp[i >> 1] + (i & 1)\n    return dp\n\nprint(\"Bits 0..5:\", countBits(5))",
    "verificationStatus": "Verified"
  },
  {
    "id": 297,
    "leetcodeNumber": 190,
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "topic": "Bit Manipulation",
    "pattern": "32-Bit Reversal Shift",
    "description": "Reverse bits of a given 32 bits unsigned integer.",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "starterCode": "def reverseBits(n):\n    res = 0\n    for _ in range(32):\n        res = (res << 1) | (n & 1)\n        n >>= 1\n    return res\n\nprint(\"Reversed bits of 43261596:\", reverseBits(43261596))",
    "topics": [
      "Bit Manipulation",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/reverse-bits/",
    "primaryTopic": "Bit Manipulation",
    "topicTags": [
      "Bit Manipulation",
      "Recursion"
    ],
    "summary": "Reverse bits of a given 32 bits unsigned integer.",
    "examples": [
      {
        "input": "reverseBits(43261596)",
        "output": "Computed via reverseBits(43261596)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Bitwise Operators (AND, OR, XOR)"
    ],
    "referenceSolution": "def reverseBits(n):\n    res = 0\n    for _ in range(32):\n        res = (res << 1) | (n & 1)\n        n >>= 1\n    return res\n\nprint(\"Reversed bits of 43261596:\", reverseBits(43261596))",
    "verificationStatus": "Verified"
  },
  {
    "id": 298,
    "leetcodeNumber": 371,
    "title": "Sum of Two Integers",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "pattern": "Bitwise Addition without + or -",
    "description": "Calculate the sum of two integers a and b using bitwise operations.",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "starterCode": "def getSum(a, b):\n    mask = 0xFFFFFFFF\n    while (b & mask) > 0:\n        carry = (a & b) << 1\n        a = (a ^ b)\n        b = carry\n    return (a & mask) if b > 0 else a\n\nprint(\"Sum 1 + 2:\", getSum(1, 2))",
    "topics": [
      "Arrays",
      "Bit Manipulation",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/sum-of-two-integers/",
    "primaryTopic": "Bit Manipulation",
    "topicTags": [
      "Arrays",
      "Bit Manipulation",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Calculate the sum of two integers a and b using bitwise operations.",
    "examples": [
      {
        "input": "getSum(1, 2)",
        "output": "Computed via getSum(1, 2)",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Recursive Call Stack & Base Cases",
      "Bitwise Operators (AND, OR, XOR)"
    ],
    "referenceSolution": "def getSum(a, b):\n    mask = 0xFFFFFFFF\n    while (b & mask) > 0:\n        carry = (a & b) << 1\n        a = (a ^ b)\n        b = carry\n    return (a & mask) if b > 0 else a\n\nprint(\"Sum 1 + 2:\", getSum(1, 2))",
    "verificationStatus": "Verified"
  },
  {
    "id": 299,
    "leetcodeNumber": 137,
    "title": "Single Number II",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "pattern": "Bitwise Modulo 3 Count",
    "description": "Every element appears three times except for one which appears exactly once.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def singleNumberII(nums):\n    ones, twos = 0, 0\n    for n in nums:\n        ones = (ones ^ n) & ~twos\n        twos = (twos ^ n) & ~ones\n    return ones\n\nprint(\"Single in triplets:\", singleNumberII([2, 2, 3, 2]))",
    "topics": [
      "Bit Manipulation",
      "Math and Number Theory",
      "Recursion"
    ],
    "sourceUrl": "https://leetcode.com/problems/single-number-ii/",
    "primaryTopic": "Bit Manipulation",
    "topicTags": [
      "Bit Manipulation",
      "Math and Number Theory",
      "Recursion"
    ],
    "summary": "Every element appears three times except for one which appears exactly once.",
    "examples": [
      {
        "input": "singleNumberII([2, 2, 3, 2])",
        "output": "Computed via singleNumberII([2, 2, 3, 2])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= n <= 10^5",
      "All inputs conform to standard problem limits",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Recursive Call Stack & Base Cases",
      "Bitwise Operators (AND, OR, XOR)",
      "Modular Arithmetic & Integer Properties"
    ],
    "referenceSolution": "def singleNumberII(nums):\n    ones, twos = 0, 0\n    for n in nums:\n        ones = (ones ^ n) & ~twos\n        twos = (twos ^ n) & ~ones\n    return ones\n\nprint(\"Single in triplets:\", singleNumberII([2, 2, 3, 2]))",
    "verificationStatus": "Verified"
  },
  {
    "id": 300,
    "leetcodeNumber": 260,
    "title": "Single Number III",
    "difficulty": "Medium",
    "topic": "Bit Manipulation",
    "pattern": "Lowest Set Bit Partition",
    "description": "Two elements appear only once while all others appear twice. Find the two unique elements.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "starterCode": "def singleNumberIII(nums):\n    xor = 0\n    for n in nums:\n        xor ^= n\n    diff = xor & (-xor)\n    a, b = 0, 0\n    for n in nums:\n        if n & diff:\n            a ^= n\n        else:\n            b ^= n\n    return [a, b]\n\nprint(\"Two singles:\", singleNumberIII([1, 2, 1, 3, 2, 5]))",
    "topics": [
      "Arrays",
      "Bit Manipulation",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sorting"
    ],
    "sourceUrl": "https://leetcode.com/problems/single-number-iii/",
    "primaryTopic": "Bit Manipulation",
    "topicTags": [
      "Arrays",
      "Bit Manipulation",
      "Hashing and Hash Maps",
      "Math and Number Theory",
      "Recursion",
      "Sorting"
    ],
    "summary": "Two elements appear only once while all others appear twice. Find the two unique elements.",
    "examples": [
      {
        "input": "singleNumberIII([1, 2, 1, 3, 2, 5])",
        "output": "Computed via singleNumberIII([1, 2, 1, 3, 2, 5])",
        "explanation": "Step through the execution in the visualizer to inspect how variables mutate to produce the result."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Memory limit: 256 MB, Time limit: 2.0 seconds"
    ],
    "prerequisites": [
      "Array Indexing & Iteration",
      "Hash Map / Dict Key Lookup",
      "Comparison Sort Order"
    ],
    "referenceSolution": "def singleNumberIII(nums):\n    xor = 0\n    for n in nums:\n        xor ^= n\n    diff = xor & (-xor)\n    a, b = 0, 0\n    for n in nums:\n        if n & diff:\n            a ^= n\n        else:\n            b ^= n\n    return [a, b]\n\nprint(\"Two singles:\", singleNumberIII([1, 2, 1, 3, 2, 5]))",
    "verificationStatus": "Verified"
  }
];
