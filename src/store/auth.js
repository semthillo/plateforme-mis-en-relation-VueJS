import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, onMounted } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const isAuthenticated = ref(!!token.value);
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);

  // Charger les informations utilisateur au démarrage
  onMounted(() => {
    if (user.value && token.value) {
      isAuthenticated.value = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    }
  });

  // Fonction pour se connecter
  async function login(email, password) {
    try {
      const response = await axios.post('http://localhost:3005/api/login', { email, password });

      user.value = {
        role: response.data.role,
        userId: response.data.userId,
        userName: response.data.name
      };

      token.value = response.data.token;
      isAuthenticated.value = true;
      localStorage.setItem('token', token.value);
      localStorage.setItem('user', JSON.stringify(user.value));

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
    localStorage.removeItem('user');
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
      localStorage.setItem('user', JSON.stringify(user.value));  // Sauvegarder l'utilisateur dans localStorage
    } catch (error) {
      console.error("Erreur lors du chargement du profil de l'utilisateur :", error);
    }
  }

  return { token, isAuthenticated, user, login, logout, fetchUserProfile };
});
