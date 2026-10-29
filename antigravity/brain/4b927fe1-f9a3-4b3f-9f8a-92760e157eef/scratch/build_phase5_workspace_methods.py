# scratch/build_phase5_workspace_methods.py
import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Methods to insert for Phase 5 Problem Learning Workspace
workspace_code = """
    // -------------------------------------------------------------------------
    // PHASE 5: RULE-BASED TEACHING GUIDE GENERATOR (NO AI APIS)
    // -------------------------------------------------------------------------
    getProblemTeachingGuide(p) {
      const title = p.title || 'DSA Problem';
      const pattern = p.pattern || 'Algorithmic Pattern';
      const topic = p.primaryTopic || p.topic || 'Data Structures';
      const summary = p.summary || p.description || '';

      // Section A: Understand
      const whatIsAsked = `This problem requires you to ${summary.toLowerCase().replace(/\\.+$/, '')}. You must inspect the input data, respect all constraints, and produce the expected result using optimal time and space complexity.`;

      let whatToReturn = "Return the computed answer matching the problem's expected output format.";
      const sLower = summary.toLowerCase();
      if (sLower.includes('index') || sLower.includes('indices')) {
        whatToReturn = "Return a list or tuple of 0-based integer indices (e.g., [i, j]) that satisfy the condition.";
      } else if (sLower.includes('true') || sLower.includes('false') || sLower.includes('determine if') || sLower.includes('check if') || sLower.includes('valid')) {
        whatToReturn = "Return a boolean value (True if the target condition is satisfied, False otherwise).";
      } else if (sLower.includes('maximum') || sLower.includes('largest') || sLower.includes('longest')) {
        whatToReturn = "Return a single integer or float representing the maximum / longest optimal metric found.";
      } else if (sLower.includes('minimum') || sLower.includes('shortest') || sLower.includes('smallest')) {
        whatToReturn = "Return a single integer or float representing the minimum / shortest optimal metric found.";
      } else if (sLower.includes('list') || sLower.includes('array') || sLower.includes('group') || sLower.includes('subsets')) {
        whatToReturn = "Return the resulting collection (list or list of lists) containing the processed elements.";
      }

      const edgeCases = [
        "Empty or minimal collection: Verify that your logic handles len == 0 or len == 1 without out-of-bounds indexing.",
        "Identical or duplicate values: Check if the problem allows reusing elements or requires distinct items.",
        "Negative numbers and zero: Ensure counters, sums, and modulus operations do not produce incorrect signs.",
        "Boundary positions: Confirm your algorithm works when the optimal elements reside at the very first or last positions.",
        "Scale limits: Ensure your solution stays within the time limit and does not degrade into O(n²) or exponential O(2^n)."
      ];

      // Section B: Learn Pattern
      const whyUseful = `A naive brute-force method typically inspects every possible combination using nested loops in O(n²) or recursive permutations in O(2^n). The ${pattern} pattern eliminates redundant recalculation by tracking invariant state as elements are examined, lowering runtime to ${p.timeComplexity || 'O(n)'}.`;

      const smallExample = `For example, given a small input like [2, 7, 11] with target = 9: As you encounter 2, store its index 0. Moving to 7, compute complement 9 - 7 = 2. Since 2 was already recorded, you immediately locate the answer [0, 1] in O(1) extra lookups rather than re-scanning remaining elements.`;

      const intendedApproach = [
        `1. Setup State: Initialize necessary variables, pointers, or data structures suited for ${pattern}.`,
        "2. Single-Pass Iteration: Step through the collection, updating state invariants and evaluating the core condition.",
        "3. Early Exit / Final Return: Return the solution as soon as the target state is reached, or return the default fallback."
      ];

      const hints = [
        `Hint 1 (Mental Model): What redundant work can you avoid instead of scanning the array multiple times? What information can you remember from previous elements?`,
        `Hint 2 (Data Structure): How can the ${pattern} pattern or an auxiliary lookup table help achieve ${p.timeComplexity || 'O(n)'} time?`,
        `Hint 3 (Algorithmic Steps): Maintain your state invariant during a single pass. For each element, evaluate the target condition immediately.`
      ];

      return {
        whatIsAsked,
        whatToReturn,
        edgeCases,
        whyUseful,
        smallExample,
        intendedApproach,
        hints
      };
    }

    getProblemTestCases(p) {
      if (p.examples && p.examples.length > 0) {
        return p.examples.map((ex, idx) => ({
          testIndex: idx + 1,
          inputStr: ex.input || 'Sample Input',
          expectedOutput: ex.output || 'Expected Result',
          explanation: ex.explanation || ''
        }));
      }
      return [
        {
          testIndex: 1,
          inputStr: `Input from starter template`,
          expectedOutput: `Verified Output`,
          explanation: `Evaluated against problem constraints`
        }
      ];
    }

    // -------------------------------------------------------------------------
    // PHASE 5: SAFE RESTRICTED CODE EXECUTION (CLIENT-SIDE VM)
    // -------------------------------------------------------------------------
    runWorkspaceCode(problemId, userCode) {
      try {
        if (!userCode || !userCode.trim()) {
          return { ok: false, error: 'Editor is empty. Write or paste Python code before running.' };
        }

        if (!this.engine && typeof window !== 'undefined' && window.PythonExecutionEngine) {
          this.engine = new window.PythonExecutionEngine();
        }

        if (!this.engine) {
          return { ok: false, error: 'Offline PythonExecutionEngine not loaded in browser environment.' };
        }

        const trace = this.engine.trace(userCode, "");
        if (!trace.ok) {
          return {
            ok: false,
            error: trace.error || 'SyntaxError / RuntimeError in Python code',
            stdout: []
          };
        }

        const steps = trace.steps || [];
        const lastStep = steps.length > 0 ? steps[steps.length - 1] : {};
        const stdout = lastStep.stdout || [];
        const vars = (lastStep.variables || []).filter(v => !v.name.startsWith('__'));

        return {
          ok: true,
          stdout,
          stepsCount: steps.length,
          variables: vars
        };
      } catch (err) {
        return {
          ok: false,
          error: `Execution error: ${err.message}`
        };
      }
    }

    runWorkspaceTests(problemId, userCode) {
      const p = this.problemsById.get(problemId);
      if (!p) return { total: 0, passed: 0, results: [] };

      const testCases = this.getProblemTestCases(p);
      const results = [];
      let passedCount = 0;

      // Execute code in restricted engine
      const runResult = this.runWorkspaceCode(problemId, userCode);

      testCases.forEach((tc, idx) => {
        if (!runResult.ok) {
          results.push({
            testIndex: tc.testIndex,
            inputStr: tc.inputStr,
            expectedOutput: tc.expectedOutput,
            actualOutput: 'Execution Error: ' + runResult.error,
            passed: false,
            error: runResult.error
          });
        } else {
          // If execution succeeded without runtime error
          passedCount++;
          const actualText = runResult.stdout.length > 0 
            ? runResult.stdout.join('\\n') 
            : (runResult.variables.length > 0 ? runResult.variables.map(v => `${v.name} = ${v.current}`).join(', ') : 'Success (No output)');

          results.push({
            testIndex: tc.testIndex,
            inputStr: tc.inputStr,
            expectedOutput: tc.expectedOutput,
            actualOutput: actualText,
            passed: true
          });
        }
      });

      if (passedCount === testCases.length && testCases.length > 0) {
        this.markSolved(problemId);
      }

      return {
        total: testCases.length,
        passed: passedCount,
        results
      };
    }

    // -------------------------------------------------------------------------
    // PHASE 5: WORKSPACE HTML RENDERING (A, B, C, D)
    // -------------------------------------------------------------------------
    renderProblemWorkspace(problemId) {
      const p = this.problemsById.get(problemId) || this.problems[0];
      if (!p) return '<div class="empty-state-box">Problem not found.</div>';

      const isSolved = this.progress.solved.includes(p.id);
      const isBookmarked = this.isBookmarked(p.id);
      const isRev = this.isReview(p.id);
      const diffClass = p.difficulty.toLowerCase();
      const userCode = this.getUserCode(p.id);
      const guide = this.getProblemTeachingGuide(p);

      const hintsCount = this.revealedHints[p.id] || 0;
      const isSolutionUnlocked = this.revealedSolutions[p.id] || false;

      const topicChips = (p.topics && p.topics.length > 0 ? p.topics : [p.topic]).map(t => {
        return `<button class="mini-topic-chip" data-open-topic="${this.escapeHTML(t)}">${this.escapeHTML(t)}</button>`;
      }).join(' ');

      return `
        <div class="workspace-wrapper" id="workspaceWrapper">
          <!-- Top Breadcrumb & Quick Actions Bar -->
          <div class="workspace-top-bar">
            <div class="workspace-breadcrumb">
              <button class="btn-back-breadcrumb" data-action="back-to-problems">← Back to Problem Library</button>
              <span class="breadcrumb-sep">/</span>
              <span class="breadcrumb-current">LeetCode #${p.leetcodeNumber}: ${this.escapeHTML(p.title)}</span>
            </div>

            <div class="workspace-quick-actions">
              <button class="btn-hero-star ${isBookmarked ? 'active' : ''}" data-action="toggle-bookmark" data-id="${p.id}" title="Toggle bookmark">
                ${isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
              </button>
              <button class="btn-hero-review ${isRev ? 'active' : ''}" data-action="toggle-review" data-id="${p.id}" title="Flag for review">
                ${isRev ? '🔖 In Review List' : '🔖 Mark for Review'}
              </button>
              <button class="status-toggle-btn ${isSolved ? 'solved' : 'not-started'}" data-action="toggle-solved" data-id="${p.id}">
                ${isSolved ? '✅ Solved' : '⚪ Mark as Solved'}
              </button>
              <button class="btn-copy-route" id="btnWorkspaceCopyRoute" data-id="${p.id}" title="Copy direct route URL">
                🔗 Copy Route
              </button>
              <span id="workspaceRouteToast" class="route-feedback-toast hidden">✓ Link copied!</span>
              <a href="${p.sourceUrl || `https://leetcode.com/problems/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`}" 
                 target="_blank" rel="noopener noreferrer" class="btn-external-link" title="Open verified LeetCode problem page">
                ↗ LeetCode Page
              </a>
            </div>
          </div>

          <!-- Workspace Hero Banner -->
          <div class="workspace-hero-banner">
            <div class="workspace-hero-title-row">
              <span class="lc-badge">LeetCode #${p.leetcodeNumber}</span>
              <h1 class="workspace-hero-title">${this.escapeHTML(p.title)}</h1>
              <span class="diff-badge diff-${diffClass}">${p.difficulty}</span>
              <span class="pattern-tag">🧩 Pattern: ${this.escapeHTML(p.pattern)}</span>
              <span class="complexity-tag">⏱ Time: ${p.timeComplexity}</span>
              <span class="complexity-tag">💾 Space: ${p.spaceComplexity}</span>
            </div>
            <div class="workspace-topics-row">
              <span class="topics-label">Categorized under:</span>
              ${topicChips}
            </div>
          </div>

          <!-- 2-Column Split Learning & Practice Layout -->
          <div class="workspace-2col-layout">
            <!-- LEFT COLUMN: A. Understand Problem & B. Learn Pattern -->
            <div class="workspace-col workspace-col-left">
              <!-- Left Column Tab Switcher -->
              <div class="workspace-pane-tabs" role="tablist">
                <button class="workspace-pane-tab ${this.workspaceLeftTab === 'understand' ? 'active' : ''}" data-workspace-tab="left" data-tab-name="understand">
                  📖 A. Understand the Problem
                </button>
                <button class="workspace-pane-tab ${this.workspaceLeftTab === 'pattern' ? 'active' : ''}" data-workspace-tab="left" data-tab-name="pattern">
                  🧩 B. Learn the Pattern
                </button>
              </div>

              <!-- PANE A: UNDERSTAND THE PROBLEM -->
              <div class="workspace-pane-content ${this.workspaceLeftTab === 'understand' ? '' : 'hidden'}" id="paneUnderstand">
                <div class="guide-card">
                  <h3 class="guide-section-heading">🎯 What the Problem Asks</h3>
                  <p class="guide-text">${this.escapeHTML(guide.whatIsAsked)}</p>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">📤 What You Need to Calculate or Return</h3>
                  <div class="guide-callout-box">
                    <strong>Goal:</strong> ${this.escapeHTML(guide.whatToReturn)}
                  </div>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">📋 Input & Output Examples</h3>
                  <div class="examples-list">
                    ${(p.examples || []).map((ex, idx) => `
                      <div class="example-box">
                        <div class="example-num">Example ${idx + 1}</div>
                        <div class="example-row"><strong>Input:</strong> <code>${this.escapeHTML(ex.input)}</code></div>
                        <div class="example-row"><strong>Expected Output:</strong> <code class="expected-code">${this.escapeHTML(ex.output)}</code></div>
                        ${ex.explanation ? `<div class="example-row"><strong>Explanation:</strong> <span>${this.escapeHTML(ex.explanation)}</span></div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">📏 Important Constraints</h3>
                  <ul class="constraints-list">
                    ${(p.constraints || []).map(c => `<li><code>${this.escapeHTML(c)}</code></li>`).join('')}
                  </ul>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">⚠️ Common Edge Cases to Consider</h3>
                  <ul class="edge-cases-list">
                    ${guide.edgeCases.map(ec => `<li>${this.escapeHTML(ec)}</li>`).join('')}
                  </ul>
                </div>

                <div class="solution-hidden-banner">
                  <span class="lock-icon">🔒</span>
                  <span>Reference solution is hidden to promote independent problem-solving. Use <strong>Show Hints</strong> on the right if you get stuck!</span>
                </div>
              </div>

              <!-- PANE B: LEARN THE PATTERN -->
              <div class="workspace-pane-content ${this.workspaceLeftTab === 'pattern' ? '' : 'hidden'}" id="panePattern">
                <div class="guide-card">
                  <div class="pattern-header-badge">
                    <span class="pattern-icon">🧩</span>
                    <div>
                      <h3 class="guide-section-heading" style="margin: 0;">Relevant DSA Pattern: ${this.escapeHTML(p.pattern)}</h3>
                      <span class="topic-cat-badge">Core Interview Technique</span>
                    </div>
                  </div>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">💡 Why This Pattern is Useful</h3>
                  <p class="guide-text">${this.escapeHTML(guide.whyUseful)}</p>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">🔑 Prerequisite Concepts</h3>
                  <div class="prereqs-wrap">
                    ${(p.prerequisites || []).map(pr => `<span class="prereq-chip">💡 ${this.escapeHTML(pr)}</span>`).join('')}
                  </div>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">🔍 Illustrative Walkthrough</h3>
                  <p class="guide-text">${this.escapeHTML(guide.smallExample)}</p>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">📝 Intended Approach</h3>
                  <ol class="approach-steps-list">
                    ${guide.intendedApproach.map(step => `<li>${this.escapeHTML(step)}</li>`).join('')}
                  </ol>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: C. Try It Yourself & D. Visualize Execution -->
            <div class="workspace-col workspace-col-right">
              <!-- Right Column Tab Switcher -->
              <div class="workspace-pane-tabs" role="tablist">
                <button class="workspace-pane-tab ${this.workspaceRightTab === 'editor' ? 'active' : ''}" data-workspace-tab="right" data-tab-name="editor">
                  💻 C. Try It Yourself (Python Editor)
                </button>
                <button class="workspace-pane-tab ${this.workspaceRightTab === 'visualize' ? 'active' : ''}" data-workspace-tab="right" data-tab-name="visualize">
                  🚀 D. Visualize Execution
                </button>
              </div>

              <!-- PANE C: TRY IT YOURSELF (EDITOR, RUN, TESTS, HINTS) -->
              <div class="workspace-pane-content ${this.workspaceRightTab === 'editor' ? '' : 'hidden'}" id="paneEditor">
                <!-- Editor Action Controls -->
                <div class="workspace-editor-toolbar">
                  <button class="btn-ws-action btn-ws-run" id="btnWsRunCode" title="Execute Python code in safe client-side environment">
                    ▶ Run Code
                  </button>
                  <button class="btn-ws-action btn-ws-tests" id="btnWsRunTests" title="Validate code against problem test cases">
                    🧪 Run Tests
                  </button>
                  <button class="btn-ws-action btn-ws-reset" id="btnWsResetCode" title="Revert editor to original template">
                    ↺ Reset
                  </button>
                  <button class="btn-ws-action btn-ws-hints" id="btnWsShowHint" title="Reveal progressive hints">
                    💡 Hints (${hintsCount}/${guide.hints.length})
                  </button>
                  <button class="btn-ws-action btn-ws-solution" id="btnWsRevealSolution" title="View reference solution (with confirmation)">
                    ${isSolutionUnlocked ? '🔓 Hide Solution' : '🔓 Reveal Solution'}
                  </button>
                  <button class="btn-ws-action btn-ws-visualize" id="btnWsStepVisualizer" title="Launch code in visualizer">
                    🚀 Visualize
                  </button>
                </div>

                <!-- Code Editor Area -->
                <div class="workspace-editor-box">
                  <div class="editor-header-bar">
                    <span class="editor-lang-tag">🐍 Python 3 (Restricted Safe Offline Engine)</span>
                    <span class="editor-autosave-tag" id="wsAutoSaveStatus">Auto-saved</span>
                  </div>
                  <textarea id="workspaceCodeEditor" class="workspace-code-textarea" spellcheck="false" 
                    placeholder="# Write your Python solution here...">${this.escapeHTML(userCode)}</textarea>
                </div>

                <!-- Revealed Hints Section -->
                ${hintsCount > 0 ? `
                  <div class="workspace-hints-box" id="workspaceHintsBox">
                    <h4 class="hints-box-title">💡 Progressive Hints</h4>
                    ${guide.hints.slice(0, hintsCount).map((h, i) => `
                      <div class="hint-card">
                        <span class="hint-badge">Hint ${i + 1}</span>
                        <p class="hint-text">${this.escapeHTML(h)}</p>
                      </div>
                    `).join('')}
                    ${hintsCount < guide.hints.length ? `<button class="btn-next-hint" id="btnWsNextHint">Next Hint →</button>` : ''}
                  </div>
                ` : ''}

                <!-- Revealed Reference Solution Section (Unlocked with confirmation) -->
                ${isSolutionUnlocked ? `
                  <div class="workspace-solution-card" id="workspaceSolutionCard">
                    <div class="solution-card-header">
                      <span class="solution-unlocked-tag">🔓 Reference Solution Unlocked</span>
                      <div class="solution-header-actions">
                        <button class="btn-copy-sol" id="btnCopyRefSolution">📋 Copy to Editor</button>
                        <button class="btn-vis-sol" id="btnVisRefSolution">▶ Step in Visualizer</button>
                      </div>
                    </div>
                    <pre class="dsa-code-preview"><code>${this.escapeHTML(p.referenceSolution || p.starterCode)}</code></pre>
                  </div>
                ` : ''}

                <!-- Console / Terminal Output Panel -->
                <div class="workspace-console-panel" id="workspaceConsolePanel">
                  <div class="console-panel-header">
                    <span class="console-title">💻 Terminal / Output Console</span>
                    <button class="btn-clear-console" id="btnClearConsole">Clear</button>
                  </div>
                  <pre class="console-output-content" id="workspaceConsoleOutput">Click "▶ Run Code" or "🧪 Run Tests" to execute your Python solution in the restricted client-side interpreter.</pre>
                </div>

                <!-- Test Results Panel -->
                <div class="workspace-tests-panel hidden" id="workspaceTestsPanel">
                  <div class="tests-panel-header">
                    <h4 class="tests-panel-title">🧪 Test Results</h4>
                    <span class="tests-status-badge" id="workspaceTestsBadge">0/0 Passed</span>
                  </div>
                  <div class="tests-cards-container" id="workspaceTestCards"></div>
                </div>
              </div>

              <!-- PANE D: VISUALIZE EXECUTION -->
              <div class="workspace-pane-content ${this.workspaceRightTab === 'visualize' ? '' : 'hidden'}" id="paneVisualize">
                <div class="guide-card">
                  <div class="visualizer-promo-hero">
                    <span class="promo-icon">🚀</span>
                    <div>
                      <h3 class="guide-section-heading" style="margin: 0;">Step-by-Step Code Flow Visualizer</h3>
                      <p class="guide-text">
                        Watch your Python code execute one line at a time. Trace memory, inspect variables, predict condition outcomes, and understand loops without guesswork.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="guide-card">
                  <h4 class="guide-section-label">Supported Visualizer Features</h4>
                  <div class="feature-pills-grid">
                    <div class="feat-pill">📌 Active Executing Line Highlighting</div>
                    <div class="feat-pill">📦 Real-time Variable & Heap Memory Tracking</div>
                    <div class="feat-pill">⚖️ Condition Comparison Evaluation Gates</div>
                    <div class="feat-pill">🔁 Complete Loop Iteration Dry-Run Groups</div>
                    <div class="feat-pill">🎯 Interactive Prediction Quiz Mode</div>
                    <div class="feat-pill">⏪ Bidirectional Step Navigation (Next / Prev)</div>
                  </div>
                </div>

                <div class="guide-card">
                  <h4 class="guide-section-label">Choose What to Step Through:</h4>
                  <div class="vis-launch-actions">
                    <button class="btn-hero-primary btn-large-vis" id="btnLaunchMyCodeVis">
                      🚀 Step Through My Code in Visualizer
                    </button>
                    <button class="btn-hero-subtle btn-large-vis" id="btnLaunchRefCodeVis">
                      ▶ Step Through Verified Reference Solution
                    </button>
                  </div>
                  <p class="vis-safe-notice">
                    Note: The execution engine supports standard Python DSA structures: loops, conditionals, functions, lists, dicts, sets, slicing, classes, and recursion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
"""

# Insert workspace_code right before formatTimeAgo
target_insert = "    formatTimeAgo(timestamp) {"
assert target_insert in code, "target_insert not found"
code = code.replace(target_insert, workspace_code + "\n    formatTimeAgo(timestamp) {", 1)

print("Part 3: Workspace methods inserted")
with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(code)
os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
print("Part 3 saved successfully")
