import { defineConfig } from "vite";
export default defineConfig({
  root: "app",
  publicDir: "../public",
  base: "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets/build",
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/build/app-[hash].js",
        chunkFileNames: "assets/build/[name]-[hash].js",
        assetFileNames: "assets/build/[name]-[hash][extname]",
        manualChunks: { three: ["three"] },
      },
    },
  },
});
