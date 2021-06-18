<template>
  <div class="password-line">
    <a :href="password.url">
      <p>{{ password.name }}</p>
    </a>
    <p>{{ password.username }}</p>
    <Button text="Edit" />
    <Button
      :data-clipboard-text="password.password"
      text="Copy"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from './Button.vue'

export default defineComponent({
  name: 'PasswordLine',
  components: {
    Button,
  },
  props: {
    password: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toClipboard() {
      // copy it to the clipboard
    },
  },
});
</script>

<style lang="scss">
.password {
  border: 1px solid black;
}
</style>
