// scratch/test_dsa_phase1.js — Comprehensive Test Suite for Phase 1: DSA Learning Dashboard & Library
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runDsaPhase1Tests() {
  console.log("===================================================================");
  console.log("PHASE 1: DSA LEARNING DASHBOARD & CURATED 300 PROBLEMS AUDIT");
  console.log("===================================================================");

  let testCount = 0;
  let passedCount = 0;

  function assert(condition, message) {
    testCount++;
    if (condition) {
      console.log(`  ✓ [PASS] ${message}`);
      passedCount++;
    } else {
      console.error(`  ✗ [FAIL] ${message}`);
      process.exitCode = 1;
    }
  }

  const appBuildDir = path.resolve(__dirname, '..', '..', '..', 'scratch', 'code-flow-visualizer', 'app_build');

  // --- 1. Static Files & DOM Structure Audit ---
  console.log("\n[1] Verifying Static Files & UI Structure:");
  const htmlPath = path.join(appBuildDir, 'index.html');
  const cssPath = path.join(appBuildDir, 'styles.css');
  const dsaProblemsPath = path.join(appBuildDir, 'dsa_problems.js');
  const dsaDashboardPath = path.join(appBuildDir, 'dsa_dashboard.js');

  assert(fs.existsSync(htmlPath), "index.html exists");
  assert(fs.existsSync(cssPath), "styles.css exists");
  assert(fs.existsSync(dsaProblemsPath), "dsa_problems.js exists");
  assert(fs.existsSync(dsaDashboardPath), "dsa_dashboard.js exists");

  const html = fs.readFileSync(htmlPath, 'utf8');
  assert(html.includes('id="btnViewVisualizer"'), "Visualizer tab button present");
  assert(html.includes('id="btnViewDsa"'), "DSA Learning tab button present");
  assert(html.includes('id="visualizerViewContainer"'), "Visualizer view container present");
  assert(html.includes('id="dsaProblemActiveBanner"'), "Active DSA problem banner present");
  assert(html.includes('id="dsaLearningContainer"'), "DSA learning container present");
  assert(html.includes('src="dsa_problems.js"'), "dsa_problems.js script included");
  assert(html.includes('src="dsa_dashboard.js"'), "dsa_dashboard.js script included");

  const css = fs.readFileSync(cssPath, 'utf8');
  assert(css.includes('.nav-view-switcher'), "nav-view-switcher styles present in CSS");
  assert(css.includes('.dsa-learning-container'), "dsa-learning-container styles present in CSS");
  assert(css.includes('.dsa-metrics-grid'), "dsa-metrics-grid styles present in CSS");
  assert(css.includes('.continue-hero-card'), "continue-hero-card styles present in CSS");
  assert(css.includes('.topic-mastery-card'), "topic-mastery-card styles present in CSS");
  assert(css.includes('.problem-table'), "problem-table styles present in CSS");
  assert(css.includes('.roadmap-timeline'), "roadmap-timeline styles present in CSS");

  // --- 2. 300 Curated Problems Integrity Audit ---
  console.log("\n[2] Verifying Curated 300 DSA Problems Integrity:");
  const problemsCode = fs.readFileSync(dsaProblemsPath, 'utf8');
  const sandbox = { window: {}, console: console };
  vm.createContext(sandbox);
  vm.runInContext(problemsCode, sandbox);

  const library = sandbox.window.DSA_PROBLEMS_LIBRARY;
  assert(Array.isArray(library), "DSA_PROBLEMS_LIBRARY is an array");
  assert(library.length === 300, `Exactly 300 problems curated (found ${library ? library.length : 0})`);

  // Verify unique IDs and Titles
  const idSet = new Set();
  const titleSet = new Set();
  const lcNumSet = new Set();
  let hasValidFields = true;

  library.forEach(p => {
    idSet.add(p.id);
    titleSet.add(p.title);
    lcNumSet.add(p.leetcodeNumber);

    if (!p.id || !p.leetcodeNumber || !p.title || !p.difficulty || !p.topic || !p.pattern || !p.description || !p.starterCode) {
      hasValidFields = false;
    }
  });

  assert(idSet.size === 300, "All 300 problem IDs are distinct and unique");
  assert(titleSet.size === 300, "All 300 problem titles are distinct and unique");
  assert(hasValidFields, "Every problem has complete schema (ID, LC#, Title, Difficulty, Topic, Pattern, Description, StarterCode)");

  // Difficulty breakdown check
  const diffCounts = { Easy: 0, Medium: 0, Hard: 0 };
  library.forEach(p => diffCounts[p.difficulty] = (diffCounts[p.difficulty] || 0) + 1);
  assert(diffCounts.Easy === 78, `Easy problems count is 78 (found ${diffCounts.Easy})`);
  assert(diffCounts.Medium === 194, `Medium problems count is 194 (found ${diffCounts.Medium})`);
  assert(diffCounts.Hard === 28, `Hard problems count is 28 (found ${diffCounts.Hard})`);

  // Topic breakdown check (17 topics)
  const topicCounts = {};
  library.forEach(p => topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1);
  const expectedTopics = [
    "Arrays & Hashing", "Two Pointers", "Sliding Window", "Stack", "Binary Search",
    "Linked List", "Trees", "Tries", "Heap / Priority Queue", "Backtracking",
    "Graphs", "Advanced Graphs", "1-D Dynamic Programming", "2-D Dynamic Programming",
    "Greedy", "Intervals", "Bit Manipulation"
  ];
  assert(expectedTopics.every(t => topicCounts[t] > 0), "All 17 core DSA topics are represented");
  assert(topicCounts["Arrays & Hashing"] === 30, "Arrays & Hashing has 30 problems");
  assert(topicCounts["Trees"] === 32, "Trees has 32 problems");
  assert(topicCounts["1-D Dynamic Programming"] === 24, "1-D Dynamic Programming has 24 problems");

  // --- 3. DsaDashboard Architecture & Real Data Audit ---
  console.log("\n[3] Verifying DsaDashboard LocalStorage & Progress Computation:");
  const dashboardCode = fs.readFileSync(dsaDashboardPath, 'utf8');

  // Create mock DOM & localStorage sandbox
  const storageMock = {};
  const mockLocalStorage = {
    getItem: (k) => storageMock[k] || null,
    setItem: (k, v) => { storageMock[k] = String(v); },
    removeItem: (k) => { delete storageMock[k]; }
  };

  const mockDocument = {
    getElementById: (id) => ({
      id,
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {},
        contains: () => false
      },
      setAttribute: () => {},
      removeAttribute: () => {},
      addEventListener: () => {},
      innerHTML: '',
      style: {}
    }),
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  sandbox.window.addEventListener = () => {};
  sandbox.localStorage = mockLocalStorage;
  sandbox.document = mockDocument;
  sandbox.Date = Date;
  sandbox.Math = Math;

  vm.runInContext(dashboardCode, sandbox);
  const DsaDashboard = sandbox.window.DsaDashboard;
  assert(typeof DsaDashboard === 'function', "DsaDashboard class is defined");

  // Instantiate dashboard
  const dash = new DsaDashboard();

  // Test initial metrics (ZERO fake numbers)
  const initialStats = dash.computeStats();
  assert(initialStats.total === 300, "Total problems is 300");
  assert(initialStats.solvedCount === 0, "Initial solved count is 0 (real data only, zero fake completions)");
  assert(initialStats.attemptedCount === 0, "Initial attempted count is 0");
  assert(initialStats.notStartedCount === 300, "Initial not started count is 300");
  assert(initialStats.bookmarkedCount === 0, "Initial bookmarked count is 0");
  assert(initialStats.pctSolved === "0.0", "Initial completion is 0.0%");

  // --- 4. Testing Progress Mutation & Persistence ---
  console.log("\n[4] Testing User Progress Actions & LocalStorage Persistence:");
  // Bookmark problem 1
  dash.toggleBookmark(1);
  assert(dash.isBookmarked(1) === true, "Problem 1 is bookmarked");
  assert(dash.computeStats().bookmarkedCount === 1, "Bookmarked count updated to 1");

  // Mark problem 1 as attempted
  dash.markAttempted(1);
  assert(dash.getProblemStatus(1) === 'attempted', "Problem 1 status is 'attempted'");
  assert(dash.computeStats().attemptedCount === 1, "Attempted count updated to 1");
  assert(dash.computeStats().notStartedCount === 299, "Not started count is 299");
  assert(dash.progress.lastPracticedId === 1, "lastPracticedId set to 1");
  assert(dash.progress.history.length === 1, "History has 1 entry");

  // Mark problem 1 as solved
  dash.markSolved(1);
  assert(dash.getProblemStatus(1) === 'solved', "Problem 1 status transitioned to 'solved'");
  assert(dash.computeStats().solvedCount === 1, "Solved count updated to 1");
  assert(dash.computeStats().attemptedCount === 0, "Attempted count reset to 0 because problem is now solved");

  // Verify persistence in localStorage
  const savedData = JSON.parse(storageMock['dsa_learning_progress_v1']);
  assert(savedData.solved.includes(1), "Solved problem 1 persisted to localStorage");
  assert(savedData.bookmarked.includes(1), "Bookmarked problem 1 persisted to localStorage");
  assert(savedData.lastPracticedId === 1, "lastPracticedId persisted to localStorage");

  // --- 5. Filtering & Search Engine Audit ---
  console.log("\n[5] Testing Search, Filtering, and Sorting Engine:");
  dash.searchQuery = "two sum";
  let searchResults = dash.getFilteredProblems();
  assert(searchResults.length >= 1 && searchResults.some(p => p.title === "Two Sum"), "Search for 'two sum' finds Two Sum");

  dash.searchQuery = "";
  dash.selectedTopic = "Binary Search";
  let topicResults = dash.getFilteredProblems();
  assert(topicResults.length === 20, "Filtering by topic 'Binary Search' returns exactly 20 problems");

  dash.selectedDifficulty = "Easy";
  let diffResults = dash.getFilteredProblems();
  assert(diffResults.every(p => p.difficulty === "Easy" && p.topic === "Binary Search"), "Combined topic + difficulty filter matches accurately");

  // Reset filters
  dash.selectedTopic = "all";
  dash.selectedDifficulty = "all";
  dash.selectedStatus = "solved";
  let solvedResults = dash.getFilteredProblems();
  assert(solvedResults.length === 1 && solvedResults[0].id === 1, "Filtering by status 'solved' returns only problem 1");

  // --- 6. Execution Engine Compatibility with DSA Problems ---
  console.log("\n[6] Testing Execution Engine Compatibility with DSA Solutions:");
  const engineCode = fs.readFileSync(path.join(appBuildDir, 'engine.js'), 'utf8');
  vm.runInContext(engineCode, sandbox);
  const PythonExecutionEngine = sandbox.window.PythonExecutionEngine;
  const engine = new PythonExecutionEngine();

  // Test 1: Two Sum (LC 1 - Arrays & Hashing)
  const twoSumProb = library.find(p => p.leetcodeNumber === 1);
  const twoSumTrace = engine.trace(twoSumProb.starterCode, "");
  assert(twoSumTrace.ok === true && twoSumTrace.steps && twoSumTrace.steps.length > 5, "Two Sum (LC 1) executes successfully through engine");

  // Test 2: Best Time to Buy and Sell Stock (LC 121 - Arrays / Sliding Window)
  const stockProb = library.find(p => p.leetcodeNumber === 121);
  const stockTrace = engine.trace(stockProb.starterCode, "");
  assert(stockTrace.ok === true && stockTrace.steps && stockTrace.steps.length > 5, "Best Time to Buy and Sell Stock (LC 121) executes successfully through engine");

  // Test 3: Container With Most Water (LC 11 - Two Pointers)
  const containerProb = library.find(p => p.leetcodeNumber === 11);
  const containerTrace = engine.trace(containerProb.starterCode, "");
  assert(containerTrace.ok === true && containerTrace.steps && containerTrace.steps.length > 5, "Container With Most Water (LC 11) executes successfully through engine");

  // Test 4: Binary Search (LC 704 - Binary Search)
  const bsProb = library.find(p => p.leetcodeNumber === 704);
  const bsTrace = engine.trace(bsProb.starterCode, "");
  assert(bsTrace.ok === true && bsTrace.steps && bsTrace.steps.length > 5, "Binary Search (LC 704) executes successfully through engine");

  // Test 5: Maximum Subarray (LC 53 - Kadane / Dynamic Programming)
  const kadaneProb = library.find(p => p.leetcodeNumber === 53);
  const kadaneTrace = engine.trace(kadaneProb.starterCode, "");
  assert(kadaneTrace.ok === true && kadaneTrace.steps && kadaneTrace.steps.length > 5, "Maximum Subarray (LC 53) executes successfully through engine");

  console.log("\n===================================================================");
  console.log(`PHASE 1 TEST AUDIT COMPLETE: ${passedCount}/${testCount} TESTS PASSED`);
  if (passedCount === testCount) {
    console.log("100% OF PHASE 1 TESTS PASSED WITH ZERO FAILURES!");
  } else {
    console.error(`FAILED: ${testCount - passedCount} test(s) failed`);
  }
  console.log("===================================================================");
}

runDsaPhase1Tests();
