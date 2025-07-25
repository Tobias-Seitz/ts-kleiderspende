<template>
    <RouterLink :to="to"
        :disabled="disabled"
        :class="[
        'inline-flex items-center justify-center transition-colors',
        variantClasses,
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
    ]"
    aria-disabled="disabled">
    <slot/>
</RouterLink>
</template>

<script setup>
import { computed } from 'vue'

//Properties definieren
const props = defineProps({
    to: String,
    variant: {type: String, default: "standard"},
    disabled: { type: Boolean, default: false },
})

//Variantem definieren -> je nach variante unterschiedliche Darstellung / Tailwind Klassen
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'standard':
      return 'font-medium px-8 py-4 mb-5 ml-5 mr-5 rounded-4xl text-lg sm:text-2xl bg-gray-800 hover:bg-blue-100 hover:text-blue-700 text-white'
    case 'header':
      return 'font-medium text-lg block px-4 py-2 rounded-4xl hover:bg-blue-100 hover:text-blue-700'
    case 'footer':
      return 'underline hover:text-blue-700'
    case 'unstyled':
        return '';
    default:
      return 'font-medium px-8 py-4 mb-5 ml-5 mr-5 rounded-4xl text-lg sm:text-2xl bg-gray-800 hover:bg-blue-100 hover:text-blue-700 text-white' //die primary-Variante als Standard-Option verwenden, wenn nichts oder etwas falsches angegeben wurde
  }
})

</script>