"""
app_build/explainer.py — Rule-Based Teaching System & Thonny-Style Step Explainer
100% deterministic, zero AI APIs. Generates beginner and technical explanations
from actual runtime execution snapshots, sub-expression frames, and scope/memory models.
"""

from typing import Any, Dict, List

PYTHON_SYMBOL_DICTIONARY = {
    "class": "`class` defines a blueprint that groups related functions (methods) together.",
    "def": "`def` defines a function or method — a reusable block of code that runs when called.",
    "return": "`return` stops the function immediately and sends a result value back to the caller.",
    "for": "`for` starts a loop that repeats its indented block once for each item in a sequence.",
    "while": "`while` starts a loop that keeps repeating as long as its condition remains `True`.",
    "in": "`in` pairs a loop variable with the sequence of values it steps through.",
    "range(": "`range(n)` generates a sequence of numbers starting from `0` up to `n - 1`.",
    "len(": "`len(x)` counts and returns the total number of items inside list or string `x`.",
    "and": "`and` checks if BOTH conditions are True (short-circuits if the left side is False).",
    "or": "`or` checks if AT LEAST ONE condition is True (short-circuits if the left side is True).",
    "//": "`//` is floor division: it divides and rounds down to the nearest whole integer.",
    "+=": "`+=` adds the right-hand value to the variable on the left and stores the new total back in that variable.",
    "-=": "`-=` subtracts the right-hand value from the variable on the left and updates it.",
    ">=": "`>=` tests whether the left value is greater than or equal to the right value (`True` or `False`).",
    "<=": "`<=` tests whether the left value is less than or equal to the right value (`True` or `False`).",
    "==": "`==` compares two values for equality (`True` if equal, `False` otherwise).",
    "!=": "`!=` checks whether two values are different (`True` if not equal).",
    "<": "`<` checks if the left value is strictly smaller than the right value.",
    ">": "`>` checks if the left value is strictly larger than the right value.",
    "=": "`=` is the assignment operator: it calculates the right side first and binds the variable name to that object's memory address.",
    "[]": "Square brackets `[i]` access the element at index position `i` inside a list (starting at index `0`).",
    "->": "`->` is a type hint showing what data type the function is expected to return.",
}


def explain_symbols_in_line(code_text: str) -> str:
    found = []
    for sym, desc in PYTHON_SYMBOL_DICTIONARY.items():
        if sym in code_text:
            found.append(f"• {desc}")
    if not found:
        return "• Standard Python expression evaluation."
    return "\n".join(found[:3])


def generate_step_explanation(step: Dict[str, Any], prev_step: Dict[str, Any] = None) -> Dict[str, str]:
    """
    Produces beginner and technical explanations from a recorded execution step,
    incorporating sub-expression evaluation frames and memory reference details.
    """
    code = step.get("codeText", "").strip()
    event = step.get("event", "line")
    cond = step.get("condition")
    op_detail = step.get("operationDetail")
    changed = step.get("changedSummary", "No variable values changed")
    before_vars = step.get("beforeVars", {})
    expr_frames = step.get("exprFrames", [])

    short_circuit_frame = next((f for f in expr_frames if f.get("shortCircuited")), None)

    if code.startswith("class "):
        what_beg = f"Creates a class named `{code.split()[1].rstrip(':')}`. Inside it are methods that can be called later."
        what_tech = f"Executes `ClassDef` statement `{code}`, creating the class namespace and binding its methods."
    elif code.startswith("def "):
        what_beg = (
            f"Defines the function `{code}` in `{step.get('functionName')}`. Python records the function object on the heap "
            f"and executes its body when called."
        )
        what_tech = f"Function header `{code}` reached (`{event}` event) in scope `{step.get('functionName')}`."
    elif short_circuit_frame:
        what_beg = f"Evaluates compound condition `{code}` using short-circuit logic: {short_circuit_frame.get('focus')}."
        what_tech = f"Short-circuit boolean evaluation on `{code}`: {short_circuit_frame.get('focus')}."
    elif op_detail and op_detail.get("kind") == "aug_assign":
        t = op_detail["target"]
        b = op_detail["beforeVal"]
        rv = op_detail["rhsVal"]
        op = op_detail["op"]
        after_v = next((v["current"] for v in step["variables"] if v["name"] == t), "?")
        what_beg = (
            f"Python evaluates `{op_detail['rhsExpr']}` → `{rv}`, computes `{b} {op} ({rv}) = {after_v}`, "
            f"and rebinds `{t}` to the new value `{after_v}`."
        )
        what_tech = (
            f"Augmented assignment `{code}` evaluates `{t} {op} {op_detail['rhsExpr']}` "
            f"(`{b} {op} {rv} -> {after_v}`) and rebinds `{t}` to a new heap address."
        )
    elif cond:
        res_str = "True" if cond["result"] else "False"
        what_beg = (
            f"Compares `{cond['expr']}` using current values: `{cond['leftVal']} {cond['operator']} {cond['rightVal']}`. "
            f"The result is **{res_str}**."
        )
        what_tech = (
            f"Conditional branch predicate `{cond['expr']}` evaluates operands "
            f"(`{cond['leftVal']}` {cond['operator']} `{cond['rightVal']}`) to boolean `{res_str}`."
        )
    elif code.startswith("for "):
        iter_num = step["loop"]["iteration"] if step.get("loop") else "?"
        what_beg = f"Runs loop check #{iter_num} for `{code}`, binding the loop variable to the next sequence value."
        what_tech = f"For-loop header `{code}` advances iterator (pass #{iter_num}) and binds loop target variable."
    elif code.startswith("return"):
        ret_v = step.get("returnValue") or next(
            (v["current"] for v in step["variables"] if v["name"] in code), "None"
        )
        what_beg = f"Sends the final calculated value `{ret_v}` back to the caller and exits local scope `{step.get('functionName')}`."
        what_tech = f"`return` statement unwinds local stack frame `{step.get('functionName')}` with return value `{ret_v}`."
    elif "=" in code and not code.startswith(("if ", "elif ", "while ")):
        lhs = code.split("=")[0].strip()
        what_beg = f"Evaluates the right-hand side step-by-step and binds `{lhs}` in `{step.get('functionName')}` ({changed})."
        what_tech = f"Assignment statement `{code}` evaluates RHS sub-expressions and binds `{lhs}` ({changed})."
    else:
        what_beg = f"Executes statement `{code}` on line {step.get('line')}."
        what_tech = f"Executes AST statement at line {step.get('line')} in `{step.get('functionName')}`."

    symbols_meaning = explain_symbols_in_line(code)

    if not prev_step:
        why_now = f"Line {step.get('line')} is the first line executed when the program starts."
    elif prev_step.get("condition"):
        prev_c = prev_step["condition"]
        if prev_c["result"]:
            why_now = f"Because `{prev_c['expr']}` on Line {prev_step['line']} evaluated to `True`, Python entered the indented block."
        else:
            why_now = f"Because `{prev_c['expr']}` on Line {prev_step['line']} evaluated to `False`, Python skipped that block and moved to Line {step.get('line')}."
    else:
        why_now = f"After completing Line {prev_step.get('line')}, execution moved sequentially to Line {step.get('line')}."

    if not before_vars:
        before_text = "No local variables existed before this line ran."
    else:
        before_text = ", ".join(f"`{k} = {v}`" for k, v in before_vars.items())

    after_text = changed

    if cond:
        cond_why = f"Because `{cond['leftVal']} {cond['operator']} {cond['rightVal']}` is **{cond['result']}**."
    else:
        cond_why = "This line does not contain an `if` / `while` comparison condition."

    next_ln = step.get("nextLine")
    if next_ln is None:
        next_why = "Execution is complete; there are no more lines to run."
    elif cond:
        next_why = (
            f"Line {next_ln} runs next because the condition was `{'True (entering block)' if cond['result'] else 'False (skipping block)'}`."
        )
    else:
        next_why = f"Line {next_ln} executes next following normal program flow."

    return {
        "whatBeginner": what_beg,
        "whatTechnical": what_tech,
        "symbolsMeaning": symbols_meaning,
        "whyExecuting": why_now,
        "variablesBefore": before_text,
        "whatChangesAfter": after_text,
        "whyCondition": cond_why,
        "whatNext": next_why,
    }
