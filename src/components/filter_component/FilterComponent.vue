<template>
  <div>
    <b-button v-b-toggle.collapse1>Toggle</b-button>

    <b-collapse id="collapse1">
      <!-- Content to toggle -->
      <p>This content will be toggled</p>
    </b-collapse>

    <b-dropdown id="dropdown1" text="Select Category" variant="primary">
      <b-dropdown-item>Category 1</b-dropdown-item>
      <b-dropdown-item>Category 2</b-dropdown-item>
      <b-dropdown-item>Category 3</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>

import {BButton, BCollapse, BDropdown, BDropdownItem} from "bootstrap-vue";

export default {
  name: 'FilterComponent',
  components: {
    BButton,
    BCollapse,
    BDropdown,
    BDropdownItem,
  },
};
</script>

<style>
/* Add any custom styling here */
</style>
