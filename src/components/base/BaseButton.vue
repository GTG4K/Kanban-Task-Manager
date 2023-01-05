<template>
  <button :type="props.type" :class="styling">
    <h2>
      <slot></slot>
    </h2>
  </button>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(['type', 'size', 'theme']);

const styling = computed(() => {
  return {
    full: props.size === 'full',
    invert: props.theme === 'invert',
    danger: props.theme === 'danger',
  };
});
</script>

<style scoped>
button {
  height: 45px;
  min-width: 165px;
  background: var(--color-main-100);
  border-radius: 100vh;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease-in-out;
}
button.full {
  width: 100%;
}
button:hover {
  background: var(--color-main-200);
}
h2 {
  font-family: var(--font-family);
  color: var(--button-text-color);
  font-weight: 500;
  font-size: 16px;

  transition: background color 0.2s ease-in-out;
}

/* invert */
.dark button.invert {
  background: var(--color-accent-100);
  border: 2px solid var(--color-accent-100);
}
.dark button.invert h2 {
  color: var(--color-main-100);
}
.dark button.invert:hover {
  background: var(--color-main-100);
  border: 2px solid var(--color-main-200);
}
.dark button.invert:hover h2 {
  color: var(--color-accent-100);
}

/* DANGER */
.dark button.danger {
  background: var(--color-error-100);
}
.dark button.danger h2 {
  color: var(--color-accent-100);
}
.dark button.danger:hover {
  background: var(--color-error-200);
}
.dark button.danger:hover h2 {
  color: var(--color-accent-100);
}
</style>
