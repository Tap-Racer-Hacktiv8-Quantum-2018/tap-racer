<template>
  <div class="indexLogin">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-1 left"></div>
      <div class="loginbody col-8">
        <div class="row">
          <div class="divTitle col-lg-6 col-sm-12">
            <div id="title">
              <h1>TAP-RACER</h1>
            </div>
          </div>
          <div class="col-lg-6 col-sm-12">
          <div>
            <h2><strong>LOGIN</strong></h2>
            <div>
              <input type="text" v-model="username" placeholder="Username">
              <input type="password" v-model="password" placeholder="Password">
            </div>
          </div>
            <button type="button" class="button lgnbtn" @click="login">Login</button>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModalCenter">
              Register
            </button>
          </div>
        </div>
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
    <div class="col-1 right"></div>
    <div class="col-1"></div>
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

#title{
  margin:2%
}

.left{
  background:#0059ff
}

.right{
  background: #0059ff
}

.button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    cursor: pointer
}

div.indexLogin {
  width: 100%;
  background-color: red;
  height: 600px;
  display: table
}

h1, h2, h5, button{
  font-family: 'Contrail One', cursive
}

.indexLogin{
    margin-top: 4%;
}

.lgnbtn{
    background-color: darkred;
    color: white;
    border: 2px solid yellow;
    border-radius: 50%
}

.lgnbtn:hover{
  background-color: lightsalmon;
  color: white
}

.loginbody{
  display: flex;
  align-items: center;
  background-color: whitesmoke;
  height: 650px;
  border: 10px solid black
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
