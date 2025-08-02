<template>
  <header>
    <div class="bg-gray-800">
      <!-- Desktop Navbar -->
      <div class="hidden sm:block">
        <div class="flex justify-between items-center p-4">
          <!-- Logo und Titel -->
          <div class="flex gap-4 items-center">
            <CustomRouterLink to="/" variant="unstyled">
              <img src="/LOGO.svg" alt="Logo" class="h-10 w-auto" />
            </CustomRouterLink>
            <CustomRouterLink to="/" variant="unstyled">
              <p class="font-bold text-white">TS-Kleiderspende</p>
            </CustomRouterLink>
          </div>
          <!-- Navigation Links -->
          <nav>
            <ul class="flex gap-1 text-white">
              <li><CustomRouterLink to="/" variant="header">Start</CustomRouterLink></li>
              <li class="self-center border-l border-white h-5 mx-2"></li> <!-- Trennlinie -->
              <li><CustomRouterLink to="/register" variant="header">Spende Registrieren</CustomRouterLink></li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Mobile Navbar -->
      <div class="sm:hidden">
        <div class="p-4">
          <div class="flex justify-between items-center">
            <!-- Logo und Titel -->
            <div class="flex gap-4 items-center">
              <CustomRouterLink to="/" variant="unstyled">
                <img src="/LOGO.svg" alt="Logo" class="h-10 w-auto" />
              </CustomRouterLink>
              <CustomRouterLink to="/" variant="unstyled">
                <p class="font-bold text-white">TS-Kleiderspende</p>
              </CustomRouterLink>
            </div>
            <!-- Hamburger Menü Button -->
            <button @click="showNav = !showNav" aria-label="Navigation umschalten" class="focus:outline-none">
              <!-- Hamburger Icon -->
              <svg v-show="!showNav" class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" d="M5 7h14M5 12h14M5 17h10" />
              </svg>
              <!-- Close Icon -->
              <svg v-show="showNav" class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M18 18L6 6" />
              </svg>
            </button>
          </div>

          <!-- Mobile Menü -->
          <div v-show="showNav" class="mt-4 flex flex-col w-48 text-white">
            <nav>
              <ul class="flex flex-col gap-4">
                <li><CustomRouterLink to="/" variant="header" @click="closeNav">Start</CustomRouterLink></li>
                <li><CustomRouterLink to="/register" variant="header" @click="closeNav">Spende Registrieren</CustomRouterLink></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import CustomRouterLink from "./CustomRouterLink.vue";

//Variable die den Zustand der Mobilen Navigation speichert
const showNav = ref(false);

//Funktion -> Schließt das mobile Menü
function closeNav() {
  showNav.value = false;
}
</script>
