<template>
  <div class="input-line">
    <label :for="'label-' + props.name">{{ toUpperCaseFirst(props.name) }}:</label>
    <input :id="'label-' + props.name" :name="props.name" :type="props.type" v-model="model" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  type?: string
}

const model = defineModel()
const props = withDefaults(defineProps<Props>(), {
  name: '',
  type: 'text'
})
console.log("model", model.value)
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
