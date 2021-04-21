import { getInstance } from '~/services/apiService';

export default function ({route, isHMR, params, $paths, error, $sentry}) {
    return new Promise( async function(resolve, reject) {
        if (route.name !== 'airport' || isHMR) resolve()

        const api = getInstance('parkos', {
            baseURL: 'https://parkos.com/api/v1/',
        });
        const languages = await api.getLanguages();
        const currentLanguage = Array.prototype.find.call(languages, (language) => language.domain === $paths.langHost);
        const airport = await api.getAirport(params.airport, currentLanguage.lang);
        
        if (typeof airport === 'undefined') {
            $sentry.captureException(new Error(`Airport with slug "${params.airport}" in language "${currentLanguage.lang.toUpperCase()}" could not be found`))
            error({
                statusCode: 404,
                message: 'Non abbiamo trovato la pagina che cercavi',
                description: 'Purtroppo la pagina che stai cercando non è disponibile, siamo spiacenti. Dal menu sottostante puoi consultare le nostre destinazioni.',
                language: currentLanguage
            })
        }

        resolve(airport)
    })
}
  