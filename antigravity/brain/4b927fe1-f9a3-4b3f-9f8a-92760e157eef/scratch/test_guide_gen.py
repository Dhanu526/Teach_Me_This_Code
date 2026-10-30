# scratch/test_guide_gen.py
# Tests the rule-based educational teaching guide generator

def generate_teaching_guide(p):
    title = p.get('title', 'DSA Problem')
    pattern = p.get('pattern', 'Algorithmic Pattern')
    topic = p.get('primaryTopic', 'Data Structures')
    summary = p.get('summary') or p.get('description', '')
    
    # Section A: Understand
    what_is_asked = f"The problem asks you to {summary.lower().rstrip('.')}. You must process the input and return the requested result meeting the specified time and space bounds."
    
    # What to return
    if 'index' in summary.lower() or 'indices' in summary.lower():
        what_to_return = "Return the 0-based index or indices satisfying the target condition (e.g., [i, j])."
    elif 'true' in summary.lower() or 'false' in summary.lower() or 'determine if' in summary.lower() or 'check if' in summary.lower():
        what_to_return = "Return a boolean value: True if the condition holds, False otherwise."
    elif 'maximum' in summary.lower() or 'largest' in summary.lower():
        what_to_return = "Return the single maximum / optimal numeric value found."
    elif 'minimum' in summary.lower() or 'shortest' in summary.lower():
        what_to_return = "Return the single minimum / shortest numeric value found."
    elif 'list' in summary.lower() or 'array' in summary.lower() or 'group' in summary.lower():
        what_to_return = "Return the resulting list or array containing the calculated elements."
    else:
        what_to_return = "Return the calculated answer matching the problem's expected output format."

    # Edge cases
    edge_cases = [
        "Empty or minimal input: ensure your code gracefully handles lists with 0 or 1 element.",
        "Identical / duplicate values: verify whether the problem allows using the same element twice or requires distinct values.",
        "Negative and zero values: check if calculations could encounter zero-division or sign inversions.",
        "Boundary values: check if the optimal elements appear at the very start or end of the collection."
    ]

    # Section B: Learn the Pattern
    why_useful = f"A naive brute-force approach typically requires checking all combinations in O(n²) or O(2^n) time. The {pattern} pattern reduces time complexity to optimal {p.get('timeComplexity', 'O(n)')} by keeping track of essential state and avoiding redundant checks."
    
    small_example = f"For a small input with 2 or 3 elements, {pattern} tracks key invariants step by step. When the target state is matched, it terminates immediately rather than scanning remaining unnecessary paths."
    
    intended_approach = [
        f"1. Initialize state: Set up necessary variables, pointers, or data structures for the {pattern} approach.",
        "2. Iterate and update: Traverse the input once, updating your invariants and checking for the target condition.",
        "3. Finalize result: Return the computed answer or fallback default if no match was found."
    ]

    # Hints
    hints = [
        f"Hint 1 (Observation): What redundant work can you eliminate instead of re-scanning all elements? Think about what you already know at each step.",
        f"Hint 2 (Data Structure): How can the {pattern} pattern or an auxiliary lookup structure help you achieve {p.get('timeComplexity', 'O(n)')} time?",
        f"Hint 3 (Algorithm): Follow the invariant: maintain current state as you iterate, and check if the complement or boundary satisfies the goal."
    ]

    return {
        "whatIsAsked": what_is_asked,
        "whatToReturn": what_to_return,
        "edgeCases": edge_cases,
        "whyUseful": why_useful,
        "smallExample": small_example,
        "intendedApproach": intended_approach,
        "hints": hints
    }

sample_prob = {
    "title": "Two Sum",
    "pattern": "Hash Map Lookup",
    "primaryTopic": "Arrays & Hashing",
    "summary": "Find indices of two numbers that add up to a target using a dictionary for instant lookups.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)"
}

guide = generate_teaching_guide(sample_prob)
import pprint
pprint.pprint(guide)
