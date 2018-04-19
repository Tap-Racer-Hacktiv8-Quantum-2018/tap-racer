<template>
  <div id="board">
    <h1>Tap-Racer</h1>
    <h4>LEADERBOARDS!</h4>
    <table class="table table-hover">
        <thead>
            <th>No.</th>
            <th>Username</th>
            <th id="win">Win</th>
            <th id="lose">Lose</th>
        </thead>
        <tbody>
          <td v-for="(score, index) in scoreData" :key="index">
            <tr>{{index + 1}}</tr>
            <tr>{{score.username}}</tr>
            <tr>{{score.win}}</tr>
            <tr>{{score.lose}}</tr>
          </td>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'board',
  data: function () {
    return {
      scoreData: []
    }
  }
}
</script>

<style>
h1, h4{
  margin: 2%;
  font-family: 'Contrail One', cursive
}

#board{
  margin: 2%
}

#win{
    text-decoration-color: aqua
}

#lose{
    color: red
}
</style>
