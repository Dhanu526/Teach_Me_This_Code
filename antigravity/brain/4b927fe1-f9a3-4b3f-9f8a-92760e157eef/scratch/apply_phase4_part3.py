# scratch/apply_phase4_part3.py
import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update renderMetricsCards to include Review card
target_metrics_cards = """          <div class="metric-card metric-bookmarked">
            <div class="metric-icon">⭐</div>
            <div class="metric-info">
              <div class="metric-value">${stats.bookmarkedCount}</div>
              <div class="metric-label">Bookmarked</div>
            </div>
            <div class="metric-sublabel">Saved for Revision</div>
          </div>
        </div>"""

replacement_metrics_cards = """          <div class="metric-card metric-bookmarked" data-metric-action="filter-bookmarked" style="cursor: pointer;" title="Click to view bookmarked problems">
            <div class="metric-icon">⭐</div>
            <div class="metric-info">
              <div class="metric-value">${stats.bookmarkedCount}</div>
              <div class="metric-label">Bookmarked</div>
            </div>
            <div class="metric-sublabel">Saved for Revision</div>
          </div>

          <div class="metric-card metric-review" data-metric-action="filter-review" style="cursor: pointer;" title="Click to view problems flagged for review">
            <div class="metric-icon">🔖</div>
            <div class="metric-info">
              <div class="metric-value">${stats.reviewCount || 0}</div>
              <div class="metric-label">Needs Review</div>
            </div>
            <div class="metric-sublabel">Flagged to Practice</div>
          </div>
        </div>"""

assert target_metrics_cards in code, "target_metrics_cards not found"
code = code.replace(target_metrics_cards, replacement_metrics_cards, 1)

# 2. Update bindEvents click & change handlers
target_bind_events_click = """          // Bookmark button
          const bookmarkBtn = e.target.closest('[data-action="toggle-bookmark"]');
          if (bookmarkBtn) {
            const id = parseInt(bookmarkBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.toggleBookmark(id);
            return;
          }"""

replacement_bind_events_click = """          // Bookmark button
          const bookmarkBtn = e.target.closest('[data-action="toggle-bookmark"]');
          if (bookmarkBtn) {
            const id = parseInt(bookmarkBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.toggleBookmark(id);
            return;
          }

          // Review button (Phase 4)
          const reviewBtn = e.target.closest('[data-action="toggle-review"]');
          if (reviewBtn) {
            const id = parseInt(reviewBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.toggleReview(id);
            return;
          }

          // Bookmark only quick filter pill (Phase 4)
          const bmFilterBtn = e.target.closest('[data-filter-bookmark-toggle]');
          if (bmFilterBtn) {
            this.onlyBookmarked = !this.onlyBookmarked;
            this.currentPage = 1;
            this.renderProblemTableOnly();
            bmFilterBtn.classList.toggle('active', this.onlyBookmarked);
            return;
          }

          // Import modal button (Phase 4)
          const importBtn = e.target.closest('[data-action="open-import-modal"]');
          if (importBtn) {
            this.showImportModal();
            return;
          }

          // Metric card quick jumps
          const metricReview = e.target.closest('[data-metric-action="filter-review"]');
          if (metricReview) {
            this.currentSubTab = 'problems';
            this.selectedStatus = 'review';
            this.currentPage = 1;
            this.render();
            return;
          }
          const metricBookmarked = e.target.closest('[data-metric-action="filter-bookmarked"]');
          if (metricBookmarked) {
            this.currentSubTab = 'problems';
            this.selectedStatus = 'bookmarked';
            this.currentPage = 1;
            this.render();
            return;
          }"""

assert target_bind_events_click in code, "target_bind_events_click not found"
code = code.replace(target_bind_events_click, replacement_bind_events_click, 1)

target_bind_events_change = """          } else if (e.target.id === 'dsaSortSelect' || e.target.id === 'topicDetailSortSelect') {
            this.selectedSort = e.target.value;
            this.currentPage = 1;
            this.renderProblemTableOnly();
          }"""

replacement_bind_events_change = """          } else if (e.target.id === 'dsaSortSelect' || e.target.id === 'topicDetailSortSelect') {
            this.selectedSort = e.target.value;
            this.currentPage = 1;
            this.renderProblemTableOnly();
          } else if (e.target.id === 'dsaPageSizeSelect' || e.target.id === 'topicDetailPageSizeSelect') {
            const val = e.target.value;
            this.pageSize = val === 'all' ? 'all' : parseInt(val, 10);
            this.currentPage = 1;
            this.renderProblemTableOnly();
          }"""

assert target_bind_events_change in code, "target_bind_events_change not found"
code = code.replace(target_bind_events_change, replacement_bind_events_change, 1)

# 3. Update getFilteredProblems
target_get_filtered = """    getFilteredProblems(overrideTopic = null) {
      let list = this.problems.slice();
      const activeTopic = overrideTopic || this.selectedTopic;

      // Search query
      if (this.searchQuery) {
        const q = this.searchQuery;
        list = list.filter(p => {
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchNum = String(p.leetcodeNumber).includes(q);
          const matchPattern = p.pattern.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTopic = (p.topics && p.topics.some(t => t.toLowerCase().includes(q))) || (p.topic && p.topic.toLowerCase().includes(q));
          return matchTitle || matchNum || matchPattern || matchDesc || matchTopic;
        });
      }

      // Topic filter (multi-topic matching!)
      if (activeTopic && activeTopic !== 'all') {
        list = list.filter(p => (p.topics && p.topics.includes(activeTopic)) || p.topic === activeTopic);
      }

      // Algorithmic Pattern filter
      if (this.selectedPattern && this.selectedPattern !== 'all') {
        list = list.filter(p => p.pattern === this.selectedPattern);
      }

      // Difficulty filter
      if (this.selectedDifficulty && this.selectedDifficulty !== 'all') {
        list = list.filter(p => p.difficulty === this.selectedDifficulty);
      }

      // Status filter
      if (this.selectedStatus && this.selectedStatus !== 'all') {
        if (this.selectedStatus === 'solved') {
          list = list.filter(p => this.progress.solved.includes(p.id));
        } else if (this.selectedStatus === 'attempted') {
          list = list.filter(p => this.progress.attempted.includes(p.id) && !this.progress.solved.includes(p.id));
        } else if (this.selectedStatus === 'not_started') {
          list = list.filter(p => !this.progress.solved.includes(p.id) && !this.progress.attempted.includes(p.id));
        } else if (this.selectedStatus === 'bookmarked') {
          list = list.filter(p => this.progress.bookmarked.includes(p.id));
        } else if (this.selectedStatus === 'with_notes') {
          list = list.filter(p => this.hasNote(p.id));
        }
      }

      // Sorting
      const diffRank = { Easy: 1, Medium: 2, Hard: 3 };
      if (this.selectedSort === 'lc_asc') {
        list.sort((a, b) => a.leetcodeNumber - b.leetcodeNumber);
      } else if (this.selectedSort === 'lc_desc') {
        list.sort((a, b) => b.leetcodeNumber - a.leetcodeNumber);
      } else if (this.selectedSort === 'diff_asc') {
        list.sort((a, b) => (diffRank[a.difficulty] || 0) - (diffRank[b.difficulty] || 0));
      } else if (this.selectedSort === 'title_asc') {
        list.sort((a, b) => a.title.localeCompare(b.title));
      }

      return list;
    }"""

replacement_get_filtered = """    getFilteredProblems(overrideTopic = null) {
      let list = this.problems.slice();
      const activeTopic = overrideTopic || this.selectedTopic;

      // 1. Search query (title, LC#, pattern, description, summary, topic)
      if (this.searchQuery) {
        const q = this.searchQuery;
        list = list.filter(p => {
          const matchTitle = p.title && p.title.toLowerCase().includes(q);
          const matchNum = p.leetcodeNumber && String(p.leetcodeNumber).includes(q);
          const matchPattern = p.pattern && p.pattern.toLowerCase().includes(q);
          const matchDesc = p.description && p.description.toLowerCase().includes(q);
          const matchSummary = p.summary && p.summary.toLowerCase().includes(q);
          const matchTopic = (p.topics && p.topics.some(t => t.toLowerCase().includes(q))) || (p.topic && p.topic.toLowerCase().includes(q));
          return matchTitle || matchNum || matchPattern || matchDesc || matchSummary || matchTopic;
        });
      }

      // 2. Topic filter (multi-topic matching across all 30 topics!)
      if (activeTopic && activeTopic !== 'all') {
        list = list.filter(p => (p.topics && p.topics.includes(activeTopic)) || p.topic === activeTopic);
      }

      // 3. Algorithmic Pattern filter
      if (this.selectedPattern && this.selectedPattern !== 'all') {
        list = list.filter(p => p.pattern === this.selectedPattern);
      }

      // 4. Difficulty filter
      if (this.selectedDifficulty && this.selectedDifficulty !== 'all') {
        list = list.filter(p => p.difficulty === this.selectedDifficulty);
      }

      // 5. Status filter (Not Started, Attempted, Solved, Review, Bookmarked, With Notes)
      if (this.selectedStatus && this.selectedStatus !== 'all') {
        if (this.selectedStatus === 'solved') {
          list = list.filter(p => this.progress.solved.includes(p.id));
        } else if (this.selectedStatus === 'attempted') {
          list = list.filter(p => this.progress.attempted.includes(p.id) && !this.progress.solved.includes(p.id));
        } else if (this.selectedStatus === 'not_started') {
          list = list.filter(p => !this.progress.solved.includes(p.id) && !this.progress.attempted.includes(p.id));
        } else if (this.selectedStatus === 'review') {
          list = list.filter(p => this.isReview(p.id));
        } else if (this.selectedStatus === 'bookmarked') {
          list = list.filter(p => this.isBookmarked(p.id));
        } else if (this.selectedStatus === 'with_notes') {
          list = list.filter(p => this.hasNote(p.id));
        }
      }

      // 6. Independent Bookmarked status filter
      if (this.onlyBookmarked) {
        list = list.filter(p => this.isBookmarked(p.id));
      }

      // 7. Sorting: title, difficulty, and learning order (+ LC #)
      const diffRankAsc = { Easy: 1, Medium: 2, Hard: 3 };
      const diffRankDesc = { Hard: 1, Medium: 2, Easy: 3 };

      if (this.selectedSort === 'order_asc') {
        list.sort((a, b) => a.id - b.id);
      } else if (this.selectedSort === 'order_desc') {
        list.sort((a, b) => b.id - a.id);
      } else if (this.selectedSort === 'title_asc') {
        list.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.selectedSort === 'title_desc') {
        list.sort((a, b) => b.title.localeCompare(a.title));
      } else if (this.selectedSort === 'diff_asc') {
        list.sort((a, b) => ((diffRankAsc[a.difficulty] || 0) - (diffRankAsc[b.difficulty] || 0)) || (a.id - b.id));
      } else if (this.selectedSort === 'diff_desc') {
        list.sort((a, b) => ((diffRankDesc[a.difficulty] || 0) - (diffRankDesc[b.difficulty] || 0)) || (a.id - b.id));
      } else if (this.selectedSort === 'lc_asc') {
        list.sort((a, b) => (a.leetcodeNumber || a.id) - (b.leetcodeNumber || b.id));
      } else if (this.selectedSort === 'lc_desc') {
        list.sort((a, b) => (b.leetcodeNumber || b.id) - (a.leetcodeNumber || a.id));
      } else {
        list.sort((a, b) => a.id - b.id);
      }

      return list;
    }"""

assert target_get_filtered in code, "target_get_filtered not found"
code = code.replace(target_get_filtered, replacement_get_filtered, 1)

print("Part 3 (metrics, events, getFilteredProblems) updated successfully")

with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(code)

os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
print("Part 3 saved successfully")
