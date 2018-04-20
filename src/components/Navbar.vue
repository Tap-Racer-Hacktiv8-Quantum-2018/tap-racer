<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Tap-Racer</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/room">Room<span class="sr-only">(current)</span></router-link>
      </li>
        <li class="nav-item">
        <router-link class="nav-link" to="/board">Laderboards</router-link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <button type="button" class="header right-header btn btn-danger" @click="logOut">Log Out</button>
    </form>
  </div>
  </nav>
</div>
</template>

<script>
import {db} from '../firebase'

const usersRef = db.ref('users')
const roomsRef = db.ref('rooms')
export default {
  name: 'Navbar',
  firebase: {
    users: usersRef,
    rooms: roomsRef
  },
  methods: {
    logOut: function () {
      let username = localStorage.getItem('username')
      let check = false
      let dataUser = ''
      this.users.forEach(value => {
        if (value.username === username) {
          console.log('username exist')
          check = true
          dataUser = value
        }
      })
      console.log('user fo logout==', dataUser)
      if (check === true) {
        this.users.child(dataUser['.key']).update({
          status: 'inactive'
        }).then(() => {
          localStorage.removeItem('username')
          this.$router.push({name: 'index'})
        })
      }
      this.$router.push({name: 'index'})
    }
  }
}
</script>

<style>

</style>
