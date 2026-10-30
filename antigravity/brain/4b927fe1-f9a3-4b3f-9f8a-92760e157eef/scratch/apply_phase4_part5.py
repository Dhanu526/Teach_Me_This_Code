# scratch/apply_phase4_part5.py
import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

target_show_modal = """    showProblemModal(id) {
      const p = this.problemsById.get(id);
      if (!p) return;

      const isSolved = this.progress.solved.includes(p.id);
      const isBookmarked = this.isBookmarked(p.id);
      const diffClass = p.difficulty.toLowerCase();
      const userNote = this.getNote(p.id);

      const existing = document.getElementById('dsaProblemModal');
      if (existing && typeof existing.remove === 'function') existing.remove();

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

          <div class="dsa-modal-body">"""

replacement_show_modal = """    showProblemModal(id) {
      const p = this.problemsById.get(id);
      if (!p) return;

      const isSolved = this.progress.solved.includes(p.id);
      const isBookmarked = this.isBookmarked(p.id);
      const isRev = this.isReview(p.id);
      const diffClass = p.difficulty.toLowerCase();
      const userNote = this.getNote(p.id);

      const cleanupRoute = () => {
        if (typeof window !== 'undefined' && window.location) {
          if (window.history && typeof window.history.replaceState === 'function') {
            window.history.replaceState(null, '', '#dsa');
          } else {
            window.location.hash = 'dsa';
          }
        }
      };

      if (typeof window !== 'undefined' && window.location) {
        if (window.history && typeof window.history.replaceState === 'function') {
          window.history.replaceState(null, '', `#dsa/problem/${p.id}`);
        } else {
          window.location.hash = `dsa/problem/${p.id}`;
        }
      }

      const existing = document.getElementById('dsaProblemModal');
      if (existing && typeof existing.remove === 'function') existing.remove();

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

          <!-- Unique Problem Route Bar (Phase 4) -->
          <div class="modal-route-bar">
            <span class="route-badge" title="Unique route to this problem">📍 Route: <code>#dsa/problem/${p.id}</code></span>
            <button class="btn-copy-route" id="btnCopyProblemRoute" data-id="${p.id}" title="Copy direct link to this problem">
              🔗 Copy Problem Link
            </button>
            <span id="routeCopyFeedback" class="route-feedback-toast hidden">✓ Link copied to clipboard!</span>
          </div>

          <div class="dsa-modal-body">"""

assert target_show_modal in code, "target_show_modal not found"
code = code.replace(target_show_modal, replacement_show_modal, 1)

# Update modal footer
target_modal_footer = """          <!-- Modal Footer -->
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
          </div>"""

replacement_modal_footer = """          <!-- Modal Footer (Phase 4) -->
          <div class="dsa-modal-footer">
            <div class="modal-footer-left">
              <button class="btn-hero-star ${isBookmarked ? 'active' : ''}" data-action="toggle-bookmark" data-id="${p.id}">
                ${isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
              </button>
              <button class="btn-hero-review ${isRev ? 'active' : ''}" data-action="toggle-review" data-id="${p.id}">
                ${isRev ? '🔖 In Review List' : '🔖 Mark for Review'}
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
          </div>"""

assert target_modal_footer in code, "target_modal_footer not found"
code = code.replace(target_modal_footer, replacement_modal_footer, 1)

# Update modal event listeners for route copy and review toggle
target_modal_listeners = """      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'btnModalClose') {
          modal.remove();
        } else if (e.target.id === 'btnSaveNote') {"""

replacement_modal_listeners = """      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'btnModalClose') {
          modal.remove();
          cleanupRoute();
        } else if (e.target.id === 'btnCopyProblemRoute' || e.target.closest('#btnCopyProblemRoute')) {
          const routeUrl = (typeof window !== 'undefined' && window.location) 
            ? `${window.location.origin}${window.location.pathname}#dsa/problem/${p.id}` 
            : `#dsa/problem/${p.id}`;
          if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(routeUrl).then(() => {
              const fb = modal.querySelector('#routeCopyFeedback');
              if (fb) {
                fb.classList.remove('hidden');
                setTimeout(() => fb.classList.add('hidden'), 2500);
              }
            }).catch(() => {});
          } else {
            const fb = modal.querySelector('#routeCopyFeedback');
            if (fb) {
              fb.classList.remove('hidden');
              setTimeout(() => fb.classList.add('hidden'), 2500);
            }
          }
        } else if (e.target.closest('[data-action="toggle-review"]')) {
          this.toggleReview(p.id);
          this.showProblemModal(p.id);
        } else if (e.target.id === 'btnSaveNote') {"""

assert target_modal_listeners in code, "target_modal_listeners not found"
code = code.replace(target_modal_listeners, replacement_modal_listeners, 1)

print("Part 5 (showProblemModal route & review) updated successfully")

with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(code)

os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
print("Part 5 saved successfully")
