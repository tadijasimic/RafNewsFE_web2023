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
    <h1>
      <span v-if="!collapsed">Raf_News</span>
      <span v-else>RN </span>
    </h1>

    <SidebarLink icon="fas fa-home" to="/home">Home</SidebarLink>
    <SidebarLink icon="fas fa-columns" to="/">Dashboard</SidebarLink>
    <SidebarLink icon="fas fa-chart-bar" to="/">Analytics</SidebarLink>
    <SidebarLink icon="fas fa-users" to="/">Friends</SidebarLink>
    <SidebarLink icon="fas fa-image" to="/">Images</SidebarLink>

    <span
        :class="{ 'rotate-180': collapsed }"
        class="collapse-icon"
        @click="toggleSidebar"
    >
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

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>