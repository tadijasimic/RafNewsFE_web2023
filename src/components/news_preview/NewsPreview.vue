<script>

export default {
  name: "NewsPreview",

  props: {
    news: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false
    }
  }

}
</script>

<template>
  <div v-if="!expanded" class="news-preview">
    <h2 id="title">{{ news.title }}</h2>
    <p id="content">{{ news.contentPreview }}</p>
    <h4 id="author">{{ news.author.name }} {{ news.author.surname }}</h4>
  </div>
</template>


<style>

.news-preview {
  display: flex;
  text-align: center;

}
</style>