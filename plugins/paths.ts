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
  const domain = 'parkos.fr';
  let host: string | undefined = process.server ? req.headers.host : window.location.host
  let langHost: string = domain

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

  const paths = {
    langHost,
    protocol: 'https',
    host: host || domain,
    url: (trailingSlash: boolean = true) => {
      return paths.protocol + '://' + paths.host + (trailingSlash ? '/' : '')
    },
    assetsUrl: 'https://assets.parkos.com/assets/'
  }

  if (!paths.host.includes('localhost')) {
    paths.langHost = paths.host.replace(/\.?test|staging\.?|:[0-9]+/, '')
  }

  inject('paths', paths)
}

export default pathsPlugin
