<template>
  <NavBar />

  <main class="container-fluid p-0" style="margin-top: 100px;">
    <div class="container row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card">
          <img src="../assets/android-chrome-192x192.png" class="card-img-top" alt="Admin">
          <div class="card-body">
            <router-link class="card-title" :to="`/homeadmin/${userId}/listadmin`">Administrateurs</router-link>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="../assets/presta.png" class="card-img-top" alt="Prestataires">
          <div class="card-body">
            <router-link :to="`/homeadmin/${userId}/listpresta`" class="card-title">Prestataires</router-link>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="../assets/iinnffo.png" class="card-img-top" alt="Domaines">
          <div class="card-body">
            <router-link :to="`/homeadmin/${userId}/listdomaine`" class="card-title">Domaines</router-link>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="../assets/domaine.png" class="card-img-top" alt="Services">
          <div class="card-body">
            <router-link :to="`/homeadmin/${userId}/listservice`" class="card-title">Services</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
<router-view></router-view>

</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.id;  // Récupère l'ID à partir des paramètres de l'URL

console.log('ID utilisateur:', userId);
</script>

<style>
.card-title {
  font-size: 20px;
  color: rgb(4, 150, 235);
  text-decoration: none;
}

.row {
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.row .col {
  width: 100%;
}

.row .col .card {
  width: 100%;
  padding-top: 10px;
  text-align: center;
}

.row .col .card img {
  width: 80px;
  height: 80px;
  margin: auto;
}

.welcome-banner {
  position: relative;
  height: 80vh;
}

.banner-image {
  height: 100%;
  object-fit: cover;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 30px 40px;
  border-radius: 10px;
  width: 60%;
}

.search-bar {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
}

.categories-carousel {
  margin-top: 20px;
}

.category-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  max-width: 900px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  padding: 15px;
  width: 100px;
}

.category-item i {
  font-size: 2rem;
}

.category-item span {
  font-weight: bold;
  font-size: 0.9rem;
  margin-top: 5px;
}

.custom-img {
  border-radius: 15px;
  object-fit: cover;
  height: 100%;
}

.text-section {
  text-align: center;
  align-content: center;
  background: white;
  height: 100%;
  padding: 20px;
  border-radius: 15px;
}

.container .section-service {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
