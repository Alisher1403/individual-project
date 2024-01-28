import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      backend: "/backend",
      pages: "/src/pages/index.ts",
      store: "/src/store",
      components: "/src/components",
      icons: "/src/assets/icons",
      layouts: "/src/layouts",
      ui: "/src/ui",
      types: "/src/types",
      constant: "/src/constant",
      hooks: "/src/hooks",
    },
  },
});
