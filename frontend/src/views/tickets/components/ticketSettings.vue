<template>
  <div class="row">
    <div class="col-10 offset-1">
      <div class="row p-2 pt-3 mb-3 head">
        <div class="col-6 pl-3">
          <button class="btn btn-secondary" @click.prevent="returnToList">Retour</button>
        </div>
        <div class="col-6 text-right">
          <button class="btn btn-primary" @click.prevent="save">Enregistrer</button>
        </div>
      </div>
      <div class="form p-2 pl-3 pr-3">
        <div class="table-responsive">
          <table>
            <tbody v-if="ticket">
              <tr>
                <td>
                  <b>Numéro de commande</b>
                </td>
                <td>
                  {{ ticket.orderNumber }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Numéro de téléphone</b>
                </td>
                <td>
                  {{ ticket.phoneNumber || 'Non renseigné...' }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Description</b>
                </td>
                <td>
                  {{ ticket.description }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Informations complémentaires</b>
                </td>
                <td>
                  {{ ticket.additionalDetails || 'Non renseigné...' }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Status</b>
                </td>
                <td>
                  <div class="dropdown">
                    <button
                      id="dropdownMenuButton"
                      :class="`btn-outline-${selectedStatus.class}`"
                      class="btn dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span>{{ selectedStatus.text }}</span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a
                        v-for="status in statusList"
                        :class="`text-${status.class}`"
                        :key="status.value"
                        class="dropdown-item"
                        @click.prevent="updateTicketStatus(status.value)"
                      >
                        {{ status.text }}
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTicket, updateTicket } from '@/api/ticket'
export default {
  name: 'TicketSettings',
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
      ticket: null
    }
  },
  computed: {
    selectedStatus() {
      if (this.ticket) {
        return this.statusList.find(status => status.value === this.ticket.status)
      }
      return this.statusList[0]
    }
  },
  created() {
    this.getTicket(this.$route.params.ticketId)
  },
  methods: {
    getTicket(ticketId) {
      getTicket(ticketId).then(response => {
        if (!response || !response.data) {
          return
        }
        this.ticket = response.data
      })
    },
    returnToList() {
      this.$router.push({
        path: '/tickets'
      })
    },
    save() {
      updateTicket(this.ticket).then(response => {
        if (!response || !response.data) {
          return
        }
        this.ticket = response.data
      })
    },
    updateTicketStatus(status) {
      this.ticket.status = status
    }
  }
}
</script>
