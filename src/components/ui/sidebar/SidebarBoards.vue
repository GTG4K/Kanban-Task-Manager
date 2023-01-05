<template>
  <div class="boards-container">
    <base-heading class="boards-title" size="s">
      {{ allBoards }}
    </base-heading>
    <div class="boards">
      <router-link v-for="name in boardNames" :key="name" :to="`/task/${name}`">
        <sidebar-button :title="name"></sidebar-button>
      </router-link>
      <sidebar-button type="new" @click="toggleNewBoard"></sidebar-button>
    </div>
    <the-dialog :tp="false" v-model="newBoardOn">
      <add-board @closeDialog="closeDialog"></add-board>
    </the-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import SidebarButton from './SidebarButton.vue';
import TheDialog from '../dialog/TheDialog.vue';
import AddBoard from '../dialog/AddBoard.vue';

const newBoardOn = ref(false);

const store = useStore();
const allBoards = computed(() => {
  return `ALL BOARDS (${boardNames.value.length})`;
});
const boardNames = computed(() => {
  return store.getters.getBoardNames;
});

function toggleNewBoard() {
  newBoardOn.value = !newBoardOn.value;
}

function closeDialog() {
  newBoardOn.value = false;
}
</script>

<style scoped>
.boards-title {
  padding: 0 var(--sidebar-padding);
}
.boards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.boards {
  display: flex;
  flex-direction: column;
}
</style>
