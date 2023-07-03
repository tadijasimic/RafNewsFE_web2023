<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import {collapsed} from './sidebar_state.js'

export default {
  name: 'SidebarLink',
  props: {
    to: {type: String, required: true},
    icon: {type: String, required: true}
  },//???????????????????????????????????????????????Todo:pitaj...
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    return {isActive, collapsed}
  }
}
</script>

<template>

  <router-link :class="{ active: isActive }" :to="to" class="link">
    <i :class="icon" class="icon"/>
    <transition name="fade">
      <span v-if="!collapsed" class="item">
        <slot/>
      </span>
    </transition>
  </router-link>
</template>

<style scoped>
@import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';

.fade-enter-active {
  animation: fadeIn 1s forwards;
}

.fade-leave-active {

  animation: fadeOut 0.5s backwards;

}

.fade-enter {
  animation: fadeIn 1s forwards;
}

.fade-leave-to {
  animation: fadeOut 0.5s backwards;

}

.item {
  flex: 1;
  padding-left: 2vw;
}

@keyframes fadeIn {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    display: none;
  }
}


.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 1000;
  user-select: none;

  padding: 0.4em;
  border-radius: 0.25em;

  color: white;
  text-decoration: none;
}

.link:hover {
  background-color: var(--sidebar-item-hover);
}

.link.active {
  background-color: var(--sidebar-item-active);
}

.link .icon {
  font-size: 1.3rem;
  align-items: center;
  margin-left: 0;
}
</style>