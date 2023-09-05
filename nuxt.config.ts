import { locales } from './i18n/constants.js'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@sungodltd/vision/nuxt-3/module',
  ],

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en-gb',
    lazy: true,
    langDir: 'i18n/lang',
    locales,
    vueI18n: "./i18n.config.js"
  },

  imports: {
    dirs: ['stores'],
    transform: {
      exclude: [/@sungodltd\/vision/],
    },
  },

  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  components: [{ path: '~/components', pathPrefix: false }],

  experimental: {
    inlineSSRStyles: true
  },

  css: ['@/assets/css/global.css'],

  vite: {
    build: {
      sourcemap: true
    },
    server: {
      fs: {
        strict: false // avoids error when using yarn link locally
      }
    }
  },

  runtimeConfig: {
    public: {
      datoEndpoint: '',
      datoApiToken: '',
      datoEnvironment: '',
    },
  },

  app: {
    head: {
      title: 'SunGod',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#00669F' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Shop Performance Eyewear for Bike, Run, Snow + Everyday. Featuring 8KO® lens technology & an unrivalled Lifetime Guarantee. B Corp Certified. Order online now.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'SunGod Performance Sunglasses & Snow Goggles',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://static-bypass.sungod.co/images/banners/020bf7e-crowdfunding-web-banners-steph.jpg',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'fb:app_id',
          property: 'fb:app_id',
          content: '1209256785767721',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          src: 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=JYQBXr',
          async: true,
        },
        {
          hid: 'Rudder-JS',
          src: 'https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js',
          defer: true,
        },
      ],
    },
  },
})
