# scratch/inspect_phase6_catalog.py
import json

with open('app_build/dsa_problems.js', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('[')
end_idx = text.rfind(']')
problems = json.loads(text[start_idx:end_idx + 1])

print(f"Total problems: {len(problems)}")
print("First 10 problems:")
for p in problems[:10]:
    print(f"  #{p['id']} LC {p.get('leetcodeNumber')}: {p['title']} ({p['difficulty']}) - Topic: {p.get('primaryTopic')} - Pattern: {p.get('pattern')}")

print("\nTopics distribution:")
topic_counts = {}
for p in problems:
    t = p.get('primaryTopic', 'Unknown')
    topic_counts[t] = topic_counts.get(t, 0) + 1

for t, c in sorted(topic_counts.items(), key=lambda x: -x[1])[:10]:
    print(f"  {t}: {c}")
