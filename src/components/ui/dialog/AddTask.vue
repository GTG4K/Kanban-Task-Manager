<template>
  <base-heading size="l">Add New task</base-heading>
  <input-text
    title="Title"
    placeholder="e.g. Study Web-dev"
    v-model="title.value"
  ></input-text>
  <input-textarea
    title="Description"
    placeholder="e.g. To make sure that I properly study web-dev"
    v-model="description.value"
  ></input-textarea>
  <div class="subtasks">
    <h2>Subtasks</h2>
    <div v-for="subtask in subtasks" :key="subtask.id" class="subtask">
      <input-text v-model="subtask.value"></input-text>
      <img
        @click="removeSubTask(subtask.id)"
        src="../../../assets/svg/icon-cross.svg"
        alt=""
      />
    </div>
    <base-button size="full" theme="invert" type="button" @click="addSubTask">
      +Add New Subtask
    </base-button>
  </div>
  <input-select v-model="status" title="Status" :options="statusOptions"></input-select>
  <input-select v-model="column" title="Column" :options="columnNames"></input-select>
  <base-button size="full" type="button" @click="addTask">Create Task</base-button>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import InputTextarea from '../../base/input/InputTextarea.vue';
import InputSelect from '../../base/input/InputSelect.vue';
import InputText from '../../base/input/InputText.vue';

const route = useRoute();
const store = useStore();
const routeName = ref(route.path);

const title = reactive({ value: null, error: false });
const description = reactive({ value: null, error: false });

let subtaskId = 2;
const subtasks = ref([{ id: 1, value: null, error: false }]);

const status = ref('Todo');
const statusOptions = ['Todo', 'Doing', 'Done'];

const columnNames = computed(() => {
  const boards = store.getters.getBoards;

  const [, , path] = routeName.value.split('/');
  const cleanedPath = path.replace('%20', ' ');

  const board = boards.find((board) => board.name === cleanedPath);
  const columns = [];

  board.columns.forEach((column) => {
    columns.push(column.name);
  });

  return columns;
});

const column = ref(columnNames.value[0]);

function addSubTask() {
  const currentId = subtasks.value.length;
  const newSubTask = { id: subtaskId, value: null, error: false };
  subtaskId++;
  subtasks.value.push(newSubTask);
}

function removeSubTask(id) {
  const subtaskIndex = subtasks.value.findIndex((subtask) => subtask.id === id);
  subtasks.value.splice(subtaskIndex, 1);
}

function addTask() {
  const [, , path] = routeName.value.split('/');
  const cleanedPath = path.replace('%20', ' ');
  store.commit('addTask', {
    title: title.value,
    board: cleanedPath,
    column: column.value,
    description: description.value,
    status: status.value,
    subtasks: subtasks.value,
  });
}
</script>

<style scoped>
.subtasks {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.subtasks > h2 {
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-family);
  color: var(--font-color);
}
.subtask {
  display: grid;
  grid-template-columns: 1fr 20px;
  align-items: center;
  gap: 1rem;
}

.subtask > img {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.subtask > img:hover {
  filter: var(--filter-error);
}
</style>
