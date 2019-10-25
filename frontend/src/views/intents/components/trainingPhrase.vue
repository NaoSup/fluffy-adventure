<template>
  <tr @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <td>{{ phrase }}</td>
    <td class="text-right">
      <!-- @TODO put icon instead of "Delete text" -->
      <button v-show="isHovered" class="btn" @click.prevent="deletePhrase">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TrainingPhrase',
  props: {
    phrase: { type: String, required: true }
  },
  data() {
    return {
      isHovered: false
    }
  },
  methods: {
    deletePhrase() {
      if (this.isHovered) {
        this.$emit('delete')
        return
      }
    }
  }
}
</script>
