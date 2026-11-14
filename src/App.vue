<template>
  <div
    id="app"
    :class="backgroundColorClass"
  >
    <header v-if="auth.isAuthenticated">
      <nav>
        <img
          src="./assets/images/key_small.svg"
          alt="Logo"
        >
        <router-link to="/passwords">
          Passwords
        </router-link>
        <router-link to="/user">
          User
        </router-link>
        <button
          type="button"
          class="sign-off"
          @click="signOff"
        >
          Sign out
        </button>
      </nav>
    </header>
    <RouterView />
    <NotificationModal />
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouterLink, RouterView } from 'vue-router'
import NotificationModal from '@/components/NotificationModal.vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
const router = useRouter()

const backgroundColorClass = 'dark'

function signOff() {
  auth.logout()
  router.push('/')
}
</script>

<style lang="scss">
html {
  background-color: #fff;
  font-size: 24px;

  &.dark {
    background-color: #242424;
  }
}

#app,
input {
  font-family: AlegreyaSans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  height: 50px;

  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #242424;
    color: #fff;
    font-size: 22px;
    display: flex;
    align-items: center;

    & > *:not(img) {
      padding: 13px;

      &:hover:not(img) {
        background-color: #f1c40f;
        color: #242424;
        cursor: pointer;
      }
    }

    a {
      color: #fff;
      text-decoration: none;
    }

    .sign-off {
      background: none;
      border: none;
      color: #fff;
      font: inherit;
    }

    img {
      width: 40px;
      margin: 5px 8px 5px 5px;
    }
  }
}
</style>
