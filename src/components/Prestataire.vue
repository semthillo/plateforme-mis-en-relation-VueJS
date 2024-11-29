<template>
  <div class="container d-flex">
    <!-- Barre de filtre -->
    <div class="mt-5 w-60">
      <div class="filter-bar p-4 bg-light rounded">
        <h4>Filtrer Par Domaines</h4>
        <!-- Champ de recherche des domaines -->
        <input
          type="text"
          class="form-control mt-2"
          placeholder="Rechercher un domaine..."
          v-model="searchDomainQuery"
        />
        <ul class="list-group list-group-flush mt-3">
          <li 
            v-for="(item, index) in filteredDomains" 
            :key="index" 
            class="list-group-item">
            <button 
              class="btn btn-link filter-link" 
              @click="selectedDomain = item.name">
              {{ item.name }}
            </button>
          </li>
        </ul>
        <button 
          class="btn btn-secondary text-3 mt-3" 
          @click="selectedDomain = ''">
          Réinitialiser le filtre
        </button>
      </div>
    </div>

    <!-- Liste des prestataires -->
    <div class="container px-4 py-5" id="featured-3">
    
      <div v-if="filteredPrestataires.length > 0" class="card-grid">
        <div 
          v-for="user in filteredPrestataires" 
          :key="user.id" 
          class="feature">
          <div class="card-horizontal d-flex align-items-center p-3">
             <img :src="user.profil || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRqItMEHRi0-glvCU-WK_IttS5ehFZCG5qrQ&s'" 
         class="img-thumbnail rounded" 
         alt="Photo du prestataire">
            <div class="card-body">
              <p class="card-title">{{ user.domains.join(', ') || 'Non spécifié' }}</p>
              <h5 class="card-text"><strong>Nom: </strong>{{ user.name }}</h5>
              <p class="card-text"><strong>Adresse:</strong> {{ user.address }}</p>
              <p class="card-text"><strong>Disponibilité:</strong> {{ user.availability || 'Non spécifiée' }}</p>
              <router-link 
                class="btn btn-primary mt-3" 
                :to="`/PrestaProfile/${user.id}`">
                Voir le profil
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-muted">Aucun prestataire trouvé pour ce domaine.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGestionStore } from '../store/gestion';

const gestionStore = useGestionStore();
const searchQuery = ref(''); // Pour stocker la valeur de recherche des prestataires
const searchDomainQuery = ref(''); // Pour stocker la valeur de recherche des domaines
const selectedDomain = ref(''); // Pour le filtre par domaine
const domains = ref([]); // Liste des domaines

// Charger les données lors du montage
onMounted(async () => {
  await gestionStore.fetchAdmins();
  domains.value = await gestionStore.loadDomainFromApi();
});

// Liste des prestataires
const prestataires = computed(() => {
  return gestionStore.users.filter(user => user.role === 'prestataire');
});

// Filtrage des domaines
const filteredDomains = computed(() => {
  if (!searchDomainQuery.value.trim()) {
    return domains.value;
  }
  return domains.value.filter(domain =>
    domain.name.toLowerCase().includes(searchDomainQuery.value.toLowerCase())
  );
});

// Filtrage dynamique basé sur le domaine sélectionné
const filteredPrestataires = computed(() => {
  let filtered = prestataires.value;

  // Filtrer par domaine si un domaine est sélectionné
  if (selectedDomain.value) {
    filtered = filtered.filter(user => 
      user.domains.includes(selectedDomain.value)
    );
  }

  // Filtrer par recherche si une requête est saisie
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(user =>
      user.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});
</script>

<style scoped>

/* Styles pour la barre de recherche et la disposition des cartes */
.search-bar {
  width: 100%;
  max-width: 600px;
}

.navigation button {
  border: 1px solid rgb(4, 150, 235);
  color: rgb(4, 150, 235);
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
  width: 90px;
  height: 90px;
  object-fit: cover;
  margin-right: 20px;
 
  
}

.card-body {
  flex: 1;
  text-align: left;
}

.filter-bar {
  position: sticky;
  top: 20px;
  width: 280px;
  border-radius: 10px;
  height: calc(70vh - 40px);
  background: #f9f9f9;
}

.filter-link {
  color: #555;
  text-decoration: none;
  font-weight: bold;
}

.filter-link:hover {
  color: #0496eb;
}

.card-title {
  font-size: 0.9rem;
  color: rgb(4, 150, 235);
  font-weight: bold;
}

.card-text {
  font-size: 0.7rem;
  color: #555;
  margin: 0;
}

.btn-primary {
  background-color: rgb(4, 150, 235);
  border: none;
  font-size: 10px;
}

.btn-primary:hover {
  background-color: rgb(3, 130, 205);
}
@media (max-width: 768px) {
  .filter-bar-container {
    flex: 1 1 100%; /* Prend toute la largeur sur petits écrans */
    max-width: none;
    width: 100%;
  }
  .filter-bar{
    width: 90%;
    text-align: left;
  }
  .filter-bar h4{
     font-size: 20px;
     width: 100%;
  }
  .list-group-item{
    background: transparent;
  }
  .form-control{
    width: 100%;
  }
  .card-grid {
    flex: 1 1 100%; /* S'empile sous la barre de filtres sur petits écrans */
    grid-template-columns: 1fr;
    
  }
  .card-text, .card-title{
    text-align: left;
  }
 

}
@media (max-width: 768px) {
  .card-grid {
    flex: 1 1 100%; /* S'empile sous la barre de filtres sur petits écrans */
    grid-template-columns: 1fr; /* Une seule carte par ligne */
  }
}
@media (max-width: 768px) {
  .card-horizontal {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .img-thumbnail {
    margin: 0 0 15px 0;
  }
  .card-body {
    text-align: center;
  }
}
</style>
