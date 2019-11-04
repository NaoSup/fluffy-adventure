const ActionModel = require('../models/Action')
class WebHook {
  async getProblem(reqWebHookp) {
    let reqWebHook = reqWebHookp
    const userintent = reqWebHook.queryResult.intent.name
    const foundAction = await ActionModel.findOne({
      'triggerIntentIds.intentId': userintent
    })

    if (foundAction !== null) {
      return {
        fulfillmentText: foundAction.answers[Math.floor(Math.random() * foundAction.answers.length - 1)]
      }
    }
  }
}
module.exports = new WebHook()