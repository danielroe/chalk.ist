import Vue from "@vitejs/plugin-vue";
import path from "path";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },

  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Components({
      resolvers: [IconsResolver()],
    }),

    Icons(),

    Vue(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
      },
      includeAssets: ["og-image.jpg", "robots.txt", "favicon.ico"],
      manifest: {
        name: "Chalk",
        short_name: "Chalk",
        theme_color: "#18181b",
        background_color: "#18181b",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: "async",
    formatting: "minify",
    dirStyle: "nested",
  },

  optimizeDeps: {
    include: [
      "vue",
      "@vueuse/core",
      "@vueuse/head",
      "@vueuse/components",
      "@vueuse/integrations/useFuse",
    ],
    exclude: ["vue-demi"],
  },
}));
