<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter Un Service</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="grill">
              <div class="mb-3">
                <label for="name" class="form-label">Nom</label>
                <input type="text" class="form-control" id="name" v-model="newServe.name" required />
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
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              <button type="submit" class="btn btn-primary">Ajouter</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  import { ref, onMounted, watch } from "vue";
  import { useGestionStore } from "../../store/gestion";
  import { useToast } from "vue-toastification"
import Login from "../login/Login.vue";
  const store = useGestionStore();
  const router = useRouter();
  const toast = useToast();
  const errors = ref({});
const serverErrors = ref([]); 
watch(serverErrors, (newErrors) => {
  errors.value = {}; // Réinitialiser les erreurs
  newErrors.forEach((err) => {
    if (err.path === "name") {
      errors.value.name = err.msg;
    }
 
  });
});const user_id = ref(null);
  const domains = ref([]);
  const newServe = ref({
  name: "",
  domain_id: null,
  user_id: user_id.value,
});

  const emit = defineEmits(["close"]);
  function closeModal() {
    emit("close");
  }
  
  onMounted(async () => {
  user_id.value = parseInt(router.currentRoute.value.params.id);
  newServe.value.user_id = user_id.value;

  try {
    domains.value = await store.loadDomainFromApi(); // Charger les domaines depuis l'API
  } catch (error) {
    toast.error("Erreur lors du chargement des domaines");
    console.error("Erreur lors du chargement des domaines :", error);
  }
});

onMounted(() => {
 
  user_id.value = parseInt(router.currentRoute.value.params.id);
});

function resetForm() {
  newServe.value = {
    name: "",
    domain_id: null,
    user_id: user_id.value,
  };
}

console.log(newServe.value);

  
  const onSubmit = async () => {
  try {
    
      await store.addService(newServe.value);
      console.log("Données envoyées :", newServe.value);

      toast.success("Service ajouté avec succès");
    
    resetForm();
    closeModal();
    
  } catch (error) {
    if (error.response && error.response.data.errors) {
      // Remplir les erreurs serveur
      serverErrors.value = error.response.data.errors;
    } else {
    toast.error("Erreur lors de l'ajout  du service");
    console.error("Erreur de soumission :", error);
    }
  }
};


  
  onMounted(() => {
    store.loadServiceFromApi();
  });
  
  
</script>
  
  <style scoped>
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
  