<template>
  
  <div class="">
    <NavBar />
      <div v-if="user" class="container mt-5 profile-page">
    <img src="../assets/pexels-codioful-7134986.jpg" alt="" class="cover-image" />

    <div class="profile-header text-center mb-4">
      <div class="user-info">
        <h2 class="name">{{ user.name }}</h2>
        <p class="text-muted"><span v-for="(item, index) in user.domains" :key="index">
          {{ item.domain.name }} |
          </span>
</p>
        <p class="availability">Disponibilité: {{ user.availability }}</p>
        <div class="contact-info text-center mb-4">
          <p><i class="fas fa-phone-alt"></i> {{ user.telephone }} <br> <i class="fas fa-envelope"></i> {{ user.email }}</p>
          <div class="social-links">
            <ul v-if="socialLinks && socialLinks.length">
              <li v-for="link in socialLinks" :key="link.id">
                <a :href="link.url" target="_blank">{{ link.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="edit-buttons text-center">
        <button class="btn btn-primary btn-lg" @click="openModalEdiProfil(user)">Modifier Mon Profil</button>
        
      </div>
    </div>

    <div class="section description-section text-center mb-4">
      <h3 class="section-title">Description</h3>
      <p class="description-text">{{ user.description }}</p>
    </div>

    <div class="section services-section text-center mb-4">
      <h3 class="section-title">Services Proposés</h3>
      <div class="d-flex justify-content-center flex-wrap">
        <span v-for="(service, index) in user.services" :key="index" class="badge service-badge">{{ service.name }}</span>
      </div>
    </div>
    
    <h3 class="section-title text-center mb-4">Catalogues / Projets Réalisés</h3>
    
  <div class="container">
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div 
      class="col"
      v-for="(project, index) in projects"
      :key="index"
    >
      <div class="card shadow-lg rounded-4 border-0 mb-4">
        <img 
      :src="project.images[0] ? `http://localhost:3005/uploads/${project.images[0].name}` : 'https://images.pexels.com/photos/6120207/pexels-photo-6120207.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'" 
      class="card-img-top rounded-top-4" 
      alt="Image du projet"
      style="height: 200px; width: 90%; object-fit: cover;"
    >
        <div class="card-body text-start">
          <h5 class="card-title fw-bold text-primary">{{ project.title }}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item desc-description border-0 text-start">
  {{ project.description.length > 30 ? project.description.slice(0, 30) + '...' : project.description }}
</li>

          <li class="list-group-item border-0 text-start">Entreprise: <span class="fw-semibold">{{ project.companyName }}</span></li>
          <li class="list-group-item border-0 text-muted text-start">
            <small>
              <i class="fa fa-calendar"></i> De {{ formatDate(project.startDate) }} à {{ formatDate(project.endDate) }}
            </small>
          </li>
        </ul>
        <div class="card-body d-flex justify-content-between">
         
          <button 
            type="button" 
            class="btn btn-outline-secondary rounded-pill px-3"
            title="Modifier"
            @click="viewDetails(project)">
            <i class="fa fa-eye" aria-hidden="true"></i>
          </button>
          <button 
            type="button" 
            class="btn btn-outline-danger rounded-pill px-3"
            title="Supprimer"
            @click="destroy(project)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

 <!-- Modal d'édition -->
 <div v-if="modalProfilEdit" class="modal-overlay">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Modifier le profil utilisateur</h5>
    </div>
    <div class="modal-body">
      <form @submit.prevent="onSubmit">
        <!-- Champs de formulaire -->
        <div class="mb-3">
          <label for="name" class="form-label">Nom</label>
          <input type="text" class="form-control" id="name" v-model="editedUser.name" required />
          <small class="text-danger">{{ errors.name }}</small>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="editedUser.email" required />
          <small class="text-danger">{{ errors.email }}</small>
        </div>
        <div class="mb-3">
              <label for="password" class="form-label">Mot de passe</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="editedUser.password"
                required
              />
              <small class="text-danger">{{ errors.password }}</small>
            </div>
        <div class="mb-3">
          <label for="address" class="form-label">Adresse</label>
          <input type="text" class="form-control" id="address" v-model="editedUser.address" required />
          <small class="text-danger">{{ errors.address }}</small>
        </div>

        <div class="mb-3">
          <label for="profil" class="form-label">Photo De Profil</label>
          <input type="file" class="form-control" id="profil" @change="handleFileUpload" />
        </div>

        <!-- Liens sociaux dynamiques -->
        <div class="mb-3">
          <label class="form-label">Liens Sociaux</label>
          <div v-for="(link, index) in socialLinks" :key="index" class="link-input">
            <input type="text" v-model="link.url" placeholder="URL" class="form-control mb-2" />
            <select v-model="link.type" class="form-control mb-2">
              <option value="">Choisir un type</option>
              <option value="facebook">Facebook</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
            <button type="button" @click="removeSocialLink(index)" class="btn btn-danger btn-sm">
              Supprimer
            </button>
          </div>
          <button type="button" @click="addSocialLink" class="btn btn-secondary mt-2">Ajouter un lien</button>
        </div>
        <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        Sélectionnez des Services
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <div v-for="item in services" :key="item.id">
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
        <!-- Boutons d'action -->
        <div class="modal-footer mt-5">
          <button type="button" class="btn btn-secondary" @click="closeEditModalProfil()">Fermer</button>
          <button type="submit" class="btn btn-primary">Modifier</button>
        </div>
      </form>
    </div>
  </div>
</div>


</div>


  

  </div>

 





<!-- ajouterr un projett -->




  





<div v-if="showDetails" class="modal show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedProject.title }}</h5>
          <button type="button" class="btn-close" @click="closeDetails"></button>
        </div>
        <div class="modal-body">
          <p>{{ selectedProject.description }}</p>
          <small>
            <strong>Date Début:</strong> {{ formatDate(selectedProject.startDate) }} à 
            <strong>Date Fin:</strong> {{ formatDate(selectedProject.endDate) }}
          </small>

          <!-- Affichage des images du projet -->
          <div v-if="selectedProject.images && selectedProject.images.length > 0">
            <div class="d-flex flex-wrap">
              <img 
                v-for="(image, index) in selectedProject.images" 
                :key="index"
                :src="`http://localhost:3005/uploads/${image.name}`" 
                alt="Image du projet" 
                class="img-thumbnail m-2" 
                style="height: 150px; width: auto; object-fit: cover; cursor: pointer;"
                @click="showImageFullScreen(image.name)"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeDetails">Fermer</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal pour afficher l'image en plein écran -->
  <div v-if="fullScreenImage" class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.8);">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-transparent border-0">
        <img 
          :src="`http://localhost:3005/uploads/${fullScreenImage}`" 
          alt="Image en plein écran" 
          class="img-fluid rounded"
          style="max-height: 100vh; object-fit: contain;"
        />
        <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3" @click="closeFullScreenImage">X</button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useRoute } from 'vue-router';
import { useGestionStore } from '../store/gestion';
import { onMounted, ref, computed, watch } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { Dropdown } from "bootstrap";
const showDetails = ref(false);
const toast = useToast();
const route = useRoute();
const gestionStore = useGestionStore();
const showDomainModal = ref(false);
const user = ref(null);
const newAdm = ref({});
const errors = ref({});
const modalProfilEdit = ref(false)
const profil = ref("");
const selectedServices = ref([]);
const serverErrors = ref([]); 
watch(serverErrors, (newErrors) => {
  errors.value = {}; // Réinitialiser les erreurs
  newErrors.forEach((err) => {
    if (err.path === "name") {
      errors.value.name = err.msg;
    }
    if (err.path === "email") {
      errors.value.email = err.msg;
      if (err.path === "password") {
      errors.value.password = err.msg;
    }
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
    if (err.path === "title") {
      errors.value.title = err.msg;
    }
    if (err.path === "startDate") {
      errors.value.startDate = err.msg;
    }
    if (err.path === "endDate") {
      errors.value.endDate = err.msg;
    }
    if (err.path === "companyName") {
      errors.value.companyName = err.msg;
    }
  });
});
const newProject = ref({
  title: '',
  description: '',
  companyName: '',
  startDate: '',
  endDateDate: '',
  user_id: null,
  domain_id: null
});
onMounted(() => {
  // Activer les dropdowns manuellement
  const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
  dropdownElementList.forEach((dropdownToggleEl) => {
    new Dropdown(dropdownToggleEl);
  });
});

function openModalEdiProfil(user){
  editedUser.value = { ...user }
  modalProfilEdit.value = true
}

function closeEditModalProfil(){
  modalProfilEdit.value = false
}
const viewDetails = (project) => {
  selectedProject.value = project;
  showDetails.value = true;
};
const selectedProject = ref(null);

const closeDetails = () => {
  showDetails.value = false;
 
};
const isModalOpen = ref(false);
const isProjectModalOpen = ref(false);

onMounted(async () => {
  const userId = parseInt(route.params.id);
  user.value = await gestionStore.getUserById(userId);
  
  // Vérifie que `user.value` a des projets avant d'appeler setUser
  if (user.value) {
    gestionStore.setUser(user.value);
    newAdm.value = { ...user.value };
    newProject.value.user_id = userId;
     // Assigne user_id pour le nouveau projet
  }
});
console.log(parseInt(route.params.id));
const projects = ref([])


  async function getProjet(){
   projects.value = await gestionStore.getProjectByUserId(parseInt(route.params.id)); 
  }
   
onMounted(async () => {
  await getProjet()
})

function formatDate(date) {
      if (!date) return ''; // Vérifie si la date est valide
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('fr-FR', options).format(new Date(date));
    }
  
const services = ref([])

async function  getServices() {
  services.value = await gestionStore.loadServiceFromApi()
}
    onMounted(async () => {
  await getServices()
})

console.log(projects);

const resetForm = () => {
  newProject.value = {
    title: "",
    description: "",
    companyName: "",
    startDate: "",
    endDate: "",
    user_id: null,
    domain_id: null,
  };
  files.value = [];
};
// Prépare les données pour l'édition
const editedUser = ref({ ...user });
const socialLinks = ref([{ url: "", type: "" }]);
watch(user, (newUser) => {
  editedUser.value = { ...newUser };
  selectedServices.value 
  socialLinks.value = newUser.socialLinks && Array.isArray(newUser.socialLinks) ? newUser.socialLinks : [{ url: "", type: "" }];
  profil.value = newUser.profil || "";
});


// Fonctions pour ajouter et supprimer des liens sociaux
function addSocialLink() {
  socialLinks.value.push({ url: "", type: "" });
}



function handleFileUpload(event) {
  profil.value = event.target.files[0];
  console.log(profil.value); // Pour vérifier que le fichier est bien sélectionné
}

const files = ref([]);

const handleFileChange = (event) => {
  files.value = Array.from(event.target.files); // Récupère les fichiers sélectionnés
};
function removeSocialLink(index) {
  socialLinks.value.splice(index, 1);
}

//   id: null,
//   name: "",
//   email: "",
//   address: "",
//   telephone: "",
//   companyName: "",
//   availability: "",
// });

// const editedUser = ref({
//   name: "",
//   email: "",
//   address: "",
//   telephone: "",
//   availability: "",
//   description: "",
//   profil: "",
// });
const isEditModalOpen = ref(false);
const currentProject = ref({
  id: null,
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  companyName: "",
  user_id: parseInt(route.params.id),
  domain_id: null,
});
function resetEditForm (){
  currentProject.value = {
  id: null,
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  companyName: "",
  user_id: parseInt(route.params.id),
  domain_id: null,
};
}


function openEditProjectModal(project) {
  currentProject.value = { ...project }; // Clone les données pour éviter de modifier directement
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
}


const onSubmit = async () => {
  try {
    // Préparer le formulaire pour l'upload de fichier
    const formData = new FormData();
    formData.append("upload", profil.value);

    // Étape 1 : Upload de l'image
    const uploadResponse = await axios.post(
      `http://localhost:3005/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (uploadResponse.data.success) {
      // Étape 2 : Préparer les données utilisateur avec l'image uploadée
      const updatedUserData = {
        ...editedUser.value,
        profil: uploadResponse.data.imageUrl, 
        ...selectedServices.value,// URL de l'image
        socialLinks: socialLinks.value.map(link => ({ ...link })),
      };

      // Étape 3 : Mettre à jour les données utilisateur
      await gestionStore.updateUser(editedUser.value.id, updatedUserData);

      // Étape 4 : Notification et réinitialisation du formulaire
      toast.success("Profil modifié avec succès !");
      resetForm();
      closeEditModalProfil();
    }
  } catch (error) {
    console.error("Erreur lors de la modification du prestataire :", error);

    // Gestion des erreurs côté serveur
    if (error.response) {
      console.log(error.response.data); // Affiche les détails de l'erreur
      if (error.response.data.errors) {
        serverErrors.value = error.response.data.errors;
      }
    }

    toast.error("Erreur lors de la modification du prestataire. Veuillez vérifier les données.");
  }
};



const fullScreenImage = ref(null); 



function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function openProjectModal() {
  isProjectModalOpen.value = true;
}

function closeProjectModal() {
  isProjectModalOpen.value = false;
}


  console.log(newProject.value.domain_id); // Vérifie que domainId est bien défini





const showImageFullScreen = (imageName) => {
  fullScreenImage.value = imageName;
};

const closeFullScreenImage = () => {
  fullScreenImage.value = null;
};

// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString("fr-FR");
// };
const destroy = async (project) => {
  if (window.confirm("Confirmer la suppression de ce projecte")) {
    await gestionStore.deleteProject(project.id);
    await gestionStore.loadProjectFromApi();
  }
};




</script>

<style>
  .desc-description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Pour une seule ligne */
    /* white-space: normal; 
    line-clamp: 2;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical; 
    */ 
}
</style>

<style scoped>
 .nav-link.active {
    background-color: #007bff; /* Couleur de fond pour le domaine sélectionné */
    color: white;
  }
.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
/* Scoped CSS optimisé */
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
  padding: 1.5rem;
  max-width: 600px;
  width: 100%;
}
.profile-header,
.section {
  margin-bottom: 1.5rem;
}
.project-card {
  max-width: 300px;
  margin: 0 auto;
}
.service-badge {
  margin: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
}
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
  .modal-body{
    max-height: 400px; 
  overflow-y: auto;
  }
  .modal-body form .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .modal-project form .grid-projet{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
.profile-page {
  background: white;
  border-radius: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  margin-top: 150px;
  margin: auto;

}

.cover-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

/* Profile header styles */
.profile-header {
  margin-top: -80px;
}

.profile-img {
  width: 180px;
  height: 180px;
  border: 5px solid #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-top: 10px;
}

.name {
  font-size: 1.8em;
  font-weight: bold;
  color: #343a40;
}

.availability {
  font-size: 0.9em;
  color: #6c757d;
}

/* Edit button styles */
.edit-buttons .btn {
  border-radius: 20px;
  font-weight: bold;
}

.edit-buttons .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.edit-buttons .btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

/* Section styles */
.section {
  background-color: #ffffff;
  border-radius: 15px;
  border : solid 1px #f3f3f3e1;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.5em;
  color: #495057;
  margin-bottom: 15px;
}

.description-text, .contact-info p {
  color: #6c757d;
}

/* Badge styles for services */
.service-badge {
  background-color: #007bff;
  color: white;
  border-radius: 15px;
  padding: 8px 12px;
  font-size: 0.9em;
  margin: 5px;
}

/* Project card styles */
.project-card {
  transition: transform 0.2s ease;
}

.project-card:hover {
  transform: scale(1.05);
}

.card-title {
  font-weight: bold;
  color: #007bff;
}

/* Social links */
.social-links a {
  color: #495057;
  font-size: 1.2em;
  margin: 0 8px;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #007bff;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .profile-page {
    padding: 15px;
  }

  .profile-img {
    width: 140px;
    height: 140px;
  }

  .edit-buttons {
    margin-top: 15px;
  }
}
@media (max-width: 992px) {
  .row{
    display: flex;
    grid-template-columns: repeat(1,fr);
  }
}
</style>
