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
        <div class="form-group">
          <label for="actionName">Nom de l'action</label>
          <input
            id="actionName"
            v-model="actionName"
            :class="{ invalid: errors.includes('actionName') }"
            type="text"
            class="form-control"
          />
          <div v-if="errors.includes('actionName')" class="error absolute text-danger">
            Veuillez saisir un nom pour cette action
          </div>
        </div>
        <hr />
        <div class="form-group">
          <h3>Réponses</h3>
          <p>Une réponse choisie parmi celles ajoutées sera envoyée à l'utilisateur.</p>
          <input
            id="answer"
            v-model="answer"
            :class="{ invalid: errors.includes('answer') }"
            type="text"
            class="form-control"
            placeholder="Ajouter une réponse"
            @keyup.enter="addAnswer"
          />
          <div v-if="errors.includes('answer')" class="error absolute text-danger">
            Veuillez ajouter au moins une réponse
          </div>
        </div>
        <div class="table-responsive">
          <!-- // @TODO add pagination -->
          <table class="table table-sm table-hover">
            <tbody v-if="action.answers.length">
              <listPhrase
                v-for="(phrase, index) in action.answers"
                :key="index"
                :phrase="phrase"
                @delete="deleteAnswer(index)"
              />
            </tbody>
            <div v-else><small class="font-italic pl-2">Aucune réponse n'a été ajoutée...</small></div>
          </table>
        </div>
        <hr />
        <h3>Déclenchement de l'action</h3>
        <div class="form-group">
          <h5>Utilisation du contexte</h5>
          <input id="checkbox" v-model="action.usesContext" type="checkbox" />
          <label for="checkbox">Déclenchée par le contexte</label>
        </div>
        <div class="form-group">
          <h5>Intents déclencheurs</h5>
          <div class="dropdown">
            <button id="dropdownMenuButton" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
              Ajouter un intent
            </button>
            <div class="dropdown-menu pre-scrollable" aria-labelledby="dropdownMenuButton">
              <input
                v-model="triggerIntentName"
                type="text"
                class="form-control form-control-lg m-input"
                placeholder="Rechercher un intent"
              />
              <a
                v-for="(intent, key) in filteredIntents"
                :key="key"
                class="dropdown-item"
                @click.prevent="addTriggerIntent(intent)"
              >
                {{ intent.displayName }}
              </a>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <!-- // @TODO add pagination -->
          <table class="table table-sm table-hover">
            <thead>
              <th>Nom de l'intent</th>
              <th></th>
            </thead>
            <tbody v-if="action.triggerIntentIds.length">
              <listPhrase
                v-for="(intentId, index) in action.triggerIntentIds"
                :key="index"
                :phrase="getIntentName(intentId)"
                @delete="removeTriggerIntent(index)"
              />
            </tbody>
            <div v-else><small class="font-italic pl-2">Aucune réponse n'a été ajoutée...</small></div>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createAction, getAction, updateAction } from '@/api/action'
import { getIntentsList } from '@/api/dialogFlow'
import ListPhrase from '@/components/listPhrase'
export default {
  name: 'ActionSettings',
  components: { ListPhrase },
  data() {
    return {
      action: {
        labels: [{
          locale: 'fr',
          name: ''
        }],
        usesContext: false,
        answers: [],
        triggerIntentIds: []
      },
      actionName: '',
      answer: '',
      errors: [],
      intents: [],
      triggerIntentName: ''
    }
  },
  computed: {
    actionId() {
      return this.$route.params.actionId
    },
    filteredIntents() {
      return this.intents.filter(intent => {
        const splittedIntentName = intent.name.split('/')
        const intentId = splittedIntentName[splittedIntentName.length - 1]
        const isAlreadySelected = this.action.triggerIntentIds.includes(intentId)
        const containsFilter = intent.displayName.toLowerCase().includes(this.triggerIntentName.toLowerCase())
        return containsFilter && !isAlreadySelected
      })
    }
  },
  watch: {
    actionName: function() {
      if (this.actionName.length && this.errors.includes('actionName')) {
        const index = this.errors.indexOf('actionName')
        this.errors.splice(index, 1)
      }

      if (!this.actionName.length && !this.errors.includes('actionName')) {
        this.errors.push('actionName')
      }
    }
  },
  created() {
    this.getIntents()
    if (this.actionId) {
      this.getAction(this.actionId)
    }
  },
  methods: {
    addAnswer() {
      if (this.answer.length) {
        this.action.answers.push(this.answer)
        this.answer = ''
      }

      if (this.action.answers.length && this.errors.includes('answer')) {
        const index = this.errors.indexOf('answer')
        this.errors.splice(index, 1)
      }
    },
    addTriggerIntent(intent) {
      if (!this.action.triggerIntentIds.find(triggerIntentId => triggerIntentId.intentId === intent.name)) {
        const projectId = intent.name.split('/')[1]
        const intentToAdd = {
          intentId: intent.name,
          projectId
        }
        this.action.triggerIntentIds.push(intentToAdd)
      }
      this.triggerIntentName = ''
    },
    deleteAnswer(index) {
      this.action.answers.splice(index, 1)
      if (!this.action.answers.length && !this.errors.includes('answer')) {
        this.errors.push('answer')
      }
    },
    getAction(actionId) {
      getAction(actionId).then(response => {
        if (!response || !response.data) {
          return
        }

        this.action = response.data
        this.actionName = this.getActionName(this.action)
      })
    },
    getActionName(action) {
      const label = action.labels.find(label => label.locale === 'fr')
      return label && label.name || action.id
    },
    getIntentName(intent) {
      const intentFound = this.intents.find(item => item.name === intent.intentId)
      if (intentFound) {
        return intentFound.displayName
      }
      return ''
    },
    getIntents() {
      getIntentsList().then(response => {
        if (!response) {
          return
        }
        this.intents = response
      })
    },
    removeTriggerIntent(intentIndex) {
      this.action.triggerIntentIds.splice(intentIndex, 1)
    },
    returnToList() {
      this.$router.push({
        path: '/actions'
      })
    },
    save() {
      this.errors = []
      if (!this.actionName.length) {
        this.errors.push('actionName')
      }

      if (!this.action.answers.length) {
        this.errors.push('trainingPhrase')
      }

      if (this.errors.length) {
        return false
      }

      const localizedLabel = this.action.labels.find(label => label.locale === 'fr')
      localizedLabel.name = this.actionName

      if (this.actionId) {
        updateAction(this.action).then(response => {
          if (!response || !response.data || !response.data[0]) {
            return
          }

          this.action = response.data[0]
        })
      } else {
        createAction(this.action).then(response => {
          if (!response || !response.data || !response.data[0]) {
            return
          }

          this.action = response.data[0]
          this.$router.replace({
            path: `/intents/settings/${this.action.id}`
          })
        })
      }
    }
  }
}
</script>

<style>
.form-group {
  padding-bottom: 2vh;
}
.head {
  border-bottom: #eee solid 1px;
}
.invalid {
  border-color: red;
}
</style>
