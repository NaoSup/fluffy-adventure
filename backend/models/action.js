const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActionSchema = new Schema({
  slug: {
    type: String,
    index: true,
    required: true
  },
  answers: [{
    type: String,
  }],
  isActivated: {
    type: Boolean,
    default: true
  },
  triggerIntentIds: {
    type: [{
      projectId: {
        type: String,
        required: true
      },
      intentId: {
        type: String,
        required: true
      }
    }],
    default: undefined
  },
  labels: {
    type: [{
      locale: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }]
  }
}, {
  timestamps: true // Use Mongoose createdAt & updatedAt,
})

ActionSchema.options.toJSON = {
  getters: true,
  transform: function (doc, ret, options) {
    delete ret.updatedAt
    delete ret.createdAt
    delete ret.__v
    delete ret.createdBy
    delete ret.dateDeleted
    return ret
  }
}

module.exports = mongoose.model('Action', ActionSchema)