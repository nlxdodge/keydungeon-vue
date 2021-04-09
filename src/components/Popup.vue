<template>
  <div class="popup">
    <div
      @click="close()"
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
    setTimeout(function () {
      this.close()
    }, 3000)
  },
  methods: {
    close () {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
.popup {
  position: fixed;
  right: 25px;
  bottom: 25px;
  background-color: #f1c40f;
  color: #242424;
  padding: 10px 50px;
  font-size: 20px;
}
</style>