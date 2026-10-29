import os

css_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\styles.css"
tmp_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\styles.css.tmp"

phase3_css = """
/* =========================================================
   PHASE 3: STRUCTURED 300-PROBLEM CATALOG, EXAMPLES & NOTES
   ========================================================= */

/* External LeetCode Source Link Button */
.btn-external-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #f8fafc;
  border: 1px solid var(--border-medium);
  color: #0284c7;
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.15s;
}

.btn-external-link:hover {
  background: #e0f2fe;
  color: #0369a1;
  border-color: #7dd3fc;
}

/* Reference Verification Banner */
.modal-verification-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-left: 4px solid #10b981;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 12.5px;
  color: #166534;
}

.verify-icon {
  font-weight: 800;
  color: #10b981;
  font-size: 14px;
}

/* Prerequisites Chips */
.prereqs-wrap {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.prereq-chip {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
}

/* Structured Examples Box */
.examples-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.example-box {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}

.example-num {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

.example-row code {
  background: white;
  border: 1px solid var(--border-light);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-main);
}

/* Constraints List */
.constraints-list {
  list-style-type: disc;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12.5px;
  color: var(--text-secondary);
}

.constraints-list code {
  background: var(--bg-subtle);
  padding: 1px 5px;
  border-radius: 3px;
  font-family: var(--font-mono);
  font-size: 11.5px;
}

/* Personal Notes Section */
.notes-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notes-save-feedback {
  font-size: 11.5px;
  font-weight: 700;
  color: #10b981;
}

.modal-notes-textarea {
  width: 100%;
  min-height: 85px;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-main);
  background: white;
  resize: vertical;
  outline: none;
  transition: border-color 0.15s;
}

.modal-notes-textarea:focus {
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.notes-action-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.btn-save-note {
  background: #1e293b;
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s;
}

.btn-save-note:hover {
  background: #0f172a;
}

.notes-hint-text {
  font-size: 11px;
  color: var(--text-muted);
}

/* Note Indicator on Table Row */
.note-pill-indicator {
  font-size: 12px;
  cursor: default;
}
"""

with open(css_path, "r", encoding="utf-8") as f:
    existing_css = f.read()

new_css = existing_css + "\n" + phase3_css

with open(tmp_path, "w", encoding="utf-8") as f:
    f.write(new_css)

os.replace(tmp_path, css_path)
print("Successfully appended Phase 3 styles to styles.css!")
