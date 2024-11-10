import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';



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
import Footer from './components/footer.vue';
import Partenaire from './components/Partenaire.vue';

const app = createApp(App)
const pinia = createPinia()

dom.watch();
app.component('NavBar', NavBar)
app.component('Footer', Footer)
app.component('Partenaire', Partenaire)
app.component('Prestataire', Prestataire)

app.use(Toast);
// app.use(Toast, {
//     position: "top-right",
//     timeout: 3000,
//     closeOnClick: true
//   });

app.use(pinia)
app.use(router)
app.mount('#app')
