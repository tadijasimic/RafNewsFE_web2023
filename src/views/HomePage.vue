<script>

import 'material-icons/iconfont/material-icons.css';
import NewsList from "@/components/news_list/NewsList.vue";
import Filter from "@/components/filter/Filter.vue";


export default {
  name: 'HomePage',
  //displayName: 'HomePage',
  components: {NewsList, Filter},

}

</script>

<template>
  <div class="flex-container">
    <div class="news-list">
      <NewsList/>
    </div>
    <Filter/>

  </div>
</template>

<style>


</style>
