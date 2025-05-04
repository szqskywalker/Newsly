import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"
  },
  server: {
    proxy: {
      '/v2': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        secure: true,
      },
    allowedHosts: [
      "newsly-backend-2l4l.onrender.com"
    ],
    cors: true, // Ensure CORS is enabled
  },}
});
