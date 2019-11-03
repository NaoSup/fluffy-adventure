<template>
  <div class="row">
    <div class="col-10 offset-1">
      <div class="row p-2 pt-3 mb-3">
        <div class="col-12 text-right">
          <button class="btn btn-primary" @click.prevent="addAction">Ajouter une action</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 table-responsive">
          <table class="table table-hover">
            <thead class="text-center">
              <th>Nom de l'action</th>
              <th>Nombre de réponses</th>
              <th>Déclenchée par le contexte</th>
              <th>Intents déclencheurs</th>
            </thead>
            <tbody>
              <tr
                v-for="(action, index) in actions"
                :key="index"
                class="clickable"
                @click.prevent="updateAction(action._id)"
              >
                <td>{{ action.name || action.slug }}</td>
                <td class="text-center">{{ (action.answers && action.answers.length) || 0 }}</td>
                <!-- @TODO use Check icon -->
                <td class="text-center">{{ action.usesContext }}</td>
                <td class="text-center">
                  <span class="badge badge-info mr-1" v-for="(intent, key) in getActionIntents(action)" :key="key">{{ intent.displayName }}</span>
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
import { getIntentsList } from '@/api/dialogFlow'
import { getActionsList } from '@/api/action'
export default {
  name: 'Actions',
  data() {
    return {
      actions: [],
      intents: []
    }
  },
  created() {
    this.getIntents()
    this.getActions()
  },
  methods: {
    addAction() {
      this.$router.push({
        path: '/actions/settings'
      })
    },
    getActionIntents(action) {
      this.intents.forEach(intent => {
        const splittedIntentName = intent.name.split('/')
        intent.id = splittedIntentName[splittedIntentName.length - 1]
      })
      const actionsIntents = []
      for (const triggerIntent of action.triggerIntentIds) {
        const intentFound = this.intents.find(intent => intent.id === triggerIntent)
        if (intentFound) {
          actionsIntents.push(intentFound)
        }
      }

      return actionsIntents
    },
    getActions() {
      getActionsList().then(response => {
        if (!response) {
          return
        }
        this.actions = response
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
    updateAction(actionId) {
      this.$router.push({
        path: `/actions/settings/${actionId}`
      })
    }
  }
}
</script>
