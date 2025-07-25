<template>
  <!-- Hintergrund mit Farbverlauf -->
  <div class="flex flex-col flex-1 gap-10 items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-100 via-gray-500 to-gray-800">
    
    <!-- Willkommenstext -->
    <p class="text-center text-4xl sm:text-5xl font-normal leading-relaxed text-white drop-shadow-lg">
      Willkommen auf der<br/>
      <span class="font-semibold">TS-Kleiderspenden-Registrierungsseite!</span>
    </p>

    <!-- Link zur Registrierungsseite -->
    <CustomRouterLink to="/register" variant="standard">
      Jetzt Kleiderspende registrieren
    </CustomRouterLink>
  </div>
</template>

<script setup>
import CustomRouterLink from '../components/CustomRouterLink.vue';
</script>
