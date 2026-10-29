# scratch/build_phase5_workspace.py
# Implements Phase 5: Problem Learning Workspace in dsa_dashboard.js
import os
import re

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add constructor properties
target_ctor_prop = "      this.activeVisualizerProblemId = null;"
replacement_ctor_prop = """      this.activeVisualizerProblemId = null;
      this.activeWorkspaceProblemId = 1;
      this.workspaceLeftTab = 'understand'; // 'understand' | 'pattern'
      this.workspaceRightTab = 'editor'; // 'editor' | 'visualize'
      this.revealedHints = {}; // { [id]: number }
      this.revealedSolutions = {}; // { [id]: boolean }
      this.userCodeCache = this.loadUserCodeCache();"""

assert target_ctor_prop in code, "target_ctor_prop not found"
code = code.replace(target_ctor_prop, replacement_ctor_prop, 1)

# 2. Add loadUserCodeCache & saveUserCode
target_load_progress = "    loadProgress() {"
methods_user_code = """    loadUserCodeCache() {
      try {
        const raw = localStorage.getItem('dsa_user_code_v1');
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    }

    saveUserCode(problemId, codeText) {
      if (!this.userCodeCache) this.userCodeCache = {};
      this.userCodeCache[problemId] = codeText;
      try {
        localStorage.setItem('dsa_user_code_v1', JSON.stringify(this.userCodeCache));
      } catch (e) {}
    }

    getUserCode(problemId) {
      if (this.userCodeCache && this.userCodeCache[problemId]) {
        return this.userCodeCache[problemId];
      }
      const p = this.problemsById.get(problemId);
      return p ? p.starterCode : '';
    }

    loadProgress() {"""

assert target_load_progress in code, "target_load_progress not found"
code = code.replace(target_load_progress, methods_user_code, 1)

print("Part 1: Constructor and user code cache added")
with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(code)
os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
