// scratch/test_dsa_phase5_workspace.js
// Comprehensive Phase 5 Test Suite: Problem Learning Workspace (Sections A, B, C, D)

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runDsaPhase5Tests() {
  console.log("===================================================================");
  console.log("PHASE 5: PROBLEM LEARNING WORKSPACE COMPREHENSIVE TEST SUITE");
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
  const dashboardCode = fs.readFileSync(path.join(appBuildDir, 'dsa_dashboard.js'), 'utf8');
  const stylesCode = fs.readFileSync(path.join(appBuildDir, 'styles.css'), 'utf8');

  // [1] Verify Phase 5 CSS Styles
  console.log("\n[1] Verifying Phase 5 CSS Workspace Styles:");
  assert(stylesCode.includes('.workspace-wrapper'), ".workspace-wrapper CSS style present");
  assert(stylesCode.includes('.workspace-top-bar'), ".workspace-top-bar CSS style present");
  assert(stylesCode.includes('.workspace-route-badge'), ".workspace-route-badge CSS style present");
  assert(stylesCode.includes('.workspace-2col-layout'), ".workspace-2col-layout CSS style present");
  assert(stylesCode.includes('.workspace-pane-tabs'), ".workspace-pane-tabs CSS style present");
  assert(stylesCode.includes('.workspace-pane-tab'), ".workspace-pane-tab CSS style present");
  assert(stylesCode.includes('.workspace-pane-tab.active'), ".workspace-pane-tab.active CSS style present");
  assert(stylesCode.includes('.callout-highlight-box'), ".callout-highlight-box CSS style present");
  assert(stylesCode.includes('.workspace-example-card'), ".workspace-example-card CSS style present");
  assert(stylesCode.includes('.pattern-hero-card'), ".pattern-hero-card CSS style present");
  assert(stylesCode.includes('.pattern-steps-list'), ".pattern-steps-list CSS style present");
  assert(stylesCode.includes('.workspace-editor-toolbar'), ".workspace-editor-toolbar CSS style present");
  assert(stylesCode.includes('.workspace-code-textarea'), ".workspace-code-textarea CSS style present");
  assert(stylesCode.includes('.workspace-tests-panel'), ".workspace-tests-panel CSS style present");
  assert(stylesCode.includes('.test-result-card'), ".test-result-card CSS style present");
  assert(stylesCode.includes('.test-result-card.card-passed'), ".test-result-card.card-passed CSS style present");
  assert(stylesCode.includes('.test-result-card.card-failed'), ".test-result-card.card-failed CSS style present");
  assert(stylesCode.includes('.workspace-console-panel'), ".workspace-console-panel CSS style present");
  assert(stylesCode.includes('.workspace-hints-box'), ".workspace-hints-box CSS style present");
  assert(stylesCode.includes('.workspace-solution-card'), ".workspace-solution-card CSS style present");
  assert(stylesCode.includes('.workspace-visualize-tab'), ".workspace-visualize-tab CSS style present");
  assert(stylesCode.includes('.btn-banner-ws'), ".btn-banner-ws CSS style present");

  // [2] Setup Sandbox with Mock DOM and real PythonExecutionEngine
  console.log("\n[2] Setting up Headless Environment & Execution Engine:");
  const storageMock = {};
  const mockLocalStorage = {
    getItem: (k) => storageMock[k] || null,
    setItem: (k, v) => { storageMock[k] = String(v); },
    removeItem: (k) => { delete storageMock[k]; },
    clear: () => { Object.keys(storageMock).forEach(k => delete storageMock[k]); }
  };

  const eventListeners = {};
  const elementsById = {};

  function makeMockElement(id = '', tag = 'div') {
    const el = {
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
      remove: function() {
        if (this.parentElement) {
          const idx = this.parentElement.children.indexOf(this);
          if (idx !== -1) this.parentElement.children.splice(idx, 1);
        }
      },
      addEventListener: function(evt, handler) {
        if (!eventListeners[evt]) eventListeners[evt] = [];
        eventListeners[evt].push({ el: this, handler });
      },
      querySelector: function(sel) { return null; },
      querySelectorAll: function(sel) { return []; },
      closest: function(sel) { return null; }
    };
    if (id) elementsById[id] = el;
    return el;
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
    setTimeout: (fn) => { fn(); },
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

  // Execute engine, problems, and dashboard in sandbox
  vm.runInContext(engineCode, sandbox);
  assert(typeof sandbox.window.PythonExecutionEngine === 'function', "PythonExecutionEngine class loaded in sandbox");

  vm.runInContext(problemsCode, sandbox);
  assert(Array.isArray(sandbox.window.DSA_PROBLEMS_LIBRARY), "DSA_PROBLEMS_LIBRARY loaded in sandbox");
  assert(sandbox.window.DSA_PROBLEMS_LIBRARY.length === 300, "Catalog has 300 problems");

  // Mock teachMeApp
  let teachMeAnalyzedCount = 0;
  sandbox.window.teachMeApp = {
    sourceCode: '',
    inputCode: '',
    currentPresetKey: '',
    codeTextarea: { value: '' },
    analyzeAndRun: function() {
      teachMeAnalyzedCount++;
    }
  };

  // Mock DOM elements that DsaDashboard expects
  const dsaContainer = makeMockElement('dsaLearningContainer');
  const visualizerContainer = makeMockElement('visualizerContainer');
  const dsaBanner = makeMockElement('dsaActiveProblemBanner');
  const navBtnDsa = makeMockElement('navBtnDsa');
  const navBtnVisualizer = makeMockElement('navBtnVisualizer');

  vm.runInContext(dashboardCode, sandbox);
  assert(typeof sandbox.window.DsaDashboard === 'function', "DsaDashboard class loaded in sandbox");

  const dsa = new sandbox.window.DsaDashboard({
    engine: new sandbox.window.PythonExecutionEngine()
  });
  assert(dsa.problems.length === 300, "DsaDashboard initialized with 300 curated problems");
  assert(dsa.engine instanceof sandbox.window.PythonExecutionEngine, "DsaDashboard has active PythonExecutionEngine");

  // [3] Test Workspace Navigation & State
  console.log("\n[3] Testing Workspace Navigation & State Transitions:");
  dsa.openProblemWorkspace(1); // Two Sum
  assert(dsa.currentSubTab === 'workspace', "currentSubTab switched to 'workspace'");
  assert(dsa.activeWorkspaceProblemId === 1, "activeWorkspaceProblemId set to 1 (Two Sum)");
  assert(dsa.workspaceLeftTab === 'understand', "workspaceLeftTab initialized to 'understand'");
  assert(dsa.workspaceRightTab === 'editor', "workspaceRightTab initialized to 'editor'");
  assert(sandbox.window.location.hash === '#dsa/problem/1', "URL hash set to #dsa/problem/1");

  // Check HTML rendered for Workspace
  const wsHtml = dsa.renderProblemWorkspace(1);
  assert(typeof wsHtml === 'string' && wsHtml.length > 500, "renderProblemWorkspace returned HTML content");
  assert(wsHtml.includes('workspace-wrapper'), "Workspace markup contains .workspace-wrapper");
  assert(wsHtml.includes('#dsa/problem/1'), "Workspace markup contains unique route #dsa/problem/1");
  assert(wsHtml.includes('Two Sum'), "Workspace markup displays problem title 'Two Sum'");

  // [4] Test Section A: Understand the Problem
  console.log("\n[4] Testing Section A: Understand the Problem (Rule-Based, No AI APIs):");
  assert(wsHtml.includes('Understand the Problem'), "Section A header present");
  assert(wsHtml.includes('What the Problem Asks'), "Section A explains what is asked");
  assert(wsHtml.includes('What You Need to Calculate or Return'), "Section A highlights return goal");
  assert(wsHtml.includes('Example 1'), "Example 1 rendered");
  assert(wsHtml.includes('Input & Output Examples'), "Input & Output Examples section rendered");
  assert(wsHtml.includes('Important Constraints'), "Important constraints section rendered");
  assert(wsHtml.includes('Common Edge Cases to Consider'), "Common edge cases section rendered");
  // Ensure reference solution is initially hidden
  assert(!wsHtml.includes('ref-code-block'), "Reference solution is hidden initially in Understand tab");

  const guide1 = dsa.getProblemTeachingGuide(dsa.problemsById.get(1));
  assert(typeof guide1.whatIsAsked === 'string' && guide1.whatIsAsked.length > 20, "Guide has 'whatIsAsked'");
  assert(typeof guide1.whatToReturn === 'string' && guide1.whatToReturn.length > 10, "Guide has 'whatToReturn'");
  assert(Array.isArray(guide1.edgeCases) && guide1.edgeCases.length >= 3, "Guide provides 3+ edge cases");
  assert(Array.isArray(guide1.hints) && guide1.hints.length >= 3, "Guide provides 3 progressive hints");

  // [5] Test Section B: Learn the Pattern
  console.log("\n[5] Testing Section B: Learn the Pattern (DSA Teaching Content):");
  assert(wsHtml.includes('Learn the Pattern'), "Section B tab header present");
  assert(wsHtml.includes('Why This Pattern is Useful'), "Explains why pattern is useful");
  assert(wsHtml.includes('Prerequisite Concepts'), "Prerequisites explained");
  assert(wsHtml.includes('Illustrative Walkthrough'), "Illustrative walkthrough example present");
  assert(wsHtml.includes('Intended Approach'), "Intended 3-step approach present");
  assert(guide1.whyUseful.includes('O('), "Why useful explains algorithmic complexity O(...)");
  assert(guide1.intendedApproach.length === 3, "Intended approach has 3 clear actionable steps");

  // [6] Test Section C: Try It Yourself (Code Editor, Hints, Solution Reveal & Cache)
  console.log("\n[6] Testing Section C: Try It Yourself (Editor, Hints, Solution, Auto-Save):");
  assert(wsHtml.includes('workspaceCodeEditor'), "Code editor textarea present");
  assert(wsHtml.includes('btnWsRunCode'), "Run Code button present");
  assert(wsHtml.includes('btnWsRunTests'), "Run Tests button present");
  assert(wsHtml.includes('btnWsResetCode'), "Reset Code button present");
  assert(wsHtml.includes('btnWsShowHint'), "Show Hints button present");
  assert(wsHtml.includes('btnWsRevealSolution'), "Reveal Solution button present");

  // Starter code auto-population
  const userCodeInitial = dsa.getUserCode(1);
  assert(userCodeInitial.includes('def twoSum'), "Starter code loaded into user code cache for problem 1");

  // Auto-saving user edits
  const customUserCode = `def twoSum(nums, target):
    # My custom user solution
    return [0, 1]
`;
  dsa.saveUserCode(1, customUserCode);
  assert(dsa.getUserCode(1) === customUserCode, "getUserCode returns updated custom code");
  const storedJson = JSON.parse(mockLocalStorage.getItem('dsa_user_code_v1') || '{}');
  assert(storedJson['1'] === customUserCode, "Custom code persisted to localStorage");

  // Progressive Hints
  assert((dsa.revealedHints[1] || 0) === 0, "Initially 0 hints revealed");
  dsa.revealedHints[1] = 1;
  const wsHtmlHint1 = dsa.renderProblemWorkspace(1);
  assert(wsHtmlHint1.includes('Hint 1'), "Hint 1 rendered after incrementing revealedHints");
  assert(!wsHtmlHint1.includes('Hint 2'), "Hint 2 not rendered yet");
  dsa.revealedHints[1] = 2;
  const wsHtmlHint2 = dsa.renderProblemWorkspace(1);
  assert(wsHtmlHint2.includes('Hint 1') && wsHtmlHint2.includes('Hint 2'), "Hints 1 and 2 rendered");

  // Reveal Reference Solution
  assert(!dsa.revealedSolutions[1], "Reference solution initially not revealed");
  dsa.revealedSolutions[1] = true;
  const wsHtmlSol = dsa.renderProblemWorkspace(1);
  assert(wsHtmlSol.includes('ref-code-block'), "Reference code block rendered when revealed");
  assert(wsHtmlSol.includes('Time: O(n)'), "Time complexity O(n) chip rendered");
  assert(wsHtmlSol.includes('Space: O(n)'), "Space complexity O(n) chip rendered");
  assert(wsHtmlSol.includes('btnCopyRefSolution'), "Copy solution to editor button present");

  // [7] Test Safe Client-Side Execution Engine (runWorkspaceCode)
  console.log("\n[7] Testing Safe Client-Side Execution Engine (runWorkspaceCode):");
  const goodPythonCode = `
nums = [2, 7, 11, 15]
target = 9
prev = {}
res = []
for i in range(len(nums)):
    diff = target - nums[i]
    if diff in prev:
        res = [prev[diff], i]
        break
    prev[nums[i]] = i
print("Found indices:", res)
`;
  const execResult = dsa.runWorkspaceCode(1, goodPythonCode);
  assert(execResult.ok === true, "Valid Python code executed cleanly (ok: true)");
  assert(execResult.stepsCount > 0, `Execution produced ${execResult.stepsCount} steps`);
  assert(execResult.stdout.some(line => line.includes('Found indices: [0, 1]')), "Stdout captured: Found indices: [0, 1]");
  const resVar = execResult.variables.find(v => v.name === 'res');
  assert(resVar && resVar.current === '[0, 1]', "Final variable 'res' correctly evaluated to '[0, 1]'");

  // Syntax error handling in safe execution
  const brokenPythonCode = `
for i in range(10)
    print(i
`;
  const brokenResult = dsa.runWorkspaceCode(1, brokenPythonCode);
  assert(brokenResult.ok === false, "Syntax error handled safely (ok: false)");
  assert(typeof brokenResult.error === 'string' && brokenResult.error.length > 0, "Descriptive error message returned without crashing");

  // [8] Test Automated Test Cases Runner (runWorkspaceTests)
  console.log("\n[8] Testing Automated Test Cases Runner (runWorkspaceTests):");
  const fullTwoSumSolution = `
def twoSum(nums, target):
    prevMap = {}
    for i in range(len(nums)):
        diff = target - nums[i]
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[nums[i]] = i
    return []
`;
  const testReportGood = dsa.runWorkspaceTests(1, fullTwoSumSolution);
  assert(testReportGood.total === 3, "Problem 1 has 3 structured test cases");
  assert(testReportGood.passed === 3, `All 3 test cases passed (${testReportGood.passed}/${testReportGood.total})`);
  assert(testReportGood.results.every(r => r.passed), "Every test result marked passed: true");

  // Test with flawed solution (always returns [0, 0])
  const flawedSolution = `
def twoSum(nums, target):
    return [0, 0]
`;
  const testReportFlawed = dsa.runWorkspaceTests(1, flawedSolution);
  assert(testReportFlawed.passed === 0, "Flawed solution failed all tests (passed: 0/3)");
  assert(testReportFlawed.results[0].passed === false, "Test 1 marked passed: false");
  assert(testReportFlawed.results[0].actualOutput === '[0, 0]', "Captured actual output [0, 0]");
  assert(testReportFlawed.results[0].expectedOutput === '[0, 1]', "Compared with expected output [0, 1]");

  // [9] Test Section D: Visualize Execution Integration
  console.log("\n[9] Testing Section D: Visualize Execution Integration:");
  assert(wsHtml.includes('id="paneVisualize"'), "Section D paneVisualize markup present");
  assert(wsHtml.includes('btnLaunchMyCodeVis'), "Launch My Code in Visualizer button present");
  assert(wsHtml.includes('btnLaunchRefCodeVis'), "Launch Reference Code in Visualizer button present");

  // Launch into visualizer
  const prevCount = teachMeAnalyzedCount;
  dsa.loadAndVisualizeProblem(1, fullTwoSumSolution);
  assert(teachMeAnalyzedCount === prevCount + 1, "window.teachMeApp.analyzeAndRun() was invoked");
  assert(sandbox.window.teachMeApp.sourceCode === fullTwoSumSolution, "Source code loaded into visualizer");
  assert(sandbox.window.teachMeApp.codeTextarea.value === fullTwoSumSolution, "Code textarea updated in visualizer");
  assert(dsa.activeVisualizerProblemId === 1, "activeVisualizerProblemId set to 1");

  // Verify Kadane Maximum Subarray output remains 6
  console.log("\n[10] Verifying Kadane Maximum Subarray (Problem 251, LC 53) Output = 6:");
  const kadaneProb = dsa.problems.find(p => p.leetcodeNumber === 53 || p.title === 'Maximum Subarray');
  assert(kadaneProb && kadaneProb.title === 'Maximum Subarray', "Maximum Subarray problem found");
  const kadaneTrace = dsa.engine.trace(kadaneProb.starterCode, "");
  assert(kadaneTrace.ok === true, "Kadane starter code traced successfully");
  const kadaneLastStep = kadaneTrace.steps[kadaneTrace.steps.length - 1];
  let maxFound = null;
  if (kadaneLastStep.variables) {
    const v = kadaneLastStep.variables.find(x => x.name === 'max_so_far' || x.name === 'max_sum');
    if (v) maxFound = v.rawValue !== undefined ? v.rawValue : parseInt(v.current, 10);
  }
  if (maxFound === null && kadaneLastStep.stdout) {
    const match = kadaneLastStep.stdout.join(' ').match(/(\d+)/);
    if (match) maxFound = parseInt(match[1], 10);
  }
  assert(maxFound === 6, `Kadane maximum subarray verified output is 6 (got: ${maxFound})`);

  // [11] Test URL Hash Routing to Workspace
  console.log("\n[11] Testing URL Hash Routing to Workspace (#dsa/problem/:id):");
  dsa.handleHashRouting('#dsa/problem/33'); // 3Sum
  assert(dsa.activeWorkspaceProblemId === 33, "Router navigated to problem 33 ('3Sum')");
  assert(dsa.currentSubTab === 'workspace', "Router switched to workspace view");

  dsa.handleHashRouting('#dsa/problem/251'); // Maximum Subarray
  assert(dsa.activeWorkspaceProblemId === 251, "Router navigated to problem 251 ('Maximum Subarray')");
  assert(dsa.currentSubTab === 'workspace', "Router switched to workspace view");

  console.log("\n===================================================================");
  console.log(`SUMMARY: ${passedCount}/${testCount} Phase 5 Tests PASSED (100%)`);
  console.log("===================================================================");
}

runDsaPhase5Tests();
