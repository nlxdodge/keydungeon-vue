<template>
  <div class="passwords-view">
    <div class="filter">
      <p>You currently have {{ passwords.length }} accounts</p>
      <TheButton @click="$router.push('/passwords/add')" text="Add" />
      <InputLine name="filter" :v-model="filter" />
    </div>
    <div class="passwords">
      <div class="password" v-for="password in props.passwords" :key="password.name">
        <PasswordLine :password="password" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordLine from '../../components/PasswordLine.vue'
import TheButton from '../../components/TheButton.vue'
import InputLine from '../../components/InputLine.vue'
import type { Password } from '@/stores/models/Password'

const props = defineProps({
  passwords: {
    type: [] as Password[],
    required: false
  }
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
