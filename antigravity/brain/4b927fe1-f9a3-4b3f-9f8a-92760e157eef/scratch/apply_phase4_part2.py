# scratch/apply_phase4_part2.py
import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add initRouter, importProblems, and showImportModal methods right before bindEvents or after formatTimeAgo
target_helper_area = """    formatTimeAgo(timestamp) {
      if (!timestamp) return 'Recently';"""

methods_to_insert = """    // -------------------------------------------------------------------------
    // PHASE 4: URL HASH ROUTING & UNIQUE PROBLEM ROUTE
    // -------------------------------------------------------------------------
    initRouter() {
      if (typeof window === 'undefined') return;

      const handleRouting = () => {
        try {
          const hash = window.location.hash || '';
          if (!hash) return;

          // Match #dsa/problem/:id or #problem/:id
          const pMatch = hash.match(/^#(?:dsa\\/)?problem\\/(\\d+)/i);
          if (pMatch) {
            const id = parseInt(pMatch[1], 10);
            if (this.problemsById && this.problemsById.has(id)) {
              this.switchView('dsa');
              if (typeof setTimeout === 'function') {
                setTimeout(() => {
                  this.showProblemModal(id);
                }, 40);
              } else {
                this.showProblemModal(id);
              }
              return;
            }
          }

          // Match #dsa/topic/:topic or #topic/:topic
          const tMatch = hash.match(/^#(?:dsa\\/)?topic\\/(.+)/i);
          if (tMatch) {
            const decoded = decodeURIComponent(tMatch[1]).trim();
            const matchedMeta = TOPIC_METADATA_30.find(m => m.name.toLowerCase() === decoded.toLowerCase());
            if (matchedMeta) {
              this.switchView('dsa');
              this.openTopicDetailPage(matchedMeta.name);
              return;
            }
          }

          if (hash === '#dsa' || hash.startsWith('#dsa/')) {
            this.switchView('dsa');
          } else if (hash === '#visualizer') {
            this.switchView('visualizer');
          }
        } catch (e) {
          console.warn('Router error:', e);
        }
      };

      if (typeof window.addEventListener === 'function') {
        window.addEventListener('hashchange', handleRouting);
      }
      handleRouting();
    }

    // -------------------------------------------------------------------------
    // PHASE 4: DUPLICATE PREVENTION & PROBLEM IMPORT ENGINE
    // -------------------------------------------------------------------------
    importProblems(newProblems, options = { onDuplicate: 'skip' }) {
      if (!Array.isArray(newProblems)) {
        throw new Error('importProblems requires an array of problem objects');
      }

      const onDuplicate = options && options.onDuplicate === 'update' ? 'update' : 'skip';

      const report = {
        totalInput: newProblems.length,
        imported: 0,
        updated: 0,
        skipped: 0,
        duplicates: [],
        errors: [],
        totalCatalog: 0
      };

      const normalizeTitle = (t) => String(t || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const normalizeUrl = (u) => String(u || '').trim().toLowerCase().replace(/\\/+$/, '');

      // Build lookup maps from current catalog for O(1) detection
      const existingById = new Map();
      const existingByLcNum = new Map();
      const existingByNormTitle = new Map();
      const existingByNormUrl = new Map();

      this.problems.forEach(p => {
        existingById.set(p.id, p);
        if (p.leetcodeNumber) existingByLcNum.set(p.leetcodeNumber, p);
        if (p.title) existingByNormTitle.set(normalizeTitle(p.title), p);
        if (p.sourceUrl) existingByNormUrl.set(normalizeUrl(p.sourceUrl), p);
      });

      newProblems.forEach((raw, idx) => {
        if (!raw || typeof raw !== 'object') {
          report.errors.push({ index: idx, error: 'Invalid problem entry: not an object' });
          return;
        }

        // Duplicate checks
        let match = null;
        let reason = null;

        if (raw.id && existingById.has(raw.id)) {
          match = existingById.get(raw.id);
          reason = `Problem ID #${raw.id} already exists as '${match.title}'`;
        } else if (raw.leetcodeNumber && existingByLcNum.has(raw.leetcodeNumber)) {
          match = existingByLcNum.get(raw.leetcodeNumber);
          reason = `LeetCode #${raw.leetcodeNumber} already exists as '${match.title}'`;
        } else if (raw.title && existingByNormTitle.has(normalizeTitle(raw.title))) {
          match = existingByNormTitle.get(normalizeTitle(raw.title));
          reason = `Title '${raw.title}' duplicates existing '${match.title}'`;
        } else if (raw.sourceUrl && existingByNormUrl.has(normalizeUrl(raw.sourceUrl))) {
          match = existingByNormUrl.get(normalizeUrl(raw.sourceUrl));
          reason = `Source URL duplicates existing '${match.title}'`;
        }

        if (match) {
          report.duplicates.push({
            inputIndex: idx,
            candidateTitle: raw.title || `Entry #${idx + 1}`,
            matchedId: match.id,
            matchedTitle: match.title,
            reason: reason
          });

          if (onDuplicate === 'update') {
            if (raw.summary) match.summary = raw.summary;
            if (raw.description) match.description = raw.description;
            if (raw.pattern) match.pattern = raw.pattern;
            if (Array.isArray(raw.examples) && raw.examples.length > 0) match.examples = raw.examples;
            if (Array.isArray(raw.constraints) && raw.constraints.length > 0) match.constraints = raw.constraints;
            if (Array.isArray(raw.prerequisites) && raw.prerequisites.length > 0) match.prerequisites = raw.prerequisites;
            if (raw.referenceSolution) match.referenceSolution = raw.referenceSolution;
            if (raw.starterCode) match.starterCode = raw.starterCode;
            report.updated++;
          } else {
            report.skipped++;
          }
        } else {
          // Assign clean collision-free unique ID
          let newId = raw.id;
          if (!newId || existingById.has(newId)) {
            let maxId = this.problems.reduce((max, p) => Math.max(max, p.id || 0), 0);
            newId = maxId + 1;
          }

          const validRecord = {
            id: newId,
            leetcodeNumber: raw.leetcodeNumber || newId,
            title: String(raw.title || `Curated Problem #${newId}`).trim(),
            sourceUrl: raw.sourceUrl || `https://leetcode.com/problems/${String(raw.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`,
            difficulty: ['Easy', 'Medium', 'Hard'].includes(raw.difficulty) ? raw.difficulty : 'Medium',
            primaryTopic: raw.primaryTopic || (Array.isArray(raw.topics) && raw.topics[0]) || 'Arrays',
            topics: Array.isArray(raw.topics) && raw.topics.length > 0 ? raw.topics : [raw.primaryTopic || 'Arrays'],
            topic: raw.topic || raw.primaryTopic || 'Arrays',
            pattern: raw.pattern || 'Algorithmic Pattern',
            description: raw.description || raw.summary || 'Problem description.',
            summary: raw.summary || raw.description || 'Problem summary.',
            examples: Array.isArray(raw.examples) ? raw.examples : [],
            constraints: Array.isArray(raw.constraints) ? raw.constraints : [],
            prerequisites: Array.isArray(raw.prerequisites) ? raw.prerequisites : [],
            timeComplexity: raw.timeComplexity || 'O(n)',
            spaceComplexity: raw.spaceComplexity || 'O(1)',
            starterCode: raw.starterCode || raw.referenceSolution || '# Starter code\\n',
            referenceSolution: raw.referenceSolution || raw.starterCode || '# Reference solution\\n',
            verificationStatus: raw.verificationStatus || 'Community Curated'
          };

          this.problems.push(validRecord);
          existingById.set(validRecord.id, validRecord);
          if (validRecord.leetcodeNumber) existingByLcNum.set(validRecord.leetcodeNumber, validRecord);
          existingByNormTitle.set(normalizeTitle(validRecord.title), validRecord);
          existingByNormUrl.set(normalizeUrl(validRecord.sourceUrl), validRecord);
          this.problemsById.set(validRecord.id, validRecord);
          report.imported++;
        }
      });

      report.totalCatalog = this.problems.length;
      if (typeof window !== 'undefined') {
        window.DSA_PROBLEMS_LIBRARY = this.problems;
      }
      this.render();
      return report;
    }

    showImportModal() {
      const existing = document.getElementById('dsaImportModal');
      if (existing && typeof existing.remove === 'function') existing.remove();

      const modal = document.createElement('div');
      modal.id = 'dsaImportModal';
      modal.className = 'dsa-modal-backdrop';
      modal.innerHTML = `
        <div class="dsa-modal-card import-modal-card">
          <div class="dsa-modal-header">
            <div class="dsa-modal-title-row">
              <span class="lc-badge">📥 Catalog Extension</span>
              <h2 class="dsa-modal-title">Import Additional DSA Problems</h2>
            </div>
            <button class="modal-close-btn" id="btnImportModalClose" title="Close import modal">✕</button>
          </div>
          <div class="dsa-modal-body">
            <p class="import-help-text">
              Paste a JSON array of problem records. The catalog automatically checks for duplicates by <strong>Problem ID</strong>, <strong>LeetCode Number</strong>, <strong>Title</strong>, and <strong>Source URL</strong> to preserve library integrity.
            </p>
            <div class="import-options-row">
              <span class="import-strategy-label">Duplicate Policy:</span>
              <label class="radio-label"><input type="radio" name="dupStrategy" value="skip" checked> Skip Duplicates</label>
              <label class="radio-label"><input type="radio" name="dupStrategy" value="update"> Update Existing</label>
              <button class="btn-import-sample" id="btnPasteSampleJson">📄 Load Sample</button>
            </div>
            <textarea id="importJsonTextarea" class="import-json-textarea" placeholder="[&#10;  {&#10;    \\"title\\": \\"Subtree of Another Tree\\",&#10;    \\"leetcodeNumber\\": 572,&#10;    \\"difficulty\\": \\"Easy\\",&#10;    \\"primaryTopic\\": \\"Trees and Binary Trees\\",&#10;    \\"pattern\\": \\"Tree Matching\\"&#10;  }&#10;]"></textarea>
            <div id="importValidationReport" class="import-validation-box hidden"></div>
          </div>
          <div class="dsa-modal-footer">
            <div class="modal-footer-left">
              <button class="btn-hero-subtle" id="btnPreviewImport">🔍 Check for Duplicates</button>
            </div>
            <div class="modal-footer-right">
              <button class="btn-hero-primary" id="btnExecuteImport" disabled>📥 Commit to Catalog</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      let parsedData = null;

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'btnImportModalClose') {
          modal.remove();
        } else if (e.target.id === 'btnPasteSampleJson') {
          const sample = [
            {
              title: "Subtree of Another Tree",
              leetcodeNumber: 572,
              difficulty: "Easy",
              primaryTopic: "Trees and Binary Trees",
              pattern: "Tree Traversal DFS",
              summary: "Given roots of two binary trees, determine if tree subRoot has identical structure and values to a subtree of root."
            },
            {
              title: "Two Sum",
              leetcodeNumber: 1,
              difficulty: "Easy",
              primaryTopic: "Arrays",
              pattern: "Hash Map Complement",
              summary: "Duplicate problem test - should be flagged as duplicate."
            }
          ];
          const ta = modal.querySelector('#importJsonTextarea');
          if (ta) ta.value = JSON.stringify(sample, null, 2);
        } else if (e.target.id === 'btnPreviewImport') {
          const ta = modal.querySelector('#importJsonTextarea');
          const reportBox = modal.querySelector('#importValidationReport');
          const execBtn = modal.querySelector('#btnExecuteImport');
          if (!ta || !reportBox) return;

          try {
            parsedData = JSON.parse(ta.value.trim());
            if (!Array.isArray(parsedData)) parsedData = [parsedData];

            // Dry-run check duplicates without mutating
            let dups = [];
            let validNew = 0;
            const normalize = (t) => String(t || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');

            parsedData.forEach((item, i) => {
              const matched = this.problems.find(p => 
                (item.id && p.id === item.id) ||
                (item.leetcodeNumber && p.leetcodeNumber === item.leetcodeNumber) ||
                (item.title && normalize(p.title) === normalize(item.title))
              );
              if (matched) {
                dups.push(`'${item.title || 'Entry #' + (i+1)}' matches existing LC #${matched.leetcodeNumber} (${matched.title})`);
              } else {
                validNew++;
              }
            });

            reportBox.classList.remove('hidden');
            reportBox.innerHTML = `
              <div class="report-summary">
                <strong>Analysis Result:</strong> ${parsedData.length} problems analyzed.
                <div class="report-line report-valid">✓ <strong>${validNew}</strong> new unique problem(s) ready to import.</div>
                ${dups.length > 0 ? `<div class="report-line report-dup">⚠️ <strong>${dups.length}</strong> duplicate(s) detected:</div><ul class="dup-list">${dups.map(d => '<li>' + this.escapeHTML(d) + '</li>').join('')}</ul>` : ''}
              </div>
            `;
            if (execBtn) execBtn.disabled = (validNew === 0 && dups.length === 0);
          } catch (err) {
            reportBox.classList.remove('hidden');
            reportBox.innerHTML = `<div class="report-error">❌ JSON Parsing Error: ${this.escapeHTML(err.message)}</div>`;
            if (execBtn) execBtn.disabled = true;
          }
        } else if (e.target.id === 'btnExecuteImport') {
          if (!parsedData) return;
          const strat = modal.querySelector('input[name="dupStrategy"]:checked')?.value || 'skip';
          const report = this.importProblems(parsedData, { onDuplicate: strat });
          modal.remove();
          alert(`Import Complete!\n\nImported: ${report.imported}\nUpdated: ${report.updated}\nDuplicates Skipped: ${report.skipped}\nTotal Catalog: ${report.totalCatalog}`);
        }
      });
    }

    formatTimeAgo(timestamp) {"""

assert target_helper_area in code, "target_helper_area not found"
code = code.replace(target_helper_area, methods_to_insert, 1)

print("Part 2 (initRouter, importProblems, showImportModal) added successfully")

with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(code)

os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
print("Part 2 file replaced successfully")
