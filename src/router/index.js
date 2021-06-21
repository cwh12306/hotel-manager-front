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
    meta: {
      title: "登录",
    },
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "酒店客房管理系统",
    },
    component: () => import("$views/home/Home.vue"),
    children: [
      {
        path: "roomInfo/:username",
        component: () => import("$views/home/childViews/RoomInfo.vue"),
      },
      {
        path: "accommodationManagement/:username",
        component: () =>
          import("$views/home/childViews/AccommodationManagement.vue"),
      },
      {
        path: "roomManagement/:username",
        component: () => import("$views/home/childViews/RoomManagement.vue"),
      },
      {
        path: "query/:username",
        component: () => import("$views/home/childViews/Query.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched[0]) {
    document.title = to.matched[0].meta.title;
  }

  next();
});
export default router;
