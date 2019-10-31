import request from './request'

/**
 * Create an intent
 * @param {Object} intent
 * @returns {Promise<any>}
 */
function createIntent(intent) {
  return new Promise(resolve => {
    request({
      url: '/dialogflow/intent',
      method: 'post',
      data: {
        intent
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error createIntent', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

function deleteIntent(intentId) {
  return new Promise(resolve => {
    request({
      url: `/dialogflow/intent/${intentId}`,
      method: 'delete'
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error deleteIntent', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

/**
 * Get intent
 * @param {String} intentId
 * @returns {Promise<any>}
 */
function getIntent(intentId) {
  return new Promise(resolve => {
    request({
      url: `/dialogflow/intent/${intentId}`,
      method: 'get'
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error getIntent', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}
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

/**
 * Update an intent
 * @param {Object} intent
 * @param {String} intentId
 * @returns {Promise<any>}
 */
function updateIntent(intent, intentId) {
  return new Promise(resolve => {
    request({
      url: `/dialogflow/intent/${intentId}`,
      method: 'put',
      data: {
        intent
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error updateIntent', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

export { createIntent, deleteIntent, getIntent, getIntentsList, updateIntent }
