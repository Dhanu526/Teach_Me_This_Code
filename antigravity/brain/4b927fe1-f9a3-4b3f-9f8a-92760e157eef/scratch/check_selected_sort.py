import os

test_files = [
    r'C:\Users\CVT\.gemini\antigravity\brain\4b927fe1-f9a3-4b3f-9f8a-92760e157eef\scratch\test_dsa_phase1.js',
    r'C:\Users\CVT\.gemini\antigravity\brain\4b927fe1-f9a3-4b3f-9f8a-92760e157eef\scratch\test_dsa_phase2.js',
    r'C:\Users\CVT\.gemini\antigravity\brain\4b927fe1-f9a3-4b3f-9f8a-92760e157eef\scratch\test_dsa_phase3.js'
]

for tf in test_files:
    if os.path.exists(tf):
        with open(tf, 'r', encoding='utf-8') as f:
            content = f.read()
            if 'selectedSort' in content:
                print(f'{tf}: FOUND selectedSort')
            else:
                print(f'{tf}: not found')
