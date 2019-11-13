<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.clickable {
  cursor: pointer;
}
html,
body,
#app {
  height: 100%;
  background-color: #eee;
}

.btn-primary {
  background-color: #14a098;
  border-color: #14a098;
  color: #eee;
}
.btn-primary:hover {
  background-color: #14aa99;
  border-color: #14aa99;
}

.badge-primary {
  background-color: #14a098;
  border-color: #14a098;
}
.text-primary {
  color: #14a098 !important;
}
</style>
