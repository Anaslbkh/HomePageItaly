export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Parkos',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com/' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bree+Serif&family=Roboto:wght@400;700&display=swap&family=Material+Icons' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/component-cache',
      {
        max: 1000,
        maxAge: 1000 * 60 * 60
      }
    ],
    [
      'nuxt-perfect-cache',
      {
        disable: false,
        appendHost: true,
        ignoreConnectionErrors: false, // it's better to be true in production
        prefix: 'r-',
        url: 'redis://' + (process.env.REDIS_HOST || '127.0.0.1') + ':6379',
        getCacheData(route, context) {
          if (route !== '/nuxt-demo/airport') {
            return false
          }
          return { key: 'airport', expire: 60 } // 1m
        }
      }
    ],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Available options: https://axios.nuxtjs.org/options
  axios: {
    baseURL: 'https://parkos.nl.test/api/v1/',
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    }
  },
}
