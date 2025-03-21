import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "07fe-2600-4041-44a7-d900-dcbd-f2a8-d5a9-ff44.ngrok-free.app",
      "45e3-2600-4041-44a7-d900-dcbd-f2a8-d5a9-ff44.ngrok-free.app", // Add your host here
    ],
    cors: true, // Ensure CORS is enabled
  },
});
