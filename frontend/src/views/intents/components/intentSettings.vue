<template>
  <div class="row">
    <div class="col-10 offset-1">
      <div class="row p-2 pt-3 mb-3 head">
        <div class="col-6 pl-3">
          <button class="btn btn-secondary" @click.prevent="returnToList">Return</button>
        </div>
        <div class="col-6 text-right">
          <button class="btn btn-primary" @click.prevent="save">Save</button>
        </div>
      </div>
      <div class="form p-2 pl-3 pr-3">
        <div class="form-group">
          <input
            id="intentName"
            v-model="intent.name"
            :class="{ invalid: errors.includes('intentName') }"
            type="text"
            class="form-control"
            placeholder="Intent name"
          />
          <div v-if="errors.includes('intentName')" class="error absolute text-danger">Please enter an intent name</div>
        </div>
        <div class="form-group">
          <h3>Training Phrases</h3>
          <p>Phrases you can expect from the users, that will trigger the intent</p>
          <input
            id="trainingPhrase"
            v-model="trainingPhrase"
            :class="{ invalid: errors.includes('trainingPhrase') }"
            type="text"
            class="form-control"
            placeholder="Add a phrase"
            @keyup.enter="addTrainingPhrase"
          />
          <div v-if="errors.includes('trainingPhrase')" class="error absolute text-danger">
            Please add at least one training phrase
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
            <div v-else><small class="font-italic pl-2">No training phrase added yet...</small></div>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrainingPhrase from './trainingPhrase'
export default {
  name: 'IntentSettings',
  components: { TrainingPhrase },
  data() {
    return {
      errors: [],
      intent: {
        name: '',
        trainingPhrases: []
      },
      trainingPhrase: ''
    }
  },
  watch: {
    'intent.name': function() {
      if (this.intent.name.length && this.errors.includes('intentName')) {
        const index = this.errors.indexOf('intentName')
        this.errors.splice(index, 1)
      }

      if (!this.intent.name.length && !this.errors.includes('intentName')) {
        this.errors.push('intentName')
      }
    }
  },
  methods: {
    addTrainingPhrase() {
      if (this.trainingPhrase.length) {
        this.intent.trainingPhrases.push(this.trainingPhrase)
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
      console.info('save')
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
