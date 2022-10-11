import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/roulette-strategy/",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: "./build",
  },
});
