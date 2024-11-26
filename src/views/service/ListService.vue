<template>
   <NavBar />
    <div class="container contenu">
        <h2>Gestion des Services</h2>
        <button type="button" class="btn btn-primary" @click="newDomain()">
    Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
</button>


    </div>
    
   <AddService v-if="add" :add="add" @close="add = false"/>

    <div class="container mt-5">
      <table class="table table-bordered table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(serve, index) in gestionStore.services" :key="serve.id">
            <td>{{ index + 1 }}</td>
            <td>{{ serve.name }}</td>
            <td>
              <button class="btn btn-secondary me-2" @click="viewDetails(serve)">
                <i class="fa fa-eye" aria-hidden="true"></i>
              </button>
              <button class="btn btn-info me-2" @click="EditServic(serve)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button class="btn btn-danger" @click="destroy(serve)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="showDetails" class="modal show d-block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Détails du Service</h5>
              <button type="button" class="btn-close" @click="closeDetails"></button>
            </div>
            <div class="modal-body">
              <p><strong>Nom:</strong> {{ selectedService.name }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeDetails">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditService v-if="editC" :service="selectedService" @close="editC = false" />
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import { useGestionStore } from "../../store/gestion";
import EditService from "./EditService.vue";
import AddService from './AddService.vue';

  const gestionStore = useGestionStore();
  const showDetails = ref(false);
  const selectedService = ref(null);
  
  const viewDetails = (service) => {
    selectedService.value = service;
    showDetails.value = true;
  };
  const add = ref(false)

function newDomain(){
    add.value = true
}

  const closeDetails = () => {
    showDetails.value = false;
    selectedService.value = null;
  };
  
  const editC = ref(false);
  
  const EditServic = (service) => {
    selectedService.value = { ...service }; 
    editC.value = true; 
  };
  
  onMounted(async () => {
    await gestionStore.loadServiceFromApi(); 
  });
  
  const destroy = async (service) => {
    if (window.confirm("Confirmer la suppression de ce service")) {
      await gestionStore.deleteService(service.id);
      await gestionStore.loadServiceFromApi();
    }
  };
  </script>
  
  <style scoped>
  .contenu {
    margin-top: 100px;
}
.contenu button {
    margin-left: 90%;
}
  .modal.show {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  