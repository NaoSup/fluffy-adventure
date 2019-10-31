'use strict'

const ActionController = require('../controllers/action')
const Action = {
  name: 'Action',
  version: '1.0.0',

  register: async (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/actions',
        handler: async (req, h) => {
          console.info('gets')
        }
      },
      {
        method: 'POST',
        path: '/action',
        handler: async (req, h) => {
          return await ActionController.createAction(req)
        }
      },
      {
        method: 'GET',
        path: '/action/{actionId}',
        handler: async (req, h) => {
          console.info('get')
        }
      },
      {
        method: 'PUT',
        path: '/action/{actionId}',
        handler: async (req, h) => {
          console.info('update')
        }
      },
      {
        method: 'DELETE',
        path: '/action/{actionId}',
        handler: async (req, h) => {
          console.info('delete')
        }
      }
    ])
  }
}
module.exports = Action
