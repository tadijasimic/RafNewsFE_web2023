<script>

import NewsPreview from "@/components/news_list/news_preview/NewsPreview.vue";
import axios from "axios";

export default {
  name: "NewsList",
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
        this.news = (await axios.get(this.api)).data
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
  mounted() {
    console.log('THE LOGSSSSS')
    this.loadNews(1, 2)

  }
}
</script>

<template>
  <div class="newsList">
    <NewsPreview v-for="curr in news" :key="curr.id" :news="curr"/>
    <span>
      <i/>
    </span>
  </div>
</template>

<style scoped>


.newsList {
  justify-content: center;
  width: 35rem;
  margin: auto;
}


</style>