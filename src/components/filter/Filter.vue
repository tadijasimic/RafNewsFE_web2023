<script>
import {myAxios} from "@/config/api";
import {filterExpanded, selectedCategory, dateOrder, trending, pageSize, tagSearch} from "@/components/filter/filter";

export default {
  name: 'Filter',
  computed: {
    filterExpanded() {
      return filterExpanded
    },
    selectedCategory() {
      return selectedCategory
    },

    dateOrder() {
      return dateOrder
    },
    trending() {
      return trending
    },
    pageSize() {
      return pageSize
    },
    tagSearch() {
      return tagSearch
    }
  },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    toggleExpanded() {
      if (filterExpanded.value === null)
        filterExpanded.value = true
      else filterExpanded.value = !filterExpanded.value
      console.log(filterExpanded.value)
    },


    selectCategory(category) {
      selectedCategory.value = category
    },
    decreasePageSize() {
      if (pageSize.value > 1) {
        pageSize.value--;
      }
    },
    increasePageSize() {
      if (pageSize.value < 100)
        pageSize.value++;
    },
    toggleSortDirection() {

      dateOrder.value = dateOrder.value === 'asc' ? 'desc' : 'asc';
      console.log(dateOrder)
    },
    togleTrending() {
      trending.value = !trending.value
    },
    async loadCategories() {
      try {
        this.categories = (await myAxios.get('/categories/all')).data
        console.log(this.categories)

      } catch (error) {
        console.log(error.message)
      }
    }

  },
  mounted() {
    this.loadCategories()
    console.log(this.categories)
  }
};
</script>


<template>
  <div :class="{'filterOff' : filterExpanded.value === false}" class="filter">

    <!-- FILTER BUTTON -->
    <button :class="{ 'move-up': filterExpanded.value === false, 'move-down': filterExpanded.value === true }" class="filter-button"
            @click="toggleExpanded">
      <i class="fas fa-filter"></i>
    </button>

    <!-- Expanded content -->
    <transition name="filter-transition">

      <div v-if="filterExpanded.value">

        <!-- Search input -->
        <input v-model="tagSearch.value" placeholder="Search for Tags" type="text"/>


        <!-- Trending button -->
        <button class="trending-button" @click="togleTrending">
          <i class="fas fa-fire"></i>
          Trending
        </button>


        <!-- Dropdown menu -->
        <div class="dropdown">
          <button aria-expanded="false" class="btn btn-secondary dropdown-toggle filterComponent" data-bs-toggle="dropdown" type="button">
            {{ selectedCategory.value ? selectedCategory.value.name : 'Categories' }}
          </button>
          <ul id="dropMenu" class="dropdown-menu dropdown-menu-dark">
            <li>
              <a v-for="category in categories" class="dropdown-item active filterComponent" href="#"
                 @click="selectCategory(category)">{{ category.name }}</a>
            </li>

            <li><a class="dropdown-item" href="#">Separated link</a></li>
          </ul>
        </div>


        <!-- Page size control -->
        <div class="page-size">
          <label id="pageSizeLabel">Page Size</label>
          <button class="filterComponent" @click="decreasePageSize">
            <i class="fas fa-arrow-up"></i>
          </button>
          <span>{{ pageSize }}</span>
          <button class="filterComponent" @click="increasePageSize">
            <i class="fas fa-arrow-down"></i>
          </button>
        </div>

        <!-- Date filter -->
        <div class="filterComponent">
          <div>
            <span>Newest</span>
          </div>
          <div class="filter-option" @click="toggleSortDirection">
            <div :class="{ 'rotated': dateOrder.value === 'desc' }" class="date-sort-icon">
              <i class="fas fa-arrow-up-short-wide"></i>
            </div>
          </div>
          <div class="filter-option">
            <span>Oldest</span>
          </div>
        </div>


      </div>
    </transition>


  </div>
</template>


<style scoped>

.filter {
  position: fixed;
  right: 1rem;
  top: 3rem;
  width: 10rem; /* Adjust as needed */
  height: 23rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 1rem;
  box-shadow: 0.1rem 0.1rem 0.5rem #276749;
  font-size: 0.8rem;
}

.filterOff {
  background-color: transparent;
  color: white;
  box-shadow: none;
  z-index: 0;
}


.filter-button {
  font-size: 1.5rem;
  position: relative;
  width: 50px;
  height: 50px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: 1s;
}

.filter-button:hover {
  color: #00ff82;
  transform: scale(1.2);
}

.filter-button.move-down {
  bottom: 5rem;
  animation-name: moveButtonDown;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  color: #00ff82;

}

.filter-button.move-up {
  font-size: 1.5rem;
  position: fixed;
  bottom: 5rem;
  animation-name: moveButtonUp;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  color: #2f855a;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px #2f855a;;

}

@keyframes moveButtonUp {

  0% {
    transform: translateY(2rem);
  }

  100% {
    transform: translateY(-10rem);
    transition: ease-in;
  }
}

@keyframes moveButtonDown {

  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(26rem);
  }
}


.filter-transition-enter-active {
  animation: fadeIn 0.75s forwards;
}

.filter-transition-leave-active {

  animation: fadeOut 0.75s backwards;

}

.filter-transition-enter {
  animation: fadeIn 0.75s backwards;
}


@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    transition: 1s linear;
    opacity: 1;
  }
}


@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    transition: 1s linear;
    opacity: 0;
  }
}


.page-size button {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;

}


.date-sort-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: transparent;
  transition: transform 0.3s ease-out;
}

.date-sort-icon.rotated {
  transform: rotate(180deg);
}


.filterComponent {
  text-shadow: #2c3e50;
  background-color: white;
  color: green;
  transition: border-color 0.6s linear;
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  margin: auto;
  justify-content: center;
  border-radius: 1rem;
}

span {
  margin: auto;
}

.filter {
  margin: auto;
}

.filterComponent:hover {
  border: 3px solid #6affc2; /* Default border color */
  transition: transform 0.4s linear;
  transform: scale(1.05);
}
</style>
