<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/saved-contacts" class="nav-link">Saved Contacts</router-link>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #3498db;
    padding: 1rem;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
  }
  
  .nav-link:hover {
    color: #ddd;
  }
  </style>
  