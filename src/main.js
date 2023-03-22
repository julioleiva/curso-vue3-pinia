// src/main.js
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'


// Import routes
import routes from './router';

// Create router
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Create Pinia store
const store = createPinia()

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
