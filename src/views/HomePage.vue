<script>

import axios from "axios";
import NewsPreview from "@/components/news_preview/NewsPreview.vue";


export default {
  name: "HomePage",
  components: {NewsPreview},
  methods: {
    async loadNews(pageIndex, pageSize) {
      try {
        // Perform asynchronous operations
        this.news = (await axios.get('http://localhost:8080/micaga/api/news/all')).data
        console.log(this.news)
      } catch (error) {
        // Handle any errors that occur
        console.error(error)
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
    this.loadNews(1, 2)
  }
}

</script>

<template>
  <div class="newsList">
    <NewsPreview v-for="curr in news" :key="curr.id" :news="curr"/>
    <h1>I belive in chrisna CHriSt</h1>
    <button class="my.button" @click="loadNews(4,4)">

    </button>
  </div>


</template>

<style scoped>
.newsList {
  justify-content: center;
  width: 60%;
  margin: auto;
}
</style>