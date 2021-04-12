import https from 'https'

export default function({ $axios }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

  if (process.env.NODE_ENV !== 'production') {
    $axios.onRequest((config) => {
      let params = ''
      if (config.params) {
        params = Object.keys(config.params).map((key) => [key, config.params[key]].join('=')).join('&')
      }

      console.log('Making request to ' + config.baseURL + config.url + '?' + params)
    })

    $axios.onResponseError((error) => {
      console.log('Error while making request ' + error.message)
    })
  }
}
