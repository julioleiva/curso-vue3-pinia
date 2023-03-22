import { defineStore } from 'pinia'

export const useContactsStore = defineStore({
  id: 'contacts',

  state: () => ({
    contacts: [],
    savedContacts: [],
    searchQuery: ''
  }),

  actions: {
    setContacts(contacts) {
      this.contacts = contacts
    },

    saveContact(contact) {
      this.savedContacts.push(contact)
    },

    removeContact(index) {
      this.contacts.splice(index, 1)
    },

    setSearchQuery(query) {
      this.searchQuery = query
    }
  }
})
