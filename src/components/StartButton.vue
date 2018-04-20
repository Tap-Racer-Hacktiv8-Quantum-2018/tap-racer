<template>
  <div class="start-button">
    <button class="btn btn-danger">
      <router-link class="btn-start" to="/game">
      <!-- <router-link class="btn-start" :to="{ name: 'game', params: { id: room['.key'] }}"> -->
        Start
      </router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: 'StartButton'
}
</script>

<style>
  .btn-start {
    padding: 10px 25px;
    color: white !important;
  }
</style>
