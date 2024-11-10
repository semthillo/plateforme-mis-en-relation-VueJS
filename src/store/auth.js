// import { defineStore } from "pinia";
// import axios from "axios";
// import {
//   requestPasswordReset,
//   resetPassword
// } from "../../src/components/auth";

// export const useAuthStore = defineStore("authStore", {
//   state: () => ({
//     token: null,
//     user: null,
//     emailMessage: ""
//   }),

//   actions: {
//     async login(email, password) {
//       try {
//         const response = await axios.post("http://localhost:3005/api/login", {
//           email,
//           password
//         });

//         this.token = response.data.token;

//         const userResponse = await axios.get("http://localhost:3005/api/profile", {
//           headers: {
//             Authorization: `Bearer ${this.token}`
//           }
//         });

//         this.user = userResponse.data.user;
//       } catch (error) {
//         console.error("Erreur lors de la connexion :", error.message);
//         throw error;
//       }
//     },
//     async forgotPassword(email) {
//       try {
//         const response = await requestPasswordReset(email);
//         this.emailMessage = response.data.message;
//       } catch (error) {
//         console.error("Error during password reset request:", error);
//         throw error;
//       }
//     },
//     async resetPassword(token, password) {
//       try {
//         const response = await resetPassword(token, password);
//         return response.data.message;
//       } catch (error) {
//         console.error("Error during password reset:", error);
//         throw error;
//       }
//     },

//     logout() {
//       this.token = null;
//       this.user = null;
//     }
//   },

//   persist: true
// });




// store/auth.js

import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const isAuthenticated = ref(!!token.value);
  const user = ref(null);

  async function login(email, password) {
    try {
      const response = await axios.post('http://localhost:3005/api/login', { email, password });
      this.user = response.data.user;
      token.value = response.data.token;
      isAuthenticated.value = true;

   
      user.value = response.data.user;
      localStorage.setItem('token', token.value);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
     
      return user.value;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw new Error("Échec de la connexion. Veuillez vérifier vos informations.");
    }
  }

  function logout() {
    token.value = null;
    isAuthenticated.value = false;
    user.value = null;
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }

  async function fetchUserProfile() {
    if (!token.value) return;

    try {
      const response = await axios.get('http://localhost:3005/api/profile');
      user.value = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement du profil de l'utilisateur :", error);
    }
  }

  return { token, isAuthenticated, user, login, logout, fetchUserProfile };
});
