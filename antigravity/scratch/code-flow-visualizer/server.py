"""
server.py — Local HTTP Server & Execution API for Code Flow Visualizer
Serves static frontend assets from `app_build/` and exposes `/api/validate` & `/api/trace`.
Zero external dependencies or AI APIs required.
Run: python server.py
Open: http://127.0.0.1:8080
"""

import json
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
from app_build.engine import trace_python_program, validate_python_support
from app_build.explainer import generate_step_explanation

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_BUILD_DIR = os.path.join(BASE_DIR, "app_build")


class VisualizerRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP_BUILD_DIR, **kwargs)

    def _send_json(self, status_code: int, data: dict):
        payload = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        if self.path == "/favicon.ico":
            self.send_response(204)
            self.end_headers()
            return
        if self.path.startswith("/app_build/"):
            self.path = self.path[len("/app_build") :]
        super().do_GET()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        body = json.loads(raw_body)

        if self.path == "/api/validate":
            code = body.get("code", "")
            ok, msg, ln = validate_python_support(code)
            self._send_json(200, {"ok": ok, "errorMessage": msg, "errorLine": ln})
            return

        if self.path == "/api/trace":
            code = body.get("code", "")
            custom_input = body.get("input", "")
            result = trace_python_program(code, custom_input)
            steps = result.get("steps", [])
            for idx, st in enumerate(steps):
                prev_st = steps[idx - 1] if idx > 0 else None
                st["explanations"] = generate_step_explanation(st, prev_st)
            self._send_json(200, result)
            return

        self._send_json(404, {"error": "Endpoint not found"})


if __name__ == "__main__":
    print(f"Code Flow Visualizer (app_build/) running locally at http://127.0.0.1:{PORT}")
    HTTPServer(("127.0.0.1", PORT), VisualizerRequestHandler).serve_forever()
