<template>
  <NavBar />
  <div class="container contenu">
    <h2>Gestion des Prestataires</h2>
    <button type="button" class="btn btn-primary" @click="newAdmin">
      Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
    </button>
  </div>

  <!-- Section de Recherche -->
  <div class="container mt-3">
    <input
      type="text"
      v-model="searchQuery"
      class="form-control"
      placeholder="Rechercher par nom, téléphone, email, domaine ou service"
    />
  </div>

  <div class="container mt-5">
    <table class="table table-bordered table-sm table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Email</th>
          <th scope="col">Adresse</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody class="lignes">
        <tr v-for="(admin, index) in filteredAdmins" :key="admin.id">
          <td>{{ index + 1 }}</td>
          <td>{{ admin.name }}</td>
          <td>{{ admin.email }}</td>
          <td>{{ admin.address }}</td>
          <td class="buttons">
            <button class="btn btn-secondary me-2" @click="viewDetails(admin)">
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            <router-link :to="`/homeadmin/${currentId}/presta-admin/${admin.id}`" class="btn btn-info me-2">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </router-link>
            <button class="btn btn-danger" @click="destroy(admin)">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal pour les détails -->
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
            <p><strong>Disponibilité:</strong> {{ selectedAdmin.availability }}</p>
            <p><strong>Description:</strong> {{ selectedAdmin.description }}</p>

            <p><strong>Domaines:</strong></p>
            <ul v-if="selectedAdmin.domains && selectedAdmin.domains.length">
              <li v-for="(domain, index) in selectedAdmin.domains" :key="index">{{ domain }}</li>
            </ul>
            <p v-else>Aucun domaine disponible</p>

            <p><strong>Services:</strong></p>
            <ul v-if="selectedAdmin.services && selectedAdmin.services.length">
              <li v-for="(service, index) in selectedAdmin.services" :key="index">{{ service }}</li>
            </ul>
            <p v-else>Aucun service disponible</p>

            <p><strong>Liens:</strong></p>
            <ul v-if="selectedAdmin.socialLinks && selectedAdmin.socialLinks.length">
              <li v-for="(link, index) in selectedAdmin.socialLinks" :key="index">
                <a :href="link.url" target="_blank">{{ link.name }}</a>
              </li>
            </ul>
            <p v-else>Aucun lien disponible</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDetails">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddPresta v-if="add" @close="add = false" @adminAdded="getAdmin()" ></AddPresta>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useGestionStore } from "../../store/gestion";
import { useRouter, useRoute } from "vue-router";
import AddPresta from "./AddPresta.vue";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const gestionStore = useGestionStore();
const showDetails = ref(false);
const selectedAdmin = ref(null);
const add = ref(false);
const searchQuery = ref("");  // Pour la recherche
const toast = useToast();
const currentId = parseInt(route.params.id);

const newAdmin = () => {
  add.value = true;
};

const admins = computed(() => {
  return gestionStore.users.filter((user) => user.role === "prestataire");
});

// Filtrage des administrateurs selon la recherche
const filteredAdmins = computed(() => {
  return admins.value.filter((admin) => {
    const searchValue = searchQuery.value.toLowerCase();
    return (
      admin.name.toLowerCase().includes(searchValue) ||
      admin.email.toLowerCase().includes(searchValue) ||
      admin.telephone?.toLowerCase().includes(searchValue) ||
      (admin.domains && admin.domains.some(domain => domain.toLowerCase().includes(searchValue))) ||
      (admin.services && admin.services.some(service => service.toLowerCase().includes(searchValue)))
    );
  });
});

async function getAdmin() {
  try {
    await gestionStore.fetchAdmins(); 
    admins.value = gestionStore.users.filter(user => user.role === "prestataire");
  } catch (error) {
    console.error("Erreur lors de la récupération des prestataires:", error);
  }
}

onMounted(async () => {
  await getAdmin();
});

const destroy = async (admin) => {
  selectedAdmin.value = admin; // Assigner l'administrateur sélectionné
  if (!selectedAdmin.value) {
    toast.error("Aucun administrateur sélectionné");
    return;
  }

  try {
    if (window.confirm("Confirmer la suppression de ce prestataire ? ses données et projet seront supprimés")) {
      const adminId = selectedAdmin.value.id;

      // Supprimer dans le backend via le store
      await gestionStore.deleteUser(adminId);

      // Supprimer dans la liste locale après confirmation backend
      const index = admins.value.findIndex((a) => a.id === adminId);
      if (index !== -1) {
        admins.value.splice(index, 1);
        toast.success("Prestataire supprimé avec succès");
      } else {
        toast.error("Administrateur non trouvé dans la liste locale");
      }
    }
  } catch (error) {
    toast.error("Erreur de suppression");
    console.error(error);
  }
};

const viewDetails = (admin) => {
  selectedAdmin.value = admin;
  showDetails.value = true;
};

const closeDetails = () => {
  showDetails.value = false;
  selectedAdmin.value = null;
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
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
.contenu {
  margin-top: 100px;
}
.contenu button {
  margin-left: 90%;
}
@media (max-width: 992px) {
  .contenu button {
    margin-left: 70%;
  }
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
</style>
