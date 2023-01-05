<template>
  <base-heading size="l" theme="danger">Delete this board?</base-heading>
  <p>
    Are you sure you want to delete {{ cleanedPath }} the board? This action will remove
    all columns and tasks and cannot be reversed.
  </p>
  <div class="duo">
    <base-button size="full" theme="danger" @click="DeleteBoard">Delete</base-button>
    <base-button size="full" theme="invert" @click="closeDialog">Cancel</base-button>
  </div>
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

function DeleteBoard() {
  router.push('/task');
  store.commit('deleteBoard', {
    board: cleanedPath,
  });
  emits('closeDialog');
}
function closeDialog() {
  emits('closeDialog');
}
</script>

<style scoped>
p {
  font-family: var(--font-family);
  color: var(--color-accent-400);
  font-size: 13px;
  line-height: 1.7;
}
.duo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
</style>
