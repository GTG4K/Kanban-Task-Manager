<template>
  <base-heading size="l">Add New Board</base-heading>
  <input-text
    title="Board Name"
    type="text"
    placeholder="e.g. Web Design"
    v-model="title.value"
  ></input-text>
  <div class="columns">
    <h2>Board Columns</h2>
    <div v-for="column in columns" :key="column.id" class="column">
      <input-text v-model="column.name"></input-text>
      <img
        @click="removeColumn(column.name)"
        src="../../../assets/svg/icon-cross.svg"
        alt=""
      />
    </div>
    <base-button size="full" theme="invert" type="button" @click="addColumn">
      +Add New Column
    </base-button>
  </div>
  <base-button size="full" type="button" @click="addBoard">Create New Board</base-button>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import InputText from '../../base/input/InputText.vue';

const route = useRoute();
const store = useStore();
const routeName = ref(route.path);

const title = reactive({ value: null, error: false });
const columns = ref([{ id: 1, name: null, error: false }]);

let columnId = 2;

function addColumn() {
  const newColumn = { id: columnId, name: null, error: false };
  columnId++;
  columns.value.push(newColumn);
}
function removeColumn(columnName) {
  const columnIndex = columns.value.findIndex((column) => column.name === columnName);
  columns.value.splice(columnIndex, 1);
}

function addBoard() {
  store.commit('addBoard', {
    name: title.value,
    columns: columns.value,
  });
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
