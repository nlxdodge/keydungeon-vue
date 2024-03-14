<template>
  <div v-if="!props.href" class="button">
    {{ props.text }}
  </div>
  <a v-if="props.href" :href="props.href" class="button">
    {{ props.text }}
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: 'Click',
    required: true
  },
  href: {
    type: String,
    default: '',
    required: false
  }
})
</script>

<style lang="scss">
.button {
  background-color: #242424;
  text-decoration: none;
  color: #f2f2f2;
  border: none;
  padding: 6px 0;
  width: 124px;
  text-align: center;
  margin-top: 10px;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @include media('<tablet') {
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    background-color: #f1c40f;
  }
}
</style>
