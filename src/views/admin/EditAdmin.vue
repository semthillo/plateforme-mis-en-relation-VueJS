<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier Un Administrateur</h5>
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
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="address"
                v-model="newAdm.email"
                required
              ></input>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Mot de passe</label>
              <input
                type="text"
                class="form-control"
                id="address"
                v-model="newAdm.password"
                
              ></input>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Role</label>
              <input
                type="text"
                class="form-control"
                id="address"
                v-model="newAdm.role"
                disabled
              ></input>
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
            </div>
  
            </div>
           
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">
                Close
              </button>
              <button type="submit" class="btn btn-success">Metre à jour</button>
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

const toast = useToast();
const store = useGestionStore();
const router = useRouter();
const props = defineProps({ add: Boolean });
const emit = defineEmits(["close"]);

const newAdm = ref({ name: "", email: "", password: "", role: "admin", address: "", telephone: "" });

function closeModal() {
  emit("close");
}

const resetForm = () => {
  newAdm.value = { name: "", email: "", password: "", role: "admin", address: "", telephone: "" };
};

const onSubmit = async () => {
  try {
    console.log("Données envoyées :", newServe.value);  
    if (!newServe.value.id) {
      throw new Error("ID du service manquant.");
    }
    await store.updateService(newServe.value);
    toast.success("Service modifié avec succès");
    resetForm();
    closeModal();
    router.push({ name: "service" });
  } catch (error) {
    toast.error("Erreur lors de la mise à jour du service : " + error.message);
  }
};


const editadministra = (admin) => {
  newAdm.value = { ...admin };
};

onMounted(() => {
  if (store.currentIndex !== null) {
    const domain = store.domains[store.currentIndex];
    if (domain) {
      newDmn.value = { ...domain }; 
    }
  }
  store.loadDomainFromApi();
});


watch(() => store.currentIndex, (newIndex) => {
  if (newIndex !== null && newIndex >= 0 && newIndex < store.users.length) {
    editadministra(store.users[newIndex]);
  }
});
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
  