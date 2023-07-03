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


html {
  font-size: 35px; /* Set a base font size */
}

.blue-underline {
  color: #3570e8;
  text-decoration: underline;
}

.blue-underline:hover {
  cursor: pointer;
  color: #00139c;


  .divider {
    margin: 1rem 0;
    border: none;
    border-top: 1px solid #ccc;
    width: 100%;
    border-top: 2px solid #333; /* Update the border color and thickness */
  }
}
</style>