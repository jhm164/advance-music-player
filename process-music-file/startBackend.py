import http.server
import socketserver

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')  # Allow all origins
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  # Allow GET, POST, OPTIONS methods
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')  # Allow custom headers
        super().end_headers()

PORT = 8000

Handler = CORSHTTPRequestHandler

# Create and run the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()
