<script>
import SidebarLink from './SidebarLink.vue'
import {collapsed, sidebarWidth, toggleSidebar} from './sidebar_state'
import {currSession} from "@/config/session";

export default {
  methods: {currSession},
  props: {},
  components: {SidebarLink},
  setup() {
    return {collapsed, toggleSidebar, sidebarWidth}
  },

}
</script>

<template>
  <div :style="{ width: sidebarWidth }" class="sidebar">
    <div>
      <h4>
        <span v-if="!collapsed">Raf_News</span>
        <span v-else>RN</span>
      </h4>
      <SidebarLink icon="fas fa-home" to="/">Home</SidebarLink>
      <SidebarLink icon="fas fa-users" to="/users">Users</SidebarLink>
      <SidebarLink icon="fas fa-newspaper" to="/createNews">Publish</SidebarLink>
      <SidebarLink icon="fas fa-rectangle-list" to="/categories">Categories</SidebarLink>
      <SidebarLink v-if="!currSession()" icon=" fas fa-right-to-bracket" to="/login">Login</SidebarLink>
      <SidebarLink v-if="currSession()" icon=" fas fa-right-from-bracket" to="/logout">Log out</SidebarLink>
    </div>

    <!-- Split dropend button -->


    <span
        :class="{ 'rotate-180': collapsed }"
        class="collapse-icon"
        @click="toggleSidebar">

      <i class="fas fa-angle-double-left"/>
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #49ffa2;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
@import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';

.sidebar {
  color: white;
  background-color: #2f855a;
  height: 100vh;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  width: v-bind(sidebarWidth);
}

.btn-group {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;

  color: white;
  text-decoration: none;
}

.btn-group:hover {
  background-color: var(--sidebar-item-hover);
}

.btn-group {
  background-color: var(--sidebar-item-active);
}

.btn-group .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}

.sidebar h4 {
  font-weight: 1000;
  border-radius: 0.5rem;
  padding: 0.2rem;
  box-shadow: 4px 4px 20px black;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.5s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.5s linear;
}
</style>