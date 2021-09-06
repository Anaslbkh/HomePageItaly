import axios from "axios";

class BffService {
  constructor(config) {
    this.pages = [];
    this.pageContent = [];
    this.axiosInstance = axios.create({
      baseURL: config.baseURL
    });
  }

  getPageContent = async function(pageId) {
    const self = this;

    if (!self.pageContent[pageId]) {
      const fetch = new Promise(function(resolve, reject) {
        self.axiosInstance
          .get(`pages/${pageId}/content.json`)
          .then(response => {
            self.pageContent[pageId] = response.data;
            resolve(self.pageContent[pageId]);
          })
          .catch(e => {
            if (self.pageContent[pageId] !== null) {
              resolve(self.pageContent[pageId]);
            } else {
              reject(e);
            }
          });
      });

      return fetch;
    }

    return new Promise(function(resolve) {
      resolve(self.pageContent[pageId]);
    });
  };
  // const fetch = new Promise(function(resolve, reject) {
  //   console.log('FETCHING AIRPORT PARKINGS', slug, lang)
  //   self.axiosInstance.get('parkings', {
  //     params: {
  //       lang,
  //       airport: airport.id
  //     }
  //   }).then(function(response) {
  //     self.parkings[slug] = response.data.data
  //     resolve(self.parkings[slug])
  //   }).catch((e) => {
  //     if (slug in self.parkings) {
  //       resolve(self.parkings[slug])
  //     } else {
  //       reject(e)
  //     }
  //   })
  // })
}

function getBFF(config) {
  const bff = new BffService(config);

  return bff;
}

export { getBFF };
