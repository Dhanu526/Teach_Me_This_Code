file_path = r'C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_dashboard.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update constructor with beginnerMode
if 'this.beginnerMode =' not in content:
    target = 'if (this.settings.selectedSort) this.selectedSort = this.settings.selectedSort;'
    replacement = target + '\n      this.beginnerMode = (this.settings && this.settings.beginnerMode !== undefined) ? this.settings.beginnerMode : true;'
    assert target in content, "Constructor settings line not found"
    content = content.replace(target, replacement, 1)
    print("Added beginnerMode to constructor")

# 2. Update loadSettings() with beginnerMode: true
if 'beginnerMode: true' not in content:
    target = 'confirmSolutionReveal: true'
    replacement = 'confirmSolutionReveal: true,\n        beginnerMode: true'
    assert target in content, "confirmSolutionReveal line not found in loadSettings"
    content = content.replace(target, replacement, 1)
    print("Added beginnerMode: true to loadSettings()")

# 3. Add toggleBeginnerMode, formatComplexityForBeginner, formatEducationalError, renderBreadcrumbs after saveSettings
new_methods = '''
    toggleBeginnerMode() {
      this.beginnerMode = !this.beginnerMode;
      this.saveSettings({ beginnerMode: this.beginnerMode });
      this.render();
    }

    formatComplexityForBeginner(bigO, type = 'time') {
      if (!bigO) return type === 'time' ? 'O(n)' : 'O(1)';
      if (!this.beginnerMode) return bigO;

      const clean = String(bigO).trim();
      if (/^O\\(1\\)/i.test(clean)) {
        return type === 'time' ? 'O(1) • Instant (Constant)' : 'O(1) • In-Place (No extra memory)';
      }
      if (/^O\\(log\\s*n\\)/i.test(clean)) {
        return 'O(log n) • Logarithmic (Halves search space each step)';
      }
      if (/^O\\(n\\)/i.test(clean)) {
        return type === 'time' ? 'O(n) • Linear (Visits each element once)' : 'O(n) • Linear Memory (Stores items in array/map)';
      }
      if (/^O\\(n\\s*\\*\\s*log\\s*n|n\\s*log\\s*n\\)/i.test(clean)) {
        return 'O(n log n) • Log-Linear (Fast sorting speed)';
      }
      if (/^O\\(n\\^?2|n\\s*\\*\\s*n\\)/i.test(clean)) {
        return 'O(n²) • Quadratic (Nested loops, compares pairs)';
      }
      if (/^O\\(2\\^?n\\)/i.test(clean)) {
        return 'O(2ⁿ) • Exponential (Branches deeply with recursion)';
      }
      if (/^O\\(n\\s*\\*\\s*m|m\\s*\\*\\s*n\\)/i.test(clean)) {
        return 'O(m × n) • Grid Traversal (Visits all rows and cols)';
      }
      if (/^O\\(h\\)/i.test(clean)) {
        return 'O(h) • Tree Height (Call stack depth)';
      }
      return clean;
    }

    formatEducationalError(errText) {
      if (!errText) return { line: null, title: 'Execution Issue', message: 'An unknown error occurred.', tip: 'Review your code syntax.' };

      let line = null;
      const lineMatch = String(errText).match(/line\\s+(\\d+)/i) || String(errText).match(/line\\s*:\\s*(\\d+)/i);
      if (lineMatch) line = parseInt(lineMatch[1], 10);

      let title = 'Execution Issue';
      let tip = 'Check for matching parentheses, variable spelling, and proper 4-space indentation.';

      if (/IndentationError/i.test(errText)) {
        title = 'IndentationError (Spacing Issue)';
        tip = 'Python requires consistent indentation (usually 4 spaces) after lines ending with a colon (:), such as def, for, while, and if.';
      } else if (/SyntaxError/i.test(errText)) {
        title = 'SyntaxError (Grammar Issue)';
        tip = 'Check for a missing colon (:) at the end of a def, for, or if statement, unclosed quotes, or unclosed brackets () [] {}.';
      } else if (/NameError/i.test(errText)) {
        title = 'NameError (Undefined Variable)';
        tip = 'You are trying to use a variable or function before assigning a value to it. Double check your variable name spelling.';
      } else if (/IndexError/i.test(errText)) {
        title = 'IndexError (List Out of Bounds)';
        tip = 'You tried to access an element outside the list range. For a list of length n, valid indices are 0 to n-1.';
      } else if (/KeyError/i.test(errText)) {
        title = 'KeyError (Dictionary Key Missing)';
        tip = 'The dictionary does not contain that key yet. Use "if key in dict:" before accessing it, or use dict.get(key, default).';
      } else if (/TypeError/i.test(errText)) {
        title = 'TypeError (Incompatible Types)';
        tip = 'An operation was attempted on incompatible types, such as adding a string to an integer, or indexing something that is not a list.';
      } else if (/ZeroDivisionError/i.test(errText)) {
        title = 'ZeroDivisionError (Division by Zero)';
        tip = 'You attempted to divide by zero (or modulo % by zero). Guard with "if divisor != 0:".';
      } else if (/RecursionError/i.test(errText)) {
        title = 'RecursionError (Maximum Recursion Depth)';
        tip = 'Your recursive function kept calling itself without reaching a base case. Verify your base case return condition.';
      }

      return { line, title, message: String(errText), tip };
    }

    renderBreadcrumbs() {
      const parts = [];
      parts.push(`<button class="breadcrumb-item" data-action="nav-dashboard">🏠 DSA Learning</button>`);

      if (this.currentSubTab === 'dashboard') {
        return `
          <nav class="dsa-breadcrumb-bar" aria-label="Breadcrumb">
            <span class="breadcrumb-item current" aria-current="page">📊 Dashboard Overview</span>
          </nav>
        `;
      }

      if (this.currentSubTab === 'topics') {
        parts.push(`<span class="breadcrumb-sep">/</span>`);
        parts.push(`<span class="breadcrumb-item current" aria-current="page">📚 30-Topic Library</span>`);
      } else if (this.currentSubTab === 'topic_detail') {
        parts.push(`<span class="breadcrumb-sep">/</span>`);
        parts.push(`<button class="breadcrumb-item" data-action="nav-topics">📚 Topics</button>`);
        parts.push(`<span class="breadcrumb-sep">/</span>`);
        parts.push(`<span class="breadcrumb-item current" aria-current="page">${this.escapeHTML(this.activeTopicDetail)}</span>`);
      } else if (this.currentSubTab === 'problems') {
        parts.push(`<span class="breadcrumb-sep">/</span>`);
        parts.push(`<span class="breadcrumb-item current" aria-current="page">📋 300 Curated Problems</span>`);
      } else if (this.currentSubTab === 'roadmap') {
        parts.push(`<span class="breadcrumb-sep">/</span>`);
        parts.push(`<span class="breadcrumb-item current" aria-current="page">🗺️ 10-Stage Beginner Roadmap</span>`);
      } else if (this.currentSubTab === 'workspace' && this.activeWorkspaceProblemId) {
        const p = this.problemsById.get(this.activeWorkspaceProblemId) || this.problems[0];
        parts.push(`<span class="breadcrumb-sep">/</span>`);
        parts.push(`<button class="breadcrumb-item" data-action="back-to-problems">📋 Problems</button>`);
        if (p.topic) {
          parts.push(`<span class="breadcrumb-sep">/</span>`);
          parts.push(`<button class="breadcrumb-item" data-open-topic="${this.escapeHTML(p.topic)}">${this.escapeHTML(p.topic)}</button>`);
        }
        parts.push(`<span class="breadcrumb-sep">/</span>`);
        parts.push(`<span class="breadcrumb-item current" aria-current="page">#${p.leetcodeNumber} ${this.escapeHTML(p.title)}</span>`);
      }

      return `
        <nav class="dsa-breadcrumb-bar" aria-label="Breadcrumb">
          ${parts.join(' ')}
        </nav>
      `;
    }
'''

if 'renderBreadcrumbs()' not in content:
    target = '      this.render();\n    }\n\n    exportProgressData() {'
    replacement = '      this.render();\n    }' + new_methods + '\n    exportProgressData() {'
    assert target in content, "saveSettings render target not found"
    content = content.replace(target, replacement, 1)
    print("Added toggleBeginnerMode, formatComplexityForBeginner, formatEducationalError, renderBreadcrumbs")

# 4. Add Beginner Mode toggle button to header
old_storage_row = '''            <div class="dsa-header-storage-row">
              <span class="storage-health-tag" title="Local browser storage active (Zero cloud dependency)">💾 Offline Local Storage</span>
              <button class="btn-header-storage" data-action="open-storage-modal" title="Manage local progress, export backup, import data, or configure preferences">
                💾 Backup & Storage
              </button>
            </div>'''

new_storage_row = '''            <div class="dsa-header-storage-row">
              <span class="storage-health-tag" title="Local browser storage active (Zero cloud dependency)">💾 Offline Local Storage</span>
              <button class="btn-mode-toggle ${this.beginnerMode ? 'active' : ''}" id="btnToggleBeginnerMode" data-action="toggle-beginner-mode" title="Toggle Beginner Mode: Simplifies complexities and focuses on intuitive concepts">
                ${this.beginnerMode ? '🌱 Beginner Mode: ON' : '🔬 Detailed View'}
              </button>
              <button class="btn-header-storage" data-action="open-storage-modal" title="Manage local progress, export backup, import data, or configure preferences">
                💾 Backup & Storage
              </button>
            </div>'''

if 'btnToggleBeginnerMode' not in content:
    assert old_storage_row in content, "old_storage_row not found"
    content = content.replace(old_storage_row, new_storage_row, 1)
    print("Added Beginner Mode toggle button to header")

# 5. Insert Breadcrumbs in sub-views in render()
sub_view_targets = [
    ('<div class="dsa-view-content ${this.currentSubTab === \'dashboard\' ? \'\' : \'hidden\'}" id="dsaSubViewDashboard">',
     '<div class="dsa-view-content ${this.currentSubTab === \'dashboard\' ? \'\' : \'hidden\'}" id="dsaSubViewDashboard">\n            ${this.renderBreadcrumbs()}'),
    ('<div class="dsa-view-content ${this.currentSubTab === \'topics\' ? \'\' : \'hidden\'}" id="dsaSubViewTopics">',
     '<div class="dsa-view-content ${this.currentSubTab === \'topics\' ? \'\' : \'hidden\'}" id="dsaSubViewTopics">\n            ${this.renderBreadcrumbs()}'),
    ('<div class="dsa-view-content ${this.currentSubTab === \'topic_detail\' ? \'\' : \'hidden\'}" id="dsaSubViewTopicDetail">',
     '<div class="dsa-view-content ${this.currentSubTab === \'topic_detail\' ? \'\' : \'hidden\'}" id="dsaSubViewTopicDetail">\n            ${this.renderBreadcrumbs()}'),
    ('<div class="dsa-view-content ${this.currentSubTab === \'problems\' ? \'\' : \'hidden\'}" id="dsaSubViewProblems">',
     '<div class="dsa-view-content ${this.currentSubTab === \'problems\' ? \'\' : \'hidden\'}" id="dsaSubViewProblems">\n            ${this.renderBreadcrumbs()}'),
    ('<div class="dsa-view-content ${this.currentSubTab === \'roadmap\' ? \'\' : \'hidden\'}" id="dsaSubViewRoadmap">',
     '<div class="dsa-view-content ${this.currentSubTab === \'roadmap\' ? \'\' : \'hidden\'}" id="dsaSubViewRoadmap">\n            ${this.renderBreadcrumbs()}'),
]

for old_target, new_target in sub_view_targets:
    if old_target in content and '${this.renderBreadcrumbs()}' not in content.split(old_target)[1][:80]:
        content = content.replace(old_target, new_target, 1)
        print(f"Added breadcrumbs to {old_target[:40]}...")

# 6. Update renderProblemWorkspace with prev/next navigation
old_ws_breadcrumb = '''          <div class="workspace-top-bar">
            <div class="workspace-breadcrumb">
              <button class="btn-back-breadcrumb" data-action="back-to-problems">← Back to Problem Library</button>
              <span class="breadcrumb-sep">/</span>
              <span class="breadcrumb-current">LeetCode #${p.leetcodeNumber}: ${this.escapeHTML(p.title)}</span>
              <span class="route-badge" title="Unique problem route"><code>#dsa/problem/${p.id}</code></span>
            </div>'''

new_ws_breadcrumb = '''          <!-- Breadcrumbs Bar -->
          ${this.renderBreadcrumbs()}

          <div class="workspace-top-bar">
            <div class="workspace-breadcrumb">
              <button class="btn-back-breadcrumb" data-action="back-to-problems">← Back to Problem Library</button>
              <span class="breadcrumb-sep">/</span>
              <span class="breadcrumb-current">LeetCode #${p.leetcodeNumber}: ${this.escapeHTML(p.title)}</span>
              <span class="route-badge" title="Unique problem route"><code>#dsa/problem/${p.id}</code></span>
              <div class="workspace-prev-next-nav">
                <button class="btn-ws-nav-step" data-action="open-workspace" data-id="${prevProb.id}" title="Previous problem: #${prevProb.leetcodeNumber} ${this.escapeHTML(prevProb.title)}">
                  ← Prev
                </button>
                <span class="ws-step-indicator">${p.id} / ${this.problems.length}</span>
                <button class="btn-ws-nav-step" data-action="open-workspace" data-id="${nextProb.id}" title="Next problem: #${nextProb.leetcodeNumber} ${this.escapeHTML(nextProb.title)}">
                  Next →
                </button>
              </div>
            </div>'''

if 'workspace-prev-next-nav' not in content:
    target_p = 'const guide = this.getProblemTeachingGuide(p);'
    target_p_rep = target_p + '''
      const curIdx = this.problems.findIndex(x => x.id === p.id);
      const prevProb = curIdx > 0 ? this.problems[curIdx - 1] : this.problems[this.problems.length - 1];
      const nextProb = curIdx < this.problems.length - 1 ? this.problems[curIdx + 1] : this.problems[0];'''
    assert target_p in content, "target_p not found"
    content = content.replace(target_p, target_p_rep, 1)

    assert old_ws_breadcrumb in content, "old_ws_breadcrumb not found"
    content = content.replace(old_ws_breadcrumb, new_ws_breadcrumb, 1)
    print("Added prev/next navigation to workspace")

# 7. Update hero banner complexities in workspace to use formatComplexityForBeginner
old_comp = '''              <span class="complexity-tag">⏱ Time: ${p.timeComplexity}</span>
              <span class="complexity-tag">💾 Space: ${p.spaceComplexity}</span>'''

new_comp = '''              <span class="complexity-tag" title="Time Complexity">⏱ Time: ${this.formatComplexityForBeginner(p.timeComplexity, 'time')}</span>
              <span class="complexity-tag" title="Space Complexity">💾 Space: ${this.formatComplexityForBeginner(p.spaceComplexity, 'space')}</span>'''

if old_comp in content:
    content = content.replace(old_comp, new_comp, 1)
    print("Updated workspace complexities with beginner formatting")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("[SUCCESS] Phase 9 additions successfully written to dsa_dashboard.js")
