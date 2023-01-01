<template>
  <div class="checkbox-container" @click="toggleCheckbox" :class="checkboxStyle">
    <div class="checkbox">
      <img v-if="checkboxActive" src="../../../assets/svg/icon-check.svg" alt="" />
    </div>
    <h2>{{ props.subtask.title }}</h2>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['modelValue', 'subtask']);
const emits = defineEmits(['update:modelValue']);

const checkboxActive = ref(props.modelValue);

const checkboxStyle = computed(() => {
  return { checked: checkboxActive.value };
});

function toggleCheckbox() {
  checkboxActive.value = !checkboxActive.value;
}
</script>

<style scoped>
.checkbox-container {
  border-radius: 8px;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background);
  display: flex;
  align-items: center;
  cursor: pointer;
}
.checkbox {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
}
.checked .checkbox {
  background: var(--color-main-100);
}
img {
  user-select: none;
}
h2 {
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-family);
  color: var(--font-color);
  user-select: none;
}
</style>
