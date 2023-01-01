<template>
  <div class="input-container">
    <label :for="props.title">{{ props.title }}</label>
    <textarea
      @input="updateValue"
      :value="props.modelValue"
      :id="props.title"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<script setup>
const props = defineProps(['title', 'placeholder', 'modelValue']);
const emits = defineEmits(['update:modelValue']);

function updateValue(e) {
  emits('update:modelValue', e.target.value);
}
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
label {
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-family);
  color: var(--font-color);
}
textarea {
  font-size: 12px;
  resize: none;
  font-weight: 500;
  height: 110px;
  font-family: var(--font-family);
  width: auto;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.6rem;
  outline: none;
  color: var(--font-color);
}
</style>
