<template>
  <div class="container p-0 m-0 w-100 main">
    <div class="row p-0 m-0">
      <div id="sidebar-container" class="col-2 p-1">
        <nav id="sidebar" class="content-left-sidebar d-none d-md-block sidebar">
          <ul class="nav w-100 flex-column list-group sticky-top sticky-offset">
            <navigation-link name="Intents" route="/intents" />
            <navigation-link name="Actions" route="/actions" />
            <navigation-link name="Tickets" route="/tickets" />
          </ul>
        </nav>
      </div>
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
.main {
  height: 100%;
}
#sidebar-container {
    background-color: #38405F;
  border-color: #38405F;
  color: #8B939C;
  padding: 0;
  position: sticky;
}
a.router-link-active {
  background-color: #59546C;
  color: #fff;
}
</style>
