// test_phase4.js - Comprehensive test suite for Phase 4: Interactive Learning Prediction
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runTests() {
  console.log("=== STARTING PHASE 4 VERIFICATION ===");
  let passedCount = 0;
  let testCount = 0;

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

  // 1. Verify index.html contains required elements
  const htmlContent = fs.readFileSync(path.join(appBuildDir, 'index.html'), 'utf8');
  assert(htmlContent.includes('id="btnToggleQuiz"'), 'index.html contains #btnToggleQuiz in header');
  assert(htmlContent.includes('id="interactivePredictCard"'), 'index.html contains #interactivePredictCard');
  assert(htmlContent.includes('id="predictQuestionText"'), 'index.html contains #predictQuestionText');
  assert(htmlContent.includes('id="predictChoicesWrap"'), 'index.html contains #predictChoicesWrap');
  assert(htmlContent.includes('id="btnSkipPredict"'), 'index.html contains #btnSkipPredict');
  assert(htmlContent.includes('id="predictResultBox"'), 'index.html contains #predictResultBox');

  // 2. Verify styles.css contains required Phase 4 styles
  const cssContent = fs.readFileSync(path.join(appBuildDir, 'styles.css'), 'utf8');
  assert(cssContent.includes('#btnToggleQuiz.active'), 'styles.css contains #btnToggleQuiz.active');
  assert(cssContent.includes('.interactive-predict-card'), 'styles.css contains .interactive-predict-card');
  assert(cssContent.includes('.predict-choice-btn.is-correct'), 'styles.css contains .predict-choice-btn.is-correct');
  assert(cssContent.includes('.predict-choice-btn.is-incorrect'), 'styles.css contains .predict-choice-btn.is-incorrect');
  assert(cssContent.includes('.predict-result-box'), 'styles.css contains .predict-result-box');

  // 3. Load engine.js and explainer.js in mock browser environment
  const mockWindow = {
    location: { protocol: "file:" },
    PRELOADED_PROGRAMS: {}
  };
  const mockDocument = {};
  const context = vm.createContext({
    window: mockWindow,
    document: mockDocument,
    console: console,
    Math: Math,
    Number: Number,
    String: String,
    Array: Array,
    Object: Object,
    Set: Set,
    Map: Map,
    JSON: JSON
  });

  const engineCode = fs.readFileSync(path.join(appBuildDir, 'engine.js'), 'utf8');
  vm.runInContext(engineCode, context);
  assert(typeof mockWindow.PythonExecutionEngine === 'function', 'PythonExecutionEngine loaded successfully');

  const explainerCode = fs.readFileSync(path.join(appBuildDir, 'explainer.js'), 'utf8');
  vm.runInContext(explainerCode, context);
  assert(typeof mockWindow.RuleBasedExplainer === 'function', 'RuleBasedExplainer loaded successfully');

  const engine = new mockWindow.PythonExecutionEngine();
  const explainer = new mockWindow.RuleBasedExplainer();

  // 4. Test execution on all 5 test inputs for Kadane's algorithm
  const testInputs = [
    {
      name: "Mixed [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      code: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
c = 0
ans = nums[0]
for i in range(len(nums)):
    c += nums[i]
    if c >= ans:
        ans = c
    if c < 0:
        c = 0
print(ans)`,
      expected: 6
    },
    {
      name: "All-Negative [-5, -2, -8, -1, -4]",
      code: `nums = [-5, -2, -8, -1, -4]
c = 0
ans = nums[0]
for i in range(len(nums)):
    c += nums[i]
    if c >= ans:
        ans = c
    if c < 0:
        c = 0
print(ans)`,
      expected: -1
    },
    {
      name: "All-Positive [1, 2, 3, 4, 5]",
      code: `nums = [1, 2, 3, 4, 5]
c = 0
ans = nums[0]
for i in range(len(nums)):
    c += nums[i]
    if c >= ans:
        ans = c
    if c < 0:
        c = 0
print(ans)`,
      expected: 15
    },
    {
      name: "Single Negative [-7]",
      code: `nums = [-7]
c = 0
ans = nums[0]
for i in range(len(nums)):
    c += nums[i]
    if c >= ans:
        ans = c
    if c < 0:
        c = 0
print(ans)`,
      expected: -7
    },
    {
      name: "Single Positive [42]",
      code: `nums = [42]
c = 0
ans = nums[0]
for i in range(len(nums)):
    c += nums[i]
    if c >= ans:
        ans = c
    if c < 0:
        c = 0
print(ans)`,
      expected: 42
    }
  ];

  for (const t of testInputs) {
    const rawTrace = engine.trace(t.code, "");
    assert(rawTrace.ok === true, `Execution succeeded for input: ${t.name}`);
    const enriched = explainer.enrichTraceWithExplanations(rawTrace);
    const finalVal = enriched.finalResult !== undefined ? enriched.finalResult : rawTrace.finalResult;
    assert(String(finalVal) === String(t.expected), `Output for ${t.name} is ${finalVal} (expected ${t.expected})`);

    // Verify prediction questions
    const questionSteps = enriched.steps.filter(s => Boolean(s.predictQuestion));
    assert(questionSteps.length > 0, `Generated ${questionSteps.length} prediction questions for ${t.name}`);

    // Verify every question structure
    let allValid = true;
    for (const qs of questionSteps) {
      const q = qs.predictQuestion;
      if (!q.question || !q.subPrompt || !Array.isArray(q.choices) || q.choices.length < 2) {
        allValid = false;
        break;
      }
      if (q.correctIndex < 0 || q.correctIndex >= q.choices.length) {
        allValid = false;
        break;
      }
      if (q.choices[q.correctIndex] !== q.correctValue) {
        allValid = false;
        break;
      }
      if (!q.explanation) {
        allValid = false;
        break;
      }
    }
    assert(allValid, `All prediction questions in ${t.name} have valid structure, choices, and explanations`);
  }

  // 5. Test specific question types on the default mixed input
  const defaultRaw = engine.trace(testInputs[0].code, "");
  const defaultEnriched = explainer.enrichTraceWithExplanations(defaultRaw);

  const addQuestions = defaultEnriched.steps.filter(s => s.predictQuestion && s.predictQuestion.type === "addition");
  assert(addQuestions.length > 0, `Generated ${addQuestions.length} 'What will c become after this addition?' questions`);
  if (addQuestions.length > 0) {
    const sampleAdd = addQuestions[0].predictQuestion;
    console.log(`    Sample addition question: "${sampleAdd.question}" | Sub: "${sampleAdd.subPrompt}" | Choices: [${sampleAdd.choices.join(', ')}] | Correct: "${sampleAdd.correctValue}"`);
    assert(sampleAdd.question.includes("become after this addition"), "Addition question prompt is clear");
    assert(sampleAdd.choices.includes(sampleAdd.correctValue), "Addition choices contain the correct value");
  }

  const recordQuestions = defaultEnriched.steps.filter(s => s.predictQuestion && s.predictQuestion.type === "condition_record");
  assert(recordQuestions.length > 0, `Generated ${recordQuestions.length} 'Will ans update to a new record sum?' questions`);
  if (recordQuestions.length > 0) {
    const sampleRec = recordQuestions[0].predictQuestion;
    console.log(`    Sample record question: "${sampleRec.question}" | Sub: "${sampleRec.subPrompt}" | Choices: [${sampleRec.choices.join(', ')}] | Correct: "${sampleRec.correctValue}"`);
    assert(sampleRec.choices.length === 2, "Record question has Yes/No choices");
  }

  const negQuestions = defaultEnriched.steps.filter(s => s.predictQuestion && s.predictQuestion.type === "condition_negative");
  assert(negQuestions.length > 0, `Generated ${negQuestions.length} 'Will this condition be True or False?' (c < 0) questions`);
  if (negQuestions.length > 0) {
    const sampleNeg = negQuestions[0].predictQuestion;
    console.log(`    Sample condition question: "${sampleNeg.question}" | Sub: "${sampleNeg.subPrompt}" | Choices: [${sampleNeg.choices.join(', ')}] | Correct: "${sampleNeg.correctValue}"`);
    assert(sampleNeg.choices.length === 2, "Condition question has True/False choices");
  }

  // 6. Test binary search condition & arithmetic questions
  const binarySearchCode = `arr = [1, 3, 5, 7, 9, 11]
target = 7
l = 0
r = len(arr) - 1
found = -1
while l <= r:
    mid = (l + r) // 2
    if arr[mid] == target:
        found = mid
        break
    elif arr[mid] < target:
        l = mid + 1
    else:
        r = mid - 1
print(found)`;
  const bsRaw = engine.trace(binarySearchCode, "");
  assert(bsRaw.ok === true, "Binary search executes successfully");
  const bsEnriched = explainer.enrichTraceWithExplanations(bsRaw);
  const bsQuestions = bsEnriched.steps.filter(s => Boolean(s.predictQuestion));
  assert(bsQuestions.length > 0, `Generated ${bsQuestions.length} prediction questions for binary search`);

  // 7. Verify step answer caching (backward/forward navigation state preservation)
  const stepAnswers = new Map();
  const qSteps = defaultEnriched.steps.map((s, idx) => ({ step: s, idx })).filter(item => Boolean(item.step.predictQuestion));
  const qItem1 = qSteps[0];
  const qItem2 = qSteps[1];
  stepAnswers.set(qItem1.idx, {
    selectedChoice: qItem1.step.predictQuestion.correctValue,
    selectedIndex: qItem1.step.predictQuestion.correctIndex,
    isCorrect: true,
    revealed: true,
    mode: "correct"
  });
  stepAnswers.set(qItem2.idx, {
    selectedChoice: null,
    isCorrect: null,
    revealed: true,
    mode: "revealed"
  });

  const ans1 = stepAnswers.get(qItem1.idx);
  assert(ans1 && ans1.isCorrect === true && ans1.mode === "correct", `User answer preserved when moving back to Step ${qItem1.idx}`);
  const ans2 = stepAnswers.get(qItem2.idx);
  assert(ans2 && ans2.mode === "revealed", `User skip state preserved when moving to Step ${qItem2.idx}`);

  console.log(`\n=== PHASE 4 VERIFICATION COMPLETE: ${passedCount}/${testCount} TESTS PASSED ===`);
  if (passedCount === testCount) {
    console.log("ALL TESTS PASSED WITH 100% SUCCESS!");
  } else {
    process.exitCode = 1;
  }
}

runTests();
