import request from './request'

/**
 * Get intents list
 * @returns {Promise<any>}
 */
function getIntentsList() {
  return new Promise(resolve => {
    request({
      url: '/dialogflow/intents',
      method: 'get'
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.error('error getIntentsList', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

export { getIntentsList }
