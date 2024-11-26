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
              <input type="text" class="form-control" id="name" v-model="newAdm.name" required />
              <small class="text-danger">{{ errors.name }}</small>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="newAdm.email" required />
              <small class="text-danger">{{ errors.email }}</small>
            </div>
            
            <div class="mb-3">
              <label for="role" class="form-label">Role</label>
              <input type="text" class="form-control" id="role" v-model="newAdm.role" disabled />
              <small class="text-danger">{{ errors.role }}</small>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Adresse</label>
              <input type="text" class="form-control" id="address" v-model="newAdm.address" required />
              <small class="text-danger">{{ errors.address }}</small>
            </div>
            <div class="mb-3">
              <label for="telephone" class="form-label">Téléphone</label>
              <input type="text" class="form-control" id="telephone" v-model="newAdm.telephone" required />
              <small class="text-danger">{{ errors.telephone }}</small>
            </div>
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
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import { useGestionStore } from "../../store/gestion";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = useGestionStore();
const emit = defineEmits(["close", "adminAdded"]);
const props = defineProps({ admin: Object });
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
    
    if (err.path === "role") {
      errors.value.role = err.msg;
    }
    if (err.path === "telephone") {
      errors.value.telephone = err.msg;
    }
    if (err.path === "address") {
      errors.value.address = err.msg;
    }
   
  });
});
const newAdm = ref({
  name: "",
  email: "",
  role: "admin",
  address: "",
  telephone: "",
});

watch(
  () => props.admin,
  (newAdmin) => {
    if (newAdmin) {
      // Affecter les valeurs directement pour préserver la réactivité
      newAdm.value.id = newAdmin.id;
      newAdm.value.name = newAdmin.name;
      newAdm.value.email = newAdmin.email;
      newAdm.value.address = newAdmin.address;
      newAdm.value.telephone = newAdmin.telephone;
      newAdm.value.role = newAdmin.role; // Ne change pas le rôle car il est désactivé
    }
  },
  { immediate: true }
);




const closeModal = () => {
  emit("close");
};

const resetForm = () => {
  newAdm.value = {
    name: "",
    email: "",
    role: "admin",
    address: "",
    telephone: "",
  };
  errors.value = {}; // Réinitialiser les erreurs
};

console.log(newAdm.value);
console.log("ID Administrateur : ", newAdm.value.id);


const onSubmit = async () => {
  try {
    console.log("ID Administrateur : ", newAdm.value.id);
    console.log("Données à soumettre : ", newAdm.value);

    await store.updateUser(newAdm.value.id, {
      name: newAdm.value.name,
      email: newAdm.value.email,
      address: newAdm.value.address,
      telephone: newAdm.value.telephone,
      role: newAdm.value.role,
    });

    toast.success("Administrateur modifié avec succès");
    resetForm();
    closeModal();
    emit("adminAdded");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      serverErrors.value = error.response.data.errors;
    }
    toast.error("Erreur lors de la mise à jour de l'administrateur : " + error.message);
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
  gap: 10px;
}

.modal-footer {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}
</style>
