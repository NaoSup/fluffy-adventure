'use strict'

const ActionController = require('../controllers/action')
const Action = {
  name: 'Action',
  version: '1.0.0',

  register: async (server, options) => {
    server.route([{
        method: 'GET',
        path: '/actions',
        handler: async (req, h) => {
          return await ActionController.getAllActions()
        }
      },
      {
        method: 'POST',
        path: '/action',
        handler: async (req, h) => {
          return await ActionController.createAction(req.payload)
        }
      },
      {
        method: 'GET',
        path: '/action/{actionId}',
        handler: async (req, h) => {
          return await ActionController.getAction(req.params.actionId)
        }
      },
      {
        method: 'PUT',
        path: '/action/{actionId}',
        handler: async (req, h) => {
          return await ActionController.updateAction(req.params.actionId, req.payload)
        }
      },
      {
        method: 'DELETE',
        path: '/action/{actionId}',
        handler: async (req, h) => {
          return await ActionController.deleteAction(req.params.actionId)
        }
      }
    ])
  }
}
module.exports = Action