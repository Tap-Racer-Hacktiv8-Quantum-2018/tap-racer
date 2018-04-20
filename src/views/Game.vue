<template>
  <div class="game">
    <h1 class="title">Tap Racer</h1>
    <p>Tap terus supaya menang !</p>
    <p class="score">{{ score }}</p>
    <div class="btnwrap">
      <button v-bind:style="{'background': 'rgb(255,' + color + ',' + color + ')'}" v-on:click="tapButton"><i class="fas fa-hand-pointer"></i></button>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase'

const usersRef = db.ref('users')
const roomsRef = db.ref('rooms')

export default {
  name: 'Game',
  firebase: {
    users: usersRef,
    rooms: roomsRef
  },
  data: function () {
    return {
      score: 0,
      id: this.$route.params.id,
      roomname: '',
      color: 0
    }
  },
  created () {
    this.rooms.forEach(room => {
      if (room['.key'] === this.id) {
        console.log('room')
        this.roomname = room.name
      }
    })
  },
  methods: {
    tapButton: function () {
      this.color += 5
      const user = localStorage.getItem('username')
      
      console.log(this.activeRoom.players.player2.clicked)
      const editRoom = {...this.activeRoom}
      delete editRoom['.key']
      roomsRef.child(this.activeRoom['.key']).set(editRoom)
      if (this.activeRoom.winner !== '') {
        alert(`Game is over! the winner is ${this.activeRoom.winner}`)
        this.$router.push( '/room' );
      } else if (this.activeRoom.players.player1.clicked >= this.activeRoom.target) {
        alert(`${this.activeRoom.players.player1.username} win`)
        this.activeRoom.winner = this.activeRoom.players.player1.username
      } else if (this.activeRoom.players.player2.clicked >= this.activeRoom.target) {
        alert(`${this.activeRoom.players.player2.username} win`)
        this.activeRoom.winner = this.activeRoom.players.player2.username
      } else {
        if (this.activeRoom.players.player1.username === user) {
          this.activeRoom.players.player1.clicked++
          this.score = this.activeRoom.players.player1.clicked
        } else if (this.activeRoom.players.player2.username === user) {
          this.activeRoom.players.player2.clicked++
          this.score = this.activeRoom.players.player2.clicked
        }
      }
    }
  },
  computed: {
    activeRoom: function () {
      let idRoom = this.id
      let thisroom
      this.rooms.forEach(room => {
        if (room['.key'] === idRoom) {
          thisroom = room
        }
      })
      return thisroom
    }
  }
}
</script>

<style scoped>

  p{
    font-family: 'Contrail One', cursive;
    margin-top: 1%;
  }

  .title {
    font-family: 'Contrail One', cursive;
    margin-bottom: 1px;
  }
  .score {
    font-size: 100px;
    font-family: 'Press Start 2P', cursive;
  }
  .btnwrap {
    width: 100%;
    height: 300px;
    display: block;
  }
  button {
    font-size: 30px;
    border-radius: 50%;
    text-align: center;
    width: 150px;
    height: 150px;
    color: white;
  }

  .fa-hand-pointer {
    color: white !important;
    font-size: 70px;
  }
</style>
