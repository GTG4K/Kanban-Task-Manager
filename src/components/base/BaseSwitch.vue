<template>
  <div class="switch-body" :class="{ switchActive: active }" @click="toggleSwitch">
    <div class="switch-toggle"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(props.modelValue);
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

function toggleSwitch() {
  active.value = !active.value;
  emit('update:modelValue', active.value);
}
</script>

<style scoped>
.switch-body {
  position: relative;
  width: 50px;
  height: 22px;
  background: var(--color-main-100);
  border-radius: 100vh;
}
.switch-toggle {
  position: absolute;
  height: 17px;
  width: 17px;
  border-radius: 100%;
  top: 50%;
  left: 2px;
  transform: translate(0, -50%);
  background: var(--color-accent-100);
  transition: 0.2s ease-in-out;
}
.switchActive .switch-toggle {
  left: 100%;
  transform: translate(calc(-100% - 2px), -50%);
}
</style>
