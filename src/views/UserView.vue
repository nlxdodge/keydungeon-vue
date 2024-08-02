userStoreImport
<template>
  <div class="user-view">
    <div class="block">
      <h1>User:</h1>
      <form @submit.prevent="submitForm()">
        <InputLine name="email" :vModel="userRef.email" v-focus />
        <InputLine name="password" type="password" :vModel="userRef.password" />
        <TheButton>Save</TheButton>
      </form>
      <table>
        <caption>
          Past sign-ins:
        </caption>
        <tr>
          <th>Type</th>
          <th>IP Address</th>
          <th>Date</th>
        </tr>
        <tr v-for="event in events.get().slice(0, 10)" :key="event.id">
          <td>{{ toUpperCaseFirst(EventType[event.eventType]) }}</td>
          <td>{{ JSON.parse(event.metadata).ip_address }}</td>
          <td>{{ JSON.parse(event.metadata).date }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputLine from '../components/InputLine.vue'
import TheButton from '../components/TheButton.vue'
import type { User } from '../stores/models/User'
import type { Event } from '../stores/models/Event'
import { EventType } from '../stores/models/EventType'
import { userStore } from '@/stores/userStore'
import { eventStore } from '@/stores/eventsStore'

const user = userStore()
const events = eventStore()

const userRef = ref({} as User)
const eventsRef = ref([] as Event[])
if (user != null) {
  userRef.value = user.get()
}
if (events != null) {
  eventsRef.value = events.get()
}

function submitForm() {
  console.log('saving user details')
  const valid =
    userRef.value.email.length > 0 &&
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/.test(userRef.value.password)
  if (valid) {
    // send data to backend
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
