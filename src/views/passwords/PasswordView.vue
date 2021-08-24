<template>
  <div class="passwords-view">
    <div class="filter">
      <p>You currently have {{ passwords.length }} accounts</p>
      <Button
        @click="$router.push('/passwords/add')"
        text="Add"
      />
      <InputLine
        name="filter"
        :v-model="filter"
      />
    </div>
    <div class="passwords">
      <div
        class="password"
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
import PasswordLine from '../../components/PasswordLine.vue';
import Button from '../../components/Button.vue';
import InputLine from '../../components/InputLine.vue';

export default defineComponent({
  name: 'PasswordsView',
  components: {
    PasswordLine,
    Button,
    InputLine,
  },
  data() {
    return {
      filter: '',
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
        {
          url: 'https://bla2.com/',
          name: 'Twitter',
          username: 'nlxdodge@gmail.com',
          password: 'password2',
        },
        {
          url: 'https://bla2.com/',
          name: 'Wordpress',
          username: 'nlxdodge@gmail.com',
          password: 'password2',
        },
        {
          url: 'https://bla2.com/',
          name: 'Wordpress',
          username: 'nlxdodge@gmail.com',
          password: 'password2',
        },
        {
          url: 'https://bla2.com/',
          name: 'Wordpress',
          username: 'nlxdodge@gmail.com',
          password: 'password2',
        },
        {
          url: 'https://bla2.com/',
          name: 'Wordpress',
          username: 'nlxdodge@gmail.com',
          password: 'password2',
        },
        {
          url: 'https://bla2.com/',
          name: 'Wordpress',
          username: 'nlxdodge@gmail.com',
          password: 'password2',
        },
      ],
    };
  },
  computed: {

  }
});
</script>

<style lang="scss">
.passwords-view {
  .filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;
    padding: 0 20px;
    max-width: 600px;

    .button {
      margin: 0 0 15px 0;
      @include media('>=tablet') {
        margin: 0;
      }
    }
  }

  .passwords {
    display: grid;
    margin: 25px;
    grid-template-columns: 100%;
    gap: 25px;

    @include media('>tablet', '<desktop') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include media('>desktop', '<desktop-xl') {
      grid-template-columns: repeat(3, 1fr);
    }

    @include media('>desktop-xl') {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
