<template>
  <div class="row">
    <div class="col-10 offset-1">
      <div class="row">
        <div class="col-12 table-responsive">
          <table class="table table-hover">
            <thead>
              <th>Numéro de commande</th>
              <th>Description</th>
              <th>Statut</th>
            </thead>
            <tbody>
              <tr
                v-for="(ticket, index) in tickets"
                :key="index"
                class="clickable"
                @click.prevent="updateTicket(ticket._id)"
              >
                <td>{{ ticket.orderNumber }}</td>
                <td>{{ ticket.description }}</td>
                <td :class="`text-${getTicketStatusClass(ticket.status)}`">{{ getTicketStatusText(ticket.status) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTicketsList } from '@/api/ticket'
export default {
  name: 'Tickets',
  data() {
    return {
      statusList: [
        {
          text: 'En cours',
          value: 'Pending',
          class: 'info'
        },
        {
          text: 'Résolu',
          value: 'Resolved',
          class: 'success'
        },
        {
          text: 'Cloturé',
          value: 'Closed',
          class: 'danger'
        }
      ],
      tickets: []
    }
  },
  created() {
    this.getTickets()
  },
  methods: {
    getTickets() {
      getTicketsList().then(response => {
        if (!response) {
          return
        }
        this.tickets = response
      })
    },
    getTicketStatusClass(ticketStatus) {
      const status = this.statusList.find(status => status.value === ticketStatus)
      return (status && status.class) || ''
    },
    getTicketStatusText(ticketStatus) {
      const status = this.statusList.find(status => status.value === ticketStatus)
      return (status && status.text) || ticketStatus
    },
    updateTicket(ticketId) {
      this.$router.push({
        path: `/tickets/settings/${ticketId}`
      })
    }
  }
}
</script>
