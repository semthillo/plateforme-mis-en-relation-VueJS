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
              <small class="text-danger">{{ errors.name }}</small>
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
              <small class="text-danger">{{ errors.email }}</small>
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
              <small class="text-danger">{{ errors.password }}</small>
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
              <small class="text-danger">{{ errors.address }}</small>
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


              <small class="text-danger">{{ errors.telephone }}</small>
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
              <small class="text-danger">{{ errors.availability }}</small>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                v-model="newAdm.description"
              ></textarea>
              <small class="text-danger">{{ errors.description }}</small>
            </div>
            <div class="mb-3">
              <label for="profil" class="form-label">Photo De Profil</label>
              <input
                type="file"
                class="form-control"
                id="profil"
                @change="handleFileUpload"
              />

            </div>

            <!-- Boutons pour ouvrir les modals -->
             <div class="mb-3">
             <!-- <button
                type="button"
                class="btn btn-secondary"
                @click="showDomainModal = true"
              >
                Sélectionner Domaines
              </button> -->
              <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        Sélectionnez des Services
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <div v-for="item in store.services" :key="item.id">
            <input
              type="checkbox"
              :id="'service-' + item.id"
              :value="item.id"
              v-model="selectedServices"
            />
            <label :for="'service-' + item.id">{{ item.name }}</label>
          </div>
        </li>
      </ul>
    </div>
            </div>
          </div>

          <!-- Liens Sociaux dynamiques -->
          <div class="mb-3">
            <label class="form-label">Liens Sociaux</label>
            <div
              v-for="(link, index) in socialLinks"
              :key="index"
              class="link-input"
            >
              <input
                type="text"
                v-model="link.url"
                placeholder="URL"
                class="form-control mb-2"
              />
              <select v-model="link.type" class="form-control mb-2">
                <option value="">Choisir un type</option>
                <option value="facebook">Facebook</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="snapchat">Snapchat</option>
                <option value="tiktok">TikTok</option>
                <option value="discord">Discord</option>
                <option value="telegram">Telegram</option>
              </select>
              <button
                type="button"
                @click="removeSocialLink(index)"
                class="btn btn-danger btn-sm"
              >
                Supprimer
              </button>
            </div>
            <button
              type="button"
              @click="addSocialLink"
              class="btn btn-secondary mt-2"
            >
              Ajouter un lien
            </button>
          </div>

          <div class="modal-footer mt-5">
            <button type="button" class="btn btn-secondary " @click="closeModal">
              Fermer
            </button>
            <button type="submit" class="btn btn-primary">Ajouter</button>
          </div>
        </form>
      </div>
    


      <div class="modal-content">
        <!-- <div class="modal-header">
          <h5 class="modal-title">Sélectionner Services</h5>
          <button
            type="button"
            class="btn-close"
            @click="showServiceModal = false"
          ></button>
        </div> -->
        <!-- <div class="modal-body">
          <div v-for="item in store.services" :key="item.id">
            <input
              type="checkbox"
              :id="'service-' + item.id"
              :value="item.name"
              v-model="selectedServices"
            />
            <label :for="'service-' + item.id">{{ item.name }}</label>
          </div>
        </div> -->
        <!-- <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="showServiceModal = false"
          >
            OK
          </button>
        </div> -->
      </div>
    </div> 
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useGestionStore } from "../../store/gestion";
import { useToast } from "vue-toastification";
import axios from "axios";
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
const store = useGestionStore();
const router = useRouter();
const toast = useToast();

const emit = defineEmits(["close", "adminAdded"]);
function closeModal() {
  emit("close");
}




const selectedServices = ref([]);
const profil = ref("");

import { Dropdown } from "bootstrap";

onMounted(() => {
  // Activer les dropdowns manuellement
  const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
  dropdownElementList.forEach((dropdownToggleEl) => {
    new Dropdown(dropdownToggleEl);
  });
});
function handleFileUpload(event) {
  profil.value = event.target.files[0];
}
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

const socialLinks = ref([{ url: "", type: "" }]);
console.log( selectedServices);

const onSubmit = async () => {
  try {
    // Crée un FormData pour envoyer l'image et les autres données
    const formData = new FormData();
    formData.append("name", newAdm.value.name);
    formData.append("email", newAdm.value.email);
    formData.append("password", newAdm.value.password);
    formData.append("address", newAdm.value.address);
    formData.append("telephone", newAdm.value.telephone);
    formData.append("availability", newAdm.value.availability);
    formData.append("description", newAdm.value.description);
    formData.append("upload", profil.value); // Remplacez "profil" par "upload"
    // Envoi de l'image
  
    
    formData.append("services", JSON.stringify(selectedServices.value)); // Services
    formData.append("socialLinks", JSON.stringify(socialLinks.value)); // Social Links

    // Envoi des données via axios
    console.log(profil.value); // Vérifie si un fichier est bien sélectionné

    const response = await axios.post(
      "http://localhost:3005/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    // Traite la réponse du backend
    if (response.data.success) {
      // Ajout du fichier photo dans les données utilisateur
      newAdm.value.profil = response.data.imageUrl; // Tu peux utiliser le nom du fichier retourné
      console.log(newAdm.value);
      
      const userData = {
      ...newAdm.value,
      
      services: selectedServices.value,  // Utilisation des IDs de services sélectionnés
      socialLinks: socialLinks.value.map(link => ({ ...link })),
    };

    console.log("User Data to be sent:", userData); 

    await store.addUser(userData);
    emit("adminAdded");

      toast.success("Prestataire ajouté avec succès");
      resetForm();
      closeModal();
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du prestataire :", error);
    if (error.response && error.response.data.errors) {
      // Remplir les erreurs serveur
      serverErrors.value = error.response.data.errors;
    } else {
    toast.error(
      "Erreur lors de l'ajout du prestataire. Veuillez vérifier les données."
    );
    }
  }
};

function addSocialLink() {
  socialLinks.value.push({ url: "", type: "" });
}

function removeSocialLink(index) {
  socialLinks.value.splice(index, 1);
}

onMounted(() => {
  store.loadDataFromApi();
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

  selectedServices.value = [];
  socialLinks.value = [{ url: "", type: "" }];
}
</script>

<style scoped>

/* Ajoute ici tes styles personnalisés */
</style>

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
  z-index: 1050;
}

.modal-content {
  background-color: #fff;
  padding: 0;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh; /* Limite la hauteur à 90% de l'écran */
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.modal-body {
  padding: 20px;
  overflow-y: auto; /* Permet le défilement à l'intérieur de la zone de contenu */
  flex-grow: 1;
}

.modal-footer {
  padding: 10px 20px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  position: sticky;
  bottom: 0;
  background-color: #fff;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.link-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.link-input .form-control {
  flex: 1;
}
</style>
