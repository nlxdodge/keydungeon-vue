<template>
  <div class="password-line">
    <a :href="props.password.url">
      <p>{{ props.password.name }}</p>
    </a>
    <p>{{ props.password.username }}</p>
    <TheButton text="Edit" />
    <TheButton :data-clipboard-text="props.password" text="Copy" />
  </div>
</template>

<script setup lang="ts">
import { TheButton } from '../components/TheButton.vue'
import type { Password } from '../models/Password'
const props = defineProps({
  password: {
    type: {} as Password,
    required: true
  }
})
</script>

<style lang="scss">
.password-line {
  padding: 10px;
  border: 1px dashed black;

  .button {
    width: 100%;
  }

  p {
    margin: 0 0 10px 0;
    word-wrap: break-word;
  }
}
</style>
