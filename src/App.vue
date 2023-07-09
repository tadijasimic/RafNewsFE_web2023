<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import {sidebarWidth} from "@/components/sidebar/sidebar";
import {endSession, beginSession, currSession, roles} from "@/config/session";
import {watch} from "vue";


export default {
  name: 'App',
  methods: {currSession, watch},
  data() {
    return {}
  },
  computed: {
    roles() {
      return roles
    },
    endSession() {
      return endSession;
    },
    beginSession() {
      return beginSession()
    }
  },
  components: {Sidebar},
  setup() {
    return {sidebarWidth, currSession, endSession, beginSession};
  },

};
</script>
<!-- app view port -->
<template>
  <!-- sidebar -->
  <Sidebar/>

  <!-- route pages view port -->
  <div :style="{'margin-left': sidebarWidth}" class="routerView">
    <router-view/>
  </div>

</template>


<style>

@import '../node_modules/@fortawesome/fontawesome-free/css/all.css';


.sessionInfo {
  color: #2f855a;
  position: fixed;
  top: 0;
  z-index: 9999;
  font-size: 1.1rem;
  right: 1rem;

}

html {
  font-size: 35px; /* Set a base font size */
}

.blue-underline {
  color: #3570e8;
  text-decoration: underline;
}

.blue-underline:hover {
  cursor: pointer;
  color: rgba(0, 19, 156, 0.99);


}

.my-divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: none;
  display: block;
  border-top: 0.15rem solid black;
  width: 100%;
}


#currentUserIcon {

  padding: 0.5rem;
}

</style>