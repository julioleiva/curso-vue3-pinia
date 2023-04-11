import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import SavedContacts from '../views/SavedContacts.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/saved-contacts', component: SavedContacts }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})