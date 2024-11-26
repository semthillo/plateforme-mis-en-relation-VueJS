<template>
  <NavBar />
    <div class="container contenu">
        <h2>Gestion des Administrateurs</h2>
        <button type="button" class="btn btn-primary" @click="newAdmin()">
    Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
</button>


    </div>
    
    <AddAdmin v-if="add" :add="add" @close="add = false" @adminAdded="getAdmin()" ></AddAdmin>

   
  <div class="container mt-5">
    <table class="table table-bordered table-sm table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Email</th>
          <th scope="col">Adresse</th>
          <th scope="col">Téléphone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(admin, index) in admins" :key="admin.id">
          <td>{{ index + 1 }}</td>
          <td>{{ admin.name }}</td>
          <td>{{ admin.email }}</td>
          <td>{{ admin.address }}</td>
          <td>{{ admin.telephone }}</td>
          <td>
            <button class="btn btn-secondary me-2" @click="viewDetails(admin)">
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            <button class="btn btn-info me-2" @click="editAdm(admin)">
  <i class="fa fa-pencil" aria-hidden="true"></i>
</button>
            
<button class="btn btn-danger" @click="destroy(admin)">
  <i class="fa fa-trash" aria-hidden="true"></i>
</button>

          </td>
        </tr>
      </tbody>
    </table>

    
    <EditAdmin v-if="editC" :admin="selectedAdmin" @close="editC = false" @adminAdded="getAdmin()" />

    
    <div v-if="showDetails" class="modal show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Détails de l'administrateur</h5>
            <button type="button" class="btn-close" @click="closeDetails"></button>
          </div>
          <div class="modal-body">
            <p><strong>Nom:</strong> {{ selectedAdmin.name }}</p>
            <p><strong>Email:</strong> {{ selectedAdmin.email }}</p>
            <p><strong>Adresse:</strong> {{ selectedAdmin.address }}</p>
            <p><strong>Téléphone:</strong> {{ selectedAdmin.telephone }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDetails">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGestionStore } from "../../store/gestion";
import EditAdmin from "./EditAdmin.vue";
import { useRouter } from "vue-router";

import AddAdmin from './AddAdmin.vue'
import { useToast } from "vue-toastification";


const store = useGestionStore()
const toast = useToast()

const add = ref(false)

function newAdmin(){
    add.value = true
}


const router = useRouter()
const gestionStore = useGestionStore();
const admins = ref([]);
const editC = ref(false);
const showDetails = ref(false);
const selectedAdmin = ref(null);

const editAdm = (admin) => {
  selectedAdmin.value = { ...admin }; // copie de l'admin sélectionné
  editC.value = true;
};


const viewDetails = (admin) => {
  selectedAdmin.value = admin;
  showDetails.value = true;
};

const closeDetails = () => {
  showDetails.value = false;
  selectedAdmin.value = null;
};

async function getAdmin() {
  try {
    await gestionStore.fetchAdmins(); 
    admins.value = gestionStore.users.filter(user => user.role === "admin");
  } catch (error) {
    console.error("Erreur lors de la récupération des administrateurs:", error);
  }
}


onMounted(async () => {
  await getAdmin();
});

const destroy = (admin) => {
  selectedAdmin.value = admin; // Assigner l'administrateur sélectionné
  if (!selectedAdmin.value) {
    toast.error("Aucun administrateur sélectionné");
    return;
  }

  try {
    if (window.confirm("Confirmer la suppression de cet administrateur ?")) {
      const index = admins.value.findIndex(admin => admin.id === selectedAdmin.value.id);
      if (index !== -1) {
        const adminId = admins.value[index].id;
        gestionStore.deleteUser(adminId);
        admins.value.splice(index, 1);
        toast.success("Admin supprimé avec succès");
        
      } else {
        toast.error("Administrateur non trouvé");
      }
    }
  } catch (error) {
    toast.error("Erreur de suppression");
    console.error(error);
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
