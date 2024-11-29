<template>
  <NavBar />
  <div class="container contenu">
    <h2>Gestion des Services</h2>
    <div class="d-flex justify-content-between align-items-center my-3">
      <button type="button" class="btn btn-primary" @click="newDomain()">
        Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </button>

      <!-- Section de recherche -->
      <div class="search-bar d-flex">
        <input 
          type="text" 
          class="form-control me-2" 
          placeholder="Rechercher un service" 
          v-model="searchTerm" 
          @input="filterServices"
        />
        <button class="btn btn-outline-primary" @click="filterServices">
          Rechercher
        </button>
      </div>
    </div>
  </div>

  <AddService v-if="add" :add="add" @close="add = false" />

  <div class="container mt-5">
    <table class="table table-bordered table-sm table-striped">
      <thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Nom du Service</th>
    <th scope="col">Créé par</th>
    <th scope="col">Domaine</th> <!-- Nouvelle colonne -->
    <th scope="col">Actions</th>
  </tr>
</thead>
<tbody class="lignes">
  <tr v-for="(service, index) in filteredServices" :key="service.id">
    <td>{{ index + 1 }}</td>
    <td>{{ service.name }}</td>
    <td>{{ service.userName }}</td>
    <td>{{ service.domainName }}</td> <!-- Afficher le nom du domaine -->
    <td class="buttons">
      <button class="btn btn-secondary me-2" @click="viewDetails(service)">
        <i class="fa fa-eye" aria-hidden="true"></i>
      </button>
      <button class="btn btn-info me-2" @click="EditServic(service)">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      <button class="btn btn-danger" @click="destroy(service)">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </td>
  </tr>
</tbody>


    </table>
  </div>

  <!-- Modal pour afficher les détails -->
  <div v-if="showDetails" class="modal show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Détails du Service</h5>
          <button type="button" class="btn-close" @click="closeDetails"></button>
        </div>
       <div class="modal-body">
  <p><strong>Nom:</strong> {{ selectedService.name }}</p>
  <p><strong>Créé par:</strong> {{ selectedService.userName }}</p>
  <p><strong>Domaine:</strong> {{ selectedService.domainName }}</p> <!-- Nouveau champ -->
</div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeDetails">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>

  <EditService v-if="editC" :service="selectedService" @close="editC = false" />
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useGestionStore } from "../../store/gestion";
import EditService from "./EditService.vue";
import AddService from "./AddService.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const gestionStore = useGestionStore();
const showDetails = ref(false);
const selectedService = ref(null);
const add = ref(false);
const editC = ref(false);

const searchTerm = ref(""); // Nouveau champ pour stocker la recherche

// Fonction pour filtrer les services en fonction de la recherche
const filteredServices = computed(() =>
  gestionStore.services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

const newDomain = () => {
  add.value = true;
};

const viewDetails = (service) => {
  selectedService.value = service;
  showDetails.value = true;
};

const closeDetails = () => {
  showDetails.value = false;
  selectedService.value = null;
};

const EditServic = (service) => {
  selectedService.value = { ...service };
  editC.value = true;
};

const destroy = async (service) => {
  if (window.confirm("Confirmer la suppression de ce service")) {
    try {
      await gestionStore.deleteService(service.id);
      await gestionStore.loadServiceFromApi();
      toast.success("Service supprimé avec succès !");
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Une erreur est survenue.";
      toast.error(errorMsg);
    }
  }
};

onMounted(async () => {
  await gestionStore.loadServiceFromApi();
});
</script>

<style scoped>
.contenu {
  margin-top: 100px;
}

.search-bar {
  max-width: 400px;
}

.search-bar input {
  flex-grow: 1;
}

.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}

.buttons .btn {
  background-color: transparent;
  color: black;
  border: none;
  font-size: 20px;
  margin: 0;
}

@media (max-width: 992px) {
  .contenu button {
    margin-left: 70%;
  }
  .buttons {
    display: flex;
    gap: 0;
  }
  .buttons .btn {
    background-color: transparent;
    color: black;
    border: none;
    font-size: 15px;
    margin: 0;
  }
  .lignes {
    font-size: 13px;
  }
}
</style>
