import { createRouter, createWebHistory } from 'vue-router';
import { useFormStore } from './stores/formDataStore'
import { pinia } from './main'
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Impressum from './views/Impressum.vue';
import Datenschutz from './views/Datenschutz.vue'
import Confirmation from './views/Confirmation.vue';

//Routen festlegen
const routes = [
  { path: '/', name: 'start', component: Home },
  { path: '/register', name: 'register', component: Register },
  { path: '/impressum', name: 'impressum', component: Impressum },
  { path: '/datenschutz', name: 'datenschutz', component: Datenschutz },
  { path: '/confirmation', name: 'confirmation', component: Confirmation },
];

//Router erstellen
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Wird jedes mal ausgeführt, bevor der Router weiterleitet 
router.beforeEach((to, from, next) => {
  const formStore = useFormStore(pinia) 

  //Verhindert den unbefugten Zugriff auf die Bestätigungsseite
  if (to.name === 'confirmation' && !formStore.formData) {
    next({ name: 'start' })
  } else {
    next()
  }
})

export default router;
