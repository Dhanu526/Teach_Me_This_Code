with open('app_build/dsa_problems.js', 'r', encoding='utf-8') as f:
    c = f.read()

candidates = [
    (700, "Search in a Binary Search Tree"),
    (1832, "Check if the Sentence Is Pangram"),
    (2269, "Find the K-Beauty of a Number")
]

for num, title in candidates:
    has_num = f'"leetcodeNumber": {num}' in c
    has_title = title.lower() in c.lower()
    print(f"LC {num} ({title}): in catalog? num={has_num}, title={has_title}")
