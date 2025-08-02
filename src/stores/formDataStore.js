import { defineStore } from 'pinia'

//Pinia Store zur temporären Speicherung der Formulardaten
export const useFormStore = defineStore('form', {
  //State -> speichert die aktuelle Spende als Objekt
  state: () => ({
    formData: null
  }),

  //Aktionen zur Manipulation von State
  actions: {
    //Speichert die übergebenen Formulardaten im Pinia Store
    setFormData(data) {
      this.formData = data
    }
  }
})
