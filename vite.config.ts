import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  base: '/',
  build: {
    target: 'es2022',
    modulePreload: false
  },
  plugins: [solid()],
})
