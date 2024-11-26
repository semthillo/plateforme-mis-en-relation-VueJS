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
        <button class="btn btn-primary btn-lg" @click="openModal">Modifier Mon Profil</button>
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
        <span v-for="(service, index) in user.services" :key="index" class="badge service-badge">{{ service }}</span>
      </div>
    </div>
    
    <h3 class="section-title text-center mb-4">Projets Réalisés</h3>
    
  <div class="container">
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div 
      class="col"
      v-for="(project, index) in projects"
      :key="index"
    >
      <div class="card shadow-lg rounded-4 border-0 mb-4">
        <img 
          src="https://images.pexels.com/photos/6120207/pexels-photo-6120207.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
          class="card-img-top rounded-top-4" 
          alt="..."
          style="height: 200px; width: 90%; object-fit: cover;"
        >
        <div class="card-body text-start">
          <h5 class="card-title fw-bold text-primary">{{ project.title }}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item border-0 text-start">{{ project.description }}</li>
          <li class="list-group-item border-0 text-start">Entreprise: <span class="fw-semibold">{{ project.companyName }}</span></li>
          <li class="list-group-item border-0 text-muted text-start">
            <small>
              <i class="fa fa-calendar"></i> De {{ project.startDate }} à {{ project.endDate }}
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
 <div v-if="isEditModalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier le Projet</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeEditModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateProject">
            <div class="mb-3">
              <label for="editTitle" class="form-label">Titre</label>
              <input type="text" class="form-control" id="editTitle" v-model="currentProject.title" required />
            </div>
            <div class="mb-3">
              <label for="editStartDate" class="form-label">Date de Début</label>
              <input type="datetime-local" class="form-control" id="editStartDate" v-model="currentProject.startDate" required />
            </div>
            <div class="mb-3">
              <label for="editEndDate" class="form-label">Date de Fin</label>
              <input type="datetime-local" class="form-control" id="editEndDate" v-model="currentProject.endDate" required />
            </div>
            <div class="mb-3">
              <label for="editDescription" class="form-label">Description</label>
              <textarea class="form-control" id="editDescription" v-model="currentProject.description" rows="3" required></textarea>
            </div>
            <div class="mb-3">
              <label for="editCompanyName" class="form-label">Nom de l'Entreprise</label>
              <input type="text" class="form-control" id="editCompanyName" v-model="currentProject.companyName" required />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeEditModal">Fermer</button>
              <button type="submit" class="btn btn-primary">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>


  

  </div>
  <div v-if="isModalOpen" class="modal-overlay">
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
  </div>

 
  <div v-if="isProjectModalOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Ajouter un Projet</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="closeProjectModal"></button>
      </div>
      <div class="modal-body modal-project">
        <form @submit.prevent="onProjectSubmit">
          <div class="mb-3">
            <label for="projectTitle" class="form-label">Titre</label>
            <input type="text" class="form-control" id="projectTitle" v-model="newProject.title" required />
          </div>
          <div class="mb-3">
            <label for="projectDate" class="form-label">Date de Debut</label>
            <input type="datetime-local" class="form-control" id="projectDate" v-model="newProject.startDate" required />
          </div>
          <div class="mb-3">
            <label for="projectDate" class="form-label">Date de Fin</label>
            <input type="datetime-local" class="form-control" id="projectDate" v-model="newProject.endDate" required />
          </div>
          <div class="mb-3">
            <label for="projectDescription" class="form-label">Description</label>
            <textarea class="form-control" id="projectDescription" v-model="newProject.description" required></textarea>
          </div>
          <div class="mb-3">
            <label for="companyName" class="form-label">Nom de l'Entreprise</label>
            <input type="text" class="form-control" id="companyName" v-model="newProject.companyName" required />
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Images</label>
            <input type="text" class="form-control" id="image" v-model="newProject.companyName" required />
          </div>
          <div class="mb-3">
            <button type="button" class="btn btn-secondary" @click="showDomainModal = true">Sélectionner Domaines</button>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeProjectModal">Fermer</button>
            <button type="submit" class="btn btn-primary">Ajouter Projet</button>
          </div>
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
        <h5 class="modal-title">Détails du projet</h5>
        <button type="button" class="btn-close" @click="closeDetails"></button>
      </div>
      <div class="modal-body">
        <p> {{ selectedProject.title }}</p>
        <p>{{ selectedProject.description }}</p>
        <p><strong>Date Debut:</strong> {{ selectedProject.startDate }}</p>
        <p><strong>Date Fin:</strong> {{ selectedProject.endDate }}</p>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeDetails">Fermer</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useGestionStore } from '../store/gestion';
import { onMounted, ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
const showDetails = ref(false);
const toast = useToast();
const route = useRoute();
const gestionStore = useGestionStore();
const showDomainModal = ref(false);
const user = ref(null);
const newAdm = ref({});

const newProject = ref({
  title: '',
  date_heure: '',
  description: '',
  companyName: '',
  user_id: null,
  domain_id: null
});
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


console.log(projects);

function resetForm(){
  newProject.value = {
  title: '',
  date_heure: '',
  description: '',
  companyName: '',
  user_id: null,
  domain_id: null
};
}





const isEditModalOpen = ref(false);
const currentProject = ref({
  id: null,
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  companyName: "",
});


function openEditProjectModal(project) {
  currentProject.value = { ...project }; // Clone les données pour éviter de modifier directement
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
}

function updateProject() {
  const index = projects.value.findIndex((p) => p.id === currentProject.value.id);
  if (index !== -1) {
    projects.value[index] = { ...currentProject.value };
  }
  closeEditModal();
}




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

const onSubmit = async () => {
  try {
    await gestionStore.updateUser(user.value.id, newAdm.value);
    Object.assign(user.value, newAdm.value); // Met à jour les informations de l'utilisateur
    toast.success("Profil mis à jour avec succès");
    closeModal();
  } catch (error) {
    toast.error("Erreur lors de la mise à jour du profil");
    console.error(error);
  }
};


const onProjectSubmit = async () => {
  try {
    await gestionStore.addProject(newProject.value);
    toast.success("Projet ajouté avec succès");
    resetForm()
    getProjet()
    closeProjectModal();
  } catch (error) {
    toast.error("Erreur lors de l'ajout du projet");
    console.error(error);
  }
};

const destroy = async (project) => {
  if (window.confirm("Confirmer la suppression de ce projecte")) {
    await gestionStore.deleteProject(project.id);
    await gestionStore.loadProjectFromApi();
  }
};
</script>


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
  
  .modal-body form .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .modal-project form{
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
