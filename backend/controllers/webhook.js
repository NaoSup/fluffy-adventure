class WebHook {
  async getProblem(reqWebHookp) {
    let reqWebHook = reqWebHookp
    console.log("entre#######")
    const valideteProblems = ["problem_order", "problem_delivery", "problem_deliverer"]
    const userintent = reqWebHook.queryResult.intent.displayName
    console.log(userintent)
    if (valideteProblems.includes(userintent)) {
      console.log("ready for action ????")

      const textToSend = "Je veux pas savoir tes problemes laisse moi tranquille merde"
      console.log(reqWebHook)
      return {

        "fulfillmentText": textToSend
      }
      // Oh,  je m'excuse d'avance. Pouvez-vous m' en dire plus sur ce qui s'est passé avec le livreur ?   
    }

    // problem_order, problem_delivery, problem_deliverer


  }

}
module.exports = new WebHook()