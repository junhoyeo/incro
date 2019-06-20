import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/Index.vue'
import Request from './pages/Request.vue'
import Join from './pages/Join.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/request',
      name: 'request',
      component: Request
    },
    {
      path: '/join',
      name: 'join',
      component: Join
    }
  ]
})
