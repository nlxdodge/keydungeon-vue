<template>
  <div class="button">
    {{ text }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    text: {
      type: String,
      default: 'Click',
      required: true
    }
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

  @include media("<tablet") {
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    background-color: #f1c40f;
  }
}
</style>