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
  border-radius: 10px;
  border: 2px solid black;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 5vh;
}
</style>