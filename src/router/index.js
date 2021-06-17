import Vue from "vue";
import VueRouter from "vue-router";
import Login from "$views/login/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("$views/Home.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
