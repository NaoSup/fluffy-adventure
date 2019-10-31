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
            placeholder="Intent name"
          />
          <div v-if="errors.includes('intentName')" class="error absolute text-danger">Veuillez saisir un nom pour cet intent</div>
        </div>
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
            Veuillez ajouter au moins une réponse
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-sm table-hover">
            <tbody v-if="intent.trainingPhrases.length">
              <trainingPhrase
                v-for="(phrase, index) in intent.trainingPhrases"
                :key="index"
                :phrase="phrase"
                @delete="deleteTrainingPhrase(index)"
              />
            </tbody>
            <div v-else><small class="font-italic pl-2">Aucune phrase d'entraînement n'a été ajoutée...</small></div>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIntent, updateIntent } from '@/api/dialogFlow'
import TrainingPhrase from './trainingPhrase'
export default {
  name: 'IntentSettings',
  components: { TrainingPhrase },
  data() {
    return {
      errors: [],
      intent: {
        displayName: '',
        trainingPhrases: []
      },
      trainingPhrase: ''
    }
  },
  watch: {
    'intent.displayName': function() {
      if (this.intent.displayName.length && this.errors.includes('intentName')) {
        const index = this.errors.indexOf('intentName')
        this.errors.splice(index, 1)
      }

      if (!this.intent.name.length && !this.errors.includes('intentName')) {
        this.errors.push('intentName')
      }
    }
  },
  created() {
    if (this.$route.params.intentId) {
      this.getIntent(this.$route.params.intentId)
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
        const index = this.errors.indexOf('intentName')
        this.errors.splice(index, 1)
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

      if (!this.intent.name.length) {
        this.errors.push('intentName')
      }

      if (!this.intent.trainingPhrases.length) {
        this.errors.push('trainingPhrase')
      }

      if (this.errors.length) {
        return false
      }
      if (this.$route.params.intentId) {
        updateIntent(this.intent, this.$route.params.intentId).then(response => {
          if (!response || !response.data || !response.data[0]) {
            return
          }

          this.intent = response.data[0]
        })
      } else {
        console.info('create intent')
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
