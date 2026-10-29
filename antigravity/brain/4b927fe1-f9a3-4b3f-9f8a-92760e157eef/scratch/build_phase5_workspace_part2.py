# scratch/build_phase5_workspace_part2.py
import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update subnav and render() to include Workspace view
target_subnav = """            <!-- Sub-Navigation Pills -->
            <div class="dsa-subnav" role="tablist">
              <button class="dsa-tab-btn ${this.currentSubTab === 'dashboard' ? 'active' : ''}" data-dsa-tab="dashboard">
                📊 Dashboard
              </button>
              <button class="dsa-tab-btn ${this.currentSubTab === 'topics' || this.currentSubTab === 'topic_detail' ? 'active' : ''}" data-dsa-tab="topics">
                📚 Topic Library (30 Topics)
              </button>
              <button class="dsa-tab-btn ${this.currentSubTab === 'problems' ? 'active' : ''}" data-dsa-tab="problems">
                📋 Problem Library (300)
              </button>
              <button class="dsa-tab-btn ${this.currentSubTab === 'roadmap' ? 'active' : ''}" data-dsa-tab="roadmap">
                🗺️ Beginner Roadmap (8 Phases)
              </button>
            </div>"""

replacement_subnav = """            <!-- Sub-Navigation Pills -->
            <div class="dsa-subnav" role="tablist">
              <button class="dsa-tab-btn ${this.currentSubTab === 'dashboard' ? 'active' : ''}" data-dsa-tab="dashboard">
                📊 Dashboard
              </button>
              <button class="dsa-tab-btn ${this.currentSubTab === 'topics' || this.currentSubTab === 'topic_detail' ? 'active' : ''}" data-dsa-tab="topics">
                📚 Topic Library (30 Topics)
              </button>
              <button class="dsa-tab-btn ${this.currentSubTab === 'problems' ? 'active' : ''}" data-dsa-tab="problems">
                📋 Problem Library (300)
              </button>
              <button class="dsa-tab-btn ${this.currentSubTab === 'roadmap' ? 'active' : ''}" data-dsa-tab="roadmap">
                🗺️ Beginner Roadmap (8 Phases)
              </button>
              ${this.currentSubTab === 'workspace' && this.activeWorkspaceProblemId ? `
                <button class="dsa-tab-btn active workspace-tab-pill" data-dsa-tab="workspace">
                  🎓 Workspace (#${(this.problemsById.get(this.activeWorkspaceProblemId) || {}).leetcodeNumber || this.activeWorkspaceProblemId})
                </button>
              ` : ''}
            </div>"""

assert target_subnav in code, "target_subnav not found"
code = code.replace(target_subnav, replacement_subnav, 1)

target_subview5 = """          <!-- SUB-VIEW 5: BEGINNER ROADMAP -->
          <div class="dsa-view-content ${this.currentSubTab === 'roadmap' ? '' : 'hidden'}" id="dsaSubViewRoadmap">
            ${this.renderFullRoadmap(stats)}
          </div>
        </div>"""

replacement_subview5 = """          <!-- SUB-VIEW 5: BEGINNER ROADMAP -->
          <div class="dsa-view-content ${this.currentSubTab === 'roadmap' ? '' : 'hidden'}" id="dsaSubViewRoadmap">
            ${this.renderFullRoadmap(stats)}
          </div>

          <!-- SUB-VIEW 6: PROBLEM LEARNING WORKSPACE (PHASE 5) -->
          <div class="dsa-view-content ${this.currentSubTab === 'workspace' ? '' : 'hidden'}" id="dsaSubViewWorkspace">
            ${this.renderProblemWorkspace(this.activeWorkspaceProblemId || 1)}
          </div>
        </div>"""

assert target_subview5 in code, "target_subview5 not found"
code = code.replace(target_subview5, replacement_subview5, 1)

# 2. Add openProblemWorkspace method after openTopicDetailPage
target_open_topic = """    openTopicDetailPage(topicName) {
      this.activeTopicDetail = topicName;
      this.selectedTopic = topicName;
      this.selectedPattern = 'all';
      this.searchQuery = '';
      this.currentPage = 1;
      this.currentSubTab = 'topic_detail';
      this.render();
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }"""

replacement_open_topic = """    openTopicDetailPage(topicName) {
      this.activeTopicDetail = topicName;
      this.selectedTopic = topicName;
      this.selectedPattern = 'all';
      this.searchQuery = '';
      this.currentPage = 1;
      this.currentSubTab = 'topic_detail';
      this.render();
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // -------------------------------------------------------------------------
    // PHASE 5: DEDICATED PROBLEM LEARNING WORKSPACE
    // -------------------------------------------------------------------------
    openProblemWorkspace(problemId) {
      const p = this.problemsById.get(problemId);
      if (!p) return;

      this.activeWorkspaceProblemId = problemId;
      this.currentSubTab = 'workspace';
      this.workspaceLeftTab = 'understand';
      this.workspaceRightTab = 'editor';

      this.markAttempted(problemId);

      if (typeof window !== 'undefined' && window.location) {
        if (window.history && typeof window.history.replaceState === 'function') {
          window.history.replaceState(null, '', `#dsa/problem/${p.id}`);
        } else {
          window.location.hash = `dsa/problem/${p.id}`;
        }
      }

      this.render();
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }"""

assert target_open_topic in code, "target_open_topic not found"
code = code.replace(target_open_topic, replacement_open_topic, 1)

print("Part 2: Subnav and openProblemWorkspace added")
with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(code)
os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
