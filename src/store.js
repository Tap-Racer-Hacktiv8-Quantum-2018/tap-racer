import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './firebase'

Vue.use(Vuex)

const users = db.ref('users')
const rooms = db.ref('rooms')

console.log('users', users)
console.log('rooms', rooms)

// users.push(newuser)
//   .then((response) => {
//     console.log('ini response- ', response);
//   });

export default new Vuex.Store({
  state: {
    users: [],
    rooms: []
  },
  getters: {
    getUser: function (state) {
      return state.users
    }
  },
  mutations: {
    addUser: function (state, payload) {
      state.users.push(payload)
    },
    addRoom: function (state, payload) {
      state.rooms.push(payload)
    },
    getUser: function (state, payload) {
      // users.on('value', function (snapshot) {
      // })
      state.users = payload
    }
  },
  actions: {
    getUser: function (context) {
      users.on('value', function (snapshot) {
        context.commit('getUser', snapshot.val())
      })
    }
  }
})
