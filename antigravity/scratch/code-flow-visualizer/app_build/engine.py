"""
app_build/engine.py — Universal Beginner & DSA Python Execution Tracer
Zero AI APIs. Uses Python's native `ast` module and `sys.settrace` in a safe sandbox.
Supports:
- Any standalone function (`def binary_search(arr, target):`, `def two_sum(nums, target):`, etc.)
- Any LeetCode-style `class Solution:` method (`maxSubArray`, `twoSum`, `search`, etc.)
- Top-level scripts, recursion, loops, dicts, sets, lists, strings, slicing, comprehensions
- Thonny-style AST Sub-Expression Stepper with Short-Circuit ('and' / 'or') evaluation
- Stack & Heap Reference Model (Name -> @Address -> Value) with Visual Garbage Collection
- Global vs. Local Scope Isolation across the call stack
"""

import ast
import builtins
import copy
import io
import sys
from typing import Any, Dict, List, Optional, Tuple

SUPPORTED_BUILTINS = {
    "__build_class__": builtins.__build_class__,
    "__name__": "__main__",
    "object": object,
    "abs": abs,
    "all": all,
    "any": any,
    "bool": bool,
    "chr": chr,
    "dict": dict,
    "divmod": divmod,
    "enumerate": enumerate,
    "filter": filter,
    "float": float,
    "hex": hex,
    "int": int,
    "isinstance": isinstance,
    "len": len,
    "list": list,
    "map": map,
    "max": max,
    "min": min,
    "ord": ord,
    "pow": pow,
    "print": print,
    "range": range,
    "reversed": reversed,
    "round": round,
    "set": set,
    "sorted": sorted,
    "str": str,
    "sum": sum,
    "tuple": tuple,
    "type": type,
    "zip": zip,
    # Common typing annotations used in DSA / LeetCode snippets
    "List": list,
    "Dict": dict,
    "Set": set,
    "Tuple": tuple,
    "Optional": object,
    "Any": object,
    "True": True,
    "False": False,
    "None": None,
    "Exception": Exception,
    "IndexError": IndexError,
    "ValueError": ValueError,
    "TypeError": TypeError,
    "KeyError": KeyError,
    "ZeroDivisionError": ZeroDivisionError,
}

UNSUPPORTED_AST_NODES = {
    ast.Import: "Import statements (`import ...`) are not supported in the sandbox.",
    ast.ImportFrom: "Import statements (`from ... import ...`) are not supported in the sandbox.",
    ast.AsyncFunctionDef: "Async functions (`async def`) are not supported.",
    ast.Await: "`await` expressions are not supported.",
    ast.AsyncFor: "`async for` loops are not supported.",
    ast.AsyncWith: "`async with` blocks are not supported.",
    ast.With: "`with` context managers (such as file I/O) are not supported.",
    ast.Yield: "Generators (`yield`) are not supported in the beginner tracer.",
    ast.YieldFrom: "`yield from` is not supported.",
    ast.Try: "`try/except` blocks are not supported in basic mode.",
    ast.Global: "`global` statements are not supported.",
    ast.Nonlocal: "`nonlocal` statements are not supported.",
}

FORBIDDEN_CALLS = {
    "eval",
    "exec",
    "open",
    "compile",
    "__import__",
    "input",
    "globals",
    "locals",
    "getattr",
    "setattr",
    "delattr",
}


def validate_python_support(source_code: str) -> Tuple[bool, Optional[str], Optional[int]]:
    if not source_code or not source_code.strip():
        return False, "Code editor is empty. Please enter a Python program.", 1

    try:
        tree = ast.parse(source_code)
    except SyntaxError as exc:
        return False, f"SyntaxError: {exc.msg}", exc.lineno or 1

    for node in ast.walk(tree):
        for node_type, msg in UNSUPPORTED_AST_NODES.items():
            if isinstance(node, node_type):
                return False, f"Unsupported Construct: {msg}", getattr(node, "lineno", 1)

        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
            if node.func.id in FORBIDDEN_CALLS:
                return (
                    False,
                    f"Restricted Function: `{node.func.id}()` is disabled for security.",
                    getattr(node, "lineno", 1),
                )

    return True, None, None


def format_py_val(val: Any) -> str:
    if isinstance(val, str):
        return repr(val)
    if isinstance(val, (int, float, bool, list, dict, tuple, set)) or val is None:
        return repr(val)
    if hasattr(val, "__dict__"):
        attrs = ", ".join(
            f"{k}={format_py_val(v)}"
            for k, v in vars(val).items()
            if not k.startswith("__")
        )
        return f"{type(val).__name__}({attrs})"
    return f"<{type(val).__name__} instance>"


def get_py_type(val: Any) -> str:
    if val is None:
        return "NoneType"
    return type(val).__name__


class MemoryHeapTracker:
    """
    Deterministic Stack & Heap Memory Reference Tracker (Name -> @Address -> Value)
    with Visual Garbage Collection (refCount tracking across active stack frames).
    """

    def __init__(self):
        self.scalar_counter = 0x1000
        self.container_counter = 0x2000
        self.scalar_pool: Dict[Tuple[str, str], str] = {}
        self.container_id_map: Dict[int, str] = {}
        self.heap_registry: Dict[str, Dict[str, Any]] = {}

    def get_or_allocate(self, val: Any, step_idx: int) -> str:
        py_type = get_py_type(val)
        val_repr = format_py_val(val)

        if isinstance(val, (list, dict, set, tuple)) or hasattr(val, "__dict__"):
            obj_id = id(val)
            if obj_id not in self.container_id_map:
                addr = f"@0x{self.container_counter:04X}"
                self.container_counter += 0x40
                self.container_id_map[obj_id] = addr
            else:
                addr = self.container_id_map[obj_id]

            self.heap_registry[addr] = {
                "address": addr,
                "type": py_type,
                "repr": val_repr,
                "isMutable": True,
                "elements": [format_py_val(x) for x in val] if isinstance(val, (list, tuple)) else None,
                "lastTouchedStep": step_idx,
            }
            return addr

        key = (py_type, val_repr)
        if key not in self.scalar_pool:
            addr = f"@0x{self.scalar_counter:04X}"
            self.scalar_counter += 0x08
            self.scalar_pool[key] = addr
        else:
            addr = self.scalar_pool[key]

        self.heap_registry[addr] = {
            "address": addr,
            "type": py_type,
            "repr": val_repr,
            "isMutable": False,
            "elements": None,
            "lastTouchedStep": step_idx,
        }
        return addr

    def snapshot_memory(
        self, scope_frames: List[Dict[str, Any]], step_idx: int, changed_addrs: Optional[set] = None
    ) -> Dict[str, Any]:
        changed_addrs = changed_addrs or set()
        ref_counts: Dict[str, int] = {addr: 0 for addr in self.heap_registry}
        referenced_by: Dict[str, List[str]] = {addr: [] for addr in self.heap_registry}

        for sc in scope_frames:
            scope_prefix = "Global" if sc["scopeType"] == "GLOBAL" else sc["functionName"].split("(")[0]
            for v in sc["variables"]:
                addr = v.get("address")
                if addr and addr in self.heap_registry:
                    ref_counts[addr] = ref_counts.get(addr, 0) + 1
                    referenced_by.setdefault(addr, []).append(f"{scope_prefix}.{v['name']}")

        active_heap = []
        gc_heap = []
        for addr, meta in self.heap_registry.items():
            rc = ref_counts.get(addr, 0)
            entry = {
                **copy.deepcopy(meta),
                "refCount": rc,
                "referencedBy": referenced_by.get(addr, []),
                "isHighlighted": addr in changed_addrs,
                "gcStatus": "active" if rc > 0 else "unreferenced",
            }
            if rc > 0:
                active_heap.append(entry)
            else:
                gc_heap.append(entry)

        return {
            "stackScopes": copy.deepcopy(scope_frames),
            "heapObjects": active_heap,
            "gcObjects": gc_heap[-4:],
            "totalUnreferencedCount": len(gc_heap),
        }


def _normalize_input_code(custom_input_code: str) -> str:
    """
    Splits top-level comma-separated assignments (e.g., `arr = [1, 3, 5], target = 5`)
    into newline-separated statements while preserving list/dict/tuple literals.
    """
    raw = custom_input_code.strip()
    if not raw:
        return ""
    segments: List[str] = []
    cur = ""
    depth = 0
    in_single = False
    in_double = False
    for ch in raw:
        if ch == "'" and not in_double:
            in_single = not in_single
        elif ch == '"' and not in_single:
            in_double = not in_double
        elif not in_single and not in_double:
            if ch in "([{":
                depth += 1
            elif ch in ")]}":
                depth -= 1
            elif ch == "," and depth == 0 and "=" in cur:
                segments.append(cur.strip())
                cur = ""
                continue
        cur += ch
    if cur.strip():
        segments.append(cur.strip())
    return "\n".join(segments)


def _synthesize_missing_param_lines(
    params: List[str], fn_name: str, normalized_input: str
) -> List[str]:
    """
    Ensures every parameter required by a user's function or Solution method is defined,
    even if the user left the default `nums = [...]` in the Input Playground.
    """
    defined_names = set()
    if normalized_input:
        try:
            in_tree = ast.parse(normalized_input)
            for node in ast.walk(in_tree):
                if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store):
                    defined_names.add(node.id)
        except Exception:
            pass

    lines = [normalized_input] if normalized_input else []
    is_binary = "binary" in fn_name.lower() or "search" in fn_name.lower()

    for idx, p in enumerate(params):
        if p in defined_names:
            continue
        if p in ("arr", "nums", "numbers", "items", "prices", "height", "a", "data"):
            for existing in ("nums", "arr", "numbers", "items", "prices"):
                if existing in defined_names:
                    lines.append(
                        f"{p} = sorted({existing})" if is_binary else f"{p} = {existing}"
                    )
                    defined_names.add(p)
                    break
            if p not in defined_names:
                default_list = "[1, 3, 5, 7, 9, 11, 13]" if is_binary else "[-2, 1, -3, 4, -1, 2, 1, -5, 4]"
                lines.append(f"{p} = {default_list}")
                defined_names.add(p)
        elif p in ("target", "val", "key", "x", "k"):
            arr_ref = "arr" if "arr" in defined_names else "nums" if "nums" in defined_names else None
            if arr_ref and is_binary:
                lines.append(f"{p} = {arr_ref}[len({arr_ref}) // 2] if len({arr_ref}) > 0 else 0")
            else:
                lines.append(f"{p} = 4")
            defined_names.add(p)
        elif p in ("n", "num", "count", "limit"):
            lines.append(f"{p} = 4")
            defined_names.add(p)
        elif p in ("s", "text", "word", "string", "str1"):
            lines.append(f'{p} = "racecar"')
            defined_names.add(p)
        else:
            lines.append(f"{p} = 0")
            defined_names.add(p)

    return [ln for ln in lines if ln.strip()]


def _build_auto_invocation_code(source_code: str, normalized_input: str) -> str:
    tree = ast.parse(source_code)
    top_level_exec = [
        n for n in tree.body if not isinstance(n, (ast.FunctionDef, ast.ClassDef, ast.Expr))
        or (isinstance(n, ast.Expr) and not isinstance(getattr(n, "value", None), ast.Constant))
    ]
    if top_level_exec:
        if normalized_input:
            return normalized_input + "\n" + source_code
        return source_code

    # 1. Check for class Solution (or any class with methods)
    for node in tree.body:
        if isinstance(node, ast.ClassDef):
            methods = [m for m in node.body if isinstance(m, ast.FunctionDef) and not m.name.startswith("_")]
            if methods:
                m = methods[-1]
                params = [a.arg for a in m.args.args if a.arg != "self"]
                shim_lines = _synthesize_missing_param_lines(params, m.name, normalized_input)
                call_args = ", ".join(params)
                return (
                    f"{source_code.rstrip()}\n\n# --- Runner Invocation ---\n"
                    + "\n".join(shim_lines)
                    + f"\nresult = {node.name}().{m.name}({call_args})\n"
                )

    # 2. Check for standalone function definition (e.g. `def binary_search(arr, target):`)
    funcs = [n for n in tree.body if isinstance(n, ast.FunctionDef)]
    if funcs:
        fn = funcs[-1]
        params = [a.arg for a in fn.args.args]
        shim_lines = _synthesize_missing_param_lines(params, fn.name, normalized_input)
        call_args = ", ".join(params)
        return (
            f"{source_code.rstrip()}\n\n# --- Runner Invocation ---\n"
            + "\n".join(shim_lines)
            + f"\nresult = {fn.name}({call_args})\n"
        )

    if normalized_input:
        return normalized_input + "\n" + source_code
    return source_code


def _build_subexpression_frames_ast(
    stmt_node: Optional[ast.AST], code_text: str, frame
) -> List[Dict[str, Any]]:
    """
    Task 2.1 & 2.3: Builds Thonny-style step-by-step sub-expression evaluation frames,
    including strict short-circuit handling for logical `and` / `or` (`ast.BoolOp`).
    """
    frames: List[Dict[str, Any]] = [
        {"expr": code_text, "focus": "Original line", "shortCircuited": False}
    ]
    if stmt_node is None or not hasattr(ast, "unparse"):
        return frames

    def eval_node(node: ast.AST) -> Any:
        code_obj = compile(ast.Expression(node), "<expr>", "eval")
        return eval(code_obj, frame.f_globals, frame.f_locals)

    target_expr: Optional[ast.AST] = None
    prefix = ""
    suffix = ""

    if isinstance(stmt_node, ast.Assign) and len(stmt_node.targets) == 1:
        lhs = ast.unparse(stmt_node.targets[0])
        prefix = f"{lhs} = "
        target_expr = stmt_node.value
    elif isinstance(stmt_node, ast.AugAssign):
        lhs = ast.unparse(stmt_node.target)
        op_map = {ast.Add: "+=", ast.Sub: "-=", ast.Mult: "*=", ast.FloorDiv: "//=", ast.Mod: "%="}
        op_str = op_map.get(type(stmt_node.op), "+=")
        prefix = f"{lhs} {op_str} "
        target_expr = stmt_node.value
    elif isinstance(stmt_node, (ast.If, ast.While)):
        kw = "if" if isinstance(stmt_node, ast.If) else "while"
        prefix = f"{kw} "
        suffix = ":"
        target_expr = stmt_node.test
    elif isinstance(stmt_node, ast.Return) and stmt_node.value is not None:
        prefix = "return "
        target_expr = stmt_node.value

    if target_expr is None:
        return frames

    # Task 2.3: Handle Short-Circuit BoolOp (`and` / `or`) sequentially!
    if isinstance(target_expr, ast.BoolOp):
        is_and = isinstance(target_expr.op, ast.And)
        op_word = " and " if is_and else " or "
        clause_strs = [ast.unparse(v) for v in target_expr.values]

        evaluated_parts: List[str] = []
        for idx, clause_node in enumerate(target_expr.values):
            try:
                c_val = eval_node(clause_node)
                c_repr = format_py_val(c_val)
                evaluated_parts.append(c_repr)
                remaining = clause_strs[idx + 1 :]
                combined = op_word.join(evaluated_parts + remaining)
                frames.append(
                    {
                        "expr": f"{prefix}{combined}{suffix}",
                        "focus": f"Evaluated `{clause_strs[idx]}` → `{c_repr}`",
                        "shortCircuited": False,
                    }
                )
                if is_and and not bool(c_val) and remaining:
                    frames.append(
                        {
                            "expr": f"{prefix}False{suffix}",
                            "focus": f"Short-circuited `and`: `{clause_strs[idx]}` is False, skipping `{' and '.join(remaining)}`",
                            "shortCircuited": True,
                        }
                    )
                    return frames
                if (not is_and) and bool(c_val) and remaining:
                    frames.append(
                        {
                            "expr": f"{prefix}True{suffix}",
                            "focus": f"Short-circuited `or`: `{clause_strs[idx]}` is True, skipping `{' or '.join(remaining)}`",
                            "shortCircuited": True,
                        }
                    )
                    return frames
            except Exception:
                break

        try:
            final_bool = bool(eval_node(target_expr))
            frames.append(
                {
                    "expr": f"{prefix}{format_py_val(final_bool)}{suffix}",
                    "focus": f"Final boolean result: `{final_bool}`",
                    "shortCircuited": False,
                }
            )
        except Exception:
            pass
        return frames

    # Post-order AST sub-expression reduction (inner-first, like Thonny IDE!)
    working = ast.unparse(target_expr)
    sub_nodes: List[ast.AST] = []

    def collect_postorder(n: ast.AST):
        for child in ast.iter_child_nodes(n):
            collect_postorder(child)
        if isinstance(n, (ast.Name, ast.Subscript, ast.Call, ast.BinOp, ast.UnaryOp, ast.Compare)):
            sub_nodes.append(n)

    collect_postorder(target_expr)

    for sub in sub_nodes:
        if isinstance(sub, ast.Name):
            if sub.id not in frame.f_locals:
                continue
            val = frame.f_locals[sub.id]
            if isinstance(val, (list, dict, set)) or callable(val) or isinstance(val, type):
                continue
        sub_src = ast.unparse(sub)
        if not sub_src or sub_src not in working:
            continue
        try:
            val = eval_node(sub)
            if callable(val) or isinstance(val, type):
                continue
            val_str = format_py_val(val)
            if val_str != sub_src:
                new_working = working.replace(sub_src, val_str, 1)
                new_full = f"{prefix}{new_working}{suffix}"
                if new_full != frames[-1]["expr"]:
                    frames.append(
                        {
                            "expr": new_full,
                            "focus": f"Evaluate `{sub_src}` → `{val_str}`",
                            "shortCircuited": False,
                        }
                    )
                    working = new_working
        except Exception:
            pass

    try:
        final_val = eval_node(target_expr)
        final_str = format_py_val(final_val)
        final_line = f"{prefix}{final_str}{suffix}"
        if frames[-1]["expr"] != final_line:
            frames.append(
                {
                    "expr": final_line,
                    "focus": f"Result: `{final_str}`",
                    "shortCircuited": False,
                }
            )
    except Exception:
        pass

    return frames


def trace_python_program(
    source_code: str,
    custom_input_code: str = "",
    max_steps: int = 400,
) -> Dict[str, Any]:
    """
    Executes supported Python code step-by-step using `sys.settrace` and AST inspection.
    """
    is_valid, err_msg, err_line = validate_python_support(source_code)
    raw_lines = source_code.replace("\r\n", "\n").split("\n")

    if not is_valid:
        return {
            "ok": False,
            "errorType": "VALIDATION_ERROR",
            "errorMessage": err_msg,
            "errorLine": err_line,
            "rawLines": raw_lines,
            "steps": [],
        }

    normalized_input = _normalize_input_code(custom_input_code)
    if normalized_input:
        in_valid, in_err, in_line = validate_python_support(normalized_input)
        if not in_valid:
            return {
                "ok": False,
                "errorType": "INPUT_ERROR",
                "errorMessage": f"Invalid Input Playground value: {in_err}",
                "errorLine": in_line,
                "rawLines": raw_lines,
                "steps": [],
            }

    full_code = _build_auto_invocation_code(source_code, normalized_input)
    full_raw_lines = full_code.replace("\r\n", "\n").split("\n")

    tree = ast.parse(full_code)
    line_ast_map: Dict[int, ast.AST] = {}
    for node in ast.walk(tree):
        if hasattr(node, "lineno") and isinstance(
            node,
            (
                ast.Assign,
                ast.AugAssign,
                ast.AnnAssign,
                ast.If,
                ast.For,
                ast.While,
                ast.Return,
                ast.FunctionDef,
                ast.ClassDef,
                ast.Expr,
                ast.Break,
                ast.Continue,
            ),
        ):
            if node.lineno not in line_ast_map:
                line_ast_map[node.lineno] = node

    steps: List[Dict[str, Any]] = []
    stdout_buf = io.StringIO()
    prev_vars_by_frame: Dict[int, Dict[str, Any]] = {}
    loop_iter_counts: Dict[Tuple[int, int], int] = {}
    heap_tracker = MemoryHeapTracker()

    def eval_in_frame(expr_node: ast.AST, frame) -> Any:
        code_obj = compile(ast.Expression(expr_node), "<expr>", "eval")
        return eval(code_obj, frame.f_globals, frame.f_locals)

    def extract_clean_vars(f_locals: Dict[str, Any]) -> Dict[str, Any]:
        out: Dict[str, Any] = {}
        for k, v in f_locals.items():
            if k.startswith("__") or k in ("self", "Solution"):
                continue
            if callable(v) or isinstance(v, type):
                continue
            out[k] = copy.deepcopy(v) if isinstance(v, (list, dict, set)) else v
        return out

    def capture_all_scope_frames(active_frame, step_idx: int) -> List[Dict[str, Any]]:
        chain = []
        cur = active_frame
        while cur is not None:
            if cur.f_code.co_filename == "<user_code>":
                chain.append(cur)
            cur = cur.f_back
        chain.reverse()

        scope_frames = []
        for idx, fr in enumerate(chain):
            fn_name = fr.f_code.co_name
            is_global = fn_name == "<module>"
            is_active = idx == len(chain) - 1
            vars_dict = extract_clean_vars(fr.f_locals)
            var_rows = []
            for k, v in vars_dict.items():
                orig_obj = fr.f_locals.get(k, v)
                addr = heap_tracker.get_or_allocate(orig_obj, step_idx)
                var_rows.append(
                    {
                        "name": k,
                        "address": addr,
                        "current": format_py_val(v),
                        "rawValue": v if isinstance(v, (int, float, bool, str, list)) else format_py_val(v),
                        "type": get_py_type(v),
                        "status": "unchanged",
                    }
                )
            scope_frames.append(
                {
                    "scopeId": "global" if is_global else f"local_{idx}_{fn_name}",
                    "scopeType": "GLOBAL" if is_global else "LOCAL",
                    "title": "Global Scope" if is_global else f"Local Scope: {fn_name}()",
                    "functionName": "Global Scope" if is_global else f"{fn_name}()",
                    "isActive": is_active,
                    "variables": var_rows,
                }
            )
        return scope_frames

    def record_snapshot(frame, event: str, arg: Any):
        if len(steps) >= max_steps:
            raise TimeoutError(
                f"Execution exceeded maximum step limit ({max_steps} steps). Possible infinite loop."
            )

        lineno = frame.f_lineno
        if lineno > len(raw_lines):
            return
        code_text = full_raw_lines[lineno - 1].strip() if 1 <= lineno <= len(full_raw_lines) else ""
        if not code_text or code_text.startswith("#"):
            return

        # If this is a "return" event on a `return ...` line that we just recorded on the "line" event,
        # attach the returnValue and post-execution variables rather than duplicating the return step.
        if event == "return" and steps and steps[-1]["line"] == lineno and steps[-1]["eventType"] == "RETURN":
            steps[-1]["returnValue"] = format_py_val(arg)
            if steps[-1].get("operationDetail"):
                steps[-1]["operationDetail"]["returnVal"] = format_py_val(arg)
            return

        step_idx = len(steps) + 1
        frame_id = id(frame)
        func_name = frame.f_code.co_name
        scope_title = "Global Scope" if func_name == "<module>" else f"{func_name}()"

        prev_map = prev_vars_by_frame.setdefault(frame_id, {})
        current_vars = extract_clean_vars(frame.f_locals)

        stmt_node = line_ast_map.get(lineno)
        condition_info = None
        loop_info = None
        operation_detail = None
        event_type = "STMT"

        if event == "call":
            if func_name == "<module>" or func_name == "Solution":
                return
            event_type = "FUNC_CALL"
            param_bindings = [
                {"param": k, "argExpr": k, "val": format_py_val(v)} for k, v in current_vars.items()
            ]
            operation_detail = {
                "kind": "func_call",
                "funcName": func_name,
                "paramBindings": param_bindings,
            }
        elif isinstance(stmt_node, ast.ClassDef):
            event_type = "CLASS_DEF"
            operation_detail = {"kind": "class_def", "className": stmt_node.name}
        elif isinstance(stmt_node, ast.FunctionDef):
            event_type = "FUNC_DEF"
            params = [a.arg for a in stmt_node.args.args if a.arg != "self"]
            operation_detail = {"kind": "func_def", "funcName": stmt_node.name, "params": params}
        elif isinstance(stmt_node, ast.Return):
            event_type = "RETURN"
            ret_val_str = "None"
            if stmt_node.value is not None:
                try:
                    ret_val_str = format_py_val(eval_in_frame(stmt_node.value, frame))
                except Exception:
                    pass
            operation_detail = {
                "kind": "return",
                "expr": ast.unparse(stmt_node.value) if stmt_node.value and hasattr(ast, "unparse") else "None",
                "returnVal": ret_val_str,
            }
        elif isinstance(stmt_node, (ast.If, ast.While)):
            is_while = isinstance(stmt_node, ast.While)
            try:
                cond_val = bool(eval_in_frame(stmt_node.test, frame))
                left_str, op_str, right_str = "", "", ""
                left_expr, right_expr = "", ""
                if isinstance(stmt_node.test, ast.Compare) and len(stmt_node.test.ops) == 1:
                    lval = eval_in_frame(stmt_node.test.left, frame)
                    rval = eval_in_frame(stmt_node.test.comparators[0], frame)
                    op_map = {
                        ast.Eq: "==",
                        ast.NotEq: "!=",
                        ast.Lt: "<",
                        ast.LtE: "<=",
                        ast.Gt: ">",
                        ast.GtE: ">=",
                        ast.In: "in",
                        ast.NotIn: "not in",
                    }
                    op_str = op_map.get(type(stmt_node.test.ops[0]), "?")
                    left_str = format_py_val(lval)
                    right_str = format_py_val(rval)
                    left_expr = ast.unparse(stmt_node.test.left) if hasattr(ast, "unparse") else left_str
                    right_expr = ast.unparse(stmt_node.test.comparators[0]) if hasattr(ast, "unparse") else right_str
                else:
                    left_expr = ast.unparse(stmt_node.test) if hasattr(ast, "unparse") else code_text
                    left_str = format_py_val(cond_val)
                    op_str = "is"
                    right_expr = "True"
                    right_str = "True"
                condition_info = {
                    "expr": ast.unparse(stmt_node.test) if hasattr(ast, "unparse") else code_text,
                    "leftExpr": left_expr,
                    "leftVal": left_str,
                    "operator": op_str,
                    "rightExpr": right_expr,
                    "rightVal": right_str,
                    "result": cond_val,
                }
            except Exception:
                cond_val = False

            if is_while:
                key = (frame_id, lineno)
                loop_iter_counts[key] = loop_iter_counts.get(key, 0) + 1
                event_type = "LOOP_ITER" if cond_val else "LOOP_END"
                loop_info = {"loopType": "while", "iteration": loop_iter_counts[key]}
                operation_detail = {
                    "kind": "while_check",
                    "iteration": loop_iter_counts[key],
                    **(condition_info or {}),
                }
            else:
                event_type = "CONDITION"
                operation_detail = {"kind": "condition", **(condition_info or {})}
        elif isinstance(stmt_node, ast.For):
            key = (frame_id, lineno)
            loop_iter_counts[key] = loop_iter_counts.get(key, 0) + 1
            iter_var = ast.unparse(stmt_node.target) if hasattr(ast, "unparse") else "i"
            iter_expr = ast.unparse(stmt_node.iter) if hasattr(ast, "unparse") else "seq"
            total_len = 0
            try:
                seq_val = eval_in_frame(stmt_node.iter, frame)
                total_len = len(seq_val)
            except Exception:
                pass
            if total_len and loop_iter_counts[key] > total_len:
                event_type = "LOOP_END"
                loop_info = {"loopType": "for", "iteration": total_len, "isFinished": True}
                operation_detail = {"kind": "for_end", "iterVar": iter_var, "total": total_len}
            else:
                event_type = "LOOP_ITER"
                loop_info = {"loopType": "for", "iteration": loop_iter_counts[key]}
                operation_detail = {
                    "kind": "for_iter",
                    "iterVar": iter_var,
                    "iterVal": "0",
                    "iteration": loop_iter_counts[key],
                    "total": total_len or loop_iter_counts[key],
                    "indexedElementInfo": None,
                }
        elif isinstance(stmt_node, ast.AugAssign):
            event_type = "AUG_ASSIGN"
            try:
                target_name = ast.unparse(stmt_node.target) if hasattr(ast, "unparse") else "var"
                before_v = current_vars.get(target_name)
                rhs_v = eval_in_frame(stmt_node.value, frame)
                op_char = (
                    "+"
                    if isinstance(stmt_node.op, ast.Add)
                    else "-"
                    if isinstance(stmt_node.op, ast.Sub)
                    else "*"
                    if isinstance(stmt_node.op, ast.Mult)
                    else "//"
                )
                operation_detail = {
                    "kind": "aug_assign",
                    "target": target_name,
                    "op": op_char,
                    "baseOp": op_char,
                    "beforeVal": format_py_val(before_v),
                    "rhsExpr": ast.unparse(stmt_node.value) if hasattr(ast, "unparse") else "",
                    "rhsVal": format_py_val(rhs_v),
                    "afterVal": format_py_val(before_v),
                }
            except Exception:
                pass
        elif isinstance(stmt_node, (ast.Assign, ast.AnnAssign)):
            event_type = "ASSIGN"
            try:
                lhs_node = stmt_node.targets[0] if isinstance(stmt_node, ast.Assign) else stmt_node.target
                val_node = stmt_node.value
                lhs_str = ast.unparse(lhs_node) if hasattr(ast, "unparse") else "var"
                rhs_str = ast.unparse(val_node) if val_node and hasattr(ast, "unparse") else ""
                rhs_val = eval_in_frame(val_node, frame) if val_node else None
                is_created = lhs_str not in current_vars
                before_v = current_vars.get(lhs_str)
                operation_detail = {
                    "kind": "assign",
                    "target": lhs_str,
                    "isCreated": is_created,
                    "beforeVal": "—" if is_created else format_py_val(before_v),
                    "rhsExpr": rhs_str,
                    "substituted": format_py_val(rhs_val),
                    "afterVal": format_py_val(rhs_val),
                }
            except Exception:
                pass
        elif code_text.startswith("print("):
            event_type = "PRINT"
            operation_detail = {"kind": "print", "output": ""}

        var_inspector_rows = []
        changed_vars = []
        for k, v in current_vars.items():
            curr_str = format_py_val(v)
            orig_obj = frame.f_locals.get(k, v)
            addr = heap_tracker.get_or_allocate(orig_obj, step_idx)
            if k not in prev_map:
                status = "created"
                prev_str = "—"
                changed_vars.append({"name": k, "prev": "—", "curr": curr_str, "status": "created", "address": addr})
            elif format_py_val(prev_map[k]) != curr_str:
                status = "updated"
                prev_str = format_py_val(prev_map[k])
                changed_vars.append({"name": k, "prev": prev_str, "curr": curr_str, "status": "updated", "address": addr})
            else:
                status = "unchanged"
                prev_str = curr_str

            var_inspector_rows.append(
                {
                    "name": k,
                    "address": addr,
                    "previous": prev_str,
                    "current": curr_str,
                    "rawValue": v if isinstance(v, (int, float, bool, str, list)) else curr_str,
                    "type": get_py_type(v),
                    "status": status,
                }
            )

        prev_vars_by_frame[frame_id] = copy.deepcopy(current_vars)
        scope_frames = capture_all_scope_frames(frame, step_idx)
        changed_addrs = {c["address"] for c in changed_vars if "address" in c}
        memory_model = heap_tracker.snapshot_memory(scope_frames, step_idx, changed_addrs)
        expr_frames = _build_subexpression_frames_ast(stmt_node, code_text, frame)

        steps.append(
            {
                "stepIndex": step_idx,
                "event": event,
                "eventType": event_type,
                "line": lineno,
                "codeText": code_text,
                "functionName": scope_title,
                "scopeType": "GLOBAL" if func_name == "<module>" else "LOCAL",
                "variables": var_inspector_rows,
                "changedVars": changed_vars,
                "condition": condition_info,
                "loop": loop_info,
                "operationDetail": operation_detail,
                "exprFrames": expr_frames,
                "scopeFrames": scope_frames,
                "memoryModel": memory_model,
                "returnValue": operation_detail.get("returnVal") if event_type == "RETURN" and operation_detail else (format_py_val(arg) if event == "return" else None),
                "stdout": stdout_buf.getvalue().splitlines(),
            }
        )

    def trace_dispatch(frame, event, arg):
        if frame.f_code.co_filename != "<user_code>":
            return trace_dispatch
        if event in ("line", "call", "return"):
            record_snapshot(frame, event, arg)
        return trace_dispatch

    compiled = compile(full_code, "<user_code>", "exec")
    sandbox_globals = {"__builtins__": SUPPORTED_BUILTINS, "__name__": "__main__"}
    old_stdout = sys.stdout
    error_info = None

    try:
        sys.stdout = stdout_buf
        sys.settrace(trace_dispatch)
        exec(compiled, sandbox_globals)
    except Exception as exc:
        tb = sys.exc_info()[2]
        err_ln = 1
        while tb is not None:
            if tb.tb_frame.f_code.co_filename == "<user_code>":
                err_ln = min(tb.tb_lineno, len(raw_lines))
            tb = tb.tb_next
        error_info = {
            "type": type(exc).__name__,
            "message": str(exc),
            "line": err_ln,
        }
    finally:
        sys.settrace(None)
        sys.stdout = old_stdout

    aligned_steps = _align_post_execution_variables(steps)

    return {
        "ok": error_info is None,
        "error": error_info,
        "errorMessage": f"{error_info['type']}: {error_info['message']}" if error_info else None,
        "errorLine": error_info["line"] if error_info else None,
        "rawLines": raw_lines,
        "steps": aligned_steps,
        "finalResult": format_py_val(sandbox_globals.get("result")) if "result" in sandbox_globals else None,
    }


def _align_post_execution_variables(raw_steps: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    if not raw_steps:
        return []

    aligned = []
    for i, step in enumerate(raw_steps):
        step_copy = copy.deepcopy(step)
        before_vars = {v["name"]: v["current"] for v in step["variables"]}

        after_vars_list = step["variables"]
        after_scope_frames = step.get("scopeFrames", [])
        after_memory_model = step.get("memoryModel", {})
        for j in range(i + 1, len(raw_steps)):
            if raw_steps[j]["functionName"] == step["functionName"]:
                after_vars_list = raw_steps[j]["variables"]
                after_scope_frames = raw_steps[j].get("scopeFrames", after_scope_frames)
                after_memory_model = raw_steps[j].get("memoryModel", after_memory_model)
                break

        recomputed_vars = []
        changed_summary = []
        for v in after_vars_list:
            name = v["name"]
            curr_val = v["current"]
            if name not in before_vars:
                status = "created"
                prev_val = "—"
                changed_summary.append(f"{name}: (created) -> {curr_val}")
            elif before_vars[name] != curr_val:
                status = "updated"
                prev_val = before_vars[name]
                changed_summary.append(f"{name}: {prev_val} -> {curr_val}")
            else:
                status = "unchanged"
                prev_val = curr_val

            recomputed_vars.append(
                {
                    "name": name,
                    "address": v.get("address", "@0x1000"),
                    "previous": prev_val,
                    "current": curr_val,
                    "rawValue": v["rawValue"],
                    "type": v["type"],
                    "status": status,
                }
            )

        # Backfill operationDetail post-execution values (`afterVal`, `iterVal`, `indexedElementInfo`)
        op_detail = step_copy.get("operationDetail")
        if op_detail:
            if op_detail.get("kind") == "aug_assign":
                t_name = op_detail.get("target")
                after_match = next((rv["current"] for rv in recomputed_vars if rv["name"] == t_name), None)
                if after_match is not None:
                    op_detail["afterVal"] = after_match
            elif op_detail.get("kind") == "for_iter":
                iter_var = op_detail.get("iterVar")
                iter_row = next((rv for rv in recomputed_vars if rv["name"] == iter_var), None)
                if iter_row is not None:
                    op_detail["iterVal"] = iter_row["current"]
                    arr_row = next((rv for rv in recomputed_vars if rv["name"] in ("nums", "arr") and isinstance(rv["rawValue"], list)), None)
                    if arr_row and isinstance(iter_row["rawValue"], int) and 0 <= iter_row["rawValue"] < len(arr_row["rawValue"]):
                        elem_info = {
                            "arrayName": arr_row["name"],
                            "indexVar": iter_var,
                            "indexVal": iter_row["rawValue"],
                            "elementVal": format_py_val(arr_row["rawValue"][iter_row["rawValue"]]),
                        }
                        op_detail["indexedElementInfo"] = elem_info
                        if step_copy.get("loop"):
                            step_copy["loop"]["indexedElementInfo"] = elem_info

        step_copy["beforeVars"] = before_vars
        step_copy["variables"] = recomputed_vars
        step_copy["scopeFrames"] = after_scope_frames
        step_copy["memoryModel"] = after_memory_model
        step_copy["changedSummary"] = (
            ", ".join(changed_summary) if changed_summary else "No variable values changed"
        )
        step_copy["nextLine"] = raw_steps[i + 1]["line"] if i + 1 < len(raw_steps) else None
        aligned.append(step_copy)

    return aligned
