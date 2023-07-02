<script>

import NewsPreview from "@/components/news_preview/NewsPreview.vue";
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

    </span>
  </div>
</template>

<style scoped>


.newsList {
  justify-content: center;
  width: 50vw;
  margin: auto;
}

.newsList span:hover {
  border-radius: 10px;
  box-shadow: 4px 4px 15px #276749;
  margin-bottom: 2.5vh;
  text-align: center;
  cursor: pointer;
}

.newsList span:hover {
  background-color: #cde9d8;
  transform: scale(1.03);
}


</style>