# scratch/update_dsa_dashboard_phase4.py
# Updates dsa_dashboard.js for Phase 4:
# - Review status in progress & methods (isReview, toggleReview, markReview, unmarkReview)
# - Sorting: order_asc, order_desc, title_asc, title_desc, diff_asc, diff_desc, lc_asc, lc_desc
# - Filtering: topic, difficulty, status (not_started, attempted, solved, review, bookmarked, with_notes), pattern, onlyBookmarked
# - Pagination & page size control (10, 25, 50, 100, all) with First/Last/Prev/Next/Ellipsis
# - URL hash router (#dsa/problem/:id) and unique route sharing
# - Import engine with multi-criteria duplicate prevention (ID, LC#, Title, URL)

import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update loadProgress to include review array
target_load_progress = """          return {
            solved: Array.isArray(parsed.solved) ? parsed.solved : [],
            attempted: Array.isArray(parsed.attempted) ? parsed.attempted : [],
            bookmarked: Array.isArray(parsed.bookmarked) ? parsed.bookmarked : [],
            history: Array.isArray(parsed.history) ? parsed.history : [],
            notes: (parsed.notes && typeof parsed.notes === 'object') ? parsed.notes : {},
            lastPracticedId: parsed.lastPracticedId || null
          };"""

replacement_load_progress = """          return {
            solved: Array.isArray(parsed.solved) ? parsed.solved : [],
            attempted: Array.isArray(parsed.attempted) ? parsed.attempted : [],
            review: Array.isArray(parsed.review) ? parsed.review : [],
            bookmarked: Array.isArray(parsed.bookmarked) ? parsed.bookmarked : [],
            history: Array.isArray(parsed.history) ? parsed.history : [],
            notes: (parsed.notes && typeof parsed.notes === 'object') ? parsed.notes : {},
            lastPracticedId: parsed.lastPracticedId || null
          };"""

assert target_load_progress in code, "target_load_progress not found"
code = code.replace(target_load_progress, replacement_load_progress, 1)

target_fallback_progress = """      return {
        solved: [],
        attempted: [],
        bookmarked: [],
        history: [],
        notes: {},
        lastPracticedId: null
      };"""

replacement_fallback_progress = """      return {
        solved: [],
        attempted: [],
        review: [],
        bookmarked: [],
        history: [],
        notes: {},
        lastPracticedId: null
      };"""

assert target_fallback_progress in code, "target_fallback_progress not found"
code = code.replace(target_fallback_progress, replacement_fallback_progress, 1)

print("Progress data structure updated successfully")
