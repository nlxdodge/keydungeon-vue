<template>
  <div class="input-line">
    <label :for="'label-' + name">{{ capitalize(name) }}:</label>
    <input
      :id="'label-' + name"
      :name="name"
      :type="type"
      :v-model="vModel"
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import mixins from "../mixins"

export default defineComponent({
  name: "InputLine",
  mixins: [mixins],
  props: {
    name: {
      type: String,
      default: "",
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    vModel: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss">
.input-line {
  width: 100%;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 100%;

  @include media(">tablet", "<desktop") {
    grid-template-columns: 33% 67%;
  }

  @include media(">desktop") {
    grid-template-columns: 40% 60%;
  }
}
</style>
