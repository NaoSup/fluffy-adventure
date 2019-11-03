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
          <label for="intentName">Nom de l'intent</label>
          <input
            id="intentName"
            v-model="intent.displayName"
            :class="{ invalid: errors.includes('intentName') }"
            type="text"
            class="form-control"
          />
          <div v-if="errors.includes('intentName')" class="error absolute text-danger">
            Veuillez saisir un nom pour cet intent
          </div>
        </div>
        <hr />
        <div class="form-group">
          <h3>Phrases d'entraînement</h3>
          <p>Les phrases que vous pouvez attendre des utilisateurs et qui déclencheront un intent</p>
          <input
            id="trainingPhrase"
            v-model="trainingPhrase"
            :class="{ invalid: errors.includes('trainingPhrase') }"
            type="text"
            class="form-control"
            placeholder="Ajouter une phrase"
            @keyup.enter="addTrainingPhrase"
          />
          <div v-if="errors.includes('trainingPhrase')" class="error absolute text-danger">
            Veuillez ajouter au moins une phrase d'entraînement
          </div>
        </div>
        <div class="table-responsive">
          <!-- // @TODO add pagination -->
          <table class="table table-sm table-hover">
            <tbody v-if="intent.trainingPhrases.length">
              <listPhrase
                v-for="(phrase, index) in intent.trainingPhrases"
                :key="index"
                :phrase="phrase"
                @delete="deleteTrainingPhrase(index)"
              />
            </tbody>
            <div v-else><small class="font-italic pl-2">Aucune phrase d'entraînement n'a été ajoutée...</small></div>
          </table>
        </div>
        <hr />
        <div v-if="intentId">
          <h3>Zone de danger</h3>
          <p>Attention, cette action est irreversible.</p>
          <!-- @TODO add validation pop up -->
          <button class="btn btn-danger" @click.prevent="deleteIntent">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createIntent, deleteIntent, getIntent, updateIntent } from '@/api/dialogFlow'
import ListPhrase from '@/components/listPhrase'
export default {
  name: 'IntentSettings',
  components: { ListPhrase },
  data() {
    return {
      errors: [],
      intent: {
        displayName: '',
        trainingPhrases: [],
        webhookState: 'WEBHOOK_STATE_ENABLED'
      },
      trainingPhrase: ''
    }
  },
  computed: {
    intentId() {
      return this.$route.params.intentId
    }
  },
  watch: {
    'intent.displayName': function() {
      if (this.intent.displayName.length && this.errors.includes('intentName')) {
        const index = this.errors.indexOf('intentName')
        this.errors.splice(index, 1)
      }

      if (!this.intent.displayName.length && !this.errors.includes('intentName')) {
        this.errors.push('intentName')
      }
    }
  },
  created() {
    if (this.intentId) {
      this.getIntent(this.intentId)
    }
  },
  methods: {
    addTrainingPhrase() {
      if (this.trainingPhrase.length) {
        this.intent.trainingPhrases.push({
          parts: [{ text: this.trainingPhrase }],
          type: 'EXAMPLE'
        })
        this.trainingPhrase = ''
      }

      if (this.intent.trainingPhrases.length && this.errors.includes('trainingPhrase')) {
        const index = this.errors.indexOf('trainingPhrase')
        this.errors.splice(index, 1)
      }
    },
    deleteIntent() {
      if (this.intentId) {
        deleteIntent(this.intentId).then(response => {
          if (response && response.data) {
            this.$router.push('/intents')
          }
        })
      }
    },
    deleteTrainingPhrase(index) {
      this.intent.trainingPhrases.splice(index, 1)
      if (!this.intent.trainingPhrases.length && !this.errors.includes('trainingPhrase')) {
        this.errors.push('trainingPhrase')
      }
    },
    getIntent(intentId) {
      getIntent(intentId).then(response => {
        if (!response || !response.data || !response.data[0]) {
          return
        }

        this.intent = response.data[0]
      })
    },
    returnToList() {
      this.$router.push({
        path: '/intents'
      })
    },
    save() {
      this.errors = []

      if (!this.intent.displayName.length) {
        this.errors.push('intentName')
      }

      if (!this.intent.trainingPhrases.length) {
        this.errors.push('trainingPhrase')
      }

      if (this.errors.length) {
        return false
      }
      if (this.intentId) {
        updateIntent(this.intent, this.intentId).then(response => {
          if (!response || !response.data || !response.data[0]) {
            return
          }

          this.intent = response.data[0]
        })
      } else {
        createIntent(this.intent).then(response => {
          if (!response || !response.data || !response.data[0]) {
            return
          }

          this.intent = response.data[0]

          const splittedIntentName = this.intent.name.split('/')
          const intentId = splittedIntentName[splittedIntentName.length - 1]
          this.$router.replace({
            path: `/intents/settings/${intentId}`
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
