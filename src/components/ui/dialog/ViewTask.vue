<template>
  <base-heading size="l">{{ props.task.title }}</base-heading>
  <p>{{ props.task.description }}</p>
  <div class="subtasks">
    <h2>{{ subtasksTitle }}</h2>
    <input-checkbox
      v-for="subtask in subtasks"
      :key="subtask.title"
      :subtask="subtask"
      v-model="subtask.isCompleted"
      @click="toggleSubtask(subtask.title)"
    ></input-checkbox>
  </div>
  <input-select
    v-model="currentStatus"
    title="Status"
    :options="statusOptions"
  ></input-select>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import InputCheckbox from '../../base/input/InputCheckbox.vue';

const store = useStore();
const route = useRoute();
const props = defineProps(['task', 'column']);
const routeName = ref(route.path);

const currentStatus = ref(props.task.status);

watch(currentStatus, () => {
  //get column name
  const [, , path] = routeName.value.split('/');
  const cleanedPath = path.replace('%20', ' ');

  store.commit('changeCurrentStatus', {
    board: cleanedPath,
    column: props.column,
    task: props.task.title,
    status: currentStatus.value,
  });
});

const subtasksTitle = computed(() => {
  let completed = 0;
  props.task.subtasks.forEach((subtask) => {
    if (subtask.isCompleted) completed++;
  });

  return `Subtasks (${completed} of ${props.task.subtasks.length})`;
});

const statusOptions = ['Todo', 'Doing', 'Done'];

const subtasks = computed(() => {
  return props.task.subtasks;
});

function toggleSubtask(subtask) {
  //get column name
  const [, , path] = routeName.value.split('/');
  const cleanedPath = path.replace('%20', ' ');

  store.commit('toggleSubtask', {
    board: cleanedPath,
    column: props.column,
    task: props.task.title,
    subtask: subtask,
  });
}
</script>

<style scoped>
p {
  font-family: var(--font-family);
  color: var(--color-accent-400);
}
h2 {
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-family);
  color: var(--font-color);
}
.subtasks {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
</style>
