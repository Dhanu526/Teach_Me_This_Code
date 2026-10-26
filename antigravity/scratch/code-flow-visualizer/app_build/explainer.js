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
      step.teachingSubsteps = this.buildTeachingSubsteps(step, prevStep, nextStep, bestSubarrayInfo);
      step.explanations = this.buildStepExplanation(step, prevStep, nextStep);
      step.predictQuestion = this.buildPredictQuestion(step, prevStep, nextStep);

      // Propagate question to substeps for seamless substep access
      if (step.predictQuestion && step.teachingSubsteps) {
        step.teachingSubsteps.forEach((sub) => {
          sub.predictQuestion = step.predictQuestion;
        });
      }
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

  formatSubstepVars(step, useBeforeVars = false) {
    const vars = step.variables || [];
    const beforeVars = step.beforeVars || {};
    const op = step.operationDetail || {};

    if (useBeforeVars) {
      const keys = Object.keys(beforeVars);
      if (keys.length === 0) return "No variables created yet";
      const parts = keys
        .filter((k) => k !== "nums" && k !== "arr")
        .map((k) => `${k} = ${beforeVars[k]}`);
      if (step.loop && step.loop.indexedElementInfo) {
        const el = step.loop.indexedElementInfo;
        parts.push(`${el.arrayName}[${el.indexVal}] = ${el.elementVal}`);
      }
      return parts.length ? parts.join("   •   ") : keys.map((k) => `${k} = ${beforeVars[k]}`).join("   •   ");
    }

    return this.formatRelevantVariablesNow(step);
  }

  buildTeachingSubsteps(step, prevStep, nextStep, bestSubarrayInfo) {
    const n = step.stepIndex;
    const op = step.operationDetail || {};
    const cond = step.condition;
    const nextSentence = this.buildFriendlyWhatNext(step, nextStep);
    const varsBefore = this.formatSubstepVars(step, true);
    const varsAfter = this.formatSubstepVars(step, false);
    const beforeVarsMap = step.beforeVars || {};
    const exprFrames = step.exprFrames || [];

    const substeps = [];

    // Helper to push a substep
    const addSubstep = (data) => {
      substeps.push({
        substepIndex: substeps.length + 1,
        totalSubsteps: 0, // will be populated at the end
        substepLabel: data.substepLabel || "",
        title: `Step ${n}: ${data.substepLabel || data.title}`,
        codeSnippet: data.codeSnippet || step.codeText,
        whatIsHappening: data.whatIsHappening || "",
        symbolsMeaning: data.symbolsMeaning || this.explainSymbolsInLine(data.codeSnippet || step.codeText),
        currentValues: data.currentValues || varsBefore,
        calculationCard: data.calculationCard || null,
        whyNecessary: data.whyNecessary || "",
        whatHappensNext: data.whatHappensNext || nextSentence,
        variableValuesNow: data.varsBeforeStep ? varsBefore : varsAfter,
        varsBeforeStep: Boolean(data.varsBeforeStep),
        finalBanner: data.finalBanner || null
      });
    };

    // 1. COMPOUND OPERATION: c += nums[i] or x += 1 (Requirement 5)
    if (step.eventType === "AUG_ASSIGN") {
      const target = op.target || "c";
      const beforeVal = op.beforeVal !== undefined ? op.beforeVal : beforeVarsMap[target] || "0";
      const afterVal = op.afterVal !== undefined ? op.afterVal : op.rhsVal;
      const rhsExpr = op.rhsExpr || "nums[i]";
      const rhsVal = op.rhsVal !== undefined ? op.rhsVal : "0";
      const loop = step.loop || {};
      const isIndexed = /\[.*\]/.test(rhsExpr) || Boolean(loop.indexedElementInfo);
      const augOpMatch = step.codeText.match(/(\+=|-=|\*=|\/\/=|%=)/);
      const augOp = augOpMatch ? augOpMatch[1] : "+=";
      const baseOp = augOp.slice(0, -1) || "+";

      if (isIndexed) {
        const elInfo = loop.indexedElementInfo || { arrayName: "nums", indexVar: "i", indexVal: loop.iterVal || 0, elementVal: rhsVal };
        const indexVar = elInfo.indexVar || "i";
        const indexVal = elInfo.indexVal !== undefined ? elInfo.indexVal : 0;
        const arrayName = elInfo.arrayName || "nums";

        // Substep 1: Read the current value of target
        addSubstep({
          substepLabel: `Read current value of ${target}`,
          codeSnippet: target,
          varsBeforeStep: true,
          whatIsHappening: `Python reads the current number stored inside variable \`${target}\`. Before performing the operation, Python must know what value is already in memory.`,
          symbolsMeaning: `\`${target}\` is a variable name. In Kadane's algorithm, \`${target}\` holds our running continuous subarray sum.`,
          currentValues: `${target} = ${beforeVal}`,
          calculationCard: {
            currentNumber: null,
            before: `Variable ${target} in memory`,
            calculation: `Read current value of ${target}`,
            after: `${target} = ${beforeVal}`
          },
          whyNecessary: `A running calculation builds on top of previously accumulated numbers. We cannot compute until we look up our current value.`,
          whatHappensNext: `Python now looks at the right-hand side \`${rhsExpr}\` to find which number to use.`
        });

        // Substep 2: Read loop index
        addSubstep({
          substepLabel: `Read index ${indexVar}`,
          codeSnippet: indexVar,
          varsBeforeStep: true,
          whatIsHappening: `Python evaluates the index variable \`${indexVar}\`, which is currently **\`${indexVal}\`**.`,
          symbolsMeaning: `\`${indexVar}\` is the loop variable representing our position in the list (starting at 0 for the first item).`,
          currentValues: `${indexVar} = ${indexVal}, ${target} = ${beforeVal}`,
          calculationCard: {
            currentNumber: null,
            before: `Loop variable ${indexVar}`,
            calculation: `Evaluate index position`,
            after: `${indexVar} = ${indexVal}`
          },
          whyNecessary: `In Python, lists are indexed by position numbers. To access an element, Python must first evaluate the index expression.`,
          whatHappensNext: `Python uses index \`${indexVal}\` to look up the element at \`${arrayName}[${indexVal}]\`.`
        });

        // Substep 3: Look up element in array
        addSubstep({
          substepLabel: `Look up ${arrayName}[${indexVar}]`,
          codeSnippet: `${arrayName}[${indexVar}]`,
          varsBeforeStep: true,
          whatIsHappening: `Python accesses list \`${arrayName}\` at index \`${indexVal}\` and retrieves the number **\`${rhsVal}\`**.`,
          symbolsMeaning: `Square brackets \`[ ]\` are the list indexing operator. \`${arrayName}[${indexVal}]\` retrieves the element at position ${indexVal}.`,
          currentValues: `${arrayName}[${indexVal}] = ${rhsVal}, ${target} = ${beforeVal}`,
          calculationCard: {
            currentNumber: rhsVal,
            before: `List ${arrayName}`,
            calculation: `${arrayName}[${indexVal}]`,
            after: `Current number is ${rhsVal}`
          },
          whyNecessary: `We need the concrete numerical value at this position in the list to include it in our calculation.`,
          whatHappensNext: `Python performs the arithmetic: \`${target} ${baseOp} ${rhsVal}\`.`
        });

        // Substep 4: Show the arithmetic using actual values
        addSubstep({
          substepLabel: `Calculate ${beforeVal} ${baseOp} (${rhsVal})`,
          codeSnippet: `${beforeVal} ${baseOp} (${rhsVal})`,
          varsBeforeStep: true,
          whatIsHappening: `Python combines the current value (\`${beforeVal}\`) with the list element (\`${rhsVal}\`): \`${beforeVal} ${baseOp} (${rhsVal}) = ${afterVal}\`.`,
          symbolsMeaning: `\`${baseOp}\` is the arithmetic operator. It combines the operands into a single numerical result.`,
          currentValues: `${target} = ${beforeVal}, current number = ${rhsVal}`,
          calculationCard: {
            currentNumber: rhsVal,
            before: `${target} = ${beforeVal}`,
            calculation: `${beforeVal} ${baseOp} (${rhsVal})`,
            after: `${afterVal}`
          },
          whyNecessary: `This calculates what our running total becomes if we include this number.`,
          whatHappensNext: `Python checks the resulting value and stores it back in \`${target}\`.`
        });

        // Substep 5: Show the resulting value
        addSubstep({
          substepLabel: `Calculation result is ${afterVal}`,
          codeSnippet: `${target} ${baseOp} ${rhsVal} → ${afterVal}`,
          varsBeforeStep: true,
          whatIsHappening: `The calculation evaluates to **\`${afterVal}\`**! Notice whether this made our sum larger or smaller than before.`,
          symbolsMeaning: `The mathematical calculation is complete; now Python prepares to update the variable in memory.`,
          currentValues: `Calculated result = ${afterVal}`,
          calculationCard: {
            currentNumber: rhsVal,
            before: `Previous ${target} = ${beforeVal}`,
            calculation: `Result of operation`,
            after: `${afterVal}`
          },
          whyNecessary: `Examining the result shows how this operation impacted our variable.`,
          whatHappensNext: `Python stores this new value back into variable \`${target}\`.`
        });

        // Substep 6: Explain that the result is stored back in target
        const afterNum = Number(afterVal);
        const ansRow = (step.variables || []).find((v) => v.name === "ans");
        const ansNum = ansRow ? Number(ansRow.current) : null;
        let whyNote = `The variable \`${target}\` now holds the new value for future comparisons and operations.`;
        if (target === "c" && afterNum < 0) {
          whyNote += ` Because \`${afterVal}\` is negative, the next condition (\`if c < 0:\`) will reset it to zero.`;
        } else if (target === "c" && ansNum !== null && afterNum >= ansNum) {
          whyNote += ` Because \`${afterVal}\` beats or matches \`ans\` (\`${ansNum}\`), the next condition will update \`ans\`!`;
        }

        addSubstep({
          substepLabel: `Store result back in ${target}`,
          codeSnippet: `${target} = ${afterVal}`,
          varsBeforeStep: false,
          whatIsHappening: `Python binds variable \`${target}\` to the new value **\`${afterVal}\`**. Variable \`${target}\` is now officially **\`${afterVal}\`**!`,
          symbolsMeaning: `\`${augOp}\` is an augmented assignment operator: it calculates the new value and updates the variable in memory in one step.`,
          currentValues: `${target} = ${afterVal}`,
          calculationCard: {
            currentNumber: rhsVal,
            before: `${target} was ${beforeVal}`,
            calculation: `${target} ${augOp} ${rhsVal}`,
            after: `${target} is now ${afterVal}`
          },
          whyNecessary: whyNote,
          whatHappensNext: nextSentence
        });
      } else {
        // Non-indexed augmented assignment (e.g. count += 1, total += x)
        // Substep 1: Read current value
        addSubstep({
          substepLabel: `Read current value of ${target}`,
          codeSnippet: target,
          varsBeforeStep: true,
          whatIsHappening: `Python looks up variable \`${target}\`, which currently holds **\`${beforeVal}\`**.`,
          symbolsMeaning: `Reading variable \`${target}\` from scope.`,
          currentValues: `${target} = ${beforeVal}`,
          calculationCard: {
            currentNumber: null,
            before: `Variable ${target}`,
            calculation: `Read current value`,
            after: `${target} = ${beforeVal}`
          },
          whyNecessary: `Python must read the existing value of \`${target}\` before updating it.`,
          whatHappensNext: `Python evaluates the right-hand operand \`${rhsExpr}\`.`
        });

        // Substep 2: Read right side
        addSubstep({
          substepLabel: `Evaluate right side ${rhsExpr} = ${rhsVal}`,
          codeSnippet: rhsExpr,
          varsBeforeStep: true,
          whatIsHappening: `Python evaluates the right-hand side \`${rhsExpr}\`, which resolves to **\`${rhsVal}\`**.`,
          symbolsMeaning: `Evaluating operand for \`${augOp}\`.`,
          currentValues: `Operand = ${rhsVal}`,
          whyNecessary: `The right-hand value is needed to perform the operation.`,
          whatHappensNext: `Python performs the arithmetic: \`${beforeVal} ${baseOp} (${rhsVal})\`.`
        });

        // Substep 3: Perform calculation
        addSubstep({
          substepLabel: `Calculate ${beforeVal} ${baseOp} (${rhsVal}) = ${afterVal}`,
          codeSnippet: `${beforeVal} ${baseOp} (${rhsVal})`,
          varsBeforeStep: true,
          whatIsHappening: `Python performs the arithmetic: \`${beforeVal} ${baseOp} (${rhsVal}) = ${afterVal}\`.`,
          symbolsMeaning: `\`${baseOp}\` calculates the updated value.`,
          currentValues: `Calculated result = ${afterVal}`,
          calculationCard: {
            currentNumber: rhsVal,
            before: `${target} = ${beforeVal}`,
            calculation: `${beforeVal} ${baseOp} (${rhsVal})`,
            after: `${afterVal}`
          },
          whyNecessary: `Computes the new value to update variable \`${target}\`.`,
          whatHappensNext: `Python writes the result back into \`${target}\`.`
        });

        // Substep 4: Store result back
        addSubstep({
          substepLabel: `Store result back in ${target} = ${afterVal}`,
          codeSnippet: `${target} = ${afterVal}`,
          varsBeforeStep: false,
          whatIsHappening: `Python stores **\`${afterVal}\`** back into \`${target}\`. Variable \`${target}\` updated from \`${beforeVal}\` to **\`${afterVal}\`**.`,
          symbolsMeaning: `\`${augOp}\` assignment complete.`,
          currentValues: `${target} = ${afterVal}`,
          calculationCard: {
            currentNumber: rhsVal,
            before: `${target} was ${beforeVal}`,
            calculation: `${target} ${augOp} ${rhsVal}`,
            after: `${target} is now ${afterVal}`
          },
          whyNecessary: `Updates the variable in memory.`,
          whatHappensNext: nextSentence
        });
      }
    }

    // 2. CONDITION: if c >= ans: or if c < 0: (Requirement 6)
    else if (step.eventType === "CONDITION" && cond) {
      const isMaxCheck = cond.expr === "c >= ans" || (cond.leftExpr === "c" && cond.rightExpr === "ans");
      const isNegativeCheck = cond.expr === "c < 0" || (cond.leftExpr === "c" && cond.rightVal === "0" && cond.operator === "<");

      if (isMaxCheck) {
        // Substep 1: Read current values of c and ans
        addSubstep({
          substepLabel: `Read current values of c and ans`,
          codeSnippet: `c, ans`,
          varsBeforeStep: false,
          whatIsHappening: `Python looks up the two numbers to compare: running sum \`c\` is **\`${cond.leftVal}\`**, and best sum \`ans\` is **\`${cond.rightVal}\`**.`,
          symbolsMeaning: `\`if\` starts a conditional test. \`c\` is our current continuous sum; \`ans\` is the maximum sum recorded so far.`,
          currentValues: `c = ${cond.leftVal}, ans = ${cond.rightVal}`,
          calculationCard: {
            currentNumber: null,
            before: `Variables in memory`,
            calculation: `Read c and ans`,
            after: `c = ${cond.leftVal}, ans = ${cond.rightVal}`
          },
          whyNecessary: `To decide if we found a new record subarray sum, Python must inspect both values.`,
          whatHappensNext: `Python compares \`${cond.leftVal}\` and \`${cond.rightVal}\` using the \`>=\` operator.`
        });

        // Substep 2: The comparison with actual values
        addSubstep({
          substepLabel: `Compare ${cond.leftVal} >= ${cond.rightVal}`,
          codeSnippet: `${cond.leftVal} >= ${cond.rightVal}`,
          varsBeforeStep: false,
          whatIsHappening: `Python tests: Is \`${cond.leftVal}\` greater than or equal to \`${cond.rightVal}\`?`,
          symbolsMeaning: `\`>=\` means "greater than or equal to". It asks whether the left number is at least as large as the right number.`,
          currentValues: `c = ${cond.leftVal}, ans = ${cond.rightVal}`,
          calculationCard: {
            currentNumber: null,
            before: `c = ${cond.leftVal}, ans = ${cond.rightVal}`,
            calculation: `${cond.leftVal} >= ${cond.rightVal}`,
            after: `Testing comparison...`
          },
          whyNecessary: `This is the core check that decides if our current subarray beat our historical best.`,
          whatHappensNext: `Python evaluates the comparison to a boolean result (True or False).`
        });

        // Substep 3: The True/False result
        addSubstep({
          substepLabel: `Result is ${cond.result ? "True" : "False"}`,
          codeSnippet: `${cond.leftVal} >= ${cond.rightVal} → ${cond.result ? "True" : "False"}`,
          varsBeforeStep: false,
          whatIsHappening: cond.result
            ? `The comparison evaluates to **True**! Because \`${cond.leftVal}\` is at least as large as \`${cond.rightVal}\`, we found a new or tied maximum sum!`
            : `The comparison evaluates to **False**. \`${cond.leftVal}\` is smaller than our record \`${cond.rightVal}\`.`,
          symbolsMeaning: `In Python, comparison operators always return a boolean: \`True\` or \`False\`.`,
          currentValues: `Comparison result = ${cond.result ? "True" : "False"}`,
          calculationCard: {
            currentNumber: null,
            before: `${cond.leftVal} >= ${cond.rightVal}`,
            calculation: `Boolean result`,
            after: cond.result ? "True" : "False"
          },
          whyNecessary: `Python conditional branching depends directly on this True or False outcome.`,
          whatHappensNext: `Python uses this result to choose whether to enter the indented block.`
        });

        // Substep 4: The branch that executes
        addSubstep({
          substepLabel: cond.result ? `Enter if block (update ans)` : `Skip if block (keep ans)`,
          codeSnippet: cond.result ? `ans = c  # Will run` : `ans = c  # Skipped`,
          varsBeforeStep: false,
          whatIsHappening: cond.result
            ? `Because the test is **True**, Python enters the indented block to execute \`ans = c\` and save this record!`
            : `Because the test is **False**, Python skips the indented line \`ans = c\`. Variable \`ans\` remains \`${cond.rightVal}\`.`,
          symbolsMeaning: `Indentation (spaces) tells Python which statements belong inside the \`if\` branch.`,
          currentValues: `ans = ${cond.rightVal}`,
          calculationCard: {
            currentNumber: null,
            before: `Condition was ${cond.result ? "True" : "False"}`,
            calculation: cond.result ? `Execute ans = c` : `Skip ans = c`,
            after: cond.result ? `Update ans to ${cond.leftVal}` : `Keep ans at ${cond.rightVal}`
          },
          whyNecessary: `Only updating \`ans\` when \`c >= ans\` guarantees that \`ans\` always preserves the best sum found so far.`,
          whatHappensNext: `Python explains why it moves to the next line.`
        });

        // Substep 5: Reason program moves to next line
        addSubstep({
          substepLabel: `Reason to move to next line`,
          codeSnippet: step.codeText,
          varsBeforeStep: false,
          whatIsHappening: cond.result
            ? `Having verified \`c >= ans\` is True, Python moves to Line ${nextStep?.line || step.line + 1} to assign \`ans = c\`.`
            : `Because the condition evaluated to False, Python skips the indented assignment and moves forward to Line ${nextStep?.line || step.line + 2} to test the next condition \`if c < 0:\`.`,
          symbolsMeaning: `Sequential control flow: Python moves line-by-line according to conditional branch results.`,
          currentValues: `c = ${cond.leftVal}, ans = ${cond.rightVal}`,
          whyNecessary: `Understanding branch flow helps beginners see why lines are either executed or skipped.`,
          whatHappensNext: nextSentence
        });
      } else if (isNegativeCheck) {
        // Substep 1: Read current value of c
        addSubstep({
          substepLabel: `Read current sum c`,
          codeSnippet: `c`,
          varsBeforeStep: false,
          whatIsHappening: `Python checks the value of \`c\`, which is currently **\`${cond.leftVal}\`**.`,
          symbolsMeaning: `\`if\` starts our second check: is the running sum negative?`,
          currentValues: `c = ${cond.leftVal}`,
          calculationCard: {
            currentNumber: null,
            before: `Running sum c`,
            calculation: `Read c`,
            after: `c = ${cond.leftVal}`
          },
          whyNecessary: `Kadane's algorithm must detect whenever the running sum dips below zero.`,
          whatHappensNext: `Python compares \`${cond.leftVal}\` against \`0\` using the \`<\` operator.`
        });

        // Substep 2: Compare c < 0
        addSubstep({
          substepLabel: `Compare ${cond.leftVal} < 0`,
          codeSnippet: `${cond.leftVal} < 0`,
          varsBeforeStep: false,
          whatIsHappening: `Python asks: Is \`${cond.leftVal}\` strictly less than \`0\`?`,
          symbolsMeaning: `\`<\` is the "strictly less than" operator. It checks if the number is negative.`,
          currentValues: `c = ${cond.leftVal}`,
          calculationCard: {
            currentNumber: null,
            before: `c = ${cond.leftVal}`,
            calculation: `${cond.leftVal} < 0`,
            after: `Testing if negative...`
          },
          whyNecessary: `Why am I learning this? Kadane's algorithm rule: If a continuous subarray total drops below zero, keeping it will only reduce any future sum! Discarding a negative prefix is always optimal.`,
          whatHappensNext: `Python determines the boolean result.`
        });

        // Substep 3: The True/False result
        addSubstep({
          substepLabel: `Result is ${cond.result ? "True" : "False"}`,
          codeSnippet: `${cond.leftVal} < 0 → ${cond.result ? "True" : "False"}`,
          varsBeforeStep: false,
          whatIsHappening: cond.result
            ? `The test is **True**! \`${cond.leftVal}\` is negative.`
            : `The test is **False**. \`${cond.leftVal}\` is zero or positive, which means this subarray is worth keeping!`,
          symbolsMeaning: `Boolean outcome determining the reset branch.`,
          currentValues: `Condition result = ${cond.result ? "True" : "False"}`,
          calculationCard: {
            currentNumber: null,
            before: `${cond.leftVal} < 0`,
            calculation: `Boolean result`,
            after: cond.result ? "True" : "False"
          },
          whyNecessary: `This boolean directs the reset logic.`,
          whatHappensNext: `Python decides whether to reset \`c\` to 0.`
        });

        // Substep 4: The branch that executes
        addSubstep({
          substepLabel: cond.result ? `Enter if block (reset c = 0)` : `Skip reset (keep c = ${cond.leftVal})`,
          codeSnippet: cond.result ? `c = 0  # Will run` : `c = 0  # Skipped`,
          varsBeforeStep: false,
          whatIsHappening: cond.result
            ? `Because \`c\` is negative, Python enters the \`if\` block to execute \`c = 0\` and start fresh.`
            : `Because \`c\` is not negative, Python skips the reset block. \`c\` stays \`${cond.leftVal}\` for the next loop iteration.`,
          symbolsMeaning: `Conditional branch execution.`,
          currentValues: `c = ${cond.leftVal}`,
          calculationCard: {
            currentNumber: null,
            before: `c = ${cond.leftVal}`,
            calculation: cond.result ? `Execute c = 0` : `Skip c = 0`,
            after: cond.result ? `Reset to 0` : `Keep ${cond.leftVal}`
          },
          whyNecessary: `A negative running sum cannot help any future subarray; resetting it ensures future subarrays start clean.`,
          whatHappensNext: `Python moves to the next line or loops back.`
        });

        // Substep 5: Reason program moves to next line
        addSubstep({
          substepLabel: `Reason to move forward`,
          codeSnippet: step.codeText,
          varsBeforeStep: false,
          whatIsHappening: cond.result
            ? `Python enters Line ${nextStep?.line || step.line + 1} to reset \`c = 0\`.`
            : `Python finishes this loop iteration and advances to the next loop pass or loop exit.`,
          symbolsMeaning: `Advancing to the next statement in control flow.`,
          currentValues: `c = ${cond.leftVal}`,
          whyNecessary: `Understanding the loop cycle helps beginners visualize each iteration clearly.`,
          whatHappensNext: nextSentence
        });
      } else {
        // General condition
        addSubstep({
          substepLabel: `Read condition values`,
          codeSnippet: cond.expr,
          varsBeforeStep: false,
          whatIsHappening: `Python retrieves the values inside \`${cond.expr}\`: \`${cond.leftExpr}\` is \`${cond.leftVal}\`, and \`${cond.rightExpr}\` is \`${cond.rightVal}\`.`,
          symbolsMeaning: `\`if\` condition test.`,
          currentValues: varsAfter,
          calculationCard: {
            currentNumber: null,
            before: `${cond.leftExpr} = ${cond.leftVal}`,
            calculation: `Read condition variables`,
            after: `${cond.rightExpr} = ${cond.rightVal}`
          },
          whyNecessary: `Python evaluates all operands before performing comparison.`,
          whatHappensNext: `Python compares the values.`
        });

        addSubstep({
          substepLabel: `Compare ${cond.leftVal} ${cond.operator} ${cond.rightVal}`,
          codeSnippet: `${cond.leftVal} ${cond.operator} ${cond.rightVal}`,
          varsBeforeStep: false,
          whatIsHappening: `Python compares: \`${cond.leftVal} ${cond.operator} ${cond.rightVal}\`.`,
          symbolsMeaning: `\`${cond.operator}\` comparison operator.`,
          currentValues: varsAfter,
          calculationCard: {
            currentNumber: null,
            before: `${cond.leftVal} ${cond.operator} ${cond.rightVal}`,
            calculation: `Comparison test`,
            after: `Evaluating...`
          },
          whyNecessary: `This tests the logic of your program at this step.`,
          whatHappensNext: `Python evaluates the boolean result.`
        });

        addSubstep({
          substepLabel: `Result is ${cond.result ? "True" : "False"}`,
          codeSnippet: `${cond.expr} → ${cond.result ? "True" : "False"}`,
          varsBeforeStep: false,
          whatIsHappening: `The condition evaluates to **${cond.result ? "True" : "False"}**!`,
          symbolsMeaning: `Boolean result.`,
          currentValues: `Result = ${cond.result ? "True" : "False"}`,
          calculationCard: {
            currentNumber: null,
            before: `${cond.expr}`,
            calculation: `Boolean outcome`,
            after: cond.result ? "True" : "False"
          },
          whyNecessary: `Controls whether the indented block runs or skips.`,
          whatHappensNext: cond.result ? `Python executes the branch.` : `Python skips the branch.`
        });

        addSubstep({
          substepLabel: cond.result ? `Execute branch` : `Skip branch`,
          codeSnippet: step.codeText,
          varsBeforeStep: false,
          whatIsHappening: cond.result
            ? `Because the condition is True, Python enters the indented block.`
            : `Because the condition is False, Python skips the indented block.`,
          symbolsMeaning: `Conditional control flow.`,
          currentValues: varsAfter,
          calculationCard: {
            currentNumber: null,
            before: `Condition was ${cond.result ? "True" : "False"}`,
            calculation: cond.result ? `Enter indented block` : `Skip indented block`,
            after: cond.result ? `Execute branch` : `Skip branch`
          },
          whyNecessary: `Enforces program logic.`,
          whatHappensNext: `Python determines which line to execute next.`
        });

        // Substep 5: Reason program moves to next line
        addSubstep({
          substepLabel: `Reason to move forward`,
          codeSnippet: step.codeText,
          varsBeforeStep: false,
          whatIsHappening: cond.result
            ? `Because the condition evaluated to True, Python moves to Line ${nextStep?.line || step.line + 1} to run the statements inside this block.`
            : `Because the condition evaluated to False, Python skips this entire branch and advances past the block.`,
          symbolsMeaning: `Sequential control flow.`,
          currentValues: varsAfter,
          whyNecessary: `Understanding branch flow helps beginners see why lines are executed or skipped.`,
          whatHappensNext: nextSentence
        });
      }
    }

    // 3. VARIABLE ASSIGNMENTS (Requirement 8: distinguish creating vs updating)
    else if (step.eventType === "ASSIGN") {
      const target = op.target || "var";
      const isCreated = op.isCreated;
      const beforeVal = op.beforeVal !== undefined ? op.beforeVal : beforeVarsMap[target];
      const afterVal = op.afterVal !== undefined ? op.afterVal : "0";
      const rhsExpr = op.rhsExpr || "";

      if (target === "c" && isCreated) {
        // Substep 1: Explain what a variable is
        addSubstep({
          substepLabel: `What is a variable?`,
          codeSnippet: `c`,
          varsBeforeStep: true,
          whatIsHappening: `Before creating \`c\`, let's understand what a variable is: In Python, a **variable** is a named reference that points to a value in memory. The name \`c\` is chosen to represent our running "current sum".`,
          symbolsMeaning: `A variable name labels a location where data is held.`,
          currentValues: `No variables yet`,
          whyNecessary: `Why am I learning this? Variables allow programs to remember numbers, update them during loops, and compare results.`,
          whatHappensNext: `Python inspects the assignment operator \`=\` and the value \`0\`.`
        });

        // Substep 2: Explain assignment operator =
        addSubstep({
          substepLabel: `The assignment operator =`,
          codeSnippet: `=`,
          varsBeforeStep: true,
          whatIsHappening: `In Python, \`=\` does NOT mean mathematical equality. It is the **assignment operator**: it evaluates the expression on the right first, then binds the name on the left to that result.`,
          symbolsMeaning: `\`=\` assigns a value to a variable name.`,
          currentValues: `Right side = 0`,
          calculationCard: {
            currentNumber: null,
            before: `Right-hand expression`,
            calculation: `Evaluate 0`,
            after: `0`
          },
          whyNecessary: `Understanding that \`=\` works right-to-left prevents confusion between assignment (\`=\`) and comparison (\`==\`).`,
          whatHappensNext: `Python stores \`0\` in memory and points \`c\` to it.`
        });

        // Substep 3: Create c and store 0
        addSubstep({
          substepLabel: `Create variable c = 0`,
          codeSnippet: `c = 0`,
          varsBeforeStep: false,
          whatIsHappening: `We create a new local variable named \`c\` and store \`0\` inside it! \`c\` is now ready to track our running subarray sum.`,
          symbolsMeaning: `Variable creation in Local Scope.`,
          currentValues: `c = 0`,
          calculationCard: {
            currentNumber: null,
            before: `Unbound name c`,
            calculation: `c = 0`,
            after: `c is now 0`
          },
          whyNecessary: `Every running total starts at 0 before we add any elements from the list.`,
          whatHappensNext: nextSentence
        });
      } else if (target === "ans" && isCreated) {
        // Substep 1: Look up nums[0]
        addSubstep({
          substepLabel: `Look up first item nums[0]`,
          codeSnippet: `nums[0]`,
          varsBeforeStep: true,
          whatIsHappening: `Python evaluates the right side first: it looks up index \`0\` in the list \`nums\`, which is **\`${afterVal}\`**.`,
          symbolsMeaning: `\`nums[0]\` accesses the very first item in list \`nums\`.`,
          currentValues: `nums[0] = ${afterVal}, c = ${beforeVarsMap.c || 0}`,
          calculationCard: {
            currentNumber: null,
            before: `List nums`,
            calculation: `nums[0]`,
            after: `${afterVal}`
          },
          whyNecessary: `Why initialize ans to nums[0]? A continuous subarray must contain at least one number. Starting with \`nums[0]\` guarantees our answer is correct even if every number in the list is negative!`,
          whatHappensNext: `Python creates the variable \`ans\` and assigns \`${afterVal}\` to it.`
        });

        // Substep 2: Create variable ans
        addSubstep({
          substepLabel: `Create variable ans`,
          codeSnippet: `ans`,
          varsBeforeStep: true,
          whatIsHappening: `Python allocates a new variable named \`ans\` in local scope. \`ans\` will remember the largest subarray sum found anywhere in the list.`,
          symbolsMeaning: `Variable declaration in Local Scope.`,
          currentValues: `c = ${beforeVarsMap.c || 0}`,
          whyNecessary: `We need a dedicated variable to keep track of our maximum sum as we iterate through all possible subarrays.`,
          whatHappensNext: `Python binds \`ans\` to the value \`${afterVal}\`.`
        });

        // Substep 3: Bind ans to value
        addSubstep({
          substepLabel: `Store ${afterVal} in ans`,
          codeSnippet: `ans = nums[0] (${afterVal})`,
          varsBeforeStep: false,
          whatIsHappening: `Variable \`ans\` is officially created and bound to **\`${afterVal}\`**! Both initial variables (\`c = 0\` and \`ans = ${afterVal}\`) are now initialized.`,
          symbolsMeaning: `Assignment operator binding name to value.`,
          currentValues: `c = ${beforeVarsMap.c || 0}, ans = ${afterVal}`,
          calculationCard: {
            currentNumber: null,
            before: `ans uninitialized`,
            calculation: `ans = nums[0]`,
            after: `ans = ${afterVal}`
          },
          whyNecessary: `Setup is complete; now the program can begin the \`for\` loop to examine each number.`,
          whatHappensNext: nextSentence
        });
      } else if (target === "ans" && !isCreated) {
        // Updating existing variable ans
        addSubstep({
          substepLabel: `Read new best sum c`,
          codeSnippet: `c`,
          varsBeforeStep: true,
          whatIsHappening: `Python reads the right side: \`c\` currently holds **\`${afterVal}\`**. This sum beat or tied our previous record of \`${beforeVal}\`!`,
          symbolsMeaning: `Reading variable \`c\`.`,
          currentValues: `c = ${afterVal}, ans = ${beforeVal}`,
          whyNecessary: `We must retrieve the new record value before saving it into \`ans\`.`,
          whatHappensNext: `Python updates variable \`ans\` to this new value.`
        });

        addSubstep({
          substepLabel: `Update existing variable ans = ${afterVal}`,
          codeSnippet: `ans = c (${afterVal})`,
          varsBeforeStep: false,
          whatIsHappening: `Variable \`ans\` was already created earlier. Python now **updates** \`ans\` from \`${beforeVal}\` to **\`${afterVal}\`**!`,
          symbolsMeaning: `Variable update (re-assignment). The name \`ans\` points to the new best sum in memory.`,
          currentValues: `c = ${afterVal}, ans = ${afterVal}`,
          calculationCard: {
            currentNumber: null,
            before: `ans was ${beforeVal}`,
            calculation: `ans = c`,
            after: `ans is now ${afterVal}`
          },
          whyNecessary: `Updating \`ans\` records our new best continuous subarray sum.`,
          whatHappensNext: nextSentence
        });
      } else if (target === "c" && afterVal === "0" && !isCreated) {
        // Resetting c = 0
        addSubstep({
          substepLabel: `Why reset c to 0?`,
          codeSnippet: `c was ${beforeVal}`,
          varsBeforeStep: true,
          whatIsHappening: `The running sum \`c\` was negative (\`${beforeVal}\`). In Kadane's algorithm, any negative prefix will only reduce future sums. Discarding it is always the best move.`,
          symbolsMeaning: `Kadane's algorithm reset rule.`,
          currentValues: `c = ${beforeVal}`,
          whyNecessary: `Why am I learning this? If a subarray's total drops below 0, it is worse than taking nothing! Resetting to 0 lets us start fresh on the next element.`,
          whatHappensNext: `Python updates \`c\` back to 0.`
        });

        addSubstep({
          substepLabel: `Reset existing variable c = 0`,
          codeSnippet: `c = 0`,
          varsBeforeStep: false,
          whatIsHappening: `Python updates existing variable \`c\` back to **\`0\`**. Any previous negative running total is discarded.`,
          symbolsMeaning: `Variable update (reset to zero).`,
          currentValues: `c = 0`,
          calculationCard: {
            currentNumber: null,
            before: `c was ${beforeVal}`,
            calculation: `Reset negative sum`,
            after: `c = 0`
          },
          whyNecessary: `Prepares the running sum so the next number in the list can begin a fresh subarray.`,
          whatHappensNext: nextSentence
        });
      } else if (/\.(append|pop|remove|extend|insert|sort|reverse|clear)\s*\(/.test(step.codeText)) {
        // List in-place mutating method (e.g. self.items.append(item), stack.pop())
        const methodMatch = step.codeText.match(/\.([a-zA-Z_]\w*)\s*\((.*)\)/);
        const methodName = methodMatch ? methodMatch[1] : "method";
        const argStr = methodMatch ? methodMatch[2].trim() : "";

        addSubstep({
          substepLabel: `Inspect ${target} before .${methodName}()`,
          codeSnippet: target,
          varsBeforeStep: true,
          whatIsHappening: `Python is about to execute \`.${methodName}()\` on list \`${target}\`. Current list content: \`${beforeVal || "[]"}\`.`,
          symbolsMeaning: `Calling a method on an existing list modifies the object directly in heap memory.`,
          currentValues: `${target} = ${beforeVal || "[]"}`,
          whyNecessary: `Inspecting list contents before mutation helps track exactly what changed.`,
          whatHappensNext: `Python executes the \`.${methodName}()\` operation in-place.`
        });

        addSubstep({
          substepLabel: `Call .${methodName}(${argStr}) in-place`,
          codeSnippet: step.codeText,
          varsBeforeStep: false,
          whatIsHappening: `Python executes \`.${methodName}(${argStr})\` directly on \`${target}\`. The list is now updated in memory to **\`${afterVal}\`**!`,
          symbolsMeaning: `In-place list modification.`,
          currentValues: `${target} = ${afterVal}`,
          calculationCard: {
            currentNumber: null,
            before: `${target} was ${beforeVal || "[]"}`,
            calculation: `.${methodName}(${argStr})`,
            after: `${target} is now ${afterVal}`
          },
          whyNecessary: `List methods modify the underlying list without needing to allocate a new list.`,
          whatHappensNext: nextSentence
        });
      } else if (op.substituted && op.substituted !== afterVal && op.substituted !== rhsExpr) {
        // Arithmetic / formula assignment (e.g. mid = (left + right) // 2)
        addSubstep({
          substepLabel: `Evaluate operands in ${rhsExpr || "formula"}`,
          codeSnippet: rhsExpr || step.codeText,
          varsBeforeStep: true,
          whatIsHappening: `Python evaluates the variables inside \`${rhsExpr || step.codeText}\`. Substituting their current values yields: \`${op.substituted}\`.`,
          symbolsMeaning: `Operand lookup and variable substitution.`,
          currentValues: varsBefore,
          calculationCard: {
            currentNumber: null,
            before: `Formula: ${rhsExpr || step.codeText}`,
            calculation: `Substitute actual values`,
            after: `${op.substituted}`
          },
          whyNecessary: `Python retrieves the value of each variable in the expression before computing the result.`,
          whatHappensNext: `Python computes the arithmetic result.`
        });

        addSubstep({
          substepLabel: `Calculate ${op.substituted} = ${afterVal}`,
          codeSnippet: `${op.substituted} → ${afterVal}`,
          varsBeforeStep: true,
          whatIsHappening: `Python calculates the arithmetic expression: \`${op.substituted}\` evaluates to **\`${afterVal}\`**!`,
          symbolsMeaning: `Arithmetic calculation with concrete values.`,
          currentValues: `Calculated value = ${afterVal}`,
          calculationCard: {
            currentNumber: null,
            before: `${op.substituted}`,
            calculation: `Arithmetic evaluation`,
            after: `${afterVal}`
          },
          whyNecessary: `Computes the final number to store in variable \`${target}\`.`,
          whatHappensNext: `Python stores the result in variable \`${target}\`.`
        });

        addSubstep({
          substepLabel: `${isCreated ? "Create" : "Update"} ${target} = ${afterVal}`,
          codeSnippet: `${target} = ${afterVal}`,
          varsBeforeStep: false,
          whatIsHappening: isCreated
            ? `Python creates a new variable named \`${target}\` and stores **\`${afterVal}\`** inside it.`
            : `Python updates existing variable \`${target}\` from \`${beforeVal || "unknown"}\` to **\`${afterVal}\`**.`,
          symbolsMeaning: `Assignment operator \`=\`.`,
          currentValues: varsAfter,
          calculationCard: {
            currentNumber: null,
            before: isCreated ? `Create ${target}` : `${target} was ${beforeVal}`,
            calculation: `${target} = ${afterVal}`,
            after: `${target} is now ${afterVal}`
          },
          whyNecessary: `Stores the calculated value into variable memory for subsequent steps.`,
          whatHappensNext: nextSentence
        });
      } else {
        // General assignment
        addSubstep({
          substepLabel: `Evaluate ${rhsExpr || "expression"}`,
          codeSnippet: rhsExpr || step.codeText,
          varsBeforeStep: true,
          whatIsHappening: `Python evaluates the right-hand side expression \`${rhsExpr || step.codeText}\` to \`${op.substituted || afterVal}\`.`,
          symbolsMeaning: `Right-hand expression evaluation.`,
          currentValues: varsBefore,
          calculationCard: {
            currentNumber: null,
            before: `Evaluate right side`,
            calculation: `${rhsExpr || step.codeText}`,
            after: `${afterVal}`
          },
          whyNecessary: `Python always computes the right side before assigning to the left.`,
          whatHappensNext: `Python stores the result in variable \`${target}\`.`
        });

        addSubstep({
          substepLabel: `${isCreated ? "Create" : "Update"} ${target} = ${afterVal}`,
          codeSnippet: `${target} = ${afterVal}`,
          varsBeforeStep: false,
          whatIsHappening: isCreated
            ? `Python creates variable \`${target}\` and stores **\`${afterVal}\`** inside it.`
            : `Python updates existing variable \`${target}\` from \`${beforeVal || "unknown"}\` to **\`${afterVal}\`**.`,
          symbolsMeaning: `Assignment operator \`=\`.`,
          currentValues: varsAfter,
          calculationCard: {
            currentNumber: null,
            before: isCreated ? `Create ${target}` : `${target} was ${beforeVal}`,
            calculation: `${target} = ${afterVal}`,
            after: `${target} is now ${afterVal}`
          },
          whyNecessary: `Updates variable state in memory.`,
          whatHappensNext: nextSentence
        });
      }
    }

    // 4. FOR & WHILE LOOP ITERATIONS (Requirement 7)
    else if (step.eventType === "LOOP_ITER" && op.kind === "for_iter") {
      const iterVar = op.iterVar || "i";
      const iterVal = op.iterVal !== undefined ? op.iterVal : 0;
      const iteration = op.iteration || 1;
      const total = op.total || 9;
      const elInfo = op.indexedElementInfo;
      const elVal = elInfo ? elInfo.elementVal : null;
      const arrName = elInfo ? elInfo.arrayName : "nums";

      // Substep 1: Loop progress & sequence
      addSubstep({
        substepLabel: `Loop pass ${iteration} of ${total}`,
        codeSnippet: `for ${iterVar} in range(len(${arrName})):`,
        varsBeforeStep: false,
        whatIsHappening: `The \`for\` loop is on pass **${iteration} of ${total}**. In Python, \`len(${arrName})\` is ${total}, so \`range(${total})\` generates index numbers \`0, 1, 2... ${total - 1}\`.`,
        symbolsMeaning: `\`for\` repeats code; \`in\` takes the next value from \`range()\`.`,
        currentValues: `Loop progress: item ${iteration}/${total}`,
        whyNecessary: `A \`for\` loop ensures we inspect every number in the list from left to right without skipping any.`,
        whatHappensNext: `Python assigns the next index to loop variable \`${iterVar}\`.`
      });

      // Substep 2: Set loop variable
      addSubstep({
        substepLabel: `Set loop variable ${iterVar} = ${iterVal}`,
        codeSnippet: `${iterVar} = ${iterVal}`,
        varsBeforeStep: false,
        whatIsHappening: `Python sets loop variable \`${iterVar}\` to **\`${iterVal}\`**. This indicates our current position in the array.`,
        symbolsMeaning: `\`${iterVar}\` is the loop index variable.`,
        currentValues: `${iterVar} = ${iterVal}`,
        calculationCard: {
          currentNumber: null,
          before: `Loop counter`,
          calculation: `Advance index to ${iterVal}`,
          after: `${iterVar} = ${iterVal}`
        },
        whyNecessary: `We need an explicit index variable to access each element in \`${arrName}\` by position.`,
        whatHappensNext: elInfo ? `Python identifies the element at \`${arrName}[${iterVal}]\`.` : `Python executes the loop body.`
      });

      // Substep 3: Identify list element & what causes next iteration
      if (elInfo) {
        addSubstep({
          substepLabel: `Current element is ${arrName}[${iterVal}] = ${elVal}`,
          codeSnippet: `${arrName}[${iterVal}] = ${elVal}`,
          varsBeforeStep: false,
          whatIsHappening: `At index position \`${iterVal}\`, list item is **\`${elVal}\`**. What causes the next iteration? Once all lines inside this loop pass finish, Python automatically increments \`${iterVar}\` to \`${iterVal + 1}\` until all ${total} items are processed!`,
          symbolsMeaning: `List item lookup at index ${iterVal}.`,
          currentValues: `${iterVar} = ${iterVal}, ${arrName}[${iterVal}] = ${elVal}`,
          calculationCard: {
            currentNumber: elVal,
            before: `Position ${iterVar} = ${iterVal}`,
            calculation: `${arrName}[${iterVal}]`,
            after: `Current number is ${elVal}`
          },
          whyNecessary: `Knowing both the index and the element value allows us to track exactly what the loop is inspecting.`,
          whatHappensNext: nextSentence
        });
      } else {
        addSubstep({
          substepLabel: `Loop pass ${iteration} ready`,
          codeSnippet: step.codeText,
          varsBeforeStep: false,
          whatIsHappening: `Loop variable \`${iterVar}\` is set to **\`${iterVal}\`**. What causes the next iteration? When all statements in this pass finish, Python automatically fetches the next value from the sequence until all ${total} items are completed!`,
          symbolsMeaning: `Iteration sequence progression.`,
          currentValues: varsAfter,
          whyNecessary: `Prepares the loop body to execute with this iteration's value.`,
          whatHappensNext: nextSentence
        });
      }
    }

    else if (step.eventType === "LOOP_ITER" && op.kind === "while_check") {
      const iteration = op.iteration || 1;
      const leftExpr = cond?.leftExpr || "condition";
      const leftVal = cond?.leftVal !== undefined ? cond.leftVal : "";
      const rightExpr = cond?.rightExpr || "";
      const rightVal = cond?.rightVal !== undefined ? cond.rightVal : "";
      const opSym = cond?.operator || "";

      // Substep 1: Inspect condition operands
      addSubstep({
        substepLabel: `Check while condition operands`,
        codeSnippet: cond ? `${leftExpr} ${opSym} ${rightExpr}` : step.codeText,
        varsBeforeStep: true,
        whatIsHappening: `Python evaluates the while condition before running pass #${iteration}: \`${leftExpr}\` is **\`${leftVal}\`** and \`${rightExpr}\` is **\`${rightVal}\`**.`,
        symbolsMeaning: `\`while\` repeats an indented block as long as its condition remains True.`,
        currentValues: varsBefore,
        calculationCard: {
          currentNumber: null,
          before: `${leftExpr} = ${leftVal}`,
          calculation: `Evaluate condition operands`,
          after: `${rightExpr} = ${rightVal}`
        },
        whyNecessary: `A while loop must test its condition before every pass to decide whether to continue or stop.`,
        whatHappensNext: `Python evaluates the comparison.`
      });

      // Substep 2: Evaluate condition boolean
      addSubstep({
        substepLabel: `Condition evaluates to True`,
        codeSnippet: `${leftVal} ${opSym} ${rightVal} → True`,
        varsBeforeStep: false,
        whatIsHappening: `The comparison \`${leftVal} ${opSym} ${rightVal}\` evaluates to **True**! Because the condition is True, the loop enters pass #${iteration}.`,
        symbolsMeaning: `Condition outcome: True allows the loop to continue.`,
        currentValues: varsAfter,
        calculationCard: {
          currentNumber: null,
          before: `${leftVal} ${opSym} ${rightVal}`,
          calculation: `Boolean test`,
          after: `True`
        },
        whyNecessary: `The loop body only executes when the loop condition evaluates to True.`,
        whatHappensNext: `Python enters the loop body for pass #${iteration}.`
      });

      // Substep 3: What causes next iteration
      addSubstep({
        substepLabel: `Start pass #${iteration} of while loop`,
        codeSnippet: step.codeText,
        varsBeforeStep: false,
        whatIsHappening: `Python begins pass #${iteration}. What causes the next iteration? Once all statements in this pass finish, Python will loop right back to Line ${step.line} to re-evaluate the condition!`,
        symbolsMeaning: `Loop control flow cycle.`,
        currentValues: varsAfter,
        whyNecessary: `Understanding the loop cycle ensures you know how variables must change inside the loop to avoid infinite loops.`,
        whatHappensNext: nextSentence
      });
    }

    // 5. LOOP FINISHED
    else if (step.eventType === "LOOP_END") {
      if (op.kind === "while_check") {
        const leftVal = cond?.leftVal !== undefined ? cond.leftVal : "";
        const rightVal = cond?.rightVal !== undefined ? cond.rightVal : "";
        const opSym = cond?.operator || "";

        addSubstep({
          substepLabel: `While condition evaluated to False`,
          codeSnippet: `${leftVal} ${opSym} ${rightVal} → False`,
          varsBeforeStep: false,
          whatIsHappening: `The condition \`${leftVal} ${opSym} ${rightVal}\` evaluated to **False**! The loop condition is no longer met.`,
          symbolsMeaning: `\`False\` terminates the while loop.`,
          currentValues: varsAfter,
          calculationCard: {
            currentNumber: null,
            before: `${leftVal} ${opSym} ${rightVal}`,
            calculation: `Condition check`,
            after: `False (Stop)`
          },
          whyNecessary: `A while loop stops running immediately once its condition becomes False, preventing infinite loops.`,
          whatHappensNext: `Python exits the while loop and moves past the indented block.`
        });

        addSubstep({
          substepLabel: `Exit while loop`,
          codeSnippet: step.codeText,
          varsBeforeStep: false,
          whatIsHappening: `Python exits the loop and advances to Line ${nextStep?.line || step.line + 1}.`,
          symbolsMeaning: `Exiting while loop body.`,
          currentValues: varsAfter,
          whyNecessary: `The loop has finished its work; the program proceeds to the next instructions.`,
          whatHappensNext: nextSentence
        });
      } else {
        const total = op.total || (step.loop ? step.loop.totalIterations : null);
        const countMsg = total ? `all ${total} passes` : `all passes`;
        addSubstep({
          substepLabel: `All iterations complete`,
          codeSnippet: step.codeText,
          varsBeforeStep: false,
          whatIsHappening: `We have checked every single item in the sequence! The loop has completed ${countMsg}.`,
          symbolsMeaning: `Loop sequence exhausted.`,
          currentValues: varsAfter,
          whyNecessary: `Once the sequence in \`range()\` or the list is exhausted, the loop ends automatically.`,
          whatHappensNext: `Python leaves the loop and moves to the \`return\` statement.`
        });

        addSubstep({
          substepLabel: `Exit loop block`,
          codeSnippet: step.codeText,
          varsBeforeStep: false,
          whatIsHappening: `Python exits the indented loop body and moves to Line ${nextStep?.line || step.line + 1}.`,
          symbolsMeaning: `Exiting loop control block.`,
          currentValues: varsAfter,
          whyNecessary: `The program is ready to proceed to the next statement.`,
          whatHappensNext: nextSentence
        });
      }
    }

    // 6. CLASS & FUNCTION DEFINITIONS
    else if (step.eventType === "CLASS_DEF") {
      const clsMatch = step.codeText.match(/class\s+([A-Za-z0-9_]+)/);
      const clsName = op.className || (clsMatch ? clsMatch[1] : "Solution");
      addSubstep({
        substepLabel: `What is a class?`,
        codeSnippet: `class ${clsName}:`,
        varsBeforeStep: false,
        whatIsHappening: `Python encounters \`class ${clsName}:\`. A **class** is a blueprint that groups related functions (called methods) together under one name.`,
        symbolsMeaning: `\`class\` defines a new class blueprint in Global Scope.`,
        currentValues: `Global Scope`,
        whyNecessary: `Why am I learning this? Object-Oriented Programming (OOP) groups functions and data together for clean organization.`,
        whatHappensNext: `Python registers the class container and reads the functions defined inside it.`
      });

      addSubstep({
        substepLabel: `Register ${clsName} class`,
        codeSnippet: `class ${clsName}:`,
        varsBeforeStep: false,
        whatIsHappening: `Python registers \`${clsName}\` in Global Scope. Creating the class does not execute the algorithm yet—it simply prepares the blueprint.`,
        symbolsMeaning: `Registering class in memory.`,
        currentValues: `class ${clsName} defined`,
        whyNecessary: `Before we can call methods or instantiate objects, Python must register their class container.`,
        whatHappensNext: nextSentence
      });
    } else if (step.eventType === "METHOD_DEF" || step.eventType === "FUNC_DEF") {
      const funcName = op.funcName || "function";
      addSubstep({
        substepLabel: `What is a function definition?`,
        codeSnippet: step.codeText,
        varsBeforeStep: false,
        whatIsHappening: `Python encounters \`def ${funcName}(...)\`. A **function** is a reusable set of instructions that takes inputs, performs calculations, and returns an answer.`,
        symbolsMeaning: `\`def\` is short for "define". It tells Python: "Remember these instructions under the name \`${funcName}\`."`,
        currentValues: `Global Scope`,
        whyNecessary: `Functions make code reusable, organized, and testable with different inputs.`,
        whatHappensNext: `Python registers \`${funcName}\` and prepares to run it when called.`
      });

      addSubstep({
        substepLabel: `Register ${funcName}() in scope`,
        codeSnippet: step.codeText,
        varsBeforeStep: false,
        whatIsHappening: `Python registers function \`${funcName}\`. The lines inside \`${funcName}\` do not run yet—they only execute when we explicitly call \`${funcName}()\`.`,
        symbolsMeaning: `Function registration.`,
        currentValues: `def ${funcName} registered`,
        whyNecessary: `Python must store the function definition before it can be invoked.`,
        whatHappensNext: nextSentence
      });
    }

    // 7. FUNCTION CALL
    else if (step.eventType === "FUNC_CALL") {
      const funcName = op.funcName || "function";
      addSubstep({
        substepLabel: `Call ${funcName}()`,
        codeSnippet: `${funcName}(nums)`,
        varsBeforeStep: false,
        whatIsHappening: `We call \`${funcName}()\` and pass our list \`nums\` as the argument!`,
        symbolsMeaning: `Parentheses \`()\` invoke (call) a function.`,
        currentValues: varsAfter,
        whyNecessary: `Calling the function actually begins execution of the algorithm instructions.`,
        whatHappensNext: `Python creates a Local Scope stack frame for this call.`
      });

      addSubstep({
        substepLabel: `Create Local Scope frame`,
        codeSnippet: `Local Scope: ${funcName}`,
        varsBeforeStep: false,
        whatIsHappening: `Python opens a new **Local Scope** stack frame! Variables created inside \`${funcName}\` (like \`c\` and \`ans\`) are isolated inside this scope.`,
        symbolsMeaning: `Local Scope isolates variables so they do not collide with outside code.`,
        currentValues: `Local Scope entered`,
        whyNecessary: `Scope isolation keeps functions self-contained and free from side effects.`,
        whatHappensNext: nextSentence
      });
    }

    // 8. RETURN STATEMENT
    else if (step.eventType === "RETURN") {
      const returnVal = op.returnVal !== undefined ? op.returnVal : step.returnValue !== undefined ? step.returnValue : "6";
      const retExpr = op.expr || (step.codeText.replace(/^return\s*/, '').trim()) || "ans";
      const isKadane = (retExpr === "ans" || step.codeText.includes("ans")) && bestSubarrayInfo && bestSubarrayInfo.subarray;
      const subSummary = isKadane
        ? `The continuous section \`[${bestSubarrayInfo.subarray.join(", ")}]\` has the largest sum: **${returnVal}**.`
        : `The function finished and returned: **${returnVal}**.`;

      addSubstep({
        substepLabel: `Read return value ${retExpr} = ${returnVal}`,
        codeSnippet: `return ${retExpr} (${returnVal})`,
        varsBeforeStep: false,
        whatIsHappening: isKadane
          ? `Python evaluates the return statement: \`ans\` holds our best answer **\`${returnVal}\`**!`
          : `Python evaluates the return statement: \`${retExpr}\` resolves to **\`${returnVal}\`**!`,
        symbolsMeaning: `\`return\` finishes the function and sends the result back to the caller.`,
        currentValues: `${retExpr} = ${returnVal}`,
        calculationCard: {
          currentNumber: null,
          before: `Finished function body`,
          calculation: `return ${retExpr}`,
          after: `Final answer = ${returnVal}`
        },
        whyNecessary: `The return statement delivers the result of the function to whoever requested it.`,
        whatHappensNext: `Python destroys the local scope frame and outputs the final answer.`
      });

      addSubstep({
        substepLabel: `Final answer: ${returnVal}`,
        codeSnippet: `return ${returnVal}`,
        varsBeforeStep: false,
        whatIsHappening: isKadane
          ? `The program is complete! The maximum continuous subarray sum is **${returnVal}**.`
          : `The program is complete! The function returned **${returnVal}**.`,
        symbolsMeaning: `Function execution completed.`,
        currentValues: `Final answer = ${returnVal}`,
        whyNecessary: isKadane
          ? `Why am I learning this? Kadane's algorithm solved this problem in linear time (O(n)), visiting each element just once!`
          : `The function has reached its conclusion and returned its final computed output.`,
        whatHappensNext: `You can click Restart to step through again or paste new code to learn!`,
        finalBanner: {
          answer: returnVal,
          summary: subSummary
        }
      });
    }

    // 9. PRINT STATEMENT
    else if (step.eventType === "PRINT") {
      const output = op.output !== undefined ? op.output : "";
      addSubstep({
        substepLabel: `Evaluate expression in print()`,
        codeSnippet: step.codeText,
        varsBeforeStep: true,
        whatIsHappening: `Python evaluates the expression inside \`${step.codeText}\`, which resolves to **\`${output}\`**.`,
        symbolsMeaning: `\`print()\` outputs text or values to the console.`,
        currentValues: varsBefore,
        calculationCard: {
          currentNumber: null,
          before: `print statement`,
          calculation: `Evaluate argument`,
          after: `${output}`
        },
        whyNecessary: `The print function allows developers to see values and inspect results.`,
        whatHappensNext: `Python prints the value to the screen.`
      });

      addSubstep({
        substepLabel: `Print "${output}" to console`,
        codeSnippet: `print → ${output}`,
        varsBeforeStep: false,
        whatIsHappening: `Python prints **\`${output}\`** to standard output!`,
        symbolsMeaning: `Console output display.`,
        currentValues: varsAfter,
        calculationCard: {
          currentNumber: null,
          before: `Console before`,
          calculation: `Write to stdout`,
          after: `Printed: ${output}`
        },
        whyNecessary: `Displaying output confirms the code's real behavior.`,
        whatHappensNext: nextSentence,
        finalBanner: !nextStep ? { answer: output, summary: `Program finished! Printed: ${output}` } : null
      });
    }

    // 10. GENERAL FALLBACK (Requirement 12)
    else {
      addSubstep({
        substepLabel: `Execute line ${step.line}`,
        codeSnippet: step.codeText,
        varsBeforeStep: true,
        whatIsHappening: `Python executes Line ${step.line}: \`${step.codeText}\`.`,
        symbolsMeaning: this.explainSymbolsInLine(step.codeText),
        currentValues: varsBefore,
        whyNecessary: `Python executes code sequentially line-by-line.`,
        whatHappensNext: `Python checks the outcome of this line.`
      });

      addSubstep({
        substepLabel: `Line ${step.line} complete`,
        codeSnippet: step.codeText,
        varsBeforeStep: false,
        whatIsHappening: `Line ${step.line} finished executing! Variables in scope: ${varsAfter}.`,
        symbolsMeaning: `Statement complete.`,
        currentValues: varsAfter,
        whyNecessary: `State updated for the next instruction.`,
        whatHappensNext: nextSentence
      });
    }

    // Update totalSubsteps on all substeps
    const totalCount = substeps.length;
    substeps.forEach((s, idx) => {
      s.substepIndex = idx + 1;
      s.totalSubsteps = totalCount;
      s.title = `Step ${n} (Substep ${idx + 1}/${totalCount}): ${s.substepLabel}`;
    });

    return substeps;
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

  buildPredictQuestion(step, prevStep, nextStep) {
    if (!step) return null;
    const op = step.operationDetail || {};
    const cond = step.condition;

    // 1. Kadane's condition check: c >= ans (Will ans change?)
    if (step.eventType === "CONDITION" && cond && (cond.expr === "c >= ans" || (cond.leftExpr === "c" && cond.rightExpr === "ans"))) {
      const willUpdate = Boolean(cond.result);
      const cVal = cond.leftVal !== undefined ? cond.leftVal : "";
      const ansVal = cond.rightVal !== undefined ? cond.rightVal : "";
      const question = "Will ans update to a new record sum?";
      const subPrompt = `Comparing current sum (c = ${cVal}) with best sum (ans = ${ansVal})`;
      const choices = ["Yes, ans will update", "No, ans stays the same"];
      const correctIndex = willUpdate ? 0 : 1;
      const explanation = willUpdate
        ? `Correct! Because current sum c (${cVal}) is greater than or equal to ans (${ansVal}), the condition is True and ans will update to ${cVal}.`
        : `Correct! Because current sum c (${cVal}) is smaller than ans (${ansVal}), the condition is False and ans keeps its current value of ${ansVal}.`;
      return {
        id: `q_${step.stepIndex}`,
        type: "condition_record",
        question,
        subPrompt,
        choices,
        correctIndex,
        correctValue: choices[correctIndex],
        explanation
      };
    }

    // 2. Kadane's condition check: c < 0 (Will this condition be True or False?)
    if (step.eventType === "CONDITION" && cond && (cond.expr === "c < 0" || (cond.leftExpr === "c" && cond.operator === "<" && cond.rightVal === "0"))) {
      const isNegative = Boolean(cond.result);
      const cVal = cond.leftVal !== undefined ? cond.leftVal : "";
      const question = "Will this condition be True or False?";
      const subPrompt = `Testing if c (${cVal}) is negative (< 0)`;
      const choices = ["True (c < 0)", "False (c >= 0)"];
      const correctIndex = isNegative ? 0 : 1;
      const explanation = isNegative
        ? `True! Because c (${cVal}) is negative, the next line will reset c back to 0 so future additions start fresh.`
        : `False! Because c (${cVal}) is zero or positive, no reset is needed.`;
      return {
        id: `q_${step.stepIndex}`,
        type: "condition_negative",
        question,
        subPrompt,
        choices,
        correctIndex,
        correctValue: choices[correctIndex],
        explanation
      };
    }

    // 3. General Condition (if / while)
    if (step.eventType === "CONDITION" && cond) {
      const isTrue = Boolean(cond.result);
      const l = cond.leftVal !== undefined ? cond.leftVal : (cond.leftExpr || "");
      const r = cond.rightVal !== undefined ? cond.rightVal : (cond.rightExpr || "");
      const opSym = cond.operator || "==";
      const question = "Will this condition evaluate to True or False?";
      const subPrompt = `Evaluating: ${l} ${opSym} ${r}`;
      const choices = ["True", "False"];
      const correctIndex = isTrue ? 0 : 1;
      const explanation = isTrue
        ? `True! ${l} ${opSym} ${r} is True. Python will execute the indented branch.`
        : `False! ${l} ${opSym} ${r} is False. Python will skip the indented branch.`;
      return {
        id: `q_${step.stepIndex}`,
        type: "condition_general",
        question,
        subPrompt,
        choices,
        correctIndex,
        correctValue: choices[correctIndex],
        explanation
      };
    }

    // 4. Augmented Assignment: c += nums[i] or target += delta
    if (step.eventType === "AUG_ASSIGN" && op.target) {
      const target = op.target;
      const beforeVal = Number(op.beforeVal !== undefined ? op.beforeVal : 0);
      const rhsVal = Number(op.rhsVal !== undefined ? op.rhsVal : 0);
      const afterVal = Number(op.afterVal !== undefined ? op.afterVal : beforeVal + rhsVal);

      const question = `What will ${target} become after this addition?`;
      const subPrompt = `Current ${target} = ${beforeVal}, adding (${rhsVal})`;

      const correctStr = String(afterVal);
      const choicesSet = new Set([correctStr]);

      if (String(beforeVal) !== correctStr) choicesSet.add(String(beforeVal));
      if (String(rhsVal) !== correctStr && choicesSet.size < 3) choicesSet.add(String(rhsVal));
      const wrong1 = String(beforeVal - rhsVal);
      if (!choicesSet.has(wrong1) && choicesSet.size < 3) choicesSet.add(wrong1);
      const wrong2 = String(afterVal + (rhsVal >= 0 ? 1 : -1));
      if (!choicesSet.has(wrong2) && choicesSet.size < 3) choicesSet.add(wrong2);
      const wrong3 = String(afterVal * 2);
      if (!choicesSet.has(wrong3) && choicesSet.size < 3) choicesSet.add(wrong3);

      const choices = Array.from(choicesSet).slice(0, 3);
      choices.sort((a, b) => Number(a) - Number(b));
      const correctIndex = choices.indexOf(correctStr);

      const explanation = `${beforeVal} + (${rhsVal}) = ${correctStr}. Python adds the numbers first, then updates ${target}.`;
      return {
        id: `q_${step.stepIndex}`,
        type: "addition",
        question,
        subPrompt,
        choices,
        correctIndex,
        correctValue: correctStr,
        explanation
      };
    }

    // 5. Assignment resetting c to 0
    if (step.eventType === "ASSIGN" && op.target === "c" && op.afterVal === "0" && !op.isCreated) {
      const question = "What will c reset to because it became negative?";
      const subPrompt = `Current c is negative (${op.beforeVal})`;
      const choices = ["0", "-1", "Stay negative"];
      const correctIndex = 0;
      const explanation = `c resets to 0 so future additions start clean without being weighed down by negative sums.`;
      return {
        id: `q_${step.stepIndex}`,
        type: "assign_reset",
        question,
        subPrompt,
        choices,
        correctIndex,
        correctValue: "0",
        explanation
      };
    }

    // 6. Assignment with arithmetic formula (e.g. mid = (l + r) // 2 or count = count + 1)
    if (
      step.eventType === "ASSIGN" &&
      op.target &&
      op.rhsExpr &&
      !op.rhsExpr.trim().startsWith("[") &&
      !Array.isArray(op.afterVal) &&
      !/^-\d+$/.test(op.rhsExpr.trim()) &&
      /(?:\w+|\))\s*(?:[+\-*/%]|(?:\/\/))\s*(?:\w+|\()/.test(op.rhsExpr) &&
      op.afterVal !== undefined
    ) {
      const question = `What will ${op.target} become after calculating ${op.rhsExpr}?`;
      const subPrompt = `Evaluating ${op.substituted || op.rhsExpr}`;
      const correctStr = String(op.afterVal);
      const choicesSet = new Set([correctStr]);
      const numVal = Number(correctStr);
      if (!isNaN(numVal)) {
        choicesSet.add(String(numVal + 1));
        choicesSet.add(String(Math.max(0, numVal - 1)));
      } else {
        choicesSet.add("None");
        choicesSet.add("0");
      }
      const choices = Array.from(choicesSet).slice(0, 3);
      choices.sort((a, b) => (isNaN(Number(a)) ? 0 : Number(a) - Number(b)));
      const correctIndex = choices.indexOf(correctStr);
      const explanation = `${op.rhsExpr} evaluates to ${correctStr}.`;
      return {
        id: `q_${step.stepIndex}`,
        type: "assign_calc",
        question,
        subPrompt,
        choices,
        correctIndex,
        correctValue: correctStr,
        explanation
      };
    }

    return null;
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
