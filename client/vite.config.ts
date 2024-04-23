import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "/BighornSheep/",
  resolve: {
    alias: {
      "@api_helper": path.resolve(__dirname, "./src/api/"),
      "@UserAuth": path.resolve(__dirname,"./src/context"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

