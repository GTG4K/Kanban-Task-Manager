import { createRouter, createWebHistory } from 'vue-router';
import SelectTask from './pages/SelectTask.vue';
import TaskPage from './pages/TaskPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/task' },
    { path: '/task', component: SelectTask },
    { path: '/task/:task', component: TaskPage, props: true },
  ],
});

export default router;
