<template>
  <div class="dropdown-container" :class="dropdownActive">
    <img
      src="../../assets/svg/icon-vertical-ellipsis.svg"
      alt=""
      @click="toggleDropdown"
    />
    <div class="dropdown">
      <h2
        v-for="option in options"
        :key="option.value"
        :class="option.type"
        @click="toggleDropdown"
      >
        {{ option.value }}
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['options']);

const active = ref(false);
const dropdownActive = computed(() => {
  return { dropdownActive: active.value };
});

function toggleDropdown() {
  active.value = !active.value;
}
</script>

<style scoped>
img {
  cursor: pointer;
  height: 25px;
  width: 25px;
  object-fit: contain;
  border-radius: 50%;
}
.dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
}
.dropdown {
  position: absolute;
  top: 70px;
  left: 20px;
  transform: translate(-100%, 0);
  width: 150px;
  max-height: 0px;
  background: var(--color-card);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}
.dropdownActive .dropdown {
  max-height: 100px;
}
.dropdown h2 {
  color: var(--color-accent-400);
  font-family: var(--font-family);
  font-size: 13px;
  cursor: pointer;
  padding: 0.8rem;
  transition: all 0.2s ease-in-out;
}
.dropdown h2.danger {
  color: var(--color-error-100);
  font-family: var(--font-family);
  font-size: 13px;
  cursor: pointer;
  padding: 0.8rem;
}
.dark .dropdown h2:hover {
  background: var(--color-card-hover);
  color: var(--color-main-100);
  transition: all 0.2s ease-in-out;
}
.light .dropdown h2:hover {
  background: var(--color-card-hover);
  color: var(--color-accent-100);
  transition: all 0.2s ease-in-out;
}
.dropdown h2.danger:hover {
  background: var(--color-error-100);
  color: var(--color-accent-100);
}
</style>
