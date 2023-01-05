<template>
  <base-heading size="l">Add New Column</base-heading>
  <input-text
    title="Title"
    type="text"
    placeholder="e.g. Todo"
    v-model="title.value"
  ></input-text>
  <base-button size="full" type="button" @click="addColumn">Create Column</base-button>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import InputText from '../../base/input/InputText.vue';

const emits = defineEmits(['closeDialog']);

const route = useRoute();
const store = useStore();
const routeName = ref(route.path);

const title = reactive({ value: null, error: false });

function addColumn() {
  const [, , path] = routeName.value.split('/');
  const cleanedPath = path.replace('%20', ' ');
  store.commit('addColumn', { name: title.value, board: cleanedPath });
  emits('closeDialog');
}
</script>

<style scoped></style>
