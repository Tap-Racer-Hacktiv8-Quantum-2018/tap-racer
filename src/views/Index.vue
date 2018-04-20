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
            <button type="button" class="button lgnbtn">Login</button>
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
                <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
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
export default {
  name: 'index',
  data: function () {
    return {
      username: '',
      password: '',
      confirm: ''
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
