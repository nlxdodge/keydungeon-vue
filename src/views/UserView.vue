<template>
  <div class="user-view">
    <div class="block">
      <h1>User:</h1>
      <form @submit.prevent="submit()">
        <InputLine name="props.user.email" />
        <InputLine name="password" type="password" />
        <TheButton @click.prevent="submit()" text="Save" />
      </form>
      <table>
        <caption>
          Past sign-ins:
        </caption>
        <tr>
          <td>1</td>
          <td>83.83.243.38</td>
          <td>09:24:00 at 21-04-2021</td>
        </tr>
        <tr>
          <td>2</td>
          <td>83.83.243.39</td>
          <td>09:24:20 at 21-04-2021</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheButton from '../components/TheButton.vue'
import InputLine from '../components/InputLine.vue'
import type { User } from '../stores/models/User'

const props = defineProps({
  user: {
    type: {} as User,
    required: true
  }
})

function formValid(): bool {
  return (
    props.value.user.username.length > 0 &&
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/.test(props.value.user.password)
  )
}

function submit() {
  if (!formValid()) {
    console.log('invalid')
    return
  } else {
    console.log('this is valid!')
  }
}
</script>

<style lang="scss">
.user-view {
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

  table {
    margin-top: 50px;
    width: 100%;
  }
}
</style>
../components/TheButton.vue
