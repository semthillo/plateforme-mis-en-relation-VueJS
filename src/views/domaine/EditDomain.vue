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

const newDmn = ref({ name: "",  });

function closeModal() {
  emit("close");
}

const resetForm = () => {
  newDmn.value = { name: ""};
};

const onSubmit = async () => {
  try {
    if (!newDmn.value.id) {
      throw new Error("ID du domaine manquant.");
    }
    await store.updateDomain(newDmn.value);
    toast.success("Domaine modifié avec succès");
    resetForm();
    closeModal();
    router.push({ name: "domaine" });
  } catch (error) {
    toast.error("Erreur lors de la mise à jour du domaine : " + error.message);
  }
};

const editDomain = (domain) => {
  newDmn.value = { ...domain };
};

onMounted(() => {
  if (store.currentIndex !== null && store.currentIndex >= 0 && store.currentIndex < store.domains.length) {
    editDomain(store.domains[store.currentIndex]);
  }
});

watch(() => store.currentIndex, (newIndex) => {
  if (newIndex !== null && newIndex >= 0 && newIndex < store.domains.length) {
    editDomain(store.domains[newIndex]);
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
  