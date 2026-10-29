# scratch/append_phase4_styles.py
import os

css_chunk = """
/* ==========================================================================
   PHASE 4: SEARCH, FILTERS, ROUTING, REVIEW & IMPORT STYLES
   ========================================================================== */

/* Review Button in Problem Row */
.col-review {
  width: 44px;
  text-align: center;
}

.review-btn {
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: 4px 6px;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.35;
  transition: all 0.15s ease;
}

.review-btn:hover {
  opacity: 0.9;
  background: rgba(147, 51, 234, 0.08);
  transform: scale(1.1);
}

.review-btn.active {
  opacity: 1;
  background: rgba(147, 51, 234, 0.15);
  border-color: rgba(147, 51, 234, 0.35);
  filter: drop-shadow(0 1px 2px rgba(147, 51, 234, 0.25));
}

.review-badge-pill {
  display: inline-flex;
  align-items: center;
  background: #f3e8ff;
  color: #7e22ce;
  border: 1px solid #d8b4fe;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 9999px;
  margin-left: 6px;
}

/* Status Filter Pill Colors */
.filter-pill.filter-review.active {
  background: #9333ea;
  border-color: #9333ea;
  color: white;
}

.filter-pill.filter-star.active {
  background: #d97706;
  border-color: #d97706;
  color: white;
}

.filter-pill.filter-notes.active {
  background: #0284c7;
  border-color: #0284c7;
  color: white;
}

/* Page Size Selector */
.page-size-selector-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-right: 12px;
}

.page-size-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.page-size-select {
  padding: 3px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-light);
  background: white;
  color: var(--text-main);
  cursor: pointer;
}

.btn-page-nav {
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* Modal Direct Route Bar */
.modal-route-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 14px;
  background: #f8fafc;
  border-bottom: 1px solid var(--border-light);
}

.route-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

.route-badge code {
  background: white;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--border-light);
  color: var(--primary-blue);
  font-family: var(--font-mono);
  font-weight: 600;
}

.btn-copy-route {
  background: white;
  border: 1px solid var(--border-light);
  padding: 3px 9px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-copy-route:hover {
  background: var(--primary-blue-subtle);
  border-color: var(--primary-blue);
  color: var(--primary-blue);
}

.route-feedback-toast {
  font-size: 11px;
  font-weight: 600;
  color: var(--diff-easy);
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 8px;
  border-radius: 9999px;
  animation: fadeIn 0.2s ease-out;
}

/* Modal Review Button */
.btn-hero-review {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-md);
  border: 1px solid #d8b4fe;
  background: #faf5ff;
  color: #7e22ce;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-hero-review:hover {
  background: #f3e8ff;
  border-color: #c084fc;
}

.btn-hero-review.active {
  background: #9333ea;
  color: white;
  border-color: #7e22ce;
}

/* Toolbar Actions Group */
.toolbar-actions-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.btn-import-problems {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-import-problems:hover {
  background: #f0fdf4;
  border-color: #86efac;
  color: #15803d;
}

/* Import Modal Dialog */
.import-modal-card {
  max-width: 680px;
  width: 90%;
}

.import-help-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 12px;
}

.import-options-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 10px;
  font-size: 12px;
}

.import-strategy-label {
  font-weight: 700;
  color: var(--text-main);
}

.radio-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: var(--text-secondary);
}

.btn-import-sample {
  margin-left: auto;
  background: #f1f5f9;
  border: 1px solid var(--border-light);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-secondary);
}

.btn-import-sample:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

.import-json-textarea {
  width: 100%;
  height: 180px;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.5;
  padding: 10px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  background: #f8fafc;
  color: var(--text-main);
  resize: vertical;
  box-sizing: border-box;
}

.import-json-textarea:focus {
  outline: none;
  border-color: var(--primary-blue);
  background: white;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.import-validation-box {
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: 12px;
  line-height: 1.5;
  border: 1px solid var(--border-light);
  background: #f8fafc;
}

.report-summary strong {
  color: var(--text-main);
}

.report-line {
  margin-top: 4px;
}

.report-valid {
  color: #15803d;
  font-weight: 600;
}

.report-dup {
  color: #b45309;
  font-weight: 600;
}

.dup-list {
  margin: 4px 0 0 18px;
  padding: 0;
  font-size: 11px;
  color: var(--text-secondary);
}

.report-error {
  color: #dc2626;
  font-weight: 600;
}
"""

with open('app_build/styles.css', 'r', encoding='utf-8') as f:
    existing = f.read()

if 'PHASE 4: SEARCH, FILTERS, ROUTING, REVIEW & IMPORT STYLES' not in existing:
    updated = existing + "\n" + css_chunk
    with open('app_build/styles.css.tmp', 'w', encoding='utf-8') as f:
        f.write(updated)
    os.replace('app_build/styles.css.tmp', 'app_build/styles.css')
    print("Phase 4 styles appended successfully")
else:
    print("Phase 4 styles already present")
