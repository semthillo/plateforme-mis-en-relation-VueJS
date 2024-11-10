<template>
    <div class="container mt-5">
        <div class="titre">
            <h3><span>Nos</span> Prestataires</h3> 
        </div>  
      
        <div class="container px-4 py-5" id="featured-3">
            <div class="card-grid">
                <div v-for="user in prestataires" :key="user.id" class="feature">
                    <div class="card-horizontal d-flex align-items-center p-3">
                        <img :src="user.profil || 'https://via.placeholder.com/150'" class="img-thumbnail rounded" alt="Photo du prestataire">
                        <div class="card-body">
                            <h5 class="card-title">{{ user.name }}</h5>
                            
                            <p class="card-text"><strong>Adresse:</strong> {{ user.address }}</p>
                            <p class="card-text"><strong>Disponibilité:</strong> {{ user.availability || 'Non spécifiée' }}</p>
                            <p class="card-text"><strong>Domaine:</strong> {{ user.domain || 'Plomberie' }}</p>
                            <router-link class="btn btn-primary mt-3" :to="`/PrestaProfile/${user.id}`">
                                Voir le profil
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useGestionStore } from '../store/gestion';

const gestionStore = useGestionStore();

onMounted(async () => {
    await gestionStore.loadDataFromApi();
});

// Filtrer pour n'afficher que les utilisateurs ayant le rôle "prestataire"
const prestataires = computed(() => gestionStore.users.filter(user => user.role === "prestataire"));
</script>

<style scoped>
.titre {
    text-align: center;
    margin: 0 auto;
    width: 80%;
    color: rgb(4, 150, 235);
}
.titre h3 span {
    color: rgb(125, 192, 250);
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.feature .card-horizontal {
    display: flex;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    transition: transform 0.3s ease;
    border-radius: 8px;
}
.feature .card-horizontal:hover {
    transform: translateY(-5px);
}
.img-thumbnail {
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin-right: 20px;
}
.card-body {
    flex: 1;
    text-align: left;
}
.card-title {
    font-size: 1.4rem;
    color: rgb(4, 150, 235);
    font-weight: bold;
}
.card-text {
    font-size: 0.9rem;
    color: #555;
    margin: 0;
}
.btn-primary {
    background-color: rgb(4, 150, 235);
    border: none;
}
.btn-primary:hover {
    background-color: rgb(3, 130, 205);
}
@media (max-width: 768px) {
    .card-horizontal {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .img-thumbnail {
        margin: 0 0 15px 0;
    }
    .card-body {
        text-align: center;
    }
}
</style>
