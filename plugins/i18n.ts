import { Plugin } from '@nuxt/types'
import { Language as LanguageType } from '~/types/Language'

declare module 'vue/types/vue' {
  interface Vue {
    $i18n: string,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $i18n: string,
  }
  interface Context {
    $i18n: string,
  }
}

const i18nPlugin: Plugin = async({ $axios, app, $paths, ssrContext }, inject) => {
  const languages: Array<LanguageType> = (await $axios.$get('languages')).data

  const currentLanguage: LanguageType = Array.prototype.find.call(languages, (language: LanguageType) => language.domain === $paths.langHost)
  const translations: object = await $axios.$get(`translations/${currentLanguage.lang}/airport`)

  type ReplacerObject = {
    [key: string]: string;
  }

  const i18n: Function = (key: string, replace: ReplacerObject = {}): string => {
    let translation = key.split('.').reduce((t: any, i: any) => t[i] || null, translations)

    for (const placeholder of Object.keys(replace)) {
      translation = translation.replace(`:${placeholder}`, replace[placeholder])
    }

    return translation
  }

  app.i18n = i18n
  inject('i18n', i18n)
}

export default i18nPlugin
