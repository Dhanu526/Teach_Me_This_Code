const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appBuildDir = path.resolve(__dirname, '..', '..', '..', 'scratch', 'code-flow-visualizer', 'app_build');
const dsaProblemsPath = path.join(appBuildDir, 'dsa_problems.js');
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

vm.runInContext(fs.readFileSync(dsaProblemsPath, 'utf8'), context);
vm.runInContext(fs.readFileSync(enginePath, 'utf8'), context);

const engine = new mockWindow.PythonExecutionEngine();
const library = mockWindow.DSA_PROBLEMS_LIBRARY;

[1, 53, 704, 121, 11].forEach(num => {
  const prob = library.find(p => p.leetcodeNumber === num);
  if (prob) {
    const trace = engine.trace(prob.starterCode, "");
    console.log(`LC #${num} (${prob.title}): ok=${trace.ok}, steps=${trace.steps ? trace.steps.length : 0}`);
    if (!trace.ok) console.log("Error details:", trace.errorType, trace.errorMessage, "Line:", trace.errorLine);
  }
});
