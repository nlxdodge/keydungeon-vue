<template>
  <div class="password-line">
    <a :href="props.password.url">
      <p>{{ props.password.name }}</p>
    </a>
    <p>{{ props.password.username }}</p>
    <TheButton :href="'/passwords/edit/' + props.password.id" >Edit</TheButton>
    <TheButton @click="copy(props.password.password)">Copy</TheButton>
  </div>
</template>

<script setup lang="ts">
import TheButton from '../components/TheButton.vue'
import type { Password } from '../stores/models/Password'

interface Props {
  password: Password
}
const props = defineProps<Props>()

async function copy(data: string) {
  try {
    await navigator.clipboard.writeText(data)
    console.log('Copied message!')
  } catch (error) {
    console.log('Error message')
  }
}
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
