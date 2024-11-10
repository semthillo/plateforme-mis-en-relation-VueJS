<template>
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
            <button class="btn btn-info me-2" @click="editAdm(index)">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            
            <button class="btn btn-danger" @click="destroy()">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    
    <EditAdmin v-if="editC" @close="editC = false" />

    
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
const router = useRouter()
const gestionStore = useGestionStore();
const admins = ref([]);
const editC = ref(false);
const showDetails = ref(false);
const selectedAdmin = ref(null);

const editAdm = (index) => {
  gestionStore.currentIndex = index;
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

const destroy = () => {
  if (window.confirm("Confirmer la suppresion de cette administrateur")) {
    const index = gestionStore.users.findIndex(r => r === selectedAdmin.value);
    if (index !== -1) {
      gestionStore.deleteUser(index);
    }
    
    router.push("/admin");
  }
};
</script>

<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
