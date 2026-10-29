import os

css_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\styles.css"
tmp_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\styles.css.tmp"

phase2_css = """
/* =========================================================
   PHASE 2: 30 SEARCHABLE TOPIC LIBRARY & TOPIC DETAIL STYLES
   ========================================================= */

/* Topic Library View */
.topic-library-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.topic-library-toolbar {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.topic-toolbar-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.section-heading-lg {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.3px;
}

.section-subtext {
  font-size: 13.5px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.topic-toolbar-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.topic-search-box {
  flex: 1;
  min-width: 280px;
  display: flex;
  align-items: center;
  background: var(--bg-subtle);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  padding: 8px 14px;
  gap: 10px;
}

.topic-category-chips {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* 30 Topic Cards Grid */
.topic-30-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
}

.topic-30-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  border-top: 3.5px solid var(--topic-accent, #2563eb);
}

.topic-30-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  border-color: var(--topic-accent, #2563eb);
}

.topic-30-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.topic-header-title-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.topic-30-icon {
  font-size: 26px;
  line-height: 1;
}

.topic-30-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.2;
}

.topic-cat-badge {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.topic-30-count-bubble {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text-secondary);
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.topic-30-summary {
  font-size: 12.5px;
  color: var(--text-secondary);
  line-height: 1.45;
  flex: 1;
}

.topic-30-progress-section {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.topic-progress-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
}

.topic-diff-pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.topic-diff-pills .diff-badge {
  font-size: 10.5px;
  padding: 2px 7px;
}

.topic-next-chip {
  background: var(--bg-subtle);
  border: 1px dashed var(--border-medium);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.next-chip-label {
  font-weight: 700;
  color: var(--text-muted);
  font-size: 11px;
  text-transform: uppercase;
  white-space: nowrap;
}

.next-chip-title {
  flex: 1;
  font-weight: 600;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-next-step {
  background: var(--primary-blue);
  color: white;
  border: none;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-next-step:hover {
  background: var(--primary-blue-hover);
}

.topic-30-card-footer {
  border-top: 1px solid var(--border-light);
  padding-top: 10px;
  margin-top: 2px;
}

.btn-open-topic {
  width: 100%;
  background: transparent;
  border: 1px solid var(--border-medium);
  color: var(--primary-blue);
  font-size: 12.5px;
  font-weight: 600;
  padding: 7px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;
}

.btn-open-topic:hover {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

/* Dedicated Topic Detail Page */
.topic-detail-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.topic-breadcrumb-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
}

.btn-back-breadcrumb {
  background: transparent;
  border: none;
  color: var(--primary-blue);
  font-weight: 600;
  cursor: pointer;
}

.btn-back-breadcrumb:hover {
  text-decoration: underline;
}

.breadcrumb-sep {
  color: var(--text-muted);
}

.breadcrumb-current {
  font-weight: 700;
  color: var(--text-main);
}

.topic-detail-hero {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
  border-top: 4px solid var(--topic-accent, #2563eb);
}

.topic-hero-main {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.topic-hero-icon-title {
  display: flex;
  align-items: center;
  gap: 14px;
}

.hero-topic-icon {
  font-size: 36px;
  line-height: 1;
}

.hero-topic-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.5px;
}

.topic-detail-desc {
  font-size: 14.5px;
  color: var(--text-secondary);
  line-height: 1.5;
  max-width: 900px;
}

.topic-detail-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.topic-meta-box {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-box-val {
  font-size: 22px;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1;
}

.meta-box-lbl {
  font-size: 11.5px;
  color: var(--text-muted);
  font-weight: 600;
}

.val-green { color: #10b981; }
.val-amber { color: #f59e0b; }
.val-gray { color: #64748b; }

.topic-detail-diff-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.diff-card-heading {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.topic-detail-diff-bars {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .topic-detail-diff-bars {
    grid-template-columns: 1fr;
  }
}

.topic-diff-col {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.diff-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

/* Recommended Next Problem Card in Topic */
.topic-recommended-card {
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
  border: 1.5px solid #86efac;
  border-radius: var(--radius-md);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
}

.rec-card-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #065f46;
  background: #d1fae5;
  padding: 3px 8px;
  border-radius: 999px;
  width: fit-content;
}

.rec-card-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.rec-card-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-main);
}

.rec-card-badges {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.rec-card-desc {
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.45;
  margin: 4px 0 8px;
  max-width: 860px;
}

.rec-card-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Pattern Select Dropdown */
.pattern-select {
  max-width: 220px;
}

/* Multi-Topic Chips in Table */
.col-topics-multi {
  min-width: 160px;
}

.multi-topics-wrap {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
}

.mini-topic-chip {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}

.mini-topic-chip:hover {
  background: var(--primary-blue-soft);
  color: var(--primary-blue);
  border-color: var(--primary-blue-border);
}

.more-topics-tag {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  background: #f1f5f9;
  padding: 2px 5px;
  border-radius: 4px;
}

.topic-highlight-card {
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

.topic-highlight-card:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
  transform: translateY(-2px);
}
"""

with open(css_path, "r", encoding="utf-8") as f:
    existing_css = f.read()

new_css = existing_css + "\n" + phase2_css

with open(tmp_path, "w", encoding="utf-8") as f:
    f.write(new_css)

os.replace(tmp_path, css_path)
print("Successfully appended Phase 2 styles to styles.css!")
