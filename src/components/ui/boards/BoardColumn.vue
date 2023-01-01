<template>
  <div v-if="props.column" class="board-column">
    <base-heading size="s">{{ title }}</base-heading>
    <div class="tasks">
      <task-card
        v-for="task in props.column.tasks"
        :key="task.title"
        :column="props.column.name"
        :task="task"
      ></task-card>
    </div>
  </div>
  <div v-else @click="toggleAddColumn" class="add-column">
    <base-heading size="xl">+ New Column</base-heading>
    <the-dialog :tp="true" v-model="addColumnOn">
      <add-column></add-column>
    </the-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TaskCard from './tasks/TaskCard.vue';
import TheDialog from '../dialog/TheDialog.vue';
import AddColumn from '../dialog/AddColumn.vue';
const props = defineProps(['column']);

const addColumnOn = ref(false);

const title = computed(() => {
  return `${props.column.name.toUpperCase()} (${props.column.tasks.length})`;
});

function toggleAddColumn() {
  addColumnOn.value = !addColumnOn.value;
}
</script>

<style scoped>
.tasks {
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0 0 0;
  gap: 1.5rem;
}
.board-column {
  width: 320px;
  height: fit-content;
}
.add-column {
  height: calc(100vh - 3rem - 90px - 36px - 36px);
  min-width: 320px;
  margin-top: 36px;
  border-radius: 8px;
  background: var(--color-button-extra);

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.add-column:hover {
  background: var(--color-button-extra-hover);
}
</style>
