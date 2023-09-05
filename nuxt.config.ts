// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
