import os

html_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\index.html"
tmp_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\index.html.tmp"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update brand-area to include nav-view-switcher
target1 = '''      <div class="brand-area">
        <span class="teacher-badge">Teach Me This Code</span>
        <span id="stepProgressLabel" class="step-progress-label">Step 1 of 50</span>
        <span id="activeScopeBadge" class="scope-pill scope-global">GLOBAL SCOPE</span>
      </div>'''

replacement1 = '''      <div class="brand-area">
        <span class="teacher-badge">Teach Me This Code</span>
        <div class="nav-view-switcher" role="tablist" aria-label="Main Navigation">
          <button id="btnViewVisualizer" class="nav-tab-btn active" role="tab" aria-selected="true" title="Interactive Step-by-Step Execution Visualizer">👁️ Code Visualizer</button>
          <button id="btnViewDsa" class="nav-tab-btn" role="tab" aria-selected="false" title="DSA Learning Dashboard & 300 Curated Problems">📚 DSA Learning</button>
        </div>
        <span id="stepProgressLabel" class="step-progress-label">Step 1 of 50</span>
        <span id="activeScopeBadge" class="scope-pill scope-global">GLOBAL SCOPE</span>
      </div>'''

assert target1 in content, "target1 not found in index.html"
content = content.replace(target1, replacement1, 1)

# 2. Add visualizerViewContainer wrapper and dsaProblemActiveBanner after </header>
target2 = '''  </header>

  <!-- Error / Validation Banner (Hidden unless there is an error) -->
  <div id="validationBanner" class="validation-banner hidden"></div>'''

replacement2 = '''  </header>

  <!-- Container for Code Visualizer View -->
  <div id="visualizerViewContainer" class="visualizer-view-container">
    <!-- Active DSA Problem Banner (shown when practicing a problem from DSA library) -->
    <div id="dsaProblemActiveBanner" class="dsa-active-banner hidden"></div>

    <!-- Error / Validation Banner (Hidden unless there is an error) -->
    <div id="validationBanner" class="validation-banner hidden"></div>'''

assert target2 in content, "target2 not found in index.html"
content = content.replace(target2, replacement2, 1)

# 3. Close visualizerViewContainer and add dsaLearningContainer before script tags
target3 = '''  </section>

  <script src="engine.js"></script>'''

replacement3 = '''  </section>
  </div>
  <!-- End of visualizerViewContainer -->

  <!-- Main Container for DSA Learning View -->
  <main id="dsaLearningContainer" class="dsa-learning-container hidden" aria-label="DSA Learning Academy"></main>

  <script src="dsa_problems.js"></script>
  <script src="dsa_dashboard.js"></script>
  <script src="engine.js"></script>'''

assert target3 in content, "target3 not found in index.html"
content = content.replace(target3, replacement3, 1)

with open(tmp_path, "w", encoding="utf-8") as f:
    f.write(content)

os.replace(tmp_path, html_path)
print("Successfully updated index.html!")
