import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite config for the todo_frontend React app.
 *
 * Note: The orchestrator provisions environment variables in `.env`.
 */
export default defineConfig(() => {
  // Vite uses `VITE_*` by default. We keep the container's existing naming,
  // and only use REACT_APP_PORT to select a port for local dev/preview.
  const port = Number.parseInt(process.env.REACT_APP_PORT || "5173", 10);

  return {
    plugins: [react()],
    server: {
      port,
      strictPort: false,
      host: true
    },
    preview: {
      port,
      host: true
    }
  };
});
