<template>
  <div class="row">
    <div class="col-10 offset-1">
      <div class="row p-2 pt-3 mb-3 head">
        <div v-if="ticket" class="card w-100">
          <div class="card-header">
            Commande
            <b>#{{ ticket.orderNumber }}</b>
            <span v-if="isNew" class="badge badge-primary">Nouveau</span>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-4 border-right">
                <h5 class="card-title">Informations de contact</h5>
                <p class="card-text">
                  <b>Téléphone :</b>
                  <span>{{ ticket.phoneNumber || 'Non renseigné...' }}</span>
                </p>
              </div>
              <div class="col-8">
                <h5 class="card-title">Description du problème</h5>
                <p class="card-text">
                  {{ ticket.description }}
                </p>
                <div v-if="ticket.additionalDetails">
                  <h6>Informations complémentaires</h6>
                  <p class="card-text">
                    {{ ticket.additionalDetails }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-right">
            <button class="btn" :class="isResolved ? 'btn-danger' : 'btn-primary'" @click.prevent="save">
              <span v-if="isResolved">
                Marquer comme non résolu
              </span>
              <span v-else>
                Marquer comme résolu
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTicket, updateTicket } from '@/api/ticket'
import dayJS from 'dayjs'
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
    isNew() {
      return dayJS().isBefore(this.limitDate)
    },
    isResolved() {
      return this.ticket && this.ticket.status === 'Resolved'
    },
    limitDate() {
      if (this.ticket && this.ticket.createdAt) {
        return dayJS(this.ticket.createdAt).add(5, 'day')
      }
      return dayJS()
    },
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
      this.ticket.status = this.isResolved ? 'Pending' : 'Resolved'
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
