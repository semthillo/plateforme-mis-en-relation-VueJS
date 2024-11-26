<template>
  <div class="modal fade" id="addProjectModal" tabindex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addProjectModalLabel">Ajouter un projet</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="title" class="form-label">Titre</label>
              <input type="text" v-model="formData.title" class="form-control" id="title" required />
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea v-model="formData.description" class="form-control" id="description" required></textarea>
            </div>

            <div class="mb-3">
              <label for="images" class="form-label">Images</label>
              <input type="file" @change="handleFileUpload" class="form-control" id="images" multiple />
            </div>

            <div v-if="uploadedImages.length" class="mb-3">
              <h5>Images téléchargées :</h5>
              <div class="row">
                <div v-for="(image, index) in uploadedImages" :key="index" class="col-3">
                  <img :src="image.url" alt="Uploaded image" class="img-fluid" />
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Ajouter le projet</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        title: '',
        description: '',
        images: []
      },
      uploadedImages: [] // Images affichées après l'upload
    };
  },
  methods: {
    handleFileUpload(event) {
      // Préparer les fichiers à envoyer
      const files = event.target.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('upload', files[i]);
      }

      // Envoyer les fichiers au backend
      axios.post('http://localhost:3005/api/upload', formData)
        .then(response => {
          // Ajouter l'URL de l'image dans le tableau des images téléchargées
          if (response.data.success) {
            this.uploadedImages.push({ url: response.data.imageUrl });
            this.formData.images.push(response.data.name); // Ajouter le nom de l'image à l'objet formData pour l'envoi au backend
          }
        })
        .catch(error => {
          console.error('Upload failed:', error);
        });
    },

    submitForm() {
      const projectData = {
        ...this.formData,
        // Ajouter d'autres données comme les dates et l'ID utilisateur
      };

      // Envoi des données du projet au backend
      axios.post('http://localhost:3005/api/projects', projectData)
        .then(response => {
          console.log('Project added:', response.data);
          this.resetForm();
        })
        .catch(error => {
          console.error('Failed to add project:', error);
        });
    },

    resetForm() {
      this.formData = { title: '', description: '', images: [] };
      this.uploadedImages = [];
    }
  }
};
</script>
  
  <style scoped>
  .modal-lg {
    max-width: 800px;
  }
  </style>
  