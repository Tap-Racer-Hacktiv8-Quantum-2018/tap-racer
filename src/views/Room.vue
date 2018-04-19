<template>
  <div class="container">
    <div class="room">
      <div class="headerroom">
        <h2 class="left-header">Create room</h2>
        <h2 class="right-header">hi, jono</h2>
      </div>
      <ul>
        <li v-for="room in rooms" v-bind:key="room.id">
          <router-link :to="{ name: 'loby', params: { id: room.id }}">
            <div class="listroom col-md-3" v-bind:class="room.status">
              <h3>{{ room.name }}</h3>
              <div class="details">
                <div class="player1">
                  <p>Andrew Jovian</p>
                </div>
                <p>VS</p>
                <div class="player2">
                  <p>Yosa</p>
                </div>
              </div>
            </div>
          </router-link>
        </li>
        <div class="clear"></div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  data: function () {
    return {
      rooms: [
        {id: 1, name: 'Room 1', status: 'war'},
        {id: 2, name: 'Room 2', status: 'on'},
        {id: 3, name: 'Room 3', status: 'war'},
        {id: 4, name: 'Room 4', status: 'off'},
        {id: 5, name: 'Room 5', status: 'war'},
        {id: 6, name: 'Room 6', status: 'war'}
      ]
    }
  }
}
</script>

<style>
  .headerroom {
    /* width: 990px; */
    height: 50px;
    /* background: green; */
    margin-bottom: 10px;
  }

  .left-header {
    font-size: 20px;
    float: left;
    background: red;
    padding: 10px;
    border-radius: 10px;
  }
  .right-header {
    float: right;
  }
  .room {
  }

  li {
    list-style: none;

  }
  ul > li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .clear {
    clear: both;
  }
  .listroom {
    margin: 10px;
    list-style: none;
    /* width: 300px; */
    min-height: 150px;
    background: orange;
    float: left;
    /* margin-right: 10px;
    margin-bottom: 10px; */
  }
  .listroom > h3 {
    font-size: 20px;
    padding-top: 10px;
  }
  .details {
    margin-top: 20px;
    background: blue;
    width: 100%;
    padding: 10px;
    /* height: 50px; */
  }
  .player1 > p, .player2 > p {
    line-height: 5px;
  }
  .war {
    background: red;
    color: white;
  }
  .on {
    background: green;
    color: white;
  }
  .off {
    background: grey;
  }
</style>
