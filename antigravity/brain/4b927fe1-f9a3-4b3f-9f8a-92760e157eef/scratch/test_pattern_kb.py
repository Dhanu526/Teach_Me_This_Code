import json
import re

with open('app_build/dsa_problems.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract patterns
patterns = set(re.findall(r'"pattern":\s*"([^"]+)"', text))
print(f"Total unique patterns: {len(patterns)}")
sorted_patterns = sorted(list(patterns))
for p in sorted_patterns[:25]:
    print(f" - {p}")
