<template>
  <div>
    <h1>Saved Contacts</h1>
    <ul>
      <li v-for="(contact, index) in savedContacts" :key="contact.login.uuid">
        <img :src="contact.picture.thumbnail" />
        {{ contact.name.first }} {{ contact.name.last }}
        <button @click="removeSavedContact(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useContactsStore } from '../store/contacts'

const store = useContactsStore()
const savedContacts = store.savedContacts

const removeSavedContact = (index) => {
  store.savedContacts.splice(index, 1)
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
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

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

button:hover {
  background-color: #c0392b;
}
</style>

