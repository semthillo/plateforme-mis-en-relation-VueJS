<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modifier Un Domaine</h5>
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
                v-model="newDmn.name"
                required
              />
              <small  class="text-danger">{{ errors.name }}</small>

            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Fermer
            </button>
            <button type="submit" class="btn btn-success">Mettre à jour</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from "vue";
import { useGestionStore } from "../../store/gestion";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const emit = defineEmits(["close"]);
const toast = useToast();
const store = useGestionStore();
const router = useRouter();
const errors = ref({});
const serverErrors = ref([]); 
watch(serverErrors, (newErrors) => {
  errors.value = {}; // Réinitialiser les erreurs
  newErrors.forEach((err) => {
    if (err.path === "name") {
      errors.value.name = err.msg;
    }
 
  });
});
const props = defineProps({ domain: Object });
// Domaine à modifier
const newDmn = ref({
  name: ""
 
});
watch(
  () => props.domain,
  (newdomain) => {
    if (newdomain) {
      newDmn.value = { ...newdomain };
    }
  },
  { immediate: true }
);

// Fonction pour fermer le modal
const closeModal = () => {
  emit("close");
};

// Fonction de réinitialisation du formulaire
const resetForm = () => {
  newDmn.value = { name: "" };
};

// Fonction pour soumettre les modifications
const onSubmit = async () => {
  try {
  
    await store.updateDomain(newDmn.value.id, newDmn.value);
    toast.success("Domaine modifié avec succès");
    resetForm();
    store.domains
    closeModal();
    
  } catch (error) {
    if (error.response && error.response.data.errors) {
      // Remplir les erreurs serveur
      serverErrors.value = error.response.data.errors;
    } else {
    toast.error("Erreur lors de la mise à jour du domaine : " );
  }
}
};


</script>

<style scoped>
#carouselExampleControls .carousel-item img {
  height: 100vh;
}
.carousel-item img {
  height: 200px;
}
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

.btn-close {
  background: white;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.modal-body {
  padding: 1rem 0;
}

.modal-body form .grill {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}
</style>
