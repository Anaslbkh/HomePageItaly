import { Plugin } from '@nuxt/types'
import { Paths } from '~/types/Paths'

declare module 'vue/types/vue' {
  interface Vue {
    $paths: Paths
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $paths: Paths,
  }
  interface Context {
    $paths: Paths,
  }
}

const pathsPlugin: Plugin = ({
  req,
  isDev
}, inject) => {
  const headers = (req && req.headers) ? Object.assign({}, req.headers) : {}
  const xForwardedServer = (headers['x-forwarded-server'] as string);
  let host: string | undefined;

  if (isDev) {
    host = (headers.host as string)
  } else {
    host = process.server ? xForwardedServer : window.location.host;
  }

  let langHost: string = host

  if (host?.includes('localhost') || host?.includes('appspot') || typeof host === 'undefined') {
    let params: URLSearchParams|undefined;

    if (process.server) {
      params = new URLSearchParams(req.url?.split('?').pop())
    } else {
      params = new URLSearchParams(window.location.search)
    }
  }

  if (typeof host !== 'undefined' && !host.includes('localhost')) {
    console.log(host)
    langHost = host.replace(/\.?test|staging\.?|www\.?|:[0-9]+/g, '')
  }

  const paths = {
    langHost,
    protocol: 'https',
    host,
    url: (trailingSlash: boolean = true) => {
      return paths.protocol + '://' + paths.host + (trailingSlash ? '/' : '')
    },
    assetsUrl: 'https://assets.parkos.com/assets/'
  }

  inject('paths', paths)
}

export default pathsPlugin
