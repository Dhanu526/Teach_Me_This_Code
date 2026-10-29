import re

styles_path = r'C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\styles.css'
with open(styles_path, 'r', encoding='utf-8') as f:
    css = f.read()

phase9_css = '''
/* ==========================================================================
   PHASE 9: USER INTERFACE, EXPERIENCE, ACCESSIBILITY & BREADCRUMBS
   ========================================================================== */

/* Breadcrumb Navigation */
.dsa-breadcrumb-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px 14px;
  background: #ffffff;
  border: 1px solid var(--border-light, #e2e8f0);
  border-radius: var(--radius-sm, 8px);
  font-size: 13px;
  margin-bottom: 12px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
}

.breadcrumb-item {
  background: none;
  border: none;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--primary-blue, #2563eb);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.12s ease;
}

.breadcrumb-item:hover {
  background: #eff6ff;
  text-decoration: underline;
}

.breadcrumb-item.current {
  color: var(--text-main, #0f172a);
  font-weight: 600;
  cursor: default;
  text-decoration: none;
  background: transparent;
}

.breadcrumb-sep {
  color: var(--text-muted, #94a3b8);
  font-size: 12px;
  user-select: none;
}

/* Beginner Mode Toggle Button */
.btn-mode-toggle {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 99px;
  border: 1px solid #10b981;
  background: #ecfdf5;
  color: #065f46;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
}

.btn-mode-toggle:hover {
  background: #d1fae5;
  border-color: #059669;
}

.btn-mode-toggle:not(.active) {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #475569;
}

.btn-mode-toggle:not(.active):hover {
  background: #e2e8f0;
  color: #0f172a;
}

/* Workspace Prev / Next Navigation Controls */
.workspace-prev-next-nav {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #f8fafc;
  border: 1px solid var(--border-light, #e2e8f0);
  border-radius: 6px;
  padding: 2px 4px;
  margin-left: 8px;
}

.btn-ws-nav-step {
  background: transparent;
  border: none;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-blue, #2563eb);
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 4px;
  transition: all 0.12s ease;
}

.btn-ws-nav-step:hover {
  background: #dbeafe;
  color: var(--primary-blue-hover, #1d4ed8);
}

.ws-step-indicator {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--text-muted, #94a3b8);
  font-weight: 600;
  padding: 0 4px;
}

/* Educational Error Card & Beginner Feedback */
.console-error-card {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius-sm, 8px);
  padding: 12px 14px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}

.error-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-badge {
  background: #dc2626;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.error-line-badge {
  background: #fee2e2;
  color: #991b1b;
  font-size: 11.5px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-mono);
}

.error-message-text {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: #991b1b;
  white-space: pre-wrap;
  line-height: 1.45;
}

.error-beginner-tip {
  background: #ffffff;
  border: 1px solid #fed7aa;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 12.5px;
  color: #9a3412;
  margin-top: 4px;
  line-height: 1.4;
}

.test-error-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #92400e;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 4px;
  padding: 4px 8px;
}

/* Enhanced Empty State Card */
.dsa-empty-state-card {
  text-align: center;
  padding: 40px 24px;
  background: #ffffff;
  border: 1px dashed var(--border-medium, #cbd5e1);
  border-radius: var(--radius-md, 12px);
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.dsa-empty-state-card .empty-state-icon {
  font-size: 36px;
  margin-bottom: 4px;
}

.dsa-empty-state-card .empty-state-heading {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main, #0f172a);
}

.dsa-empty-state-card .empty-state-text {
  font-size: 13.5px;
  color: var(--text-secondary, #475569);
  max-width: 520px;
  margin-bottom: 8px;
}

.btn-clear-empty-filters {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  padding: 7px 16px;
  border-radius: var(--radius-sm, 8px);
  border: none;
  background: var(--primary-blue, #2563eb);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-clear-empty-filters:hover {
  background: var(--primary-blue-hover, #1d4ed8);
}

/* Compact Spacing & Gap Adjustments (Interface Beauty) */
.dsa-learning-container {
  padding: 14px 20px 48px;
  gap: 14px;
}

.dsa-wrapper {
  gap: 16px;
}

.dsa-metrics-grid {
  gap: 12px;
}

.metric-card {
  padding: 12px 16px;
}

.workspace-hero-banner {
  padding: 12px 16px;
  margin-bottom: 10px;
}

.workspace-top-bar {
  margin-bottom: 10px;
  gap: 8px;
}

.workspace-2col-layout {
  gap: 14px;
}

.guide-card {
  padding: 12px 14px;
  margin-bottom: 10px;
}

/* Responsive Rules for Small Devices & Narrow Screens */
@media (max-width: 900px) {
  .dsa-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dsa-two-col-layout {
    grid-template-columns: 1fr;
  }

  .workspace-2col-layout {
    grid-template-columns: 1fr;
  }

  .top-bar-primary {
    flex-wrap: wrap;
    gap: 8px;
  }

  .brand-area {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 600px) {
  .dsa-metrics-grid {
    grid-template-columns: 1fr;
  }

  .dsa-subnav {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 4px;
  }

  .table-meta-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .workspace-top-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .workspace-quick-actions {
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
  }
}

/* High Contrast Status Indicator Consistency */
.status-pill-solved,
.solved-pill {
  background: #ecfdf5 !important;
  border: 1px solid #10b981 !important;
  color: #065f46 !important;
  font-weight: 600 !important;
}

.status-pill-attempted {
  background: #fffbeb !important;
  border: 1px solid #f59e0b !important;
  color: #92400e !important;
  font-weight: 600 !important;
}

.status-pill-review {
  background: #f5f3ff !important;
  border: 1px solid #8b5cf6 !important;
  color: #6d28d9 !important;
  font-weight: 600 !important;
}
'''

if '/* PHASE 9: USER INTERFACE, EXPERIENCE, ACCESSIBILITY & BREADCRUMBS */' not in css:
    css += '\n' + phase9_css
    with open(styles_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print("[SUCCESS] Phase 9 CSS appended to styles.css")
else:
    print("[INFO] Phase 9 CSS already present in styles.css")
