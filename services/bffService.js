import axios from 'axios'

class BffService {
  constructor(config) {
    this.pages = []
    this.pageContent = []
    /*https://mpl-bff-dot-parkos-production.appspot.com/*/
    this.axiosInstance = axios.create({
      baseURL: config?.baseURL ?? 'localhost:3001/'
    })
    this.refreshes = {
      pageContent: false
    }
  }

  refresh = function () {
    this.refreshes.pageContent = true
  }

  getPageContent = async function (devtitle) {
    const self = this

    if (!self.pageContent[devtitle] || self.refreshes.pageContent === true) {
      self.refreshes.pageContent = false

      const fetch = new Promise(function (resolve, reject) {
        self.axiosInstance
          .get(`pages/${devtitle}/content.json`)
          .then((response) => {
            self.pageContent[devtitle] = response.data
            resolve(self.pageContent[devtitle])
          })
          .catch((e) => {
            if (self.pageContent[devtitle] !== null) {
              resolve(self.pageContent[devtitle])
            } else {
              reject(e)
            }
          })
      })

      return fetch;
    }

    return new Promise(function (resolve) {
      resolve(self.pageContent[devtitle])
    })
  }
}

const bffInstances = {}

function getInstance(name, config) {
  if (!(name in bffInstances)) {
    bffInstances[name] = new BffService(config)

    setInterval(function () {
      bffInstances[name].refresh()
    }, 60000)
  }

  return bffInstances[name]
}

export { getInstance }
