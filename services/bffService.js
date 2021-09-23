import axios from 'axios'

class BffService {
  constructor(config) {
    this.pages = []
    this.pageContent = []
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

      return new Promise(function (resolve, reject) {
        axios.get(`/api/pages/${devtitle}/content.json`)
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

export {getInstance}
