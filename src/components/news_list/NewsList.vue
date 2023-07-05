<script>

import NewsPreview from "@/components/news_list/news_preview/NewsPreview.vue"
import {dateOrder, filterExpanded, pageSize, selectedCategory, trending} from "@/components/filter/filter"
import {myAxios} from "@/config/api"
import {watch} from "vue";

export default {
  name: "NewsList",
  components: {NewsPreview},
  data() {
    return {
      news: [],
      pageIndex: 1,
      pageSize: 10,

    }
  },
  computed: {
    filterExpanded() {
      return filterExpanded.value;
    },
    selectedCategory() {
      return selectedCategory.value;
    },
    dateOrder() {
      return dateOrder.value;
    },
    trending() {
      return trending.value;
    },
    pageSize() {
      return pageSize.value;
    }
  },

  methods: {
    buildFilterQuery() {
      let query = 'category=' + selectedCategory.value.id + '&date=' + dateOrder.value + '&trending'
    },
    async loadNews() {
      try {
        // Perform asynchronous operations
        if (filterExpanded.value === false) {
          this.news = (await myAxios.get('/news/all')).data
        } else {
          this.news = []
          console.log('MAJMUNCINAAAAAAAAAAAAAAa')
        }
        console.log(this.news)
      } catch (error) {
        // Handle any errors that occur
        console.error(error.message)
      }
    },
    setPageSize(pageSize) {
      this.pageIndex = pageSize;
    }
  },
  mounted() {
    this.loadNews()
    console.log(this.news)
  },
  setup() {
    watch([filterExpanded, selectedCategory, dateOrder, trending, pageSize], () => {
      if (filterExpanded.value) {
      }

    })
  },

}
</script>

<template>
  <div :class="{'filterExpansion': filterExpanded.value === true}" class="newsList">

    <NewsPreview v-for="curr in news" :key="curr.id" :news="curr"/>
    <span>

    </span>
  </div>
</template>

<style scoped>


.newsList {
  width: 31rem;
  flex: 0;
  margin-left: 3rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.filterExpansion {
  margin-left: 1rem;
  width: 30rem;
}


</style>