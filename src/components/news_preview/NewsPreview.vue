<script>

import axios from "axios";

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
      commentsExpanded: false,
      contentExpanded: false,
      comments: []
    }
  },
  methods: {
    async loadComments() {
      if (this.commentsExpanded) {
        this.commentsExpanded = false
      } else {
        this.comments = (await axios.get('http://localhost:8080/micaga/api/comments/onNews/' + this.news.id)).data
        this.commentsExpanded = true
      }
    }

  },
  computed(news) {
  }
}
</script>

<template>
  <div class="news-preview" @click="loadComments">

    <div class="flex-column">

      <div class="flex-row">

        <h5 id="title">{{ news.title }}</h5>
        <div class="right-alignment">
          <span class="category-holder">{{ news.category.name }}</span>

        </div>

      </div>
      <span id="creationTime">{{ news.creationTime }}</span>


      <h6 id="author"> by {{ news.author.firstName }} {{ news.author.lastName }}</h6>


    </div>


    <p id="content">
      {{ contentExpanded ? news.content : news.content.slice(0, 200) + '...' }}
      <a v-if="news.content.length >= 200" class="a"
         @click.stop="()=>{contentExpanded= !contentExpanded}">
        {{ contentExpanded ? 'read less' : 'read more' }}</a>
    </p>


    <hr class="divider"/>

    <transition enter-active-class="slide-enter-active" leave-active-class="slide-leave-active" name="slide">
      <div v-if="commentsExpanded" id="commentsSection">
        <span v-for="curr in comments" :key="curr.id" class="comment">
          {{ curr.author.firstName }} {{ curr.author.lastName }} commented: "{{ curr.content }}"
        </span>
        <span class="loadMoreNews">

        </span>
      </div>
    </transition>
  </div>


</template>


<style>

.news-preview {
  border-radius: 10px;
  box-shadow: 4px 4px 15px #276749;
  margin: 5vh 0 5vh 0;
  padding: 5vh;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
}

h4, h6, p {
  text-align: left;
  flex: 1;
}


.news-preview:hover {
  background-color: #cde9d8;
  transform: scale(1.03);
}


.comment {
  display: block;
  text-align: center;
  padding: 10px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  font-size: 0.7rem;
  border-radius: 10px;
}

.comment:hover {
  transition: transform 0.2s ease-in-out;
  transform: scale(1.05);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}

.slide-enter {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-enter-active {
  opacity: 1;
  transform: translateY(0);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-row * {
  align-items: center;
  justify-content: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
}


div {
  margin-bottom: 2vh;
}

.divider {
  margin: 1rem 0;
  border: none;
  border-top: 1px solid #ccc;
  width: 100%;
  border-top: 2px solid #333; /* Update the border color and thickness */
}

.right-alignment {
  text-align: right;
  flex: 1;
  padding-left: 10px;
}

.category-holder {
  background-color: #2f855a;
  font-family: "Harlow Solid Italic", serif;
  border-radius: 6px;
  color: white;
  padding: 3px;
}

a {
  font-size: 0.75rem;
  color: blue;
  text-decoration: underline;
}

#creationTime {
  font-size: 0.8rem;

}

#author {
  font-size: 0.9rem;
  font-weight: bolder;

}
</style>
