import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Login from "../views/login/Login.vue";
import Register from "../views/login/Register.vue";
import Profil from "../views/Profil.vue";
import Apropos from "../views/Apropos.vue";
import Service from "../views/Service.vue";
import PresataProfile from "../views/presataProfile.vue";
import HomeAdmin from "../views/HomeAdmin.vue";
import ListAdmin from "../views/admin/ListAdmin.vue";
import Admin from "../views/admin/Admin.vue";

import Domaine from "../views/domaine/Domaine.vue";
import GestionService from "../views/service/GestionService.vue";
import ListPresta from "../views/prestataire/ListPresta.vue";





const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/profil/:id",
        name: "profil",
        component: Profil
    },
    {
        path: "/apropos",
        name: "apropos",
        component: Apropos
    },
    {
        path: "/service",
        name: "service",
        component: Service
    },
    {
        path: "/PrestaProfile/:id",
        name: "prestaProfile",
        component: PresataProfile,
    },
    {
        path: "/homeadmin",
        name: "homeadmin",
        component: HomeAdmin,
    },
    {
        path: "/listadmin",
        name: "listadmin",
        component: ListAdmin,
    },
    {
        path: "/admin",
        name: "admin",
        component: Admin,
    },
    {
        path: "/domaine",
        name: "domaine",
        component: Domaine,
    },
    {
        path: "/gestionservice",
        name: "gestionservice",
        component: GestionService,
    },
    {
        path: "/listpresta",
        name: "listpresta",
        component: ListPresta,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  });


export default router