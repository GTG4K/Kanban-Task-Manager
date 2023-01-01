<template>
  <div class="columns">
    <board-column
      v-for="column in boardColumns"
      :key="column.name"
      :column="column"
    ></board-column>
    <board-column />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BoardColumn from '../components/ui/boards/BoardColumn.vue';

const store = useStore();
const props = defineProps(['task']);

const selectedBoard = computed(() => {
  const boards = store.getters.getBoards;

  const board = boards.find((board) => board.name === props.task);
  return board;
});

const boardColumns = computed(() => {
  return selectedBoard.value.columns;
});
</script>

<style scoped>
.columns {
  display: flex;
  padding: 1.5rem;
  gap: 1.5rem;
  height: calc(100% - 5rem);
  overflow-y: auto;
}
</style>
