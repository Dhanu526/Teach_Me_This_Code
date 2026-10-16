// app_build/explainer.js — "Teach Me This Code" Thonny-Style Rule-Based Teacher
// Preserves full compatibility with engine.js while explaining:
// 1. Step-by-step sub-expression reductions & short-circuit logic ('and' / 'or')
// 2. Stack & Heap memory references (Name -> @Address -> Value)
// 3. Global vs. Local scope isolation

const PYTHON_SYMBOLS_LIBRARY = [
  { token: "class", label: "class", desc: "Groups related functions together under one name." },
  { token: "def", label: "def", desc: "Creates a function (a reusable set of instructions)." },
  { token: "for", label: "for", desc: "Repeats the indented lines once for each item in a list or range." },
  { token: "while", label: "while", desc: "Keeps repeating the indented lines as long as a condition is True." },
  { token: "range(", label: "range(len(nums))", desc: "Creates index numbers 0, 1, 2... up to the last position in the list." },
  { token: "len(", label: "len(arr)", desc: "Counts how many items are inside the list." },
  { token: "and", label: "and", desc: "Short-circuit AND: checks the left side first; if False, skips the right side immediately." },
  { token: "or", label: "or", desc: "Short-circuit OR: checks the left side first; if True, skips the right side immediately." },
  { token: "//", label: "//", desc: "Floor division: divides and rounds down to a whole integer index." },
  { token: "+=", label: "+=", desc: "Adds a number to the existing variable and binds the name to the new value's address." },
  { token: "-=", label: "-=", desc: "Subtracts a number from the existing variable." },
  { token: ">=", label: ">=", desc: "Asks: 'Is the left number greater than or equal to the right number?'" },
  { token: "<=", label: "<=", desc: "Asks: 'Is the left number less than or equal to the right number?'" },
  { token: "==", label: "==", desc: "Asks: 'Are these two values equal?'" },
  { token: "<", label: "<", desc: "Asks: 'Is the left number smaller than the right number?'" },
  { token: ">", label: ">", desc: "Asks: 'Is the left number larger than the right number?'" },
  { token: "=", label: "=", desc: "Evaluates the right side first and points the variable name on the left to its heap address." },
  { token: "[", label: "arr[i]", desc: "Looks up the item at index `i` inside the list object on the heap." },
  { token: "return", label: "return", desc: "Finishes the local function scope and sends back the final answer." }
];

class RuleBasedExplainer {
  enrichTraceWithExplanations(traceResult) {
    if (!traceResult || !traceResult.steps) return traceResult;
    const steps = traceResult.steps;

    const bestSubarrayInfo = this.computeBestSubarray(traceResult);

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const prevStep = i > 0 ? steps[i - 1] : null;
      const nextStep = i + 1 < steps.length ? steps[i + 1] : null;

      step.teacherLesson = this.buildTeacherLesson(step, prevStep, nextStep, bestSubarrayInfo);
      step.explanations = this.buildStepExplanation(step, prevStep, nextStep);
    }

    traceResult.bestSubarrayInfo = bestSubarrayInfo;
    traceResult.executionSummary = this.buildExecutionSummary(traceResult);
    return traceResult;
  }

  computeBestSubarray(traceResult) {
    const steps = traceResult.steps || [];
    if (!steps.length) return null;

    let numsArr = null;
    for (const s of steps) {
      const numsRow = (s.variables || []).find((v) => v.name === "nums" && Array.isArray(v.rawValue));
      if (numsRow) {
        numsArr = numsRow.rawValue;
        break;
      }
    }
    if (!numsArr || !numsArr.length) return null;

    let bestSum = numsArr[0];
    let bestStart = 0;
    let bestEnd = 0;
    let currentSum = 0;
    let currentStart = 0;

    for (let i = 0; i < numsArr.length; i++) {
      if (currentSum === 0) currentStart = i;
      currentSum += numsArr[i];
      if (currentSum >= bestSum) {
        bestSum = currentSum;
        bestStart = currentStart;
        bestEnd = i;
      }
      if (currentSum < 0) {
        currentSum = 0;
      }
    }

    return {
      subarray: numsArr.slice(bestStart, bestEnd + 1),
      startIndex: bestStart,
      endIndex: bestEnd,
      maxSum: bestSum
    };
  }

  buildTeacherLesson(step, prevStep, nextStep, bestSubarrayInfo) {
    const n = step.stepIndex;
    const op = step.operationDetail || {};
    const cond = step.condition;
    const nextSentence = this.buildFriendlyWhatNext(step, nextStep);
    const relevantVarsNow = this.formatRelevantVariablesNow(step);
    const exprFrames = step.exprFrames || [];
    const scFrame = exprFrames.find((f) => f.shortCircuited);

    // 1. Class definition
    if (step.eventType === "CLASS_DEF") {
      return {
        title: `Step ${n}: Create the Solution class`,
        calculationCard: null,
        whatItMeans:
          `Python reads \`class Solution:\` in **Global Scope**, which is a container that holds our method. Creating the class does not calculate the answer yet—it just prepares the container.`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 2. Method / Function definition
    if (step.eventType === "METHOD_DEF" || step.eventType === "FUNC_DEF") {
      return {
        title: `Step ${n}: Define the ${op.funcName} function`,
        calculationCard: null,
        whatItMeans:
          `Python registers the function \`${op.funcName}(${(op.params || ["nums"]).join(", ")})\` in **Global Scope**. Python only creates a **Local Scope** for this function when we call it.`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 3. Function Call
    if (step.eventType === "FUNC_CALL") {
      const bindings = op.paramBindings || [];
      const bText = bindings.map((b) => `\`${b.param}\` → \`${b.val}\``).join(", ");
      return {
        title: `Step ${n}: Call ${op.funcName}() & create Local Scope`,
        calculationCard: null,
        whatItMeans: bindings.length
          ? `We call \`${op.funcName}()\` and open a new **Local Scope** stack frame! Parameter names (${bText}) now point directly to the argument addresses on the **Heap**.`
          : `We call \`${op.funcName}()\` and enter a new **Local Scope** to execute its lines.`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 4. Standard variable assignment
    if (step.eventType === "ASSIGN") {
      const changedAddr = (step.variables || []).find((v) => v.name === op.target)?.address;
      const addrNote = changedAddr ? ` (pointing to heap address \`${changedAddr}\`)` : "";

      if (op.target === "c" && op.isCreated) {
        return {
          title: `Step ${n}: Create the variable c`,
          calculationCard: null,
          whatItMeans:
            `We create a local variable named \`c\`${addrNote} and store the number \`${op.afterVal}\` inside it. \`c\` will keep track of our running sum as we add numbers from the list.`,
          variableValuesNow: relevantVarsNow,
          whatHappensNext: nextSentence,
          finalBanner: null
        };
      }
      if (op.target === "ans" && op.isCreated) {
        return {
          title: `Step ${n}: Create the variable ans`,
          calculationCard: {
            currentNumber: null,
            before: `Look up nums[0]`,
            calculation: `nums[0] → ${op.afterVal}`,
            after: `ans = ${op.afterVal}`
          },
          whatItMeans:
            `We evaluate \`nums[0]\` (\`${op.afterVal}\`) and bind \`ans\`${addrNote} to \`${op.afterVal}\`. \`ans\` remembers the largest sum we have seen so far.`,
          variableValuesNow: relevantVarsNow,
          whatHappensNext: nextSentence,
          finalBanner: null
        };
      }
      if (op.target === "ans" && !op.isCreated) {
        return {
          title: `Step ${n}: Save the new largest sum in ans`,
          calculationCard: {
            currentNumber: null,
            before: `ans = ${op.beforeVal}`,
            calculation: `ans = c (${op.afterVal})`,
            after: `ans = ${op.afterVal}`
          },
          whatItMeans:
            `Because our current sum \`c\` (\`${op.afterVal}\`) is at least as big as \`ans\` (\`${op.beforeVal}\`), we rebind \`ans\`${addrNote} to \`${op.afterVal}\`!`,
          variableValuesNow: relevantVarsNow,
          whatHappensNext: nextSentence,
          finalBanner: null
        };
      }
      if (op.target === "c" && op.afterVal === "0" && !op.isCreated) {
        return {
          title: `Step ${n}: Reset c to zero`,
          calculationCard: {
            currentNumber: null,
            before: `c = ${op.beforeVal}`,
            calculation: `Reset negative sum to 0`,
            after: `c = 0`
          },
          whatItMeans:
            `Because \`c\` was negative (\`${op.beforeVal}\`), keeping it would only make future sums smaller. So we rebind \`c\`${addrNote} back to \`0\` (and the old negative value becomes unreferenced on the heap).`,
          variableValuesNow: relevantVarsNow,
          whatHappensNext: nextSentence,
          finalBanner: null
        };
      }

      return {
        title: `Step ${n}: ${op.isCreated ? "Create" : "Update"} ${op.target}`,
        calculationCard: {
          currentNumber: null,
          before: op.isCreated ? `Expression: ${op.rhsExpr}` : `${op.target} = ${op.beforeVal}`,
          calculation: `${op.rhsExpr} → ${op.substituted}`,
          after: `${op.afterVal.includes("=") ? op.afterVal : `${op.target} = ${op.afterVal}`}`
        },
        whatItMeans: op.isCreated
          ? `Python evaluates \`${op.rhsExpr}\` step-by-step into \`${op.substituted}\` and binds \`${op.target}\`${addrNote} in **${step.functionName}**.`
          : `Python evaluates \`${op.rhsExpr}\` (\`${op.substituted}\`) and updates \`${op.target}\`${addrNote} from \`${op.beforeVal}\` to \`${op.afterVal}\`.`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 5. Addition / Augmented Assignment (`c += nums[i]`)
    if (step.eventType === "AUG_ASSIGN") {
      const afterNum = Number(op.afterVal);
      const ansRow = (step.variables || []).find((v) => v.name === "ans");
      const ansNum = ansRow ? Number(ansRow.current) : null;

      let teacherNote = `We evaluated \`${op.rhsExpr}\` → \`${op.rhsVal}\`, added it to \`${op.target}\` (\`${op.beforeVal}\`), and rebound \`${op.target}\` to \`${op.afterVal}\`.`;
      if (op.target === "c") {
        if (afterNum < 0 && ansNum !== null && afterNum >= ansNum) {
          teacherNote = `We added \`${op.rhsVal}\` to \`c\`, giving \`${op.afterVal}\`. That matches or beats \`ans\` (\`${ansNum}\`), and because \`c\` is negative, the second condition will reset \`c\` to zero.`;
        } else if (afterNum < 0) {
          teacherNote = `We added \`${op.rhsVal}\` to \`c\`, giving \`${op.afterVal}\`. Because the result is negative, the \`if c < 0:\` check will reset \`c\` to zero.`;
        } else if (ansNum !== null && afterNum >= ansNum) {
          teacherNote = `We added \`${op.rhsVal}\` to \`c\`, bringing \`c\` up to \`${op.afterVal}\`! Because \`${op.afterVal}\` is at least as large as our best sum \`ans\` (\`${ansNum}\`), the next condition will update \`ans\` to \`${op.afterVal}\`!`;
        } else {
          teacherNote = `We added \`${op.rhsVal}\` to \`c\`, changing \`c\` from \`${op.beforeVal}\` to \`${op.afterVal}\`. Since \`c\` is still positive, we keep building this continuous section.`;
        }
      }

      return {
        title: `Step ${n}: Add the current number`,
        calculationCard: {
          currentNumber: op.rhsVal,
          before: `${op.target} = ${op.beforeVal}`,
          calculation: `${op.target} = ${op.beforeVal} ${op.baseOp} (${op.rhsVal})`,
          after: `${op.target} = ${op.afterVal}`
        },
        whatItMeans: teacherNote,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 6. For Loop iteration (`for i in range(len(nums)):`)
    if (step.eventType === "LOOP_ITER" && op.kind === "for_iter") {
      const elemInfo = op.indexedElementInfo;
      return {
        title: `Step ${n}: Loop pass ${op.iteration} of ${op.total} (${op.iterVar} = ${op.iterVal})`,
        calculationCard: elemInfo
          ? {
              currentNumber: elemInfo.elementVal,
              before: `Position ${elemInfo.indexVar} = ${elemInfo.indexVal}`,
              calculation: `Look up ${elemInfo.arrayName}[${elemInfo.indexVal}]`,
              after: `Current number is ${elemInfo.elementVal}`
            }
          : null,
        whatItMeans: elemInfo
          ? `The loop moves to position \`${op.iterVar} = ${op.iterVal}\` (item ${op.iteration} of ${op.total}). The number at \`${elemInfo.arrayName}[${op.iterVal}]\` on the heap is **\`${elemInfo.elementVal}\`**.`
          : `The loop starts pass ${op.iteration} of ${op.total} and binds \`${op.iterVar} = ${op.iterVal}\`.`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 6b. While Loop iteration (`while left <= right:`)
    if (step.eventType === "LOOP_ITER" && op.kind === "while_check" && cond) {
      return {
        title: `Step ${n}: Check while loop condition (${cond.expr})`,
        calculationCard: {
          currentNumber: null,
          before: `${cond.leftExpr} = ${cond.leftVal}, ${cond.rightExpr} = ${cond.rightVal}`,
          calculation: `${cond.leftVal} ${cond.operator} ${cond.rightVal}`,
          after: `True (Enter loop pass #${op.iteration})`
        },
        whatItMeans: scFrame
          ? `We test \`${cond.expr}\`: ${scFrame.focus}. Result is **True**, so Python enters loop pass #${op.iteration}.`
          : `We check if \`${cond.expr}\` (\`${cond.leftVal} ${cond.operator} ${cond.rightVal}\`). It evaluates to **True**, so Python enters loop pass #${op.iteration}!`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 7. Loop End
    if (step.eventType === "LOOP_END") {
      return {
        title: `Step ${n}: Loop finished`,
        calculationCard: cond
          ? {
              currentNumber: null,
              before: `${cond.leftExpr} (${cond.leftVal})`,
              calculation: `${cond.leftVal} ${cond.operator} ${cond.rightVal}`,
              after: `False (Exit loop)`
            }
          : null,
        whatItMeans:
          op.kind === "while_check" && cond
            ? `We check \`${cond.expr}\` (\`${cond.leftVal} ${cond.operator} ${cond.rightVal}\`), which is now **False**! Python exits the \`while\` loop.`
            : `We have checked every single item in the sequence! The loop is now finished, so Python leaves the loop.`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 8. Condition Check (`if c >= ans:`, `if arr[mid] == target:`, or compound short-circuit conditions)
    if (step.eventType === "CONDITION" && cond) {
      let stepTitle = `Step ${n}: Check the condition (${cond.expr})`;
      let explanation = "";

      if (scFrame) {
        stepTitle = `Step ${n}: Short-Circuit Condition Check (${cond.expr})`;
        explanation = `Python evaluates \`${cond.expr}\` left-to-right using **short-circuit logic**: ${scFrame.focus}. Because the outcome is already determined (**${cond.result ? "True" : "False"}**), Python never evaluates the remaining clause!`;
      } else if (cond.expr === "c >= ans") {
        stepTitle = `Step ${n}: Check if c (${cond.leftVal}) beats or ties ans (${cond.rightVal})`;
        explanation = cond.result
          ? `We ask: Is \`c >= ans\` (\`Is ${cond.leftVal} >= ${cond.rightVal}\`)? **Yes, True!** Our current sum \`c\` is at least as big as \`ans\`, so Python goes inside the \`if\` block to update \`ans\`.`
          : `We ask: Is \`c >= ans\` (\`Is ${cond.leftVal} >= ${cond.rightVal}\`)? **No, False.** \`${cond.leftVal}\` is smaller than \`${cond.rightVal}\`, so \`ans\` stays \`${cond.rightVal}\` and Python skips this \`if\` block.`;
      } else if (cond.expr === "c < 0") {
        stepTitle = `Step ${n}: Check if c (${cond.leftVal}) is negative`;
        explanation = cond.result
          ? `We ask: Is \`c < 0\` (\`Is ${cond.leftVal} < 0\`)? **Yes, True!** Because \`c\` is negative (\`${cond.leftVal}\`), Python goes inside this \`if\` block to reset \`c\` back to \`0\`.`
          : `We ask: Is \`c < 0\` (\`Is ${cond.leftVal} < 0\`)? **No, False.** Since \`${cond.leftVal}\` is not negative, we do not reset \`c\`—we keep this sum for the next number!`;
      } else {
        explanation = `Python reduces the sub-expressions inside \`${cond.expr}\` to \`${cond.leftVal} ${cond.operator} ${cond.rightVal}\`, which evaluates to **${cond.result ? "True" : "False"}**.`;
      }

      return {
        title: stepTitle,
        calculationCard: {
          currentNumber: null,
          before: `${cond.leftExpr} is ${cond.leftVal}, ${cond.rightExpr} is ${cond.rightVal}`,
          calculation: `${cond.leftVal} ${cond.operator} ${cond.rightVal}`,
          after: cond.result ? "True (Run the indented line)" : "False (Skip the indented line)"
        },
        whatItMeans: explanation,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 8b. Else branch
    if (step.eventType === "ELSE_BRANCH") {
      return {
        title: `Step ${n}: Enter the else branch`,
        calculationCard: null,
        whatItMeans:
          `Because all preceding \`if\` / \`elif\` conditions were **False**, Python automatically enters the \`else:\` block.`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: null
      };
    }

    // 9. Return Statement
    if (step.eventType === "RETURN") {
      const subText =
        bestSubarrayInfo && bestSubarrayInfo.subarray && step.codeText.includes("ans")
          ? `The continuous section \`[${bestSubarrayInfo.subarray.join(", ")}]\` has the largest sum: **${op.returnVal}**.`
          : `The function finishes its **Local Scope** frame and returns the final answer: **${op.returnVal}**.`;

      return {
        title: `Step ${n}: Return the answer (${op.returnVal})`,
        calculationCard: null,
        whatItMeans:
          `\`${step.codeText}\` evaluates to **\`${op.returnVal}\`**, sends **\`${op.returnVal}\`** back to the caller, and destroys the local scope frame for \`${step.functionName}\`!`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextStep
          ? nextSentence
          : `The program is complete! You can click Restart or try a different input above.`,
        finalBanner: !nextStep
          ? {
              answer: op.returnVal,
              summary: subText
            }
          : null
      };
    }

    // 10. Print Statement (`print(s.pop())`, `print(...)`)
    if (step.eventType === "PRINT") {
      const allOut = (step.stdout || []).join("  |  ");
      return {
        title: `Step ${n}: Print output (${op.output})`,
        calculationCard: {
          currentNumber: null,
          before: step.codeText,
          calculation: `Evaluated inside print(...) → ${op.output}`,
          after: `Printed "${op.output}" to console`
        },
        whatItMeans:
          `Python finishes evaluating the expression inside \`${step.codeText}\` and prints **\`${op.output}\`** to the screen.`,
        variableValuesNow: relevantVarsNow,
        whatHappensNext: nextSentence,
        finalBanner: !nextStep
          ? {
              answer: allOut || op.output,
              summary: `Program finished! Console output printed: **${allOut || op.output}**`
            }
          : null
      };
    }

    // Fallback for break / continue / exceptions
    return {
      title: `Step ${n}: Execute line ${step.line}`,
      calculationCard: null,
      whatItMeans:
        step.eventType === "EXCEPTION"
          ? `Python stopped with an error: \`${op.message}\`.`
          : `Python runs \`${step.codeText}\`.`,
      variableValuesNow: relevantVarsNow,
      whatHappensNext: nextSentence,
      finalBanner: null
    };
  }

  formatRelevantVariablesNow(step) {
    const vars = step.variables || [];
    const compact = vars.filter((v) => !Array.isArray(v.rawValue));
    if (compact.length === 0) {
      if (vars.length > 0) {
        return vars.map((v) => `${v.name} (${v.address || "@0x2000"}) = ${v.current}`).join(", ");
      }
      return "No variables created yet";
    }
    const parts = compact.map((v) => `${v.name} = ${v.current}`);
    if (step.loop && step.loop.indexedElementInfo) {
      const el = step.loop.indexedElementInfo;
      parts.push(`${el.arrayName}[${el.indexVal}] = ${el.elementVal}`);
    }
    return parts.join("   •   ");
  }

  buildFriendlyWhatNext(step, nextStep) {
    if (!nextStep) {
      return "We have reached the end of the program!";
    }
    const nextCode = nextStep.codeText || "";
    if (nextStep.eventType === "METHOD_DEF" || nextStep.eventType === "FUNC_DEF") {
      return `Python moves to Line ${nextStep.line} to register the function \`${nextStep.operationDetail.funcName}\`.`;
    }
    if (nextStep.eventType === "FUNC_CALL") {
      return `Python calls \`${nextStep.operationDetail.funcName}()\`, creates a new Local Scope frame, and enters the function body.`;
    }
    if (nextStep.eventType === "LOOP_ITER") {
      const nextOp = nextStep.operationDetail || {};
      if (nextOp.kind === "while_check") {
        return `Python moves to Line ${nextStep.line} to test the \`while\` loop condition (\`${nextStep.condition?.expr || nextCode}\`).`;
      }
      return nextOp.iteration === 1
        ? `Python moves to Line ${nextStep.line} to start the loop with the first item (\`${nextOp.iterVar} = ${nextOp.iterVal}\`).`
        : `Python loops back up to Line ${nextStep.line} to advance to the next item (\`${nextOp.iterVar} = ${nextOp.iterVal}\`).`;
    }
    if (nextStep.eventType === "LOOP_END") {
      return `Python checks the loop header on Line ${nextStep.line}, sees the loop condition is finished, and exits the loop.`;
    }
    if (nextStep.eventType === "RETURN") {
      return `Python moves to Line ${nextStep.line} (\`${nextCode}\`) to return the result and exit the local function scope.`;
    }
    return `Python moves to Line ${nextStep.line} and evaluates \`${nextCode}\`.`;
  }

  buildStepExplanation(step, prevStep, nextStep) {
    const lesson = step.teacherLesson || this.buildTeacherLesson(step, prevStep, nextStep, null);
    const code = step.codeText || "";
    const cond = step.condition;
    const beforeVars = step.beforeVars || {};

    const beforeKeys = Object.keys(beforeVars);
    const variablesBefore =
      beforeKeys.length === 0
        ? "No local variables existed before this step."
        : beforeKeys.map((k) => `\`${k} = ${beforeVars[k]}\``).join(", ");

    let whyCondition = "Not a condition line.";
    if (cond) {
      whyCondition = cond.shortCircuited
        ? `Short-circuited on \`${cond.leftExpr} = ${cond.leftVal}\` (${cond.operator}) → **${cond.result ? "True" : "False"}**.`
        : `\`${cond.leftVal} ${cond.operator} ${cond.rightVal}\` evaluated to **${cond.result ? "True" : "False"}**.`;
    }

    return {
      whatBeginner: lesson.whatItMeans,
      whatTechnical: `Event \`${step.eventType}\` at Line ${step.line} in \`${step.functionName}\` (${step.scopeType || "LOCAL"}): ${step.changedSummary}.`,
      symbolsMeaning: this.explainSymbolsInLine(code),
      whyExecuting: prevStep
        ? `Moved from Line ${prevStep.line} to Line ${step.line}.`
        : `First statement in the program.`,
      variablesBefore,
      whatChangesAfter: step.changedSummary || "No variable changes.",
      whyCondition,
      whatNext: lesson.whatHappensNext
    };
  }

  explainSymbolsInLine(codeText) {
    const matches = [];
    for (const item of PYTHON_SYMBOLS_LIBRARY) {
      if (codeText.includes(item.token)) {
        matches.push(`• \`${item.label}\`: ${item.desc}`);
      }
    }
    return matches.length ? matches.slice(0, 3).join("<br>") : "• Standard Python statement.";
  }

  buildExecutionSummary(traceResult) {
    if (!traceResult.ok || !traceResult.steps.length) {
      return `Stopped: ${traceResult.errorMessage || "Check syntax or input."}`;
    }
    if (traceResult.finalResult !== null) {
      return `Final Answer: **${traceResult.finalResult}** (${traceResult.steps.length} steps)`;
    }
    return `Completed in ${traceResult.steps.length} steps.`;
  }
}

window.RuleBasedExplainer = RuleBasedExplainer;
