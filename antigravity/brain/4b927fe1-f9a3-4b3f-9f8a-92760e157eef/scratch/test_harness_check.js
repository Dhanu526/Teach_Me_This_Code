const fs = require('fs');
const vm = require('vm');
const path = require('path');

const engineCode = fs.readFileSync('app_build/engine.js', 'utf8');
const sb = { console, Math, Number, String, Array, Object, Set, Map, JSON, Date, window: {} };
vm.createContext(sb);
vm.runInContext(engineCode, sb);
const engine = new sb.window.PythonExecutionEngine();

const userTwoSum = `
def twoSum(nums, target):
    prevMap = {}
    for i in range(len(nums)):
        diff = target - nums[i]
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[nums[i]] = i
    return []
`;

const flawedTwoSum = `
def twoSum(nums, target):
    return [0, 0]
`;

const testCases = [
  { testIndex: 1, inputStr: 'nums = [2, 7, 11, 15], target = 9', callCode: 'twoSum([2, 7, 11, 15], 9)', expectedOutput: '[0, 1]' },
  { testIndex: 2, inputStr: 'nums = [3, 2, 4], target = 6', callCode: 'twoSum([3, 2, 4], 6)', expectedOutput: '[1, 2]' },
  { testIndex: 3, inputStr: 'nums = [3, 3], target = 6', callCode: 'twoSum([3, 3], 6)', expectedOutput: '[0, 1]' }
];

function runTests(code) {
  let passedCount = 0;
  const results = [];
  for (const tc of testCases) {
    const harness = `\n${code}\n__test_val__ = ${tc.callCode}\n`;
    const trace = engine.trace(harness, '');
    if (!trace.ok) {
      results.push({ testIndex: tc.testIndex, passed: false, actualOutput: 'Error: ' + trace.error, expectedOutput: tc.expectedOutput });
    } else {
      const lastStep = trace.steps[trace.steps.length - 1];
      const v = (lastStep.variables || []).find(x => x.name === '__test_val__');
      const actual = v ? v.current : 'None';
      const passed = String(actual).replace(/\s+/g, '') === String(tc.expectedOutput).replace(/\s+/g, '');
      if (passed) passedCount++;
      results.push({ testIndex: tc.testIndex, passed, actualOutput: actual, expectedOutput: tc.expectedOutput });
    }
  }
  return { total: testCases.length, passed: passedCount, results };
}

console.log("Good Code Results:", runTests(userTwoSum));
console.log("Flawed Code Results:", runTests(flawedTwoSum));
