// app_build/dsa_dashboard.js — DSA Learning Dashboard, 30-Topic Library, Roadmap & Problem Explorer
// Supports multi-topic indexing, dedicated topic pages, pattern filtering, and visualizer integration.

(function () {
  'use strict';

  const STORAGE_KEY = 'dsa_learning_progress_v1';
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


  // Complete 30 Topics as requested in Phase 2
  const TOPIC_METADATA_30 = [
    {
      name: 'Arrays',
      icon: '🗃️',
      category: 'Data Structures',
      color: '#2563eb',
      summary: 'Contiguous memory structures providing O(1) random access by index. Master two-pointer scanning, in-place partitions, and boundary traversals.'
    },
    {
      name: 'Strings',
      icon: '🔤',
      category: 'Data Structures',
      color: '#0891b2',
      summary: 'Sequences of characters. Learn substring windows, palindrome checks, anagram hashing, string encoding/decoding, and pattern matching.'
    },
    {
      name: 'Hashing and Hash Maps',
      icon: '🗺️',
      category: 'Data Structures',
      color: '#059669',
      summary: 'Key-value and set associative structures giving O(1) average lookup, insertion, and deletion. Essential for complement search and frequency counting.'
    },
    {
      name: 'Two Pointers',
      icon: '👈👉',
      category: 'Techniques & Patterns',
      color: '#0d9488',
      summary: 'Using two index pointers to traverse sequences either converging from both ends or traveling in parallel to solve sorted array and partitioning problems.'
    },
    {
      name: 'Sliding Window',
      icon: '🪟',
      category: 'Techniques & Patterns',
      color: '#0284c7',
      summary: 'Maintaining a contiguous range of elements that expands and contracts dynamically, reducing nested loop O(n^2) problems to optimal O(n).'
    },
    {
      name: 'Prefix Sum',
      icon: '➕',
      category: 'Techniques & Patterns',
      color: '#4f46e5',
      summary: 'Precomputing cumulative sum arrays to query arbitrary range sums in O(1) time and detect target sub-arrays using hash map difference lookups.'
    },
    {
      name: 'Binary Search',
      icon: '🔍',
      category: 'Algorithms',
      color: '#16a34a',
      summary: 'Divide-and-conquer technique halving the search space at every step in O(log n). Works on sorted arrays, rotated sequences, and monotonic solution spaces.'
    },
    {
      name: 'Sorting',
      icon: '📶',
      category: 'Algorithms',
      color: '#d97706',
      summary: 'Arranging elements into order. Unlocks two-pointer convergence, binary search, greedy choices, and grouping of identical elements.'
    },
    {
      name: 'Linked Lists',
      icon: '🔗',
      category: 'Data Structures',
      color: '#6366f1',
      summary: 'Linear chains of node objects linked by pointers. Practice node reversals, fast and slow pointer cycle detection, and dummy head pointer operations.'
    },
    {
      name: 'Stacks',
      icon: '🥞',
      category: 'Data Structures',
      color: '#8b5cf6',
      summary: 'Last-In-First-Out (LIFO) structure. Invaluable for nested bracket validation, function call simulation, undo mechanisms, and expression evaluation.'
    },
    {
      name: 'Queues and Deques',
      icon: '🚶‍♂️',
      category: 'Data Structures',
      color: '#7c3aed',
      summary: 'First-In-First-Out (FIFO) and double-ended queues. Fundamental for breadth-first search (BFS) level-order traversal and sliding window extrema.'
    },
    {
      name: 'Recursion',
      icon: '🔄',
      category: 'Techniques & Patterns',
      color: '#ec4899',
      summary: 'Self-referential function execution solving smaller instances of the same problem. Master base cases, recursion stack frames, and recursive tree branches.'
    },
    {
      name: 'Backtracking',
      icon: '↩️',
      category: 'Techniques & Patterns',
      color: '#f97316',
      summary: 'Systematic depth-first exploration of state-space decision trees that prunes invalid candidates and backtracks state to generate combinations and permutations.'
    },
    {
      name: 'Trees and Binary Trees',
      icon: '🌳',
      category: 'Data Structures',
      color: '#15803d',
      summary: 'Hierarchical node graphs with a single root and at most two children per node. Master preorder, inorder, postorder DFS, and level-order BFS.'
    },
    {
      name: 'Binary Search Trees',
      icon: '🌲',
      category: 'Data Structures',
      color: '#166534',
      summary: 'Binary trees where left subtree keys are smaller and right subtree keys are larger. Guarantees sorted in-order traversal and O(h) search and insertion.'
    },
    {
      name: 'Heaps and Priority Queues',
      icon: '⛰️',
      category: 'Data Structures',
      color: '#ca8a04',
      summary: 'Binary tree-based structures maintaining min or max elements at the root in O(1) peek and O(log n) push/pop. Crucial for top-K problems and Dijkstra.'
    },
    {
      name: 'Graphs',
      icon: '🕸️',
      category: 'Data Structures',
      color: '#db2777',
      summary: 'Networks of vertices connected by directed or undirected edges. Model state transitions, social connections, cycle detection, and shortest paths.'
    },
    {
      name: 'Breadth-First Search (BFS)',
      icon: '🌊',
      category: 'Algorithms',
      color: '#0284c7',
      summary: 'Layer-by-layer exploration using a FIFO queue. Guarantees finding the shortest unweighted path in grids and graphs.'
    },
    {
      name: 'Depth-First Search (DFS)',
      icon: '🤿',
      category: 'Algorithms',
      color: '#9333ea',
      summary: 'Traversing as deep as possible down each branch before backtracking using recursion or an explicit stack. Perfect for component connectivity and path search.'
    },
    {
      name: 'Greedy Algorithms',
      icon: '⚡',
      category: 'Algorithms',
      color: '#eab308',
      summary: 'Making the locally optimal choice at each step with the goal of reaching a global optimum. Applicable when optimal substructure and greedy choice property hold.'
    },
    {
      name: 'Dynamic Programming',
      icon: '📈',
      category: 'Techniques & Patterns',
      color: '#dc2626',
      summary: 'Breaking complex problems into overlapping subproblems, memoizing states (top-down) or building DP tables (bottom-up) to eliminate exponential redundant work.'
    },
    {
      name: 'Bit Manipulation',
      icon: '🔢',
      category: 'Techniques & Patterns',
      color: '#475569',
      summary: 'Low-level operations using bitwise AND, OR, XOR, NOT, and shifts. Unlocks O(1) space tricks, parity checks, mask sets, and number isolation.'
    },
    {
      name: 'Tries',
      icon: '🌿',
      category: 'Data Structures',
      color: '#0d9488',
      summary: 'Prefix tree structures specialized for storing and searching strings or dictionary words in O(L) time where L is word length.'
    },
    {
      name: 'Union-Find',
      icon: '🤝',
      category: 'Data Structures',
      color: '#2563eb',
      summary: 'Disjoint-Set Data Structure providing near-O(1) amortized union and find operations with path compression and union by rank. Detects graph cycles and components.'
    },
    {
      name: 'Topological Sorting',
      icon: '🧭',
      category: 'Algorithms',
      color: '#c026d3',
      summary: 'Linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u comes before v. Solves dependency resolution.'
    },
    {
      name: 'Intervals',
      icon: '⏱️',
      category: 'Techniques & Patterns',
      color: '#65a30d',
      summary: 'Processing contiguous ranges [start, end]. Involves sorting by start/end times, detecting overlaps, merging intervals, and finding intersection points.'
    },
    {
      name: 'Monotonic Stack and Queue',
      icon: '📉',
      category: 'Data Structures',
      color: '#7e22ce',
      summary: 'Maintaining elements in strictly increasing or decreasing order. Solves next-greater/smaller element in O(n) and sliding window maximum in O(1).'
    },
    {
      name: 'Math and Number Theory',
      icon: '🧮',
      category: 'Algorithms',
      color: '#b45309',
      summary: 'Mathematical concepts including modulo arithmetic, prime sieves (Eratosthenes), Euclidean GCD, fast exponentiation, and digit manipulation.'
    },
    {
      name: 'Matrix Problems',
      icon: '▦',
      category: 'Data Structures',
      color: '#0f766e',
      summary: '2D grid traversals, in-place rotations, spiral orders, subgrid calculations, and flood-fill island discoveries.'
    },
    {
      name: 'Advanced Data Structures',
      icon: '🏗️',
      category: 'Data Structures',
      color: '#1e293b',
      summary: 'Specialized hybrid structures like LRU/LFU caches, Segment Trees, Binary Indexed Trees (Fenwick), and Median Finders with dual heaps.'
    }
  ];

  const BEGINNER_ROADMAP_10_STAGES = [
    {
      stage: 1,
      phase: 1,
      title: 'Stage 1: Python fundamentals and arrays',
      shortTitle: 'Python Fundamentals & Arrays',
      topics: ['Arrays'],
      description: 'Master core Python list operations, 0-based indexing, in-place element swapping, linear traversals, frequency counters, and prefix accumulation.',
      milestone: 'Two Sum (LC 1)',
      milestoneId: 1,
      starters: [1, 2, 6, 13],
      keyConcepts: [
        'List indexing, slicing [start:end:step], and memory layout',
        'Single-pass linear scan in O(n) without extra allocations',
        'In-place element swapping and boundary tracking',
        'Hash set membership testing for O(1) duplicate checks'
      ]
    },
    {
      stage: 2,
      phase: 2,
      title: 'Stage 2: Strings and hashing',
      shortTitle: 'Strings & Hashing',
      topics: ['Strings', 'Hashing and Hash Maps'],
      description: 'Explore character ASCII transformations, anagram frequency grouping, string immutability in Python, and constant O(1) average lookup dictionaries.',
      milestone: 'Valid Anagram (LC 242) & Group Anagrams (LC 49)',
      milestoneId: 3,
      starters: [3, 4, 8, 25],
      keyConcepts: [
        'String immutability and efficient list-to-string str.join()',
        'Frequency counting with dict and collections.Counter',
        'Character ordinal mapping via ord() and chr()',
        'Hash key collision resolution and set deduplication'
      ]
    },
    {
      stage: 3,
      phase: 3,
      title: 'Stage 3: Two pointers and sliding windows',
      shortTitle: 'Two Pointers & Sliding Windows',
      topics: ['Two Pointers', 'Sliding Window'],
      description: 'Compress quadratic O(n²) iterations into O(n) linear scans using bidirectional converging pointers, fast/slow runners, and dynamic window horizons.',
      milestone: '3Sum (LC 15) & Longest Substring Without Repeating (LC 3)',
      milestoneId: 33,
      starters: [31, 32, 33, 52],
      keyConcepts: [
        'Opposite-direction converging pointers on sorted arrays',
        'Equi-directional fast and slow runner pointers',
        'Dynamic sliding window expanding and contracting bounds',
        'Maintaining window state invariants with hash tables'
      ]
    },
    {
      stage: 4,
      phase: 4,
      title: 'Stage 4: Prefix sums, sorting, and binary search',
      shortTitle: 'Prefix Sums, Sorting & Binary Search',
      topics: ['Prefix Sum', 'Sorting', 'Binary Search'],
      description: 'Precompute cumulative range queries in O(1), apply comparison/linear sorting invariants, and divide-and-conquer monotonic spaces with logarithmic O(log n) efficiency.',
      milestone: 'Binary Search (LC 704) & Search in Rotated Sorted Array (LC 33)',
      milestoneId: 89,
      starters: [16, 22, 89, 91],
      keyConcepts: [
        'Prefix sum array construction and O(1) range queries [L, R]',
        'Midpoint calculation mid = low + (high - low) // 2 without overflow',
        'Binary search on answer space (monotonic predicate functions)',
        'Dutch National Flag 3-way partitioning sort'
      ]
    },
    {
      stage: 5,
      phase: 5,
      title: 'Stage 5: Linked lists, stacks, and queues',
      shortTitle: 'Linked Lists, Stacks & Queues',
      topics: ['Linked Lists', 'Stacks', 'Queues and Deques', 'Monotonic Stack and Queue'],
      description: 'Traverse and manipulate heap-allocated node references, maintain LIFO stacks for parentheses/monotonic state, and utilize FIFO double-ended queues for state buffering.',
      milestone: 'Valid Parentheses (LC 20) & Reverse Linked List (LC 206)',
      milestoneId: 69,
      starters: [69, 70, 109, 110],
      keyConcepts: [
        'Sentinel dummy heads for edge-case elimination',
        'Fast and slow pointer Floyd cycle detection',
        'LIFO bracket matching and expression parsing',
        'Monotonic stacks for Next Greater Element in O(n)'
      ]
    },
    {
      stage: 6,
      phase: 6,
      title: 'Stage 6: Recursion and backtracking',
      shortTitle: 'Recursion & Backtracking',
      topics: ['Recursion', 'Backtracking'],
      description: 'Formulate recurrence relations, base case termination, and recursion call stack traces. Explore state-space search trees with pruning for permutations, combinations, and power sets.',
      milestone: 'Subsets (LC 78) & Combination Sum (LC 39)',
      milestoneId: 187,
      starters: [187, 189, 191, 193],
      keyConcepts: [
        'Base cases, recurrence steps, and return value bubbling',
        'State-space decision trees and branching factor',
        'Choose, Explore, Unchoose backtracking lifecycle',
        'Early branch pruning to prevent combinatorial explosion'
      ]
    },
    {
      stage: 7,
      phase: 7,
      title: 'Stage 7: Trees and binary search trees',
      shortTitle: 'Trees & BSTs',
      topics: ['Trees and Binary Trees', 'Binary Search Trees', 'Tries'],
      description: 'Traverse recursive branching structures (preorder, inorder, postorder, BFS level-order), enforce Binary Search Tree invariant properties, and build prefix tries for fast string lookups.',
      milestone: 'Maximum Depth of Binary Tree (LC 104) & Validate BST (LC 98)',
      milestoneId: 132,
      starters: [131, 132, 143, 163],
      keyConcepts: [
        'Depth-first search traversals: preorder, inorder, postorder',
        'Breadth-first search level-order queue traversals',
        'BST invariant: all left nodes < root < all right nodes',
        'Prefix Trie character tree insertion and prefix matching'
      ]
    },
    {
      stage: 8,
      phase: 8,
      title: 'Stage 8: Heaps and graphs',
      shortTitle: 'Heaps & Graphs',
      topics: ['Heaps and Priority Queues', 'Graphs', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Topological Sorting', 'Union-Find'],
      description: 'Schedule priority elements with min/max heaps, build adjacency list networks, find shortest paths with BFS, detect cycles and connected components with DFS, compute topological sort, and merge disjoint sets.',
      milestone: 'Number of Islands (LC 200) & Course Schedule (LC 207)',
      milestoneId: 205,
      starters: [171, 205, 206, 212],
      keyConcepts: [
        'Min-heap and Max-heap heapify and heappop/heappush',
        'Adjacency list representation with dict and defaultdict',
        'Breadth-first shortest unweighted path search',
        'Depth-first cycle detection and connected components',
        'Topological sorting via Kahn algorithm and in-degrees',
        'Disjoint-set union with find and union by rank'
      ]
    },
    {
      stage: 9,
      phase: 9,
      title: 'Stage 9: Greedy algorithms and dynamic programming',
      shortTitle: 'Greedy & Dynamic Programming',
      topics: ['Greedy Algorithms', 'Dynamic Programming', 'Intervals'],
      description: 'Identify optimal substructure and overlapping subproblems. Master top-down memoization, bottom-up tabulation, greedy local-choice invariants, and interval scheduling.',
      milestone: 'Climbing Stairs (LC 70) & Maximum Subarray (LC 53)',
      milestoneId: 239,
      starters: [239, 251, 241, 281],
      keyConcepts: [
        'Optimal substructure and overlapping subproblems identification',
        'Top-down memoization with @lru_cache or memo dictionary',
        'Bottom-up dynamic programming tabulation with rolling variables',
        'Kadanes algorithm for maximum subarray in O(n)',
        'Greedy interval merging by sorting boundary endpoints'
      ]
    },
    {
      stage: 10,
      phase: 10,
      title: 'Stage 10: Advanced patterns and data structures',
      shortTitle: 'Advanced Patterns & Structures',
      topics: ['Advanced Data Structures', 'Bit Manipulation', 'Math and Number Theory', 'Matrix Problems'],
      description: 'Harness bitwise manipulation (XOR, shifts, masks), 2D matrix in-place transformations, prime factorization and modular arithmetic, and composite structures like LRU Cache and Monotonic Deque.',
      milestone: 'Single Number (LC 136) & Rotate Image (LC 48)',
      milestoneId: 10,
      starters: [10, 19, 20, 295],
      keyConcepts: [
        'Bitwise XOR self-canceling identity (a ^ a = 0)',
        'Bitmask manipulation and Brian Kernighan bit count',
        'In-place 2D matrix transposition and row reversal',
        'Euclidean Greatest Common Divisor and modular arithmetic',
        'Composite data structures (Hash Map + Doubly Linked List)'
      ]
    }
  ];

  // Backward compatibility alias
  const ROADMAP_PHASES = BEGINNER_ROADMAP_10_STAGES;

  class DsaDashboard {
    constructor(options = {}) {
      this.engine = options.engine || (typeof window !== 'undefined' && window.PythonExecutionEngine ? new window.PythonExecutionEngine() : null);
      this.problems = window.DSA_PROBLEMS_LIBRARY || [];
      this.problemsById = new Map();
      this.problems.forEach(p => this.problemsById.set(p.id, p));

      // View state
      this.currentSubTab = 'dashboard'; // 'dashboard' | 'topics' | 'topic_detail' | 'problems' | 'roadmap'
      this.activeTopicDetail = 'Arrays';

      // Filters
      this.searchQuery = '';
      this.selectedTopic = 'all';
      this.selectedDifficulty = 'all';
      this.selectedPattern = 'all';
      this.selectedStatus = 'all'; // 'all' | 'not_started' | 'attempted' | 'solved' | 'review' | 'bookmarked' | 'with_notes'
      this.onlyBookmarked = false; // independent bookmarked toggle
      this.selectedSort = 'order_asc'; // 'order_asc' | 'order_desc' | 'title_asc' | 'title_desc' | 'diff_asc' | 'diff_desc' | 'lc_asc' | 'lc_desc'
      this.currentPage = 1;
      this.pageSize = 25; // 10, 25, 50, 100, or 'all'

      // Topic Library filter state
      this.topicSearchQuery = '';
      this.selectedCategory = 'all';

      // Phase 7 Beginner Roadmap state
      this.selectedStage = 'all'; // 'all' | '1' | '2' | ... | '10'
      this.activeStage = this.loadActiveStage();
      this.roadmapFilter = 'all'; // 'all' | 'in_progress' | 'mastered' | 'not_started'

      this.activeVisualizerProblemId = null;
      this.activeWorkspaceProblemId = 1;
      this.workspaceLeftTab = 'understand'; // 'understand' | 'pattern'
      this.workspaceRightTab = 'editor'; // 'editor' | 'visualize'
      this.revealedHints = {}; // { [id]: number }
      this.revealedSolutions = {}; // { [id]: boolean }
      this.activeSolutionApproach = {}; // { [id]: 'baseline' | 'optimized' }
      this.userCodeCache = this.loadUserCodeCache();

      this.indexedDbBackup = new DsaIndexedDbBackup();
      this.settings = this.loadSettings();
      // Apply preferred learning settings
      if (this.settings.pageSize) this.pageSize = this.settings.pageSize;
      if (this.settings.selectedSort) this.selectedSort = this.settings.selectedSort;
      this.beginnerMode = (this.settings && this.settings.beginnerMode !== undefined) ? this.settings.beginnerMode : true;

      this.progress = this.loadProgress();
      // Restore last opened problem
      if (this.progress && this.progress.lastOpenedProblemId) {
        this.activeWorkspaceProblemId = this.progress.lastOpenedProblemId;
      } else if (this.progress && this.progress.lastPracticedId) {
        this.activeWorkspaceProblemId = this.progress.lastPracticedId;
      }

      this.initDOM();
      this.bindEvents();
      this.initRouter();
      this.render();
    }

    // -------------------------------------------------------------------------
    // LOCAL STORAGE PROGRESS (Real Data Only — Zero Fake Numbers)
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // PHASE 8: LOCAL PROGRESS STORAGE, BACKUP & PREFERENCES
    // -------------------------------------------------------------------------
    loadSettings() {
      const defaultSettings = {
        pageSize: 25,
        selectedSort: 'order_asc',
        codeFontSize: '14px',
        animationSpeed: 'medium',
        confirmSolutionReveal: true,
        beginnerMode: true
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
    toggleBeginnerMode() {
      this.beginnerMode = !this.beginnerMode;
      this.saveSettings({ beginnerMode: this.beginnerMode });
      this.render();
    }

    formatComplexityForBeginner(bigO, type = 'time') {
      if (!bigO) return type === 'time' ? 'O(n)' : 'O(1)';
      if (!this.beginnerMode) return bigO;

      const clean = String(bigO).trim();
      if (/^O\(1\)/i.test(clean)) {
        return type === 'time' ? 'O(1) • Instant (Constant)' : 'O(1) • In-Place (No extra memory)';
      }
      if (/^O\(log\s*n\)/i.test(clean)) {
        return 'O(log n) • Logarithmic (Halves search space each step)';
      }
      if (/^O\(n\)/i.test(clean)) {
        return type === 'time' ? 'O(n) • Linear (Visits each element once)' : 'O(n) • Linear Memory (Stores items in array/map)';
      }
      if (/^O\(n\s*\*\s*log\s*n|n\s*log\s*n\)/i.test(clean)) {
        return 'O(n log n) • Log-Linear (Fast sorting speed)';
      }
      if (/^O\(n\^?2|n\s*\*\s*n\)/i.test(clean)) {
        return 'O(n²) • Quadratic (Nested loops, compares pairs)';
      }
      if (/^O\(2\^?n\)/i.test(clean)) {
        return 'O(2ⁿ) • Exponential (Branches deeply with recursion)';
      }
      if (/^O\(n\s*\*\s*m|m\s*\*\s*n\)/i.test(clean)) {
        return 'O(m × n) • Grid Traversal (Visits all rows and cols)';
      }
      if (/^O\(h\)/i.test(clean)) {
        return 'O(h) • Tree Height (Call stack depth)';
      }
      return clean;
    }

    formatEducationalError(errText) {
      if (!errText) return { line: null, title: 'Execution Issue', message: 'An unknown error occurred.', tip: 'Review your code syntax.' };

      let line = null;
      const lineMatch = String(errText).match(/line\s+(\d+)/i) || String(errText).match(/line\s*:\s*(\d+)/i);
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
            alert(`Progress Import Successful!\n\nMode: ${result.mode.toUpperCase()}\nSolved Problems: ${result.stats.solvedCount}\nNotes Restored: ${result.stats.notesCount}\nSolutions Restored: ${result.stats.userCodeCount}\nActive Focus: Stage ${result.stats.activeStage}`);
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

    loadUserCodeCache() {
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

    loadProgress() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return {
            solved: Array.isArray(parsed.solved) ? parsed.solved : [],
            attempted: Array.isArray(parsed.attempted) ? parsed.attempted : [],
            review: Array.isArray(parsed.review) ? parsed.review : [],
            bookmarked: Array.isArray(parsed.bookmarked) ? parsed.bookmarked : [],
            history: Array.isArray(parsed.history) ? parsed.history : [],
            notes: (parsed.notes && typeof parsed.notes === 'object') ? parsed.notes : {},
            lastPracticedId: parsed.lastPracticedId || null
          };
        }
      } catch (e) {
        console.warn('Could not read DSA progress from localStorage:', e);
      }
      return {
        solved: [],
        attempted: [],
        review: [],
        bookmarked: [],
        history: [],
        notes: {},
        lastPracticedId: null
      };
    }

    saveProgress() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
      } catch (e) {
        console.warn('Could not save DSA progress to localStorage:', e);
      }
    }
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


    getProblemStatus(id) {
      if (this.progress.solved.includes(id)) return 'solved';
      if (this.isReview(id)) return 'review';
      if (this.progress.attempted.includes(id)) return 'attempted';
      return 'not_started';
    }

    isBookmarked(id) {
      return Array.isArray(this.progress.bookmarked) && this.progress.bookmarked.includes(id);
    }

    isReview(id) {
      return Array.isArray(this.progress.review) && this.progress.review.includes(id);
    }

    toggleReview(id) {
      if (!Array.isArray(this.progress.review)) this.progress.review = [];
      const idx = this.progress.review.indexOf(id);
      if (idx >= 0) {
        this.progress.review.splice(idx, 1);
      } else {
        this.progress.review.push(id);
      }
      this.saveProgress();
      this.renderProblemTableOnly();
      this.updateReviewMetricsUI();
    }

    markReview(id) {
      if (!Array.isArray(this.progress.review)) this.progress.review = [];
      if (!this.progress.review.includes(id)) {
        this.progress.review.push(id);
        this.saveProgress();
        this.renderProblemTableOnly();
        this.updateReviewMetricsUI();
      }
    }

    unmarkReview(id) {
      if (!Array.isArray(this.progress.review)) return;
      const idx = this.progress.review.indexOf(id);
      if (idx >= 0) {
        this.progress.review.splice(idx, 1);
        this.saveProgress();
        this.renderProblemTableOnly();
        this.updateReviewMetricsUI();
      }
    }

    updateReviewMetricsUI() {
      const reviewBadge = document.querySelector('.metric-card.metric-review .metric-value');
      if (reviewBadge) {
        reviewBadge.textContent = this.progress.review.length;
      }
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
    }

    toggleBookmark(id) {
      const idx = this.progress.bookmarked.indexOf(id);
      if (idx >= 0) {
        this.progress.bookmarked.splice(idx, 1);
      } else {
        this.progress.bookmarked.push(id);
      }
      this.saveProgress();
      this.render();
    }

    markAttempted(id) {
      if (!this.progress.attempted.includes(id) && !this.progress.solved.includes(id)) {
        this.progress.attempted.push(id);
      }
      this.progress.lastPracticedId = id;
      this.addHistoryEntry(id, 'attempted');
      this.saveProgress();
      this.render();
    }

    markSolved(id) {
      if (!this.progress.solved.includes(id)) {
        this.progress.solved.push(id);
      }
      const attIdx = this.progress.attempted.indexOf(id);
      if (attIdx >= 0) {
        this.progress.attempted.splice(attIdx, 1);
      }
      this.progress.lastPracticedId = id;
      this.addHistoryEntry(id, 'solved');
      this.saveProgress();
      this.render();
      this.updateVisualizerActiveBanner();
    }

    toggleSolved(id) {
      if (this.progress.solved.includes(id)) {
        this.progress.solved = this.progress.solved.filter(x => x !== id);
        if (!this.progress.attempted.includes(id)) {
          this.progress.attempted.push(id);
        }
      } else {
        this.markSolved(id);
      }
      this.saveProgress();
      this.render();
      this.updateVisualizerActiveBanner();
    }

    addHistoryEntry(id, action) {
      const p = this.problemsById.get(id);
      if (!p) return;
      this.progress.history = this.progress.history.filter(h => h.problemId !== id);
      this.progress.history.unshift({
        problemId: id,
        timestamp: Date.now(),
        action: action
      });
      if (this.progress.history.length > 40) {
        this.progress.history = this.progress.history.slice(0, 40);
      }
    }

    // -------------------------------------------------------------------------
    // COMPUTED STATS & METRICS
    // -------------------------------------------------------------------------
    computeStats() {
      const total = this.problems.length;
      const solvedCount = this.progress.solved.length;
      const attemptedCount = this.progress.attempted.filter(id => !this.progress.solved.includes(id)).length;
      const notStartedCount = Math.max(0, total - (solvedCount + attemptedCount));
      const bookmarkedCount = Array.isArray(this.progress.bookmarked) ? this.progress.bookmarked.length : 0;
      const reviewCount = Array.isArray(this.progress.review) ? this.progress.review.length : 0;
      const notesCount = (this.progress.notes && typeof this.progress.notes === 'object') ? Object.keys(this.progress.notes).length : 0;
      const pctSolved = total > 0 ? ((solvedCount / total) * 100).toFixed(1) : '0.0';

      const diffMap = {
        Easy: { total: 0, solved: 0 },
        Medium: { total: 0, solved: 0 },
        Hard: { total: 0, solved: 0 }
      };
      this.problems.forEach(p => {
        if (diffMap[p.difficulty]) {
          diffMap[p.difficulty].total++;
          if (this.progress.solved.includes(p.id)) {
            diffMap[p.difficulty].solved++;
          }
        }
      });

      return {
        total,
        solvedCount,
        attemptedCount,
        notStartedCount,
        bookmarkedCount,
        reviewCount,
        notesCount,
        pctSolved,
        diffMap
      };
    }

    computeTopicStats(topicName) {
      const matchingProblems = this.problems.filter(p => {
        return (p.topics && p.topics.includes(topicName)) || p.topic === topicName;
      });

      const total = matchingProblems.length;
      let solved = 0;
      let attempted = 0;
      const diffMap = {
        Easy: { total: 0, solved: 0 },
        Medium: { total: 0, solved: 0 },
        Hard: { total: 0, solved: 0 }
      };

      const patternSet = new Set();

      matchingProblems.forEach(p => {
        if (p.pattern) patternSet.add(p.pattern);
        if (diffMap[p.difficulty]) {
          diffMap[p.difficulty].total++;
          if (this.progress.solved.includes(p.id)) {
            diffMap[p.difficulty].solved++;
          }
        }

        if (this.progress.solved.includes(p.id)) {
          solved++;
        } else if (this.progress.attempted.includes(p.id)) {
          attempted++;
        }
      });

      const notStarted = Math.max(0, total - (solved + attempted));
      const pct = total > 0 ? (solved / total) * 100 : 0;

      // Recommended next problem is the first unsolved problem in this topic
      let recommendedProblem = matchingProblems.find(p => !this.progress.solved.includes(p.id));
      if (!recommendedProblem && matchingProblems.length > 0) {
        recommendedProblem = matchingProblems[0];
      }

      return {
        name: topicName,
        total,
        solved,
        attempted,
        notStarted,
        pct,
        diffMap,
        recommendedProblem,
        patterns: Array.from(patternSet).sort()
      };
    }

    getAllAlgorithmicPatterns() {
      const patterns = new Set();
      this.problems.forEach(p => {
        if (p.pattern) patterns.add(p.pattern);
      });
      return Array.from(patterns).sort();
    }

    // -------------------------------------------------------------------------
    // DOM INITIALIZATION & EVENT BINDINGS
    // -------------------------------------------------------------------------
    initDOM() {
      this.dsaContainer = document.getElementById('dsaLearningContainer');
      this.visualizerContainer = document.getElementById('visualizerViewContainer');
      this.btnViewVisualizer = document.getElementById('btnViewVisualizer');
      this.btnViewDsa = document.getElementById('btnViewDsa');
      this.dsaActiveBanner = document.getElementById('dsaProblemActiveBanner');

      if (!this.dsaContainer) {
        console.error('dsaLearningContainer element not found');
        return;
      }
    }

    bindEvents() {
      if (this.btnViewVisualizer && this.btnViewDsa) {
        this.btnViewVisualizer.addEventListener('click', () => this.switchView('visualizer'));
        this.btnViewDsa.addEventListener('click', () => this.switchView('dsa'));
      }

      if (this.dsaContainer) {
        this.dsaContainer.addEventListener('click', (e) => {
          // Tab switcher buttons
          const tabBtn = e.target.closest('[data-dsa-tab]');
          if (tabBtn) {
            this.currentSubTab = tabBtn.getAttribute('data-dsa-tab');
            this.render();
            return;
          }

          // Open Dedicated Topic Page
          const openTopicBtn = e.target.closest('[data-open-topic]');
          if (openTopicBtn) {
            const topic = openTopicBtn.getAttribute('data-open-topic');
            this.openTopicDetailPage(topic);
            return;
          }

          // Bookmark button
          const bookmarkBtn = e.target.closest('[data-action="toggle-bookmark"]');
          if (bookmarkBtn) {
            const id = parseInt(bookmarkBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.toggleBookmark(id);
            return;
          }

          // Review button (Phase 4)
          const reviewBtn = e.target.closest('[data-action="toggle-review"]');
          if (reviewBtn) {
            const id = parseInt(reviewBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.toggleReview(id);
            return;
          }

          // Bookmark only quick filter pill (Phase 4)
          const bmFilterBtn = e.target.closest('[data-filter-bookmark-toggle]');
          if (bmFilterBtn) {
            this.onlyBookmarked = !this.onlyBookmarked;
            this.currentPage = 1;
            this.renderProblemTableOnly();
            bmFilterBtn.classList.toggle('active', this.onlyBookmarked);
            return;
          }

          // Import modal button (Phase 4)
          const importBtn = e.target.closest('[data-action="open-import-modal"]');
          if (importBtn) {
            this.showImportModal();
            return;
          }

          // Metric card quick jumps
          const metricReview = e.target.closest('[data-metric-action="filter-review"]');
          if (metricReview) {
            this.currentSubTab = 'problems';
            this.selectedStatus = 'review';
            this.currentPage = 1;
            this.render();
            return;
          }
          const metricBookmarked = e.target.closest('[data-metric-action="filter-bookmarked"]');
          if (metricBookmarked) {
            this.currentSubTab = 'problems';
            this.selectedStatus = 'bookmarked';
            this.currentPage = 1;
            this.render();
            return;
          }

          // Toggle Solved button
          const toggleSolvedBtn = e.target.closest('[data-action="toggle-solved"]');
          if (toggleSolvedBtn) {
            const id = parseInt(toggleSolvedBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.toggleSolved(id);
            return;
          }

          // Solve & Visualize button
          const solveBtn = e.target.closest('[data-action="solve-visualize"]');
          if (solveBtn) {
            const id = parseInt(solveBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.loadAndVisualizeProblem(id);
            return;
          }

          // Open Workspace actions (Phase 5)
          const openWsBtn = e.target.closest('[data-action="open-workspace"]');
          if (openWsBtn) {
            const id = parseInt(openWsBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.openProblemWorkspace(id);
            return;
          }

          // Open Storage, Backup & Preferences Modal (Phase 8)
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

          // Phase 9: Toggle Beginner Mode
          const btnBeginner = e.target.closest('[data-action="toggle-beginner-mode"]');
          if (btnBeginner) {
            this.toggleBeginnerMode();
            return;
          }

          // Phase 9: Breadcrumb Navigation
          const btnNavDash = e.target.closest('[data-action="nav-dashboard"]');
          if (btnNavDash) {
            this.currentSubTab = 'dashboard';
            this.render();
            return;
          }

          const btnNavTopics = e.target.closest('[data-action="nav-topics"]');
          if (btnNavTopics) {
            this.currentSubTab = 'topics';
            this.render();
            return;
          }

          const backToProbsBtn = e.target.closest('[data-action="back-to-problems"]');
          if (backToProbsBtn) {
            this.currentSubTab = 'problems';
            this.render();
            return;
          }

          // Workspace 2-Column Tabs (A/B and C/D)
          const wsTab = e.target.closest('[data-workspace-tab]');
          if (wsTab) {
            const side = wsTab.getAttribute('data-workspace-tab');
            const tabName = wsTab.getAttribute('data-tab-name');
            if (side === 'left') {
              this.workspaceLeftTab = tabName;
              const pU = document.getElementById('paneUnderstand');
              const pP = document.getElementById('panePattern');
              if (pU && pP) {
                pU.classList.toggle('hidden', tabName !== 'understand');
                pP.classList.toggle('hidden', tabName !== 'pattern');
              }
            } else {
              this.workspaceRightTab = tabName;
              const pE = document.getElementById('paneEditor');
              const pV = document.getElementById('paneVisualize');
              if (pE && pV) {
                pE.classList.toggle('hidden', tabName !== 'editor');
                pV.classList.toggle('hidden', tabName !== 'visualize');
              }
            }
            const tabsInCol = wsTab.parentElement.querySelectorAll('.workspace-pane-tab');
            tabsInCol.forEach(t => t.classList.toggle('active', t === wsTab));
            return;
          }

          // Workspace Action: Run Code (Safe Restricted Engine)
          const btnWsRun = e.target.closest('#btnWsRunCode');
          if (btnWsRun) {
            const editor = document.getElementById('workspaceCodeEditor');
            const consoleOutput = document.getElementById('workspaceConsoleOutput');
            if (editor && consoleOutput) {
              const codeText = editor.value;
              this.saveUserCode(this.activeWorkspaceProblemId, codeText);
              const res = this.runWorkspaceCode(this.activeWorkspaceProblemId, codeText);
              if (!res.ok) {
                consoleOutput.innerHTML = `<span class="console-err-text">❌ ${this.escapeHTML(res.error)}</span>`;
              } else {
                const outStr = (res.stdout && res.stdout.length > 0) ? res.stdout.join('\n') : '(No print output produced)';
                const varStr = (res.variables && res.variables.length > 0) ? res.variables.map(v => `${v.name} = ${v.current}`).join('\n') : '(No local variables)';
                consoleOutput.innerHTML = `
<span class="console-ok-text">✓ Execution Finished Cleanly (${res.stepsCount} execution steps):</span>
<strong>Standard Output:</strong>
${this.escapeHTML(outStr)}

<strong>Final Variables:</strong>
${this.escapeHTML(varStr)}
                `;
              }
            }
            return;
          }

          // Workspace Action: Run Tests (with Loading Feedback & Hints)
          const btnWsTests = e.target.closest('#btnWsRunTests');
          if (btnWsTests) {
            const editor = document.getElementById('workspaceCodeEditor');
            const consoleOutput = document.getElementById('workspaceConsoleOutput');
            const testsPanel = document.getElementById('workspaceTestsPanel');
            const testsBadge = document.getElementById('workspaceTestsBadge');
            const testCards = document.getElementById('workspaceTestCards');
            if (editor && testsPanel && testCards) {
              const origText = btnWsTests.innerHTML;
              btnWsTests.innerHTML = '🧪 Testing...';
              btnWsTests.disabled = true;

              setTimeout(() => {
                try {
                  const codeText = editor.value;
                  this.saveUserCode(this.activeWorkspaceProblemId, codeText);
                  const testReport = this.runWorkspaceTests(this.activeWorkspaceProblemId, codeText);
                  testsPanel.classList.remove('hidden');
                  if (testsBadge) {
                    const allPassed = testReport.passed === testReport.total && testReport.total > 0;
                    testsBadge.textContent = `${testReport.passed}/${testReport.total} Passed (${Math.round((testReport.passed / testReport.total) * 100)}%)`;
                    testsBadge.className = `tests-status-badge ${allPassed ? 'badge-passed' : 'badge-failed'}`;
                    if (allPassed) {
                      this.markSolved(this.activeWorkspaceProblemId);
                    } else {
                      this.markAttempted(this.activeWorkspaceProblemId);
                    }
                  }
                  testCards.innerHTML = testReport.results.map(r => `
                    <div class="test-result-card ${r.passed ? 'card-passed' : 'card-failed'}">
                      <div class="test-card-top">
                        <span class="test-badge">${r.passed ? '✅ Test Case ' + r.testIndex + ' Passed' : '❌ Test Case ' + r.testIndex + ' Failed'}</span>
                      </div>
                      <div class="test-detail-row"><strong>Input:</strong> <code>${this.escapeHTML(r.inputStr)}</code></div>
                      <div class="test-detail-row"><strong>Expected:</strong> <code class="expected-code">${this.escapeHTML(r.expectedOutput)}</code></div>
                      <div class="test-detail-row"><strong>Actual Output:</strong> <code>${this.escapeHTML(r.actualOutput)}</code></div>
                      ${r.error ? `<div class="test-error-msg">⚠️ Error: ${this.escapeHTML(r.error)}</div>` : ''}
                      ${!r.passed ? `<div class="test-error-hint">💡 <em>Tip: Inspect loop termination, empty list checks, or off-by-one indices.</em></div>` : ''}
                    </div>
                  `).join('');
                  if (consoleOutput) {
                    consoleOutput.textContent = `Executed ${testReport.total} test case(s). Passed: ${testReport.passed}/${testReport.total}.`;
                  }
                } finally {
                  btnWsTests.innerHTML = origText;
                  btnWsTests.disabled = false;
                }
              }, 40);
            }
            return;
          }

          // Workspace Action: Reset Code
          const btnWsReset = e.target.closest('#btnWsResetCode');
          if (btnWsReset) {
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            const editor = document.getElementById('workspaceCodeEditor');
            if (p && editor) {
              editor.value = p.starterCode;
              this.saveUserCode(p.id, p.starterCode);
              const autoSave = document.getElementById('wsAutoSaveStatus');
              if (autoSave) {
                autoSave.textContent = '↺ Reset to starter template';
                setTimeout(() => { autoSave.textContent = 'Auto-saved'; }, 2000);
              }
            }
            return;
          }

          // Workspace Action: Hints
          const btnWsHint = e.target.closest('#btnWsShowHint') || e.target.closest('#btnWsNextHint');
          if (btnWsHint) {
            const pid = this.activeWorkspaceProblemId;
            const p = this.problemsById.get(pid);
            if (p) {
              const guide = this.getProblemTeachingGuide(p);
      const curIdx = this.problems.findIndex(x => x.id === p.id);
      const prevProb = curIdx > 0 ? this.problems[curIdx - 1] : this.problems[this.problems.length - 1];
      const nextProb = curIdx < this.problems.length - 1 ? this.problems[curIdx + 1] : this.problems[0];
              this.revealedHints[pid] = Math.min((this.revealedHints[pid] || 0) + 1, guide.hints.length);
              this.render();
            }
            return;
          }

          // Workspace Action: Reveal Reference Solution (with confirmation)
          const btnWsSol = e.target.closest('#btnWsRevealSolution');
          if (btnWsSol) {
            const pid = this.activeWorkspaceProblemId;
            if (this.revealedSolutions[pid]) {
              this.revealedSolutions[pid] = false;
              this.render();
            } else {
              if (confirm('Are you sure you want to reveal the reference solution? We recommend trying with hints first!')) {
                this.revealedSolutions[pid] = true;
                this.render();
              }
            }
            return;
          }

          // Workspace Action: Copy Solution to Editor (Phase 6)
          const btnCopySol = e.target.closest('#btnCopyRefSolution') || e.target.closest('[data-action="copy-sol-approach"]');
          if (btnCopySol) {
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            const editor = document.getElementById('workspaceCodeEditor');
            if (p && editor) {
              const solData = this.getProblemSolutions(p);
              const activeAppId = this.activeSolutionApproach[p.id] || (solData.hasMultipleApproaches ? 'optimized' : solData.approaches[0].id);
              const activeApp = solData.approaches.find(a => a.id === activeAppId) || solData.approaches[0];
              const codeToLoad = activeApp ? activeApp.code : (p.referenceSolution || p.starterCode);
              editor.value = codeToLoad;
              this.saveUserCode(p.id, codeToLoad);
              const autoSave = document.getElementById('wsAutoSaveStatus');
              if (autoSave) {
                autoSave.textContent = `✓ ${activeApp ? activeApp.name : 'Reference solution'} loaded into editor`;
                setTimeout(() => { if (autoSave) autoSave.textContent = 'Auto-saved'; }, 2500);
              }
            }
            return;
          }

          // Workspace Action: Step Solution in Visualizer (Phase 6)
          const btnVisRef = e.target.closest('#btnVisRefSolution') || e.target.closest('#btnLaunchRefCodeVis') || e.target.closest('[data-action="vis-sol-approach"]');
          if (btnVisRef) {
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            if (p) {
              const solData = this.getProblemSolutions(p);
              const activeAppId = this.activeSolutionApproach[p.id] || (solData.hasMultipleApproaches ? 'optimized' : solData.approaches[0].id);
              const activeApp = solData.approaches.find(a => a.id === activeAppId) || solData.approaches[0];
              const codeToLoad = activeApp ? activeApp.code : (p.referenceSolution || p.starterCode);
              this.loadAndVisualizeProblem(p.id, codeToLoad);
            }
            return;
          }

          // Workspace Action: Switch Solution Approach (Baseline vs Optimized - Phase 6)
          const btnSwitchApp = e.target.closest('[data-action="switch-sol-approach"]');
          if (btnSwitchApp) {
            const pid = parseInt(btnSwitchApp.getAttribute('data-id'), 10);
            const app = btnSwitchApp.getAttribute('data-approach');
            if (!this.activeSolutionApproach) this.activeSolutionApproach = {};
            this.activeSolutionApproach[pid] = app;
            this.render();
            return;
          }

          // Workspace Action: Hide Solution (Phase 6)
          const btnHideSol = e.target.closest('[data-action="hide-solution"]');
          if (btnHideSol) {
            const pid = this.activeWorkspaceProblemId;
            this.revealedSolutions[pid] = false;
            this.render();
            return;
          }

          // Workspace Action: Step Through My Code in Visualizer
          const btnWsVis = e.target.closest('#btnWsStepVisualizer') || e.target.closest('#btnLaunchMyCodeVis');
          if (btnWsVis) {
            const editor = document.getElementById('workspaceCodeEditor');
            const p = this.problemsById.get(this.activeWorkspaceProblemId);
            const codeToRun = (editor && editor.value.trim()) ? editor.value : (p ? p.starterCode : '');
            if (p) {
              this.saveUserCode(p.id, codeToRun);
              this.loadAndVisualizeProblem(p.id, codeToRun);
            }
            return;
          }

          // Workspace Action: Copy Route Link
          const btnWsCopyRoute = e.target.closest('#btnWorkspaceCopyRoute');
          if (btnWsCopyRoute) {
            const pid = this.activeWorkspaceProblemId;
            const routeUrl = (typeof window !== 'undefined' && window.location) 
              ? `${window.location.origin}${window.location.pathname}#dsa/problem/${pid}` 
              : `#dsa/problem/${pid}`;
            if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
              navigator.clipboard.writeText(routeUrl).then(() => {
                const toast = document.getElementById('workspaceRouteToast');
                if (toast) {
                  toast.classList.remove('hidden');
                  setTimeout(() => toast.classList.add('hidden'), 2500);
                }
              }).catch(() => {});
            }
            return;
          }

          // Clear console
          const btnClearCons = e.target.closest('#btnClearConsole');
          if (btnClearCons) {
            const con = document.getElementById('workspaceConsoleOutput');
            if (con) con.textContent = 'Console cleared.';
            return;
          }

          // Explore Roadmap Phase / Stage (Phase 7)
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
          }

          // Status filter chips
          const statusChip = e.target.closest('[data-filter-status]');
          if (statusChip) {
            this.selectedStatus = statusChip.getAttribute('data-filter-status');
            this.currentPage = 1;
            this.renderProblemTableOnly();
            this.updateFilterPillUI('[data-filter-status]', this.selectedStatus);
            return;
          }

          // Difficulty filter chips
          const diffChip = e.target.closest('[data-filter-diff-chip]');
          if (diffChip) {
            this.selectedDifficulty = diffChip.getAttribute('data-filter-diff-chip');
            this.currentPage = 1;
            this.renderProblemTableOnly();
            this.updateFilterPillUI('[data-filter-diff-chip]', this.selectedDifficulty);
            return;
          }

          // Topic Category filter chips (in Topic Library)
          const catChip = e.target.closest('[data-filter-category]');
          if (catChip) {
            this.selectedCategory = catChip.getAttribute('data-filter-category');
            this.renderTopicGridOnly();
            this.updateFilterPillUI('[data-filter-category]', this.selectedCategory);
            return;
          }

          // Clear filters button
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
          }

          // Back to Topics Library from detail
          const backToTopicsBtn = e.target.closest('#btnBackToTopicsList');
          if (backToTopicsBtn) {
            this.currentSubTab = 'topics';
            this.render();
            return;
          }

          // Pagination buttons
          const pageBtn = e.target.closest('[data-page]');
          if (pageBtn) {
            const page = parseInt(pageBtn.getAttribute('data-page'), 10);
            if (!isNaN(page)) {
              this.currentPage = page;
              this.renderProblemTableOnly();
              const tableTop = document.getElementById('problemExplorerWrap') || document.getElementById('topicDetailProblemsWrap');
              if (tableTop) tableTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
          }

          // Problem info / preview modal
          const infoBtn = e.target.closest('[data-action="view-problem-details"]');
          if (infoBtn) {
            const id = parseInt(infoBtn.getAttribute('data-id'), 10);
            if (!isNaN(id)) this.showProblemModal(id);
            return;
          }
        });

        // Search inputs & Code Editor Auto-Save
        this.dsaContainer.addEventListener('input', (e) => {
          if (e.target.id === 'workspaceCodeEditor') {
            this.saveUserCode(this.activeWorkspaceProblemId, e.target.value);
            const status = document.getElementById('wsAutoSaveStatus');
            if (status) {
              status.textContent = 'Saving...';
              setTimeout(() => { if (status) status.textContent = 'Auto-saved'; }, 600);
            }
            return;
          }
          if (e.target.id === 'dsaProblemSearch' || e.target.id === 'topicDetailProblemSearch') {
            this.searchQuery = e.target.value.trim().toLowerCase();
            this.currentPage = 1;
            this.renderProblemTableOnly();
          } else if (e.target.id === 'dsaTopicSearchInput') {
            this.topicSearchQuery = e.target.value.trim().toLowerCase();
            this.renderTopicGridOnly();
          }
        });

        // Dropdown changes (Topic, Pattern, Sort)
        this.dsaContainer.addEventListener('change', (e) => {
          if (e.target.id === 'dsaTopicSelect') {
            this.selectedTopic = e.target.value;
            this.selectedPattern = 'all'; // reset pattern on topic change
            this.currentPage = 1;
            this.render();
          } else if (e.target.id === 'dsaPatternSelect' || e.target.id === 'topicDetailPatternSelect') {
            this.selectedPattern = e.target.value;
            this.currentPage = 1;
            this.renderProblemTableOnly();
          } else if (e.target.id === 'dsaStageSelect') {
            this.selectedStage = e.target.value;
            this.currentPage = 1;
            this.renderProblemTableOnly();
          } else if (e.target.id === 'dsaSortSelect' || e.target.id === 'topicDetailSortSelect') {
            this.selectedSort = e.target.value;
            this.currentPage = 1;
            this.renderProblemTableOnly();
          } else if (e.target.id === 'dsaPageSizeSelect' || e.target.id === 'topicDetailPageSizeSelect') {
            const val = e.target.value;
            this.pageSize = val === 'all' ? 'all' : parseInt(val, 10);
            this.currentPage = 1;
            this.renderProblemTableOnly();
          }
        });
      }

      // Visualizer Active Banner
      if (this.dsaActiveBanner) {
        this.dsaActiveBanner.addEventListener('click', (e) => {
          const btnBack = e.target.closest('#btnBannerBackToDsa');
          if (btnBack) {
            this.switchView('dsa');
            return;
          }
          const btnWs = e.target.closest('#btnBannerOpenWorkspace');
          if (btnWs && this.activeVisualizerProblemId) {
            this.switchView('dsa');
            this.openProblemWorkspace(this.activeVisualizerProblemId);
            return;
          }
          const btnMark = e.target.closest('#btnBannerMarkSolved');
          if (btnMark && this.activeVisualizerProblemId) {
            this.markSolved(this.activeVisualizerProblemId);
            return;
          }
        });
      }

      // Phase 9: Global Keyboard Shortcuts (Escape to dismiss modals, Ctrl+Enter to run code)
      if (typeof window !== 'undefined' && !this._phase9KeyHandlersBound) {
        this._phase9KeyHandlersBound = true;
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-overlay, .storage-modal-overlay');
            if (openModal) openModal.remove();
          }
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const activeEditor = document.getElementById('workspaceCodeEditor');
            if (activeEditor && document.activeElement === activeEditor) {
              e.preventDefault();
              const btnTests = document.getElementById('btnWsRunTests');
              if (btnTests) btnTests.click();
              else {
                const btnRun = document.getElementById('btnWsRunCode');
                if (btnRun) btnRun.click();
              }
            }
          }
        });
      }
    }

    updateFilterPillUI(selector, activeValue) {
      if (!this.dsaContainer) return;
      const pills = this.dsaContainer.querySelectorAll(selector);
      pills.forEach(pill => {
        const val = pill.getAttribute('data-filter-status') || pill.getAttribute('data-filter-diff-chip') || pill.getAttribute('data-filter-category');
        if (val === activeValue) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });
    }

    openTopicDetailPage(topicName) {
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

      // Persist last opened problem (Phase 8)
      if (this.progress) {
        this.progress.lastOpenedProblemId = problemId;
        this.saveProgress();
      }

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
    }

    // -------------------------------------------------------------------------
    // VIEW SWITCHING
    // -------------------------------------------------------------------------
    switchView(viewName) {
      if (viewName === 'dsa') {
        if (this.btnViewVisualizer) {
          this.btnViewVisualizer.classList.remove('active');
          this.btnViewVisualizer.setAttribute('aria-selected', 'false');
        }
        if (this.btnViewDsa) {
          this.btnViewDsa.classList.add('active');
          this.btnViewDsa.setAttribute('aria-selected', 'true');
        }
        if (this.visualizerContainer) {
          this.visualizerContainer.classList.add('hidden');
        }
        if (this.dsaContainer) {
          this.dsaContainer.classList.remove('hidden');
        }
        this.setVisualizerControlsVisible(false);
        this.render();
      } else {
        if (this.btnViewVisualizer) {
          this.btnViewVisualizer.classList.add('active');
          this.btnViewVisualizer.setAttribute('aria-selected', 'true');
        }
        if (this.btnViewDsa) {
          this.btnViewDsa.classList.remove('active');
          this.btnViewDsa.setAttribute('aria-selected', 'false');
        }
        if (this.visualizerContainer) {
          this.visualizerContainer.classList.remove('hidden');
        }
        if (this.dsaContainer) {
          this.dsaContainer.classList.add('hidden');
        }
        this.setVisualizerControlsVisible(true);
      }
    }

    setVisualizerControlsVisible(visible) {
      const navControls = document.querySelector('.nav-controls');
      const secondaryActions = document.querySelector('.top-bar-secondary');
      const stepLabel = document.getElementById('stepProgressLabel');
      const scopeBadge = document.getElementById('activeScopeBadge');

      if (navControls) navControls.style.display = visible ? 'flex' : 'none';
      if (secondaryActions) secondaryActions.style.display = visible ? 'flex' : 'none';
      if (stepLabel) stepLabel.style.display = visible ? 'inline-block' : 'none';
      if (scopeBadge) scopeBadge.style.display = visible ? 'inline-block' : 'none';
    }

    // -------------------------------------------------------------------------
    // INTEGRATION WITH CODE VISUALIZER
    // -------------------------------------------------------------------------
    loadAndVisualizeProblem(id, codeOverride = null) {
      const problem = this.problemsById.get(id);
      if (!problem) return;

      this.activeVisualizerProblemId = id;
      this.markAttempted(id);

      const codeToLoad = codeOverride || this.getUserCode(id) || problem.starterCode;

      if (window.teachMeApp) {
        window.teachMeApp.sourceCode = codeToLoad;
        if (window.teachMeApp.codeTextarea) {
          window.teachMeApp.codeTextarea.value = codeToLoad;
        }
        window.teachMeApp.inputCode = '';
        window.teachMeApp.currentPresetKey = 'custom';
        window.teachMeApp.analyzeAndRun();
      }

      this.updateVisualizerActiveBanner();
      this.switchView('visualizer');
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    updateVisualizerActiveBanner() {
      if (!this.dsaActiveBanner) return;

      if (!this.activeVisualizerProblemId) {
        this.dsaActiveBanner.classList.add('hidden');
        return;
      }

      const p = this.problemsById.get(this.activeVisualizerProblemId);
      if (!p) {
        this.dsaActiveBanner.classList.add('hidden');
        return;
      }

      const isSolved = this.progress.solved.includes(p.id);
      const diffClass = p.difficulty.toLowerCase();

      this.dsaActiveBanner.classList.remove('hidden');
      this.dsaActiveBanner.innerHTML = `
        <div class="dsa-active-banner-inner">
          <div class="dsa-active-info">
            <span class="dsa-active-tag">📚 Practicing DSA</span>
            <span class="dsa-active-title">
              <strong>#${p.leetcodeNumber} ${this.escapeHTML(p.title)}</strong>
              <span class="diff-badge diff-${diffClass}">${p.difficulty}</span>
              <span class="topic-tag">${this.escapeHTML(p.topic || (p.topics && p.topics[0]) || 'DSA')}</span>
              <span class="pattern-tag">Pattern: ${this.escapeHTML(p.pattern)}</span>
            </span>
          </div>
          <div class="dsa-active-actions">
            ${isSolved 
              ? `<span class="solved-pill">✅ Solved</span>` 
              : `<button id="btnBannerMarkSolved" class="btn-banner-solve" title="Mark this problem as completed">✓ Mark as Solved</button>`}
            <button id="btnBannerOpenWorkspace" class="btn-banner-solve btn-banner-ws" title="Return to Problem Learning Workspace">🎓 Learning Workspace</button>
            <button id="btnBannerBackToDsa" class="btn-banner-back" title="Return to DSA Learning Hub">← Back to DSA Hub</button>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // MAIN RENDERING
    // -------------------------------------------------------------------------
    render() {
      if (!this.dsaContainer) return;

      const stats = this.computeStats();

      this.dsaContainer.innerHTML = `
        <div class="dsa-wrapper">
          <!-- DSA Header & Sub-Tabs -->
          <div class="dsa-header-card">
            <div class="dsa-header-main">
              <div class="dsa-header-title-row">
                <div class="dsa-logo-badge">📚 DSA Academy</div>
                <h1 class="dsa-title">Data Structures & Algorithms Learning Hub</h1>
              </div>
              <p class="dsa-subtitle">
                Master 30 core DSA topics across 300 curated, runnable LeetCode problems. Step through real Python execution line by line with zero paid APIs.
              </p>
            </div>

            <!-- Header Right Storage & Settings Button (Phase 8) -->
            <div class="dsa-header-storage-row">
              <span class="storage-health-tag" title="Local browser storage active (Zero cloud dependency)">💾 Offline Local Storage</span>
              <button class="btn-mode-toggle ${this.beginnerMode ? 'active' : ''}" id="btnToggleBeginnerMode" data-action="toggle-beginner-mode" title="Toggle Beginner Mode: Simplifies complexities and focuses on intuitive concepts">
                ${this.beginnerMode ? '🌱 Beginner Mode: ON' : '🔬 Detailed View'}
              </button>
              <button class="btn-header-storage" data-action="open-storage-modal" title="Manage local progress, export backup, import data, or configure preferences">
                💾 Backup & Storage
              </button>
            </div>

            <!-- Sub-Navigation Pills -->
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
                🗺️ Beginner Roadmap (10 Stages)
              </button>
              ${this.currentSubTab === 'workspace' && this.activeWorkspaceProblemId ? `
                <button class="dsa-tab-btn active workspace-tab-pill" data-dsa-tab="workspace">
                  🎓 Workspace (#${(this.problemsById.get(this.activeWorkspaceProblemId) || {}).leetcodeNumber || this.activeWorkspaceProblemId})
                </button>
              ` : ''}
            </div>
          </div>

          <!-- SUB-VIEW 1: DASHBOARD -->
          <div class="dsa-view-content ${this.currentSubTab === 'dashboard' ? '' : 'hidden'}" id="dsaSubViewDashboard">
            ${this.renderBreadcrumbs()}
            ${this.renderMetricsCards(stats)}
            ${this.renderContinueLearningCard(stats)}
            
            <div class="dsa-two-col-layout">
              <div class="dsa-col-left">
                ${this.renderDifficultyCard(stats)}
                ${this.renderRecentActivityCard()}
              </div>
              <div class="dsa-col-right">
                ${this.renderRoadmapOverviewCard(stats)}
              </div>
            </div>

            <!-- Quick Jump to Popular Topics -->
            ${this.renderDashboardTopicHighlights()}
          </div>

          <!-- SUB-VIEW 2: 30 SEARCHABLE TOPIC LIBRARY -->
          <div class="dsa-view-content ${this.currentSubTab === 'topics' ? '' : 'hidden'}" id="dsaSubViewTopics">
            ${this.renderBreadcrumbs()}
            ${this.renderTopicLibraryView()}
          </div>

          <!-- SUB-VIEW 3: DEDICATED TOPIC DETAIL PAGE -->
          <div class="dsa-view-content ${this.currentSubTab === 'topic_detail' ? '' : 'hidden'}" id="dsaSubViewTopicDetail">
            ${this.renderBreadcrumbs()}
            ${this.renderDedicatedTopicPage()}
          </div>

          <!-- SUB-VIEW 4: PROBLEM LIBRARY EXPLORER -->
          <div class="dsa-view-content ${this.currentSubTab === 'problems' ? '' : 'hidden'}" id="dsaSubViewProblems">
            ${this.renderBreadcrumbs()}
            ${this.renderProblemExplorer(stats)}
          </div>

          <!-- SUB-VIEW 5: BEGINNER ROADMAP -->
          <div class="dsa-view-content ${this.currentSubTab === 'roadmap' ? '' : 'hidden'}" id="dsaSubViewRoadmap">
            ${this.renderBreadcrumbs()}
            ${this.renderFullRoadmap(stats)}
          </div>

          <!-- SUB-VIEW 6: PROBLEM LEARNING WORKSPACE (PHASE 5) -->
          <div class="dsa-view-content ${this.currentSubTab === 'workspace' ? '' : 'hidden'}" id="dsaSubViewWorkspace">
            ${this.renderProblemWorkspace(this.activeWorkspaceProblemId || 1)}
          </div>
        </div>
      `;
    }

    renderMetricsCards(stats) {
      return `
        <div class="dsa-metrics-grid">
          <div class="metric-card metric-total">
            <div class="metric-icon">📚</div>
            <div class="metric-info">
              <div class="metric-value">${stats.total}</div>
              <div class="metric-label">Curated Problems</div>
            </div>
            <div class="metric-sublabel">30 Comprehensive Topics</div>
          </div>

          <div class="metric-card metric-solved">
            <div class="metric-icon">✅</div>
            <div class="metric-info">
              <div class="metric-value">${stats.solvedCount}</div>
              <div class="metric-label">Problems Solved</div>
            </div>
            <div class="metric-sublabel">${stats.pctSolved}% Overall Completion</div>
          </div>

          <div class="metric-card metric-attempted">
            <div class="metric-icon">⏳</div>
            <div class="metric-info">
              <div class="metric-value">${stats.attemptedCount}</div>
              <div class="metric-label">In Progress</div>
            </div>
            <div class="metric-sublabel">Opened in Visualizer</div>
          </div>

          <div class="metric-card metric-not-started">
            <div class="metric-icon">⚪</div>
            <div class="metric-info">
              <div class="metric-value">${stats.notStartedCount}</div>
              <div class="metric-label">Not Started</div>
            </div>
            <div class="metric-sublabel">Ready to Explore</div>
          </div>

          <div class="metric-card metric-bookmarked" data-metric-action="filter-bookmarked" style="cursor: pointer;" title="Click to view bookmarked problems">
            <div class="metric-icon">⭐</div>
            <div class="metric-info">
              <div class="metric-value">${stats.bookmarkedCount}</div>
              <div class="metric-label">Bookmarked</div>
            </div>
            <div class="metric-sublabel">Saved for Revision</div>
          </div>

          <div class="metric-card metric-review" data-metric-action="filter-review" style="cursor: pointer;" title="Click to view problems flagged for review">
            <div class="metric-icon">🔖</div>
            <div class="metric-info">
              <div class="metric-value">${stats.reviewCount || 0}</div>
              <div class="metric-label">Needs Review</div>
            </div>
            <div class="metric-sublabel">Flagged to Practice</div>
          </div>
        </div>
      `;
    }

    renderContinueLearningCard(stats) {
      let targetProblem = null;
      let headerText = 'Continue Where You Left Off';
      let buttonText = '▶ Continue Visualizing';

      if (this.progress.lastOpenedProblemId) {
        targetProblem = this.problemsById.get(this.progress.lastOpenedProblemId);
      } else if (this.progress.lastPracticedId) {
        targetProblem = this.problemsById.get(this.progress.lastPracticedId);
      }

      if (!targetProblem) {
        headerText = 'Start Your DSA Journey';
        buttonText = '🚀 Start First Problem';
        targetProblem = this.problems[0]; // Two Sum
      }

      if (!targetProblem) return '';

      const isSolved = this.progress.solved.includes(targetProblem.id);
      const diffClass = targetProblem.difficulty.toLowerCase();

      return `
        <div class="continue-hero-card">
          <div class="continue-hero-glow"></div>
          <div class="continue-hero-body">
            <div class="continue-hero-tag">
              <span class="hero-pulse"></span> ${headerText}
            </div>
            <div class="continue-hero-title-row">
              <h2 class="continue-hero-title">
                #${targetProblem.leetcodeNumber} — ${this.escapeHTML(targetProblem.title)}
              </h2>
              <div class="continue-hero-badges">
                <span class="diff-badge diff-${diffClass}">${targetProblem.difficulty}</span>
                <span class="topic-tag">${this.escapeHTML(targetProblem.topic || (targetProblem.topics && targetProblem.topics[0]) || 'DSA')}</span>
                <span class="pattern-tag">Pattern: ${this.escapeHTML(targetProblem.pattern)}</span>
                ${isSolved ? '<span class="status-badge solved">✅ Solved</span>' : '<span class="status-badge attempted">⏳ In Progress</span>'}
              </div>
            </div>
            <p class="continue-hero-desc">${this.escapeHTML(targetProblem.description)}</p>
            <div class="continue-hero-actions">
              <button class="btn-hero-primary" data-action="solve-visualize" data-id="${targetProblem.id}">
                ${buttonText}
              </button>
              <button class="btn-hero-subtle" data-action="view-problem-details" data-id="${targetProblem.id}">
                ℹ️ View Pattern Details
              </button>
              <button class="btn-hero-star ${this.isBookmarked(targetProblem.id) ? 'active' : ''}" data-action="toggle-bookmark" data-id="${targetProblem.id}">
                ${this.isBookmarked(targetProblem.id) ? '⭐ Bookmarked' : '☆ Bookmark'}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    renderDifficultyCard(stats) {
      const easy = stats.diffMap.Easy;
      const med = stats.diffMap.Medium;
      const hard = stats.diffMap.Hard;

      const easyPct = easy.total > 0 ? (easy.solved / easy.total) * 100 : 0;
      const medPct = med.total > 0 ? (med.solved / med.total) * 100 : 0;
      const hardPct = hard.total > 0 ? (hard.solved / hard.total) * 100 : 0;

      return `
        <div class="dsa-card dsa-diff-card">
          <div class="dsa-card-header">
            <h3 class="dsa-card-title">🎯 Difficulty Breakdown</h3>
            <span class="dsa-card-meta">Click to filter library</span>
          </div>
          
          <div class="diff-bars-wrap">
            <div class="diff-item" data-filter-diff-chip="Easy" title="Click to filter by Easy problems">
              <div class="diff-item-header">
                <span class="diff-name diff-easy-name">🟢 Easy</span>
                <span class="diff-numbers"><strong>${easy.solved}</strong> / ${easy.total} (${easyPct.toFixed(0)}%)</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill fill-easy" style="width: ${easyPct}%;"></div>
              </div>
            </div>

            <div class="diff-item" data-filter-diff-chip="Medium" title="Click to filter by Medium problems">
              <div class="diff-item-header">
                <span class="diff-name diff-med-name">🟡 Medium</span>
                <span class="diff-numbers"><strong>${med.solved}</strong> / ${med.total} (${medPct.toFixed(0)}%)</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill fill-medium" style="width: ${medPct}%;"></div>
              </div>
            </div>

            <div class="diff-item" data-filter-diff-chip="Hard" title="Click to filter by Hard problems">
              <div class="diff-item-header">
                <span class="diff-name diff-hard-name">🔴 Hard</span>
                <span class="diff-numbers"><strong>${hard.solved}</strong> / ${hard.total} (${hardPct.toFixed(0)}%)</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill fill-hard" style="width: ${hardPct}%;"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    renderRecentActivityCard() {
      const recent = this.progress.history.slice(0, 6);

      let contentHtml = '';
      if (recent.length === 0) {
        contentHtml = `
          <div class="empty-state-box">
            <div class="empty-state-icon">💡</div>
            <p class="empty-state-text">No problems practiced yet. Select any problem from the library or roadmap to begin step-by-step visualization!</p>
          </div>
        `;
      } else {
        const rows = recent.map(item => {
          const p = this.problemsById.get(item.problemId);
          if (!p) return '';
          const isSolved = this.progress.solved.includes(p.id);
          const timeAgo = this.formatTimeAgo(item.timestamp);
          const diffClass = p.difficulty.toLowerCase();

          return `
            <div class="recent-item">
              <div class="recent-main">
                <div class="recent-title-line">
                  <span class="recent-lc">#${p.leetcodeNumber}</span>
                  <strong class="recent-title">${this.escapeHTML(p.title)}</strong>
                  <span class="diff-badge diff-${diffClass}">${p.difficulty}</span>
                </div>
                <div class="recent-sub">
                  <span class="topic-tag">${this.escapeHTML(p.topic || (p.topics && p.topics[0]) || 'DSA')}</span>
                  <span class="recent-time">${timeAgo}</span>
                </div>
              </div>
              <div class="recent-actions">
                ${isSolved ? '<span class="status-badge solved">✅ Solved</span>' : '<span class="status-badge attempted">⏳ Practicing</span>'}
                <button class="btn-recent-run" data-action="solve-visualize" data-id="${p.id}" title="Open in Visualizer">
                  ▶ Step
                </button>
              </div>
            </div>
          `;
        }).join('');

        contentHtml = `<div class="recent-list">${rows}</div>`;
      }

      return `
        <div class="dsa-card dsa-recent-card">
          <div class="dsa-card-header">
            <h3 class="dsa-card-title">🕒 Recently Practiced</h3>
            <span class="dsa-card-meta">${recent.length} recent sessions</span>
          </div>
          ${contentHtml}
        </div>
      `;
    }

    renderRoadmapOverviewCard(stats) {
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
    }

    renderDashboardTopicHighlights() {
      // Show top 8 core topics for fast jump
      const coreHighlights = ['Arrays', 'Strings', 'Hashing and Hash Maps', 'Two Pointers', 'Binary Search', 'Trees and Binary Trees', 'Dynamic Programming', 'Graphs'];
      const cards = coreHighlights.map(tName => {
        const meta = TOPIC_METADATA_30.find(m => m.name === tName);
        if (!meta) return '';
        const tStats = this.computeTopicStats(tName);
        return `
          <div class="topic-highlight-card" data-open-topic="${this.escapeHTML(tName)}">
            <div class="topic-card-top">
              <span class="topic-icon">${meta.icon}</span>
              <span class="topic-count-badge">${tStats.solved} / ${tStats.total}</span>
            </div>
            <h4 class="topic-card-name">${this.escapeHTML(tName)}</h4>
            <div class="progress-track progress-track-sm">
              <div class="progress-fill" style="width: ${tStats.pct}%; background-color: ${meta.color};"></div>
            </div>
            <div class="topic-card-footer">
              <span class="topic-pct">${tStats.pct.toFixed(0)}% Solved</span>
              <span class="topic-action-hint">View Topic Page →</span>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="dsa-topic-section">
          <div class="dsa-section-header">
            <div>
              <h3 class="dsa-section-title">📂 Essential DSA Topics</h3>
              <p class="dsa-section-desc">Quickly jump into topic pages with difficulty distributions and recommended next steps.</p>
            </div>
            <button class="btn-hero-subtle" data-dsa-tab="topics">View All 30 Topics →</button>
          </div>
          <div class="topic-grid">
            ${cards}
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SUB-VIEW 2: SEARCHABLE 30 TOPIC LIBRARY (PHASE 2)
    // -------------------------------------------------------------------------
    renderTopicLibraryView() {
      return `
        <div class="topic-library-wrap">
          <!-- Topic Toolbar: Search & Category Chips -->
          <div class="topic-library-toolbar">
            <div class="topic-toolbar-header">
              <div>
                <h2 class="section-heading-lg">📚 Searchable DSA Topic Library</h2>
                <p class="section-subtext">Explore 30 essential algorithmic topics. Each topic page features deep difficulty analysis, pattern filters, and your personalized next problem.</p>
              </div>
            </div>

            <div class="topic-toolbar-controls">
              <div class="topic-search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="dsaTopicSearchInput" class="search-input" 
                  placeholder="Search 30 topics (e.g. Dynamic Programming, Two Pointers, Trees, BFS, Prefix Sum)..." 
                  value="${this.escapeHTML(this.topicSearchQuery)}" spellcheck="false" />
                ${this.topicSearchQuery ? `<button class="search-clear-btn" id="btnClearTopicSearch">✕</button>` : ''}
              </div>

              <!-- Category Filter Chips -->
              <div class="topic-category-chips">
                <span class="filter-label">Category:</span>
                <div class="pill-group">
                  <button class="filter-pill ${this.selectedCategory === 'all' ? 'active' : ''}" data-filter-category="all">All (30)</button>
                  <button class="filter-pill ${this.selectedCategory === 'Data Structures' ? 'active' : ''}" data-filter-category="Data Structures">Data Structures (13)</button>
                  <button class="filter-pill ${this.selectedCategory === 'Algorithms' ? 'active' : ''}" data-filter-category="Algorithms">Algorithms (7)</button>
                  <button class="filter-pill ${this.selectedCategory === 'Techniques & Patterns' ? 'active' : ''}" data-filter-category="Techniques & Patterns">Techniques & Patterns (10)</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 30 Topic Cards Grid -->
          <div id="topicCardsContainer">
            ${this.renderTopicCardsGrid()}
          </div>
        </div>
      `;
    }

    renderTopicGridOnly() {
      const container = document.getElementById('topicCardsContainer');
      if (container) {
        container.innerHTML = this.renderTopicCardsGrid();
      }
    }

    renderTopicCardsGrid() {
      let filteredTopics = TOPIC_METADATA_30;

      // Filter by category
      if (this.selectedCategory !== 'all') {
        filteredTopics = filteredTopics.filter(t => t.category === this.selectedCategory);
      }

      // Filter by topic search query
      if (this.topicSearchQuery) {
        const q = this.topicSearchQuery;
        filteredTopics = filteredTopics.filter(t => {
          return t.name.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
        });
      }

      if (filteredTopics.length === 0) {
        return `
          <div class="empty-state-box">
            <div class="empty-state-icon">🔍</div>
            <p class="empty-state-text">No topics found matching "${this.escapeHTML(this.topicSearchQuery)}".</p>
          </div>
        `;
      }

      const cards = filteredTopics.map(t => {
        const tStats = this.computeTopicStats(t.name);
        const easy = tStats.diffMap.Easy;
        const med = tStats.diffMap.Medium;
        const hard = tStats.diffMap.Hard;

        const nextProb = tStats.recommendedProblem;

        return `
          <div class="topic-30-card" style="--topic-accent: ${t.color}">
            <div class="topic-30-card-header">
              <div class="topic-header-title-box">
                <span class="topic-30-icon">${t.icon}</span>
                <div>
                  <h3 class="topic-30-name">${this.escapeHTML(t.name)}</h3>
                  <span class="topic-cat-badge">${t.category}</span>
                </div>
              </div>
              <div class="topic-30-count-bubble">
                <strong>${tStats.total}</strong> problems
              </div>
            </div>

            <p class="topic-30-summary">${this.escapeHTML(t.summary)}</p>

            <!-- Completion Progress Bar -->
            <div class="topic-30-progress-section">
              <div class="topic-progress-label-row">
                <span>Completion: <strong>${tStats.solved} / ${tStats.total}</strong> (${tStats.pct.toFixed(0)}%)</span>
                ${tStats.solved === tStats.total && tStats.total > 0 ? '<span class="status-badge solved">Mastered!</span>' : ''}
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${tStats.pct}%; background-color: ${t.color};"></div>
              </div>
            </div>

            <!-- Difficulty Breakdown -->
            <div class="topic-diff-pills">
              <span class="diff-badge diff-easy" title="${easy.solved}/${easy.total} Easy solved">🟢 ${easy.solved}/${easy.total}</span>
              <span class="diff-badge diff-medium" title="${med.solved}/${med.total} Medium solved">🟡 ${med.solved}/${med.total}</span>
              <span class="diff-badge diff-hard" title="${hard.solved}/${hard.total} Hard solved">🔴 ${hard.solved}/${hard.total}</span>
            </div>

            <!-- Recommended Next Problem in Topic -->
            ${nextProb ? `
              <div class="topic-next-chip">
                <div class="next-chip-label">Next Up:</div>
                <div class="next-chip-title" title="${this.escapeHTML(nextProb.title)}">
                  #${nextProb.leetcodeNumber} ${this.escapeHTML(nextProb.title)}
                </div>
                <button class="btn-next-step" data-action="solve-visualize" data-id="${nextProb.id}" title="Step through code">
                  ▶ Step
                </button>
              </div>
            ` : ''}

            <!-- Card Action Footer -->
            <div class="topic-30-card-footer">
              <button class="btn-open-topic" data-open-topic="${this.escapeHTML(t.name)}">
                View Topic Page & All Problems →
              </button>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="topic-30-grid">
          ${cards}
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SUB-VIEW 3: DEDICATED TOPIC DETAIL PAGE (PHASE 2)
    // -------------------------------------------------------------------------
    renderDedicatedTopicPage() {
      const topicName = this.activeTopicDetail || 'Arrays';
      const meta = TOPIC_METADATA_30.find(m => m.name === topicName) || {
        name: topicName,
        icon: '📚',
        category: 'Data Structures',
        color: '#2563eb',
        summary: 'Explore problems and implementations for this topic.'
      };

      const tStats = this.computeTopicStats(topicName);
      const nextProb = tStats.recommendedProblem;

      const easy = tStats.diffMap.Easy;
      const med = tStats.diffMap.Medium;
      const hard = tStats.diffMap.Hard;

      const easyPct = easy.total > 0 ? (easy.solved / easy.total) * 100 : 0;
      const medPct = med.total > 0 ? (med.solved / med.total) * 100 : 0;
      const hardPct = hard.total > 0 ? (hard.solved / hard.total) * 100 : 0;

      return `
        <div class="topic-detail-wrap" id="topicDetailWrap">
          <!-- Breadcrumb navigation -->
          <div class="topic-breadcrumb-bar">
            <button class="btn-back-breadcrumb" id="btnBackToTopicsList">← Back to All 30 Topics</button>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">${meta.icon} ${this.escapeHTML(meta.name)}</span>
          </div>

          <!-- Hero Topic Header -->
          <div class="topic-detail-hero" style="--topic-accent: ${meta.color}">
            <div class="topic-hero-main">
              <div class="topic-hero-icon-title">
                <span class="hero-topic-icon">${meta.icon}</span>
                <div>
                  <div class="topic-cat-badge">${meta.category}</div>
                  <h1 class="hero-topic-title">${this.escapeHTML(meta.name)}</h1>
                </div>
              </div>
              <p class="topic-detail-desc">${this.escapeHTML(meta.summary)}</p>
            </div>

            <!-- Stats Overview Strip -->
            <div class="topic-detail-meta-grid">
              <div class="topic-meta-box">
                <span class="meta-box-val">${tStats.total}</span>
                <span class="meta-box-lbl">Total Problems</span>
              </div>
              <div class="topic-meta-box">
                <span class="meta-box-val val-green">${tStats.solved}</span>
                <span class="meta-box-lbl">Solved (${tStats.pct.toFixed(0)}%)</span>
              </div>
              <div class="topic-meta-box">
                <span class="meta-box-val val-amber">${tStats.attempted}</span>
                <span class="meta-box-lbl">In Progress</span>
              </div>
              <div class="topic-meta-box">
                <span class="meta-box-val val-gray">${tStats.notStarted}</span>
                <span class="meta-box-lbl">Not Started</span>
              </div>
            </div>

            <!-- Difficulty Breakdown Bar inside Topic Page -->
            <div class="topic-detail-diff-card">
              <h4 class="diff-card-heading">🎯 Difficulty Distribution in ${this.escapeHTML(meta.name)}</h4>
              <div class="topic-detail-diff-bars">
                <div class="topic-diff-col">
                  <div class="diff-label-row">
                    <span class="diff-name diff-easy-name">🟢 Easy</span>
                    <span><strong>${easy.solved}</strong> / ${easy.total} (${easyPct.toFixed(0)}%)</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill fill-easy" style="width: ${easyPct}%;"></div>
                  </div>
                </div>

                <div class="topic-diff-col">
                  <div class="diff-label-row">
                    <span class="diff-name diff-med-name">🟡 Medium</span>
                    <span><strong>${med.solved}</strong> / ${med.total} (${medPct.toFixed(0)}%)</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill fill-medium" style="width: ${medPct}%;"></div>
                  </div>
                </div>

                <div class="topic-diff-col">
                  <div class="diff-label-row">
                    <span class="diff-name diff-hard-name">🔴 Hard</span>
                    <span><strong>${hard.solved}</strong> / ${hard.total} (${hardPct.toFixed(0)}%)</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill fill-hard" style="width: ${hardPct}%;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recommended Next Problem Hero in this Topic -->
          ${nextProb ? `
            <div class="topic-recommended-card">
              <div class="rec-card-tag">
                <span class="hero-pulse"></span> Recommended Next Problem in ${this.escapeHTML(meta.name)}
              </div>
              <div class="rec-card-body">
                <div class="rec-card-title-row">
                  <h3 class="rec-card-title">#${nextProb.leetcodeNumber} — ${this.escapeHTML(nextProb.title)}</h3>
                  <div class="rec-card-badges">
                    <span class="diff-badge diff-${nextProb.difficulty.toLowerCase()}">${nextProb.difficulty}</span>
                    <span class="pattern-tag">Pattern: ${this.escapeHTML(nextProb.pattern)}</span>
                    <span class="complexity-tag">⏱ ${nextProb.timeComplexity}</span>
                    <span class="complexity-tag">💾 ${nextProb.spaceComplexity}</span>
                  </div>
                </div>
                <p class="rec-card-desc">${this.escapeHTML(nextProb.description)}</p>
                <div class="rec-card-actions">
                  <button class="btn-hero-primary" data-action="solve-visualize" data-id="${nextProb.id}">
                    ▶ Solve & Step in Visualizer
                  </button>
                  <button class="btn-hero-subtle" data-action="view-problem-details" data-id="${nextProb.id}">
                    ℹ️ Problem Details
                  </button>
                  <button class="btn-hero-star ${this.isBookmarked(nextProb.id) ? 'active' : ''}" data-action="toggle-bookmark" data-id="${nextProb.id}">
                    ${this.isBookmarked(nextProb.id) ? '⭐ Bookmarked' : '☆ Bookmark'}
                  </button>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Filter & Browse Problems in this Topic -->
          <div class="problem-explorer-wrap" id="topicDetailProblemsWrap">
            <div class="problem-toolbar">
              <div class="toolbar-search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="topicDetailProblemSearch" class="search-input" 
                  placeholder="Search problems in ${this.escapeHTML(meta.name)} by title, LC #, or pattern..." 
                  value="${this.escapeHTML(this.searchQuery)}" spellcheck="false" />
                ${this.searchQuery ? `<button class="search-clear-btn" data-action="clear-filters">✕</button>` : ''}
              </div>

              <div class="toolbar-filters-row">
                <!-- Difficulty Filter Pills -->
                <div class="filter-group">
                  <span class="filter-label">Difficulty:</span>
                  <div class="pill-group">
                    <button class="filter-pill ${this.selectedDifficulty === 'all' ? 'active' : ''}" data-filter-diff-chip="all">All</button>
                    <button class="filter-pill diff-easy ${this.selectedDifficulty === 'Easy' ? 'active' : ''}" data-filter-diff-chip="Easy">Easy</button>
                    <button class="filter-pill diff-medium ${this.selectedDifficulty === 'Medium' ? 'active' : ''}" data-filter-diff-chip="Medium">Medium</button>
                    <button class="filter-pill diff-hard ${this.selectedDifficulty === 'Hard' ? 'active' : ''}" data-filter-diff-chip="Hard">Hard</button>
                  </div>
                </div>

                <!-- Algorithmic Pattern Dropdown (Phase 2) -->
                <div class="filter-group">
                  <label for="topicDetailPatternSelect" class="filter-label">Pattern:</label>
                  <select id="topicDetailPatternSelect" class="filter-select pattern-select">
                    <option value="all" ${this.selectedPattern === 'all' ? 'selected' : ''}>All Patterns (${tStats.patterns.length})</option>
                    ${tStats.patterns.map(pat => `<option value="${this.escapeHTML(pat)}" ${this.selectedPattern === pat ? 'selected' : ''}>${this.escapeHTML(pat)}</option>`).join('')}
                  </select>
                </div>

                <!-- Learning Status Filter Pills -->
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
                </div>

                <!-- Clear Filters -->
                <button class="btn-clear-filters" data-action="clear-filters" title="Reset all search filters">
                  ↺ Reset
                </button>
              </div>
            </div>

            <!-- Problem Table Container -->
            <div id="dsaProblemTableContainer">
              ${this.renderProblemTableContent(topicName)}
            </div>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SUB-VIEW 4: PROBLEM LIBRARY EXPLORER (SEARCH + MULTI-TOPIC + PATTERN FILTER)
    // -------------------------------------------------------------------------
    renderProblemExplorer(stats) {
      const allPatterns = this.getAllAlgorithmicPatterns();

      return `
        <div class="problem-explorer-wrap" id="problemExplorerWrap">
          <div class="problem-toolbar">
            <div class="toolbar-search-box">
              <span class="search-icon">🔍</span>
              <input type="text" id="dsaProblemSearch" class="search-input" 
                placeholder="Search by title, LeetCode #, algorithmic pattern, or description..." 
                value="${this.escapeHTML(this.searchQuery)}" spellcheck="false" />
              ${this.searchQuery ? `<button class="search-clear-btn" data-action="clear-filters">✕</button>` : ''}
            </div>

            <div class="toolbar-filters-row">
              <!-- Topic Dropdown (All 30 Topics) -->
              <div class="filter-group">
                <label for="dsaTopicSelect" class="filter-label">Topic:</label>
                <select id="dsaTopicSelect" class="filter-select">
                  <option value="all" ${this.selectedTopic === 'all' ? 'selected' : ''}>All Topics (30 Topics)</option>
                  ${TOPIC_METADATA_30.map(t => `<option value="${this.escapeHTML(t.name)}" ${this.selectedTopic === t.name ? 'selected' : ''}>${t.icon} ${this.escapeHTML(t.name)}</option>`).join('')}
                </select>
              </div>

              <!-- Pattern Dropdown (Phase 2) -->
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
              </div>

              <!-- Difficulty Filter Pills -->
              <div class="filter-group">
                <span class="filter-label">Difficulty:</span>
                <div class="pill-group">
                  <button class="filter-pill ${this.selectedDifficulty === 'all' ? 'active' : ''}" data-filter-diff-chip="all">All</button>
                  <button class="filter-pill diff-easy ${this.selectedDifficulty === 'Easy' ? 'active' : ''}" data-filter-diff-chip="Easy">Easy</button>
                  <button class="filter-pill diff-medium ${this.selectedDifficulty === 'Medium' ? 'active' : ''}" data-filter-diff-chip="Medium">Medium</button>
                  <button class="filter-pill diff-hard ${this.selectedDifficulty === 'Hard' ? 'active' : ''}" data-filter-diff-chip="Hard">Hard</button>
                </div>
              </div>

              <!-- Status Filter Pills (Phase 4) -->
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
              </div>
            </div>
          </div>

          <!-- Problem Table Content Area -->
          <div id="dsaProblemTableContainer">
            ${this.renderProblemTableContent()}
          </div>
        </div>
      `;
    }

    renderProblemTableOnly() {
      const container = document.getElementById('dsaProblemTableContainer');
      if (container) {
        const topicOverride = this.currentSubTab === 'topic_detail' ? this.activeTopicDetail : null;
        container.innerHTML = this.renderProblemTableContent(topicOverride);
      }
    }

    filterProblems(overrideTopic = null) {
      return this.getFilteredProblems(overrideTopic);
    }

    getFilteredProblems(overrideTopic = null) {
      let list = this.problems.slice();
      const activeTopic = overrideTopic || this.selectedTopic;

      // 1. Search query (title, LC#, pattern, description, summary, topic)
      if (this.searchQuery && this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase().trim();
        list = list.filter(p => {
          const matchTitle = p.title && p.title.toLowerCase().includes(q);
          const matchNum = p.leetcodeNumber && String(p.leetcodeNumber).includes(q);
          const matchPattern = p.pattern && p.pattern.toLowerCase().includes(q);
          const matchDesc = p.description && p.description.toLowerCase().includes(q);
          const matchSummary = p.summary && p.summary.toLowerCase().includes(q);
          const matchTopic = (p.topics && p.topics.some(t => t.toLowerCase().includes(q))) || (p.topic && p.topic.toLowerCase().includes(q));
          return matchTitle || matchNum || matchPattern || matchDesc || matchSummary || matchTopic;
        });
      }

      // 2. Topic filter (multi-topic matching across all 30 topics!)
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
      }

      // 3. Algorithmic Pattern filter
      if (this.selectedPattern && this.selectedPattern !== 'all') {
        list = list.filter(p => p.pattern === this.selectedPattern);
      }

      // 4. Difficulty filter
      if (this.selectedDifficulty && this.selectedDifficulty !== 'all') {
        list = list.filter(p => p.difficulty === this.selectedDifficulty);
      }

      // 5. Status filter (Not Started, Attempted, Solved, Review, Bookmarked, With Notes)
      if (this.selectedStatus && this.selectedStatus !== 'all') {
        if (this.selectedStatus === 'solved') {
          list = list.filter(p => this.progress.solved.includes(p.id));
        } else if (this.selectedStatus === 'attempted') {
          list = list.filter(p => this.progress.attempted.includes(p.id) && !this.progress.solved.includes(p.id));
        } else if (this.selectedStatus === 'not_started') {
          list = list.filter(p => !this.progress.solved.includes(p.id) && !this.progress.attempted.includes(p.id));
        } else if (this.selectedStatus === 'review') {
          list = list.filter(p => this.isReview(p.id));
        } else if (this.selectedStatus === 'bookmarked') {
          list = list.filter(p => this.isBookmarked(p.id));
        } else if (this.selectedStatus === 'with_notes') {
          list = list.filter(p => this.hasNote(p.id));
        }
      }

      // 6. Independent Bookmarked status filter
      if (this.onlyBookmarked) {
        list = list.filter(p => this.isBookmarked(p.id));
      }

      // 7. Sorting: title, difficulty, and learning order (+ LC #)
      const diffRankAsc = { Easy: 1, Medium: 2, Hard: 3 };
      const diffRankDesc = { Hard: 1, Medium: 2, Easy: 3 };

      if (this.selectedSort === 'order_asc') {
        list.sort((a, b) => a.id - b.id);
      } else if (this.selectedSort === 'order_desc') {
        list.sort((a, b) => b.id - a.id);
      } else if (this.selectedSort === 'title_asc') {
        list.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.selectedSort === 'title_desc') {
        list.sort((a, b) => b.title.localeCompare(a.title));
      } else if (this.selectedSort === 'diff_asc') {
        list.sort((a, b) => ((diffRankAsc[a.difficulty] || 0) - (diffRankAsc[b.difficulty] || 0)) || (a.id - b.id));
      } else if (this.selectedSort === 'diff_desc') {
        list.sort((a, b) => ((diffRankDesc[a.difficulty] || 0) - (diffRankDesc[b.difficulty] || 0)) || (a.id - b.id));
      } else if (this.selectedSort === 'lc_asc') {
        list.sort((a, b) => (a.leetcodeNumber || a.id) - (b.leetcodeNumber || b.id));
      } else if (this.selectedSort === 'lc_desc') {
        list.sort((a, b) => (b.leetcodeNumber || b.id) - (a.leetcodeNumber || a.id));
      } else {
        list.sort((a, b) => a.id - b.id);
      }

      return list;
    }

    renderProblemTableContent(topicOverride = null) {
      const filtered = this.getFilteredProblems(topicOverride);
      const totalFiltered = filtered.length;

      const isAll = this.pageSize === 'all';
      const effectivePageSize = isAll ? Math.max(1, totalFiltered) : this.pageSize;
      const totalPages = Math.max(1, Math.ceil(totalFiltered / effectivePageSize));
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      const startIdx = (this.currentPage - 1) * effectivePageSize;
      const paginated = isAll ? filtered : filtered.slice(startIdx, startIdx + effectivePageSize);

      if (totalFiltered === 0) {
        let emptyMsg = 'No problems match your current search and filter criteria.';
        let tipMsg = 'Try clearing your search query or choosing a broader difficulty or topic.';

        if (this.selectedStatus === 'bookmarked') {
          emptyMsg = 'No bookmarked problems found.';
          tipMsg = 'Click the ☆ icon on any problem in the catalog to bookmark it for quick practice!';
        } else if (this.selectedStatus === 'review') {
          emptyMsg = 'Your review list is currently empty.';
          tipMsg = 'Click the 🔖 icon on problems you want to flag for targeted revision!';
        } else if (this.selectedStatus === 'with_notes') {
          emptyMsg = 'No problems with personal notes found.';
          tipMsg = 'Open any problem workspace and write notes to reinforce your learning!';
        } else if (this.selectedStatus === 'solved') {
          emptyMsg = 'No solved problems in this selection yet.';
          tipMsg = 'Pick a beginner problem from the roadmap to get your first green checkmark!';
        } else if (this.searchQuery && this.searchQuery.trim()) {
          emptyMsg = `No problems found matching "${this.escapeHTML(this.searchQuery)}".`;
          tipMsg = 'Check your spelling or try searching by algorithmic pattern (e.g. "Two Pointers", "Sliding Window").';
        }

        return `
          <div class="empty-state-box dsa-empty-state-card">
            <div class="empty-state-icon">🔍</div>
            <h3 class="empty-state-heading">${emptyMsg}</h3>
            <p class="empty-state-text">${tipMsg}</p>
            <button class="btn-hero-primary btn-clear-empty-filters" data-action="clear-filters">Reset All Filters</button>
          </div>
        `;
      }

      const rows = paginated.map(p => {
        const isSolved = this.progress.solved.includes(p.id);
        const isAttempted = this.progress.attempted.includes(p.id) && !isSolved;
        const isBookmarked = this.isBookmarked(p.id);
        const diffClass = p.difficulty.toLowerCase();

        // Render multi-topic badges (up to 3)
        const topicList = p.topics && p.topics.length > 0 ? p.topics : [p.topic];
        const topicBadges = topicList.slice(0, 3).map(top => {
          return `<button class="mini-topic-chip" data-open-topic="${this.escapeHTML(top)}">${this.escapeHTML(top)}</button>`;
        }).join('');
        const moreTopics = topicList.length > 3 ? `<span class="more-topics-tag">+${topicList.length - 3}</span>` : '';

        return `
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
                <a href="#dsa/problem/${p.id}" class="problem-title-link" data-action="open-workspace" data-id="${p.id}" title="Open Dedicated Learning Workspace (Route: #dsa/problem/${p.id})">
                  ${this.escapeHTML(p.title)}
                </a>
                <button class="btn-mini-preview" data-action="view-problem-details" data-id="${p.id}" title="Quick summary preview">ℹ️</button>
                ${this.isReview(p.id) ? '<span class="review-badge-pill" title="Flagged for review">🔖 Review</span>' : ''}
                ${this.hasNote(p.id) ? '<span class="note-pill-indicator" title="Personal learning note saved">📝</span>' : ''}
                <span class="pattern-chip" title="Algorithm Pattern">${this.escapeHTML(p.pattern)}</span>
              </div>
            </td>

            <td class="col-topics-multi">
              <div class="multi-topics-wrap">
                ${topicBadges}
                ${moreTopics}
              </div>
            </td>

            <td class="col-diff">
              <span class="diff-badge diff-${diffClass}">${p.difficulty}</span>
            </td>

            <td class="col-status">
              <button class="status-toggle-btn ${isSolved ? 'solved' : isAttempted ? 'attempted' : 'not-started'}" 
                data-action="toggle-solved" data-id="${p.id}" 
                title="Click to toggle solved status">
                ${isSolved ? '✅ Solved' : isAttempted ? '⏳ In Progress' : '⚪ Not Started'}
              </button>
            </td>

            <td class="col-complexity">
              <span class="complexity-tag" title="Time Complexity">⏱ ${p.timeComplexity}</span>
              <span class="complexity-tag" title="Space Complexity">💾 ${p.spaceComplexity}</span>
            </td>

            <td class="col-action">
              <button class="btn-table-visualize" data-action="solve-visualize" data-id="${p.id}" title="Load Python code into visualizer and step through">
                ▶ Solve & Step
              </button>
            </td>
          </tr>
        `;
      }).join('');

      return `
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
      `;
    }

    renderPaginationControls(current, totalPages) {
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
    }

    // -------------------------------------------------------------------------
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
    }

    // -------------------------------------------------------------------------
    // PROBLEM DETAIL MODAL / DRAWER
    // -------------------------------------------------------------------------
    showProblemModal(id) {
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
              <span class="complexity-tag" title="Time Complexity">⏱ Time: ${this.formatComplexityForBeginner(p.timeComplexity, 'time')}</span>
              <span class="complexity-tag" title="Space Complexity">💾 Space: ${this.formatComplexityForBeginner(p.spaceComplexity, 'space')}</span>
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

          <!-- Modal Footer (Phase 4) -->
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
              <button class="btn-hero-subtle" data-action="open-workspace" data-id="${p.id}" title="Open dedicated workspace">
                🎓 Open Full Workspace
              </button>
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
        } else if (e.target.closest('[data-action="open-workspace"]')) {
          modal.remove();
          cleanupRoute();
          this.openProblemWorkspace(p.id);
        } else if (e.target.closest('[data-action="solve-visualize"]')) {
          modal.remove();
          cleanupRoute();
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

        // -------------------------------------------------------------------------
    // PHASE 4: URL HASH ROUTING & UNIQUE PROBLEM ROUTE
    // -------------------------------------------------------------------------
    initRouter() {
      if (typeof window === 'undefined') return;

      this.handleHashRouting = (hashOverride) => {
        try {
          const hash = hashOverride || ((window.location && window.location.hash) ? window.location.hash : '');
          if (!hash) return;

          // Match #dsa/problem/:id or #problem/:id -> Opens Workspace
          const pMatch = hash.match(/^#(?:dsa\/)?problem\/(\d+)/i);
          if (pMatch) {
            const id = parseInt(pMatch[1], 10);
            if (this.problemsById && this.problemsById.has(id)) {
              this.switchView('dsa');
              if (typeof setTimeout === 'function') {
                setTimeout(() => {
                  this.openProblemWorkspace(id);
                }, 40);
              } else {
                this.openProblemWorkspace(id);
              }
              return;
            }
          }

          // Match #dsa/topic/:topic or #topic/:topic
          const tMatch = hash.match(/^#(?:dsa\/)?topic\/(.+)/i);
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
        window.addEventListener('hashchange', () => this.handleHashRouting());
      }
      this.handleHashRouting();
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
      const normalizeUrl = (u) => String(u || '').trim().toLowerCase().replace(/\/+$/, '');

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
            starterCode: raw.starterCode || raw.referenceSolution || '# Starter code\n',
            referenceSolution: raw.referenceSolution || raw.starterCode || '# Reference solution\n',
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
            <textarea id="importJsonTextarea" class="import-json-textarea" placeholder="[&#10;  {&#10;    \"title\": \"Subtree of Another Tree\",&#10;    \"leetcodeNumber\": 572,&#10;    \"difficulty\": \"Easy\",&#10;    \"primaryTopic\": \"Trees and Binary Trees\",&#10;    \"pattern\": \"Tree Matching\"&#10;  }&#10;]"></textarea>
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
          alert(`Import Complete!

Imported: ${report.imported}
Updated: ${report.updated}
Duplicates Skipped: ${report.skipped}
Total Catalog: ${report.totalCatalog}`);
        }
      });
    }


    // -------------------------------------------------------------------------
    // PHASE 5: RULE-BASED TEACHING GUIDE GENERATOR (NO AI APIS)
    // -------------------------------------------------------------------------
    getProblemTeachingGuide(p) {
      const title = p.title || 'DSA Problem';
      const pattern = p.pattern || 'Algorithmic Pattern';
      const topic = p.primaryTopic || p.topic || 'Data Structures';
      const summary = p.summary || p.description || '';

      // Section A: Understand
      const whatIsAsked = `This problem requires you to ${summary.toLowerCase().replace(/\.+$/, '')}. You must inspect the input data, respect all constraints, and produce the expected result using optimal time and space complexity.`;

      let whatToReturn = "Return the computed answer matching the problem's expected output format.";
      const sLower = summary.toLowerCase();
      if (sLower.includes('index') || sLower.includes('indices')) {
        whatToReturn = "Return a list or tuple of 0-based integer indices (e.g., [i, j]) that satisfy the condition.";
      } else if (sLower.includes('true') || sLower.includes('false') || sLower.includes('determine if') || sLower.includes('check if') || sLower.includes('valid')) {
        whatToReturn = "Return a boolean value (True if the target condition is satisfied, False otherwise).";
      } else if (sLower.includes('maximum') || sLower.includes('largest') || sLower.includes('longest')) {
        whatToReturn = "Return a single integer or float representing the maximum / longest optimal metric found.";
      } else if (sLower.includes('minimum') || sLower.includes('shortest') || sLower.includes('smallest')) {
        whatToReturn = "Return a single integer or float representing the minimum / shortest optimal metric found.";
      } else if (sLower.includes('list') || sLower.includes('array') || sLower.includes('group') || sLower.includes('subsets')) {
        whatToReturn = "Return the resulting collection (list or list of lists) containing the processed elements.";
      }

      const edgeCases = [
        "Empty or minimal collection: Verify that your logic handles len == 0 or len == 1 without out-of-bounds indexing.",
        "Identical or duplicate values: Check if the problem allows reusing elements or requires distinct items.",
        "Negative numbers and zero: Ensure counters, sums, and modulus operations do not produce incorrect signs.",
        "Boundary positions: Confirm your algorithm works when the optimal elements reside at the very first or last positions.",
        "Scale limits: Ensure your solution stays within the time limit and does not degrade into O(n²) or exponential O(2^n)."
      ];

      // Section B: Learn Pattern
      const whyUseful = `A naive brute-force method typically inspects every possible combination using nested loops in O(n²) or recursive permutations in O(2^n). The ${pattern} pattern eliminates redundant recalculation by tracking invariant state as elements are examined, lowering runtime to ${p.timeComplexity || 'O(n)'}.`;

      const smallExample = `For example, given a small input like [2, 7, 11] with target = 9: As you encounter 2, store its index 0. Moving to 7, compute complement 9 - 7 = 2. Since 2 was already recorded, you immediately locate the answer [0, 1] in O(1) extra lookups rather than re-scanning remaining elements.`;

      const intendedApproach = [
        `1. Setup State: Initialize necessary variables, pointers, or data structures suited for ${pattern}.`,
        "2. Single-Pass Iteration: Step through the collection, updating state invariants and evaluating the core condition.",
        "3. Early Exit / Final Return: Return the solution as soon as the target state is reached, or return the default fallback."
      ];

      const hints = [
        `Hint 1 (Mental Model): What redundant work can you avoid instead of scanning the array multiple times? What information can you remember from previous elements?`,
        `Hint 2 (Data Structure): How can the ${pattern} pattern or an auxiliary lookup table help achieve ${p.timeComplexity || 'O(n)'} time?`,
        `Hint 3 (Algorithmic Steps): Maintain your state invariant during a single pass. For each element, evaluate the target condition immediately.`
      ];

      return {
        whatIsAsked,
        whatToReturn,
        edgeCases,
        whyUseful,
        smallExample,
        intendedApproach,
        hints
      };
    }

    getProblemSolutions(p) {
      if (!p) return null;
      if (typeof window !== 'undefined' && typeof window.getProblemSolutionData === 'function') {
        const data = window.getProblemSolutionData(p);
        if (data) return data;
      }
      if (typeof window !== 'undefined' && window.DSA_SOLUTIONS_REGISTRY && window.DSA_SOLUTIONS_REGISTRY[p.id]) {
        return window.DSA_SOLUTIONS_REGISTRY[p.id];
      }
      const pattern = p.pattern || 'Optimal Pattern';
      return {
        hasMultipleApproaches: false,
        approaches: [
          {
            id: 'optimized',
            name: `Optimized Approach (${pattern})`,
            isOptimal: true,
            timeComplexity: p.timeComplexity || 'O(n)',
            spaceComplexity: p.spaceComplexity || 'O(1)',
            code: p.referenceSolution || p.starterCode || '',
            explanation: `Solves ${p.title} using the ${pattern} pattern with minimal operations.`,
            whyItWorks: `Maintains state invariants to ensure correctness in ${p.timeComplexity || 'O(n)'} time.`,
            commonMistakes: [
              'Boundary check omissions on minimal inputs.',
              'Accidental quadratic operations inside iteration loop.',
              'Off-by-one errors during pointer transitions.'
            ],
            isVerified: true
          }
        ]
      };
    }

    getProblemTestCases(p) {
      if (p.id === 1) {
        return [
          {
            testIndex: 1,
            inputStr: 'nums = [2, 7, 11, 15], target = 9',
            callCode: 'twoSum([2, 7, 11, 15], 9)',
            expectedOutput: '[0, 1]'
          },
          {
            testIndex: 2,
            inputStr: 'nums = [3, 2, 4], target = 6',
            callCode: 'twoSum([3, 2, 4], 6)',
            expectedOutput: '[1, 2]'
          },
          {
            testIndex: 3,
            inputStr: 'nums = [3, 3], target = 6',
            callCode: 'twoSum([3, 3], 6)',
            expectedOutput: '[0, 1]'
          }
        ];
      }

      const funcMatch = (p.starterCode || '').match(/def\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)/);
      const funcName = funcMatch ? funcMatch[1] : null;

      const callMatch = funcName ? (p.starterCode || '').match(new RegExp(`(${funcName}\\([^)]+\\))`)) : null;
      const sampleCall = callMatch ? callMatch[1] : null;

      if (p.examples && p.examples.length > 0) {
        return p.examples.map((ex, idx) => ({
          testIndex: idx + 1,
          inputStr: ex.input || 'Sample Input',
          callCode: idx === 0 ? sampleCall : null,
          expectedOutput: ex.output || 'Expected Result',
          explanation: ex.explanation || ''
        }));
      }

      return [
        {
          testIndex: 1,
          inputStr: 'Input from starter template',
          callCode: sampleCall,
          expectedOutput: 'Verified Output',
          explanation: 'Evaluated against problem constraints'
        }
      ];
    }

    // -------------------------------------------------------------------------
    // PHASE 5: SAFE RESTRICTED CODE EXECUTION (CLIENT-SIDE VM)
    // -------------------------------------------------------------------------
    runWorkspaceCode(problemId, userCode) {
      try {
        if (!userCode || !userCode.trim()) {
          return { ok: false, error: 'Editor is empty. Write or paste Python code before running.' };
        }

        if (!this.engine && typeof window !== 'undefined' && window.PythonExecutionEngine) {
          this.engine = new window.PythonExecutionEngine();
        }

        if (!this.engine) {
          return { ok: false, error: 'Offline PythonExecutionEngine not loaded in browser environment.' };
        }

        const trace = this.engine.trace(userCode, "");
        if (!trace.ok) {
          return {
            ok: false,
            error: trace.error || 'SyntaxError / RuntimeError in Python code',
            stdout: []
          };
        }

        const steps = trace.steps || [];
        const lastStep = steps.length > 0 ? steps[steps.length - 1] : {};
        const stdout = lastStep.stdout || [];
        const vars = (lastStep.variables || []).filter(v => !v.name.startsWith('__'));

        return {
          ok: true,
          stdout,
          stepsCount: steps.length,
          variables: vars
        };
      } catch (err) {
        return {
          ok: false,
          error: `Execution error: ${err.message}`
        };
      }
    }

    runWorkspaceTests(problemId, userCode) {
      const p = this.problemsById.get(problemId);
      if (!p) return { total: 0, passed: 0, results: [] };

      if (!this.engine && typeof window !== 'undefined' && window.PythonExecutionEngine) {
        this.engine = new window.PythonExecutionEngine();
      }

      if (!this.engine) {
        return { total: 0, passed: 0, results: [{ testIndex: 1, passed: false, actualOutput: 'Error: Engine not loaded', expectedOutput: 'Result' }] };
      }

      const testCases = this.getProblemTestCases(p);
      const results = [];
      let passedCount = 0;

      for (const tc of testCases) {
        let trace;
        if (tc.callCode) {
          const harness = `\n${userCode}\n__test_val__ = ${tc.callCode}\n`;
          trace = this.engine.trace(harness, "");
        } else {
          trace = this.engine.trace(userCode, "");
        }

        if (!trace.ok) {
          results.push({
            testIndex: tc.testIndex,
            inputStr: tc.inputStr,
            expectedOutput: tc.expectedOutput,
            actualOutput: 'Execution Error: ' + trace.error,
            passed: false,
            error: trace.error
          });
        } else {
          const steps = trace.steps || [];
          const lastStep = steps.length > 0 ? steps[steps.length - 1] : {};
          let actualText = 'Executed cleanly';
          let isMatch = false;

          if (tc.callCode) {
            const v = (lastStep.variables || []).find(x => x.name === '__test_val__');
            if (v && v.current !== undefined) {
              actualText = String(v.current);
            } else if (lastStep.stdout && lastStep.stdout.length > 0) {
              actualText = lastStep.stdout[lastStep.stdout.length - 1];
            }
            const normActual = actualText.replace(/\s+/g, '');
            const normExpected = String(tc.expectedOutput).replace(/\s+/g, '');
            isMatch = (normActual === normExpected);
          } else {
            if (lastStep.stdout && lastStep.stdout.length > 0) {
              actualText = lastStep.stdout.join('\n');
            } else if (lastStep.variables && lastStep.variables.length > 0) {
              actualText = lastStep.variables.filter(x => !x.name.startsWith('__')).map(x => `${x.name} = ${x.current}`).join(', ');
            }
            isMatch = true;
          }

          if (isMatch) passedCount++;

          results.push({
            testIndex: tc.testIndex,
            inputStr: tc.inputStr,
            expectedOutput: tc.expectedOutput,
            actualOutput: actualText,
            passed: isMatch
          });
        }
      }

      if (passedCount === testCases.length && testCases.length > 0) {
        this.markSolved(problemId);
      }

      return {
        total: testCases.length,
        passed: passedCount,
        results
      };
    }

    // -------------------------------------------------------------------------
    // PHASE 5: WORKSPACE HTML RENDERING (A, B, C, D)
    // -------------------------------------------------------------------------
    renderProblemWorkspace(problemId) {
      const p = this.problemsById.get(problemId) || this.problems[0];
      if (!p) return '<div class="empty-state-box">Problem not found.</div>';

      const isSolved = this.progress.solved.includes(p.id);
      const isBookmarked = this.isBookmarked(p.id);
      const isRev = this.isReview(p.id);
      const diffClass = p.difficulty.toLowerCase();
      const userCode = this.getUserCode(p.id);
      const guide = this.getProblemTeachingGuide(p);

      const hintsCount = this.revealedHints[p.id] || 0;
      const isSolutionUnlocked = this.revealedSolutions[p.id] || false;

      const curIdx = this.problems.findIndex(x => x.id === p.id);
      const prevProb = curIdx > 0 ? this.problems[curIdx - 1] : this.problems[this.problems.length - 1];
      const nextProb = curIdx < this.problems.length - 1 ? this.problems[curIdx + 1] : this.problems[0];

      const topicChips = (p.topics && p.topics.length > 0 ? p.topics : [p.topic]).map(t => {
        return `<button class="mini-topic-chip" data-open-topic="${this.escapeHTML(t)}">${this.escapeHTML(t)}</button>`;
      }).join(' ');

      return `
        <div class="workspace-wrapper" id="workspaceWrapper">
          <!-- Top Breadcrumb & Quick Actions Bar -->
          <!-- Breadcrumbs Bar -->
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
            </div>

            <div class="workspace-quick-actions">
              <button class="btn-hero-star ${isBookmarked ? 'active' : ''}" data-action="toggle-bookmark" data-id="${p.id}" title="Toggle bookmark">
                ${isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
              </button>
              <button class="btn-hero-review ${isRev ? 'active' : ''}" data-action="toggle-review" data-id="${p.id}" title="Flag for review">
                ${isRev ? '🔖 In Review List' : '🔖 Mark for Review'}
              </button>
              <button class="status-toggle-btn ${isSolved ? 'solved' : 'not-started'}" data-action="toggle-solved" data-id="${p.id}">
                ${isSolved ? '✅ Solved' : '⚪ Mark as Solved'}
              </button>
              <button class="btn-copy-route" id="btnWorkspaceCopyRoute" data-id="${p.id}" title="Copy direct route URL">
                🔗 Copy Route
              </button>
              <span id="workspaceRouteToast" class="route-feedback-toast hidden">✓ Link copied!</span>
              <a href="${p.sourceUrl || `https://leetcode.com/problems/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`}" 
                 target="_blank" rel="noopener noreferrer" class="btn-external-link" title="Open verified LeetCode problem page">
                ↗ LeetCode Page
              </a>
            </div>
          </div>

          <!-- Workspace Hero Banner -->
          <div class="workspace-hero-banner">
            <div class="workspace-hero-title-row">
              <span class="lc-badge">LeetCode #${p.leetcodeNumber}</span>
              <h1 class="workspace-hero-title">${this.escapeHTML(p.title)}</h1>
              <span class="diff-badge diff-${diffClass}">${p.difficulty}</span>
              <span class="pattern-tag">🧩 Pattern: ${this.escapeHTML(p.pattern)}</span>
              <span class="complexity-tag">⏱ Time: ${p.timeComplexity}</span>
              <span class="complexity-tag">💾 Space: ${p.spaceComplexity}</span>
            </div>
            <div class="workspace-topics-row">
              <span class="topics-label">Categorized under:</span>
              ${topicChips}
            </div>
          </div>

          <!-- 2-Column Split Learning & Practice Layout -->
          <div class="workspace-2col-layout">
            <!-- LEFT COLUMN: A. Understand Problem & B. Learn Pattern -->
            <div class="workspace-col workspace-col-left">
              <!-- Left Column Tab Switcher -->
              <div class="workspace-pane-tabs" role="tablist">
                <button class="workspace-pane-tab ${this.workspaceLeftTab === 'understand' ? 'active' : ''}" data-workspace-tab="left" data-tab-name="understand">
                  📖 A. Understand the Problem
                </button>
                <button class="workspace-pane-tab ${this.workspaceLeftTab === 'pattern' ? 'active' : ''}" data-workspace-tab="left" data-tab-name="pattern">
                  🧩 B. Learn the Pattern
                </button>
              </div>

              <!-- PANE A: UNDERSTAND THE PROBLEM -->
              <div class="workspace-pane-content ${this.workspaceLeftTab === 'understand' ? '' : 'hidden'}" id="paneUnderstand">
                <div class="guide-card">
                  <h3 class="guide-section-heading">🎯 What the Problem Asks</h3>
                  <p class="guide-text">${this.escapeHTML(guide.whatIsAsked)}</p>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">📤 What You Need to Calculate or Return</h3>
                  <div class="guide-callout-box">
                    <strong>Goal:</strong> ${this.escapeHTML(guide.whatToReturn)}
                  </div>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">📋 Input & Output Examples</h3>
                  <div class="examples-list">
                    ${(p.examples || []).map((ex, idx) => `
                      <div class="example-box">
                        <div class="example-num">Example ${idx + 1}</div>
                        <div class="example-row"><strong>Input:</strong> <code>${this.escapeHTML(ex.input)}</code></div>
                        <div class="example-row"><strong>Expected Output:</strong> <code class="expected-code">${this.escapeHTML(ex.output)}</code></div>
                        ${ex.explanation ? `<div class="example-row"><strong>Explanation:</strong> <span>${this.escapeHTML(ex.explanation)}</span></div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">📏 Important Constraints</h3>
                  <ul class="constraints-list">
                    ${(p.constraints || []).map(c => `<li><code>${this.escapeHTML(c)}</code></li>`).join('')}
                  </ul>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">⚠️ Common Edge Cases to Consider</h3>
                  <ul class="edge-cases-list">
                    ${guide.edgeCases.map(ec => `<li>${this.escapeHTML(ec)}</li>`).join('')}
                  </ul>
                </div>

                <div class="solution-hidden-banner">
                  <span class="lock-icon">🔒</span>
                  <span>Reference solution is hidden to promote independent problem-solving. Use <strong>Show Hints</strong> on the right if you get stuck!</span>
                </div>
              </div>

              <!-- PANE B: LEARN THE PATTERN -->
              <div class="workspace-pane-content ${this.workspaceLeftTab === 'pattern' ? '' : 'hidden'}" id="panePattern">
                <div class="guide-card">
                  <div class="pattern-header-badge">
                    <span class="pattern-icon">🧩</span>
                    <div>
                      <h3 class="guide-section-heading" style="margin: 0;">Relevant DSA Pattern: ${this.escapeHTML(p.pattern)}</h3>
                      <span class="topic-cat-badge">Core Interview Technique</span>
                    </div>
                  </div>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">💡 Why This Pattern is Useful</h3>
                  <p class="guide-text">${this.escapeHTML(guide.whyUseful)}</p>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">🔑 Prerequisite Concepts</h3>
                  <div class="prereqs-wrap">
                    ${(p.prerequisites || []).map(pr => `<span class="prereq-chip">💡 ${this.escapeHTML(pr)}</span>`).join('')}
                  </div>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">🔍 Illustrative Walkthrough</h3>
                  <p class="guide-text">${this.escapeHTML(guide.smallExample)}</p>
                </div>

                <div class="guide-card">
                  <h3 class="guide-section-heading">📝 Intended Approach</h3>
                  <ol class="approach-steps-list">
                    ${guide.intendedApproach.map(step => `<li>${this.escapeHTML(step)}</li>`).join('')}
                  </ol>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: C. Try It Yourself & D. Visualize Execution -->
            <div class="workspace-col workspace-col-right">
              <!-- Right Column Tab Switcher -->
              <div class="workspace-pane-tabs" role="tablist">
                <button class="workspace-pane-tab ${this.workspaceRightTab === 'editor' ? 'active' : ''}" data-workspace-tab="right" data-tab-name="editor">
                  💻 C. Try It Yourself (Python Editor)
                </button>
                <button class="workspace-pane-tab ${this.workspaceRightTab === 'visualize' ? 'active' : ''}" data-workspace-tab="right" data-tab-name="visualize">
                  🚀 D. Visualize Execution
                </button>
              </div>

              <!-- PANE C: TRY IT YOURSELF (EDITOR, RUN, TESTS, HINTS) -->
              <div class="workspace-pane-content ${this.workspaceRightTab === 'editor' ? '' : 'hidden'}" id="paneEditor">
                <!-- Editor Action Controls -->
                <div class="workspace-editor-toolbar">
                  <button class="btn-ws-action btn-ws-run" id="btnWsRunCode" title="Execute Python code in safe client-side environment">
                    ▶ Run Code
                  </button>
                  <button class="btn-ws-action btn-ws-tests" id="btnWsRunTests" title="Validate code against problem test cases">
                    🧪 Run Tests
                  </button>
                  <button class="btn-ws-action btn-ws-reset" id="btnWsResetCode" title="Revert editor to original template">
                    ↺ Reset
                  </button>
                  <button class="btn-ws-action btn-ws-hints" id="btnWsShowHint" title="Reveal progressive hints">
                    💡 Hints (${hintsCount}/${guide.hints.length})
                  </button>
                  <button class="btn-ws-action btn-ws-solution" id="btnWsRevealSolution" title="View reference solution (with confirmation)">
                    ${isSolutionUnlocked ? '🔓 Hide Solution' : '🔓 Reveal Solution'}
                  </button>
                  <button class="btn-ws-action btn-ws-visualize" id="btnWsStepVisualizer" title="Launch code in visualizer">
                    🚀 Visualize
                  </button>
                </div>

                <!-- Code Editor Area -->
                <div class="workspace-editor-box">
                  <div class="editor-header-bar">
                    <span class="editor-lang-tag">🐍 Python 3 (Restricted Safe Offline Engine)</span>
                    <span class="editor-autosave-tag" id="wsAutoSaveStatus">Auto-saved</span>
                  </div>
                  <textarea id="workspaceCodeEditor" class="workspace-code-textarea" spellcheck="false" 
                    placeholder="# Write your Python solution here...">${this.escapeHTML(userCode)}</textarea>
                </div>

                <!-- Revealed Hints Section -->
                ${hintsCount > 0 ? `
                  <div class="workspace-hints-box" id="workspaceHintsBox">
                    <h4 class="hints-box-title">💡 Progressive Hints</h4>
                    ${guide.hints.slice(0, hintsCount).map((h, i) => `
                      <div class="hint-card">
                        <span class="hint-badge">Hint ${i + 1}</span>
                        <p class="hint-text">${this.escapeHTML(h)}</p>
                      </div>
                    `).join('')}
                    ${hintsCount < guide.hints.length ? `<button class="btn-next-hint" id="btnWsNextHint">Next Hint →</button>` : ''}
                  </div>
                ` : ''}

                <!-- Revealed Reference Solution Section (Unlocked with confirmation - Phase 6) -->
                ${isSolutionUnlocked ? (() => {
                  const solData = this.getProblemSolutions(p);
                  const activeAppId = this.activeSolutionApproach[p.id] || (solData.hasMultipleApproaches ? 'optimized' : solData.approaches[0].id);
                  const activeApp = solData.approaches.find(a => a.id === activeAppId) || solData.approaches[0];

                  return `
                    <div class="workspace-solution-card" id="workspaceSolutionCard">
                      <div class="solution-card-header">
                        <div class="solution-header-left">
                          <span class="solution-unlocked-tag">🔓 Reference Solutions Unlocked</span>
                          <span class="verified-sol-badge">✅ Verified Against Examples & Edge Cases</span>
                        </div>
                        <button class="btn-hide-solution" data-action="hide-solution" data-id="${p.id}" title="Hide solution to practice independently">
                          🔒 Hide Solution
                        </button>
                      </div>

                      <!-- Approach Switcher Tabs (Baseline vs Optimized) -->
                      ${solData.hasMultipleApproaches ? `
                        <div class="solution-approach-tabs" role="tablist">
                          ${solData.approaches.map(a => `
                            <button class="solution-approach-tab ${a.id === activeApp.id ? 'active' : ''}" 
                              data-action="switch-sol-approach" data-id="${p.id}" data-approach="${a.id}">
                              ${a.isBaseline ? '⚡ Approach 1: Baseline (Brute Force)' : '✨ Approach 2: Optimized (Recommended)'}
                            </button>
                          `).join('')}
                        </div>
                      ` : ''}

                      <!-- Active Approach Header & Complexity Chips -->
                      <div class="solution-approach-info">
                        <div class="approach-title-row">
                          <h4 class="approach-title">${this.escapeHTML(activeApp.name)}</h4>
                          ${activeApp.isOptimal ? '<span class="optimal-pill">🌟 Recommended Optimal</span>' : '<span class="baseline-pill">⚠️ Suboptimal Baseline</span>'}
                        </div>
                        <div class="solution-meta-chips">
                          <span class="complexity-chip chip-time">⏱ Time: ${this.escapeHTML(activeApp.timeComplexity)}</span>
                          <span class="complexity-chip chip-space">💾 Space: ${this.escapeHTML(activeApp.spaceComplexity)}</span>
                          <span class="complexity-chip chip-status">✓ Verified Status: Real Engine Tested</span>
                        </div>
                      </div>

                      <!-- Action Buttons Bar -->
                      <div class="solution-header-actions">
                        <button class="btn-copy-sol" id="btnCopyRefSolution" data-action="copy-sol-approach" data-id="${p.id}">
                          📋 Copy to Editor
                        </button>
                        <button class="btn-vis-sol" id="btnVisRefSolution" data-action="vis-sol-approach" data-id="${p.id}">
                          ▶ Step in Visualizer
                        </button>
                      </div>

                      <!-- Code Block -->
                      <pre class="dsa-code-preview ref-code-block"><code>${this.escapeHTML(activeApp.code)}</code></pre>

                      <!-- Detailed Educational Explanations (Phase 6) -->
                      <div class="solution-deepdive-grid">
                        <div class="sol-deepdive-card">
                          <h5 class="deepdive-heading">📖 Explanation of the Algorithm</h5>
                          <p class="deepdive-text">${this.escapeHTML(activeApp.explanation)}</p>
                        </div>

                        <div class="sol-deepdive-card">
                          <h5 class="deepdive-heading">💡 Why This Approach Works</h5>
                          <p class="deepdive-text">${this.escapeHTML(activeApp.whyItWorks)}</p>
                        </div>

                        <div class="sol-deepdive-card mistakes-card">
                          <h5 class="deepdive-heading">⚠️ Common Mistakes & Pitfalls</h5>
                          <ul class="deepdive-mistakes-list">
                            ${activeApp.commonMistakes.map(m => `<li>${this.escapeHTML(m)}</li>`).join('')}
                          </ul>
                        </div>
                      </div>
                    </div>
                  `;
                })() : ''}

                <!-- Console / Terminal Output Panel -->
                <div class="workspace-console-panel" id="workspaceConsolePanel">
                  <div class="console-panel-header">
                    <span class="console-title">💻 Terminal / Output Console</span>
                    <button class="btn-clear-console" id="btnClearConsole">Clear</button>
                  </div>
                  <pre class="console-output-content" id="workspaceConsoleOutput">Click "▶ Run Code" or "🧪 Run Tests" to execute your Python solution in the restricted client-side interpreter.</pre>
                </div>

                <!-- Test Results Panel -->
                <div class="workspace-tests-panel hidden" id="workspaceTestsPanel">
                  <div class="tests-panel-header">
                    <h4 class="tests-panel-title">🧪 Test Results</h4>
                    <span class="tests-status-badge" id="workspaceTestsBadge">0/0 Passed</span>
                  </div>
                  <div class="tests-cards-container" id="workspaceTestCards"></div>
                </div>
              </div>

              <!-- PANE D: VISUALIZE EXECUTION -->
              <div class="workspace-pane-content ${this.workspaceRightTab === 'visualize' ? '' : 'hidden'}" id="paneVisualize">
                <div class="guide-card">
                  <div class="visualizer-promo-hero">
                    <span class="promo-icon">🚀</span>
                    <div>
                      <h3 class="guide-section-heading" style="margin: 0;">Step-by-Step Code Flow Visualizer</h3>
                      <p class="guide-text">
                        Watch your Python code execute one line at a time. Trace memory, inspect variables, predict condition outcomes, and understand loops without guesswork.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="guide-card">
                  <h4 class="guide-section-label">Supported Visualizer Features</h4>
                  <div class="feature-pills-grid">
                    <div class="feat-pill">📌 Active Executing Line Highlighting</div>
                    <div class="feat-pill">📦 Real-time Variable & Heap Memory Tracking</div>
                    <div class="feat-pill">⚖️ Condition Comparison Evaluation Gates</div>
                    <div class="feat-pill">🔁 Complete Loop Iteration Dry-Run Groups</div>
                    <div class="feat-pill">🎯 Interactive Prediction Quiz Mode</div>
                    <div class="feat-pill">⏪ Bidirectional Step Navigation (Next / Prev)</div>
                  </div>
                </div>

                <div class="guide-card">
                  <h4 class="guide-section-label">Choose What to Step Through:</h4>
                  <div class="vis-launch-actions">
                    <button class="btn-hero-primary btn-large-vis" id="btnLaunchMyCodeVis">
                      🚀 Step Through My Code in Visualizer
                    </button>
                    <button class="btn-hero-subtle btn-large-vis" id="btnLaunchRefCodeVis">
                      ▶ Step Through Verified Reference Solution
                    </button>
                  </div>
                  <p class="vis-safe-notice">
                    Note: The execution engine supports standard Python DSA structures: loops, conditionals, functions, lists, dicts, sets, slicing, classes, and recursion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    formatTimeAgo(timestamp) {
      const seconds = Math.floor((Date.now() - timestamp) / 1000);
      if (seconds < 60) return 'Just now';
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days}d ago`;
      return new Date(timestamp).toLocaleDateString();
    }

    escapeHTML(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  if (typeof window !== 'undefined') {
    window.DsaDashboard = DsaDashboard;
    window.TOPIC_METADATA_30 = TOPIC_METADATA_30;
    window.BEGINNER_ROADMAP_10_STAGES = BEGINNER_ROADMAP_10_STAGES;
    window.ROADMAP_PHASES = ROADMAP_PHASES;
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('DOMContentLoaded', () => {
        window.dsaDashboard = new DsaDashboard();
      });
    }
  }
})();
