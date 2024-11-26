// store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const isAuthenticated = ref(!!token.value);
  const user = ref(null);

  // Fonction pour se connecter
  async function login(email, password) {
    try {
      const response = await axios.post('http://localhost:3005/api/login', { email, password });

      // Debugging: Afficher la réponse de l'API pour vérifier la structure des données
      console.log('Réponse de l\'API:', response.data);

      user.value = {
        role: response.data.role,
        userId: response.data.userId,
        userName: response.data.name
      };
      console.log(user.value.name);
      

      token.value = response.data.token;
      isAuthenticated.value = true;
      localStorage.setItem('token', token.value);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

      return user.value;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw new Error("Échec de la connexion. Veuillez vérifier vos informations.");
    }
  }

  // Fonction pour se déconnecter
  function logout() {
    token.value = null;
    isAuthenticated.value = false;
    user.value = null;
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }

  // Fonction pour récupérer les informations de l'utilisateur en fonction de son ID
  async function fetchUserProfile(userId) {
    if (!token.value) return;

    try {
      const response = await axios.get(`http://localhost:3005/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      user.value = response.data; 
    } catch (error) {
      console.error("Erreur lors du chargement du profil de l'utilisateur :", error);
    }
  }

  return { token, isAuthenticated, user, login, logout, fetchUserProfile };
});
