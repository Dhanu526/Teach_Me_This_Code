import re
import os

target_file = r'C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_dashboard.js'
with open(target_file, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update constructor with Phase 7 state variables
constructor_search = """      // Topic Library filter state
      this.topicSearchQuery = '';
      this.selectedCategory = 'all';"""

constructor_replace = """      // Topic Library filter state
      this.topicSearchQuery = '';
      this.selectedCategory = 'all';

      // Phase 7 Beginner Roadmap state
      this.selectedStage = 'all'; // 'all' | '1' | '2' | ... | '10'
      this.activeStage = this.loadActiveStage();
      this.roadmapFilter = 'all'; // 'all' | 'in_progress' | 'mastered' | 'not_started'"""

if constructor_search in code:
    code = code.replace(constructor_search, constructor_replace, 1)
    print("[SUCCESS] Added Phase 7 state properties to constructor")
else:
    print("[ERROR] Constructor pattern not found")

# 2. Add Phase 7 methods after loadProgress / saveProgress
methods_insertion = """
    // -------------------------------------------------------------------------
    // PHASE 7: BEGINNER ROADMAP & STAGE PROGRESS ENGINE
    // -------------------------------------------------------------------------
    loadActiveStage() {
      try {
        const raw = localStorage.getItem('dsa_active_stage');
        const val = parseInt(raw, 10);
        if (!isNaN(val) && val >= 1 && val <= 10) return val;
      } catch (e) {}
      return 1;
    }

    setActiveStage(stageNum) {
      const num = parseInt(stageNum, 10);
      if (isNaN(num) || num < 1 || num > 10) return;
      this.activeStage = num;
      try {
        localStorage.setItem('dsa_active_stage', String(num));
      } catch (e) {}
      this.render();
    }

    getStageProblems(stage) {
      if (!stage) return [];
      const seen = new Set();
      const list = [];
      this.problems.forEach(prob => {
        const matches = stage.topics.some(t => 
          (prob.topics && prob.topics.includes(t)) || 
          prob.topic === t || 
          prob.primaryTopic === t
        );
        if (matches && !seen.has(prob.id)) {
          seen.add(prob.id);
          list.push(prob);
        }
      });
      return list;
    }

    getStageStats(stage) {
      const stageProblems = this.getStageProblems(stage);
      const total = stageProblems.length;
      const solvedList = stageProblems.filter(p => this.progress.solved.includes(p.id));
      const solved = solvedList.length;
      const attemptedList = stageProblems.filter(p => this.progress.attempted.includes(p.id) && !this.progress.solved.includes(p.id));
      const attempted = attemptedList.length;
      const notStarted = Math.max(0, total - (solved + attempted));
      const pct = total > 0 ? (solved / total) * 100 : 0;

      const milestoneProb = this.problemsById.get(stage.milestoneId);
      const isMilestoneSolved = milestoneProb ? this.progress.solved.includes(milestoneProb.id) : false;

      const nextUnsolved = stageProblems.find(p => !this.progress.solved.includes(p.id)) || stageProblems[0] || null;

      let easyCount = 0, medCount = 0, hardCount = 0;
      stageProblems.forEach(p => {
        if (p.difficulty === 'Easy') easyCount++;
        else if (p.difficulty === 'Medium') medCount++;
        else if (p.difficulty === 'Hard') hardCount++;
      });

      // Meaningful completion rules (no fake numbers, no mastery on simple open):
      // - 0 solved and 0 attempted: 'not_started'
      // - Mastered: solved >= Math.min(total, 5) AND pct >= 50 AND isMilestoneSolved, OR pct === 100
      // - Otherwise: in_progress if (solved > 0 || attempted > 0)
      let status = 'not_started';
      if (total > 0 && (pct === 100 || (solved >= Math.min(total, 5) && pct >= 50 && isMilestoneSolved))) {
        status = 'mastered';
      } else if (solved > 0 || attempted > 0) {
        status = 'in_progress';
      }

      return {
        stageNum: stage.stage,
        total,
        solved,
        attempted,
        notStarted,
        pct,
        status,
        isMastered: status === 'mastered',
        isMilestoneSolved,
        milestoneProb,
        nextUnsolved,
        easyCount,
        medCount,
        hardCount,
        stageProblems
      };
    }

    practiceNextInStage(stageNum) {
      const stage = BEGINNER_ROADMAP_10_STAGES.find(s => s.stage === stageNum);
      if (!stage) return;
      const stats = this.getStageStats(stage);
      if (stats.nextUnsolved) {
        this.openProblemWorkspace(stats.nextUnsolved.id);
      } else if (stage.milestoneId) {
        this.openProblemWorkspace(stage.milestoneId);
      }
    }

    exploreStageProblems(stageNum) {
      this.selectedStage = String(stageNum);
      this.selectedTopic = 'all';
      this.searchQuery = '';
      this.selectedDifficulty = 'all';
      this.selectedPattern = 'all';
      this.selectedStatus = 'all';
      this.currentPage = 1;
      this.currentSubTab = 'problems';
      this.render();
      const el = document.getElementById('problemExplorerWrap');
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    renderRoadmapTimelineOnly() {
      const container = document.getElementById('dsaSubViewRoadmap');
      if (container) {
        const stats = this.computeStats();
        container.innerHTML = this.renderFullRoadmap(stats);
      }
    }
"""

save_progress_search = """    saveProgress() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
      } catch (e) {
        console.warn('Could not save DSA progress to localStorage:', e);
      }
    }"""

if save_progress_search in code:
    code = code.replace(save_progress_search, save_progress_search + methods_insertion, 1)
    print("[SUCCESS] Added Phase 7 roadmap methods")
else:
    print("[ERROR] saveProgress pattern not found")

# 3. Update tab label in render()
tab_search = """              <button class="dsa-tab-btn ${this.currentSubTab === 'roadmap' ? 'active' : ''}" data-dsa-tab="roadmap">
                🗺️ Beginner Roadmap (8 Phases)
              </button>"""

tab_replace = """              <button class="dsa-tab-btn ${this.currentSubTab === 'roadmap' ? 'active' : ''}" data-dsa-tab="roadmap">
                🗺️ Beginner Roadmap (10 Stages)
              </button>"""

if tab_search in code:
    code = code.replace(tab_search, tab_replace, 1)
    print("[SUCCESS] Updated roadmap navigation tab title to (10 Stages)")
else:
    print("[ERROR] Navigation tab pattern not found")

# 4. Replace renderRoadmapOverviewCard
overview_card_regex = r'    renderRoadmapOverviewCard\(stats\) \{[\s\S]*?\n    \}'

new_overview_card = """    renderRoadmapOverviewCard(stats) {
      const activeStageObj = BEGINNER_ROADMAP_10_STAGES.find(s => s.stage === this.activeStage) || BEGINNER_ROADMAP_10_STAGES[0];
      const activeStats = this.getStageStats(activeStageObj);

      const stageItems = BEGINNER_ROADMAP_10_STAGES.map(s => {
        const sStats = this.getStageStats(s);
        const isCurrentActive = this.activeStage === s.stage;

        return `
          <div class="roadmap-summary-item ${sStats.isMastered ? 'complete' : ''} ${isCurrentActive ? 'active-stage-item' : ''}" id="summaryStageItem_${s.stage}">
            <div class="roadmap-summary-bullet ${sStats.isMastered ? 'bullet-mastered' : ''}">${s.stage}</div>
            <div class="roadmap-summary-info">
              <div class="roadmap-summary-title">
                <strong>${this.escapeHTML(s.shortTitle || s.title.split(':')[1] || s.title)}</strong>
                ${isCurrentActive ? '<span class="summary-focus-tag">Focus</span>' : ''}
                <span class="roadmap-summary-counts">${sStats.solved}/${sStats.total}</span>
              </div>
              <div class="progress-track progress-track-sm">
                <div class="progress-fill fill-phase ${sStats.isMastered ? 'fill-mastered' : ''}" style="width: ${sStats.pct}%;"></div>
              </div>
            </div>
            <button class="btn-phase-jump" data-action="stage-practice-next" data-stage="${s.stage}" title="Practice next problem in Stage ${s.stage}">
              Practice →
            </button>
          </div>
        `;
      }).join('');

      return `
        <div class="dsa-card dsa-roadmap-overview">
          <div class="dsa-card-header">
            <div>
              <h3 class="dsa-card-title">🗺️ 10-Stage Learning Roadmap</h3>
              <span class="dsa-card-meta">Suggested beginner progression • Select your own path anytime</span>
            </div>
            <button class="btn-card-action" data-dsa-tab="roadmap">Full Roadmap →</button>
          </div>

          <!-- Active Focus Spotlight in Overview -->
          <div class="overview-focus-banner">
            <div class="overview-focus-left">
              <span class="focus-pill">🎯 Active Focus</span>
              <strong>Stage ${activeStageObj.stage}: ${this.escapeHTML(activeStageObj.shortTitle)}</strong>
              <span class="focus-stat-text">${activeStats.solved}/${activeStats.total} Solved (${activeStats.pct.toFixed(0)}%)</span>
            </div>
            <button class="btn-overview-continue" data-action="stage-practice-next" data-stage="${activeStageObj.stage}">
              Continue Stage ${activeStageObj.stage} →
            </button>
          </div>

          <div class="roadmap-summary-list">
            ${stageItems}
          </div>
        </div>
      `;
    }"""

if re.search(overview_card_regex, code):
    code = re.sub(overview_card_regex, new_overview_card, code, count=1)
    print("[SUCCESS] Replaced renderRoadmapOverviewCard with 10-stage overview")
else:
    print("[ERROR] renderRoadmapOverviewCard regex match failed")

# 5. Add Stage select to Problem Explorer toolbar
stage_select_search = """              <!-- Pattern Dropdown (Phase 2) -->
              <div class="filter-group">
                <label for="dsaPatternSelect" class="filter-label">Pattern:</label>
                <select id="dsaPatternSelect" class="filter-select pattern-select">
                  <option value="all" ${this.selectedPattern === 'all' ? 'selected' : ''}>All Patterns (${allPatterns.length})</option>
                  ${allPatterns.map(pat => `<option value="${this.escapeHTML(pat)}" ${this.selectedPattern === pat ? 'selected' : ''}>${this.escapeHTML(pat)}</option>`).join('')}
                </select>
              </div>"""

stage_select_replace = """              <!-- Pattern Dropdown (Phase 2) -->
              <div class="filter-group">
                <label for="dsaPatternSelect" class="filter-label">Pattern:</label>
                <select id="dsaPatternSelect" class="filter-select pattern-select">
                  <option value="all" ${this.selectedPattern === 'all' ? 'selected' : ''}>All Patterns (${allPatterns.length})</option>
                  ${allPatterns.map(pat => `<option value="${this.escapeHTML(pat)}" ${this.selectedPattern === pat ? 'selected' : ''}>${this.escapeHTML(pat)}</option>`).join('')}
                </select>
              </div>

              <!-- Stage Dropdown (Phase 7: Beginner Roadmap 10 Stages) -->
              <div class="filter-group">
                <label for="dsaStageSelect" class="filter-label">Stage:</label>
                <select id="dsaStageSelect" class="filter-select stage-select">
                  <option value="all" ${this.selectedStage === 'all' ? 'selected' : ''}>All 10 Stages</option>
                  ${BEGINNER_ROADMAP_10_STAGES.map(s => `<option value="${s.stage}" ${this.selectedStage === String(s.stage) ? 'selected' : ''}>Stage ${s.stage}: ${this.escapeHTML(s.shortTitle)}</option>`).join('')}
                </select>
              </div>"""

if stage_select_search in code:
    code = code.replace(stage_select_search, stage_select_replace, 1)
    print("[SUCCESS] Added Stage dropdown to Problem Explorer toolbar")
else:
    print("[ERROR] Pattern dropdown not found in Problem Explorer")

# 6. Add stage filtering into filterProblems
filter_stage_search = """      // 2. Topic filter (multi-topic matching across all 30 topics!)
      if (activeTopic && activeTopic !== 'all') {
        list = list.filter(p => (p.topics && p.topics.includes(activeTopic)) || p.topic === activeTopic);
      }"""

filter_stage_replace = """      // 2. Topic filter (multi-topic matching across all 30 topics!)
      if (activeTopic && activeTopic !== 'all') {
        list = list.filter(p => (p.topics && p.topics.includes(activeTopic)) || p.topic === activeTopic);
      }

      // Stage filter (Phase 7: Beginner Roadmap 10 Stages)
      if (this.selectedStage && this.selectedStage !== 'all') {
        const stageNum = parseInt(this.selectedStage, 10);
        const stageObj = BEGINNER_ROADMAP_10_STAGES.find(s => s.stage === stageNum);
        if (stageObj) {
          list = list.filter(p => {
            return stageObj.topics.some(t => (p.topics && p.topics.includes(t)) || p.topic === t || p.primaryTopic === t);
          });
        }
      }"""

if filter_stage_search in code:
    code = code.replace(filter_stage_search, filter_stage_replace, 1)
    print("[SUCCESS] Added stage filtering to filterProblems")
else:
    print("[ERROR] filterProblems topic filter not found")

# 7. Replace renderFullRoadmap with rich 10-stage progression
full_roadmap_regex = r'    // -------------------------------------------------------------------------\s*// SUB-VIEW 5: BEGINNER ROADMAP \(8 PHASES\)\s*// -------------------------------------------------------------------------\s*renderFullRoadmap\(stats\) \{[\s\S]*?\n    \}'

new_full_roadmap = """    // -------------------------------------------------------------------------
    // SUB-VIEW 5: BEGINNER ROADMAP (10 STAGES - PHASE 7)
    // -------------------------------------------------------------------------
    renderFullRoadmap(stats) {
      const activeStageObj = BEGINNER_ROADMAP_10_STAGES.find(s => s.stage === this.activeStage) || BEGINNER_ROADMAP_10_STAGES[0];
      const activeStats = this.getStageStats(activeStageObj);

      // Compute aggregate stats across 10 stages
      let masteredCount = 0;
      let inProgressCount = 0;
      let notStartedCount = 0;

      const stageCardsData = BEGINNER_ROADMAP_10_STAGES.map(s => {
        const stStats = this.getStageStats(s);
        if (stStats.status === 'mastered') masteredCount++;
        else if (stStats.status === 'in_progress') inProgressCount++;
        else notStartedCount++;
        return { stage: s, stats: stStats };
      });

      // Filter stages based on this.roadmapFilter
      let filteredData = stageCardsData;
      if (this.roadmapFilter === 'in_progress') {
        filteredData = stageCardsData.filter(d => d.stats.status === 'in_progress');
      } else if (this.roadmapFilter === 'mastered') {
        filteredData = stageCardsData.filter(d => d.stats.status === 'mastered');
      } else if (this.roadmapFilter === 'not_started') {
        filteredData = stageCardsData.filter(d => d.stats.status === 'not_started');
      }

      // Quick Jump navigation bar items
      const quickJumpPills = BEGINNER_ROADMAP_10_STAGES.map(s => {
        const stStats = this.getStageStats(s);
        const isActive = this.activeStage === s.stage;
        let statusIcon = '⚪';
        if (stStats.status === 'mastered') statusIcon = '🏆';
        else if (stStats.status === 'in_progress') statusIcon = '⏳';

        return `
          <button class="roadmap-jump-pill ${isActive ? 'active-focus' : ''} ${stStats.status}" 
                  data-jump-stage="${s.stage}" title="Jump directly to Stage ${s.stage}: ${this.escapeHTML(s.shortTitle)}">
            <span class="jump-num">${s.stage}</span>
            <span class="jump-name">${this.escapeHTML(s.shortTitle)}</span>
            <span class="jump-status-icon">${statusIcon}</span>
          </button>
        `;
      }).join('');

      // Render Stage Cards
      const stageCards = filteredData.map(({ stage: s, stats: stStats }) => {
        const isActiveStage = this.activeStage === s.stage;
        const isComplete = stStats.isMastered;

        // Display curated starter problems
        const starterProblems = (s.starters || []).map(id => this.problemsById.get(id)).filter(Boolean);

        return `
          <div class="roadmap-card ${isComplete ? 'phase-completed' : ''} ${isActiveStage ? 'card-active-focus' : ''}" 
               id="roadmapStageCard_${s.stage}" data-stage-id="${s.stage}">
            <div class="roadmap-card-header">
              <div class="stage-badge-wrap">
                <div class="roadmap-phase-badge stage-badge-${s.stage}">Stage ${s.stage}</div>
                ${isActiveStage ? '<span class="active-focus-tag">🎯 Active Focus</span>' : ''}
              </div>

              <div class="roadmap-header-main">
                <div class="roadmap-title-row">
                  <h3 class="roadmap-phase-title">${this.escapeHTML(s.title)}</h3>
                  <div class="stage-status-wrap">
                    ${stStats.status === 'mastered' ? `
                      <span class="stage-status-badge status-mastered">🏆 Mastered (${stStats.solved}/${stStats.total} Solved)</span>
                    ` : stStats.status === 'in_progress' ? `
                      <span class="stage-status-badge status-in-progress">⏳ In Progress (${stStats.solved}/${stStats.total} Solved)</span>
                    ` : `
                      <span class="stage-status-badge status-not-started">⚪ Not Started (0/${stStats.total})</span>
                    `}
                  </div>
                </div>

                <!-- Topic Chips -->
                <div class="roadmap-topics-list">
                  <span class="stage-topics-label">Constituent Topics:</span>
                  ${s.topics.map(t => `<button class="mini-topic-chip" data-open-topic="${this.escapeHTML(t)}">${this.escapeHTML(t)}</button>`).join(' ')}
                </div>
              </div>

              <div class="roadmap-header-actions-col">
                ${!isActiveStage ? `
                  <button class="btn-set-focus" data-action="set-active-stage" data-stage="${s.stage}" title="Set Stage ${s.stage} as your active learning focus">
                    🎯 Set as My Focus
                  </button>
                ` : `
                  <span class="active-stage-indicator">✓ Your Current Focus</span>
                `}
                <div class="roadmap-phase-stat">
                  <span class="roadmap-stat-number">${stStats.solved}/${stStats.total}</span>
                  <span class="roadmap-stat-label">Solved (${stStats.pct.toFixed(0)}%)</span>
                </div>
              </div>
            </div>

            <div class="roadmap-card-body">
              <p class="roadmap-desc">${this.escapeHTML(s.description)}</p>

              <!-- Key Concepts / Mental Models (Phase 7 Pedagogical Design) -->
              ${(s.keyConcepts && s.keyConcepts.length > 0) ? `
                <div class="stage-concepts-box">
                  <div class="stage-concepts-heading">🔑 Core Algorithmic Takeaways & Mental Models:</div>
                  <div class="stage-concepts-grid">
                    ${s.keyConcepts.map(c => `
                      <div class="concept-item">
                        <span class="concept-icon">💡</span>
                        <span class="concept-text">${this.escapeHTML(c)}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Progress & Difficulty Breakdown -->
              <div class="roadmap-progress-wrap">
                <div class="progress-track">
                  <div class="progress-fill fill-phase ${stStats.isMastered ? 'fill-mastered' : ''}" style="width: ${stStats.pct}%;"></div>
                </div>
                <div class="roadmap-progress-labels">
                  <span class="roadmap-pct-text">${stStats.pct.toFixed(0)}% Complete (${stStats.solved} of ${stStats.total} Solved)</span>
                  <div class="stage-diff-distribution">
                    <span class="stage-diff-chip diff-easy">🟢 ${stStats.easyCount} Easy</span>
                    <span class="stage-diff-chip diff-medium">🟡 ${stStats.medCount} Medium</span>
                    <span class="stage-diff-chip diff-hard">🔴 ${stStats.hardCount} Hard</span>
                  </div>
                </div>
              </div>

              <!-- Core Milestone Box -->
              <div class="stage-milestone-banner ${stStats.isMilestoneSolved ? 'milestone-cleared' : ''}">
                <div class="milestone-banner-left">
                  <span class="milestone-star-icon">🎯</span>
                  <div class="milestone-banner-text">
                    <span class="milestone-badge-title">Core Milestone Problem:</span>
                    <strong class="milestone-problem-name">${this.escapeHTML(s.milestone)}</strong>
                    <span class="milestone-status-label">${stStats.isMilestoneSolved ? '✅ Milestone Solved & Verified' : '⏳ Practice to Unlock Mastery'}</span>
                  </div>
                </div>
                <button class="btn-milestone-jump" data-action="open-workspace" data-id="${s.milestoneId}" title="Open milestone problem workspace">
                  ${stStats.isMilestoneSolved ? 'Review Milestone →' : '🚀 Solve Milestone →'}
                </button>
              </div>

              <!-- Recommended Starter Practice Problems -->
              <div class="roadmap-starters-section">
                <div class="roadmap-starters-heading">Recommended Problems to Build Stage ${s.stage} Mastery:</div>
                <div class="roadmap-starters-grid">
                  ${starterProblems.map(sp => {
                    const spSolved = this.progress.solved.includes(sp.id);
                    const spAttempted = this.progress.attempted.includes(sp.id) && !spSolved;
                    const diffClass = sp.difficulty.toLowerCase();
                    return `
                      <div class="roadmap-starter-chip ${spSolved ? 'chip-solved' : spAttempted ? 'chip-attempted' : ''}">
                        <div class="starter-chip-top">
                          <span class="lc-badge">#${sp.leetcodeNumber}</span>
                          <span class="diff-badge diff-${diffClass}">${sp.difficulty}</span>
                          ${spSolved ? '<span class="status-solved-dot" title="Solved">✓ Solved</span>' : spAttempted ? '<span class="status-attempted-dot" title="Attempted">⏳ Practiced</span>' : ''}
                        </div>
                        <div class="starter-chip-title">${this.escapeHTML(sp.title)}</div>
                        <div class="starter-chip-pattern">${this.escapeHTML(sp.pattern)}</div>
                        <div class="starter-chip-actions">
                          <button class="btn-chip-workspace" data-action="open-workspace" data-id="${sp.id}" title="Open full workspace">
                            🎓 Workspace
                          </button>
                          <button class="btn-chip-visualize" data-action="solve-visualize" data-id="${sp.id}" title="Step in Visualizer">
                            ▶ Step
                          </button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Card Footer Action Bar -->
              <div class="roadmap-card-footer">
                <div class="stage-footer-left">
                  <button class="btn-hero-primary btn-stage-practice" data-action="stage-practice-next" data-stage="${s.stage}" title="Open next unsolved problem in Stage ${s.stage}">
                    🚀 Practice Next Problem (${stStats.nextUnsolved ? '#' + stStats.nextUnsolved.leetcodeNumber + ' ' + this.escapeHTML(stStats.nextUnsolved.title) : 'Review Stage'}) →
                  </button>
                </div>
                <div class="stage-footer-right">
                  <button class="btn-hero-subtle btn-stage-explore" data-action="stage-explore-problems" data-stage="${s.stage}" title="View all problems in Stage ${s.stage}">
                    📂 Explore All ${stStats.total} Problems in Stage ${s.stage} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="dsa-full-roadmap-wrap">
          <!-- Top Roadmap Hero Intro -->
          <div class="roadmap-intro-card">
            <div class="roadmap-intro-header">
              <div>
                <h2>🗺️ 10-Stage Beginner-to-Advanced DSA Learning Roadmap</h2>
                <p>
                  A structured pedagogical sequence designed to take learners from core Python list operations and strings all the way to advanced trees, graphs, and dynamic programming. 
                  <strong>Skip topics, jump ahead, revisit concepts anytime</strong> — select your own learning path with complete freedom.
                </p>
              </div>
              <div class="roadmap-badge-pill">10 Progressive Stages • 30 Topics • 300 Curated Problems</div>
            </div>

            <!-- Roadmap KPI Summary Bar -->
            <div class="roadmap-kpi-bar">
              <div class="roadmap-kpi-item kpi-focus">
                <span class="kpi-icon">🎯</span>
                <div class="kpi-info">
                  <span class="kpi-label">Active Focus</span>
                  <strong>Stage ${activeStageObj.stage}: ${this.escapeHTML(activeStageObj.shortTitle)}</strong>
                  <span class="kpi-sub">${activeStats.solved}/${activeStats.total} Solved</span>
                </div>
                <button class="btn-kpi-action" data-action="stage-practice-next" data-stage="${activeStageObj.stage}">
                  Continue →
                </button>
              </div>

              <div class="roadmap-kpi-item kpi-mastered">
                <span class="kpi-icon">🏆</span>
                <div class="kpi-info">
                  <span class="kpi-label">Stages Mastered</span>
                  <strong>${masteredCount} of 10 Stages</strong>
                  <span class="kpi-sub">${((masteredCount / 10) * 100).toFixed(0)}% Curriculum Mastered</span>
                </div>
              </div>

              <div class="roadmap-kpi-item kpi-progress">
                <span class="kpi-icon">⏳</span>
                <div class="kpi-info">
                  <span class="kpi-label">In Progress</span>
                  <strong>${inProgressCount} Stages</strong>
                  <span class="kpi-sub">${notStartedCount} Not Started</span>
                </div>
              </div>

              <div class="roadmap-kpi-item kpi-solved">
                <span class="kpi-icon">📚</span>
                <div class="kpi-info">
                  <span class="kpi-label">Total Solved</span>
                  <strong>${stats.solved} / ${stats.total}</strong>
                  <span class="kpi-sub">${stats.pctSolved}% Problems Solved</span>
                </div>
              </div>
            </div>

            <!-- Quick-Jump Navigation Bar (All 10 Stages) -->
            <div class="roadmap-quick-jump-wrap">
              <div class="quick-jump-label">⚡ Quick Jump to Any Stage:</div>
              <div class="quick-jump-pills-row">
                ${quickJumpPills}
              </div>
            </div>

            <!-- Stage Filter Chips Toolbar -->
            <div class="roadmap-filter-toolbar">
              <span class="filter-label">Filter Stages:</span>
              <div class="pill-group">
                <button class="filter-pill ${this.roadmapFilter === 'all' ? 'active' : ''}" data-filter-roadmap="all">All 10 Stages</button>
                <button class="filter-pill ${this.roadmapFilter === 'in_progress' ? 'active' : ''}" data-filter-roadmap="in_progress">⏳ In Progress (${inProgressCount})</button>
                <button class="filter-pill ${this.roadmapFilter === 'mastered' ? 'active' : ''}" data-filter-roadmap="mastered">🏆 Mastered (${masteredCount})</button>
                <button class="filter-pill ${this.roadmapFilter === 'not_started' ? 'active' : ''}" data-filter-roadmap="not_started">⚪ Not Started (${notStartedCount})</button>
              </div>
            </div>
          </div>

          <!-- The 10 Stage Cards Timeline -->
          <div class="roadmap-timeline">
            ${stageCards}
          </div>
        </div>
      `;
    }"""

if re.search(full_roadmap_regex, code):
    code = re.sub(full_roadmap_regex, new_full_roadmap, code, count=1)
    print("[SUCCESS] Replaced renderFullRoadmap with rich 10-stage progression")
else:
    print("[ERROR] renderFullRoadmap regex match failed")

# 8. Update bindEvents with Phase 7 actions
# In btnWsRunTests: auto-mark solved if allPassed
test_mark_search = """              if (testsBadge) {
                const allPassed = testReport.passed === testReport.total;
                testsBadge.textContent = `${testReport.passed}/${testReport.total} Passed (${Math.round((testReport.passed / testReport.total) * 100)}%)`;
                testsBadge.className = `tests-status-badge ${allPassed ? 'badge-passed' : 'badge-failed'}`;
              }"""

test_mark_replace = """              if (testsBadge) {
                const allPassed = testReport.passed === testReport.total && testReport.total > 0;
                testsBadge.textContent = `${testReport.passed}/${testReport.total} Passed (${Math.round((testReport.passed / testReport.total) * 100)}%)`;
                testsBadge.className = `tests-status-badge ${allPassed ? 'badge-passed' : 'badge-failed'}`;
                if (allPassed) {
                  this.markSolved(this.activeWorkspaceProblemId);
                } else {
                  this.markAttempted(this.activeWorkspaceProblemId);
                }
              }"""

if test_mark_search in code:
    code = code.replace(test_mark_search, test_mark_replace, 1)
    print("[SUCCESS] Added auto-mark solved/attempted upon running tests in workspace")
else:
    print("[ERROR] test_mark_search pattern not found")

# In clear-filters: reset selectedStage
clear_filters_search = """          // Clear filters button
          const clearBtn = e.target.closest('[data-action="clear-filters"]');
          if (clearBtn) {
            this.searchQuery = '';
            this.selectedTopic = 'all';
            this.selectedDifficulty = 'all';
            this.selectedPattern = 'all';
            this.selectedStatus = 'all';
            this.currentPage = 1;
            this.render();
            return;
          }"""

clear_filters_replace = """          // Clear filters button
          const clearBtn = e.target.closest('[data-action="clear-filters"]');
          if (clearBtn) {
            this.searchQuery = '';
            this.selectedTopic = 'all';
            this.selectedDifficulty = 'all';
            this.selectedPattern = 'all';
            this.selectedStatus = 'all';
            this.selectedStage = 'all';
            this.currentPage = 1;
            this.render();
            return;
          }"""

if clear_filters_search in code:
    code = code.replace(clear_filters_search, clear_filters_replace, 1)
    print("[SUCCESS] Added selectedStage reset to clear-filters handler")
else:
    print("[ERROR] clear_filters_search pattern not found")

# In explore-phase and new actions in bindEvents:
phase_action_search = """          // Explore Roadmap Phase
          const roadmapBtn = e.target.closest('[data-action="explore-phase"]');
          if (roadmapBtn) {
            const phaseNum = parseInt(roadmapBtn.getAttribute('data-phase'), 10);
            const phase = ROADMAP_PHASES.find(p => p.phase === phaseNum);
            if (phase && phase.topics.length > 0) {
              this.openTopicDetailPage(phase.topics[0]);
            }
            return;
          }"""

phase_action_replace = """          // Explore Roadmap Phase / Stage (Phase 7)
          const roadmapBtn = e.target.closest('[data-action="explore-phase"]') || e.target.closest('[data-action="stage-explore-problems"]');
          if (roadmapBtn) {
            const phaseNum = parseInt(roadmapBtn.getAttribute('data-stage') || roadmapBtn.getAttribute('data-phase'), 10);
            this.exploreStageProblems(phaseNum);
            return;
          }

          // Practice Next Problem in Stage (Phase 7)
          const pracNextBtn = e.target.closest('[data-action="stage-practice-next"]');
          if (pracNextBtn) {
            const stageNum = parseInt(pracNextBtn.getAttribute('data-stage'), 10);
            this.practiceNextInStage(stageNum);
            return;
          }

          // Set Active Learning Focus Stage (Phase 7)
          const setActiveStageBtn = e.target.closest('[data-action="set-active-stage"]');
          if (setActiveStageBtn) {
            const stageNum = parseInt(setActiveStageBtn.getAttribute('data-stage'), 10);
            this.setActiveStage(stageNum);
            return;
          }

          // Quick Jump to Stage Card (Phase 7)
          const jumpStageBtn = e.target.closest('[data-jump-stage]');
          if (jumpStageBtn) {
            const stageNum = jumpStageBtn.getAttribute('data-jump-stage');
            const targetEl = document.getElementById(`roadmapStageCard_${stageNum}`);
            if (targetEl) {
              if (typeof targetEl.scrollIntoView === 'function') {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              targetEl.classList.add('stage-highlight-pulse');
              setTimeout(() => targetEl.classList.remove('stage-highlight-pulse'), 1500);
            }
            return;
          }

          // Filter Roadmap Stages (All, In Progress, Mastered, Not Started)
          const filterRoadmapBtn = e.target.closest('[data-filter-roadmap]');
          if (filterRoadmapBtn) {
            this.roadmapFilter = filterRoadmapBtn.getAttribute('data-filter-roadmap');
            this.renderRoadmapTimelineOnly();
            return;
          }"""

if phase_action_search in code:
    code = code.replace(phase_action_search, phase_action_replace, 1)
    print("[SUCCESS] Added Phase 7 roadmap event action handlers")
else:
    print("[ERROR] phase_action_search pattern not found")

# In change handler for dsaStageSelect:
change_listener_search = """        // Pattern select dropdown change
        const patSelect = document.getElementById('dsaPatternSelect');
        if (patSelect && e.target === patSelect) {
          this.selectedPattern = patSelect.value;
          this.currentPage = 1;
          this.renderProblemTableOnly();
        }"""

change_listener_replace = """        // Pattern select dropdown change
        const patSelect = document.getElementById('dsaPatternSelect');
        if (patSelect && e.target === patSelect) {
          this.selectedPattern = patSelect.value;
          this.currentPage = 1;
          this.renderProblemTableOnly();
        }

        // Stage select dropdown change (Phase 7)
        const stageSelect = document.getElementById('dsaStageSelect');
        if (stageSelect && e.target === stageSelect) {
          this.selectedStage = stageSelect.value;
          this.currentPage = 1;
          this.renderProblemTableOnly();
        }"""

if change_listener_search in code:
    code = code.replace(change_listener_search, change_listener_replace, 1)
    print("[SUCCESS] Added dsaStageSelect change event listener")
else:
    print("[ERROR] change_listener_search pattern not found")

# 9. Window exports at the end
window_export_search = """  if (typeof window !== 'undefined') {
    window.DsaDashboard = DsaDashboard;
    window.TOPIC_METADATA_30 = TOPIC_METADATA_30;"""

window_export_replace = """  if (typeof window !== 'undefined') {
    window.DsaDashboard = DsaDashboard;
    window.TOPIC_METADATA_30 = TOPIC_METADATA_30;
    window.BEGINNER_ROADMAP_10_STAGES = BEGINNER_ROADMAP_10_STAGES;
    window.ROADMAP_PHASES = ROADMAP_PHASES;"""

if window_export_search in code:
    code = code.replace(window_export_search, window_export_replace, 1)
    print("[SUCCESS] Updated window exports with BEGINNER_ROADMAP_10_STAGES")
else:
    print("[ERROR] window_export_search pattern not found")

with open(target_file + '.tmp', 'w', encoding='utf-8') as f:
    f.write(code)

os.replace(target_file + '.tmp', target_file)
print("File dsa_dashboard.js updated successfully with Phase 7 implementation.")
