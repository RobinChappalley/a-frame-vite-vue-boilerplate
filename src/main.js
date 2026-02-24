import { createApp } from 'vue';
import App from './Aframe.vue';

import.meta.glob('./aframe/*.js', { eager: true })


createApp(App).mount('#app');