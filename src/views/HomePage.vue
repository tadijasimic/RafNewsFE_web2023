<script>

import 'material-icons/iconfont/material-icons.css';
import NewsList from "@/components/news_list/NewsList.vue";


export default {
  name: "HomePage",
  components: {NewsList},

}

</script>

<template>
  <NewsList api="http://localhost:8080/micaga/api/news/all"/>
</template>


<style scoped>


</style>