import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Login from "../views/login/Login.vue";
import Register from "../views/login/Register.vue";
import Profil from '../views/Profil.vue';
import Apropos from "../views/Apropos.vue";
import Service from "../views/Service.vue";
import PrestaProfile from "../views/PrestaProfile.vue";
import HomeAdmin from "../views/HomeAdmin.vue";
import ListAdmin from "../views/admin/ListAdmin.vue";


import ListPresta from "../views/prestataire/ListPresta.vue";
import ListDomain from "../views/domaine/ListDomain.vue";
import ListService from "../views/service/ListService.vue";
import ListPrestataire from "../views/ListPrestataire.vue";
import ResetPassword from "../views/login/ResetPassword.vue";
import ProfilPrestaAdmin from "../views/ProfilPrestaAdmin.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,

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
        path: "/list-presta",
        name: "list-presta",
        component: ListPrestataire,
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/profil/:id",
        name: "profil",
        component: Profil,
        meta: { requiresAuth: true, role: "prestataire" },
        props: true
    },
    {
        path: "/prestaProfile/:id",
        name: "prestaProfile",
        component: PrestaProfile,
        props: true
    },
    {
        path: "/reset-password",
        name: "ResetPassword",
        component: ResetPassword,
        props: true
    },
    {
        path: "/homeadmin/:id",
        name: "homeadmin",
        component: HomeAdmin,
        meta: { requiresAuth: true, role: "admin" },
        
        children: [
            {
                path: "listadmin",
                name: "listadmin",
                component: ListAdmin,
                meta: { requiresAuth: true, role: "admin" },
            },
            {
                path: "listdomaine",
                name: "listdomaine",
                component: ListDomain 
            },
            {
                path: "listservice",
                name: "listervice",
                component: ListService
            },
            {
                path: "listpresta",
                name: "listpresta",
                component: ListPresta,
               
            },
            {
                path: "presta-admin/:id",
                name: "presta-admin",
                component: ProfilPrestaAdmin,
                props: true,
            },
            {
                path: "presta-admin/:id",
                name: "presta-admin",
                component: ProfilPrestaAdmin,
                props: true,
        
            },
        ]
    },
    
 
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
