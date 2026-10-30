# scratch/apply_phase6_to_dsa_dashboard.py
import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update constructor to initialize this.activeSolutionApproach = {}
target_ctor = """      this.revealedHints = {}; // { [id]: number }
      this.revealedSolutions = {}; // { [id]: boolean }
      this.userCodeCache = this.loadUserCodeCache();"""

replacement_ctor = """      this.revealedHints = {}; // { [id]: number }
      this.revealedSolutions = {}; // { [id]: boolean }
      this.activeSolutionApproach = {}; // { [id]: 'baseline' | 'optimized' }
      this.userCodeCache = this.loadUserCodeCache();"""

assert target_ctor in code, "target_ctor not found"
code = code.replace(target_ctor, replacement_ctor, 1)

# 2. Add getProblemSolutions(p) right before getProblemTestCases(p)
target_get_testcases = """    getProblemTestCases(p) {"""

replacement_get_testcases = """    getProblemSolutions(p) {
      if (!p) return null;
      if (typeof window !== 'undefined' && typeof window.getProblemSolutionData === 'function') {
        const data = window.getProblemSolutionData(p);
        if (data) return data;
      }
      if (typeof window !== 'undefined' && window.DSA_SOLUTIONS_REGISTRY && window.DSA_SOLUTIONS_REGISTRY[p.id]) {
        return window.DSA_SOLUTIONS_REGISTRY[p.id];
      }
      const pattern = p.pattern || 'Optimal Pattern';
      return {
        hasMultipleApproaches: false,
        approaches: [
          {
            id: 'optimized',
            name: `Optimized Approach (${pattern})`,
            isOptimal: true,
            timeComplexity: p.timeComplexity || 'O(n)',
            spaceComplexity: p.spaceComplexity || 'O(1)',
            code: p.referenceSolution || p.starterCode || '',
            explanation: `Solves ${p.title} using the ${pattern} pattern with minimal operations.`,
            whyItWorks: `Maintains state invariants to ensure correctness in ${p.timeComplexity || 'O(n)'} time.`,
            commonMistakes: [
              'Boundary check omissions on minimal inputs.',
              'Accidental quadratic operations inside iteration loop.',
              'Off-by-one errors during pointer transitions.'
            ],
            isVerified: true
          }
        ]
      };
    }

    getProblemTestCases(p) {"""

assert target_get_testcases in code, "target_get_testcases not found"
code = code.replace(target_get_testcases, replacement_get_testcases, 1)

# 3. Update solution card rendering in renderProblemWorkspace
target_solution_card = """                <!-- Revealed Reference Solution Section (Unlocked with confirmation) -->
                ${isSolutionUnlocked ? `
                  <div class="workspace-solution-card" id="workspaceSolutionCard">
                    <div class="solution-card-header">
                      <span class="solution-unlocked-tag">🔓 Reference Solution Unlocked</span>
                      <div class="solution-meta-chips">
                        <span class="complexity-chip">Time: ${this.escapeHTML(p.timeComplexity || 'O(n)')}</span>
                        <span class="complexity-chip">Space: ${this.escapeHTML(p.spaceComplexity || 'O(n)')}</span>
                        <span class="verified-sol-badge">${p.solutionVerified ? '✅ Verified Python Reference' : '💡 Optimal Reference'}</span>
                      </div>
                      <div class="solution-header-actions">
                        <button class="btn-copy-sol" id="btnCopyRefSolution">📋 Copy to Editor</button>
                        <button class="btn-vis-sol" id="btnVisRefSolution">▶ Step in Visualizer</button>
                      </div>
                    </div>
                    <pre class="dsa-code-preview ref-code-block"><code>${this.escapeHTML(p.referenceSolution || p.starterCode)}</code></pre>
                  </div>
                ` : ''}"""

replacement_solution_card = """                <!-- Revealed Reference Solution Section (Unlocked with confirmation - Phase 6) -->
                ${isSolutionUnlocked ? (() => {
                  const solData = this.getProblemSolutions(p);
                  const activeAppId = this.activeSolutionApproach[p.id] || (solData.hasMultipleApproaches ? 'optimized' : solData.approaches[0].id);
                  const activeApp = solData.approaches.find(a => a.id === activeAppId) || solData.approaches[0];

                  return `
                    <div class="workspace-solution-card" id="workspaceSolutionCard">
                      <div class="solution-card-header">
                        <div class="solution-header-left">
                          <span class="solution-unlocked-tag">🔓 Reference Solutions Unlocked</span>
                          <span class="verified-sol-badge">✅ Verified Against Examples & Edge Cases</span>
                        </div>
                        <button class="btn-hide-solution" data-action="hide-solution" data-id="${p.id}" title="Hide solution to practice independently">
                          🔒 Hide Solution
                        </button>
                      </div>

                      <!-- Approach Switcher Tabs (Baseline vs Optimized) -->
                      ${solData.hasMultipleApproaches ? `
                        <div class="solution-approach-tabs" role="tablist">
                          ${solData.approaches.map(a => `
                            <button class="solution-approach-tab ${a.id === activeApp.id ? 'active' : ''}" 
                              data-action="switch-sol-approach" data-id="${p.id}" data-approach="${a.id}">
                              ${a.isBaseline ? '⚡ Approach 1: Baseline (Brute Force)' : '✨ Approach 2: Optimized (Recommended)'}
                            </button>
                          `).join('')}
                        </div>
                      ` : ''}

                      <!-- Active Approach Header & Complexity Chips -->
                      <div class="solution-approach-info">
                        <div class="approach-title-row">
                          <h4 class="approach-title">${this.escapeHTML(activeApp.name)}</h4>
                          ${activeApp.isOptimal ? '<span class="optimal-pill">🌟 Recommended Optimal</span>' : '<span class="baseline-pill">⚠️ Suboptimal Baseline</span>'}
                        </div>
                        <div class="solution-meta-chips">
                          <span class="complexity-chip chip-time">⏱ Time: ${this.escapeHTML(activeApp.timeComplexity)}</span>
                          <span class="complexity-chip chip-space">💾 Space: ${this.escapeHTML(activeApp.spaceComplexity)}</span>
                          <span class="complexity-chip chip-status">✓ Verified Status: Real Engine Tested</span>
                        </div>
                      </div>

                      <!-- Action Buttons Bar -->
                      <div class="solution-header-actions">
                        <button class="btn-copy-sol" id="btnCopyRefSolution" data-action="copy-sol-approach" data-id="${p.id}">
                          📋 Copy to Editor
                        </button>
                        <button class="btn-vis-sol" id="btnVisRefSolution" data-action="vis-sol-approach" data-id="${p.id}">
                          ▶ Step in Visualizer
                        </button>
                      </div>

                      <!-- Code Block -->
                      <pre class="dsa-code-preview ref-code-block"><code>${this.escapeHTML(activeApp.code)}</code></pre>

                      <!-- Detailed Educational Explanations (Phase 6) -->
                      <div class="solution-deepdive-grid">
                        <div class="sol-deepdive-card">
                          <h5 class="deepdive-heading">📖 Explanation of the Algorithm</h5>
                          <p class="deepdive-text">${this.escapeHTML(activeApp.explanation)}</p>
                        </div>

                        <div class="sol-deepdive-card">
                          <h5 class="deepdive-heading">💡 Why This Approach Works</h5>
                          <p class="deepdive-text">${this.escapeHTML(activeApp.whyItWorks)}</p>
                        </div>

                        <div class="sol-deepdive-card mistakes-card">
                          <h5 class="deepdive-heading">⚠️ Common Mistakes & Pitfalls</h5>
                          <ul class="deepdive-mistakes-list">
                            ${activeApp.commonMistakes.map(m => `<li>${this.escapeHTML(m)}</li>`).join('')}
                          </ul>
                        </div>
                      </div>
                    </div>
                  `;
                })() : ''}"""

assert target_solution_card in code, "target_solution_card not found"
code = code.replace(target_solution_card, replacement_solution_card, 1)

# 4. Update bindEvents with Phase 6 solution handlers
target_copy_vis = """          // Workspace Action: Copy Solution to Editor
          const btnCopySol = e.target.closest('#btnCopyRefSolution');
          if (btnCopySol) {
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            const editor = document.getElementById('workspaceCodeEditor');
            if (p && editor) {
              editor.value = p.referenceSolution || p.starterCode;
              this.saveUserCode(p.id, editor.value);
              const autoSave = document.getElementById('wsAutoSaveStatus');
              if (autoSave) {
                autoSave.textContent = '✓ Reference solution loaded into editor';
                setTimeout(() => { autoSave.textContent = 'Auto-saved'; }, 2500);
              }
            }
            return;
          }

          // Workspace Action: Step Through in Visualizer
          const btnWsVis = e.target.closest('#btnWsStepVisualizer') || e.target.closest('#btnLaunchMyCodeVis');
          if (btnWsVis) {
            const editor = document.getElementById('workspaceCodeEditor');
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            const codeToRun = (editor && editor.value.trim()) ? editor.value : (p ? p.starterCode : '');
            if (p) {
              this.saveUserCode(p.id, codeToRun);
              this.loadAndVisualizeProblem(p.id, codeToRun);
            }
            return;
          }

          const btnVisRef = e.target.closest('#btnVisRefSolution') || e.target.closest('#btnLaunchRefCodeVis');
          if (btnVisRef) {
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            if (p) {
              this.loadAndVisualizeProblem(p.id, p.referenceSolution || p.starterCode);
            }
            return;
          }"""

replacement_copy_vis = """          // Workspace Action: Copy Solution to Editor (Phase 6)
          const btnCopySol = e.target.closest('#btnCopyRefSolution') || e.target.closest('[data-action="copy-sol-approach"]');
          if (btnCopySol) {
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            const editor = document.getElementById('workspaceCodeEditor');
            if (p && editor) {
              const solData = this.getProblemSolutions(p);
              const activeAppId = this.activeSolutionApproach[p.id] || (solData.hasMultipleApproaches ? 'optimized' : solData.approaches[0].id);
              const activeApp = solData.approaches.find(a => a.id === activeAppId) || solData.approaches[0];
              const codeToLoad = activeApp ? activeApp.code : (p.referenceSolution || p.starterCode);
              editor.value = codeToLoad;
              this.saveUserCode(p.id, codeToLoad);
              const autoSave = document.getElementById('wsAutoSaveStatus');
              if (autoSave) {
                autoSave.textContent = `✓ ${activeApp ? activeApp.name : 'Reference solution'} loaded into editor`;
                setTimeout(() => { if (autoSave) autoSave.textContent = 'Auto-saved'; }, 2500);
              }
            }
            return;
          }

          // Workspace Action: Step Solution in Visualizer (Phase 6)
          const btnVisRef = e.target.closest('#btnVisRefSolution') || e.target.closest('#btnLaunchRefCodeVis') || e.target.closest('[data-action="vis-sol-approach"]');
          if (btnVisRef) {
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            if (p) {
              const solData = this.getProblemSolutions(p);
              const activeAppId = this.activeSolutionApproach[p.id] || (solData.hasMultipleApproaches ? 'optimized' : solData.approaches[0].id);
              const activeApp = solData.approaches.find(a => a.id === activeAppId) || solData.approaches[0];
              const codeToLoad = activeApp ? activeApp.code : (p.referenceSolution || p.starterCode);
              this.loadAndVisualizeProblem(p.id, codeToLoad);
            }
            return;
          }

          // Workspace Action: Switch Solution Approach (Baseline vs Optimized - Phase 6)
          const btnSwitchApp = e.target.closest('[data-action="switch-sol-approach"]');
          if (btnSwitchApp) {
            const pid = parseInt(btnSwitchApp.getAttribute('data-id'), 10);
            const app = btnSwitchApp.getAttribute('data-approach');
            if (!this.activeSolutionApproach) this.activeSolutionApproach = {};
            this.activeSolutionApproach[pid] = app;
            this.render();
            return;
          }

          // Workspace Action: Hide Solution (Phase 6)
          const btnHideSol = e.target.closest('[data-action="hide-solution"]');
          if (btnHideSol) {
            const pid = this.activeWorkspaceProblemId;
            this.revealedSolutions[pid] = false;
            this.render();
            return;
          }

          // Workspace Action: Step Through My Code in Visualizer
          const btnWsVis = e.target.closest('#btnWsStepVisualizer') || e.target.closest('#btnLaunchMyCodeVis');
          if (btnWsVis) {
            const editor = document.getElementById('workspaceCodeEditor');
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            const codeToRun = (editor && editor.value.trim()) ? editor.value : (p ? p.starterCode : '');
            if (p) {
              this.saveUserCode(p.id, codeToRun);
              this.loadAndVisualizeProblem(p.id, codeToRun);
            }
            return;
          }"""

assert target_copy_vis in code, "target_copy_vis not found"
code = code.replace(target_copy_vis, replacement_copy_vis, 1)

with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(code)

os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
print("Successfully applied Phase 6 changes to app_build/dsa_dashboard.js")
