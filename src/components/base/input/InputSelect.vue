<template>
  <div class="select-container" :class="activeStyling">
    <label>{{ props.title }}</label>
    <div class="select" @click="toggleSelect">
      <h2>{{ selectedOption }}</h2>
      <img src="../../../assets/svg/icon-chevron-down.svg" alt="" />
    </div>
    <div class="select-options">
      <div v-for="option in options" :key="option" class="select-option">
        <h2 @click="changeSelect(option)">{{ option }}</h2>
      </div>
      <div class="backdrop"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['title', 'placeholder', 'modelValue', 'options']);
const emits = defineEmits(['update:modelValue']);

const selectedOption = ref(props.modelValue);
const selected = ref(false);

const activeStyling = computed(() => {
  return { selectActive: selected.value };
});

function toggleSelect() {
  selected.value = !selected.value;
}

function changeSelect(option) {
  selectedOption.value = option;
  emits('update:modelValue', selectedOption.value);
  selected.value = false;
}

function updateValue(value) {
  emits('update:modelValue', value);
}
</script>

<style scoped>
img {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
label {
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-family);
  color: var(--font-color);
  user-select: none;
}
h2 {
  user-select: none;
}
.select-container {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
}
.select {
  width: auto;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.6rem;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select:hover {
  border-color: var(--color-main-100);
}
.select h2 {
  font-family: var(--font-family);
  color: var(--font-color);
  font-weight: 300;
  font-size: 13px;
}
.select img {
  width: 15px;
  object-fit: contain;
  transition: 0.2s ease-in-out;
}

.selectActive .select img {
  transform: rotate(-180deg);
}

.select-options {
  position: absolute;
  width: 100%;
  top: 68px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-background);
  max-height: 0px;
  transition: 0.2s ease-in-out;
  z-index: 4;
}
.selectActive .select-options {
  max-height: 300px;
}

.select-option {
  padding: 0.5rem 1rem;
  font-family: var(--font-family);
  color: var(--font-color);
  cursor: pointer;
}
.select-option:hover {
  background: var(--color-card-hover);
}
.dark .select-option:hover {
  color: var(--color-main-100);
}
</style>
