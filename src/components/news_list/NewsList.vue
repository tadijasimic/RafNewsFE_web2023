<script>

import NewsPreview from "@/components/news_list/news_preview/NewsPreview.vue";
import {expanded} from "@/components/filter/filter";
import {myAxios} from "@/config/api";

export default {
  name: "NewsList",
  computed: {
    expanded() {
      return expanded
    }
  },
  props: {
    api: {
      type: String, required: true
    }
  },
  components: {NewsPreview},

  methods: {
    async loadNews(pageIndex, pageSize) {
      try {
        // Perform asynchronous operations
        this.news = (await myAxios.get(this.api)).data
        console.log(this.news)
      } catch (error) {
        // Handle any errors that occur
        console.error(error.message)
      }
    },
    setPageSize(pageSize) {
      this.pageIndex = pageSize;
    }
  }
  ,
  data() {
    return {
      news: [],
      pageIndex: 1,
      pageSize: 10,

    }
  },
  /*setup() {
    return (filter)
  },*/
  mounted() {
    this.loadNews(1, 2)
    console.log(this.news)
  }
}
</script>

<template>
  <div :class="{'filterExpansion': expanded.value === true}" class="newsList">

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