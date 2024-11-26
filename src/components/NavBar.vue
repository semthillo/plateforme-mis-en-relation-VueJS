<template>
  <nav class="navbar navbar-expand-lg navbar-light border-bottom fixed-top" style="background-color: white; border: rgb(141, 140, 140)">
    <div class="container">
      <!-- Logo et lien vers la page d'accueil -->
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
        <!-- Liens de navigation -->
        <ul class="navbar-nav me-5 mt-4 mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link fw-bold active" aria-current="page" to="/">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold active" aria-current="page" to="apropos">A propos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold active" aria-current="page" to="service">Services</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold active" aria-current="page" to="/list-presta">Prestataire</router-link>
          </li>
        </ul>

        <!-- Section de l'utilisateur (connexion/déconnexion) -->
        <div class="navbar-right mt-2">
          <div v-if="authStore.isAuthenticated">
  <div class="user-info">
    <p @click="goToProfil(authStore.user?.id, authStore.user?.role)" style="cursor: pointer; color: green;">
      <i class="fas fa-user me-2"></i>
      <span>{{ authStore.user?.name }}</span>
    </p>
  </div>
  <button @click="handleLogout" class="btn btn-outline-secondary">Déconnexion</button> <!-- Bouton de déconnexion -->
</div>

          <div v-else>
            <router-link to="/login" class="btn btn-primary">Se connecter</router-link> <!-- Lien vers la page de connexion -->
          </div>
        </div>

        <!-- Sélecteur de langue -->
        <!-- <div>
          <select class="form-select" aria-label="Language select">
            <option value="1">FR</option>
            <option value="2">EN</option>
            <option value="3">AR</option>
          </select>
        </div> -->
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'; 
import { useAuthStore } from '../store/auth.js';
import { onMounted } from 'vue'; 
import { useRoute } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const route = useRoute(); 


onMounted(() => {
  const userId = route.params.id;
  if (userId) {
    authStore.fetchUserProfile(userId); 
  }
});

function handleLogout() {
  authStore.logout();  
  router.push({ path: '/' });  
}

const goToProfil = (userId, role) => {
  if (role === 'admin') {
    router.push({ path: `/homeadmin/${userId}` }); // Rediriger vers le profil admin
  } else if (role === 'prestataire') {
    router.push({ path: `/prestaProfile/${userId}` }); // Rediriger vers le profil prestataire
  }
};

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
