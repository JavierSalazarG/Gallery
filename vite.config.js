import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      // Exponer las variables de entorno
      "import.meta.env": JSON.stringify(env),
    },
  };
});
