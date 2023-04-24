<template>
    <input
      type="text"
      :value="searchQuery"
      @input="handleInput"
    />
  </template>
  
  <script setup>
  // Estos imports no son necesarios, lo hacemos con fines didácticos
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    searchQuery: {
      type: String,
      default: ''
    }
  })
  
  const emit = defineEmits(['update-search-query'])
  
  const handleInput = (event) => {
    emit('update-search-query', event.target.value)
  }
  </script>
  