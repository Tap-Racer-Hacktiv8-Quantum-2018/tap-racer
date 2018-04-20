<template>
  <div class="loby">
    <h1>Welcome to room {{ roomname }}, yosa</h1>
    <!-- <StartButton></StartButton> -->
    <!-- <router-link class="btn-start" to="/game"> -->
    <div class="container">
      <button class="btn btn-danger btn-lg" @click="changeStatus(activeRoom)">
        <router-link class="btn-start" :to="{ name: 'game', params: { id: id }}">
          Start
        </router-link>
      </button>
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
      activeRoom: ''
    }
  },
  mounted () {
    this.getById()
  },
  methods: {
    changeStatus: function (room) {
      const user = localStorage.getItem('username')
      this.getById()
      console.log("change status--", this.id)
      this.rooms.forEach(room => {
        if (room['.key'] === this.id) {
          console.log("masuk sini", room)
          if (room.players.player1.username === user) {
            room.players.player1.isReady = 1
            console.log('masuk------------------')
            const editRoom = {...room}
            delete editRoom['.key']
            roomsRef.child(room['.key']).set(editRoom)
          } else if (room.players.player2.username === user) {
            room.players.player2.isReady = 1
            const editRoom = {...room}
            delete editRoom['.key']
            roomsRef.child(room['.key']).set(editRoom)
          }

          if(room.players.player1.isReady === 0 || room.players.player2.isReady === 0) {
            alert(`Wait for another player to ready`)
            this.$router.push( '/loby/' + this.id );
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
      console.log("active room", this.activeRoom)
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
