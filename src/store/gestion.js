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
    currentIndex : 0,
    user: null, 
  }),

  actions: {
    getUser() {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

  
    async getUserById(id) {
        try {
            
            const resp = await axios.get(`http://localhost:3005/api/users/${id}`);
            console.log(resp.data);  
            
            return resp.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur:", error);
            return null;  
        }
    },
    async addUser(admin) {
      try {
        const response = await axios.post("http://localhost:3005/api/users", admin);
        
        return response;
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        throw error;
      }
    },
  

    async fetchAdmins() {
      try {
        const response = await axios.get("http://localhost:3005/api/users");
        this.users = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des administrateurs :", error);
      }
    },

    async updateUser(index, updatedUser) {
      try {
        const userId = this.users[index].id;
        await axios.put(`http://localhost:3005/api/users/${userId}`, updatedUser);
        this.users[index] = { ...this.users[index], ...updatedUser };
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3005/api/users/${id}`);
        await this.loadDataFromApi();
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.user = null;
    },
   
    setUser(user) {
      this.user = user;
    }
  ,

  async loadDataFromApi() {
    try {
        const resp = await axios.get("http://localhost:3005/api/users");
        return this.users = resp.data.map(user => ({
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
            services: user.services || [] // Adapter les services
        }));
    } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
        return this.users = [];
    }
}
,
      
    
    async loadDomainFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/domains");
       return this.domains = resp.data.map(domain => ({
            id: domain.id,
            name: domain.name
            
        }));
        
      } catch (error) {
        console.error("Erreur lors de chargement des domains")
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

    async updateDomain(updatedDomain) {
      if (!updatedDomain.id) throw new Error("ID manquant dans le domaine.");
      try {
        await axios.put(`http://localhost:3005/api/domains/${updatedDomain.id}`, updatedDomain);
        await this.loadDomainFromApi();
      } catch (error) {
        throw error;
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
        this.projects = resp.data.map(project => ({
            id: project.id,     
            title: project.title,   
            date_heure: project.date_heure,
            description: project.description,
            companyName: project.companyName
        }));
      } catch (error) {
        console.error("Erreur lors du chargement des projets", error);
        
        this.projects = [];
      }
    },

    async addProject(project) {
      try {
        await axios.post("http://localhost:3005/api/projects", project);
        await this.loadProjectFromApi();
      } catch (error) {
        
        throw error;
      }
    },

    async updateProject(updatedProject) {
      try {
        await axios.put(`http://localhost:3005/api/projects/${updatedProject.id}`, updatedProject);
        await this.loadProjectFromApi();
      } catch (error) {
        throw error;
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
        this.links = resp.data.map(link => ({
            id: link.id,
            url: link.url,
            type: link.type
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
        await axios.put(`http://localhost:3005/api/links/${updatedLink.id}`, updatedLink);
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
        this.services = resp.data.map(service => ({
            id: service.id,
            name: service.name
            

        }));
      } catch (error) {
        console.error("Erreur lors du chargement des service", error);
        this.services = [];
      }
    },

async addService(newServe) {
  try {
    const response = await axios.post("http://localhost:3005/api/services", newServe);
    
    return response.data;
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
