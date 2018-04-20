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
    rooms: [],
    activeUsers: []
  },
  getters: {
    getUser: function (state) {
      return state.users
    },
    getActiveUser: function (state) {
      return state.activeUsers
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
      state.users = payload
    },
    getActiveUser: function (state, payload) {
      state.activeUsers.push(payload)
    }
  },
  actions: {
    getUser: function (context) {
      users.on('value', function (snapshot) {
        context.commit('getUser', snapshot.val())
      })
    },
    getActiveUser: function (context) {
      users.on('value', function (snapshot) {
        snapshot.forEach(data => {
          if (data.val().status === 'active') {
            console.log(data.val())
            context.commit('getActiveUser', data.val())
          }
        })
      })
    }
  }
})
