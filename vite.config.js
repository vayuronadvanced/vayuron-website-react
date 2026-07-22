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
  // NOTE: a manual vendor-chunk split (react/router/framer-motion/gsap/lenis
  // grouped apart from app code) was tried here for long-term browser
  // caching, but it broke the production bundle at *runtime*: Chrome threw
  // `Cannot access 'X' before initialization` the instant the app tried to
  // mount, on every single route, with the page staying permanently blank
  // (confirmed by prerendering directly with Puppeteer — a plain
  // `vite build` never catches this, since building doesn't execute the
  // bundle). This is a live-binding initialization-order bug: something in
  // this dependency graph has a circular import, and Rollup can only
  // guarantee correct init order for a circular cycle when every module in
  // it stays in the same chunk. Tracing the exact pair of modules involved
  // wasn't worth the risk of leaving a subtler variant of the same crash in
  // production — Vite's default chunking (this file's current, unconfigured
  // state) reliably produces a working bundle, confirmed by prerendering
  // every route successfully. If chunk-splitting is revisited, verify with
  // `npm run build && npm run postbuild` (which actually loads and renders
  // every route) — a successful `vite build` alone does NOT prove the
  // output runs correctly.
})
