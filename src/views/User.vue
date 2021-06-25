<template>
  <div class="user">
    <div class="block">
      <h1>User:</h1>
      <form @submit.prevent="submit()">
        <InputLine name="email" />
        <InputLine name="password" />
        <Button
          @submit.prevent="submit()"
          text="Save"
        />
      </form>
      <table>
        <caption>Past sign-ins</caption>
        <tr>
          <td>
            1
          </td>
          <td>
            83.83.243.38
          </td>
          <td>
            09:24:00 at 21-04-2021
          </td>
        </tr>
        <tr>
          <td>
            2
          </td>
          <td>
            83.83.243.39
          </td>
          <td>
            09:24:20 at 21-04-2021
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from "../components/Button.vue"
import InputLine from "../components/InputLine.vue"

export default defineComponent({
  name: "User",
  components: {
    Button,
    InputLine,
  },
  data() {
    return {
      email: "test",
      password: "empty",
    };
  },
  computed: {
    formValid() {
      return (
        this.username.length > 8 &&
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()\-=_+`~;:<>,.{}[\]|\\]).{8,}$/.test(
          this.password
        )
      );
    },
  },
  methods: {
    submit() {
      if (!this.formValid()) {
        console.log("invalid");
        return;
      } else {
        console.log("this is valid!");
        // form is valid do sign-in call and save sign-in to localStorage/cookie
      }
    },
  },
})
</script>

<style lang="scss">
.user {
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

  table {
    margin-top: 50px;
    width: 100%;
  }
}
</style>
