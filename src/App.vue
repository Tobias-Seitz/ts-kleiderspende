<template>
  <div class="min-h-screen grid grid-rows-[auto_1fr_auto]">
    
    <!-- Globaler Header der Anwendung -->
    <Header />

    <!-- Dynamischer Inhaltsbereich, abhängig von der aktuellen Route -->
    <main class="flex">
      <router-view />
    </main> 

    <!-- Globaler Footer der Anwendung -->
    <Footer />
  </div>
</template>
<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>