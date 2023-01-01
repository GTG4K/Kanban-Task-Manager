<template>
  <div class="logo">
    <img v-if="theme === 'dark'" src="/img/logo-light.svg" alt="logo-light" />
    <img v-else src="/img/logo-dark.svg" alt="logo-dark" />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const theme = computed(() => {
  return store.getters.getTheme;
});
</script>

<style scoped>
.logo {
  display: flex;
  align-content: center;
  height: var(--header-height);
}
img {
  width: 150px;
  object-fit: contain;
}
</style>
