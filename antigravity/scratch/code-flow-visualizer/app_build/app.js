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

    this.currentPresetKey = "stack_class";
    const defaultProg =
      window.PRELOADED_PROGRAMS[this.currentPresetKey] ||
      window.PRELOADED_PROGRAMS["max_subarray"];
    this.sourceCode = defaultProg.code;
    this.inputCode = defaultProg.defaultInput || "";

    this.traceResult = null;
    this.iterationGroups = [];
    this.stepToGroupIdx = new Map();
    this.collapsedGroupIds = new Set();
    this.allGroupsCollapsed = false;
    this.iterationsViewMode = "grouped"; // "grouped" | "table"
    this.showIterationsPanel = true;

    this.currentStepIdx = 0;
    this.currentSubStepIdx = 0;
    this.showGCObjects = false;

    this.isPlaying = false;
    this.playInterval = null;
    this.playSpeedMs = 1200;
    this.isEditing = false;
    this.showAdvanced = false;

    this.initDOM();
    this.bindEvents();
    this.codeTextarea.value = this.sourceCode;
    this.analyzeAndRun();
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
    this.btnEditCode = document.getElementById("btnEditCode");
    this.btnAnalyzeCode = document.getElementById("btnAnalyzeCode");
    this.btnToggleIterations = document.getElementById("btnToggleIterations");
    this.btnToggleAdvanced = document.getElementById("btnToggleAdvanced");
    this.advancedViewPanel = document.getElementById("advancedViewPanel");

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
    this.teachScopeBadge = document.getElementById("teachScopeBadge");
    this.teachCodeBox = document.getElementById("teachCodeBox");
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
      this.goToStep(this.currentStepIdx - 1);
    });

    this.btnSubStep.addEventListener("click", () => {
      this.stopAutoPlay();
      this.advanceSubExpression();
    });

    this.btnNext.addEventListener("click", () => {
      this.stopAutoPlay();
      this.goToStep(this.currentStepIdx + 1);
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
      this.goToStep(0);
    });

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
      if (this.showAdvanced) {
        this.renderStep();
      }
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
        this.goToStep(this.currentStepIdx + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.stopAutoPlay();
        this.goToStep(this.currentStepIdx - 1);
      } else if (e.key === "F7") {
        e.preventDefault();
        this.stopAutoPlay();
        this.advanceSubExpression();
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

    // Populate end-of-iteration variable summary for each group
    this.iterationGroups.forEach((grp) => {
      const lastStep = grp.steps[grp.steps.length - 1].step;
      grp.endStateSummary = this.formatCompactStateForStep(lastStep);
    });
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

  goToStep(idx) {
    if (!this.traceResult || !this.traceResult.steps.length) return;
    this.currentStepIdx = Math.max(0, Math.min(idx, this.traceResult.steps.length - 1));
    const step = this.traceResult.steps[this.currentStepIdx];
    const frames = step.exprFrames || [];
    this.currentSubStepIdx = Math.max(0, frames.length - 1);
    this.renderStep();
  }

  advanceSubExpression() {
    if (!this.traceResult || !this.traceResult.steps.length) return;
    const step = this.traceResult.steps[this.currentStepIdx];
    const frames = step.exprFrames || [];

    if (frames.length > 1 && this.currentSubStepIdx < frames.length - 1) {
      this.currentSubStepIdx++;
      this.renderStep();
      return;
    }

    if (this.currentStepIdx < this.traceResult.steps.length - 1) {
      this.currentStepIdx++;
      this.currentSubStepIdx = 0;
      this.renderStep();
    } else {
      this.currentSubStepIdx = 0;
      this.renderStep();
    }
  }

  startAutoPlay() {
    if (!this.traceResult || !this.traceResult.steps.length) return;
    if (this.currentStepIdx >= this.traceResult.steps.length - 1) {
      this.currentStepIdx = 0;
      this.currentSubStepIdx = 0;
      this.renderStep();
    }
    this.isPlaying = true;
    this.btnAutoPlay.textContent = "⏸ Pause";

    this.playInterval = setInterval(() => {
      if (this.currentStepIdx < this.traceResult.steps.length - 1) {
        this.goToStep(this.currentStepIdx + 1);
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
    const isLocal = step.scopeType === "LOCAL" || (step.functionName && step.functionName !== "Global Scope");
    const scopeLabel = isLocal ? `LOCAL SCOPE: ${step.functionName.split("(")[0]}()` : "GLOBAL SCOPE";

    // Update Top Bar & Scope Indicators
    this.stepProgressLabel.textContent = `Step ${this.currentStepIdx + 1} of ${total}`;
    this.btnPrev.disabled = this.currentStepIdx <= 0;
    this.btnNext.disabled = this.currentStepIdx >= total - 1;

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

    this.renderArea1Code(step);
    this.renderArea2Teaching(step);
    this.renderArea3MemoryAndScopes(step);
    this.renderArea4AllIterations(step);

    if (this.showAdvanced) {
      this.renderAdvancedDrawer(step, total);
    }
  }

  /* =========================================================
     AREA 1: YOUR CODE (Highlight ONLY the current line)
     ========================================================= */
  renderArea1Code(step) {
    this.codeLinesContainer.innerHTML = "";
    let activeRowEl = null;

    this.traceResult.rawLines.forEach((rawLine, idx) => {
      const lineNum = idx + 1;
      const isCurrent = step.line === lineNum;

      const row = document.createElement("div");
      row.className = `code-row ${isCurrent ? "is-current-line" : "is-dimmed"}`;
      if (isCurrent) {
        activeRowEl = row;
      }

      row.innerHTML = `
        <div class="code-gutter">${lineNum}</div>
        <div class="code-syntax">${this.highlightPythonSyntax(rawLine)}</div>
      `;

      row.addEventListener("click", () => {
        const targetIdx = this.traceResult.steps.findIndex((s) => s.line === lineNum);
        if (targetIdx !== -1) {
          this.stopAutoPlay();
          this.goToStep(targetIdx);
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
    if (!line) return " ";
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

  /* =========================================================
     AREA 2: TEACHING AREA, QUICK ITERATION BAR & THONNY STEPPER
     ========================================================= */
  renderArea2Teaching(step) {
    const lesson = step.teacherLesson;

    // Render Quick Iteration / Phase Pills Bar
    this.renderQuickIterationBar();

    this.teachStepTitle.textContent = lesson.title;
    this.teachCodeBox.innerHTML = this.highlightPythonSyntax(step.codeText);

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

    this.teachMeaningText.innerHTML = this.formatMarkdown(lesson.whatItMeans);
    this.teachVarsNowBox.textContent = lesson.variableValuesNow;
    this.teachNextText.innerHTML = this.formatMarkdown(lesson.whatHappensNext);

    if (lesson.finalBanner) {
      this.finalAnswerBanner.classList.remove("hidden");
      this.finalAnswerHeading.textContent = `Final answer: ${lesson.finalBanner.answer}`;
      this.finalAnswerDetail.innerHTML = this.formatMarkdown(lesson.finalBanner.summary);
    } else {
      this.finalAnswerBanner.classList.add("hidden");
    }
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
  renderArea3MemoryAndScopes(step) {
    this.scopeFramesContainer.innerHTML = "";
    this.heapObjectsContainer.innerHTML = "";
    this.visualListsContainer.innerHTML = "";

    const scopeFrames = step.scopeFrames || [];
    const memoryModel = step.memoryModel || { heapObjects: [], gcObjects: [], totalUnreferencedCount: 0 };

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
            .map((v) => {
              const isChanged = sc.isActive && (v.status === "created" || v.status === "updated");
              const pill =
                isChanged && v.status === "created"
                  ? `<span class="changed-pill">New</span>`
                  : isChanged && v.status === "updated"
                  ? `<span class="changed-pill">Changed</span>`
                  : "";
              const valPreview = Array.isArray(v.rawValue)
                ? `list[${v.rawValue.length}]`
                : `${v.type}: ${v.current}`;
              return `
                <div class="scope-var-row ${isChanged ? "var-row-changed" : ""}">
                  <span class="var-name-cell">${this.escapeHTML(v.name)}${pill}</span>
                  <span class="ref-arrow-badge" title="Variable '${this.escapeHTML(
                    v.name
                  )}' points to Heap Address ${this.escapeHTML(v.address || "@0x1000")}">
                    ──► ${this.escapeHTML(v.address || "@0x1000")}
                  </span>
                  <span class="var-val-preview" title="${this.escapeHTML(v.current)}">
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
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&lt;br&gt;/g, "<br>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
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
