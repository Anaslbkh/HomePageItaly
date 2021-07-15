import { Plugin } from '@nuxt/types'
import { Airport as AirportType } from '~/types/Airport'
import { AirportDetails as AirportDetailsType } from '~/types/AirportDetails'
import { AirportContent as AirportContentType } from '~/types/AirportContent'
import { Language as LanguageType } from '~/types/Language'
import { Paths } from '~/types/Paths'
import { getInstance } from '~/services/apiService'

declare module 'vue/types/vue' {
  interface Vue {
    $paths: Paths
    $airports: Array<AirportType>,
    $languages: Array<LanguageType>,
    $currentLanguage: LanguageType,
    $currentAirport: AirportType,
    $currentAirportDetails: AirportDetailsType,
    $currentAirportContent: AirportContentType,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $airports: Array<AirportType>,
    $languages: Array<LanguageType>,
    $currentLanguage: LanguageType,
    $currentAirport: AirportType,
    $currentAirportDetails: AirportDetailsType,
    $currentAirportContent: AirportContentType,
  }

  interface Context {
    $paths: Paths,
    $airports: Array<AirportType>,
    $languages: Array<LanguageType>,
    $currentLanguage: LanguageType,
    $currentAirport: AirportType,
    $currentAirportDetails: AirportDetailsType,
    $currentAirportContent: AirportContentType,
  }
}

const domainPlugin: Plugin = async({
  $axios,
  // @ts-ignore
  $gtm,
  $paths,
  isDev,
  params,
  route
}, inject) => {
  const api = getInstance('parkos', {
    baseURL: 'https://parkos.com/api/v1/',
  });
  const languages: Array<LanguageType> = await api.getLanguages()
  inject('languages', languages)

  const currentLanguage: LanguageType = Array.prototype.find.call(languages, (language: LanguageType) => language.domain === $paths.langHost)

  inject('currentLanguage', currentLanguage)

  if (!isDev && currentLanguage.gtm_key) {
    $gtm.init(currentLanguage.gtm_key)
  }

  const airportSlug: string = isDev ? params.airport : route.path.split('/').filter(Boolean).pop()!
  if (airportSlug && airportSlug !== 'client') {
    const airports: Array<AirportType> = await api.getAirports(currentLanguage.lang)

    inject('airports', airports)

    const currentAirport: AirportType = Array.prototype.find.call(airports, (airport: AirportType) => airport.slug === airportSlug)
    inject('currentAirport', currentAirport)

    const currentAirportDetails: AirportDetailsType = await api.getAirportData(airportSlug, currentLanguage.lang)

    // @ts-ignore @todo fix type or move to components
    const currentAirportContent: AirportContentType = currentAirportDetails.content[currentLanguage.lang]
    inject('currentAirportContent', currentAirportContent)
  }
}

export default domainPlugin;
