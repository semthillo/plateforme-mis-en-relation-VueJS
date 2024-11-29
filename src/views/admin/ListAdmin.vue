<template>
  <NavBar />
  <div class="container contenu">
    <h2>Gestion des Administrateurs</h2>
    <button type="button" class="btn btn-primary" @click="newAdmin()">
      Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
    </button>

    <!-- Section de recherche -->
    <div class="search-section mt-4">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Rechercher par nom, email ou téléphone..."
        />
        <button class="btn btn-primary" @click="search">
          Rechercher <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>

  <AddAdmin
    v-if="add"
    :add="add"
    @close="add = false"
    @adminAdded="getAdmin()"
  ></AddAdmin>

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
      <tbody class="lignes">
        <tr v-for="(admin, index) in filteredAdmins" :key="admin.id">
          <td>{{ index + 1 }}</td>
          <td>{{ admin.name }}</td>
          <td>{{ admin.email }}</td>
          <td>{{ admin.address }}</td>
          <td>{{ admin.telephone }}</td>
          <td class="buttons">
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

    <EditAdmin
      v-if="editC"
      :admin="selectedAdmin"
      @close="editC = false"
      @adminAdded="getAdmin()"
    />

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
import { ref, computed, onMounted } from "vue";
import { useGestionStore } from "../../store/gestion";
import EditAdmin from "./EditAdmin.vue";
import AddAdmin from "./AddAdmin.vue";
import { useToast } from "vue-toastification";

const store = useGestionStore();
const toast = useToast();

const add = ref(false);
const searchQuery = ref("");
const admins = ref([]);
const filteredAdmins = computed(() =>
  admins.value.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      admin.telephone.includes(searchQuery.value)
  )
);

function newAdmin() {
  add.value = true;
}

async function getAdmin() {
  try {
    await store.fetchAdmins();
    admins.value = store.users.filter((user) => user.role === "admin");
  } catch (error) {
    console.error("Erreur lors de la récupération des administrateurs:", error);
  }
}

function search() {
  toast.success(`Résultats pour "${searchQuery.value}"`);
}

onMounted(async () => {
  await getAdmin();
});

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
        store.deleteUser(adminId);
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
.buttons .btn {
  background-color: transparent;
  color: black;
  border: none;
  font-size: 20px;
  margin: 0;
}

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

.search-section {
  margin-top: 20px;
}

.search-section .input-group {
  max-width: 500px;
  margin: 0 auto;
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
