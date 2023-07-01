<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";

import {sidebarWidth} from '@/components/sidebar/sidebar_state.js'

export default {
  components: {Sidebar},
  setup() {
    return {sidebarWidth}
  }
}

</script>

<template>

  <Sidebar/>

  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view/>
  </div>

</template>


<style>


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>