<template>
  <tr @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <td>{{ phrase.parts ? phrase.parts[0].text : phrase }}</td>
    <td class="text-right">
      <!-- @TODO put icon instead of "Delete text" -->
      <button v-show="isHovered" class="btn btn-outline-danger btn-sm" @click.prevent="deletePhrase">Supprimer</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ListPhrase',
  props: {
    phrase: { type: [Object, String], required: true }
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
