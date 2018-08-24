import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Routes from './routes'
import { store } from './store/store'

import 'vuetify/dist/vuetify.min.css'
import 'es6-promise/auto'

Vue.use(Vuetify);
Vue.use(VueRouter);
window.axios = require('axios');

const router = new VueRouter({
  mode: 'history',
  routes: Routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'projects',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router: router
})
