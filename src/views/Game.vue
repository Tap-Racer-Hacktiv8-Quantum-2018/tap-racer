<template>
  <div class="game">
    <h1 class="title">Tap Racer</h1>
    <p>Tap terus supaya menang !</p>
    <p class="score">{{ score }}</p>
    <div class="btnwrap">
      <button v-on:click="tapButton"><i class="fas fa-hand-pointer"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data: function () {
    return {
      score: 0
    }
  },
  methods: {
    tapButton: function () {
      this.score += 1
    }
  }
}
</script>

<style scoped>

  .title {
    font-family: 'Alfa Slab One', cursive;
    margin-bottom: -1px;
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
    background: red;
    color: white;
  }

  .fa-hand-pointer {
    color: white !important;
    font-size: 70px;
  }
</style>
