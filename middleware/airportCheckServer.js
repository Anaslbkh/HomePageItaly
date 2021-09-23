import { getInstance } from '../services/apiService';

export default async function (req, res, next) {
    const headers = (req && req.headers) ? Object.assign({}, req.headers) : {}
    const xForwardedServer = headers['x-forwarded-server'];
    let host = xForwardedServer ? xForwardedServer : headers.host;

    host = host.replace(/\.?test|staging\.?|www\.?|:[0-9]+/g, '')

    const airport = req.url.replace(/\//g, '');
    const api = getInstance('parkos');
    const languages = await api.getLanguages();
    const currentLanguage = Array.prototype.find.call(languages, (language) => language.domain === host);
    const airports = await api.getAirports(currentLanguage.lang).then( airports => {
        return airports.map( (airport) => airport.slug)
    });

    if (airports.length === 0 || !airports.includes(airport)) {
        res.statusCode = 404;
        res.write('Page not found')
        return res.end()
    }

    next()
}