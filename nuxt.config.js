require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Parkos',
    htmlAttrs: {
      lang: 'it'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#0983F0' },
      { 'http-equiv': 'content-language', content: 'it' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com/' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bree+Serif&family=Roboto:wght@400;700&display=swap&family=Material+Icons' },
      { rel: 'manifest', href: '/manifest.json'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/domain.ts',
    '@/plugins/i18n.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@nuxtjs/gtm',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // [
    //   '@nuxtjs/component-cache',
    //   {
    //     max: 1000,
    //     maxAge: 1000 * 60 * 60
    //   }
    // ],
    '@nuxtjs/axios',

    '@nuxtjs/gtm',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Available options: https://axios.nuxtjs.org/options
  axios: {
    baseURL: process.env.API_BASE_URL
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_BASE_URL
    }
  },
  server: {
    port: 3000,
    host: '127.0.0.1',
    timing: false
  }
}
