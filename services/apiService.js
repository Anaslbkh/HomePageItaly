import axios from 'axios'

class ApiService {
    constructor(config) {
        this.languages = null
        this.translations = {}
        this.airports = {}
        this.airportData = {}
        this.airportReviews = {}
        this.airportFaq = {}
        this.parkings = {}
        this.pageTemplates = {}
        this.axiosInstance = axios.create({
            baseURL: config?.baseURL ?? process.env.API_BASE_URL
        })
        this.refreshes = {
            languages: false,
            translations: false,
            airports: false,
            airportData: false,
            airportFaq: false,
            airportReviews: false,
            airportParkings: false,
            pageTemplates: false,
        }
    }

    refresh = function() {
        this.refreshes.languages = true
        this.refreshes.translations = true
        this.refreshes.airports = true
        this.refreshes.airportData = true
        this.refreshes.airportFaq = true
        this.refreshes.airportReviews = true
        this.refreshes.airportParkings = true
        this.refreshes.pageTemplates = true
    }

    getLanguages = async function(limit = 25) {
        const self = this

        if (self.languages === null || self.refreshes.languages === true) {
            self.refreshes.languages = false

            const fetch = new Promise(function(resolve, reject) {
                self.axiosInstance.get('languages', {
                    params: {
                        limit,
                    }
                }).then(function(response) {
                    self.languages = response.data.data
                    resolve(self.languages)
                }).catch((e) => {
                    if (self.languages !== null) {
                        resolve(self.languages)
                    } else {
                        reject(e)
                    }
                })
            })

            if (self.languages === null) {
                return fetch
            }
        }

        return new Promise(function(resolve) {
            resolve(self.languages)
        })
    }

    getTranslations = async function(language) {
        const self = this

        if (!(language in self.translations) || self.refreshes.translations === true) {
            self.refreshes.translations = false

            const fetch = new Promise(function(resolve, reject) {
                self.axiosInstance.get(`translations/${language}/airport`)
                    .then(function({ data }) {
                        self.translations[language] = data
                        resolve(self.translations[language])
                    }).catch((e) => {
                        if (language in self.translations) {
                            resolve(self.translations[language])
                        } else {
                            reject(e)
                        }
                    })
            })

            if (!(language in self.translations)) {
                return fetch
            }
        }

        return new Promise(function(resolve) {
            resolve(self.translations[language])
        })
    }

    getAirports = async function(lang, limit = 250, orderBy = 'locations_content.maintitle') {
        const self = this

        if (!(lang in self.airports) || self.refreshes.airports === true) {
            self.refreshes.airports = false

            const fetch = new Promise(function(resolve, reject) {
                self.axiosInstance.get('airports', {
                    params: {
                        lang,
                        limit,
                        orderBy
                    }
                }).then(function(response) {
                    self.airports[lang] = response.data.data
                    resolve(self.airports[lang])
                }).catch(function(e) {
                    if (lang in self.airports) {
                        resolve(self.airports[lang])
                    } else {
                        reject(e)
                    }
                })
            })

            if (!(lang in self.airports)) {
                return fetch
            }
        }

        return new Promise(function(resolve) {
            resolve(self.airports[lang])
        })
    }

    getAirport = async function(slug, lang) {
        const airports = await this.getAirports(lang);
        return Array.prototype.find.call(airports, airport => airport.slug === slug)
    }

    getAirportData = async function(slug, lang) {
        const self = this

        if (!(lang in self.airportData)) {
            self.airportData[lang] = {}
        }

        if (!(slug in self.airportData) || self.refreshes.airportData === true) {
            self.refreshes.airportData = false

            const airport = await self.getAirport(slug, lang)

            const fetch = new Promise(function(resolve, reject) {
                self.axiosInstance.get(`airports/${airport.id}/details`)
                    .then(function(response) {
                        self.airportData[lang][slug] = {
                            airport,
                            content: response.data.content
                        }

                        resolve(self.airportData[lang][slug])
                    }).catch((e) => {
                        reject(e)
                        if (slug in self.airportData) {
                            resolve(self.airportData[lang][slug])
                        } else {
                            reject(e)
                        }
                    })
            })

            if (!(slug in self.airportData)) {
                return fetch
            }
        }

        return new Promise(function(resolve) {
            resolve(self.airportData[lang][slug])
        })
    }

    getAirportReviews = async function(slug, lang, limit = 4) {
        const self = this

        if (!(lang in self.airportReviews)) {
            self.airportReviews[lang] = {}
        }

        if (!(slug in self.airportReviews) || self.refreshes.airportReviews === true) {
            self.refreshes.airportReviews = false
            const airport = await self.getAirport(slug, lang)

            const fetch = new Promise(function(resolve, reject) {
                self.axiosInstance.get('reviews', {
                    params: {
                        airport: airport.id,
                        lang,
                        limit
                    }
                }).then(function(response) {
                    self.airportReviews[lang][slug] = response.data
                    resolve(self.airportReviews[lang][slug])
                }).catch((e) => {
                    if (slug in self.airportReviews) {
                        resolve(self.airportReviews[lang][slug])
                    } else {
                        reject(e)
                    }
                })
            })

            if (!(slug in self.airportReviews)) {
                return fetch
            }
        }

        return new Promise(function(resolve) {
            resolve(self.airportReviews[lang][slug])
        })
    }

    getAirportFaq = async function(slug, lang) {
        const self = this

        if (!(lang in self.airportFaq)) {
            self.airportFaq[lang] = {}
        }

        if (!(slug in self.airportFaq) || self.refreshes.airportFaq === true) {
            self.refreshes.airportFaq = false
            const airport = await self.getAirport(slug, lang)

            const fetch = new Promise(function(resolve, reject) {
                self.axiosInstance.get(`airports/${airport.id}/faq`, {
                    params: {
                        lang
                    }
                }).then(function(response) {
                    self.airportFaq[lang][slug] = response.data
                    resolve(self.airportFaq[lang][slug])
                }).catch((e) => {
                    if (slug in self.airportFaq) {
                        resolve(self.airportFaq[lang][slug])
                    } else {
                        reject(e)
                    }
                })
            })

            if (!(slug in self.airportFaq)) {
                return fetch
            }
        }

        return new Promise(function(resolve) {
            resolve(self.airportFaq[lang][slug])
        })
    }

    getAirportParkings = async function(slug, lang) {
        const self = this

        if (!(lang in self.parkings)) {
            self.parkings[lang] = {}
        }

        if (!(slug in self.parkings) || self.refreshes.airportParkings === true) {
            self.refreshes.airportParkings = false
            const airport = await self.getAirport(slug, lang)

            const fetch = new Promise(function(resolve, reject) {
                self.axiosInstance.get('parkings', {
                    params: {
                        lang,
                        airport: airport.id
                    }
                }).then(function(response) {
                    self.parkings[lang][slug] = response.data.data
                    resolve(self.parkings[lang][slug])
                }).catch((e) => {
                    if (slug in self.parkings) {
                        resolve(self.parkings[lang][slug])
                    } else {
                        reject(e)
                    }
                })
            })

            if (!(slug in self.parkings)) {
                return fetch
            }
        }

        return new Promise(function(resolve) {
            resolve(self.parkings[lang][slug])
        })
    }

    getPageTemplate = async function(slug, lang) {
        const self = this;

        if (!(lang in self.pageTemplates)) {
            self.pageTemplates[lang] = {}
        }

        if (!(slug in self.pageTemplates[lang]) || self.refreshes.pageTemplates === true) {
            self.refreshes.pageTemplates = false

            const fetch = new Promise(function(resolve, reject) {
                self.axiosInstance.get('page_template', {
                    params: {
                        slug,
                        lang,
                    }
                }).then(function(response) {
                    self.pageTemplates[lang][slug] = response.data.data[lang];
                    resolve(self.pageTemplates[lang][slug])
                }).catch((e) => {
                    if (slug in self.pageTemplates) {
                        resolve(self.pageTemplates[lang][slug])
                    } else {
                        reject(e)
                    }
                })
            })

            if (!(slug in self.pageTemplates[lang])) {
                return fetch
            }
        }

        return new Promise(function(resolve) {
            resolve(self.pageTemplates[lang][slug])
        })
    }
}

const apiInstances = {}

function getInstance(name, config) {
    if (!(name in apiInstances)) {
        apiInstances[name] = new ApiService(config)

        setInterval(function() {
            apiInstances[name].refresh()
        }, 60000)
    }

    return apiInstances[name]
}

export { getInstance }