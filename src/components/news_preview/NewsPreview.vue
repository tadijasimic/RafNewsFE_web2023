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
      expanded: false,

    }
  },
  methods: {
    async expand() {
      if (!this.expanded) {
        try {
          let comments = (await axios.get('http://localhost:8080/micaga/api/comments/onNews/' + this.news.id)).data
          //  let comments = newsData.comments
          console.log(comments)
          let commentsSection = document.getElementById('commentsSection')
          commentsSection.innerHTML = ' '
          for (let i = 0; i < comments.length; i++) {
            let commentSpan = document.createElement('span')
            let commentContent = comments[i].content

            //let author = comment.author.data
            //commentSpan.textContent = author.firstName + ' '
            //+ author.lastName + ' commented  \" ' + comment.content + '\"'
            commentSpan.textContent = commentContent
            //commentSpan.classList.add('comment');
            commentSpan.className = 'comment'
            commentsSection.appendChild(commentSpan);

            this.expanded = true
          }
        } catch (error) {
          console.error(error)

        }
      } else {
        let commentsSection = document.getElementById('commentsSection')
        commentsSection.innerHTML = 'majmun'
        this.expanded = false
      }

    }

  }


}
</script>

<template>
  <div class="news-preview" @click="expand">
    <h2 id="title">{{ news.title }}</h2>
    <p id="content">{{ news.content }}</p>
    <h4 id="author">{{ news.author.firstName }} {{ news.author.lastName }}</h4>
  </div>
  <div v-if="expanded" id="commentsSection"/>
</template>


<style>
h2 p h4 {
  width: 90%;
}

.news-preview {
  border-radius: 10px;
  box-shadow: 4px 4px 15px #276749;
  margin-bottom: 5vh;
  text-align: center;
}
</style>