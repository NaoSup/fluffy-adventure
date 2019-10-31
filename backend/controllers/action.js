const ActionModel = require('../models/Action')

class Action {
  async getAllActions() {
    try {
      const actions = await ActionModel.find({})
      return {
        code: 200,
        data: actions
      }
    } catch (error) {
      console.error(error)
      return {
        code: 500,
        data: null
      }


    }
  }
  async deleteAction(actionId) {
    try {
      const action = await ActionModel.findByIdAndDelete(actionId)
      if (action === null) {
        return {
          code: 500,
          data: null
        }
      } else {
        return {
          code: 200,
          data: action
        }
      }
    } catch (error) {
      console.error(error)
      return {
        code: 500,
        data: null
      }
    }
  }

  async getAction(actionId) {
    try {
      const action = await ActionModel.findById(actionId)
      if (action == null) {
        return {
          code: 500,
          data: null
        }
      } else {
        return {
          code: 200,
          data: action
        }
      }
    } catch (error) {
      console.error(error)
      return {
        code: 500,
        data: null
      }
    }
  }

  async updateAction(actionId, updateAction) {
    try {
      const action = await ActionModel.findByIdAndUpdate(actionId, updateAction, {
        new: true
      })
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
  async createAction(createAction) {

    try {
      const action = await ActionModel.create(createAction)
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