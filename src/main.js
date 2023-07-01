// main.js


import {createApp} from 'vue';
import App from './App.vue';
import {createRouter, createWebHistory} from 'vue-router';

// Import your components
import HomePage from '@/views/HomePage.vue';
import LoginPage from "@/views/LoginPage.vue";

// Routes for app
const routes = [
    {
        path: '/home',
        component: HomePage,
        meta: {
            authRequired: false
        }
    },

    {
        path: '/login',
        component: LoginPage,
        meta: {
            authRequired: false
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
//rauter.beforeEach(() => );
createApp(App).use(router).mount('#app');


