import re
import os

target_file = r'C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_dashboard.js'
with open(target_file, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add DsaIndexedDbBackup class definition near the top (after storage constants)
storage_constants = """  const STORAGE_KEY = 'dsa_learning_progress_v1';
  const SETTINGS_STORAGE_KEY = 'dsa_learning_settings_v1';
  const CODE_CACHE_KEY = 'dsa_user_code_v1';
  const ACTIVE_STAGE_KEY = 'dsa_active_stage';

  // IndexedDB Persistent Backup Layer (Phase 8: Offline Local Storage)
  class DsaIndexedDbBackup {
    constructor(dbName = 'TeachMeThisCode_DSA_DB', storeName = 'progress_snapshots') {
      this.dbName = dbName;
      this.storeName = storeName;
      this.db = null;
      this.init();
    }

    init() {
      if (typeof window === 'undefined' || !window.indexedDB) return;
      try {
        const req = window.indexedDB.open(this.dbName, 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: 'key' });
          }
        };
        req.onsuccess = (e) => {
          this.db = e.target.result;
        };
      } catch (e) {
        // Fallback gracefully in restricted environments
      }
    }

    saveSnapshot(key, payload) {
      if (!this.db) return Promise.resolve(false);
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction([this.storeName], 'readwrite');
          const store = tx.objectStore(this.storeName);
          store.put({ key, payload, updatedAt: Date.now() });
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }

    loadSnapshot(key) {
      if (!this.db) return Promise.resolve(null);
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction([this.storeName], 'readonly');
          const store = tx.objectStore(this.storeName);
          const req = store.get(key);
          req.onsuccess = () => resolve(req.result ? req.result.payload : null);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }
  }
"""

old_key = "  const STORAGE_KEY = 'dsa_learning_progress_v1';"
if old_key in code:
    code = code.replace(old_key, storage_constants, 1)
    print("[SUCCESS] Added storage constants and DsaIndexedDbBackup class")
else:
    print("[ERROR] STORAGE_KEY not found")

# 2. Update constructor: initialize indexedDbBackup, settings, lastOpenedProblemId
constructor_target = """      this.progress = this.loadProgress();
      this.initDOM();"""

constructor_replacement = """      this.indexedDbBackup = new DsaIndexedDbBackup();
      this.settings = this.loadSettings();
      // Apply preferred learning settings
      if (this.settings.pageSize) this.pageSize = this.settings.pageSize;
      if (this.settings.selectedSort) this.selectedSort = this.settings.selectedSort;

      this.progress = this.loadProgress();
      // Restore last opened problem
      if (this.progress && this.progress.lastOpenedProblemId) {
        this.activeWorkspaceProblemId = this.progress.lastOpenedProblemId;
      } else if (this.progress && this.progress.lastPracticedId) {
        this.activeWorkspaceProblemId = this.progress.lastPracticedId;
      }

      this.initDOM();"""

if constructor_target in code:
    code = code.replace(constructor_target, constructor_replacement, 1)
    print("[SUCCESS] Updated constructor with Phase 8 persistence state")
else:
    print("[ERROR] constructor_target not found")

# 3. Add Phase 8 Methods: loadSettings, saveSettings, exportProgressData, downloadProgressBackup, copyProgressBackupToClipboard, validateProgressImport, importProgress, resetProgress, showProgressStorageModal
phase8_methods = """
    // -------------------------------------------------------------------------
    // PHASE 8: LOCAL PROGRESS STORAGE, BACKUP & PREFERENCES
    // -------------------------------------------------------------------------
    loadSettings() {
      const defaultSettings = {
        pageSize: 25,
        selectedSort: 'order_asc',
        codeFontSize: '14px',
        animationSpeed: 'medium',
        confirmSolutionReveal: true
      };
      try {
        const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return Object.assign({}, defaultSettings, parsed);
        }
      } catch (e) {}
      return defaultSettings;
    }

    saveSettings(newSettings) {
      this.settings = Object.assign({}, this.settings || {}, newSettings);
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
      } catch (e) {
        console.warn('Could not save learning settings to localStorage:', e);
      }
      if (this.settings.pageSize) this.pageSize = this.settings.pageSize;
      if (this.settings.selectedSort) this.selectedSort = this.settings.selectedSort;
      if (this.indexedDbBackup) {
        this.indexedDbBackup.saveSnapshot('settings', this.settings);
      }
      this.render();
    }

    exportProgressData() {
      const stats = this.computeStats();
      const lastOpenedId = (this.progress && this.progress.lastOpenedProblemId) || this.activeWorkspaceProblemId || 1;
      const exportPayload = {
        "$schema": "teach_me_this_code_progress_v1",
        "version": "1.0",
        "exportedAt": Date.now(),
        "exportedAtISO": new Date().toISOString(),
        "platform": "Teach Me This Code - DSA Learning Hub",
        "notice": "All data stored locally on your device. Use Import Progress to transfer between browsers or devices.",
        "stats": {
          "totalCatalog": this.problems.length,
          "solvedCount": (this.progress.solved || []).length,
          "attemptedCount": (this.progress.attempted || []).length,
          "bookmarkedCount": (this.progress.bookmarked || []).length,
          "reviewCount": (this.progress.review || []).length,
          "notesCount": Object.keys(this.progress.notes || {}).length,
          "userCodeCount": Object.keys(this.userCodeCache || {}).length,
          "activeStage": this.activeStage,
          "lastOpenedProblemId": lastOpenedId
        },
        "progress": {
          "solved": Array.from(new Set(this.progress.solved || [])),
          "attempted": Array.from(new Set(this.progress.attempted || [])),
          "review": Array.from(new Set(this.progress.review || [])),
          "bookmarked": Array.from(new Set(this.progress.bookmarked || [])),
          "history": (this.progress.history || []).slice(0, 50),
          "notes": Object.assign({}, this.progress.notes || {}),
          "lastPracticedId": this.progress.lastPracticedId || null,
          "lastOpenedProblemId": lastOpenedId
        },
        "roadmap": {
          "activeStage": this.activeStage,
          "stagesStats": BEGINNER_ROADMAP_10_STAGES.map(s => {
            const st = this.getStageStats(s);
            return { stage: s.stage, title: s.title, status: st.status, solved: st.solved, total: st.total };
          })
        },
        "settings": Object.assign({}, this.settings),
        "userCode": Object.assign({}, this.userCodeCache || {})
      };
      return exportPayload;
    }

    downloadProgressBackup() {
      const data = this.exportProgressData();
      const jsonStr = JSON.stringify(data, null, 2);
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const timePart = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
      const fileName = `teach_me_this_code_backup_${datePart}_${timePart}.json`;

      if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
        try {
          const blob = new Blob([jsonStr], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 200);
          return { success: true, fileName, size: jsonStr.length };
        } catch (e) {
          console.warn('File download failed, offering fallback clipboard copy:', e);
        }
      }
      return { success: true, fileName, data, json: jsonStr };
    }

    copyProgressBackupToClipboard() {
      const data = this.exportProgressData();
      const jsonStr = JSON.stringify(data, null, 2);
      if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        return navigator.clipboard.writeText(jsonStr).then(() => true).catch(() => false);
      }
      return Promise.resolve(false);
    }

    validateProgressImport(rawInput) {
      const errors = [];
      const warnings = [];

      if (!rawInput) {
        return { isValid: false, errors: ['No data provided for import.'], warnings, stats: null, cleanData: null };
      }

      let parsed = rawInput;
      if (typeof rawInput === 'string') {
        const trimmed = rawInput.trim();
        if (!trimmed) {
          return { isValid: false, errors: ['Input text is empty.'], warnings, stats: null, cleanData: null };
        }
        try {
          parsed = JSON.parse(trimmed);
        } catch (e) {
          return { isValid: false, errors: ['Invalid JSON: ' + e.message], warnings, stats: null, cleanData: null };
        }
      }

      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return { isValid: false, errors: ['Invalid backup schema: root must be a JSON object.'], warnings, stats: null, cleanData: null };
      }

      // Extract progress payload (support both structured backup with "progress" key and flat legacy payload)
      const prog = (parsed.progress && typeof parsed.progress === 'object') ? parsed.progress : parsed;

      // Validate problem IDs helper
      const sanitizeIdList = (list, fieldName) => {
        if (!Array.isArray(list)) return [];
        const valid = [];
        list.forEach((item, idx) => {
          const n = Number(item);
          if (Number.isInteger(n) && n > 0) {
            valid.push(n);
          } else {
            warnings.push(`Ignored non-integer problem ID '${item}' in ${fieldName} (index ${idx}).`);
          }
        });
        return Array.from(new Set(valid));
      };

      const cleanSolved = sanitizeIdList(prog.solved, 'solved');
      const cleanAttempted = sanitizeIdList(prog.attempted, 'attempted');
      const cleanReview = sanitizeIdList(prog.review, 'review');
      const cleanBookmarked = sanitizeIdList(prog.bookmarked, 'bookmarked');

      // Validate notes object
      const cleanNotes = {};
      const rawNotes = prog.notes || parsed.notes || {};
      if (typeof rawNotes === 'object' && !Array.isArray(rawNotes)) {
        Object.keys(rawNotes).forEach(key => {
          const pid = parseInt(key, 10);
          if (!isNaN(pid) && pid > 0) {
            const noteVal = rawNotes[key];
            if (typeof noteVal === 'string') {
              const trimmed = noteVal.trim();
              if (trimmed) cleanNotes[pid] = trimmed;
            }
          }
        });
      } else if (rawNotes && typeof rawNotes !== 'object') {
        warnings.push('Invalid notes structure: expected key-value mapping of problem IDs to notes.');
      }

      // Validate practice history
      const cleanHistory = [];
      const rawHist = prog.history || parsed.history;
      if (Array.isArray(rawHist)) {
        rawHist.forEach((h, idx) => {
          if (h && typeof h === 'object' && h.problemId && Number.isInteger(Number(h.problemId))) {
            cleanHistory.push({
              problemId: Number(h.problemId),
              timestamp: Number(h.timestamp) || Date.now(),
              action: String(h.action || 'practiced')
            });
          }
        });
      }

      // Validate activeStage
      let cleanStage = 1;
      const rawStage = (parsed.roadmap && parsed.roadmap.activeStage) || prog.activeStage || parsed.activeStage;
      if (rawStage !== undefined && rawStage !== null) {
        const sNum = parseInt(rawStage, 10);
        if (!isNaN(sNum) && sNum >= 1 && sNum <= 10) {
          cleanStage = sNum;
        } else {
          warnings.push(`Out-of-range stage '${rawStage}' defaulted to Stage 1.`);
        }
      }

      // Validate last opened problem
      let cleanLastOpened = 1;
      const rawLast = prog.lastOpenedProblemId || prog.lastPracticedId || parsed.lastOpenedProblemId;
      if (rawLast) {
        const pNum = parseInt(rawLast, 10);
        if (!isNaN(pNum) && pNum > 0) cleanLastOpened = pNum;
      }

      // Validate settings
      const cleanSettings = {};
      const rawSettings = parsed.settings || {};
      if (typeof rawSettings === 'object' && !Array.isArray(rawSettings)) {
        if (['10', '25', '50', '100', 'all', 10, 25, 50, 100].includes(rawSettings.pageSize)) {
          cleanSettings.pageSize = rawSettings.pageSize === 'all' ? 'all' : parseInt(rawSettings.pageSize, 10);
        }
        if (['order_asc', 'order_desc', 'title_asc', 'title_desc', 'diff_asc', 'diff_desc', 'lc_asc', 'lc_desc'].includes(rawSettings.selectedSort)) {
          cleanSettings.selectedSort = rawSettings.selectedSort;
        }
        if (typeof rawSettings.codeFontSize === 'string') {
          cleanSettings.codeFontSize = rawSettings.codeFontSize;
        }
        if (typeof rawSettings.animationSpeed === 'string') {
          cleanSettings.animationSpeed = rawSettings.animationSpeed;
        }
      }

      // Validate user code solutions
      const cleanUserCode = {};
      const rawUserCode = parsed.userCode || {};
      if (typeof rawUserCode === 'object' && !Array.isArray(rawUserCode)) {
        Object.keys(rawUserCode).forEach(key => {
          const pid = parseInt(key, 10);
          if (!isNaN(pid) && pid > 0 && typeof rawUserCode[key] === 'string') {
            cleanUserCode[pid] = rawUserCode[key];
          }
        });
      }

      // Sanity checks: must have at least one recognized data element to be valid
      const hasAnyData = cleanSolved.length > 0 || 
                         cleanAttempted.length > 0 || 
                         cleanBookmarked.length > 0 || 
                         cleanReview.length > 0 || 
                         Object.keys(cleanNotes).length > 0 || 
                         Object.keys(cleanUserCode).length > 0;

      if (!hasAnyData && errors.length === 0) {
        errors.push('Backup file contains no recognizable learning progress data (no solved problems, bookmarks, notes, or solutions).');
      }

      const isValid = errors.length === 0;

      return {
        isValid,
        errors,
        warnings,
        stats: {
          solvedCount: cleanSolved.length,
          attemptedCount: cleanAttempted.length,
          bookmarkedCount: cleanBookmarked.length,
          reviewCount: cleanReview.length,
          notesCount: Object.keys(cleanNotes).length,
          historyCount: cleanHistory.length,
          userCodeCount: Object.keys(cleanUserCode).length,
          activeStage: cleanStage,
          lastOpenedProblemId: cleanLastOpened
        },
        cleanData: {
          solved: cleanSolved,
          attempted: cleanAttempted,
          review: cleanReview,
          bookmarked: cleanBookmarked,
          notes: cleanNotes,
          history: cleanHistory,
          lastPracticedId: prog.lastPracticedId || cleanLastOpened,
          lastOpenedProblemId: cleanLastOpened,
          activeStage: cleanStage,
          settings: cleanSettings,
          userCode: cleanUserCode
        }
      };
    }

    importProgress(rawInput, options = { mode: 'merge' }) {
      const mode = (options && options.mode === 'replace') ? 'replace' : 'merge';
      const report = this.validateProgressImport(rawInput);

      if (!report.isValid) {
        throw new Error('Progress Import Rejected: ' + report.errors.join(' '));
      }

      const incoming = report.cleanData;

      if (mode === 'replace') {
        // Complete overwrite
        this.progress = {
          solved: incoming.solved,
          attempted: incoming.attempted,
          review: incoming.review,
          bookmarked: incoming.bookmarked,
          history: incoming.history,
          notes: incoming.notes,
          lastPracticedId: incoming.lastPracticedId,
          lastOpenedProblemId: incoming.lastOpenedProblemId
        };
        this.userCodeCache = incoming.userCode;
        this.activeStage = incoming.activeStage;
        if (incoming.settings && Object.keys(incoming.settings).length > 0) {
          this.settings = Object.assign({}, this.settings, incoming.settings);
          if (this.settings.pageSize) this.pageSize = this.settings.pageSize;
          if (this.settings.selectedSort) this.selectedSort = this.settings.selectedSort;
        }
      } else {
        // Merge strategy (Preserve existing work, union sets)
        this.progress.solved = Array.from(new Set([...(this.progress.solved || []), ...incoming.solved]));
        this.progress.attempted = Array.from(new Set([...(this.progress.attempted || []), ...incoming.attempted]));
        this.progress.review = Array.from(new Set([...(this.progress.review || []), ...incoming.review]));
        this.progress.bookmarked = Array.from(new Set([...(this.progress.bookmarked || []), ...incoming.bookmarked]));
        this.progress.notes = Object.assign({}, this.progress.notes || {}, incoming.notes);

        // Merge history and cap at 50
        const combinedHistory = [...(this.progress.history || []), ...incoming.history];
        const uniqueHistMap = new Map();
        combinedHistory.forEach(h => {
          if (!uniqueHistMap.has(h.problemId) || uniqueHistMap.get(h.problemId).timestamp < h.timestamp) {
            uniqueHistMap.set(h.problemId, h);
          }
        });
        this.progress.history = Array.from(uniqueHistMap.values())
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 50);

        if (incoming.lastOpenedProblemId) {
          this.progress.lastOpenedProblemId = incoming.lastOpenedProblemId;
        }
        if (incoming.lastPracticedId) {
          this.progress.lastPracticedId = incoming.lastPracticedId;
        }

        // Merge user code solutions
        this.userCodeCache = Object.assign({}, this.userCodeCache || {}, incoming.userCode);

        // Update activeStage if provided
        if (incoming.activeStage) {
          this.activeStage = incoming.activeStage;
        }

        // Merge settings
        if (incoming.settings && Object.keys(incoming.settings).length > 0) {
          this.settings = Object.assign({}, this.settings, incoming.settings);
          if (this.settings.pageSize) this.pageSize = this.settings.pageSize;
          if (this.settings.selectedSort) this.selectedSort = this.settings.selectedSort;
        }
      }

      // Persist across localStorage and IndexedDB
      this.saveProgress();
      this.setActiveStage(this.activeStage);
      try {
        localStorage.setItem(CODE_CACHE_KEY, JSON.stringify(this.userCodeCache));
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
      } catch (e) {}

      if (this.indexedDbBackup) {
        this.indexedDbBackup.saveSnapshot('progress', this.progress);
        this.indexedDbBackup.saveSnapshot('userCode', this.userCodeCache);
        this.indexedDbBackup.saveSnapshot('settings', this.settings);
      }

      this.render();

      return {
        success: true,
        mode,
        stats: report.stats,
        warnings: report.warnings
      };
    }

    resetProgress(confirmedPassword) {
      if (confirmedPassword !== 'RESET') {
        return false;
      }
      this.progress = {
        solved: [],
        attempted: [],
        review: [],
        bookmarked: [],
        history: [],
        notes: {},
        lastPracticedId: null,
        lastOpenedProblemId: 1
      };
      this.userCodeCache = {};
      this.activeStage = 1;
      this.saveProgress();
      this.setActiveStage(1);
      try {
        localStorage.removeItem(CODE_CACHE_KEY);
      } catch (e) {}
      if (this.indexedDbBackup) {
        this.indexedDbBackup.saveSnapshot('progress', this.progress);
        this.indexedDbBackup.saveSnapshot('userCode', {});
      }
      this.render();
      return true;
    }

    showProgressStorageModal() {
      const existing = document.getElementById('dsaStorageModal');
      if (existing && typeof existing.remove === 'function') existing.remove();

      const stats = this.computeStats();
      const lastOpenedId = (this.progress && this.progress.lastOpenedProblemId) || this.activeWorkspaceProblemId || 1;
      const lastOpenedProb = this.problemsById.get(lastOpenedId) || this.problems[0];
      const activeStageObj = BEGINNER_ROADMAP_10_STAGES.find(s => s.stage === this.activeStage) || BEGINNER_ROADMAP_10_STAGES[0];
      const userCodeCount = Object.keys(this.userCodeCache || {}).length;

      const modal = document.createElement('div');
      modal.id = 'dsaStorageModal';
      modal.className = 'dsa-modal-backdrop';
      modal.innerHTML = `
        <div class="dsa-modal-card storage-modal-card">
          <div class="dsa-modal-header">
            <div class="dsa-modal-title-row">
              <span class="lc-badge">💾 Local Device Storage</span>
              <h2 class="dsa-modal-title">Progress Storage, Backup & Learning Settings</h2>
            </div>
            <button class="modal-close-btn" id="btnStorageModalClose" title="Close storage modal">✕</button>
          </div>

          <div class="dsa-modal-body storage-modal-body">
            <!-- Local Storage Transparency & Portability Notice -->
            <div class="storage-notice-banner">
              <div class="notice-icon">ℹ️</div>
              <div class="notice-content">
                <strong>Local Computer Storage Notice:</strong>
                <p>
                  Your DSA learning progress, code solutions, personal notes, bookmarks, and roadmap achievements are stored 
                  <strong>locally on your computer</strong> inside this browser (via <code>localStorage</code> and <code>IndexedDB</code>).
                  Progress survives page refreshes and browser restarts, but <strong>does not automatically synchronize between different browsers or separate devices</strong>.
                  Use <strong>Export Progress</strong> to download a backup file and <strong>Import Progress</strong> to transfer your progress anywhere.
                </p>
              </div>
            </div>

            <!-- Live Storage Statistics Grid -->
            <div class="storage-section">
              <h3 class="storage-section-title">📊 Current Local Storage Snapshot</h3>
              <div class="storage-stats-grid">
                <div class="storage-stat-item">
                  <span class="stat-icon">✅</span>
                  <div class="stat-info">
                    <strong class="stat-val">${stats.solved} / ${stats.total}</strong>
                    <span class="stat-lbl">Problems Solved (${stats.pctSolved}%)</span>
                  </div>
                </div>
                <div class="storage-stat-item">
                  <span class="stat-icon">⏳</span>
                  <div class="stat-info">
                    <strong class="stat-val">${stats.attempted}</strong>
                    <span class="stat-lbl">Problems Attempted</span>
                  </div>
                </div>
                <div class="storage-stat-item">
                  <span class="stat-icon">⭐</span>
                  <div class="stat-info">
                    <strong class="stat-val">${stats.bookmarkedCount}</strong>
                    <span class="stat-lbl">Bookmarked</span>
                  </div>
                </div>
                <div class="storage-stat-item">
                  <span class="stat-icon">📝</span>
                  <div class="stat-info">
                    <strong class="stat-val">${stats.notesCount}</strong>
                    <span class="stat-lbl">Personal Notes</span>
                  </div>
                </div>
                <div class="storage-stat-item">
                  <span class="stat-icon">🎯</span>
                  <div class="stat-info">
                    <strong class="stat-val">Stage ${this.activeStage}</strong>
                    <span class="stat-lbl">${this.escapeHTML(activeStageObj.shortTitle)}</span>
                  </div>
                </div>
                <div class="storage-stat-item">
                  <span class="stat-icon">💻</span>
                  <div class="stat-info">
                    <strong class="stat-val">${userCodeCount}</strong>
                    <span class="stat-lbl">Saved User Solutions</span>
                  </div>
                </div>
                <div class="storage-stat-item">
                  <span class="stat-icon">🕒</span>
                  <div class="stat-info">
                    <strong class="stat-val">#${lastOpenedProb ? lastOpenedProb.leetcodeNumber : 1}</strong>
                    <span class="stat-lbl">Last Opened Problem</span>
                  </div>
                </div>
                <div class="storage-stat-item">
                  <span class="stat-icon">🔒</span>
                  <div class="stat-info">
                    <strong class="stat-val">Offline & Private</strong>
                    <span class="stat-lbl">Zero External AI / Cloud</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Two Column Layout: Export Progress (Left) & Import Progress (Right) -->
            <div class="storage-two-col">
              <!-- EXPORT PROGRESS BOX -->
              <div class="storage-card-box export-box">
                <div class="card-box-header">
                  <h4 class="card-box-title">📥 Export Progress Backup</h4>
                  <span class="card-box-badge">Save to File</span>
                </div>
                <p class="card-box-desc">
                  Download your complete learning record as a validated JSON backup file. Includes solved history, notes, code solutions, active stage, and settings.
                </p>
                <div class="card-box-actions">
                  <button class="btn-hero-primary btn-export-backup" id="btnDownloadBackupFile">
                    📥 Download Backup JSON
                  </button>
                  <button class="btn-hero-subtle btn-copy-backup" id="btnCopyBackupJson">
                    📋 Copy JSON to Clipboard
                  </button>
                  <span id="exportCopyFeedback" class="export-feedback-toast hidden">✓ Copied to clipboard!</span>
                </div>
              </div>

              <!-- IMPORT PROGRESS BOX -->
              <div class="storage-card-box import-box">
                <div class="card-box-header">
                  <h4 class="card-box-title">📤 Import Progress & Restore</h4>
                  <span class="card-box-badge">Transfer / Restore</span>
                </div>
                <p class="card-box-desc">
                  Restore your progress from a backup file or pasted JSON. All data is verified to prevent corrupted imports.
                </p>

                <!-- File Upload & Mode Selection -->
                <div class="import-options-bar">
                  <div class="import-mode-select">
                    <span class="mode-label">Strategy:</span>
                    <label class="radio-label">
                      <input type="radio" name="progressImportMode" value="merge" checked>
                      <strong>Merge</strong> (Preserve current work)
                    </label>
                    <label class="radio-label">
                      <input type="radio" name="progressImportMode" value="replace">
                      <strong>Replace</strong> (Overwrite)
                    </label>
                  </div>
                  <div class="file-upload-wrap">
                    <label for="progressFileInput" class="btn-file-select">📁 Select File (.json)</label>
                    <input type="file" id="progressFileInput" accept=".json,application/json" class="hidden-file-input">
                  </div>
                </div>

                <!-- Paste JSON Textarea -->
                <textarea id="importProgressTextarea" class="import-progress-textarea" 
                  placeholder="Paste exported progress backup JSON here, or click 'Select File (.json)' above..."></textarea>

                <!-- Real-time Pre-Import Validation Report Box -->
                <div id="progressValidationBox" class="storage-validation-box hidden"></div>

                <div class="card-box-actions">
                  <button class="btn-hero-primary btn-commit-import" id="btnCommitProgressImport" disabled>
                    📤 Restore / Commit Progress
                  </button>
                </div>
              </div>
            </div>

            <!-- Learning Settings & Preferences Section -->
            <div class="storage-section preferences-section">
              <h3 class="storage-section-title">⚙️ Preferred Learning Settings</h3>
              <div class="preferences-grid">
                <div class="pref-item">
                  <label for="prefPageSize" class="pref-label">Default Page Size:</label>
                  <select id="prefPageSize" class="pref-select">
                    <option value="10" ${this.pageSize === 10 ? 'selected' : ''}>10 problems</option>
                    <option value="25" ${this.pageSize === 25 ? 'selected' : ''}>25 problems (Default)</option>
                    <option value="50" ${this.pageSize === 50 ? 'selected' : ''}>50 problems</option>
                    <option value="100" ${this.pageSize === 100 ? 'selected' : ''}>100 problems</option>
                    <option value="all" ${this.pageSize === 'all' ? 'selected' : ''}>All (300 problems)</option>
                  </select>
                </div>

                <div class="pref-item">
                  <label for="prefDefaultSort" class="pref-label">Default Problem Sort:</label>
                  <select id="prefDefaultSort" class="pref-select">
                    <option value="order_asc" ${(this.settings.selectedSort || this.selectedSort) === 'order_asc' ? 'selected' : ''}>Learning Order (1 → 300)</option>
                    <option value="title_asc" ${(this.settings.selectedSort || this.selectedSort) === 'title_asc' ? 'selected' : ''}>Title (A → Z)</option>
                    <option value="diff_asc" ${(this.settings.selectedSort || this.selectedSort) === 'diff_asc' ? 'selected' : ''}>Difficulty (Easy → Hard)</option>
                    <option value="lc_asc" ${(this.settings.selectedSort || this.selectedSort) === 'lc_asc' ? 'selected' : ''}>LeetCode # (Ascending)</option>
                  </select>
                </div>

                <div class="pref-item">
                  <label for="prefFontSize" class="pref-label">Code Editor Font Size:</label>
                  <select id="prefFontSize" class="pref-select">
                    <option value="13px" ${(this.settings.codeFontSize || '14px') === '13px' ? 'selected' : ''}>13px (Compact)</option>
                    <option value="14px" ${(this.settings.codeFontSize || '14px') === '14px' ? 'selected' : ''}>14px (Standard)</option>
                    <option value="15px" ${(this.settings.codeFontSize || '14px') === '15px' ? 'selected' : ''}>15px (Large)</option>
                    <option value="16px" ${(this.settings.codeFontSize || '14px') === '16px' ? 'selected' : ''}>16px (Extra Large)</option>
                  </select>
                </div>

                <div class="pref-item">
                  <label for="prefAnimSpeed" class="pref-label">Visualizer Playback Speed:</label>
                  <select id="prefAnimSpeed" class="pref-select">
                    <option value="slow" ${(this.settings.animationSpeed || 'medium') === 'slow' ? 'selected' : ''}>🐢 Slow (Beginner Friendly)</option>
                    <option value="medium" ${(this.settings.animationSpeed || 'medium') === 'medium' ? 'selected' : ''}>⚡ Medium (Balanced)</option>
                    <option value="fast" ${(this.settings.animationSpeed || 'medium') === 'fast' ? 'selected' : ''}>🚀 Fast (Quick Dry-Run)</option>
                  </select>
                </div>
              </div>
              <div class="pref-actions-row">
                <button class="btn-save-pref" id="btnSavePreferences">💾 Save Preferences</button>
                <span id="prefSaveFeedback" class="pref-feedback-toast hidden">✓ Preferences saved!</span>
              </div>
            </div>

            <!-- Danger Zone: Reset Progress -->
            <div class="storage-section danger-zone-section">
              <div class="danger-header">
                <span class="danger-icon">⚠️</span>
                <div>
                  <h4 class="danger-title">Danger Zone: Reset Learning Progress</h4>
                  <p class="danger-desc">
                    Permanently clear your solved status, notes, bookmarks, and code history on this browser. We strongly recommend exporting a backup first.
                  </p>
                </div>
              </div>
              <button class="btn-danger-reset" id="btnTriggerResetProgress">
                🗑️ Reset All Progress
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const textarea = modal.querySelector('#importProgressTextarea');
      const valBox = modal.querySelector('#progressValidationBox');
      const commitBtn = modal.querySelector('#btnCommitProgressImport');
      const fileInput = modal.querySelector('#progressFileInput');

      let validatedReport = null;

      const triggerValidation = (text) => {
        if (!text || !text.trim()) {
          if (valBox) valBox.classList.add('hidden');
          if (commitBtn) commitBtn.disabled = true;
          validatedReport = null;
          return;
        }

        const report = this.validateProgressImport(text);
        validatedReport = report;

        if (valBox) {
          valBox.classList.remove('hidden');
          if (report.isValid) {
            valBox.className = 'storage-validation-box validation-ok';
            valBox.innerHTML = `
              <div class="validation-title">✓ Valid Progress Backup Verified</div>
              <div class="validation-summary">
                <span><strong>${report.stats.solvedCount}</strong> Solved</span> •
                <span><strong>${report.stats.attemptedCount}</strong> Attempted</span> •
                <span><strong>${report.stats.bookmarkedCount}</strong> Bookmarked</span> •
                <span><strong>${report.stats.notesCount}</strong> Notes</span> •
                <span><strong>${report.stats.userCodeCount}</strong> Solutions</span> •
                <span>Stage <strong>${report.stats.activeStage}</strong></span>
              </div>
              ${report.warnings.length > 0 ? `<div class="validation-warns">${report.warnings.map(w => '⚠️ ' + this.escapeHTML(w)).join('<br>')}</div>` : ''}
            `;
            if (commitBtn) commitBtn.disabled = false;
          } else {
            valBox.className = 'storage-validation-box validation-err';
            valBox.innerHTML = `
              <div class="validation-title">❌ Malformed Backup Data</div>
              <div class="validation-errors">${report.errors.map(e => '• ' + this.escapeHTML(e)).join('<br>')}</div>
              <div class="validation-guard-msg">Import disabled to protect your existing progress from corruption.</div>
            `;
            if (commitBtn) commitBtn.disabled = true;
          }
        }
      };

      if (textarea) {
        textarea.addEventListener('input', (e) => triggerValidation(e.target.value));
      }

      if (fileInput) {
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (re) => {
            const content = re.target.result;
            if (textarea) textarea.value = content;
            triggerValidation(content);
          };
          reader.readAsText(file);
        });
      }

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'btnStorageModalClose') {
          modal.remove();
        } else if (e.target.id === 'btnDownloadBackupFile') {
          this.downloadProgressBackup();
        } else if (e.target.id === 'btnCopyBackupJson') {
          this.copyProgressBackupToClipboard().then((ok) => {
            const fb = modal.querySelector('#exportCopyFeedback');
            if (fb) {
              fb.classList.remove('hidden');
              setTimeout(() => fb.classList.add('hidden'), 2500);
            }
          });
        } else if (e.target.id === 'btnCommitProgressImport') {
          if (!validatedReport || !validatedReport.isValid) return;
          const modeRadio = modal.querySelector('input[name="progressImportMode"]:checked');
          const mode = modeRadio ? modeRadio.value : 'merge';

          if (mode === 'replace') {
            if (!confirm('Are you sure you want to REPLACE your current progress with this backup? Current unexported progress will be overwritten.')) {
              return;
            }
          }

          try {
            const result = this.importProgress(validatedReport.cleanData, { mode });
            modal.remove();
            alert(`Progress Import Successful!\\n\\nMode: ${result.mode.toUpperCase()}\\nSolved Problems: ${result.stats.solvedCount}\\nNotes Restored: ${result.stats.notesCount}\\nSolutions Restored: ${result.stats.userCodeCount}\\nActive Focus: Stage ${result.stats.activeStage}`);
          } catch (err) {
            alert('Import Error: ' + err.message);
          }
        } else if (e.target.id === 'btnSavePreferences') {
          const ps = modal.querySelector('#prefPageSize')?.value;
          const ds = modal.querySelector('#prefDefaultSort')?.value;
          const fs = modal.querySelector('#prefFontSize')?.value;
          const as = modal.querySelector('#prefAnimSpeed')?.value;

          const newSettings = {
            pageSize: ps === 'all' ? 'all' : parseInt(ps, 10),
            selectedSort: ds || 'order_asc',
            codeFontSize: fs || '14px',
            animationSpeed: as || 'medium'
          };
          this.saveSettings(newSettings);
          const fb = modal.querySelector('#prefSaveFeedback');
          if (fb) {
            fb.classList.remove('hidden');
            setTimeout(() => fb.classList.add('hidden'), 2500);
          }
        } else if (e.target.id === 'btnTriggerResetProgress') {
          const firstConfirm = confirm('⚠️ DANGER: Are you sure you want to reset all your DSA learning progress? All solved records, bookmarks, personal notes, and saved code will be erased.');
          if (!firstConfirm) return;
          const promptResponse = prompt('Type RESET in capital letters to confirm resetting your learning progress:');
          if (promptResponse === 'RESET') {
            this.resetProgress('RESET');
            modal.remove();
            alert('Progress has been reset to initial state.');
          } else {
            alert('Reset cancelled. Confirmation text did not match.');
          }
        }
      });
    }
"""

# Insert Phase 8 methods right before loadProgress
load_progress_marker = "    loadUserCodeCache() {"
if load_progress_marker in code:
    code = code.replace(load_progress_marker, phase8_methods + "\n    loadUserCodeCache() {", 1)
    print("[SUCCESS] Added Phase 8 storage methods")
else:
    print("[ERROR] loadUserCodeCache not found")

# 4. In openProblemWorkspace: ensure lastOpenedProblemId is recorded and saved
open_ws_marker = """      this.activeWorkspaceProblemId = problemId;
      this.currentSubTab = 'workspace';
      this.workspaceLeftTab = 'understand';
      this.workspaceRightTab = 'editor';

      this.markAttempted(problemId);"""

open_ws_replacement = """      this.activeWorkspaceProblemId = problemId;
      this.currentSubTab = 'workspace';
      this.workspaceLeftTab = 'understand';
      this.workspaceRightTab = 'editor';

      // Persist last opened problem (Phase 8)
      if (this.progress) {
        this.progress.lastOpenedProblemId = problemId;
        this.saveProgress();
      }

      this.markAttempted(problemId);"""

if open_ws_marker in code:
    code = code.replace(open_ws_marker, open_ws_replacement, 1)
    print("[SUCCESS] Recorded lastOpenedProblemId in openProblemWorkspace")
else:
    print("[ERROR] openProblemWorkspace marker not found")

# 5. In render(): add storage button & health badge in header card
header_subnav_marker = """            <!-- Sub-Navigation Pills -->
            <div class="dsa-subnav" role="tablist">"""

header_subnav_replacement = """            <!-- Header Right Storage & Settings Button (Phase 8) -->
            <div class="dsa-header-storage-row">
              <span class="storage-health-tag" title="Local browser storage active (Zero cloud dependency)">💾 Offline Local Storage</span>
              <button class="btn-header-storage" data-action="open-storage-modal" title="Manage local progress, export backup, import data, or configure preferences">
                💾 Backup & Storage
              </button>
            </div>

            <!-- Sub-Navigation Pills -->
            <div class="dsa-subnav" role="tablist">"""

if header_subnav_marker in code:
    code = code.replace(header_subnav_marker, header_subnav_replacement, 1)
    print("[SUCCESS] Added Storage & Settings button to DSA header")
else:
    print("[ERROR] header_subnav_marker not found")

# 6. In bindEvents: handle open-storage-modal, export-progress, copy-backup-json
bind_events_marker = """          // Back to Problem Library from Workspace
          const backToProbsBtn = e.target.closest('[data-action="back-to-problems"]');"""

bind_events_replacement = """          // Open Storage, Backup & Preferences Modal (Phase 8)
          const storageBtn = e.target.closest('[data-action="open-storage-modal"]');
          if (storageBtn) {
            this.showProgressStorageModal();
            return;
          }

          // Direct Export Backup Button (Phase 8)
          const exportBtn = e.target.closest('[data-action="export-progress"]');
          if (exportBtn) {
            this.downloadProgressBackup();
            return;
          }

          // Back to Problem Library from Workspace
          const backToProbsBtn = e.target.closest('[data-action="back-to-problems"]');"""

if bind_events_marker in code:
    code = code.replace(bind_events_marker, bind_events_replacement, 1)
    print("[SUCCESS] Added storage modal and export event handlers in bindEvents")
else:
    print("[ERROR] bind_events_marker not found")

# 7. In renderContinueLearningCard: ensure lastOpenedProblemId is checked first
continue_card_marker = """      if (this.progress.lastPracticedId) {
        targetProblem = this.problemsById.get(this.progress.lastPracticedId);
      }"""

continue_card_replacement = """      if (this.progress.lastOpenedProblemId) {
        targetProblem = this.problemsById.get(this.progress.lastOpenedProblemId);
      } else if (this.progress.lastPracticedId) {
        targetProblem = this.problemsById.get(this.progress.lastPracticedId);
      }"""

if continue_card_marker in code:
    code = code.replace(continue_card_marker, continue_card_replacement, 1)
    print("[SUCCESS] Prioritized lastOpenedProblemId in Continue Learning Card")
else:
    print("[ERROR] continue_card_marker not found")

with open(target_file + '.tmp', 'w', encoding='utf-8') as f:
    f.write(code)

os.replace(target_file + '.tmp', target_file)
print("File dsa_dashboard.js updated successfully with Phase 8 persistence features.")
