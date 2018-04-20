<template>
  <div class="container">
    <div class="headerroom">
      <button class="left-header"  data-toggle="modal" data-target="#modalCreateRoom">Create room</button>
      <div id="modalCreateRoom" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title" align="left">Create Room</h4>
            </div>
            <div class="modal-body">
              <form class="ivu-form ivu-form-label-right">
                <div class="form-group">
                  <label class="form-title">Room Name</label>
                  <div class="form-group-content">
                    <div class="">
                      <i class="validate"></i>
                      <input type="text" placeholder="room name" class="form-control"
                      v-model="newRoom.name">
                      </div>
                    </div>
                  </div>
                <div class="form-group">
                  <label class="form-title">Target</label>
                  <div class="form-group-content">
                    <div class="">
                      <input placeholder="target" v-model="newRoom.target">
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button class="btn btn-primary" @click="addRoom" data-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="right-header btn btn-danger" @click="logOut">Log Out</button>
      <h2 class="right-header">hi, jono</h2>
    </div>
    <div class="row">
      <div class="col-md-9 col-12" >
        <div class="room">
          <ul>
            <li v-for="room in rooms" v-bind:key="room['.key']" >
              <router-link :to="{ name: 'loby', params: { id: room['.key'] }}">
                <div class="listroom col-md-3" v-bind:class="room.status">
                  <h3>{{ room.name }}</h3>
                  <div class="details">
                    {{ room.status }}
                    <div class="player1">
                      <p>{{room.players.player1.username}}</p>
                    </div>
                    <p>VS</p>
                    <div class="player2">
                      <p>{{room.players.player2.username}}</p>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
            <div class="clear"></div>
          </ul>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="activeuser">
          <h3><span> Active User </span></h3>
          <div class="tablescore">
            <div class="table-title">
              <div class="thead">
                Username
              </div>
              <div class="thead">
                Status
              </div>
            </div>
            <div class="table-body" v-for="(user, index) in activeUsers" :key="index">
              <div class="thead">
                {{user.username}}
              </div>
              <div class="thead">
                {{user.status}}
              </div>
              <div class="thead">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase'

const usersRef = db.ref('users')
const roomsRef = db.ref('rooms')

export default {
  name: 'Room',
  firebase: {
    users: usersRef,
    rooms: roomsRef
  },
  data: function () {
    return {
      // rooms: [
      //   {id: 1, name: 'Room 1', status: 'war'},
      //   {id: 2, name: 'Room 2', status: 'on'},
      //   {id: 3, name: 'Room 3', status: 'war'},
      //   {id: 4, name: 'Room 4', status: 'off'},
      //   {id: 5, name: 'Room 5', status: 'war'},
      //   {id: 6, name: 'Room 6', status: 'war'}
      // ],
      newRoom: {
        name: '',
        target: '',
        status: 'on',
        players: {
          player1: {
            username: localStorage.getItem('username'),
            clicked: 0,
            isReady: 0
          },
          player2: {
            username: '',
            clicked: 0,
            isReady: 0
          }
        }
      }
    }
  },
  computed: {
    activeUsers: function () {
      return this.$store.getters.getActiveUser
    }
  },
  created: function () {
    this.$store.dispatch('getUser')
    this.$store.dispatch('getActiveUser')
  },
  methods: {
    addRoom () {
      roomsRef.push(this.newRoom)
        .then((response) => {
          alert('room added')
          console.log('ini response- ', response)
        })
    },
    joinRoom (room) {
      console.log('ini room', room)
      const user = localStorage.getItem('username')
      if (room.players.player1.username === user ||
        room.players.player2.username === user) {
        alert(`Kamu sudah ada di dalam room`)
      } else if (room.players.player2.username !== '') {
        alert('Room full')
      } else {
        room.players.player2.username = user
        const editRoom = {...room}
        delete editRoom['.key']
        roomsRef.child(room['.key']).set(editRoom)
      }
    },
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
        usersRef.child(dataUser['.key']).update({
          status: 'inactive'
        }).then(() => {
          localStorage.removeItem('username')
          this.$router.push({name: 'index'})
        })
      }
    }
  }
}
</script>

<style>
  .headerroom {
    /* width: 990px; */
    height: 50px;
    /* background: green; */
    margin-bottom: 10px;
  }

  .left-header {
    font-size: 20px;
    float: left;
    background: red;
    padding: 10px;
    border-radius: 10px;
  }
  .right-header {
    float: right;
    margin-left: 20px;
    margin-right: 20px;
  }
  .room {
  }

  li {
    list-style: none;

  }
  ul > li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .clear {
    clear: both;
  }
  .listroom {
    margin: 10px;
    list-style: none;
    /* width: 300px; */
    min-height: 150px;
    background: orange;
    float: left;
    /* margin-right: 10px;
    margin-bottom: 10px; */
  }
  .listroom > h3 {
    font-size: 20px;
    padding-top: 10px;
  }
  .details {
    margin-top: 20px;
    background: blue;
    width: 100%;
    padding: 10px;
    /* height: 50px; */
  }
  .player1 > p, .player2 > p {
    line-height: 5px;
  }
  .true {
    background: red;
    color: white;
  }
  .flase {
    background: green;
    color: white;
  }
  /* .off {
    background: grey;
  } */

  .activeuser {
  padding: 5px;
  background-color: whitesmoke;
  border: 10px solid transparent;
  -webkit-border-image: url(https://www.w3schools.com/cssref/border.png) 30 round;
  -o-border-image: url(https://www.w3schools.com/cssref/border.png) 30 round;
  border-image: url(https://www.w3schools.com/cssref/border.png) 30 round;
}
.table-title {
  border-bottom: 1px solid black;
  background-color: rgba(253, 185, 11, 0.7);
  align-items: center;
  font-weight: bold;
  padding-bottom: 10px;
  padding-top:  10px;
  padding-left: 5px;
  padding-right: 5px;
}
.table-title {
  display: grid;
  grid-template-columns: 50px auto;
}

.table-body {
  display: grid;
  grid-template-columns: 50px auto;
  padding: 5px;
}

span {
  text-shadow: 2px 2px 2px grey;
  font-size: 23px;
}

</style>
