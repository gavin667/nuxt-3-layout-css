export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
  ],

  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },

  imports: {
    dirs: ['stores'],
  },

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  experimental: {
    inlineSSRStyles: true
  },

  css: ['@/assets/css/global.css'],
})
