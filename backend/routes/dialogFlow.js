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
                method: 'POST',
                path: '/dialogflow/intents',
                handler: async (req, h) => {
                    return IntentControlleur.getAllIntents()
                }
            },
            {
                method: 'POST',
                path: '/dialogflow/intent',
                handler: async (req, h) => {
                    return result = await IntentControlleur.createIntent(req.payload)

                }
            }


        ])
    }
}
module.exports = DialogFlow