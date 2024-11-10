<template>
  <NavBar />
  <div v-if="user" class="container mt-5 profile-page">
    <img src="../assets/pexels-goumbik-628241.jpg" alt="" class="cover-image" />
    
    <div class="profile-header text-center mb-4">
      <img :src="user.profil || 'https://via.placeholder.com/150'" alt="Photo de profil" class="profile-img rounded-circle mb-3" />
      
      <div class="user-info">
        <h2 class="name">{{ user.name }}</h2>
        <p class="text-muted">{{ user.domain }}</p>
        <p class="availability">Disponibilité: {{ user.availability }}</p>
        <div class="contact-info text-center mb-4">
          <p><i class="fas fa-phone-alt"></i> {{ user.telephone }} <br> <i class="fas fa-envelope"></i> {{ user.email }}</p>
          <div class="social-links">
            <a v-for="(url, icon) in socialLinks" :key="icon" :href="url" target="_blank" class="social-icon mx-2">
              <i :class="icon"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="edit-buttons text-center">
        <button class="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#editProfileModal" @click="EditProfile()">Modifier le profil</button>
        <button class="btn btn-secondary mx-2" data-bs-toggle="modal" data-bs-target="#addProjectModal">Ajouter un projet</button>
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

    <div class="section projects-section mt-5">
      <h3 class="section-title text-center mb-4">Projets Réalisés</h3>
      <div class="row">
        <div class="col-md-4" v-for="(project, index) in user.projects" :key="index">
          <div class="card project-card shadow-sm mb-4">
            <div class="card-body">
              <h5 class="card-title">{{ project.title }}</h5>
              <p class="card-text">{{ project.description }}</p>
              <p><strong>Entreprise :</strong> {{ project.companyName }}</p>
              <p><strong>Date :</strong> {{ project.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <EditProfil v-if="editC" @close="editC = false"/>
</template>

<script setup>

import { useRoute } from 'vue-router';
import { useGestionStore } from '../store/gestion';
import { onMounted, ref } from 'vue';
import EditProfil from './EditProfil.vue';


const route = useRoute();
const gestionStore = useGestionStore();

const user = ref(null);

onMounted(async () => {
  const userId = route.params.id;
  user.value = await gestionStore.getUserById(userId);
  gestionStore.setUser(user.value); // Mise à jour de l'utilisateur dans le store
});

const editC = ref(false)
  function EditProfile() {
    editC.value = true
  }
</script>

<style scoped>
/* Background and layout styles */
.profile-page {
  background: white;
  border-radius: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.cover-image {
  width: 100%;
  height: 250px;
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
