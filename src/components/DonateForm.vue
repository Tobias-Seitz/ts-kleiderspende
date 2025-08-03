<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <h2 class="text-2xl font-semibold">Kleiderspende registrieren</h2>

    <CustomDropdown v-model="form.type" :options="typeOptions" :error="formErrors.typeError" label="Übergabeart"/>

    <!-- Abholadresse (nur bei Abholung durch Sammelfahrzeug) -->
    <div v-if="form.type.value === 'abholung'">
    <div class="items-center mt-1">
        <p class="font-semibold">Abholadresse</p>
    </div>
    <div class="flex flex-col sm:flex-row gap-1 items-start sm:items-start sm:gap-2 mt-1">
      <CustomTextField v-model="form.street" label="Straße" :error="formErrors.streetError" class="w-full"/>
      <CustomTextField v-model="form.number" label="Nr." :error="formErrors.numberError" class="w-full"/>
    </div>
    <div class="flex flex-col sm:flex-row gap-1 items-start sm:items-start sm:gap-2 mt-1">
      <CustomTextField v-model="form.postalcode" label="PLZ" :error="formErrors.plzError" class="w-full"/>
      <CustomTextField v-model="form.city" label="Ort" :error="formErrors.cityError" class="w-full"/>
    </div>
    </div>

    <CustomTextField v-model="form.typeOfClothing" label="Art der Kleidung" :error="formErrors.typeOfClothingError"/>

    <CustomDropdown v-model="form.region" :options="regionOptions" :error="formErrors.regionError" label="Krisengebiet"/>

    <CustomButton variant="primary" type="submit">Registrieren</CustomButton>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import CustomDropdown from './CustomDropdown.vue';
import CustomTextField from './CustomTextField.vue';
import CustomButton from './CustomButton.vue';
import { useFormStore } from '../stores/formDataStore'
import { useRouter } from 'vue-router'

//Pinia Formstore und Router
const formStore = useFormStore();
const router = useRouter();

//Initialisierung der Formulardaten
const form = ref({
  type: '',
  street: '',
  number: '',
  city: '',
  postalcode: '',
  typeOfClothing: '',
  region: '',
  time: '',
  date: '',
});

//Initialisierung des Fehlerobjekts
const formErrors = ref({
  plzError: '',
  cityError: '',
  streetError: '',
  numberError: '',
  typeError: '',
  typeOfClothingError: '',
  regionError: '',
})

//Optionen für Übergabeart-Dropdown
const typeOptions = [
  { value: 'geschaeftsstelle', label: 'Übergabe an der Geschäftsstelle' },
  { value: 'abholung', label: 'Abholung' },
]

//Optionen für Krisenregion-Dropdown
const regionOptions = [
  { value: 'ukraine', label: 'Ukraine' },
  { value: 'gaza', label: 'Gaza' },
  { value: 'syrien', label: 'Syrien' },
  { value: 'sudan', label: 'Sudan' },
]

//Funktion -> ersetzt/escaped ungewollte Zeichen 
function escapeInput(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[<>"']/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

//Funktion -> Setzt Fehlernachricht und erhöht Fehlerzähler
function setError(field, message) {
  formErrors.value[field] = message
  return message ? 1 : 0
}

//Funktion -> wird bei Absenden des Forumlars ausgelöst
function submitForm() {
  //Fehlerzähler (initial 0)
  let numOfErrors = 0;

  //Wenn Abholart Sammelfahrzeug
  if (form.value.type.value === 'abholung') {

    //Prüfen ob Straße eingeben wurde
    if(!form.value.street || form.value.street.trim() === '') {
      formErrors.value.streetError = "Die Straße darf nicht leer sein.";
      numOfErrors++;
    } else {
      formErrors.value.streetError = "";
    }
    
    //Prüfen ob Hausnummer eingegeben wurde
    if(!form.value.number || form.value.number.trim() === '') {
      formErrors.value.numberError = "Die Hausnummer darf nicht leer sein.";
      numOfErrors++;
    } else {
      formErrors.value.numberError = "";
    }
    
    //Prüfen ob Stadt eingegeben wurde
    if(!form.value.city || form.value.city.trim() === '') {
      formErrors.value.cityError = "Der Ort darf nicht leer sein.";
      numOfErrors++;
    } else {
      formErrors.value.cityError = "";
    }
    
    //Prüfen ob PLZ eingeben wurde
    if(!form.value.postalcode || form.value.postalcode.trim() === '') {
      formErrors.value.plzError = "Die PLZ darf nicht leer sein.";
      numOfErrors++;
    } else {
      //Prüfen ob PLZ gültig ist
      if (!/^\d{5}$/.test(form.value.postalcode)) {
          formErrors.value.plzError = "Die angegebene Postleitzahl ist nicht gültig.";
          numOfErrors++;
      } else {
        //Prüfen ob PLZ im Einzugsgebiet liegt
        if (form.value.postalcode.slice(0, 2) !== '97') { 
          //die plz muss mit 97 beginnen um eine abholung druch ein sammelfahrzeug zu ermöglichen
          formErrors.value.plzError = "Die angegebene Postleitzahl liegt nicht im Einzugsgebiet (97xxx).";
          numOfErrors++;
        } else {
          formErrors.value.plzError = "";
        }
      }
    }
  }
  //ENDE Block Sammelfahrzeug

  //Prüfen ob Übergabeart ausgewählt wurde
  if(!form.value.type.value || form.value.type.value.trim() === '') {
      formErrors.value.typeError = "Es muss eine Übergabeart ausgewählt werden.";
      numOfErrors++;
  } else {
    formErrors.value.typeError = "";
  }

  //Prüfen ob Art der Kleidung eingegeben wurde
  if(!form.value.typeOfClothing || form.value.typeOfClothing.trim() === '') {
      formErrors.value.typeOfClothingError = "Die Art der Kleidung darf nicht leer sein.";
      numOfErrors++;
  } else {
    formErrors.value.typeOfClothingError = "";
  }

  //Prüfen ob Krisengebiet ausgewählt wurde
  if(!form.value.region.value || form.value.region.value.trim() === '') {
      formErrors.value.regionError = "Es muss ein Krisengebiet ausgewählt werden.";
      numOfErrors++;
  } else {
    formErrors.value.regionError = "";
  }

  //Prüfen ob Validierung erfolgreich war
  if(numOfErrors === 0) {
    //Fehlerobjekt zurücksetzen
    formErrors.value = {
    plzError: '',
    cityError: '',
    streetError: '',
    numberError: '',
    typeError: '',
    typeOfClothingError: '',
    regionError: '',
    }

    //Eingaben escapen
    form.value.street = escapeInput(form.value.street);
    form.value.number = escapeInput(form.value.number);
    form.value.city = escapeInput(form.value.city);
    form.value.postalcode = escapeInput(form.value.postalcode);
    form.value.typeOfClothing = escapeInput(form.value.typeOfClothing);

    //Aktuelles Datum und Uhrzeit in Formulardaten speichern
    const now = new Date();
    form.value.date = now.toLocaleDateString();
    form.value.time = now.toLocaleTimeString();

    //Finale Bestätigungsseite anzeigen
    formStore.setFormData(form.value);
    router.push('/confirmation');
  }
}
</script>