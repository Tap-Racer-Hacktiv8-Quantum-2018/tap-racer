import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Board from './views/Board.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    }
  ]
})
