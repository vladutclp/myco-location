import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    command === "serve" &&
      mode !== "test" &&
      checker({ typescript: { buildMode: true } }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    env: { VITE_API_BASE_URL: "http://localhost:8080/api" },
    globals: true,
  },
}));
