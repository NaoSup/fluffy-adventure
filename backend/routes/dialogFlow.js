'use strict'

const DialogFlow = {
    name: 'DialogFlow',
    version: '1.0.0',

    register: async (server, options) => {
        server.route([
            {
                method: 'POST',
                path: '/dialogflow/webhook',
                handler: async (req ,h ) => {
                    console.log(req.payload)
                }

            }
        ])
    }


}
module.exports = DialogFlow