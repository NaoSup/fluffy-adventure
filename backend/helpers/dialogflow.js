'use strict'

const dialogflow = require('dialogflow');
const uuid = require('uuid')

module.exports = {
  sendTextToDiagFlow: async (textMessage) => {
    const privateKey = JSON.parse(`"${process.env.DIALOGFLOW_PRIVATE_KEY}"`)
    const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL
    const projectId = process.env.DIALOGFLOW_PROJECT_ID
    const sessionId = uuid.v4()
    const LANGUAGE_CODE = 'fr-FR'
    let config = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail
      }
    }

    const sessionClient = new dialogflow.SessionsClient(config)
    // Define session path
    const sessionPath = sessionClient.sessionPath(projectId, sessionId)
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textMessage,
          languageCode: LANGUAGE_CODE
        }
      }
    }
    try {
      let responses = sessionClient.detectIntent(request)

      return responses
    }
    catch (err) {
      console.error('DialogFlow.sendTextMessageToDialogFlow ERROR:', err);
      throw err
    }
  }
}
