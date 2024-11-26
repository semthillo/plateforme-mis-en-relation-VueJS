<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Ajouter Un Administrateur</h5>
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
              v-model="newAdm.name"
              required
            />
            <small class="text-danger">{{ errors.name }}</small>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="newAdm.email"
              required
            />
            <small class="text-danger">{{ errors.email }}</small>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Mot de passe</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="newAdm.password"
              required
            >
            <small class="text-danger">{{ errors.password }}</small>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Role</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="newAdm.role"
              disabled
            >
            <small class="text-danger">{{ errors.role }}</small>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="newAdm.address"
              required
            />
            <small class="text-danger">{{ errors.address }}</small>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Téléphone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
             v-model="newAdm.telephone"
              required
            />
            <small class="text-danger">{{ errors.telephone }}</small>
          </div>

          </div>
         
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import { useGestionStore } from "../../store/gestion";
import { useToast } from "vue-toastification";

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
    if (err.path === "email") {
      errors.value.email = err.msg;
    }
    if (err.path === "password") {
      errors.value.password = err.msg;
    }
    if (err.path === "role") {
      errors.value.role = err.msg;
    }
    if (err.path === "telephone") {
      errors.value.telephone = err.msg;
    }
    if (err.path === "address") {
      errors.value.address = err.msg;
    }
    if (err.path === "availability") {
      errors.value.availability = err.msg;
    }
    if (err.path === "description") {
      errors.value.description = err.msg;
    }
  });
});
const props = defineProps({
  add: Boolean,
});

const emit = defineEmits(["close", "adminAdded"]);
function closeModal() {
  emit("close");
}

const newAdm = ref({ name: "", email: "", password: "", role: "admin", address: "", telephone: "" });

const resetForm = () => {
  newAdm.value = { name: "", email: "", password: "", role: "admin", address: "", telephone: "" };
};

const onSubmit = async () => {
  console.log("Données envoyées :", newAdm.value);
  try {
    await store.addUser(newAdm.value);   // Ajouter l'utilisateur via le store
    toast.success("Admin ajouté avec succès");
    resetForm();
    closeModal();
    emit("adminAdded"); // Émettre l'événement pour indiquer l'ajout
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error.response || error);
  // Si la structure des erreurs est différente, ajustez ici
  if (error.response && error.response.data.errors) {
    serverErrors.value = error.response.data.errors;
  }
  toast.error("Erreur de l'ajout de l'admin")
}
};


onMounted(() => {
  store.fetchAdmins()
})
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

.modal-body form .grill{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  column-gap: 10px;
}

.modal-footer {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}
</style>
