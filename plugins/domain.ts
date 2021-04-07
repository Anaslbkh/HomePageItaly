import { Plugin } from '@nuxt/types'
import { Airport as AirportType } from '~/types/Airport'
import { AirportDetails as AirportDetailsType } from '~/types/AirportDetails'
import { AirportContent as AirportContentType } from '~/types/AirportContent'
import { Language as LanguageType } from '~/types/Language'
import { Paths } from '~/types/Paths'

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
  const languages: Array<LanguageType> = (await $axios.$get('languages')).data
  inject('languages', languages)

  const currentLanguage: LanguageType = Array.prototype.find.call(languages, (language: LanguageType) => language.domain === $paths.langHost)

  inject('currentLanguage', currentLanguage)

  if (!isDev && currentLanguage.gtm_key) {
    $gtm.init(currentLanguage.gtm_key)
  }

  const airportSlug: string = isDev ? params.airport : route.path.split('/').filter(Boolean).pop()!
  if (airportSlug && airportSlug !== 'client') {
    console.log(`Airport: ${airportSlug}`)

    const airports: Array<AirportType> = (await $axios.$get('airports', {
      params: {
        lang: currentLanguage.lang,
        limit: 50,
        orderBy: 'locations_content.maintitle'
      }
    })).data

    inject('airports', airports)

    const currentAirport: AirportType = Array.prototype.find.call(airports, (airport: AirportType) => airport.slug === airportSlug)
    inject('currentAirport', currentAirport)

    const currentAirportDetails: AirportDetailsType = (await $axios.$get(`airports/${currentAirport.id}/details`, {
      params: {
        lang: currentLanguage.lang
      }
    }))
    inject('currentAirportDetails', currentAirportDetails)

    // @ts-ignore @todo fix type or move to components
    const currentAirportContent: AirportContentType = currentAirportDetails.content[currentLanguage.lang]
    inject('currentAirportContent', currentAirportContent)
  }
}

export default domainPlugin;
