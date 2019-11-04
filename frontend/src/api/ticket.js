import request from './request'

/**
 * Get ticket
 * @param {String} ticketId
 * @returns {Promise<any>}
 */
function getTicket(ticketId) {
  return new Promise(resolve => {
    request({
      url: `/ticket/${ticketId}`,
      method: 'get'
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error getTicket', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}
/**
 * Get tickets list
 * @returns {Promise<any>}
 */
function getTicketsList() {
  return new Promise(resolve => {
    request({
      url: '/tickets',
      method: 'get'
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.error('error getTicketsList', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

/**
 * Update a ticket
 * @param {Object} ticket
 * @returns {Promise<any>}
 */
function updateTicket(ticket) {
  return new Promise(resolve => {
    request({
      url: `/ticket/${ticket._id}`,
      method: 'put',
      data: ticket
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error('error updateTicket', err)
        resolve({
          code: 50000,
          data: [],
          err: err
        })
      })
  })
}

export { getTicket, getTicketsList, updateTicket }
