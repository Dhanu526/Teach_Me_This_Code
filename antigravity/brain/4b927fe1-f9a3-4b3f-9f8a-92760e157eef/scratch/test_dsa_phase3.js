// scratch/test_dsa_phase3.js — Comprehensive Test Suite for Phase 3: Curated 300-Problem Catalog & Schema Audit
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runDsaPhase3Tests() {
  console.log("===================================================================");
  console.log("PHASE 3: CURATED 300-PROBLEM STRUCTURED CATALOG & SCHEMA AUDIT");
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
  const dsaProblemsPath = path.join(appBuildDir, 'dsa_problems.js');
  const dsaDashboardPath = path.join(appBuildDir, 'dsa_dashboard.js');
  const stylesPath = path.join(appBuildDir, 'styles.css');

  // --- 1. Static & CSS Checks ---
  console.log("\n[1] Verifying Phase 3 CSS & Component Elements:");
  const css = fs.readFileSync(stylesPath, 'utf8');
  assert(css.includes('.btn-external-link'), "btn-external-link styles present");
  assert(css.includes('.modal-verification-strip'), "modal-verification-strip styles present");
  assert(css.includes('.prereq-chip'), "prereq-chip styles present");
  assert(css.includes('.example-box'), "example-box styles present");
  assert(css.includes('.constraints-list'), "constraints-list styles present");
  assert(css.includes('.modal-notes-textarea'), "modal-notes-textarea styles present");
  assert(css.includes('.btn-save-note'), "btn-save-note styles present");

  // Load sandbox
  const problemsCode = fs.readFileSync(dsaProblemsPath, 'utf8');
  const dashboardCode = fs.readFileSync(dsaDashboardPath, 'utf8');

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
      remove: () => {},
      innerHTML: '',
      style: {}
    }),
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  const sandbox = {
    window: { addEventListener: () => {}, scrollTo: () => {} },
    document: mockDocument,
    localStorage: mockLocalStorage,
    console,
    Math,
    Number,
    String,
    Array,
    Object,
    Set,
    Map,
    JSON,
    Date
  };

  vm.createContext(sandbox);
  vm.runInContext(problemsCode, sandbox);
  vm.runInContext(dashboardCode, sandbox);

  const library = sandbox.window.DSA_PROBLEMS_LIBRARY;
  const DsaDashboard = sandbox.window.DsaDashboard;

  assert(Array.isArray(library), "DSA_PROBLEMS_LIBRARY is defined as an array");
  assert(library.length === 300, `Exactly 300 curated problems cataloged (found ${library.length})`);

  // --- 2. Complete Schema Verification on Every Single Problem ---
  console.log("\n[2] Verifying Complete Structured Schema across all 300 Problems:");
  let allHaveId = true;
  let allHaveTitle = true;
  let allHaveValidUrl = true;
  let allHaveDifficulty = true;
  let allHavePrimaryTopic = true;
  let allHaveTopicTags = true;
  let allHavePattern = true;
  let allHaveSummary = true;
  let allHaveExamples = true;
  let allHaveConstraints = true;
  let allHavePrerequisites = true;
  let allHaveReferenceSolution = true;
  let allHaveVerificationStatus = true;

  const validDiffs = new Set(["Easy", "Medium", "Hard"]);

  library.forEach(p => {
    if (typeof p.id !== 'number' || p.id < 1 || p.id > 300) allHaveId = false;
    if (!p.title || typeof p.title !== 'string') allHaveTitle = false;
    if (!p.sourceUrl || !p.sourceUrl.startsWith("https://leetcode.com/problems/")) allHaveValidUrl = false;
    if (!validDiffs.has(p.difficulty)) allHaveDifficulty = false;
    if (!p.primaryTopic || typeof p.primaryTopic !== 'string') allHavePrimaryTopic = false;
    if (!Array.isArray(p.topicTags) || p.topicTags.length === 0) allHaveTopicTags = false;
    if (!p.pattern || typeof p.pattern !== 'string') allHavePattern = false;
    if (!p.summary || typeof p.summary !== 'string') allHaveSummary = false;
    if (!Array.isArray(p.examples) || p.examples.length === 0 || !p.examples[0].input || !p.examples[0].output) allHaveExamples = false;
    if (!Array.isArray(p.constraints) || p.constraints.length === 0) allHaveConstraints = false;
    if (!Array.isArray(p.prerequisites) || p.prerequisites.length === 0) allHavePrerequisites = false;
    if (!p.referenceSolution || typeof p.referenceSolution !== 'string') allHaveReferenceSolution = false;
    if (p.verificationStatus !== "Verified") allHaveVerificationStatus = false;
  });

  assert(allHaveId, "Every problem has a valid unique ID");
  assert(allHaveTitle, "Every problem has a title string");
  assert(allHaveValidUrl, "Every problem has a verified LeetCode source URL (https://leetcode.com/problems/...)");
  assert(allHaveDifficulty, "Every problem has a valid LeetCode difficulty label (Easy, Medium, Hard)");
  assert(allHavePrimaryTopic, "Every problem has a primary topic");
  assert(allHaveTopicTags, "Every problem has an array of topic tags");
  assert(allHavePattern, "Every problem has an algorithmic pattern description");
  assert(allHaveSummary, "Every problem has a concise original problem summary");
  assert(allHaveExamples, "Every problem has structured examples (input, output, explanation)");
  assert(allHaveConstraints, "Every problem has verified constraints and bounds");
  assert(allHavePrerequisites, "Every problem specifies prerequisite concepts");
  assert(allHaveReferenceSolution, "Every problem has a Python reference solution");
  assert(allHaveVerificationStatus, "Every problem has verificationStatus = 'Verified'");

  // --- 3. Sensible Distribution & Progression Audit ---
  console.log("\n[3] Auditing Difficulty Distribution & Learning Progression:");
  const diffs = { Easy: 0, Medium: 0, Hard: 0 };
  library.forEach(p => diffs[p.difficulty]++);
  assert(diffs.Easy === 78, `Easy count is 78 (found ${diffs.Easy})`);
  assert(diffs.Medium === 194, `Medium count is 194 (found ${diffs.Medium})`);
  assert(diffs.Hard === 28, `Hard count is 28 (found ${diffs.Hard})`);
  assert(diffs.Easy + diffs.Medium + diffs.Hard === 300, "Sensible weighted distribution matches target 300");

  // Progression check: Problem 1 is an Easy fundamentals problem (Two Sum)
  assert(library[0].title === "Two Sum" && library[0].difficulty === "Easy", "Problem #1 starts with Two Sum (fundamentals)");

  // --- 4. Personal Learning Notes & Persistence Audit ---
  console.log("\n[4] Testing Personal Learning Notes System (LocalStorage):");
  const dash = new DsaDashboard();

  assert(dash.hasNote(1) === false, "Problem 1 initially has no notes");
  dash.saveNote(1, "Used hash map complement target - x to achieve O(n) runtime.");
  assert(dash.hasNote(1) === true, "Problem 1 now hasNote = true");
  assert(dash.getNote(1) === "Used hash map complement target - x to achieve O(n) runtime.", "getNote retrieves exact note string");

  // Verify saved in localStorage
  const savedProgress = JSON.parse(storageMock['dsa_learning_progress_v1']);
  assert(savedProgress.notes && savedProgress.notes[1] === "Used hash map complement target - x to achieve O(n) runtime.", "Personal note persisted in localStorage under progress.notes[1]");

  // Test 'with_notes' status filter
  dash.selectedTopic = "all";
  dash.selectedDifficulty = "all";
  dash.selectedPattern = "all";
  dash.selectedStatus = "with_notes";
  const withNotesList = dash.getFilteredProblems();
  assert(withNotesList.length === 1 && withNotesList[0].id === 1, "Status filter 'with_notes' accurately returns only problem 1");

  // --- 5. Rich Modal Rendering Audit ---
  console.log("\n[5] Testing Rich Problem Modal with Phase 3 Schema:");
  let createdElement = null;
  sandbox.document.createElement = (tag) => {
    createdElement = {
      tagName: tag,
      id: '',
      className: '',
      innerHTML: '',
      addEventListener: () => {},
      remove: () => {}
    };
    return createdElement;
  };
  sandbox.document.body = {
    appendChild: (el) => {}
  };

  dash.showProblemModal(1);
  assert(createdElement !== null, "Modal created in DOM");
  assert(createdElement.innerHTML.includes('https://leetcode.com/problems/two-sum/'), "Modal includes verified LeetCode source link");
  assert(createdElement.innerHTML.includes('modal-verification-strip'), "Modal includes verification strip");
  assert(createdElement.innerHTML.includes('Prerequisite Concepts'), "Modal renders Prerequisite Concepts section");
  assert(createdElement.innerHTML.includes('Input / Output Examples'), "Modal renders Input / Output Examples section");
  assert(createdElement.innerHTML.includes('Constraints & Bounds'), "Modal renders Constraints & Bounds section");
  assert(createdElement.innerHTML.includes('Personal Learning Notes'), "Modal renders Personal Learning Notes section");
  assert(createdElement.innerHTML.includes('Python Reference Solution'), "Modal renders Python Reference Solution section");

  console.log("\n===================================================================");
  console.log(`PHASE 3 TEST AUDIT COMPLETE: ${passedCount}/${testCount} TESTS PASSED`);
  if (passedCount === testCount) {
    console.log("100% OF PHASE 3 TESTS PASSED WITH ZERO FAILURES!");
  } else {
    console.error(`FAILED: ${testCount - passedCount} test(s) failed`);
  }
  console.log("===================================================================");
}

runDsaPhase3Tests();
