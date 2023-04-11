import { defineStore } from 'pinia'
import useFetch from '../composables/useFetch.js'

export const useContactsStore = defineStore({
  id: 'contacts',

  state: () => ({
    contacts: [],
    savedContacts: [],
    searchQuery: '',
    loading: false,
    allContactsLoaded: false,
    nextPage: 1
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
    },

    async loadMoreContacts() {
      if (!this.loading && !this.allContactsLoaded) {
        this.loading = true
        const url = `https://randomuser.me/api/?results=20&page=${this.nextPage}`
        const { data, error } = await useFetch(url)

        if (error.value) {
          console.error('Error fetching data:', error.value)
        } else {
          this.nextPage += 1
          this.contacts.push(...data.value.results)

          if (data.value.results.length < 20) {
            this.allContactsLoaded = true
          }
        }

        this.loading = false
      }
    }
  }
})





