// AI-Powered Code Flow Visualizer - Execution Engine & Pedagogical Explainer (Step 3)

const PRESET_EXAMPLES = {
  for_loop_sum: {
    title: "1. For Loop: Sum of Even Numbers",
    varMeanings: {
      numbers: "The input list of numbers we want to inspect one by one.",
      even_sum: "Accumulator variable that keeps a running total of even numbers found so far.",
      count: "Counter variable that tracks how many even numbers we have seen.",
      num: "Loop variable that holds the current item from `numbers` during each pass."
    },
    code: `numbers = [4, 7, 10, 3, 8]
even_sum = 0
count = 0

for num in numbers:
    if num % 2 == 0:
        even_sum = even_sum + num
        count = count + 1

print("Even count:", count)
print("Even sum:", even_sum)`
  },
  step_diff_demo: {
    title: "2. Variable Tracking: Loop Counter & Delta (c, ans, i)",
    varMeanings: {
      c: "Tracks the current step offset calculation inside the loop.",
      ans: "Stores the accumulated answer across iterations.",
      i: "Loop counter variable stepping through 0, 1, 2."
    },
    code: `c = 0
ans = 4

for i in range(1, 4):
    c = c - 2
    if i % 2 == 0:
        ans = ans + c

print("Final c:", c)
print("Final ans:", ans)`
  },
  conditionals_grade: {
    title: "3. Conditionals: Student Grade Classifier",
    varMeanings: {
      score: "The student's raw exam score before extra credit.",
      bonus: "Extra credit points added to the raw score.",
      final_score: "Combined total score (`score + bonus`) tested by the `if/elif` conditions.",
      grade: "The final letter grade assigned based on which condition is True."
    },
    code: `score = 84
bonus = 5
final_score = score + bonus

if final_score >= 90:
    grade = "A"
elif final_score >= 80:
    grade = "B"
elif final_score >= 70:
    grade = "C"
else:
    grade = "F"

print("Score:", final_score)
print("Grade:", grade)`
  },
  find_max_algorithm: {
    title: "4. Algorithm: Find Maximum in a List",
    varMeanings: {
      scores: "The list of numbers we are searching through.",
      max_score: "Holds the largest number seen so far (starts at the first item).",
      best_index: "Remembers the list position (index) where `max_score` was found.",
      i: "Current index position being checked in the loop.",
      current: "The value at `scores[i]` being compared against `max_score`."
    },
    code: `scores = [18, 42, 29, 55, 31]
max_score = scores[0]
best_index = 0

for i in range(1, 5):
    current = scores[i]
    if current > max_score:
        max_score = current
        best_index = i

print("Highest score:", max_score)
print("Found at index:", best_index)`
  },
  while_countdown: {
    title: "5. While Loop: Doubling Until Target",
    varMeanings: {
      value: "The number being doubled on every loop pass.",
      target: "The stopping threshold (40) for our `while` loop.",
      steps: "Counts how many times the `while` loop body has executed."
    },
    code: `value = 3
target = 40
steps = 0

while value < target:
    value = value * 2
    steps = steps + 1
    print("Step", steps, "-> value is", value)

print("Reached", value, "in", steps, "steps")`
  },
  functions_factorial: {
    title: "6. Functions & Call Stack: Computing Factorial",
    varMeanings: {
      current: "Function parameter receiving the running factorial product so far.",
      factor: "Function parameter receiving the next multiplier `k`.",
      result: "Local variable inside `multiply_step` storing `current * factor`.",
      n: "The target number (4) whose factorial we are calculating.",
      answer: "Stores the running factorial answer in the main program.",
      k: "Loop variable stepping from 1 up to `n`."
    },
    code: `def multiply_step(current, factor):
    result = current * factor
    return result

n = 4
answer = 1

for k in range(1, n + 1):
    answer = multiply_step(answer, k)

print("Factorial of", n, "is", answer)`
  }
};

class PythonFlowTracer {
  constructor() {
    this.maxSteps = 250;
  }

  trace(sourceCode, customVarMeanings = {}) {
    const rawLines = sourceCode.replace(/\r\n/g, "\n").split("\n");
    const statements = this.parseLines(rawLines);
    const cfg = this.buildControlFlowGraph(statements);

    const steps = [];
    const stdout = [];
    const functions = {};
    const callStack = [
      {
        frameName: "Global Scope",
        vars: {},
        prevVars: {}
      }
    ];
    const loopStack = [];

    try {
      this.executeBlock(statements, callStack, functions, steps, stdout, loopStack, customVarMeanings);
    } catch (err) {
      steps.push({
        stepIndex: steps.length + 1,
        line: err.line || 1,
        nextLine: null,
        codeText: rawLines[(err.line || 1) - 1] || "",
        eventType: "ERROR",
        scopes: this.snapshotScopes(callStack, null),
        beforeAfterText: "No variable changes (Error)",
        conditionResultText: `Error: ${err.message}`,
        loopIterationText: this.getActiveLoopText(loopStack),
        evalBreakdown: `Runtime Error: ${err.message}`,
        branchResult: null,
        stdout: [...stdout],
        explanations: {
          beginner: `Execution stopped on Line ${err.line || 1} due to an error: \`${err.message}\`.`,
          eli10: `Oops! Python got confused on Line ${err.line || 1} because: \`${err.message}\`.`,
          technical: `Runtime exception raised at line ${err.line || 1}: \`${err.message}\`.`,
          varMeaning: `Check the variable names and syntax on Line ${err.line || 1}.`,
          whyNow: `Python reached Line ${err.line || 1} and attempted to evaluate it.`,
          whatChanged: `Nothing changed in memory because an error interrupted execution.`,
          whatNext: `Execution has stopped.`
        }
      });
    }

    // Post-process steps: link Why Executing Now (from previous step), Next Line, and What Happens Next
    for (let i = 0; i < steps.length; i++) {
      const cur = steps[i];
      const prevStep = i > 0 ? steps[i - 1] : null;
      const nextStep = i + 1 < steps.length ? steps[i + 1] : null;

      cur.nextLine = nextStep ? nextStep.line : null;
      cur.explanations.whyNow = this.buildWhyExecutingNow(cur, prevStep, i === 0);
      cur.explanations.whatNext = nextStep
        ? `Next, execution moves to **Line ${nextStep.line}** (\`${nextStep.codeText.trim()}\`) to ${this.describeUpcomingAction(nextStep)}.`
        : `This was the final step! The program has finished running all lines.`;
    }

    return {
      rawLines,
      steps,
      cfg
    };
  }

  getActiveLoopText(loopStack) {
    if (!loopStack.length) return "None";
    const top = loopStack[loopStack.length - 1];
    return top.total
      ? `Iteration ${top.current} of ${top.total}`
      : `Iteration #${top.current}`;
  }

  buildWhyExecutingNow(cur, prevStep, isFirst) {
    if (isFirst || !prevStep) {
      return `This is the **very first executable line** of the program (Line ${cur.line}). Python always starts at the top of the file and reads downward.`;
    }
    if (prevStep.eventType === "CONDITION") {
      if (prevStep.branchResult === true) {
        return `On the previous step (Line ${prevStep.line}), the condition evaluated to **True**, so Python entered the indented block starting at Line ${cur.line}.`;
      }
      return `On the previous step (Line ${prevStep.line}), the condition evaluated to **False**, so Python skipped that block and moved to Line ${cur.line}.`;
    }
    if (prevStep.eventType === "LOOP_ITER") {
      return `The loop on Line ${prevStep.line} started **${prevStep.loopIterationText}**, so Python stepped inside the indented loop body at Line ${cur.line}.`;
    }
    if (prevStep.eventType === "LOOP_END") {
      return `The loop on Line ${prevStep.line} finished all its iterations, so Python exited the loop and moved to the next line after the loop (Line ${cur.line}).`;
    }
    if (prevStep.eventType === "FUNC_CALL") {
      return `The function was just called, so Python jumped to the first line inside the function body (Line ${cur.line}).`;
    }
    if (prevStep.eventType === "RETURN") {
      return `The function finished and returned a value from Line ${prevStep.line}, so execution returned to the caller flow at Line ${cur.line}.`;
    }
    if (cur.line < prevStep.line) {
      return `Line ${prevStep.line} was the end of the loop body, so Python jumped **back up** to the loop header on Line ${cur.line} to check the next iteration.`;
    }
    return `Sequential flow: after completing Line ${prevStep.line}, Python automatically moved down to the next instruction on Line ${cur.line}.`;
  }

  describeVariableMeaningsForLine(codeText, activeFrame, customVarMeanings) {
    const varNames = Object.keys(activeFrame.vars);
    const mentioned = varNames.filter((name) => new RegExp(`\\b${name}\\b`).test(codeText));

    if (mentioned.length === 0) {
      return `No existing variables are read on this line yet.`;
    }

    return mentioned
      .map((name) => {
        const valStr = this.formatVal(activeFrame.vars[name]);
        const role =
          customVarMeanings[name] ||
          this.inferVariableRole(name, activeFrame.vars[name]);
        return `• \`${name}\` (currently \`${valStr}\`): ${role}`;
      })
      .join("<br>");
  }

  inferVariableRole(name, val) {
    const n = name.toLowerCase();
    if (Array.isArray(val)) return `A list holding ${val.length} elements in order.`;
    if (n.includes("sum") || n.includes("total") || n === "ans" || n === "answer") {
      return `Accumulator variable storing the running result.`;
    }
    if (n.includes("count") || n.includes("steps")) {
      return `Counter variable tracking how many times an event happens.`;
    }
    if (n === "i" || n === "k" || n === "idx" || n === "index" || n === "num") {
      return `Loop variable tracking the current item or index in the loop.`;
    }
    if (n.includes("max") || n.includes("best")) {
      return `Tracks the best/highest value found so far.`;
    }
    return `Variable storing a \`${this.getPythonType(val)}\` value in memory.`;
  }

  parseLines(rawLines) {
    const items = [];
    for (let i = 0; i < rawLines.length; i++) {
      const raw = rawLines[i];
      const strippedComment = this.stripInlineComment(raw);
      const trimmed = strippedComment.trim();
      if (!trimmed) continue;
      const indent = raw.match(/^\s*/)[0].length;
      items.push({
        line: i + 1,
        indent,
        text: trimmed,
        raw: raw
      });
    }
    return this.buildASTBlock(items, 0, items.length > 0 ? items[0].indent : 0).nodes;
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

  buildASTBlock(items, startIdx, baseIndent) {
    const nodes = [];
    let i = startIdx;

    while (i < items.length) {
      const item = items[i];
      if (item.indent < baseIndent) break;

      if (item.text.startsWith("if ") && item.text.endsWith(":")) {
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
      } else if (item.text.startsWith("def ") && item.text.endsWith(":")) {
        const match = item.text.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*)\)\s*:$/);
        const funcName = match ? match[1] : "func";
        const params =
          match && match[2].trim()
            ? match[2].split(",").map((s) => s.trim())
            : [];
        const bodyRes = this.parseChildSuite(items, i + 1, item.indent);
        nodes.push({
          kind: "DEF",
          line: item.line,
          text: item.text,
          funcName,
          params,
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

  executeBlock(nodes, callStack, functions, steps, stdout, loopStack, customVarMeanings) {
    for (const node of nodes) {
      if (steps.length >= this.maxSteps) break;
      const ret = this.executeNode(
        node,
        callStack,
        functions,
        steps,
        stdout,
        loopStack,
        customVarMeanings
      );
      if (ret && ret.returned) {
        return ret;
      }
    }
    return null;
  }

  analyzeConditionDetails(condExpr, scopeVars, functions, callStack, steps, stdout, loopStack, customVarMeanings, line) {
    const ops = ["==", "!=", ">=", "<=", ">", "<"];
    for (const op of ops) {
      const idx = condExpr.indexOf(op);
      if (idx !== -1) {
        const leftRaw = condExpr.slice(0, idx).trim();
        const rightRaw = condExpr.slice(idx + op.length).trim();
        const leftVal = this.evalExpr(leftRaw, scopeVars, functions, callStack, steps, stdout, loopStack, customVarMeanings, line);
        const rightVal = this.evalExpr(rightRaw, scopeVars, functions, callStack, steps, stdout, loopStack, customVarMeanings, line);
        const finalBool = Boolean(this.evalExpr(condExpr, scopeVars, functions, callStack, steps, stdout, loopStack, customVarMeanings, line));
        return {
          leftExpr: leftRaw,
          leftVal: this.formatVal(leftVal),
          operator: op,
          rightExpr: rightRaw,
          rightVal: this.formatVal(rightVal),
          result: finalBool,
          summary: `${leftRaw} (${this.formatVal(leftVal)}) ${op} ${rightRaw} (${this.formatVal(rightVal)}) → ${finalBool ? "True" : "False"}`
        };
      }
    }
    const finalBool = Boolean(this.evalExpr(condExpr, scopeVars, functions, callStack, steps, stdout, loopStack, customVarMeanings, line));
    return {
      leftExpr: condExpr,
      leftVal: this.formatVal(finalBool),
      operator: "is",
      rightExpr: "True",
      rightVal: "True",
      result: finalBool,
      summary: `${condExpr} → ${finalBool ? "True" : "False"}`
    };
  }

  executeNode(node, callStack, functions, steps, stdout, loopStack, customVarMeanings) {
    const activeFrame = callStack[callStack.length - 1];

    if (node.kind === "DEF") {
      functions[node.funcName] = node;
      steps.push({
        stepIndex: steps.length + 1,
        line: node.line,
        codeText: node.text,
        eventType: "FUNCTION DEF",
        scopes: this.snapshotScopes(callStack, null),
        beforeAfterText: `Function '${node.funcName}' registered`,
        conditionResultText: "N/A (Function Definition)",
        loopIterationText: this.getActiveLoopText(loopStack),
        evalBreakdown: `def ${node.funcName}(${node.params.join(", ")})`,
        branchResult: null,
        stdout: [...stdout],
        explanations: {
          beginner: `Defines a reusable function named \`${node.funcName}\` with parameters \`(${node.params.join(", ")})\`. Python saves this function in memory and skips over its body until it is called.`,
          eli10: `We teach Python a new recipe called \`${node.funcName}\`. Python writes it down in its recipe book for later, without cooking it yet!`,
          technical: `Compiles function object \`${node.funcName}\` with formal parameters \`(${node.params.join(", ")})\` and binds it in the current namespace.`,
          varMeaning: `\`${node.funcName}\` is the function name; \`${node.params.join(", ") || "none"}\` are parameter placeholders waiting for input arguments.`,
          whatChanged: `Function \`${node.funcName}\` is now defined and ready to be called.`
        }
      });
      return null;
    }

    if (node.kind === "IF_CHAIN") {
      for (const branch of node.branches) {
        if (branch.type === "else") {
          steps.push({
            stepIndex: steps.length + 1,
            line: branch.line,
            codeText: branch.text,
            eventType: "ELSE BRANCH",
            scopes: this.snapshotScopes(callStack, null),
            beforeAfterText: "No variables changed during branch check",
            conditionResultText: "All previous conditions False → Enter else",
            loopIterationText: this.getActiveLoopText(loopStack),
            evalBreakdown: `Fallback else branch entered`,
            branchResult: true,
            stdout: [...stdout],
            explanations: {
              beginner: `Since all earlier \`if\` / \`elif\` conditions were \`False\`, Python automatically enters the \`else:\` block.`,
              eli10: `None of the earlier doors matched, so Python opens the backup \`else\` door!`,
              technical: `Prior conditional predicates evaluated to \`False\`; control transfers into the default \`else\` suite.`,
              varMeaning: this.describeVariableMeaningsForLine(branch.text, activeFrame, customVarMeanings),
              whatChanged: `No variables changed on this line; control flow entered the \`else\` block.`
            }
          });
          return this.executeBlock(branch.body, callStack, functions, steps, stdout, loopStack, customVarMeanings);
        } else {
          const condInfo = this.analyzeConditionDetails(
            branch.condition,
            activeFrame.vars,
            functions,
            callStack,
            steps,
            stdout,
            loopStack,
            customVarMeanings,
            branch.line
          );
          const val = condInfo.result;

          steps.push({
            stepIndex: steps.length + 1,
            line: branch.line,
            codeText: branch.text,
            eventType: "CONDITION",
            scopes: this.snapshotScopes(callStack, null),
            beforeAfterText: "No variables changed (testing condition)",
            conditionResultText: condInfo.summary,
            loopIterationText: this.getActiveLoopText(loopStack),
            evalBreakdown: condInfo.summary,
            branchResult: val,
            stdout: [...stdout],
            explanations: {
              beginner: `Checks if \`${branch.condition}\` is True or False. Comparing \`${condInfo.leftVal} ${condInfo.operator} ${condInfo.rightVal}\` gives **${val ? "True" : "False"}**. ${val ? "Python enters the indented block." : "Python skips the indented block."}`,
              eli10: `Python asks a Yes/No question: Is \`${condInfo.leftVal} ${condInfo.operator} ${condInfo.rightVal}\`? The answer is **${val ? "YES (True)" : "NO (False)"}**!`,
              technical: `Evaluates boolean predicate \`${branch.condition}\` (\`${condInfo.leftVal} ${condInfo.operator} ${condInfo.rightVal}\`) to \`${val ? "True" : "False"}\`.`,
              varMeaning: this.describeVariableMeaningsForLine(branch.text, activeFrame, customVarMeanings),
              whatChanged: `No variable values changed. Condition evaluated to **${val ? "True" : "False"}**, deciding which line runs next.`
            }
          });
          if (val) {
            return this.executeBlock(branch.body, callStack, functions, steps, stdout, loopStack, customVarMeanings);
          }
        }
      }
      return null;
    }

    if (node.kind === "FOR") {
      const iterable = this.evalExpr(node.iterExpr, activeFrame.vars, functions, callStack, steps, stdout, loopStack, customVarMeanings, node.line);
      const listItems = Array.isArray(iterable) ? iterable : [];

      loopStack.push({ type: "for", current: 0, total: listItems.length });

      for (let idx = 0; idx < listItems.length; idx++) {
        if (steps.length >= this.maxSteps) break;
        loopStack[loopStack.length - 1].current = idx + 1;

        const itemVal = listItems[idx];
        const prevVal = activeFrame.vars[node.iterVar];
        const isNew = !(node.iterVar in activeFrame.vars);
        activeFrame.prevVars[node.iterVar] = prevVal;
        activeFrame.vars[node.iterVar] = itemVal;

        const beforeAfter = isNew
          ? `${node.iterVar}: (new) → ${this.formatVal(itemVal)}`
          : `${node.iterVar}: ${this.formatVal(prevVal)} → ${this.formatVal(itemVal)}`;

        steps.push({
          stepIndex: steps.length + 1,
          line: node.line,
          codeText: node.text,
          eventType: "LOOP_ITER",
          scopes: this.snapshotScopes(callStack, {
            name: node.iterVar,
            status: isNew ? "created" : "updated",
            prevValue: prevVal
          }),
          beforeAfterText: beforeAfter,
          conditionResultText: `Has next item at index [${idx}] → True`,
          loopIterationText: this.getActiveLoopText(loopStack),
          evalBreakdown: `Iteration ${idx + 1}/${listItems.length}: ${node.iterVar} = ${this.formatVal(itemVal)}`,
          branchResult: true,
          stdout: [...stdout],
          explanations: {
            beginner: `Starts **Iteration ${idx + 1} of ${listItems.length}** of the \`for\` loop. Python takes item \`#${idx + 1}\` (\`${this.formatVal(itemVal)}\`) from \`${node.iterExpr}\` and stores it in loop variable \`${node.iterVar}\`.`,
            eli10: `Round ${idx + 1} of the loop! Python picks up the next item (\`${this.formatVal(itemVal)}\`) from the list and puts it inside the box labeled \`${node.iterVar}\`.`,
            technical: `Iterator advances to index ${idx} of \`${node.iterExpr}\`, binding loop target \`${node.iterVar}\` to \`${this.formatVal(itemVal)}\`.`,
            varMeaning: this.describeVariableMeaningsForLine(node.text, activeFrame, customVarMeanings),
            whatChanged: `Loop variable \`${node.iterVar}\` was ${isNew ? "created and set to" : `updated from \`${this.formatVal(prevVal)}\` to`} \`${this.formatVal(itemVal)}\`.`
          }
        });

        const ret = this.executeBlock(node.body, callStack, functions, steps, stdout, loopStack, customVarMeanings);
        if (ret && ret.returned) {
          loopStack.pop();
          return ret;
        }
      }

      loopStack.pop();

      steps.push({
        stepIndex: steps.length + 1,
        line: node.line,
        codeText: node.text,
        eventType: "LOOP_END",
        scopes: this.snapshotScopes(callStack, null),
        beforeAfterText: "No variable changes (Loop finished)",
        conditionResultText: `All ${listItems.length} items processed → Exit Loop`,
        loopIterationText: `Completed ${listItems.length}/${listItems.length}`,
        evalBreakdown: `Loop finished all ${listItems.length} iterations`,
        branchResult: false,
        stdout: [...stdout],
        explanations: {
          beginner: `The \`for\` loop has finished visiting all ${listItems.length} items in \`${node.iterExpr}\`. Python now exits the loop.`,
          eli10: `There are no more items left in the list! The loop is done, so Python jumps past the loop lines.`,
          technical: `Sequence iterator exhausted (\`StopIteration\`); control exits the \`for\` loop suite.`,
          varMeaning: this.describeVariableMeaningsForLine(node.text, activeFrame, customVarMeanings),
          whatChanged: `The loop completed its final pass and exited.`
        }
      });
      return null;
    }

    if (node.kind === "WHILE") {
      let guard = 0;
      loopStack.push({ type: "while", current: 0, total: null });

      while (guard < 100 && steps.length < this.maxSteps) {
        guard++;
        loopStack[loopStack.length - 1].current = guard;

        const condInfo = this.analyzeConditionDetails(
          node.condition,
          activeFrame.vars,
          functions,
          callStack,
          steps,
          stdout,
          loopStack,
          customVarMeanings,
          node.line
        );
        const condVal = condInfo.result;

        steps.push({
          stepIndex: steps.length + 1,
          line: node.line,
          codeText: node.text,
          eventType: condVal ? "LOOP_ITER" : "LOOP_END",
          scopes: this.snapshotScopes(callStack, null),
          beforeAfterText: "No variable changes (checking while condition)",
          conditionResultText: condInfo.summary,
          loopIterationText: condVal ? `Iteration #${guard}` : `Ended on check #${guard}`,
          evalBreakdown: condInfo.summary,
          branchResult: condVal,
          stdout: [...stdout],
          explanations: {
            beginner: condVal
              ? `Tests the \`while\` condition \`${node.condition}\`: \`${condInfo.leftVal} ${condInfo.operator} ${condInfo.rightVal}\` is **True**, so Python enters loop iteration #${guard}.`
              : `Tests the \`while\` condition \`${node.condition}\`: \`${condInfo.leftVal} ${condInfo.operator} ${condInfo.rightVal}\` is now **False**, so the loop stops!`,
            eli10: condVal
              ? `Python checks if \`${condInfo.leftVal} ${condInfo.operator} ${condInfo.rightVal}\` is still true. Yes! So it runs the loop body again.`
              : `Python checks if \`${condInfo.leftVal} ${condInfo.operator} ${condInfo.rightVal}\` is true. Not anymore! The loop stops here.`,
            technical: `While predicate \`${node.condition}\` evaluated to \`${condVal ? "True" : "False"}\` on iteration check #${guard}.`,
            varMeaning: this.describeVariableMeaningsForLine(node.text, activeFrame, customVarMeanings),
            whatChanged: condVal
              ? `Condition is **True**; continuing into loop iteration #${guard}.`
              : `Condition became **False**; exiting the \`while\` loop.`
          }
        });

        if (!condVal) break;
        const ret = this.executeBlock(node.body, callStack, functions, steps, stdout, loopStack, customVarMeanings);
        if (ret && ret.returned) {
          loopStack.pop();
          return ret;
        }
      }
      loopStack.pop();
      return null;
    }

    if (node.kind === "STMT") {
      return this.executeSimpleStatement(node, callStack, functions, steps, stdout, loopStack, customVarMeanings);
    }

    return null;
  }

  executeSimpleStatement(node, callStack, functions, steps, stdout, loopStack, customVarMeanings) {
    const activeFrame = callStack[callStack.length - 1];
    const text = node.text;

    // 1. Return statement
    if (text === "return" || text.startsWith("return ")) {
      const expr = text === "return" ? "None" : text.slice(7).trim();
      const retVal =
        expr === "None"
          ? null
          : this.evalExpr(expr, activeFrame.vars, functions, callStack, steps, stdout, loopStack, customVarMeanings, node.line);

      steps.push({
        stepIndex: steps.length + 1,
        line: node.line,
        codeText: text,
        eventType: "RETURN",
        scopes: this.snapshotScopes(callStack, null),
        beforeAfterText: `Returns value ${this.formatVal(retVal)} to caller`,
        conditionResultText: "N/A (Return Statement)",
        loopIterationText: this.getActiveLoopText(loopStack),
        evalBreakdown: `return ${expr} → ${this.formatVal(retVal)}`,
        branchResult: null,
        stdout: [...stdout],
        explanations: {
          beginner: `Exits the function \`${activeFrame.frameName}\` and sends the value \`${this.formatVal(retVal)}\` back to the line where the function was called.`,
          eli10: `The function is finished! It hands back the answer \`${this.formatVal(retVal)}\` to whoever asked for it.`,
          technical: `Unwinds call stack frame \`${activeFrame.frameName}\` and returns value \`${this.formatVal(retVal)}\` to caller.`,
          varMeaning: this.describeVariableMeaningsForLine(text, activeFrame, customVarMeanings),
          whatChanged: `Function returned \`${this.formatVal(retVal)}\` and closed its local scope.`
        }
      });

      return { returned: true, value: retVal };
    }

    // 2. Print statement
    if (text.startsWith("print(") && text.endsWith(")")) {
      const inner = text.slice(6, -1).trim();
      const args = this.splitTopLevelArgs(inner);
      const evaluatedArgs = args.map((arg) =>
        this.evalExpr(arg, activeFrame.vars, functions, callStack, steps, stdout, loopStack, customVarMeanings, node.line)
      );
      const outputLine = evaluatedArgs
        .map((v) => (typeof v === "string" ? v : this.formatVal(v)))
        .join(" ");

      stdout.push({
        stepIndex: steps.length + 1,
        line: node.line,
        text: outputLine
      });

      steps.push({
        stepIndex: steps.length + 1,
        line: node.line,
        codeText: text,
        eventType: "PRINT OUTPUT",
        scopes: this.snapshotScopes(callStack, null),
        beforeAfterText: "No variables changed (Output only)",
        conditionResultText: "N/A (Print Statement)",
        loopIterationText: this.getActiveLoopText(loopStack),
        evalBreakdown: `Output → "${outputLine}"`,
        branchResult: null,
        stdout: [...stdout],
        explanations: {
          beginner: `Reads the current values inside \`print(...)\` and displays \`"${outputLine}"\` in the Console Output panel.`,
          eli10: `Python writes \`"${outputLine}"\` onto the screen so we can see the answer!`,
          technical: `Evaluates arguments \`(${inner})\` and writes formatted string \`"${outputLine}"\` to standard output.`,
          varMeaning: this.describeVariableMeaningsForLine(text, activeFrame, customVarMeanings),
          whatChanged: `Printed \`"${outputLine}"\` to the console. Memory variables remain unchanged.`
        }
      });
      return null;
    }

    // 3. Augmented assignment (+=, -=, *=)
    const augMatch = text.match(/^([a-zA-Z_]\w*)\s*(\+=|-=|\*=)\s*(.+)$/);
    if (augMatch) {
      const varName = augMatch[1];
      const op = augMatch[2][0];
      const rhsExpr = augMatch[3].trim();
      const fullExpr = `${varName} ${op} (${rhsExpr})`;
      const prevVal = activeFrame.vars[varName];
      const newVal = this.evalExpr(fullExpr, activeFrame.vars, functions, callStack, steps, stdout, loopStack, customVarMeanings, node.line);
      const substituted = `${this.formatVal(prevVal)} ${op} ${this.substituteVarsInExpr(rhsExpr, activeFrame.vars)}`;

      activeFrame.prevVars[varName] = prevVal;
      activeFrame.vars[varName] = newVal;

      steps.push({
        stepIndex: steps.length + 1,
        line: node.line,
        codeText: text,
        eventType: "ASSIGNMENT",
        scopes: this.snapshotScopes(callStack, {
          name: varName,
          status: "updated",
          prevValue: prevVal
        }),
        beforeAfterText: `${varName}: ${this.formatVal(prevVal)} → ${this.formatVal(newVal)}`,
        conditionResultText: "N/A (Assignment)",
        loopIterationText: this.getActiveLoopText(loopStack),
        evalBreakdown: `${varName} = ${substituted} = ${this.formatVal(newVal)}`,
        branchResult: null,
        stdout: [...stdout],
        explanations: {
          beginner: `Calculates \`${substituted}\` (which equals \`${this.formatVal(newVal)}\`) and updates variable \`${varName}\` from \`${this.formatVal(prevVal)}\` to \`${this.formatVal(newVal)}\`.`,
          eli10: `Python takes \`${varName}\` (which was \`${this.formatVal(prevVal)}\`), applies \`${op} ${this.substituteVarsInExpr(rhsExpr, activeFrame.vars)}\`, and puts \`${this.formatVal(newVal)}\` back in the box!`,
          technical: `Evaluates in-place operator \`${augMatch[2]}\` on \`${varName}\`, updating its bound value from \`${this.formatVal(prevVal)}\` to \`${this.formatVal(newVal)}\`.`,
          varMeaning: this.describeVariableMeaningsForLine(text, activeFrame, customVarMeanings),
          whatChanged: `Variable \`${varName}\` changed from \`${this.formatVal(prevVal)}\` to \`${this.formatVal(newVal)}\`.`
        }
      });
      return null;
    }

    // 4. Standard assignment: varName = expr
    const assignMatch = text.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch && !text.includes("==")) {
      const varName = assignMatch[1];
      const rhsExpr = assignMatch[2].trim();
      const prevVal = activeFrame.vars[varName];
      const isNew = !(varName in activeFrame.vars);
      const substituted = this.substituteVarsInExpr(rhsExpr, activeFrame.vars);
      const newVal = this.evalExpr(rhsExpr, activeFrame.vars, functions, callStack, steps, stdout, loopStack, customVarMeanings, node.line);

      activeFrame.prevVars[varName] = prevVal;
      activeFrame.vars[varName] = newVal;

      const beforeAfter = isNew
        ? `${varName}: (created) → ${this.formatVal(newVal)}`
        : `${varName}: ${this.formatVal(prevVal)} → ${this.formatVal(newVal)}`;

      steps.push({
        stepIndex: steps.length + 1,
        line: node.line,
        codeText: text,
        eventType: "ASSIGNMENT",
        scopes: this.snapshotScopes(callStack, {
          name: varName,
          status: isNew ? "created" : "updated",
          prevValue: prevVal
        }),
        beforeAfterText: beforeAfter,
        conditionResultText: "N/A (Assignment)",
        loopIterationText: this.getActiveLoopText(loopStack),
        evalBreakdown:
          substituted !== rhsExpr
            ? `${rhsExpr} → ${substituted} → ${this.formatVal(newVal)}`
            : `${varName} = ${this.formatVal(newVal)}`,
        branchResult: null,
        stdout: [...stdout],
        explanations: {
          beginner: isNew
            ? `Creates a new variable named \`${varName}\` in memory and stores \`${this.formatVal(newVal)}\` (type \`${this.getPythonType(newVal)}\`) inside it.`
            : `Evaluates the right side (\`${rhsExpr}\` $\\rightarrow$ \`${substituted}\` $\\rightarrow$ \`${this.formatVal(newVal)}\`) and updates \`${varName}\` from \`${this.formatVal(prevVal)}\` to \`${this.formatVal(newVal)}\`.`,
          eli10: isNew
            ? `Python makes a brand-new storage box labeled \`${varName}\` and puts \`${this.formatVal(newVal)}\` inside it!`
            : `Python works out the math \`${substituted}\` to get \`${this.formatVal(newVal)}\`, and replaces the old value inside \`${varName}\` (which used to be \`${this.formatVal(prevVal)}\`).`,
          technical: `Evaluates RHS expression \`${rhsExpr}\` to \`${this.formatVal(newVal)}\` (\`${this.getPythonType(newVal)}\`) and binds identifier \`${varName}\` in \`${activeFrame.frameName}\`.`,
          varMeaning: this.describeVariableMeaningsForLine(text, activeFrame, customVarMeanings),
          whatChanged: isNew
            ? `Created variable \`${varName}\` with initial value \`${this.formatVal(newVal)}\`.`
            : `Updated variable \`${varName}\`: previous value \`${this.formatVal(prevVal)}\` $\\rightarrow$ new value \`${this.formatVal(newVal)}\`.`
        }
      });
      return null;
    }

    return null;
  }

  evalExpr(expr, scopeVars, functions, callStack, steps, stdout, loopStack, customVarMeanings, lineNum) {
    const trimmed = expr.trim();

    const rangeMatch = trimmed.match(/^range\((.+)\)$/);
    if (rangeMatch) {
      const parts = this.splitTopLevelArgs(rangeMatch[1]).map((a) =>
        Number(this.evalExpr(a, scopeVars, functions, callStack, steps, stdout, loopStack, customVarMeanings, lineNum))
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

    const lenMatch = trimmed.match(/^len\((.+)\)$/);
    if (lenMatch) {
      const target = this.evalExpr(lenMatch[1], scopeVars, functions, callStack, steps, stdout, loopStack, customVarMeanings, lineNum);
      return target && typeof target.length === "number" ? target.length : 0;
    }

    // Function call
    const callMatch = trimmed.match(/^([a-zA-Z_]\w*)\((.*)\)$/);
    if (callMatch && functions[callMatch[1]]) {
      const fnNode = functions[callMatch[1]];
      const rawArgs = callMatch[2].trim() ? this.splitTopLevelArgs(callMatch[2]) : [];
      const argVals = rawArgs.map((a) =>
        this.evalExpr(a, scopeVars, functions, callStack, steps, stdout, loopStack, customVarMeanings, lineNum)
      );

      const newFrameVars = {};
      fnNode.params.forEach((p, idx) => {
        newFrameVars[p] = argVals[idx];
      });

      const paramBindSummary = fnNode.params
        .map((p, i) => `${p}: (param) → ${this.formatVal(argVals[i])}`)
        .join(", ");

      const newFrame = {
        frameName: `${fnNode.funcName}(${fnNode.params.map((p, i) => `${p}=${this.formatVal(argVals[i])}`).join(", ")})`,
        vars: newFrameVars,
        prevVars: {}
      };

      callStack.push(newFrame);

      steps.push({
        stepIndex: steps.length + 1,
        line: fnNode.line,
        codeText: fnNode.text,
        eventType: "FUNC_CALL",
        scopes: this.snapshotScopes(callStack, null),
        beforeAfterText: paramBindSummary || "Entered function scope",
        conditionResultText: "N/A (Function Call)",
        loopIterationText: this.getActiveLoopText(loopStack),
        evalBreakdown: `Call ${newFrame.frameName}`,
        branchResult: null,
        stdout: [...stdout],
        explanations: {
          beginner: `Calls function \`${fnNode.funcName}\` from Line ${lineNum}, passing arguments into parameters (${fnNode.params.map((p, i) => `\`${p} = ${this.formatVal(argVals[i])}\``).join(", ")}).`,
          eli10: `Python jumps to the \`${fnNode.funcName}\` recipe and plugs in the ingredients: ${fnNode.params.map((p, i) => `\`${p} = ${this.formatVal(argVals[i])}\``).join(", ")}!`,
          technical: `Pushes activation frame \`${newFrame.frameName}\` onto the call stack and binds formal parameters.`,
          varMeaning: this.describeVariableMeaningsForLine(fnNode.text, newFrame, customVarMeanings),
          whatChanged: `Created new function scope \`${newFrame.frameName}\` with parameters ${paramBindSummary}.`
        }
      });

      const res = this.executeBlock(fnNode.body, callStack, functions, steps, stdout, loopStack, customVarMeanings);
      callStack.pop();
      return res && res.returned ? res.value : null;
    }

    let jsExpr = trimmed
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

    const keys = Object.keys(scopeVars);
    const vals = keys.map((k) => scopeVars[k]);
    try {
      const fn = new Function(...keys, `return (${jsExpr});`);
      return fn(...vals);
    } catch (e) {
      throw { message: e.message, line: lineNum };
    }
  }

  substituteVarsInExpr(expr, scopeVars) {
    let result = expr;
    const sortedNames = Object.keys(scopeVars).sort((a, b) => b.length - a.length);
    for (const name of sortedNames) {
      const regex = new RegExp(`\\b${name}\\b`, "g");
      result = result.replace(regex, this.formatVal(scopeVars[name]));
    }
    return result;
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
        if (ch === "(" || ch === "[") depth++;
        else if (ch === ")" || ch === "]") depth--;
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

  snapshotScopes(callStack, changedVarInfo) {
    return callStack.map((frame, frameIdx) => {
      const isTopFrame = frameIdx === callStack.length - 1;
      const variables = Object.keys(frame.vars).map((varName) => {
        const val = frame.vars[varName];
        const isChangedHere = isTopFrame && changedVarInfo && changedVarInfo.name === varName;
        const prevVal = isChangedHere ? changedVarInfo.prevValue : val;
        return {
          name: varName,
          type: this.getPythonType(val),
          value: Array.isArray(val) ? [...val] : val,
          formattedValue: this.formatVal(val),
          prevFormattedValue:
            isChangedHere && changedVarInfo.status === "created"
              ? "—"
              : this.formatVal(prevVal),
          status: isChangedHere ? changedVarInfo.status : "unchanged"
        };
      });
      return {
        frameName: frame.frameName,
        isActive: isTopFrame,
        variables
      };
    });
  }

  getPythonType(val) {
    if (val === null || val === undefined) return "NoneType";
    if (Array.isArray(val)) return "list";
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
    return String(val);
  }

  describeUpcomingAction(nextStep) {
    switch (nextStep.eventType) {
      case "ASSIGNMENT":
        return "evaluate the expression and update a variable";
      case "CONDITION":
        return "test the condition (True or False)";
      case "ELSE BRANCH":
        return "enter the fallback else branch";
      case "LOOP_ITER":
        return "run the next loop iteration";
      case "LOOP_END":
        return "finish the loop and move forward";
      case "PRINT OUTPUT":
        return "print values to the console";
      case "FUNC_CALL":
        return "call the function and pass arguments into parameters";
      case "RETURN":
        return "return the computed value back to the caller";
      default:
        return "execute the statement";
    }
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
        if (s.kind === "IF_CHAIN") {
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
          const label = s.kind === "FOR" ? `LOOP: ${s.iterVar} in ${s.iterExpr}` : `WHILE: ${s.condition}`;
          const loopId = addNode(`L${s.line}`, label, "loop", s.line);
          currentPrevs.forEach((p) => edges.push({ from: p, to: loopId }));
          const bodyEnd = buildList(s.body, [loopId]);
          bodyEnd.forEach((b) => edges.push({ from: b, to: loopId, isBackEdge: true }));
          currentPrevs = [loopId];
        } else {
          const type = s.text.startsWith("return")
            ? "return"
            : s.kind === "DEF"
            ? "func"
            : "stmt";
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

window.PRESET_EXAMPLES = PRESET_EXAMPLES;
window.PythonFlowTracer = PythonFlowTracer;
