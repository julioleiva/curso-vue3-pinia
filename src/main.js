import { createApp } from 'vue'

import { createPinia } from 'pinia'
import App from './App.vue'

// Import router
import { router } from './router';

// Create Pinia store
const store = createPinia()

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
