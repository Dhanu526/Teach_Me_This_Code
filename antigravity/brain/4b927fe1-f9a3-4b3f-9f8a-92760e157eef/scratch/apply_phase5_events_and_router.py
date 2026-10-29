# scratch/apply_phase5_events_and_router.py
import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update loadAndVisualizeProblem to accept optional codeOverride
target_load_vis = """    loadAndVisualizeProblem(id) {
      const problem = this.problemsById.get(id);
      if (!problem) return;

      this.activeVisualizerProblemId = id;
      this.markAttempted(id);

      if (window.teachMeApp) {
        window.teachMeApp.sourceCode = problem.starterCode;
        if (window.teachMeApp.codeTextarea) {
          window.teachMeApp.codeTextarea.value = problem.starterCode;
        }
        window.teachMeApp.inputCode = '';
        window.teachMeApp.currentPresetKey = 'custom';
        window.teachMeApp.analyzeAndRun();
      }"""

replacement_load_vis = """    loadAndVisualizeProblem(id, codeOverride = null) {
      const problem = this.problemsById.get(id);
      if (!problem) return;

      this.activeVisualizerProblemId = id;
      this.markAttempted(id);

      const codeToLoad = codeOverride || this.getUserCode(id) || problem.starterCode;

      if (window.teachMeApp) {
        window.teachMeApp.sourceCode = codeToLoad;
        if (window.teachMeApp.codeTextarea) {
          window.teachMeApp.codeTextarea.value = codeToLoad;
        }
        window.teachMeApp.inputCode = '';
        window.teachMeApp.currentPresetKey = 'custom';
        window.teachMeApp.analyzeAndRun();
      }"""

assert target_load_vis in code, "target_load_vis not found"
code = code.replace(target_load_vis, replacement_load_vis, 1)

# 2. Update visualizer banner with button to return to Workspace
target_banner_actions = """          <div class="dsa-active-actions">
            ${isSolved 
              ? `<span class="solved-pill">✅ Solved</span>` 
              : `<button id="btnBannerMarkSolved" class="btn-banner-solve" title="Mark this problem as completed">✓ Mark as Solved</button>`}
            <button id="btnBannerBackToDsa" class="btn-banner-back" title="Return to DSA Learning Hub">← Back to DSA Hub</button>
          </div>"""

replacement_banner_actions = """          <div class="dsa-active-actions">
            ${isSolved 
              ? `<span class="solved-pill">✅ Solved</span>` 
              : `<button id="btnBannerMarkSolved" class="btn-banner-solve" title="Mark this problem as completed">✓ Mark as Solved</button>`}
            <button id="btnBannerOpenWorkspace" class="btn-banner-solve btn-banner-ws" title="Return to Problem Learning Workspace">🎓 Learning Workspace</button>
            <button id="btnBannerBackToDsa" class="btn-banner-back" title="Return to DSA Learning Hub">← Back to DSA Hub</button>
          </div>"""

assert target_banner_actions in code, "target_banner_actions not found"
code = code.replace(target_banner_actions, replacement_banner_actions, 1)

# 3. Add workspace click handlers in bindEvents
target_bind_events_solve = """          // Solve & Visualize button
          const solveBtn = e.target.closest('[data-action="solve-visualize"]');
          if (solveBtn) {
            const id = parseInt(solveBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.loadAndVisualizeProblem(id);
            return;
          }"""

replacement_bind_events_solve = """          // Solve & Visualize button
          const solveBtn = e.target.closest('[data-action="solve-visualize"]');
          if (solveBtn) {
            const id = parseInt(solveBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.loadAndVisualizeProblem(id);
            return;
          }

          // Open Workspace actions (Phase 5)
          const openWsBtn = e.target.closest('[data-action="open-workspace"]');
          if (openWsBtn) {
            const id = parseInt(openWsBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.openProblemWorkspace(id);
            return;
          }

          const backToProbsBtn = e.target.closest('[data-action="back-to-problems"]');
          if (backToProbsBtn) {
            this.currentSubTab = 'problems';
            this.render();
            return;
          }

          // Workspace 2-Column Tabs (A/B and C/D)
          const wsTab = e.target.closest('[data-workspace-tab]');
          if (wsTab) {
            const side = wsTab.getAttribute('data-workspace-tab');
            const tabName = wsTab.getAttribute('data-tab-name');
            if (side === 'left') {
              this.workspaceLeftTab = tabName;
              const pU = document.getElementById('paneUnderstand');
              const pP = document.getElementById('panePattern');
              if (pU && pP) {
                pU.classList.toggle('hidden', tabName !== 'understand');
                pP.classList.toggle('hidden', tabName !== 'pattern');
              }
            } else {
              this.workspaceRightTab = tabName;
              const pE = document.getElementById('paneEditor');
              const pV = document.getElementById('paneVisualize');
              if (pE && pV) {
                pE.classList.toggle('hidden', tabName !== 'editor');
                pV.classList.toggle('hidden', tabName !== 'visualize');
              }
            }
            const tabsInCol = wsTab.parentElement.querySelectorAll('.workspace-pane-tab');
            tabsInCol.forEach(t => t.classList.toggle('active', t === wsTab));
            return;
          }

          // Workspace Action: Run Code (Safe Restricted Engine)
          const btnWsRun = e.target.closest('#btnWsRunCode');
          if (btnWsRun) {
            const editor = document.getElementById('workspaceCodeEditor');
            const consoleOutput = document.getElementById('workspaceConsoleOutput');
            if (editor && consoleOutput) {
              const codeText = editor.value;
              this.saveUserCode(this.activeWorkspaceProblemId, codeText);
              const res = this.runWorkspaceCode(this.activeWorkspaceProblemId, codeText);
              if (!res.ok) {
                consoleOutput.innerHTML = `<span class="console-err-text">❌ ${this.escapeHTML(res.error)}</span>`;
              } else {
                const outStr = (res.stdout && res.stdout.length > 0) ? res.stdout.join('\\n') : '(No print output produced)';
                const varStr = (res.variables && res.variables.length > 0) ? res.variables.map(v => `${v.name} = ${v.current}`).join('\\n') : '(No local variables)';
                consoleOutput.innerHTML = `
<span class="console-ok-text">✓ Execution Finished Cleanly (${res.stepsCount} execution steps):</span>
<strong>Standard Output:</strong>
${this.escapeHTML(outStr)}

<strong>Final Variables:</strong>
${this.escapeHTML(varStr)}
                `;
              }
            }
            return;
          }

          // Workspace Action: Run Tests
          const btnWsTests = e.target.closest('#btnWsRunTests');
          if (btnWsTests) {
            const editor = document.getElementById('workspaceCodeEditor');
            const consoleOutput = document.getElementById('workspaceConsoleOutput');
            const testsPanel = document.getElementById('workspaceTestsPanel');
            const testsBadge = document.getElementById('workspaceTestsBadge');
            const testCards = document.getElementById('workspaceTestCards');
            if (editor && testsPanel && testCards) {
              const codeText = editor.value;
              this.saveUserCode(this.activeWorkspaceProblemId, codeText);
              const testReport = this.runWorkspaceTests(this.activeWorkspaceProblemId, codeText);
              testsPanel.classList.remove('hidden');
              if (testsBadge) {
                const allPassed = testReport.passed === testReport.total;
                testsBadge.textContent = `${testReport.passed}/${testReport.total} Passed (${Math.round((testReport.passed / testReport.total) * 100)}%)`;
                testsBadge.className = `tests-status-badge ${allPassed ? 'badge-passed' : 'badge-failed'}`;
              }
              testCards.innerHTML = testReport.results.map(r => `
                <div class="test-result-card ${r.passed ? 'card-passed' : 'card-failed'}">
                  <div class="test-card-top">
                    <span class="test-badge">${r.passed ? '✅ Test Case ' + r.testIndex + ' Passed' : '❌ Test Case ' + r.testIndex + ' Failed'}</span>
                  </div>
                  <div class="test-detail-row"><strong>Input:</strong> <code>${this.escapeHTML(r.inputStr)}</code></div>
                  <div class="test-detail-row"><strong>Expected:</strong> <code class="expected-code">${this.escapeHTML(r.expectedOutput)}</code></div>
                  <div class="test-detail-row"><strong>Actual Output:</strong> <code>${this.escapeHTML(r.actualOutput)}</code></div>
                  ${r.error ? `<div class="test-error-msg">⚠️ Error: ${this.escapeHTML(r.error)}</div>` : ''}
                </div>
              `).join('');
              if (consoleOutput) {
                consoleOutput.textContent = `Executed ${testReport.total} test case(s). Passed: ${testReport.passed}/${testReport.total}.`;
              }
            }
            return;
          }

          // Workspace Action: Reset Code
          const btnWsReset = e.target.closest('#btnWsResetCode');
          if (btnWsReset) {
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            const editor = document.getElementById('workspaceCodeEditor');
            if (p && editor) {
              editor.value = p.starterCode;
              this.saveUserCode(p.id, p.starterCode);
              const autoSave = document.getElementById('wsAutoSaveStatus');
              if (autoSave) {
                autoSave.textContent = '↺ Reset to starter template';
                setTimeout(() => { autoSave.textContent = 'Auto-saved'; }, 2000);
              }
            }
            return;
          }

          // Workspace Action: Hints
          const btnWsHint = e.target.closest('#btnWsShowHint') || e.target.closest('#btnWsNextHint');
          if (btnWsHint) {
            const pid = this.activeWorkspaceProblemId;
            const p = this.problemsById.get(pid);
            if (p) {
              const guide = this.getProblemTeachingGuide(p);
              this.revealedHints[pid] = Math.min((this.revealedHints[pid] || 0) + 1, guide.hints.length);
              this.render();
            }
            return;
          }

          // Workspace Action: Reveal Reference Solution (with confirmation)
          const btnWsSol = e.target.closest('#btnWsRevealSolution');
          if (btnWsSol) {
            const pid = this.activeWorkspaceProblemId;
            if (this.revealedSolutions[pid]) {
              this.revealedSolutions[pid] = false;
              this.render();
            } else {
              if (confirm('Are you sure you want to reveal the reference solution? We recommend trying with hints first!')) {
                this.revealedSolutions[pid] = true;
                this.render();
              }
            }
            return;
          }

          // Workspace Action: Copy Solution to Editor
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
          }

          // Workspace Action: Copy Route Link
          const btnWsCopyRoute = e.target.closest('#btnWorkspaceCopyRoute');
          if (btnWsCopyRoute) {
            const pid = this.activeWorkspaceProblemId;
            const routeUrl = (typeof window !== 'undefined' && window.location) 
              ? `${window.location.origin}${window.location.pathname}#dsa/problem/${pid}` 
              : `#dsa/problem/${pid}`;
            if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
              navigator.clipboard.writeText(routeUrl).then(() => {
                const toast = document.getElementById('workspaceRouteToast');
                if (toast) {
                  toast.classList.remove('hidden');
                  setTimeout(() => toast.classList.add('hidden'), 2500);
                }
              }).catch(() => {});
            }
            return;
          }

          // Clear console
          const btnClearCons = e.target.closest('#btnClearConsole');
          if (btnClearCons) {
            const con = document.getElementById('workspaceConsoleOutput');
            if (con) con.textContent = 'Console cleared.';
            return;
          }"""

assert target_bind_events_solve in code, "target_bind_events_solve not found"
code = code.replace(target_bind_events_solve, replacement_bind_events_solve, 1)

# 4. Banner click handler for Return to Workspace
target_banner_handler = """          const btnBack = e.target.closest('#btnBannerBackToDsa');
          if (btnBack) {
            this.switchView('dsa');
            return;
          }"""

replacement_banner_handler = """          const btnBack = e.target.closest('#btnBannerBackToDsa');
          if (btnBack) {
            this.switchView('dsa');
            return;
          }
          const btnWs = e.target.closest('#btnBannerOpenWorkspace');
          if (btnWs && this.activeVisualizerProblemId) {
            this.switchView('dsa');
            this.openProblemWorkspace(this.activeVisualizerProblemId);
            return;
          }"""

assert target_banner_handler in code, "target_banner_handler not found"
code = code.replace(target_banner_handler, replacement_banner_handler, 1)

# 5. Textarea input auto-save handler in bindEvents
target_input_events = """        // Search inputs
        this.dsaContainer.addEventListener('input', (e) => {
          if (e.target.id === 'dsaProblemSearch' || e.target.id === 'topicDetailProblemSearch') {"""

replacement_input_events = """        // Search inputs & Code Editor Auto-Save
        this.dsaContainer.addEventListener('input', (e) => {
          if (e.target.id === 'workspaceCodeEditor') {
            this.saveUserCode(this.activeWorkspaceProblemId, e.target.value);
            const status = document.getElementById('wsAutoSaveStatus');
            if (status) {
              status.textContent = 'Saving...';
              setTimeout(() => { if (status) status.textContent = 'Auto-saved'; }, 600);
            }
            return;
          }
          if (e.target.id === 'dsaProblemSearch' || e.target.id === 'topicDetailProblemSearch') {"""

assert target_input_events in code, "target_input_events not found"
code = code.replace(target_input_events, replacement_input_events, 1)

# 6. Update router to open Workspace on #dsa/problem/:id
target_router_match = """          // Match #dsa/problem/:id or #problem/:id
          const pMatch = hash.match(/^#(?:dsa\\/)?problem\\/(\\d+)/i);
          if (pMatch) {
            const id = parseInt(pMatch[1], 10);
            if (this.problemsById && this.problemsById.has(id)) {
              this.switchView('dsa');
              if (typeof setTimeout === 'function') {
                setTimeout(() => {
                  this.showProblemModal(id);
                }, 40);
              } else {
                this.showProblemModal(id);
              }
              return;
            }
          }"""

replacement_router_match = """          // Match #dsa/problem/:id or #problem/:id -> Opens Workspace
          const pMatch = hash.match(/^#(?:dsa\\/)?problem\\/(\\d+)/i);
          if (pMatch) {
            const id = parseInt(pMatch[1], 10);
            if (this.problemsById && this.problemsById.has(id)) {
              this.switchView('dsa');
              if (typeof setTimeout === 'function') {
                setTimeout(() => {
                  this.openProblemWorkspace(id);
                }, 40);
              } else {
                this.openProblemWorkspace(id);
              }
              return;
            }
          }"""

assert target_router_match in code, "target_router_match not found"
code = code.replace(target_router_match, replacement_router_match, 1)

# 7. Update Problem Table title link to open Workspace (and add Preview button)
target_title_link = """            <td class="col-title">
              <div class="title-wrap">
                <a href="#dsa/problem/${p.id}" class="problem-title-link" data-action="view-problem-details" data-id="${p.id}" title="Open problem details (Route: #dsa/problem/${p.id})">
                  ${this.escapeHTML(p.title)}
                </a>"""

replacement_title_link = """            <td class="col-title">
              <div class="title-wrap">
                <a href="#dsa/problem/${p.id}" class="problem-title-link" data-action="open-workspace" data-id="${p.id}" title="Open Dedicated Learning Workspace (Route: #dsa/problem/${p.id})">
                  ${this.escapeHTML(p.title)}
                </a>
                <button class="btn-mini-preview" data-action="view-problem-details" data-id="${p.id}" title="Quick summary preview">ℹ️</button>"""

assert target_title_link in code, "target_title_link not found"
code = code.replace(target_title_link, replacement_title_link, 1)

# 8. In showProblemModal, add "Open Full Workspace" button
target_modal_footer_right = """            <div class="modal-footer-right">
              <button class="btn-hero-primary" data-action="solve-visualize" data-id="${p.id}">
                ▶ Load & Step in Visualizer
              </button>
            </div>"""

replacement_modal_footer_right = """            <div class="modal-footer-right">
              <button class="btn-hero-subtle" data-action="open-workspace" data-id="${p.id}" title="Open dedicated workspace">
                🎓 Open Full Workspace
              </button>
              <button class="btn-hero-primary" data-action="solve-visualize" data-id="${p.id}">
                ▶ Load & Step in Visualizer
              </button>
            </div>"""

assert target_modal_footer_right in code, "target_modal_footer_right not found"
code = code.replace(target_modal_footer_right, replacement_modal_footer_right, 1)

# 9. In modal event listener, handle open-workspace
target_modal_click_vis = """        } else if (e.target.closest('[data-action="solve-visualize"]')) {
          modal.remove();
          this.loadAndVisualizeProblem(p.id);"""

replacement_modal_click_vis = """        } else if (e.target.closest('[data-action="open-workspace"]')) {
          modal.remove();
          cleanupRoute();
          this.openProblemWorkspace(p.id);
        } else if (e.target.closest('[data-action="solve-visualize"]')) {
          modal.remove();
          cleanupRoute();
          this.loadAndVisualizeProblem(p.id);"""

assert target_modal_click_vis in code, "target_modal_click_vis not found"
code = code.replace(target_modal_click_vis, replacement_modal_click_vis, 1)

print("Part 4 applied successfully")
with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(code)
os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
print("Part 4 saved successfully")
