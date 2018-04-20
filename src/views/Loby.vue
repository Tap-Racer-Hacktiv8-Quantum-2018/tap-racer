<template>
  <div class="loby">
    <div class="row"></div>
    <div class="row">
      <div class="side col-2"></div>
      <div class="main col-8">
        <div class="bodyRoom">
        <h1>Welcome to room {{ roomname }}, {{name}}</h1>
        <table class="playerTable table table-hover">
          <thead>
            <th>Player</th>
            <th>Name</th>
          </thead>
          <tr v-for="(room, index) in rooms" v-bind:key="room['.key'], index" @click="joinRoom(room)">
            <td>Player {{index + 1}}</td>
            <td>{{room.players.player1.username}}</td>
          </tr>
        </table>
        <div class="container">
          <button class="btn btn-danger btn-lg">
          <router-link class="btn-start" :to="{ name: 'game', params: { id: id }}">
            Start
          </router-link>
          </button>
        </div>
        </div>
      </div>
      <div class="side col-2"></div>
    </div>
  </div>
</template>

<script>
// import StartButton from '@/components/StartButton.vue'

import {db} from '../firebase'
const usersRef = db.ref('users')
const roomsRef = db.ref('rooms')

export default {
  name: 'loby',
  firebase: {
    users: usersRef,
    rooms: roomsRef
  },
  data () {
    return {
      id: this.$route.params.id,
      roomname: '',
      activeRoom: '',
      name: ''
    }
  },
  created () {
    this.name = localStorage.getItem('username')
    this.$store.dispatch('getUser')
  },
  mounted () {
    this.getById()
  },
  methods: {
    changeStatus: function (room) {
      const user = localStorage.getItem('username')
      this.getById()
      console.log('test masuk')
      console.log('change status--', this.id)
      this.rooms.forEach(room => {
        if (room['.key'] === this.id) {
          console.log('masuk sini', room)
          if (room.players.player1.username === user) {
            room.players.player1.isReady = 1
            console.log('masuk------------------', room.players.player1.username)
            const editRoom = {...room}
            delete editRoom['.key']
            roomsRef.child(room['.key']).set(editRoom)
          } else if (room.players.player2.username === user) {
            room.players.player2.isReady = 1
            const editRoom = {...room}
            delete editRoom['.key']
            roomsRef.child(room['.key']).set(editRoom)
          }

          if (room.players.player1.isReady === 0 || room.players.player2.isReady === 0) {
            alert(`Wait for another player to ready`)
            this.$router.push('/loby/' + this.id)
          }

          if(room.players.player1.isReady === 1 || room.players.player2.isReady === 1) {
            room.status = "war"
            const editRoom = {...room}
            delete editRoom['.key']
            roomsRef.child(room['.key']).set(editRoom)
          }
        }
      })
    },
    getById: function () {
      console.log(this.id)
      this.rooms.forEach(room => {
        if (room['.key'] === this.id) {
          console.log(room)
          this.roomname = room.name
          this.activeRoom = room
        }
      })
      console.log('active room', this.activeRoom)
    }
  },
  components: {
    // StartButton
  },
  watch: {
  }
}
</script>

<style scoped>

.playerTable{
  background: rgba(255, 255, 255, 0.8);
  font-family: 'Contrail One', cursive
}

h1, button{
  opacity: 1;
  font-family: 'Contrail One', cursive
}
div.bodyRoom{
  /* background: rgba(255, 255, 255, 1);; */
  padding: 3%
}
  div.main{
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    height: 630px
  }
  button {
    margin-top: 200px;
  }
.btn-start {
  padding: 10px 25px;
  color: white !important;
  }
.loby{
  background-image: url('https://media.giphy.com/media/10LKovKon8DENq/giphy.gif');
  background-size: cover;
  background-repeat: no-repeat;
  height: 630px;
  width: 100%;
}
</style>
