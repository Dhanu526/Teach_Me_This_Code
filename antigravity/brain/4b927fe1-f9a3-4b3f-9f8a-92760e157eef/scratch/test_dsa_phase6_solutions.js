// scratch/test_dsa_phase6_solutions.js
// Comprehensive Phase 6 Test Suite: Python Reference Solutions, Dual Approaches & Tests

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runDsaPhase6Tests() {
  console.log("===================================================================");
  console.log("PHASE 6: PYTHON REFERENCE SOLUTIONS & VERIFICATION TEST SUITE");
  console.log("===================================================================");

  let testCount = 0;
  let passedCount = 0;

  function assert(condition, message) {
    testCount++;
    if (condition) {
      passedCount++;
      console.log(`  ✓ [PASS] ${message}`);
    } else {
      console.error(`  ✗ [FAIL] ${message}`);
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  const appBuildDir = path.join(__dirname, '..', '..', '..', 'scratch', 'code-flow-visualizer', 'app_build');
  const engineCode = fs.readFileSync(path.join(appBuildDir, 'engine.js'), 'utf8');
  const problemsCode = fs.readFileSync(path.join(appBuildDir, 'dsa_problems.js'), 'utf8');
  const solutionsCode = fs.readFileSync(path.join(appBuildDir, 'dsa_solutions_data.js'), 'utf8');
  const dashboardCode = fs.readFileSync(path.join(appBuildDir, 'dsa_dashboard.js'), 'utf8');
  const stylesCode = fs.readFileSync(path.join(appBuildDir, 'styles.css'), 'utf8');

  // [1] Verify Phase 6 CSS Styles
  console.log("\n[1] Verifying Phase 6 CSS Solution Styles:");
  assert(stylesCode.includes('.solution-approach-tabs'), ".solution-approach-tabs CSS style present");
  assert(stylesCode.includes('.solution-approach-tab'), ".solution-approach-tab CSS style present");
  assert(stylesCode.includes('.solution-approach-tab.active'), ".solution-approach-tab.active CSS style present");
  assert(stylesCode.includes('.approach-title'), ".approach-title CSS style present");
  assert(stylesCode.includes('.optimal-pill'), ".optimal-pill CSS style present");
  assert(stylesCode.includes('.baseline-pill'), ".baseline-pill CSS style present");
  assert(stylesCode.includes('.chip-time'), ".chip-time CSS style present");
  assert(stylesCode.includes('.chip-space'), ".chip-space CSS style present");
  assert(stylesCode.includes('.chip-status'), ".chip-status CSS style present");
  assert(stylesCode.includes('.solution-deepdive-grid'), ".solution-deepdive-grid CSS style present");
  assert(stylesCode.includes('.sol-deepdive-card'), ".sol-deepdive-card CSS style present");
  assert(stylesCode.includes('.sol-deepdive-card.mistakes-card'), ".mistakes-card CSS style present");
  assert(stylesCode.includes('.deepdive-heading'), ".deepdive-heading CSS style present");
  assert(stylesCode.includes('.deepdive-mistakes-list'), ".deepdive-mistakes-list CSS style present");
  assert(stylesCode.includes('.btn-hide-solution'), ".btn-hide-solution CSS style present");

  // [2] Setup Sandbox
  console.log("\n[2] Setting up Headless Environment:");
  const storageMock = {};
  const mockLocalStorage = {
    getItem: (k) => storageMock[k] || null,
    setItem: (k, v) => { storageMock[k] = String(v); },
    removeItem: (k) => { delete storageMock[k]; },
    clear: () => { Object.keys(storageMock).forEach(k => delete storageMock[k]); }
  };

  const elementsById = {};
  function makeMockElement(id = '', tag = 'div') {
    return {
      id,
      tagName: tag.toUpperCase(),
      classList: {
        _classes: new Set(),
        add: function(c) { this._classes.add(c); },
        remove: function(c) { this._classes.delete(c); },
        toggle: function(c, force) {
          if (force !== undefined) {
            if (force) this._classes.add(c); else this._classes.delete(c);
          } else {
            if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c);
          }
        },
        contains: function(c) { return this._classes.has(c); }
      },
      attributes: {},
      setAttribute: function(k, v) { this.attributes[k] = String(v); },
      getAttribute: function(k) { return this.attributes[k] || null; },
      removeAttribute: function(k) { delete this.attributes[k]; },
      innerHTML: '',
      textContent: '',
      value: '',
      style: {},
      children: [],
      appendChild: function(c) { this.children.push(c); return c; },
      remove: function() {},
      addEventListener: function() {},
      querySelector: function() { return null; },
      querySelectorAll: function() { return []; },
      closest: function() { return null; }
    };
  }

  let locationHash = '';
  const mockLocation = {
    get hash() { return locationHash; },
    set hash(val) { locationHash = val; },
    origin: 'http://localhost:3000',
    pathname: '/index.html'
  };

  const sandbox = {
    console,
    Math,
    Number,
    String,
    Array,
    Object,
    Set,
    Map,
    JSON,
    Date,
    RegExp,
    parseInt,
    parseFloat,
    isNaN,
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    localStorage: mockLocalStorage,
    window: {
      localStorage: mockLocalStorage,
      location: mockLocation,
      history: { replaceState: (state, title, url) => { mockLocation.hash = url; } },
      navigator: { clipboard: { writeText: () => Promise.resolve() } },
      scrollTo: () => {},
      addEventListener: () => {}
    },
    document: {
      getElementById: (id) => elementsById[id] || makeMockElement(id),
      createElement: (tag) => makeMockElement('', tag),
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      body: makeMockElement('body', 'body')
    }
  };
  sandbox.window.document = sandbox.document;

  vm.createContext(sandbox);

  // Execute engine, problems, solutions, and dashboard in sandbox
  vm.runInContext(engineCode, sandbox);
  assert(typeof sandbox.window.PythonExecutionEngine === 'function', "PythonExecutionEngine class loaded in sandbox");

  vm.runInContext(problemsCode, sandbox);
  assert(Array.isArray(sandbox.window.DSA_PROBLEMS_LIBRARY), "DSA_PROBLEMS_LIBRARY loaded in sandbox");
  assert(sandbox.window.DSA_PROBLEMS_LIBRARY.length === 300, "Catalog has 300 problems");

  vm.runInContext(solutionsCode, sandbox);
  assert(typeof sandbox.window.DSA_SOLUTIONS_REGISTRY === 'object', "DSA_SOLUTIONS_REGISTRY loaded in sandbox");
  assert(Object.keys(sandbox.window.DSA_SOLUTIONS_REGISTRY).length === 300, "Solutions registry contains all 300 problems");
  assert(typeof sandbox.window.getProblemSolutionData === 'function', "getProblemSolutionData helper loaded in sandbox");

  let teachMeAnalyzedCount = 0;
  sandbox.window.teachMeApp = {
    sourceCode: '',
    inputCode: '',
    currentPresetKey: '',
    codeTextarea: { value: '' },
    analyzeAndRun: function() { teachMeAnalyzedCount++; }
  };

  vm.runInContext(dashboardCode, sandbox);
  const dsa = new sandbox.window.DsaDashboard();
  assert(typeof dsa.getProblemSolutions === 'function', "dsa.getProblemSolutions method exists on DsaDashboard");

  // [3] Audit Solutions Schema & In-Depth Components
  console.log("\n[3] Auditing Solutions Schema (Approaches, Complexities, Invariants, Mistakes):");
  let totalApproachesCount = 0;
  let dualApproachCount = 0;

  dsa.problems.forEach(p => {
    const sol = dsa.getProblemSolutions(p);
    assert(sol && Array.isArray(sol.approaches) && sol.approaches.length >= 1, `Problem #${p.id} has valid approaches array`);
    totalApproachesCount += sol.approaches.length;
    if (sol.hasMultipleApproaches) dualApproachCount++;

    sol.approaches.forEach(app => {
      assert(typeof app.name === 'string' && app.name.length > 0, `Problem #${p.id} approach has name`);
      assert(typeof app.timeComplexity === 'string' && app.timeComplexity.includes('O('), `Problem #${p.id} approach has valid Time Complexity`);
      assert(typeof app.spaceComplexity === 'string' && app.spaceComplexity.includes('O('), `Problem #${p.id} approach has valid Space Complexity`);
      assert(typeof app.code === 'string' && app.code.length > 20, `Problem #${p.id} approach has Python code`);
      assert(typeof app.explanation === 'string' && app.explanation.length > 20, `Problem #${p.id} approach has algorithm explanation`);
      assert(typeof app.whyItWorks === 'string' && app.whyItWorks.length > 20, `Problem #${p.id} approach has why-it-works explanation`);
      assert(Array.isArray(app.commonMistakes) && app.commonMistakes.length >= 2, `Problem #${p.id} approach provides common mistakes`);
      assert(app.isVerified === true, `Problem #${p.id} approach is marked verified`);
    });
  });

  assert(totalApproachesCount >= 310, `Total approaches cataloged: ${totalApproachesCount} >= 310`);
  assert(dualApproachCount >= 10, `Found ${dualApproachCount} canonical dual-approach problems with Baseline and Optimized`);

  // [4] Test Real Engine Execution of Baseline & Optimized Approaches
  console.log("\n[4] Testing Real Engine Execution of Reference Solutions against Test Cases & Edge Cases:");
  function execPythonCall(code, callExpr) {
    const harness = `\n${code}\n__res__ = ${callExpr}\n`;
    const trace = dsa.engine.trace(harness, "");
    if (!trace.ok) return { ok: false, error: trace.error };
    const last = trace.steps[trace.steps.length - 1];
    const v = (last.variables || []).find(x => x.name === '__res__');
    return { ok: true, actual: v ? v.current : 'None', steps: trace.steps.length };
  }

  // 1. Two Sum (Problem 1)
  const sol1 = dsa.getProblemSolutions(dsa.problemsById.get(1));
  assert(sol1.hasMultipleApproaches === true, "Two Sum has both baseline and optimized approaches");
  const base1 = sol1.approaches.find(a => a.isBaseline);
  const opt1 = sol1.approaches.find(a => a.isOptimal);
  const resBase1 = execPythonCall(base1.code, "twoSum([2, 7, 11, 15], 9)");
  const resOpt1 = execPythonCall(opt1.code, "twoSum([2, 7, 11, 15], 9)");
  assert(resBase1.ok && resBase1.actual === '[0, 1]', "Two Sum Baseline verified on [2, 7, 11, 15], 9 -> [0, 1]");
  assert(resOpt1.ok && resOpt1.actual === '[0, 1]', "Two Sum Optimized verified on [2, 7, 11, 15], 9 -> [0, 1]");

  // Edge case: multiple duplicates
  const resOpt1Edge = execPythonCall(opt1.code, "twoSum([3, 3], 6)");
  assert(resOpt1Edge.ok && resOpt1Edge.actual === '[0, 1]', "Two Sum Optimized handles identical duplicates [3, 3], target 6 -> [0, 1]");

  // 2. Contains Duplicate (Problem 2)
  const sol2 = dsa.getProblemSolutions(dsa.problemsById.get(2));
  const base2 = sol2.approaches.find(a => a.isBaseline);
  const opt2 = sol2.approaches.find(a => a.isOptimal);
  assert(execPythonCall(base2.code, "containsDuplicate([1, 2, 3, 1])").actual === 'True', "Contains Duplicate Baseline returns True for duplicates");
  assert(execPythonCall(opt2.code, "containsDuplicate([1, 2, 3, 1])").actual === 'True', "Contains Duplicate Optimized returns True for duplicates");
  assert(execPythonCall(opt2.code, "containsDuplicate([1, 2, 3, 4])").actual === 'False', "Contains Duplicate Optimized returns False for distinct elements");

  // 3. Best Time to Buy and Sell Stock (Problem 51)
  const sol51 = dsa.getProblemSolutions(dsa.problemsById.get(51));
  const base51 = sol51.approaches.find(a => a.isBaseline);
  const opt51 = sol51.approaches.find(a => a.isOptimal);
  assert(execPythonCall(base51.code, "maxProfit([7, 1, 5, 3, 6, 4])").actual === '5', "Max Profit Baseline returns 5");
  assert(execPythonCall(opt51.code, "maxProfit([7, 1, 5, 3, 6, 4])").actual === '5', "Max Profit Optimized returns 5");
  assert(execPythonCall(opt51.code, "maxProfit([7, 6, 4, 3, 1])").actual === '0', "Max Profit Optimized returns 0 on strictly decreasing prices");

  // 4. Maximum Subarray (Problem 251, LC 53)
  const sol251 = dsa.getProblemSolutions(dsa.problemsById.get(251));
  const base251 = sol251.approaches.find(a => a.isBaseline);
  const opt251 = sol251.approaches.find(a => a.isOptimal);
  const resBase251 = execPythonCall(base251.code, "maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])");
  const resOpt251 = execPythonCall(opt251.code, "maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])");
  assert(resBase251.ok && resBase251.actual === '6', "Maximum Subarray Baseline returns 6 for Kadane array");
  assert(resOpt251.ok && resOpt251.actual === '6', "Maximum Subarray Optimized returns 6 for Kadane array");
  assert(resOpt251.steps < resBase251.steps, `Optimized Kadane (${resOpt251.steps} steps) is faster than Baseline (${resBase251.steps} steps)`);

  // Edge case: all negative numbers
  assert(execPythonCall(opt251.code, "maxSubArray([-5, -2, -8])").actual === '-2', "Kadane Optimized returns -2 on all negative numbers [-5, -2, -8]");

  // 5. Binary Search (Problem 89, LC 704)
  const sol89 = dsa.getProblemSolutions(dsa.problemsById.get(89));
  const opt89 = sol89.approaches.find(a => a.isOptimal);
  assert(execPythonCall(opt89.code, "search([-1, 0, 3, 5, 9, 12], 9)").actual === '4', "Binary Search finds target 9 at index 4");
  assert(execPythonCall(opt89.code, "search([-1, 0, 3, 5, 9, 12], 2)").actual === '-1', "Binary Search returns -1 when target not present");

  // [5] Test Workspace Solution UI Rendering & State Management
  console.log("\n[5] Testing Workspace Solution UI (Hidden by Default, Reveal, Approach Tabs, Re-hide):");
  dsa.openProblemWorkspace(1);

  // Hidden by default
  assert(!dsa.revealedSolutions[1], "Solutions are hidden by default to promote independent learning");
  let wsHtml = dsa.renderProblemWorkspace(1);
  assert(!wsHtml.includes('workspaceSolutionCard'), "workspaceSolutionCard is NOT present when hidden");
  assert(wsHtml.includes('Reference solution is hidden to promote independent problem-solving'), "Educational lock banner present");

  // Reveal solution
  dsa.revealedSolutions[1] = true;
  wsHtml = dsa.renderProblemWorkspace(1);
  assert(wsHtml.includes('workspaceSolutionCard'), "workspaceSolutionCard rendered when revealed");
  assert(wsHtml.includes('solution-approach-tabs'), "Approach switcher tabs rendered for dual-approach problem");
  assert(wsHtml.includes('⚡ Approach 1: Baseline'), "Baseline tab button present");
  assert(wsHtml.includes('✨ Approach 2: Optimized'), "Optimized tab button present");
  assert(wsHtml.includes('Explanation of the Algorithm'), "Explanation section rendered");
  assert(wsHtml.includes('Why This Approach Works'), "Why It Works section rendered");
  assert(wsHtml.includes('Common Mistakes &amp; Pitfalls') || wsHtml.includes('Common Mistakes'), "Common mistakes section rendered");
  assert(wsHtml.includes('btn-hide-solution'), "Re-hide solution button present");

  // Switching approaches
  dsa.activeSolutionApproach[1] = 'baseline';
  let wsHtmlBase = dsa.renderProblemWorkspace(1);
  assert(wsHtmlBase.includes('O(n²)'), "Time complexity shows O(n²) when baseline approach selected");
  assert(wsHtmlBase.includes('Suboptimal Baseline'), "Suboptimal baseline badge present");

  dsa.activeSolutionApproach[1] = 'optimized';
  let wsHtmlOpt = dsa.renderProblemWorkspace(1);
  assert(wsHtmlOpt.includes('O(n)'), "Time complexity shows O(n) when optimized approach selected");
  assert(wsHtmlOpt.includes('Recommended Optimal'), "Recommended optimal badge present");

  // Re-hide solution
  dsa.revealedSolutions[1] = false;
  let wsHtmlHidden = dsa.renderProblemWorkspace(1);
  assert(!wsHtmlHidden.includes('workspaceSolutionCard'), "Solution cleanly hidden after re-hide");

  // [6] Test Copy Approach to Editor & Visualizer Launch
  console.log("\n[6] Testing Copy Approach to Editor & Visualizer Integration:");
  dsa.revealedSolutions[1] = true;
  dsa.activeSolutionApproach[1] = 'baseline';
  const baselineCode = base1.code;
  dsa.saveUserCode(1, baselineCode);
  assert(dsa.getUserCode(1) === baselineCode, "Baseline code copied to userCode cache");

  dsa.loadAndVisualizeProblem(1, opt1.code);
  assert(sandbox.window.teachMeApp.sourceCode === opt1.code, "Optimized code loaded into visualizer");
  assert(teachMeAnalyzedCount > 0, "Visualizer analyzeAndRun triggered");

  console.log("\n===================================================================");
  console.log(`SUMMARY: ${passedCount}/${testCount} Phase 6 Tests PASSED (100%)`);
  console.log("===================================================================");
}

runDsaPhase6Tests();
