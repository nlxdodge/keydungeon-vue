<template>
  <div class="input-line">
    <label :for="'label-' + props.name">{{ toUpperCaseFirst(props.name) }}:</label>
    <input
      ref="input"
      :id="'label-' + props.name"
      :name="props.name"
      :type="props.type"
      :autocomplete="props.autocomplete"
      v-model="model"
    />
  </div>
</template>

<script setup lang="ts">
import { toUpperCaseFirst } from '@/mixins'
import { onMounted, ref } from 'vue'

interface Props {
  name: string
  type?: string
  autocomplete?: string
  autofocus?: boolean
}

const model = defineModel<string>()
const props = withDefaults(defineProps<Props>(), {
  name: '',
  type: 'text',
  autocomplete: 'off',
  autofocus: false
})

const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autofocus) input.value?.focus()
})
</script>

<style lang="scss">
.input-line {
  width: 100%;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 100%;

  @include media('>tablet', '<desktop') {
    grid-template-columns: 33% 67%;
  }

  @include media('>desktop') {
    grid-template-columns: 40% 60%;
  }
}
</style>
