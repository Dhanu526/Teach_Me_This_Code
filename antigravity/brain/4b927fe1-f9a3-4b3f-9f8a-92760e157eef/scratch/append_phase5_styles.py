# scratch/append_phase5_styles.py
import os

css_phase5 = """
/* ==========================================================================
   Phase 5: DSA Problem Learning Workspace Styles
   ========================================================================== */

.workspace-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 4px 32px;
}

.workspace-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}

.workspace-nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-ws-back {
  background: white;
  border: 1px solid var(--border-light, #e2e8f0);
  color: var(--text-main, #0f172a);
  padding: 6px 14px;
  border-radius: var(--radius-md, 6px);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-ws-back:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.workspace-route-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 4px 10px;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  color: var(--text-secondary, #475569);
}

.route-copy-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 11px;
  padding: 0 2px;
  opacity: 0.75;
  transition: opacity 0.1s;
}

.route-copy-btn:hover {
  opacity: 1;
}

.route-copy-toast {
  font-size: 11px;
  font-weight: 600;
  color: #15803d;
  background: #dcfce7;
  padding: 2px 8px;
  border-radius: 10px;
  animation: fadeInOut 2.5s ease;
}

.workspace-top-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-ws-action-sec {
  background: white;
  border: 1px solid var(--border-light, #e2e8f0);
  color: var(--text-secondary, #475569);
  padding: 6px 12px;
  border-radius: var(--radius-md, 6px);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ws-action-sec:hover {
  background: #f8fafc;
  color: var(--text-main, #0f172a);
}

.btn-ws-action-primary {
  background: var(--primary-blue, #2563eb);
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: var(--radius-md, 6px);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ws-action-primary:hover {
  background: #1d4ed8;
}

.workspace-problem-header {
  background: white;
  border: 1px solid var(--border-light, #e2e8f0);
  border-radius: var(--radius-lg, 10px);
  padding: 16px 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.workspace-title-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.workspace-title-row h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main, #0f172a);
  margin: 0;
}

.ws-diff-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 12px;
  text-transform: uppercase;
}

.ws-diff-badge.diff-easy {
  background: #dcfce7;
  color: #15803d;
}

.ws-diff-badge.diff-medium {
  background: #fef3c7;
  color: #b45309;
}

.ws-diff-badge.diff-hard {
  background: #fee2e2;
  color: #b91c1c;
}

.workspace-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  margin-top: 8px;
  font-size: 12.5px;
  color: var(--text-secondary, #64748b);
}

.ws-meta-item strong {
  color: var(--text-main, #0f172a);
}

.ws-external-link {
  color: var(--primary-blue, #2563eb);
  text-decoration: none;
  font-weight: 600;
}

.ws-external-link:hover {
  text-decoration: underline;
}

/* 2-Column Split Workspace Layout */
.workspace-2col-layout {
  display: grid;
  grid-template-columns: minmax(400px, 1fr) minmax(480px, 1.15fr);
  gap: 18px;
  align-items: start;
}

@media (max-width: 1024px) {
  .workspace-2col-layout {
    grid-template-columns: 1fr;
  }
}

.workspace-col-left,
.workspace-col-right {
  background: white;
  border: 1px solid var(--border-light, #e2e8f0);
  border-radius: var(--radius-lg, 10px);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.workspace-pane-tabs {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid var(--border-light, #e2e8f0);
  padding: 6px 12px 0;
  gap: 6px;
}

.workspace-pane-tab {
  background: transparent;
  border: none;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
}

.workspace-pane-tab:hover {
  color: var(--text-main, #0f172a);
  background: #f1f5f9;
}

.workspace-pane-tab.active {
  color: var(--primary-blue, #2563eb);
  border-bottom: 2px solid var(--primary-blue, #2563eb);
  background: white;
}

.tab-kicker {
  font-size: 11px;
  font-weight: 700;
  opacity: 0.75;
  margin-right: 4px;
}

.workspace-pane-body {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 230px);
  min-height: 540px;
  box-sizing: border-box;
}

/* Teaching Section Content */
.teaching-section {
  margin-bottom: 22px;
}

.teaching-section:last-child {
  margin-bottom: 0;
}

.teaching-section h3 {
  font-size: 14.5px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--text-main, #0f172a);
  display: flex;
  align-items: center;
  gap: 6px;
}

.teaching-prose {
  font-size: 13.5px;
  color: #334155;
  line-height: 1.65;
}

.teaching-prose p {
  margin: 0 0 10px 0;
}

.callout-highlight-box {
  background: #eff6ff;
  border-left: 4px solid var(--primary-blue, #2563eb);
  padding: 12px 14px;
  border-radius: var(--radius-sm, 4px);
  font-size: 13px;
  color: #1e3a8a;
  line-height: 1.5;
}

.example-cards-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.workspace-example-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md, 6px);
  padding: 12px 14px;
}

.ex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.ex-badge {
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  background: #e2e8f0;
  color: #475569;
  padding: 2px 7px;
  border-radius: 4px;
}

.ex-row {
  font-size: 12.5px;
  margin-bottom: 4px;
  color: #1e293b;
}

.ex-row code {
  background: #ede9fe;
  color: #5b21b6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-mono, monospace);
  font-size: 12px;
}

.ex-explanation {
  font-size: 12px;
  color: #64748b;
  margin-top: 6px;
  font-style: italic;
}

.constraints-list,
.edge-cases-list {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: #334155;
}

.constraints-list li,
.edge-cases-list li {
  margin-bottom: 5px;
  line-height: 1.5;
}

/* Pattern Tab Styling */
.pattern-hero-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border: 1px solid #bbf7d0;
  border-radius: var(--radius-lg, 10px);
  padding: 16px;
  margin-bottom: 18px;
}

.pattern-badge {
  background: #15803d;
  color: white;
  padding: 3px 9px;
  border-radius: 12px;
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
}

.pattern-title-lg {
  font-size: 17px;
  font-weight: 700;
  color: #166534;
  margin: 8px 0 4px;
}

.pattern-desc-lead {
  font-size: 13px;
  color: #14532d;
  margin: 0;
  line-height: 1.5;
}

.pattern-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 18px;
}

@media (max-width: 640px) {
  .pattern-grid-2col {
    grid-template-columns: 1fr;
  }
}

.pattern-subcard {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md, 6px);
  padding: 12px 14px;
}

.pattern-subcard h4 {
  font-size: 12.5px;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: #1e293b;
}

.pattern-subcard p {
  font-size: 12.5px;
  color: #475569;
  margin: 0;
  line-height: 1.5;
}

.pattern-steps-list {
  counter-reset: pstep;
  padding-left: 0;
  list-style: none;
  margin: 0;
}

.pattern-steps-list li {
  position: relative;
  padding-left: 28px;
  margin-bottom: 10px;
  font-size: 13px;
  color: #334155;
  line-height: 1.5;
}

.pattern-steps-list li::before {
  counter-increment: pstep;
  content: counter(pstep);
  position: absolute;
  left: 0;
  top: 1px;
  width: 18px;
  height: 18px;
  background: var(--primary-blue, #2563eb);
  color: white;
  border-radius: 50%;
  font-size: 10.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pattern-walkthrough-box {
  background: #f1f5f9;
  border: 1px dashed #cbd5e1;
  border-radius: var(--radius-md, 6px);
  padding: 14px;
  font-size: 12.5px;
  line-height: 1.6;
  color: #334155;
}

/* Editor Toolbar & Code Area */
.workspace-editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
}

.editor-toolbar-left,
.editor-toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.editor-lang-badge {
  font-size: 11px;
  font-weight: 700;
  background: var(--primary-blue, #2563eb);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-family: var(--font-mono, monospace);
}

.editor-autosave-indicator {
  font-size: 11px;
  color: #64748b;
  font-style: italic;
}

.btn-ws-run {
  background: #16a34a;
  color: white;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: var(--radius-md, 6px);
  border: none;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ws-run:hover {
  background: #15803d;
}

.btn-ws-tests {
  background: var(--primary-blue, #2563eb);
  color: white;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: var(--radius-md, 6px);
  border: none;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ws-tests:hover {
  background: #1d4ed8;
}

.btn-ws-reset {
  background: #f1f5f9;
  color: #475569;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: var(--radius-md, 6px);
  border: 1px solid #cbd5e1;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ws-reset:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.btn-ws-hint {
  background: #fef3c7;
  color: #b45309;
  border: 1px solid #fde68a;
  font-weight: 600;
  padding: 6px 11px;
  border-radius: var(--radius-md, 6px);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ws-hint:hover {
  background: #fde68a;
}

.btn-ws-solution {
  background: #f3e8ff;
  color: #7e22ce;
  border: 1px solid #e9d5ff;
  font-weight: 600;
  padding: 6px 11px;
  border-radius: var(--radius-md, 6px);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ws-solution:hover {
  background: #e9d5ff;
}

.workspace-code-textarea {
  width: 100%;
  min-height: 250px;
  font-family: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-md, 6px);
  background: #0f172a;
  color: #f8fafc;
  resize: vertical;
  box-sizing: border-box;
  tab-size: 4;
}

.workspace-code-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

/* Test Results Panel */
.workspace-tests-panel {
  margin-top: 14px;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md, 6px);
  padding: 12px 14px;
  background: #fafafa;
}

.workspace-tests-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
}

.tests-status-badge {
  font-size: 11.5px;
  padding: 2px 9px;
  border-radius: 12px;
  font-weight: 700;
}

.tests-status-badge.badge-passed {
  background: #dcfce7;
  color: #15803d;
}

.tests-status-badge.badge-failed {
  background: #fee2e2;
  color: #b91c1c;
}

.workspace-test-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.test-result-card {
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 12px;
  border-left: 4px solid #cbd5e1;
  background: white;
  border-top: 1px solid #f1f5f9;
  border-right: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.test-result-card.card-passed {
  border-left-color: #22c55e;
  background: #f0fdf4;
}

.test-result-card.card-failed {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.test-card-top {
  font-weight: 700;
  margin-bottom: 4px;
  font-size: 12px;
}

.test-detail-row {
  margin-bottom: 2px;
  font-size: 12px;
  color: #334155;
}

.test-detail-row code {
  font-family: var(--font-mono, monospace);
  background: rgba(0,0,0,0.05);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 11.5px;
}

.expected-code {
  color: #15803d;
  font-weight: 600;
}

.test-error-msg {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 600;
}

/* Console Panel */
.workspace-console-panel {
  margin-top: 14px;
  border-radius: var(--radius-md, 6px);
  overflow: hidden;
  border: 1px solid #334155;
  background: #0f172a;
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  background: #1e293b;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-console-clear {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 11px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 3px;
  transition: all 0.1s;
}

.btn-console-clear:hover {
  color: white;
  background: #334155;
}

.workspace-console-body {
  padding: 12px;
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: #e2e8f0;
  max-height: 160px;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.5;
  margin: 0;
}

.console-err-text {
  color: #f87171;
  font-weight: 600;
}

.console-ok-text {
  color: #4ade80;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
}

/* Hints & Reference Solution Cards */
.workspace-hints-box {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hint-card {
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-left: 4px solid #f59e0b;
  border-radius: 6px;
  padding: 10px 14px;
}

.hint-badge {
  font-size: 11px;
  font-weight: 700;
  color: #b45309;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.hint-content {
  font-size: 12.5px;
  color: #78350f;
  line-height: 1.5;
}

.btn-next-hint {
  align-self: flex-start;
  margin-top: 4px;
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
}

.btn-next-hint:hover {
  background: #fde68a;
}

.workspace-solution-card {
  margin-top: 14px;
  background: #faf5ff;
  border: 1px solid #f3e8ff;
  border-left: 4px solid #a855f7;
  border-radius: var(--radius-md, 6px);
  padding: 14px;
}

.solution-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.verified-sol-badge {
  font-size: 11px;
  font-weight: 700;
  color: #6b21a8;
  background: #f3e8ff;
  padding: 2px 8px;
  border-radius: 10px;
}

.solution-meta-chips {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.complexity-chip {
  font-size: 11px;
  font-weight: 600;
  background: white;
  border: 1px solid #e9d5ff;
  color: #7e22ce;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-mono, monospace);
}

.ref-code-block {
  font-family: var(--font-mono, monospace);
  font-size: 12.5px;
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  max-height: 240px;
  line-height: 1.5;
  margin: 0 0 10px 0;
}

.solution-btn-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-ws-secondary {
  background: white;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 6px 12px;
  border-radius: var(--radius-md, 6px);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ws-secondary:hover {
  background: #f1f5f9;
  color: #0f172a;
}

/* Visualize Tab (Pane D) */
.workspace-visualize-tab {
  padding: 4px;
}

.vis-tab-hero {
  background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
  border: 1px solid #bfdbfe;
  border-radius: var(--radius-lg, 10px);
  padding: 16px;
  margin-bottom: 16px;
}

.vis-tab-hero h3 {
  font-size: 15.5px;
  font-weight: 700;
  color: #1e40af;
  margin: 0 0 6px 0;
}

.vis-tab-hero p {
  font-size: 13px;
  color: #1e3a8a;
  line-height: 1.5;
  margin: 0;
}

.vis-callout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.vis-callout-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md, 6px);
  padding: 10px 12px;
}

.vis-callout-card h4 {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 4px 0;
}

.vis-callout-card p {
  font-size: 11.5px;
  color: #475569;
  margin: 0;
  line-height: 1.4;
}

.vis-action-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 14px;
}

.btn-hero-vis {
  background: var(--primary-blue, #2563eb);
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: var(--radius-md, 8px);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
}

.btn-hero-vis:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
}

.btn-hero-vis-ref {
  background: #7c3aed;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: var(--radius-md, 8px);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
}

.btn-hero-vis-ref:hover {
  background: #6d28d9;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.2);
}

.btn-subtext {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.85;
  margin-top: 3px;
}

.vis-status-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-sm, 6px);
  padding: 10px 12px;
  font-size: 11.5px;
  color: #64748b;
  line-height: 1.4;
}

.btn-mini-preview {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
  opacity: 0.7;
  margin-left: 6px;
  padding: 0 2px;
  transition: opacity 0.1s;
}

.btn-mini-preview:hover {
  opacity: 1;
}

.btn-banner-ws {
  background: #4338ca !important;
  color: white !important;
}

.btn-banner-ws:hover {
  background: #3730a3 !important;
}
"""

with open('app_build/styles.css', 'a', encoding='utf-8') as f:
    f.write(css_phase5)

print("Phase 5 CSS appended successfully")
