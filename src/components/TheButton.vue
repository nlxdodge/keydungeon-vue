<template>
  <button class="button-click-box">
    <div v-if="props.href == undefined" class="button">
      <slot />
    </div>
    <a v-if="props.href != undefined" :href="props.href" class="button">
      <slot />
    </a>
  </button>
</template>

<script setup lang="ts">
interface Props {
  href?: string
}
const props = defineProps<Props>()
</script>

<style lang="scss">
.button-click-box {
  display: contents;

  .button {
    display: inline-block;
    background-color: #242424;
    text-decoration: none;
    color: #f2f2f2;
    border: none;
    padding: 12px 0;
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
}
</style>
