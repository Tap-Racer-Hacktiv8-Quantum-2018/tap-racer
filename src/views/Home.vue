<template>
  <div class="home">
    <button @click="getRoom"> get room </button>
    <p>Clicked: times</p>
    <button @click="clicked"> click me </button>
    <hr>
    <p>Room: </p>
    <form class="ivu-form ivu-form-label-right">
      <div class="form-group">
        <label class="form-title">Room Name: </label>
        <div class="form-group-content">
          <div class="">
            <i class="validate"></i>
            <input type="text" placeholder="room name.." class="form-control" v-model="newRoom.name">
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-title">Target: </label>
        <div class="form-group-content">
          <div class="">
            <i class="validate"></i>
            <input type="text" placeholder="target.." class="form-control" v-model="newRoom.target">
          </div>
        </div>
      </div>
      <button @click="addRoom">Add Room</button>
    </form>

    <div v-for="(room,i) in rooms" :key="i">
      <p>Nama Room: {{room.name}}</p>
      <p>Target: {{room.target}}</p>
      <p>Players:</p>
      <p>Player 1: {{room.players.player1.username}}</p>
      <p>Player 2: {{room.players.player2.username}}</p>
      <button @click="joinRoom(room)">Join Room</button>
      <button @click="leftRoom(room)">Left Room</button>
      <p>--------------------------------------------</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {db} from '../firebase'

const usersRef = db.ref('users')
const roomsRef = db.ref('rooms')

export default {
  name: 'home',
  components: {
  },
  firebase: {
    users: usersRef,
    rooms: roomsRef
  },
  data () {
    return {
      activeRoom: '',
      newRoom: {
        name: '',
        target: '',
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
  methods: {
    getRoom () {
      let idRoom = 'room1'
      this.rooms.forEach(room => {
        if (room['.key'] === idRoom) {
          this.activeRoom = room
        }
      })
    },
    clicked () {
      const user = localStorage.getItem('username')
      if (this.activeRoom.players.player1.username === user) {
        this.activeRoom.players.player1.clicked++
      } else if (this.activeRoom.players.player2.username === user) {
        this.activeRoom.players.player2.clicked++
      }

      console.log(this.activeRoom.players.player2.clicked)

      const editRoom = {...this.activeRoom}
      delete editRoom['.key']
      roomsRef.child(this.activeRoom['.key']).set(editRoom)
      
      if (this.activeRoom.players.player1.clicked >= this.activeRoom.target) {
        console.log('player 1 win')
      } else if (this.activeRoom.players.player2.clicked >= this.activeRoom.target) {
        console.log('player 2 win')
      }
    },
    addRoom () {
      roomsRef.push(this.newRoom)
        .then((response) => {
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
    leftRoom (room) {
      const user = localStorage.getItem('username')
      if (room.players.player2.username === user) {
        room.players.player2.username = ''
        room.players.player2.isReady = 0
        room.players.player2.clicked = 0
        const editRoom = {...room}
        delete editRoom['.key']
        roomsRef.child(room['.key']).set(editRoom)
      } else if (room.players.player1.username === user) {
        if (room.players.player2.username === '') {
          roomsRef.child(room['.key']).remove()
        } else {
          room.players.player1 = room.players.player2
          room.players.player2.username = ''
          room.players.player2.isReady = 0
          room.players.player2.clicked = 0
          const editRoom = {...room}
          delete editRoom['.key']
          roomsRef.child(room['.key']).set(editRoom)
        }
      }
    }
  },
  computed: {

  }
}
</script>
