'use strict'

const TicketController = require('../controllers/ticket')
const Ticket = {
  name: 'Ticket',
  version: '1.0.0',

  register: async (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/tickets',
        handler: async (req, h) => {
          return await TicketController.getAllTickets()
        }
      },
      {
        method: 'POST',
        path: '/ticket',
        handler: async (req, h) => {
          return await TicketController.createTicket(req.payload)
        }
      },
      {
        method: 'GET',
        path: '/ticket/{ticketId}',
        handler: async (req, h) => {
          return await TicketController.getTicket(req.params.ticketId)
        }
      },
      {
        method: 'PUT',
        path: '/ticket/{ticketId}',
        handler: async (req, h) => {
          return await TicketController.updateTicket(
            req.params.ticketId,
            req.payload
          )
        }
      }
    ])
  }
}
module.exports = Ticket
