const dialogflow = require('dialogflow');
const client = new dialogflow.v2.IntentsClient({
  credentials: {
    private_key: JSON.parse(`"${process.env.DIALOGFLOW_PRIVATE_KEY}"`),
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
})
const locale = "fr"
const formattedParent = client.projectAgentPath(process.env.DIALOGFLOW_PROJECT_ID);
class Intent {

  async getAllIntents() {

    const options = { autoPaginate: false };

    try {
      const responses = await client.listIntents(
        {
          parent: formattedParent,
          intentView: 1
        }, options)
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
  async getIntent(intentId) {
    console.log(intentId)
    const formattedName = client.intentPath(process.env.DIALOGFLOW_PROJECT_ID, intentId)
    try {
      const responses = await client.getIntent(
        {
          name: formattedName,
          languageCode: locale,
          intentView: 1
        })
      return {
        data: responses,
        code: 200
      }
    }
    catch (err) {
      console.error("getIntent", err)
      return {
        data: null,
        code: 500
      }
    }
  }

  async deleteIntent(intentId) {
    console.log(intentId)
    const formattedName = client.intentPath(process.env.DIALOGFLOW_PROJECT_ID, intentId)
    try {
      const responses = await client.deleteIntent(
        {
          name: formattedName
        })
      return {
        data: responses,
        code: 200
      }
    }
    catch (err) {
      console.error("getIntent", err)
      return {
        data: null,
        code: 500
      }
    }
  }

  async updateIntent(reqPayload, intentId) {

    let intent = reqPayload.intent
    intent.name = client.intentPath(process.env.DIALOGFLOW_PROJECT_ID, intentId)

    const request = {
      intent: intent,
      languageCode: locale,
      intentView: 1
    }
    try {
      const responses = await client.updateIntent(request)
      return {
        data: responses,
        code: 200
      }
    }
    catch (err) {
      console.error("updateIntent", err)
      return {
        data: null,
        code: 500
      }
    }
  }
}

module.exports = new Intent()