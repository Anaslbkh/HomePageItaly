import { Plugin } from '@nuxt/types'
import { Paths } from '~/types/Paths'

declare module 'vue/types/vue' {
  interface Vue {
    $paths: Paths
  }
}

const pathsPlugin: Plugin = ({
  req
}, inject) => {
  const host: string | undefined = process.server ? req.headers.host : window.location.host

  const paths = {
    langHost: 'parkos.it',
    protocol: 'https',
    host: host || 'parkos.it',
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
