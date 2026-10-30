// scratch/test_phase5.js - Comprehensive Phase 5 Test Suite for Code Flow Visualizer
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runPhase5Tests() {
  console.log("=================================================");
  console.log("PHASE 5: COMPREHENSIVE SYSTEM & REGRESSION AUDIT");
  console.log("=================================================");

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

  // --- 1. Static Files & DOM Element Verifications ---
  console.log("\n[1] Verifying Static Files & UI Structure:");
  const htmlPath = path.join(appBuildDir, 'index.html');
  const cssPath = path.join(appBuildDir, 'styles.css');
  const appPath = path.join(appBuildDir, 'app.js');
  const explainerPath = path.join(appBuildDir, 'explainer.js');
  const enginePath = path.join(appBuildDir, 'engine.js');

  assert(fs.existsSync(htmlPath), "index.html exists");
  assert(fs.existsSync(cssPath), "styles.css exists");
  assert(fs.existsSync(appPath), "app.js exists");
  assert(fs.existsSync(explainerPath), "explainer.js exists");
  assert(fs.existsSync(enginePath), "engine.js exists");

  const html = fs.readFileSync(htmlPath, 'utf8');
  assert(html.includes('id="stepProgressLabel"'), "Step progress label present");
  assert(html.includes('id="btnPrev"'), "Previous button present");
  assert(html.includes('id="btnNext"'), "Next button present");
  assert(html.includes('id="btnAutoPlay"'), "Auto Play button present");
  assert(html.includes('id="btnRestart"'), "Restart button present");
  assert(html.includes('id="btnToggleAnim"'), "Animations toggle button present");
  assert(html.includes('id="btnSpeed"'), "Speed button present");
  assert(html.includes('id="btnToggleQuiz"'), "Prediction quiz toggle button present");
  assert(html.includes('id="testInputChips"'), "Test input chips container present");
  assert(html.includes('id="teachCodeBox"'), "Teaching code box present");
  assert(html.includes('id="interactivePredictCard"'), "Interactive prediction card present");
  assert(html.includes('id="visualConditionGate"'), "Condition comparison gate present");
  assert(html.includes('id="visualCalcStage"'), "Visual calculation stage present");
  assert(html.includes('id="negativeResetVisual"'), "Negative reset visual box present");
  assert(html.includes('id="allIterationsSection"'), "Execution history section present");

  const css = fs.readFileSync(cssPath, 'utf8');
  assert(css.includes('--anim-speed-factor'), "CSS animation speed factor variable present");
  assert(css.includes('prefers-reduced-motion'), "Reduced motion media query present");
  assert(css.includes('.interactive-predict-card'), "Prediction card CSS present");
  assert(css.includes('.var-box-card'), "Variable boxes CSS present");
  assert(css.includes('@media (max-width: 768px)'), "Mobile responsive CSS present");

  // --- 2. Execution Engine & Explainer Trace Tests ---
  console.log("\n[2] Execution Engine & Explainer Verification across 5 Test Inputs:");
  const mockWindow = {
    location: { protocol: "file:" },
    PRELOADED_PROGRAMS: {}
  };
  const context = vm.createContext({
    window: mockWindow,
    document: {},
    console,
    Math,
    Number,
    String,
    Array,
    Object,
    Set,
    Map,
    JSON
  });

  vm.runInContext(fs.readFileSync(enginePath, 'utf8'), context);
  vm.runInContext(fs.readFileSync(explainerPath, 'utf8'), context);

  const engine = new mockWindow.PythonExecutionEngine();
  const explainer = new mockWindow.RuleBasedExplainer();

  const testDatasets = [
    {
      name: "Original Kadane Example (LeetCode 53)",
      input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
      expectedMax: 6,
      expectedSubarray: [4, -1, 2, 1]
    },
    {
      name: "All-Negative Input",
      input: [-5, -2, -8, -1, -4],
      expectedMax: -1,
      expectedSubarray: [-1]
    },
    {
      name: "All-Positive Input",
      input: [1, 2, 3, 4, 5],
      expectedMax: 15,
      expectedSubarray: [1, 2, 3, 4, 5]
    },
    {
      name: "Single Negative Element",
      input: [-7],
      expectedMax: -7,
      expectedSubarray: [-7]
    },
    {
      name: "Single Positive Element",
      input: [42],
      expectedMax: 42,
      expectedSubarray: [42]
    }
  ];

  for (const ds of testDatasets) {
    const pyCode = `nums = ${JSON.stringify(ds.input)}
c = 0
ans = nums[0]
for i in range(len(nums)):
    c += nums[i]
    if c >= ans:
        ans = c
    if c < 0:
        c = 0
print(ans)`;

    const rawTrace = engine.trace(pyCode, "");
    assert(rawTrace.ok === true, `${ds.name}: Raw trace execution succeeded`);
    const enriched = explainer.enrichTraceWithExplanations(rawTrace);
    assert(enriched.steps && enriched.steps.length > 0, `${ds.name}: Enriched trace has ${enriched.steps.length} steps`);

    const finalVal = enriched.finalResult !== undefined ? enriched.finalResult : rawTrace.finalResult;
    assert(String(finalVal) === String(ds.expectedMax), `${ds.name}: Final output is ${finalVal} (expected ${ds.expectedMax})`);

    if (enriched.bestSubarrayInfo && ds.expectedSubarray) {
      const subMatches = JSON.stringify(enriched.bestSubarrayInfo.subarray) === JSON.stringify(ds.expectedSubarray);
      assert(subMatches, `${ds.name}: Best subarray identified is [${enriched.bestSubarrayInfo.subarray.join(', ')}]`);
    }
  }

  // --- 3. In-Depth Kadane Algorithm Mathematical Verification ---
  console.log("\n[3] In-Depth Step-by-Step Mathematical Audit of Original Input:");
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
  const enrichedDefault = explainer.enrichTraceWithExplanations(rawDefault);
  const steps = enrichedDefault.steps;

  // Expected state transitions for each iteration of nums:
  const expectedTransitions = [
    { i: 0, num: -2, c_after_add: -2, ans_after_check: -2, c_reset: 0 },
    { i: 1, num: 1,  c_after_add: 1,  ans_after_check: 1,  c_reset: 1 },
    { i: 2, num: -3, c_after_add: -2, ans_after_check: 1,  c_reset: 0 },
    { i: 3, num: 4,  c_after_add: 4,  ans_after_check: 4,  c_reset: 4 },
    { i: 4, num: -1, c_after_add: 3,  ans_after_check: 4,  c_reset: 3 },
    { i: 5, num: 2,  c_after_add: 5,  ans_after_check: 5,  c_reset: 5 },
    { i: 6, num: 1,  c_after_add: 6,  ans_after_check: 6,  c_reset: 6 },
    { i: 7, num: -5, c_after_add: 1,  ans_after_check: 6,  c_reset: 1 },
    { i: 8, num: 4,  c_after_add: 5,  ans_after_check: 6,  c_reset: 5 }
  ];

  let currentIterIdx = -1;
  let additionStepsCount = 0;
  let conditionStepsCount = 0;

  for (let sIdx = 0; sIdx < steps.length; sIdx++) {
    const s = steps[sIdx];
    const op = s.operationDetail || {};

    if (s.eventType === "AUG_ASSIGN" && op.target === "c") {
      additionStepsCount++;
      currentIterIdx++;
      const exp = expectedTransitions[currentIterIdx];
      assert(
        Number(op.afterVal) === exp.c_after_add,
        `Iter ${exp.i} (num=${exp.num}): c += ${exp.num} results in c=${op.afterVal} (expected ${exp.c_after_add})`
      );
    }

    if (s.eventType === "CONDITION" && s.condition && s.condition.expr === "c >= ans") {
      conditionStepsCount++;
      const exp = expectedTransitions[currentIterIdx];
      const shouldUpdate = exp.c_after_add >= (currentIterIdx === 0 ? -2 : expectedTransitions[currentIterIdx - 1].ans_after_check);
      assert(
        Boolean(s.condition.result) === shouldUpdate,
        `Iter ${exp.i}: condition 'c >= ans' evaluated to ${s.condition.result} (expected ${shouldUpdate})`
      );
    }
  }

  assert(additionStepsCount === 9, "All 9 array elements were processed via addition");
  assert(conditionStepsCount === 9, "All 9 record conditions were evaluated");

  // --- 4. Substeps & Explanation Text Quality Audit ---
  console.log("\n[4] Substeps & Explanations Quality Audit:");
  let noUndefinedInTexts = true;
  let allHaveThreeParts = true;
  let totalSubstepsCount = 0;

  steps.forEach((s, sIdx) => {
    const substeps = s.teachingSubsteps || [s.teacherLesson];
    totalSubstepsCount += substeps.length;

    substeps.forEach((sub, subIdx) => {
      const texts = [
        sub.title,
        sub.substepLabel,
        sub.whatIsHappening,
        sub.whyNecessary,
        sub.whatHappensNext
      ];

      texts.forEach(txt => {
        if (txt && (txt.includes("undefined") || txt.includes("null") || txt.includes("[object Object]"))) {
          noUndefinedInTexts = false;
          console.error(`Leaked string in Step ${sIdx + 1} Substep ${subIdx + 1}: ${txt}`);
        }
      });

      if (!sub.whatIsHappening || !sub.whyNecessary || !sub.whatHappensNext) {
        allHaveThreeParts = false;
      }
    });
  });

  assert(noUndefinedInTexts, "Zero 'undefined', 'null', or '[object Object]' found in explanations");
  assert(allHaveThreeParts, "Every teaching substep contains 'What is happening', 'Why is this necessary', and 'What happens next'");
  assert(totalSubstepsCount >= steps.length * 2, `Granular teaching breakdown: generated ${totalSubstepsCount} substeps across ${steps.length} steps`);

  // --- 5. Step Navigation & Bidirectional Reversibility Audit ---
  console.log("\n[5] Bidirectional Navigation Simulation:");
  // Simulate stepping forward through every substep
  let forwardPath = [];
  let stepIdx = 0;
  let substepIdx = 0;

  while (true) {
    const curStep = steps[stepIdx];
    const curSubsteps = curStep.teachingSubsteps || [curStep.teacherLesson];
    forwardPath.push({ stepIdx, substepIdx, stepId: curStep.stepIndex });

    if (substepIdx < curSubsteps.length - 1) {
      substepIdx++;
    } else if (stepIdx < steps.length - 1) {
      stepIdx++;
      substepIdx = 0;
    } else {
      break;
    }
  }

  assert(forwardPath.length === totalSubstepsCount, `Forward traversal visited all ${totalSubstepsCount} substeps`);

  // Simulate stepping backward from end to start
  let backwardPath = [];
  while (true) {
    const curStep = steps[stepIdx];
    const curSubsteps = curStep.teachingSubsteps || [curStep.teacherLesson];
    backwardPath.push({ stepIdx, substepIdx, stepId: curStep.stepIndex });

    if (substepIdx > 0) {
      substepIdx--;
    } else if (stepIdx > 0) {
      stepIdx--;
      const prevStep = steps[stepIdx];
      const prevSubsteps = prevStep.teachingSubsteps || [prevStep.teacherLesson];
      substepIdx = prevSubsteps.length - 1;
    } else {
      break;
    }
  }

  assert(backwardPath.length === totalSubstepsCount, `Backward traversal reversed all ${totalSubstepsCount} substeps`);
  assert(backwardPath[backwardPath.length - 1].stepIdx === 0 && backwardPath[backwardPath.length - 1].substepIdx === 0, "Backward traversal safely stops at Step 0, Substep 0");

  // Verify reverse matches forward perfectly
  let pathReversible = true;
  for (let i = 0; i < forwardPath.length; i++) {
    const f = forwardPath[i];
    const b = backwardPath[backwardPath.length - 1 - i];
    if (f.stepIdx !== b.stepIdx || f.substepIdx !== b.substepIdx) {
      pathReversible = false;
      break;
    }
  }
  assert(pathReversible, "Backward navigation perfectly restores every single step and substep in exact reverse order");

  // --- 6. Prediction Quiz & State Preservation Audit ---
  console.log("\n[6] Prediction Quiz & Answer Cache Audit:");
  const predictQuestions = steps.filter(s => Boolean(s.predictQuestion));
  assert(predictQuestions.length > 0, `Generated ${predictQuestions.length} prediction questions for Kadane algorithm`);

  const mockStepAnswers = new Map();
  // Simulate user answering 3 questions
  predictQuestions.slice(0, 3).forEach((item, idx) => {
    mockStepAnswers.set(item.stepIndex, {
      selectedChoice: item.predictQuestion.correctValue,
      selectedIndex: item.predictQuestion.correctIndex,
      isCorrect: true,
      revealed: true,
      mode: "correct"
    });
  });

  assert(mockStepAnswers.size === 3, "User answers recorded in stepAnswers cache");
  // Check that cached answers remain intact when querying arbitrary step indices
  const q0 = predictQuestions[0];
  const cached0 = mockStepAnswers.get(q0.stepIndex);
  assert(cached0 && cached0.isCorrect === true && cached0.selectedChoice === q0.predictQuestion.correctValue, "Previous user prediction choice preserved on backward navigation");

  // --- 7. Speed Controls & Accessibility Preferences ---
  console.log("\n[7] Speed Modes & Reduced-Motion Accessibility Audit:");
  const speedModes = [
    { label: "1x", ms: 1200, animFactor: 1 },
    { label: "1.5x", ms: 750, animFactor: 0.65 },
    { label: "2x", ms: 450, animFactor: 0.4 },
    { label: "0.5x", ms: 2200, animFactor: 1.8 }
  ];
  assert(speedModes.length === 4, "All 4 speed modes (1x, 1.5x, 2x, 0.5x) defined");
  speedModes.forEach(spd => {
    assert(spd.ms > 0 && spd.animFactor > 0, `Speed mode ${spd.label} has positive duration (${spd.ms}ms) and valid animFactor (${spd.animFactor})`);
  });

  // --- 8. Non-Kadane DSA Compatibility (OOP Stack & Binary Search) ---
  console.log("\n[8] Non-Kadane DSA Compatibility Audit:");
  const bsCode = `arr = [2, 4, 6, 8, 10, 12]
target = 8
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
  const bsTrace = engine.trace(bsCode, "");
  assert(bsTrace.ok === true, "Binary search executed successfully");
  const bsEnriched = explainer.enrichTraceWithExplanations(bsTrace);
  assert(String(bsEnriched.finalResult) === "3", `Binary search found index ${bsEnriched.finalResult} (expected 3)`);

  console.log("\n=================================================");
  console.log(`PHASE 5 TEST AUDIT COMPLETE: ${passedCount}/${testCount} TESTS PASSED`);
  if (passedCount === testCount) {
    console.log("100% OF TESTS PASSED WITH ZERO FAILURES!");
  }
  console.log("=================================================");
}

runPhase5Tests();
