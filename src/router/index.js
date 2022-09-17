import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/Home.vue"),
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("../components/Manage.vue"),
    beforeEnter: (to, from, next) => {
      console.log("Route guard");
      next();
    },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  console.log("Global guard");
  next();
});

export default router;
