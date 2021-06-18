
<template>
  <div class="dashboard">
    <div
      class="block"
    >
      <h1>Passwords:</h1>
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
import PasswordLine from '@/components/PasswordLine.vue'

export default {
  name: "Dashboard",
  components: {
    PasswordLine,
  },
  data() {
    return {
      passwords: [
        {
          url: "https://bla.com/",
          name: "Google",
          username: "doodoking",
          password: "12345678",
        },
        {
          url: "https://bla2.com/",
          name: "Netflix",
          username: "nlxdodge@gmail.com",
          password: "password2",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.dashboard {
  display: grid;
  grid-template-columns: 10% 80% 10%;

  @include media(">tablet", "<desktop") {
    grid-template-columns: 20% 60% 20%;
  }

  @include media(">desktop") {
    grid-template-columns: 35% 30% 35%;
  }

  .block {
    grid-column-start: 2;
    grid-column-end: 3;
  }
}
</style>
