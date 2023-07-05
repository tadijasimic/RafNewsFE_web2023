<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import {sidebarWidth} from "@/components/sidebar/sidebar_state";
import {endSession, beginSession, currSession, roles} from "@/config/session";
import {watch} from "vue";


export default {
  name: 'App',
  methods: {currSession, watch},
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
    return {sidebarWidth, beginSession, endSession};
  }
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
  <label v-if="currSession()" class="sessionInfo">
    <i :class="{ 'fas fa-user-tie': currSession().role === roles.contentCreator,'fa fa-user-shield': currSession().role === roles.admin }"
       class="icon"/>
    {{ ' ' + currSession().firstName + ' ' + currSession().lastName }}
  </label>


</template>


<style>

@import '../node_modules/@fortawesome/fontawesome-free/css/all.css';


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

.stage {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.sessionInfo {
  color: #2f855a;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  font-size: 1.1rem;
}

#currentUserIcon {

  padding: 0.5rem;
}

</style>