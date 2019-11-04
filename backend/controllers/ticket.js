const TicketModel = require('../models/Ticket')

class Ticket {
  async getAllTickets() {
    try {
      const tickets = await TicketModel.find({})
      return {
        code: 200,
        data: tickets
      }
    } catch (error) {
      console.error(error)
      return {
        code: 500,
        data: null
      }
    }
  }
  async getTicket(ticketId) {
    try {
      const ticket = await TicketModel.findById(ticketId)
      if (ticket == null) {
        return {
          code: 500,
          data: null
        }
      } else {
        return {
          code: 200,
          data: ticket
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

  async updateTicket(ticketId, updatedTicket) {
    try {
      const ticket = await TicketModel.findByIdAndUpdate(
        ticketId,
        updatedTicket,
        {
          new: true
        }
      )
      return {
        code: 200,
        data: ticket
      }
    } catch (error) {
      console.error(error)
      return {
        code: 500,
        data: null
      }
    }
  }
  async createTicket(ticketToCreate) {
    try {
      const ticket = await TicketModel.create(ticketToCreate)
      return {
        code: 200,
        data: ticket
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

module.exports = new Ticket()
