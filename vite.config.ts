import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The lazy-loaded Atlas chunk is mostly three.js/r3f and is inherently large
    // (~267 kB gzip); it streams in behind the intro. Raise the warning ceiling.
    chunkSizeWarningLimit: 1100,
  },
});
