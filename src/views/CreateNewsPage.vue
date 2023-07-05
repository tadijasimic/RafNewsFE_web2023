<template>
  <div class="news-form">
    <div class="form-group">
      <label for="author">Author:</label>
      <div>{{ author }}</div>
    </div>

    <div class="form-group">
      <label for="title">Title:</label>
      <input id="title" v-model="title" placeholder="Enter title" type="text">
    </div>

    <div class="form-group">
      <label for="content">News Content:</label>
      <textarea id="content" v-model="content" placeholder="Enter news content"></textarea>
    </div>

    <div class="form-actions">
      <button class="btn-publish" @click="showConfirmModal">Publish</button>
      <button class="btn-cancel" @click="cancel">Cancel</button>
    </div>

    <!-- Confirm Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>Save draft?</p>
        <div class="modal-actions">
          <button @click="saveDraft">Yes</button>
          <button @click="closeModal">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateNewsPage',
  data() {
    return {
      author: 'John Doe',
      title: '',
      content: '',
      showModal: false
    };
  },
  methods: {
    showConfirmModal() {
      this.showModal = true;
    },
    saveDraft() {
      // Save draft logic goes here
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    },
    cancel() {
      this.showConfirmModal();
    }
  }
};
</script>

<style scoped>
.news-form {
  max-width: 400px;
  margin: 0 auto;
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
