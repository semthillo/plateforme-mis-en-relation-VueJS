<template>
  <NavBar />
  <div class="container contenu">
    <h2>Gestion des Domaines</h2>
    <button type="button" class="btn btn-primary" @click="newDomain()">
      Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
    </button>
  </div>

  <AddDomain v-if="add" :add="add" @close="add = false" />

  <div class="container mt-5">
    <!-- Barre de recherche -->
    <input
      v-model="searchTerm"
      class="form-control mb-3"
      placeholder="Rechercher par nom de domaine ou créateur"
    />

    <table class="table table-bordered table-sm table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Créateur</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody class="lignes">
        <tr
          v-for="(domain, index) in filteredDomains"
          :key="domain.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ domain.name }}</td>
          <td>{{ domain.creatorName }}</td>
          <td class="buttons">
            <button
              class="btn btn-secondary me-2"
              @click="viewDetails(domain)"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            <button
              class="btn btn-info me-2"
              @click="editDomain(domain)"
            >
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              class="btn btn-danger"
              @click="destroy(domain)"
            >
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
            <h5 class="modal-title">Détails du Domaine</h5>
            <button type="button" class="btn-close" @click="closeDetails"></button>
          </div>
          <div class="modal-body">
            <p><strong>Nom:</strong> {{ selectedDomain.name }}</p>
            <p><strong>Créateur:</strong> {{ selectedDomain.creatorName }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDetails">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Passer le domaine sélectionné à EditDomain -->
  <EditDomain v-if="editC" :domain="selectedDomain" @close="editC = false"  />
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useGestionStore } from "../../store/gestion";
import { useRouter } from "vue-router";
import EditDomain from "./EditDomain.vue";
import AddDomain from "./AddDomain.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const add = ref(false);
const editC = ref(false);
const selectedDomain = ref(null);

function newDomain() {
  add.value = true;
}

const router = useRouter();
const gestionStore = useGestionStore();

const showDetails = ref(false);

const viewDetails = (domain) => {
  selectedDomain.value = domain;
  showDetails.value = true;
};

const closeDetails = () => {
  showDetails.value = false;
  selectedDomain.value = null;
};

const editDomain = (domain) => {
  selectedDomain.value = { ...domain };
  editC.value = true;
};

onMounted(async () => {
  await gestionStore.loadDomainFromApi();
});

const destroy = async (domain) => {
  if (window.confirm("Confirmer la suppression de ce domaine")) {
    try {
      await gestionStore.deleteDomain(domain.id);
      await gestionStore.loadDomainFromApi();
      toast.success("Domaine supprimé avec succès !");
    } catch (error) {
      toast.error("Échec de la suppression du domaine. Veuillez réessayer.");
    }
  }
};

// Barre de recherche
const searchTerm = ref("");
const filteredDomains = computed(() => {
  return gestionStore.domains.filter((domain) =>
    [domain.name, domain.creatorName]
      .filter(Boolean)
      .some((field) =>
        field.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
  );
});
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
