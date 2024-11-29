<template>
  <div class="container-fluid">
    <div class="register-container">
      <h2>Recupération de mot de passe</h2>
      <form @submit.prevent="handleForgotPassword">
        
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <button type="submit">Recevoir un mail</button>
        <router-link class="annuler " to="/login">Annuler</router-link>
      </form>
    </div>
  </div>
    
  </template>
  
  <script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const email = ref("")
const message = ref("")
const toast = useToast()

  async function handleForgotPassword() {
  try {
    const response = await axios.post(
      "http://localhost:3005/api/request-reset-password",
      { email: email.value }
    );
    message.value = response.data.message || "Lien de réinitialisation envoyé.";
    toast.success("Lien de réinitialisation envoyé ! \n Verifiez votre boite mail");
    router.push("/");
  } catch (error) {
    message.value = error.response.data.message || "Erreur lors de l'envoi.";
    toast.error(message.value);
  }
  console.log("Valeur de l'email :", email.value);
}
  </script>
  
  <style scoped>
  .container-fluid{
  /* background-image: url(../../assets/pexels-codioful-7134986.jpg); */
  width: 100%;
  height: 100vh;
  margin: 0;
  padding-top: 130px;
  filter: blur(100);
}
  .register-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  h2 {
    text-align: center;
    font-size: 1.2rem;
  }
  .annuler{
    text-align: center;
    margin-left: 40%;
    margin-top: 50px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #218838;
  }
  p {
    text-align: center;
    margin-top: 10px;
  }
  a {
    color: #007bff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  </style>
  