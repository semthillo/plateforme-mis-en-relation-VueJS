<template>
    <div class="container mt-5 profile-page">
      <!-- Header de profil avec photo et informations de base -->
      <div class="row">
        <div class="col-md-4 text-center">
          <img :src="photoUrl" alt="Photo de profil" class="profile-img rounded-circle" />
        </div>
        <div class="col-md-8">
          <h2 class="text-left">{{ name }}</h2>
          <p class="text-muted text-left">{{ domaine }}</p>
          <p class="description text-left">{{ description }}</p>
          <button class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#editProfileModal">Modifier le profil</button>
          <button class="btn btn-secondary mt-2" data-bs-toggle="modal" data-bs-target="#addProjectModal">Ajouter un nouveau projet</button>
        </div>
      </div>
  
      <!-- Contact et liens sociaux -->
      <div class="row mt-4">
        <div class="col-md-6 text-left">
          <p><i class="fas fa-phone-alt"></i> {{ telephone }}</p>
          <p><i class="fas fa-envelope"></i> {{ email }}</p>
        </div>
        <div class="col-md-6 text-left">
          <div class="social-links">
            <a v-for="(url, icon) in socialLinks" :key="icon" :href="url" target="_blank" class="social-icon">
              <i :class="icon"></i>
            </a>
          </div>
        </div>
      </div>
  
      <!-- Section Services -->
      <div class="services-section mt-5">
        <h3>Services proposés</h3>
        <ul class="list-group">
          <li v-for="(service, index) in services" :key="index" class="list-group-item">
            {{ service }}
          </li>
        </ul>
      </div>
  
      <!-- Modal pour modification du profil -->
      <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editProfileModalLabel">Modifier le profil</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="saveProfile">
                <div class="grid-form">
                  <div class="mb-3">
                    <label for="name" class="form-label">Nom</label>
                    <input type="text" id="name" v-model="name" class="form-control" required />
                  </div>
                  <div class="mb-3">
                    <label for="photoUrl" class="form-label">URL de la photo de profil</label>
                    <input type="text" id="photoUrl" v-model="photoUrl" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label for="domaine" class="form-label">Domaine</label>
                    <input type="text" id="domaine" v-model="domaine" class="form-control" required />
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea id="description" v-model="description" class="form-control" rows="3" required></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="telephone" class="form-label">Téléphone</label>
                    <input type="text" id="telephone" v-model="telephone" class="form-control" required />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" v-model="email" class="form-control" required />
                  </div>
                  <div class="mb-3">
                    <label for="services" class="form-label">Services proposés</label>
                    <input type="text" v-model="newService" class="form-control mb-2" placeholder="Ajouter un service" />
                    <button type="button" class="btn btn-secondary w-100 mb-2" @click="addService">Ajouter un service</button>
                  </div>
                </div>
                <button type="submit" class="btn btn-success w-100">Enregistrer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal pour ajouter un nouveau projet -->
      <div class="modal fade" id="addProjectModal" tabindex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addProjectModalLabel">Ajouter un nouveau projet</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addProject">
                <div class="mb-3">
                  <label for="projectTitle" class="form-label">Titre du projet</label>
                  <input type="text" id="projectTitle" v-model="newProject.title" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="projectDescription" class="form-label">Description du projet</label>
                  <textarea id="projectDescription" v-model="newProject.description" class="form-control" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                  <label for="companyName" class="form-label">Nom de l'entreprise</label>
                  <input type="text" id="companyName" v-model="newProject.companyName" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="projectDate" class="form-label">Date</label>
                  <input type="date" id="projectDate" v-model="newProject.date" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-success w-100">Ajouter le projet</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const name = ref("John Doe");
  const photoUrl = ref("https://via.placeholder.com/150");
  const description = ref("Je suis un professionnel expérimenté dans le domaine de la conception web et du développement d'applications.");
  const domaine = ref("Développeur Web");
  const telephone = ref("123-456-7890");
  const email = ref("johndoe@example.com");
  
  const socialLinks = ref({
    'fab fa-facebook-f': "https://facebook.com",
    'fab fa-twitter': "https://twitter.com",
    'fab fa-linkedin-in': "https://linkedin.com",
    'fab fa-instagram': "https://instagram.com"
  });
  
  const services = ref(["Développement de sites web", "Consultation technique"]);
  const newService = ref("");
  
  const projects = ref([]);
  const newProject = ref({
    title: "",
    description: "",
    companyName: "",
    date: ""
  });
  
  function addService() {
    if (newService.value) {
      services.value.push(newService.value);
      newService.value = "";
    }
  }
  
  function addProject() {
    if (newProject.value.title && newProject.value.description && newProject.value.companyName && newProject.value.date) {
      projects.value.push({ ...newProject.value });
      newProject.value = { title: "", description: "", companyName: "", date: "" };
      // Ferme le modal après ajout
      const modalElement = document.getElementById('addProjectModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }
  
  function saveProfile() {
    console.log("Profil mis à jour :", {
      name: name.value,
      photoUrl: photoUrl.value,
      domaine: domaine.value,
      description: description.value,
      telephone: telephone.value,
      email: email.value,
      socialLinks: socialLinks.value,
      services: services.value,
      projects: projects.value
    });
  }
  </script>
  
  <style scoped>
  .profile-page {
    max-width: 900px;
    margin: auto;
  }
  
  .profile-img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 3px solid #007bff;
  }
  
  .card-header {
    background: none;
    padding: 0;
  }
  
  .description {
    font-size: 1.1rem;
    color: #555;
  }
  
  .social-links {
    display: flex;
    gap: 10px;
  }
  
  .social-icon {
    font-size: 1.5rem;
    color: #007bff;
  }
  </style>
  