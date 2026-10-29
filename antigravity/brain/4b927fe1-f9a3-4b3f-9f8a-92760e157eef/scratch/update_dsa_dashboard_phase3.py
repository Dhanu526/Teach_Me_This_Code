import os

js_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_dashboard.js"
tmp_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_dashboard.js.tmp"

with open(js_path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update loadProgress to include notes
target_load = """          return {
            solved: Array.isArray(parsed.solved) ? parsed.solved : [],
            attempted: Array.isArray(parsed.attempted) ? parsed.attempted : [],
            bookmarked: Array.isArray(parsed.bookmarked) ? parsed.bookmarked : [],
            history: Array.isArray(parsed.history) ? parsed.history : [],
            lastPracticedId: parsed.lastPracticedId || null
          };"""

replacement_load = """          return {
            solved: Array.isArray(parsed.solved) ? parsed.solved : [],
            attempted: Array.isArray(parsed.attempted) ? parsed.attempted : [],
            bookmarked: Array.isArray(parsed.bookmarked) ? parsed.bookmarked : [],
            history: Array.isArray(parsed.history) ? parsed.history : [],
            notes: (parsed.notes && typeof parsed.notes === 'object') ? parsed.notes : {},
            lastPracticedId: parsed.lastPracticedId || null
          };"""

assert target_load in code, "target_load not found in dsa_dashboard.js"
code = code.replace(target_load, replacement_load, 1)

# Also update the fallback return in loadProgress
target_fallback = """      return {
        solved: [],
        attempted: [],
        bookmarked: [],
        history: [],
        lastPracticedId: null
      };"""

replacement_fallback = """      return {
        solved: [],
        attempted: [],
        bookmarked: [],
        history: [],
        notes: {},
        lastPracticedId: null
      };"""

assert target_fallback in code, "target_fallback not found in dsa_dashboard.js"
code = code.replace(target_fallback, replacement_fallback, 1)

# 2. Add notes helper methods right after isBookmarked
target_methods = """    isBookmarked(id) {
      return this.progress.bookmarked.includes(id);
    }"""

replacement_methods = """    isBookmarked(id) {
      return this.progress.bookmarked.includes(id);
    }

    getNote(id) {
      return (this.progress.notes && this.progress.notes[id]) || '';
    }

    hasNote(id) {
      return Boolean(this.progress.notes && this.progress.notes[id] && this.progress.notes[id].trim().length > 0);
    }

    saveNote(id, noteText) {
      if (!this.progress.notes) this.progress.notes = {};
      const trimmed = String(noteText || '').trim();
      if (trimmed) {
        this.progress.notes[id] = trimmed;
      } else {
        delete this.progress.notes[id];
      }
      this.saveProgress();
      this.renderProblemTableOnly();
    }"""

assert target_methods in code, "target_methods not found in dsa_dashboard.js"
code = code.replace(target_methods, replacement_methods, 1)

# 3. Add 'with_notes' status filter in getFilteredProblems
target_status_filter = """        } else if (this.selectedStatus === 'bookmarked') {
          list = list.filter(p => this.progress.bookmarked.includes(p.id));
        }"""

replacement_status_filter = """        } else if (this.selectedStatus === 'bookmarked') {
          list = list.filter(p => this.progress.bookmarked.includes(p.id));
        } else if (this.selectedStatus === 'with_notes') {
          list = list.filter(p => this.hasNote(p.id));
        }"""

assert target_status_filter in code, "target_status_filter not found in dsa_dashboard.js"
code = code.replace(target_status_filter, replacement_status_filter, 1)

# 4. Add 'with_notes' filter pill in Problem Library and Topic Detail toolbars
target_pills = """                  <button class="filter-pill ${this.selectedStatus === 'bookmarked' ? 'active' : ''}" data-filter-status="bookmarked">⭐ Bookmarked</button>
                </div>"""

replacement_pills = """                  <button class="filter-pill ${this.selectedStatus === 'bookmarked' ? 'active' : ''}" data-filter-status="bookmarked">⭐ Bookmarked</button>
                  <button class="filter-pill ${this.selectedStatus === 'with_notes' ? 'active' : ''}" data-filter-status="with_notes">📝 Notes</button>
                </div>"""

# Replace in both problem explorer and topic detail
code = code.replace(target_pills, replacement_pills)

# 5. Display note indicator on problem table row
target_row_title = """              <div class="title-wrap">
                <a href="javascript:void(0)" class="problem-title-link" data-action="view-problem-details" data-id="${p.id}">
                  ${this.escapeHTML(p.title)}
                </a>
                <span class="pattern-chip" title="Algorithm Pattern">${this.escapeHTML(p.pattern)}</span>
              </div>"""

replacement_row_title = """              <div class="title-wrap">
                <a href="javascript:void(0)" class="problem-title-link" data-action="view-problem-details" data-id="${p.id}">
                  ${this.escapeHTML(p.title)}
                </a>
                ${this.hasNote(p.id) ? '<span class="note-pill-indicator" title="Personal learning note saved">📝</span>' : ''}
                <span class="pattern-chip" title="Algorithm Pattern">${this.escapeHTML(p.pattern)}</span>
              </div>"""

assert target_row_title in code, "target_row_title not found in dsa_dashboard.js"
code = code.replace(target_row_title, replacement_row_title, 1)

# 6. Replace showProblemModal with rich Phase 3 modal
modal_start_target = "    showProblemModal(id) {"
assert modal_start_target in code, "showProblemModal not found in dsa_dashboard.js"

# Find end of showProblemModal
modal_end_target = "    formatTimeAgo(timestamp) {"
assert modal_end_target in code, "formatTimeAgo not found in dsa_dashboard.js"

start_pos = code.find(modal_start_target)
end_pos = code.find(modal_end_target)

new_modal_code = """    showProblemModal(id) {
      const p = this.problemsById.get(id);
      if (!p) return;

      const isSolved = this.progress.solved.includes(p.id);
      const isBookmarked = this.isBookmarked(p.id);
      const diffClass = p.difficulty.toLowerCase();
      const userNote = this.getNote(p.id);

      const existing = document.getElementById('dsaProblemModal');
      if (existing) existing.remove();

      const topicChips = (p.topics && p.topics.length > 0 ? p.topics : [p.topic]).map(t => {
        return `<button class="mini-topic-chip" data-open-topic="${this.escapeHTML(t)}">📂 ${this.escapeHTML(t)}</button>`;
      }).join(' ');

      const modal = document.createElement('div');
      modal.id = 'dsaProblemModal';
      modal.className = 'dsa-modal-backdrop';
      modal.innerHTML = `
        <div class="dsa-modal-card">
          <!-- Modal Header -->
          <div class="dsa-modal-header">
            <div class="dsa-modal-title-row">
              <span class="lc-badge">LeetCode #${p.leetcodeNumber}</span>
              <h2 class="dsa-modal-title">${this.escapeHTML(p.title)}</h2>
              <span class="diff-badge diff-${diffClass}">${p.difficulty}</span>
              <a href="${p.sourceUrl || `https://leetcode.com/problems/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`}" 
                 target="_blank" rel="noopener noreferrer" class="btn-external-link" 
                 title="Open official LeetCode problem page in a new tab (functional offline fallback)">
                ↗ LeetCode Page
              </a>
            </div>
            <button class="dsa-modal-close-btn" id="btnModalClose">✕</button>
          </div>

          <div class="dsa-modal-body">
            <!-- Reference Verification Banner -->
            <div class="modal-verification-strip">
              <span class="verify-icon">✓</span>
              <span class="verify-text">
                <strong>${this.escapeHTML(p.verificationStatus || 'Verified')}:</strong> Tested & runnable offline in the code visualizer. Zero paid API dependencies.
              </span>
            </div>

            <!-- Tags -->
            <div class="dsa-modal-tags">
              ${topicChips}
              <span class="pattern-tag">🧩 Pattern: ${this.escapeHTML(p.pattern)}</span>
              <span class="complexity-tag">⏱ Time: ${p.timeComplexity}</span>
              <span class="complexity-tag">💾 Space: ${p.spaceComplexity}</span>
            </div>

            <!-- Prerequisites -->
            ${(p.prerequisites && p.prerequisites.length > 0) ? `
              <div class="dsa-modal-section">
                <h4 class="dsa-section-label">Prerequisite Concepts</h4>
                <div class="prereqs-wrap">
                  ${p.prerequisites.map(pr => `<span class="prereq-chip">💡 ${this.escapeHTML(pr)}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Concise Original Problem Summary -->
            <div class="dsa-modal-section">
              <h4 class="dsa-section-label">Problem Summary</h4>
              <p class="dsa-desc-text">${this.escapeHTML(p.summary || p.description)}</p>
            </div>

            <!-- Input & Output Examples -->
            ${(p.examples && p.examples.length > 0) ? `
              <div class="dsa-modal-section">
                <h4 class="dsa-section-label">Input / Output Examples</h4>
                <div class="examples-list">
                  ${p.examples.map((ex, idx) => `
                    <div class="example-box">
                      <div class="example-num">Example ${idx + 1}</div>
                      <div class="example-row"><strong>Input:</strong> <code>${this.escapeHTML(ex.input)}</code></div>
                      <div class="example-row"><strong>Output:</strong> <code>${this.escapeHTML(ex.output)}</code></div>
                      ${ex.explanation ? `<div class="example-row"><strong>Explanation:</strong> <span>${this.escapeHTML(ex.explanation)}</span></div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Verified Constraints -->
            ${(p.constraints && p.constraints.length > 0) ? `
              <div class="dsa-modal-section">
                <h4 class="dsa-section-label">Constraints & Bounds</h4>
                <ul class="constraints-list">
                  ${p.constraints.map(c => `<li><code>${this.escapeHTML(c)}</code></li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <!-- Personal Learning Notes -->
            <div class="dsa-modal-section">
              <div class="notes-header-row">
                <h4 class="dsa-section-label">📝 Personal Learning Notes</h4>
                <span id="notesSaveFeedback" class="notes-save-feedback hidden">✓ Saved to localStorage</span>
              </div>
              <textarea id="modalNotesTextarea" class="modal-notes-textarea" 
                placeholder="Write your personal takeaways, recurrence relations, edge cases, or revision tips here...">${this.escapeHTML(userNote)}</textarea>
              <div class="notes-action-row">
                <button class="btn-save-note" id="btnSaveNote" data-id="${p.id}">💾 Save Note</button>
                <span class="notes-hint-text">Persisted locally in your browser</span>
              </div>
            </div>

            <!-- Runnable Python Reference Solution -->
            <div class="dsa-modal-section">
              <h4 class="dsa-section-label">Python Reference Solution</h4>
              <pre class="dsa-code-preview"><code>${this.escapeHTML(p.referenceSolution || p.starterCode)}</code></pre>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="dsa-modal-footer">
            <div class="modal-footer-left">
              <button class="btn-hero-star ${isBookmarked ? 'active' : ''}" data-action="toggle-bookmark" data-id="${p.id}">
                ${isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
              </button>
              <button class="status-toggle-btn ${isSolved ? 'solved' : 'not-started'}" data-action="toggle-solved" data-id="${p.id}">
                ${isSolved ? '✅ Solved' : '⚪ Mark as Solved'}
              </button>
            </div>
            <div class="modal-footer-right">
              <button class="btn-hero-primary" data-action="solve-visualize" data-id="${p.id}">
                ▶ Load & Step in Visualizer
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'btnModalClose') {
          modal.remove();
        } else if (e.target.id === 'btnSaveNote') {
          const textarea = modal.querySelector('#modalNotesTextarea');
          if (textarea) {
            this.saveNote(p.id, textarea.value);
            const feedback = modal.querySelector('#notesSaveFeedback');
            if (feedback) {
              feedback.classList.remove('hidden');
              setTimeout(() => feedback.classList.add('hidden'), 2500);
            }
          }
        } else if (e.target.closest('[data-action="solve-visualize"]')) {
          modal.remove();
          this.loadAndVisualizeProblem(p.id);
        } else if (e.target.closest('[data-action="toggle-bookmark"]')) {
          this.toggleBookmark(p.id);
          this.showProblemModal(p.id);
        } else if (e.target.closest('[data-action="toggle-solved"]')) {
          this.toggleSolved(p.id);
          this.showProblemModal(p.id);
        } else if (e.target.closest('[data-open-topic]')) {
          const t = e.target.closest('[data-open-topic]').getAttribute('data-open-topic');
          modal.remove();
          this.openTopicDetailPage(t);
        }
      });
    }

    """

code = code[:start_pos] + new_modal_code + code[end_pos:]

with open(tmp_path, "w", encoding="utf-8") as f:
    f.write(code)

os.replace(tmp_path, js_path)
print("Successfully updated dsa_dashboard.js for Phase 3!")
