<template>
    <footer class="footer-section bg-dark text-white mt-5 py-5">
      <div class="container">
        <div class="row">
          
          
          <div class="col-md-4 mb-4">
            <h5 class="footer-title">À propos de nous</h5>
            <p>
              Nous offrons une large gamme de services pour simplifier votre vie.
              Notre mission est de vous fournir des prestations de qualité, en toute
              confiance, où que vous soyez.
            </p>
          </div>
  
          
          <div class="col-md-4 mb-4">
            <h5 class="footer-title">Liens utiles</h5>
            <ul class="list-unstyled">
              <li><router-link to="/" class="footer-link">Accueil</router-link></li>
              <li><router-link to="/service" class="footer-link">Nos Services</router-link></li>
              <li><router-link to="/apropos" class="footer-link">À propos</router-link></li>
              
            </ul>
          </div>
  
          
          <div class="col-md-4 mb-4">
            <h5 class="footer-title">Suivez-nous</h5>
            <div class="social-icons d-flex">
              <a href="#" class="footer-icon me-3"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="footer-icon me-3"><i class="fab fa-twitter"></i></a>
              <a href="#" class="footer-icon me-3"><i class="fab fa-instagram"></i></a>
              <a href="#" class="footer-icon"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
  
        <hr class="footer-divider my-4" />
  
        <div class="text-center">
          <p class="mb-0">© 2024 SemThillo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer-section {
    background-color: #222;
    color: #ddd;
  }
  
  .footer-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .footer-link {
    color: #ddd;
    text-decoration: none;
  }
  
  .footer-link:hover {
    color: #fff;
    text-decoration: underline;
  }
  
  .social-icons .footer-icon {
    color: #ddd;
    font-size: 1.5rem;
  }
  
  .footer-icon:hover {
    color: #3498db;
  }
  
  .footer-divider {
    border-top: 1px solid #444;
  }
  </style>
  