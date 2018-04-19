<template>
  <div class="loby">
    <h1>Welcome to room {{ id }}, yosa</h1>
    <StartButton></StartButton>
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

<style>

</style>
