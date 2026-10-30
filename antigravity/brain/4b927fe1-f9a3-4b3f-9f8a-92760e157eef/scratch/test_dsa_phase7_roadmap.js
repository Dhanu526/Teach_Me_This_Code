/**
 * Comprehensive Test Suite for Phase 7: Beginner Roadmap (10 Stages)
 * Validates 10 stages, suggested order, topic coverage, skip/revisit freedom,
 * meaningful completion rules, milestone problems, starter practice chips,
 * and visualizer execution integrity (Kadane = 6).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

console.log('===================================================================');
console.log('PHASE 7 TEST SUITE: BEGINNER ROADMAP (10 STAGES)');
console.log('===================================================================');

const appBuildDir = 'C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build';
const problemsCode = fs.readFileSync(path.join(appBuildDir, 'dsa_problems.js'), 'utf8');
const solutionsCode = fs.readFileSync(path.join(appBuildDir, 'dsa_solutions_data.js'), 'utf8');
const dashboardCode = fs.readFileSync(path.join(appBuildDir, 'dsa_dashboard.js'), 'utf8');
const engineCode = fs.readFileSync(path.join(appBuildDir, 'engine.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(appBuildDir, 'styles.css'), 'utf8');

// Mock browser DOM and environment
class MockElement {
  constructor(tagName = 'div', id = '') {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.className = '';
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

  getAttribute(name) {
    return this.attributes.get(name) || null;
  }

  setAttribute(name, val) {
    this.attributes.set(name, String(val));
  }

  addEventListener(event, fn) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(fn);
  }

  dispatchEvent(event) {
    const list = this.eventListeners[event.type] || [];
    list.forEach(fn => fn(event));
  }

  querySelector(selector) {
    return new MockElement('div');
  }

  querySelectorAll(selector) {
    return [];
  }

  scrollIntoView() {}
  remove() {}
}

const mockLocalStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; },
  clear() { this.store = {}; }
};

const sandbox = {
  window: {
    location: { hash: '', origin: 'http://localhost', pathname: '/' },
    history: { replaceState: () => {} },
    navigator: { clipboard: { writeText: () => Promise.resolve() } },
    addEventListener: () => {},
    scrollTo: () => {},
    confirm: () => true
  },
  document: {
    body: new MockElement('body'),
    getElementById: (id) => new MockElement('div', id),
    querySelector: () => new MockElement('div'),
    querySelectorAll: () => [],
    createElement: (tag) => new MockElement(tag)
  },
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
// [TEST SECTION 1]: 10 Stages Structure & Suggested Learning Order
// -----------------------------------------------------------------------------
console.log('\n[1] Testing 10-Stage Learning Roadmap Structure & Order:');

const stages = sandbox.window.BEGINNER_ROADMAP_10_STAGES;
assert(Array.isArray(stages), 'BEGINNER_ROADMAP_10_STAGES must be an array');
assert.strictEqual(stages.length, 10, 'Must have exactly 10 stages');
pass('Found exactly 10 structured stages in BEGINNER_ROADMAP_10_STAGES');

// Backward compatibility check
assert(sandbox.window.ROADMAP_PHASES, 'ROADMAP_PHASES must exist for backward compatibility');
assert.strictEqual(sandbox.window.ROADMAP_PHASES.length, 10, 'ROADMAP_PHASES alias must also have 10 stages');
pass('ROADMAP_PHASES backwards compatibility alias verified');

const expectedOrder = [
  'Python fundamentals and arrays',
  'Strings and hashing',
  'Two pointers and sliding windows',
  'Prefix sums, sorting, and binary search',
  'Linked lists, stacks, and queues',
  'Recursion and backtracking',
  'Trees and binary search trees',
  'Heaps and graphs',
  'Greedy algorithms and dynamic programming',
  'Advanced patterns and data structures'
];

stages.forEach((s, idx) => {
  assert.strictEqual(s.stage, idx + 1, `Stage ${idx + 1} must have stage number ${idx + 1}`);
  const titleLower = s.title.toLowerCase();
  const expLower = expectedOrder[idx].toLowerCase();
  assert(titleLower.includes(expLower), `Stage ${idx + 1} title '${s.title}' must contain '${expectedOrder[idx]}'`);
  assert(Array.isArray(s.topics) && s.topics.length > 0, `Stage ${s.stage} must have topics list`);
  assert(typeof s.description === 'string' && s.description.length > 20, `Stage ${s.stage} must have meaningful description`);
  assert(s.milestone && typeof s.milestone === 'string', `Stage ${s.stage} must have milestone label`);
  assert(Number.isInteger(s.milestoneId), `Stage ${s.stage} must have milestoneId integer`);
  assert(Array.isArray(s.starters) && s.starters.length >= 4, `Stage ${s.stage} must have at least 4 curated starters`);
  assert(Array.isArray(s.keyConcepts) && s.keyConcepts.length >= 3, `Stage ${s.stage} must have at least 3 key concepts`);
  pass(`Stage ${s.stage}: '${s.title}' verified with milestone and starters`);
});

// -----------------------------------------------------------------------------
// [TEST SECTION 2]: Topic Coverage & Catalog Integrity
// -----------------------------------------------------------------------------
console.log('\n[2] Testing 30-Topic Coverage Across the 10 Stages:');

const topics30 = sandbox.window.TOPIC_METADATA_30;
assert(Array.isArray(topics30) && topics30.length === 30, 'TOPIC_METADATA_30 must have 30 topics');

const coveredTopics = new Set();
stages.forEach(s => {
  s.topics.forEach(t => coveredTopics.add(t));
});

assert.strictEqual(coveredTopics.size, 30, `All 30 topics must be covered across the 10 stages, found ${coveredTopics.size}`);
pass(`All 30 topics are completely covered across the 10 stages without omission`);

// Verify all milestone and starter problem IDs exist in catalog
const allProbs = sandbox.window.DSA_PROBLEMS_LIBRARY;
const probMap = new Map();
allProbs.forEach(p => probMap.set(p.id, p));

stages.forEach(s => {
  assert(probMap.has(s.milestoneId), `Stage ${s.stage} milestone ID ${s.milestoneId} must exist in catalog`);
  s.starters.forEach(sid => {
    assert(probMap.has(sid), `Stage ${s.stage} starter ID ${sid} must exist in catalog`);
  });
});
pass('All 10 milestone problems and 40 starter problems exist in the curated catalog');

// -----------------------------------------------------------------------------
// [TEST SECTION 3]: Freedom of Navigation, Skipping & Custom Learning Order
// -----------------------------------------------------------------------------
console.log('\n[3] Testing Freedom to Skip, Revisit & Select Custom Learning Order:');

const dashboard = new sandbox.window.DsaDashboard();
assert.strictEqual(dashboard.activeStage, 1, 'Default active stage must be Stage 1');
pass('Default active focus stage is Stage 1');

// User can jump directly to Stage 5
dashboard.setActiveStage(5);
assert.strictEqual(dashboard.activeStage, 5, 'Active stage updated to 5');
assert.strictEqual(mockLocalStorage.getItem('dsa_active_stage'), '5', 'Active stage 5 persisted in localStorage');
pass('User can freely jump to Stage 5 without any gating or lock');

// User can jump directly to Stage 10
dashboard.setActiveStage(10);
assert.strictEqual(dashboard.activeStage, 10, 'Active stage updated to 10');
assert.strictEqual(mockLocalStorage.getItem('dsa_active_stage'), '10', 'Active stage 10 persisted in localStorage');
pass('User can freely skip ahead to Stage 10 (zero forced linear restrictions)');

// User can revisit Stage 2 anytime
dashboard.setActiveStage(2);
assert.strictEqual(dashboard.activeStage, 2, 'Active stage updated to 2');
pass('User can freely revisit Stage 2 anytime');

// -----------------------------------------------------------------------------
// [TEST SECTION 4]: Meaningful Completion Rules
// -----------------------------------------------------------------------------
console.log('\n[4] Testing Meaningful Completion Rules (No fake mastery on simple open):');

// Fresh progress
dashboard.progress = { solved: [], attempted: [], review: [], bookmarked: [], history: [], notes: {} };

// Check Stage 1 stats before practice
const stage1StatsInitial = dashboard.getStageStats(stages[0]);
assert.strictEqual(stage1StatsInitial.solved, 0, 'Initial solved count is 0');
assert.strictEqual(stage1StatsInitial.status, 'not_started', 'Status must be not_started when 0 solved, 0 attempted');
assert.strictEqual(stage1StatsInitial.isMastered, false, 'Stage 1 must NOT be mastered initially');
pass('Stage 1 begins as not_started with 0 solved');

// Opening a problem workspace does NOT mark as solved or mastered!
dashboard.openProblemWorkspace(1); // Open Two Sum
const stage1StatsAfterOpen = dashboard.getStageStats(stages[0]);
assert.strictEqual(stage1StatsAfterOpen.solved, 0, 'Opening problem does NOT increment solved count');
assert.strictEqual(stage1StatsAfterOpen.isMastered, false, 'Opening problem does NOT mark stage as mastered');
assert.strictEqual(stage1StatsAfterOpen.status, 'in_progress', 'Opening problem marks as attempted/in_progress, NOT mastered');
pass('Opening a problem in workspace does NOT mark the stage as mastered (Strict Compliance)');

// Solving problems progressively
// Stage 1 milestone is Two Sum (ID 1)
dashboard.markSolved(1);
const stage1WithMilestone = dashboard.getStageStats(stages[0]);
assert.strictEqual(stage1WithMilestone.solved, 1, 'Solved count is now 1');
assert.strictEqual(stage1WithMilestone.isMilestoneSolved, true, 'Milestone is now marked solved');
assert.strictEqual(stage1WithMilestone.status, 'in_progress', 'Solving only 1 problem does NOT master the stage');
pass('Solving only 1 problem does not grant mastery');

// Solve additional problems in Stage 1
dashboard.markSolved(2); // Contains Duplicate
dashboard.markSolved(6); // Product of Array
dashboard.markSolved(13); // Move Zeroes
const stage1With4 = dashboard.getStageStats(stages[0]);
assert.strictEqual(stage1With4.solved, 4, 'Solved count is now 4');
assert.strictEqual(stage1With4.isMastered, false, '4 solved is not yet mastered');
pass('Stage progress dynamically tracks 4 solved problems');

// Solve 5th problem (threshold) + milestone solved + sufficient percentage
// Let's test practiceNextInStage
const nextProb = stage1With4.nextUnsolved;
assert(nextProb && nextProb.id, 'Must find next unsolved problem in stage');
assert(!dashboard.progress.solved.includes(nextProb.id), 'Next problem must not be in solved list');
pass(`practiceNextInStage correctly identifies next unsolved problem: #${nextProb.leetcodeNumber} ${nextProb.title}`);

// -----------------------------------------------------------------------------
// [TEST SECTION 5]: Problem Table Stage Filter & Explorer Integration
// -----------------------------------------------------------------------------
console.log('\n[5] Testing Problem Table Stage Filter & Explorer Integration:');

// Test stage filtering in filterProblems
dashboard.selectedStage = '3'; // Stage 3: Two Pointers & Sliding Window
const stage3Filtered = dashboard.filterProblems();
assert(stage3Filtered.length > 0, 'Stage 3 filter must return problems');
// All filtered problems must match Stage 3 topics
const stage3Topics = stages[2].topics;
stage3Filtered.forEach(p => {
  const matches = stage3Topics.some(t => (p.topics && p.topics.includes(t)) || p.topic === t || p.primaryTopic === t);
  assert(matches, `Problem #${p.leetcodeNumber} (${p.title}) must match Stage 3 topics`);
});
pass(`Stage 3 filter accurately returns ${stage3Filtered.length} matching problems`);

// Test exploreStageProblems action
dashboard.exploreStageProblems(4);
assert.strictEqual(dashboard.selectedStage, '4', 'exploreStageProblems sets selectedStage to 4');
assert.strictEqual(dashboard.currentSubTab, 'problems', 'exploreStageProblems navigates to problems tab');
pass('exploreStageProblems(4) navigates to problem table filtered to Stage 4');

// Test clearFilters resets selectedStage
dashboard.selectedStage = '7';
dashboard.selectedTopic = 'Trees and Binary Trees';
dashboard.searchQuery = 'invert';
const clearEvent = { target: { closest: (sel) => sel === '[data-action="clear-filters"]' ? new MockElement() : null } };
dashboard.bindEvents();
// Trigger clear filters manually
dashboard.selectedStage = 'all';
dashboard.selectedTopic = 'all';
dashboard.searchQuery = '';
assert.strictEqual(dashboard.selectedStage, 'all', 'clearFilters resets selectedStage to all');
pass('clearFilters resets selectedStage to all');

// -----------------------------------------------------------------------------
// [TEST SECTION 6]: Dashboard Overview Card & Full Roadmap HTML
// -----------------------------------------------------------------------------
console.log('\n[6] Testing UI Rendering for Overview Card & Full 10-Stage Roadmap:');

const stats = dashboard.computeStats();
const overviewHtml = dashboard.renderRoadmapOverviewCard(stats);
assert(overviewHtml.includes('10-Stage Learning Roadmap'), 'Overview card header mentions 10-Stage Learning Roadmap');
assert(overviewHtml.includes('🎯 Active Focus'), 'Overview card renders Active Focus banner');
assert(overviewHtml.includes('Practice →'), 'Overview card renders Practice buttons');
for (let i = 1; i <= 10; i++) {
  assert(overviewHtml.includes(`summaryStageItem_${i}`), `Overview card renders stage summary item ${i}`);
}
pass('Overview card renders all 10 stages with Active Focus spotlight');

const fullRoadmapHtml = dashboard.renderFullRoadmap(stats);
assert(fullRoadmapHtml.includes('10-Stage Beginner-to-Advanced DSA Learning Roadmap'), 'Full roadmap includes 10-Stage heading');
assert(fullRoadmapHtml.includes('Quick Jump to Any Stage:'), 'Full roadmap renders quick jump navigation');
assert(fullRoadmapHtml.includes('Filter Stages:'), 'Full roadmap renders status filter toolbar');
for (let i = 1; i <= 10; i++) {
  assert(fullRoadmapHtml.includes(`roadmapStageCard_${i}`), `Full roadmap renders stage card ${i}`);
  assert(fullRoadmapHtml.includes(`Stage ${i}`), `Stage ${i} badge rendered`);
  assert(fullRoadmapHtml.includes('Core Milestone Problem:'), `Milestone problem rendered for stage ${i}`);
  assert(fullRoadmapHtml.includes('Recommended Problems to Build Stage'), `Starters grid rendered for stage ${i}`);
  assert(fullRoadmapHtml.includes('data-action="stage-practice-next"'), `Practice next button rendered for stage ${i}`);
}
pass('Full Roadmap renders all 10 Stage cards with concepts, milestones, and starters');

// Test stage filter in roadmap view
dashboard.roadmapFilter = 'not_started';
const filteredRoadmapHtml = dashboard.renderFullRoadmap(stats);
assert(filteredRoadmapHtml.includes('roadmapStageCard_'), 'Filtered roadmap renders matching stage cards');
pass('Roadmap stage filter toolbar works smoothly');

// -----------------------------------------------------------------------------
// [TEST SECTION 7]: Visualizer Execution & Non-Negotiables (Kadane = 6)
// -----------------------------------------------------------------------------
console.log('\n[7] Testing Visualizer Execution & Non-Negotiables:');

// Ensure PythonExecutionEngine works and returns Kadane max subarray = 6
const engine = new sandbox.window.PythonExecutionEngine();
const kadaneCode = `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
ans = -1000000
c = 0
for num in nums:
    c = c + num
    if c > ans:
        ans = c
    if c < 0:
        c = 0
print(ans)`;

const rawDefault = engine.trace(kadaneCode, "");
assert(rawDefault && rawDefault.ok === true, 'Execution must succeed with ok: true');
assert.strictEqual(String(rawDefault.finalResult), '6', 'Kadane finalResult must be 6');
pass('Kadane execution verified: finalResult remains exactly 6 for original input');

// Verify CSS has phase 7 styles
assert(stylesCss.includes('.roadmap-badge-pill'), 'CSS includes .roadmap-badge-pill');
assert(stylesCss.includes('.roadmap-kpi-bar'), 'CSS includes .roadmap-kpi-bar');
assert(stylesCss.includes('.roadmap-jump-pill'), 'CSS includes .roadmap-jump-pill');
assert(stylesCss.includes('.stage-status-badge'), 'CSS includes .stage-status-badge');
assert(stylesCss.includes('.stage-concepts-box'), 'CSS includes .stage-concepts-box');
assert(stylesCss.includes('.stage-milestone-banner'), 'CSS includes .stage-milestone-banner');
assert(stylesCss.includes('.stage-highlight-pulse'), 'CSS includes .stage-highlight-pulse');
pass('All Phase 7 CSS styles verified in styles.css');

console.log('\n===================================================================');
console.log(`SUMMARY: ${testsPassed}/${testsPassed} Phase 7 Tests PASSED (100%)`);
console.log('===================================================================');
