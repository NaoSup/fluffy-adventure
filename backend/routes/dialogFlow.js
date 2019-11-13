'use strict'

const IntentController = require('../controllers/intent')
const WebhookController = require('../controllers/webhook')
const DialogFlow = {
    name: 'DialogFlow',
    version: '1.0.0',

    register: async (server, options) => {
        server.route([
            {
                method: 'POST',
                path: '/dialogflow/webhook',
                handler: async (req, h) => {
                    return await WebhookController.getProblem(req.payload)
                }
            },
            {
                method: 'GET',
                path: '/dialogflow/intents',
                handler: async (req, h) => {
                    return IntentController.getAllIntents()
                }
            },
            {

                method: 'POST',
                path: '/dialogflow/intent',
                handler: async (req, h) => {
                    return await IntentController.createIntent(req.payload)

                }
            },
            {
                method: 'GET',
                path: '/dialogflow/intent/{intentId}',
                handler: async (req, h) => {
                    return await IntentController.getIntent(req.params.intentId)
                }
            },
            {
                method: 'PUT',
                path: '/dialogflow/intent/{intentId}',
                handler: async (req, h) => {
                    return await IntentController.updateIntent(req.payload, req.params.intentId)
                }
            },
            {
                method: 'DELETE',
                path: '/dialogflow/intent/{intentId}',
                handler: async (req, h) => {
                    return await IntentController.deleteIntent(req.params.intentId)
                }
            }


        ])
    }
}
module.exports = DialogFlow