const ActionModel = require('../models/Action')

class Action {
  async createAction(req, h) {
    try {
      const action = await ActionModel.create(req.payload)
      return {
        code: 200,
        data: action
      }
    } catch (error) {
      console.error(error)
      return {
        code: 500,
        data: null
      }
    }
  }
}

module.exports = new Action()
