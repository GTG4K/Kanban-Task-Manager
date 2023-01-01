<template>
  <sidebar-component :class="bodyStyle"></sidebar-component>
  <main :class="bodyStyle">
    <the-header></the-header>
    <router-view></router-view>
    <div class="dialog"></div>
  </main>
</template>

<script setup>
import SidebarComponent from './components/ui/sidebar/SidebarComponent.vue';
import TheHeader from './components/ui/header/TheHeader.vue';
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const theme = computed(() => {
  return store.getters.getTheme;
});
const sidebarActive = computed(() => {
  return store.getters.getSidebar;
});
const bodyStyle = computed(() => {
  return {
    light: theme.value === 'light',
    dark: theme.value === 'dark',
    sidebarActive: sidebarActive.value,
  };
});

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
  emit('toggleSidebar');
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
:root {
  --font-family: 'Roboto', sans-serif;

  --color-main-100: hsl(242, 48%, 58%);
  --color-main-200: hsl(243, 100%, 82%);

  --color-accent-100: hsl(0, 0%, 100%);
  --color-accent-200: hsl(220, 69%, 97%);
  --color-accent-300: hsl(221, 69%, 94%);
  --color-accent-400: hsl(216, 15%, 57%);
  --color-accent-500: hsl(236, 11%, 27%);
  --color-accent-600: hsl(235, 12%, 19%);
  --color-accent-700: hsl(235, 16%, 15%);
  --color-accent-800: hsl(237, 100%, 4%);

  --color-shadow-dark: hsl(237, 100%, 4%, 0.2);
  --color-shadow-light: hsl(216, 15%, 57%, 0.2);

  --color-button-extra-light: hsl(216, 15%, 57%, 0.2);
  --color-button-extra-dark: hsl(237, 100%, 4%, 0.2);

  --color-button-extra-light-hover: hsl(216, 15%, 57%, 0.35);
  --color-button-extra-dark-hover: hsl(237, 100%, 4%, 0.35);

  --color-error-100: hsl(0, 78%, 63%);
  --color-error-200: hsl(0, 100%, 80%);
  --filter-error: brightness(0) saturate(100%) invert(39%) sepia(12%) saturate(2310%)
    hue-rotate(313deg) brightness(120%) contrast(117%);

  --color-background-light: var(--color-accent-200);
  --color-background-dark: var(--color-accent-700);
  --color-card-light: var(--color-accent-100);
  --color-card-dark: var(--color-accent-600);
  --color-card-hover-light: var(--color-accent-200);
  --color-card-hover-dark: var(--color-accent-100);
  --color-border-light: var(--color-accent-300);
  --color-border-dark: var(--color-accent-500);

  --heading-color-light-100: var(--color-accent-800);
  --heading-color-dark-100: var(--color-accent-100);
  --heading-color-200: var(--color-accent-400);
  --button-text-color: var(--color-accent-100);

  --color-backdrop: hsl(0, 0%, 0%, 0.5);

  --header-height: 90px;
  --sidebar-width: 300px;

  --task-hover-light: var(--color-accent-200);
  --task-hover-dark: var(--color-accent-500);
}
.light {
  --color-card: var(--color-card-light);
  --color-background: var(--color-background-light);
  --color-border: var(--color-border-light);
  --color-shadow: var(--color-shadow-light);
  --color-card-hover: var(--color-main-200);
  --color-button-extra: var(--color-button-extra-light);
  --color-button-extra-hover: var(--color-button-extra-light-hover);
  --font-color: var(--color-accent-700);
  --task-hover: var(var(--task-hover-light));
}
.dark {
  --color-card: var(--color-card-dark);
  --color-background: var(--color-background-dark);
  --color-border: var(--color-border-dark);
  --color-shadow: var(--color-shadow-dark);
  --color-card-hover: var(--color-card-hover-dark);
  --color-button-extra: var(--color-button-extra-dark);
  --color-button-extra-hover: var(--color-button-extra-dark-hover);
  --font-color: var(--color-accent-100);
  --task-hover: var(--task-hover-dark);
}
a {
  text-decoration: none;
}

/* layout */
#app {
  display: flex;
}
app-container {
  width: 100vw;
  height: 100vh;
}
main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--color-background);
}
main.sidebarActive {
  width: calc(100vw - var(--sidebar-width));
}
</style>
