import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home.vue";
import Login from "../views/login.vue";
import Vehicle from "../views/vehicle.vue";
import auth from "./middleware";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: auth.login
    },
    {
      path: "/vehicle/:prefix",
      name: "vehicle",
      component: Vehicle 
    }
  ],
});

export default router;