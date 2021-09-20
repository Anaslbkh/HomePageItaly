import { getInstance } from '~/services/apiService';

export default async function({ route, isHMR, params, $paths, error, $i18n }) {
    if (route.name !== 'airport' || isHMR) return true

    const api = getInstance('parkos');
    const languages = await api.getLanguages();
    const currentLanguage = Array.prototype.find.call(languages, (language) => language.domain === $paths.langHost);
    const airport = await api.getAirport(params.airport, currentLanguage.lang);

    if (typeof airport === 'undefined') {
        error({
            statusCode: 404,
            message: 'title',
            description: 'description',
            language: currentLanguage
        })
    }

    return true
}