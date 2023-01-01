<template>
  <div v-if="!props.type" class="board">
    <img src="../../../assets/svg/icon-board.svg" alt="" />
    <h2>{{ props.title }}</h2>
  </div>
  <div v-else-if="props.type === 'new'" class="board new">
    <img src="../../../assets/svg/icon-board.svg" alt="" />
    <h2>+ Create New Board</h2>
  </div>
  <div v-else-if="props.type === 'hide'" class="board">
    <img src="../../../assets/svg/icon-hide-sidebar.svg" alt="" />
    <h2>Hide Sidebar</h2>
  </div>
  <div v-else-if="props.type === 'show'" class="board show">
    <img src="../../../assets/svg/icon-show-sidebar.svg" alt="" />
  </div>
</template>

<script setup>
const props = defineProps(['type', 'title']);
</script>

<style scoped>
.board {
  padding: 0 var(--sidebar-padding);
  display: flex;
  width: 250px;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  border-radius: 0 100vh 100vh 0;
  height: 3rem;
}
.board h2 {
  font-family: var(--font-family);
  font-size: 15px;
  color: var(--color-accent-400);
  font-weight: 500;
}
.board.new img {
  filter: brightness(0) saturate(100%) invert(48%) sepia(9%) saturate(4227%)
    hue-rotate(205deg) brightness(81%) contrast(91%);
}
.board.new h2 {
  color: var(--color-main-100);
}
.dark .board:hover {
  background: var(--color-accent-100);
}
.dark .board:hover h2 {
  color: var(--color-main-100);
}
.light .board:hover {
  background: var(--color-accent-300);
}
.light .board:hover h2 {
  color: var(--color-main-100);
}
.board:hover img {
  filter: brightness(0) saturate(100%) invert(48%) sepia(9%) saturate(4227%)
    hue-rotate(205deg) brightness(81%) contrast(91%);
}
.light .router-link-active .board,
.dark .router-link-active .board {
  background: var(--color-main-100);
}
.light .router-link-active .board h2,
.dark .router-link-active .board h2 {
  color: var(--color-accent-100);
}
.light .router-link-active .board img,
.dark .router-link-active .board img {
  filter: brightness(0) saturate(100%) invert(99%) sepia(42%) saturate(334%)
    hue-rotate(268deg) brightness(116%) contrast(100%);
}
.light .board.show {
  width: fit-content;
  padding: 0 1.5rem 0 1rem;
}
.light .board.show img {
  filter: brightness(0) saturate(100%) invert(48%) sepia(9%) saturate(4227%)
    hue-rotate(205deg) brightness(81%) contrast(91%);
}
.dark .board.show {
  width: fit-content;
  padding: 0 1.5rem 0 1rem;
}
</style>
