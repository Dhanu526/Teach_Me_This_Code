import re

file_path = r'C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_dashboard.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 10. Update Run Tests button in bindEvents() to show loading state
old_run_tests = '''          // Workspace Action: Run Tests
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
                const allPassed = testReport.passed === testReport.total && testReport.total > 0;
                testsBadge.textContent = `${testReport.passed}/${testReport.total} Passed (${Math.round((testReport.passed / testReport.total) * 100)}%)`;
                testsBadge.className = `tests-status-badge ${allPassed ? 'badge-passed' : 'badge-failed'}`;
                if (allPassed) {
                  this.markSolved(this.activeWorkspaceProblemId);
                } else {
                  this.markAttempted(this.activeWorkspaceProblemId);
                }
              }
              testCards.innerHTML = testReport.results.map(r => `
                <div class="test-result-card ${r.passed ? 'card-passed' : 'card-failed'}">
                  <div class="test-card-top">
                    <span class="test-badge">${r.passed ? '✓ Test Case ' + r.testIndex + ' Passed' : '✗ Test Case ' + r.testIndex + ' Failed'}</span>
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
          }'''

new_run_tests = '''          // Workspace Action: Run Tests (with Loading Feedback & Hints)
          const btnWsTests = e.target.closest('#btnWsRunTests');
          if (btnWsTests) {
            const editor = document.getElementById('workspaceCodeEditor');
            const consoleOutput = document.getElementById('workspaceConsoleOutput');
            const testsPanel = document.getElementById('workspaceTestsPanel');
            const testsBadge = document.getElementById('workspaceTestsBadge');
            const testCards = document.getElementById('workspaceTestCards');
            if (editor && testsPanel && testCards) {
              const origText = btnWsTests.innerHTML;
              btnWsTests.innerHTML = '🧪 Testing...';
              btnWsTests.disabled = true;

              setTimeout(() => {
                try {
                  const codeText = editor.value;
                  this.saveUserCode(this.activeWorkspaceProblemId, codeText);
                  const testReport = this.runWorkspaceTests(this.activeWorkspaceProblemId, codeText);
                  testsPanel.classList.remove('hidden');
                  if (testsBadge) {
                    const allPassed = testReport.passed === testReport.total && testReport.total > 0;
                    testsBadge.textContent = `${testReport.passed}/${testReport.total} Passed (${Math.round((testReport.passed / testReport.total) * 100)}%)`;
                    testsBadge.className = `tests-status-badge ${allPassed ? 'badge-passed' : 'badge-failed'}`;
                    if (allPassed) {
                      this.markSolved(this.activeWorkspaceProblemId);
                    } else {
                      this.markAttempted(this.activeWorkspaceProblemId);
                    }
                  }
                  testCards.innerHTML = testReport.results.map(r => `
                    <div class="test-result-card ${r.passed ? 'card-passed' : 'card-failed'}">
                      <div class="test-card-top">
                        <span class="test-badge">${r.passed ? '✓ Test Case ' + r.testIndex + ' Passed' : '✗ Test Case ' + r.testIndex + ' Failed'}</span>
                      </div>
                      <div class="test-detail-row"><strong>Input:</strong> <code>${this.escapeHTML(r.inputStr)}</code></div>
                      <div class="test-detail-row"><strong>Expected:</strong> <code class="expected-code">${this.escapeHTML(r.expectedOutput)}</code></div>
                      <div class="test-detail-row"><strong>Actual Output:</strong> <code>${this.escapeHTML(r.actualOutput)}</code></div>
                      ${r.error ? `<div class="test-error-msg">⚠️ Error: ${this.escapeHTML(r.error)}</div>` : ''}
                      ${!r.passed ? `<div class="test-error-hint">💡 <em>Tip: Inspect loop termination, empty list checks, or off-by-one indices.</em></div>` : ''}
                    </div>
                  `).join('');
                  if (consoleOutput) {
                    consoleOutput.textContent = `Executed ${testReport.total} test case(s). Passed: ${testReport.passed}/${testReport.total}.`;
                  }
                } finally {
                  btnWsTests.innerHTML = origText;
                  btnWsTests.disabled = false;
                }
              }, 40);
            }
            return;
          }'''

if 'test-error-hint' not in content:
    assert old_run_tests in content, "old_run_tests block not found"
    content = content.replace(old_run_tests, new_run_tests, 1)
    print("Enhanced runWorkspaceTests event with loading and failure tips")

# 8. Add event handler for toggle-beginner-mode, nav-dashboard, nav-topics
event_handlers = '''
          // Phase 9: Toggle Beginner Mode
          const btnBeginner = e.target.closest('[data-action="toggle-beginner-mode"]');
          if (btnBeginner) {
            this.toggleBeginnerMode();
            return;
          }

          // Phase 9: Breadcrumb Navigation
          const btnNavDash = e.target.closest('[data-action="nav-dashboard"]');
          if (btnNavDash) {
            this.currentSubTab = 'dashboard';
            this.render();
            return;
          }

          const btnNavTopics = e.target.closest('[data-action="nav-topics"]');
          if (btnNavTopics) {
            this.currentSubTab = 'topics';
            this.render();
            return;
          }
'''

if 'toggle-beginner-mode' not in content:
    target_event = 'const backToProbsBtn = e.target.closest(\'[data-action="back-to-problems"]\');'
    assert target_event in content, "backToProbsBtn not found"
    content = content.replace(target_event, event_handlers + '\n          ' + target_event, 1)
    print("Added Phase 9 click handlers to bindEvents()")

# 11. Add Keyboard Shortcuts in bindEvents()
kb_shortcuts = '''
      // Phase 9: Global Keyboard Shortcuts (Escape to dismiss modals, Ctrl+Enter to run code)
      if (typeof window !== 'undefined' && !this._phase9KeyHandlersBound) {
        this._phase9KeyHandlersBound = true;
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-overlay, .storage-modal-overlay');
            if (openModal) openModal.remove();
          }
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const activeEditor = document.getElementById('workspaceCodeEditor');
            if (activeEditor && document.activeElement === activeEditor) {
              e.preventDefault();
              const btnTests = document.getElementById('btnWsRunTests');
              if (btnTests) btnTests.click();
              else {
                const btnRun = document.getElementById('btnWsRunCode');
                if (btnRun) btnRun.click();
              }
            }
          }
        });
      }
'''

if '_phase9KeyHandlersBound' not in content:
    target_end_bind = 'this.bindProblemTableFilters();'
    assert target_end_bind in content, "bindProblemTableFilters not found"
    content = content.replace(target_end_bind, target_end_bind + '\n' + kb_shortcuts, 1)
    print("Added Phase 9 keyboard shortcuts (Esc and Ctrl+Enter)")

# 12. Update renderProblemTableContent empty state
old_empty_table = '''      if (totalFiltered === 0) {
        return `
          <div class="empty-state-box">
            <div class="empty-state-icon">🔍</div>
            <p class="empty-state-text">No problems match your current search and filter criteria.</p>
            <button class="btn-hero-primary" data-action="clear-filters">Reset All Filters</button>
          </div>
        `;
      }'''

new_empty_table = '''      if (totalFiltered === 0) {
        let emptyMsg = 'No problems match your current search and filter criteria.';
        let tipMsg = 'Try clearing your search query or choosing a broader difficulty or topic.';

        if (this.selectedStatus === 'bookmarked') {
          emptyMsg = 'No bookmarked problems found.';
          tipMsg = 'Click the ☆ star on any problem in the catalog to bookmark it for quick practice!';
        } else if (this.selectedStatus === 'review') {
          emptyMsg = 'Your review list is currently empty.';
          tipMsg = 'Click the 🔖 icon on problems you want to flag for targeted revision!';
        } else if (this.selectedStatus === 'with_notes') {
          emptyMsg = 'No problems with personal notes found.';
          tipMsg = 'Open any problem workspace and write notes to reinforce your learning!';
        } else if (this.selectedStatus === 'solved') {
          emptyMsg = 'No solved problems in this selection yet.';
          tipMsg = 'Pick a beginner problem from the roadmap to get your first green checkmark!';
        } else if (this.searchQuery && this.searchQuery.trim()) {
          emptyMsg = `No problems found matching "${this.escapeHTML(this.searchQuery)}".`;
          tipMsg = 'Check your spelling or try searching by algorithmic pattern (e.g. "Two Pointers", "Sliding Window").';
        }

        return `
          <div class="empty-state-box dsa-empty-state-card">
            <div class="empty-state-icon">🔍</div>
            <h3 class="empty-state-heading">${emptyMsg}</h3>
            <p class="empty-state-text">${tipMsg}</p>
            <button class="btn-hero-primary btn-clear-empty-filters" data-action="clear-filters">🔄 Reset All Filters</button>
          </div>
        `;
      }'''

if 'dsa-empty-state-card' not in content:
    assert old_empty_table in content, "old_empty_table not found"
    content = content.replace(old_empty_table, new_empty_table, 1)
    print("Enhanced renderProblemTableContent empty state")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("[SUCCESS] Phase 9 UI/UX logic cleanly integrated into dsa_dashboard.js")
