const fs = require('fs');
const vm = require('vm');
const path = require('path');

const engineCode = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'scratch', 'code-flow-visualizer', 'app_build', 'engine.js'), 'utf8');
const sandbox = { console, Math, Number, String, Array, Object, Set, Map, JSON, Date, window: {} };
vm.createContext(sandbox);
vm.runInContext(engineCode, sandbox);

const PythonExecutionEngine = sandbox.window.PythonExecutionEngine;
const engine = new PythonExecutionEngine();

// Prototype function runner
function runPythonFunction(userCode, funcName, args) {
  // Construct wrapper script that defines function and executes call
  const argsJson = JSON.stringify(args).slice(1, -1); // strip [ and ]
  const harness = `
${userCode}

__test_result__ = ${funcName}(${argsJson})
print("__RESULT__:", __test_result__)
`;

  const trace = engine.trace(harness, "");
  if (!trace.ok) {
    return { ok: false, error: trace.error || "Syntax / Execution Error" };
  }

  // Find output from stdout or __test_result__ in global scope
  const lastStep = trace.steps[trace.steps.length - 1];
  let resultVal = null;
  if (lastStep.scopes && lastStep.scopes.global) {
    const varObj = lastStep.scopes.global.find(v => v.name === '__test_result__');
    if (varObj) resultVal = varObj.rawValue;
  }

  let printedLines = lastStep.stdout || [];
  return {
    ok: true,
    result: resultVal,
    stdout: printedLines,
    steps: trace.steps.length
  };
}

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

console.log("Running test 1: [2, 7, 11, 15], 9...");
const t1 = runPythonFunction(userTwoSum, "twoSum", [[2, 7, 11, 15], 9]);
console.log("Test 1 Result:", t1.result, "Expected: [0, 1]", "Matches?", JSON.stringify(t1.result) === JSON.stringify([0, 1]));

console.log("Running test 2: [3, 2, 4], 6...");
const t2 = runPythonFunction(userTwoSum, "twoSum", [[3, 2, 4], 6]);
console.log("Test 2 Result:", t2.result, "Expected: [1, 2]", "Matches?", JSON.stringify(t2.result) === JSON.stringify([1, 2]));

console.log("Running test 3: [3, 3], 6...");
const t3 = runPythonFunction(userTwoSum, "twoSum", [[3, 3], 6]);
console.log("Test 3 Result:", t3.result, "Expected: [0, 1]", "Matches?", JSON.stringify(t3.result) === JSON.stringify([0, 1]));
