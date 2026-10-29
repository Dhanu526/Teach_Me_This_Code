const fs = require('fs');
const vm = require('vm');
const path = require('path');

const engineCode = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'scratch', 'code-flow-visualizer', 'app_build', 'engine.js'), 'utf8');
const sandbox = { console, Math, Number, String, Array, Object, Set, Map, JSON, Date, window: {} };
vm.createContext(sandbox);
vm.runInContext(engineCode, sandbox);

const PythonExecutionEngine = sandbox.window.PythonExecutionEngine;
const engine = new PythonExecutionEngine();

const code = `def twoSum(nums, target):
    prevMap = {}
    for i in range(len(nums)):
        diff = target - nums[i]
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[nums[i]] = i
    return []

nums = [2, 7, 11, 15]
res = twoSum(nums, 9)
print("Indices:", res)`;

try {
  const result = engine.trace(code, "");
  console.log('Result ok:', result.ok);
  console.log('Steps count:', result.steps ? result.steps.length : 'none');
  if (result.steps && result.steps.length > 0) {
    const lastStep = result.steps[result.steps.length - 1];
    console.log('Last step stdout:', lastStep.stdout);
    console.log('Last step global scope:', lastStep.scopes ? lastStep.scopes.global : lastStep.variables);
  }
} catch (e) {
  console.error('Execution error:', e);
}
