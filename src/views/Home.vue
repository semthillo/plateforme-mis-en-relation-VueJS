<template>
  <NavBar />

  <main class="container-fluid p-0 mb-5">
    <!-- Section Image de Bienvenue avec Champ de Recherche -->
    <div class="welcome-banner position-relative">
      <img src="https://media.istockphoto.com/id/1082424324/fr/photo/concept-demploi-de-main-doeuvre-espace-copie.jpg?b=1&s=612x612&w=0&k=20&c=zAq6bDBSIv5Est5l7xrkvah6Z1akeLBmhMT0666HRLE=" alt="Background Image" />
      
      <!-- Message de Bienvenue et Recherche -->
      <div class="overlay-content d-flex flex-column align-items-center justify-content-center">
        <h2 class="text-white mb-2 welcome-title">Bienvenue chez nous!</h2>
        <p class="text-white mb-3 welcome-subtitle">Trouvez tout ce dont vous avez besoin facilement.</p>
        <!-- <div class="input-group search-bar mt-3">
          <input type="text" class="form-control" placeholder="Rechercher par lieu, disponibilité, services..." />
          <button class="btn btn-primary" type="button">Rechercher</button>
        </div> -->
      </div>
    </div>

    <!-- Carrousel de Catégories -->
    <div class="categories-carousel mt-5 d-flex  justify-content-center">
      <div class="category-wrapper">
        <div class="category-item" v-for="(category, index) in categories" :key="index">
          <i :class="category.icon"></i>
          <span>{{ category.label }}</span>
        </div>
      </div>
    </div>

    <!-- Section des prestataires et filtre -->
    

      <!-- Liste des Prestataires -->
      <div class="flex-grow-1 mt-4 mb-5 ms-4">
        <div class="titre">
            <h3><span>Nos</span> Prestataires</h3> 
        </div> 
        <Prestataire />
      
    </div>

    <!-- Section Services -->
    <div class="container" style="width: 100%; height: 60vh; margin-bottom: 100px; margin-top: 350px;">
  <div class="section-service row g-3 " style="width: 100%;">
    
    <div class="col-md-8 w-100">
      <div class="card-body text-section">
        <h5 class="card-title mb-2">One Click Services</h5>
        <p class="card-text mb-2 ">
            Nous vous proposons des services de qualité, à portée de clic
        </p>
        <div class="card-text mt-4">
            <router-link class="btn btn-primary" to="service">Nos Services <i class="fa fa-long-arrow-right" aria-hidden="true"></i></router-link >
        </div>
      </div>
    </div>
    <div class="col-md-4 w-95">
      <img src="https://images.pexels.com/photos/16007538/pexels-photo-16007538/free-photo-of-nourriture-aliments-homme-chef.jpeg?auto=compress&cs=tinysrgb&w=550" 
           class="img  rounded custom-img" 
           alt="Chef preparing food">
    </div>
  </div>
</div>
  </main>

  <Partenaire />
  <Footer />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useGestionStore } from '../store/gestion';

const gestionStore = useGestionStore();

const categories = reactive([
  { icon: 'fa fa-wrench', label: 'Plomberie' },
  { icon: 'fa fa-home', label: 'Immobilier' },
  { icon: 'fa fa-car', label: 'Voyage' },
  { icon: 'fa fa-book', label: 'Scolaire' },
  { icon: 'fa fa-gift', label: 'Événement' },
]);

</script>

<style scoped>
/* Bienvenue */
.welcome-banner {
  position: relative;
  height: 80vh;
}
.welcome-banner img{
object-fit: cover;
  width: 1400px;
  height: 500px;
}

.banner-image {
  height: 100%;
  
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.65);
  border-radius: 12px;
  padding: 30px 40px;
  width: 60%;
  text-align: center;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #ddd;
}

.search-bar {
  max-width: 600px;
  display: flex;
  gap: 10px;
}

.btn-primary {
  background-color: #0496eb;
  border: none;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0382cd;
}

/* Carrousel de Catégories */
.categories-carousel .category-wrapper {
  display: flex;
  gap: 20px;
  padding: 15px;
  
}

.category-item {
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  background-color: #f1f1f1;
  transition: transform 0.3s ease, background-color 0.3s;
}

.category-item:hover {
  transform: scale(1.1);
  background-color: #ebebeb;
}

.category-item i {
  font-size: 2rem;
  color: #0496eb;
}

.category-item span {
  font-weight: 600;
  font-size: 0.9rem;
}

.titre {
    text-align: center;
    margin: 0 auto;
    width: 80%;
    color: rgb(4, 150, 235);
}
.titre h3 span {
    color: rgb(125, 192, 250);
}

/* Section des Prestataires et Filtres */


/* Section Services 
.section-service .service-info {
  color: #000000;
}

.section-service img {
  border-radius: 10px;
  width: 100%;
  max-height: 100%;
}
.section-service .row{
  
  gap: 20px;
}*/
.container .section-service{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>
