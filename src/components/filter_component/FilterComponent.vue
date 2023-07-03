<template>
  <div>
    <button @click="toggleCollapse">Toggle</button>

    <div v-if="isCollapsed">
      <!-- Content to toggle -->
      <p>This content will be toggled</p>
    </div>

    <div class="dropdown">
      <button class="dropdown-toggle" type="button" @click="toggleDropdown">
        {{ selectedCategory || 'Select Category' }}
      </button>
      <ul v-if="isDropdownOpen" class="dropdown-menu">
        <li v-for="category in categories" :key="category" @click="selectCategory(category)">
          {{ category }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComponent',
  data() {
    return {
      isCollapsed: false,
      isDropdownOpen: false,
      selectedCategory: null,
      categories: ['Category 1', 'Category 2', 'Category 3'],
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.isDropdownOpen = false;
    },
  },
};
</script>

<style scoped>
/* Add any custom styling here */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  display: none;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}

.dropdown-menu.show {
  display: block;
}
</style>
