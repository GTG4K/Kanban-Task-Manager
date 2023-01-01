<template>
  <Teleport v-if="props.tp === true" to="main">
    <div v-if="props.modelValue" class="dialog-container">
      <div class="dialog">
        <slot></slot>
      </div>
      <div @click="toggleDialog" class="dialog-backdrop"></div>
    </div>
  </Teleport>
  <div v-else-if="props.modelValue && props.tp === false">
    <div class="dialog">
      <slot></slot>
    </div>
    <div @click="toggleDialog" class="dialog-backdrop"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps(['modelValue', 'tp']);
const emit = defineEmits(['update:modelValue']);

function toggleDialog() {
  emit('update:modelValue', !props.modelValue);
}
</script>

<style scoped>
.dialog {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  width: 480px;
  transform: translate(-50%, -50%);
  background: var(--color-card);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 8px;
}
.dialog-backdrop {
  position: fixed;
  z-index: 998;
  width: 100vw;
  height: 100vh;
  background: var(--color-backdrop);
  top: 0;
  left: 0;
}
</style>
