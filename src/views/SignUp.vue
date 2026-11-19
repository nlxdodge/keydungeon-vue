<template>
  <div class="sign-up">
    <div class="block">
      <h1>Keydungeon</h1>
      <img src="../assets/images/key_logo_alt.svg" alt="Keydungeon Alt Logo" />
      <form @submit.prevent="submitForm">
        <InputLine
          name="username"
          v-model="username"
          autocomplete="username"
          autofocus
          :disabled="auth.loading"
        />
        <InputLine
          name="password"
          type="password"
          v-model="password"
          autocomplete="new-password"
          :disabled="auth.loading"
        />
        <p v-if="auth.error" class="error">{{ auth.error }}</p>
        <div class="actions">
          <TheButton to="/">Back</TheButton>
          <TheButton type="submit" :disabled="auth.loading">
            {{ auth.loading ? 'Signing up…' : 'Sign up' }}
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
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

async function submitForm() {
  if (auth.loading || !username.value || !password.value) return

  try {
    await auth.register(username.value, password.value)
    await router.push('/passwords')
  } catch {
    // The error is exposed through the auth store.
  }
}
</script>

<style lang="scss">
.sign-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: $template-color-dark;
  .block {
    max-width: 300px;
    padding: 25px 25px 25px 25px;
    background-color: $template-color-light;
    border: 6px double $template-color-dark;
    h1 {
      font-family: Blackchancery, Helvetica, Arial, sans-serif;
      text-align: center;
      margin: 5px 0 10px 0;
      color: $template-color-main;
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
      a {
        margin-right: 5px;
        text-decoration: none;
      }
      margin: 25px auto 0 auto;
    }
  }
}
</style>
