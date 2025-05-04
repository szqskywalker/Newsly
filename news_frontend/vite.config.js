import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v2': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        secure: true,
      },
    allowedHosts: [
      "419a-155-246-151-34.ngrok-free.app",
      "d8e3-155-246-151-34.ngrok-free.app", // Add your host here
      "1f3e-2600-4041-44a7-d900-fc37-bec4-112e-12c1.ngrok-free.app",
      "c9d5-2600-4041-44a7-d900-fc37-bec4-112e-12c1.ngrok-free.app",
      "2c13-2600-4041-44a7-d900-789f-bdae-f2bd-d51a.ngrok-free.app",
      "a227-2600-4041-44a7-d900-789f-bdae-f2bd-d51a.ngrok-free.app",
    ],
    cors: true, // Ensure CORS is enabled
  },}
});
