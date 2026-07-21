import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    // Compresses images in /public and imported assets at build time
    // (mozjpeg/pngquant/svgo/webp under the hood). Dev server is untouched —
    // this only runs on `vite build`, so it won't slow down `npm run dev`.
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 78 },
      jpg: { quality: 78 },
      webp: { quality: 78 },
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false } },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Vendor code changes far less often than app code (new deploy =
        // new app chunk hash, but React/GSAP/etc. stay the same until a
        // dependency bump) — splitting them out means returning visitors
        // re-download only the small app chunk on a new release instead of
        // the whole ~525 kB entry bundle every time. Grouped by how
        // together and how volatile-vs-stable they are, not one-per-package
        // (that would trade one big request for dozens of tiny ones).
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          // Core runtime — present on every route regardless.
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/react-router/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react'
          }

          // Animation stack — large, and shared by most (not all) pages via
          // StackSection/scroll-reveal, so it's worth its own cacheable
          // chunk rather than being duplicated across page chunks.
          if (
            id.includes('node_modules/framer-motion/') ||
            id.includes('node_modules/gsap/') ||
            id.includes('node_modules/@gsap/') ||
            id.includes('node_modules/lenis/')
          ) {
            return 'vendor-animation'
          }

          // Everything else third-party (axios, react-helmet-async,
          // react-icons, web-vitals, ...) — smaller libraries that don't
          // warrant their own chunk each.
          return 'vendor-misc'
        },
      },
    },
  },
})
