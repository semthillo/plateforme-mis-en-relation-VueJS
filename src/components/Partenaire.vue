<template>
    <section class="partners-section mt-5 py-5">
      <div class="container text-center">
        <div class="titre">
            <h3><span>Nos</span> Partenaires</h3> 
        </div> 
        
        <div class="row justify-content-center align-items-center mt-5">
          
         
          <div class="col-6 col-md-3 mb-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Moov_Mauritel_logo_%28French_version%29.svg" class="partner-logo" alt="...">
          </div>
          
          <div class="col-6 col-md-3 mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjFhCdNNIrF4GrTTJyB5Y1uBof5PSpci1JBA&s" class="partner-logo" alt="...">
          </div>
          
          <div class="col-6 col-md-3 mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs6K8impf0D7yc6bBSxPVkKuYHZS4lwEhg6Q&s" class="partner-logo" alt="...">
          </div>
          
          <div class="col-6 col-md-3 mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWFPpHUeU7CUhRXyjCKSlnnyRkOPOMd339A&s" class="partner-logo" alt="...">
          </div>
          
          
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  .partners-section {
    background-color: #f9f9f9;
  }
  
  .partners-section h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }
  
  .partner-logo {
    max-width: 100px;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    margin-left: 100%;
    
  }
  
  .partner-logo:hover {
    opacity: 1;
  }
  
  @media (min-width: 768px) {
    .partner-logo {
      max-width: 150px;
    }
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
  </style>
  