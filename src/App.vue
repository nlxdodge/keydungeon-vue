<template>
  <div class="app">
    <nav v-if="isLoggedIn()">
      <router-link to="/">
        Dashboard
      </router-link> |
      <router-link to="/user">
        User
      </router-link>
      <div @click="logout()">
        Log out
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      signedIn: false
    }
  },
  computed: {
    isLoggedIn () {
      return this.signedIn;
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "AlegreyaSans";
  src: url("assets/fonts/AlegreyaSans-Light.ttf") format("truetype");
}

@font-face {
  font-family: "BlackChancery";
  src: url("assets/fonts/BlackChancery.ttf") format("truetype");
}

html {
  background-color: #242424;
  font-size: 20px;
}

#app,
input {
  font-family: AlegreyaSans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
