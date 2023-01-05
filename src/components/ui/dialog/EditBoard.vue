<template>
  <base-heading size="l">Edit Board</base-heading>
  <input-text
    title="Board Name"
    type="text"
    placeholder="e.g. Web Design"
    v-model="title.value"
  ></input-text>
  <div class="columns">
    <h2>Board Columns</h2>
    <div v-for="column in columns" :key="column.id" class="column">
      <input-text v-model="column.value"></input-text>
      <img
        @click="removeColumn(column.id)"
        src="../../../assets/svg/icon-cross.svg"
        alt=""
      />
    </div>
    <base-button size="full" theme="invert" type="button" @click="addColumn">
      +Add New Column
    </base-button>
  </div>
  <base-button size="full" type="button" @click="saveBoard">Save Changes</base-button>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import InputText from '../../base/input/InputText.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();
const emits = defineEmits(['closeDialog']);

const routeName = ref(route.path);
const [, , path] = routeName.value.split('/');
const cleanedPath = path.replace('%20', ' ');

let columnId = 1;
const boards = store.getters.getBoards;
const title = reactive({ value: cleanedPath, error: false });
const columns = ref([]);
boards.forEach((board) => {
  if (board.name === cleanedPath) {
    board.columns.forEach((column) => {
      const newColumn = {
        id: columnId,
        oldName: column.name,
        new: false,
        value: column.name,
        error: false,
      };
      columnId++;
      columns.value.push(newColumn);
    });
  }
});

function addColumn() {
  const newColumn = {
    id: columnId,
    oldName: null,
    new: true,
    value: null,
    error: false,
  };
  columnId++;
  columns.value.push(newColumn);
}

function removeColumn(id) {
  const columnIndex = columns.value.findIndex((column) => column.id === id);
  columns.value.splice(columnIndex, 1);
}

function saveBoard() {
  store.commit('changeBoard', {
    board: cleanedPath,
    boardTitle: title.value,
    columns: columns.value,
  });
  emits('closeDialog');
}
</script>

<style scoped>
.columns {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.columns > h2 {
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-family);
  color: var(--font-color);
}
.column {
  display: grid;
  grid-template-columns: 1fr 20px;
  align-items: center;
  gap: 1rem;
}

.column > img {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.column > img:hover {
  filter: var(--filter-error);
}
</style>
