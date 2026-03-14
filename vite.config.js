import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/nj-ysf.github.io/",   // doit correspondre au nom du repo GitHub
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});