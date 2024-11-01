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
  }),

  actions: {
    getUser() {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/users");
        this.users = resp.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
          telephone: user.telephone,
          description: user.description,
          availability: user.availability,
        }));
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
        this.users = [];
      }
    },

    // Actions for Domains
    async loadDomainFromApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/domains");
        this.domains = resp.data.map(domain => ({
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

    // Actions for Projects
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

    // Actions for Links
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

    async addService(service) {
      try {
        await axios.post("http://localhost:3005/api/services", service);
        await this.loadServiceFromApi();
      } catch (error) {
        throw error;
      }
    },

    async updateService(updatedService) {
      try {
        await axios.put(`http://localhost:3005/api/services/${updatedService.id}`, updatedService);
        await this.loadServiceFromApi();
      } catch (error) {
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
