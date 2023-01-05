<template>
  <header>
    <div class="header-title">
      <the-logo v-if="!sidebarActive"></the-logo>
      <base-heading size="xl">Platform Launch</base-heading>
    </div>
    <div class="options">
      <base-button @click="toggleAddTask">+ Add New Task</base-button>
      <base-dropdown :options="options" @optionClick="toggleBoardDialog"></base-dropdown>
    </div>
  </header>
  <the-dialog v-model="addTaskOn" :tp="false">
    <add-task @closeDialog="closeDialog('addTask')"></add-task>
  </the-dialog>
  <the-dialog v-model="editBoardOn" :tp="false">
    <edit-board @closeDialog="closeDialog('editBoard')"></edit-board>
  </the-dialog>
  <the-dialog v-model="deleteBoardOn" :tp="false">
    <delete-board @closeDialog="closeDialog('deleteBoard')"></delete-board>
  </the-dialog>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import TheLogo from '../TheLogo.vue';
import TheDialog from '../dialog/TheDialog.vue';
import AddTask from '../dialog/AddTask.vue';

import EditBoard from '../dialog/EditBoard.vue';
import DeleteBoard from '../dialog/DeleteBoard.vue';

const store = useStore();
const addTaskOn = ref(false);
const editBoardOn = ref(false);
const deleteBoardOn = ref(false);

const options = ref([
  { value: 'Edit Board', type: 'normal' },
  { value: 'Delete Board', type: 'danger' },
]);
const sidebarActive = computed(() => {
  return store.getters.getSidebar;
});
function toggleBoardDialog(option) {
  if (option.toLowerCase() === 'edit board') {
    editBoardOn.value = !editBoardOn.value;
  } else if (option.toLowerCase() === 'delete board') {
    deleteBoardOn.value = !deleteBoardOn.value;
  }
}

function toggleAddTask() {
  addTaskOn.value = !addTaskOn.value;
}

function closeDialog(dialog) {
  if (dialog === 'editBoard') editBoardOn.value = false;
  if (dialog === 'deleteBoard') deleteBoardOn.value = false;
  if (dialog === 'addTask') addTaskOn.value = false;
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
