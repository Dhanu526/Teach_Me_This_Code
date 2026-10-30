import os

css_file = r'C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\styles.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

phase8_css = """
/* ==========================================================================
   PHASE 8: LOCAL PROGRESS STORAGE, BACKUP & PREFERENCES STYLES
   ========================================================================== */

/* Header Storage Row & Quick Health Tag */
.dsa-header-storage-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.storage-health-tag {
  background: #f1f5f9;
  color: #475569;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-header-storage {
  background: #eff6ff;
  border: 1px solid #93c5fd;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s;
}

.btn-header-storage:hover {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

/* Storage Modal Layout */
.storage-modal-card {
  max-width: 860px;
  width: 95%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.storage-modal-body {
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Local Storage Transparency Notice Banner */
.storage-notice-banner {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #bfdbfe;
  border-left: 4px solid #2563eb;
  border-radius: var(--radius-md, 8px);
  padding: 14px 18px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.storage-notice-banner .notice-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}

.storage-notice-banner .notice-content {
  font-size: 13px;
  line-height: 1.5;
  color: #1e3a8a;
}

.storage-notice-banner .notice-content strong {
  display: block;
  font-size: 13.5px;
  margin-bottom: 3px;
  color: #1e40af;
}

.storage-notice-banner .notice-content p {
  margin: 0;
  color: #334155;
}

/* Section Headings */
.storage-section-title {
  font-size: 14.5px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Live Storage Stats Grid */
.storage-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}

.storage-stat-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-sm, 6px);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.storage-stat-item .stat-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.storage-stat-item .stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.storage-stat-item .stat-val {
  font-size: 14px;
  color: #0f172a;
}

.storage-stat-item .stat-lbl {
  font-size: 11px;
  color: #64748b;
}

/* Two Column Layout: Export & Import */
.storage-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .storage-two-col {
    grid-template-columns: 1fr;
  }
}

.storage-card-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md, 8px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.storage-card-box.export-box {
  border-top: 3px solid #2563eb;
}

.storage-card-box.import-box {
  border-top: 3px solid #10b981;
}

.card-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-box-title {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.card-box-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f1f5f9;
  color: #475569;
  text-transform: uppercase;
}

.card-box-desc {
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.45;
  margin: 0;
}

.card-box-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

.export-feedback-toast, .pref-feedback-toast {
  font-size: 11.5px;
  font-weight: 600;
  color: #16a34a;
  text-align: center;
}

/* Import Progress Elements */
.import-options-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
}

.import-mode-select {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hidden-file-input {
  display: none;
}

.btn-file-select {
  background: #f8fafc;
  border: 1px dashed #94a3b8;
  color: #334155;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  transition: all 0.15s;
}

.btn-file-select:hover {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #2563eb;
}

.import-progress-textarea {
  width: 100%;
  height: 90px;
  font-family: var(--font-mono, monospace);
  font-size: 11.5px;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  resize: vertical;
  color: #1e293b;
  box-sizing: border-box;
}

.import-progress-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

/* Real-time Pre-Import Validation Box */
.storage-validation-box {
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 12px;
}

.storage-validation-box.validation-ok {
  background: #f0fdf4;
  border: 1px solid #86efac;
  color: #166534;
}

.storage-validation-box.validation-err {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.validation-title {
  font-weight: 700;
  font-size: 12.5px;
  margin-bottom: 4px;
}

.validation-summary {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 11.5px;
}

.validation-errors {
  font-size: 11.5px;
  line-height: 1.4;
  margin-bottom: 4px;
}

.validation-warns {
  font-size: 11px;
  color: #854d0e;
  margin-top: 4px;
}

.validation-guard-msg {
  font-size: 10.5px;
  font-weight: 600;
  color: #b91c1c;
  margin-top: 4px;
}

/* Learning Preferences Section */
.preferences-section {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md, 8px);
  padding: 16px;
}

.preferences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.pref-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pref-label {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}

.pref-select {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12.5px;
  color: #1e293b;
}

.pref-actions-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-save-pref {
  background: #1e293b;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 7px 14px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-save-pref:hover {
  background: #0f172a;
}

/* Danger Zone Section */
.danger-zone-section {
  border: 1px solid #fecaca;
  background: #fff5f5;
  border-radius: var(--radius-md, 8px);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.danger-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.danger-icon {
  font-size: 22px;
}

.danger-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #991b1b;
  margin: 0 0 2px 0;
}

.danger-desc {
  font-size: 12px;
  color: #7f1d1d;
  margin: 0;
}

.btn-danger-reset {
  background: white;
  border: 1px solid #dc2626;
  color: #dc2626;
  font-size: 12px;
  font-weight: 700;
  padding: 7px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.btn-danger-reset:hover {
  background: #dc2626;
  color: white;
}
"""

with open(css_file + '.tmp', 'w', encoding='utf-8') as f:
    f.write(css_content + phase8_css)

os.replace(css_file + '.tmp', css_file)
print("[SUCCESS] Appended Phase 8 styles to styles.css")
