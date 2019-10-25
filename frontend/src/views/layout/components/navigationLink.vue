<template>
  <li class="nav-item">
    <router-link :to="route" class="nav-link p-3">
      <span v-if="name && name.length">{{ name }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'NavigationLink',
  props: {
    icon: { type: String, default: '' },
    name: { type: String, default: '' },
    route: { type: String, required: true }
  }
}
</script>

<style lang="css">
.nav-link,
.fa-icon {
  color: #fff;
}
.nav-link:hover .fa-icon {
  color: #bababa;
}
.nav-link:hover,
a:hover {
  text-decoration: none;
  color: #fff;
}
</style>
