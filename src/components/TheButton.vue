<template>
  <RouterLink v-if="props.to !== undefined" :to="props.to" class="button" :class="variantClass">
    <slot />
  </RouterLink>
  <button
    v-else
    :type="props.type"
    class="button"
    :class="variantClass"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

interface Props {
  to?: RouteLocationRaw
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'danger'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'submit',
  variant: 'default',
  disabled: false
})

const variantClass = computed(() => (props.variant === 'danger' ? 'button--danger' : ''))
</script>

<style lang="scss">
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
  font-size: inherit;
  font-family: inherit;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @include media('<tablet') {
    width: 100%;
  }

  &:hover:not(:disabled) {
    cursor: pointer;
    background-color: #f1c40f;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.button--danger {
    background-color: #c0392b;

    &:hover:not(:disabled) {
      background-color: #e74c3c;
      color: #fff;
    }
  }
}
</style>
