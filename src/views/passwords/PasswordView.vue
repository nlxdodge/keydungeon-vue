<template>
  <div class="passwords">
    <div class="block">
      <div class="flex">
        <p>You currently have {{ passwords.length }} accounts</p>
        <Button
          @click="$router.push('/passwords/add')"
          text="Add"
        />
      </div>
      <div
        v-for="password in passwords"
        :key="password.name"
      >
        <PasswordLine :password="password" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PasswordLine from '../../components/PasswordLine.vue'
import Button from '../../components/Button.vue'

export default defineComponent({
  name: 'Passwords',
  components: {
    PasswordLine,
    Button,
  },
  data() {
    return {
      passwords: [
        {
          url: 'https://bla.com/',
          name: 'Google',
          username: 'doodoking',
          password: '12345678',
        },
        {
          url: 'https://bla2.com/',
          name: 'Netflix',
          username: 'nlxdodge@gmail.com',
          password: 'password2',
        },
      ],
    }
  },
})
</script>

<style lang="scss">
.passwords {
  .flex {
    display: flex;
  }

  display: grid;
  grid-template-columns: 10% 80% 10%;

  @include media('>tablet', '<desktop') {
    grid-template-columns: 20% 60% 20%;
  }

  @include media('>desktop') {
    grid-template-columns: 35% 30% 35%;
  }

  .block {
    grid-column-start: 2;
    grid-column-end: 3;
  }
}
</style>
