<template>
  <div>
    <navbar></navbar>
    <div id="board">
      <div class="row">
        <div class="col-1 red"></div>
          <div class="col-1 blue"></div>
            <div class="col-8 mainbody">
            <h1>Tap-Racer</h1>
            <h4>LEADERBOARDS!</h4>
            <table class="table table-hover">
              <thead>
                  <th>No.</th>
                  <th>Username</th>
                  <th id="win">Win</th>
                  <th id="lose">Lose</th>
              </thead>
                <tr v-for="(score, index) in scoreData" :key="index">
                  <td>{{index + 1}}</td>
                  <td>{{score.username}}</td>
                  <td>{{score.win}}</td>
                  <td>{{score.lose}}</td>
                </tr>
            </table>
            </div>
          <div class="col-1 blue"></div>
        <div class="col-1 red"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'board',
  components: {
    Navbar
  },
  data: function () {
    return {
      scoreData: [{
        username: 'Mikel Chumaker',
        win: 100,
        lose: 0
      },
      {
        username: 'John Doe',
        win: 90,
        lose: 3
      },
      {
        username: 'Udin',
        win: 66,
        lose: 5
      },
      {
        username: 'Bob',
        win: 101,
        lose: 20
      }
      ]
    }
  },
  created () {
    this.sortByWin()
  },
  methods: {
    sortByWin () {
      this.scoreData.sort(function (a, b) { return b.win - a.win })
    }
  }
}
</script>

<style>
.red{
  background-color: #fe0000
}

.blue{
  background-color: #0059ff
}

.mainbody{
  background-color: whitesmoke;
  border: 10px solid black;
  height: 650px;
}

div#board{
  width: 100%;
  background-color: red;
  height: 600px;
  display: table
}

h1, h4{
  margin: 2%;
  font-family: 'Contrail One', cursive
}

#board{
  margin: 2%
}

#win{
    color: rgb(0, 132, 255)
}

#lose{
    color: red
}
</style>
