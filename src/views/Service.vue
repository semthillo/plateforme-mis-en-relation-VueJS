<template>
    <NavBar class="mb-5" />
    <div class="container mt-5">
      <br><br>
      <div class="search-bar d-flex justify-content-center my-4 ms-5">
        <input
          type="text"
          v-model="searchQuery"
          class="form-control"
          placeholder="Rechercher un service..."
        />
        <button class="btn btn-primary ms-2" @click="filterServices">Rechercher</button>
      </div>
  
      <div class="container px-4 py-5">
        <div class="card-grid">
          <div v-for="service in filteredServices" :key="service.id" class="feature">
            <div class="card p-4 text-center">
              <h2 class="service-name">{{ service.name }}</h2>
              <button class="btn btn-primary button-voir mt-3" @click="openModal(service)">
                Voir les prestataires
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal pour afficher les utilisateurs -->
      <div
        v-if="selectedService"
        class="modal fade show d-block"
        tabindex="-1"
        role="dialog"
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Prestataires de service : {{ selectedService.name }}
              </h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <ul class="list-group">
                <li
                  v-for="user in prestataires"
                  :key="user.id"
                  class="list-group-item"
                  @click="goToPrestataireProfil(user.id)" style="cursor: pointer;">
                  {{ user.name }} - {{ user.address }}
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <Footer />
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useGestionStore } from "../store/gestion";
  import NavBar from "../components/NavBar.vue";
  import { useRouter } from 'vue-router';
  const gestionStore = useGestionStore();
  const searchQuery = ref("");
  const selectedService = ref(null); // Stocke le service sélectionné pour le modal
  const prestataires = ref([]); // Liste des prestataires du service sélectionné
  const router = useRouter()
  onMounted(async () => {
    await gestionStore.loadServiceFromApi();
    await gestionStore.fetchAdmins();
  });
  
  // Liste complète des services
  const services = computed(() => gestionStore.services);
  
  // Filtrage dynamique des services
  const filteredServices = computed(() => {
    if (searchQuery.value.trim() === "") return services.value;
    return services.value.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  const goToPrestataireProfil = (userId) => {
  router.push({path:`/prestaProfile/${userId}`}); // Rediriger vers le profil du prestataire
};
  // Ouvre le modal avec le service sélectionné
  const openModal = async (service) => {
    selectedService.value = service;
    prestataires.value = await gestionStore.getUsersForService(service.id); // Récupère les prestataires pour ce service
  };
  
  // Ferme le modal
  const closeModal = () => {
    selectedService.value = null;
    prestataires.value = []; // Réinitialise la liste des prestataires
  };
  
  // Fonction de recherche
  const filterServices = () => {
    searchQuery.value = searchQuery.value.trim();
  };
  </script>
  
  <style scoped>
  /* Styles pour la recherche et les cartes */
  .search-bar {
    margin-top: 500px;
    width: 100%;
    max-width: 600px;
  }
  
  .card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  
  .feature .card {
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: transform 0.3s ease;
    padding: 20px;
    border-right: 5px solid rgb(4, 150, 235);
    border-left: 5px solid rgb(4, 150, 235);
  }
  
  .feature .card:hover {
    transform: translateY(-5px);
  }
  
  .service-name {
    font-size: 1.4rem;
    color: rgb(4, 150, 235);
    font-weight: bold;
  }
  
  .btn-primary {
    background-color: rgb(4, 150, 235);
    border: none;
  }
  
  .button-voir {
    background-color: rgb(4, 150, 235);
    border: none;
    width: 40%;
    margin: auto;
    font-size: 10px;
  }
  
  .btn-primary:hover {
    background-color: rgb(3, 130, 205);
  }
  
  /* Modal styling */
  .modal-dialog {
    margin-top: 100px;
  }
  
  .modal-header {
    background-color: rgb(4, 150, 235);
    color: white;
  }
  
  .modal-body {
    max-height: 400px;
    overflow-y: auto;
  }

  @media (max-width: 992px) {
    .search-bar{
      width: 80%;
    }
    .card-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }
  .feature .card{
    width: 80%;
    margin: auto;
  }
  }
  </style>
  