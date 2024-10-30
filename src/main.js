import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap';



import { createApp } from 'vue'
import "./assets/css/style.css"
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
import NavBar from './components/NavBar.vue';
import Prestataire from './components/Prestataire.vue';

const app = createApp(App)
const pinia = createPinia()

dom.watch();
app.component('NavBar', NavBar)
app.component('Prestataire', Prestataire)


app.use(pinia)
app.use(router)
app.mount('#app')
