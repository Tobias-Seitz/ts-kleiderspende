<template>
  <div class="flex flex-col relative">
    <!-- Label nur anzeigen, wenn vorhanden -->
    <label v-if="label" :for="id" class="mb-1 font-semibold text-gray-800">{{ label }}</label>

    <!-- Auswahlfeld / Dropdown Button -->
    <button type="button" 
    @click="open = !open" 
    :class="['w-full px-4 py-2 border border-gray-300 rounded-2xl bg-white'
    + 'hover:bg-blue-100 hover:text-blue-700 transition-colors flex justify-between items-center',
    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
    error ? 'border-red-500' : 'border-gray-300']"
    :disabled="disabled">
      <span class="">{{ selectedOption?.label ?? 'Bitte wählen' }}</span>

      <!-- Pfeilsymbol inklusive Rotation beim Öffnen / Schließen des Dropdowns -->
      <svg class="w-5 h-5 text-gray-500 transform transition-transform duration-200" 
      :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <!-- Dropdown Liste -->
    <ul v-show="open" class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-2xl shadow">
      <li v-for="(option, index) in options" :key="option.value" @click="selectOption(option)"
      class="px-4 py-2 hover:bg-blue-100 hover:text-blue-700 cursor-pointer" 
      :class="{'rounded-t-2xl': index === 0,'rounded-b-2xl': index === options.length - 1}">
        {{ option.label }}
      </li>
    </ul>
    
    <!-- Fehleranzeige, wenn vorhanden -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

//Properties definieren
const props = defineProps({
  modelValue: [Object, null],
  options: {
    type: Array,
    required: true,
  },
  label: String,
  id: String,
  disabled: {
    type: Boolean,
    default: false
  },
  error: String,
})

//Ereignis definieren
const emit = defineEmits(['update:modelValue'])

//Variable für Öffnungszustand des Dropdowns
const open = ref(false)

//Aktuell gewählte Option
const selectedOption = computed(() => props.modelValue)

//Bei Auswahl einer Option -> Event auslösen und Dropdown schließen
function selectOption(option) {
  emit('update:modelValue', option)
  open.value = false
}
</script>
