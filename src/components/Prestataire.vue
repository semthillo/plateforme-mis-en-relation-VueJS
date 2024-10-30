<template>
    <div class="container mt-5">
        <div class="titre">
            <h3><span>Nos</span> Prestataires</h3> 
        </div>  
        <div class="container px-4 py-5" id="featured-3">
            <div class="card-grid">
                <div class="feature">
                    <div class="card-horizontal d-flex align-items-center p-3">
                        <img src="https://via.placeholder.com/150" class="img-thumbnail rounded" alt="Photo du prestataire">
                        <div class="card-body">
                            <h5 class="card-title">Nom du Prestataire</h5>
                            <p class="card-text"><strong>Nom d'entreprise:</strong> Entreprise Exemple</p>
                            <p class="card-text"><strong>Adresse:</strong> 123 Rue Exemple, Ville</p>
                            <p class="card-text"><strong>Disponibilité:</strong> Disponible</p>
                            <p class="card-text"><strong>Domaine:</strong> Plomberie</p>
                            <a href="#" class="btn btn-primary mt-3">Voir le profil</a>
                        </div>
                    </div>
                </div>
                <div class="feature">
                    <div class="card-horizontal d-flex align-items-center p-3">
                        <img src="https://via.placeholder.com/150" class="img-thumbnail rounded" alt="Photo du prestataire">
                        <div class="card-body">
                            <h5 class="card-title">Nom du Prestataire</h5>
                            <p class="card-text"><strong>Nom d'entreprise:</strong> Entreprise Exemple</p>
                            <p class="card-text"><strong>Adresse:</strong> 123 Rue Exemple, Ville</p>
                            <p class="card-text"><strong>Disponibilité:</strong> Disponible</p>
                            <p class="card-text"><strong>Domaine:</strong> Plomberie</p>
                            <a href="#" class="btn btn-primary mt-3">Voir le profil</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script setup>
// Ajoutez votre script ici si nécessaire
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
