import { Plugin } from '@nuxt/types'
import { Airport as AirportType } from '~/types/Airport';
import { AirportDetails as AirportDetailsType } from '~/types/AirportDetails'
import { AirportContent as AirportContentType } from '~/types/AirportContent'
import { Language as LanguageType } from '~/types/Language';

declare module 'vue/types/vue' {
  interface Vue {
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
    $airports: Array<AirportType>,
    $languages: Array<LanguageType>,
    $currentLanguage: LanguageType,
    $currentAirport: AirportType,
    $currentAirportDetails: AirportDetailsType,
    $currentAirportContent: AirportContentType,
  }
}

// @ts-ignore
const domainPlugin: Plugin = async ({ $axios, $gtm, isDev, params, req, route }, inject) => {
  const languages: Array<LanguageType> = (await $axios.$get('languages')).data
  inject('languages', languages)

  let hostname = 'parkos.it'
  console.log('Hostname', req?.headers?.host)

  if (req?.headers?.host?.includes('localhost') === false) {
    hostname = req.headers.host.replace(/\.?test|staging\.?|:[0-9]+/, '')
  }

  console.log('Result hostname', hostname)

  const currentLanguage: LanguageType = Array.prototype.find.call(languages, (language: LanguageType) => language.domain === hostname)
  console.log(currentLanguage)

  inject('currentLanguage', currentLanguage)

  if (!isDev && currentLanguage.gtm_key) $gtm.init(currentLanguage.gtm_key);

  let airportSlug: string;
  if (isDev) {
    airportSlug = params.airport;
  } else {
    airportSlug = route.path.split('/').filter(Boolean).pop()!;
  }

  if (airportSlug && airportSlug !== 'client') {
    console.log(`Airport: ${airportSlug}`);

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
