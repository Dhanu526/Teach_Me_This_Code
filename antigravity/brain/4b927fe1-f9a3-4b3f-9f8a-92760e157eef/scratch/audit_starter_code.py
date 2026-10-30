import json
import re

problems_path = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\dsa_problems.js"

with open(problems_path, "r", encoding="utf-8") as f:
    text = f.read()

# Extract JSON
prefix = "window.DSA_PROBLEMS_LIBRARY = "
start_idx = text.find(prefix) + len(prefix)
end_idx = text.rfind("];") + 1
raw_json = text[start_idx:end_idx]
problems = json.loads(raw_json)

print(f"Loaded {len(problems)} problems")

def format_python_code(code_str):
    # Splits single-line if/elif/else/while/for statements into proper multi-line indented blocks
    # e.g. "if cond: stmt" -> "if cond:\n    stmt"
    # e.g. "l += 1; r -= 1" -> "l += 1\nr -= 1"
    lines = code_str.split("\n")
    new_lines = []
    
    for line in lines:
        # Check for multiple statements separated by semicolon
        if ";" in line and not line.strip().startswith("#"):
            # split by semicolon preserving indentation
            indent_match = re.match(r"^(\s*)", line)
            indent = indent_match.group(1) if indent_match else ""
            parts = [p.strip() for p in line.split(";") if p.strip()]
            for p in parts:
                new_lines.append(indent + p)
            continue
            
        # Check for single-line compound: "if cond: stmt", "elif cond: stmt", "else: stmt", "while cond: stmt", "for ...: stmt"
        # Match lines like "    if foo: bar" or "    while foo: bar"
        m = re.match(r"^(\s*)(if\s+.*?:|elif\s+.*?:|else:|while\s+.*?:|for\s+.*?:)\s*([^\s#].+)$", line)
        if m:
            indent = m.group(1)
            header = m.group(2)
            stmt = m.group(3)
            new_lines.append(indent + header)
            new_lines.append(indent + "    " + stmt)
        else:
            new_lines.append(line)
            
    return "\n".join(new_lines)

changed_count = 0
for p in problems:
    original = p["starterCode"]
    formatted = format_python_code(original)
    if formatted != original:
        p["starterCode"] = formatted
        changed_count += 1

print(f"Formatted single-line colons/semicolons into clean multi-line PEP 8 blocks in {changed_count} problems.")

# Write back
with open(problems_path, "w", encoding="utf-8") as f:
    f.write(f"// app_build/dsa_problems.js — 300 Curated, Distinct LeetCode & DSA Problems\n// Real, identifiable problems across 18 core DSA topics\nwindow.DSA_PROBLEMS_LIBRARY = {json.dumps(problems, indent=2)};\n")

print("Updated app_build/dsa_problems.js successfully!")
