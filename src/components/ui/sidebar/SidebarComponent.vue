<template>
  <aside>
    <div class="sidebar-nav">
      <the-logo class="sidebar-logo"></the-logo>
      <sidebar-boards></sidebar-boards>
    </div>
    <div class="sidebar-actions">
      <div class="theme-toggle">
        <img src="../../../assets/svg/icon-dark-theme.svg" alt="" />
        <base-switch @click="toggleTheme" v-model="theme"></base-switch>
        <img src="../../../assets/svg/icon-light-theme.svg" alt="" />
      </div>
      <sidebar-button
        v-if="sidebarOpen"
        type="hide"
        @click="toggleSidebar"
      ></sidebar-button>
      <sidebar-button
        v-else
        type="show"
        @click="toggleSidebar"
        class="show-btn"
      ></sidebar-button>
    </div>
  </aside>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import SidebarBoards from './SidebarBoards.vue';
import SidebarButton from './SidebarButton.vue';
import TheLogo from '../TheLogo.vue';

const store = useStore();
const theme = ref(false);
const sidebarOpen = ref(true);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
  store.commit('toggleSidebar');
}
const boardNames = computed(() => {
  return store.getters.getBoardNames;
});
const allBoards = computed(() => {
  return `ALL BOARDS (${boardNames.value.length})`;
});
const sidebarStyling = computed(() => {
  return { active: sidebarOpen.value };
});

function toggleTheme() {
  store.commit('toggleTheme');
}
</script>

<style scoped>
aside {
  --sidebar-padding: 1.2rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
aside {
  width: 0px;
  height: 100vh;
  background: var(--color-card);
  border-right: 1px solid var(--color-border);
}
aside.sidebarActive {
  width: var(--sidebar-width);
}
.sidebar-logo {
  padding: 0 0 0 var(--sidebar-padding);
}
.theme-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-background);
  height: 35px;
  margin: 0 1.2rem;
  border-radius: 8px;
  gap: 1rem;
}
.theme-toggle img {
  width: 20px;
  height: 20px;
}
.sidebar-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0;
}
.show-btn {
  position: absolute;
  left: 0;
  bottom: 2rem;
}
</style>
