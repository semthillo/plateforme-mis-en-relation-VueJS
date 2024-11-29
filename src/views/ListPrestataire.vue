
<template>

    <NavBar class="mb-5"/>
    <div class="container mt-5">
      <br><br>
      <div class="search-bar d-flex justify-content-center my-4 ms-5">
        <input type="text" v-model="searchQuery" class="form-control" placeholder="Rechercher par lieu, disponibilité, services..." />
        <button class="btn btn-primary ms-2" @click="filterPrestataires">Rechercher</button>
      </div>
  
     
      <div class="container px-4 py-5" id="featured-3">
        <div class="card-grid">
          <div v-for="user in filteredPrestataires" :key="user.id" class="feature">
            <div class="card-horizontal d-flex align-items-center p-3">
              <img :src="user.profil || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRqItMEHRi0-glvCU-WK_IttS5ehFZCG5qrQ&s'"  class="img-thumbnail rounded" alt="Photo du prestataire">
              <div class="card-body">
                <p class="card-title"> {{ user.domains.join(', ') || 'Non spécifié' }}</p>
                <h5 class="card-text"><strong>Nom: </strong> {{ user.name }}</h5>
                <p class="card-text"><strong>Adresse:</strong> {{ user.address }}</p>
                <p class="card-text"><strong>Disponibilité:</strong> {{ user.availability || 'Non spécifiée' }}</p>
                <router-link class="btn btn-primary mt-3" :to="`/PrestaProfile/${user.id}`">
                  Voir le profil
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
  
     
    </div>

    <Footer />
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useGestionStore } from '../store/gestion';
import NavBar from '../components/NavBar.vue';
  
  const gestionStore = useGestionStore();
  const searchQuery = ref(''); // Pour stocker la valeur de recherche
  
  onMounted(async () => {
    await gestionStore.fetchAdmins();
  });
  
  const prestataires = computed(() => {
    return gestionStore.users.filter(user => user.role === 'prestataire');
  });
  
  // Filtrage dynamique basé sur la recherche par lieu
  const filteredPrestataires = computed(() => {
    if (searchQuery.value.trim() === '') return prestataires.value;
    return prestataires.value.filter(user =>
      user.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  // Fonction de filtrage déclenchée par le bouton de recherche
  const filterPrestataires = () => {
    searchQuery.value = searchQuery.value.trim();
  };
  </script>
  
  <style scoped>
  /* Styles pour la barre de recherche et la disposition des cartes */
  .search-bar {
    margin-top: 500px; 
    width: 100%;
    max-width: 600px;
  }
  
  .navigation button{
    border: 1px solid rgb(4, 150, 235);;
    color: rgb(4, 150, 235);;
  }
  
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .feature .card-horizontal {
    display: flex;
    background-color: #ffffff86;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    border-radius: 8px;
    border-left: 2px solid rgb(4, 150, 235);
    border-right: 2px solid rgb(4, 150, 235);
  }
  
  .feature .card-horizontal:hover {
    transform: translateY(-5px);
  }
  
  .img-thumbnail {
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin-right: 20px;
  }
  
  .card-body {
    flex: 1;
    text-align: left;
  }
  
  .card-title {
    font-size: 01rem;
    color: rgb(4, 150, 235);
    font-weight: bold;
  }
  
  .card-text {
    font-size: 0.9rem;
    color: #555;
    margin: 0;
  }
  
  .btn-primary {
    background-color: rgb(4, 150, 235);
    border: none;
  }
  
  .btn-primary:hover {
    background-color: rgb(3, 130, 205);
  }
  
  
  @media (max-width: 992px) {
    .search-bar {
     
    width: 80%;
    
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }

  }
  </style>
  