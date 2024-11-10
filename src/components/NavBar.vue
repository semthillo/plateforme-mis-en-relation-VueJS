<template lang="">
  <nav class="navbar navbar-expand-lg navbar-light border-bottom fixed-top" style="background-color: white; border: rgb(141, 140, 140)">
    <div class="container">
      <router-link class="navbar-brand logo" to="/">
        <span class="logo-text-one">One</span>
        <span class="logo-text-click">Click</span>
        <span class="logo-text-service">Service</span>
        <i class="fa fa-mouse-pointer logo-icon"></i>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-sm-end" id="navbarSupportedContent">
        <ul class="navbar-nav me-5 mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/apropos">A propos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/service">Services</router-link>
          </li>
        </ul>
        <!-- <div class="navbar-right">
          <div class="d-flex" v-if="gestionStore.user" >
            <div class="user-info">
              <i class="fas fa-user"></i>
              <span>{{ gestionStore.user.name }}</span>
            </div>
            <button @click="handleLogout" class="btn btn-outline-secondary">Déconnexion</button>
          </div>
          <div v-else> -->
            <router-link to="/login" class="btn btn-primary">Se connecter</router-link>
          <!-- </div> 
        </div>-->
        <div>
          <select class="form-select" aria-label="Language select">
            <option value="1">FR</option>
            <option value="2">EN</option>
            <option value="3">AR</option>
          </select>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useGestionStore } from '../store/gestion';

const route = useRoute();
const gestionStore = useGestionStore();

function handleLogout() {
  gestionStore.logout();
  route.push('/'); 
}
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-decoration: none;
  color: black;
}
.navbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-text-one {
  font-size: 1.5rem;
  color: #333;
}
.logo-text-click {
  font-size: 1.8rem;
  color: #007bff;
}
.logo-text-service {
  font-size: 1.5rem;
  color: #333;
}
.logo-icon {
  font-size: 1.5rem;
  color: #007bff;
  margin-left: 5px;
  transform: translateY(-2px); /* Ajustement pour bien aligner l'icône */
}
</style>
