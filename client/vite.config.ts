import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "/BighornSheep/",
  resolve: {
    alias: {
      "@api_helper": path.resolve(__dirname, "./src/api/"),

      "@": path.resolve(__dirname, "./src"),
    },
  },
})

