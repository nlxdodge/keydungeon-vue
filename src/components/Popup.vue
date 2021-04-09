<template>
  <div class="popup">
    <div
      v-if="this.show"
      class="box"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    message: {
      type: String,
      default: 'Error',
      required: true
    },
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    this.show = true
  },
  methods: {
    close () {
      this.show = false
    }
  }
}
</script>

<style lang="scss">

</style>