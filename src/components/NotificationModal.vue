<template>
  <div class="notification-modal">
    <div @click="close()" v-if="show">
      {{ props.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

interface Props {
  message: string
}
const props = withDefaults(defineProps<Props>(), {
  message: 'Error'
})

let show = ref(false)

function close() {
  show.value = false
}

setTimeout(() => {
  close()
}, 3000)
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
