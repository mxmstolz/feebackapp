import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Routes from './routes'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(VueRouter);
window.axios = require('axios');

const router = new VueRouter({
  routes: Routes,
  // mode: 'history'
});


new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
