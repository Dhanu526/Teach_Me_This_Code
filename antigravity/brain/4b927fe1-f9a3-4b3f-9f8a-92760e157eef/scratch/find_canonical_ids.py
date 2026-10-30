# scratch/find_canonical_ids.py
import json

with open('app_build/dsa_problems.js', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('[')
end_idx = text.rfind(']')
problems = json.loads(text[start_idx:end_idx + 1])

targets = [
    ("Two Sum", 1),
    ("Contains Duplicate", 217),
    ("Valid Anagram", 242),
    ("Product of Array Except Self", 238),
    ("Longest Consecutive Sequence", 128),
    ("Container With Most Water", 11),
    ("3Sum", 15),
    ("Longest Substring Without Repeating", 3),
    ("Merge Intervals", 56),
    ("Valid Parentheses", 20),
    ("Reverse Linked List", 206),
    ("Search in Rotated Sorted Array", 33),
    ("Find Minimum in Rotated Sorted Array", 153),
    ("Maximum Depth of Binary Tree", 104),
    ("Invert Binary Tree", 226),
    ("Best Time to Buy and Sell Stock", 121),
    ("Maximum Subarray", 53),
    ("Climbing Stairs", 70),
    ("Coin Change", 322),
    ("Daily Temperatures", 739),
    ("Binary Search", 704)
]

for name, lc in targets:
    p = next((x for x in problems if x.get('leetcodeNumber') == lc or name.lower() in x['title'].lower()), None)
    if p:
        print(f"ID {p['id']}: LC {p.get('leetcodeNumber')} - '{p['title']}' (Topic: {p.get('primaryTopic')})")
    else:
        print(f"NOT FOUND: {name} (LC {lc})")
