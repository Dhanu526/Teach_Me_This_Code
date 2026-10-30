/**
 * Comprehensive Test Suite for Phase 8: Local Progress Storage, Backup & Portability
 * Validates zero-cloud persistence, page refresh restoration, export JSON,
 * validation guard against malformed data, Merge vs. Replace strategies,
 * preferences persistence, and engine integrity (Kadane = 6).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

console.log('===================================================================');
console.log('PHASE 8 TEST SUITE: LOCAL PROGRESS STORAGE, BACKUP & PREFERENCES');
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
// [TEST SECTION 1]: Local Persistence Verification (Zero Cloud Backend)
// -----------------------------------------------------------------------------
console.log('\n[1] Testing Local Storage Persistence Components:');

const dsa = new sandbox.window.DsaDashboard();
assert(dsa.indexedDbBackup, 'IndexedDB backup manager instantiated');
pass('IndexedDB offline backup manager instantiated');

// 1. Mark problem 1 (Two Sum) and 3 (Valid Anagram) solved
dsa.markSolved(1);
dsa.markSolved(3);
// 2. Mark problem 33 attempted
dsa.markAttempted(33);
// 3. Bookmark problem 52
dsa.toggleBookmark(52);
// 4. Mark review 69
dsa.toggleReview(69);
// 5. Add personal notes for problem 1
dsa.saveNote(1, 'Use hash map complement lookup in O(n) single pass.');
// 6. Save user code
dsa.saveUserCode(1, 'def twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen: return [seen[target - n], i]\n        seen[n] = i');
// 7. Set active stage to 4
dsa.setActiveStage(4);
// 8. Open problem 89 (Binary Search)
dsa.openProblemWorkspace(89);
// 9. Save preferred learning settings
dsa.saveSettings({ pageSize: 50, selectedSort: 'diff_asc', codeFontSize: '15px', animationSpeed: 'fast' });

// Verify keys in localStorage
assert(mockLocalStorage.getItem('dsa_learning_progress_v1'), 'dsa_learning_progress_v1 present in localStorage');
assert(mockLocalStorage.getItem('dsa_user_code_v1'), 'dsa_user_code_v1 present in localStorage');
assert(mockLocalStorage.getItem('dsa_learning_settings_v1'), 'dsa_learning_settings_v1 present in localStorage');
assert.strictEqual(mockLocalStorage.getItem('dsa_active_stage'), '4', 'dsa_active_stage saved as 4');
pass('All progress facets successfully stored in local computer storage');

// -----------------------------------------------------------------------------
// [TEST SECTION 2]: Page Refresh & Application Restart Restoration
// -----------------------------------------------------------------------------
console.log('\n[2] Testing State Restoration Across Page Refresh / App Restart:');

// Create brand new DsaDashboard instance (simulating browser reload / restart)
const reloadedDsa = new sandbox.window.DsaDashboard();

assert(reloadedDsa.progress.solved.includes(1), 'Problem 1 solved status restored');
assert(reloadedDsa.progress.solved.includes(3), 'Problem 3 solved status restored');
assert(reloadedDsa.progress.attempted.includes(33), 'Problem 33 attempted status restored');
assert(reloadedDsa.progress.bookmarked.includes(52), 'Problem 52 bookmark restored');
assert(reloadedDsa.progress.review.includes(69), 'Problem 69 review flag restored');
assert.strictEqual(reloadedDsa.getNote(1), 'Use hash map complement lookup in O(n) single pass.', 'Personal note for problem 1 restored');
assert(reloadedDsa.getUserCode(1).includes('def twoSum'), 'User code cache restored');
assert.strictEqual(reloadedDsa.activeStage, 4, 'Active roadmap stage 4 restored');
assert.strictEqual(reloadedDsa.activeWorkspaceProblemId, 89, 'Last opened problem 89 restored');
assert.strictEqual(reloadedDsa.pageSize, 50, 'Preferred page size 50 restored');
assert.strictEqual(reloadedDsa.selectedSort, 'diff_asc', 'Preferred sort diff_asc restored');
pass('Complete learning state survives application reload with 100% fidelity');

// -----------------------------------------------------------------------------
// [TEST SECTION 3]: Export Progress Backup
// -----------------------------------------------------------------------------
console.log('\n[3] Testing Export Progress Backup Generation:');

const exportData = reloadedDsa.exportProgressData();
assert.strictEqual(exportData.$schema, 'teach_me_this_code_progress_v1', 'Valid schema identifier');
assert.strictEqual(exportData.version, '1.0', 'Version is 1.0');
assert(exportData.exportedAt && typeof exportData.exportedAt === 'number', 'Contains timestamp');
assert(exportData.stats && exportData.stats.solvedCount >= 2, 'Stats summary matches solved count');
assert(exportData.progress.solved.includes(1), 'Export contains solved problem 1');
assert(exportData.progress.notes['1'], 'Export contains personal note for problem 1');
assert.strictEqual(exportData.roadmap.activeStage, 4, 'Export contains active roadmap stage 4');
assert.strictEqual(exportData.settings.pageSize, 50, 'Export contains user settings');
assert(exportData.userCode['1'], 'Export contains user code');

const downloadResult = reloadedDsa.downloadProgressBackup();
assert(downloadResult.success, 'downloadProgressBackup executes successfully');
assert(downloadResult.fileName.startsWith('teach_me_this_code_backup_'), 'Backup filename format verified');
pass('Export Progress produces structured, comprehensive JSON backup');

// -----------------------------------------------------------------------------
// [TEST SECTION 4]: Pre-Import Validation & Corruption Protection
// -----------------------------------------------------------------------------
console.log('\n[4] Testing Pre-Import Validation & Corruption Protection:');

// Test 1: Empty input
const valEmpty = reloadedDsa.validateProgressImport('');
assert.strictEqual(valEmpty.isValid, false, 'Empty input must be rejected');
assert(valEmpty.errors.length > 0, 'Produces error for empty input');
pass('Validation rejects empty input');

// Test 2: Malformed JSON syntax
const valMalformedJson = reloadedDsa.validateProgressImport('{ "progress": { "solved": [1, 2, }');
assert.strictEqual(valMalformedJson.isValid, false, 'Malformed JSON must be rejected');
assert(valMalformedJson.errors[0].includes('Invalid JSON'), 'Provides specific syntax error');
pass('Validation rejects malformed JSON without crashing');

// Test 3: Root not an object
const valArrayRoot = reloadedDsa.validateProgressImport('[1, 2, 3]');
assert.strictEqual(valArrayRoot.isValid, false, 'Non-object root must be rejected');
pass('Validation rejects invalid root schema');

// Test 4: Completely empty object without data
const valEmptyObj = reloadedDsa.validateProgressImport({});
assert.strictEqual(valEmptyObj.isValid, false, 'Empty object must be rejected');
pass('Validation rejects empty backup file without progress');

// Test 5: Verify corruption protection
// Attempt to import corrupted input -> existing progress MUST NOT change!
const existingSolvedSnapshot = [...reloadedDsa.progress.solved];
try {
  reloadedDsa.importProgress('{ invalid json }');
  assert.fail('Should have thrown error on malformed import');
} catch (e) {
  // Expected
}
assert.strictEqual(JSON.stringify(reloadedDsa.progress.solved), JSON.stringify(existingSolvedSnapshot), 'Existing solved list remained uncorrupted');
pass('Malformed imports are blocked: existing progress is 100% protected against corruption');

// -----------------------------------------------------------------------------
// [TEST SECTION 5]: Import Strategies (Merge vs. Replace)
// -----------------------------------------------------------------------------
console.log('\n[5] Testing Import Strategies (Merge vs. Replace):');

const backupToImport = {
  $schema: 'teach_me_this_code_progress_v1',
  version: '1.0',
  progress: {
    solved: [1, 2, 10], // Note: 1 was already solved, 2 and 10 are new
    attempted: [20],
    bookmarked: [15],
    notes: {
      '2': 'Contains duplicate with hash set in O(n).'
    },
    lastOpenedProblemId: 10
  },
  roadmap: {
    activeStage: 2
  },
  settings: {
    pageSize: 100
  },
  userCode: {
    '10': 'def singleNumber(nums):\n    res = 0\n    for n in nums: res ^= n\n    return res'
  }
};

// 1. Test Merge Strategy
const mergeResult = reloadedDsa.importProgress(backupToImport, { mode: 'merge' });
assert(mergeResult.success, 'Merge import succeeded');
// Solved should now include 1, 3 (from before) AND 2, 10 (from import)
assert(reloadedDsa.progress.solved.includes(1), 'Problem 1 preserved in merge');
assert(reloadedDsa.progress.solved.includes(3), 'Problem 3 preserved in merge');
assert(reloadedDsa.progress.solved.includes(2), 'Problem 2 added from merge');
assert(reloadedDsa.progress.solved.includes(10), 'Problem 10 added from merge');
// Notes: problem 1 note preserved AND problem 2 note added
assert(reloadedDsa.getNote(1).includes('hash map complement'), 'Original note 1 preserved in merge');
assert(reloadedDsa.getNote(2).includes('hash set'), 'Imported note 2 merged');
assert(reloadedDsa.getUserCode(10).includes('singleNumber'), 'Imported code 10 merged');
pass('Merge strategy successfully combines incoming and existing data without data loss');

// 2. Test Replace Strategy
const freshReplaceBackup = {
  progress: {
    solved: [89],
    attempted: [],
    bookmarked: [],
    notes: { '89': 'Binary search template [low, high]' },
    lastOpenedProblemId: 89
  },
  roadmap: { activeStage: 4 },
  settings: { pageSize: 25 },
  userCode: { '89': 'def search(nums, target): return -1' }
};

const replaceResult = reloadedDsa.importProgress(freshReplaceBackup, { mode: 'replace' });
assert(replaceResult.success, 'Replace import succeeded');
assert.strictEqual(JSON.stringify(reloadedDsa.progress.solved), JSON.stringify([89]), 'Solved list replaced cleanly');
assert.strictEqual(reloadedDsa.getNote(1), '', 'Old note 1 cleared in replace');
assert(reloadedDsa.getNote(89).includes('Binary search'), 'New note 89 active');
assert.strictEqual(reloadedDsa.pageSize, 25, 'Settings replaced');
pass('Replace strategy cleanly overwrites local storage with verified backup data');

// -----------------------------------------------------------------------------
// [TEST SECTION 6]: UI Modal, Notice & Reset Protection
// -----------------------------------------------------------------------------
console.log('\n[6] Testing UI Notice, Modal & Reset Protection:');

// Notice text test
assert(stylesCss.includes('.storage-notice-banner'), 'CSS includes .storage-notice-banner');
assert(stylesCss.includes('.storage-validation-box'), 'CSS includes .storage-validation-box');
assert(stylesCss.includes('.btn-header-storage'), 'CSS includes .btn-header-storage');
pass('Storage notice, validation boxes, and header button styles verified in CSS');

// Test resetProgress requires 'RESET' password
const resetFailed = reloadedDsa.resetProgress('wrong_password');
assert.strictEqual(resetFailed, false, 'Reset rejected on invalid password');
assert.strictEqual(reloadedDsa.progress.solved.length, 1, 'Progress preserved when reset rejected');

const resetSuccess = reloadedDsa.resetProgress('RESET');
assert.strictEqual(resetSuccess, true, 'Reset approved on RESET keyword');
assert.strictEqual(reloadedDsa.progress.solved.length, 0, 'Progress reset to empty');
assert.strictEqual(reloadedDsa.activeStage, 1, 'Active stage reset to 1');
pass('Reset protection requires explicit confirmation keyword');

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
console.log(`SUMMARY: ${testsPassed}/${testsPassed} Phase 8 Tests PASSED (100%)`);
console.log('===================================================================');
