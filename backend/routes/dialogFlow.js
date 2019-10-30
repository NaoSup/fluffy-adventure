'use strict'

const IntentControlleur = require('../controllers/intent')
const DialogFlow = {
    name: 'DialogFlow',
    version: '1.0.0',

    register: async (server, options) => {
        server.route([
            {
                method: 'POST',
                path: '/dialogflow/webhook',
                handler: async (req, h) => {
                    console.log(req.payload)
                }
            },
            {
                method: 'GET',
                path: '/dialogflow/intents',
                handler: async (req, h) => {
                    return IntentControlleur.getAllIntents()
                }
            },
            {

                method: 'POST',
                path: '/dialogflow/intent',
                handler: async (req, h) => {
                    return await IntentControlleur.createIntent(req.payload)

                }
            },
            {
                method: 'GET',
                path: '/dialogflow/intent/{intentId}',
                handler: async (req, h) => {
                    return await IntentControlleur.getIntent(req.params.intentId)
                }
            },
            {
                method: 'PUT',
                path: '/dialogflow/intent/{intentId}',
                handler: async (req, h) => {
                    return await IntentControlleur.updateIntent(req.payload, req.params.intentId)
                }
            },
            {
                method: 'DELETE',
                path: '/dialogflow/intent/{intentId}',
                handler: async (req, h) => {
                    return await IntentControlleur.deleteIntent(req.params.intentId)
                }
            }


        ])
    }
}
module.exports = DialogFlow