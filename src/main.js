// main.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import {createApp} from 'vue'

//Root vue component
import App from './App.vue';
//router
import {myRouter} from "@/config/router";
import {beginSession} from "@/config/session";

//create the app, set up the apps router and mount the app component onto a root #app  div within the
createApp(App).use(myRouter).mount('#app');

beginSession('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZmlyc3ROYW1lIjoiSm9obnkiLCJsYXN0TmFtZSI6Ik1ha2Fyb25leSIsInN0YXR1cyI6IkFDVElWRSIsInJvbGUiOiJBRE1JTiIsImVtYWlsIjoiam9uaXNoYUByYWYucnMiLCJpYXQiOjE1MTYyMzkwMjJ9.MG9ucenXOULNOSCyaGCeELSdkHHkVfRVYrzgpBtPh0c')




