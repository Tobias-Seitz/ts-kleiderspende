<template>
  <div class="flex flex-col">
    <!-- Label nur anzeigen, wenn vorhanden -->
    <label v-if="label" :for="id" class="mb-1 font-semibold text-gray-800">{{ label }}</label>

    <input 
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="disabled"
        :class="[
        'text-gray-800 w-full px-4 py-2 rounded-2xl bg-white border border-gray-300'
        + 'focus:outline-none focus:ring-2 focus:ring-blue-700  hover:bg-blue-100 hover:text-blue-700',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        error ? 'border-red-500' : 'border-gray-300'
        ]"
    />

    <!-- Fehleranzeige, wenn vorhanden -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
//Properties definieren
const props = defineProps({
  modelValue: String,
  label: String,
  id: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
  error: String,
})

//Ereignis definieren
const emit = defineEmits(['update:modelValue'])
</script>
