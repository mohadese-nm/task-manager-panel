import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  typescript: {
    strict: true,
    typeCheck: false
  },
  build: {
    transpile: ['vuetify']
  },
  experimental: {
    payloadExtraction: false
  },
  nitro: {
    compressPublicAssets: true,
    compatibilityDate: '2025-09-23'
  },
  modules: [
    '@pinia/nuxt'
  ],
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/styles/main.scss'
  ],
  runtimeConfig: {
    public: {
      appName: 'Panell To'
    }
  },
    vite: {
    ssr: {
      noExternal: ['vuetify']
    },
    vue: {
      template: {
        transformAssetUrls
      }
    },
    plugins: [
      vuetify({
        autoImport: true
      })
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'pinia'],
            vuetify: ['vuetify']
          }
        }
      }
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      title: 'پنل کارها - Panell To',
      meta: [
        { name: 'description', content: 'مدیریت تسک‌ها با Nuxt 3، Vuetify و TypeScript' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#bfa1cf' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap' }
      ]
    }
  }
})


