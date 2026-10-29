const fs = require('fs');
const vm = require('vm');
const path = require('path');

const engineCode = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'scratch', 'code-flow-visualizer', 'app_build', 'engine.js'), 'utf8');
const sandbox = { console, Math, Number, String, Array, Object, Set, Map, JSON, Date, window: {} };
vm.createContext(sandbox);
vm.runInContext(engineCode, sandbox);

const PythonExecutionEngine = sandbox.window.PythonExecutionEngine;
const engine = new PythonExecutionEngine();

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

const harness = `
${userTwoSum}
test_res = twoSum([2, 7, 11, 15], 9)
print("Result:", test_res)
`;

const trace = engine.trace(harness, "");
const lastStep = trace.steps[trace.steps.length - 1];
console.log("lastStep keys:", Object.keys(lastStep));
console.log("variables:", lastStep.variables);
