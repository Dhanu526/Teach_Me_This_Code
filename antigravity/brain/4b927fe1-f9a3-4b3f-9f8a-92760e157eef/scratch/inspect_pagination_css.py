with open('app_build/styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'pagination-bar' in line:
        print(''.join(lines[max(0, i-5):min(len(lines), i+40)]))
        break
