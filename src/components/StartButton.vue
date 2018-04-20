<template>
  <div class="start-button">
    <button class="btn btn-danger">
      <router-link class="btn-start btn-lg" to="/game">
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
