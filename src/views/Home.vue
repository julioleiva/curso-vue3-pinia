<template>
  <div class="container">
    <input
      type="text"
      v-model="searchQuery"
      @input="updateSearchQuery"
      placeholder="Search contacts..."
    />
    <ul>
      <li v-for="(contact, index) in filteredContacts" :key="contact.login.uuid" :class="{ saved: isContactSaved(contact) }">
        <img :src="contact.picture.thumbnail" />
        {{ contact.name.first }} {{ contact.name.last }}
        <button @click="addContact(contact)">Save Contact</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useContactsStore } from '../pinia/store'
import axios from 'axios'

const store = useContactsStore()
const searchQuery = ref('')

const fetchContacts = async () => {
  const response = await axios.get('https://randomuser.me/api/?results=500')
  store.setContacts(response.data.results)
}

fetchContacts()

const filteredContacts = computed(() => {
  if (searchQuery.value === '') return store.contacts
  return store.contacts.filter((contact) =>
    (`${contact.name.first} ${contact.name.last}`)
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})

const isContactSaved = (contact) => {
  return store.savedContacts.some(
    (savedContact) => savedContact.login.uuid === contact.login.uuid
  )
}

const isContactSavedComputed = computed(() => {
  return (contact) => isContactSaved(contact)
})

const updateSearchQuery = () => {
store.setSearchQuery(searchQuery.value)
}

const deleteContact = (index) => {
store.removeContact(index)
}

const addContact = (contact) => {
store.saveContact(contact)
}
</script>

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

