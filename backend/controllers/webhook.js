const ActionModel = require('../models/Action')
const dialogflow = require('dialogflow')
const getOderStep = {
  displayName: 'get_order_number',
  step: 'step3'

}
const client = new dialogflow.v2beta1.ContextsClient({
  credentials: {
    private_key: JSON.parse(`"${process.env.DIALOGFLOW_PRIVATE_KEY}"`),
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
})
class WebHook {
  async getProblem(reqWebHookp) {
    // get context first them copy info 
    // save probleme theme
    // ask order number with context 5 ask  count number of fallback custom by context
    //save number 
    //do the same for contact and compimentarie infos 

    let reqWebHook = reqWebHookp
    const getContextRegex = /\/contexts\/[^\/]*step[^\/]*/
    const rowContext = reqWebHook.queryResult.outputContexts
    const contextArray = []
    console.log('rowContext')
    console.log(rowContext)
    rowContext.forEach(contextName => {
      if (getContextRegex.test(contextName.name)) {
        contextArray.push(contextName.name.match(getContextRegex)[0].split('/')[2])
      }

    });

    const gerSessionRegex = /\/sessions\/[^\/]*\/contexts/
    const rawSessionId = reqWebHook.queryResult.outputContexts[0].name
    const sessionName = rawSessionId.match(gerSessionRegex)[0]
    const sessionSplit = sessionName.split('/');
    const sessionId = sessionSplit[2]
    console.info('contextArray')
    console.info(contextArray)

    // If no context let the defaultFallBack do the Job
    if (contextArray.length === 0) {
      return null
    } else {
      // const currentContext = contextArray.splice(0, contextArray.indexOf(defaultStep))

      // if (currentContext.length != 0) {
      //   const formattedName = client.contextPath(
      //     process.env.DIALOGFLOW_PROJECT_ID,
      //     sessionId,
      //     currentContext[0]
      //   )
      //   try {
      //     await client.deleteContext({
      //       name: formattedName
      //     })

      //   } catch (err) {
      //     console.error('webhook', err)
      //   }
      const userintent = reqWebHook.queryResult.intent
      console.info('userintent')
      console.info(reqWebHook.queryResult.intent)
      const foundAction = await ActionModel.findOne({
        'triggerIntentIds.intentId': userintent.name
      })

      if (foundAction !== null) {
        console.log('foundAction')
        console.log(foundAction)
        if (contextArray.includes(foundAction.context)) {

          if (userintent.displayName === getOderStep.displayName) {
            // console.log('order_number45436')
            // console.log(rowContext[0].parameters.order_number)
            return {
              fulfillmentText: `${foundAction.answers[Math.floor(Math.random() * foundAction.answers.length)]} ${rowContext[0].parameters.order_number} ?`
            }
          }
          return {
            fulfillmentText: foundAction.answers[Math.floor(Math.random() * foundAction.answers.length)]
          }
        }
        return null
      }
    }
    return null
  }
}
module.exports = new WebHook()