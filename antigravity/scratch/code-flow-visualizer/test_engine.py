"""
test_engine.py — Automated Unit Tests for the Thonny-Style Execution Engine & Explainer in `app_build/`
Covers:
- Original 12 Execution & Validation Tests
- Task 2.1: Binary Search (`left, right = 0, len(arr) - 1`, `(left + right) // 2`) & Sub-Expression Frames
- Task 2.3: Short-Circuit Boolean Evaluation (`and` / `or` avoiding out-of-bounds IndexError)
- Task 3.1 & 3.3: Stack & Heap Reference Model (`Name -> @Address -> Value`) + Visual Garbage Collection
- Task 4.1: Global vs. Local Variable Scope Isolation (`scopeFrames`)
Run with: python -m unittest test_engine.py -v
"""

import unittest
from app_build.engine import trace_python_program, validate_python_support
from app_build.explainer import generate_step_explanation

MAX_SUBARRAY_CODE = """class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        c = 0
        ans = nums[0]

        for i in range(len(nums)):
            c += nums[i]

            if c >= ans:
                ans = c

            if c < 0:
                c = 0

        return ans
"""

BINARY_SEARCH_CODE = """def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1
"""


class TestExecutionEngine(unittest.TestCase):
    def test_1_max_subarray_default_returns_6(self):
        res = trace_python_program(
            MAX_SUBARRAY_CODE,
            "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        )
        self.assertTrue(res["ok"])
        self.assertEqual(res["finalResult"], "6")
        self.assertGreater(len(res["steps"]), 25)

    def test_2_all_negative_array_returns_minus_2(self):
        res = trace_python_program(
            MAX_SUBARRAY_CODE,
            "nums = [-5, -2, -8]",
        )
        self.assertTrue(res["ok"])
        self.assertEqual(res["finalResult"], "-2")

    def test_3_positive_numbers_returns_10(self):
        res = trace_python_program(
            MAX_SUBARRAY_CODE,
            "nums = [1, 2, 3, 4]",
        )
        self.assertTrue(res["ok"])
        self.assertEqual(res["finalResult"], "10")

    def test_4_single_element_array(self):
        res = trace_python_program(
            MAX_SUBARRAY_CODE,
            "nums = [-9]",
        )
        self.assertTrue(res["ok"])
        self.assertEqual(res["finalResult"], "-9")

    def test_5_empty_input_raises_index_error(self):
        res = trace_python_program(
            MAX_SUBARRAY_CODE,
            "nums = []",
        )
        self.assertFalse(res["ok"])
        self.assertEqual(res["error"]["type"], "IndexError")

    def test_6_invalid_input_syntax(self):
        res = trace_python_program(
            MAX_SUBARRAY_CODE,
            "nums = [1, 2,",
        )
        self.assertFalse(res["ok"])
        self.assertEqual(res["errorType"], "INPUT_ERROR")

    def test_7_incorrect_code_syntax(self):
        ok, msg, ln = validate_python_support("def broken(\n    x = 1")
        self.assertFalse(ok)
        self.assertIn("SyntaxError", msg)

    def test_8_unsupported_construct_blocked(self):
        ok, msg, ln = validate_python_support("import os\nx = 1")
        self.assertFalse(ok)
        self.assertIn("Unsupported Construct", msg)

    def test_9_infinite_loop_protection(self):
        code = "x = 0\nwhile True:\n    x += 1\n"
        res = trace_python_program(code, max_steps=50)
        self.assertFalse(res["ok"])
        self.assertEqual(res["error"]["type"], "TimeoutError")
        self.assertLessEqual(len(res["steps"]), 50)

    def test_10_runtime_exception_captured(self):
        code = "a = 10\nb = 0\nc = a / b\n"
        res = trace_python_program(code)
        self.assertFalse(res["ok"])
        self.assertEqual(res["error"]["type"], "ZeroDivisionError")
        self.assertEqual(res["error"]["line"], 3)

    def test_11_previous_and_next_step_snapshots(self):
        res = trace_python_program(
            MAX_SUBARRAY_CODE,
            "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        )
        steps = res["steps"]
        for i, st in enumerate(steps):
            prev_st = steps[i - 1] if i > 0 else None
            exp = generate_step_explanation(st, prev_st)
            self.assertIn("whatBeginner", exp)
            self.assertIn("whatTechnical", exp)
            self.assertIn("whyExecuting", exp)

    def test_12_nested_loops_and_conditions(self):
        code = """total = 0
for i in range(3):
    for j in range(2):
        if (i + j) % 2 == 0:
            total += 1
result = total
"""
        res = trace_python_program(code)
        self.assertTrue(res["ok"])
        self.assertEqual(res["finalResult"], "3")

    def test_13_binary_search_and_subexpression_frames(self):
        res = trace_python_program(
            BINARY_SEARCH_CODE,
            "arr = [1, 3, 5, 7, 9, 11, 13], target = 7",
        )
        self.assertTrue(res["ok"])
        self.assertEqual(res["finalResult"], "3")
        self.assertTrue(all("exprFrames" in st for st in res["steps"]))

    def test_14_short_circuit_evaluation_avoids_index_error(self):
        code = """def safe_check(arr, target):
    i = 3
    if i < len(arr) and arr[i] == target:
        return i
    return -1
"""
        res = trace_python_program(code, "arr = [2, 4, 6], target = 9")
        self.assertTrue(res["ok"])
        self.assertEqual(res["finalResult"], "-1")
        sc_steps = [
            st
            for st in res["steps"]
            if any(f.get("shortCircuited") for f in st.get("exprFrames", []))
        ]
        self.assertGreaterEqual(len(sc_steps), 1)

    def test_15_scope_isolation_and_heap_reference_gc(self):
        res = trace_python_program(
            BINARY_SEARCH_CODE,
            "arr = [1, 3, 5, 7, 9, 11, 13], target = 9",
        )
        self.assertTrue(res["ok"])
        local_steps = [st for st in res["steps"] if st.get("scopeType") == "LOCAL"]
        self.assertGreater(len(local_steps), 0)
        sample_step = local_steps[-1]
        self.assertIn("scopeFrames", sample_step)
        self.assertIn("memoryModel", sample_step)
        self.assertGreaterEqual(len(sample_step["scopeFrames"]), 2)  # Global + Local

    def test_16_oop_stack_class_execution(self):
        stack_code = """class Stack:
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

s = Stack()
s.push(10)
s.push(20)
s.push(30)

print(s.pop())
print(s.peek())
print(s.size())
print(s.is_empty())
"""
        res = trace_python_program(stack_code, "")
        self.assertTrue(res["ok"])
        last_stdout = res["steps"][-1]["stdout"]
        self.assertEqual(last_stdout, ["30", "20", "2", "False"])


if __name__ == "__main__":
    unittest.main()
