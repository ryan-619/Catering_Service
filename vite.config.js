import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from /<repo>/, so the build needs a base path.
// The Pages workflow sets VITE_BASE_PATH; Vercel and local dev leave it unset
// and get '/' so the same source deploys to either host unchanged.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
})
