<template>
  <NavBar />
  <div class="container contenu">
    <h2>Gestion des Prestataires</h2>
    <button type="button" class="btn btn-primary" @click="newAdmin">
      Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
    </button>
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
      <tbody>
        <tr v-for="(admin, index) in admins" :key="admin.id">
          <td>{{ index + 1 }}</td>
          <td>{{ admin.name }}</td>
          <td>{{ admin.email }}</td>
          <td>{{ admin.address }}</td>
          <td>
            <button class="btn btn-secondary me-2" @click="viewDetails(admin)">
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            <button class="btn btn-info me-2" @click="editAdm(index)">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
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
  <AddPresta v-if="add" @close="add = false"></AddPresta>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useGestionStore } from "../../store/gestion";
import { useRouter } from "vue-router";
import AddPresta from "./AddPresta.vue";

const router = useRouter();
const gestionStore = useGestionStore();
const showDetails = ref(false);
const selectedAdmin = ref(null);
const add = ref(false);

const newAdmin = () => {
  add.value = true;
};

const editAdm = (index) => {
  gestionStore.currentIndex = index;
  router.push(`/edit/${index}`);
};

const viewDetails = (admin) => {
  selectedAdmin.value = admin;
  showDetails.value = true;
};

const closeDetails = () => {
  showDetails.value = false;
  selectedAdmin.value = null;
};

const admins = computed(() => {
  return gestionStore.users.filter((user) => user.role === "prestataire");
});

async function getAdmin() {
  try {
    await gestionStore.fetchAdmins();
  } catch (error) {
    console.error("Erreur lors de la récupération des prestaires:", error);
  }
}

onMounted(async () => {
  await getAdmin();
});

const destroy = (admin) => {
  if (window.confirm("Confirmer la suppression de ce prestataire")) {
    const index = gestionStore.users.findIndex((r) => r === admin);
    if (index !== -1) {
      gestionStore.deleteUser(index);
    }
  }
};
</script>

<style scoped>
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
</style>
