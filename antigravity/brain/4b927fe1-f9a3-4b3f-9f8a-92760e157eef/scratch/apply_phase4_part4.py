# scratch/apply_phase4_part4.py
import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update toolbar in renderProblemExplorer
target_explorer_toolbar = """              <!-- Status Filter Pills -->
              <div class="filter-group">
                <span class="filter-label">Status:</span>
                <div class="pill-group">
                  <button class="filter-pill ${this.selectedStatus === 'all' ? 'active' : ''}" data-filter-status="all">All</button>
                  <button class="filter-pill ${this.selectedStatus === 'solved' ? 'active' : ''}" data-filter-status="solved">✅ Solved</button>
                  <button class="filter-pill ${this.selectedStatus === 'attempted' ? 'active' : ''}" data-filter-status="attempted">⏳ Attempted</button>
                  <button class="filter-pill ${this.selectedStatus === 'not_started' ? 'active' : ''}" data-filter-status="not_started">⚪ Not Started</button>
                  <button class="filter-pill ${this.selectedStatus === 'bookmarked' ? 'active' : ''}" data-filter-status="bookmarked">⭐ Bookmarked</button>
                  <button class="filter-pill ${this.selectedStatus === 'with_notes' ? 'active' : ''}" data-filter-status="with_notes">📝 Notes</button>
                </div>
              </div>

              <!-- Sort Dropdown -->
              <div class="filter-group">
                <label for="dsaSortSelect" class="filter-label">Sort:</label>
                <select id="dsaSortSelect" class="filter-select">
                  <option value="lc_asc" ${this.selectedSort === 'lc_asc' ? 'selected' : ''}>LeetCode # (Ascending)</option>
                  <option value="lc_desc" ${this.selectedSort === 'lc_desc' ? 'selected' : ''}>LeetCode # (Descending)</option>
                  <option value="diff_asc" ${this.selectedSort === 'diff_asc' ? 'selected' : ''}>Difficulty (Easy → Hard)</option>
                  <option value="title_asc" ${this.selectedSort === 'title_asc' ? 'selected' : ''}>Title (A → Z)</option>
                </select>
              </div>

              <!-- Clear Filters -->
              <button class="btn-clear-filters" data-action="clear-filters" title="Reset all search filters">
                ↺ Reset
              </button>"""

replacement_explorer_toolbar = """              <!-- Status Filter Pills (Phase 4) -->
              <div class="filter-group">
                <span class="filter-label">Status:</span>
                <div class="pill-group">
                  <button class="filter-pill ${this.selectedStatus === 'all' ? 'active' : ''}" data-filter-status="all">All</button>
                  <button class="filter-pill ${this.selectedStatus === 'not_started' ? 'active' : ''}" data-filter-status="not_started">⚪ Not Started</button>
                  <button class="filter-pill ${this.selectedStatus === 'attempted' ? 'active' : ''}" data-filter-status="attempted">⏳ Attempted</button>
                  <button class="filter-pill ${this.selectedStatus === 'solved' ? 'active' : ''}" data-filter-status="solved">✅ Solved</button>
                  <button class="filter-pill filter-review ${this.selectedStatus === 'review' ? 'active' : ''}" data-filter-status="review">🔖 Review (${this.progress.review ? this.progress.review.length : 0})</button>
                  <button class="filter-pill filter-star ${this.selectedStatus === 'bookmarked' ? 'active' : ''}" data-filter-status="bookmarked">⭐ Bookmarked</button>
                  <button class="filter-pill filter-notes ${this.selectedStatus === 'with_notes' ? 'active' : ''}" data-filter-status="with_notes">📝 Notes</button>
                </div>
              </div>

              <!-- Sort Dropdown (Title, Difficulty, Learning Order) -->
              <div class="filter-group">
                <label for="dsaSortSelect" class="filter-label">Sort:</label>
                <select id="dsaSortSelect" class="filter-select">
                  <option value="order_asc" ${this.selectedSort === 'order_asc' ? 'selected' : ''}>Learning Order (1 → 300)</option>
                  <option value="order_desc" ${this.selectedSort === 'order_desc' ? 'selected' : ''}>Learning Order (300 → 1)</option>
                  <option value="title_asc" ${this.selectedSort === 'title_asc' ? 'selected' : ''}>Title (A → Z)</option>
                  <option value="title_desc" ${this.selectedSort === 'title_desc' ? 'selected' : ''}>Title (Z → A)</option>
                  <option value="diff_asc" ${this.selectedSort === 'diff_asc' ? 'selected' : ''}>Difficulty (Easy → Hard)</option>
                  <option value="diff_desc" ${this.selectedSort === 'diff_desc' ? 'selected' : ''}>Difficulty (Hard → Easy)</option>
                  <option value="lc_asc" ${this.selectedSort === 'lc_asc' ? 'selected' : ''}>LeetCode # (Ascending)</option>
                  <option value="lc_desc" ${this.selectedSort === 'lc_desc' ? 'selected' : ''}>LeetCode # (Descending)</option>
                </select>
              </div>

              <!-- Actions: Import & Clear -->
              <div class="toolbar-actions-group">
                <button class="btn-import-problems" data-action="open-import-modal" title="Import additional problems with duplicate prevention">
                  📥 Import JSON
                </button>
                <button class="btn-clear-filters" data-action="clear-filters" title="Reset all search filters">
                  ↺ Reset
                </button>
              </div>"""

assert target_explorer_toolbar in code, "target_explorer_toolbar not found"
code = code.replace(target_explorer_toolbar, replacement_explorer_toolbar, 1)

# 2. Update toolbar in renderDedicatedTopicPage
target_topic_toolbar = """                <!-- Learning Status Filter Pills -->
                <div class="filter-group">
                  <span class="filter-label">Status:</span>
                  <div class="pill-group">
                    <button class="filter-pill ${this.selectedStatus === 'all' ? 'active' : ''}" data-filter-status="all">All</button>
                    <button class="filter-pill ${this.selectedStatus === 'solved' ? 'active' : ''}" data-filter-status="solved">✅ Solved</button>
                    <button class="filter-pill ${this.selectedStatus === 'attempted' ? 'active' : ''}" data-filter-status="attempted">⏳ Attempted</button>
                    <button class="filter-pill ${this.selectedStatus === 'not_started' ? 'active' : ''}" data-filter-status="not_started">⚪ Not Started</button>
                    <button class="filter-pill ${this.selectedStatus === 'bookmarked' ? 'active' : ''}" data-filter-status="bookmarked">⭐ Bookmarked</button>
                  </div>
                </div>

                <!-- Sort Dropdown -->
                <div class="filter-group">
                  <label for="topicDetailSortSelect" class="filter-label">Sort:</label>
                  <select id="topicDetailSortSelect" class="filter-select">
                    <option value="lc_asc" ${this.selectedSort === 'lc_asc' ? 'selected' : ''}>LeetCode # (Ascending)</option>
                    <option value="lc_desc" ${this.selectedSort === 'lc_desc' ? 'selected' : ''}>LeetCode # (Descending)</option>
                    <option value="diff_asc" ${this.selectedSort === 'diff_asc' ? 'selected' : ''}>Difficulty (Easy → Hard)</option>
                    <option value="title_asc" ${this.selectedSort === 'title_asc' ? 'selected' : ''}>Title (A → Z)</option>
                  </select>
                </div>"""

replacement_topic_toolbar = """                <!-- Learning Status Filter Pills -->
                <div class="filter-group">
                  <span class="filter-label">Status:</span>
                  <div class="pill-group">
                    <button class="filter-pill ${this.selectedStatus === 'all' ? 'active' : ''}" data-filter-status="all">All</button>
                    <button class="filter-pill ${this.selectedStatus === 'not_started' ? 'active' : ''}" data-filter-status="not_started">⚪ Not Started</button>
                    <button class="filter-pill ${this.selectedStatus === 'attempted' ? 'active' : ''}" data-filter-status="attempted">⏳ Attempted</button>
                    <button class="filter-pill ${this.selectedStatus === 'solved' ? 'active' : ''}" data-filter-status="solved">✅ Solved</button>
                    <button class="filter-pill filter-review ${this.selectedStatus === 'review' ? 'active' : ''}" data-filter-status="review">🔖 Review</button>
                    <button class="filter-pill filter-star ${this.selectedStatus === 'bookmarked' ? 'active' : ''}" data-filter-status="bookmarked">⭐ Bookmarked</button>
                    <button class="filter-pill filter-notes ${this.selectedStatus === 'with_notes' ? 'active' : ''}" data-filter-status="with_notes">📝 Notes</button>
                  </div>
                </div>

                <!-- Sort Dropdown -->
                <div class="filter-group">
                  <label for="topicDetailSortSelect" class="filter-label">Sort:</label>
                  <select id="topicDetailSortSelect" class="filter-select">
                    <option value="order_asc" ${this.selectedSort === 'order_asc' ? 'selected' : ''}>Learning Order (1 → 300)</option>
                    <option value="order_desc" ${this.selectedSort === 'order_desc' ? 'selected' : ''}>Learning Order (300 → 1)</option>
                    <option value="title_asc" ${this.selectedSort === 'title_asc' ? 'selected' : ''}>Title (A → Z)</option>
                    <option value="title_desc" ${this.selectedSort === 'title_desc' ? 'selected' : ''}>Title (Z → A)</option>
                    <option value="diff_asc" ${this.selectedSort === 'diff_asc' ? 'selected' : ''}>Difficulty (Easy → Hard)</option>
                    <option value="diff_desc" ${this.selectedSort === 'diff_desc' ? 'selected' : ''}>Difficulty (Hard → Easy)</option>
                    <option value="lc_asc" ${this.selectedSort === 'lc_asc' ? 'selected' : ''}>LeetCode # (Ascending)</option>
                    <option value="lc_desc" ${this.selectedSort === 'lc_desc' ? 'selected' : ''}>LeetCode # (Descending)</option>
                  </select>
                </div>"""

assert target_topic_toolbar in code, "target_topic_toolbar not found"
code = code.replace(target_topic_toolbar, replacement_topic_toolbar, 1)

# 3. Update renderProblemTableContent
target_table_content_head = """    renderProblemTableContent(topicOverride = null) {
      const filtered = this.getFilteredProblems(topicOverride);
      const totalFiltered = filtered.length;

      const totalPages = Math.max(1, Math.ceil(totalFiltered / this.pageSize));
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      const startIdx = (this.currentPage - 1) * this.pageSize;
      const paginated = filtered.slice(startIdx, startIdx + this.pageSize);"""

replacement_table_content_head = """    renderProblemTableContent(topicOverride = null) {
      const filtered = this.getFilteredProblems(topicOverride);
      const totalFiltered = filtered.length;

      const isAll = this.pageSize === 'all';
      const effectivePageSize = isAll ? Math.max(1, totalFiltered) : this.pageSize;
      const totalPages = Math.max(1, Math.ceil(totalFiltered / effectivePageSize));
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      const startIdx = (this.currentPage - 1) * effectivePageSize;
      const paginated = isAll ? filtered : filtered.slice(startIdx, startIdx + effectivePageSize);"""

assert target_table_content_head in code, "target_table_content_head not found"
code = code.replace(target_table_content_head, replacement_table_content_head, 1)

# Update problem table row mapping
target_row_start = """        return `
          <tr class="problem-row ${isSolved ? 'row-solved' : ''}">
            <td class="col-star">
              <button class="star-btn ${isBookmarked ? 'active' : ''}" data-action="toggle-bookmark" data-id="${p.id}" title="${isBookmarked ? 'Remove bookmark' : 'Bookmark for revision'}">
                ${isBookmarked ? '★' : '☆'}
              </button>
            </td>

            <td class="col-lc">
              <span class="lc-badge">#${p.leetcodeNumber}</span>
            </td>

            <td class="col-title">
              <div class="title-wrap">
                <a href="javascript:void(0)" class="problem-title-link" data-action="view-problem-details" data-id="${p.id}">
                  ${this.escapeHTML(p.title)}
                </a>
                ${this.hasNote(p.id) ? '<span class="note-pill-indicator" title="Personal learning note saved">📝</span>' : ''}
                <span class="pattern-chip" title="Algorithm Pattern">${this.escapeHTML(p.pattern)}</span>
              </div>
            </td>"""

replacement_row_start = """        return `
          <tr class="problem-row ${isSolved ? 'row-solved' : ''}">
            <td class="col-star">
              <button class="star-btn ${isBookmarked ? 'active' : ''}" data-action="toggle-bookmark" data-id="${p.id}" title="${isBookmarked ? 'Remove bookmark' : 'Bookmark for revision'}">
                ${isBookmarked ? '★' : '☆'}
              </button>
            </td>

            <td class="col-review">
              <button class="review-btn ${this.isReview(p.id) ? 'active' : ''}" data-action="toggle-review" data-id="${p.id}" title="${this.isReview(p.id) ? 'In Review List (click to remove)' : 'Flag for Review'}">
                🔖
              </button>
            </td>

            <td class="col-lc">
              <a href="#dsa/problem/${p.id}" class="lc-badge" data-action="view-problem-details" data-id="${p.id}" title="Problem #${p.leetcodeNumber} (Route: #dsa/problem/${p.id})">#${p.leetcodeNumber}</a>
            </td>

            <td class="col-title">
              <div class="title-wrap">
                <a href="#dsa/problem/${p.id}" class="problem-title-link" data-action="view-problem-details" data-id="${p.id}" title="Open problem details (Route: #dsa/problem/${p.id})">
                  ${this.escapeHTML(p.title)}
                </a>
                ${this.isReview(p.id) ? '<span class="review-badge-pill" title="Flagged for review">🔖 Review</span>' : ''}
                ${this.hasNote(p.id) ? '<span class="note-pill-indicator" title="Personal learning note saved">📝</span>' : ''}
                <span class="pattern-chip" title="Algorithm Pattern">${this.escapeHTML(p.pattern)}</span>
              </div>
            </td>"""

assert target_row_start in code, "target_row_start not found"
code = code.replace(target_row_start, replacement_row_start, 1)

# Update table markup & pagination bar in renderProblemTableContent
target_table_meta_bar = """      return `
        <div class="table-meta-bar">
          <span class="table-meta-counts">
            Showing <strong>${startIdx + 1}–${Math.min(startIdx + this.pageSize, totalFiltered)}</strong> of <strong>${totalFiltered}</strong> problems
            ${totalFiltered !== this.problems.length ? ` (filtered from ${this.problems.length} total)` : ''}
          </span>
          ${this.renderPaginationControls(this.currentPage, totalPages)}
        </div>

        <div class="problem-table-scroll">
          <table class="problem-table" aria-label="Curated 300 DSA Problems">
            <thead>
              <tr>
                <th class="col-star">⭐</th>
                <th class="col-lc">LC #</th>
                <th class="col-title">Problem Title & Algorithm Pattern</th>
                <th class="col-topics-multi">Associated Topics</th>
                <th class="col-diff">Difficulty</th>
                <th class="col-status">Status</th>
                <th class="col-complexity">Complexity</th>
                <th class="col-action">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>

        <div class="table-meta-bar bottom-meta">
          <span class="table-meta-counts">Page ${this.currentPage} of ${totalPages}</span>
          ${this.renderPaginationControls(this.currentPage, totalPages)}
        </div>
      `;"""

replacement_table_meta_bar = """      return `
        <div class="table-meta-bar">
          <div class="table-meta-left">
            <span class="table-meta-counts">
              Showing <strong>${totalFiltered === 0 ? 0 : startIdx + 1}–${Math.min(startIdx + (isAll ? totalFiltered : this.pageSize), totalFiltered)}</strong> of <strong>${totalFiltered}</strong> problems
              ${totalFiltered !== this.problems.length ? ` (filtered from ${this.problems.length} total)` : ''}
            </span>
          </div>
          <div class="table-meta-right">
            <div class="page-size-selector-wrap">
              <label for="dsaPageSizeSelect" class="page-size-label">Per page:</label>
              <select id="dsaPageSizeSelect" class="filter-select page-size-select" title="Choose problem page size">
                <option value="10" ${this.pageSize === 10 ? 'selected' : ''}>10</option>
                <option value="25" ${this.pageSize === 25 ? 'selected' : ''}>25</option>
                <option value="50" ${this.pageSize === 50 ? 'selected' : ''}>50</option>
                <option value="100" ${this.pageSize === 100 ? 'selected' : ''}>100</option>
                <option value="all" ${this.pageSize === 'all' ? 'selected' : ''}>All (${this.problems.length})</option>
              </select>
            </div>
            ${this.renderPaginationControls(this.currentPage, totalPages)}
          </div>
        </div>

        <div class="problem-table-scroll">
          <table class="problem-table" aria-label="Curated 300 DSA Problems">
            <thead>
              <tr>
                <th class="col-star" title="Bookmark">⭐</th>
                <th class="col-review" title="Flag for Review">🔖</th>
                <th class="col-lc">LC #</th>
                <th class="col-title">Problem Title & Algorithm Pattern</th>
                <th class="col-topics-multi">Associated Topics</th>
                <th class="col-diff">Difficulty</th>
                <th class="col-status">Status</th>
                <th class="col-complexity">Complexity</th>
                <th class="col-action">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>

        <div class="table-meta-bar bottom-meta">
          <span class="table-meta-counts">Page <strong>${this.currentPage}</strong> of <strong>${totalPages}</strong> (${totalFiltered} problems)</span>
          ${this.renderPaginationControls(this.currentPage, totalPages)}
        </div>
      `;"""

assert target_table_meta_bar in code, "target_table_meta_bar not found"
code = code.replace(target_table_meta_bar, replacement_table_meta_bar, 1)

# 4. Update renderPaginationControls
target_pagination = """    renderPaginationControls(current, totalPages) {
      if (totalPages <= 1) return '';

      let pages = [];
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= current - 2 && i <= current + 2)) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
      }

      return `
        <div class="pagination-bar">
          <button class="btn-page" data-page="${current - 1}" ${current === 1 ? 'disabled' : ''}>← Prev</button>
          ${pages.map(p => {
            if (p === '...') return '<span class="page-ellipsis">…</span>';
            return `<button class="btn-page ${p === current ? 'active' : ''}" data-page="${p}">${p}</button>`;
          }).join('')}
          <button class="btn-page" data-page="${current + 1}" ${current === totalPages ? 'disabled' : ''}>Next →</button>
        </div>
      `;
    }"""

replacement_pagination = """    renderPaginationControls(current, totalPages) {
      if (this.pageSize === 'all' || totalPages <= 1) return '';

      let pages = [];
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= current - 2 && i <= current + 2)) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
      }

      return `
        <div class="pagination-bar" role="navigation" aria-label="Pagination">
          <button class="btn-page btn-page-nav" data-page="1" ${current === 1 ? 'disabled' : ''} title="First page">|←</button>
          <button class="btn-page btn-page-nav" data-page="${current - 1}" ${current === 1 ? 'disabled' : ''} title="Previous page">← Prev</button>
          ${pages.map(p => {
            if (p === '...') return '<span class="page-ellipsis">…</span>';
            return `<button class="btn-page ${p === current ? 'active' : ''}" data-page="${p}">${p}</button>`;
          }).join('')}
          <button class="btn-page btn-page-nav" data-page="${current + 1}" ${current === totalPages ? 'disabled' : ''} title="Next page">Next →</button>
          <button class="btn-page btn-page-nav" data-page="${totalPages}" ${current === totalPages ? 'disabled' : ''} title="Last page">→|</button>
        </div>
      `;
    }"""

assert target_pagination in code, "target_pagination not found"
code = code.replace(target_pagination, replacement_pagination, 1)

print("Part 4 (toolbars, table, pagination) replaced successfully")

with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(code)

os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
print("Part 4 saved successfully")
