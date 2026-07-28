import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, res) => {
            console.warn("Vite proxy notice (Express backend port 5001 offline):", err.message);
            if (res && !res.headersSent) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ offline: true, message: "Backend offline, client using static fallbacks" }));
            }
          });
        },
      },
    },
  },
});
