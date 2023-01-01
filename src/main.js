import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store/store.js';
import router from './router.js';

// Base Components
import BaseHeading from './components/base/BaseHeading.vue';
import BaseSwitch from './components/base/BaseSwitch.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseDropdown from './components/base/BaseDropdown.vue';

import InputSelect from './components/base/input/InputSelect.vue';

const app = createApp(App);
app.component('base-heading', BaseHeading);
app.component('base-switch', BaseSwitch);
app.component('base-button', BaseButton);
app.component('base-dropdown', BaseDropdown);
app.component('input-select', InputSelect);
app.use(store);
app.use(router);
app.mount('#app');
