import { getInstance } from '~/services/apiService';

export default async function({ route, isHMR, params, $paths, error, $i18n }) {
    if (route.name !== 'airport' || isHMR) return true

    const api = getInstance('parkos');
    const languages = await api.getLanguages();
    const currentLanguage = Array.prototype.find.call(languages, (language) => language.domain === $paths.langHost);
    const airports = await api.getAirports(currentLanguage.lang).then( airports => {
        return airports.map( (airport) => airport.slug)
    });

    if (airports.length === 0 || !airports.includes(params.airport)) {
        error({
            statusCode: 404,
            message: 'title',
            description: 'description',
            language: currentLanguage
        })
        return false
    }

    return true
}