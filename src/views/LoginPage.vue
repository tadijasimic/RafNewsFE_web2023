<script>
export default {
  data() {
    return {
      currentState: 'login',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: '',
      formError: '',
      emailError: '',
      passwordError: '',
      firstNameError: '',
      lastNameError: '',
      roleError: '',
      emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    };
  },
  methods: {

    submitForm() {

      this.clearErrors();

      // Perform form validation
      if (this.currentState === 'login') {
        if (!this.email) {
          this.emailError = 'Email is required';
        }
        if (!this.password) {
          this.passwordError = 'Password is required';
        }
      } else {
        if (!this.email) {
          this.emailError = 'Email is required';
        }
        if (!this.password) {
          this.passwordError = 'Password is required';
        }
        if (!this.firstName) {
          this.firstNameError = 'First name is required';
        }
        if (!this.lastName) {
          this.lastNameError = 'Last name is required';
        }
        if (!this.role) {
          this.roleError = 'Role is required';
        }
      }
      // Validate email format using regex pattern
      if (this.email && !this.emailPattern.test(this.email)) {
        this.emailError = 'Invalid email format';
      }

      // Check if any errors occurred
      if (this.hasErrors()) {
        this.formError = 'Please fill in all required fields.';
      } else {
        // Form is valid, submit logic here
        this.formError = '';

        if (this.currentState === 'login') {
          // Login logic

        } else {
          // Sign up logic
          console.log('Signing up...');
        }
      }
    },
    toggleState() {
      this.clearErrors();
      this.currentState = this.currentState === 'login' ? 'signup' : 'login';
    },
    clearErrors() {
      this.formError = '';
      this.emailError = '';
      this.passwordError = '';
      this.firstNameError = '';
      this.lastNameError = '';
      this.roleError = '';
    },
    hasErrors() {

      return (
          this.emailError ||
          this.passwordError ||
          this.firstNameError ||
          this.lastNameError ||
          this.roleError)

    },
  },
};
</script>


<template>
  <div class="login-page">
    <h2>{{ currentState === 'login' ? 'Login' : 'Sign up' }}</h2>
    <hr class="divider"/>

    <!-- EMAIL -->
    <form>
      <div class="form-floating form-group mb-3">
        <input id="email" v-model="email" class="form-control" placeholder="name@example.com" required type="email">
        <label for="email">Email address</label>
        <div v-if="emailError" class="error-message">{{ emailError }}</div>
      </div>

      <!-- EMAIL -->
      <div class="form-floating form-group">
        <input id="password" v-model="password" class="form-control" placeholder="Password" required type="password">
        <label for="password">Password</label>
        <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
      </div>

      <!-- FIRST NAME -->
      <div v-if="currentState === 'signup'" class="form-group form-floating form-group mb-3">
        <input id="firstName" v-model="firstName" class="form-control" placeholder="Password" required type="password">
        <label for="firstName">First name</label>
        <div v-if="firstNameError" class="error-message">{{ firstNameError }}</div>
      </div>

      <!-- LAST NAME -->
      <div v-if="currentState === 'signup'" class="form-group form-floating form-group">
        <input id="lastName" v-model="lastName" class="form-control" placeholder="Password" required type="password">
        <label for="lastName">Last name</label>
        <div v-if="lastNameError" class="error-message">{{ lastNameError }}</div>
      </div>

      <div v-if="currentState === 'signup'" class="form-group mb-3">
        <label for="role">Role:</label>
        <select id="role" v-model="role">
          <option value="creator">Creator</option>
          <option value="viewer">Viewer</option>
        </select>
        <div v-if="roleError" class="error-message">{{ roleError }}</div>
      </div>

      <hr class="divider"/>
      <div class="form-group">
        <button class="submit-btn" @click.prevent="submitForm">{{ currentState === 'login' ? 'Login' : 'Sign up' }}</button>
        <div v-if="formError" class="error-message form-error">{{ formError }}</div>
      </div>
    </form>
    <a class="toggle-state blue-underline" @click="toggleState">
      {{ currentState === 'login' ? "You don't have an account? Sign up!" : 'You already have an account? Login here!' }}
    </a>
  </div>
</template>


<style>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 40vw;
  margin: 10vh auto;

}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-group {
  margin-bottom: 1rem;
  width: 100%;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}


.submit-btn {
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  /* Align the button to the right */
  margin: 0.5rem auto 1rem;
  display: block; /* Set the b*/
}

.submit-btn:hover {
  background-color: #1565c0;
}


.toggle-state {
  margin-top: 1em;
  text-align: center;
//margin-top: 1.5rem; /* Reduce the top margin */
}


input:invalid {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.7rem;
}

.error-message.form-error {
  text-align: center;
}
</style>
