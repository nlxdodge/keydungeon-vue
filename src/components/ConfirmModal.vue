<template>
  <Teleport to="body">
    <div v-if="props.show" class="confirm-modal" @click.self="emit('cancel')">
      <div class="confirm-modal__box" role="dialog" aria-modal="true">
        <h2>{{ props.title }}</h2>
        <p>{{ props.message }}</p>
        <div class="confirm-modal__actions">
          <TheButton type="button" @click="emit('cancel')">{{ props.cancelLabel }}</TheButton>
          <TheButton type="button" variant="danger" @click="emit('confirm')">
            {{ props.confirmLabel }}
          </TheButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import TheButton from '@/components/TheButton.vue'

interface Props {
  show: boolean
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Are you sure?',
  message: '',
  confirmLabel: 'Yes',
  cancelLabel: 'No'
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<style lang="scss">
.confirm-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);

  &__box {
    width: min(90vw, 400px);
    background-color: #f2f2f2;
    border: 6px double #242424;
    padding: 20px 25px;
    font-family: AlegreyaSans, Helvetica, Arial, sans-serif;
    text-align: center;

    h2 {
      margin: 0 0 10px 0;
      color: #242424;
      font-size: 26px;
    }

    p {
      margin: 0;
      color: #242424;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
}
</style>
