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

  <div>
    <h1>User List</h1>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Password</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.password }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.status }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import {myAxios} from "@/config/api";
import {currSession, roles} from "../config/session";

export default {
  name: "UserPage",
  computed: {
    roles() {
      return roles
    }
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    currSession,
    fetchUsers() {
      myAxios.get('/users/all')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
