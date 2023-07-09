<script>
import NewsPreview from "@/components/news_list/news_preview/NewsPreview.vue"
import {dateOrder, filterExpanded, pageSize, selectedCategory, trending} from "@/components/filter/filter"
import {myAxios} from "@/config/api"
import {ref, watch} from "vue"
import {collapsed} from "@/components/sidebar/sidebar"

export default {
  name: "NewsList",
  methods: {
    incrementPageIndex() {
      console.log(this.pageIndex)
      this.pageIndex++
    }
  },
  computed: {
    collapsed() {
      return collapsed
    },
    filterExpanded() {
      return filterExpanded
    }
  },
  components: {NewsPreview},
  setup() {
    const pageIndex = ref(1)
    const news = ref([])

    async function loadNews() {
      try {
        if (filterExpanded.value === false) {
          news.value = (await myAxios.get('/news/all')).data
        } else {
          const categoryId = selectedCategory.value !== null ? selectedCategory.value.id : -1
          news.value = (await myAxios.get(`/news/filter/${categoryId}/${trending.value}/${dateOrder.value}/${pageIndex.value}/${pageSize.value}`)).data
        }
        console.log(news.value)
      } catch (error) {
        console.error(error.message)
      }
    }

    watch([filterExpanded, selectedCategory, dateOrder, trending, pageSize], async () => {
      await loadNews()
    })

    watch(pageIndex, async () => {
      await loadNews()
    })

    loadNews()

    return {pageIndex, news}
  },
}
</script>


<template>
  <div :class="{'filterExpansion': filterExpanded.value === true,
   'sidebarCollapsed': collapsed.value}" class="newsList">

    <NewsPreview v-for="curr in news" :key="curr.id" :news="curr" :news-list="news"/>
    <span v-if="filterExpanded.value === true" id="nextPage" @click="incrementPageIndex">
    <i class="fas fa-diagram-next nextPageIcon"/>
    </span>
  </div>
</template>

<style scoped>
.newsList {
  width: 42rem;
  flex: 0;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  margin-left: 2rem;
  margin-right: auto;
}

.filterExpansion {
  width: 38rem;
}

.sidebarCollapsed {
  width: 47rem;
}

.filterExpansion.sidebarCollapsed {
  width: 43rem;
}

#nextPage {
  color: white;
  width: 100%;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: #cde9d8;
  cursor: pointer;
  border: solid 0.15rem #2f855a;
  font-size: 2rem;
  margin: auto;
  display: flex;
  flex: 1;
  align-items: center;

}

#nextPage:hover {
  background-color: #2f855a;


}

.nextPageIcon {
  margin: auto;
}
</style>
