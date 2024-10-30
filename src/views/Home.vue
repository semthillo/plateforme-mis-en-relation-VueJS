<template>
   <NavBar />

   <main class="container">
  
  <div class="headerr d-flex  mt-3 justify-content-between">
   <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg- border fixed" style="width: 280px; background: white; height: 70vh;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-4 text-black">Catégories</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active text-black"  aria-current="page">
          <i class="fa fa-wrench" aria-hidden="true"></i>

          Plomberie
        </a>
      </li>
      <li>
        <a href="#" class="nav-link  text-black " >
          <i class="fa fa-home" aria-hidden="true"></i>

          Immobilier
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-black" >
          <i class="fa fa-car" aria-hidden="true"></i>
          Voyage
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-black" >
          <i class="fa fa-book" aria-hidden="true"></i>
          Scolaire
        </a>
      </li>
      <li><a>
        <i class="fa fa-gift" aria-hidden="true"></i>
          
          Evenement
        </a>
      </li>
    </ul>
    <hr>
   
  </div>  
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://images.pexels.com/photos/19255319/pexels-photo-19255319/free-photo-of-voiture-technologie-reflet-capuche.jpeg?auto=compress&cs=tinysrgb&w=600" class="d-block w-100" alt="...">
    </div>
    
  </div>
  
</div>
  </div>
 
</main>
<Prestataire />
</template>
<script>





</script>
<style >
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
      .headerr{
        display: flex;
        gap: 15px;
      }
      #carouselExampleControls{
        width: 77%;
        height: 20vh;

      }
      #carouselExampleControls .carousel-item img{
        height: 70vh;
      }
</style>