<script>
import {currSession, roles} from "@/config/session";
import {myRouter} from "@/config/router";
import {myAxios} from "@/config/api";

export default {
  name: "CreateNewsPage",
  computed: {
    roles() {
      return roles;
    },
  },
  data() {
    return {
      categories: [],
      newsCategory: null,
      title: "",
      content: "",
    };
  },
  methods: {
    currSession,
    async fetchCategories() {
      try {
        const response = await myAxios.get("/categories/all");
        this.categories = response.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async publishNews() {
      try {
        const newNews = {
          id: 1,
          title: this.title,
          content: this.content,
          visited: 0,
          creationTime: new Date().toISOString(),
          authorId: this.currSession().id,
          categoryId: this.newsCategory.id,
        };
        console.log(newNews)

        await myAxios.post("/news", newNews);
        await myRouter.push('/')
        alert('Your news have just been published!')
      } catch (error) {
        console.log(error.message);
      }
    },
    cancel() {
      myRouter().push("/");
    },
  },
  async mounted() {
    await this.fetchCategories();
  },
};
</script>

<template>
  <label v-if="currSession()" class="sessionInfo">
    <i
        :class="{
        'fas fa-user-tie': currSession().role === roles.contentCreator,
        'fa fa-user-shield': currSession().role === roles.admin
      }"
        class="icon"
    ></i>
    {{ ' ' + currSession().firstName + ' ' + currSession().lastName }}
  </label>

  <div class="publish-form">
    <div class="mb-3">
      <label class="form-label" for="exampleFormControlInput1">Title:</label>
      <input
          id="newsTitle"
          v-model="title"
          class="form-control"
          placeholder="News title"
          type="text"
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="exampleFormControlTextarea1">Body:</label>
      <textarea
          id="newsContent"
          v-model="content"
          class="form-control"
          placeholder="News body"
          rows="6"
      ></textarea>
    </div>
    <div class="filterComponent">
      <button
          aria-expanded="false"
          class="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          type="button"
      >
        {{ newsCategory ? newsCategory.name : 'Categories' }}
      </button>
      <ul id="dropMenu" class="dropdown-menu dropdown-menu-lg-start">
        <li>
          <a
              v-for="category in categories"
              class="dropdown-item active"
              href="#"
              @click="()=> (newsCategory = category)"
          >{{ category.name }}</a
          >
        </li>
        <li><a class="dropdown-item"></a></li>
      </ul>
    </div>

    <div class="form-actions">
      <button class="btn-publish" @click="publishNews">Publish</button>
      <button class="btn-cancel" @click="cancel">Cancel</button>
    </div>
  </div>
</template>


<style scoped>
.publish-form {
  max-width: 40rem;
  margin: auto;
  margin-top: 3rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
}

.form-actions {
  margin-top: 2rem;
  text-align: right;
}

.btn-publish {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  cursor: pointer;
}

.btn-cancel {
  background-color: #ccc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
}

.modal-actions {
  margin-top: 2rem;
}

</style>
