<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modifier Mon Profil</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="onSubmit">
          <div class="grid">
            <div class="mb-3">
              <label for="name" class="form-label">Nom</label>
              <input type="text" class="form-control" id="name" v-model="newAdm.name" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="newAdm.email" required />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Adresse</label>
              <input type="text" class="form-control" id="address" v-model="newAdm.address" required />
            </div>
            <div class="mb-3">
              <label for="telephone" class="form-label">Téléphone</label>
              <input type="text" class="form-control" id="telephone" v-model="newAdm.telephone" required />
            </div>
            <div class="mb-3">
              <label for="availability" class="form-label">Disponibilité</label>
              <input type="text" class="form-control" id="availability" v-model="newAdm.availability" required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" v-model="newAdm.description" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label for="profil" class="form-label">Photo De Profil</label>
              <input type="text" class="form-control" id="profil" v-model="newAdm.profil" disabled />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fermer</button>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useGestionStore } from "../store/gestion";
import { useToast } from "vue-toastification";

const emit = defineEmits(["close"]);
const toast = useToast();
const store = useGestionStore();

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const newAdm = ref({
  name: "",
  email: "",
  address: "",
  telephone: "",
  availability: "",
  description: "",
  profil: ""
});

watch(() => props.user, (newUser) => {
  newAdm.value = { ...newUser };
});

function closeModal() {
  emit("close");
}

const onSubmit = async () => {
  try {
    await store.updateUser(props.user.id, newAdm.value);
    toast.success("Profil mis à jour avec succès");
    closeModal();
  } catch (error) {
    toast.error("Erreur lors de la mise à jour du profil");
  }
};
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
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  max-width: 600px;
  width: 100%;
  padding: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.modal-body form .grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.modal-footer {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .modal-body form .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
