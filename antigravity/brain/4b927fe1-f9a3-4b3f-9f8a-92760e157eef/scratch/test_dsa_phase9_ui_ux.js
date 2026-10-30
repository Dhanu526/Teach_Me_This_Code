/**
 * Comprehensive Test Suite for Phase 9: User Interface & User Experience
 * Validates consistent styling, clear typography, breadcrumb & prev/next navigation,
 * responsive layout classes, empty/loading/error states, clear status indicators,
 * beginner mode complexity formatting, visualizer accessibility, and Kadane = 6.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

console.log('===================================================================');
console.log('PHASE 9 TEST SUITE: USER INTERFACE, EXPERIENCE & ACCESSIBILITY AUDIT');
console.log('===================================================================');

const appBuildDir = 'C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build';
const problemsCode = fs.readFileSync(path.join(appBuildDir, 'dsa_problems.js'), 'utf8');
const solutionsCode = fs.readFileSync(path.join(appBuildDir, 'dsa_solutions_data.js'), 'utf8');
const dashboardCode = fs.readFileSync(path.join(appBuildDir, 'dsa_dashboard.js'), 'utf8');
const engineCode = fs.readFileSync(path.join(appBuildDir, 'engine.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(appBuildDir, 'styles.css'), 'utf8');

// Mock browser DOM environment
class MockElement {
  constructor(tagName = 'div', id = '') {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.className = '';
    this.style = {};
    this.classList = {
      classes: new Set(),
      add: (c) => this.classList.classes.add(c),
      remove: (c) => this.classList.classes.delete(c),
      contains: (c) => this.classList.classes.has(c),
      toggle: (c) => {
        if (this.classList.classes.has(c)) this.classList.classes.delete(c);
        else this.classList.classes.add(c);
      }
    };
    this.innerHTML = '';
    this.value = '';
    this.textContent = '';
    this.attributes = new Map();
    this.eventListeners = {};
    this.children = [];
  }

  getAttribute(name) { return this.attributes.get(name) || null; }
  setAttribute(name, val) { this.attributes.set(name, String(val)); }
  addEventListener(event, fn) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(fn);
  }
  dispatchEvent(event) {
    const list = this.eventListeners[event.type] || [];
    list.forEach(fn => fn(event));
  }
  querySelector(selector) { return new MockElement('div'); }
  querySelectorAll(selector) { return []; }
  scrollIntoView() {}
  remove() {}
  appendChild(child) { this.children.push(child); }
  removeChild(child) { this.children = this.children.filter(c => c !== child); }
  click() {}
}

const mockLocalStorage = {
  store: {},
  getItem(k) { return this.store[k] !== undefined ? this.store[k] : null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; },
  clear() { this.store = {}; }
};

const mockBlob = typeof Blob !== 'undefined' ? Blob : class MockBlob {
  constructor(parts, opts) { this.parts = parts; this.opts = opts; }
};

const mockUrl = {
  createObjectURL: () => 'blob:http://localhost/mock-uuid',
  revokeObjectURL: () => {}
};

const sandbox = {
  window: {
    location: { hash: '', origin: 'http://localhost', pathname: '/' },
    history: { replaceState: () => {} },
    navigator: { clipboard: { writeText: () => Promise.resolve() } },
    addEventListener: () => {},
    scrollTo: () => {},
    confirm: () => true,
    prompt: () => 'RESET',
    alert: () => {},
    Blob: mockBlob,
    URL: mockUrl
  },
  document: {
    body: new MockElement('body'),
    getElementById: (id) => new MockElement('div', id),
    querySelector: () => new MockElement('div'),
    querySelectorAll: () => [],
    createElement: (tag) => new MockElement(tag)
  },
  Blob: mockBlob,
  URL: mockUrl,
  localStorage: mockLocalStorage,
  console: console,
  setTimeout: (fn) => fn(),
  clearTimeout: () => {}
};

sandbox.window.document = sandbox.document;
sandbox.window.localStorage = sandbox.localStorage;

vm.createContext(sandbox);
vm.runInContext(engineCode, sandbox);
vm.runInContext(problemsCode, sandbox);
vm.runInContext(solutionsCode, sandbox);
vm.runInContext(dashboardCode, sandbox);

let testsPassed = 0;
function pass(msg) {
  testsPassed++;
  console.log(`  ✓ [PASS] ${msg}`);
}

// -----------------------------------------------------------------------------
// [TEST SECTION 1]: Consistent Styling, Typography & Interface Gap Harmony
// -----------------------------------------------------------------------------
console.log('\n[1] Testing Consistent Styling & Interface Spacing:');

assert(stylesCss.includes('.dsa-breadcrumb-bar'), 'CSS defines .dsa-breadcrumb-bar');
assert(stylesCss.includes('.breadcrumb-item'), 'CSS defines .breadcrumb-item');
assert(stylesCss.includes('.btn-mode-toggle'), 'CSS defines .btn-mode-toggle');
assert(stylesCss.includes('.workspace-prev-next-nav'), 'CSS defines .workspace-prev-next-nav');
assert(stylesCss.includes('.console-error-card'), 'CSS defines .console-error-card');
assert(stylesCss.includes('.error-beginner-tip'), 'CSS defines .error-beginner-tip');
assert(stylesCss.includes('.dsa-empty-state-card'), 'CSS defines .dsa-empty-state-card');
assert(stylesCss.includes('.btn-clear-empty-filters'), 'CSS defines .btn-clear-empty-filters');
assert(stylesCss.includes('@media (max-width: 900px)'), 'CSS includes tablet media query');
assert(stylesCss.includes('@media (max-width: 600px)'), 'CSS includes mobile media query');
pass('All Phase 9 styling, breadcrumbs, error cards, and responsive media queries defined in styles.css');

// -----------------------------------------------------------------------------
// [TEST SECTION 2]: Simple Navigation & Breadcrumbs
// -----------------------------------------------------------------------------
console.log('\n[2] Testing Navigation Between Topics and Problems:');

const dsa = new sandbox.window.DsaDashboard();

// Breadcrumbs on dashboard
dsa.currentSubTab = 'dashboard';
const dashCrumbs = dsa.renderBreadcrumbs();
assert(dashCrumbs.includes('Dashboard Overview'), 'Dashboard breadcrumbs include Dashboard Overview');

// Breadcrumbs on topics
dsa.currentSubTab = 'topics';
const topicsCrumbs = dsa.renderBreadcrumbs();
assert(topicsCrumbs.includes('30-Topic Library'), 'Topics breadcrumbs include 30-Topic Library');

// Breadcrumbs on topic detail
dsa.currentSubTab = 'topic_detail';
dsa.activeTopicDetail = 'Binary Search';
const topicDetailCrumbs = dsa.renderBreadcrumbs();
assert(topicDetailCrumbs.includes('Binary Search'), 'Topic detail breadcrumbs include topic name');

// Breadcrumbs on problems catalog
dsa.currentSubTab = 'problems';
const probsCrumbs = dsa.renderBreadcrumbs();
assert(probsCrumbs.includes('300 Curated Problems'), 'Problems breadcrumbs include 300 Curated Problems');

// Breadcrumbs on roadmap
dsa.currentSubTab = 'roadmap';
const roadmapCrumbs = dsa.renderBreadcrumbs();
assert(roadmapCrumbs.includes('10-Stage Beginner Roadmap'), 'Roadmap breadcrumbs include 10-Stage Beginner Roadmap');

// Breadcrumbs in workspace
dsa.currentSubTab = 'workspace';
dsa.activeWorkspaceProblemId = 1;
const wsCrumbs = dsa.renderBreadcrumbs();
assert(wsCrumbs.includes('Two Sum'), 'Workspace breadcrumbs include Two Sum problem title');
pass('Interactive breadcrumb trails rendered accurately across all 6 platform sub-views');

// Workspace Prev/Next navigation
const wsHtml = dsa.renderProblemWorkspace(1);
assert(wsHtml.includes('workspace-prev-next-nav'), 'Workspace includes prev/next problem navigation');
assert(wsHtml.includes('← Prev'), 'Workspace includes Prev Problem button');
assert(wsHtml.includes('Next →'), 'Workspace includes Next Problem button');
assert(wsHtml.includes('1 / 300'), 'Workspace includes problem step indicator');
pass('Direct previous/next problem stepping controls rendered in workspace header');

// -----------------------------------------------------------------------------
// [TEST SECTION 3]: Useful Empty, Loading & Error States
// -----------------------------------------------------------------------------
console.log('\n[3] Testing Empty, Loading, and Educational Error States:');

// 1. Empty state on search query
dsa.searchQuery = 'non_existent_problem_xyz';
const emptySearchHtml = dsa.renderProblemTableContent();
assert(emptySearchHtml.includes('dsa-empty-state-card'), 'Empty state card rendered');
assert(emptySearchHtml.includes('No problems found matching'), 'Contextual empty search message rendered');
assert(emptySearchHtml.includes('data-action="clear-filters"'), 'Clear filters button present');

// 2. Empty state on bookmarks
dsa.searchQuery = '';
dsa.selectedStatus = 'bookmarked';
dsa.progress.bookmarked = [];
const emptyBookmarkHtml = dsa.renderProblemTableContent();
assert(emptyBookmarkHtml.includes('No bookmarked problems found'), 'Contextual empty bookmark message rendered');

// 3. Empty state on review
dsa.selectedStatus = 'review';
dsa.progress.review = [];
const emptyReviewHtml = dsa.renderProblemTableContent();
assert(emptyReviewHtml.includes('Your review list is currently empty'), 'Contextual empty review message rendered');

// Reset status
dsa.selectedStatus = 'all';

// 4. Educational error formatting
const syntaxErr = dsa.formatEducationalError('SyntaxError: invalid syntax on line 4');
assert.strictEqual(syntaxErr.line, 4, 'Extracted line 4 from syntax error');
assert(syntaxErr.title.includes('SyntaxError'), 'Formatted syntax error title');
assert(syntaxErr.tip.includes('missing colon'), 'Provided helpful beginner syntax tip');

const indentErr = dsa.formatEducationalError('IndentationError: unexpected indent line 7');
assert.strictEqual(indentErr.line, 7, 'Extracted line 7 from indentation error');
assert(indentErr.title.includes('IndentationError'), 'Formatted indentation error title');
assert(indentErr.tip.includes('consistent indentation'), 'Provided helpful indentation tip');

const nameErr = dsa.formatEducationalError('NameError: name "running_sum" is not defined');
assert(nameErr.title.includes('NameError'), 'Formatted NameError title');
assert(nameErr.tip.includes('before assigning a value'), 'Provided helpful undefined variable tip');

const indexErr = dsa.formatEducationalError('IndexError: list index out of range');
assert(indexErr.title.includes('IndexError'), 'Formatted IndexError title');
assert(indexErr.tip.includes('outside the list range'), 'Provided helpful index range tip');

pass('Contextual empty states and structured educational error formatters verified');

// -----------------------------------------------------------------------------
// [TEST SECTION 4]: Beginner Mode & Plain-English Complexities
// -----------------------------------------------------------------------------
console.log('\n[4] Testing Beginner Mode & Complexity Interpretation:');

assert.strictEqual(dsa.beginnerMode, true, 'Beginner Mode is enabled by default');

// Time complexities
assert(dsa.formatComplexityForBeginner('O(1)', 'time').includes('Instant (Constant)'), 'O(1) time formatted in plain English');
assert(dsa.formatComplexityForBeginner('O(n)', 'time').includes('Linear (Visits each element once)'), 'O(n) time formatted in plain English');
assert(dsa.formatComplexityForBeginner('O(n^2)', 'time').includes('Quadratic (Nested loops'), 'O(n^2) time formatted in plain English');
assert(dsa.formatComplexityForBeginner('O(n log n)', 'time').includes('Log-Linear (Fast sorting speed)'), 'O(n log n) time formatted in plain English');

// Space complexities
assert(dsa.formatComplexityForBeginner('O(1)', 'space').includes('In-Place (No extra memory)'), 'O(1) space formatted in plain English');
assert(dsa.formatComplexityForBeginner('O(n)', 'space').includes('Linear Memory (Stores items'), 'O(n) space formatted in plain English');

// Toggle Beginner Mode
dsa.toggleBeginnerMode();
assert.strictEqual(dsa.beginnerMode, false, 'toggleBeginnerMode switched to Detailed Mode');
assert.strictEqual(dsa.formatComplexityForBeginner('O(n)', 'time'), 'O(n)', 'Raw complexity returned in Detailed Mode');

dsa.toggleBeginnerMode();
assert.strictEqual(dsa.beginnerMode, true, 'toggleBeginnerMode restored Beginner Mode');
pass('Beginner Mode successfully translates Big-O notation into clear intuitive explanations');

// -----------------------------------------------------------------------------
// [TEST SECTION 5]: Clear Indicators for Solved, Attempted, Bookmarked & Review
// -----------------------------------------------------------------------------
console.log('\n[5] Testing Progress Indicators Across Problem States:');

dsa.progress.solved = [1];
dsa.progress.attempted = [2];
dsa.progress.bookmarked = [3];
dsa.progress.review = [4];

assert.strictEqual(dsa.getProblemStatus(1), 'solved', 'Problem 1 status is solved');
assert.strictEqual(dsa.getProblemStatus(2), 'attempted', 'Problem 2 status is attempted');
assert(dsa.isBookmarked(3), 'Problem 3 is bookmarked');
assert(dsa.isReview(4), 'Problem 4 is marked for review');
assert.strictEqual(dsa.getProblemStatus(5), 'not_started', 'Problem 5 status is not_started');
pass('Distinct, verified indicators confirmed for solved, attempted, bookmarked, and review states');

// -----------------------------------------------------------------------------
// [TEST SECTION 6]: Code Visualizer Accessibility & Integration
// -----------------------------------------------------------------------------
console.log('\n[6] Testing Code Visualizer Accessibility from DSA:');

// Visualizer banner update
dsa.loadAndVisualizeProblem(1);
assert.strictEqual(dsa.activeVisualizerProblemId, 1, 'activeVisualizerProblemId set to 1');
assert(dsa.dsaActiveBanner.innerHTML.includes('Practicing DSA'), 'Active banner displays DSA Practicing header');
assert(dsa.dsaActiveBanner.innerHTML.includes('Learning Workspace'), 'Active banner provides return button to Workspace');
assert(dsa.dsaActiveBanner.innerHTML.includes('Back to DSA Hub'), 'Active banner provides return button to DSA Hub');
pass('Bidirectional accessibility between Code Flow Visualizer and DSA workspace verified');

// -----------------------------------------------------------------------------
// [TEST SECTION 7]: Visualizer Non-Negotiable (Kadane = 6)
// -----------------------------------------------------------------------------
console.log('\n[7] Testing Visualizer Execution & Non-Negotiables:');

const engine = new sandbox.window.PythonExecutionEngine();
const kadaneCode = `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
c = 0
ans = nums[0]
for i in range(len(nums)):
    c += nums[i]
    if c >= ans:
        ans = c
    if c < 0:
        c = 0
print(ans)`;

const rawDefault = engine.trace(kadaneCode, "");
assert(rawDefault && rawDefault.ok === true, 'Execution must succeed with ok: true');
assert.strictEqual(String(rawDefault.finalResult), '6', 'Kadane finalResult must be 6');
pass('Kadane execution verified: finalResult remains exactly 6 for original input');

console.log('\n===================================================================');
console.log(`SUMMARY: ${testsPassed}/${testsPassed} Phase 9 Tests PASSED (100%)`);
console.log('===================================================================');
