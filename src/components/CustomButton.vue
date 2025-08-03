<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-2xl px-4 py-2 transition-colors',
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
  >
    <slot/>
  </button>
</template>

<script setup>
import { computed } from 'vue';

//Properties definieren
const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary', validator: (value) => ['primary', 'secondary', 'danger'].includes(value) },
  disabled: { type: Boolean, default: false },
})

//Varianten definieren -> je nach variante unterschiedliche Darstellung / Tailwind Klassen
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-gray-800 text-white hover:bg-blue-100 hover:text-blue-700'
    case 'secondary':
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600'
    default:
      return 'bg-gray-800 text-white hover:bg-blue-100 hover:text-blue-700' 
      //die primary-Variante als Standard-Option verwenden, wenn nichts oder etwas falsches angegeben wurde
  }
})
</script>