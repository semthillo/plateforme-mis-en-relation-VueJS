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
        <button class="btn btn-secondary mx-2" @click="openProjectModal">Ajouter un projet</button>
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
            class="btn btn-outline-primary rounded-pill px-3"
            title="Modifier"
            @click="openEditProjectModal(project)" >
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
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
  <!-- <div v-if="isModalOpen" class="modal-overlay">
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
              <input type="text" class="form-control" id="profil" v-model="newAdm.profil"  />
            </div>
          
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fermer</button>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>
        </form>
        
      </div>
    </div>
  </div> -->

  <div v-if="isEditModalOpen" class="modal-overlay">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Modifier Un Projet</h5>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="closeEditModal"
      ></button>
    </div>
    <div class="modal-body">
      <form @submit.prevent="onEditProjectSubmit">
          <div class="grid-projet">
             <div class="mb-3">
            <label for="projectTitle" class="form-label">Titre</label>
            <input type="text" class="form-control" id="projectTitle" v-model="currentProject.title" required />
            <small class="text-danger">{{ errors.title }}</small>
          </div>
          
          <div class="mb-3">
            <label for="projectDate" class="form-label">Date de Debut</label>
            <input type="datetime-local" class="form-control" id="projectDate" v-model="currentProject.startDate" required />
            <small class="text-danger">{{ errors.startDate }}</small>
          </div>
          <div class="mb-3">
            <label for="endDate" class="form-label">Date de Fin</label>
            <input type="datetime-local" class="form-control" id="endDate" v-model="currentProject.endDate" />
            <small class="text-danger">{{ errors.endDate }}</small>
          </div>
          <div class="mb-3">
            <label for="projectCompany" class="form-label">Entreprise</label>
            <input type="text" class="form-control" id="projectCompany" v-model="currentProject.companyName" required />
            <small class="text-danger">{{ errors.companyName }}</small>
          </div>
          <div class="mb-3">
  <label for="projectImages" class="form-label">Images du Projet</label>
  <input
    type="file"
    class="form-control"
    id="projectImages"
    multiple
    @change="handleFileChange"
  />
</div>

          
          </div>
        
          <div class="mb-3">
            <label for="projectDesc" class="form-label">Description</label>
            <textarea type="text" class="form-control" id="projectDesc" v-model="currentProject.description" required maxlength="500" >
              <small class="text-danger">{{ errors.description }}</small>
            </textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Enregistrer le projet</button>
        </form>
    </div>
  </div>
</div>





<!-- ajouterr un projett -->



<div v-if="isProjectModalOpen" class="modal-overlay mt-5">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Ajouter un Projet</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="closeProjectModal"></button>
      </div>
      <div class="modal-body modal-project">
        <form @submit.prevent="onProjectSubmit">
          <div class="grid-projet">
             <div class="mb-3">
            <label for="projectTitle" class="form-label">Titre</label>
            <input type="text" class="form-control" id="projectTitle" v-model="newProject.title" required />
            <small class="text-danger">{{ errors.title }}</small>
          </div>
          
          <div class="mb-3">
            <label for="projectDate" class="form-label">Date de Debut</label>
            <input type="datetime-local" class="form-control" id="projectDate" v-model="newProject.startDate" required />
            <small class="text-danger">{{ errors.startDate }}</small>
          </div>
          <div class="mb-3">
            <label for="endDate" class="form-label">Date de Fin</label>
            <input type="datetime-local" class="form-control" id="endDate" v-model="newProject.endDate" />
            <small class="text-danger">{{ errors.endDate }}</small>
          </div>
          <div class="mb-3">
            <label for="projectCompany" class="form-label">Entreprise</label>
            <input type="text" class="form-control" id="projectCompany" v-model="newProject.companyName" required />
            <small class="text-danger">{{ errors.companyName }}</small>
          </div>
          <div class="mb-3">
  <label for="projectImages" class="form-label">Images du Projet</label>
  <input
    type="file"
    class="form-control"
    id="projectImages"
    multiple
    @change="handleFileChange"
  />
</div>

          <div class="mb-3">
            <button type="button" class=" btn btn-secondary form-control" @click="showDomainModal = true" >Selectionner un domaine</button>
          </div> 
          </div>
        
          <div class="mb-3">
            <label for="projectDesc" class="form-label">Description</label>
            <textarea type="text" class="form-control" id="projectDesc" v-model="newProject.description" required maxlength="500" >
              <small class="text-danger">{{ errors.description }}</small>
            </textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Créer le projet</button>
        </form>
      </div>
    </div>
  </div>
  
  <div v-if="showDomainModal" class="modal-overlay">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Sélectionner Domaines</h5>
      <button type="button" class="btn-close" @click="showDomainModal = false"></button>
    </div>
    <div class="modal-body">
      <div v-for="item in user.domains" :key="item.domain.id">
        <input
          type="radio"
          :id="'domain-' + item.domain.id"
          :value="item.domain.id"
          v-model="newProject.domain_id"
        />
        <label :for="'domain-' + item.domain.id">{{ item.domain.name }}</label>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click="showDomainModal = false">OK</button>
    </div>
  </div>
</div>




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
// const currentProfile = ref({
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

// const updateProfile = async () => {
//   try {
//     // Créer un FormData pour envoyer les données modifiées au serveur
//     const formData = new FormData();
//     formData.append("name", currentProfile.value.name);
//     formData.append("email", currentProfile.value.email);
//     formData.append("address", currentProfile.value.address);
//     formData.append("telephone", currentProfile.value.telephone);
//     formData.append("availability", currentProfile.value.availability);
//     formData.append("description", currentProfile.value.description);

//     // Ajouter la photo de profil si elle est changée
//     if (profileImage.value) {
//       formData.append("profil", profileImage.value);
//     }

//     // Ajouter les liens sociaux
//     currentProfile.value.socialLinks.forEach((link, index) => {
//       formData.append(`socialLinks[${index}].url`, link.url);
//       formData.append(`socialLinks[${index}].type`, link.type);
//     });

//     // Appel à la fonction du store pour modifier le profil
//     await userStore.updateProfile(formData);
//     toast.success("Profil modifié avec succès");
//     closeModal();
//   } catch (error) {
//     if (error.response && error.response.data.errors) {
//       // Afficher les erreurs serveur si elles existent
//       serverErrors.value = error.response.data.errors;
//     } else {
//       toast.error("Erreur lors de la modification du profil");
//       console.error(error);
//     }
//   }
// };

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
        profil: uploadResponse.data.imageUrl, // URL de l'image
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

// const onSubmit = async () => {
//  try {
//   const formData = new FormData();
//     formData.append("name", newAdm.value.name);
//     formData.append("email", newAdm.value.email);
//     formData.append("password", newAdm.value.password);
//     formData.append("address", newAdm.value.address);
//     formData.append("telephone", newAdm.value.telephone);
//     formData.append("availability", newAdm.value.availability);
//     formData.append("description", newAdm.value.description);
//     formData.append("upload", profil.value);

//     formData.append("socialLinks", JSON.stringify(socialLinks.value));

//     const response = await axios.post(
//       "http://localhost:3005/api/upload",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     if (response.data.success) {
//       // Ajout du fichier photo dans les données utilisateur
//       newAdm.value.profil = response.data.imageUrl; // Tu peux utiliser le nom du fichier retourné
//       console.log(newAdm.value);
      
//       const userData = {
//       ...newAdm.value,
//       socialLinks: socialLinks.value.map(link => ({ ...link })),
//     };
//     console.log("User Data to be sent:", userData); 

//     await gestionStore.updateUser(userData);
//      toast.success("Profil mis à jour avec succès");
//     closeModal();
//   } 
  
// }catch (error) {
//     toast.error("Erreur lors de la mise à jour du profil");
//     console.error(error);
//   }
// };


  //
  //   await gestionStore.updateUser(user.value.id, newAdm.value);
  //   Object.assign(user.value, newAdm.value); // Met à jour les informations de l'utilisateur
  //  

  console.log(newProject.value.domain_id); // Vérifie que domainId est bien défini



  const onProjectSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("title", newProject.value.title);
    formData.append("description", newProject.value.description);
    formData.append("companyName", newProject.value.companyName);
    formData.append("startDate", newProject.value.startDate);
    formData.append("endDate", newProject.value.endDate);
    formData.append("user_id", newProject.value.user_id);
    formData.append("domain_id", newProject.value.domain_id);

    // Ajouter les images
    files.value.forEach((file) => {
      formData.append("images", file); // Correspond au champ attendu par le backend
    });

    // Appeler le store pour envoyer les données
    await gestionStore.addProject(formData);
    toast.success("Projet ajouté avec succès");
    resetForm();
    getProjet();
    closeProjectModal();
  } catch (error) {
    if (error.response && error.response.data.errors) {
      // Remplir les erreurs serveur
      serverErrors.value = error.response.data.errors;
    } else {
    toast.error("Erreur lors de l'ajout du projet");
    console.error(error);
  }
}
};

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

const onEditProjectSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("title", currentProject.value.title || "");
    formData.append("description", currentProject.value.description || "");
    formData.append("companyName", currentProject.value.companyName || "");
    formData.append("startDate", currentProject.value.startDate || "");
    formData.append("endDate", currentProject.value.endDate || "");
    formData.append("user_id", currentProject.value.user_id || "");
    formData.append("domain_id", currentProject.value.domain_id || "");

    // Ajouter les images (seulement si elles ont changé)
    files.value.forEach((file) => {
      formData.append("images", file);
    });

    // Appeler le store avec l'ID du projet et les données du formulaire
    await gestionStore.updateProject(currentProject.value.id, formData);
    toast.success("Projet modifié avec succee !")
    resetEditForm();
    getProjet(); // Recharge les projets affichés
    closeEditModal();
  } catch (error) {
    if (error.response && error.response.data.errors) {
      // Remplir les erreurs spécifiques renvoyées par le serveur
      serverErrors.value = error.response.data.errors;
    } else {
      toast.error("Erreur lors de la modification du projet");
      console.error(error);
    }
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
</style>
