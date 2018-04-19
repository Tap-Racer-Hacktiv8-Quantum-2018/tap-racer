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
        <button type="button" class="btn btn-link">Login</button>

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
                <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
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
