const dialogflow = require('dialogflow');
const client = new dialogflow.v2.IntentsClient({
  credentials: {
    private_key: JSON.parse(`"${process.env.DIALOGFLOW_PRIVATE_KEY}"`),
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
})
const formattedParent = client.projectAgentPath(process.env.DIALOGFLOW_PROJECT_ID);
class Intent {

  async getAllIntents() {

    const options = { autoPaginate: false };

    try {
      const responses = await client.listIntents({ parent: formattedParent, intentView: 1 }, options)
      console.log("getAllIntents")
      return {
        data: responses[0],
        code: 200
      }
    }
    catch (err) {
      console.error("getAllIntents", err)
      return {
        data: null,
        code: 500
      }
    }
  }

  async createIntent(payload) {
    const intent = payload.intent
    const request = {
      parent: formattedParent,
      intent: intent,
    }
    try {
      const responses = await client.createIntent(request)
      return {
        data: responses,
        code: 200
      }
    }
    catch (err) {
      console.error("createIntent", err)
      return {
        data: null,
        code: 500
      }
    }
  }
}

module.exports = new Intent()