// app_build/engine.js — Universal Offline Python Execution & Memory Visualizer Engine
// Zero AI APIs. Supports:
// - Full OOP: Classes, `__init__`, `self`, instance attributes (`self.items`), instance methods (`s.push(10)`, `self.is_empty()`)
// - Full DSA & Standard Python: Lists, Dicts, Sets, Strings, Slicing, Comprehensions, Recursion, Loops, Short-Circuit (`and`/`or`)
// - Thonny Visual Reference Model (`Name -> @Address -> Value`), Scope Isolation (`Global` vs. `Local`), and Visual GC

const PRELOADED_PROGRAMS = {
  max_subarray: {
    title: "Maximum Subarray (Kadane's Algorithm)",
    defaultInput: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
    algorithmOverview:
      "This code finds the largest sum you can get from a continuous section of the list.",
    code: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        c = 0
        ans = nums[0]

        for i in range(len(nums)):
            c += nums[i]

            if c >= ans:
                ans = c

            if c < 0:
                c = 0

        return ans`
  },
  stack_class: {
    title: "Stack Data Structure (OOP Class & Methods)",
    defaultInput: "",
    algorithmOverview:
      "This code defines a Stack data structure (Last-In, First-Out) using a Python class and tests push, pop, peek, size, and is_empty.",
    code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)


# Example usage
s = Stack()
s.push(10)
s.push(20)
s.push(30)

print(s.pop())    # 30
print(s.peek())   # 20
print(s.size())   # 2
print(s.is_empty())  # False`
  },
  binary_search: {
    title: "Binary Search (Two Pointers: left, right, mid)",
    defaultInput: "arr = [1, 3, 5, 7, 9, 11, 13], target = 7",
    algorithmOverview:
      "This code searches a sorted list for a target number by checking the middle index (mid) and cutting the search range (left to right) in half.",
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`
  },
  recursion_factorial: {
    title: "Recursion & Call Stack Scopes (Factorial)",
    defaultInput: "n = 4",
    algorithmOverview:
      "This code calculates the factorial of n (4 * 3 * 2 * 1 = 24) by creating isolated Local Scope frames on the call stack.",
    code: `def factorial(k: int) -> int:
    if k <= 1:
        return 1
    sub = factorial(k - 1)
    return k * sub

ans = factorial(n)
print("Factorial is:", ans)`
  }
};

function isPyInstance(val) {
  return Boolean(val && typeof val === "object" && !Array.isArray(val) && val.__class__);
}

class MemoryHeapTracker {
  constructor(formatValFn, getTypeFn) {
    this.formatVal = formatValFn;
    this.getType = getTypeFn;
    this.scalarCounter = 0x1000;
    this.containerCounter = 0x2000;
    this.instanceCounter = 0x3000;
    this.scalarPool = new Map();
    this.containerWeakMap = new WeakMap();
    this.heapRegistry = new Map();
  }

  getOrAllocate(val, stepIdx) {
    const pyType = this.getType(val);
    const valRepr = this.formatVal(val);

    if (isPyInstance(val)) {
      let addr = this.containerWeakMap.get(val);
      if (!addr) {
        addr = `@0x${this.instanceCounter.toString(16).toUpperCase().padStart(4, "0")}`;
        this.instanceCounter += 0x40;
        this.containerWeakMap.set(val, addr);
      }
      // Also ensure any list/dict attributes inside the instance are registered on the heap
      const attrEntries = Object.entries(val).filter(([k]) => k !== "__class__");
      for (const [, attrVal] of attrEntries) {
        if (Array.isArray(attrVal) || (attrVal && typeof attrVal === "object")) {
          this.getOrAllocate(attrVal, stepIdx);
        }
      }
      this.heapRegistry.set(addr, {
        address: addr,
        type: `${val.__class__} object`,
        repr: valRepr,
        isMutable: true,
        elements: attrEntries.map(([k, v]) => `${k}: ${this.formatVal(v)}`),
        rawElements: { ...val },
        lastTouchedStep: stepIdx
      });
      return addr;
    }

    if (Array.isArray(val) || (val && typeof val === "object")) {
      let addr = this.containerWeakMap.get(val);
      if (!addr) {
        addr = `@0x${this.containerCounter.toString(16).toUpperCase().padStart(4, "0")}`;
        this.containerCounter += 0x40;
        this.containerWeakMap.set(val, addr);
      }
      const isArr = Array.isArray(val);
      this.heapRegistry.set(addr, {
        address: addr,
        type: isArr ? "list" : "dict",
        repr: valRepr,
        isMutable: true,
        elements: isArr
          ? val.map((item) => this.formatVal(item))
          : Object.entries(val).map(([k, v]) => `${k}: ${this.formatVal(v)}`),
        rawElements: isArr ? [...val] : { ...val },
        lastTouchedStep: stepIdx
      });
      return addr;
    }

    const key = `${pyType}:${valRepr}`;
    let addr = this.scalarPool.get(key);
    if (!addr) {
      addr = `@0x${this.scalarCounter.toString(16).toUpperCase().padStart(4, "0")}`;
      this.scalarCounter += 0x08;
      this.scalarPool.set(key, addr);
    }
    this.heapRegistry.set(addr, {
      address: addr,
      type: pyType,
      repr: valRepr,
      isMutable: false,
      elements: null,
      rawElements: null,
      lastTouchedStep: stepIdx
    });
    return addr;
  }

  captureSnapshot(scopeFrames, stepIdx, changedVars = []) {
    const refCounts = new Map();
    const referencedBy = new Map();

    for (const addr of this.heapRegistry.keys()) {
      refCounts.set(addr, 0);
      referencedBy.set(addr, []);
    }

    for (const scope of scopeFrames) {
      const scopeTag = scope.scopeType === "GLOBAL" ? "Global" : scope.funcShortName || scope.title;
      for (const v of scope.variables) {
        if (v.address && this.heapRegistry.has(v.address)) {
          refCounts.set(v.address, (refCounts.get(v.address) || 0) + 1);
          referencedBy.get(v.address).push(`${scopeTag}.${v.name}`);
        }
        // If a variable points to an instance, mark its internal attribute containers as referenced too
        if (isPyInstance(v.rawObj)) {
          for (const [attrKey, attrVal] of Object.entries(v.rawObj)) {
            if (attrKey === "__class__") continue;
            if (Array.isArray(attrVal) || (attrVal && typeof attrVal === "object")) {
              const childAddr = this.containerWeakMap.get(attrVal);
              if (childAddr && this.heapRegistry.has(childAddr)) {
                refCounts.set(childAddr, (refCounts.get(childAddr) || 0) + 1);
                referencedBy.get(childAddr).push(`${v.name}.${attrKey}`);
              }
            }
          }
        }
      }
    }

    const changedAddrSet = new Set(changedVars.map((c) => c.address).filter(Boolean));
    const activeHeap = [];
    const gcHeap = [];

    for (const [addr, meta] of this.heapRegistry.entries()) {
      const rc = refCounts.get(addr) || 0;
      const entry = {
        ...meta,
        refCount: rc,
        referencedBy: referencedBy.get(addr) || [],
        isHighlighted: changedAddrSet.has(addr),
        gcStatus: rc > 0 ? "active" : "unreferenced"
      };
      if (rc > 0) {
        activeHeap.push(entry);
      } else {
        gcHeap.push(entry);
      }
    }

    return {
      stackScopes: scopeFrames,
      heapObjects: activeHeap,
      gcObjects: gcHeap.slice(-4),
      totalUnreferencedCount: gcHeap.length
    };
  }
}

class PythonExecutionEngine {
  constructor() {
    this.maxSteps = 500;
  }

  validateSupport(sourceCode) {
    if (!sourceCode || !sourceCode.trim()) {
      return {
        ok: false,
        line: 1,
        message: "The code editor is empty. Paste or write a Python program to analyze."
      };
    }

    const lines = sourceCode.replace(/\r\n/g, "\n").split("\n");

    const unsupportedRules = [
      { regex: /\b(open|eval|exec|__import__|input)\s*\(/, msg: "Restricted built-in function (`open`, `eval`, `exec`, `input`) is disabled for security." }
    ];

    let parenDepth = 0;
    let bracketDepth = 0;

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const stripped = this.stripInlineComment(raw);
      const trimmed = stripped.trim();
      if (!trimmed) continue;

      for (const rule of unsupportedRules) {
        if (rule.regex.test(trimmed)) {
          return {
            ok: false,
            line: i + 1,
            message: `Unsupported Syntax on Line ${i + 1}: ${rule.msg}`
          };
        }
      }

      for (const ch of trimmed) {
        if (ch === "(") parenDepth++;
        else if (ch === ")") parenDepth--;
        else if (ch === "[") bracketDepth++;
        else if (ch === "]") bracketDepth--;
      }

      if (parenDepth < 0 || bracketDepth < 0) {
        return {
          ok: false,
          line: i + 1,
          message: `SyntaxError on Line ${i + 1}: Unmatched closing parenthesis or bracket.`
        };
      }
    }

    if (parenDepth !== 0 || bracketDepth !== 0) {
      return {
        ok: false,
        line: lines.length,
        message: "SyntaxError: Unclosed parenthesis `(` or bracket `[` in code."
      };
    }

    return { ok: true, line: null, message: null };
  }

  parseInputAssignments(inputCode) {
    const inputVars = {};
    if (!inputCode || !inputCode.trim()) return inputVars;

    const segments = this.splitTopLevelSegments(inputCode);
    const dummyVars = {};

    for (const seg of segments) {
      const eqIdx = seg.indexOf("=");
      if (eqIdx !== -1) {
        const vName = seg.slice(0, eqIdx).trim();
        const vExpr = seg.slice(eqIdx + 1).trim();
        const val = this.evalExpr(vExpr, dummyVars, {}, {}, [], [], [], [], 1);
        dummyVars[vName] = val;
        inputVars[vName] = val;
      } else {
        const val = this.evalExpr(seg, dummyVars, {}, {}, [], [], [], [], 1);
        inputVars["nums"] = val;
      }
    }
    return inputVars;
  }

  splitTopLevelSegments(str) {
    const res = [];
    let cur = "";
    let depth = 0;
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (ch === "(" || ch === "[" || ch === "{") depth++;
        else if (ch === ")" || ch === "]" || ch === "}") depth--;
        else if ((ch === ";" || ch === "\n" || (ch === "," && depth === 0)) && cur.includes("=")) {
          res.push(cur.trim());
          cur = "";
          continue;
        }
      }
      cur += ch;
    }
    if (cur.trim()) res.push(cur.trim());
    return res;
  }

  trace(sourceCode, inputCode = "") {
    const validation = this.validateSupport(sourceCode);
    const rawLines = sourceCode.replace(/\r\n/g, "\n").split("\n");

    if (!validation.ok) {
      return {
        ok: false,
        errorType: "UNSUPPORTED_OR_SYNTAX",
        errorMessage: validation.message,
        errorLine: validation.line,
        rawLines,
        steps: [],
        cfg: { nodes: [], edges: [] }
      };
    }

    this.heapTracker = new MemoryHeapTracker(
      (v) => this.formatVal(v),
      (v) => this.getPythonType(v)
    );

    const statements = this.parseProgram(rawLines);
    const cfg = this.buildControlFlowGraph(statements);

    // Check if the program already has top-level executable statements (like `s = Stack()`, `print(...)`, `ans = ...`).
    // If it does, only inject user input variables that are explicitly referenced or when there are NO top-level statements!
    const hasTopLevelExec = statements.some(
      (s) => s.kind !== "CLASS" && s.kind !== "DEF"
    );

    let inputVars = {};
    try {
      if (inputCode && inputCode.trim()) {
        const parsedInputs = this.parseInputAssignments(inputCode);
        if (!hasTopLevelExec) {
          inputVars = parsedInputs;
        } else {
          // Only keep input vars whose names actually appear in the source code
          Object.entries(parsedInputs).forEach(([k, v]) => {
            const nameRegex = new RegExp(`\\b${k}\\b`);
            if (nameRegex.test(sourceCode)) {
              inputVars[k] = v;
            }
          });
        }
      }
    } catch (err) {
      return {
        ok: false,
        errorType: "INVALID_INPUT",
        errorMessage: `Invalid Input: ${err.message || err}`,
        errorLine: 1,
        rawLines,
        steps: [],
        cfg: { nodes: [], edges: [] }
      };
    }

    const steps = [];
    const stdout = [];
    const functions = {};
    const classes = {};
    const callStack = [
      {
        frameId: "global",
        frameName: "Global Scope",
        funcShortName: "Global",
        scopeType: "GLOBAL",
        vars: {},
        prevVars: {}
      }
    ];
    const loopStack = [];

    Object.entries(inputVars).forEach(([k, v]) => {
      const cloned = Array.isArray(v) ? [...v] : v;
      callStack[0].vars[k] = cloned;
      callStack[0].prevVars[k] = cloned;
      this.heapTracker.getOrAllocate(cloned, 0);
    });

    let finalReturnVal = null;

    try {
      const suiteRes = this.executeSuite(statements, callStack, functions, classes, steps, stdout, loopStack);
      if (suiteRes && suiteRes.returned) {
        finalReturnVal = suiteRes.value;
      }

      const fnNames = Object.keys(functions);
      const onlyDefinitionsRan = steps.every(
        (s) => s.eventType === "CLASS_DEF" || s.eventType === "METHOD_DEF" || s.eventType === "FUNC_DEF"
      );

      // Auto-invoke entry function/method ONLY when user pasted a class/function without top-level calls
      if (onlyDefinitionsRan && fnNames.length > 0) {
        const classNames = Object.keys(classes);
        if (classNames.length === 1 && classes[classNames[0]].methods["__init__"] && Object.keys(classes[classNames[0]].methods).length > 1) {
          // Data structure class without top-level calls: instantiate it
          const cls = classes[classNames[0]];
          const inst = { __class__: cls.name };
          if (cls.methods["__init__"]) {
            this.invokeFunctionNode(
              cls.methods["__init__"],
              [],
              [],
              callStack,
              functions,
              classes,
              steps,
              stdout,
              loopStack,
              cls.line,
              inst
            );
          }
          callStack[0].vars["instance"] = inst;
        } else {
          const entryName = fnNames.find((n) => n !== "__init__") || fnNames[0];
          const fnNode = functions[entryName];
          const argVals = this.resolveFunctionArguments(fnNode, callStack[0].vars);
          const selfInstance = fnNode.className ? { __class__: fnNode.className } : null;
          const callRes = this.invokeFunctionNode(
            fnNode,
            argVals,
            fnNode.params,
            callStack,
            functions,
            classes,
            steps,
            stdout,
            loopStack,
            fnNode.line,
            selfInstance
          );
          if (callRes && callRes.returned) {
            finalReturnVal = callRes.value;
          }
        }
      }
    } catch (err) {
      const errLine = err.line || 1;
      const errMsg = err.message || String(err);
      const activeFrame = callStack[callStack.length - 1];
      this.pushStepSnapshot(steps, {
        line: errLine,
        codeText: rawLines[errLine - 1] ? rawLines[errLine - 1].trim() : "",
        eventType: "EXCEPTION",
        callStack,
        beforeVars: this.cloneVarsMap(activeFrame.vars),
        changedVars: [],
        changedSummary: `Exception raised: ${errMsg}`,
        condition: null,
        loop: this.getCurrentLoopSnapshot(loopStack),
        operationDetail: { kind: "exception", message: errMsg },
        exprFrames: [
          {
            expr: rawLines[errLine - 1] ? rawLines[errLine - 1].trim() : "",
            focus: `Error: ${errMsg}`,
            shortCircuited: false
          }
        ],
        returnValue: null,
        stdout: [...stdout]
      });

      this.finalizeNextLines(steps);
      return {
        ok: false,
        errorType: "RUNTIME_EXCEPTION",
        errorMessage: errMsg,
        errorLine: errLine,
        rawLines,
        steps,
        cfg,
        finalResult: null
      };
    }

    this.finalizeNextLines(steps);

    // If the program printed output and had no top-level return value, use the printed output as final summary
    const finalOut =
      finalReturnVal !== null
        ? this.formatVal(finalReturnVal)
        : stdout.length > 0
        ? stdout.join(", ")
        : null;

    return {
      ok: true,
      errorType: null,
      errorMessage: null,
      errorLine: null,
      rawLines,
      steps,
      cfg,
      stdout,
      finalResult: finalOut
    };
  }

  pushStepSnapshot(steps, payload) {
    const stepIndex = steps.length + 1;
    const callStack = payload.callStack;
    const activeFrame = callStack[callStack.length - 1];
    const changedVars = payload.changedVars || [];

    const variables = this.buildInspectorRowsMulti(activeFrame.vars, changedVars, stepIndex);
    const scopeFrames = this.captureScopeFrames(callStack, changedVars, stepIndex);
    const memoryModel = this.heapTracker.captureSnapshot(
      scopeFrames,
      stepIndex,
      variables.filter((v) => v.status !== "unchanged")
    );

    steps.push({
      stepIndex,
      line: payload.line,
      nextLine: null,
      codeText: payload.codeText,
      eventType: payload.eventType,
      functionName: activeFrame.frameName,
      scopeType: activeFrame.scopeType || (callStack.length > 1 ? "LOCAL" : "GLOBAL"),
      beforeVars: payload.beforeVars,
      variables,
      changedVars,
      changedSummary: payload.changedSummary,
      condition: payload.condition || null,
      loop: payload.loop || null,
      operationDetail: payload.operationDetail || null,
      exprFrames:
        payload.exprFrames && payload.exprFrames.length
          ? payload.exprFrames
          : [{ expr: payload.codeText, focus: "Statement executed", shortCircuited: false }],
      scopeFrames,
      memoryModel,
      returnValue: payload.returnValue !== undefined ? payload.returnValue : null,
      stdout: payload.stdout || []
    });
  }

  captureScopeFrames(callStack, activeChangedVars, stepIdx) {
    return callStack.map((frame, idx) => {
      const isActive = idx === callStack.length - 1;
      const frameChanges = isActive ? activeChangedVars : [];
      const rows = this.buildInspectorRowsMulti(frame.vars, frameChanges, stepIdx);
      return {
        scopeId: frame.frameId || (idx === 0 ? "global" : `local_${idx}`),
        scopeType: frame.scopeType || (idx === 0 ? "GLOBAL" : "LOCAL"),
        title: idx === 0 ? "Global Scope" : `Local Scope: ${frame.funcShortName || frame.frameName}`,
        functionName: frame.frameName,
        funcShortName: frame.funcShortName || (idx === 0 ? "Global" : frame.frameName),
        isActive,
        variables: rows
      };
    });
  }

  resolveFunctionArguments(fnNode, globalVars) {
    const inputValues = Object.values(globalVars);
    const firstArray = inputValues.find((v) => Array.isArray(v)) || [-2, 1, -3, 4, -1, 2, 1, -5, 4];

    return fnNode.params.map((paramName, idx) => {
      if (paramName in globalVars) {
        return globalVars[paramName];
      }
      if (["arr", "nums", "items", "numbers", "a", "prices", "height", "values"].includes(paramName)) {
        if (fnNode.funcName.toLowerCase().includes("binary")) {
          const isSorted = firstArray.every((v, i, a) => i === 0 || a[i - 1] <= v);
          if (!isSorted) {
            const sortedArr = [...firstArray].sort((a, b) => a - b);
            globalVars[paramName] = sortedArr;
            return sortedArr;
          }
        }
        globalVars[paramName] = firstArray;
        return firstArray;
      }
      if (["s", "text", "word", "str_val", "pattern"].includes(paramName)) {
        const strVal = inputValues.find((v) => typeof v === "string") || "racecar";
        globalVars[paramName] = strVal;
        return strVal;
      }
      if (["target", "val", "key", "x", "k", "n", "m"].includes(paramName)) {
        if ("target" in globalVars) return globalVars["target"];
        if ("n" in globalVars && (paramName === "n" || paramName === "k")) return globalVars["n"];
        const targetVal =
          firstArray.length > 0 ? firstArray[Math.floor(firstArray.length / 2)] : 4;
        globalVars[paramName] = targetVal;
        return targetVal;
      }
      if (inputValues[idx] !== undefined) {
        globalVars[paramName] = inputValues[idx];
        return inputValues[idx];
      }
      globalVars[paramName] = firstArray;
      return firstArray;
    });
  }

  finalizeNextLines(steps) {
    for (let i = 0; i < steps.length; i++) {
      steps[i].nextLine = i + 1 < steps.length ? steps[i + 1].line : null;
    }
  }

  stripInlineComment(line) {
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "#" && !inSingle && !inDouble) {
        return line.slice(0, i);
      }
    }
    return line;
  }

  parseProgram(rawLines) {
    const items = [];
    for (let i = 0; i < rawLines.length; i++) {
      const stripped = this.stripInlineComment(rawLines[i]);
      const trimmed = stripped.trim();
      if (!trimmed) continue;
      // Ignore top-level import lines gracefully so standard typing/collections imports never crash
      if (/^(import|from)\s+/.test(trimmed)) continue;
      const indent = rawLines[i].match(/^\s*/)[0].length;
      items.push({ line: i + 1, indent, text: trimmed, raw: rawLines[i] });
    }
    return this.buildASTBlock(items, 0, items.length > 0 ? items[0].indent : 0).nodes;
  }

  buildASTBlock(items, startIdx, baseIndent) {
    const nodes = [];
    let i = startIdx;

    while (i < items.length) {
      const item = items[i];
      if (item.indent < baseIndent) break;

      if (item.text.startsWith("class ") && item.text.endsWith(":")) {
        const className = item.text.slice(6, -1).split("(")[0].trim();
        const bodyRes = this.parseChildSuite(items, i + 1, item.indent);
        nodes.push({
          kind: "CLASS",
          line: item.line,
          text: item.text,
          className,
          body: bodyRes.nodes
        });
        i = bodyRes.nextIdx;
      } else if (item.text.startsWith("def ") && item.text.endsWith(":")) {
        const match = item.text.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*)\)\s*(?:->\s*[^:]+)?\s*:$/);
        const funcName = match ? match[1] : "func";
        const rawParams = match && match[2].trim() ? this.splitTopLevelArgs(match[2]) : [];
        const allParams = rawParams.map((p) => p.split(":")[0].split("=")[0].trim()).filter(Boolean);
        const hasSelf = allParams[0] === "self";
        const params = allParams.filter((p) => p !== "self");
        const bodyRes = this.parseChildSuite(items, i + 1, item.indent);
        nodes.push({
          kind: "DEF",
          line: item.line,
          text: item.text,
          funcName,
          hasSelf,
          params,
          body: bodyRes.nodes
        });
        i = bodyRes.nextIdx;
      } else if (item.text.startsWith("if ") && item.text.endsWith(":")) {
        const branches = [];
        const cond = item.text.slice(3, -1).trim();
        const bodyRes = this.parseChildSuite(items, i + 1, item.indent);
        branches.push({
          type: "if",
          line: item.line,
          text: item.text,
          condition: cond,
          body: bodyRes.nodes
        });
        i = bodyRes.nextIdx;

        while (i < items.length && items[i].indent === item.indent) {
          const cur = items[i];
          if (cur.text.startsWith("elif ") && cur.text.endsWith(":")) {
            const elifCond = cur.text.slice(5, -1).trim();
            const elifBody = this.parseChildSuite(items, i + 1, cur.indent);
            branches.push({
              type: "elif",
              line: cur.line,
              text: cur.text,
              condition: elifCond,
              body: elifBody.nodes
            });
            i = elifBody.nextIdx;
          } else if (cur.text === "else:") {
            const elseBody = this.parseChildSuite(items, i + 1, cur.indent);
            branches.push({
              type: "else",
              line: cur.line,
              text: cur.text,
              condition: null,
              body: elseBody.nodes
            });
            i = elseBody.nextIdx;
            break;
          } else {
            break;
          }
        }
        nodes.push({
          kind: "IF_CHAIN",
          line: item.line,
          text: item.text,
          branches
        });
      } else if (item.text.startsWith("for ") && item.text.endsWith(":")) {
        const header = item.text.slice(4, -1).trim();
        const inIdx = header.indexOf(" in ");
        const iterVar = header.slice(0, inIdx).trim();
        const iterExpr = header.slice(inIdx + 4).trim();
        const bodyRes = this.parseChildSuite(items, i + 1, item.indent);
        nodes.push({
          kind: "FOR",
          line: item.line,
          text: item.text,
          iterVar,
          iterExpr,
          body: bodyRes.nodes
        });
        i = bodyRes.nextIdx;
      } else if (item.text.startsWith("while ") && item.text.endsWith(":")) {
        const condition = item.text.slice(6, -1).trim();
        const bodyRes = this.parseChildSuite(items, i + 1, item.indent);
        nodes.push({
          kind: "WHILE",
          line: item.line,
          text: item.text,
          condition,
          body: bodyRes.nodes
        });
        i = bodyRes.nextIdx;
      } else {
        nodes.push({
          kind: "STMT",
          line: item.line,
          text: item.text
        });
        i++;
      }
    }

    return { nodes, nextIdx: i };
  }

  parseChildSuite(items, nextIdx, parentIndent) {
    if (nextIdx >= items.length || items[nextIdx].indent <= parentIndent) {
      return { nodes: [], nextIdx };
    }
    return this.buildASTBlock(items, nextIdx, items[nextIdx].indent);
  }

  executeSuite(nodes, callStack, functions, classes, steps, stdout, loopStack) {
    for (const node of nodes) {
      if (steps.length >= this.maxSteps) {
        throw {
          line: node.line,
          message: `TimeoutError: Execution exceeded ${this.maxSteps} steps (possible infinite loop).`
        };
      }
      const res = this.executeNode(node, callStack, functions, classes, steps, stdout, loopStack);
      if (res && (res.returned || res.broke || res.continued)) {
        return res;
      }
    }
    return null;
  }

  executeNode(node, callStack, functions, classes, steps, stdout, loopStack) {
    const activeFrame = callStack[callStack.length - 1];

    if (node.kind === "CLASS") {
      classes[node.className] = { name: node.className, line: node.line, methods: {} };
      this.pushStepSnapshot(steps, {
        line: node.line,
        codeText: node.text,
        eventType: "CLASS_DEF",
        callStack,
        beforeVars: this.cloneVarsMap(activeFrame.vars),
        changedVars: [],
        changedSummary: `Defined class '${node.className}'`,
        condition: null,
        loop: this.getCurrentLoopSnapshot(loopStack),
        operationDetail: { kind: "class_def", className: node.className },
        exprFrames: [{ expr: node.text, focus: `Register class ${node.className}`, shortCircuited: false }],
        returnValue: null,
        stdout: [...stdout]
      });

      for (const child of node.body) {
        if (child.kind === "DEF") {
          child.className = node.className;
          classes[node.className].methods[child.funcName] = child;
          functions[child.funcName] = child;
          this.pushStepSnapshot(steps, {
            line: child.line,
            codeText: child.text,
            eventType: "METHOD_DEF",
            callStack,
            beforeVars: this.cloneVarsMap(activeFrame.vars),
            changedVars: [],
            changedSummary: `Defined method '${node.className}.${child.funcName}(${["self", ...child.params].join(", ")})'`,
            condition: null,
            loop: null,
            operationDetail: {
              kind: "method_def",
              className: node.className,
              funcName: child.funcName,
              params: child.params
            },
            exprFrames: [{ expr: child.text, focus: `Bind method ${node.className}.${child.funcName}`, shortCircuited: false }],
            returnValue: null,
            stdout: [...stdout]
          });
        }
      }
      return null;
    }

    if (node.kind === "DEF") {
      functions[node.funcName] = node;
      this.pushStepSnapshot(steps, {
        line: node.line,
        codeText: node.text,
        eventType: "FUNC_DEF",
        callStack,
        beforeVars: this.cloneVarsMap(activeFrame.vars),
        changedVars: [],
        changedSummary: `Defined function '${node.funcName}(${node.params.join(", ")})'`,
        condition: null,
        loop: this.getCurrentLoopSnapshot(loopStack),
        operationDetail: { kind: "func_def", funcName: node.funcName, params: node.params },
        exprFrames: [{ expr: node.text, focus: `Register function ${node.funcName} in Global Scope`, shortCircuited: false }],
        returnValue: null,
        stdout: [...stdout]
      });
      return null;
    }

    if (node.kind === "IF_CHAIN") {
      for (const branch of node.branches) {
        if (branch.type === "else") {
          this.pushStepSnapshot(steps, {
            line: branch.line,
            codeText: branch.text,
            eventType: "ELSE_BRANCH",
            callStack,
            beforeVars: this.cloneVarsMap(activeFrame.vars),
            changedVars: [],
            changedSummary: "Previous conditions were False → entering else block",
            condition: {
              expr: "else",
              leftExpr: "Previous conditions",
              leftVal: "False",
              operator: "->",
              rightExpr: "else",
              rightVal: "True",
              result: true
            },
            loop: this.getCurrentLoopSnapshot(loopStack),
            operationDetail: { kind: "else_branch" },
            exprFrames: [
              { expr: "else:", focus: "All previous if/elif conditions evaluated to False", shortCircuited: false }
            ],
            returnValue: null,
            stdout: [...stdout]
          });
          return this.executeSuite(branch.body, callStack, functions, classes, steps, stdout, loopStack);
        } else {
          const kw = branch.type === "elif" ? "elif " : "if ";
          const evalRes = this.evaluateConditionWithFrames(
            branch.condition,
            kw,
            ":",
            activeFrame.vars,
            functions,
            classes,
            callStack,
            steps,
            stdout,
            loopStack,
            branch.line
          );
          const condInfo = evalRes.condInfo;
          this.pushStepSnapshot(steps, {
            line: branch.line,
            codeText: branch.text,
            eventType: "CONDITION",
            callStack,
            beforeVars: this.cloneVarsMap(activeFrame.vars),
            changedVars: [],
            changedSummary: "Condition evaluated → " + (condInfo.result ? "True" : "False"),
            condition: condInfo,
            loop: this.getCurrentLoopSnapshot(loopStack),
            operationDetail: { kind: "condition", ...condInfo },
            exprFrames: evalRes.frames,
            returnValue: null,
            stdout: [...stdout]
          });
          if (condInfo.result) {
            return this.executeSuite(branch.body, callStack, functions, classes, steps, stdout, loopStack);
          }
        }
      }
      return null;
    }

    if (node.kind === "FOR") {
      const iterEval = this.evaluateExpressionWithSteps(
        node.iterExpr,
        `for ${node.iterVar} in `,
        ":",
        activeFrame.vars,
        functions,
        classes,
        callStack,
        steps,
        stdout,
        loopStack,
        node.line
      );
      const iterable = iterEval.value;
      const listItems = Array.isArray(iterable)
        ? iterable
        : typeof iterable === "string"
        ? Array.from(iterable)
        : iterable && typeof iterable === "object"
        ? Object.keys(iterable)
        : [];

      loopStack.push({
        loopType: "for",
        iterVar: node.iterVar,
        iterExpr: node.iterExpr,
        currentIteration: 0,
        totalIterations: listItems.length,
        currentItemValue: null,
        headerLine: node.line
      });

      for (let idx = 0; idx < listItems.length; idx++) {
        if (steps.length >= this.maxSteps) {
          throw {
            line: node.line,
            message: `TimeoutError: Execution exceeded ${this.maxSteps} steps (possible infinite loop).`
          };
        }

        const beforeMap = this.cloneVarsMap(activeFrame.vars);
        const itemVal = listItems[idx];
        const iterTargets = this.splitTopLevelArgs(node.iterVar);
        const changedVarsList = [];
        const summaryParts = [];

        if (iterTargets.length > 1 && Array.isArray(itemVal)) {
          iterTargets.forEach((tName, tIdx) => {
            const subVal = itemVal[tIdx];
            const prevV = activeFrame.vars[tName];
            const isCr = !(tName in activeFrame.vars);
            activeFrame.prevVars[tName] = prevV;
            activeFrame.vars[tName] = subVal;
            changedVarsList.push({ name: tName, status: isCr ? "created" : "updated", prevValue: prevV });
            summaryParts.push(`${tName} = ${this.formatVal(subVal)}`);
          });
        } else {
          const prevVal = activeFrame.vars[node.iterVar];
          const isCreated = !(node.iterVar in activeFrame.vars);
          activeFrame.prevVars[node.iterVar] = prevVal;
          activeFrame.vars[node.iterVar] = itemVal;
          changedVarsList.push({
            name: node.iterVar,
            status: isCreated ? "created" : "updated",
            prevValue: prevVal
          });
          summaryParts.push(
            isCreated
              ? `${node.iterVar}: (created) → ${this.formatVal(itemVal)}`
              : `${node.iterVar}: ${this.formatVal(prevVal)} → ${this.formatVal(itemVal)}`
          );
        }

        const topLoop = loopStack[loopStack.length - 1];
        topLoop.currentIteration = idx + 1;
        topLoop.currentItemValue = this.formatVal(itemVal);
        topLoop.currentIndex = idx;

        let indexedElementInfo = null;
        const arrCandidate = activeFrame.vars["nums"] || activeFrame.vars["arr"];
        const arrName = activeFrame.vars["nums"] ? "nums" : activeFrame.vars["arr"] ? "arr" : null;
        if (
          typeof itemVal === "number" &&
          Array.isArray(arrCandidate) &&
          itemVal >= 0 &&
          itemVal < arrCandidate.length
        ) {
          indexedElementInfo = {
            arrayName: arrName,
            indexVar: node.iterVar,
            indexVal: itemVal,
            elementVal: this.formatVal(arrCandidate[itemVal])
          };
        }

        const loopFrames = [
          { expr: node.text, focus: `Loop pass ${idx + 1} of ${listItems.length}`, shortCircuited: false },
          ...iterEval.frames.slice(1),
          {
            expr: `${node.iterVar} = ${this.formatVal(itemVal)}`,
            focus: `Bind loop variable ${node.iterVar} → ${this.formatVal(itemVal)}`,
            shortCircuited: false
          }
        ];

        this.pushStepSnapshot(steps, {
          line: node.line,
          codeText: node.text,
          eventType: "LOOP_ITER",
          callStack,
          beforeVars: beforeMap,
          changedVars: changedVarsList,
          changedSummary: summaryParts.join(", "),
          condition: {
            expr: `${node.iterVar} in ${node.iterExpr}`,
            leftExpr: `Iteration ${idx + 1} of ${listItems.length}`,
            leftVal: `${node.iterVar} = ${this.formatVal(itemVal)}`,
            operator: "in",
            rightExpr: node.iterExpr,
            rightVal: `len=${listItems.length}`,
            result: true
          },
          loop: {
            ...this.getCurrentLoopSnapshot(loopStack),
            indexedElementInfo
          },
          operationDetail: {
            kind: "for_iter",
            iterVar: node.iterVar,
            iterVal: this.formatVal(itemVal),
            iteration: idx + 1,
            total: listItems.length,
            indexedElementInfo
          },
          exprFrames: loopFrames,
          returnValue: null,
          stdout: [...stdout]
        });

        const bodyRes = this.executeSuite(
          node.body,
          callStack,
          functions,
          classes,
          steps,
          stdout,
          loopStack
        );
        if (bodyRes) {
          if (bodyRes.returned) {
            loopStack.pop();
            return bodyRes;
          }
          if (bodyRes.broke) {
            loopStack.pop();
            return null;
          }
          if (bodyRes.continued) {
            continue;
          }
        }
      }

      loopStack.pop();

      this.pushStepSnapshot(steps, {
        line: node.line,
        codeText: node.text,
        eventType: "LOOP_END",
        callStack,
        beforeVars: this.cloneVarsMap(activeFrame.vars),
        changedVars: [],
        changedSummary: `Loop finished all ${listItems.length} iterations`,
        condition: {
          expr: `${node.iterVar} in ${node.iterExpr}`,
          leftExpr: "Remaining items",
          leftVal: "0",
          operator: "==",
          rightExpr: "Exhausted",
          rightVal: "StopIteration",
          result: false
        },
        loop: {
          loopType: "for",
          iterVar: node.iterVar,
          iterExpr: node.iterExpr,
          currentIteration: listItems.length,
          totalIterations: listItems.length,
          isFinished: true
        },
        operationDetail: {
          kind: "for_end",
          iterVar: node.iterVar,
          total: listItems.length
        },
        exprFrames: [
          {
            expr: node.text,
            focus: `Sequence ${node.iterExpr} exhausted (${listItems.length}/${listItems.length} items done)`,
            shortCircuited: false
          }
        ],
        returnValue: null,
        stdout: [...stdout]
      });
      return null;
    }

    if (node.kind === "WHILE") {
      let iter = 0;
      loopStack.push({
        loopType: "while",
        condition: node.condition,
        currentIteration: 0,
        totalIterations: null,
        headerLine: node.line
      });

      while (true) {
        if (steps.length >= this.maxSteps) {
          throw {
            line: node.line,
            message: `TimeoutError: Execution exceeded ${this.maxSteps} steps (possible infinite loop).`
          };
        }
        iter++;
        loopStack[loopStack.length - 1].currentIteration = iter;

        const evalRes = this.evaluateConditionWithFrames(
          node.condition,
          "while ",
          ":",
          activeFrame.vars,
          functions,
          classes,
          callStack,
          steps,
          stdout,
          loopStack,
          node.line
        );
        const condInfo = evalRes.condInfo;

        this.pushStepSnapshot(steps, {
          line: node.line,
          codeText: node.text,
          eventType: condInfo.result ? "LOOP_ITER" : "LOOP_END",
          callStack,
          beforeVars: this.cloneVarsMap(activeFrame.vars),
          changedVars: [],
          changedSummary: condInfo.result
            ? `While condition True (Pass #${iter})`
            : `While condition False (Loop exits)`,
          condition: condInfo,
          loop: this.getCurrentLoopSnapshot(loopStack),
          operationDetail: {
            kind: "while_check",
            iteration: iter,
            ...condInfo
          },
          exprFrames: evalRes.frames,
          returnValue: null,
          stdout: [...stdout]
        });

        if (!condInfo.result) break;

        const bodyRes = this.executeSuite(
          node.body,
          callStack,
          functions,
          classes,
          steps,
          stdout,
          loopStack
        );
        if (bodyRes) {
          if (bodyRes.returned) {
            loopStack.pop();
            return bodyRes;
          }
          if (bodyRes.broke) {
            loopStack.pop();
            return null;
          }
          if (bodyRes.continued) {
            continue;
          }
        }
      }

      loopStack.pop();
      return null;
    }

    if (node.kind === "STMT") {
      return this.executeStatement(
        node,
        callStack,
        functions,
        classes,
        steps,
        stdout,
        loopStack
      );
    }

    return null;
  }

  resolveObjectRef(pathStr, scopeVars) {
    const parts = pathStr.split(".");
    let cur = scopeVars[parts[0]];
    for (let i = 1; i < parts.length; i++) {
      if (cur === null || cur === undefined) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  executeStatement(node, callStack, functions, classes, steps, stdout, loopStack) {
    const activeFrame = callStack[callStack.length - 1];
    const text = node.text;
    const beforeMap = this.cloneVarsMap(activeFrame.vars);

    // 1. break / pass
    if (text === "break" || text === "pass") {
      if (text === "pass") return null;
      this.pushStepSnapshot(steps, {
        line: node.line,
        codeText: text,
        eventType: "BREAK",
        callStack,
        beforeVars: beforeMap,
        changedVars: [],
        changedSummary: "Breaking out of current loop immediately",
        condition: null,
        loop: this.getCurrentLoopSnapshot(loopStack),
        operationDetail: { kind: "break" },
        exprFrames: [{ expr: "break", focus: "Exit active loop immediately", shortCircuited: false }],
        returnValue: null,
        stdout: [...stdout]
      });
      return { broke: true };
    }

    // 2. continue
    if (text === "continue") {
      this.pushStepSnapshot(steps, {
        line: node.line,
        codeText: text,
        eventType: "CONTINUE",
        callStack,
        beforeVars: beforeMap,
        changedVars: [],
        changedSummary: "Skipping rest of current loop pass (continue)",
        condition: null,
        loop: this.getCurrentLoopSnapshot(loopStack),
        operationDetail: { kind: "continue" },
        exprFrames: [{ expr: "continue", focus: "Jump to next loop iteration", shortCircuited: false }],
        returnValue: null,
        stdout: [...stdout]
      });
      return { continued: true };
    }

    // 3. return
    if (text === "return" || text.startsWith("return ")) {
      const expr = text === "return" ? "None" : text.slice(7).trim();
      const evalRes =
        expr === "None"
          ? { value: null, frames: [{ expr: "return None", focus: "Returns None", shortCircuited: false }] }
          : this.evaluateExpressionWithSteps(
              expr,
              "return ",
              "",
              activeFrame.vars,
              functions,
              classes,
              callStack,
              steps,
              stdout,
              loopStack,
              node.line
            );
      const retVal = evalRes.value;

      this.pushStepSnapshot(steps, {
        line: node.line,
        codeText: text,
        eventType: "RETURN",
        callStack,
        beforeVars: beforeMap,
        changedVars: [],
        changedSummary: `Returns ${this.formatVal(retVal)} from ${activeFrame.frameName}`,
        condition: null,
        loop: this.getCurrentLoopSnapshot(loopStack),
        operationDetail: {
          kind: "return",
          expr,
          returnVal: this.formatVal(retVal)
        },
        exprFrames: evalRes.frames,
        returnValue: this.formatVal(retVal),
        stdout: [...stdout]
      });
      return { returned: true, value: retVal };
    }

    // 4. print(...)
    if (text.startsWith("print(") && text.endsWith(")")) {
      const inner = text.slice(6, -1).trim();
      const args = this.splitTopLevelArgs(inner);
      const vals = [];
      const printFrames = [{ expr: text, focus: "Evaluate print(...) arguments", shortCircuited: false }];

      for (const a of args) {
        const subEval = this.evaluateExpressionWithSteps(
          a,
          "print(",
          ")",
          activeFrame.vars,
          functions,
          classes,
          callStack,
          steps,
          stdout,
          loopStack,
          node.line
        );
        vals.push(subEval.value);
        for (let i = 1; i < subEval.frames.length; i++) {
          printFrames.push(subEval.frames[i]);
        }
      }

      const outLine = vals
        .map((v) => (typeof v === "string" ? v : this.formatVal(v)))
        .join(" ");
      stdout.push(outLine);

      printFrames.push({
        expr: `print(${vals.map((v) => this.formatVal(v)).join(", ")})`,
        focus: `Console Output → ${outLine}`,
        shortCircuited: false
      });

      this.pushStepSnapshot(steps, {
        line: node.line,
        codeText: text,
        eventType: "PRINT",
        callStack,
        beforeVars: this.cloneVarsMap(activeFrame.vars),
        changedVars: [],
        changedSummary: `Printed: ${outLine}`,
        condition: null,
        loop: this.getCurrentLoopSnapshot(loopStack),
        operationDetail: { kind: "print", output: outLine },
        exprFrames: printFrames,
        returnValue: null,
        stdout: [...stdout]
      });
      return null;
    }

    // 4b. List / Set mutating methods on variables OR instance attributes (`arr.append(x)`, `self.items.append(item)`, `self.items.pop()`)
    const listMethodMatch = text.match(/^([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\.(append|pop|sort|reverse|add|remove|clear|insert)\((.*)\)$/);
    if (listMethodMatch) {
      const objPath = listMethodMatch[1];
      const methodName = listMethodMatch[2];
      const argStr = listMethodMatch[3].trim();
      const rootVarName = objPath.split(".")[0];
      const targetObj = this.resolveObjectRef(objPath, activeFrame.vars);

      if (Array.isArray(targetObj)) {
        const prevArr = [...targetObj];
        const rawArgs = argStr ? this.splitTopLevelArgs(argStr) : [];
        const argVals = rawArgs.map((a) =>
          this.evalExpr(a, activeFrame.vars, functions, classes, callStack, steps, stdout, loopStack, node.line)
        );
        const argVal = argVals.length > 0 ? argVals[0] : null;

        if (methodName === "append" || methodName === "add") targetObj.push(argVal);
        else if (methodName === "pop") {
          if (rawArgs.length > 0 && typeof argVal === "number") targetObj.splice(argVal, 1);
          else targetObj.pop();
        } else if (methodName === "insert" && argVals.length >= 2) {
          targetObj.splice(Number(argVals[0]), 0, argVals[1]);
        } else if (methodName === "remove") {
          const rIdx = targetObj.indexOf(argVal);
          if (rIdx !== -1) targetObj.splice(rIdx, 1);
        } else if (methodName === "clear") {
          targetObj.length = 0;
        } else if (methodName === "sort") {
          targetObj.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
        } else if (methodName === "reverse") {
          targetObj.reverse();
        }

        const changeObj = { name: rootVarName, status: "updated", prevValue: prevArr };
        this.pushStepSnapshot(steps, {
          line: node.line,
          codeText: text,
          eventType: "ASSIGN",
          callStack,
          beforeVars: beforeMap,
          changedVars: [changeObj],
          changedSummary: `${objPath}.${methodName}(${argVals.map((v) => this.formatVal(v)).join(", ")}) → ${this.formatVal(targetObj)}`,
          condition: null,
          loop: this.getCurrentLoopSnapshot(loopStack),
          operationDetail: {
            kind: "assign",
            target: objPath,
            isCreated: false,
            beforeVal: this.formatVal(prevArr),
            rhsExpr: text,
            substituted: `${objPath}.${methodName}(${argVals.map((v) => this.formatVal(v)).join(", ")})`,
            afterVal: this.formatVal(targetObj)
          },
          exprFrames: [
            { expr: text, focus: `Call .${methodName}() on ${objPath}`, shortCircuited: false },
            {
              expr: `${objPath} = ${this.formatVal(targetObj)}`,
              focus: `Heap list ${objPath} mutated in-place → ${this.formatVal(targetObj)}`,
              shortCircuited: false
            }
          ],
          returnValue: null,
          stdout: [...stdout]
        });
        return null;
      }
    }

    // 5. Augmented assignment (`c += nums[i]`, `self.count += 1`, `arr[i] += 1`)
    const augMatch = text.match(/^([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)?)\s*(\+=|-=|\*=|\/\/=|%=)\s*(.+)$/);
    if (augMatch) {
      const targetPath = augMatch[1];
      const augOp = augMatch[2];
      const baseOp = augOp.slice(0, -1);
      const rhsExpr = augMatch[3].trim();

      const prevVal = this.resolveObjectRef(targetPath, activeFrame.vars);
      if (prevVal === undefined) {
        throw {
          line: node.line,
          message: `NameError: '${targetPath}' is not defined before '${augOp}'`
        };
      }

      const rhsEval = this.evaluateExpressionWithSteps(
        rhsExpr,
        `${targetPath} ${augOp} `,
        "",
        activeFrame.vars,
        functions,
        classes,
        callStack,
        steps,
        stdout,
        loopStack,
        node.line
      );
      const rhsVal = rhsEval.value;

      let newVal;
      if (baseOp === "+") newVal = Array.isArray(prevVal) && Array.isArray(rhsVal) ? [...prevVal, ...rhsVal] : prevVal + rhsVal;
      else if (baseOp === "-") newVal = prevVal - rhsVal;
      else if (baseOp === "*") newVal = prevVal * rhsVal;
      else if (baseOp === "//") newVal = Math.floor(prevVal / rhsVal);
      else if (baseOp === "%") newVal = prevVal % rhsVal;

      const rootName = targetPath.split(".")[0];
      if (targetPath.includes(".")) {
        const [objName, attrName] = targetPath.split(".");
        if (activeFrame.vars[objName]) {
          activeFrame.vars[objName][attrName] = newVal;
        }
      } else {
        activeFrame.prevVars[targetPath] = prevVal;
        activeFrame.vars[targetPath] = newVal;
      }

      const changeObj = {
        name: rootName,
        status: "updated",
        prevValue: prevVal
      };

      const frames = [
        ...rhsEval.frames,
        {
          expr: `${targetPath} = ${this.formatVal(prevVal)} ${baseOp} ${this.formatVal(rhsVal)}`,
          focus: `Substitute current ${targetPath} (${this.formatVal(prevVal)})`,
          shortCircuited: false
        },
        {
          expr: `${targetPath} = ${this.formatVal(newVal)}`,
          focus: `Update ${targetPath} → ${this.formatVal(newVal)}`,
          shortCircuited: false
        }
      ];

      this.pushStepSnapshot(steps, {
        line: node.line,
        codeText: text,
        eventType: "AUG_ASSIGN",
        callStack,
        beforeVars: beforeMap,
        changedVars: [changeObj],
        changedSummary: `${targetPath}: ${this.formatVal(prevVal)} → ${this.formatVal(newVal)}`,
        condition: null,
        loop: this.getCurrentLoopSnapshot(loopStack),
        operationDetail: {
          kind: "aug_assign",
          target: targetPath,
          augOp,
          baseOp,
          beforeVal: this.formatVal(prevVal),
          rhsExpr,
          rhsVal: this.formatVal(rhsVal),
          afterVal: this.formatVal(newVal)
        },
        exprFrames: frames,
        returnValue: null,
        stdout: [...stdout]
      });
      return null;
    }

    // 6. Assignment (`left, right = ...`, `self.items = []`, `s = Stack()`, `arr[i] = x`)
    const eqPos = this.findSingleAssignmentEquals(text);
    if (eqPos !== -1) {
      const lhsRaw = text.slice(0, eqPos).trim();
      const rhsRaw = text.slice(eqPos + 1).trim();
      const lhsTargets = this.splitTopLevelArgs(lhsRaw);
      const rhsExprs = this.splitTopLevelArgs(rhsRaw);

      if (lhsTargets.length > 1) {
        const tupleFrames = [{ expr: text, focus: "Original tuple assignment", shortCircuited: false }];
        const evaluatedRhs = [];
        const currentRhsStrings = [...rhsExprs];

        for (let idx = 0; idx < rhsExprs.length; idx++) {
          const subRes = this.evaluateExpressionWithSteps(
            rhsExprs[idx],
            "",
            "",
            activeFrame.vars,
            functions,
            classes,
            callStack,
            steps,
            stdout,
            loopStack,
            node.line
          );
          evaluatedRhs.push(subRes.value);
          for (let fIdx = 1; fIdx < subRes.frames.length; fIdx++) {
            currentRhsStrings[idx] = subRes.frames[fIdx].expr;
            tupleFrames.push({
              expr: `${lhsTargets.join(", ")} = ${currentRhsStrings.join(", ")}`,
              focus: subRes.frames[fIdx].focus,
              shortCircuited: false
            });
          }
          currentRhsStrings[idx] = this.formatVal(subRes.value);
        }

        const valuesToAssign =
          evaluatedRhs.length === 1 && Array.isArray(evaluatedRhs[0])
            ? evaluatedRhs[0]
            : evaluatedRhs;

        const changedVarsList = [];
        const summaryParts = [];

        lhsTargets.forEach((targetStr, idx) => {
          const cleanTarget = targetStr.split(":")[0].trim();
          const newVal = valuesToAssign[idx];
          if (cleanTarget.includes(".")) {
            const [oName, aName] = cleanTarget.split(".");
            if (activeFrame.vars[oName]) activeFrame.vars[oName][aName] = newVal;
            changedVarsList.push({ name: oName, status: "updated", prevValue: activeFrame.vars[oName] });
          } else {
            const isCreated = !(cleanTarget in activeFrame.vars);
            const prevVal = activeFrame.vars[cleanTarget];
            activeFrame.prevVars[cleanTarget] = prevVal;
            activeFrame.vars[cleanTarget] = newVal;
            changedVarsList.push({
              name: cleanTarget,
              status: isCreated ? "created" : "updated",
              prevValue: prevVal
            });
          }
          summaryParts.push(`${cleanTarget} = ${this.formatVal(newVal)}`);
        });

        this.pushStepSnapshot(steps, {
          line: node.line,
          codeText: text,
          eventType: "ASSIGN",
          callStack,
          beforeVars: beforeMap,
          changedVars: changedVarsList,
          changedSummary: summaryParts.join(", "),
          condition: null,
          loop: this.getCurrentLoopSnapshot(loopStack),
          operationDetail: {
            kind: "assign",
            target: lhsTargets.join(", "),
            isCreated: changedVarsList.every((c) => c.status === "created"),
            beforeVal: "—",
            rhsExpr: rhsRaw,
            substituted: currentRhsStrings.join(", "),
            afterVal: summaryParts.join(", ")
          },
          exprFrames: tupleFrames,
          returnValue: null,
          stdout: [...stdout]
        });
        return null;
      }

      const cleanTarget = lhsRaw.split(":")[0].trim();

      // 6a. Attribute assignment (`self.items = []`, `node.next = None`)
      const attrAssignMatch = cleanTarget.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)$/);
      if (attrAssignMatch) {
        const objName = attrAssignMatch[1];
        const attrName = attrAssignMatch[2];
        const targetInstance = activeFrame.vars[objName];
        const evalRes = this.evaluateExpressionWithSteps(
          rhsRaw,
          `${cleanTarget} = `,
          "",
          activeFrame.vars,
          functions,
          classes,
          callStack,
          steps,
          stdout,
          loopStack,
          node.line
        );
        const newVal = evalRes.value;
        if (targetInstance && typeof targetInstance === "object") {
          const prevAttrVal = targetInstance[attrName];
          const isCreated = !(attrName in targetInstance);
          targetInstance[attrName] = newVal;
          const changeObj = { name: objName, status: "updated", prevValue: prevAttrVal };
          this.pushStepSnapshot(steps, {
            line: node.line,
            codeText: text,
            eventType: "ASSIGN",
            callStack,
            beforeVars: beforeMap,
            changedVars: [changeObj],
            changedSummary: `${cleanTarget} = ${this.formatVal(newVal)}`,
            condition: null,
            loop: this.getCurrentLoopSnapshot(loopStack),
            operationDetail: {
              kind: "assign",
              target: cleanTarget,
              isCreated,
              beforeVal: prevAttrVal !== undefined ? this.formatVal(prevAttrVal) : "—",
              rhsExpr: rhsRaw,
              substituted: this.formatVal(newVal),
              afterVal: this.formatVal(newVal)
            },
            exprFrames: evalRes.frames,
            returnValue: null,
            stdout: [...stdout]
          });
        }
        return null;
      }

      // 6b. Subscript assignment (`arr[i] = expr`, `self.items[i] = expr`, `seen[k] = v`)
      const indexAssignMatch = cleanTarget.match(/^([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\[(.+)\]$/);
      if (indexAssignMatch) {
        const arrPath = indexAssignMatch[1];
        const rootName = arrPath.split(".")[0];
        const idxVal = this.evalExpr(
          indexAssignMatch[2],
          activeFrame.vars,
          functions,
          classes,
          callStack,
          steps,
          stdout,
          loopStack,
          node.line
        );
        const evalRes = this.evaluateExpressionWithSteps(
          rhsRaw,
          `${arrPath}[${idxVal}] = `,
          "",
          activeFrame.vars,
          functions,
          classes,
          callStack,
          steps,
          stdout,
          loopStack,
          node.line
        );
        const newVal = evalRes.value;
        const container = this.resolveObjectRef(arrPath, activeFrame.vars);
        if (Array.isArray(container) || (container && typeof container === "object")) {
          const prevCopy = Array.isArray(container) ? [...container] : { ...container };
          const prevElem = container[idxVal];
          container[idxVal] = newVal;
          const changeObj = { name: rootName, status: "updated", prevValue: prevCopy };
          this.pushStepSnapshot(steps, {
            line: node.line,
            codeText: text,
            eventType: "ASSIGN",
            callStack,
            beforeVars: beforeMap,
            changedVars: [changeObj],
            changedSummary: `${arrPath}[${this.formatVal(idxVal)}] = ${this.formatVal(newVal)}`,
            condition: null,
            loop: this.getCurrentLoopSnapshot(loopStack),
            operationDetail: {
              kind: "assign",
              target: `${arrPath}[${this.formatVal(idxVal)}]`,
              isCreated: false,
              beforeVal: prevElem !== undefined ? this.formatVal(prevElem) : "—",
              rhsExpr: rhsRaw,
              substituted: this.formatVal(newVal),
              afterVal: this.formatVal(newVal)
            },
            exprFrames: evalRes.frames,
            returnValue: null,
            stdout: [...stdout]
          });
        }
        return null;
      }

      // 6c. Standard variable assignment (`s = Stack()`, `c = 0`, `ans = nums[0]`)
      const varName = cleanTarget;
      const rhsExpr = rhsRaw;
      const prevVal = activeFrame.vars[varName];
      const isCreated = !(varName in activeFrame.vars);
      const evalRes = this.evaluateExpressionWithSteps(
        rhsExpr,
        `${varName} = `,
        "",
        activeFrame.vars,
        functions,
        classes,
        callStack,
        steps,
        stdout,
        loopStack,
        node.line
      );
      const newVal = evalRes.value;
      const substituted =
        evalRes.frames.length > 1
          ? evalRes.frames[Math.min(1, evalRes.frames.length - 1)].expr.replace(`${varName} = `, "")
          : this.formatVal(newVal);

      activeFrame.prevVars[varName] = prevVal;
      activeFrame.vars[varName] = newVal;

      const changeObj = {
        name: varName,
        status: isCreated ? "created" : "updated",
        prevValue: prevVal
      };

      this.pushStepSnapshot(steps, {
        line: node.line,
        codeText: text,
        eventType: "ASSIGN",
        callStack,
        beforeVars: this.cloneVarsMap(activeFrame.vars),
        changedVars: [changeObj],
        changedSummary: isCreated
          ? `${varName}: (created) → ${this.formatVal(newVal)}`
          : `${varName}: ${this.formatVal(prevVal)} → ${this.formatVal(newVal)}`,
        condition: null,
        loop: this.getCurrentLoopSnapshot(loopStack),
        operationDetail: {
          kind: "assign",
          target: varName,
          isCreated,
          beforeVal: isCreated ? "—" : this.formatVal(prevVal),
          rhsExpr,
          substituted,
          afterVal: this.formatVal(newVal)
        },
        exprFrames: evalRes.frames,
        returnValue: null,
        stdout: [...stdout]
      });
      return null;
    }

    // 7. Standalone function or method call (`s.push(10)`, `helper(arr)`)
    if (/^[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*\(.*\)$/.test(text)) {
      this.evalExpr(text, activeFrame.vars, functions, classes, callStack, steps, stdout, loopStack, node.line);
      return null;
    }

    return null;
  }

  findSingleAssignmentEquals(str) {
    let depth = 0;
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (ch === "(" || ch === "[" || ch === "{") depth++;
        else if (ch === ")" || ch === "]" || ch === "}") depth--;
        else if (
          ch === "=" &&
          depth === 0 &&
          str[i - 1] !== "=" &&
          str[i - 1] !== "!" &&
          str[i - 1] !== "<" &&
          str[i - 1] !== ">" &&
          str[i + 1] !== "="
        ) {
          return i;
        }
      }
    }
    return -1;
  }

  invokeFunctionNode(
    fnNode,
    argVals,
    rawArgs,
    callStack,
    functions,
    classes,
    steps,
    stdout,
    loopStack,
    callerLine,
    selfInstance = null
  ) {
    const newVars = {};
    const paramBindings = [];
    const createdChanges = [];

    if (selfInstance) {
      newVars["self"] = selfInstance;
      const selfAddr = this.heapTracker ? this.heapTracker.getOrAllocate(selfInstance, steps.length + 1) : "@0x3000";
      paramBindings.push({
        param: "self",
        argExpr: "self",
        val: `${selfInstance.__class__} (${selfAddr})`
      });
      createdChanges.push({
        name: "self",
        status: "created",
        prevValue: undefined
      });
    }

    fnNode.params.forEach((p, idx) => {
      const val = argVals[idx];
      newVars[p] = val;
      paramBindings.push({
        param: p,
        argExpr: rawArgs[idx] || p,
        val: this.formatVal(val)
      });
      createdChanges.push({
        name: p,
        status: "created",
        prevValue: undefined
      });
    });

    const qualifiedName = fnNode.className ? `${fnNode.className}.${fnNode.funcName}` : fnNode.funcName;
    const newFrame = {
      frameId: `local_${callStack.length}_${qualifiedName}`,
      frameName: `${qualifiedName}(${fnNode.params.map((p, i) => `${p}=${this.formatVal(argVals[i])}`).join(", ")})`,
      funcShortName: `${qualifiedName}()`,
      scopeType: "LOCAL",
      vars: newVars,
      prevVars: {}
    };

    callStack.push(newFrame);

    this.pushStepSnapshot(steps, {
      line: fnNode.line,
      codeText: fnNode.text,
      eventType: "FUNC_CALL",
      callStack,
      beforeVars: {},
      changedVars: createdChanges,
      changedSummary: paramBindings.map((b) => `${b.param} = ${b.val}`).join(", "),
      condition: null,
      loop: null,
      operationDetail: {
        kind: "func_call",
        funcName: qualifiedName,
        callerLine,
        paramBindings
      },
      exprFrames: [
        {
          expr: `${qualifiedName}(${rawArgs.join(", ")})`,
          focus: `Enter Local Scope for ${qualifiedName}()`,
          shortCircuited: false
        },
        {
          expr: paramBindings.map((b) => `${b.param} = ${b.val}`).join(", ") || `${qualifiedName}()`,
          focus: "Bind local parameters to argument memory addresses",
          shortCircuited: false
        }
      ],
      returnValue: null,
      stdout: [...stdout]
    });

    const res = this.executeSuite(
      fnNode.body,
      callStack,
      functions,
      classes,
      steps,
      stdout,
      loopStack
    );
    callStack.pop();
    return res;
  }

  /* =========================================================
     TASK 2.1, 2.2 & 2.3: THONNY-STYLE STEP-BY-STEP SUB-EXPRESSION
     EVALUATOR WITH SHORT-CIRCUIT ('and' / 'or') SUPPORT
     ========================================================= */
  splitTopLevelLogical(expr, keyword) {
    const parts = [];
    let cur = "";
    let depth = 0;
    let inSingle = false;
    let inDouble = false;
    const token = ` ${keyword} `;

    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (ch === "(" || ch === "[" || ch === "{") depth++;
        else if (ch === ")" || ch === "]" || ch === "}") depth--;
        else if (depth === 0 && expr.slice(i, i + token.length) === token) {
          parts.push(cur.trim());
          cur = "";
          i += token.length - 1;
          continue;
        }
      }
      cur += ch;
    }
    if (cur.trim()) parts.push(cur.trim());
    return parts;
  }

  evaluateConditionWithFrames(
    condExpr,
    prefix,
    suffix,
    scopeVars,
    functions,
    classes,
    callStack,
    steps,
    stdout,
    loopStack,
    line
  ) {
    const evalRes = this.evaluateExpressionWithSteps(
      condExpr,
      prefix,
      suffix,
      scopeVars,
      functions,
      classes,
      callStack,
      steps,
      stdout,
      loopStack,
      line
    );
    const boolVal = Boolean(evalRes.value);

    const orParts = this.splitTopLevelLogical(condExpr, "or");
    const andParts = this.splitTopLevelLogical(condExpr, "and");
    if (orParts.length > 1 || andParts.length > 1) {
      const opWord = orParts.length > 1 ? "or" : "and";
      const clauses = orParts.length > 1 ? orParts : andParts;
      const firstFrame = evalRes.frames.find((f) => f.shortCircuited);
      const shortCircuited = Boolean(firstFrame);
      return {
        condInfo: {
          expr: condExpr,
          leftExpr: clauses[0],
          leftVal: shortCircuited ? (opWord === "and" ? "False" : "True") : this.formatVal(boolVal),
          operator: opWord,
          rightExpr: clauses.slice(1).join(` ${opWord} `),
          rightVal: shortCircuited ? "(short-circuited)" : this.formatVal(boolVal),
          result: boolVal,
          shortCircuited
        },
        frames: evalRes.frames
      };
    }

    const ops = [" not in ", " in ", "==", "!=", ">=", "<=", ">", "<"];
    for (const op of ops) {
      const idx = condExpr.indexOf(op);
      if (idx !== -1) {
        const leftExpr = condExpr.slice(0, idx).trim();
        const rightExpr = condExpr.slice(idx + op.length).trim();
        const leftVal = this.evalExpr(leftExpr, scopeVars, functions, classes, callStack, steps, stdout, loopStack, line);
        const rightVal = this.evalExpr(rightExpr, scopeVars, functions, classes, callStack, steps, stdout, loopStack, line);
        return {
          condInfo: {
            expr: condExpr,
            leftExpr,
            leftVal: this.formatVal(leftVal),
            operator: op.trim(),
            rightExpr,
            rightVal: this.formatVal(rightVal),
            result: boolVal
          },
          frames: evalRes.frames
        };
      }
    }

    return {
      condInfo: {
        expr: condExpr,
        leftExpr: condExpr,
        leftVal: this.formatVal(boolVal),
        operator: "is",
        rightExpr: "True",
        rightVal: "True",
        result: boolVal
      },
      frames: evalRes.frames
    };
  }

  evaluateExpressionWithSteps(
    rawExpr,
    prefix,
    suffix,
    scopeVars,
    functions,
    classes,
    callStack,
    steps,
    stdout,
    loopStack,
    lineNum
  ) {
    const trimmed = rawExpr.trim();
    const frames = [
      {
        expr: `${prefix}${trimmed}${suffix}`,
        highlightSub: trimmed,
        focus: "Original expression",
        shortCircuited: false
      }
    ];

    const pushFrame = (exprStr, highlightSub, focus, shortCircuited = false) => {
      const full = `${prefix}${exprStr}${suffix}`;
      if (frames[frames.length - 1].expr !== full || shortCircuited) {
        frames.push({ expr: full, highlightSub, focus, shortCircuited });
      }
    };

    // Task 2.3: Short-circuit `or` evaluation
    const orClauses = this.splitTopLevelLogical(trimmed, "or");
    if (orClauses.length > 1) {
      const evaluatedStrs = [];
      let finalVal = false;
      for (let i = 0; i < orClauses.length; i++) {
        const clause = orClauses[i];
        const sub = this.evaluateExpressionWithSteps(
          clause,
          "",
          "",
          scopeVars,
          functions,
          classes,
          callStack,
          steps,
          stdout,
          loopStack,
          lineNum
        );
        const cBool = Boolean(sub.value);
        evaluatedStrs.push(this.formatVal(cBool));
        const remaining = orClauses.slice(i + 1);
        const currentCombined = [...evaluatedStrs, ...remaining].join(" or ");
        pushFrame(
          currentCombined,
          this.formatVal(cBool),
          `Evaluate clause \`${clause}\` → \`${this.formatVal(cBool)}\``
        );
        if (cBool && remaining.length > 0) {
          pushFrame(
            "True",
            "True",
            `Short-circuit \`or\`: Left side is True, so \`${remaining.join(" or ")}\` is skipped!`,
            true
          );
          return { value: sub.value, frames };
        }
        finalVal = sub.value;
      }
      pushFrame(this.formatVal(Boolean(finalVal)), this.formatVal(Boolean(finalVal)), `Final result: ${this.formatVal(Boolean(finalVal))}`);
      return { value: finalVal, frames };
    }

    // Task 2.3: Short-circuit `and` evaluation
    const andClauses = this.splitTopLevelLogical(trimmed, "and");
    if (andClauses.length > 1) {
      const evaluatedStrs = [];
      let finalVal = true;
      for (let i = 0; i < andClauses.length; i++) {
        const clause = andClauses[i];
        const sub = this.evaluateExpressionWithSteps(
          clause,
          "",
          "",
          scopeVars,
          functions,
          classes,
          callStack,
          steps,
          stdout,
          loopStack,
          lineNum
        );
        const cBool = Boolean(sub.value);
        evaluatedStrs.push(this.formatVal(cBool));
        const remaining = andClauses.slice(i + 1);
        const currentCombined = [...evaluatedStrs, ...remaining].join(" and ");
        pushFrame(
          currentCombined,
          this.formatVal(cBool),
          `Evaluate clause \`${clause}\` → \`${this.formatVal(cBool)}\``
        );
        if (!cBool && remaining.length > 0) {
          pushFrame(
            "False",
            "False",
            `Short-circuit \`and\`: \`${clause}\` is False, so \`${remaining.join(" and ")}\` is skipped safely!`,
            true
          );
          return { value: false, frames };
        }
        finalVal = sub.value;
      }
      pushFrame(this.formatVal(Boolean(finalVal)), this.formatVal(Boolean(finalVal)), `Final result: ${this.formatVal(Boolean(finalVal))}`);
      return { value: finalVal, frames };
    }

    // IMPORTANT: Evaluate the expression ONCE so method calls with side effects (`s.pop()`, `Stack()`) only run once!
    let working = trimmed;

    // Step 1: Show scalar variable substitutions for visual clarity (without mutating state)
    const scalarNames = Object.keys(scopeVars)
      .filter((k) => {
        const v = scopeVars[k];
        return k !== "self" && !Array.isArray(v) && (typeof v !== "object" || v === null);
      })
      .sort((a, b) => b.length - a.length);

    for (const vName of scalarNames) {
      const regex = new RegExp(`\\b${vName}\\b`, "g");
      if (regex.test(working)) {
        const vVal = this.formatVal(scopeVars[vName]);
        working = working.replace(regex, vVal);
        pushFrame(working, vVal, `Look up variable \`${vName}\` → \`${vVal}\``);
      }
    }

    // Step 2: Show attribute lookups like `self.items` if present inside `len(self.items)` or `self.items[-1]`
    const attrRegex = /\b([a-zA-Z_]\w*\.[a-zA-Z_]\w*)\b(?!\s*\()/;
    if (attrRegex.test(working)) {
      const m = working.match(attrRegex);
      const attrPath = m[1];
      const resolvedAttr = this.resolveObjectRef(attrPath, scopeVars);
      if (resolvedAttr !== undefined) {
        const attrStr = this.formatVal(resolvedAttr);
        const previewWork = working.replace(attrPath, attrStr);
        pushFrame(previewWork, attrStr, `Look up attribute \`${attrPath}\` → \`${attrStr}\``);
        working = previewWork;
      }
    }

    // Step 3: Evaluate the full expression exactly ONCE
    const finalVal = this.evalExpr(
      trimmed,
      scopeVars,
      functions,
      classes,
      callStack,
      steps,
      stdout,
      loopStack,
      lineNum
    );
    const finalStr = this.formatVal(finalVal);
    if (working !== finalStr) {
      pushFrame(finalStr, finalStr, `Evaluate \`${trimmed}\` → \`${finalStr}\``);
    }

    return { value: finalVal, frames };
  }

  evalExpr(expr, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum) {
    const trimmed = expr.trim();

    if (trimmed === "[]" || trimmed === "list()") return [];
    if (trimmed === "{}" || trimmed === "dict()") return {};
    if (trimmed === "set()") return [];
    if (trimmed === "None") return null;
    if (trimmed === "True") return true;
    if (trimmed === "False") return false;
    if (trimmed === "float('inf')" || trimmed === 'float("inf")') return Infinity;
    if (trimmed === "float('-inf')" || trimmed === 'float("-inf")') return -Infinity;

    // Unary `not <expr>` (`if not self.is_empty():`, `not found`)
    if (/^not\s+/.test(trimmed) && this.splitTopLevelLogical(trimmed, "and").length === 1 && this.splitTopLevelLogical(trimmed, "or").length === 1) {
      const innerNot = trimmed.replace(/^not\s+/, "").trim();
      const innerVal = this.evalExpr(innerNot, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
      return !this.isPythonTruthy(innerVal);
    }

    // Task 2.3: Top-level short-circuit `or` inside evalExpr
    const orParts = this.splitTopLevelLogical(trimmed, "or");
    if (orParts.length > 1) {
      let lastVal = false;
      for (const part of orParts) {
        lastVal = this.evalExpr(part, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
        if (this.isPythonTruthy(lastVal)) return lastVal;
      }
      return lastVal;
    }

    // Task 2.3: Top-level short-circuit `and` inside evalExpr
    const andParts = this.splitTopLevelLogical(trimmed, "and");
    if (andParts.length > 1) {
      let lastVal = true;
      for (const part of andParts) {
        lastVal = this.evalExpr(part, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
        if (!this.isPythonTruthy(lastVal)) return false;
      }
      return lastVal;
    }

    // Ternary conditional expression (`a if cond else b`)
    const ternaryMatch = trimmed.match(/^(.+?)\s+if\s+(.+?)\s+else\s+(.+)$/);
    if (ternaryMatch) {
      const condVal = this.evalExpr(ternaryMatch[2], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
      return this.isPythonTruthy(condVal)
        ? this.evalExpr(ternaryMatch[1], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum)
        : this.evalExpr(ternaryMatch[3], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
    }

    // List comprehension (`[expr for var in iterExpr]` or `[expr for var in iterExpr if cond]`)
    const listCompMatch = trimmed.match(/^\[(.+?)\s+for\s+([a-zA-Z_]\w*)\s+in\s+(.+?)(?:\s+if\s+(.+))?\]$/);
    if (listCompMatch) {
      const itemExpr = listCompMatch[1].trim();
      const iterVar = listCompMatch[2].trim();
      const iterExpr = listCompMatch[3].trim();
      const condExpr = listCompMatch[4] ? listCompMatch[4].trim() : null;
      const iterable = this.evalExpr(iterExpr, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
      const items = Array.isArray(iterable) ? iterable : Array.from(iterable || []);
      const out = [];
      for (const item of items) {
        const subScope = { ...scopeVars, [iterVar]: item };
        if (condExpr) {
          const cVal = this.evalExpr(condExpr, subScope, functions, classes, callStack, steps, stdout, loopStack, lineNum);
          if (!this.isPythonTruthy(cVal)) continue;
        }
        out.push(this.evalExpr(itemExpr, subScope, functions, classes, callStack, steps, stdout, loopStack, lineNum));
      }
      return out;
    }

    // List repetition (`[0] * n` or `[None] * 5`)
    const listMultMatch = trimmed.match(/^\[([^\[\]]+)\]\s*\*\s*(.+)$/);
    if (listMultMatch) {
      const elemVal = this.evalExpr(listMultMatch[1], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
      const countVal = Number(this.evalExpr(listMultMatch[2], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum));
      return Array.from({ length: Math.max(0, countVal) }, () => elemVal);
    }

    // Class instantiation (`Stack()`, `Node(10)`, `Solution()`)
    const classInitMatch = trimmed.match(/^([a-zA-Z_]\w*)\((.*)\)$/);
    if (classInitMatch && classes[classInitMatch[1]]) {
      const cls = classes[classInitMatch[1]];
      const rawArgs = classInitMatch[2].trim() ? this.splitTopLevelArgs(classInitMatch[2]) : [];
      const argVals = rawArgs.map((a) =>
        this.evalExpr(a, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum)
      );
      const instance = { __class__: cls.name };
      this.heapTracker.getOrAllocate(instance, steps.length + 1);
      if (cls.methods["__init__"]) {
        this.invokeFunctionNode(
          cls.methods["__init__"],
          argVals,
          rawArgs,
          callStack,
          functions,
          classes,
          steps,
          stdout,
          loopStack,
          lineNum,
          instance
        );
      }
      return instance;
    }

    // Object / Instance / Built-in Method Call (`s.push(10)`, `s.pop()`, `self.is_empty()`, `self.items.pop()`, `s.lower()`)
    const dotCallMatch = trimmed.match(/^([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\.([a-zA-Z_]\w*)\((.*)\)$/);
    if (dotCallMatch) {
      const targetPath = dotCallMatch[1];
      const methodName = dotCallMatch[2];
      const rawArgs = dotCallMatch[3].trim() ? this.splitTopLevelArgs(dotCallMatch[3]) : [];
      const argVals = rawArgs.map((a) =>
        this.evalExpr(a, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum)
      );
      const targetObj = this.resolveObjectRef(targetPath, scopeVars);

      // 1. User-defined class instance method (`s.push(10)`, `s.pop()`, `self.is_empty()`)
      if (isPyInstance(targetObj)) {
        const cls = classes[targetObj.__class__];
        if (cls && cls.methods[methodName]) {
          const fnNode = cls.methods[methodName];
          const res = this.invokeFunctionNode(
            fnNode,
            argVals,
            rawArgs,
            callStack,
            functions,
            classes,
            steps,
            stdout,
            loopStack,
            lineNum,
            targetObj
          );
          return res && res.returned ? res.value : null;
        }
      }

      // 2. Built-in list methods inside expressions (`return self.items.pop()`, `arr.index(x)`, `arr.count(x)`)
      if (Array.isArray(targetObj)) {
        if (methodName === "pop") {
          if (targetObj.length === 0) {
            throw { line: lineNum, message: "IndexError: pop from empty list" };
          }
          if (argVals.length > 0 && typeof argVals[0] === "number") {
            return targetObj.splice(argVals[0], 1)[0];
          }
          return targetObj.pop();
        }
        if (methodName === "append") {
          targetObj.push(argVals[0]);
          return null;
        }
        if (methodName === "index") return targetObj.indexOf(argVals[0]);
        if (methodName === "count") return targetObj.filter((x) => x === argVals[0]).length;
      }

      // 3. Built-in string methods (`s.lower()`, `s.upper()`, `s.strip()`, `s.split()`, `s.replace()`)
      if (typeof targetObj === "string") {
        if (methodName === "lower") return targetObj.toLowerCase();
        if (methodName === "upper") return targetObj.toUpperCase();
        if (methodName === "strip") return targetObj.trim();
        if (methodName === "split") return argVals[0] ? targetObj.split(argVals[0]) : targetObj.trim().split(/\s+/);
        if (methodName === "replace") return targetObj.split(String(argVals[0])).join(String(argVals[1] || ""));
        if (methodName === "startswith") return targetObj.startsWith(String(argVals[0]));
        if (methodName === "endswith") return targetObj.endsWith(String(argVals[0]));
      }

      // 4. Built-in dict methods (`d.get(k, default)`, `d.keys()`, `d.values()`, `d.items()`)
      if (targetObj && typeof targetObj === "object" && !Array.isArray(targetObj)) {
        if (methodName === "get") {
          return argVals[0] in targetObj ? targetObj[argVals[0]] : argVals[1] !== undefined ? argVals[1] : null;
        }
        if (methodName === "keys") return Object.keys(targetObj);
        if (methodName === "values") return Object.values(targetObj);
        if (methodName === "items") return Object.entries(targetObj);
      }
    }

    const rangeMatch = trimmed.match(/^range\((.+)\)$/);
    if (rangeMatch) {
      const parts = this.splitTopLevelArgs(rangeMatch[1]).map((a) =>
        Number(this.evalExpr(a, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum))
      );
      let start = 0,
        stop = 0,
        step = 1;
      if (parts.length === 1) stop = parts[0];
      else if (parts.length === 2) {
        start = parts[0];
        stop = parts[1];
      } else if (parts.length >= 3) {
        start = parts[0];
        stop = parts[1];
        step = parts[2] || 1;
      }
      const arr = [];
      if (step > 0) {
        for (let v = start; v < stop; v += step) arr.push(v);
      } else if (step < 0) {
        for (let v = start; v > stop; v += step) arr.push(v);
      }
      return arr;
    }

    const builtinMatch = trimmed.match(/^(len|min|max|abs|sum|enumerate|sorted|reversed|set|dict)\((.*)\)$/);
    if (builtinMatch) {
      const fnName = builtinMatch[1];
      const args = builtinMatch[2].trim()
        ? this.splitTopLevelArgs(builtinMatch[2]).map((a) =>
            this.evalExpr(a, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum)
          )
        : [];
      if (fnName === "len") {
        const x = args[0];
        if (x && typeof x.length === "number") return x.length;
        if (x && typeof x === "object") return Object.keys(x).length;
        return 0;
      }
      if (fnName === "abs") return Math.abs(args[0]);
      if (fnName === "sum") return Array.isArray(args[0]) ? args[0].reduce((a, b) => a + b, 0) : 0;
      if (fnName === "min") return Array.isArray(args[0]) ? Math.min(...args[0]) : Math.min(...args);
      if (fnName === "max") return Array.isArray(args[0]) ? Math.max(...args[0]) : Math.max(...args);
      if (fnName === "enumerate") {
        const seq = Array.isArray(args[0]) ? args[0] : Array.from(args[0] || []);
        const start = typeof args[1] === "number" ? args[1] : 0;
        return seq.map((v, i) => [start + i, v]);
      }
      if (fnName === "sorted") {
        const seq = Array.isArray(args[0]) ? [...args[0]] : Array.from(args[0] || []);
        return seq.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
      }
      if (fnName === "reversed") {
        const seq = Array.isArray(args[0]) ? [...args[0]] : Array.from(args[0] || []);
        return seq.reverse();
      }
      if (fnName === "set") {
        const seq = Array.isArray(args[0]) ? args[0] : Array.from(args[0] || []);
        return Array.from(new Set(seq));
      }
      if (fnName === "dict") {
        return args[0] && typeof args[0] === "object" ? { ...args[0] } : {};
      }
    }

    // Membership check (`x in arr`, `x not in seen`, `ch in s`)
    const notInMatch = trimmed.match(/^(.+?)\s+not\s+in\s+(.+)$/);
    if (notInMatch) {
      const leftVal = this.evalExpr(notInMatch[1], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
      const rightVal = this.evalExpr(notInMatch[2], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
      if (Array.isArray(rightVal)) return !rightVal.includes(leftVal);
      if (typeof rightVal === "string") return !rightVal.includes(String(leftVal));
      if (rightVal && typeof rightVal === "object") return !(leftVal in rightVal);
      return true;
    }

    const inMatch = trimmed.match(/^(.+?)\s+in\s+(.+)$/);
    if (inMatch) {
      const leftVal = this.evalExpr(inMatch[1], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
      const rightVal = this.evalExpr(inMatch[2], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
      if (Array.isArray(rightVal)) return rightVal.includes(leftVal);
      if (typeof rightVal === "string") return rightVal.includes(String(leftVal));
      if (rightVal && typeof rightVal === "object") return leftVal in rightVal;
      return false;
    }

    // List / String slicing (`arr[a:b]`, `self.items[a:b]`, `s[::-1]`)
    const sliceMatch = trimmed.match(/^([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\[([^\[\]]*:[^\[\]]*)\]$/);
    if (sliceMatch) {
      const seqObj = this.resolveObjectRef(sliceMatch[1], scopeVars);
      if (Array.isArray(seqObj) || typeof seqObj === "string") {
        const parts = sliceMatch[2].split(":").map((p) => p.trim());
        const len = seqObj.length;
        if (parts.length === 3 && parts[2] === "-1" && !parts[0] && !parts[1]) {
          return Array.isArray(seqObj) ? [...seqObj].reverse() : Array.from(seqObj).reverse().join("");
        }
        const start = parts[0] ? Number(this.evalExpr(parts[0], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum)) : 0;
        const end = parts[1] ? Number(this.evalExpr(parts[1], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum)) : len;
        return seqObj.slice(start, end);
      }
    }

    // Indexing on variable OR attribute (`nums[i]`, `self.items[-1]`, `seen[x]`)
    const indexMatch = trimmed.match(/^([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\[([^\[\]]+)\]$/);
    if (indexMatch) {
      const arrPath = indexMatch[1];
      const idxVal = this.evalExpr(indexMatch[2], scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
      const arrObj = this.resolveObjectRef(arrPath, scopeVars);
      if (Array.isArray(arrObj) || typeof arrObj === "string") {
        const normalizedIdx = idxVal < 0 ? arrObj.length + idxVal : idxVal;
        if (normalizedIdx < 0 || normalizedIdx >= arrObj.length) {
          throw {
            line: lineNum,
            message: `IndexError: index [${idxVal}] out of range for '${arrPath}' (length ${arrObj.length})`
          };
        }
        return arrObj[normalizedIdx];
      }
      if (arrObj && typeof arrObj === "object") {
        if (!(idxVal in arrObj)) {
          throw { line: lineNum, message: `KeyError: ${this.formatVal(idxVal)} not found in '${arrPath}'` };
        }
        return arrObj[idxVal];
      }
      throw { line: lineNum, message: `TypeError: '${arrPath}' is not subscriptable` };
    }

    // Standalone or `Solution().method(...)` function call
    const methodCallMatch = trimmed.match(/^(?:[a-zA-Z_]\w*\(\)\.)?([a-zA-Z_]\w*)\((.*)\)$/);
    if (methodCallMatch && functions[methodCallMatch[1]]) {
      const fnNode = functions[methodCallMatch[1]];
      const rawArgs = methodCallMatch[2].trim() ? this.splitTopLevelArgs(methodCallMatch[2]) : [];
      const argVals = rawArgs.map((a) =>
        this.evalExpr(a, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum)
      );
      const selfObj = fnNode.className ? { __class__: fnNode.className } : null;
      const res = this.invokeFunctionNode(
        fnNode,
        argVals,
        rawArgs,
        callStack,
        functions,
        classes,
        steps,
        stdout,
        loopStack,
        lineNum,
        selfObj
      );
      return res && res.returned ? res.value : null;
    }

    // Direct attribute access (`self.items`, `node.val`)
    if (/^[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)+$/.test(trimmed)) {
      const resolved = this.resolveObjectRef(trimmed, scopeVars);
      if (resolved !== undefined) return resolved;
    }

    // Pre-resolve any negative indexing or attribute indexing inside compound expressions (`self.items[-1] + 1`, `arr[mid] == target`)
    let preprocessed = trimmed;
    const subIndexRegex = /\b([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\[([^\[\]:]+)\]/g;
    let idxMatch;
    while ((idxMatch = subIndexRegex.exec(trimmed)) !== null) {
      const aPath = idxMatch[1];
      const iExpr = idxMatch[2];
      const aObj = this.resolveObjectRef(aPath, scopeVars);
      if (Array.isArray(aObj) || typeof aObj === "string") {
        const iVal = this.evalExpr(iExpr, scopeVars, functions, classes, callStack, steps, stdout, loopStack, lineNum);
        const norm = iVal < 0 ? aObj.length + iVal : iVal;
        if (norm < 0 || norm >= aObj.length) {
          throw {
            line: lineNum,
            message: `IndexError: list index [${iVal}] out of range for '${aPath}' (length ${aObj.length})`
          };
        }
        preprocessed = preprocessed.replace(idxMatch[0], `${aPath}[${norm}]`);
      }
    }

    let jsExpr = preprocessed
      .replace(/\/\//g, "___INTDIV___")
      .replace(/\band\b/g, "&&")
      .replace(/\bor\b/g, "||")
      .replace(/\bnot\s+/g, "!")
      .replace(/\bTrue\b/g, "true")
      .replace(/\bFalse\b/g, "false")
      .replace(/\bNone\b/g, "null");

    if (jsExpr.includes("___INTDIV___")) {
      const parts = jsExpr.split("___INTDIV___");
      if (parts.length === 2) {
        jsExpr = `Math.floor((${parts[0]}) / (${parts[1]}))`;
      }
    }

    const pyBuiltins = {
      len: (x) => {
        if (x && typeof x.length === "number") return x.length;
        if (x && typeof x === "object") return Object.keys(x).length;
        return 0;
      },
      abs: (x) => Math.abs(x),
      min: (...args) => (args.length === 1 && Array.isArray(args[0]) ? Math.min(...args[0]) : Math.min(...args)),
      max: (...args) => (args.length === 1 && Array.isArray(args[0]) ? Math.max(...args[0]) : Math.max(...args)),
      sum: (arr) => (Array.isArray(arr) ? arr.reduce((a, b) => a + b, 0) : 0),
      int: (x) => parseInt(x, 10) || 0,
      float: (x) => (x === "inf" ? Infinity : x === "-inf" ? -Infinity : parseFloat(x) || 0.0),
      str: (x) => String(x),
      bool: (x) => this.isPythonTruthy(x),
      round: (x) => Math.round(x),
      list: (x) => (Array.isArray(x) ? [...x] : Array.from(x || [])),
      set: (x) => Array.from(new Set(Array.isArray(x) ? x : Array.from(x || []))),
      dict: (x) => (x && typeof x === "object" ? { ...x } : {}),
      sorted: (x) => (Array.isArray(x) ? [...x] : Array.from(x || [])).sort((a, b) => (a > b ? 1 : a < b ? -1 : 0)),
      reversed: (x) => (Array.isArray(x) ? [...x] : Array.from(x || [])).reverse(),
      enumerate: (x, start = 0) => (Array.isArray(x) ? x : Array.from(x || [])).map((v, i) => [start + i, v])
    };

    const combinedScope = { ...pyBuiltins, ...scopeVars };
    const keys = Object.keys(combinedScope);
    const vals = keys.map((k) => combinedScope[k]);
    try {
      const fn = new Function(...keys, `return (${jsExpr});`);
      const out = fn(...vals);
      if (typeof out === "number" && Number.isNaN(out)) {
        throw new Error("ValueError: invalid numeric operation");
      }
      return out;
    } catch (e) {
      throw { line: lineNum, message: e.message || String(e) };
    }
  }

  isPythonTruthy(val) {
    if (val === null || val === undefined || val === false || val === 0 || val === "") return false;
    if (Array.isArray(val)) return val.length > 0;
    if (isPyInstance(val)) return true;
    if (typeof val === "object") return Object.keys(val).length > 0;
    return Boolean(val);
  }

  getCurrentLoopSnapshot(loopStack) {
    if (!loopStack.length) return null;
    return { ...loopStack[loopStack.length - 1] };
  }

  cloneVarsMap(vars) {
    const out = {};
    Object.keys(vars).forEach((k) => {
      out[k] = this.formatVal(vars[k]);
    });
    return out;
  }

  buildInspectorRowsMulti(vars, changedVarsList = [], stepIdx = 0) {
    return Object.keys(vars).map((name) => {
      const val = vars[name];
      const found = (changedVarsList || []).find((c) => c.name === name);
      let status = "unchanged";
      let prevStr = this.formatVal(val);

      if (found) {
        status = found.status;
        prevStr = found.status === "created" ? "—" : this.formatVal(found.prevValue);
      }

      const address = this.heapTracker ? this.heapTracker.getOrAllocate(val, stepIdx) : "@0x1000";

      return {
        name,
        address,
        previous: prevStr,
        current: this.formatVal(val),
        rawValue: Array.isArray(val) ? [...val] : val && typeof val === "object" ? { ...val } : val,
        rawObj: val,
        type: this.getPythonType(val),
        status
      };
    });
  }

  splitTopLevelArgs(str) {
    if (!str.trim()) return [];
    const res = [];
    let current = "";
    let depth = 0;
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (ch === "(" || ch === "[" || ch === "{") depth++;
        else if (ch === ")" || ch === "]" || ch === "}") depth--;
        else if (ch === "," && depth === 0) {
          res.push(current.trim());
          current = "";
          continue;
        }
      }
      current += ch;
    }
    if (current.trim()) res.push(current.trim());
    return res;
  }

  getPythonType(val) {
    if (val === null || val === undefined) return "NoneType";
    if (Array.isArray(val)) return "list";
    if (isPyInstance(val)) return val.__class__;
    if (typeof val === "object") return "dict";
    if (typeof val === "boolean") return "bool";
    if (typeof val === "number") return Number.isInteger(val) ? "int" : "float";
    if (typeof val === "string") return "str";
    return typeof val;
  }

  formatVal(val) {
    if (val === null || val === undefined) return "None";
    if (typeof val === "boolean") return val ? "True" : "False";
    if (typeof val === "string") return `"${val}"`;
    if (Array.isArray(val)) return `[${val.map((v) => this.formatVal(v)).join(", ")}]`;
    if (isPyInstance(val)) {
      const attrs = Object.entries(val)
        .filter(([k]) => k !== "__class__")
        .map(([k, v]) => `${k}=${this.formatVal(v)}`)
        .join(", ");
      return `${val.__class__}(${attrs})`;
    }
    if (typeof val === "object") {
      const entries = Object.entries(val).map(([k, v]) => `${k}: ${this.formatVal(v)}`);
      return `{${entries.join(", ")}}`;
    }
    return String(val);
  }

  buildControlFlowGraph(statements) {
    const nodes = [];
    const edges = [];

    const addNode = (id, label, type, line) => {
      nodes.push({ id, label, type, line });
      return id;
    };

    const startId = addNode("start", "START", "start", 0);

    const buildList = (stmts, prevIds) => {
      let currentPrevs = prevIds;
      for (const s of stmts) {
        if (s.kind === "CLASS") {
          const cid = addNode(`L${s.line}`, `class ${s.className}`, "class", s.line);
          currentPrevs.forEach((p) => edges.push({ from: p, to: cid }));
          currentPrevs = buildList(s.body, [cid]);
        } else if (s.kind === "DEF") {
          const fid = addNode(`L${s.line}`, `def ${s.funcName}()`, "func", s.line);
          currentPrevs.forEach((p) => edges.push({ from: p, to: fid }));
          currentPrevs = buildList(s.body, [fid]);
        } else if (s.kind === "IF_CHAIN") {
          const exitIds = [];
          let condPrevIds = currentPrevs;
          for (const br of s.branches) {
            if (br.type === "else") {
              const bodyEnd = buildList(br.body, condPrevIds);
              exitIds.push(...bodyEnd);
              condPrevIds = [];
            } else {
              const cid = addNode(`L${br.line}`, `${br.condition} ?`, "decision", br.line);
              condPrevIds.forEach((p) => edges.push({ from: p, to: cid }));
              const bodyEnd = buildList(br.body, [cid]);
              exitIds.push(...bodyEnd);
              condPrevIds = [cid];
            }
          }
          currentPrevs = [...exitIds, ...condPrevIds];
        } else if (s.kind === "FOR" || s.kind === "WHILE") {
          const label =
            s.kind === "FOR"
              ? `for ${s.iterVar} in ${s.iterExpr}`
              : `while ${s.condition}`;
          const loopId = addNode(`L${s.line}`, label, "loop", s.line);
          currentPrevs.forEach((p) => edges.push({ from: p, to: loopId }));
          const bodyEnd = buildList(s.body, [loopId]);
          bodyEnd.forEach((b) => edges.push({ from: b, to: loopId, isBackEdge: true }));
          currentPrevs = [loopId];
        } else {
          const type = s.text.startsWith("return") ? "return" : "stmt";
          const nid = addNode(
            `L${s.line}`,
            s.text.length > 26 ? s.text.slice(0, 24) + ".." : s.text,
            type,
            s.line
          );
          currentPrevs.forEach((p) => edges.push({ from: p, to: nid }));
          currentPrevs = [nid];
        }
      }
      return currentPrevs;
    };

    const lastIds = buildList(statements, [startId]);
    const endId = addNode("end", "END", "end", 9999);
    lastIds.forEach((p) => edges.push({ from: p, to: endId }));

    return { nodes, edges };
  }
}

window.PRELOADED_PROGRAMS = PRELOADED_PROGRAMS;
window.PythonExecutionEngine = PythonExecutionEngine;
