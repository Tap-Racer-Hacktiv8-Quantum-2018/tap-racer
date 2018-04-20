<template>
  <div class="loby">
    <h1>Welcome to room {{ id }}, yosa</h1>
    <div class="container">
    <StartButton></StartButton>
    </div>
  </div>
</template>

<script>
import StartButton from '@/components/StartButton.vue'

export default {
  name: 'loby',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  components: {
    StartButton
  }
}
</script>

<style scoped>
.container {
  margin: 100px;
}
</style>
