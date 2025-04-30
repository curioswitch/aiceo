import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), vike({ prerender: true })],
  server: {
    port: process.env.PORT ? Number.parseInt(process.env.PORT) : 8080,
    proxy: {
      "/__/firebase": {
        target: "https://alpha.aiceo.curioswitch.org",
        changeOrigin: true,
      },
      "/frontendapi.FrontendService": {
        target:
          process.env.SERVICE_FRONTEND ??
          "https://alpha.minnano-shacho.curioswitch.org/",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
