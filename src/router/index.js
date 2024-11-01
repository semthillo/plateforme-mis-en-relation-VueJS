import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Login from "../views/login/Login.vue";
import Register from "../views/login/Register.vue";
import Profil from "../views/Profil.vue";
import Apropos from "../views/Apropos.vue";
import Service from "../views/Service.vue";






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
        path: "/profil",
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
  });


export default router