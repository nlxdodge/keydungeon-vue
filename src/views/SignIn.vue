<template>
  <div class="sign-in">
    <div class="block">
      <h1>Keydungeon</h1>
      <img
        src="../assets/images/key_logo_alt.svg"
        alt="Keydungeon Alt Logo"
      >
      <form @submit.prevent="submit()">
        <div>
          <label for="username">Username: </label>
          <input
            type="text"
            name="username"
            v-model="username"
            autofocus
          >
        </div>
        <div>
          <label for="password">Password: </label>
          <input
            type="password"
            name="password"
            v-model="password"
          >
        </div>
        <div class="actions">
          <a href="/sign-up">
            <Button text="Sign Up" />
          </a>
          <Button
            @submit.prevent="submit()"
            text="Sign In"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../components/Button.vue'

export default defineComponent({
  name: "SignIn",
  components: {
    Button,
  },
  data() {
    return {
      username: "",
      password: "",
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
    input[type="text"],
    input[type="password"] {
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
