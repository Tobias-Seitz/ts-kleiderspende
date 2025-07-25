
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

//Pinia-Instanz erstellen
const pinia = createPinia()

//Anwendung initialisieren
createApp(App)
  .use(router)
  .use(pinia) 
  .mount('#app')

export { pinia }
