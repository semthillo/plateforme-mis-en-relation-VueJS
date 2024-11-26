<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modifier Un Service</h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent="onSubmit">
          <div class="grill">
            <div class="mb-3">
              <label for="name" class="form-label">Nom</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="newServe.name"
                required
              />
              <small class="text-danger">{{ errors.name }}</small>
            </div>
          </div>
          <div class="mb-3">
            <label for="domain" class="form-label">Domaine</label>
            <select
              id="domain"
              class="form-control"
              v-model="newServe.domain_id"
              required
            >
              <option value="" disabled selected>Sélectionner un domaine</option>
              <option
                v-for="domain in domains"
                :key="domain.id"
                :value="domain.id"
              >
                {{ domain.name }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fermer</button>
            <button type="submit" class="btn btn-success">Mettre à jour</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";
import { useGestionStore } from "../../store/gestion";
import { useToast } from "vue-toastification";

const store = useGestionStore();
const toast = useToast();
const props = defineProps({
  service: Object // Service à modifier, passé en prop depuis la liste des services
});
const emit = defineEmits(["close"]);

const errors = ref({});
const serverErrors = ref([]);
const domains = ref([]);
const newServe = ref({
  name: "",
  domain_id: null,
});

watch(serverErrors, (newErrors) => {
  errors.value = {};
  newErrors.forEach((err) => {
    if (err.path === "name") {
      errors.value.name = err.msg;
    }
  });
});

watch(
  () => props.service,
  (newService) => {
    if (newService) {
      newServe.value = { ...newService }; // Charger les données du service à modifier
    }
  },
  { immediate: true }
);

onMounted(async () => {
  try {
    domains.value = await store.loadDomainFromApi(); // Charger les domaines
  } catch (error) {
    toast.error("Erreur lors du chargement des domaines");
    console.error("Erreur lors du chargement des domaines :", error);
  }
});

function closeModal() {
  emit("close"); // Fermer le modal
}

const onSubmit = async () => {
  try {
    await store.updateService(newServe.value); // Mettre à jour le service
    toast.success("Service modifié avec succès");
    closeModal(); // Fermer le modal après la mise à jour
  } catch (error) {
    if (error.response && error.response.data.errors) {
      serverErrors.value = error.response.data.errors; // Gérer les erreurs serveur
    } else {
      toast.error("Erreur lors de la mise à jour du service");
      console.error(error);
    }
  }
};
</script>

<style scoped>
/* Styles inchangés */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  max-width: 600px;
  width: 100%;
  padding: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.modal-body form .grill {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
}

.modal-footer {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}
</style>
