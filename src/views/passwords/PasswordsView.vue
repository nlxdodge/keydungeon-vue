<template>
  <div class="passwords-view">
    <div class="filter">
      <p>You currently have {{ shownPasswords.length }} accounts</p>
      <TheButton href="/passwords/add">Add</TheButton>
      <InputLine name="filter" :vModel="filter" v-focus />
    </div>
    <div class="passwords">
      <div class="password" v-for="password in shownPasswords as Password[]" :key="password.name">
        <PasswordLine :password="password" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Password } from '@/stores/models/Password'
import { passwordStore } from '@/stores/passwordsStore'
import { computed, ref } from 'vue'
import InputLine from '../../components/InputLine.vue'
import PasswordLine from '../../components/PasswordLine.vue'
import TheButton from '../../components/TheButton.vue'

const store = passwordStore()

const filter = ref('test')
const shownPasswords = computed(() => {
  if (filter.value != null && filter.value != '') {
    return store.get().filter((p: Password) => p.name == filter.value)
  }
  return store.get()
})
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
