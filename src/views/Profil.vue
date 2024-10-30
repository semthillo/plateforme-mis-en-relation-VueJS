<template>
    <div class="container mt-5 profile-page">
      <!-- Carte de profil -->
      <div class="card profile-card">
        <div class="card-header text-center">
          <img :src="photoUrl" alt="Photo de profil" class="profile-img rounded-circle" />
          <h2 class="mt-3">{{ name }}</h2>
          <h5 class="text-muted">{{ domaine }}</h5>
          <!-- Bouton pour ouvrir le modal -->
          <button class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#editProfileModal">Modifier le profil</button>
        </div>
        <div class="card-body">
          <p class="description">{{ description }}</p>
          <div class="contact-info mt-4">
            <p><i class="fas fa-phone-alt"></i> {{ telephone }}</p>
            <p><i class="fas fa-envelope"></i> {{ email }}</p>
            <div class="social-links mt-3">
              <a v-for="(url, icon) in socialLinks" :key="icon" :href="url" target="_blank" class="social-icon">
                <i :class="icon"></i>
              </a>
            </div>
          </div>
        </div>
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
                  <label for="socialLinks" class="form-label">Liens des réseaux sociaux</label>
                  <div v-for="(url, icon) in socialLinks" :key="icon" class="input-group mb-2">
                    <span class="input-group-text"><i :class="icon"></i></span>
                    <input type="url" :placeholder="icon" v-model="socialLinks[icon]" class="form-control" />
                  </div>
                </div>
                <button type="submit" class="btn btn-success w-100">Enregistrer</button>
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
  
  function saveProfile() {
    // Logique pour sauvegarder les données du profil
    console.log("Profil mis à jour :", {
      name: name.value,
      photoUrl: photoUrl.value,
      domaine: domaine.value,
      description: description.value,
      telephone: telephone.value,
      email: email.value,
      socialLinks: socialLinks.value
    });
  }
  </script>
  
  <style scoped>
  .profile-page {
    max-width: 900px;
    margin: auto;
  }
  
  .profile-card {
    padding: 20px;
    border: none;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
    text-align: center;
  }
  
  .contact-info {
    text-align: center;
  }
  
  .contact-info p {
    margin: 5px 0;
  }
  
  .social-links {
    text-align: center;
  }
  
  .social-icon {
    font-size: 1.5rem;
    margin: 0 10px;
    color: #007bff;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .modal .input-group-text {
    background-color: #007bff;
    color: white;
  }
  
  .projects-section h3 {
    color: #007bff;
  }
  
  .project-card {
    border: none;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .project-card img {
    height: 200px;
    object-fit: cover;
  }
  </style>
  