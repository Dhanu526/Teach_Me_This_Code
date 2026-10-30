// app_build/app.js — Thonny-Style Visual Execution, Memory Model & Universal DSA Iteration Explorer
// Preserves the rule-based engine (engine.js) and teacher (explainer.js) while adding:
// 1. Visual Reference Model (Name -> @Address -> Value Stack & Heap Memory Panel)
// 2. Step-by-Step Sub-Expression Evaluator (F7 micro-stepper + short-circuit indicator)
// 3. Global vs. Local Variable Scope Isolation UI
// 4. Visual Garbage Collection (filtering / dimming unreferenced heap objects)
// 5. Complete Code Iteration & All-Steps Dry-Run Explorer (works for any Loop, OOP, or Recursive code)

class TeachMeCodeApp {
  constructor() {
    this.engine = new window.PythonExecutionEngine();
    this.explainer = new window.RuleBasedExplainer();

    this.currentPresetKey = "max_subarray";
    const defaultProg =
      window.PRELOADED_PROGRAMS[this.currentPresetKey] ||
      window.PRELOADED_PROGRAMS["stack_class"];
    this.sourceCode = defaultProg.code;
    this.inputCode = defaultProg.defaultInput || "";

    this.traceResult = null;
    this.iterationGroups = [];
    this.stepToGroupIdx = new Map();
    this.collapsedGroupIds = new Set();
    this.allGroupsCollapsed = true;
    this.iterationsViewMode = "grouped"; // "grouped" | "table"
    this.showIterationsPanel = false;

    this.currentStepIdx = 0;
    this.currentSubstepIdx = 0;
    this.currentSubStepIdx = 0;
    this.showGCObjects = false;
    this.animationsEnabled = true;

    // Phase 5: Speed Modes & Reduced Motion Accessibility
    this.speedModes = [
      { label: "1x", ms: 1200, animFactor: 1 },
      { label: "1.5x", ms: 750, animFactor: 0.65 },
      { label: "2x", ms: 450, animFactor: 0.4 },
      { label: "0.5x", ms: 2200, animFactor: 1.8 }
    ];
    this.currentSpeedIdx = 0;

    this.isPlaying = false;
    this.playInterval = null;
    this.playSpeedMs = 1200;
    this.isEditing = false;
    this.showAdvanced = false;

    // Phase 4: Interactive Learning Prediction System
    this.predictModeEnabled = false;
    this.stepAnswers = new Map();

    this.initDOM();
    this.initAccessibility();
    this.bindEvents();
    this.codeTextarea.value = this.sourceCode;
    this.analyzeAndRun();
  }

  initAccessibility() {
    // Phase 3 & 5: Auto-detect OS reduced motion preference
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.animationsEnabled = false;
      document.body.classList.add("no-animations");
      document.documentElement.style.setProperty("--anim-speed-factor", "0.001");
      if (this.btnToggleAnim) {
        this.btnToggleAnim.textContent = "🛑 Reduced Motion: ON";
        this.btnToggleAnim.classList.remove("active");
      }
    }
  }

  initDOM() {
    // Simple Navigation Controls
    this.stepProgressLabel = document.getElementById("stepProgressLabel");
    this.activeScopeBadge = document.getElementById("activeScopeBadge");
    this.btnPrev = document.getElementById("btnPrev");
    this.btnSubStep = document.getElementById("btnSubStep");
    this.btnNext = document.getElementById("btnNext");
    this.btnAutoPlay = document.getElementById("btnAutoPlay");
    this.btnRestart = document.getElementById("btnRestart");

    // Top Secondary Controls
    this.btnToggleAnim = document.getElementById("btnToggleAnim");
    this.btnToggleQuiz = document.getElementById("btnToggleQuiz");
    this.btnSpeed = document.getElementById("btnSpeed");
    this.btnEditCode = document.getElementById("btnEditCode");
    this.btnAnalyzeCode = document.getElementById("btnAnalyzeCode");
    this.btnToggleIterations = document.getElementById("btnToggleIterations");
    this.btnToggleAdvanced = document.getElementById("btnToggleAdvanced");
    this.advancedViewPanel = document.getElementById("advancedViewPanel");
    this.testInputChips = document.getElementById("testInputChips");

    // Validation & Overview
    this.validationBanner = document.getElementById("validationBanner");
    this.overviewText = document.getElementById("overviewText");

    // Area 1: Your Code
    this.codeScopeIndicator = document.getElementById("codeScopeIndicator");
    this.codeLinesContainer = document.getElementById("codeLinesContainer");
    this.liveEditorWrap = document.getElementById("liveEditorWrap");
    this.codeTextarea = document.getElementById("codeTextarea");

    // Area 2: Teaching Area, Quick Iteration Bar & Thonny Sub-Expression Stepper
    this.activeIterationBadge = document.getElementById("activeIterationBadge");
    this.iterationPillsBar = document.getElementById("iterationPillsBar");
    this.teachStepTitle = document.getElementById("teachStepTitle");
    this.teachSubstepPill = document.getElementById("teachSubstepPill");
    this.teachScopeBadge = document.getElementById("teachScopeBadge");
    this.teachCodeBox = document.getElementById("teachCodeBox");

    // Phase 4: Interactive Prediction Elements
    this.interactivePredictCard = document.getElementById("interactivePredictCard");
    this.predictSubPrompt = document.getElementById("predictSubPrompt");
    this.predictQuestionText = document.getElementById("predictQuestionText");
    this.predictChoicesWrap = document.getElementById("predictChoicesWrap");
    this.btnSkipPredict = document.getElementById("btnSkipPredict");
    this.predictResultBox = document.getElementById("predictResultBox");
    this.predictResultHeader = document.getElementById("predictResultHeader");
    this.predictResultBody = document.getElementById("predictResultBody");

    this.loopReturnBanner = document.getElementById("loopReturnBanner");
    this.visualLoopStrip = document.getElementById("visualLoopStrip");
    this.visualConditionGate = document.getElementById("visualConditionGate");
    this.visualCalcStage = document.getElementById("visualCalcStage");
    this.negativeResetVisual = document.getElementById("negativeResetVisual");
    this.thonnyExprBox = document.getElementById("thonnyExprBox");
    this.thonnySubStepCounter = document.getElementById("thonnySubStepCounter");
    this.thonnyLiveCode = document.getElementById("thonnyLiveCode");
    this.thonnyFocusNote = document.getElementById("thonnyFocusNote");
    this.thonnyTrailChips = document.getElementById("thonnyTrailChips");

    this.teachCalculationBox = document.getElementById("teachCalculationBox");
    this.calcCurrentNumRow = document.getElementById("calcCurrentNumRow");
    this.calcCurrentNumVal = document.getElementById("calcCurrentNumVal");
    this.calcBeforeVal = document.getElementById("calcBeforeVal");
    this.calcFormulaVal = document.getElementById("calcFormulaVal");
    this.calcAfterVal = document.getElementById("calcAfterVal");
    this.teachMeaningText = document.getElementById("teachMeaningText");
    this.teachSymbolsBox = document.getElementById("teachSymbolsBox");
    this.teachWhySection = document.getElementById("teachWhySection");
    this.teachWhyText = document.getElementById("teachWhyText");
    this.teachVarsNowBox = document.getElementById("teachVarsNowBox");
    this.teachNextText = document.getElementById("teachNextText");
    this.finalAnswerBanner = document.getElementById("finalAnswerBanner");
    this.finalAnswerHeading = document.getElementById("finalAnswerHeading");
    this.finalAnswerDetail = document.getElementById("finalAnswerDetail");

    // Area 3: Scope Isolation & Stack/Heap Memory Visualizer
    this.scopeFramesContainer = document.getElementById("scopeFramesContainer");
    this.heapObjectsContainer = document.getElementById("heapObjectsContainer");
    this.btnToggleGC = document.getElementById("btnToggleGC");
    this.visualListsContainer = document.getElementById("visualListsContainer");
    this.stdoutSection = document.getElementById("stdoutSection");
    this.stdoutBox = document.getElementById("stdoutBox");

    // Area 4: Complete Code Iteration & All-Steps Dry-Run Explorer
    this.allIterationsSection = document.getElementById("allIterationsSection");
    this.iterationsSummaryBadge = document.getElementById("iterationsSummaryBadge");
    this.tabViewGrouped = document.getElementById("tabViewGrouped");
    this.tabViewTable = document.getElementById("tabViewTable");
    this.btnExpandAllIter = document.getElementById("btnExpandAllIter");
    this.iterationsGroupedContainer = document.getElementById("iterationsGroupedContainer");
    this.iterationsTableContainer = document.getElementById("iterationsTableContainer");
    this.dryrunTableBody = document.getElementById("dryrunTableBody");

    // Optional Advanced View
    this.advMetadataLabel = document.getElementById("advMetadataLabel");
    this.advTechnicalText = document.getElementById("advTechnicalText");
    this.advSymbolsText = document.getElementById("advSymbolsText");
    this.advFullVarsText = document.getElementById("advFullVarsText");
    this.flowchartSvgWrap = document.getElementById("flowchartSvgWrap");
  }

  bindEvents() {
    this.btnPrev.addEventListener("click", () => {
      this.stopAutoPlay();
      this.goToPrevSubstep();
    });

    this.btnSubStep.addEventListener("click", () => {
      this.stopAutoPlay();
      this.goToNextSubstep();
    });

    this.btnNext.addEventListener("click", () => {
      this.stopAutoPlay();
      this.goToNextSubstep();
    });

    this.btnAutoPlay.addEventListener("click", () => {
      if (this.isPlaying) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    });

    this.btnRestart.addEventListener("click", () => {
      this.stopAutoPlay();
      this.goToStep(0, 0);
    });

    if (this.btnToggleAnim) {
      this.btnToggleAnim.addEventListener("click", () => {
        this.animationsEnabled = !this.animationsEnabled;
        this.btnToggleAnim.textContent = this.animationsEnabled ? "✨ Animations: ON" : "🛑 Reduced Motion (OFF)";
        this.btnToggleAnim.classList.toggle("active", this.animationsEnabled);
        document.body.classList.toggle("no-animations", !this.animationsEnabled);
        const spd = this.speedModes[this.currentSpeedIdx];
        document.documentElement.style.setProperty(
          "--anim-speed-factor",
          this.animationsEnabled ? String(spd.animFactor) : "0.001"
        );
      });
    }

    // Phase 4: Toggle Predict Mode (🎯 Predict: OFF / ON)
    if (this.btnToggleQuiz) {
      this.btnToggleQuiz.addEventListener("click", () => {
        this.predictModeEnabled = !this.predictModeEnabled;
        this.btnToggleQuiz.textContent = this.predictModeEnabled ? "🎯 Predict: ON" : "🎯 Predict: OFF";
        this.btnToggleQuiz.classList.toggle("active", this.predictModeEnabled);
        this.renderStep();
      });
    }

    // Phase 4: Reveal Answer without guessing
    if (this.btnSkipPredict) {
      this.btnSkipPredict.addEventListener("click", () => {
        const steps = this.traceResult && this.traceResult.steps ? this.traceResult.steps : [];
        const step = steps[this.currentStepIdx];
        if (!step || !step.predictQuestion) return;
        this.stepAnswers.set(this.currentStepIdx, {
          selectedChoice: null,
          isCorrect: null,
          revealed: true,
          mode: "revealed"
        });
        const currentSubstep = (step.teachingSubsteps && step.teachingSubsteps[this.currentSubstepIdx]) || step.teacherLesson;
        this.renderInteractivePredictCard(step, currentSubstep);
        this.renderVisualConditionGate(step, currentSubstep);
      });
    }

    // Phase 5: Speed Controls (0.5x, 1x, 1.5x, 2x)
    if (this.btnSpeed) {
      this.btnSpeed.addEventListener("click", () => {
        this.currentSpeedIdx = (this.currentSpeedIdx + 1) % this.speedModes.length;
        const spd = this.speedModes[this.currentSpeedIdx];
        this.btnSpeed.textContent = `⚡ Speed: ${spd.label}`;
        this.playSpeedMs = spd.ms;
        document.documentElement.style.setProperty("--anim-speed-factor", String(spd.animFactor));
        if (this.isPlaying) {
          clearInterval(this.playInterval);
          this.playInterval = setInterval(() => {
            const steps = this.traceResult.steps;
            const step = steps[this.currentStepIdx];
            const substeps = step.teachingSubsteps || [step.teacherLesson];
            const isLastStep = this.currentStepIdx >= steps.length - 1;
            const isLastSubstep = this.currentSubstepIdx >= substeps.length - 1;
            if (!isLastStep || !isLastSubstep) {
              this.goToNextSubstep();
              if (this.predictModeEnabled) {
                const nextStep = this.traceResult.steps[this.currentStepIdx];
                if (nextStep && nextStep.predictQuestion && !this.stepAnswers.has(this.currentStepIdx)) {
                  this.stopAutoPlay();
                }
              }
            } else {
              this.stopAutoPlay();
            }
          }, this.playSpeedMs);
        }
      });
    }

    // Phase 5: Quick Test Inputs (All-Negative, Positive, Single-Element)
    if (this.testInputChips) {
      const chips = this.testInputChips.querySelectorAll(".test-chip");
      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          chips.forEach((c) => c.classList.remove("active"));
          chip.classList.add("active");
          const chipInput = chip.getAttribute("data-input") || "";
          this.inputCode = chipInput;
          if (/^\s*nums\s*=\s*\[[^\]]*\]/m.test(this.sourceCode)) {
            this.sourceCode = this.sourceCode.replace(/^\s*nums\s*=\s*\[[^\]]*\]/m, chipInput);
            if (this.codeTextarea) {
              this.codeTextarea.value = this.sourceCode;
            }
          }
          this.stopAutoPlay();
          this.analyzeAndRun();
        });
      });
    }

    if (this.btnToggleGC) {
      this.btnToggleGC.addEventListener("click", () => {
        this.showGCObjects = !this.showGCObjects;
        this.btnToggleGC.classList.toggle("active", this.showGCObjects);
        this.renderStep();
      });
    }

    if (this.btnToggleIterations) {
      this.btnToggleIterations.addEventListener("click", () => {
        this.showIterationsPanel = !this.showIterationsPanel;
        this.allIterationsSection.classList.toggle("hidden", !this.showIterationsPanel);
        this.btnToggleIterations.classList.toggle("active", this.showIterationsPanel);
        if (this.showIterationsPanel) {
          this.allIterationsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }

    if (this.tabViewGrouped && this.tabViewTable) {
      this.tabViewGrouped.addEventListener("click", () => {
        this.iterationsViewMode = "grouped";
        this.tabViewGrouped.classList.add("active");
        this.tabViewTable.classList.remove("active");
        this.iterationsGroupedContainer.classList.remove("hidden");
        this.iterationsTableContainer.classList.add("hidden");
        this.btnExpandAllIter.classList.remove("hidden");
      });

      this.tabViewTable.addEventListener("click", () => {
        this.iterationsViewMode = "table";
        this.tabViewTable.classList.add("active");
        this.tabViewGrouped.classList.remove("active");
        this.iterationsTableContainer.classList.remove("hidden");
        this.iterationsGroupedContainer.classList.add("hidden");
        this.btnExpandAllIter.classList.add("hidden");
      });
    }

    if (this.btnExpandAllIter) {
      this.btnExpandAllIter.addEventListener("click", () => {
        this.allGroupsCollapsed = !this.allGroupsCollapsed;
        if (this.allGroupsCollapsed) {
          this.iterationGroups.forEach((g) => this.collapsedGroupIds.add(g.id));
        } else {
          this.collapsedGroupIds.clear();
        }
        this.renderArea4AllIterations(this.traceResult.steps[this.currentStepIdx]);
      });
    }

    this.btnToggleAdvanced.addEventListener("click", () => {
      this.showAdvanced = !this.showAdvanced;
      this.advancedViewPanel.classList.toggle("hidden", !this.showAdvanced);
      this.btnToggleAdvanced.classList.toggle("active", this.showAdvanced);
      this.btnToggleAdvanced.textContent = this.showAdvanced
        ? "Hide Advanced View"
        : "Advanced View";
      this.renderStep();
    });

    this.btnEditCode.addEventListener("click", () => {
      if (this.isEditing) {
        this.sourceCode = this.codeTextarea.value;
        this.inputCode = "";
        this.setEditMode(false);
        this.analyzeAndRun();
      } else {
        this.setEditMode(true);
      }
    });

    this.btnAnalyzeCode.addEventListener("click", () => {
      this.sourceCode = this.codeTextarea.value;
      this.inputCode = "";
      this.setEditMode(false);
      this.analyzeAndRun();
    });

    // Keyboard shortcuts: Left / Right arrows + F7 for Thonny sub-expression stepping
    window.addEventListener("keydown", (e) => {
      if (document.activeElement === this.codeTextarea) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        this.stopAutoPlay();
        this.goToNextSubstep();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.stopAutoPlay();
        this.goToPrevSubstep();
      } else if (e.key === "F7") {
        e.preventDefault();
        this.stopAutoPlay();
        this.goToNextSubstep();
      }
    });
  }

  setEditMode(editing) {
    this.isEditing = editing;
    if (editing) {
      this.stopAutoPlay();
      this.codeTextarea.value = this.sourceCode;
      this.liveEditorWrap.classList.remove("hidden");
      this.codeLinesContainer.classList.add("hidden");
      this.btnAnalyzeCode.classList.remove("hidden");
      this.btnEditCode.textContent = "▶ Run Code";
      this.codeTextarea.focus();
    } else {
      this.liveEditorWrap.classList.add("hidden");
      this.codeLinesContainer.classList.remove("hidden");
      this.btnAnalyzeCode.classList.add("hidden");
      this.btnEditCode.textContent = "✏️ Paste / Edit Code";
    }
  }

  buildDynamicOverview(code) {
    if (code.includes("class Stack")) {
      return "This code defines a Stack data structure (Last-In, First-Out) using a Python class and tests push, pop, peek, size, and is_empty.";
    }
    if (code.includes("binary_search")) {
      return "This code searches a sorted list for a target number by checking the middle index (mid) and cutting the search range (left to right) in half.";
    }
    if (code.includes("maxSubArray")) {
      return "This code finds the largest sum you can get from a continuous section of the list.";
    }
    const classMatches = [...code.matchAll(/^\s*class\s+([a-zA-Z_]\w*)/gm)].map((m) => m[1]);
    const funcMatches = [...code.matchAll(/^\s*def\s+([a-zA-Z_]\w*)/gm)].map((m) => m[1]);
    if (classMatches.length > 0) {
      return `Visualizing class \`${classMatches.join(", ")}\` and its methods (${funcMatches.join(", ")}) step-by-step.`;
    }
    if (funcMatches.length > 0) {
      return `Visualizing function \`${funcMatches.join(", ")}()\` execution, iterations, local scope frames, and memory references.`;
    }
    return "Visualizing your Python program step-by-step with Iterations, Stack Scopes, and Heap Memory addresses.";
  }

  async analyzeAndRun() {
    this.stopAutoPlay();
    this.overviewText.textContent = this.buildDynamicOverview(this.sourceCode);

    let rawTrace = this.engine.trace(this.sourceCode, this.inputCode);

    // Hybrid execution: if running via server.py (http/https) and the browser engine hits complex Python syntax,
    // automatically use the real Python `sys.settrace` + `ast` backend (`/api/trace`)!
    if (!rawTrace.ok && window.location.protocol.startsWith("http")) {
      try {
        const resp = await fetch("/api/trace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceCode: this.sourceCode, inputCode: this.inputCode })
        });
        if (resp.ok) {
          const backendTrace = await resp.json();
          if (backendTrace && (backendTrace.ok || (backendTrace.steps && backendTrace.steps.length > 0))) {
            rawTrace = backendTrace;
          }
        }
      } catch (_) {
        // Offline / static file mode: keep local browser trace result
      }
    }

    this.traceResult = this.explainer.enrichTraceWithExplanations(rawTrace);
    this.collapsedGroupIds.clear();
    this.allGroupsCollapsed = false;
    this.buildIterationGroups(this.traceResult.steps || []);

    if (!this.traceResult.ok) {
      this.validationBanner.textContent = `⚠ ${this.traceResult.errorMessage}`;
      this.validationBanner.classList.remove("hidden");
    } else {
      this.validationBanner.classList.add("hidden");
    }

    this.stepAnswers.clear();
    this.currentStepIdx = 0;
    this.currentSubStepIdx = 0;
    this.renderStep();
  }

  /* =========================================================
     UNIVERSAL ITERATION & EXECUTION PHASE GROUPING ENGINE
     Groups steps logically for:
     - Loop algorithms (`for` / `while` iterations)
     - OOP / Data Structure programs (`s = Stack()`, `s.push(10)`, `print(s.pop())`)
     - Recursive algorithms (`factorial(4)` -> `factorial(3)` -> ...)
     ========================================================= */
  buildIterationGroups(steps) {
    this.iterationGroups = [];
    this.stepToGroupIdx.clear();
    if (!steps || !steps.length) return;

    const hasLoops = steps.some((s) => s.eventType === "LOOP_ITER");

    if (hasLoops) {
      let currentGroup = null;
      let iterCounter = 0;

      const startGroup = (badge, pillLabel, title, firstStepIdx) => {
        currentGroup = {
          id: `grp_${this.iterationGroups.length}`,
          groupIdx: this.iterationGroups.length,
          badge,
          pillLabel,
          title,
          startStepIdx: firstStepIdx,
          endStepIdx: firstStepIdx,
          steps: [],
          endStateSummary: ""
        };
        this.iterationGroups.push(currentGroup);
      };

      steps.forEach((step, idx) => {
        const op = step.operationDetail || {};
        if (step.eventType === "LOOP_ITER") {
          iterCounter++;
          const iterNum = op.iteration || iterCounter;
          let title = `Iteration ${iterNum}`;
          let pill = `Iter ${iterNum}`;

          if (op.kind === "for_iter") {
            const el = op.indexedElementInfo;
            title = el
              ? `Iteration ${iterNum}: ${op.iterVar} = ${op.iterVal} (${el.arrayName}[${el.indexVal}] = ${el.elementVal})`
              : `Iteration ${iterNum}: ${op.iterVar} = ${op.iterVal}`;
            pill = `Iter ${iterNum} (${op.iterVar}=${op.iterVal})`;
          } else if (op.kind === "while_check" && step.condition) {
            title = `Iteration ${iterNum}: while ${step.condition.expr} (${step.condition.leftVal} ${step.condition.operator} ${step.condition.rightVal})`;
            pill = `Iter ${iterNum}`;
          }
          startGroup(`ITERATION #${iterNum}`, pill, title, idx);
        } else if (
          (step.eventType === "LOOP_END" || step.eventType === "RETURN") &&
          currentGroup &&
          currentGroup.badge.startsWith("ITERATION")
        ) {
          startGroup("FINAL", "🏁 Return / End", "Loop Finished & Final Answer", idx);
        } else if (!currentGroup) {
          startGroup("SETUP", "⚙️ Setup", "Program Setup & Initial Variables", idx);
        }

        currentGroup.steps.push({ step, idx });
        currentGroup.endStepIdx = idx;
        this.stepToGroupIdx.set(idx, currentGroup.groupIdx);
      });
    } else {
      // Non-loop code: OOP classes (like `Stack`), Recursive functions (like `factorial`), or Straight-line scripts
      let currentGroup = null;
      let opCount = 0;

      const startGroup = (badge, pillLabel, title, firstStepIdx, rootLine = null) => {
        currentGroup = {
          id: `grp_${this.iterationGroups.length}`,
          groupIdx: this.iterationGroups.length,
          badge,
          pillLabel,
          title,
          rootLine,
          startStepIdx: firstStepIdx,
          endStepIdx: firstStepIdx,
          steps: [],
          endStateSummary: ""
        };
        this.iterationGroups.push(currentGroup);
      };

      // Check if recursive (same function called multiple times at increasing call-stack depths)
      const funcCallNames = steps.filter((s) => s.eventType === "FUNC_CALL").map((s) => s.functionName.split("(")[0]);
      const isRecursive = funcCallNames.length > 1 && new Set(funcCallNames).size === 1;

      steps.forEach((step, idx) => {
        const isDef =
          step.eventType === "CLASS_DEF" || step.eventType === "METHOD_DEF" || step.eventType === "FUNC_DEF";

        if (isDef) {
          if (!currentGroup || currentGroup.badge !== "SETUP") {
            startGroup("SETUP", "⚙️ Setup", "Define Class & Methods / Functions", idx, 0);
          }
        } else if (isRecursive) {
          if (step.eventType === "FUNC_CALL") {
            opCount++;
            startGroup(
              `CALL #${opCount}`,
              `📞 ${step.functionName}`,
              `Recursive Call #${opCount}: ${step.functionName}`,
              idx
            );
          } else if (step.eventType === "RETURN" && currentGroup && !currentGroup.badge.startsWith("RETURN")) {
            startGroup("UNWIND", "🔙 Unwind & Return", "Recursive Base Case & Unwinding Returns", idx);
          } else if (!currentGroup) {
            startGroup("EXEC", "▶ Run", `Execute Line ${step.line}: ${step.codeText}`, idx);
          }
        } else {
          // OOP / Method calls / Top-level operations (like `s = Stack()`, `s.push(10)`, `print(s.pop())`)
          const scopeDepth = (step.scopeFrames || []).length;
          const op = step.operationDetail || {};

          if (scopeDepth <= 1) {
            // Top-level Global statement
            if (!currentGroup || currentGroup.rootLine !== step.line) {
              opCount++;
              const rawLineCode = (this.traceResult.rawLines[step.line - 1] || step.codeText).trim();
              const shortCode = rawLineCode.length > 22 ? rawLineCode.slice(0, 20) + ".." : rawLineCode;
              startGroup(`STEP OP #${opCount}`, `${opCount}. ${shortCode}`, `Operation #${opCount}: ${rawLineCode}`, idx, step.line);
            }
          } else if (step.eventType === "FUNC_CALL" && scopeDepth === 2) {
            const callerLine = op.callerLine || step.line;
            if (!currentGroup || currentGroup.rootLine !== callerLine) {
              opCount++;
              const rawCallerCode = (this.traceResult.rawLines[callerLine - 1] || step.codeText).trim();
              const shortCode = rawCallerCode.length > 22 ? rawCallerCode.slice(0, 20) + ".." : rawCallerCode;
              startGroup(`STEP OP #${opCount}`, `${opCount}. ${shortCode}`, `Operation #${opCount}: ${rawCallerCode}`, idx, callerLine);
            }
          } else if (!currentGroup) {
            opCount++;
            startGroup(`STEP OP #${opCount}`, `Op #${opCount}`, `Operation #${opCount}: ${step.codeText}`, idx, step.line);
          }
        }

        currentGroup.steps.push({ step, idx });
        currentGroup.endStepIdx = idx;
        this.stepToGroupIdx.set(idx, currentGroup.groupIdx);
      });
    }

    // Populate end-of-iteration variable summary for each group and collapse by default
    this.iterationGroups.forEach((grp) => {
      const lastStep = grp.steps[grp.steps.length - 1].step;
      grp.endStateSummary = this.formatCompactStateForStep(lastStep);
      this.collapsedGroupIds.add(grp.id);
    });
    this.allGroupsCollapsed = true;
  }

  formatCompactStateForStep(step) {
    if (step.eventType === "PRINT" && step.operationDetail && step.operationDetail.output !== undefined) {
      return `Printed: ${step.operationDetail.output}`;
    }
    if (step.eventType === "RETURN" && step.returnValue !== null) {
      return `Return → ${step.returnValue}`;
    }
    const scopes = step.scopeFrames || [];
    const globalFrame = scopes[0];
    const activeFrame = scopes[scopes.length - 1];
    const varsToShow =
      activeFrame && activeFrame.variables && activeFrame.variables.length
        ? activeFrame.variables
        : globalFrame
        ? globalFrame.variables
        : [];
    if (!varsToShow || !varsToShow.length) return step.changedSummary || "Defined in scope";
    return varsToShow
      .filter((v) => !Array.isArray(v.rawValue) || v.rawValue.length <= 6)
      .slice(0, 4)
      .map((v) => `${v.name} = ${v.current}`)
      .join("  •  ");
  }

  goToStep(idx, substepIdx = 0) {
    if (!this.traceResult || !this.traceResult.steps.length) return;
    this.currentStepIdx = Math.max(0, Math.min(idx, this.traceResult.steps.length - 1));
    const step = this.traceResult.steps[this.currentStepIdx];
    const substeps = step.teachingSubsteps && step.teachingSubsteps.length > 0
      ? step.teachingSubsteps
      : [step.teacherLesson];
    this.currentSubstepIdx = Math.max(0, Math.min(substepIdx, substeps.length - 1));
    const frames = step.exprFrames || [];
    this.currentSubStepIdx = Math.max(0, frames.length - 1);
    this.renderStep();
  }

  goToNextSubstep() {
    if (!this.traceResult || !this.traceResult.steps.length) return;
    const step = this.traceResult.steps[this.currentStepIdx];
    const substeps = step.teachingSubsteps && step.teachingSubsteps.length > 0
      ? step.teachingSubsteps
      : [step.teacherLesson];

    if (this.currentSubstepIdx < substeps.length - 1) {
      this.currentSubstepIdx++;
      this.renderStep();
    } else if (this.currentStepIdx < this.traceResult.steps.length - 1) {
      this.currentStepIdx++;
      this.currentSubstepIdx = 0;
      this.renderStep();
    } else {
      this.stopAutoPlay();
    }
  }

  goToPrevSubstep() {
    if (!this.traceResult || !this.traceResult.steps.length) return;

    if (this.currentSubstepIdx > 0) {
      this.currentSubstepIdx--;
      this.renderStep();
    } else if (this.currentStepIdx > 0) {
      this.currentStepIdx--;
      const prevStep = this.traceResult.steps[this.currentStepIdx];
      const prevSubsteps = prevStep.teachingSubsteps && prevStep.teachingSubsteps.length > 0
        ? prevStep.teachingSubsteps
        : [prevStep.teacherLesson];
      this.currentSubstepIdx = Math.max(0, prevSubsteps.length - 1);
      this.renderStep();
    }
  }

  advanceSubExpression() {
    this.goToNextSubstep();
  }

  startAutoPlay() {
    if (!this.traceResult || !this.traceResult.steps.length) return;
    const total = this.traceResult.steps.length;
    const lastStep = this.traceResult.steps[total - 1];
    const lastSubsteps = lastStep.teachingSubsteps || [lastStep.teacherLesson];
    if (this.currentStepIdx >= total - 1 && this.currentSubstepIdx >= lastSubsteps.length - 1) {
      this.currentStepIdx = 0;
      this.currentSubstepIdx = 0;
      this.renderStep();
    }
    this.isPlaying = true;
    this.btnAutoPlay.textContent = "⏸ Pause";

    this.playInterval = setInterval(() => {
      const step = this.traceResult.steps[this.currentStepIdx];
      const substeps = step.teachingSubsteps || [step.teacherLesson];
      const isLastStep = this.currentStepIdx >= total - 1;
      const isLastSubstep = this.currentSubstepIdx >= substeps.length - 1;

      if (!isLastStep || !isLastSubstep) {
        this.goToNextSubstep();
        if (this.predictModeEnabled) {
          const nextStep = this.traceResult.steps[this.currentStepIdx];
          if (nextStep && nextStep.predictQuestion && !this.stepAnswers.has(this.currentStepIdx)) {
            this.stopAutoPlay();
          }
        }
      } else {
        this.stopAutoPlay();
      }
    }, this.playSpeedMs);
  }

  stopAutoPlay() {
    this.isPlaying = false;
    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
    this.btnAutoPlay.textContent = "▶ Auto Play";
  }

  renderStep() {
    const steps = this.traceResult && this.traceResult.steps ? this.traceResult.steps : [];
    const total = steps.length;

    if (total === 0) {
      this.stepProgressLabel.textContent = "No steps";
      this.btnPrev.disabled = true;
      this.btnNext.disabled = true;
      return;
    }

    const step = steps[this.currentStepIdx];
    const substeps = step.teachingSubsteps && step.teachingSubsteps.length > 0
      ? step.teachingSubsteps
      : [step.teacherLesson];
    this.currentSubstepIdx = Math.max(0, Math.min(this.currentSubstepIdx, substeps.length - 1));
    const currentSubstep = substeps[this.currentSubstepIdx];

    const isLocal = step.scopeType === "LOCAL" || (step.functionName && step.functionName !== "Global Scope");
    const scopeLabel = isLocal ? `LOCAL SCOPE: ${step.functionName.split("(")[0]}()` : "GLOBAL SCOPE";

    const isFirst = this.currentStepIdx === 0 && this.currentSubstepIdx === 0;
    const isLast = this.currentStepIdx === total - 1 && this.currentSubstepIdx === substeps.length - 1;

    // Requirement 10: Progress indicator distinguishing teaching substeps from actual execution steps
    this.stepProgressLabel.textContent = `Step ${this.currentStepIdx + 1} of ${total} • Substep ${this.currentSubstepIdx + 1}/${substeps.length}`;
    this.btnPrev.disabled = isFirst;
    this.btnNext.disabled = isLast;

    if (this.teachSubstepPill) {
      this.teachSubstepPill.textContent = `Substep ${this.currentSubstepIdx + 1} of ${substeps.length}`;
      this.teachSubstepPill.title = currentSubstep.substepLabel || "";
    }

    [this.activeScopeBadge, this.teachScopeBadge].forEach((badge) => {
      if (!badge) return;
      badge.textContent = scopeLabel;
      badge.className = `scope-pill ${isLocal ? "scope-local" : "scope-global"}`;
    });
    if (this.codeScopeIndicator) {
      this.codeScopeIndicator.textContent = isLocal
        ? `Scope: Local (${step.functionName.split("(")[0]})`
        : "Scope: Global (<module>)";
    }

    this.renderArea1Code(step, currentSubstep);
    this.renderArea2Teaching(step, currentSubstep);
    this.renderArea3MemoryAndScopes(step, currentSubstep);
    this.renderArea4AllIterations(step);

    if (this.showAdvanced) {
      this.renderAdvancedDrawer(step, total);
    }
  }

  /* =========================================================
     AREA 1: YOUR CODE (Highlight ONLY the current line & branch outcome)
     ========================================================= */
  renderArea1Code(step, currentSubstep) {
    this.codeLinesContainer.innerHTML = "";
    let activeRowEl = null;

    const cond = step.condition;
    const isConditionStep = step.eventType === "CONDITION";

    this.traceResult.rawLines.forEach((rawLine, idx) => {
      const lineNum = idx + 1;
      const isCurrent = step.line === lineNum;

      // Phase 3: Highlight the branch that executes / is skipped
      let branchBadge = "";
      if (isConditionStep && cond) {
        const isBranchLine = lineNum === step.line + 1;
        if (isBranchLine) {
          branchBadge = cond.result
            ? `<span class="branch-badge is-executes">✓ executes</span>`
            : `<span class="branch-badge is-skipped">✗ skipped</span>`;
        }
      }

      const row = document.createElement("div");
      row.className = `code-row ${isCurrent ? "is-current-line" : "is-dimmed"}`;
      if (isCurrent) {
        activeRowEl = row;
      }

      const pointerHTML = isCurrent ? `<span class="code-gutter-pointer">▶</span>` : "";
      const codeHtml = isCurrent
        ? this.highlightLineWithFocus(rawLine, this.getActiveFocusSnippet(step, currentSubstep, rawLine))
        : this.highlightPythonSyntax(rawLine);
      row.innerHTML = `
        <div class="code-gutter">${pointerHTML}<span>${lineNum}</span></div>
        <div class="code-syntax">${codeHtml}${branchBadge}</div>
      `;

      row.addEventListener("click", () => {
        const targetIdx = this.traceResult.steps.findIndex((s) => s.line === lineNum);
        if (targetIdx !== -1) {
          this.stopAutoPlay();
          this.goToStep(targetIdx, 0);
        }
      });

      this.codeLinesContainer.appendChild(row);
    });

    // Keep the active line centered inside the scrollable code box on mobile/tablet
    if (activeRowEl && this.codeLinesContainer.scrollHeight > this.codeLinesContainer.clientHeight) {
      const container = this.codeLinesContainer;
      const targetTop =
        activeRowEl.offsetTop - container.offsetTop - container.clientHeight / 2 + activeRowEl.clientHeight / 2;
      container.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    }
  }

  highlightPythonSyntax(line) {
    if (line === undefined || line === null) return " ";
    if (line === "") return "";
    let commentPart = "";
    let codePart = line;
    const hashIdx = line.indexOf("#");
    if (hashIdx !== -1) {
      codePart = line.slice(0, hashIdx);
      commentPart = `<span class="syn-com">${this.escapeHTML(line.slice(hashIdx))}</span>`;
    }

    const tokenRegex = /(".*?"|'.*?'|\b(?:class|def|return|if|elif|else|for|while|in|break|continue|and|or|not|True|False|None|self)\b|\b(?:print|range|len|min|max|abs|sum|list|int|float|str|bool|round|enumerate|sorted|reversed|set|dict)\b|\b\d+(?:\.\d+)?\b)/g;
    const highlighted = this.escapeHTML(codePart).replace(tokenRegex, (match) => {
      if (match.startsWith('"') || match.startsWith("'")) {
        return `<span class="syn-str">${match}</span>`;
      }
      if (/^(class|def|return|if|elif|else|for|while|in|break|continue|and|or|not|True|False|None|self)$/.test(match)) {
        return `<span class="syn-kw">${match}</span>`;
      }
      if (/^(print|range|len|min|max|abs|sum|list|int|float|str|bool|round|enumerate|sorted|reversed|set|dict)$/.test(match)) {
        return `<span class="syn-bi">${match}</span>`;
      }
      if (/^\d/.test(match)) {
        return `<span class="syn-num">${match}</span>`;
      }
      return match;
    });

    return highlighted + commentPart;
  }

  getActiveFocusSnippet(step, currentSubstep, rawLine) {
    if (!step || !rawLine) return null;
    const lineTrimmed = rawLine.trim();

    // 1. Check active exprFrames (Thonny sub-expression frame)
    if (step.exprFrames && step.exprFrames.length > 0) {
      const subIdx = Math.max(0, Math.min(this.currentSubStepIdx || 0, step.exprFrames.length - 1));
      const activeFrame = step.exprFrames[subIdx];
      if (activeFrame) {
        if (activeFrame.highlightSub && rawLine.includes(activeFrame.highlightSub.trim())) {
          return activeFrame.highlightSub.trim();
        }
        if (activeFrame.expr && rawLine.includes(activeFrame.expr.trim())) {
          return activeFrame.expr.trim();
        }
      }
    }

    // 2. Condition steps: highlight the comparison expression (e.g., "c >= ans", "c < 0", "k <= 1", "arr[mid] == target")
    if (step.condition && step.condition.expr) {
      const condExpr = step.condition.expr.trim();
      if (rawLine.includes(condExpr)) {
        return condExpr;
      }
      if (step.condition.leftExpr && rawLine.includes(step.condition.leftExpr.trim())) {
        return step.condition.leftExpr.trim();
      }
    }

    // 3. Assignment steps: highlight the RHS being computed or the target variable being updated
    if (step.operationDetail) {
      const op = step.operationDetail;
      if (op.rhsExpr && rawLine.includes(op.rhsExpr.trim())) {
        return op.rhsExpr.trim();
      }
      if (op.target && rawLine.includes(op.target.trim())) {
        const aug = `${op.target} +=`;
        if (rawLine.includes(aug)) {
          const afterAug = rawLine.slice(rawLine.indexOf(aug) + aug.length).replace(/#.*$/, "").trim();
          if (afterAug && rawLine.includes(afterAug)) return afterAug;
        }
      }
    }

    // 4. Return statement: highlight what is being returned
    const returnMatch = lineTrimmed.match(/^return\s+(.+)$/);
    if (returnMatch && returnMatch[1]) {
      const retPart = returnMatch[1].replace(/#.*$/, "").trim();
      if (rawLine.includes(retPart)) {
        return retPart;
      }
    }

    // 5. Loop statement: highlight loop variable or range
    if (step.loop) {
      if (step.loop.iterableExpr && rawLine.includes(step.loop.iterableExpr.trim())) {
        return step.loop.iterableExpr.trim();
      }
      if (step.loop.iterVar && rawLine.includes(step.loop.iterVar.trim())) {
        return step.loop.iterVar.trim();
      }
    }

    // 6. Function / Method calls on this line (e.g., fact(3), factorial(k-1), print(...), s.push(10))
    const callMatch = lineTrimmed.match(/([a-zA-Z_]\w*\s*\([^)]*\))/);
    if (callMatch && rawLine.includes(callMatch[1])) {
      return callMatch[1].trim();
    }

    // 7. If line contains an assignment '=', highlight RHS
    const eqIdx = rawLine.indexOf("=");
    if (eqIdx !== -1 && !rawLine.includes("==") && !rawLine.includes("<=") && !rawLine.includes(">=") && !rawLine.includes("!=")) {
      const rhs = rawLine.slice(eqIdx + 1).replace(/#.*$/, "").trim();
      if (rhs && rawLine.includes(rhs)) {
        return rhs;
      }
    }

    return null;
  }

  highlightLineWithFocus(line, activeSnippet) {
    if (line === undefined || line === null) return " ";
    if (line === "") return "";
    if (!activeSnippet || !line.includes(activeSnippet)) {
      return this.highlightPythonSyntax(line);
    }

    let commentPart = "";
    let codePart = line;
    const hashIdx = line.indexOf("#");
    if (hashIdx !== -1) {
      codePart = line.slice(0, hashIdx);
      commentPart = `<span class="syn-com">${this.escapeHTML(line.slice(hashIdx))}</span>`;
    }

    const snippetIdx = codePart.indexOf(activeSnippet);
    if (snippetIdx === -1) {
      return this.highlightPythonSyntax(line);
    }

    const before = codePart.slice(0, snippetIdx);
    const after = codePart.slice(snippetIdx + activeSnippet.length);

    const beforeHtml = this.highlightPythonSyntax(before);
    const snippetHtml = `<span class="thonny-token-box">${this.highlightPythonSyntax(activeSnippet)}</span>`;
    const afterHtml = this.highlightPythonSyntax(after);

    return beforeHtml + snippetHtml + afterHtml + commentPart;
  }

  /* =========================================================
     AREA 2: TEACHING AREA, QUICK ITERATION BAR & THONNY STEPPER
     ========================================================= */
  renderArea2Teaching(step, currentSubstep) {
    const lesson = currentSubstep || step.teacherLesson;

    // Render Quick Iteration / Phase Pills Bar
    this.renderQuickIterationBar();

    this.teachStepTitle.textContent = lesson.title || step.teacherLesson.title;
    const teachLine = lesson.codeSnippet || step.codeText;
    const teachFocus = this.getActiveFocusSnippet(step, currentSubstep, teachLine);
    this.teachCodeBox.innerHTML = this.highlightLineWithFocus(teachLine, teachFocus);

    // Phase 4: Interactive Learning Prediction Card (Optional)
    this.renderInteractivePredictCard(step, currentSubstep);

    // Phase 3: Loop Return Indicator & Loop Array Pointer Tracker
    this.renderLoopReturnBanner(step, currentSubstep);
    this.renderVisualLoopStrip(step, currentSubstep);

    // Phase 3: Condition Comparison Gate & Branch Selector
    this.renderVisualConditionGate(step, currentSubstep);

    // Phase 2: Variable Boxes & Number Movement / Calculation Stage
    this.renderVisualCalcStage(step, currentSubstep);
    this.renderNegativeResetVisual(step, currentSubstep);

    // Render Thonny Step-by-Step Expression Evaluator
    this.renderThonnyExpressionStepper(step);

    // Calculation Breakdown Card
    if (lesson.calculationCard) {
      const c = lesson.calculationCard;
      this.teachCalculationBox.classList.remove("hidden");

      if (c.currentNumber !== null && c.currentNumber !== undefined) {
        this.calcCurrentNumRow.classList.remove("hidden");
        this.calcCurrentNumVal.textContent = c.currentNumber;
      } else {
        this.calcCurrentNumRow.classList.add("hidden");
      }

      this.calcBeforeVal.textContent = c.before;
      this.calcFormulaVal.textContent = c.calculation;
      this.calcAfterVal.textContent = c.after;
    } else {
      this.teachCalculationBox.classList.add("hidden");
    }

    // Meaning / What is happening (clean beginner explanation)
    const mainMeaning = lesson.whatIsHappening || lesson.whatItMeans || "";
    this.teachMeaningText.innerHTML = this.formatMarkdown(mainMeaning);

    // Symbols callout (clean container without raw HTML string concatenation)
    if (this.teachSymbolsBox) {
      if (lesson.symbolsMeaning && !mainMeaning.includes(lesson.symbolsMeaning)) {
        this.teachSymbolsBox.classList.remove("hidden");
        this.teachSymbolsBox.innerHTML = `
          <div class="teach-symbols-title">Symbols on this line:</div>
          <div class="teach-symbols-body">${this.formatMarkdown(lesson.symbolsMeaning)}</div>
        `;
      } else {
        this.teachSymbolsBox.classList.add("hidden");
        this.teachSymbolsBox.innerHTML = "";
      }
    }

    // Why is this operation necessary? / Why am I learning this? (Requirement 4)
    if (this.teachWhySection && this.teachWhyText) {
      if (lesson.whyNecessary) {
        this.teachWhySection.classList.remove("hidden");
        this.teachWhyText.innerHTML = this.formatMarkdown(lesson.whyNecessary);
      } else {
        this.teachWhySection.classList.add("hidden");
      }
    }

    // Phase 2: Show variables as labeled boxes containing their current values
    this.renderVisualVariableBoxes(step, currentSubstep);

    this.teachNextText.innerHTML = this.formatMarkdown(lesson.whatHappensNext);

    if (lesson.finalBanner) {
      this.finalAnswerBanner.classList.remove("hidden");
      this.finalAnswerHeading.textContent = `Final answer: ${lesson.finalBanner.answer}`;
      this.finalAnswerDetail.innerHTML = this.formatMarkdown(lesson.finalBanner.summary);
    } else {
      this.finalAnswerBanner.classList.add("hidden");
    }
  }

  /* PHASE 4: Interactive Learning Prediction Card */
  renderInteractivePredictCard(step, currentSubstep) {
    if (!this.interactivePredictCard) return;
    const q = step.predictQuestion;

    if (!this.predictModeEnabled || !q) {
      this.interactivePredictCard.classList.add("hidden");
      this.interactivePredictCard.innerHTML = "";
      return;
    }

    this.interactivePredictCard.classList.remove("hidden");
    const existingAnswer = this.stepAnswers.get(this.currentStepIdx);
    const isAnswered = Boolean(existingAnswer);

    const choicesHTML = (q.choices || [])
      .map((choice, idx) => {
        let extraClass = "";
        let prefix = "";
        let disabledAttr = "";

        if (isAnswered) {
          disabledAttr = "disabled";
          const isThisCorrect = idx === q.correctIndex || choice === q.correctValue;
          const isThisSelected = existingAnswer.selectedChoice === choice;

          if (isThisCorrect) {
            extraClass = "is-correct";
            prefix = "✓ ";
          } else if (isThisSelected && !existingAnswer.isCorrect) {
            extraClass = "is-incorrect";
            prefix = "✗ ";
          }
        }

        return `<button type="button" class="predict-choice-btn ${extraClass}" data-choice-idx="${idx}" ${disabledAttr}>${prefix}${this.escapeHTML(choice)}</button>`;
      })
      .join("");

    let resultBoxHTML = "";
    if (isAnswered) {
      let boxClass = "";
      let headerText = "🎉 Correct Prediction!";
      let headerColor = "#065f46";

      if (existingAnswer.mode === "incorrect") {
        boxClass = "was-wrong";
        headerText = "💡 Close! Here is what actually happens:";
        headerColor = "#92400e";
      } else if (existingAnswer.mode === "revealed") {
        boxClass = "was-revealed";
        headerText = "📖 Revealed Explanation:";
        headerColor = "#1d4ed8";
      }

      resultBoxHTML = `
        <div class="predict-result-box ${boxClass}">
          <div class="predict-result-header" style="color: ${headerColor};">${headerText}</div>
          <div class="predict-result-body">${this.formatMarkdown(q.explanation)}</div>
        </div>
      `;
    }

    this.interactivePredictCard.innerHTML = `
      <div class="predict-card-header">
        <div class="predict-badge-group">
          <span class="predict-badge">🎯 Predict the Outcome</span>
          <span class="predict-subprompt">${this.escapeHTML(q.subPrompt || "")}</span>
        </div>
        ${!isAnswered ? `<button type="button" class="btn-predict-skip" id="btnCardSkipPredict">Reveal Answer</button>` : ""}
      </div>
      <div class="predict-question-text">${this.escapeHTML(q.question)}</div>
      <div class="predict-choices-wrap">${choicesHTML}</div>
      ${resultBoxHTML}
    `;

    // Wire choice clicks
    if (!isAnswered) {
      const choiceButtons = this.interactivePredictCard.querySelectorAll(".predict-choice-btn");
      choiceButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.getAttribute("data-choice-idx"));
          const choice = q.choices[idx];
          const isCorrect = idx === q.correctIndex || choice === q.correctValue;
          this.stepAnswers.set(this.currentStepIdx, {
            selectedChoice: choice,
            selectedIndex: idx,
            isCorrect: isCorrect,
            revealed: true,
            mode: isCorrect ? "correct" : "incorrect"
          });
          this.renderInteractivePredictCard(step, currentSubstep);
          this.renderVisualConditionGate(step, currentSubstep);
        });
      });

      const cardSkipBtn = this.interactivePredictCard.querySelector("#btnCardSkipPredict");
      if (cardSkipBtn) {
        cardSkipBtn.addEventListener("click", () => {
          this.stepAnswers.set(this.currentStepIdx, {
            selectedChoice: null,
            isCorrect: null,
            revealed: true,
            mode: "revealed"
          });
          this.renderInteractivePredictCard(step, currentSubstep);
          this.renderVisualConditionGate(step, currentSubstep);
        });
      }
    }
  }

  /* PHASE 3: Visually Return to the Loop when another iteration begins */
  renderLoopReturnBanner(step, currentSubstep) {
    if (!this.loopReturnBanner) return;
    const op = step.operationDetail || {};
    if (step.eventType === "LOOP_ITER" && op.iteration > 1) {
      this.loopReturnBanner.classList.remove("hidden");
      const prevPass = op.iteration - 1;
      const iterVar = op.iterVar || "i";
      const iterVal = op.iterVal !== undefined ? op.iterVal : "";
      const elVal = op.indexedElementInfo ? op.indexedElementInfo.elementVal : "";
      this.loopReturnBanner.innerHTML = `
        <span class="loop-return-icon">↺</span>
        <div class="loop-return-text">
          <strong>Looping back to Line ${step.line}:</strong> Pass ${prevPass} finished! Advancing loop variable <code>${iterVar} = ${iterVal}</code> (next list element: <code>${elVal}</code>).
        </div>
      `;
    } else {
      this.loopReturnBanner.classList.add("hidden");
      this.loopReturnBanner.innerHTML = "";
    }
  }

  /* PHASE 3: Show the loop's current index and current list element with an active pointer */
  renderVisualLoopStrip(step, currentSubstep) {
    if (!this.visualLoopStrip) return;
    const loop = step.loop || (step.eventType === "LOOP_ITER" ? step.operationDetail : null);
    const numsRow = (step.variables || []).find((v) => Array.isArray(v.rawValue));
    const listArr = numsRow ? numsRow.rawValue : null;

    if (!listArr || !loop || loop.iterVal === undefined) {
      this.visualLoopStrip.classList.add("hidden");
      this.visualLoopStrip.innerHTML = "";
      return;
    }

    this.visualLoopStrip.classList.remove("hidden");
    const activeIdx = Number(loop.iterVal);
    const activeVal = listArr[activeIdx];
    const total = listArr.length;
    const passNum = loop.iteration || activeIdx + 1;

    const cellsHTML = listArr
      .map((val, idx) => {
        const isActive = idx === activeIdx;
        return `
          <div class="loop-track-item ${isActive ? "is-active-pointer" : ""}">
            <div class="loop-track-cell">
              <span class="loop-track-idx">[${idx}]</span>
              <span class="loop-track-val">${val}</span>
            </div>
            <span class="loop-pointer-indicator">▲ pointer</span>
          </div>
        `;
      })
      .join("");

    this.visualLoopStrip.innerHTML = `
      <div class="loop-strip-header">
        <span>Loop Pointer & List Elements (nums)</span>
        <span class="loop-current-info-pill">Pass ${passNum}/${total} • i = ${activeIdx} • nums[${activeIdx}] = ${activeVal}</span>
      </div>
      <div class="loop-track-scroll">
        ${cellsHTML}
      </div>
    `;

    // Center active loop pointer in view
    const activeEl = this.visualLoopStrip.querySelector(".is-active-pointer");
    const scrollBox = this.visualLoopStrip.querySelector(".loop-track-scroll");
    if (activeEl && scrollBox) {
      const targetLeft =
        activeEl.offsetLeft - scrollBox.offsetLeft - scrollBox.clientWidth / 2 + activeEl.clientWidth / 2;
      scrollBox.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    }
  }

  /* PHASE 3: Show comparisons using actual values, True/False badge, and highlight executing branch */
  renderVisualConditionGate(step, currentSubstep) {
    if (!this.visualConditionGate) return;
    const cond = step.condition;
    const op = step.operationDetail || {};
    const isWhileCheck = op.kind === "while_check";

    if (!cond || (step.eventType !== "CONDITION" && !isWhileCheck)) {
      this.visualConditionGate.classList.add("hidden");
      this.visualConditionGate.innerHTML = "";
      return;
    }

    this.visualConditionGate.classList.remove("hidden");
    const isTrue = Boolean(cond.result);
    const leftName = cond.leftExpr || "Left";
    const leftVal = cond.leftVal !== undefined ? cond.leftVal : "";
    const rightName = cond.rightExpr || "Right";
    const rightVal = cond.rightVal !== undefined ? cond.rightVal : "";
    const opSym = cond.operator || "==";

    const isMaxCheck = cond.expr === "c >= ans" || (leftName === "c" && rightName === "ans");
    const isNegCheck = cond.expr === "c < 0" || (leftName === "c" && rightVal === "0" && opSym === "<");

    let branch1Code = "Enter branch";
    let branch1Desc = `Condition is True: execute indented block`;
    let branch2Code = "Skip branch";
    let branch2Desc = `Condition is False: skip indented block`;

    if (isWhileCheck) {
      branch1Code = `Enter loop body (Pass #${op.iteration || 1})`;
      branch1Desc = "Condition is True: continue while loop";
      branch2Code = "Exit loop";
      branch2Desc = "Condition is False: terminate while loop";
    } else if (isMaxCheck) {
      branch1Code = "ans = c";
      branch1Desc = `Update record: ans becomes ${leftVal}`;
      branch2Code = "Keep ans";
      branch2Desc = `ans preserves previous best sum of ${rightVal}`;
    } else if (isNegCheck) {
      branch1Code = "c = 0";
      branch1Desc = "Reset negative sum to zero";
      branch2Code = `Keep c = ${leftVal}`;
      branch2Desc = "Keep running sum for future additions";
    }

    // Check if user is currently answering a prediction for this step
    const isPredictPending = Boolean(
      this.predictModeEnabled &&
      step.predictQuestion &&
      !this.stepAnswers.has(this.currentStepIdx)
    );

    let decisionBadgeHtml = '';
    let branch1Class = '';
    let branch1Tag = '';
    let branch2Class = '';
    let branch2Tag = '';

    if (isPredictPending) {
      decisionBadgeHtml = `<span class="decision-badge is-pending">🎯 Predict To Reveal</span>`;
      branch1Class = "is-neutral-branch";
      branch1Tag = "OPTION A";
      branch2Class = "is-neutral-branch";
      branch2Tag = "OPTION B";
    } else {
      decisionBadgeHtml = `<span class="decision-badge ${isTrue ? "is-true" : "is-false"}">
        ${isTrue ? "✓ TRUE" : "✗ FALSE"}
      </span>`;
      branch1Class = isTrue ? "is-active-branch" : "is-skipped-branch";
      branch1Tag = isTrue ? "✓ EXECUTES" : "SKIPPED";
      branch2Class = !isTrue ? "is-active-branch" : "is-skipped-branch";
      branch2Tag = !isTrue ? "✓ EXECUTES" : "SKIPPED";
    }

    this.visualConditionGate.innerHTML = `
      <div class="cond-gate-header">
        <span>Condition Comparison Gate & Decision</span>
        ${decisionBadgeHtml}
      </div>
      <div class="cond-balance-row">
        <div class="cond-val-box">
          <span class="cond-val-name">${this.escapeHTML(leftName)}</span>
          <span class="cond-val-num">${this.escapeHTML(leftVal)}</span>
        </div>
        <span class="cond-op-badge">${this.escapeHTML(opSym)}</span>
        <div class="cond-val-box">
          <span class="cond-val-name">${this.escapeHTML(rightName)}</span>
          <span class="cond-val-num">${this.escapeHTML(rightVal)}</span>
        </div>
      </div>
      <div class="branch-decision-wrap">
        <div class="branch-option ${branch1Class}">
          <span class="branch-option-tag">${branch1Tag}</span>
          <code>${this.escapeHTML(branch1Code)}</code>
          <span style="font-size:12px; color:var(--text-secondary);">${this.escapeHTML(branch1Desc)}</span>
        </div>
        <div class="branch-option ${branch2Class}">
          <span class="branch-option-tag">${branch2Tag}</span>
          <code>${this.escapeHTML(branch2Code)}</code>
          <span style="font-size:12px; color:var(--text-secondary);">${this.escapeHTML(branch2Desc)}</span>
        </div>
      </div>
    `;
  }

  /* PHASE 2: Animate number moving into variable & show arithmetic calculation step by step */
  renderVisualCalcStage(step, currentSubstep) {
    if (!this.visualCalcStage) return;
    const op = step.operationDetail || {};
    const isAug = step.eventType === "AUG_ASSIGN";
    const isAssign = step.eventType === "ASSIGN";

    if (!isAug && !isAssign) {
      this.visualCalcStage.classList.add("hidden");
      this.visualCalcStage.innerHTML = "";
      return;
    }

    this.visualCalcStage.classList.remove("hidden");
    const target = op.target || "c";
    const beforeVal = op.beforeVal !== undefined ? op.beforeVal : "0";
    const afterVal = op.afterVal !== undefined ? op.afterVal : op.rhsVal || "0";
    const rhsVal = op.rhsVal !== undefined ? op.rhsVal : afterVal;
    const isCreated = Boolean(op.isCreated);
    const useBeforeVars = Boolean(currentSubstep && currentSubstep.varsBeforeStep);

    let stageHTML = "";

    if (isAug) {
      const augOpMatch = step.codeText.match(/(\+=|-=|\*=|\/\/=|%=)/);
      const augOp = augOpMatch ? augOpMatch[1] : "+=";
      const baseOp = augOp.slice(0, -1) || "+";
      const augOpName = baseOp === "+" ? "Addition" : baseOp === "-" ? "Subtraction" : baseOp === "*" ? "Multiplication" : "Arithmetic Calculation";

      stageHTML = `
        <div class="calc-stage-header">
          <span>Step-by-Step Arithmetic Calculation</span>
          <span class="calc-stage-badge">${augOpName}</span>
        </div>
        <div class="calc-equation-row">
          <div class="calc-operand-chip" title="Previous value of ${target}">
            <span style="font-size:10px; display:block; color:var(--text-muted);">${target}</span>
            <span>${beforeVal}</span>
          </div>
          <span class="calc-operator-chip">${baseOp}</span>
          <div class="calc-operand-chip" title="Operand value">
            <span style="font-size:10px; display:block; color:var(--text-muted);">${op.rhsExpr || "number"}</span>
            <span>(${rhsVal})</span>
          </div>
          <span class="calc-operator-chip">=</span>
          <div class="calc-result-chip" title="Calculated sum">
            <span style="font-size:10px; display:block; opacity:0.85;">New Total</span>
            <span>${afterVal}</span>
          </div>
        </div>
        <div class="assign-animation-row">
          <span class="anim-source-val">${afterVal}</span>
          <span class="anim-move-arrow">──► stores into ──►</span>
          <div class="var-box-card ${!useBeforeVars ? "is-updated" : ""}" style="max-width:145px;">
            <div class="var-box-label">Variable <strong>${target}</strong></div>
            <div class="var-box-val-slot">
              <span class="var-box-value">${!useBeforeVars ? afterVal : beforeVal}</span>
              <span class="var-box-prev">${!useBeforeVars ? `(was ${beforeVal})` : ""}</span>
            </div>
          </div>
        </div>
      `;
    } else if (op.substituted && op.substituted !== afterVal && op.substituted !== op.rhsExpr) {
      stageHTML = `
        <div class="calc-stage-header">
          <span>Step-by-Step Formula Calculation</span>
          <span class="calc-stage-badge">${isCreated ? "Create" : "Update"}</span>
        </div>
        <div class="calc-equation-row" style="margin-bottom:8px;">
          <div class="calc-operand-chip" title="Formula with substituted values">
            <span style="font-size:10px; display:block; color:var(--text-muted);">${this.escapeHTML(op.rhsExpr || "formula")}</span>
            <span>${this.escapeHTML(op.substituted)}</span>
          </div>
          <span class="calc-operator-chip">=</span>
          <div class="calc-result-chip" title="Calculated result">
            <span style="font-size:10px; display:block; opacity:0.85;">Result</span>
            <span>${this.escapeHTML(afterVal)}</span>
          </div>
        </div>
        <div class="assign-animation-row">
          <div style="display:flex; flex-direction:column; gap:2px;">
            <span style="font-size:11px; color:var(--text-secondary); font-weight:700;">VALUE COMPUTED</span>
            <span class="anim-source-val">${afterVal}</span>
          </div>
          <span class="anim-move-arrow">──► moves into ──►</span>
          <div class="var-box-card ${!useBeforeVars ? "is-updated" : ""}" style="max-width:145px;">
            <div class="var-box-label">Variable <strong>${target}</strong></div>
            <div class="var-box-val-slot">
              <span class="var-box-value">${!useBeforeVars ? afterVal : (beforeVal || "unbound")}</span>
              <span class="var-box-prev">${!useBeforeVars && beforeVal ? `(was ${beforeVal})` : ""}</span>
            </div>
          </div>
        </div>
      `;
    } else {
      stageHTML = `
        <div class="calc-stage-header">
          <span>Variable Assignment & Memory Binding</span>
          <span class="calc-stage-badge">${isCreated ? "Create" : "Update"}</span>
        </div>
        <div class="assign-animation-row">
          <div style="display:flex; flex-direction:column; gap:2px;">
            <span style="font-size:11px; color:var(--text-secondary); font-weight:700;">VALUE COMPUTED</span>
            <span class="anim-source-val">${afterVal}</span>
          </div>
          <span class="anim-move-arrow">──► moves into ──►</span>
          <div class="var-box-card ${!useBeforeVars ? "is-updated" : ""}" style="max-width:145px;">
            <div class="var-box-label">Variable <strong>${target}</strong></div>
            <div class="var-box-val-slot">
              <span class="var-box-value">${!useBeforeVars ? afterVal : (beforeVal || "unbound")}</span>
              <span class="var-box-prev">${!useBeforeVars && beforeVal ? `(was ${beforeVal})` : ""}</span>
            </div>
          </div>
        </div>
      `;
    }

    this.visualCalcStage.innerHTML = stageHTML;
  }

  /* PHASE 2: Visually show when a negative value causes c to reset to zero */
  renderNegativeResetVisual(step, currentSubstep) {
    if (!this.negativeResetVisual) return;
    const op = step.operationDetail || {};
    const cond = step.condition;
    const isResetAssign = step.eventType === "ASSIGN" && op.target === "c" && op.afterVal === "0" && !op.isCreated;
    const isNegCondition = step.eventType === "CONDITION" && cond && cond.expr === "c < 0" && cond.result;

    if (!isResetAssign && !isNegCondition) {
      this.negativeResetVisual.classList.add("hidden");
      this.negativeResetVisual.innerHTML = "";
      return;
    }

    this.negativeResetVisual.classList.remove("hidden");
    const negVal = op.beforeVal || (cond ? cond.leftVal : "-2");

    this.negativeResetVisual.innerHTML = `
      <div class="neg-warning-header">
        <span class="neg-warning-icon">⚠️</span>
        <span>Negative Running Sum Detected (c = ${negVal} < 0)</span>
      </div>
      <div class="neg-reset-flow">
        <span class="neg-discarded-val">c = ${negVal} (Discarded)</span>
        <span class="neg-discard-arrow">──► Resetting to Zero ──►</span>
        <span class="zero-reset-box">c = 0 (Fresh Start)</span>
      </div>
      <p style="font-size:13px; color:#7f1d1d; margin:0; line-height:1.45;">
        <strong>Kadane's Reset Rule:</strong> A negative running total would reduce any subsequent continuous subarray sum. We discard the negative sum and reset <code>c</code> to <code>0</code> so the next number starts a clean subarray.
      </p>
    `;
  }

  /* PHASE 2: Show a variable as a labeled box containing its current value */
  renderVisualVariableBoxes(step, currentSubstep) {
    if (!this.teachVarsNowBox) return;
    const vars = step.variables || [];
    const beforeVarsMap = step.beforeVars || {};
    const useBeforeVars = Boolean(currentSubstep && currentSubstep.varsBeforeStep);
    const op = step.operationDetail || {};

    const scalarVars = vars.filter((v) => !Array.isArray(v.rawValue));

    if (!scalarVars.length) {
      this.teachVarsNowBox.innerHTML = `<span style="color:var(--text-muted); font-size:13.5px;">No local variables created yet</span>`;
      return;
    }

    const cardsHTML = scalarVars
      .filter((v) => {
        if (useBeforeVars && v.name === op.target && op.isCreated) {
          return false;
        }
        return true;
      })
      .map((v) => {
        const isCreated = !useBeforeVars && v.status === "created";
        const isUpdated = !useBeforeVars && v.status === "updated";
        const isChanged = isCreated || isUpdated;
        const prevVal = beforeVarsMap[v.name];
        const displayVal = useBeforeVars && prevVal !== undefined ? prevVal : v.current;
        const isNegWarning = v.name === "c" && Number(displayVal) < 0;

        let statusBadge = "";
        if (isCreated) {
          statusBadge = `<span class="var-status-badge is-created">+ Created</span>`;
        } else if (isUpdated) {
          statusBadge = `<span class="var-status-badge is-updated">Updated</span>`;
        } else if (isNegWarning) {
          statusBadge = `<span class="var-status-badge is-negative">⚠ Negative</span>`;
        }

        return `
          <div class="var-box-card ${isCreated ? "is-created" : isUpdated ? "is-updated" : ""} ${isNegWarning ? "is-negative-warning" : ""}">
            <div class="var-box-label">
              <span>Variable</span>
              <strong>${this.escapeHTML(v.name)}</strong>
              ${statusBadge}
            </div>
            <div class="var-box-val-slot">
              <span class="var-box-value">${this.escapeHTML(displayVal)}</span>
              ${isUpdated && prevVal !== undefined ? `<span class="var-box-prev">(was ${prevVal})</span>` : ""}
            </div>
          </div>
        `;
      })
      .join("");

    this.teachVarsNowBox.innerHTML = `<div class="var-boxes-grid">${cardsHTML}</div>`;
  }

  renderQuickIterationBar() {
    if (!this.iterationPillsBar) return;
    this.iterationPillsBar.innerHTML = "";
    let activePillEl = null;

    const activeGroupIdx = this.stepToGroupIdx.get(this.currentStepIdx) ?? 0;
    const activeGroup = this.iterationGroups[activeGroupIdx];

    if (this.activeIterationBadge && activeGroup) {
      this.activeIterationBadge.textContent = `${activeGroup.badge} (${activeGroupIdx + 1}/${this.iterationGroups.length})`;
    }

    this.iterationGroups.forEach((grp, gIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      const isActive = gIdx === activeGroupIdx;
      const isPast = gIdx < activeGroupIdx;
      btn.className = `iter-pill-btn ${isActive ? "is-active-iter-pill" : isPast ? "is-past-iter-pill" : ""}`;
      if (isActive) {
        activePillEl = btn;
      }
      btn.textContent = grp.pillLabel;
      btn.title = `${grp.title} (Steps ${grp.startStepIdx + 1}–${grp.endStepIdx + 1})`;
      btn.addEventListener("click", () => {
        this.stopAutoPlay();
        this.goToStep(grp.startStepIdx);
      });
      this.iterationPillsBar.appendChild(btn);
    });

    if (activePillEl && this.iterationPillsBar.scrollWidth > this.iterationPillsBar.clientWidth) {
      const bar = this.iterationPillsBar;
      const targetLeft =
        activePillEl.offsetLeft - bar.offsetLeft - bar.clientWidth / 2 + activePillEl.clientWidth / 2;
      bar.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    }
  }

  renderThonnyExpressionStepper(step) {
    if (!this.thonnyExprBox) return;
    if (!this.showAdvanced) {
      this.thonnyExprBox.classList.add("hidden");
      return;
    }
    this.thonnyExprBox.classList.remove("hidden");
    const frames =
      step.exprFrames && step.exprFrames.length
        ? step.exprFrames
        : [{ expr: step.codeText, focus: "Execute statement", shortCircuited: false }];

    const subIdx = Math.max(0, Math.min(this.currentSubStepIdx, frames.length - 1));
    const activeFrame = frames[subIdx];
    const hasShortCircuit = frames.some((f) => f.shortCircuited);

    this.thonnyExprBox.classList.toggle("is-short-circuited", Boolean(activeFrame.shortCircuited || hasShortCircuit));
    this.thonnySubStepCounter.textContent = `Sub-Expr ${subIdx + 1} of ${frames.length}`;
    this.thonnyLiveCode.innerHTML = this.highlightPythonSyntax(activeFrame.expr);
    this.thonnyFocusNote.innerHTML = this.formatMarkdown(
      activeFrame.shortCircuited
        ? `⚡ **Short-Circuit Activated:** ${activeFrame.focus}`
        : `🔍 **Sub-Expression Step:** ${activeFrame.focus}`
    );

    this.thonnyTrailChips.innerHTML = "";
    frames.forEach((frame, idx) => {
      if (idx > 0) {
        const arrow = document.createElement("span");
        arrow.className = "thonny-arrow";
        arrow.textContent = "→";
        this.thonnyTrailChips.appendChild(arrow);
      }
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = `thonny-chip ${idx === subIdx ? "is-active-substep" : ""} ${
        frame.shortCircuited ? "is-sc-chip" : ""
      }`;
      chip.textContent = frame.expr;
      chip.title = frame.focus;
      chip.addEventListener("click", () => {
        this.stopAutoPlay();
        this.currentSubStepIdx = idx;
        this.renderStep();
      });
      this.thonnyTrailChips.appendChild(chip);
    });
  }

  /* =========================================================
     AREA 3: SCOPE ISOLATION & STACK/HEAP MEMORY MODEL
     ========================================================= */
  renderArea3MemoryAndScopes(step, currentSubstep) {
    this.scopeFramesContainer.innerHTML = "";
    this.heapObjectsContainer.innerHTML = "";
    this.visualListsContainer.innerHTML = "";

    const scopeFrames = step.scopeFrames || [];
    const memoryModel = step.memoryModel || { heapObjects: [], gcObjects: [], totalUnreferencedCount: 0 };
    const useBeforeVars = Boolean(currentSubstep && currentSubstep.varsBeforeStep);
    const beforeVarsMap = step.beforeVars || {};

    // 1. Render Scope Isolation Cards (Show Local Scope on top of Global Scope, like a call stack)
    const orderedScopes = [...scopeFrames].reverse();
    if (orderedScopes.length === 0) {
      this.scopeFramesContainer.innerHTML = `<div style="color:var(--text-muted); font-size:13px;">No active scopes</div>`;
    } else {
      orderedScopes.forEach((sc) => {
        const isLocal = sc.scopeType === "LOCAL";
        const card = document.createElement("div");
        card.className = `scope-frame-card ${isLocal ? "is-local-scope" : "is-global-scope"} ${
          sc.isActive ? "is-active-scope" : "is-inactive-scope"
        }`;

        const headerBadge = sc.isActive ? "ACTIVE SCOPE" : "PARENT SCOPE";
        const vars = sc.variables || [];

        let rowsHTML = "";
        if (vars.length === 0) {
          rowsHTML = `
            <div class="scope-var-row" style="grid-template-columns: 1fr; color:var(--text-muted); text-align:center;">
              No variables bound in this scope yet
            </div>
          `;
        } else {
          rowsHTML = vars
            .filter((v) => {
              if (useBeforeVars && sc.isActive && v.status === "created") {
                return false;
              }
              return true;
            })
            .map((v) => {
              const isChanged = !useBeforeVars && sc.isActive && (v.status === "created" || v.status === "updated");
              const pill =
                isChanged && v.status === "created"
                  ? `<span class="changed-pill">New</span>`
                  : isChanged && v.status === "updated"
                  ? `<span class="changed-pill">Changed</span>`
                  : "";
              const currentVal = useBeforeVars && sc.isActive && beforeVarsMap[v.name] !== undefined
                ? beforeVarsMap[v.name]
                : v.current;
              const valPreview = Array.isArray(v.rawValue)
                ? `list[${v.rawValue.length}]`
                : `${v.type}: ${currentVal}`;
              return `
                <div class="scope-var-row ${isChanged ? "var-row-changed" : ""}">
                  <span class="var-name-cell">${this.escapeHTML(v.name)}${pill}</span>
                  <span class="ref-arrow-badge" title="Variable '${this.escapeHTML(
                    v.name
                  )}' points to Heap Address ${this.escapeHTML(v.address || "@0x1000")}">
                    ──► ${this.escapeHTML(v.address || "@0x1000")}
                  </span>
                  <span class="var-val-preview" title="${this.escapeHTML(currentVal)}">
                    ${this.escapeHTML(valPreview)}
                  </span>
                </div>
              `;
            })
            .join("");
        }

        card.innerHTML = `
          <div class="scope-frame-header">
            <span>${this.escapeHTML(sc.title)}</span>
            <span class="scope-active-tag">${headerBadge}</span>
          </div>
          <div class="scope-vars-list">${rowsHTML}</div>
        `;
        this.scopeFramesContainer.appendChild(card);
      });
    }

    // 2. Render Heap Memory Objects + Task 3.3 Visual Garbage Collection
    const activeHeap = memoryModel.heapObjects || [];
    const gcHeap = memoryModel.gcObjects || [];
    const totalGC = memoryModel.totalUnreferencedCount || gcHeap.length;

    if (this.btnToggleGC) {
      this.btnToggleGC.textContent = this.showGCObjects
        ? `Hide GC'd (${totalGC})`
        : `Show GC'd (${totalGC})`;
    }

    const objectsToRender = this.showGCObjects ? [...activeHeap, ...gcHeap] : activeHeap;

    if (objectsToRender.length === 0) {
      this.heapObjectsContainer.innerHTML = `
        <div style="color:var(--text-muted); font-size:13px; padding:8px;">
          No active objects on the heap yet
        </div>
      `;
    } else {
      objectsToRender.forEach((obj) => {
        const isGC = obj.gcStatus === "unreferenced" || obj.refCount === 0;
        const card = document.createElement("div");
        card.className = `heap-obj-card ${obj.isHighlighted && !isGC ? "is-heap-highlighted" : ""} ${
          isGC ? "is-gc-unreferenced" : ""
        }`;

        const refText = isGC
          ? `0 refs • GC`
          : `${obj.refCount} ref${obj.refCount > 1 ? "s" : ""}`;

        card.innerHTML = `
          <div class="heap-left">
            <span class="heap-addr-tag">${this.escapeHTML(obj.address)}</span>
            <span class="heap-type-tag">${this.escapeHTML(obj.type)}</span>
            <span class="heap-val-text">${this.escapeHTML(obj.repr)}</span>
          </div>
          <span class="heap-ref-badge ${isGC ? "is-gc-badge" : ""}" title="${
          isGC
            ? "Unreferenced object — eligible for Python Garbage Collection"
            : `Referenced by: ${(obj.referencedBy || []).join(", ")}`
        }">
            ${this.escapeHTML(refText)}
          </span>
        `;
        this.heapObjectsContainer.appendChild(card);
      });
    }

    // 3. Render Visual Array Cells with Index Pointers (`i`, `left`, `mid`, `right`) OR Instance List Attributes (`s.items`)
    const allVars = step.variables || [];
    const listVars = [];
    const seenListLabels = new Set();

    for (const sc of scopeFrames) {
      for (const v of sc.variables || []) {
        if (Array.isArray(v.rawValue) && !seenListLabels.has(v.name)) {
          seenListLabels.add(v.name);
          listVars.push({ name: v.name, address: v.address, rawValue: v.rawValue });
        } else if (v.rawValue && typeof v.rawValue === "object" && !Array.isArray(v.rawValue)) {
          for (const [attrK, attrV] of Object.entries(v.rawValue)) {
            if (attrK !== "__class__" && Array.isArray(attrV)) {
              const label = `${v.name}.${attrK}`;
              if (!seenListLabels.has(label)) {
                seenListLabels.add(label);
                listVars.push({ name: label, address: v.address, rawValue: attrV });
              }
            }
          }
        }
      }
    }

    const getScalarInt = (name) => {
      const found = allVars.find((v) => v.name === name && typeof v.rawValue === "number");
      return found ? found.rawValue : null;
    };

    const iIdx = getScalarInt("i");
    const leftIdx = getScalarInt("left");
    const midIdx = getScalarInt("mid");
    const rightIdx = getScalarInt("right");

    listVars.forEach((lv) => {
      const box = document.createElement("div");
      const cells =
        lv.rawValue.length === 0
          ? `<div style="color:var(--text-muted); font-size:12.5px; padding:4px 8px;">[ ] (empty list)</div>`
          : lv.rawValue
              .map((val, idx) => {
                const ptrLabels = [];
                if (iIdx === idx) ptrLabels.push(`i=${idx}`);
                if (leftIdx === idx) ptrLabels.push(`L`);
                if (midIdx === idx) ptrLabels.push(`mid`);
                if (rightIdx === idx) ptrLabels.push(`R`);
                if (idx === lv.rawValue.length - 1 && lv.name.includes(".items")) ptrLabels.push(`top (-1)`);
                const isCurrent = ptrLabels.length > 0;
                const idxLabel = isCurrent ? ptrLabels.join("·") : idx;

                return `
                  <div class="list-item-cell ${isCurrent ? "is-active-num" : ""}">
                    <span class="cell-idx">${this.escapeHTML(String(idxLabel))}</span>
                    <span class="cell-val">${this.escapeHTML(String(val))}</span>
                  </div>
                `;
              })
              .join("");

      box.innerHTML = `
        <div class="list-card-title">Heap List ${this.escapeHTML(lv.address || "@0x2000")} (${this.escapeHTML(
        lv.name
      )}):</div>
        <div class="list-cells">${cells}</div>
      `;
      this.visualListsContainer.appendChild(box);
    });

    // 4. Render Live Console Output (`print`) when program prints values
    if (this.stdoutSection && this.stdoutBox) {
      const lines = step.stdout || [];
      if (lines.length > 0) {
        this.stdoutSection.classList.remove("hidden");
        this.stdoutBox.textContent = lines.join("\n");
      } else {
        this.stdoutSection.classList.add("hidden");
        this.stdoutBox.textContent = "";
      }
    }
  }

  /* =========================================================
     AREA 4: COMPLETE CODE ITERATION & ALL-STEPS DRY-RUN EXPLORER
     ========================================================= */
  renderArea4AllIterations() {
    if (!this.iterationsGroupedContainer || !this.dryrunTableBody) return;
    const steps = (this.traceResult && this.traceResult.steps) || [];
    const activeGroupIdx = this.stepToGroupIdx.get(this.currentStepIdx) ?? 0;

    if (this.iterationsSummaryBadge) {
      this.iterationsSummaryBadge.textContent = `${this.iterationGroups.length} Iterations / Phases • ${steps.length} Total Steps`;
    }

    // 1. Render Grouped Iteration / Phase Cards
    this.iterationsGroupedContainer.innerHTML = "";
    this.iterationGroups.forEach((grp, gIdx) => {
      const isActiveGroup = gIdx === activeGroupIdx;
      const isCollapsed = this.collapsedGroupIds.has(grp.id);

      const card = document.createElement("div");
      card.className = `iter-group-card ${isActiveGroup ? "is-active-group" : ""}`;

      const header = document.createElement("div");
      header.className = "iter-group-header";
      header.innerHTML = `
        <div class="iter-group-left">
          <span class="iter-group-badge">${this.escapeHTML(grp.badge)}</span>
          <span class="iter-group-title">${this.escapeHTML(grp.title)}</span>
        </div>
        <div class="iter-group-right">
          <span class="iter-group-state-pill" title="${this.escapeHTML(grp.endStateSummary)}">
            ${this.escapeHTML(grp.endStateSummary)}
          </span>
          <span class="iter-group-step-range">
            Steps ${grp.startStepIdx + 1}–${grp.endStepIdx + 1} ${isCollapsed ? "▸" : "▾"}
          </span>
        </div>
      `;

      header.addEventListener("click", () => {
        if (this.collapsedGroupIds.has(grp.id)) {
          this.collapsedGroupIds.delete(grp.id);
        } else {
          this.collapsedGroupIds.add(grp.id);
        }
        this.renderArea4AllIterations();
      });

      card.appendChild(header);

      if (!isCollapsed) {
        const listEl = document.createElement("div");
        listEl.className = "iter-group-steps-list";

        grp.steps.forEach(({ step: st, idx: sIdx }) => {
          const isCurrent = sIdx === this.currentStepIdx;
          const row = document.createElement("div");
          row.className = `iter-step-row ${isCurrent ? "is-current-step-row" : ""}`;

          const cleanTitle = st.teacherLesson
            ? st.teacherLesson.title.replace(/^Step \d+:\s*/i, "")
            : st.changedSummary || "Execute statement";

          row.innerHTML = `
            <span class="iter-step-num">Step ${sIdx + 1}</span>
            <span class="iter-step-line">Line ${st.line}</span>
            <code class="iter-step-code">${this.highlightPythonSyntax(st.codeText)}</code>
            <span class="iter-step-meaning">${this.escapeHTML(cleanTitle)}</span>
            <span class="iter-step-delta" title="${this.escapeHTML(st.changedSummary || "")}">
              ${this.escapeHTML(st.changedSummary || "—")}
            </span>
          `;

          row.addEventListener("click", () => {
            this.stopAutoPlay();
            this.goToStep(sIdx);
          });

          listEl.appendChild(row);
        });

        card.appendChild(listEl);
      }

      this.iterationsGroupedContainer.appendChild(card);
    });

    // 2. Render Full All-Steps Dry-Run Table (Step 1 -> N)
    this.dryrunTableBody.innerHTML = "";
    steps.forEach((st, sIdx) => {
      const isCurrent = sIdx === this.currentStepIdx;
      const gIdx = this.stepToGroupIdx.get(sIdx) ?? 0;
      const grp = this.iterationGroups[gIdx];
      const tr = document.createElement("tr");
      if (isCurrent) tr.className = "is-active-dryrun-row";

      const scopeText =
        st.scopeType === "LOCAL" || (st.functionName && st.functionName !== "Global Scope")
          ? `Local (${st.functionName.split("(")[0]})`
          : "Global";

      const actionDesc = st.teacherLesson
        ? st.teacherLesson.title.replace(/^Step \d+:\s*/i, "")
        : st.changedSummary || "";

      tr.innerHTML = `
        <td class="dryrun-mono"><strong>#${sIdx + 1}</strong></td>
        <td class="dryrun-mono">L${st.line}</td>
        <td class="dryrun-mono">${this.escapeHTML(grp ? grp.pillLabel : "—")}</td>
        <td class="dryrun-mono">${this.escapeHTML(scopeText)}</td>
        <td class="dryrun-mono"><code>${this.highlightPythonSyntax(st.codeText)}</code></td>
        <td>${this.escapeHTML(actionDesc)}</td>
        <td class="dryrun-mono">${this.escapeHTML(this.formatCompactStateForStep(st))}</td>
      `;

      tr.addEventListener("click", () => {
        this.stopAutoPlay();
        this.goToStep(sIdx);
      });

      this.dryrunTableBody.appendChild(tr);
    });
  }

  /* =========================================================
     OPTIONAL ADVANCED VIEW (Hidden Unless Clicked)
     ========================================================= */
  renderAdvancedDrawer(step, total) {
    this.advMetadataLabel.textContent = `Scope: ${step.functionName} (${step.scopeType || "LOCAL"}) | Event: ${step.eventType} | Line ${step.line} | Step ${step.stepIndex}/${total}`;
    this.advTechnicalText.innerHTML = this.formatMarkdown(step.explanations.whatTechnical);
    this.advSymbolsText.innerHTML = this.formatMarkdown(step.explanations.symbolsMeaning);

    const varsDetail = (step.variables || [])
      .map(
        (v) =>
          `• <code>${v.name}</code> → <code>${v.address || "@0x1000"}</code> (${v.type}): ${
            v.previous
          } → <strong>${v.current}</strong> [${v.status}]`
      )
      .join("<br>");
    this.advFullVarsText.innerHTML = varsDetail || "No local variables.";

    this.renderFlowchartSVG(step);
  }

  renderFlowchartSVG(step) {
    const cfg = this.traceResult.cfg;
    if (!cfg || !cfg.nodes.length) return;

    const nodeW = 185;
    const nodeH = 30;
    const vGap = 44;
    const svgW = 320;
    const svgH = Math.max(180, cfg.nodes.length * vGap + 30);

    const positions = {};
    cfg.nodes.forEach((n, idx) => {
      positions[n.id] = { x: svgW / 2, y: 26 + idx * vGap };
    });

    let edgesSVG = "";
    cfg.edges.forEach((edge) => {
      const p1 = positions[edge.from];
      const p2 = positions[edge.to];
      if (!p1 || !p2) return;
      const stroke = edge.isBackEdge ? "#2563eb" : "#cbd5e1";
      if (edge.isBackEdge || p2.y <= p1.y) {
        edgesSVG += `<path d="M ${p1.x - nodeW / 2} ${p1.y} C 22 ${p1.y}, 22 ${p2.y}, ${p2.x - nodeW / 2} ${p2.y}" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="4 2" />`;
      } else {
        edgesSVG += `<line x1="${p1.x}" y1="${p1.y + nodeH / 2}" x2="${p2.x}" y2="${p2.y - nodeH / 2}" stroke="${stroke}" stroke-width="1.5" />`;
      }
    });

    let nodesSVG = "";
    cfg.nodes.forEach((node) => {
      const pos = positions[node.id];
      const isCurrent = node.line === step.line;
      const fill = isCurrent ? "#dbeafe" : "#ffffff";
      const stroke = isCurrent ? "#2563eb" : "#cbd5e1";
      nodesSVG += `
        <g transform="translate(${pos.x - nodeW / 2}, ${pos.y - nodeH / 2})">
          <rect width="${nodeW}" height="${nodeH}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${isCurrent ? 2 : 1.2}" />
          <text x="${nodeW / 2}" y="${nodeH / 2 + 4}" text-anchor="middle" fill="#0f172a" font-family="JetBrains Mono, monospace" font-size="10" font-weight="${isCurrent ? "700" : "500"}">
            ${this.escapeHTML(node.label)}
          </text>
        </g>
      `;
    });

    this.flowchartSvgWrap.innerHTML = `<svg width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}">${edgesSVG}${nodesSVG}</svg>`;
  }

  formatMarkdown(str) {
    if (!str) return "";
    let s = String(str);
    // Convert markdown bold: **text** -> <strong>text</strong>
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Convert markdown inline code: `code` -> <code>code</code>
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Convert newlines to linebreaks
    s = s.replace(/\r?\n/g, "<br>");
    return s;
  }

  escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.teachMeApp = new TeachMeCodeApp();
});
