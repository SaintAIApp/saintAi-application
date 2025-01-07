import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: "Play Flappy Bird"
        }
      },
      pages: [
        {
          entry: "src/main.tsx",
          template: "index.html",
          filename: "index.html"
        },
        {
          entry: "src/components/Game/Flappy/Flappy.tsx",
          template: "src/components/Game/Flappy/flappy.html",
          filename: "flappy.html"
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        game: path.resolve(__dirname, "src/components/Game/Flappy/flappy.html")
      },
      output: {
        entryFileNames: "[name].bundle.js",
        chunkFileNames: "[name].bundle.js",
        assetFileNames: "[name].[ext]"
      }
    }
  }
});
