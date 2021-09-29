require('dotenv').config();

const TerserPlugin = require('terser-webpack-plugin');

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Parkos',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'theme-color', content: '#0983F0'},
      {name: 'msapplication-TileColor', content: '#0983F0'},
      {name: 'msapplication-TileImage', content: 'https://assets.parkos.com/assets/favicon/ms-icon-144x144.png'},
      {name: 'msapplication-TileConfig', content: 'https://assets.parkos.com/assets/favicon/browserconfig.xml'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: 'https://assets.parkos.com/assets/favicon/favicon.ico'},
      {rel: 'apple-touch-icon', href: 'https://assets.parkos.com/assets/favicon/apple-icon.png'},
      {rel: 'apple-touch-icon', sizes: '57x57', href: 'https://assets.parkos.com/assets/favicon/apple-icon-57x57.png'},
      {rel: 'apple-touch-icon', sizes: '60x60', href: 'https://assets.parkos.com/assets/favicon/apple-icon-60x60.png'},
      {rel: 'apple-touch-icon', sizes: '72x72', href: 'https://assets.parkos.com/assets/favicon/apple-icon-72x72.png'},
      {rel: 'apple-touch-icon', sizes: '76x76', href: 'https://assets.parkos.com/assets/favicon/apple-icon-76x76.png'},
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: 'https://assets.parkos.com/assets/favicon/apple-icon-114x144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: 'https://assets.parkos.com/assets/favicon/apple-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: 'https://assets.parkos.com/assets/favicon/apple-icon-144x144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: 'https://assets.parkos.com/assets/favicon/apple-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: 'https://assets.parkos.com/assets/favicon/apple-icon-180x180.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: 'https://assets.parkos.com/assets/favicon/android-icon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: 'https://assets.parkos.com/assets/favicon/android-icon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: 'https://assets.parkos.com/assets/favicon/android-icon-96x96.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: 'https://assets.parkos.com/assets/favicon/android-icon-192x192.png'
      },
      {rel: 'manifest', href: '/manifest.json'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/fonts.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/paths.ts', mode: 'all'}, // mode: process.env.NODE_ENV === 'production' ? 'server' : 'all' }, @TODO review/move function server side
    // @see https://www.npmjs.com/package/vuejs-datepicker v1.6.2
    {src: '@/plugins/vue-datepicker/', mode: 'all'},
    {src: '@/plugins/i18n.ts', mode: 'all'}, // mode: process.env.NODE_ENV === 'production' ? 'server' : 'all' }, @TODO review/move function server side
    '@/plugins/axios',
    // { src: '@/plugins/domain.ts', mode: 'all' }, // mode: process.env.NODE_ENV === 'production' ? 'server' : 'all' }, @TODO review/move function server side
    {src: '@/plugins/zendesk.ts', mode: 'all'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.devtool = 'source-map';
    },
    publicPath: process.env.NODE_ENV !== 'production' ? '/_nuxt/' : '_nuxt_airport_page'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    '@dansmaculotte/nuxt-zendesk',
    '@nuxtjs/proxy'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  extend(config, ctx) {
    if (ctx.isDev) {
      config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
    }
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

  sentry: {
    dsn: process.env.SENTRY_DSN,
    disabled: process.env.NODE_ENV !== 'production'
  },

  server: {
    port: process.env.APP_PORT,
    host: '127.0.0.1',
    timing: false
  },

  zendesk: {
    key: process.env.ZENDESK_KEY,
    disabled: true,
    hideOnLoad: true,
    settings: {
      webWidget: {
        color: {
          theme: '#0a83ef'
        }
      }
    }
  }
}
