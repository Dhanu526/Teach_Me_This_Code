import os

css_file = r'C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\styles.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

phase7_css = """
/* ==========================================================================
   PHASE 7: BEGINNER ROADMAP (10 STAGES) & PROGRESSION STYLES
   ========================================================================== */

.roadmap-intro-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.roadmap-badge-pill {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(56, 189, 248, 0.3);
  white-space: nowrap;
}

/* Roadmap KPI Bar */
.roadmap-kpi-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.roadmap-kpi-item {
  background: var(--bg-subtle, #f8fafc);
  border: 1px solid var(--border-light, #e2e8f0);
  border-radius: var(--radius-md, 8px);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  transition: transform 0.15s, box-shadow 0.15s;
}

.roadmap-kpi-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.roadmap-kpi-item.kpi-focus {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-color: #93c5fd;
}

.roadmap-kpi-item.kpi-mastered {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-color: #86efac;
}

.roadmap-kpi-item .kpi-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.roadmap-kpi-item .kpi-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.roadmap-kpi-item .kpi-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #64748b;
}

.roadmap-kpi-item strong {
  font-size: 14px;
  color: var(--text-main, #0f172a);
}

.roadmap-kpi-item .kpi-sub {
  font-size: 11.5px;
  color: var(--text-muted, #94a3b8);
}

.btn-kpi-action {
  background: var(--primary-blue, #2563eb);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}

.btn-kpi-action:hover {
  background: #1d4ed8;
}

/* Quick-Jump Navigation Bar */
.roadmap-quick-jump-wrap {
  margin-bottom: 18px;
  padding: 12px 14px;
  background: var(--bg-subtle, #f8fafc);
  border: 1px solid var(--border-light, #e2e8f0);
  border-radius: var(--radius-md, 8px);
}

.quick-jump-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary, #475569);
  margin-bottom: 8px;
}

.quick-jump-pills-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.roadmap-jump-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1px solid var(--border-medium, #cbd5e1);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-main, #1e293b);
  cursor: pointer;
  transition: all 0.15s;
}

.roadmap-jump-pill:hover {
  border-color: var(--primary-blue, #2563eb);
  color: var(--primary-blue, #2563eb);
  transform: translateY(-1px);
}

.roadmap-jump-pill .jump-num {
  background: #e2e8f0;
  color: #334155;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.roadmap-jump-pill.active-focus {
  background: #eff6ff;
  border-color: var(--primary-blue, #2563eb);
  color: var(--primary-blue, #2563eb);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.roadmap-jump-pill.active-focus .jump-num {
  background: var(--primary-blue, #2563eb);
  color: white;
}

.roadmap-jump-pill.mastered {
  border-color: #86efac;
}

.roadmap-jump-pill.mastered .jump-num {
  background: #10b981;
  color: white;
}

/* Roadmap Filter Toolbar */
.roadmap-filter-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Stage Card Layout Enhancements */
.roadmap-card.card-active-focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2), 0 8px 24px rgba(59, 130, 246, 0.08);
}

.stage-badge-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.active-focus-tag {
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #93c5fd;
  white-space: nowrap;
}

.roadmap-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.stage-status-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  white-space: nowrap;
}

.stage-status-badge.status-mastered {
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #86efac;
}

.stage-status-badge.status-in-progress {
  background: #fef3c7;
  color: #b45309;
  border: 1px solid #fcd34d;
}

.stage-status-badge.status-not-started {
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #cbd5e1;
}

.stage-topics-label {
  font-size: 11px;
  color: var(--text-muted, #94a3b8);
  font-weight: 600;
  align-self: center;
}

.roadmap-header-actions-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.btn-set-focus {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  color: #475569;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-set-focus:hover {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #2563eb;
}

.active-stage-indicator {
  font-size: 11px;
  font-weight: 700;
  color: #10b981;
}

/* Key Concepts Box */
.stage-concepts-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-left: 3px solid #3b82f6;
  border-radius: var(--radius-sm, 6px);
  padding: 12px 14px;
  margin-bottom: 14px;
}

.stage-concepts-heading {
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.stage-concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 6px 12px;
}

.concept-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 12px;
  color: #334155;
  line-height: 1.4;
}

.concept-icon {
  flex-shrink: 0;
  font-size: 12px;
}

/* Difficulty Breakdown Chips */
.stage-diff-distribution {
  display: flex;
  gap: 6px;
  align-items: center;
}

.stage-diff-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: white;
  border: 1px solid #e2e8f0;
}

/* Milestone Banner */
.stage-milestone-banner {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1px solid #fde68a;
  border-radius: var(--radius-md, 8px);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.stage-milestone-banner.milestone-cleared {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-color: #86efac;
}

.milestone-banner-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.milestone-star-icon {
  font-size: 22px;
}

.milestone-banner-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.milestone-badge-title {
  font-size: 11px;
  font-weight: 700;
  color: #92400e;
  text-transform: uppercase;
}

.stage-milestone-banner.milestone-cleared .milestone-badge-title {
  color: #15803d;
}

.milestone-problem-name {
  font-size: 13.5px;
  color: #1e293b;
}

.milestone-status-label {
  font-size: 11px;
  color: #b45309;
  font-weight: 600;
}

.stage-milestone-banner.milestone-cleared .milestone-status-label {
  color: #15803d;
}

.btn-milestone-jump {
  background: white;
  border: 1px solid #d97706;
  color: #b45309;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}

.btn-milestone-jump:hover {
  background: #f59e0b;
  color: white;
}

.stage-milestone-banner.milestone-cleared .btn-milestone-jump {
  border-color: #16a34a;
  color: #15803d;
}

.stage-milestone-banner.milestone-cleared .btn-milestone-jump:hover {
  background: #16a34a;
  color: white;
}

/* Starter Chip Actions */
.starter-chip-actions {
  display: flex;
  gap: 6px;
  margin-top: 4px;
}

.btn-chip-workspace {
  background: #f8fafc;
  border: 1px solid var(--border-medium, #cbd5e1);
  color: var(--text-main, #334155);
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  text-align: center;
  transition: all 0.15s;
}

.btn-chip-workspace:hover {
  background: #eff6ff;
  border-color: var(--primary-blue, #2563eb);
  color: var(--primary-blue, #2563eb);
}

.roadmap-starter-chip.chip-attempted {
  background: #fffbeb;
  border-color: #fde68a;
}

.status-attempted-dot {
  color: #d97706;
  font-size: 11px;
  font-weight: 700;
}

/* Stage Card Footer */
.roadmap-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 14px;
  border-top: 1px solid var(--border-light, #e2e8f0);
}

.btn-stage-practice {
  font-size: 13px;
  font-weight: 700;
  padding: 8px 16px;
}

.btn-stage-explore {
  font-size: 12.5px;
  font-weight: 600;
  padding: 8px 14px;
}

/* Main Dashboard Overview Card Enhancements */
.overview-focus-banner {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #bfdbfe;
  border-radius: var(--radius-md, 8px);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.overview-focus-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.focus-pill {
  background: #2563eb;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
}

.focus-stat-text {
  font-size: 11.5px;
  color: #475569;
}

.btn-overview-continue {
  background: white;
  border: 1px solid #3b82f6;
  color: #1d4ed8;
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}

.btn-overview-continue:hover {
  background: #2563eb;
  color: white;
}

.roadmap-summary-item.active-stage-item {
  border-left: 3px solid #3b82f6;
  background: #f8fafc;
}

.summary-focus-tag {
  background: #eff6ff;
  color: #2563eb;
  font-size: 9.5px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 4px;
  margin-left: 4px;
}

.roadmap-summary-bullet.bullet-mastered {
  background: #10b981;
}

.progress-fill.fill-mastered {
  background: #10b981;
}

/* Stage Jump Pulse Animation */
@keyframes stagePulseHighlight {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.2);
    transform: scale(1.01);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
    transform: scale(1);
  }
}

.stage-highlight-pulse {
  animation: stagePulseHighlight 1.5s ease-out;
}

/* Stage Select Dropdown in Problem Explorer */
.stage-select {
  max-width: 200px;
}
"""

with open(css_file + '.tmp', 'w', encoding='utf-8') as f:
    f.write(css_content + phase7_css)

os.replace(css_file + '.tmp', css_file)
print("[SUCCESS] Phase 7 styles appended to styles.css")
