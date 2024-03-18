<template>
  <div>
    <h1>Edit password</h1>
    <form @submit.prevent="submitForm()"></form>
    <InputLine name="url" :vModel="password.url" v-focus />
    <InputLine name="name" :vModel="password.name" />
    <InputLine name="username" :vModel="password.username" />
    <InputLine name="password" type="password" :vModel="password.password" />
    <div class="actions">
      <TheButton href="/passwords">Back</TheButton>
      <TheButton @submit.prevent="submitForm()">Save</TheButton>
      <TheButton @click="generatePassword()">Generate</TheButton>
      <TheButton @click="deletePassword()">Delete</TheButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputLine from '@/components/InputLine.vue';
import TheButton from '@/components/TheButton.vue';
import { generateRandomString } from '@/mixins';
import type { Password } from '@/stores/models/Password';
import { ref } from 'vue';

interface Props {
  password?: Password
}
const props = defineProps<Props>()
const password = ref(
  props.password
    ? props.password
    : {
        id: 0,
        url: '',
        name: '',
        username: '',
        password: ''
      }
)

function generatePassword() {
  password.value.password = generateRandomString()
}

function submitForm() {
  console.log('generate password')
}

function deletePassword() {
  console.log('generate password')
}
</script>

<style lang="scss">
.actions {
  display: flex;
  justify-content: space-around;

  .button {
    min-width: 125px;
  }
}
</style>
