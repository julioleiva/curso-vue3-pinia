<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <header>
          <slot name="header">Header Slot</slot>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
          <slot name="footer">
            <button @click="closeModal">Cerrar</button>
          </slot>
        </footer>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue'
  
  const emit = defineEmits(['close'])
  
  const closeModal = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal {
    background-color: #fff;
    border-radius: 4px;
    padding: 1rem;
    min-width: 300px;
  }
  
  header,
  footer {
    padding: 0.5rem 0;
  }
  
  main {
    padding: 1rem 0;
  }
  </style>
  