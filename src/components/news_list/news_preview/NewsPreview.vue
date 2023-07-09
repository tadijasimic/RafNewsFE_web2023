<script>

import {myAxios} from "@/config/api";
import {isTrending} from "@/components/filter/filter";
import {currSession, getRoles} from "@/config/session";
import newsList from "@/components/news_list/NewsList.vue";

export default {
  name: "NewsPreview",

  props: {
    news: {
      type: Object,
      required: true
    },
    newsList: {
      type: [],
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
    isTrending,
    getRoles,
    currSession,
    async loadComments() {
      if (this.commentsExpanded) {
        this.commentsExpanded = false
      } else {
        this.news.visited++
        await myAxios.post('/news/visitCount/' + this.news.id)
        this.comments = (await myAxios.get('/comments/onNews/' + this.news.id)).data
        this.commentsExpanded = true
      }
    },
    async deleteMe() {
      const index = this.newsList.findIndex(item => item.id === this.news.id);
      if (index !== -1) {
        console.log('news/' + this.news.id)
        if (currSession() && newsList) {
          await myAxios.delete('/news/id/' + this.news.id)
          this.newsList.splice(index, 1);
        }
      }
    },
    async editMe() {

    }

  },
  computed(trending) {
    return {trending}
  }
}
</script>

<template>
  <div id="contentHolder">

    <div class="previewHeader">

      <div v-if="isTrending() && isTrending() === true">

        <i :class="{
        'bigFire': news.visited > 1000,
        'midFire': (news.visited > 100 )&& (news.visited <= 1000),
        'smallFire': news.visited <= 100}" class="fas fa-fire"></i>
        <span class="visited">{{ news.visited }}</span>

      </div>

      <div v-if="currSession()" class="manipulationButtonWrapper">

        <button v-if="currSession().role === 'ADMIN' || currSession().id === news.author.id" class="manipulationButton" @click="deleteMe"><i
            class="fas fa-trash"/></button>

        <button v-if="currSession().role === getRoles().admin" class="manipulationButton"
                @click="editMe">
          <i class="fas fa-file-pen"/>
        </button>

      </div>

    </div>

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
        <a v-if="news.content.length >= 200" class="blue-underline"
           @click.stop="()=>{contentExpanded = !contentExpanded}">
          {{ contentExpanded ? 'read less' : 'read more' }}</a>

      </p>


      <hr class="my-divider"/>

      <transition enter-active-class="slide-enter-active" leave-active-class="slide-leave-active" name="slide">
        <div v-if="commentsExpanded" id="commentsSection">
        <span v-for="curr in comments" :key="curr.id" class="comment">
          {{ curr.author.firstName }} {{ curr.author.lastName }} commented: "{{ curr.content }}"
        </span>

        </div>
      </transition>
    </div>

  </div>
</template>


<style>

#contentHolder {
  padding: 1rem;
  border: solid #276749 0.15rem;
  border-radius: 0.75rem;
  background-color: #cde9d8;
  border-top-left-radius: 2.3rem;
}

.news-preview {
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem #276749;
  padding: 2rem;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  margin-bottom: 1.5rem;
  background-color: white;
}

.news-preview:hover {
  background-color: #cde9d8;
  transform: scale(1.03);
}

h4, h6, p {
  text-align: left;
  flex: 1;
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
  transition: transform 0.05s ease-in-out;
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

.slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-enter-active {
  opacity: 1;
  transform: translateY(0);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.category-holder {
  text-shadow: #2c3e50;
  display: inline-block;
  background-color: #2f855a;
  border-radius: 6px;
  color: white;
  padding: 0.25rem;
  margin-left: 0.8rem;
  transition: border-color 0.3s ease-in-out;
}

.category-holder:hover {
  border: 3px solid #6affc2; /* Default border color */
  transition: transform 0.2s ease-in-out;
  transform: scale(1.15);
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


.right-alignment {
  text-align: right;
  flex: 1;
  padding-left: 10px;
}


#creationTime {
  font-size: 0.7rem;
}

#author {
  font-size: 0.9rem;
  font-weight: bolder;
}

.visited {
  font-size: 0.9rem;
  padding: 0.2rem;
}


.bigFire {
  background: linear-gradient(to right, #ff0000, #e57c30);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.25rem;
}

.previewHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.midFire {
  background: linear-gradient(to right, #e57c30, #f0ff25);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.75rem;
}

.smallFire {
  background: linear-gradient(to right, #f0ff25, #407cd7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.25rem;
}

.manipulationButtonWrapper {
  display: flex;
  gap: 1rem; /* Adjust the gap between the buttons */
}

.manipulationButton {
  border: none;
  background-color: transparent;
  color: #2f855a;
  font-size: 1.1rem;
}

.manipulationButton:hover {
  transition: transform 0.5s ease-in-out;

  transform: rotate(360deg);


}
</style>
