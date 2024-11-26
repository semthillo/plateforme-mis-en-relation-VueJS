<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
    <router-link to="/register">Mot de passe oublié ?</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import { useToast } from 'vue-toastification';

const toast = useToast();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const authStore = useAuthStore();
const router = useRouter();

async function handleLogin() {
  try {
    const user = await authStore.login(email.value, password.value);
    
    console.log('Utilisateur après connexion:', user); 

    if (user && user.role) {
      toast.success("Connexion réussie !");
      
      if (user.role === "admin") {
        console.log("Redirection vers /homeAdmin");
        router.push(`/homeadmin/${user.userId}`);

      } else if (user.role === "prestataire") {
        console.log("Redirection vers /profil");
        router.push({ name: "profil", params: { id: user.userId } });
      }
    } else {
      console.error("Rôle de l'utilisateur non trouvé");
      errorMessage.value = "Rôle de l'utilisateur non trouvé.";
    }
  } catch (error) {
    errorMessage.value = error.message;
    console.error(error);
  }
}

</script>



<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
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
