<template>
  <div class="container">

    <button @click="showModal = true">Open Modal</button>

    <teleport to="body">
      <Modal v-if="showModal" @close="showModal = false">
        <template #header>
          <h2>Custom header</h2>
        </template>
        <p>Modal content goes here</p>
        <template #footer>
          <button @click="showModal = false">Close</button>
        </template>
      </Modal>
    </teleport>


    <!-- Componente reutilizable -->
    <SearchInput
      :searchQuery="searchQuery"
      @update-search-query="updateSearchQuery"
      placeholder="Search contacts..."
    />

    <ul>
      <li v-for="(contact) in filteredContacts" :key="contact.login.uuid"
        :class="{ saved: isContactSaved(contact) }">
        <img :src="contact.picture.thumbnail" />
        {{ contact.name.first }} {{ contact.name.last }}
        <button @click="addContact(contact)">Save Contact</button>
      </li>
    </ul>
    <div id="load-more" ref="loadMoreRef"></div>  
    <div v-if="store.loading">Loading...</div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import SearchInput from '../components/SearchInput.vue'
import { useContactsStore } from '../store/contacts'
import Modal from '../components/Modal.vue'

// ---Modal section---
const showModal = ref(false)

// ---Contacts section---
//instancia del almacenamiento de contactos (Pinia)
const store = useContactsStore()

const addContact = (contact) => {
  store.saveContact(contact)
}

const isContactSaved = (contact) => {
  return store.savedContacts.some(
    (savedContact) => savedContact.login.uuid === contact.login.uuid
  )
}

// propiedad computada que devuelve los contactos filtrados según la consulta de búsqueda
const filteredContacts = computed(() => {
  if (searchQuery.value === '') return store.contacts
  return store.contacts.filter((contact) =>
    (`${contact.name.first} ${contact.name.last}`)
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})

//---Query section---
//almacena la consulta de búsqueda del usuario
const searchQuery = ref('')
const updateSearchQuery = (newValue) => {
  searchQuery.value = newValue
  store.setSearchQuery(searchQuery.value)
}

// Load more section (Intersection Observer)

// Para cargar más contactos al hacer scroll, se usa el Intersection Observer
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

// ref que apunta al elemento HTML utilizado para detectar si se ha llegado al final de la lista
const loadMoreRef = ref(null)

// instancia del Intersection Observer que detecta si se ha llegado al final de la lista y carga más contactos
const observer = new IntersectionObserver(async (entries) => {
  if (entries[0].isIntersecting) {
    await store.loadMoreContacts()
  }
}, {})

// hook que se ejecuta después de montar el componente. Se utiliza para iniciar la observación del elemento loadMoreRef.
onMounted(() => {
  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value)
  }
})

//  observa los cambios en loadMoreRef y actualiza la observación del elemento.
watch(loadMoreRef, (newValue) => {
  if (newValue) {
    observer.observe(newValue)
  }
})


</script>

<!-- Define los estilos CSS para el componente. Los estilos están limitados (scoped) al componente y no afectan a otros componentes en la aplicación. -->
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

li.saved {
  background-color: rgba(46, 204, 113, 0.1);
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

button:hover {
  background-color: #2980b9;
}
</style>

