import axios from 'axios';

class ApiService {
    constructor(baseURL = process.env.API_BASE_URL) {
        this.languages = null
        this.translations = null
        this.airports = null
        this.airportData = {}
        this.airportReviews = {}
        this.airportFaq = {}
        this.parkings = {}
        this.axiosInstance = axios.create({
            baseURL
        });
    }

    getLanguages = async function() {
        let self = this;

        if (self.languages === null) {
            return new Promise( function(resolve, reject) {
                self.axiosInstance.get('languages').then( function(response) {
                    self.languages = response.data.data;
                    resolve(self.languages)
                })
            })
        }
    
        return new Promise( function(resolve, reject) {
            resolve(self.languages);
        });
    }

    getTranslations = async function(languageId) {
        let self = this;
        if (self.translations === null) {
            console.log('a', 'translations')
            return new Promise( function(resolve, reject) {

                self.axiosInstance.get(`translations/${languageId}/airport`)
                .then( function({ data }) {
                    self.translations = data;
                    resolve(self.translations);
                });
            })
        }

        console.log('b', 'translations (already set)');
        return new Promise( function(resolve, reject) {
            resolve(self.translations);
        })
    }

    getAirports = async function(lang, limit = 50, orderBy = 'locations_content.maintitle') {
        let self = this;

        if (self.airports === null) {
            console.log('a', 'airports');

            return new Promise( function(resolve, reject) {
                self.axiosInstance.get('airports', {
                    params: {
                        lang,
                        limit,
                        orderBy,
                    }
                }).then( function(response) {
                    self.airports = response.data.data;
                    resolve(self.airports);
                });
            })
        }

        console.log('b', 'airports (already set)');
        return new Promise( function(resolve, reject) {
            resolve(self.airports);
        })
    }

    getAirport = async function(slug) {
        return Array.prototype.find.call(await this.getAirports(), (airport) => airport.slug === slug);
    }

    getAirportData = async function(slug) {
        let self = this;
        if ( !(slug in self.airportData) ) {
            console.log('a', 'airport data');
            const airport = await self.getAirport(slug);

            return new Promise( function(resolve, reject) {
                self.axiosInstance.get(`airports/${airport.id}/details`)
                .then( function(response) {
                    self.airportData[slug] = {
                        airport,
                        content: response.data.content
                    }

                    resolve(self.airportData[slug])
                })
            })
        }
        console.log('b', 'airport data (already set)')
        return new Promise( function(resolve, reject) {
            resolve(self.airportData[slug])
        })
    }

    getAirportReviews = async function(slug, lang, limit = 4) {
        let self = this;

        if ( !(slug in self.airportReviews) ) {
            console.log('a', 'airport reviews');
            const airport = await self.getAirport(slug);

            return new Promise( function(resolve, reject) {
                self.axiosInstance.get('reviews', {
                    params: {
                        airport: airport.id,
                        lang,
                        limit,
                    }
                }).then( function(response) {
                    self.airportReviews[slug] = response.data;
                    resolve(self.airportReviews[slug])
                })
            })
        }

        console.log('b', 'airport reviews (already set)')
        return new Promise( function(resolve, reject) {
            resolve(self.airportReviews[slug]);
        })
    }

    getAirportFaq = async function(slug, lang) {
        let self = this;

        if ( !(slug in self.airportFaq) ) {
            console.log('a', 'airport faq');
            const airport = await self.getAirport(slug);

            return new Promise( function(resolve, reject) {
                self.axiosInstance.get(`airports/${airport.id}/faq`, {
                    params: {
                        lang,
                    }
                }).then( function(response) {
                    self.airportFaq[slug] = response.data;
                    resolve(self.airportFaq[slug])
                })
            })
        }

        console.log('b', 'airport faq (already set)')
        return new Promise( function(resolve, reject) {
            resolve(self.airportFaq[slug]);
        })
    }

    getAirportParkings = async function(slug, lang) {
        let self = this;

        if ( !(slug in self.parkings) ) {
            console.log('a', 'airport parkings');
            const airport = await self.getAirport(slug);

            return new Promise( function(resolve, reject) {
                self.axiosInstance.get('parkings', {
                    params: {
                        lang,
                        airport: airport.id
                    }
                }).then( function(response) {
                    self.parkings[slug] = response.data;
                    resolve(self.parkings[slug])
                })
            })
        }

        console.log('b', 'airport parkings (already set)')
        return new Promise( function(resolve, reject) {
            resolve(self.parkings[slug]);
        })
    }
}

export default ApiService;