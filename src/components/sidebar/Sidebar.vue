<script>
import SidebarLink from './SidebarLink.vue'
import {collapsed, sidebarWidth, toggleSidebar} from './sidebar_state'

export default {
  props: {},
  components: {SidebarLink},
  setup() {
    return {collapsed, toggleSidebar, sidebarWidth}
  }
}
</script>

<template>
  <div :style="{ width: sidebarWidth }" class="sidebar">
    <h3>
      <span v-if="!collapsed">Raf_News</span>
      <span v-else>RN</span>
    </h3>

    <SidebarLink icon="fas fa-home" to="/home">Home</SidebarLink>
    <SidebarLink icon="fas fa-columns" to="/users">Users</SidebarLink>
    <SidebarLink icon=" fas fa-right-to-bracket" to="/login">Login</SidebarLink>
    <SidebarLink icon="fas fa-users" to="/">Friends</SidebarLink>
    <SidebarLink icon="fas fa-image" to="/">Images</SidebarLink>

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
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
@import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';

.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

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

.sidebar h3 {
  border-radius: 5px;
  padding-top: 4px; /* Adds 10 pixels of padding to the top */
  padding-bottom: 4px;
  padding-left: 2px;

  box-shadow: 4px 4px 10px black;
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