<template>
  <header>
    <div class="header-title">
      <the-logo v-if="!sidebarActive"></the-logo>
      <base-heading size="xl">Platform Launch</base-heading>
    </div>
    <div class="options">
      <base-button @click="toggleAddTask">+ Add New Task</base-button>
      <base-dropdown :options="options"></base-dropdown>
    </div>
  </header>
  <the-dialog v-model="addTaskOn" :tp="false">
    <add-task></add-task>
  </the-dialog>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import TheLogo from '../TheLogo.vue';
import TheDialog from '../dialog/TheDialog.vue';
import AddTask from '../dialog/AddTask.vue';

const store = useStore();
const addTaskOn = ref(false);

const options = ref([
  { value: 'Edit Board', type: 'normal' },
  { value: 'Delete Board', type: 'danger' },
]);
const sidebarActive = computed(() => {
  return store.getters.getSidebar;
});

function toggleAddTask() {
  addTaskOn.value = !addTaskOn.value;
}
</script>

<style scoped>
header {
  background: var(--color-card);
  height: var(--header-height);
  border-bottom: 1px solid var(--color-border);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}
.options {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.header-title {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
</style>
