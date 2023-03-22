<template>
    <div>
      <h1>Contacts</h1>
      <ContactForm v-model:search="searchText" />
      <div v-if="loading">Loading...</div>
      <div v-else>
        <ContactCard v-for="(contact, index) in filteredContacts" :key="contact.login.uuid" :contact="contact" :index="index" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import { useContactsStore } from '../pinia/store.js';
  import ContactForm from '../components/ContactForm.vue';
  import ContactCard from '../components/ContactCard.vue';
  
  const store = useContactsStore();
  const loading = ref(true);
  const searchText = ref('');
  const contacts = computed(() => store.contacts);
  const filteredContacts = computed(() =>
    contacts.value.filter(contact =>
      `${contact.name.first} ${contact.name.last}`.toLowerCase().includes(searchText.value.toLowerCase()),
    ),
  );
  
  const fetchContacts = async () => {
    loading.value = true;
    const response = await fetch(`https://randomuser.me/api/?results=500`);
    const data = await response.json();
    store.setContacts(data.results);
    loading.value = false;
  };
  
  watch(searchText, () => {
    fetchContacts();
  });
  
  onMounted(fetchContacts);
  </script>
  