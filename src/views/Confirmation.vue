<template>
  <div class="bg-green-100 p-4 w-screen flex flex-col gap-4">
    <!-- Überschrift -->
    <h1 class="text-5xl text-gray-800">Registrierung erfolgreich</h1>

    <!-- Datum und Uhrzeit der Registrierung -->
    <div class="flex gap-4">
      <p><strong>Datum:</strong> {{ data.date }}</p>
      <p><strong>Uhrzeit:</strong> {{ data.time }}</p>
    </div>

    <!-- Übergabeart -->
    <p><strong>Übergabeart:</strong> {{ data.type.label }}</p>

    <!-- Abholadresse (nur bei Abholung durch Sammelfahrzeug) -->
    <div v-if="data.type.value === 'abholung'">
      <div class="items-center mt-1">
        <p><strong>Abholadresse</strong></p>
      </div>
      <div class="flex flex-col sm:flex-row gap-1 items-start sm:items-start sm:gap-2 mt-1">
        <p><strong>Straße:</strong> {{ data.street }}</p>
        <p><strong>Nr.:</strong> {{ data.number }}</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-1 items-start sm:items-start sm:gap-2 mt-1">
        <p><strong>PLZ:</strong> {{ data.postalcode }}</p>
        <p><strong>Ort:</strong> {{ data.city }}</p>
      </div>
    </div>
    
    <!-- Art der Kleiung und Krisengebiet -->
    <p><strong>Art der Kleidung:</strong> {{ data.typeOfClothing }}</p>
    <p><strong>Krisengebiet:</strong> {{ data.region.label }}</p>
  </div>
</template>

<script setup>
import { useFormStore } from '../stores/formDataStore'

//Pinia Formstore
const formStore = useFormStore()

//Lokale Variable für Formulardaten
const data = formStore.formData

</script>
