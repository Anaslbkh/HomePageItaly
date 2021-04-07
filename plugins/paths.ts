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
  const paths = {
    langHost: 'parkos.it',
    protocol: 'https',
    host: req?.headers?.host || 'parkos.it',
    url: (trailingSlash = true) => {
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
