<template>
  <div class="error-view">
    <div class="block">
      <h1>This page does not exist</h1>
      <TheButton type="button" href="/passwords">View passwords</TheButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheButton from '../components/TheButton.vue'
</script>

<style lang="scss">
.error-view {
  display: grid;
  grid-template-columns: 10% 80% 10%;

  .button {
      width: 100%;
      max-width: 360px;
  }

  @include media('>tablet', '<desktop') {
    grid-template-columns: 20% 60% 20%;
  }

  @include media('>desktop') {
    grid-template-columns: 35% 30% 35%;
  }

  .block {
    grid-column-start: 2;
    grid-column-end: 3;
    text-align: center;
  }
}
</style>
