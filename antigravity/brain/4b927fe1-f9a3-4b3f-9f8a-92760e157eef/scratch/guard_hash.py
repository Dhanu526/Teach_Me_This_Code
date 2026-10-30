import os

with open('app_build/dsa_dashboard.js', 'r', encoding='utf-8') as f:
    c = f.read()

target = "          const hash = window.location.hash || '';"
replacement = "          const hash = (window.location && window.location.hash) ? window.location.hash : '';"

assert target in c, "target not found"
c = c.replace(target, replacement, 1)

with open('app_build/dsa_dashboard.js.tmp', 'w', encoding='utf-8') as f:
    f.write(c)

os.replace('app_build/dsa_dashboard.js.tmp', 'app_build/dsa_dashboard.js')
print("Safely guarded window.location.hash in dsa_dashboard.js")
