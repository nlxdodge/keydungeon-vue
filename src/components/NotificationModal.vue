<template>
  <Teleport to="body">
    <div
      v-if="notification.visible"
      class="popup"
      :class="`popup--${notification.type}`"
      @click="notification.hide()"
    >
      {{ notification.message }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notificationStore'

const notification = useNotificationStore()
</script>

<style lang="scss">
.popup {
  position: fixed;
  right: 25px;
  bottom: 25px;
  background-color: $template-color-main;
  color: $template-color-dark;
  padding: 10px 50px;
  font-family: AlegreyaSans, Helvetica, Arial, sans-serif;
  font-size: 20px;
  cursor: pointer;
}
</style>
