<script>

import 'material-icons/iconfont/material-icons.css';
import NewsList from "@/components/news_list/NewsList.vue";
import Filter from "@/components/filter/Filter.vue";
import {currSession, roles} from "@/config/session";


export default {
  name: 'HomePage',
  computed: {
    roles() {
      return roles
    }
  },
  methods: {currSession},
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
    <label v-if="currSession()" class="sessionInfo">
      <i :class="{
        'fas fa-user-tie': currSession().role === roles.contentCreator,
        'fa fa-user-shield': currSession().role === roles.admin,
         'fa fa-user-secret': currSession().role === roles.contentViewer}"
         class="icon"/>
      {{ ' ' + currSession().firstName + ' ' + currSession().lastName }}
    </label>
  </div>
</template>

<style scoped>


</style>
