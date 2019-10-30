<template>
  <div class="row">
    <div class="col-10 offset-1">
      <div class="row p-2 pt-3 mb-3">
        <div class="col-12 text-right">
          <button class="btn btn-primary" @click.prevent="addIntent">Add new intent</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 table-responsive">
          <table class="table table-hover">
            <thead>
              <th>Intent name</th>
              <th>Total training phrases</th>
            </thead>
            <tbody>
              <tr
                v-for="(intent, index) in intents"
                :key="index"
                class="clickable"
                @click.prevent="updateIntent(intent)"
              >
                <td>{{ intent.displayName }}</td>
                <td>{{ intent.trainingPhrases.length }}</td>
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
      this.$router.push({
        path: `/intents/settings/${intent.id}`
      })
    }
  }
}
</script>
