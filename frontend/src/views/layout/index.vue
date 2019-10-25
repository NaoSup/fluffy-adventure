<template>
  <div class="container p-0 m-0 w-100 ma">
    <div class="row p-0 m-0">
      <div id="sidebar" class="col-2 p-1">Sidebar</div>
      <div class="col-10 p-2"><router-view /></div>
    </div>
  </div>
</template>

<script>
import NavigationLink from './components/NavigationLink'
export default {
  name: 'Layout',
  components: { NavigationLink }
}
</script>

<style lang="css">
.container {
  max-width: 1600px;
}
#sidebar {
  background-color: #eee;
}
</style>
