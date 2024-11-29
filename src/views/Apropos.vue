<template>
    <div class="container">
      
    <NavBar />
  
    <div class="about-us py-5">
      <div class="container">
        <!-- Titre de la page -->
        <div class="text-center mb-4">
          <div class="titre fw-bold">
            <h3><span>A </span>propos de nous</h3> 
        </div>
          <p class="lead " >
            Découvrez comment notre plateforme simplifie l'accès aux services locaux et aide les prestataires à se connecter avec des clients potentiels de manière rapide et efficace.
          </p>
        </div>
        <div class="titre">
            <h3><span>Notre </span> mission</h3> 
        </div>
        <!-- Section de présentation -->
        <div class="row  container align-items-center">
          <div class=" lead shadow-none w-100">
            
            <p>
              Dans un monde de plus en plus connecté, nous avons créé cette plateforme pour rendre l'accès aux services locaux plus simple, rapide et fiable. Notre objectif est de faciliter la recherche de prestataires qualifiés et d'offrir une expérience utilisateur fluide pour les clients qui cherchent des services près de chez eux.
            </p>
            <p>
              Nous croyons en un avenir où les prestataires de services, qu'ils soient plombiers, agences de voyages, ou sociétés de location, peuvent facilement se faire connaître et se connecter avec les bons clients. Notre plateforme est dédiée à rendre cette connexion plus directe, fiable et transparente.
            </p>
          </div>
          <div class="">
            <img src="https://media.istockphoto.com/id/1082424324/fr/photo/concept-demploi-de-main-doeuvre-espace-copie.jpg?b=1&s=612x612&w=0&k=20&c=zAq6bDBSIv5Est5l7xrkvah6Z1akeLBmhMT0666HRLE=" alt="Notre équipe" class="img-fluid rounded shadow-lg" />
          </div>
        </div>
  
        <!-- Section de valeurs -->
        <div class="my-5">
          <div class="titre">
            <h3><span>Nos</span> Valeurs</h3> 
        </div>
          <ul class="lead ">
            <li><strong>Fiabilité :</strong> Nous nous assurons que tous nos prestataires sont vérifiés pour garantir une qualité de service irréprochable.</li>
            <li><strong>Accessibilité :</strong> Notre plateforme est simple à utiliser, avec une interface claire et intuitive.</li>
            <li><strong>Engagement :</strong> Nous sommes passionnés par le service local et nous nous engageons à rendre chaque interaction aussi fluide que possible.</li>
          </ul>
        </div>
  
        <!-- Section Contact & Réseaux Sociaux -->
        <div class="text-center">
          <div class="titre">
            <h3><span>Nos </span>reseaux sociaux</h3> 
        </div>
          <div class="social-icons">
            <a href="https://facebook.com" target="_blank" class="btn btn-outline-primary m-2">
              <i class="fab fa-facebook-f"></i>  Facebook
            </a>
            <a href="https://twitter.com" target="_blank" class="btn btn-outline-info m-2">
              <i class="fab fa-twitter"></i>Twitter
            </a>
            <a href="https://instagram.com" target="_blank" class="btn btn-outline-danger m-2">
              <i class="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" class="btn btn-outline-dark m-2">
              <i class="fab fa-linkedin-in"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>
        </div>

    </div>
    <Footer/>
  </template>
  
  <script setup>
  // No need for extra logic for this static page
  </script>
  
  <style scoped>
  /* Container pour le logo */
  .container {
    margin-top: 20px;
    padding: 0;
  }
  .lead{
    width: 60%;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: auto;
    border-radius: 30px;
  }

  
 
 
  .titre {
    text-align: center;
    margin: 0 auto;
    width: 80%;
    color: rgb(4, 150, 235);
    
}
.titre h3 span {
    color: rgb(125, 192, 250);
    
}
  /* Styles de la page à propos de nous */
  .about-us {
    background-color: #f8f9fa;
    font-family: Arial, sans-serif;
  }
  
  .about-us h1,
  .about-us h2,
  .about-us h3 {
    color: #007bff;
  }
  
  .about-us p {
    font-size: 1.1rem;
    color: #0e0d0d;
  }
  
  .about-us h2 {
    color: #007bff; /* Couleur bleue pour les titres */
  }
  
  .about-us ul li {
    font-size: 1.1rem;
    color: #555;
  }
  
  .social-icons .btn {
    font-size: 1.2rem;
    padding: 0.75rem 1.5rem;
    border-radius: 30px; /* Pour arrondir les coins des boutons */
  }
  
  .social-icons .btn:hover {
    background-color: #007bff;
    color: white;
  }
  
  .social-icons i {
    margin-right: 8px;
  }
  .titre {
    text-align: center;
    margin: 0 auto;
    width: 80%;
    color: rgb(4, 150, 235);
    font-size: 2rem;
    margin-top: 70px;
}
.titre h3 span {
    color: rgb(125, 192, 250);
}
  /* Image */
  .about-us .img-fluid {
    max-height: 300px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .about-us .row {
    margin-top: 30px;
    margin-left: 40px;
  }
  @media (max-width: 992px) {
    .about-us .row {
    margin-top: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column-reverse;
  }
  .about-us .row img {
    margin-top: auto;
    margin-left: 15px;
    
  }
  .lead{
    width: 80%;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: auto;
    border-radius: 30px;
  }
  .social-icons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  }
  /* Section réseaux sociaux */
  .social-icons a {
    text-decoration: none;
  }
  </style>
  