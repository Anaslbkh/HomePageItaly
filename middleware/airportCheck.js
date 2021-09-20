import {getInstance} from '~/services/apiService';

export default function ({route, isHMR, isDev, params, $paths, $sentry, redirect, $isDomain}) {

  return new Promise(async function (resolve, reject) {
    if (route.name !== 'airport' || isHMR || isDev) resolve()

    const api = getInstance('parkos');
    const languages = await api.getLanguages();

    const currentLanguage = Array.prototype.find.call(languages, (language) => language.domain === $paths.langHost);
    const airport = await api.getAirport(params.airport, 'nl');

    if (typeof airport === 'undefined') {
      $sentry.captureException(new Error(`Airport with slug "${params.airport}" in language "${currentLanguage.lang.toUpperCase()}" could not be found`))
      reject()
      return redirect('/noAirport')
    }

    console.log('airportResolved')
    resolve(airport)
  })
}
