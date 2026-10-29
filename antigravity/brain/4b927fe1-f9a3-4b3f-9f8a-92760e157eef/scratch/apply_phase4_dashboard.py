# scratch/apply_phase4_dashboard.py
import re
import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update loadProgress
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

content = content.replace(target_load_progress, replacement_load_progress, 1)

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

content = content.replace(target_fallback_progress, replacement_fallback_progress, 1)

# 2. Update constructor fields
target_ctor_fields = """      // Filters
      this.searchQuery = '';
      this.selectedTopic = 'all';
      this.selectedDifficulty = 'all';
      this.selectedPattern = 'all';
      this.selectedStatus = 'all';
      this.selectedSort = 'lc_asc';
      this.currentPage = 1;
      this.pageSize = 25;"""

replacement_ctor_fields = """      // Filters
      this.searchQuery = '';
      this.selectedTopic = 'all';
      this.selectedDifficulty = 'all';
      this.selectedPattern = 'all';
      this.selectedStatus = 'all'; // 'all' | 'not_started' | 'attempted' | 'solved' | 'review' | 'bookmarked' | 'with_notes'
      this.onlyBookmarked = false; // independent bookmarked toggle
      this.selectedSort = 'order_asc'; // 'order_asc' | 'order_desc' | 'title_asc' | 'title_desc' | 'diff_asc' | 'diff_desc' | 'lc_asc' | 'lc_desc'
      this.currentPage = 1;
      this.pageSize = 25; // 10, 25, 50, 100, or 'all'"""

content = content.replace(target_ctor_fields, replacement_ctor_fields, 1)

# Add initRouter call in constructor
target_ctor_end = """      this.progress = this.loadProgress();
      this.initDOM();
      this.bindEvents();
      this.render();"""

replacement_ctor_end = """      this.progress = this.loadProgress();
      this.initDOM();
      this.bindEvents();
      this.initRouter();
      this.render();"""

content = content.replace(target_ctor_end, replacement_ctor_end, 1)

# 3. Add Review methods & update getProblemStatus
target_status_methods = """    getProblemStatus(id) {
      if (this.progress.solved.includes(id)) return 'solved';
      if (this.progress.attempted.includes(id)) return 'attempted';
      return 'not_started';
    }

    isBookmarked(id) {
      return this.progress.bookmarked.includes(id);
    }"""

replacement_status_methods = """    getProblemStatus(id) {
      if (this.progress.solved.includes(id)) return 'solved';
      if (this.isReview(id)) return 'review';
      if (this.progress.attempted.includes(id)) return 'attempted';
      return 'not_started';
    }

    isBookmarked(id) {
      return Array.isArray(this.progress.bookmarked) && this.progress.bookmarked.includes(id);
    }

    isReview(id) {
      return Array.isArray(this.progress.review) && this.progress.review.includes(id);
    }

    toggleReview(id) {
      if (!Array.isArray(this.progress.review)) this.progress.review = [];
      const idx = this.progress.review.indexOf(id);
      if (idx >= 0) {
        this.progress.review.splice(idx, 1);
      } else {
        this.progress.review.push(id);
      }
      this.saveProgress();
      this.renderProblemTableOnly();
      this.updateReviewMetricsUI();
    }

    markReview(id) {
      if (!Array.isArray(this.progress.review)) this.progress.review = [];
      if (!this.progress.review.includes(id)) {
        this.progress.review.push(id);
        this.saveProgress();
        this.renderProblemTableOnly();
        this.updateReviewMetricsUI();
      }
    }

    unmarkReview(id) {
      if (!Array.isArray(this.progress.review)) return;
      const idx = this.progress.review.indexOf(id);
      if (idx >= 0) {
        this.progress.review.splice(idx, 1);
        this.saveProgress();
        this.renderProblemTableOnly();
        this.updateReviewMetricsUI();
      }
    }

    updateReviewMetricsUI() {
      const reviewBadge = document.querySelector('.metric-card.metric-review .metric-value');
      if (reviewBadge) {
        reviewBadge.textContent = this.progress.review.length;
      }
    }"""

content = content.replace(target_status_methods, replacement_status_methods, 1)

# 4. Update computeStats to include reviewCount & notesCount
target_compute_stats = """    computeStats() {
      const total = this.problems.length;
      const solvedCount = this.progress.solved.length;
      const attemptedCount = this.progress.attempted.filter(id => !this.progress.solved.includes(id)).length;
      const notStartedCount = Math.max(0, total - (solvedCount + attemptedCount));
      const bookmarkedCount = this.progress.bookmarked.length;
      const pctSolved = total > 0 ? ((solvedCount / total) * 100).toFixed(1) : '0.0';"""

replacement_compute_stats = """    computeStats() {
      const total = this.problems.length;
      const solvedCount = this.progress.solved.length;
      const attemptedCount = this.progress.attempted.filter(id => !this.progress.solved.includes(id)).length;
      const notStartedCount = Math.max(0, total - (solvedCount + attemptedCount));
      const bookmarkedCount = Array.isArray(this.progress.bookmarked) ? this.progress.bookmarked.length : 0;
      const reviewCount = Array.isArray(this.progress.review) ? this.progress.review.length : 0;
      const notesCount = (this.progress.notes && typeof this.progress.notes === 'object') ? Object.keys(this.progress.notes).length : 0;
      const pctSolved = total > 0 ? ((solvedCount / total) * 100).toFixed(1) : '0.0';"""

content = content.replace(target_compute_stats, replacement_compute_stats, 1)

target_return_stats = """      return {
        total,
        solvedCount,
        attemptedCount,
        notStartedCount,
        bookmarkedCount,
        pctSolved,
        diffMap
      };"""

replacement_return_stats = """      return {
        total,
        solvedCount,
        attemptedCount,
        notStartedCount,
        bookmarkedCount,
        reviewCount,
        notesCount,
        pctSolved,
        diffMap
      };"""

content = content.replace(target_return_stats, replacement_return_stats, 1)

print("Progress and stats updated successfully")

with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(content)

os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
print("Part 1 applied successfully")
