<template>
  <div class="sign-in">
    <div class="block">
      <h1>Keydungeon</h1>
      <img src="../assets/images/key_logo_alt.svg" alt="Keydungeon Alt Logo" />
      <form @submit.prevent="submitForm">
        <InputLine name="username" v-model="username" autocomplete="username" v-focus />
        <InputLine
          name="password"
          type="password"
          v-model="password"
          autocomplete="current-password"
        />
        <p v-if="auth.error" class="error">{{ auth.error }}</p>
        <div class="actions">
          <TheButton href="/sign-up">Sign up</TheButton>
          <TheButton type="submit" :disabled="auth.loading">
            {{ auth.loading ? 'Signing in…' : 'Sign in' }}
          </TheButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputLine from '@/components/InputLine.vue'
import TheButton from '@/components/TheButton.vue'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')

async function submitForm() {
  if (!username.value || !password.value) return

  try {
    await auth.login(username.value, password.value)
    const redirect = route.query.redirect
    await router.push(typeof redirect === 'string' ? redirect : '/passwords')
  } catch {
    // The error is exposed through the auth store.
  }
}
</script>

<style lang="scss">
.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: $template-color-dark;
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
    .input-line {
      grid-template-columns: 100%;
    }
    input[type='text'],
    input[type='password'] {
      width: 100%;
      font-size: 22px;
      border: 1px solid #cbcbcb;
    }
    .error {
      color: #c0392b;
      font-size: 18px;
      margin: 10px 0 0 0;
    }
    .actions {
      display: flex;
      justify-content: center;
      margin: 25px auto 0 auto;
      a {
        margin-right: 5px;
        text-decoration: none;
      }
    }
  }
}
</style>
