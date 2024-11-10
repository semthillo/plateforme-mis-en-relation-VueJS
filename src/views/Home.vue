<template>
  <NavBar />

  <main class="container-fluid p-0">
    <!-- Section Image de Bienvenue avec Champ de Recherche -->
    <div class="welcome-banner position-relative">
      <img src="https://images.pexels.com/photos/19255319/pexels-photo-19255319/free-photo-of-voiture-technologie-reflet-capuche.jpeg?auto=compress&cs=tinysrgb&w=1600" class="w-100 banner-image" alt="Background Image" />
      
      <!-- Message de Bienvenue et Recherche -->
      <div class="overlay-content d-flex flex-column align-items-center justify-content-center">
        <h2 class="text-white mb-2">Bienvenue chez nous!</h2>
        <p class="text-white mb-3">Trouvez tout ce dont vous avez besoin facilement.</p>
        <div class="input-group search-bar">
          <input type="text" class="form-control" placeholder="Rechercher..." />
          <button class="btn btn-primary" type="button">Rechercher</button>
        </div>
      </div>
    </div>
    
    <!-- Carrousel de Catégories en-dessous de l'image -->
    <div class="categories-carousel mt-4 d-flex justify-content-center">
      <div class="category-wrapper">
        <div class="category-item">
          <i class="fa fa-wrench"></i>
          <span>Plomberie</span>
        </div>
        <div class="category-item">
          <i class="fa fa-home"></i>
          <span>Immobilier</span>
        </div>
        <div class="category-item">
          <i class="fa fa-car"></i>
          <span>Voyage</span>
        </div>
        <div class="category-item">
          <i class="fa fa-book"></i>
          <span>Scolaire</span>
        </div>
        <div class="category-item">
          <i class="fa fa-gift"></i>
          <span>Événement</span>
        </div>
      </div>
    </div>
  </main>

  <Prestataire />

  <div class="container " style="width: 100%; height: 60vh; margin-bottom: 100px; margin-top: 100px;">
  <div class="section-service row g-3 " style="width: 100%;">
    
    <div class="col-md-8 w-100">
      <div class="card-body text-section">
        <h5 class="card-title mb-2">One Click Services</h5>
        <p class="card-text mb-2 ">
            Nous vous proposons des services de qualité, à portée de clic
        </p>
        <div class="card-text mt-4">
            <router-link class="btn btn-primary">Nos Services <i class="fa fa-long-arrow-right" aria-hidden="true"></i></router-link >
        </div>
      </div>
    </div>
    <div class="col-md-4 w-100">
      <img src="https://images.pexels.com/photos/16007538/pexels-photo-16007538/free-photo-of-nourriture-aliments-homme-chef.jpeg?auto=compress&cs=tinysrgb&w=600" 
           class="img-fluid rounded custom-img" 
           alt="Chef preparing food">
    </div>
  </div>
</div>
<Partenaire />

<Footer />
</template>

<script setup>



</script>

<style>
/* Styles de la bannière d'accueil */
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
  background: rgba(0, 0, 0, 0.6); /* Fond semi-transparent */
  padding: 30px 40px; /* Espace pour le message de bienvenue */
  border-radius: 10px;
  width: 60%; /* Large pour agrandir l'espace */
}

.search-bar {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
}

/* Styles du carrousel de catégories */
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

.container .section-service{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>
