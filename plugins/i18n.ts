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

const i18nPlugin: Plugin = async ({$axios}, inject) => {
  const languages: Array<LanguageType> = (await $axios.$get('languages')).data;
  const hostname: string = 'parkos.it';

  const currentLanguage: LanguageType = Array.prototype.find.call(languages, (language: LanguageType) => language.domain === hostname)
  const translations: object = await $axios.$get(`translations/${currentLanguage.lang}/airport`);

  type ReplacerObject = {
    [key: string]: string;
  }

  inject('i18n', (key: string, replace: ReplacerObject = {}): string => {
    let translation = key.split('.').reduce( (t: any, i: any) => t[i] || null, translations)

    for (var placeholder of Object.keys(replace)) {
        translation = translation.replace(`:${placeholder}`, replace[placeholder]);
    }

    return translation;
  })
}

export default i18nPlugin;