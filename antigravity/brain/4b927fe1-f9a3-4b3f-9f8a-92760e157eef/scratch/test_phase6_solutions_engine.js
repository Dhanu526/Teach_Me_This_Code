// scratch/test_phase6_solutions_engine.js
// Verify that baseline and optimized solutions execute cleanly in PythonExecutionEngine

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const engineCode = fs.readFileSync('app_build/engine.js', 'utf8');
const sb = { console, Math, Number, String, Array, Object, Set, Map, JSON, Date, window: {} };
vm.createContext(sb);
vm.runInContext(engineCode, sb);
const engine = new sb.window.PythonExecutionEngine();

function testSolution(name, code, callCode, expectedOutput) {
  const harness = `\n${code}\n__res__ = ${callCode}\n`;
  const trace = engine.trace(harness, "");
  if (!trace.ok) {
    return { name, ok: false, error: trace.error };
  }
  const lastStep = trace.steps[trace.steps.length - 1];
  const v = (lastStep.variables || []).find(x => x.name === '__res__');
  const actual = v ? v.current : 'None';
  const normActual = String(actual).replace(/\s+/g, '');
  const normExpected = String(expectedOutput).replace(/\s+/g, '');
  const matches = (normActual === normExpected);
  return {
    name,
    ok: matches,
    actual,
    expected: expectedOutput,
    steps: trace.steps.length
  };
}

console.log("Testing Sample Dual Approaches:");

// 1. Two Sum
const twoSumBaseline = `
def twoSum(nums, target):
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
`;
const twoSumOptimized = `
def twoSum(nums, target):
    prevMap = {}
    for i in range(len(nums)):
        diff = target - nums[i]
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[nums[i]] = i
    return []
`;
console.log("1. Two Sum (Baseline):", testSolution("TwoSum Baseline", twoSumBaseline, "twoSum([2, 7, 11, 15], 9)", "[0, 1]"));
console.log("1. Two Sum (Optimized):", testSolution("TwoSum Optimized", twoSumOptimized, "twoSum([2, 7, 11, 15], 9)", "[0, 1]"));

// 2. Contains Duplicate
const containsDupBaseline = `
def containsDuplicate(nums):
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] == nums[j]:
                return True
    return False
`;
const containsDupOptimized = `
def containsDuplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False
`;
console.log("2. Contains Duplicate (Baseline):", testSolution("ContainsDup Baseline", containsDupBaseline, "containsDuplicate([1, 2, 3, 1])", "True"));
console.log("2. Contains Duplicate (Optimized):", testSolution("ContainsDup Optimized", containsDupOptimized, "containsDuplicate([1, 2, 3, 1])", "True"));

// 3. Best Time to Buy and Sell Stock
const maxProfitBaseline = `
def maxProfit(prices):
    max_p = 0
    n = len(prices)
    for i in range(n):
        for j in range(i + 1, n):
            profit = prices[j] - prices[i]
            if profit > max_p:
                max_p = profit
    return max_p
`;
const maxProfitOptimized = `
def maxProfit(prices):
    min_price = prices[0]
    max_p = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_p:
            max_p = p - min_price
    return max_p
`;
console.log("3. Max Profit (Baseline):", testSolution("MaxProfit Baseline", maxProfitBaseline, "maxProfit([7, 1, 5, 3, 6, 4])", "5"));
console.log("3. Max Profit (Optimized):", testSolution("MaxProfit Optimized", maxProfitOptimized, "maxProfit([7, 1, 5, 3, 6, 4])", "5"));

// 4. Maximum Subarray
const maxSubArrayBaseline = `
def maxSubArray(nums):
    max_s = nums[0]
    n = len(nums)
    for i in range(n):
        curr_s = 0
        for j in range(i, n):
            curr_s += nums[j]
            if curr_s > max_s:
                max_s = curr_s
    return max_s
`;
const maxSubArrayOptimized = `
def maxSubArray(nums):
    max_sum = nums[0]
    curr_sum = 0
    for n in nums:
        curr_sum += n
        if curr_sum > max_sum:
            max_sum = curr_sum
        if curr_sum < 0:
            curr_sum = 0
    return max_sum
`;
console.log("4. Max Subarray (Baseline):", testSolution("MaxSubArray Baseline", maxSubArrayBaseline, "maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])", "6"));
console.log("4. Max Subarray (Optimized):", testSolution("MaxSubArray Optimized", maxSubArrayOptimized, "maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])", "6"));
