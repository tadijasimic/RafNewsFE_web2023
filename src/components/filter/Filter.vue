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

      filterExpanded.value = !filterExpanded.value
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
    toggleTrending() {
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

        <hr class="hr"/>

        <!-- Trending button -->
        <button :class="{'trendingOn': trending.value}" class="filterComponent" @click="toggleTrending">
          <i class="fas fa-fire"></i>
          Trending
        </button>

        <hr class="hr"/>

        <!-- Dropdown menu -->
        <div class="filterComponent">

          <select aria-label="size 3 select example" class="form-select" size="2">
            <option selected>{{ selectedCategory.value ? selectedCategory.value.name : 'Categories' }}</option>
            <option v-for="category in categories" @click="selectCategory(category)">{{ category.name }}</option>
          </select>
        </div>

        <!--<div class="filterComponent">
          <button aria-expanded="false" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" type="button">
            {{ selectedCategory.value ? selectedCategory.value.name : 'Categories' }}
          </button>
          <ul id="dropMenu" class="dropdown-menu dropdown-menu-lg-start">
            <li>
              <a v-for="category in categories" class="dropdown-item active" href="#"
                 @click="selectCategory(category)"
              >{{ category.name }}</a>
            </li>
            <li><a class="dropdown-item" @click="()=>selectCategory.value = null"></a></li>
          </ul>
        </div>-->

        <hr class="hr"/>

        <!-- Page size control -->
        <div class="page-size">
          <span class="filterSetting">Page_Size</span>
          <button class="filterComponent" @click="increasePageSize">
            <i class="fas fa-arrow-up"></i>
          </button>
          <span class="filterSetting">{{ pageSize }}</span>
          <button class="filterComponent" @click="decreasePageSize">
            <i class="fas fa-arrow-down"></i>
          </button>
        </div>

        <hr class="hr"/>

        <!-- Date filter -->
        <div class="filterComponent" @click="toggleSortDirection">
          <div>
            <span>Newest</span>
          </div>

          <div :class="{ 'rotated': dateOrder.value === 'desc' }" class="date-sort-icon">
            <i class="fas fa-arrow-up-short-wide"></i>
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
  right: 0.5rem;
  top: 2rem;
  width: 10rem;
  height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 0.7rem #276749;
  font-size: 0.8rem;
  background-color: #cde9d8;
}

.filterOff {
  background-color: transparent;
  color: white;
  box-shadow: none;
  width: 7rem;
}


.filter-button {
  font-size: 1.5rem;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s;
  border-radius: 50%;
}


.filter-button.move-down {
  bottom: 5rem;
  animation-name: moveButtonDown;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  color: #2f855a;
  background-color: transparent;
  width: 2.5rem;
  height: 2.5rem;

}


.filter-button.move-up {
  font-size: 1.5rem;
  position: fixed;
  bottom: 5rem;
  animation-name: moveButtonUp;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  color: white;
  background-color: #2f855a;

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
    transform: translateY(15rem);
  }
  100% {
    transform: translateY(30rem);
    transition: ease-in;

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

.filterSetting {
  font-size: 0.8rem;
  height: 50px;
  border: 0;
  margin: auto;
  width: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  background-color: white;
  color: #276749;
  transition: border-color 0.6s linear;
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  margin: auto;
  justify-content: center;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
}


.filterComponent:hover {
  border: 3px solid #6affc2;
  transition: transform 0.2s linear;
  transform: scale(1.07);

}

.trendingOn {
  background-color: #276749;
  color: white;
}

#dropMenu {
  position: relative;
}

.hr {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

</style>
