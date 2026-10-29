// scratch/test_dsa_phase2.js — Comprehensive Test Suite for Phase 2: 30 Searchable Topics Library & Multi-Topic Filtering
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runDsaPhase2Tests() {
  console.log("===================================================================");
  console.log("PHASE 2: 30-TOPIC SEARCHABLE LIBRARY & MULTI-FACETED BROWSING AUDIT");
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

  // --- 1. Verifying 30 Topics Library Structure in CSS & Code ---
  console.log("\n[1] Verifying 30-Topic Architecture & CSS Styles:");
  const css = fs.readFileSync(stylesPath, 'utf8');
  assert(css.includes('.topic-30-grid'), "topic-30-grid CSS class present");
  assert(css.includes('.topic-30-card'), "topic-30-card CSS class present");
  assert(css.includes('.topic-detail-hero'), "topic-detail-hero CSS class present");
  assert(css.includes('.topic-recommended-card'), "topic-recommended-card CSS class present");
  assert(css.includes('.pattern-select'), "pattern-select CSS class present");
  assert(css.includes('.mini-topic-chip'), "mini-topic-chip CSS class present");

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
  const TOPIC_METADATA_30 = sandbox.window.TOPIC_METADATA_30;
  const DsaDashboard = sandbox.window.DsaDashboard;

  assert(Array.isArray(TOPIC_METADATA_30), "TOPIC_METADATA_30 is defined as an array");
  assert(TOPIC_METADATA_30.length === 30, `TOPIC_METADATA_30 contains exactly 30 topics (found ${TOPIC_METADATA_30.length})`);

  // Verify all 30 requested topics are present
  const required30Topics = [
    "Arrays",
    "Strings",
    "Hashing and Hash Maps",
    "Two Pointers",
    "Sliding Window",
    "Prefix Sum",
    "Binary Search",
    "Sorting",
    "Linked Lists",
    "Stacks",
    "Queues and Deques",
    "Recursion",
    "Backtracking",
    "Trees and Binary Trees",
    "Binary Search Trees",
    "Heaps and Priority Queues",
    "Graphs",
    "Breadth-First Search (BFS)",
    "Depth-First Search (DFS)",
    "Greedy Algorithms",
    "Dynamic Programming",
    "Bit Manipulation",
    "Tries",
    "Union-Find",
    "Topological Sorting",
    "Intervals",
    "Monotonic Stack and Queue",
    "Math and Number Theory",
    "Matrix Problems",
    "Advanced Data Structures"
  ];

  const metadataTopicNames = TOPIC_METADATA_30.map(t => t.name);
  const all30Present = required30Topics.every(t => metadataTopicNames.includes(t));
  assert(all30Present, "All 30 specific topics requested by the user are defined in TOPIC_METADATA_30");

  // --- 2. Multi-Topic Indexing Audit ---
  console.log("\n[2] Verifying Multi-Topic Tagging Across 300 Problems:");
  let multiTopicCount = 0;
  let allHaveTopics = true;

  library.forEach(p => {
    if (!Array.isArray(p.topics) || p.topics.length === 0) {
      allHaveTopics = false;
    }
    if (p.topics && p.topics.length > 1) {
      multiTopicCount++;
    }
  });

  assert(allHaveTopics, "Every problem has an array of topics (p.topics)");
  assert(multiTopicCount >= 200, `Problems belong to multiple topics (found ${multiTopicCount} multi-topic problems)`);

  // Check sample problem multi-topic tags
  const twoSum = library.find(p => p.leetcodeNumber === 1);
  assert(twoSum && twoSum.topics.includes("Arrays") && twoSum.topics.includes("Hashing and Hash Maps"), "Two Sum (LC 1) tagged with both 'Arrays' and 'Hashing and Hash Maps'");

  const numIslands = library.find(p => p.leetcodeNumber === 200);
  assert(numIslands && numIslands.topics.includes("Graphs") && numIslands.topics.includes("Matrix Problems"), "Number of Islands (LC 200) tagged with 'Graphs' and 'Matrix Problems'");

  const courseSchedule = library.find(p => p.leetcodeNumber === 207);
  assert(courseSchedule && courseSchedule.topics.includes("Graphs") && courseSchedule.topics.includes("Topological Sorting"), "Course Schedule (LC 207) tagged with 'Graphs' and 'Topological Sorting'");

  const dailyTemps = library.find(p => p.leetcodeNumber === 739);
  assert(dailyTemps && dailyTemps.topics.includes("Stacks") && dailyTemps.topics.includes("Monotonic Stack and Queue"), "Daily Temperatures (LC 739) tagged with 'Stacks' and 'Monotonic Stack and Queue'");

  // --- 3. Topic Page Details, Distributions & Next Problem Audit ---
  console.log("\n[3] Testing Topic Page Metrics, Difficulty Distributions & Recommended Next Problem:");
  const dash = new DsaDashboard();

  let all30HaveProblems = true;
  let all30HaveDiffDistribution = true;
  let all30HaveRecommendedProblem = true;

  required30Topics.forEach(topicName => {
    const stats = dash.computeTopicStats(topicName);
    if (stats.total === 0) all30HaveProblems = false;
    if (stats.diffMap.Easy.total + stats.diffMap.Medium.total + stats.diffMap.Hard.total !== stats.total) {
      all30HaveDiffDistribution = false;
    }
    if (!stats.recommendedProblem || !stats.recommendedProblem.title) {
      all30HaveRecommendedProblem = false;
    }
  });

  assert(all30HaveProblems, "Every one of the 30 topics has at least 1 real curated problem (zero empty topics)");
  assert(all30HaveDiffDistribution, "Every topic page correctly calculates difficulty distribution (Easy, Medium, Hard breakdown)");
  assert(all30HaveRecommendedProblem, "Every topic page identifies a valid recommended next problem");

  // Specific check on Arrays topic
  const arrayStats = dash.computeTopicStats("Arrays");
  assert(arrayStats.total >= 100, `Arrays topic contains ${arrayStats.total} problems`);
  assert(arrayStats.recommendedProblem.title === "Two Sum", "Arrays initial recommended next problem is 'Two Sum'");

  // Now mark Two Sum as solved and verify recommended next problem updates
  dash.markSolved(1);
  const updatedArrayStats = dash.computeTopicStats("Arrays");
  assert(updatedArrayStats.solved === 1, "Arrays solved count increments to 1");
  assert(updatedArrayStats.recommendedProblem.leetcodeNumber !== 1, `Next recommended problem dynamically shifts away from solved Two Sum (now #${updatedArrayStats.recommendedProblem.leetcodeNumber})`);

  // --- 4. Multi-Faceted Browsing: Topic, Difficulty, Pattern, and Status ---
  console.log("\n[4] Testing Multi-Faceted Browsing (Topic, Difficulty, Pattern, Status):");
  
  // 4A: Browse by Topic
  dash.selectedTopic = "Binary Search";
  dash.selectedDifficulty = "all";
  dash.selectedPattern = "all";
  dash.selectedStatus = "all";
  let bsResults = dash.getFilteredProblems();
  assert(bsResults.length === 20 && bsResults.every(p => p.topics.includes("Binary Search")), "Browse by Topic: 'Binary Search' returns all 20 binary search problems");

  // 4B: Browse by Difficulty within Topic
  dash.selectedDifficulty = "Medium";
  let bsMedResults = dash.getFilteredProblems();
  assert(bsMedResults.length > 0 && bsMedResults.every(p => p.difficulty === "Medium" && p.topics.includes("Binary Search")), "Browse by Difficulty: 'Binary Search' + 'Medium' accurately filters");

  // 4C: Browse by Algorithmic Pattern
  dash.selectedTopic = "all";
  dash.selectedDifficulty = "all";
  const samplePattern = dash.getAllAlgorithmicPatterns()[0];
  dash.selectedPattern = samplePattern;
  let patternResults = dash.getFilteredProblems();
  assert(patternResults.length > 0 && patternResults.every(p => p.pattern === samplePattern), `Browse by Algorithmic Pattern: correctly filters by specific pattern ('${samplePattern}')`);

  // 4D: Browse by Learning Status
  dash.selectedPattern = "all";
  dash.selectedStatus = "solved";
  let statusResults = dash.getFilteredProblems();
  assert(statusResults.length === 1 && statusResults[0].id === 1, "Browse by Learning Status: 'solved' accurately returns problem 1");

  // 4E: Search within topic
  dash.selectedTopic = "Trees and Binary Trees";
  dash.selectedStatus = "all";
  dash.searchQuery = "invert";
  let searchResults = dash.getFilteredProblems();
  assert(searchResults.length > 0 && searchResults.some(p => p.title === "Invert Binary Tree"), "Search within Topic: finds 'Invert Binary Tree' within Trees topic");

  // --- 5. Dedicated Topic Page View & Navigation ---
  console.log("\n[5] Testing Dedicated Topic Page Rendering & Navigation:");
  dash.openTopicDetailPage("Graphs");
  assert(dash.currentSubTab === 'topic_detail', "openTopicDetailPage switches subtab to 'topic_detail'");
  assert(dash.activeTopicDetail === 'Graphs', "activeTopicDetail set to 'Graphs'");

  const detailHtml = dash.renderDedicatedTopicPage();
  assert(detailHtml.includes('Graphs'), "Topic page renders 'Graphs' title");
  assert(detailHtml.includes('Difficulty Distribution in Graphs'), "Topic page renders difficulty distribution section");
  assert(detailHtml.includes('Recommended Next Problem in Graphs'), "Topic page renders recommended next problem card");
  assert(detailHtml.includes('topicDetailPatternSelect'), "Topic page includes algorithmic pattern selector");
  assert(detailHtml.includes('topicDetailProblemSearch'), "Topic page includes in-topic search input");

  console.log("\n===================================================================");
  console.log(`PHASE 2 TEST AUDIT COMPLETE: ${passedCount}/${testCount} TESTS PASSED`);
  if (passedCount === testCount) {
    console.log("100% OF PHASE 2 TESTS PASSED WITH ZERO FAILURES!");
  } else {
    console.error(`FAILED: ${testCount - passedCount} test(s) failed`);
  }
  console.log("===================================================================");
}

runDsaPhase2Tests();
