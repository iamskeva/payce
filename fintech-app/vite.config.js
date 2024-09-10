import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'


export default defineConfig({
  resolve: {
    alias: {
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
    },
  },
  plugins: [react(), {
    name: 'replace-crypto',
    configureServer: ({ middlewares }) => {
      middlewares.use((req, res, next) => {
        if (req.path === '/node:crypto') {
          req.url = req.url.replace('/node:crypto', '')
        }
        next()
      })
    }
  }, nodePolyfills({
    // Whether to polyfill `node:` protocol imports.
    protocolImports: true,
  })],
  define: {
    global: "globalThis",
  }
})