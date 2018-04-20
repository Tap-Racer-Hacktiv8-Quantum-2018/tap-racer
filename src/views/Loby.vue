<template>
  <div class="loby">
    <h1>Welcome to room {{ roomname }}, yosa</h1>
    <!-- <StartButton></StartButton> -->
    <!-- <router-link class="btn-start" to="/game"> -->
    <router-link class="btn-start" :to="{ name: 'game', params: { id: id }}">
      Start
    </router-link>
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
      roomname: ''
    }
  },
  created () {
    this.getById()
  },
  methods: {
    getById: function () {
      console.log(this.id)
      this.rooms.forEach(room => {
        if (room['.key'] === this.id) {
          console.log(room)
          this.roomname = room.name
        }
      })
    }
  },
  components: {
    // StartButton
  }
}
</script>

<style>

</style>
