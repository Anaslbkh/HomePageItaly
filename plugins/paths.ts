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
  const domain = 'parkos.co.uk';
  const headers = (req && req.headers) ? Object.assign({}, req.headers) : {}
  const xForwardedServer = (headers['x-forwarded-server'] as string);
  let host: string | undefined = process.server ? xForwardedServer : window.location.host

  if (isDev || typeof host === 'undefined') host = domain
  let langHost: string = host

  if (host?.includes('localhost') || host?.includes('appspot')) {
    let params: URLSearchParams|undefined;

    if (process.server) {
      params = new URLSearchParams(req.url?.split('?').pop())
    } else {
      params = new URLSearchParams(window.location.search)
    }

    if (params.has('domain')) {
      langHost = params.get('domain')!;
    }
  }

  if (!host.includes('localhost')) {
    langHost = host.replace(/\.?test|staging\.?|:[0-9]+/, '')
  }

  if (langHost.includes('localhost')) {
    langHost = domain;
  }

  const paths = {
    langHost: 'parkos.it',
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
