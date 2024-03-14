<template>
  <div class="input-line">
    <label :for="'label-' + props.name">{{ capitalize(props.name) }}:</label>
    <input
      :id="'label-' + props.name"
      :name="props.name"
      :type="props.type"
      :v-model="props.vModel"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: '',
    required: true
  },
  type: {
    type: String,
    default: ''
  },
  vModel: {
    type: String,
    default: ''
  }
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
