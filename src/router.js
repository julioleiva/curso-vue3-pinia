// src/routes.js
import Home from './views/Home.vue'
import SavedContacts from './views/SavedContacts.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/saved-contacts', component: SavedContacts }
]

export default routes
