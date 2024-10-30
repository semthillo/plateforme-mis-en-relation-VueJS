<template lang="">
    <nav class="navbar navbar-expand-lg navbar-light border" style="background-color: white;">
  <div class="container">
    <a class="navbar-brand" href="#">One<span style="font-size:25px; color:azure;">Click</span>Service</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-sm-end" id="navbarSupportedContent">
      <ul class="navbar-nav me-5 mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Accueil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">A propos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Services</a>
        </li>
        
      
      </ul>
      <router-link class="btn btn-outline-primary me-3" type="submit" to="/login">Se Connecter</<router-link ></router-link>
      <!-- <form class="d-flex me-3">
        <input class="form-control me-2" type="search" placeholder="Recherche par domaine, lieu..." aria-label="Search">
        <button class="btn btn-outline-primary" type="submit">Recherche</button>
      </form> -->
      <div class="">
        <select class="form-select" aria-label="Default select example">
 
  <option value="1">FR</option>
  <option value="2">EN</option>
  <option value="3">AR</option>
</select>
    </div>
    </div>
  </div>
</nav>
</template>
<script setup>

</script>
<style scoped>
  
</style>