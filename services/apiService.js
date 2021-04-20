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
    this.axiosInstance = axios.create({
      baseURL: config.baseURL
    })
    this.refreshes = {
      languages: false,
      translations: false,
      airports: false,
      airportData: false,
      airportFaq: false,
      airportReviews: false,
      airportParkings: false
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
    }

    getLanguages = async function() {
      const self = this

      if (self.languages === null || self.refreshes.languages === true) {
        self.refreshes.languages = false

        const fetch = new Promise(function(resolve, reject) {
          self.axiosInstance.get('languages').then(function(response) {
            console.log('FETCHING LANGUAGES')
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

    getTranslations = async function(languageId) {
      const self = this

      if (!(languageId in self.translations) || self.refreshes.translations === true) {
        self.refreshes.translations = false

        const fetch = new Promise(function(resolve, reject) {
          self.axiosInstance.get(`translations/${languageId}/airport`)
            .then(function({ data }) {
              console.log('FETCHING TRANSLATIONS')
              self.translations[languageId] = data
              resolve(self.translations[languageId])
            }).catch((e) => {
              if (languageId in self.translations) {
                resolve(self.translations[languageId])
              } else {
                reject(e)
              }
            })
        })

        if (!(languageId in self.translations)) {
          return fetch
        }
      }

      return new Promise(function(resolve) {
        resolve(self.translations[languageId])
      })
    }

    getAirports = async function(lang, limit = 50, orderBy = 'locations_content.maintitle') {
      const self = this

      if (!(lang in self.airports) || self.refreshes.airports === true) {
        self.refreshes.airports = false

        const fetch = new Promise(function(resolve, reject) {
          console.log('FETCHING AIRPORTS', lang)
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
      const airports = await this.getAirports(lang)
      return Array.prototype.find.call(airports, airport => airport.slug === slug)
    }

    getAirportData = async function(slug, lang) {
      const self = this
      if (!(slug in self.airportData) || self.refreshes.airportData === true) {
        self.refreshes.airportData = false

        const airport = await self.getAirport(slug, lang)

        const fetch = new Promise(function(resolve, reject) {
          console.log('FETCHING AIRPORT DETAILS', slug, lang)
          self.axiosInstance.get(`airports/${airport.id}/details`)
            .then(function(response) {
              self.airportData[slug] = {
                airport,
                content: response.data.content
              }

              resolve(self.airportData[slug])
            }).catch((e) => {
              console.log('Airport data')
              reject(e)
              if (slug in self.airportData) {
                resolve(self.airportData[slug])
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
        resolve(self.airportData[slug])
      })
    }

    getAirportReviews = async function(slug, lang, limit = 4) {
      const self = this

      if (!(slug in self.airportReviews) || self.refreshes.airportReviews === true) {
        self.refreshes.airportReviews = false
        const airport = await self.getAirport(slug, lang)

        const fetch = new Promise(function(resolve, reject) {
          console.log('FETCHING AIRPORT REVIEWS', slug, lang)
          self.axiosInstance.get('reviews', {
            params: {
              airport: airport.id,
              lang,
              limit
            }
          }).then(function(response) {
            self.airportReviews[slug] = response.data
            resolve(self.airportReviews[slug])
          }).catch((e) => {
            if (slug in self.airportReviews) {
              resolve(self.airportReviews[slug])
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
        resolve(self.airportReviews[slug])
      })
    }

    getAirportFaq = async function(slug, lang) {
      const self = this

      if (!(slug in self.airportFaq) || self.refreshes.airportFaq === true) {
        self.refreshes.airportFaq = false
        const airport = await self.getAirport(slug, lang)

        const fetch = new Promise(function(resolve, reject) {
          console.log('FETCHING AIRPORT FAQ', slug, lang)
          self.axiosInstance.get(`airports/${airport.id}/faq`, {
            params: {
              lang
            }
          }).then(function(response) {
            self.airportFaq[slug] = response.data
            resolve(self.airportFaq[slug])
          }).catch((e) => {
            if (slug in self.airportFaq) {
              resolve(self.airportFaq[slug])
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
        resolve(self.airportFaq[slug])
      })
    }

    getAirportParkings = async function(slug, lang) {
      const self = this

      if (!(slug in self.parkings) || self.refreshes.airportParkings === true) {
        self.refreshes.airportParkings = false
        const airport = await self.getAirport(slug, lang)

        const fetch = new Promise(function(resolve, reject) {
          console.log('FETCHING AIRPORT PARKINGS', slug, lang)
          self.axiosInstance.get('parkings', {
            params: {
              lang,
              airport: airport.id
            }
          }).then(function(response) {
            self.parkings[slug] = response.data.data
            resolve(self.parkings[slug])
          }).catch((e) => {
            if (slug in self.parkings) {
              resolve(self.parkings[slug])
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
        resolve(self.parkings[slug])
      })
    }
}

const apiInstances = {}

function getInstance(name, config) {
  if (!(name in apiInstances)) {
    apiInstances[name] = new ApiService(config)

    setInterval(function() {
      console.log('REFRESHING DATA', new Date().toString())
      apiInstances[name].refresh()
    }, 60000)
  }

  return apiInstances[name]
}

export { getInstance }
