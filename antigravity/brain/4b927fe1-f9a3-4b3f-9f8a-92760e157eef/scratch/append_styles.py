import os

css_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\styles.css"
tmp_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\styles.css.tmp"

dsa_css = """
/* =========================================================
   DSA LEARNING HUB & ACADEMY STYLES (PHASE 1)
   ========================================================= */

/* Top Bar View Switcher Tabs */
.nav-view-switcher {
  display: inline-flex;
  align-items: center;
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 3px;
  gap: 4px;
  margin-left: 6px;
}

.nav-tab-btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.nav-tab-btn:hover {
  color: var(--text-main);
  background-color: rgba(255, 255, 255, 0.7);
}

.nav-tab-btn.active {
  background-color: var(--bg-card);
  color: var(--primary-blue);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Active DSA Banner inside Visualizer */
.dsa-active-banner {
  background: linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%);
  border-bottom: 1px solid #bfdbfe;
  padding: 10px 24px;
  position: sticky;
  top: 57px;
  z-index: 15;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.04);
}

.dsa-active-banner-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.dsa-active-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.dsa-active-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--primary-blue);
  background: #dbeafe;
  padding: 3px 8px;
  border-radius: 999px;
}

.dsa-active-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-main);
  flex-wrap: wrap;
}

.dsa-active-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-banner-solve {
  background-color: #10b981;
  color: white;
  border: none;
  font-weight: 600;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s;
}

.btn-banner-solve:hover {
  background-color: #059669;
}

.btn-banner-back {
  background-color: white;
  color: var(--text-secondary);
  border: 1px solid var(--border-medium);
  font-weight: 600;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s;
}

.btn-banner-back:hover {
  background-color: var(--bg-subtle);
  color: var(--text-main);
}

.solved-pill {
  background-color: #d1fae5;
  color: #065f46;
  font-weight: 700;
  font-size: 12.5px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid #a7f3d0;
}

/* Container for DSA Learning View */
.dsa-learning-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 24px 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dsa-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Header Card */
.dsa-header-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  border-radius: var(--radius-lg);
  padding: 28px 32px;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dsa-logo-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #93c5fd;
  width: fit-content;
}

.dsa-title {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-top: 6px;
}

.dsa-subtitle {
  color: #94a3b8;
  font-size: 14.5px;
  max-width: 860px;
  line-height: 1.5;
  margin-top: 6px;
}

.dsa-subnav {
  display: flex;
  gap: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 16px;
  flex-wrap: wrap;
}

.dsa-tab-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  padding: 9px 18px;
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dsa-tab-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.dsa-tab-btn.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

/* Metrics Cards Grid */
.dsa-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.metric-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  transition: transform 0.2s, box-shadow 0.2s;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.06);
}

.metric-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1;
}

.metric-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.metric-sublabel {
  font-size: 11.5px;
  color: var(--text-muted);
}

/* Continue Learning Hero Card */
.continue-hero-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1.5px solid #bfdbfe;
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  box-shadow: 0 4px 20px -2px rgba(37, 99, 235, 0.08);
  position: relative;
  overflow: hidden;
}

.continue-hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--primary-blue);
  background: var(--primary-blue-soft);
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
}

.hero-pulse {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  display: inline-block;
}

.continue-hero-title-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.continue-hero-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
}

.continue-hero-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.continue-hero-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 10px 0 16px;
  max-width: 900px;
}

.continue-hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.btn-hero-primary {
  background: var(--primary-blue);
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
}

.btn-hero-primary:hover {
  background: var(--primary-blue-hover);
  transform: translateY(-1px);
}

.btn-hero-subtle {
  background: var(--bg-card);
  color: var(--text-secondary);
  border: 1px solid var(--border-medium);
  padding: 9px 18px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-hero-subtle:hover {
  background: var(--bg-subtle);
  color: var(--text-main);
}

.btn-hero-star {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border-light);
  padding: 9px 16px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-hero-star.active {
  color: #f59e0b;
  border-color: #fcd34d;
  background: #fffbeb;
}

/* Two-Column Layout */
.dsa-two-col-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 960px) {
  .dsa-two-col-layout {
    grid-template-columns: 1fr;
  }
}

.dsa-col-left, .dsa-col-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dsa-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.dsa-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.dsa-card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
}

.dsa-card-meta {
  font-size: 12px;
  color: var(--text-muted);
}

.btn-card-action {
  background: transparent;
  border: none;
  color: var(--primary-blue);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-card-action:hover {
  text-decoration: underline;
}

/* Difficulty Bars */
.diff-bars-wrap {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.diff-item {
  cursor: pointer;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  transition: background 0.15s;
}

.diff-item:hover {
  background: var(--bg-subtle);
}

.diff-item-header {
  display: flex;
  justify-content: space-between;
  font-size: 13.5px;
  margin-bottom: 6px;
}

.diff-easy-name { color: #10b981; font-weight: 700; }
.diff-med-name { color: #f59e0b; font-weight: 700; }
.diff-hard-name { color: #ef4444; font-weight: 700; }

.progress-track {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-track-sm {
  height: 6px;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;
}

.fill-easy { background: #10b981; }
.fill-medium { background: #f59e0b; }
.fill-hard { background: #ef4444; }
.fill-phase { background: var(--primary-blue); }

/* Recently Practiced List */
.recent-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recent-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  gap: 12px;
}

.recent-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.recent-title-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
}

.recent-sub {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

.recent-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-recent-run {
  background: var(--primary-blue);
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s;
}

.btn-recent-run:hover {
  background: var(--primary-blue-hover);
}

/* Roadmap Summary List */
.roadmap-summary-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.roadmap-summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  background: var(--bg-subtle);
}

.roadmap-summary-bullet {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1e293b;
  color: white;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.roadmap-summary-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.roadmap-summary-title {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-main);
}

.roadmap-summary-counts {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
}

.btn-phase-jump {
  background: white;
  border: 1px solid var(--border-medium);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.btn-phase-jump:hover {
  color: var(--primary-blue);
  border-color: var(--primary-blue);
}

/* Topic Mastery Section */
.dsa-topic-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dsa-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.dsa-section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
}

.dsa-section-desc {
  font-size: 13.5px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}

.topic-mastery-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.topic-mastery-card:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
  transform: translateY(-2px);
}

.topic-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topic-icon { font-size: 20px; }

.topic-count-badge {
  font-size: 11.5px;
  font-weight: 700;
  background: var(--bg-subtle);
  padding: 2px 8px;
  border-radius: 999px;
  color: var(--text-secondary);
}

.topic-card-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-main);
}

.topic-card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  color: var(--text-muted);
  font-weight: 500;
}

.topic-action-hint {
  color: var(--primary-blue);
  font-weight: 600;
}

/* Problem Explorer & Table */
.problem-explorer-wrap {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.problem-toolbar {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.toolbar-search-box {
  display: flex;
  align-items: center;
  background: var(--bg-subtle);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  padding: 8px 14px;
  gap: 10px;
}

.search-input {
  border: none;
  background: transparent;
  width: 100%;
  font-size: 14.5px;
  color: var(--text-main);
  outline: none;
}

.search-clear-btn {
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--text-muted);
  cursor: pointer;
}

.toolbar-filters-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-secondary);
}

.filter-select {
  border: 1px solid var(--border-medium);
  background: white;
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  font-size: 13px;
  color: var(--text-main);
  outline: none;
}

.pill-group {
  display: flex;
  gap: 4px;
}

.filter-pill {
  border: 1px solid var(--border-light);
  background: white;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-pill:hover {
  background: var(--bg-subtle);
}

.filter-pill.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.btn-clear-filters {
  background: transparent;
  border: 1px solid var(--border-medium);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-left: auto;
}

.btn-clear-filters:hover {
  background: var(--bg-subtle);
  color: var(--text-main);
}

.table-meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-secondary);
  margin: 4px 0;
}

.table-meta-bar.bottom-meta {
  margin-top: 12px;
}

.problem-table-scroll {
  overflow-x: auto;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  background: white;
}

.problem-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13.5px;
}

.problem-table th {
  background: var(--bg-subtle);
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-light);
  white-space: nowrap;
}

.problem-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
}

.problem-row:hover {
  background: #f8fafc;
}

.problem-row.row-solved {
  background: #f0fdf4;
}

.star-btn {
  background: transparent;
  border: none;
  font-size: 16px;
  color: var(--text-muted);
  cursor: pointer;
}

.star-btn.active {
  color: #f59e0b;
}

.lc-badge {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  color: #475569;
  background: #f1f5f9;
  padding: 2px 7px;
  border-radius: 4px;
  white-space: nowrap;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.problem-title-link {
  font-weight: 600;
  color: var(--text-main);
  text-decoration: none;
}

.problem-title-link:hover {
  color: var(--primary-blue);
  text-decoration: underline;
}

.pattern-chip {
  font-size: 11px;
  background: #f1f5f9;
  color: #64748b;
  padding: 2px 6px;
  border-radius: 4px;
}

.topic-tag {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-subtle);
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.pattern-tag {
  font-size: 11.5px;
  color: #64748b;
  background: #f8fafc;
  border: 1px solid var(--border-light);
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.diff-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  display: inline-block;
  white-space: nowrap;
}

.diff-easy { background: #d1fae5; color: #065f46; }
.diff-medium { background: #fef3c7; color: #92400e; }
.diff-hard { background: #fee2e2; color: #991b1b; }

.status-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.status-badge.solved {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.attempted {
  background: #fef3c7;
  color: #92400e;
}

.status-toggle-btn {
  border: 1px solid var(--border-light);
  background: white;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}

.status-toggle-btn.solved {
  background: #d1fae5;
  color: #065f46;
  border-color: #a7f3d0;
}

.status-toggle-btn.attempted {
  background: #fef3c7;
  color: #92400e;
  border-color: #fde68a;
}

.status-toggle-btn.not-started {
  color: var(--text-muted);
}

.complexity-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  background: #f1f5f9;
  color: #475569;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 4px;
  white-space: nowrap;
}

.btn-table-visualize {
  background: var(--primary-blue);
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}

.btn-table-visualize:hover {
  background: var(--primary-blue-hover);
}

.pagination-bar {
  display: flex;
  align-items: center;
  gap: 4px;
}

.btn-page {
  border: 1px solid var(--border-light);
  background: white;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.btn-page:hover:not(:disabled) {
  background: var(--bg-subtle);
  color: var(--text-main);
}

.btn-page.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.btn-page:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-ellipsis {
  padding: 0 4px;
  color: var(--text-muted);
}

/* Roadmap 8-Phase View */
.dsa-full-roadmap-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.roadmap-intro-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.roadmap-intro-card h2 {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 6px;
}

.roadmap-intro-card p {
  color: var(--text-secondary);
  font-size: 14.5px;
  line-height: 1.5;
}

.roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.roadmap-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  transition: border-color 0.2s;
}

.roadmap-card.phase-completed {
  border-color: #10b981;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.roadmap-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.roadmap-phase-badge {
  background: #1e293b;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 8px;
  white-space: nowrap;
}

.roadmap-header-main {
  flex: 1;
}

.roadmap-phase-title {
  font-size: 16.5px;
  font-weight: 700;
  color: var(--text-main);
}

.roadmap-topics-list {
  display: flex;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.roadmap-phase-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.roadmap-stat-number {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-main);
}

.roadmap-stat-label {
  font-size: 11px;
  color: var(--text-muted);
}

.roadmap-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 14px;
  line-height: 1.5;
}

.roadmap-progress-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.roadmap-progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
}

.milestone-badge {
  color: var(--primary-blue);
  font-weight: 600;
}

.roadmap-starters-heading {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.roadmap-starters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.roadmap-starter-chip {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.roadmap-starter-chip.chip-solved {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.starter-chip-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-solved-dot {
  color: #10b981;
  font-weight: 800;
  font-size: 14px;
}

.starter-chip-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}

.starter-chip-pattern {
  font-size: 11px;
  color: #64748b;
}

.btn-chip-visualize {
  background: white;
  border: 1px solid var(--border-medium);
  color: var(--primary-blue);
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  margin-top: 2px;
}

.btn-chip-visualize:hover {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

/* Problem Modal */
.dsa-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.dsa-modal-card {
  background: white;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dsa-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dsa-modal-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.dsa-modal-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
}

.dsa-modal-close-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  color: var(--text-muted);
  cursor: pointer;
}

.dsa-modal-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.dsa-modal-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dsa-section-label {
  font-size: 12.5px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.dsa-desc-text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-main);
}

.dsa-code-preview {
  background: #1e293b;
  color: #f8fafc;
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.5;
  padding: 16px;
  border-radius: var(--radius-sm);
  overflow-x: auto;
}

.dsa-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-light);
  padding-top: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.modal-footer-left, .modal-footer-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.empty-state-box {
  background: var(--bg-card);
  border: 1px dashed var(--border-medium);
  border-radius: var(--radius-md);
  padding: 32px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.empty-state-icon {
  font-size: 32px;
}

.empty-state-text {
  color: var(--text-secondary);
  font-size: 14px;
  max-width: 480px;
}
"""

with open(css_path, "r", encoding="utf-8") as f:
    existing_css = f.read()

new_css = existing_css + "\n" + dsa_css

with open(tmp_path, "w", encoding="utf-8") as f:
    f.write(new_css)

os.replace(tmp_path, css_path)
print("Successfully appended DSA styles to styles.css!")
