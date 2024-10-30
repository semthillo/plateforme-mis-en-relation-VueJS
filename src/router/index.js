import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Login from "../views/login/Login.vue";
import Register from "../views/login/Register.vue";




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
]

const router = createRouter({
    history: createWebHistory(),
    routes
  });


export default router