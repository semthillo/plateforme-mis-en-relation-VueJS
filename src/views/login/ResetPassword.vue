<template>
  <div class="register-container">
    <h2>Recupération de mot de passe</h2>
    <form @submit.prevent="handleResetPassword">
      
      <div class="form-group">
        <label for="pass">Nouveau Mot De Passe :</label>
        <input type="password" id="pass" v-model="newPassword" required />
      </div>
      <div class="form-group">
        <label for="passwrd">Confirmer le Mot De Passe :</label>
        <input type="password" id="passwrd" v-model="confirmPassword" required />
      </div>
      <button type="submit">Enregistrer</button>
      <router-link class="annuler " to="/login">Annuler</router-link>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification";

const newPassword = ref("");
const confirmPassword = ref("");
const message = ref("");
const route = useRoute();
const router = useRouter();
const toast = useToast();

async function handleResetPassword() {
  if (newPassword.value !== confirmPassword.value) {
    message.value = "Les mots de passe ne correspondent pas.";
    toast.error("Les mots de passe ne correspondent pas.");
    console.log({
  token: route.query.token,
  newPassword: newPassword.value,
});

    return;
  }

  try {
    const token = route.query.token;
    const response = await axios.post(
      "http://localhost:3005/api/reset-password",
      {
        token,
        newPassword: newPassword.value,
      }

    );
    message.value =
      response.data.message || "Mot de passe réinitialisé avec succès.";
    toast.success("Mot de passe réinitialisé avec succès !");
    router.push("/");
  } catch (error) {
    message.value =
      error.response.data.message || "Erreur de réinitialisation.";
    toast.error("Erreur de réinitialisation.");
  }
}
</script>

<style scoped>
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
