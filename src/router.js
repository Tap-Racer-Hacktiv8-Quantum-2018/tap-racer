import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Loby from './views/Loby.vue'
import Game from './views/Game.vue'
import Room from './views/Room.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/loby/:id',
      name: 'loby',
      component: Loby
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    }
  ]
})
