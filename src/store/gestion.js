import axios from "axios";
import { defineStore } from "pinia";

export const useGestionStore = defineStore("gestion", {
  state: () => ({
    users: [],
    searchQuery: "",
    domains: [],
    projects: [],
    links: [],
    services: [],
    currentIndex: 0,
    user: null,
    currentDomain: null,
  }),

  actions: {
    getUser() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    async getUsersByDomain(domainName) {
      try {
        const resp = await axios.get(
          `http://localhost:3005/api/users/${domainName}`
        );
        console.log(resp.data);

        return resp.data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
        return null;
      }
    },
    async getUserById(id) {
      try {
        const resp = await axios.get(`http://localhost:3005/api/users/${id}`);
        console.log(resp.data);

        return resp.data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
        return null;
      }
    },
    async addUser(userData) {
      try {
        await axios.post("http://localhost:3005/api/users", userData);
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur : ", error);
        throw error;
      }
    },

    async fetchAdmins() {
      try {
        const response = await axios.get("http://localhost:3005/api/users");
        this.users = response.data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des administrateurs :",
          error
        );
      }
    },

    async getUsersForService(serviceId) {
      try {
        const response = await axios.get(`http://localhost:3005/api/userByService/${serviceId}`);
      
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs pour le service", serviceId, ":", error);
        return [];
      }
    },
    

    async updateUser(id, data) {
      try {
        const response = await axios.put(`http://localhost:3005/api/users/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Utilisateur mis à jour avec succès :", response.data);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error("Erreur côté serveur :", error.response.data);
        } else {
          console.error("Erreur lors de la requête :", error.message);
        }
        throw error;
      }
    },
    

    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3005/api/users/${id}`);
        await this.fetchAdmins();
      } catch (error) {
        throw error;
      }
    },

    logout() {
      this.user = null;
    },

    setUser(user) {
      this.user = user;
    },
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/users");
        return (this.users = resp.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
          telephone: user.telephone,
          description: user.description,
          availability: user.availability,
          profil: user.profil,
          domains: user.domains || [], // Adapter les domaines
          socialLinks: user.socialLinks || [], // Adapter les liens sociaux
          services: user.services || [], // Adapter les services
        })));
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
        return (this.users = []);
      }
    },
    async loadDomainFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/domains");
        return (this.domains = resp.data.map((domain) => ({
          id: domain.id,
          name: domain.name,
        })));
      } catch (error) {
        console.error("Erreur lors de chargement des domains");
        this.domains = [];
      }
    },

    async addDomain(domain) {
      try {
        await axios.post("http://localhost:3005/api/domains", domain);
        await this.loadDomainFromApi();
      } catch (error) {
        throw error;
      }
    },

    // Mettre à jour la logique de mise à jour du domaine
    async updateDomain(id, domain) {
      try {
        const response = await axios.put(
          `http://localhost:3005/api/domains/${id}`,
          domain
        );

        // Mise à jour locale des domaines
        const index = this.domains.findIndex((d) => d.id === domain.id);
        if (index !== -1) {
          // Remplacer l'ancien domaine par le domaine mis à jour
          this.domains[index] = { ...this.domains[index], ...domain };
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du domaine:", error);
        throw new Error("Erreur lors de la mise à jour du domaine");
      }
    },

    async deleteDomain(id) {
      try {
        await axios.delete(`http://localhost:3005/api/domains/${id}`);
        await this.loadDomainFromApi();
      } catch (error) {
        throw error;
      }
    },

    async loadProjectFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/projects");
        this.projects = resp.data.map((project) => ({
          id: project.id,
          title: project.title,
          startDate: project.startDate,
          endDate: project.endDate,
          description: project.description,
          companyName: project.companyName,
        }));
      } catch (error) {
        console.error("Erreur lors du chargement des projets", error);

        this.projects = [];
      }
    },
    async getProjectByUserId(id) {
      try {
        const resp = await axios.get(
          `http://localhost:3005/api/projectuser/${id}`
        );

        return resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des projets", error);

        return null;
      }
    },
    async getProjectByDomainId(id) {
      try {
        const resp = await axios.get(
          `http://localhost:3005/api/projectsdomains/${id}`
        );

        return resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des projets", error);

        return null;
      }
    },

    async getProjectByUserDomainId(user_id, domain_id) {
      try {
        const resp = await axios.get(
          `http://localhost:3005/api/projectuser/${user_id}/${domain_id}`
        );

        return resp.data;
      } catch (error) {
        console.error("Erreur lors du chargement des projets", error);

        return null;
      }
    },

    async addProject(formData) {
      try {
        await axios.post("http://localhost:3005/api/projects", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        await this.loadProjectFromApi();
      } catch (error) {
        throw error;
      }
    },
    
    async updateProject(id, formData) {
      try {
        // Envoi des modifications au backend avec FormData
        await axios.put(`http://localhost:3005/api/projects/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Nécessaire pour les fichiers
          },
        });
    
        // Recharge la liste des projets après la mise à jour
        await this.loadProjectFromApi();
        
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        throw error; // Laisse l'erreur remonter pour une gestion en amont
      }
    },
    
   
  

    

    async deleteProject(id) {
      try {
        await axios.delete(`http://localhost:3005/api/projects/${id}`);
        await this.loadProjectFromApi();
      } catch (error) {
        throw error;
      }
    },

    async loadLinkFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/links");
        this.links = resp.data.map((link) => ({
          id: link.id,
          url: link.url,
          type: link.type,
        }));
      } catch (error) {
        console.error("Erreur lors du chargement des liens des reseaux", error);
        this.links = [];
      }
    },

    async addLink(link) {
      try {
        await axios.post("http://localhost:3005/api/links", link);
        await this.loadLinkFromApi();
      } catch (error) {
        throw error;
      }
    },

    async updateLink(updatedLink) {
      try {
        await axios.put(
          `http://localhost:3005/api/links/${updatedLink.id}`,
          updatedLink
        );
        await this.loadLinkFromApi();
      } catch (error) {
        throw error;
      }
    },

    async deleteLink(id) {
      try {
        await axios.delete(`http://localhost:3005/api/links/${id}`);
        await this.loadLinkFromApi();
      } catch (error) {
        throw error;
      }
    },

    // Actions for Services
    async loadServiceFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/services");
        this.services = resp.data.map((service) => ({
          id: service.id,
          name: service.name,
        }));
        return this.services
      } catch (error) {
        console.error("Erreur lors du chargement des service", error);
        this.services = [];
      }
    },

    async addService(newServe) {
      try {
        const response = await axios.post(
          "http://localhost:3005/api/services",
          newServe
        );
        await this.loadServiceFromApi();
      } catch (error) {
        console.error("Erreur d'ajout :", error);
        throw error;
      }
    },

    async updateService(updatedService) {
      try {
        const response = await axios.put(
          `http://localhost:3005/api/services/${updatedService.id}`,
          updatedService
        );
        if (response.status === 200) {
          await this.loadServiceFromApi();
        } else {
          throw new Error("Erreur de mise à jour : " + response.statusText);
        }
      } catch (error) {
        console.error("Erreur de mise à jour :", error);
        throw error;
      }
    },

    async deleteService(id) {
      try {
        await axios.delete(`http://localhost:3005/api/services/${id}`);
        await this.loadServiceFromApi();
      } catch (error) {
        throw error;
      }
    },
  },
});
