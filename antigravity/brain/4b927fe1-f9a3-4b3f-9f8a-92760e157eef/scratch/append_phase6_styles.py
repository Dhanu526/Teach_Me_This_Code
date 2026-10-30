# scratch/append_phase6_styles.py
import os

css_phase6 = """
/* ==========================================================================
   Phase 6: Python Reference Solutions, Dual Approaches & In-Depth Breakdown
   ========================================================================== */

.solution-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-hide-solution {
  background: white;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 4px 10px;
  border-radius: var(--radius-md, 6px);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-hide-solution:hover {
  background: #f1f5f9;
  color: #0f172a;
  border-color: #94a3b8;
}

/* Approach Switcher Tabs */
.solution-approach-tabs {
  display: flex;
  gap: 8px;
  margin: 12px 0 10px;
  padding: 4px;
  background: rgba(147, 51, 234, 0.06);
  border: 1px solid rgba(147, 51, 234, 0.15);
  border-radius: var(--radius-md, 8px);
}

.solution-approach-tab {
  flex: 1;
  background: transparent;
  border: none;
  padding: 8px 14px;
  border-radius: var(--radius-sm, 6px);
  font-size: 12.5px;
  font-weight: 600;
  color: #6b21a8;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.solution-approach-tab:hover {
  background: rgba(255, 255, 255, 0.6);
  color: #581c87;
}

.solution-approach-tab.active {
  background: white;
  color: #581c87;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Approach Info & Complexities */
.solution-approach-info {
  margin: 10px 0 8px;
}

.approach-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.approach-title {
  font-size: 14.5px;
  font-weight: 700;
  color: #1e1b4b;
  margin: 0;
}

.optimal-pill {
  background: #dcfce7;
  color: #15803d;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
}

.baseline-pill {
  background: #fef3c7;
  color: #b45309;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
}

.chip-time {
  background: #fdf2f8 !important;
  color: #9d174d !important;
  border-color: #fbcfe8 !important;
}

.chip-space {
  background: #eff6ff !important;
  color: #1e40af !important;
  border-color: #bfdbfe !important;
}

.chip-status {
  background: #f0fdf4 !important;
  color: #166534 !important;
  border-color: #bbf7d0 !important;
}

/* Educational Deepdive Cards */
.solution-deepdive-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.sol-deepdive-card {
  background: white;
  border: 1px solid #e9d5ff;
  border-radius: var(--radius-md, 8px);
  padding: 12px 14px;
}

.sol-deepdive-card.mistakes-card {
  background: #fffbeb;
  border-color: #fde68a;
  border-left: 4px solid #f59e0b;
}

.deepdive-heading {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.sol-deepdive-card.mistakes-card .deepdive-heading {
  color: #92400e;
}

.deepdive-text {
  font-size: 12.5px;
  color: #334155;
  line-height: 1.6;
  margin: 0;
}

.deepdive-mistakes-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12.5px;
  color: #78350f;
}

.deepdive-mistakes-list li {
  margin-bottom: 5px;
  line-height: 1.5;
}

.deepdive-mistakes-list li:last-child {
  margin-bottom: 0;
}
"""

with open('app_build/styles.css', 'a', encoding='utf-8') as f:
    f.write(css_phase6)

print("Phase 6 styles appended successfully")
