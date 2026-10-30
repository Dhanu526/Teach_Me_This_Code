import os
import shutil

target = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\index.html"
tmp = r"C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer\app_build\index_test.tmp"

try:
    with open(target, "r", encoding="utf-8") as f:
        data = f.read()
    print(f"Read target successfully: {len(data)} bytes")
    
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(data)
    print("Wrote tmp successfully")
    
    # Try os.replace
    try:
        os.replace(tmp, target)
        print("os.replace succeeded!")
    except Exception as e:
        print(f"os.replace failed: {e}")
        if os.path.exists(tmp):
            os.remove(tmp)
except Exception as e:
    print(f"Outer error: {e}")
