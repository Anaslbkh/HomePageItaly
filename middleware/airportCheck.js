import { getInstance } from '~/services/apiService';

export default function({ req, route, isHMR, isDev, params, $paths, error, $sentry }) {
    return new Promise(async function(resolve, reject) {
        console.log(route.name !== 'airport', isHMR, isDev)
        if (route.name !== 'airport' || isHMR || isDev) resolve()

        console.log(req.headers);
        const api = getInstance('parkos');
        const languages = await api.getLanguages();
        console.log($paths.langHost);
        const currentLanguage = Array.prototype.find.call(languages, (language) => language.domain === $paths.langHost);
        console.log(currentLanguage.domain);
        const airport = await api.getAirport(params.airport, currentLanguage.lang);
        console.log(airport);

        if (typeof airport === 'undefined') {
            $sentry.captureException(new Error(`Airport with slug "${params.airport}" in language "${currentLanguage.lang.toUpperCase()}" could not be found`))
            error({
                statusCode: 404,
                message: 'Non abbiamo trovato la pagina che cercavi',
                description: 'Purtroppo la pagina che stai cercando non è disponibile, siamo spiacenti. Dal menu sottostante puoi consultare le nostre destinazioni.',
                language: currentLanguage
            })
            reject()
        }

        resolve(airport)
    })
}