import request from './request'

/**
 * Create an action
 * @param {Object} action
 * @returns {Promise<any>}
 */
function createAction(action) {
  return new Promise(resolve => {
    request({
      url: '/action',
      method: 'post',
      data: action
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error createAction', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

function deleteAction(actionId) {
  return new Promise(resolve => {
    request({
      url: `/action/${actionId}`,
      method: 'delete'
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error deleteAction', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

/**
 * Get action
 * @param {String} actionId
 * @returns {Promise<any>}
 */
function getAction(actionId) {
  return new Promise(resolve => {
    request({
      url: `/action/${actionId}`,
      method: 'get'
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error getAction', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}
/**
 * Get actions list
 * @returns {Promise<any>}
 */
function getActionsList() {
  return new Promise(resolve => {
    request({
      url: '/actions',
      method: 'get'
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.error('error getActionsList', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

/**
 * Update an action
 * @param {Object} action
 * @param {String} actionId
 * @returns {Promise<any>}
 */
function updateAction(action) {
  return new Promise(resolve => {
    request({
      url: `/action/${action._id}`,
      method: 'put',
      data: action
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error updateAction', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

export { createAction, deleteAction, getAction, getActionsList, updateAction }
