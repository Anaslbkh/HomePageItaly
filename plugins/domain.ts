import { Plugin } from '@nuxt/types'
import { Airport as AirportType } from '~/types/Airport';
import { AirportContent as AirportContentType } from '~/types/AirportContent'
import { Language as LanguageType } from '~/types/Language';

declare module 'vue/types/vue' {
  interface Vue {
    $airports: Array<AirportType>,
    $languages: Array<LanguageType>,
    $currentLanguage: LanguageType,
    $currentAirport: AirportType,
    $currentAirportContent: AirportContentType,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $airports: Array<AirportType>,
    $languages: Array<LanguageType>,
    $currentLanguage: LanguageType,
    $currentAirport: AirportType,
    $currentAirportContent: AirportContentType,
  }
  interface Context {
    $airports: Array<AirportType>,
    $languages: Array<LanguageType>,
    $currentLanguage: LanguageType,
    $currentAirport: AirportType,
    $currentAirportContent: AirportContentType,
  }
}

// @ts-ignore
const domainPlugin: Plugin = async ({ $axios, $gtm, isDev, params }, inject) => {
  const languages: Array<LanguageType> = (await $axios.$get('languages')).data;
  inject('languages', languages)

  const hostname: string = 'parkos.it';
  const currentLanguage: LanguageType = Array.prototype.find.call(languages, (language: LanguageType) => language.domain === hostname)
  inject('currentLanguage', currentLanguage)

  if (!isDev && currentLanguage.gtm_key) $gtm.init(currentLanguage.gtm_key);

  if (params.airport) {
    const airports: Array<AirportType> = (await $axios.$get('airports', {
      params: {
        lang: currentLanguage.lang,
        limit: 50
      }
    })).data;
    inject('airports', airports)

    const currentAirport: AirportType = Array.prototype.find.call(airports, (airport: AirportType) => airport.slug === params.airport)
    inject('currentAirport', currentAirport)

    const currentAirportContent: AirportContentType = (await $axios.$get(`airports/${currentAirport.id}/content`, {
      params: {
        lang: currentLanguage.lang
      }
    }))
    inject('currentAirportContent', currentAirportContent)

  }
}

export default domainPlugin;