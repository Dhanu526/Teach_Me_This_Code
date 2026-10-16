# Code Flow Visualizer — Thonny-Style Visual Execution & Memory Model (Zero AI APIs)

An offline, deterministic Python code visualizer and step-by-step teacher modeled after **Thonny IDE**.

## Workspace Architecture (`app_build/`)

All application source code is cleanly isolated inside [`app_build/`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build):

* [`app_build/index.html`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build/index.html) — Three-panel Thonny-style learning workspace.
* [`app_build/styles.css`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build/styles.css) — Clean styling for Stack/Heap memory cards, scope isolation badges, and sub-expression stepper.
* [`app_build/engine.js`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build/engine.js) — Client-side Python execution engine with `MemoryHeapTracker` (`Name → @Addr → Value`), Visual Garbage Collection (`refCount`), Scope Isolation (`Global` vs. `Local`), and Short-Circuit Sub-Expression Stepper (`and` / `or`).
* [`app_build/explainer.js`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build/explainer.js) — Rule-based plain-English teacher.
* [`app_build/app.js`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build/app.js) — Interactive UI controller (`← Previous`, `🔍 Sub-Expr (F7)`, `Next Step →`, `Show GC'd`).
* [`app_build/engine.py`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build/engine.py) & [`app_build/explainer.py`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/app_build/explainer.py) — Real Python `sys.settrace` + `ast` backend engine.
* [`server.py`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/server.py) — Local HTTP server serving `app_build/` and `/api/trace`.
* [`test_engine.py`](file:///C:/Users/CVT/.gemini/antigravity/scratch/code-flow-visualizer/test_engine.py) — Automated unit test suite (15 tests).

## How to Run

```powershell
cd C:\Users\CVT\.gemini\antigravity\scratch\code-flow-visualizer
python -m unittest test_engine.py -v
python server.py
```
Then open `http://127.0.0.1:8000`.
