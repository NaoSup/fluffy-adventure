const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActionSchema = new Schema(
  {
    isActivated: {
      type: Boolean,
      default: true
    },
    triggerIntentIds: {
      type: [
        {
          type: String,
          required: true
        }
      ],
      default: undefined
    },
    name: {
      type: String,
      required: true
    },
    answers: [
      {
        type: String,
        required: true
      }
    ],
    usesContext: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Use Mongoose createdAt & updatedAt,
  }
)

ActionSchema.options.toJSON = {
  getters: true,
  transform: function(doc, ret, options) {
    delete ret.updatedAt
    delete ret.createdAt
    delete ret.__v
    delete ret.createdBy
    delete ret.dateDeleted
    return ret
  }
}

module.exports = mongoose.model('Action', ActionSchema)
