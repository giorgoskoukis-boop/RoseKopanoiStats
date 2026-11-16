import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const noopPath = path.resolve(__dirname, "lib/connector-policy-monitor.ts");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@microsoft/managed-apps/telemetry": noopPath,
      "@microsoft/managed-apps": noopPath,
      "aether-sdk": noopPath,
      "@": path.resolve(__dirname, "."),
    },
  },
});
