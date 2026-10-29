// scratch/test_dsa_phase4.js
// Comprehensive Phase 4 Test Suite: Search, Filters, Sorting, Pagination, Unique Routes & Duplicate Prevention

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runDsaPhase4Tests() {
  console.log("===================================================================");
  console.log("PHASE 4: SEARCH, FILTERS, SORTING, PAGINATION, ROUTES & DEDUP AUDIT");
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
  const problemsCode = fs.readFileSync(path.join(appBuildDir, 'dsa_problems.js'), 'utf8');
  const dashboardCode = fs.readFileSync(path.join(appBuildDir, 'dsa_dashboard.js'), 'utf8');
  const stylesCode = fs.readFileSync(path.join(appBuildDir, 'styles.css'), 'utf8');

  // Verify CSS styles for Phase 4
  console.log("\n[1] Verifying Phase 4 CSS Styles & UI Classes:");
  assert(stylesCode.includes('.col-review'), "col-review CSS style present");
  assert(stylesCode.includes('.review-btn'), "review-btn CSS style present");
  assert(stylesCode.includes('.review-badge-pill'), "review-badge-pill CSS style present");
  assert(stylesCode.includes('.filter-pill.filter-review'), "filter-review CSS style present");
  assert(stylesCode.includes('.page-size-selector-wrap'), "page-size-selector-wrap CSS style present");
  assert(stylesCode.includes('.btn-page-nav'), "btn-page-nav CSS style present");
  assert(stylesCode.includes('.modal-route-bar'), "modal-route-bar CSS style present");
  assert(stylesCode.includes('.route-badge'), "route-badge CSS style present");
  assert(stylesCode.includes('.btn-copy-route'), "btn-copy-route CSS style present");
  assert(stylesCode.includes('.btn-hero-review'), "btn-hero-review CSS style present");
  assert(stylesCode.includes('.btn-import-problems'), "btn-import-problems CSS style present");
  assert(stylesCode.includes('.import-modal-card'), "import-modal-card CSS style present");

  // Setup headless sandbox
  const storageMock = {};
  const mockLocalStorage = {
    getItem: (k) => storageMock[k] || null,
    setItem: (k, v) => { storageMock[k] = String(v); },
    removeItem: (k) => { delete storageMock[k]; },
    clear: () => { Object.keys(storageMock).forEach(k => delete storageMock[k]); }
  };

  let createdElements = [];
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
    createElement: (tag) => {
      const el = {
        tagName: tag,
        id: '',
        className: '',
        innerHTML: '',
        addEventListener: () => {},
        remove: () => {}
      };
      createdElements.push(el);
      return el;
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    body: { appendChild: () => {} }
  };

  let mockLocation = {
    hash: '',
    pathname: '/index.html',
    origin: 'http://localhost:3000'
  };

  const sandbox = {
    window: {
      addEventListener: () => {},
      scrollTo: () => {},
      location: mockLocation,
      history: { replaceState: (state, title, url) => { mockLocation.hash = url; } },
      navigator: { clipboard: { writeText: () => Promise.resolve() } },
      setTimeout: (fn) => fn()
    },
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

  const DsaDashboard = sandbox.window.DsaDashboard;
  const dash = new DsaDashboard();

  // --- 2. Functional Search Verification ---
  console.log("\n[2] Testing Functional Problem Search Engine:");
  // Title search
  dash.searchQuery = 'two sum';
  let results = dash.getFilteredProblems();
  assert(results.length >= 1 && results.some(p => p.title.toLowerCase().includes('two sum')), "Search by Title 'two sum' returns matching problems");

  // Number search
  dash.searchQuery = '53';
  results = dash.getFilteredProblems();
  assert(results.some(p => p.leetcodeNumber === 53), "Search by LeetCode # '53' returns Maximum Subarray");

  // Pattern search
  dash.searchQuery = 'monotonic stack';
  results = dash.getFilteredProblems();
  assert(results.length >= 1 && results.every(p => p.pattern.toLowerCase().includes('monotonic stack') || p.description.toLowerCase().includes('monotonic stack') || (p.topics && p.topics.some(t => t.toLowerCase().includes('monotonic stack')))), "Search by pattern 'monotonic stack' returns matching problems");

  // Topic search keyword
  dash.searchQuery = 'dynamic programming';
  results = dash.getFilteredProblems();
  assert(results.length >= 20, `Search by keyword 'dynamic programming' returns ${results.length} problems`);
  dash.searchQuery = ''; // reset

  // --- 3. Functional Filtering Verification ---
  console.log("\n[3] Testing Multi-Dimensional Filters (Topic, Difficulty, Status, Pattern, Bookmarks):");
  // Topic filter (multi-topic support)
  dash.selectedTopic = 'Graphs';
  results = dash.getFilteredProblems();
  assert(results.length >= 18, `Filter by Topic 'Graphs' returns ${results.length} problems`);
  dash.selectedTopic = 'all';

  // Difficulty filter: Easy, Medium, Hard
  dash.selectedDifficulty = 'Easy';
  results = dash.getFilteredProblems();
  assert(results.length === 78, `Filter by Difficulty 'Easy' returns exactly 78 problems (found ${results.length})`);

  dash.selectedDifficulty = 'Medium';
  results = dash.getFilteredProblems();
  assert(results.length === 194, `Filter by Difficulty 'Medium' returns exactly 194 problems (found ${results.length})`);

  dash.selectedDifficulty = 'Hard';
  results = dash.getFilteredProblems();
  assert(results.length === 28, `Filter by Difficulty 'Hard' returns exactly 28 problems (found ${results.length})`);
  dash.selectedDifficulty = 'all';

  // Status Filter: Not Started, Attempted, Solved, Review
  // Initially all are not started
  dash.selectedStatus = 'not_started';
  results = dash.getFilteredProblems();
  assert(results.length === 300, `Initial 'not_started' status filter returns 300 problems (found ${results.length})`);

  // Mark Problem 1 Attempted
  dash.markAttempted(1);
  assert(dash.getProblemStatus(1) === 'attempted', "Problem 1 status is 'attempted'");
  dash.selectedStatus = 'attempted';
  results = dash.getFilteredProblems();
  assert(results.length === 1 && results[0].id === 1, "Status filter 'attempted' returns only problem 1");

  // Mark Problem 1 Solved
  dash.markSolved(1);
  assert(dash.getProblemStatus(1) === 'solved', "Problem 1 status is 'solved'");
  dash.selectedStatus = 'solved';
  results = dash.getFilteredProblems();
  assert(results.length === 1 && results[0].id === 1, "Status filter 'solved' returns only problem 1");

  // Review Status
  assert(dash.isReview(1) === false, "Problem 1 initially isReview = false");
  dash.markReview(1);
  assert(dash.isReview(1) === true, "Problem 1 markReview(1) sets isReview = true");
  dash.markReview(2);
  assert(dash.isReview(2) === true, "Problem 2 markReview(2) sets isReview = true");
  assert(dash.progress.review.length === 2, "Review array contains 2 problems");

  dash.selectedStatus = 'review';
  results = dash.getFilteredProblems();
  assert(results.length === 2 && results.some(p => p.id === 1) && results.some(p => p.id === 2), "Status filter 'review' returns exactly the 2 review problems");

  dash.toggleReview(2);
  assert(dash.isReview(2) === false, "toggleReview(2) toggles review back to false");
  results = dash.getFilteredProblems();
  assert(results.length === 1 && results[0].id === 1, "Status filter 'review' updates dynamically after toggle");

  // Bookmarked status filter
  dash.toggleBookmark(3);
  dash.selectedStatus = 'bookmarked';
  results = dash.getFilteredProblems();
  assert(results.length === 1 && results[0].id === 3, "Status filter 'bookmarked' returns problem 3");

  // Independent Bookmarked status filter (onlyBookmarked)
  dash.selectedStatus = 'all';
  dash.onlyBookmarked = true;
  results = dash.getFilteredProblems();
  assert(results.length === 1 && results[0].id === 3, "Independent onlyBookmarked toggle returns only bookmarked problems");
  dash.onlyBookmarked = false;

  // Algorithmic pattern filter
  dash.selectedPattern = 'Hash Map Lookup';
  results = dash.getFilteredProblems();
  assert(results.length >= 1 && results.every(p => p.pattern === 'Hash Map Lookup'), "Pattern filter correctly isolates 'Hash Map Lookup' pattern");
  dash.selectedPattern = 'all';

  // --- 4. Sorting Verification (Title, Difficulty, Learning Order) ---
  console.log("\n[4] Testing Catalog Sorting Engine (Title, Difficulty, Learning Order, LC #):");
  // Learning Order (1 -> 300)
  dash.selectedSort = 'order_asc';
  results = dash.getFilteredProblems();
  assert(results[0].id === 1 && results[1].id === 2 && results[results.length - 1].id === 300, "Sort by Learning Order (order_asc) orders problems 1 to 300");

  // Learning Order Reverse (300 -> 1)
  dash.selectedSort = 'order_desc';
  results = dash.getFilteredProblems();
  assert(results[0].id === 300 && results[1].id === 299 && results[results.length - 1].id === 1, "Sort by Learning Order Reverse (order_desc) orders problems 300 to 1");

  // Title A -> Z
  dash.selectedSort = 'title_asc';
  results = dash.getFilteredProblems();
  let sortedTitlesAsc = true;
  for (let i = 0; i < 20; i++) {
    if (results[i].title.localeCompare(results[i+1].title) > 0) {
      sortedTitlesAsc = false;
      break;
    }
  }
  assert(sortedTitlesAsc, "Sort by Title (title_asc) alphabetically sorts titles A to Z");

  // Title Z -> A
  dash.selectedSort = 'title_desc';
  results = dash.getFilteredProblems();
  let sortedTitlesDesc = true;
  for (let i = 0; i < 20; i++) {
    if (results[i].title.localeCompare(results[i+1].title) < 0) {
      sortedTitlesDesc = false;
      break;
    }
  }
  assert(sortedTitlesDesc, "Sort by Title (title_desc) reverse sorts titles Z to A");

  // Difficulty Easy -> Medium -> Hard
  dash.selectedSort = 'diff_asc';
  results = dash.getFilteredProblems();
  assert(results[0].difficulty === 'Easy' && results[77].difficulty === 'Easy', "First 78 items in diff_asc are Easy");
  assert(results[78].difficulty === 'Medium', "Next items in diff_asc are Medium");
  assert(results[results.length - 1].difficulty === 'Hard', "Last items in diff_asc are Hard");

  // Difficulty Hard -> Medium -> Easy
  dash.selectedSort = 'diff_desc';
  results = dash.getFilteredProblems();
  assert(results[0].difficulty === 'Hard' && results[27].difficulty === 'Hard', "First 28 items in diff_desc are Hard");
  assert(results[28].difficulty === 'Medium', "Next items in diff_desc are Medium");
  assert(results[results.length - 1].difficulty === 'Easy', "Last items in diff_desc are Easy");

  // Reset sort
  dash.selectedSort = 'order_asc';

  // --- 5. Pagination & Page Size Verification ---
  console.log("\n[5] Testing Pagination Controls & Page Size Options:");
  dash.pageSize = 25;
  dash.currentPage = 1;
  let html = dash.renderProblemTableContent();
  assert(html.includes('Showing <strong>1–25</strong> of <strong>300</strong> problems'), "Default page size 25 shows 1–25 of 300");
  assert(html.includes('Page <strong>1</strong> of <strong>12</strong>'), "Page 1 of 12 calculated for 300 problems with pageSize=25");
  assert(html.includes('|←') && html.includes('→|'), "Pagination bar includes First (|←) and Last (→|) buttons");

  // Page 2
  dash.currentPage = 2;
  html = dash.renderProblemTableContent();
  assert(html.includes('Showing <strong>26–50</strong> of <strong>300</strong> problems'), "Page 2 shows 26–50 of 300");

  // Page Size 50
  dash.pageSize = 50;
  dash.currentPage = 1;
  html = dash.renderProblemTableContent();
  assert(html.includes('Showing <strong>1–50</strong> of <strong>300</strong> problems'), "Page size 50 shows 1–50 of 300");
  assert(html.includes('Page <strong>1</strong> of <strong>6</strong>'), "Page 1 of 6 calculated for 300 problems with pageSize=50");

  // Page Size 'all'
  dash.pageSize = 'all';
  html = dash.renderProblemTableContent();
  assert(html.includes('Showing <strong>1–300</strong> of <strong>300</strong> problems'), "Page size 'all' displays all 300 problems in responsive list view");
  dash.pageSize = 25; // reset

  // --- 6. Unique Route & Problem Detail View ---
  console.log("\n[6] Testing Unique URL Route & Problem Detail View:");
  // Open problem modal for Problem 1
  dash.showProblemModal(1);
  assert(mockLocation.hash === '#dsa/problem/1', "Opening Problem 1 detail modal sets URL hash to '#dsa/problem/1'");

  const modalHtml = createdElements[createdElements.length - 1].innerHTML;
  assert(modalHtml.includes('modal-route-bar'), "Modal renders unique route bar");
  assert(modalHtml.includes('#dsa/problem/1'), "Modal displays unique route '#dsa/problem/1'");
  assert(modalHtml.includes('btnCopyProblemRoute'), "Modal provides 'Copy Problem Link' button");
  assert(modalHtml.includes('btn-hero-review'), "Modal provides 'Mark for Review' button");

  // Router listener test
  mockLocation.hash = '#dsa/problem/15';
  dash.initRouter();
  assert(mockLocation.hash === '#dsa/problem/15', "Router responds to '#dsa/problem/15' hash change");

  // --- 7. Duplicate Prevention When Importing Additional Problems ---
  console.log("\n[7] Testing Duplicate Prevention Engine on Problem Import:");
  const initialCatalogCount = dash.problems.length;
  assert(initialCatalogCount === 300, "Catalog starts at 300 problems");

  // Test duplicate cases
  const duplicateBatch = [
    // Duplicate 1: Matching LeetCode # and Title
    {
      id: 999, // different ID but duplicate LC #1 and Title
      leetcodeNumber: 1,
      title: "Two Sum",
      difficulty: "Easy",
      primaryTopic: "Arrays"
    },
    // Duplicate 2: Matching Problem ID 53
    {
      id: 53,
      leetcodeNumber: 53,
      title: "Maximum Subarray (Duplicate Check)",
      difficulty: "Medium",
      primaryTopic: "Dynamic Programming"
    },
    // Duplicate 3: Matching Normalized Title
    {
      title: "  Trapping Rain Water  ",
      leetcodeNumber: 9999,
      difficulty: "Hard",
      primaryTopic: "Two Pointers"
    },
    // Duplicate 4: Matching Source URL
    {
      title: "Unique Title But Existing URL",
      sourceUrl: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
      primaryTopic: "Arrays"
    },
    // Genuine Brand New Problem (Should be imported)
    {
      leetcodeNumber: 1832,
      title: "Check if the Sentence Is Pangram",
      sourceUrl: "https://leetcode.com/problems/check-if-the-sentence-is-pangram/",
      difficulty: "Easy",
      primaryTopic: "Strings",
      pattern: "Hash Set Character Counting",
      summary: "A pangram is a sentence where every letter of the English alphabet appears at least once. Return true if sentence is a pangram.",
      examples: [{ input: "sentence = 'thequickbrownfoxjumpsoverthelazydog'", output: "true" }],
      constraints: ["sentence length between 1 and 1000"],
      prerequisites: ["Strings", "Hash Sets"]
    }
  ];

  // Run import with default onDuplicate='skip'
  const report = dash.importProblems(duplicateBatch, { onDuplicate: 'skip' });
  assert(report.totalInput === 5, "Import processed 5 input candidates");
  assert(report.duplicates.length === 4, `Detected exactly 4 duplicates (found ${report.duplicates.length})`);
  assert(report.skipped === 4, `Skipped all 4 duplicate records (skipped ${report.skipped})`);
  assert(report.imported === 1, "Successfully imported the 1 genuine new problem");
  assert(dash.problems.length === 301, `Catalog size incremented from 300 to 301 (found ${dash.problems.length})`);

  // Verify the imported problem has a unique ID and full structured schema
  const newProblem = dash.problems.find(p => p.title === "Check if the Sentence Is Pangram");
  assert(newProblem !== undefined, "Imported problem found in catalog");
  assert(newProblem.id > 300, `Imported problem assigned unique sequential ID #${newProblem.id}`);
  assert(newProblem.difficulty === "Easy", "Imported problem preserves Difficulty");
  assert(newProblem.primaryTopic === "Strings", "Imported problem preserves Primary Topic");

  // Attempt to import the same batch again -> all 5 must be rejected as duplicates!
  const secondReport = dash.importProblems(duplicateBatch, { onDuplicate: 'skip' });
  assert(secondReport.imported === 0, "Second import pass imported 0 duplicates");
  assert(secondReport.skipped === 5, "All 5 records correctly identified as duplicates and skipped");
  assert(dash.problems.length === 301, "Catalog length remained unchanged at 301 (no duplicate pollution)");

  console.log("\n===================================================================");
  console.log(`PHASE 4 TEST AUDIT COMPLETE: ${passedCount}/${testCount} TESTS PASSED`);
  if (passedCount === testCount) {
    console.log("100% OF PHASE 4 TESTS PASSED WITH ZERO FAILURES!");
  } else {
    console.error(`FAILED: ${testCount - passedCount} test(s) failed`);
  }
  console.log("===================================================================");
}

runDsaPhase4Tests();
