import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: /^@microsoft\/.*/, replacement: path.resolve(__dirname, "lib/connector-policy-monitor.ts") },
      { find: "@", replacement: path.resolve(__dirname, ".") },
    ],
  },
});
