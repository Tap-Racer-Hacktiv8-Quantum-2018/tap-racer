<template>
  <div class="indexLogin">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <h1>TAP-RACER</h1>
        <br>
        <h2><strong>LOGIN</strong></h2>
        <div>
          <input type="text" v-model="username" placeholder="Username">
          <input type="password" v-model="password" placeholder="Password">
        </div>
        <button type="button" class="btn btn-link" @click="login">Login</button>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModalCenter">
          Register
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" v-model="username" placeholder="Username">
                <input type="password" v-model="password" placeholder="Password">
                <input type="password" v-model="confirm" placeholder="Confirm Password">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="signup">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3"></div>
  </div>
  </div>
</template>

<script>
import {db} from '../firebase'
import swal from 'sweetalert2'
const users = db.ref('users')

export default {
  name: 'index',
  data: function () {
    return {
      username: '',
      password: '',
      confirm: ''
    }
  },
  firebase: function () {
    return {
      dataUser: users
    }
  },
  created: function () {
    this.$store.dispatch('getUser')
    // this.$store.commit('getUser')
  },
  methods: {
    signup: function () {
      let newUser = {
        username: this.username,
        password: this.password,
        win: 0,
        lose: 0,
        status: 'inactive'
      }
      console.log(this.dataUser)
      let check = false
      this.dataUser.forEach(value => {
        if (value.username === newUser.username) {
          console.log('username exist')
          check = true
        }
      })
      console.log('check ===', check)
      if (check === false) {
        users.push(newUser).then(response => {
          console.log('signup===', response)
          this.$store.commit('addUser', newUser)
        })
      } else {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Username already exist!'
        })
      }
    },
    login: function () {
      let userLogin = {
        username: this.username,
        password: this.password
      }
      let check = false
      let id = ''
      this.dataUser.forEach(value => {
        if (value.username === userLogin.username && value.password === userLogin.password) {
          console.log('masuk login', value['.key'])
          check = true
          id = value['.key']
          // swal(
          //   'Welcome!',
          //   'Login success!',
          //   'success'
          // )
          // localStorage.setItem('username', this.username)
          // this.$router.push({name: 'board'})
        }
      })
      console.log('check==', check)
      if (check === true) {
        swal(
          'Welcome!',
          'Login success!',
          'success'
        )
        users.child(id).update({
          status: 'active'
        })
        localStorage.setItem('username', this.username)
        this.$router.push({name: 'board'})
      } else {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Username/password is wrong!'
        })
      }
    }
  }
}
</script>

<style scoped>
body{
  background-color: red;
}

h1{
  font-family: 'Contrail One', cursive;
}

.indexLogin{
    margin-top: 4%;
}

.col-6{
background-color: whitesmoke
}

input{
  margin: 1%;
  border-radius: 5px;
  border: thin solid grey
}

.modal-body{
    display: flex;
    flex-direction: column
}
</style>
