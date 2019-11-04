const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      required: true
    },
    additionalDetails: {
      type: String,
      default: undefined
    },
    status: {
      type: String,
      default: 'Pending'
    }
  },
  {
    timestamps: true // Use Mongoose createdAt & updatedAt,
  }
)

TicketSchema.options.toJSON = {
  getters: true,
  transform: function(doc, ret, options) {
    delete ret.__v
    return ret
  }
}

module.exports = mongoose.model('Ticket', TicketSchema)
