// main.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import {createApp} from 'vue'

//Root vue component
import App from './App.vue';
//router
import {myRouter} from "@/config/router";

//create the app, set up the apps router and mount the app component onto a root #app  div within the
createApp(App).use(myRouter).mount('#app');

myRouter.push('/')



