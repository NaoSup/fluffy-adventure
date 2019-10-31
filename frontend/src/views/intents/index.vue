<template>
  <div class="row">
    <div class="col-10 offset-1">
      <div class="row p-2 pt-3 mb-3">
        <div class="col-12 text-right">
          <button class="btn btn-primary" @click.prevent="addIntent">Ajouter un intent</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 table-responsive">
          <table class="table table-hover">
            <thead class="text-center">
              <th>Nom de l'intent</th>
              <th>Nombre de phrases d'entraînement</th>
            </thead>
            <tbody>
              <tr
                v-for="(intent, index) in intents"
                :key="index"
                class="clickable"
                @click.prevent="updateIntent(intent)"
              >
                <td>{{ intent.displayName }}</td>
                <td class="text-center">{{ intent.trainingPhrases.length }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIntentsList } from '@/api/dialogFlow'
export default {
  name: 'Intents',
  data() {
    return {
      intents: []
    }
  },
  created() {
    this.getIntents()
  },
  methods: {
    addIntent() {
      this.$router.push({
        path: '/intents/settings'
      })
    },
    getIntents() {
      getIntentsList().then(response => {
        if (!response) {
          return
        }
        this.intents = response
      })
    },
    updateIntent(intent) {
      const splittedIntentName = intent.name.split('/')
      const intentId = splittedIntentName[splittedIntentName.length - 1]
      this.$router.push({
        path: `/intents/settings/${intentId}`
      })
    }
  }
}
</script>
