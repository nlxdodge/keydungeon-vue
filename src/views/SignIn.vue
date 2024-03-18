<template>
  <div class="sign-in">
    <div class="block">
      <h1>Keydungeon</h1>
      <img src="../assets/images/key_logo_alt.svg" alt="Keydungeon Alt Logo" />
      <form @submit.prevent="submitForm()">
        <InputLine name="username" :vModel="email" v-focus/>
        <InputLine name="password" type="password" :vModel="password"/>
        <div class="actions">
          <TheButton href="/sign-up">Sign Up</TheButton>
          <TheButton @submit.prevent="submitForm()">Sign In</TheButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputLine from '@/components/InputLine.vue';
import { ref } from 'vue';
import TheButton from '../components/TheButton.vue';

const email = ref('')
const password = ref('')

function submitForm() {
  // TODO SET JWT TOKEN
  return (
    email.value.length > 8 &&
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()\-=_+`~;:<>,.{}[\]|\\]).{8,}$/.test(
      password.value
    )
  )
}
</script>

<style lang="scss">
.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .block {
    max-width: 300px;
    padding: 25px 25px 25px 25px;
    background-color: #f2f2f2;
    border: 6px double #242424;
    h1 {
      font-family: Blackchancery, Helvetica, Arial, sans-serif;
      text-align: center;
      margin: 5px 0 10px 0;
      color: #f1c40f;
      font-size: 50px;
    }
    img {
      width: 100%;
    }
    label {
      display: block;
    }
    input[type='text'],
    input[type='password'] {
      width: 100%;
      font-size: 22px;
      border: 1px solid #cbcbcb;
    }
    .actions {
      display: flex;
      justify-content: center;
      a {
        margin-right: 5px;
        text-decoration: none;
      }
      margin: 25px auto 0 auto;
    }
  }
}
</style>
../components/TheButton.vue
