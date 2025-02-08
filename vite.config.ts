import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `//just variables loaded globally
        // @use '@/assets/styles/scss/variables' as *;
        @use "@/assets/styles/scss/main.scss" as *;
        // @import "@/assets/styles/scss/main.scss";
        `,
        silenceDeprecations: [
          'mixed-decls',
          'color-functions',
          'global-builtin',
          'import',
          'abs-percent',
        ],
      },
    },
  },
})
