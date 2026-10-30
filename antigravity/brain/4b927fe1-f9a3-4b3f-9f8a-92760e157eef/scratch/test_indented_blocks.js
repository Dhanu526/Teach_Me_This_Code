const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appBuildDir = path.resolve(__dirname, '..', '..', '..', 'scratch', 'code-flow-visualizer', 'app_build');
const enginePath = path.join(appBuildDir, 'engine.js');

const mockWindow = {
  location: { protocol: "file:" },
  PRELOADED_PROGRAMS: {}
};
const context = vm.createContext({
  window: mockWindow,
  document: {},
  console,
  Math,
  Number,
  String,
  Array,
  Object,
  Set,
  Map,
  JSON
});

vm.runInContext(fs.readFileSync(enginePath, 'utf8'), context);
const engine = new mockWindow.PythonExecutionEngine();

const formattedKadane = `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
max_sum = nums[0]
curr_sum = 0
for n in nums:
    curr_sum += n
    if curr_sum > max_sum:
        max_sum = curr_sum
    if curr_sum < 0:
        curr_sum = 0
print("Max subarray:", max_sum)`;

const res1 = engine.trace(formattedKadane, "");
console.log("Kadane with indented blocks:", res1.ok, "Steps:", res1.steps ? res1.steps.length : 0);

const formattedBS = `def search(nums, target):
    l = 0
    r = len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    return -1

ans = search([-1, 0, 3, 5, 9, 12], 9)
print("Found index:", ans)`;

const res2 = engine.trace(formattedBS, "");
console.log("Binary Search with indented blocks:", res2.ok, "Steps:", res2.steps ? res2.steps.length : 0);

const formattedPal = `def isPalindrome(s):
    cleaned = []
    for ch in s:
        if ch.isalnum():
            cleaned.append(ch.lower())
    l = 0
    r = len(cleaned) - 1
    while l < r:
        if cleaned[l] != cleaned[r]:
            return False
        l += 1
        r -= 1
    return True

res = isPalindrome("A man, a plan, a canal: Panama")
print("Is palindrome:", res)`;

const res3 = engine.trace(formattedPal, "");
console.log("Valid Palindrome with indented blocks:", res3.ok, "Steps:", res3.steps ? res3.steps.length : 0);
