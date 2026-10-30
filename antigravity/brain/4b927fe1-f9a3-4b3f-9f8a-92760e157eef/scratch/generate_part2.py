# scratch/generate_part2.py
import json

with open("scratch/problems_part1.json") as f:
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
# 2. TWO POINTERS (20 Problems, IDs 31-50)
# ===========================================================================
add(125, "Valid Palindrome", "Easy", "Two Pointers", "Opposite Ends Pointers",
    "Check if string is a palindrome after removing non-alphanumeric chars and lowercasing.",
    '''def isPalindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while l < r and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower(): return False
        l += 1; r -= 1
    return True

print("Is palindrome:", isPalindrome("A man, a plan, a canal: Panama"))''', "O(n)", "O(1)")

add(167, "Two Sum II - Input Array Is Sorted", "Medium", "Two Pointers", "Shrinking Window",
    "Find two numbers that add to target in 1-indexed sorted array in O(1) extra space.",
    '''def twoSum(numbers, target):
    l, r = 0, len(numbers) - 1
    while l < r:
        curr = numbers[l] + numbers[r]
        if curr == target: return [l + 1, r + 1]
        elif curr < target: l += 1
        else: r -= 1
    return []

print("Indices:", twoSum([2, 7, 11, 15], 9))''', "O(n)", "O(1)")

add(15, "3Sum", "Medium", "Two Pointers", "Sort + Two Pointers",
    "Find all unique triplets [nums[i], nums[j], nums[k]] that sum to 0.",
    '''def threeSum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]: continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s < 0: l += 1
            elif s > 0: r -= 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l + 1]: l += 1
                while l < r and nums[r] == nums[r - 1]: r -= 1
                l += 1; r -= 1
    return res

print("3Sum:", threeSum([-1, 0, 1, 2, -1, -4]))''', "O(n^2)", "O(1)")

add(16, "3Sum Closest", "Medium", "Two Pointers", "Distance Minimization",
    "Find three integers in nums such that the sum is closest to target.",
    '''def threeSumClosest(nums, target):
    nums.sort()
    closest = nums[0] + nums[1] + nums[2]
    for i in range(len(nums) - 2):
        l, r = i + 1, len(nums) - 1
        while l < r:
            curr = nums[i] + nums[l] + nums[r]
            if abs(curr - target) < abs(closest - target):
                closest = curr
            if curr < target: l += 1
            elif curr > target: r -= 1
            else: return target
    return closest

print("Closest:", threeSumClosest([-1, 2, 1, -4], 1))''', "O(n^2)", "O(1)")

add(18, "4Sum", "Medium", "Two Pointers", "K-Sum Recursion / Two Pointers",
    "Find all unique quadruplets [a, b, c, d] that sum to target.",
    '''def fourSum(nums, target):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]: continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]: continue
            l, r = j + 1, n - 1
            while l < r:
                s = nums[i] + nums[j] + nums[l] + nums[r]
                if s == target:
                    res.append([nums[i], nums[j], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l + 1]: l += 1
                    while l < r and nums[r] == nums[r - 1]: r -= 1
                    l += 1; r -= 1
                elif s < target: l += 1
                else: r -= 1
    return res

print("4Sum:", fourSum([1, 0, -1, 0, -2, 2], 0))''', "O(n^3)", "O(1)")

add(11, "Container With Most Water", "Medium", "Two Pointers", "Greedy Width Reduction",
    "Find two lines that together with x-axis form a container holding the most water.",
    '''def maxArea(height):
    l, r = 0, len(height) - 1
    max_w = 0
    while l < r:
        h = min(height[l], height[r])
        max_w = max(max_w, h * (r - l))
        if height[l] < height[r]: l += 1
        else: r -= 1
    return max_w

print("Max area:", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))''', "O(n)", "O(1)")

add(42, "Trapping Rain Water", "Hard", "Two Pointers", "Left & Right Elevation Max",
    "Compute how much water elevation map can trap after raining.",
    '''def trap(height):
    if not height: return 0
    l, r = 0, len(height) - 1
    leftMax, rightMax = height[l], height[r]
    water = 0
    while l < r:
        if leftMax < rightMax:
            l += 1
            leftMax = max(leftMax, height[l])
            water += leftMax - height[l]
        else:
            r -= 1
            rightMax = max(rightMax, height[r])
            water += rightMax - height[r]
    return water

print("Trapped water:", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))''', "O(n)", "O(1)")

add(26, "Remove Duplicates from Sorted Array", "Easy", "Two Pointers", "Slow & Fast Pointers",
    "Remove duplicates in-place such that each unique element appears only once.",
    '''def removeDuplicates(nums):
    if not nums: return 0
    w = 1
    for r in range(1, len(nums)):
        if nums[r] != nums[r - 1]:
            nums[w] = nums[r]
            w += 1
    return w

nums = [1, 1, 2]
k = removeDuplicates(nums)
print("Unique count:", k, nums[:k])''', "O(n)", "O(1)")

add(27, "Remove Element", "Easy", "Two Pointers", "Reader & Writer Pointers",
    "Remove all occurrences of val in nums in-place and return new length.",
    '''def removeElement(nums, val):
    w = 0
    for r in range(len(nums)):
        if nums[r] != val:
            nums[w] = nums[r]
            w += 1
    return w

nums = [3, 2, 2, 3]
k = removeElement(nums, 3)
print("Length:", k, nums[:k])''', "O(n)", "O(1)")

add(88, "Merge Sorted Array", "Easy", "Two Pointers", "Right-to-Left Placement",
    "Merge nums2 into nums1 as one sorted array in-place from the end.",
    '''def merge(nums1, m, nums2, n):
    p1, p2, p = m - 1, n - 1, m + n - 1
    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1
    return nums1

nums1 = [1, 2, 3, 0, 0, 0]
print("Merged:", merge(nums1, 3, [2, 5, 6], 3))''', "O(m + n)", "O(1)")

add(977, "Squares of a Sorted Array", "Easy", "Two Pointers", "Extremes to Center",
    "Return an array of the squares of each number sorted in non-decreasing order.",
    '''def sortedSquares(nums):
    n = len(nums)
    res = [0] * n
    l, r, p = 0, n - 1, n - 1
    while l <= r:
        if abs(nums[l]) > abs(nums[r]):
            res[p] = nums[l] ** 2
            l += 1
        else:
            res[p] = nums[r] ** 2
            r -= 1
        p -= 1
    return res

print("Squares:", sortedSquares([-4, -1, 0, 3, 10]))''', "O(n)", "O(n)")

add(680, "Valid Palindrome II", "Easy", "Two Pointers", "Palindrome with One Skip",
    "Check if string can be palindrome after deleting at most one character.",
    '''def validPalindrome(s):
    def check(l, r):
        while l < r:
            if s[l] != s[r]: return False
            l += 1; r -= 1
        return True
    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]:
            return check(l + 1, r) or check(l, r - 1)
        l += 1; r -= 1
    return True

print("Valid with 1 delete:", validPalindrome("abca"))''', "O(n)", "O(1)")

add(844, "Backspace String Compare", "Easy", "Two Pointers", "Backwards Traversal",
    "Compare two strings containing '#' representing backspace characters.",
    '''def backspaceCompare(s, t):
    def get_clean(string):
        st = []
        for ch in string:
            if ch == "#":
                if st: st.pop()
            else: st.append(ch)
        return "".join(st)
    return get_clean(s) == get_clean(t)

print("Equal:", backspaceCompare("ab#c", "ad#c"))''', "O(n)", "O(n)")

add(922, "Sort Array By Parity II", "Easy", "Two Pointers", "Dual Index Scan",
    "Sort array so half is even and half is odd with nums[i] having same parity as i.",
    '''def sortArrayByParityII(nums):
    n = len(nums)
    j = 1
    for i in range(0, n, 2):
        if nums[i] % 2 != 0:
            while nums[j] % 2 != 0: j += 2
            nums[i], nums[j] = nums[j], nums[i]
    return nums

print("Parity sorted:", sortArrayByParityII([4, 2, 5, 7]))''', "O(n)", "O(1)")

add(344, "Reverse String", "Easy", "Two Pointers", "In-Place Swap",
    "Reverse an array of characters in-place with O(1) extra memory.",
    '''def reverseString(s):
    l, r = 0, len(s) - 1
    while l < r:
        s[l], s[r] = s[r], s[l]
        l += 1; r -= 1
    return s

chars = ["h", "e", "l", "l", "o"]
print("Reversed:", reverseString(chars))''', "O(n)", "O(1)")

add(345, "Reverse Vowels of a String", "Easy", "Two Pointers", "Selective Swap",
    "Reverse only all the vowels in a given string.",
    '''def reverseVowels(s):
    vowels = set("aeiouAEIOU")
    chars = list(s)
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and chars[l] not in vowels: l += 1
        while l < r and chars[r] not in vowels: r -= 1
        chars[l], chars[r] = chars[r], chars[l]
        l += 1; r -= 1
    return "".join(chars)

print("Reversed vowels:", reverseVowels("IceCreAm"))''', "O(n)", "O(n)")

add(80, "Remove Duplicates from Sorted Array II", "Medium", "Two Pointers", "Lookback Writer",
    "Allow duplicates to appear at most twice in-place.",
    '''def removeDuplicates(nums):
    if len(nums) <= 2: return len(nums)
    w = 2
    for r in range(2, len(nums)):
        if nums[r] != nums[w - 2]:
            nums[w] = nums[r]
            w += 1
    return w

nums = [1, 1, 1, 2, 2, 3]
k = removeDuplicates(nums)
print("Count:", k, nums[:k])''', "O(n)", "O(1)")

add(611, "Valid Triangle Number", "Medium", "Two Pointers", "Sort + Fix Largest Side",
    "Count triplets that can form sides of a valid triangle: a + b > c.",
    '''def triangleNumber(nums):
    nums.sort()
    count = 0
    for k in range(len(nums) - 1, 1, -1):
        l, r = 0, k - 1
        while l < r:
            if nums[l] + nums[r] > nums[k]:
                count += r - l
                r -= 1
            else: l += 1
    return count

print("Triangles:", triangleNumber([2, 2, 3, 4]))''', "O(n^2)", "O(1)")

add(986, "Interval List Intersections", "Medium", "Two Pointers", "Intersection Pairing",
    "Find the intersection of two lists of closed intervals.",
    '''def intervalIntersection(A, B):
    i, j = 0, 0
    res = []
    while i < len(A) and j < len(B):
        low = max(A[i][0], B[j][0])
        high = min(A[i][1], B[j][1])
        if low <= high:
            res.append([low, high])
        if A[i][1] < B[j][1]: i += 1
        else: j += 1
    return res

A = [[0,2],[5,10],[13,23],[24,25]]
B = [[1,5],[8,12],[15,24],[25,26]]
print("Intersections:", intervalIntersection(A, B))''', "O(m + n)", "O(1)")

add(82, "Remove Duplicates from Sorted List II", "Medium", "Two Pointers", "Sentinel Node",
    "Delete all nodes that have duplicate numbers from sorted linked array.",
    '''def deleteDuplicates(nums):
    counts = {}
    for n in nums: counts[n] = counts.get(n, 0) + 1
    return [n for n in nums if counts[n] == 1]

print("Distinct:", deleteDuplicates([1, 2, 3, 3, 4, 4, 5]))''', "O(n)", "O(n)")

# ===========================================================================
# 3. SLIDING WINDOW (18 Problems, IDs 51-68)
# ===========================================================================
add(121, "Best Time to Buy and Sell Stock", "Easy", "Sliding Window", "Running Minimum Price",
    "Maximize profit by choosing a single day to buy one stock and choosing a different day in the future to sell.",
    '''def maxProfit(prices):
    min_p = prices[0]
    max_p = 0
    for p in prices:
        if p < min_p: min_p = p
        elif p - min_p > max_p: max_p = p - min_p
    return max_p

print("Max profit:", maxProfit([7, 1, 5, 3, 6, 4]))''', "O(n)", "O(1)")

add(3, "Longest Substring Without Repeating Characters", "Medium", "Sliding Window", "Dynamic Window with Index Map",
    "Find length of longest substring without repeating characters using variable sliding window.",
    '''def lengthOfLongestSubstring(s):
    charMap = {}
    l = 0
    res = 0
    for r in range(len(s)):
        if s[r] in charMap and charMap[s[r]] >= l:
            l = charMap[s[r]] + 1
        charMap[s[r]] = r
        res = max(res, r - l + 1)
    return res

print("Longest non-repeat:", lengthOfLongestSubstring("abcabcbb"))''', "O(n)", "O(min(m, n))")

add(424, "Longest Repeating Character Replacement", "Medium", "Sliding Window", "Max Frequency Balance",
    "Return length of longest substring containing same letter you can get after replacing k chars.",
    '''def characterReplacement(s, k):
    count = {}
    res = 0
    l = 0
    max_f = 0
    for r in range(len(s)):
        count[s[r]] = count.get(s[r], 0) + 1
        max_f = max(max_f, count[s[r]])
        while (r - l + 1) - max_f > k:
            count[s[l]] -= 1
            l += 1
        res = max(res, r - l + 1)
    return res

print("Longest repeating:", characterReplacement("ABAB", 2))''', "O(n)", "O(1)")

add(567, "Permutation in String", "Medium", "Sliding Window", "Fixed Window Frequency Match",
    "Return true if s2 contains a permutation of s1 as a substring.",
    '''def checkInclusion(s1, s2):
    if len(s1) > len(s2): return False
    c1, c2 = {}, {}
    for ch in s1: c1[ch] = c1.get(ch, 0) + 1
    k = len(s1)
    for i in range(len(s2)):
        c2[s2[i]] = c2.get(s2[i], 0) + 1
        if i >= k:
            old = s2[i - k]
            if c2[old] == 1: del c2[old]
            else: c2[old] -= 1
        if c1 == c2: return True
    return False

print("Permutation inside:", checkInclusion("ab", "eidbaooo"))''', "O(n)", "O(1)")

add(76, "Minimum Window Substring", "Hard", "Sliding Window", "Need Map Fulfillment",
    "Find minimum window in s which will contain all the characters in t in complexity O(m + n).",
    '''def minWindow(s, t):
    if not t or not s: return ""
    countT = {}
    for c in t: countT[c] = countT.get(c, 0) + 1
    window = {}
    have, need = 0, len(countT)
    res, resLen = [-1, -1], float("inf")
    l = 0
    for r in range(len(s)):
        c = s[r]
        window[c] = window.get(c, 0) + 1
        if c in countT and window[c] == countT[c]:
            have += 1
        while have == need:
            if (r - l + 1) < resLen:
                res = [l, r]
                resLen = r - l + 1
            window[s[l]] -= 1
            if s[l] in countT and window[s[l]] < countT[s[l]]:
                have -= 1
            l += 1
    return s[res[0]:res[1] + 1] if resLen != float("inf") else ""

print("Min window:", minWindow("ADOBECODEBANC", "ABC"))''', "O(m + n)", "O(m + n)")

add(209, "Minimum Size Subarray Sum", "Medium", "Sliding Window", "Contracting Left Pointer",
    "Find minimal length of subarray whose sum is greater than or equal to target.",
    '''def minSubArrayLen(target, nums):
    l = 0
    total = 0
    min_len = float("inf")
    for r in range(len(nums)):
        total += nums[r]
        while total >= target:
            min_len = min(min_len, r - l + 1)
            total -= nums[l]
            l += 1
    return min_len if min_len != float("inf") else 0

print("Min len:", minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))''', "O(n)", "O(1)")

add(1004, "Max Consecutive Ones III", "Medium", "Sliding Window", "Zero Counter Window",
    "Given binary array and int k, return maximum number of consecutive 1s if you can flip at most k 0s.",
    '''def longestOnes(nums, k):
    l = 0
    zeros = 0
    max_w = 0
    for r in range(len(nums)):
        if nums[r] == 0: zeros += 1
        while zeros > k:
            if nums[l] == 0: zeros -= 1
            l += 1
        max_w = max(max_w, r - l + 1)
    return max_w

print("Max 1s with flips:", longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2))''', "O(n)", "O(1)")

add(1456, "Maximum Number of Vowels in a Substring of Given Length", "Medium", "Sliding Window", "Fixed Window Vowel Counter",
    "Find maximum number of vowel letters in any substring of s with length k.",
    '''def maxVowels(s, k):
    vowels = set("aeiou")
    curr = sum(1 for i in range(k) if s[i] in vowels)
    max_v = curr
    for i in range(k, len(s)):
        if s[i] in vowels: curr += 1
        if s[i - k] in vowels: curr -= 1
        max_v = max(max_v, curr)
    return max_v

print("Max vowels:", maxVowels("abciiidef", 3))''', "O(n)", "O(1)")

add(438, "Find All Anagrams in a String", "Medium", "Sliding Window", "Fixed Window Hash Match",
    "Find all the start indices of p's anagrams in s.",
    '''def findAnagrams(s, p):
    if len(p) > len(s): return []
    cp, cs = {}, {}
    for ch in p: cp[ch] = cp.get(ch, 0) + 1
    k = len(p)
    res = []
    for i in range(len(s)):
        cs[s[i]] = cs.get(s[i], 0) + 1
        if i >= k:
            old = s[i - k]
            if cs[old] == 1: del cs[old]
            else: cs[old] -= 1
        if cs == cp: res.append(i - k + 1)
    return res

print("Anagram indices:", findAnagrams("cbaebabacd", "abc"))''', "O(n)", "O(1)")

add(904, "Fruit Into Baskets", "Medium", "Sliding Window", "At Most 2 Distinct Keys",
    "Pick maximum number of fruits with two baskets where each basket holds only one type.",
    '''def totalFruit(fruits):
    count = {}
    l = 0
    max_f = 0
    for r in range(len(fruits)):
        count[fruits[r]] = count.get(fruits[r], 0) + 1
        while len(count) > 2:
            count[fruits[l]] -= 1
            if count[fruits[l]] == 0: del count[fruits[l]]
            l += 1
        max_f = max(max_f, r - l + 1)
    return max_f

print("Total fruits:", totalFruit([1, 2, 1, 2, 3]))''', "O(n)", "O(1)")

add(1423, "Maximum Points You Can Obtain from Cards", "Medium", "Sliding Window", "Inverted Window Minimization",
    "Maximize score by taking k cards from either the beginning or the end of the row.",
    '''def maxScore(cardPoints, k):
    n = len(cardPoints)
    window_size = n - k
    curr_sum = sum(cardPoints[:window_size])
    min_sum = curr_sum
    total = sum(cardPoints)
    for i in range(window_size, n):
        curr_sum += cardPoints[i] - cardPoints[i - window_size]
        min_sum = min(min_sum, curr_sum)
    return total - min_sum

print("Max score:", maxScore([1, 2, 3, 4, 5, 6, 1], 3))''', "O(n)", "O(1)")

add(1876, "Substrings of Size Three with Distinct Characters", "Easy", "Sliding Window", "Fixed Window Size 3",
    "Count good substrings of size 3 with no repeated characters.",
    '''def countGoodSubstrings(s):
    count = 0
    for i in range(len(s) - 2):
        if len(set(s[i:i + 3])) == 3:
            count += 1
    return count

print("Good substrings:", countGoodSubstrings("xyzzaz"))''', "O(n)", "O(1)")

add(643, "Maximum Average Subarray I", "Easy", "Sliding Window", "Fixed Window Average",
    "Find contiguous subarray of length k with maximum average value.",
    '''def findMaxAverage(nums, k):
    curr = sum(nums[:k])
    max_s = curr
    for i in range(k, len(nums)):
        curr += nums[i] - nums[i - k]
        max_s = max(max_s, curr)
    return max_s / k

print("Max avg:", findMaxAverage([1, 12, -5, -6, 50, 3], 4))''', "O(n)", "O(1)")

add(1493, "Longest Subarray of 1's After Deleting One Element", "Medium", "Sliding Window", "Single Zero Allowance",
    "Return size of longest non-empty subarray containing only 1s after deleting one element.",
    '''def longestSubarray(nums):
    l = 0
    zeros = 0
    max_w = 0
    for r in range(len(nums)):
        if nums[r] == 0: zeros += 1
        while zeros > 1:
            if nums[l] == 0: zeros -= 1
            l += 1
        max_w = max(max_w, r - l)
    return max_w

print("Longest after delete:", longestSubarray([1, 1, 0, 1]))''', "O(n)", "O(1)")

add(1208, "Get Equal Substrings Within Budget", "Medium", "Sliding Window", "Cost Accumulation Window",
    "Find maximum length of substring of s that can be changed to t within maxCost budget.",
    '''def equalSubstring(s, t, maxCost):
    l = 0
    cost = 0
    max_len = 0
    for r in range(len(s)):
        cost += abs(ord(s[r]) - ord(t[r]))
        while cost > maxCost:
            cost -= abs(ord(s[l]) - ord(t[l]))
            l += 1
        max_len = max(max_len, r - l + 1)
    return max_len

print("Max equal len:", equalSubstring("abcd", "bcdf", 3))''', "O(n)", "O(1)")

add(1358, "Number of Substrings Containing All Three Characters", "Medium", "Sliding Window", "Last Seen Indices",
    "Return the number of substrings containing at least one occurrence of all 'a', 'b', and 'c'.",
    '''def numberOfSubstrings(s):
    last = {'a': -1, 'b': -1, 'c': -1}
    count = 0
    for i, ch in enumerate(s):
        last[ch] = i
        count += 1 + min(last['a'], last['b'], last['c'])
    return count

print("Substrings with abc:", numberOfSubstrings("abcabc"))''', "O(n)", "O(1)")

add(1838, "Frequency of the Most Frequent Element", "Medium", "Sliding Window", "Sort + Window Cost Check",
    "Return maximum possible frequency of an element after at most k increments.",
    '''def maxFrequency(nums, k):
    nums.sort()
    l = 0
    total = 0
    res = 1
    for r in range(len(nums)):
        total += nums[r]
        while nums[r] * (r - l + 1) > total + k:
            total -= nums[l]
            l += 1
        res = max(res, r - l + 1)
    return res

print("Max freq:", maxFrequency([1, 2, 4], 5))''', "O(n log n)", "O(1)")

add(992, "Subarrays with K Different Integers", "Hard", "Sliding Window", "AtMost(K) - AtMost(K-1)",
    "Count subarrays with exactly k distinct integers using difference of two sliding windows.",
    '''def subarraysWithKDistinct(nums, k):
    def atMost(k_val):
        count = {}
        l = 0
        ans = 0
        for r in range(len(nums)):
            count[nums[r]] = count.get(nums[r], 0) + 1
            while len(count) > k_val:
                count[nums[l]] -= 1
                if count[nums[l]] == 0: del count[nums[l]]
                l += 1
            ans += r - l + 1
        return ans
    return atMost(k) - atMost(k - 1)

print("Exact K subarrays:", subarraysWithKDistinct([1, 2, 1, 2, 3], 2))''', "O(n)", "O(n)")

# ===========================================================================
# 4. STACK & MONOTONIC STACK (20 Problems, IDs 69-88)
# ===========================================================================
add(20, "Valid Parentheses", "Easy", "Stack", "LIFO Matching",
    "Determine if the input string containing brackets '()', '{}', '[]' is valid.",
    '''def isValid(s):
    stack = []
    closeToOpen = {")": "(", "}": "{", "]": "["}
    for c in s:
        if c in closeToOpen:
            if stack and stack[-1] == closeToOpen[c]: stack.pop()
            else: return False
        else: stack.append(c)
    return len(stack) == 0

print("Is valid:", isValid("()[]{}"))''', "O(n)", "O(n)")

add(155, "Min Stack", "Medium", "Stack", "Pair / Auxiliary Min Stack",
    "Design a stack that supports push, pop, top, and retrieving minimum element in O(1).",
    '''class MinStack:
    def __init__(self):
        self.stack = []
        self.minStack = []
    def push(self, val):
        self.stack.append(val)
        val = min(val, self.minStack[-1] if self.minStack else val)
        self.minStack.append(val)
    def pop(self):
        self.stack.pop()
        self.minStack.pop()
    def top(self): return self.stack[-1]
    def getMin(self): return self.minStack[-1]

ms = MinStack()
ms.push(-2); ms.push(0); ms.push(-3)
print("Min:", ms.getMin())
ms.pop()
print("Top:", ms.top())''', "O(1)", "O(n)")

add(150, "Evaluate Reverse Polish Notation", "Medium", "Stack", "Operand Stack Evaluation",
    "Evaluate value of arithmetic expression in Reverse Polish Notation.",
    '''def evalRPN(tokens):
    stack = []
    for t in tokens:
        if t in "+-*/":
            b = stack.pop()
            a = stack.pop()
            if t == "+": stack.append(a + b)
            elif t == "-": stack.append(a - b)
            elif t == "*": stack.append(a * b)
            elif t == "/": stack.append(int(a / b))
        else: stack.append(int(t))
    return stack[0]

print("RPN:", evalRPN(["2", "1", "+", "3", "*"]))''', "O(n)", "O(n)")

add(22, "Generate Parentheses", "Medium", "Stack", "Backtracking with Stack Constraint",
    "Generate all combinations of well-formed parentheses given n pairs.",
    '''def generateParenthesis(n):
    res = []
    def backtrack(open_c, close_c, path):
        if len(path) == 2 * n:
            res.append(path)
            return
        if open_c < n: backtrack(open_c + 1, close_c, path + "(")
        if close_c < open_c: backtrack(open_c, close_c + 1, path + ")")
    backtrack(0, 0, "")
    return res

print("Parentheses (n=3):", generateParenthesis(3))''', "O(4^n / sqrt(n))", "O(n)")

add(739, "Daily Temperatures", "Medium", "Stack", "Monotonic Decreasing Stack",
    "Find number of days you have to wait until warmer temperature using monotonic stack.",
    '''def dailyTemperatures(temperatures):
    res = [0] * len(temperatures)
    stack = [] # pair: [temp, index]
    for i, t in enumerate(temperatures):
        while stack and t > stack[-1][0]:
            stackT, stackIdx = stack.pop()
            res[stackIdx] = i - stackIdx
        stack.append([t, i])
    return res

print("Days:", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))''', "O(n)", "O(n)")

add(853, "Car Fleet", "Medium", "Stack", "Position Sort + Time Monotonic Stack",
    "Find how many car fleets will arrive at destination target point.",
    '''def carFleet(target, position, speed):
    pair = [[p, s] for p, s in zip(position, speed)]
    pair.sort(key=lambda x: x[0], reverse=True)
    stack = []
    for p, s in pair:
        time = (target - p) / s
        if not stack or time > stack[-1]:
            stack.append(time)
    return len(stack)

print("Fleets:", carFleet(12, [10,8,0,5,3], [2,4,1,1,3]))''', "O(n log n)", "O(n)")

add(84, "Largest Rectangle in Histogram", "Hard", "Stack", "Monotonic Increasing Stack",
    "Find area of largest rectangle in histogram of bar heights.",
    '''def largestRectangleArea(heights):
    maxArea = 0
    stack = [] # pair: (index, height)
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            index, height = stack.pop()
            maxArea = max(maxArea, height * (i - index))
            start = index
        stack.append((start, h))
    for i, h in stack:
        maxArea = max(maxArea, h * (len(heights) - i))
    return maxArea

print("Largest rectangle:", largestRectangleArea([2, 1, 5, 6, 2, 3]))''', "O(n)", "O(n)")

add(71, "Simplify Path", "Medium", "Stack", "Directory Token Stack",
    "Transform absolute Unix path into simplified canonical path.",
    '''def simplifyPath(path):
    stack = []
    for part in path.split("/"):
        if part == "" or part == ".": continue
        elif part == "..":
            if stack: stack.pop()
        else: stack.append(part)
    return "/" + "/".join(stack)

print("Canonical path:", simplifyPath("/home//foo/../bar/"))''', "O(n)", "O(n)")

add(394, "Decode String", "Medium", "Stack", "Dual Stack (Multiplier & String)",
    "Decode encoded string where k[encoded_string] is repeated k times.",
    '''def decodeString(s):
    num_stack, str_stack = [], []
    curr_num, curr_str = 0, ""
    for ch in s:
        if ch.isdigit(): curr_num = curr_num * 10 + int(ch)
        elif ch == "[":
            num_stack.append(curr_num)
            str_stack.append(curr_str)
            curr_num, curr_str = 0, ""
        elif ch == "]":
            k = num_stack.pop()
            prev = str_stack.pop()
            curr_str = prev + curr_str * k
        else: curr_str += ch
    return curr_str

print("Decoded:", decodeString("3[a2[c]]"))''', "O(n)", "O(n)")

add(946, "Validate Stack Sequences", "Medium", "Stack", "Greedy Stack Simulation",
    "Return true if pushed and popped sequences could be result of push and pop operations.",
    '''def validateStackSequences(pushed, popped):
    stack = []
    j = 0
    for x in pushed:
        stack.append(x)
        while stack and j < len(popped) and stack[-1] == popped[j]:
            stack.pop()
            j += 1
    return j == len(popped)

print("Valid sequences:", validateStackSequences([1,2,3,4,5], [4,5,3,2,1]))''', "O(n)", "O(n)")

add(496, "Next Greater Element I", "Easy", "Stack", "Monotonic Stack + Hash Map",
    "Find next greater element for each value in subset array nums1.",
    '''def nextGreaterElement(nums1, nums2):
    mapping = {}
    stack = []
    for n in nums2:
        while stack and n > stack[-1]:
            mapping[stack.pop()] = n
        stack.append(n)
    return [mapping.get(n, -1) for n in nums1]

print("Next greater:", nextGreaterElement([4, 1, 2], [1, 3, 4, 2]))''', "O(n)", "O(n)")

add(503, "Next Greater Element II", "Medium", "Stack", "Circular Monotonic Stack (2N)",
    "Find next greater element in circular array using 2N scan with modulo.",
    '''def nextGreaterElements(nums):
    n = len(nums)
    res = [-1] * n
    stack = []
    for i in range(2 * n):
        num = nums[i % n]
        while stack and nums[stack[-1]] < num:
            res[stack.pop()] = num
        if i < n: stack.append(i)
    return res

print("Circular greater:", nextGreaterElements([1, 2, 1]))''', "O(n)", "O(n)")

add(682, "Baseball Game", "Easy", "Stack", "Operation Simulation",
    "Calculate sum of points scored in baseball game using stack operations.",
    '''def calPoints(ops):
    stack = []
    for op in ops:
        if op == "+": stack.append(stack[-1] + stack[-2])
        elif op == "D": stack.append(stack[-1] * 2)
        elif op == "C": stack.pop()
        else: stack.append(int(op))
    return sum(stack)

print("Total points:", calPoints(["5", "2", "C", "D", "+"]))''', "O(n)", "O(n)")

add(1047, "Remove All Adjacent Duplicates In String", "Easy", "Stack", "Stack Deduplication",
    "Remove adjacent matching duplicate characters until no duplicates remain.",
    '''def removeDuplicates(s):
    stack = []
    for ch in s:
        if stack and stack[-1] == ch: stack.pop()
        else: stack.append(ch)
    return "".join(stack)

print("Deduplicated:", removeDuplicates("abbaca"))''', "O(n)", "O(n)")

add(1209, "Remove All Adjacent Duplicates in String II", "Medium", "Stack", "Count Tracking Stack",
    "Repeatedly remove k adjacent duplicates from string using [char, count] stack.",
    '''def removeDuplicatesII(s, k):
    stack = []
    for c in s:
        if stack and stack[-1][0] == c:
            stack[-1][1] += 1
            if stack[-1][1] == k: stack.pop()
        else: stack.append([c, 1])
    return "".join(c * cnt for c, cnt in stack)

print("K-deduplicated:", removeDuplicatesII("deeedbbcccbdaa", 3))''', "O(n)", "O(n)")

add(402, "Remove K Digits", "Medium", "Stack", "Greedy Monotonic Decreasing",
    "Remove k digits from number string to make remaining number as small as possible.",
    '''def removeKdigits(num, k):
    stack = []
    for digit in num:
        while k > 0 and stack and stack[-1] > digit:
            stack.pop()
            k -= 1
        stack.append(digit)
    stack = stack[:len(stack) - k] if k > 0 else stack
    res = "".join(stack).lstrip("0")
    return res if res else "0"

print("Smallest num:", removeKdigits("1432219", 3))''', "O(n)", "O(n)")

add(316, "Remove Duplicate Letters", "Medium", "Stack", "Lexicographical Monotonic Stack",
    "Remove duplicate letters so every letter appears once and result is smallest in lexicographical order.",
    '''def removeDuplicateLetters(s):
    last_occ = {c: i for i, c in enumerate(s)}
    seen = set()
    stack = []
    for i, c in enumerate(s):
        if c not in seen:
            while stack and c < stack[-1] and i < last_occ[stack[-1]]:
                seen.remove(stack.pop())
            seen.add(c)
            stack.append(c)
    return "".join(stack)

print("Smallest unique:", removeDuplicateLetters("bcabc"))''', "O(n)", "O(1)")

add(901, "Online Stock Span", "Medium", "Stack", "Price & Span Aggregation Stack",
    "Design class that calculates span of stock's price today.",
    '''class StockSpanner:
    def __init__(self):
        self.stack = []
    def next(self, price):
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        self.stack.append((price, span))
        return span

ss = StockSpanner()
print("Spans:", [ss.next(p) for p in [100, 80, 60, 70, 60, 75, 85]])''', "O(1)", "O(n)")

add(735, "Asteroid Collision", "Medium", "Stack", "Opposing Direction Collisions",
    "Find out state of asteroids after all collisions between positive (right) and negative (left).",
    '''def asteroidCollision(asteroids):
    stack = []
    for a in asteroids:
        while stack and a < 0 and stack[-1] > 0:
            diff = a + stack[-1]
            if diff < 0: stack.pop()
            elif diff > 0: a = 0
            else:
                a = 0; stack.pop()
        if a: stack.append(a)
    return stack

print("Remaining asteroids:", asteroidCollision([5, 10, -5]))''', "O(n)", "O(n)")

add(85, "Maximal Rectangle", "Hard", "Stack", "Histogram Rows Accumulation",
    "Find largest rectangle containing only 1s in a binary matrix.",
    '''def maximalRectangle(matrix):
    if not matrix: return 0
    cols = len(matrix[0])
    heights = [0] * (cols + 1)
    max_area = 0
    for row in matrix:
        for i in range(cols):
            heights[i] = heights[i] + 1 if row[i] == "1" else 0
        stack = []
        for i in range(len(heights)):
            while stack and heights[i] < heights[stack[-1]]:
                h = heights[stack.pop()]
                w = i if not stack else i - stack[-1] - 1
                max_area = max(max_area, h * w)
            stack.append(i)
    return max_area

grid = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
print("Maximal rectangle:", maximalRectangle(grid))''', "O(m*n)", "O(n)")

# ===========================================================================
# 5. BINARY SEARCH (20 Problems, IDs 89-108)
# ===========================================================================
add(704, "Binary Search", "Easy", "Binary Search", "Standard Template",
    "Search target in sorted array in O(log n) runtime using two pointers midpoint division.",
    '''def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: l = mid + 1
        else: r = mid - 1
    return -1

print("Found index:", search([-1, 0, 3, 5, 9, 12], 9))''', "O(log n)", "O(1)")

add(74, "Search a 2D Matrix", "Medium", "Binary Search", "Flattened 2D Binary Search",
    "Search target in m x n integer matrix with sorted rows and first element > last of previous row.",
    '''def searchMatrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    l, r = 0, m * n - 1
    while l <= r:
        mid = (l + r) // 2
        val = matrix[mid // n][mid % n]
        if val == target: return True
        elif val < target: l = mid + 1
        else: r = mid - 1
    return False

mat = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
print("Found in 2D:", searchMatrix(mat, 3))''', "O(log(m*n))", "O(1)")

add(240, "Search a 2D Matrix II", "Medium", "Binary Search", "Top-Right Elimination",
    "Search target in matrix where rows and columns are sorted independently.",
    '''def searchMatrixII(matrix, target):
    r, c = 0, len(matrix[0]) - 1
    while r < len(matrix) and c >= 0:
        if matrix[r][c] == target: return True
        elif matrix[r][c] > target: c -= 1
        else: r += 1
    return False

mat = [[1,4,7],[2,5,8],[3,6,9]]
print("Found in matrix II:", searchMatrixII(mat, 5))''', "O(m + n)", "O(1)")

add(875, "Koko Eating Bananas", "Medium", "Binary Search", "Binary Search on Answer",
    "Find minimum integer eating speed k such that Koko can eat all bananas within h hours.",
    '''def minEatingSpeed(piles, h):
    l, r = 1, max(piles)
    res = r
    while l <= r:
        k = (l + r) // 2
        hours = sum((p + k - 1) // k for p in piles)
        if hours <= h:
            res = k
            r = k - 1
        else: l = k + 1
    return res

print("Min eating speed:", minEatingSpeed([3, 6, 7, 11], 8))''', "O(n log m)", "O(1)")

add(153, "Find Minimum in Rotated Sorted Array", "Medium", "Binary Search", "Pivot Search",
    "Find minimum element in rotated sorted array of unique elements in O(log n).",
    '''def findMin(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) // 2
        if nums[mid] > nums[r]: l = mid + 1
        else: r = mid
    return nums[l]

print("Minimum:", findMin([3, 4, 5, 1, 2]))''', "O(log n)", "O(1)")

add(33, "Search in Rotated Sorted Array", "Medium", "Binary Search", "Sorted Half Detection",
    "Search target in rotated sorted array in O(log n) time.",
    '''def searchRotated(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target: return mid
        # Left half sorted
        if nums[l] <= nums[mid]:
            if nums[l] <= target < nums[mid]: r = mid - 1
            else: l = mid + 1
        # Right half sorted
        else:
            if nums[mid] < target <= nums[r]: l = mid + 1
            else: r = mid - 1
    return -1

print("Rotated search index:", searchRotated([4, 5, 6, 7, 0, 1, 2], 0))''', "O(log n)", "O(1)")

add(981, "Time Based Key-Value Store", "Medium", "Binary Search", "Timestamp Binary Search",
    "Design time-based key-value store that supports get and set with timestamp search.",
    '''class TimeMap:
    def __init__(self):
        self.store = {}
    def set(self, key, value, timestamp):
        if key not in self.store: self.store[key] = []
        self.store[key].append((timestamp, value))
    def get(self, key, timestamp):
        res = ""
        values = self.store.get(key, [])
        l, r = 0, len(values) - 1
        while l <= r:
            m = (l + r) // 2
            if values[m][0] <= timestamp:
                res = values[m][1]
                l = m + 1
            else: r = m - 1
        return res

tm = TimeMap()
tm.set("foo", "bar", 1)
print("Get timestamp 1:", tm.get("foo", 1))
print("Get timestamp 3:", tm.get("foo", 3))''', "O(log n)", "O(n)")

add(4, "Median of Two Sorted Arrays", "Hard", "Binary Search", "Partition Partitioning",
    "Find the median of the two sorted arrays in O(log(m+n)) runtime.",
    '''def findMedianSortedArrays(nums1, nums2):
    A, B = nums1, nums2
    if len(B) < len(A): A, B = B, A
    total = len(A) + len(B)
    half = total // 2
    l, r = 0, len(A) - 1
    while True:
        i = (l + r) // 2
        j = half - i - 2
        Aleft = A[i] if i >= 0 else float("-inf")
        Aright = A[i + 1] if (i + 1) < len(A) else float("inf")
        Bleft = B[j] if j >= 0 else float("-inf")
        Bright = B[j + 1] if (j + 1) < len(B) else float("inf")
        if Aleft <= Bright and Bleft <= Aright:
            if total % 2: return min(Aright, Bright)
            return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
        elif Aleft > Bright: r = i - 1
        else: l = i + 1

print("Median:", findMedianSortedArrays([1, 3], [2]))''', "O(log(min(m, n)))", "O(1)")

add(35, "Search Insert Position", "Easy", "Binary Search", "Lower Bound Search",
    "Return the index if target is found. If not, return index where it would be inserted.",
    '''def searchInsert(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: l = mid + 1
        else: r = mid - 1
    return l

print("Insert pos:", searchInsert([1, 3, 5, 6], 5))''', "O(log n)", "O(1)")

add(34, "Find First and Last Position of Element in Sorted Array", "Medium", "Binary Search", "Dual Bound Search",
    "Find the starting and ending position of a given target value in sorted array.",
    '''def searchRange(nums, target):
    def findBound(isFirst):
        l, r = 0, len(nums) - 1
        ans = -1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                ans = mid
                if isFirst: r = mid - 1
                else: l = mid + 1
            elif nums[mid] < target: l = mid + 1
            else: r = mid - 1
        return ans
    return [findBound(True), findBound(False)]

print("Range:", searchRange([5, 7, 7, 8, 8, 10], 8))''', "O(log n)", "O(1)")

add(69, "Sqrt(x)", "Easy", "Binary Search", "Integer Binary Search",
    "Compute and return the square root of x rounded down to nearest integer.",
    '''def mySqrt(x):
    l, r = 0, x
    res = 0
    while l <= r:
        m = (l + r) // 2
        if m * m <= x:
            res = m
            l = m + 1
        else: r = m - 1
    return res

print("Sqrt(8):", mySqrt(8))''', "O(log x)", "O(1)")

add(162, "Find Peak Element", "Medium", "Binary Search", "Gradient Climb Search",
    "Find a peak element (strictly greater than its neighbors) in O(log n) time.",
    '''def findPeakElement(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) // 2
        if nums[mid] > nums[mid + 1]: r = mid
        else: l = mid + 1
    return l

print("Peak index:", findPeakElement([1, 2, 3, 1]))''', "O(log n)", "O(1)")

add(278, "First Bad Version", "Easy", "Binary Search", "Boundary Transition Search",
    "Find first bad version using minimum calls to API isBadVersion(v).",
    '''def firstBadVersion(n):
    # Simulated API: version >= 4 is bad
    def isBadVersion(v): return v >= 4
    l, r = 1, n
    while l < r:
        m = (l + r) // 2
        if isBadVersion(m): r = m
        else: l = m + 1
    return l

print("First bad version:", firstBadVersion(5))''', "O(log n)", "O(1)")

add(367, "Valid Perfect Square", "Easy", "Binary Search", "Square Midpoint Comparison",
    "Return true if num is a perfect square without using built-in sqrt.",
    '''def isPerfectSquare(num):
    l, r = 1, num
    while l <= r:
        m = (l + r) // 2
        sq = m * m
        if sq == num: return True
        elif sq < num: l = m + 1
        else: r = m - 1
    return False

print("Is 16 perfect square:", isPerfectSquare(16))''', "O(log n)", "O(1)")

add(540, "Single Element in a Sorted Array", "Medium", "Binary Search", "Even/Odd Index Parity",
    "Find single element in sorted array where all others appear twice in O(log n).",
    '''def singleNonDuplicate(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) // 2
        if mid % 2 == 1: mid -= 1
        if nums[mid] == nums[mid + 1]: l = mid + 2
        else: r = mid
    return nums[l]

print("Single element:", singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8]))''', "O(log n)", "O(1)")

add(1011, "Capacity To Ship Packages Within D Days", "Medium", "Binary Search", "Binary Search on Capacity",
    "Find least weight capacity of ship that will result in all packages shipped within days.",
    '''def shipWithinDays(weights, days):
    l, r = max(weights), sum(weights)
    res = r
    while l <= r:
        cap = (l + r) // 2
        d, curr = 1, 0
        for w in weights:
            if curr + w > cap:
                d += 1
                curr = 0
            curr += w
        if d <= days:
            res = cap
            r = cap - 1
        else: l = cap + 1
    return res

print("Min capacity:", shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5))''', "O(n log(sum-max))", "O(1)")

add(410, "Split Array Largest Sum", "Hard", "Binary Search", "Minimax Binary Search",
    "Split nums into k non-empty subarrays such that largest sum among subarrays is minimized.",
    '''def splitArray(nums, k):
    l, r = max(nums), sum(nums)
    res = r
    while l <= r:
        mid = (l + r) // 2
        subarrays, curr = 1, 0
        for n in nums:
            if curr + n > mid:
                subarrays += 1
                curr = 0
            curr += n
        if subarrays <= k:
            res = mid
            r = mid - 1
        else: l = mid + 1
    return res

print("Minimax sum:", splitArray([7, 2, 5, 10, 8], 2))''', "O(n log(sum))", "O(1)")

add(852, "Peak Index in a Mountain Array", "Medium", "Binary Search", "Peak Binary Search",
    "Find index of peak element in guaranteed mountain array in O(log n).",
    '''def peakIndexInMountainArray(arr):
    l, r = 0, len(arr) - 1
    while l < r:
        mid = (l + r) // 2
        if arr[mid] < arr[mid + 1]: l = mid + 1
        else: r = mid
    return l

print("Peak index:", peakIndexInMountainArray([0, 10, 5, 2]))''', "O(log n)", "O(1)")

add(441, "Arranging Coins", "Easy", "Binary Search", "Gauss Sum Binary Search",
    "Find number of complete rows of staircase that can be built with n coins.",
    '''def arrangeCoins(n):
    l, r = 1, n
    res = 0
    while l <= r:
        m = (l + r) // 2
        coins = m * (m + 1) // 2
        if coins <= n:
            res = m
            l = m + 1
        else: r = m - 1
    return res

print("Complete rows:", arrangeCoins(8))''', "O(log n)", "O(1)")

add(154, "Find Minimum in Rotated Sorted Array II", "Hard", "Binary Search", "Duplicate Shrinking",
    "Find minimum element in rotated sorted array that may contain duplicates.",
    '''def findMinII(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) // 2
        if nums[mid] > nums[r]: l = mid + 1
        elif nums[mid] < nums[r]: r = mid
        else: r -= 1
    return nums[l]

print("Min with duplicates:", findMinII([2, 2, 2, 0, 1]))''', "O(log n)", "O(1)")

print(f"Loaded {len(problems)} problems (1-108).")

with open("scratch/problems_part2.json", "w") as f:
    json.dump(problems, f)
