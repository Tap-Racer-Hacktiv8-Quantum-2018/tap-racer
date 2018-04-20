import Vue from 'vue'
import Router from 'vue-router'
import Loby from './views/Loby.vue'
import Game from './views/Game.vue'
import Room from './views/Room.vue'
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
      path: '/loby/:id',
      name: 'loby',
      component: Loby
    },
    {
      path: '/game/:id',
      name: 'game',
      component: Game
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    }
  ]
})
