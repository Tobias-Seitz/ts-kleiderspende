<template>
  <footer class="bg-gray-500 text-center p-4 text-sm text-white">
    <div class="flex flex-col sm:flex-row justify-center items-center gap-2 whitespace-nowrap">
      <!-- Copyright -->
      <p>© 2025 TS-Kleiderspende</p>

      <!-- Trennstrich zwischen Copyright und Impressum nur auf größeren Bildschirmen anzeigen -->
      <p class="hidden sm:block">|</p>

      <!-- Impressum und Datenschutz -->
      <nav class="flex justify-center gap-2">
        <CustomRouterLink to="/impressum" variant="footer">Impressum</CustomRouterLink>
        <!-- Trennstrich zwischen Impressum und Datenschutz -->
        <span>|</span>
        <CustomRouterLink to="/datenschutz" variant="footer">Datenschutz</CustomRouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import CustomRouterLink from './CustomRouterLink.vue';
</script>
