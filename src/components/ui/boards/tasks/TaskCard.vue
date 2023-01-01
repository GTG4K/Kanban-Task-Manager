<template>
  <div class="task" @click="toggleViewTask">
    <base-heading size="m">{{ props.task.title }}</base-heading>
    <h2 class="subtask">{{ subtasks }}</h2>
    <the-dialog :tp="true" v-model="viewTaskOn">
      <view-task :task="props.task" :column="props.column"></view-task>
    </the-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TheDialog from '../../dialog/TheDialog.vue';
import ViewTask from '../../dialog/ViewTask.vue';
const props = defineProps(['task', 'column']);

const viewTaskOn = ref(false);
const statusOptions = ['Todo', 'Doing', 'Done'];

function toggleViewTask() {
  viewTaskOn.value = !viewTaskOn.value;
}

const subtasks = computed(() => {
  let completed = 0;
  props.task.subtasks.forEach((subtask) => {
    if (subtask.isCompleted) completed++;
  });

  return `${completed} of ${props.task.subtasks.length} subtasks`;
});
</script>

<style scoped>
.task {
  background: var(--color-card);
  width: 280px;
  min-height: 90px;
  padding: 0.2rem 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;

  border-radius: 8px;
  box-shadow: 0 0 10px var(--color-shadow);
  cursor: pointer;

  user-select: none;
}
.task:hover {
  background: var(--color-task-hover);
}
.subtask {
  font-size: 12px;
  color: var(--color-accent-400);
  font-weight: 700;
  font-family: var(--font-family);
}
</style>
