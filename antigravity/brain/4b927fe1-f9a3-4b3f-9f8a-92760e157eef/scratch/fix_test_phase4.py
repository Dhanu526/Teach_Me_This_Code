import os

test_path = r'C:\Users\CVT\.gemini\antigravity\brain\4b927fe1-f9a3-4b3f-9f8a-92760e157eef\scratch\test_dsa_phase4.js'
with open(test_path, 'r', encoding='utf-8') as f:
    c = f.read()

target = '''    // Genuine Brand New Problem (Should be imported)
    {
      leetcodeNumber: 572,
      title: "Subtree of Another Tree",
      sourceUrl: "https://leetcode.com/problems/subtree-of-another-tree/",
      difficulty: "Easy",
      primaryTopic: "Trees and Binary Trees",
      pattern: "Tree Traversal DFS",
      summary: "Given roots of two binary trees root and subRoot, return true if subRoot is a subtree of root.",
      examples: [{ input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" }],
      constraints: ["Number of nodes in tree is [1, 2000]"],
      prerequisites: ["Binary Trees", "Recursion"]
    }'''

replacement = '''    // Genuine Brand New Problem (Should be imported)
    {
      leetcodeNumber: 1832,
      title: "Check if the Sentence Is Pangram",
      sourceUrl: "https://leetcode.com/problems/check-if-the-sentence-is-pangram/",
      difficulty: "Easy",
      primaryTopic: "Strings",
      pattern: "Hash Set Character Counting",
      summary: "A pangram is a sentence where every letter of the English alphabet appears at least once. Return true if sentence is a pangram.",
      examples: [{ input: "sentence = 'thequickbrownfoxjumpsoverthelazydog'", output: "true" }],
      constraints: ["sentence length between 1 and 1000"],
      prerequisites: ["Strings", "Hash Sets"]
    }'''

assert target in c, "target problem not found"
c = c.replace(target, replacement, 1)
c = c.replace('Subtree of Another Tree', 'Check if the Sentence Is Pangram')
c = c.replace('Trees and Binary Trees', 'Strings')

with open(test_path + '.tmp', 'w', encoding='utf-8') as f:
    f.write(c)

os.replace(test_path + '.tmp', test_path)
print("Updated test_dsa_phase4.js successfully")
