<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Ajouter Un Prestataire</h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent="onSubmit">
          <div class="grill">
            <!-- Champs du prestataire -->
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
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="newAdm.email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mot de passe</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="newAdm.password"
                required
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Adresse</label>
              <input
                type="text"
                class="form-control"
                id="address"
                v-model="newAdm.address"
                required
              />
            </div>
            <div class="mb-3">
              <label for="telephone" class="form-label">Téléphone</label>
              <input
                type="text"
                class="form-control"
                id="telephone"
                v-model="newAdm.telephone"
                required
              />
            </div>
            <div class="mb-3">
              <label for="availability" class="form-label">Disponibilité</label>
              <input
                type="text"
                class="form-control"
                id="availability"
                v-model="newAdm.availability"
                required
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                v-model="newAdm.description"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="profil" class="form-label">Photo De Profil</label>
              <input
                type="text"
                class="form-control"
                id="profil"
                v-model="newAdm.profil"
                required
              />
            </div>

            <!-- Domaine et Service -->
            <div class="mb-3">
              <label for="domain" class="form-label">Domaine</label>
              <select v-model="selectedDomain" class="form-select">
                <option
                  v-for="item in store.domains"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="service" class="form-label">Service</label>
              <select v-model="selectedService" class="form-select">
                <option
                  v-for="item in store.services"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>

            
          </div>
<!-- Lien sociaux dynamiques -->
            <div class="mb-3">
              <label class="form-label">Liens Sociaux</label>
              <div v-for="(link, index) in socialLinks" :key="index" class="link-input">
                <input
                  type="text"
                  v-model="link.url"
                  placeholder="URL"
                  class="form-control mb-2"
                />
                <input
                  type="text"
                  v-model="link.type"
                  placeholder="Type (LinkedIn, GitHub, etc.)"
                  class="form-control mb-2"
                />
                <button
                  type="button"
                  @click="removeSocialLink(index)"
                  class="btn btn-danger btn-sm"
                >
                  Supprimer
                </button>
              </div>
              <button type="button" @click="addSocialLink" class="btn btn-secondary mt-2">
                Ajouter un lien
              </button>
            </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Fermer
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
import { ref, onMounted } from "vue";
import { useGestionStore } from "../../store/gestion";
import { useToast } from "vue-toastification";

const store = useGestionStore();
const router = useRouter();
const toast = useToast();

const emit = defineEmits(["close", "onSuccess"]);
function closeModal() {
  emit("close");
}

const selectedDomain = ref("");
const selectedService = ref("");

const newAdm = ref({
  name: "",
  email: "",
  password: "",
  role: "prestataire",
  address: "",
  availability: "",
  description: "",
  telephone: "",
  profil: "",
});

const socialLinks = ref([
  { url: "", type: "" }
]);

const onSubmit = async () => {
  try {
    const userData = {
      ...newAdm.value,
      domains: selectedDomain.value
        ? { connect: [{ id: selectedDomain.value }] }
        : undefined,
      services: selectedService.value
        ? { connect: [{ id: selectedService.value }] }
        : undefined,
      socialLinks: socialLinks.value.map(link => ({
        url: link.url,
        type: link.type,
      })),
    };

    await store.addUser(userData);
    resetForm();
    toast.success("Prestataire ajouté avec succès");
    
    closeModal();
    emit("onSuccess");
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
  }
};

function addSocialLink() {
  socialLinks.value.push({ url: "", type: "" });
}

function removeSocialLink(index) {
  socialLinks.value.splice(index, 1);
}

onMounted(() => {
  store.loadDomainFromApi();
  store.loadServiceFromApi();
});

function resetForm() {
  newAdm.value = {
    name: "",
    email: "",
    password: "",
    role: "prestataire",
    address: "",
    availability: "",
    description: "",
    telephone: "",
    profil: "",
  };
  socialLinks.value = [{ url: "", type: "" }];
  selectedDomain.value = "";
  selectedService.value = "";
}
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
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
}

.modal-footer {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}

.link-input {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
