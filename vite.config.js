import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from /<repo>/, so the build needs a base path.
// The Pages workflow sets VITE_BASE_PATH; Vercel and local dev leave it unset
// and get '/' so the same source deploys to either host unchanged.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    // The animation stack and the carousel library are big and change far less
    // often than the site's own code, so they get their own long-lived chunks
    // instead of invalidating the whole bundle on every content tweak.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion', 'gsap', 'lenis'],
          swiper: ['swiper', 'swiper/react'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
